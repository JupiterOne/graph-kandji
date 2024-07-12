import { createBlueprintAssignEntity } from '../../entities';
import { Blueprint } from '../../types';
import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

export function buildBlueprintEntityKey(id: string) {
  return `kandji_blueprint:${id}`;
}

export function createBlueprintEntity(blueprint: Blueprint): Entity {
  return createIntegrationEntity({
    entityData: {
      source: blueprint,
      assign: createBlueprintAssignEntity({
        _key: buildBlueprintEntityKey(blueprint.id),
        id: blueprint.id,
        name: blueprint.name,
        description: blueprint.description,
        computersCount: blueprint.computers_count,
        enrollmentCodeActive: blueprint.enrollment_code.is_active,
        // enrollmentCode: blueprint.enrollment_code.code, // Caution, value may be sensitive data.
      }),
    },
  });
}
