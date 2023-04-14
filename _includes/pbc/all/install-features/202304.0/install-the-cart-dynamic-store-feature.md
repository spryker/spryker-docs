
This document describes how to integrate the Cart + Dynamic store feature into a Spryker project.

## Install feature core

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place. The current feature integration guide only adds the *Cart Dynamic store functionality*.

{% endinfo_block %}

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Cart | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require "spryker-feature/cart":"{{site.version}}" --update-with-dependencies
composer require "spryker/quote":"^2.18.0" --update-with-dependencies
```
 

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| Quote | vendor/spryker/quote |
| Cart | vendor/spryker/cart |
| Calculation | vendor/spryker/calculation |
| CartNote | vendor/spryker/cart-note |


{% endinfo_block %}

### 2) Set up behavior


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
