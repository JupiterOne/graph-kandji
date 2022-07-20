import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const userSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://{{organization_host_name}}/api/v1/devices/
     * PATTERN: Fetch Child Entities
     */
    id: 'fetch-device-users',
    name: 'Fetch Device Users',
    entities: [
      {
        resourceName: 'User',
        _type: 'kandji_user',
        _class: ['User'],
      },
    ],
    relationships: [
      {
        _type: 'kandji_device_has_user',
        sourceType: 'kandji_device',
        _class: RelationshipClass.HAS,
        targetType: 'kandji_user',
      },
    ],
    dependsOn: ['fetch-devices'],
    implemented: true,
  },
];
