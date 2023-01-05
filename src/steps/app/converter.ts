import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { App } from '../../types';

// We have seen issues switching to using the bundle ID for
// key generation where the value comes back as 'No value'
// or an empty string.  In this instance, we need to fall
// back to the app name or app ID.  Using the app ID for now
// since it is a guaranteed value and is guaranteed to be
// unique.
export function getKeyId(app: App): string {
  if (app.bundle_id === 'No value' || app.bundle_id === '') {
    return app.app_id;
  } else {
    return app.bundle_id;
  }
}

export function getAppKey(app: App): string {
  return `kandji_app:${getKeyId(app)}`;
}

// Manually construct the key for this relationship so we can use the appId
// to guarantee uniqueness.  Instances where multiple versions of the same
// app being installed will be handled by having multiple relationships to
// the same kandji_app.
export function getDeviceHasAppKey(deviceKey: string, appId: string): string {
  return `${deviceKey}|has|kandji_app:${appId}`;
}

export function createAppEntity(app: App): Entity {
  return createIntegrationEntity({
    entityData: {
      source: app,
      assign: {
        _key: getAppKey(app),
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
