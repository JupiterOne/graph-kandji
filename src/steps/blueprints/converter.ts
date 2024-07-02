import { createBlueprintAssignEntity } from '../../entities';
import { Blueprint } from '../../types';
import {
  //parseTimePropertyValue,
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

export function createBlueprintEntity(blueprint: Blueprint): Entity {
  return createIntegrationEntity({
    entityData: {
      source: blueprint,
      assign: createBlueprintAssignEntity({
        _key: `kandji_blueprint:${blueprint.id}`,
        id: blueprint.id,
        name: blueprint.name,
        description: blueprint.description,
        params: blueprint.params,
        computersCount: blueprint.computers_count,
        enrollmentCode: blueprint.enrollment_code.code,
        activeStatus: blueprint.enrollment_code.is_active,
      }),
    },
  });
}
