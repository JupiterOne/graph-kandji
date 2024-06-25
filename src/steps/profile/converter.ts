import { createCustomProfileAssignEntity } from '../../entities';
import { CustomProfiles } from '../../types';
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
      assign: createCustomProfileAssignEntity({
        _key: `kandji_profile:${customProfile.id}`,

        id: customProfile.id,
        name: customProfile.name,
        active: customProfile.active,
        // TODO: we may need profile in the future so keeping it here for now
        //profile: customProfile.profile,
        mdmIdentifier: customProfile.mdm_identifier,
        createdOn: parseTimePropertyValue(customProfile.created_at),
        updatedOn: parseTimePropertyValue(customProfile.updated_at),
      }),
    },
  });
}
