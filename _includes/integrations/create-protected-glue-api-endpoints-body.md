This document describes how to create a protected endpoint for a resource, or a custom-route in Backend API applications.

## Prerequisites

Integrate authorization into your project. For details, see [Authorization protected endpoints integration](/docs/integrations/spryker-glue-api/backend-api/integrate-backend-api/integrate-the-protected-endpoints-authorization.html).

## Create protected endpoints

Let's say you have a module named `ModuleBackendApi`, where you want to have a new protected endpoint `/module` with `GET` and `POST` methods. To create the protected endpoint, follow these steps:

1. Add a route or regular expression for the endpoint:

<details>
  <summary>src/Pyz/Shared/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorConfig.php</summary>

```php
<?php

namespace Pyz\Shared\GlueBackendApiApplicationAuthorizationConnector;

use Spryker\Shared\GlueBackendApiApplicationAuthorizationConnector\GlueBackendApiApplicationAuthorizationConnectorConfig as SprykerGlueBackendApiApplicationAuthorizationConnectorConfig;

class GlueBackendApiApplicationAuthorizationConnectorConfig extends SprykerGlueBackendApiApplicationAuthorizationConnectorConfig
{
    /**
     * Specification:
     * - Returns a list of protected endpoints.
     * - Structure example:
     * [
     *      '/example' => [
     *          'isRegularExpression' => false,
     *      ],
     *      '/\/example\/.+/' => [
     *          'isRegularExpression' => true,
     *          'methods' => [
     *              'patch',
     *              'delete',
     *          ],
     *      ],
     * ]
     *
     * @api
     *
     * @return array<string, mixed>
     */
    public function getProtectedPaths(): array
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

</details>

2. Try to access `https://glue-backend.mysprykershop.com/module` without an access token.
3. Check that the output contains the 403 response with the `Unauthorized request.` message.
4. Access `https://glue-backend.mysprykershop.com/module`, with a valid access token.