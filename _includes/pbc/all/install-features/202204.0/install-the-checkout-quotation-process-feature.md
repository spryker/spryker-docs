


This document describes how to integrate the [Quotation Process](/docs/pbc/all/request-for-quote/{{page.version}}/request-for-quote.html) feature into a Spryker project.

## Install feature core

Follow the steps below to install the Quotation Process feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Checkout | {{page.version}} | Install [the Checkout feature](/docs/pbc/all/cart-and-checkout/{{page.version}}install-and-upgrade/install-features/install-the-checkout-feature.html) |
| Quotation Process | {{page.version}} | [Install the Quotation Process feature](/docs/pbc/all/request-for-quote/{{page.version}}/install-and-upgrade/install-features/install-the-quotation-process-feature.html) |

### 1) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| QuoteRequestPreCheckPlugin | Prevents the checkout for quote in the quotation process. | None | Spryker\Zed\QuoteRequest\Communication\Plugin\Checkout |
| CloseQuoteRequestCheckoutPostSaveHookPlugin | Closes a quote request after the order has been placed from it. | None | Spryker\Zed\QuoteRequest\Communication\Plugin\Checkout |

**Pyz\Zed\Checkout\CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\QuoteRequest\Communication\Plugin\Checkout\CloseQuoteRequestCheckoutPostSaveHookPlugin;
use Spryker\Zed\QuoteRequest\Communication\Plugin\Checkout\QuoteRequestPreCheckPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container ’
     *
     * @return \Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface[]
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            new QuoteRequestPreCheckPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPostSaveHookInterface[]
     */
    protected function getCheckoutPostHooks(Container $container)
    {
        return [
            new CloseQuoteRequestCheckoutPostSaveHookPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

On the **Quote request items edit** page, ensure you can't see the **Checkout** button.

Ensure that after you place an order from a quote request, the quote request has the `closed` status.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the [Quotation Process](/docs/pbc/all/request-for-quote/{{page.version}}/request-for-quote.html) feature frontend.

### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Checkout | {{page.version}} | Install [the Checkout feature](/docs/pbc/all/cart-and-checkout/{{page.version}}install-and-upgrade/install-features/install-the-checkout-feature.html) |
| Quotation Process | {{page.version}} | [Install the Quotation Process feature](/docs/pbc/all/request-for-quote/{{page.version}}/install-and-upgrade/install-features/install-the-quotation-process-feature.html) |

### Set up quote request workflow

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| QuoteRequestAgentCheckoutWorkflowStepResolverStrategyPlugin | Modifies checkout steps for agent RFQ edit workflow. | None | SprykerShop\Yves\QuoteRequestAgentPage\Plugin\CheckoutPage |
| QuoteWithCustomShipmentPriceCheckoutWorkflowStepResolverStrategyPlugin | Modifies checkout steps for a quote with source shipment price workflow. | None | SprykerShop\Yves\QuoteRequestPage\Plugin\CheckoutPage |
| QuoteRequestCheckoutWorkflowStepResolverStrategyPlugin | Modifies checkout steps for buyer RFQ edit workflow. | None | SprykerShop\Yves\QuoteRequestPage\Plugin\CheckoutPage |

**Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CheckoutPage;

use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
use SprykerShop\Yves\QuoteRequestAgentPage\Plugin\CheckoutPage\QuoteRequestAgentCheckoutWorkflowStepResolverStrategyPlugin;
use SprykerShop\Yves\QuoteRequestPage\Plugin\CheckoutPage\QuoteRequestCheckoutWorkflowStepResolverStrategyPlugin;
use SprykerShop\Yves\QuoteRequestPage\Plugin\CheckoutPage\QuoteWithCustomShipmentPriceCheckoutWorkflowStepResolverStrategyPlugin;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\CheckoutStepResolverStrategyPluginInterface[]
     */
    protected function getCheckoutStepResolverStrategyPlugins(): array
    {
        return [
            new QuoteRequestCheckoutWorkflowStepResolverStrategyPlugin(),
            new QuoteWithCustomShipmentPriceCheckoutWorkflowStepResolverStrategyPlugin(),
            new QuoteRequestAgentCheckoutWorkflowStepResolverStrategyPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify the following:
* When you add or edit shipping information in RFQ as an agent or a buyer, you have access only to the address and shipment steps.
* If you set the source shipment price as an agent and then convert the RFQ to cart as a buyer, you don't have access to the address and shipment steps.

{% endinfo_block %}
