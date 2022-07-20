import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const deviceSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://{{organization_host_name}}/api/v1/devices
     * PATTERN: Fetch Entities
     */
    id: 'fetch-devices',
    name: 'Fetch Devices',
    entities: [
      {
        resourceName: 'Device',
        _type: 'kandji_device',
        _class: ['Device'],
      },
    ],
    relationships: [
      {
        _type: 'kandji_account_has_device',
        sourceType: 'kandji_account',
        _class: RelationshipClass.HAS,
        targetType: 'kandji_device',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
