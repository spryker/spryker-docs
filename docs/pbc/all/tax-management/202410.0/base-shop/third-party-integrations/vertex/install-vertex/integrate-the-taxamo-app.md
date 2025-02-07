---
title: Integrate the Vertex app
description: Find out how you can integrate the Taxamo app into your Spryker shop
draft: true
last_updated: Jan 8, 2025
template: howto-guide-template
---

To [install Taxamo](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/install-vertex.html), you need to update [spryker/tax-app:0.4.0](https://github.com/spryker/tax-app-rest-api) and install the [spryker/tax-app-rest-api](https://github.com/spryker/tax-app-rest-api) module first.

To integrate Taxamo API, follow these steps.

## 1. Configure GlueApplicationDependencyProvider to enable Tax ID validator

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
[Configure Vertex in the Back Office](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/connect-vertex.html)
