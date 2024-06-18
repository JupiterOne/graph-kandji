import { accountSteps } from './account';
import { deviceSteps } from './device';
import { appSteps } from './app';
import { userSteps } from './user';
import { customProfileSteps } from './profile';

const integrationSteps = [
  ...accountSteps,
  ...appSteps,
  ...deviceSteps,
  ...userSteps,
  ...customProfileSteps,
];

export { integrationSteps };
