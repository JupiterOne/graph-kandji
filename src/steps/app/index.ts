import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  parseTimePropertyValue,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { IntegrationSteps, Entities, Relationships } from '../constants';
import { createAppEntity, getAppKey, getDeviceHasAppKey } from './converter';

export async function fetchDeviceApps({
  jobState,
  instance,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.DEVICE._type },
    async (deviceEntity) => {
      const deviceId = deviceEntity.id;
      await apiClient.iterateDeviceApps(deviceId as string, async (app) => {
        // Switching to using bundle_id for the key will cause deliberate
        // duplication so devices will share apps.  Check to see if another
        // device has already created the appEntity we need
        let appEntity = await jobState.findEntity(getAppKey(app));
        if (!appEntity) {
          appEntity = createAppEntity(app);
          await jobState.addEntity(appEntity);
        }

        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.INSTALLED,
            from: deviceEntity,
            to: appEntity,
            // Moving properties that can't be shared in the appEntity to the
            // device_has_app relationship.  Also manually constructing the
            // _key to prevent data loss when we have multiple versions of
            // the same app installed on a machine.
            properties: {
              _key: getDeviceHasAppKey(deviceId as string, app.app_id),
              id: app.app_id,
              signature: app.signature,
              bundleSize: app.bundle_size,
              path: app.path,
              version: app.version,
              createdOn: parseTimePropertyValue(app.creation_date),
              updatedOn: parseTimePropertyValue(app.modification_date),
            },
          }),
        );
      });
    },
  );
}

export const appSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.FETCH_DEVICE_APPS,
    name: 'Fetch Device Apps',
    entities: [Entities.APP],
    relationships: [Relationships.DEVICE_INSTALLED_APP],
    dependsOn: [IntegrationSteps.DEVICES],
    executionHandler: fetchDeviceApps,
  },
];
