---
title: Integrate Vertex Validator
description: Find out how you can integrate the Vertex Validator into your Spryker shop
last_updated: Jan 8, 2025
template: howto-guide-template
---

To integrate the Vertex Validator, follow the steps:

1. Update [spryker/tax-app](https://github.com/spryker/tax-app) to `0.4.0` and install the [spryker/tax-app-rest-api](https://github.com/spryker/tax-app-rest-api) module:

```bash
composer require spryker/tax-app-rest-api:"^0.1.0" --update-with-dependencies
```


2. To integrate the Vertex Validator API, configure `GlueApplicationDependencyProvider` to enable the Tax ID validation:

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\TaxAppRestApi\Plugin\TaxValidateIdResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
     /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            //....
            new TaxValidateIdResourceRoutePlugin(),
        ];
    }

}
```

## Next step

[Connect Vertex](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/connect-vertex.html)
