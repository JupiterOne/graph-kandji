import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { IntegrationSteps, Entities, Relationships } from '../constants';
import { createUserEntity, getUserKey } from './converter';

export async function fetchDeviceUsers({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.DEVICE._type },
    async (deviceEntity) => {
      const userId = deviceEntity['user.id'] as number | null;

      if (userId !== null) {
        const userKey = getUserKey(userId);
        let userEntity = await jobState.findEntity(userKey);
        if (!userEntity) {
          userEntity = createUserEntity({
            id: deviceEntity['user.id'] as number,
            name: deviceEntity['user.name'] as string,
            email: deviceEntity['user.email'] as string,
            is_archived: deviceEntity['user.isArchived'] as boolean,
          });
          await jobState.addEntity(userEntity);
        }

        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: deviceEntity,
            to: userEntity,
          }),
        );
      }
    },
  );
}

export const userSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.FETCH_DEVICE_USERS,
    name: 'Fetch Device Users',
    entities: [Entities.USER],
    relationships: [Relationships.DEVICE_HAS_USER],
    dependsOn: [IntegrationSteps.DEVICES],
    executionHandler: fetchDeviceUsers,
  },
];
