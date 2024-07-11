# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 1.3.4 - 2024-07-11

### Updated

- Updated the account entity to include the newly required `vendor` field.
- Updated the sdk to version 13.2.0 to regenerate the schemas with the correct
  format.

## 1.3.2 - 2024-06-27

### Fixed

- Fixed the custom-profile endpoint.

## 1.3.1 - 2024-06-26

### Updated

- Integration entities use createIntegrationHelpers (publish types and fix any
  schema inconsistencies).
- `integration-sdk-*` packages bumped to the latest version (12.8.3).

## 1.2.0 - 2023-05-12

### Added

- The following new properties are added to `kandji_device`

  | Property       | Type     |
  | -------------- | -------- |
  | `lastSeenOn`   | `number` |
  | `serialNumber` | `string` |

## 1.1.3 - 2023-04-24

### Changed

- Added property `macAddress` to Device entity.

## 1.1.1 - 2023-01-05

### Changed

- When bundle ID is unavailable for a `kandji_app` fall back to using the
  application ID for key generation.

## 1.1.0 - 2023-01-03

### Changed

- `kandji_app` now uses the bundle ID to generate its key.

## 1.0.0 - 2022-09-20

- Ingest new entities
  - `kandji_account`
  - `kandji_app`
  - `kandji_device`
  - `kandji_user`
- Build new relationships
  - `kandji_account_has_device`
  - `kandji_device_has_app`
  - `kandji_device_has_user`
