import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk-core';
import { StepTestConfig } from '@jupiterone/integration-sdk-testing';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { invocationConfig } from '../src';
import { IntegrationConfig } from '../src/config';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}
const DEFAULT_API_URL = 'https://dummyurl.clients.us-1.kandji.io/api/v1/';
const DEFAULT_ACCESS_TOKEN = 'dummy-kandji-access-token';

export const integrationConfig: IntegrationConfig = {
  apiUrl: process.env.API_URL || DEFAULT_API_URL,
  accessToken: process.env.ACCESS_TOKEN || DEFAULT_ACCESS_TOKEN,
};

export function buildStepTestConfigForStep(stepId: string): StepTestConfig {
  return {
    stepId,
    instanceConfig: integrationConfig,
    invocationConfig: invocationConfig as IntegrationInvocationConfig,
  };
}
