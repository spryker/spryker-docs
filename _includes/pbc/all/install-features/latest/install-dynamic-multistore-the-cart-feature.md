This document describes how to install [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/latest/base-shop/dynamic-multistore-feature-overview.html) + the [Cart](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/cart-feature-overview/cart-feature-overview.html) feature.

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Cart | {{page.version}} |

### Set up behavior

Register the following plugins:

| PLUGIN                                      | SPECIFICATION                                                                                                                             | PREREQUISITES      | NAMESPACE                                                |
|---------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|--------------------|----------------------------------------------------------|
| QuoteSyncDatabaseStrategyReaderPlugin       | If persistent strategy is used and `QuoteTransfer.id` is empty, sets the quote retrieved from Persistence in session storage.                  | None               | Spryker\Zed\PriceCartConnector\Communication\Plugin      |


**src/Pyz/Client/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Quote;

use Spryker\Client\PersistentCart\Plugin\Quote\QuoteSyncDatabaseStrategyReaderPlugin;
use Spryker\Client\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
    /**
     * @return array<\Spryker\Client\QuoteExtension\Dependency\Plugin\DatabaseStrategyReaderPluginInterface>
     */
    protected function getDatabaseStrategyReaderPlugins(): array
    {
        return [
            ...
            new QuoteSyncDatabaseStrategyReaderPlugin(),
            ...
        ];
    }
}
```

{% info_block warningBox "Verification" %}

When a persistent strategy is used and `QuoteTransfer.id` is empty, make sure the following happens:

1. A Zed request is made.
2. Using the provided customer, a quote is retrieved from Persistence.
3. The quote retrieved from Persistence is set in session storage.

{% endinfo_block %}
