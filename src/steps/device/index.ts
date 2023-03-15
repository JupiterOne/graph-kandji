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
  });
}

export const deviceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.DEVICES,
    name: 'Fetch Devices',
    entities: [Entities.DEVICE],
    relationships: [Relationships.ACCOUNT_HAS_DEVICE],
    dependsOn: [IntegrationSteps.ACCOUNT],
    executionHandler: fetchDevices,
  },
];
