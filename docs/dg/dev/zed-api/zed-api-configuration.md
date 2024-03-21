---
title: Zed API configuration
description: The article describes how you can configure API for Zed.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/zed-api-config
originalArticleId: 592edd6f-aa46-4ca9-be39-8defd80c4da3
redirect_from:
  - /docs/scos/dev/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/201811.0/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/201903.0/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/201907.0/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/202001.0/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/202005.0/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/202009.0/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/202108.0/zed-api/zed-api-configuration.html
  - /docs/scos/dev/sdk/zed-api/zed-api-configuration.html
related:
  - title: Zed API (Beta)
    link: docs/scos/dev/sdk/zed-api/zed-api-beta.html
  - title: Zed API resources
    link: docs/scos/dev/sdk/zed-api/zed-api-resources.html
  - title: Zed API CRUD functionality
    link: docs/scos/dev/sdk/zed-api/zed-api-crud-functionality.html
  - title: Zed API processor stack
    link: docs/scos/dev/sdk/zed-api/zed-api-processor-stack.html
  - title: Zed API project implementation
    link: docs/scos/dev/sdk/zed-api/zed-api-project-implementation.html
---
{% info_block warningBox "Warning" %}

Zed API, initially released as a beta version, is now considered outdated and is no longer being developed. Instead of it, we recommend using [Glue Backend API](/docs/dg/dev/glue-api/{{site.version}}/decoupled-glue-api.html#new-type-of-application-glue-backend-api-application).

{% endinfo_block %}

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
