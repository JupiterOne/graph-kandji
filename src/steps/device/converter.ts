import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { Device, DeviceDetails } from '../../types';

export function createDeviceEntity(
  device: Device,
  deviceDetails: DeviceDetails,
): Entity {
  const {
    general,
    mdm,
    activation_lock,
    filevault,
    kandji_agent,
    hardware_overview,
    volumes,
    network,
    users,
    installed_profiles,
  } = deviceDetails;
  return createIntegrationEntity({
    entityData: {
      source: {
        ...device,
        ...deviceDetails,
      },
      assign: {
        _key: device.device_id!,
        _type: Entities.DEVICE._type,
        _class: Entities.DEVICE._class,
        id: device?.device_id,
        deviceId: device?.device_id,
        name: device?.device_name,
        make: 'Apple Inc.',
        model: device?.model,
        serial: device?.serial_number,
        category: device?.platform,
        platform: device?.platform === 'Mac' ? 'darwin' : 'ios',
        osVersion: device?.os_version,
        lastCheckinOn: parseTimePropertyValue(device?.last_check_in),
        'user.id': device.user !== '' ? device?.user?.id : null,
        'user.name': device.user !== '' ? device?.user?.name : null,
        'user.email': device.user !== '' ? device?.user?.email : null,
        'user.isArchived':
          device.user !== '' ? device?.user?.is_archived : null,
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
        'general.systemVersion': general?.system_version,
        'general.bootVolume': general?.boot_volume,
        'general.timeSinceBoot': general?.time_since_boot,
        'general.lastUser': general?.last_user,
        'general.assignedUserId': general?.assigned_user?.id,
        'general.assignedUserName': general?.assigned_user?.name,
        'general.assignedUserEmail': general?.assigned_user?.email,
        'general.assignedUserIsArchived': general?.assigned_user?.is_archived,
        'general.blueprintName': general?.blueprint_name,
        'general.blueprintUuid': general?.blueprint_uuid,
        'mdm.mdmEnabled': mdm?.mdm_enabled,
        'mdm.installDate': mdm?.install_date,
        'mdm.lastCheckIn': mdm?.last_check_in,
        'mdm.mdmEnabledUser': mdm?.mdm_enabled_user,
        'activationLock.bypassCodeFailed': activation_lock?.bypass_code_failed,
        'activationLock.userActivationLockEnabled':
          activation_lock?.user_activation_lock_enabled,
        'activationLock.deviceActivationLockEnabled':
          activation_lock?.device_activation_lock_enabled,
        'activationLock.activationLockAllowedWhileSupervised':
          activation_lock?.activation_lock_allowed_while_supervised,
        'activationLock.activationLockSupported':
          activation_lock?.activation_lock_supported,
        'filevault.filevaultEnabled': filevault?.filevault_enabled,
        'filevault.filevaultRecoverykeyType':
          filevault?.filevault_recoverykey_type,
        'filevault.filevaultPrkEscrowed': filevault?.filevault_prk_escrowed,
        'filevault.filevaultNextRotation': filevault?.filevault_next_rotation,
        'filevault.filevaultRegenRequired': filevault?.filevault_regen_required,
        'kandjiAgent.agentInstalled': kandji_agent?.agent_installed,
        'kandjiAgent.installDate': kandji_agent?.install_date,
        'kandjiAgent.lastCheckIn': kandji_agent?.last_check_in,
        'kandjiAgent.agentVersion': kandji_agent?.agent_version,
        'hardwareOverview.modelName': hardware_overview?.model_name,
        'hardwareOverview.modelIdentifier': hardware_overview?.model_identifier,
        'hardwareOverview.processorName': hardware_overview?.processor_name,
        'hardwareOverview.processorSpeed': hardware_overview?.processor_speed,
        'hardwareOverview.numberOfProcessors':
          hardware_overview?.number_of_processors,
        'hardwareOverview.totalNumberOfCores':
          hardware_overview?.total_number_of_cores,
        'hardwareOverview.memory': hardware_overview?.memory,
        volumes: volumes?.map((volume) => volume.identifier),
        'network.localHostname': network?.local_hostname,
        'network.macAddress': network?.mac_address,
        'network.ipAddress': network?.ip_address,
        'network.publicIp': network?.public_ip,
        'users.regularUsers': users?.regular_users?.map((user) => user.uid),
        'users.systemUsers': users?.system_users?.map((user) => user.uid),
        installedProfiles: installed_profiles?.map(
          (installed_profile) => installed_profile.uuid,
        ),
      },
    },
  });
}
