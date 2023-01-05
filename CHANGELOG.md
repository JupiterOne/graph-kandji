# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
