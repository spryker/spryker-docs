---
title: CartsRestApi Migration Guide
originalLink: https://documentation.spryker.com/v6/docs/cartsrestapi-migration-guide
redirect_from:
  - /v6/docs/cartsrestapi-migration-guide
  - /v6/docs/en/cartsrestapi-migration-guide
---

## Upgrading from version 3.* to 5.0.0

{% info_block infoBox %}
In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://support.spryker.com/hc/en-us
{% endinfo_block %} if you have any questions.)

## Upgrading from Version 2.* to Version 3.*

**CartsRestApi** version 3 has been improved to provide functionality that allows using multiple carts.

Find and remove `CartsRestApiDependencyProvider` in a project:

CartsRestApiDependencyProvider.php

```php
<?php
 
namespace Pyz\Glue\CartsRestApi;
 
use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\CartsRestApi\Plugin\QuoteCollectionReader\CartQuoteCollectionReaderPlugin;
use Spryker\Glue\CartsRestApi\Plugin\QuoteCreator\SingleQuoteCreatorPlugin;
use Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\QuoteCollectionReaderPluginInterface;
use Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\QuoteCreatorPluginInterface;
 
class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
	/**
	* @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\QuoteCollectionReaderPluginInterface
	*/
	protected function getQuoteCollectionReaderPlugin(): QuoteCollectionReaderPluginInterface
	{
		return new CartQuoteCollectionReaderPlugin();
	}
 
	/**
	* @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\QuoteCreatorPluginInterface
	*/
	protected function getQuoteCreatorPlugin(): QuoteCreatorPluginInterface
	{
		return new SingleQuoteCreatorPlugin();
	}
}
```

Find and update `CustomersRestApiDependencyProvider` in a project. The `getCustomerPostCreatePlugins` method should replace `getCustomerPostRegisterPlugins`.

CustomersRestApiDependencyProvider.php

```php
<?php
  
namespace Pyz\Glue\CustomersRestApi;
use Spryker\Glue\CartsRestApi\Plugin\CustomersRestApi\UpdateCartCreateCustomerReferencePlugin;
use Spryker\Glue\CustomersRestApi\CustomersRestApiDependencyProvider as SprykerCustomersRestApiDependencyProvider;
 
class CustomersRestApiDependencyProvider extends SprykerCustomersRestApiDependencyProvider
{
	protected function getCustomerPostCreatePlugins(): array
	{
		return array_merge(parent::getCustomerPostCreatePlugins(), [
			new UpdateCartCreateCustomerReferencePlugin(),
		]);
	}
}
```

Find or create `CartsRestApiDependencyProvider` in a project. Make sure that it extends `\Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider`.

Find the `getQuoteCreatorPlugin` method and add `\Spryker\Zed\PersistentCart\Communication\Plugin\CartsRestApi\QuoteCreatorPlugin` to the plugin stack.

CartsRestApiDependencyProvider.php

```php
<?php
 
namespace Pyz\Zed\CartsRestApi;
 
use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Zed\PersistentCart\Communication\Plugin\CartsRestApi\QuoteCreatorPlugin;
use Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\QuoteCreatorPluginInterface;
 
class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
	/**
	* @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\QuoteCreatorPluginInterface
	*/
	protected function getQuoteCreatorPlugin(): QuoteCreatorPluginInterface
	{
		return new QuoteCreatorPlugin();
	}
}
```

Find or create `QuoteDependencyProvider` in a project. Make sure that it extends `\Spryker\Zed\Quote\QuoteDependencyProvider`.

Find the `getQuoteValidatorPlugins` method and add `\Spryker\Zed\Currency\Communication\Plugin\Quote\QuoteCurrencyValidatorPlugin`, `\Spryker\Zed\Price\Communication\Plugin\Quote\QuotePriceModeValidatorPlugin` and `\Spryker\Zed\Store\Communication\Plugin\Quote\QuoteStoreValidatorPlugin` to the plugin stack.

CartsRestApiDependencyProvider.php

```php
<?php
 
namespace Pyz\Zed\Quote;
 
use Spryker\Zed\Currency\Communication\Plugin\Quote\QuoteCurrencyValidatorPlugin;
use Spryker\Zed\Price\Communication\Plugin\Quote\QuotePriceModeValidatorPlugin;
use Spryker\Zed\Store\Communication\Plugin\Quote\QuoteStoreValidatorPlugin;
use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;
 
class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
	/**
	* @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteValidatorPluginInterface[]
	*/
	protected function getQuoteValidatorPlugins(): array
	{
		return [
			new QuoteCurrencyValidatorPlugin(),
			new QuotePriceModeValidatorPlugin(),
			new QuoteStoreValidatorPlugin(),
		];
	}
}
```

