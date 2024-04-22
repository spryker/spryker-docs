---
title: Create protected Glue API endpoints
description: Learn how to create the protected endpoint using a resource for the Storefront and backend API applications.
last_updated: Feb 23, 2023
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/create-protected-endpoints.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/how-to-create-protected-endpoints.html
  - /docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-infrastructure/how-to-guides/how-to-create-protected-endpoints.html
  - /docs/scos/dev/glue-api-guides/202204.0/create-protected-glue-api-endpoints.html
  - /docs/scos/dev/glue-api-guides/202404.0/create-protected-glue-api-endpoints.html

---

This document describes how to create a protected endpoint for a resource, or a custom-route in storefront and backend API applications.

## Prerequisites

Integrate authorization into your project. For details, see [Authorization protected endpoints integration](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-protected-endpoints-authorization.html).

## Create protected endpoints

Let's say you have a module named `ModuleRestApi`, where you want to have a new protected endpoint `/module` with `GET` and `POST` methods.  To create the protected endpoint, follow these steps:

1. To `src/Pyz/Shared/GlueStorefrontApiApplicationAuthorizationConnector/GlueStorefrontApiApplicationAuthorizationConnectorConfig.php`, add a route or regular expression for the endpoint:

```php
<?php

namespace Pyz\Shared\GlueStorefrontApiApplicationAuthorizationConnector;

use Spryker\Shared\GlueStorefrontApiApplicationAuthorizationConnector\GlueStorefrontApiApplicationAuthorizationConnectorConfig as SprykerGlueStorefrontApiApplicationAuthorizationConnectorConfig;

class GlueStorefrontApiApplicationAuthorizationConnectorConfig extends SprykerGlueStorefrontApiApplicationAuthorizationConnectorConfig
{
    public function getProtectedPaths(): array
    {
        return [
            // Route added by a full name and provide access for all
            // methods if the token is passed and valid
            '/module' => [
                'isRegularExpression' => false,
            ],
            // Route added by regular expression and provide access for
            // methods patch, get if the token is passed and valid
            '/\/module\/.+/' => [
                'isRegularExpression' => true,
                'methods' => [
                    'patch',
                    'get',
                ],
            ],
        ];
    }
}
```

{% info_block infoBox %}

For backend API, use the appropriate backend-specific class `src/Pyz/Shared/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorConfig.php`.

{% endinfo_block %}

2. Try to access `https://glue-storefront.mysprykershop.com/module` without an access token.
3. Check that the output contains the 403 response with the `Unauthorized request.` message.
4. Access `https://glue-storefront.mysprykershop.com/module`, with a valid access token.
