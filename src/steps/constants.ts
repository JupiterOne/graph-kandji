import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const ACCOUNT_ENTITY_KEY = 'entity:account';

export enum IntegrationSteps {
  ACCOUNT = 'fetch-account',
  DEVICES = 'fetch-devices',
  FETCH_DEVICE_USERS = 'fetch-device-users',
  FETCH_DEVICE_APPS = 'fetch-device-apps',
}

export const Entities: Record<
  'ACCOUNT' | 'DEVICE' | 'APP' | 'USER',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'kandji_account',
    _class: ['Account'],
  },
  DEVICE: {
    resourceName: 'Device',
    _type: 'kandji_device',
    _class: ['Device'],
    schema: {
      properties: {
        id: { type: 'string' },
        deviceId: { type: 'string' },
        name: { type: 'string' },
        make: { type: 'string' },
        model: { type: 'string' },
        serial: { type: 'string' },
        category: { type: 'string' },
        platform: { type: 'string' },
        osVersion: { type: 'string' },
        lastCheckinOn: { type: 'number' },
        'user.id': { type: ['number', 'null'] },
        'user.name': { type: ['string', 'null'] },
        'user.email': { type: ['string', 'null'] },
        'user.isArchived': { type: ['boolean', 'null'] },
        assetTag: { type: 'string' },
        blueprintId: { type: 'string' },
        blueprintName: { type: 'string' },
        mdmEnabled: { type: 'boolean' },
        agentInstalled: { type: 'boolean' },
        isMissing: { type: 'boolean' },
        isRemoved: { type: 'boolean' },
        agentVersion: { type: 'string' },
        firstEnrollmentOn: { type: 'number' },
        lastEnrollmentOn: { type: 'number' },
      },
      required: ['id', 'category', 'make', 'model', 'serial', 'deviceId'],
    },
  },
  APP: {
    resourceName: 'App',
    _type: 'kandji_app',
    _class: ['Application'],
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        bundleId: { type: 'string' },
        bundleSize: { type: 'string' },
        appStoreVendable: { type: 'string' },
        deviceBasedVpp: { type: 'string' },
        source: { type: 'string' },
        process: { type: 'string' },
        signature: { type: 'string' },
        createdOn: { type: 'number' },
        updatedOn: { type: 'number' },
        path: { type: 'string' },
        version: { type: 'string' },
      },
      required: ['bundleId'],
    },
  },
  USER: {
    resourceName: 'User',
    _type: 'kandji_user',
    _class: ['User'],
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        username: { type: 'string' },
        active: { type: 'boolean' },
        isArchived: { type: 'boolean' },
      },
      required: ['id', 'username', 'email'],
    },
  },
};

export const Relationships: Record<
  'ACCOUNT_HAS_DEVICE' | 'DEVICE_HAS_APP' | 'DEVICE_HAS_USER',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_DEVICE: {
    _type: 'kandji_account_has_device',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DEVICE._type,
  },
  DEVICE_HAS_APP: {
    _type: 'kandji_device_has_app',
    sourceType: Entities.DEVICE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.APP._type,
  },
  DEVICE_HAS_USER: {
    _type: 'kandji_device_has_user',
    sourceType: Entities.DEVICE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
};