Run the following command:

```bash
vendor/bin/console transfer:generate
```

_Estimated migration time: 1 hour_

## Upgrading from Version 1.* to Version 2.*

**CartsRestApi** version 2 has been improved to be independent of the `MultiCart` module. Now you can to use the `CartsRestApi` module only with the `PersistentCart` module.

We have also added the API endpoints functionality to use `CartsRestApi` as a guest customer.

To migrate to the new version, do the following:	

1. Find or create `CartsRestApiDependencyProvider` in a project. Make sure that it extends `\Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider`.
2. Find the `getQuoteCollectionReaderPlugin` method and add `\Spryker\Glue\CartsRestApi\Plugin\QuoteCollectionReader\CartQuoteCollectionReaderPlugin` to the plugin stack.
3. Find the `getQuoteCreatorPlugin` method and add `\Spryker\Glue\CartsRestApi\Plugin\QuoteCreator\SingleQuoteCreatorPlugin` to the plugin stack.

The file could look like this:

CartsRestApiDependencyProvider.php

```php
<?php
 
	namespace Pyz\Glue\CartsRestApi;
 
	use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
	use Spryker\Glue\CartsRestApi\Plugin\QuoteCollectionReader\CartQuoteCollectionReaderPlugin;
	use Spryker\Glue\CartsRestApi\Plugin\QuoteCreator\SingleQuoteCreatorPlugin;
	use Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\QuoteCollectionReaderPluginInterface;
	use Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\QuoteCreatorPluginInterface;
 
	class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
	{
		/**
		* @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\QuoteCollectionReaderPluginInterface
		*/
		protected function getQuoteCollectionReaderPlugin(): QuoteCollectionReaderPluginInterface
		{
			return new CartQuoteCollectionReaderPlugin();
		}
 
		/**
		* @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\QuoteCreatorPluginInterface
		*/
		protected function getQuoteCreatorPlugin(): QuoteCreatorPluginInterface
		{
			return new SingleQuoteCreatorPlugin();
		}
	}
```

4. Find or create `CustomersRestApiDependencyProvider` in a project. Make sure that it extends `\Spryker\Glue\CustomersRestApi\CustomersRestApiDependencyProvider`.
5. Find the `getCustomerPostRegisterPlugins` method and add `Spryker\Glue\CartsRestApi\Plugin\CustomerPostRegister\UpdateCartCustomerReferencePlugin` to the plugin stack.
* The file could look like this:

CustomersRestApiDependencyProvider.php

```php
<?php
  
	namespace Pyz\Glue\CustomersRestApi;
	use Spryker\Glue\CartsRestApi\Plugin\CustomerPostRegister\UpdateCartCustomerReferencePlugin;
	use Spryker\Glue\CustomersRestApi\CustomersRestApiDependencyProvider as SprykerCustomersRestApiDependencyProvider;
 
	class CustomersRestApiDependencyProvider extends SprykerCustomersRestApiDependencyProvider
	{
		/**
		* @return \Spryker\Glue\CustomersRestApiExtension\Dependency\Plugin\CustomerPostRegisterPluginInterface[]
		*/
		protected function getCustomerPostRegisterPlugins(): array
		{
			return array_merge(parent::getCustomerPostRegisterPlugins(), [
				new UpdateCartCustomerReferencePlugin(),
			]);
		}
	}
```

6. Find or create GlueApplicationDependencyProvider in a project. Make sure it extends `\Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider`.
7. Find the `getResourceRoutePlugins` method and add the following plugins to the plugins stack.
    * `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CartItemsResourceRoutePlugin`
    * `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CartsResourceRoutePlugin`
    * `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\GuestCartItemsResourceRoutePlugin`
    * `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\GuestCartsResourceRoutePlugin`
8. Find the `getValidateRestRequestPlugins` method and add `Spryker\Glue\CartsRestApi\Plugin\Validator\AnonymousCustomerUniqueIdValidatorPlugin` to the plugins stack.
9. Find the `getControllerBeforeActionPlugins` method and add `Spryker\Glue\CartsRestApi\Plugin\ControllerBeforeAction\SetAnonymousCustomerIdControllerBeforeActionPlugin` to the plugins stack.
10. Find the `getResourceRelationshipPlugins` method and add `Spryker\Glue\CartItemsProductsRelationship\Plugin\CartItemsProductsRelationshipPlugin` to the plugins stack.

