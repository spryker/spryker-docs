---
title: Connect an app
description: Learn how to connect, configure, and disconnect an ACP app using AppRegistry.
template: howto-guide-template
last_updated: Jan 17, 2024
redirect_from:
- /docs/acp/user/connect-an-app.html
- /docs/acp/user/develop-an-app/connect-an-app.html
---

This document describes how to connect, configure, and disconnect an ACP app (AppConnectionProvider) using the AppRegistry in the Spryker Cloud Commerce OS (SCCOS) environment. Communication between the ACP app and SCCOS is facilitated through the AppRegistry via REST API and message queues.

## Communication process

The communication process between an ACP app and SCCOS includes the following stages:

1. App registration: The app registers in the AppRegistry and provides the manifests.
2. Tenant registration: The tenant registers in the AppRegistry and gains access to the list of registered apps.
3. Connecting an app: The Tenant initiates the connection process by calling the `apps/connect` endpoint of the AppRegistry.
4. Endpoint invocation: AppRegistry, in turn, calls the `apps/connect` endpoint of the respective app.

This process enables tenants to send API requests to the ACP app and enqueue messages. Conversely, the ACP App can send API requests to the AppRegistry and enqueue messages.

![communication-diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/acp-app-connection-and-configuration/architecture-overview.png)

## Register an app in the AppRegistry

To register your app, run the following command:

```bash
docker/sdk cli vendor/bin/acp app:register --appIdentifier {YOUR APP IDENTIFIER} --registryUrl http://glue.registry.spryker.local --baseUrl "http://{YOUR APPS BASE URL e.g. stripe.spryker.local}" --authorizationToken 123455 -v
```

## Connect an app to a tenant

The `spryker/app-kernel` module contains all the necessary code to interact with ACP App Catalog, enabling the persistence and retrieval of configurations for a given app.

## Test the endpoints

You can now test the `configure` request with the following snippets. Run the cURL snippets from your host machine.

### Test the /private/configure endpoint

```bash
curl --location --request POST 'http://my-app.de.spryker.local/private/configure' \
--header 'Content-Type: application/vnd.api+json' \
--header 'Accept: application/vnd.api+json' \
--header 'Accept-Language: en-US, en;q=0.9,*;q=0.5' \
--header 'X-Tenant-Identifier: dev-US' \
--data-raw '{
    "data": {
        "type": "configuration",
        "attributes": {
            "configuration": "{\"clientId\":\"clientId\",\"clientSecret\":\"clientSecret\",\"securityUri\":\"securityUri\",\"transactionCallsUri\":\"transactionCallsUri\",\"isActive\": false,\"isInvoicingEnabled\": false}"
        }
    }
}'
```

Now, check if your database contains the newly created configuration in the `spy_app_config` table.

### Test the /private/disconnect endpoint

```bash
curl --location --request POST 'http://my-app.de.spryker.local/private/disconnect' \
--header 'Content-Type: application/vnd.api+json' \
--header 'Accept: application/vnd.api+json' \
--header 'Accept-Language: de-DE, en;q=0.9,*;q=0.5' \
--header 'X-Tenant-Identifier: dev-US' \
--data-raw ''
```

Now, check if the previously created configuration in the `spy_app_config` table has been removed from your database.
