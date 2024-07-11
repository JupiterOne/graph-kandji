import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import {
  IntegrationSteps,
  Entities,
  Relationships,
  ACCOUNT_ENTITY_KEY,
} from '../constants';
import { createDeviceEntity } from './converter';
import { buildCustomProfileKey } from '../profile/converter';
import { buildBlueprintEntityKey } from '../blueprints/converter';

export async function fetchDevices({
  jobState,
  instance,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateDevices(async (device) => {
    const deviceDetails = await apiClient.fetchDeviceDetails(device.device_id!);
    const deviceEntity = createDeviceEntity(device, deviceDetails);

    await jobState.addEntity(deviceEntity);
    if (accountEntity && deviceEntity) {
      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.HAS,
          from: accountEntity,
          to: deviceEntity,
        }),
      );
    }

    if (device.blueprint_id) {
      const blueprintEntity = await jobState.findEntity(
        buildBlueprintEntityKey(device.blueprint_id),
      );
      if (blueprintEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.ASSIGNED,
            from: deviceEntity,
            to: blueprintEntity,
          }),
        );
      }
    }

    if (Array.isArray(deviceDetails.installed_profiles)) {
      for (const installedProfile of deviceDetails.installed_profiles) {
        if (installedProfile.uuid) {
          const customProfileEntity = await jobState.findEntity(
            buildCustomProfileKey(installedProfile.uuid),
          );

          if (customProfileEntity) {
            await jobState.addRelationship(
              createDirectRelationship({
                _class: RelationshipClass.ASSIGNED,
                from: deviceEntity,
                to: customProfileEntity,
              }),
            );
          }
        }
      }
    }
  });
}

export const deviceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.DEVICES,
    name: 'Fetch Devices',
    entities: [Entities.DEVICE],
    relationships: [
      Relationships.ACCOUNT_HAS_DEVICE,
      Relationships.DEVICE_ASSIGNED_BLUEPRINT,
      Relationships.DEVICE_ASSIGNED_PROFILE,
    ],
    dependsOn: [
      IntegrationSteps.ACCOUNT,
      IntegrationSteps.FETCH_BLUEPRINTS,
      IntegrationSteps.FETCH_CUSTOM_PROFILES,
    ],
    executionHandler: fetchDevices,
  },
];
