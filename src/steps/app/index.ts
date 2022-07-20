import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { IntegrationSteps, Entities, Relationships } from '../constants';
import { createAppEntity } from './converter';

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
        const appEntity = createAppEntity(app);

        await jobState.addEntity(appEntity);
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: deviceEntity,
            to: appEntity,
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
    relationships: [Relationships.DEVICE_HAS_APP],
    dependsOn: [IntegrationSteps.DEVICES],
    executionHandler: fetchDeviceApps,
  },
];
