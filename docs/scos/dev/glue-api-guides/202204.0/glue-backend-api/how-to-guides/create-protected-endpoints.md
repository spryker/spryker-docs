---
title: How to create protected endpoints
description: 
last_updated: September 30, 2022
template: howto-guide-template
---

This guide will show the process of creating the protected endpoint using a resource for the Storefront and Backend API applications.

* * *

Let's say we have a module named `FooApi` where we want to have a new protected endpoint `/foo` with GET and POST methods.

    
Add a route or regular expression for the endpoint into `src/Pyz/Shared/GlueStorefrontApiApplicationAuthorizationConnector/GlueStorefrontApiApplicationAuthorizationConnectorConfig.php` in order to set up it protected.
    

```
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

For Backend API use the appropriate backend-specific class `src/Pyz/Shared/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorConfig.php`


1.  Trying to access `http://glue-storefront.mysprykershop.com/foo` without access token.
    
2.  Check that the output contains the 403 response with message `Unauthorized request.`.
    

Entered valid access token and you should be able to access `http://glue-storefront.mysprykershop.com/foo`.
