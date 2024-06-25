import { SchemaType } from '@jupiterone/integration-sdk-core';
import { createEntityType, createEntityMetadata } from './helpers';

export const [AccountEntityMetadata, createAccountAssignEntity] =
  createEntityMetadata({
    resourceName: 'Account',
    _class: ['Account'],
    _type: createEntityType('account'),
    description: 'Kandji Account',
    schema: SchemaType.Object({
      name: SchemaType.String(),
    }),
  });

export const [DeviceEntityMetadata, createDeviceAssignEntity] =
  createEntityMetadata({
    resourceName: 'Device',
    _class: ['Device'],
    _type: createEntityType('device'),
    description: 'Kandji Device',
    schema: SchemaType.Object({
      serialNumber: SchemaType.Optional(
        SchemaType.Union([SchemaType.String(), SchemaType.Null()]),
      ),
      lastCheckinOn: SchemaType.Optional(
        SchemaType.Union([SchemaType.Number(), SchemaType.Null()]),
      ),
      'user.id': SchemaType.Optional(
        SchemaType.Union([SchemaType.Number(), SchemaType.Null()]),
      ),
      'user.name': SchemaType.Optional(
        SchemaType.Union([SchemaType.String(), SchemaType.Null()]),
      ),
      'user.email': SchemaType.Optional(
        SchemaType.Union([SchemaType.String(), SchemaType.Null()]),
      ),
      'user.isArchived': SchemaType.Optional(
        SchemaType.Union([SchemaType.Boolean(), SchemaType.Null()]),
      ),
      blueprintId: SchemaType.Optional(SchemaType.String()),
      blueprintName: SchemaType.Optional(SchemaType.String()),
      mdmEnabled: SchemaType.Optional(SchemaType.Boolean()),
      agentInstalled: SchemaType.Optional(SchemaType.Boolean()),
      isMissing: SchemaType.Optional(SchemaType.Boolean()),
      isRemoved: SchemaType.Optional(SchemaType.Boolean()),
      agentVersion: SchemaType.Optional(SchemaType.String()),
      firstEnrollmentOn: SchemaType.Optional(SchemaType.Number()),
      lastEnrollmentOn: SchemaType.Optional(SchemaType.Number()),
      'general.systemVersion': SchemaType.Optional(SchemaType.String()),
      'general.bootVolume': SchemaType.Optional(SchemaType.String()),
      'general.timeSinceBoot': SchemaType.Optional(SchemaType.String()),
      'general.lastUser': SchemaType.Optional(SchemaType.String()),
      'general.assignedUserId': SchemaType.Optional(SchemaType.Number()),
      'general.assignedUserName': SchemaType.Optional(SchemaType.String()),
      'general.assignedUserEmail': SchemaType.Optional(SchemaType.String()),
      'general.assignedUserIsArchived': SchemaType.Optional(
        SchemaType.Boolean(),
      ),
      'general.blueprintName': SchemaType.Optional(SchemaType.String()),
      'general.blueprintUuid': SchemaType.Optional(SchemaType.String()),
      'mdm.mdmEnabled': SchemaType.Optional(SchemaType.String()),
      'mdm.installDate': SchemaType.Optional(SchemaType.String()),
      'mdm.lastCheckIn': SchemaType.Optional(SchemaType.String()),
      'mdm.mdmEnabledUser': SchemaType.Optional(
        SchemaType.Array(SchemaType.String()),
      ),
      'activationLock.bypassCodeFailed': SchemaType.Optional(
        SchemaType.Boolean(),
      ),
      'activationLock.userActivationLockEnabled': SchemaType.Optional(
        SchemaType.Boolean(),
      ),
      'activationLock.deviceActivationLockEnabled': SchemaType.Optional(
        SchemaType.Boolean(),
      ),
      'activationLock.activationLockAllowedWhileSupervised':
        SchemaType.Optional(
          SchemaType.Union([SchemaType.Boolean(), SchemaType.Null()]),
        ),
      'activationLock.activationLockSupported': SchemaType.Optional(
        SchemaType.Boolean(),
      ),
      'filevault.filevaultEnabled': SchemaType.Optional(SchemaType.Boolean()),
      'filevault.filevaultRecoverykeyType': SchemaType.Optional(
        SchemaType.String(),
      ),
      'filevault.filevaultPrkEscrowed': SchemaType.Optional(
        SchemaType.Boolean(),
      ),
      'filevault.filevaultNextRotation': SchemaType.Optional(
        SchemaType.String(),
      ),
      'filevault.filevaultRegenRequired': SchemaType.Optional(
        SchemaType.Boolean(),
      ),
      'kandjiAgent.agentInstalled': SchemaType.Optional(SchemaType.String()),
      'kandjiAgent.installDate': SchemaType.Optional(SchemaType.String()),
      'kandjiAgent.lastCheckIn': SchemaType.Optional(SchemaType.String()),
      'kandjiAgent.agentVersion': SchemaType.Optional(SchemaType.String()),
      'hardwareOverview.modelName': SchemaType.Optional(SchemaType.String()),
      'hardwareOverview.modelIdentifier': SchemaType.Optional(
        SchemaType.String(),
      ),
      'hardwareOverview.processorName': SchemaType.Optional(
        SchemaType.String(),
      ),
      'hardwareOverview.processorSpeed': SchemaType.Optional(
        SchemaType.String(),
      ),
      'hardwareOverview.numberOfProcessors': SchemaType.Optional(
        SchemaType.String(),
      ),
      'hardwareOverview.totalNumberOfCores': SchemaType.Optional(
        SchemaType.String(),
      ),
      'hardwareOverview.memory': SchemaType.Optional(SchemaType.String()),
      volumes: SchemaType.Optional(SchemaType.Array(SchemaType.String())),
      'network.localHostname': SchemaType.Optional(SchemaType.String()),
      'network.macAddress': SchemaType.Optional(
        SchemaType.String({
          description:
            'This property is deprecated and will be removed in future versions. Please use the macAddress property instead.',
        }),
      ),
      macAddress: SchemaType.Optional(SchemaType.String()),
      'network.ipAddress': SchemaType.Optional(SchemaType.String()),
      'network.publicIp': SchemaType.Optional(SchemaType.String()),
      'users.regularUsers': SchemaType.Optional(
        SchemaType.Array(SchemaType.String()),
      ),
      'users.systemUsers': SchemaType.Optional(
        SchemaType.Array(SchemaType.String()),
      ),
      installedProfiles: SchemaType.Optional(
        SchemaType.Array(SchemaType.String()),
      ),
    }),
  });

