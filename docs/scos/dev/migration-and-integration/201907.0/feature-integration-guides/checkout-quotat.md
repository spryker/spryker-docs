---
title: Checkout + Quotation Process Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/checkout-quotation-process-feature-integration
redirect_from:
  - /v3/docs/checkout-quotation-process-feature-integration
  - /v3/docs/en/checkout-quotation-process-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Checkout | 201907.0 |
| Quotation Process | 201907.0 |

### 1) Set up Behavior
Register the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `QuoteRequestPreCheckPlugin` | Prevents the checkout for quote in the quotation process. | None | `Spryker\Zed\QuoteRequest\Communication\Plugin\Checkout` |
| `CloseQuoteRequestCheckoutPostSaveHookPlugin` | Closes a quote request after the order has been placed from it. | None | `Spryker\Zed\QuoteRequest\Communication\Plugin\Checkout` |

<details open>
<summary>Pyz\Zed\Checkout\CheckoutDependencyProvider.php</summary>
    
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

</br>
</details>

{% info_block warningBox "Verification" %}
Make sure that you can't see the **Checkout** button on the Quote request items edit page.</br>Make sure that after you placed an order form quote request, a quote request has a closed status.
{% endinfo_block %}
