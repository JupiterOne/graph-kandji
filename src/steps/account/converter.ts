import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';

export function createAccountEntity(): Entity {
  return createIntegrationEntity({
    entityData: {
      source: {
        id: 'kandji-account',
        name: 'Kandji Account',
      },
      assign: {
        _key: 'kandji-account',
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        name: 'Kandji Account',
      },
    },
  });
}
