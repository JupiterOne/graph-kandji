export interface DeviceUser {
  email: string;
  name: string;
  id: number;
  is_archived: boolean;
}

interface SystemUser {
  username: string;
  uid: string;
  path: string;
  admin: string;
}

type RegularUser = SystemUser & { name: string };

interface Storage {
  name: string;
  format: string;
  percent_used: string;
  identifier: string;
  capacity: string;
  available: string;
  encrypted: string;
}

interface Profile {
  name: string;
  uuid: string;
  verified: string;
  identifier: string;
  organization: string;
  payload_types: string[];
  install_date: string;
}

export interface Device {
  device_id?: string;
  device_name?: string;
  model?: string;
  serial_number?: string;
  platform?: string;
  os_version?: string;
  last_check_in?: string;
  user?: DeviceUser | '';
  asset_tag?: string;
  blueprint_id?: string;
  mdm_enabled?: boolean;
  agent_installed?: boolean;
  is_missing?: boolean;
  is_removed?: boolean;
  agent_version?: string;
  first_enrollment?: string;
  last_enrollment?: string;
  blueprint_name?: string;
}

export interface DeviceDetails {
  general?: {
    device_id?: string;
    device_name?: string;
    last_enrollment?: string;
    first_enrollment?: string;
    model?: string;
    platform?: string;
    os_version?: string;
    system_version?: string;
    boot_volume?: string;
    time_since_boot?: string;
    last_user?: string;
    asset_tag?: string;
    assigned_user?: DeviceUser;
    blueprint_name?: string;
    blueprint_uuid?: string;
  };
  mdm?: {
    mdm_enabled?: string;
    install_date?: string;
    last_check_in?: string;
    mdm_enabled_user?: string[];
  };
  activation_lock?: {
    bypass_code_failed?: boolean;
    user_activation_lock_enabled?: boolean;
    device_activation_lock_enabled?: boolean;
    activation_lock_allowed_while_supervised?: boolean | null;
    activation_lock_supported?: boolean;
  };
  filevault?: {
    filevault_enabled?: boolean;
    filevault_recoverykey_type?: string;
    filevault_prk_escrowed?: boolean;
    filevault_next_rotation?: string;
    filevault_regen_required?: boolean;
  };
  automated_device_enrollment?: {};
  kandji_agent?: {
    agent_installed?: string;
    install_date?: string;
    last_check_in?: string;
    agent_version?: string;
  };
  hardware_overview?: {
    model_name?: string;
    model_identifier?: string;
    processor_name?: string;
    processor_speed?: string;
    number_of_processors?: string;
    total_number_of_cores?: string;
    memory?: string;
  };
  volumes?: Storage[];
  network?: {
    local_hostname?: string;
    mac_address?: string;
    ip_address?: string;
    public_ip?: string;
  };
  users?: {
    regular_users?: RegularUser[];
    system_users?: SystemUser[];
  };
  installed_profiles?: Profile[];
  apple_business_manager?: {};
}

export interface App {
  app_id: string;
  app_name: string;
  bundle_id: string;
  bundle_size: string;
  app_store_vendable: string;
  device_based_vpp: string;
  source: string;
  process: string;
  signature: string;
  creation_date: string;
  modification_date: string;
  path: string;
  version: string;
}

export interface DeviceAppsResponse {
  device_id: string;
  apps: App[];
}
