import { CustomProfiles } from '../../types';
import { Entities } from '../constants';
import {
  parseTimePropertyValue,
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

export function createCustomProfileEntity(
  customProfile: CustomProfiles,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: customProfile,
      assign: {
        _key: customProfileKey(customProfile),
        _type: Entities.CUSTOM_PROFILE._type,
        _class: Entities.CUSTOM_PROFILE._class,

        id: customProfile.id,
        name: customProfile.name,
        active: customProfile.active,
        //profile: customProfile.profile,
        mdmIdentifier: customProfile.mdm_identifier,
        createdOn: parseTimePropertyValue(customProfile.created_at),
        updatedOn: parseTimePropertyValue(customProfile.updated_at),
      },
    },
  });
}
