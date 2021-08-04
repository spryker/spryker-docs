---
title: HowTo - Set Number of Days for a Return Policy
originalLink: https://documentation.spryker.com/2021080/docs/howto-set-number-of-days-for-a-return-policy
redirect_from:
  - /2021080/docs/howto-set-number-of-days-for-a-return-policy
  - /2021080/docs/en/howto-set-number-of-days-for-a-return-policy
---

To define a period within which an item can be returned, redefine the Config in `Pyz\Zed\SalesReturn\SalesReturnConfig` by adding the following there:

`protected const GLOBAL_RETURNABLE_NUMBER_OF_DAYS = {% raw %}{{{% endraw %}Number of days{% raw %}}}{% endraw %};`

where *{% raw %}{{{% endraw %}Number of days{% raw %}}}{% endraw %}* is the time period in days after the item purchase, within which the item can be returned.

Example:
```php
namespace Pyz\Zed\SalesReturn;use Spryker\Zed\SalesReturn\SalesReturnConfig as SprykerSalesReturnConfig;class SalesReturnConfig extends SprykerSalesReturnConfig
{
    protected const GLOBAL_RETURNABLE_NUMBER_OF_DAYS = 30;
}
```


