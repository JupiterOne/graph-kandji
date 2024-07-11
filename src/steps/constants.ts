import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';
import {
  AccountEntityMetadata,
  AppEntityMetadata,
  CustomProfileEntityMetadata,
  DeviceEntityMetadata,
  UserEntityMetadata,
  BlueprintEntityMetadata,
} from '../entities';

export const ACCOUNT_ENTITY_KEY = 'entity:account';

export enum IntegrationSteps {
  ACCOUNT = 'fetch-account',
  DEVICES = 'fetch-devices',
  FETCH_DEVICE_USERS = 'fetch-device-users',
  FETCH_DEVICE_APPS = 'fetch-device-apps',
  FETCH_CUSTOM_PROFILES = 'fetch-custom-profiles',
  FETCH_BLUEPRINTS = 'fetch-blueprints',
}

export const Entities: Record<
  'ACCOUNT' | 'DEVICE' | 'APP' | 'USER' | 'CUSTOM_PROFILE' | 'BLUEPRINT',
  StepEntityMetadata
> = {
  ACCOUNT: AccountEntityMetadata,
  DEVICE: DeviceEntityMetadata,
  APP: AppEntityMetadata,
  USER: UserEntityMetadata,
  CUSTOM_PROFILE: CustomProfileEntityMetadata,
  BLUEPRINT: BlueprintEntityMetadata,
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_DEVICE'
  | 'DEVICE_INSTALLED_APP'
  | 'DEVICE_HAS_USER'
  | 'DEVICE_ASSIGNED_BLUEPRINT'
  | 'DEVICE_ASSIGNED_PROFILE',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_DEVICE: {
    _type: 'kandji_account_has_device',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.DEVICE._type,
  },
  DEVICE_INSTALLED_APP: {
    _type: 'kandji_device_installed_app',
    sourceType: Entities.DEVICE._type,
    _class: RelationshipClass.INSTALLED,
    targetType: Entities.APP._type,
  },
  DEVICE_HAS_USER: {
    _type: 'kandji_device_has_user',
    sourceType: Entities.DEVICE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  DEVICE_ASSIGNED_BLUEPRINT: {
    _type: 'kandji_device_assigned_blueprint',
    sourceType: Entities.DEVICE._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.BLUEPRINT._type,
  },
  DEVICE_ASSIGNED_PROFILE: {
    _type: 'kandji_device_assigned_profile',
    sourceType: Entities.DEVICE._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.CUSTOM_PROFILE._type,
  },
};