* The file could look like this:

GlueApplicationDependencyProvider.php

```php
<?php
  
	namespace Pyz\Glue\GlueApplication;
 
	use Spryker\Glue\CartItemsProductsRelationship\Plugin\CartItemsProductsRelationshipPlugin;
	use Spryker\Glue\CartsRestApi\Plugin\ControllerBeforeAction\SetAnonymousCustomerIdControllerBeforeActionPlugin;
	use Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CartItemsResourceRoutePlugin;
	use Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CartsResourceRoutePlugin;
	use Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\GuestCartItemsResourceRoutePlugin;
	use Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\GuestCartsResourceRoutePlugin;
	use Spryker\Glue\CartsRestApi\Plugin\Validator\AnonymousCustomerUniqueIdValidatorPlugin;
	use Spryker\Glue\CustomersRestApi\CustomersRestApiDependencyProvider as SprykerCustomersRestApiDependencyProvider;
 
	class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
	{
		/**
		* {@inheritdoc}
		*
		* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
		*/
		protected function getResourceRoutePlugins(): array
		{
			return [
				new CartsResourceRoutePlugin(),
				new CartItemsResourceRoutePlugin(),
				new GuestCartsResourceRoutePlugin(),
				new GuestCartItemsResourceRoutePlugin(),
			];
		}
 
		/**
		* {@inheritdoc}
		*
		* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ValidateRestRequestPluginInterface[]
		*/
		protected function getValidateRestRequestPlugins(): array
		{
			return [
				new AnonymousCustomerUniqueIdValidatorPlugin(),
			];
		}
 
		/**
		* {@inheritdoc}
		*
		* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ControllerBeforeActionPluginInterface[]
		*/
		protected function getControllerBeforeActionPlugins(): array
		{
			return [
				new SetAnonymousCustomerIdControllerBeforeActionPlugin(),
			];
		}
 
		/**
		* {@inheritdoc}
		*
		* @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
		*
		* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
		*/
		protected function getResourceRelationshipPlugins(
			ResourceRelationshipCollectionInterface $resourceRelationshipCollection
		): ResourceRelationshipCollectionInterface {
			$resourceRelationshipCollection->addRelationship(
				CartsRestApiConfig::RESOURCE_GUEST_CARTS_ITEMS,
				new CartItemsProductsRelationshipPlugin()
			);
 
			return $resourceRelationshipCollection;
		}
	}
```

To have an ability to run the console command in order to delete expired guest carts, you should:
1. Run `composer require spryker/quote:"^2.3.0"`
2. Add configuration and cronjob to delete expired guest carts:
`config/Shared/config_default.php`
**`config_default.php`**
`$config[QuoteConstants::GUEST_QUOTE_LIFETIME] = 'P01M';`

config/Zed/cronjobs/jobs.phpjobs.php

```php
/* Quote */
	$jobs[] = [
		'name' => 'delete-expired-guest-quotes',
		'command' => '$PHP_BIN vendor/bin/console quote:delete-expired-guest-quotes',
		'schedule' => '30 1 * * *',
		'enable' => true,
		'run_on_non_production' => true,
		'stores' => $allStores,
	];
 ```

 3. Find or create `ConsoleDependencyProvider` in a project. Make sure that it extends `\Spryker\Zed\Console\ConsoleDependencyProvider`. 

Find the `getConsoleCommands` method and add `Spryker\Zed\Quote\Communication\Console\DeleteExpiredGuestQuoteConsole` to the plugin stack.
The file could look like this:

ConsoleDependencyProvider.php

```php
<?php
  
	namespace Pyz\Glue\CustomersRestApi;
  
	use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
	use Spryker\Zed\Quote\Communication\Console\DeleteExpiredGuestQuoteConsole;
  
	class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
	{
		/**
		* @param \Spryker\Zed\Kernel\Container $container
		*
		* @return \Symfony\Component\Console\Command\Command[]
		*/
		protected function getConsoleCommands(Container $container)
		{
			$commands = [
				new DeleteExpiredGuestQuoteConsole(),
			];
		}
	}
```

4. Run `vendor/bin/console transfer:generate`.

_Estimated migration time: 1-2 hours_
