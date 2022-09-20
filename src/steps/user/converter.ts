import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { DeviceUser } from '../../types';

export function getUserKey(id: number): string {
  return `kandji_user:${id}`;
}

export function createUserEntity(user: DeviceUser): Entity {
  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _key: getUserKey(user.id),
        _type: Entities.USER._type,
        _class: Entities.USER._class,
        id: getUserKey(user.id),
        name: user.name,
        email: user.email,
        isArchived: user.is_archived,
        username: user.email,
        active: true,
      },
    },
  });
}
