---
title: Migration Guide - API Module
originalLink: https://documentation.spryker.com/2021080/docs/mg-api-module
redirect_from:
  - /2021080/docs/mg-api-module
  - /2021080/docs/en/mg-api-module
---

## Upgrading from Version 0.1.5 to Version 0.2.0

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
