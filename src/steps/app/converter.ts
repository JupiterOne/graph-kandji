import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { App } from '../../types';

export function getAppKey(id: string): string {
  return `kandji_app:${id}`;
}

export function createAppEntity(app: App): Entity {
  return createIntegrationEntity({
    entityData: {
      source: app,
      assign: {
        _key: getAppKey(app.app_id),
        _type: Entities.APP._type,
        _class: Entities.APP._class,
        id: app.app_id,
        name: app.app_name,
        bundleId: app.bundle_id,
        bundleSize: app.bundle_size,
        appStoreVendable: app.app_store_vendable,
        deviceBasedVpp: app.device_based_vpp,
        source: app.source,
        process: app.process,
        signature: app.signature,
        createdOn: parseTimePropertyValue(app.creation_date),
        updatedOn: parseTimePropertyValue(app.modification_date),
        path: app.path,
        version: app.version,
      },
    },
  });
}
