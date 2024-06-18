import { URL, URLSearchParams } from 'url';
import fetch, { Response } from 'node-fetch';
import { retry } from '@lifeomic/attempt';

import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from './config';
import {
  Device,
  App,
  DeviceAppsResponse,
  DeviceDetails,
  CustomProfiles,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

export class APIClient {
  constructor(readonly config: IntegrationConfig) {}

  private readonly paginateEntitiesPerPage = 100;
  private readonly baseUri = this.config.apiUrl;

  private withBaseUri = (path: string, params?: Record<string, string>) => {
    const url = new URL(`${this.baseUri}${path}`);
    url.search = new URLSearchParams(params).toString();
    return url.toString();
  };

  private checkStatus = (response: Response) => {
    if (response.ok) {
      return response;
    } else {
      throw new IntegrationProviderAPIError(response);
    }
  };

  public async request<T>(
    uri: string,
    method: 'GET' | 'HEAD' = 'GET',
  ): Promise<T> {
    try {
      const result = await retry<Response>(
        async () => {
          const response = await fetch(uri, {
            method,
            headers: {
              Authorization: `Bearer ${this.config.accessToken}`,
            },
          });

          this.checkStatus(response);

          return response;
        },
        {
          // 10,000 requests per hour
          delay: 1500,
          maxAttempts: 10,
          handleError: (err, context) => {
            if (
              err.statusCode !== 429 ||
              ([500, 400, 401].includes(err.statusCode) &&
                context.attemptNum > 1)
            )
              context.abort();
          },
        },
      );
      return (await result.json()) as T;
    } catch (err) {
      throw new IntegrationProviderAPIError({
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  public async verifyAuthentication(): Promise<void> {
    const endpoint = this.withBaseUri('devices', { limit: '1' });
    try {
      await this.request<Device[]>(endpoint);
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  public async iterateCustomProfiles(
    iteratee: ResourceIteratee<CustomProfiles>,
  ) {
    const endpoint = this.withBaseUri('/api/v1/library/custom-profiles', {
      page: "1",
    });

    const body = await this.request<CustomProfiles[]>(endpoint);
    const results = (body as any).results;

    for (const result of results) {
      await iteratee(result);
    }
  }
  public async iterateDevices(iteratee: ResourceIteratee<Device>) {
    let offset = 0;
    let length = 0;

    do {
      const endpoint = this.withBaseUri('devices', {
        offset: `${offset}`,
        limit: `${this.paginateEntitiesPerPage}`,
      });

      const body = await this.request<Device[]>(endpoint);

      for (const data of body) {
        await iteratee(data);
      }

      offset += this.paginateEntitiesPerPage;
      length = body.length;
    } while (length > 0);
  }

  public async iterateDeviceApps(
    deviceId: string,
    iteratee: ResourceIteratee<App>,
  ) {
    const endpoint = this.withBaseUri(`devices/${deviceId}/apps`);
    const { apps } = await this.request<DeviceAppsResponse>(endpoint);

    for (const app of apps) {
      await iteratee(app);
    }
  }

  public async fetchDeviceDetails(deviceId: string) {
    const endpoint = this.withBaseUri(`devices/${deviceId}/details`);
    return this.request<DeviceDetails>(endpoint);
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
