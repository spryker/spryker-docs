---
title: Shipment + Approval Process feature integration
description: This integration guide provides step-by-step instructions on integrating Shipment and Approval Process connector in Spryker Commerce OS.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/shipment-approval-process-feature-integration
originalArticleId: ac858362-21ea-4a7a-8369-b82cee1cc226
redirect_from:
  - /2021080/docs/shipment-approval-process-feature-integration
  - /2021080/docs/en/shipment-approval-process-feature-integration
  - /docs/shipment-approval-process-feature-integration
  - /docs/en/shipment-approval-process-feature-integration
related:
  - title: Approval Process feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/approval-process-feature-integration.html
  - title: Shipment feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/shipment-feature-integration.html
---

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Shipment | {{page.version}} |
| Approval Process | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker/quote-approval-shipment-connector:"^1.0.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| QuoteApprovalShipmentConnector | vendor/spryker/quote-approval-shipment-connector |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration to your project:

**src/Pyz/Shared/QuoteApproval/QuoteApprovalConfig.php**

```php
<?php

namespace Pyz\Shared\QuoteApproval;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Shared\QuoteApproval\QuoteApprovalConfig as SprykerQuoteApprovalConfig;

class QuoteApprovalConfig extends SprykerQuoteApprovalConfig
{
    /**
     * @return bool
     */
    public function isShipmentPriceIncludedInQuoteApprovalPermissionCheck(): bool
    {
        return true;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that shipment is calculated in the sum of the quote for a buyer sending the approval request on a single shipment case.

{% endinfo_block %}

### 3) Set up behavior

#### Set up shipment cost behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ShipmentApplicableForQuoteApprovalCheckPlugin | Checks if quote has all parameters required for shipment calculation. | None | Spryker\Client\QuoteApprovalShipmentConnector\Plugin\QuoteApproval |
| QuoteApprovalShipmentQuoteFieldsAllowedForSavingProviderPlugin | Gets the required shipment quote fields from the configuration if approval request is not canceled on a single shipment case. | None | Spryker\Zed\QuoteApprovalShipmentConnector\Communication\Plugin\Quote |

**src/Pyz/Client/QuoteApproval/QuoteApprovalDependencyProvider.php**

```php
<?php

namespace Pyz\Client\QuoteApproval;

use Spryker\Client\QuoteApproval\QuoteApprovalDependencyProvider as SprykerQuoteApprovalDependencyProvider;
use Spryker\Client\QuoteApprovalShipmentConnector\Plugin\QuoteApproval\ShipmentApplicableForQuoteApprovalCheckPlugin;

class QuoteApprovalDependencyProvider extends SprykerQuoteApprovalDependencyProvider
{
    /**
     * @return \Spryker\Client\QuoteApprovalExtension\Dependency\Plugin\QuoteApplicableForApprovalCheckPluginInterface[]
     */
    protected function getQuoteApplicableForApprovalCheckPlugins(): array
    {
        return [
            new ShipmentApplicableForQuoteApprovalCheckPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;
use Spryker\Zed\QuoteApprovalShipmentConnector\Communication\Plugin\Quote\QuoteApprovalShipmentQuoteFieldsAllowedForSavingProviderPlugin;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
    /**
     * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteFieldsAllowedForSavingProviderPluginInterface[]
     */
    protected function getQuoteFieldsAllowedForSavingProviderPlugins(): array
    {
        return [
            new QuoteApprovalShipmentQuoteFieldsAllowedForSavingProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that a quote without shipment cannot be sent to the approval request.

Make sure that shipment is saved with the quote in the `spy_quote` table after sending an approval request.

{% endinfo_block %}

## Install feature frontend

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| CheckoutPage | {{page.version}} |

### 1) Set up behavior

#### Set up shipment cost behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|QuoteApprovalCheckerCheckoutShipmentStepEnterPreCheckPlugin| Checks if the quote approval status is approved or waiting on the shipment step of the checkout. |None | SprykerShop\Yves\QuoteApprovalWidget\Plugin\CheckoutPage|

**src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CheckoutPage;

use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
use SprykerShop\Yves\QuoteApprovalWidget\Plugin\CheckoutPage\QuoteApprovalCheckerCheckoutShipmentStepEnterPreCheckPlugin;

/**
 * @method \Pyz\Yves\CheckoutPage\CheckoutPageConfig getConfig()
 */
class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\CheckoutShipmentStepEnterPreCheckPluginInterface[]
     */
    protected function getCheckoutShipmentStepEnterPreCheckPlugins(): array
    {
        return [
            new QuoteApprovalCheckerCheckoutShipmentStepEnterPreCheckPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Check that the customer with the sent approval request cannot open the shipment step on the cart page.

{% endinfo_block %}
