import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { createAccountAssignEntity } from '../../entities';

export function createAccountEntity(): Entity {
  return createIntegrationEntity({
    entityData: {
      source: {
        id: 'kandji-account',
        name: 'Kandji Account',
      },
      assign: createAccountAssignEntity({
        _key: 'kandji-account',
        name: 'Kandji Account',
      }),
    },
  });
}
