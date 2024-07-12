import { accountSteps } from './account';
import { deviceSteps } from './device';
import { appSteps } from './app';
import { userSteps } from './user';
import { customProfileSteps } from './profile';
import { blueprintSteps } from './blueprints';

const integrationSteps = [
  ...accountSteps,
  ...appSteps,
  ...deviceSteps,
  ...userSteps,
  ...customProfileSteps,
  ...blueprintSteps,
];

export { integrationSteps };
