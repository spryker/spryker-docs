---
title: Set number of days for a return policy
description: The document describes how to set a number of days for a Return Policy in your Spryker based projects.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-set-number-of-days-for-a-return-policy
originalArticleId: 6211b701-75ae-4ac9-8d98-94972cc1f91b
redirect_from:
  - /2021080/docs/howto-set-number-of-days-for-a-return-policy
  - /2021080/docs/en/howto-set-number-of-days-for-a-return-policy
  - /docs/howto-set-number-of-days-for-a-return-policy
  - /docs/en/howto-set-number-of-days-for-a-return-policy
  - /v6/docs/howto-set-number-of-days-for-a-return-policy
  - /v6/docs/en/howto-set-number-of-days-for-a-return-policy
  - /v5/docs/howto-set-number-of-days-for-a-return-policy
  - /v5/docs/en/howto-set-number-of-days-for-a-return-policy
  - /docs/scos/dev/tutorials/202005.0/howtos/feature-howtos/howto-set-number-of-days-for-a-return-policy.html
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-set-number-of-days-for-a-return-policy.html
  - /docs/pbc/all/return-management/202311.0/howto-set-number-of-days-for-a-return-policy.html
  - /docs/pbc/all/return-management/202204.0/base-shop/set-number-of-days-for-a-return-policy.html
---

To define a period within which an item can be returned, in `Pyz\Zed\SalesReturn\SalesReturnConfig`, redefine the config by adding the following:

`protected const GLOBAL_RETURNABLE_NUMBER_OF_DAYS = {% raw %}{{{% endraw %}Number of days{% raw %}}}{% endraw %};`

Where _{% raw %}{{{% endraw %}`Number of days`{% raw %}}}{% endraw %}_ is the time period in days after the item purchase within which the item can be returned.

Example:

```php
namespace Pyz\Zed\SalesReturn;use Spryker\Zed\SalesReturn\SalesReturnConfig as SprykerSalesReturnConfig;class SalesReturnConfig extends SprykerSalesReturnConfig
{
    protected const GLOBAL_RETURNABLE_NUMBER_OF_DAYS = 30;
}
```
