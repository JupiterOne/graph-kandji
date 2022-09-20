# Development

This integration focuses on [Kandji](https://www.kandji.io/) and is using
[Kandji API](https://api.kandji.io/) for interacting with Kandji resources.

## Provider account setup

### In Kandji

1. Login to your Kandji subdomain.

- This is usually in the format of `https://{subdomain}.kandji.io/`

2. Got to Settings > Access > API Token. If you don't see this, contact the
   server admin.
3. Click "Add Token"
4. Set a token name and description (optional). Once set, make sure to copy the
   API token. You won't be able to see this again.
5. Configure API permissions. The Kandji integration needs the following
   permissions.

- Device list `GET /devices`
- Device details `GET /devices/{device_id}/details`
- Application list `GET /devices/{device_id}/apps`

6. Once you are finished with configuration, you should be able to see the
   organization API URL under the API token section.
7. Use the organization API URL for `API_URL` and API token for `ACCESS_TOKEN`

## Authentication

Provide the `API_URL` and `ACCESS_TOKEN` to the `.env`. You can use
[`.env.example`](../.env.example) as a reference.

The Access token will be used to authorize requests to the `API_URL`.
