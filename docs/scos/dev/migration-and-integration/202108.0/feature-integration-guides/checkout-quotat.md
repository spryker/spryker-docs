---
title: Checkout + quotation process feature integration
originalLink: https://documentation.spryker.com/2021080/docs/checkout-quotation-process-feature-integration
redirect_from:
  - /2021080/docs/checkout-quotation-process-feature-integration
  - /2021080/docs/en/checkout-quotation-process-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Checkout | 202009.0 |
| Quotation Process | 202009.0 |

### 1) Set up Behavior
Register the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `QuoteRequestPreCheckPlugin` | Prevents the checkout for quote in the quotation process. | None | `Spryker\Zed\QuoteRequest\Communication\Plugin\Checkout` |
| `CloseQuoteRequestCheckoutPostSaveHookPlugin` | Closes a quote request after the order has been placed from it. | None | `Spryker\Zed\QuoteRequest\Communication\Plugin\Checkout` |

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
Make sure that you can't see the **Checkout** button on the Quote request items edit page.</br>Make sure that after you placed an order form quote request, a quote request has a closed status.
{% endinfo_block %}

## Install Feature Frontend
### Prerequisites
Please overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Checkout | 202009.0 |
| Quotation Process | 202009.0 |

### Set up Behavior
#### Set up Quote Request Workflow
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `QuoteRequestAgentCheckoutWorkflowStepResolverStrategyPlugin` | Modifies checkout steps for agent RFQ edit workflow. | None | `SprykerShop\Yves\QuoteRequestAgentPage\Plugin\CheckoutPage` |
| `QuoteWithCustomShipmentPriceCheckoutWorkflowStepResolverStrategyPlugin` | Modifies checkout steps for a quote with source shipment price workflow. | None | `SprykerShop\Yves\QuoteRequestPage\Plugin\CheckoutPage` |
| `QuoteRequestCheckoutWorkflowStepResolverStrategyPlugin` | Modifies checkout steps for buyer RFQ edit workflow. | None | `SprykerShop\Yves\QuoteRequestPage\Plugin\CheckoutPage` |

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

Verify that when you add/edit shipping information in RFQ as an agent or a buyer you have access only to the address step and the shipment step.

Verify that if you set source shipment price as an agent and then convert the RFQ to cart as a buyer you don't have access to the address step and the shipment step.

{% endinfo_block %}
