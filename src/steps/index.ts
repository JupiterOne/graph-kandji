import { accountSteps } from './account';
import { deviceSteps } from './device';
import { appSteps } from './app';
import { userSteps } from './user';

const integrationSteps = [
  ...accountSteps,
  ...appSteps,
  ...deviceSteps,
  ...userSteps,
];

export { integrationSteps };
