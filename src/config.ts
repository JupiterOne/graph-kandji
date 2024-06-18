import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';

export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  apiUrl: {
    type: 'string',
  },
  accessToken: {
    type: 'string',
    mask: true,
  },
};

export interface IntegrationConfig extends IntegrationInstanceConfig {
  /**
   * The provider API URL shown in the access page
   */
  apiUrl: string;

  /**
   * The provider Access Token
   */
  accessToken: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (!config.apiUrl || !config.accessToken) {
    throw new IntegrationValidationError(
      'Config requires all of {apiUrl, accessToken}, you can check this via access page in settings or contact support.',
    );
  }

  const apiClient = createAPIClient(config);
  //await apiClient.verifyAuthentication();
}
