import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { IntegrationSteps, Entities } from '../constants';
import { createAPIClient } from '../../client';
import { createBlueprintEntity } from './converter';

export async function fetchBlueprints({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  await apiClient.iterateBlueprints(async (blueprint) => {
    const blueprintEntity = createBlueprintEntity(blueprint);

    await jobState.addEntity(blueprintEntity);
  });
}

export const blueprintSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.FETCH_BLUEPRINTS,
    name: 'Fetch Blueprints',
    entities: [Entities.BLUEPRINT],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchBlueprints,
  },
];
