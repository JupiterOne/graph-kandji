import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const appSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://{{organization_host_name}}/api/v1/devices/{device_id}/apps
     * PATTERN: Fetch Child Entities
     */
    id: 'fetch-device-apps',
    name: 'Fetch Device Apps',
    entities: [
      {
        resourceName: 'App',
        _type: 'kandji_app',
        _class: ['Application'],
      },
    ],
    relationships: [
      {
        _type: 'kandji_device_has_app',
        sourceType: 'kandji_device',
        _class: RelationshipClass.HAS,
        targetType: 'kandji_app',
      },
    ],
    dependsOn: ['fetch-devices'],
    implemented: true,
  },
];
