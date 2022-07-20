import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { Device } from '../../types';

export function createDeviceEntity(device: Device): Entity {
  return createIntegrationEntity({
    entityData: {
      source: device,
      assign: {
        _key: device.device_id,
        _type: Entities.DEVICE._type,
        _class: Entities.DEVICE._class,
        id: device.device_id,
        deviceId: device.device_id,
        name: device.device_name,
        make: 'Apple Inc.',
        model: device.model,
        serial: device.serial_number,
        category: device.platform,
        platform: device.platform === 'Mac' ? 'darwin' : 'ios',
        osVersion: device.os_version,
        lastCheckinOn: parseTimePropertyValue(device.last_check_in),
        'user.id': device.user !== '' ? device.user.id : null,
        'user.name': device.user !== '' ? device.user.name : null,
        'user.email': device.user !== '' ? device.user.email : null,
        'user.isArchived': device.user !== '' ? device.user.is_archived : null,
        assetTag: device.asset_tag,
        blueprintId: device.blueprint_id,
        blueprintName: device.blueprint_name,
        mdmEnabled: device.mdm_enabled,
        agentInstalled: device.agent_installed,
        isMissing: device.is_missing,
        isRemoved: device.is_removed,
        agentVersion: device.agent_version,
        firstEnrollmentOn: parseTimePropertyValue(device.first_enrollment),
        lastEnrollmentOn: parseTimePropertyValue(device.last_enrollment),
      },
    },
  });
}