export const [AppEntityMetadata, createAppAssignEntity] = createEntityMetadata({
  resourceName: 'App',
  _class: ['Application'],
  _type: createEntityType('app'),
  description: 'Kandji App',
  schema: SchemaType.Object({
    bundleId: SchemaType.String(),
    appStoreVendable: SchemaType.Optional(SchemaType.String()),
    deviceBasedVpp: SchemaType.Optional(SchemaType.String()),
    source: SchemaType.Optional(SchemaType.String()),
    process: SchemaType.Optional(SchemaType.String()),
  }),
});

export const [UserEntityMetadata, createUserAssignEntity] =
  createEntityMetadata({
    resourceName: 'User',
    _class: ['User'],
    _type: createEntityType('user'),
    description: 'Kandji User',
    schema: SchemaType.Object({
      id: SchemaType.String(),
      username: SchemaType.String(),
      email: SchemaType.String(),
      active: SchemaType.Optional(SchemaType.Boolean()),
      isArchived: SchemaType.Optional(SchemaType.Boolean()),
    }),
  });

export const [CustomProfileEntityMetadata, createCustomProfileAssignEntity] =
  createEntityMetadata({
    resourceName: 'Custom_Profile',
    _class: ['Configuration'],
    _type: createEntityType('profile'),
    description: 'Kandji Custom Profile',
    schema: SchemaType.Object({
      active: SchemaType.Optional(SchemaType.Boolean()),
      mdmIdentifier: SchemaType.Optional(SchemaType.String()),
    }),
  });
