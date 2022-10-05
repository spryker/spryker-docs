---
title: How to create protected endpoints
description: This guide shows how to create the protected endpoint using a resource for the Storefront and Backend API applications.
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/create-protected-endpoints.html
---

This guide shows how to create the protected endpoint using a resource for the Storefront and Backend API applications.

Let's say you have a module named `FooApi`, where you want to have a new protected endpoint `/foo` with `GET` and `POST` methods. For this, follow these steps:

1. Add a route or regular expression for the endpoint to `src/Pyz/Shared/GlueStorefrontApiApplicationAuthorizationConnector/GlueStorefrontApiApplicationAuthorizationConnectorConfig.php` to set up it protected:

```php
<?php

namespace Pyz\Shared\GlueStorefrontApiApplicationAuthorizationConnector;

use Spryker\Shared\GlueStorefrontApiApplicationAuthorizationConnector\GlueStorefrontApiApplicationAuthorizationConnectorConfig as SprykerGlueStorefrontApiApplicationAuthorizationConnectorConfig;

class GlueStorefrontApiApplicationAuthorizationConnectorConfig extends SprykerGlueStorefrontApiApplicationAuthorizationConnectorConfig
{
    public function getProtectedPaths(): array
    {
        return [
            // Route added by fully name and provide access for all
            // methods if the token is passed and valid
            '/foo' => [
                'isRegularExpression' => false,
            ],
            // Route added by regular expression and provide access for 
            // methods patch, get if the token is passed and valid
            '/\/foo\/.+/' => [
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

For Backend API, use the appropriate backend-specific class `src/Pyz/Shared/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorConfig.php`.

{% endinfo_block %}

2. Try to access `https://glue-storefront.mysprykershop.com/foo` without an access token.
3. Check that the output contains the 403 response with the `Unauthorized request.` message.
4. To access `https://glue-storefront.mysprykershop.com/foo`, enter a valid access token.
