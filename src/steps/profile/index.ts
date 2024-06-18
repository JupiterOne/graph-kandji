import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { IntegrationSteps, Entities } from '../constants';
import { createAPIClient } from '../../client';
import { createCustomProfileEntity } from './converter';

export async function fetchCustomProfiles({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  await apiClient.iterateCustomProfiles(async (customProfile) => {
    const customProfileEntity = createCustomProfileEntity(customProfile);

    await jobState.addEntity(customProfileEntity);
  });
}

export const customProfileSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.FETCH_CUSTOM_PROFILES,
    name: 'Fetch Custom Profiles',
    entities: [Entities.CUSTOM_PROFILE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchCustomProfiles,
  },
];
