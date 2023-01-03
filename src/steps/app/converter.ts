import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { App } from '../../types';

export function getAppKey(bundleId: string): string {
  return `kandji_app:${bundleId}`;
}

export function createAppEntity(app: App): Entity {
  return createIntegrationEntity({
    entityData: {
      source: app,
      assign: {
        _key: getAppKey(app.bundle_id),
        _type: Entities.APP._type,
        _class: Entities.APP._class,
        name: app.app_name,
        bundleId: app.bundle_id,
        appStoreVendable: app.app_store_vendable,
        deviceBasedVpp: app.device_based_vpp,
        source: app.source,
        process: app.process,
      },
    },
  });
}
