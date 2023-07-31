{% info_block warningBox %}

Please note that Dynamic Multistore is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %} 
This document describes how to integrate the Dynamic Store + Cart feature into a Spryker project.

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Cart | {{page.version}} |

### Set up behavior


Register the following plugins:

| PLUGIN                                      | SPECIFICATION                                                                                                                             | PREREQUISITES      | NAMESPACE                                                |
|---------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|--------------------|----------------------------------------------------------|
| QuoteSyncDatabaseStrategyReaderPlugin       | Sets retrieved quote from Persistence in session storage in case of persistent strategy and `QuoteTransfer.id` is empty.                  | None               | Spryker\Zed\PriceCartConnector\Communication\Plugin      |



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
            new QuoteSyncDatabaseStrategyReaderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure Zed request is made in case of persistent strategy and `QuoteTransfer.id` is empty. Also, make sure that a quote is retrieved from Persistence using the provided customer in case of persistent strategy and `QuoteTransfer.id` is empty. 
Finally, make sure that the retrieved quote from Persistence is set in session storage in case of persistent strategy and `QuoteTransfer.id` is empty.

{% endinfo_block %}
