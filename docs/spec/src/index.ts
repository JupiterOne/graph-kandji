import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { accountSpec } from './account';
import { appSpec } from './app';
import { deviceSpec } from './device';
import { userSpec } from './user';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [...accountSpec, ...appSpec, ...deviceSpec, ...userSpec],
};
