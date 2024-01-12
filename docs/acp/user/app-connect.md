---
title: ACP App Connection and Configuration
description: This document provides information on connecting, configuring, and disconnecting an ACP App using AppRegistry.
template: howto-guide-template
---

This document provides comprehensive information on connecting, configuring, and disconnecting an ACP (AppConnectionProvider) App using the AppRegistry in the Spryker Commerce OS (SCOS) environment. Communication between the ACP App and SCOS is facilitated through the AppRegistry via REST API and message queues.

### Communication Process:

1. **App Registration:**
    - The App registers in the AppRegistry and provides manifest(s).

2. **Tenant Registration:**
    - The Tenant registers in the AppRegistry and gains access to the list of registered Apps.

3. **Connecting an App:**
    - The Tenant initiates the connection process by calling the `apps/connect` endpoint of the AppRegistry.

4. **Endpoint Invocation:**
    - AppRegistry, in turn, calls the `apps/connect` endpoint of the respective App.

This process enables Tenants to send API requests to the ACP App and enqueue messages. Conversely, the ACP App can send API requests to the AppRegistry and enqueue messages.

![Communication Diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/dev/app-endpoint/architecture-owerview.png)

## Registering an App in the AppRegistry

To register your App, utilize the following console command:
```bash
docker/sdk cli vendor/bin/acp app:register --appIdentifier {YOUR APP IDENTIFIER} --registryUrl http://glue.registry.spryker.local --baseUrl "http://{YOUR APPS BASE URL e.g. stripe.spryker.local}" --authorizationToken 123455 -v
```

## Connect an App to Teant

The `spryker/app-kernel` module contains all the necessary code to interact with the AppStoreCatalog, enabling the persistence and retrieval of configurations for a given App.

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

Now, check if the previously created configuration in the spy_app_config table has been removed from your database.
