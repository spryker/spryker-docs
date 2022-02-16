---
title: Migration guide - Api
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-api-module
originalArticleId: b7469470-9434-412a-9852-3158d301317d
redirect_from:
  - /2021080/docs/mg-api-module
  - /2021080/docs/en/mg-api-module
  - /docs/mg-api-module
  - /docs/en/mg-api-module
  - /v2/docs/mg-api-module
  - /v2/docs/en/mg-api-module
  - /v3/docs/mg-api-module
  - /v3/docs/en/mg-api-module
  - /v4/docs/mg-api-module
  - /v4/docs/en/mg-api-module
  - /v5/docs/mg-api-module
  - /v5/docs/en/mg-api-module
  - /v6/docs/mg-api-module
  - /v6/docs/en/mg-api-module
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-api-module.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-api-module.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-api-module.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-api-module.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-api-module.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-api-module.html
  - /docs/scos/dev/module-migration-guides/migration-guide-api-module.html
---

## Upgrading from version 0.1.5 to version 0.2.0

Version 0.2.0 of the Api module introduces a default behavior to disable legacy Zed API for security reasons.
Some projects actively use and develop Zed API. To continue using legacy Zed API, one has to override the method `isApiEnabled` of the `ApiConfig` class in your project implementation:

1. Create a new class `ApiConfig` in Pyz and extend the base class:

src/Pyz/Zed/Api/ApiConfig.php

```php
namespace Pyz\Zed\Api;

use Spryker\Zed\Api\ApiConfig as SprykerApiConfig;

class ApiConfig extends SprykerApiConfig
{
}
```

2. Override `isApiEnabled`  method and return true:

```php

namespace Pyz\Zed\Api;

use Spryker\Zed\Api\ApiConfig as SprykerApiConfig;

class ApiConfig extends SprykerApiConfig
{
    /**
     * @return bool
     */
    public function isApiEnabled(): bool
    {
        return true;
    }
}
```

3. Check that API is available again.
