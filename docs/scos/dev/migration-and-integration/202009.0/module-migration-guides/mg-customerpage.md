---
title: Migration Guide - CustomerPage
originalLink: https://documentation.spryker.com/v6/docs/mg-customerpage
redirect_from:
  - /v6/docs/mg-customerpage
  - /v6/docs/en/mg-customerpage
---

## Upgrading from Version 1.* to Version 2.0.0
In this new version of the **CustomerPage** module, we have added support of split delivery. You can find more details about the changes on the [CustomerPage module](https://github.com/spryker-shop/customer-page/releases) release page.

{% info_block errorBox %}
This release is a part of the **Split delivery** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Split Delivery Migration Concept](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/split-delivery-
{% endinfo_block %}.)

**To upgrade to the new version of the module, do the following:**
1. Upgrade the **CustomerPage** module to the new version:

```bash
composer require spryker-shop/customer-page: "^2.0.0" --update-with-dependencies
```

2. Generate the transfer objects:

```bash
console transfer:generate
```

3. Enable the following expander plugins: 

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CompanyUnitAddressExpanderPlugin` | Expands address transfer with company unit address data. | None | `\SprykerShop\Yves\CompanyPage\Plugin\CheckoutPage\CompanyUnitAddressExpanderPlugin` |
| `CustomerAddressExpanderPlugin` | Expands address transfer with customer address data. | None | `\SprykerShop\Yves\CustomerPage\Plugin\CheckoutPage\CustomerAddressExpanderPlugin` |

src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php

```php
<?php
 
namespace Pyz\Yves\CheckoutPage;
 
use SprykerShop\Yves\CustomerPage\Plugin\CheckoutPage\CustomerAddressExpanderPlugin;
use SprykerShop\Yves\CompanyPage\Plugin\CheckoutPage\CompanyUnitAddressExpanderPlugin;
use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
 
/**
* @method \Pyz\Yves\CheckoutPage\CheckoutPageConfig getConfig()
*/
class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
	/**
	* @return \SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\AddressTransferExpanderPluginInterface[]
	*/
	protected function getAddressStepExecutorAddressExpanderPlugins(): array
	{
		return [
			new CustomerAddressExpanderPlugin(),
			new CompanyUnitAddressExpanderPlugin(),
		];
	}

	/**
	* @param \Spryker\Yves\Kernel\Container $container
	*
	* @return \Spryker\Yves\StepEngine\Dependency\Form\StepEngineFormDataProviderInterface
	*/
	protected function getAddressStepFormDataProvider(Container $container): StepEngineFormDataProviderInterface
	{
		return new CheckoutAddressFormDataProvider(
			$this->getCustomerClient($container),
			$this->getStore(),
			$this->getCustomerService($container),
			$this->getShipmentClient($container)
		);
	}

	/**
	* @param \Spryker\Yves\Kernel\Container $container
	*
	* @return \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToShipmentClientInterface
	*/
	public function getShipmentClient(Container $container): CheckoutPageToShipmentClientInterface
	{
		return $container->get(static::CLIENT_SHIPMENT);
	}
}
```

*Estimated migration time: 10 min*
