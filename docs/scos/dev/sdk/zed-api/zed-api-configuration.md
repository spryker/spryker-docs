---
title: Zed API configuration
description: The article describes how you can configure API for Zed.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/zed-api-config
originalArticleId: 592edd6f-aa46-4ca9-be39-8defd80c4da3
redirect_from:
  - /2021080/docs/zed-api-config
  - /2021080/docs/en/zed-api-config
  - /docs/zed-api-config
  - /docs/en/zed-api-config
  - /v6/docs/zed-api-config
  - /v6/docs/en/zed-api-config
  - /v5/docs/zed-api-config
  - /v5/docs/en/zed-api-config
  - /v4/docs/zed-api-config
  - /v4/docs/en/zed-api-config
  - /v3/docs/zed-api-config
  - /v3/docs/en/zed-api-config
  - /v2/docs/zed-api-config
  - /v2/docs/en/zed-api-config
  - /v1/docs/zed-api-config
  - /v1/docs/en/zed-api-config
  - /docs/scos/dev/sdk/201811.0/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/201903.0/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/201907.0/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/202001.0/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/202005.0/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/202009.0/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/202108.0/zed-api/zed-api-configuration.html
---

First of all we need to decide on the resources being exposed. Those will be mapped inside the `ApiDependencyProvider`:

```php
<?php

namespace Pyz\Zed\Api;

use Spryker\Zed\Api\ApiDependencyProvider as SprykerApiDependencyProvider;
use Spryker\Zed\CustomerApi\Communication\Plugin\Api\CustomerApiResourcePlugin;
use Spryker\Zed\ProductApi\Communication\Plugin\Api\ProductApiResourcePlugin;

class ApiDependencyProvider extends SprykerApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\Api\Dependency\Plugin\ApiResourcePluginInterface[]
     */
    protected function getApiResourcePluginCollection(): array
    {
        return [
            new CustomerApiResourcePlugin(),
            new ProductApiResourcePlugin(),
            ...
        ];
    }
}
```

Each resource plugin contains a `getResourceName()` which will map to the resource name of the URL. Those can also be versioned or customized if necessary.

Example: If you create a `CustomerApiResourcePlugin` containing `customer-groups` as a resource name, the API resource URL is then API prefix (/api/rest/) + resource name, in this case `/api/rest/customer-groups`.
