---
title: Migration Guide - Shipment
originalLink: https://documentation.spryker.com/2021080/docs/mg-shipment
redirect_from:
  - /2021080/docs/mg-shipment
  - /2021080/docs/en/mg-shipment
---

## Upgrading from version 7.* to 8.*
In the version 8.0.0 of the `Shipment` module, we have added the ability to assign a delivery method to a store in the Back Office. You can find more details about the changes on the [Shipment module release](https://github.com/spryker/shipment/releases) page.

**To upgrade to the new version of the module, do the following:**

1. Upgrade the `Shipment` module to the new version:

```bash
composer require spryker/shipment:"^8.0.0" --update-with-dependencies
```

2. Prepare database entity schema for each store in the system:

```bash
APPLICATION_STORE=DE console propel:schema:copy
APPLICATION_STORE=US console propel:schema:copy
...
```

3. Run the database migration:

```bash
console propel:install
console transfer:generate
```

*Estimated migration time: 5 min*
***
## Upgrading from Version 6.* to Version 7.*
    
In this new version of the **Shipment** module, we have added support of split delivery. You can find more details about the changes on the [Shipment module release page](https://github.com/spryker/shipment/releases).
    
{% info_block errorBox %}
This release is a part of the Split delivery concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Split Delivery Migration Concept](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/split-delivery-
{% endinfo_block %}.)
    
**To upgrade to the new version of the module, do the following:**
    
1.  Upgrade the `Shipment` module to the new version:
    
```bash
composer require spryker/shipment: "^7.0.0" --update-with-dependencies
```
    
2. Clean up the database entity schema for each store in the system:
    
```bash
APPLICATION_STORE=DE console propel:schema:copy
APPLICATION_STORE=US console propel:schema:copy
...
```
    
3. Run the database migration:
    
```bash
console propel:install
console transfer:generate
```
    
4. Enable the following plugins:
    
| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `GiftCardShipmentGroupMethodFilterPlugin` | Filters available shipment methods for a shipment group. | None | `\Spryker\Zed\GiftCard\Communication\Plugin\Shipment\GiftCardShipmentGroupMethodFilterPlugin` |
| `ShipmentOrderMailExpanderPlugin` | Expands order mail transfer data with shipment groups data. | None | `\Spryker\Zed\Shipment\Dependency\Plugin\Oms\ShipmentOrderMailExpanderPlugin` |
| `ShipmentManualEventGrouperPlugin` | Groups manual events by sales shipment ID. | None | `\Spryker\Zed\Shipment\Dependency\Plugin\Oms\ShipmentManualEventGrouperPlugin` |
    
src/Pyz/Zed/Shipment/ShipmentDependencyProvider.php
  
```php
<?php
 
namespace Pyz\Zed\Shipment;
 
use Spryker\Zed\GiftCard\Communication\Plugin\Shipment\GiftCardShipmentGroupMethodFilterPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Shipment\ShipmentDependencyProvider as SprykerShipmentDependencyProvider;
 
class ShipmentDependencyProvider extends SprykerShipmentDependencyProvider
{
	/**
	* @param \Spryker\Zed\Kernel\Container $container
	*
	* @return \Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentMethodFilterPluginInterface[]
	*/
	protected function getMethodFilterPlugins(Container $container)
	{
		return [
			new GiftCardShipmentGroupMethodFilterPlugin(),
		];
	}
}
```

src/Pyz/Zed/Oms/OmsDependencyProvider.php

```php
<?php
 
/**
* This file is part of the Spryker Suite.
* For full license information, please view the LICENSE file that was distributed with this source code.
*/
 
namespace Pyz\Zed\Oms;
 
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\Shipment\Dependency\Plugin\Oms\ShipmentManualEventGrouperPlugin;
use Spryker\Zed\Shipment\Dependency\Plugin\Oms\ShipmentOrderMailExpanderPlugin;
 
class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
	/**
	* @param \Spryker\Zed\Kernel\Container $container
	*
	* @return \Spryker\Zed\OmsExtension\Dependency\Plugin\OmsOrderMailExpanderPluginInterface[]
	*/
	protected function getOmsOrderMailExpanderPlugins(Container $container)
	{
		return [
			new ShipmentOrderMailExpanderPlugin(),
		];
	}
 
	/**
	* @param \Spryker\Zed\Kernel\Container $container
	*
	* @return \Spryker\Zed\OmsExtension\Dependency\Plugin\OmsManualEventGrouperPluginInterface[]
	*/
	protected function getOmsManualEventGrouperPlugins(Container $container)
	{
		return [
			new ShipmentManualEventGrouperPlugin(),
		];
	}
}
```

5. Enable project configuration:

```php
<?php
 
namespace Pyz\Shared\Shipment;
 
use Spryker\Shared\Shipment\ShipmentConfig as SprykerShipmentConfig;
 
class ShipmentConfig extends SprykerShipmentConfig
{
	/**
	* @return bool
	*/
	public function isMultiShipmentSelectionEnabled(): bool
	{
		return true;
	}
}
```

*Estimated migration time: 10 min*
***
## Upgrading from Version 5.* to Version 6.*
In version 6, multi-currency prices are introduced for shipment methods, allowing to set up different net and gross price per shipment method for each preconfigured currency.

The `spy_shipment_method.default_price` database column becomes deprecated. Shipment method prices are stored in `spy_shipment_method_price` database table instead. `spy_shipment_method_price` database table holds a store + currency specific gross and net price for each shipment method.

Database structure is as follows: 
![Database structure](https://spryker.s3.eu-central-1.amazonaws.com/docs/Migration+and+Integration/Module+Migration+Guides/Migration+Guide+-+Shipment/shipment_method_price_database_schema.png){height="20%" width="60%"}

1. Update `spryker/shipment` module to at least 6.0.0 version.
2. Update database
    * Install the database changes by running `vendor/bin/console propel:diff`. Propel should generate a migration file with the changes.
    * Apply the database changes: `vendor/bin/console propel:migrate`.
    * Generate and update ORM models: `vendor/bin/console propel:model:build`.
    * You will find some new classes in your project under `\Orm\Zed\Shipment\Persistence` namespace. It’s important that you make sure that they extend the base classes from the Spryker core, e.g.:
        * `\Orm\Zed\Shipment\Persistence\SpyShipmentMethodPrice` extends `\Spryker\Zed\Shipment\Persistence\Propel\AbstractSpyShipmentMethodPrice`
        * `\Orm\Zed\Shipment\Persistence\SpyShipmentMethodPriceQuery` extends `\Spryker\Zed\Shipment\Persistence\Propel\AbstractSpyShipmentMethodPriceQuery`
3. Run `vendor/bin/console transfer:generate` to update and generate transfer object changes.

**Transfer object changes**
    
    Property `defaultPrice` in `ShipmentMethod` transfer object is replaced by prices, and      `storeCurrencyPrice` properties.

    * `prices transfer` object property contains the shipment method related prices from `spy_shipment_method_price` database table as a `MoneyValue` transfer object collection.
    * `storeCurrencyPrice` transfer object property contains 1 specific price, based on the preconfigured `store + price` mode and for the requested currency.

    `ShipmentMethod` transfer object now contains a shipmentMethodKey property, accordingly to the new database structure.
    </br>
    </details>

4. Replace the usages of `ShipmentMethod.defaultPrice` transfer object property in your custom codes, depending on your requirements.
5. Migrate your old database structure by creating a `spy_shipment_method_price` row for each of your `spy_shipment_method` rows.
    The number of the `spy_shipment_method_price` rows per shipment method should match the number    of store and currency pair set up in the configuration.
    Depending on your requirements, you can set `gross/net` prices as `0`/`null`/`any integer` value as cents.

<details open>
<summary>Example: Migration</summary>
    
```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Spryker\Zed\Shipment\Communication\Console;

use Orm\Zed\Shipment\Persistence\SpyShipmentMethod;
use Orm\Zed\Shipment\Persistence\SpyShipmentMethodPrice;
use Orm\Zed\Shipment\Persistence\SpyShipmentMethodPriceQuery;
use Orm\Zed\Shipment\Persistence\SpyShipmentMethodQuery;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;

/**
 * @method \Spryker\Zed\Shipment\Communication\ShipmentCommunicationFactory getFactory()
 */
class MigrateShipmentMethodPricesConsole extends Console
{

    const COMMAND_NAME = 'shipment:price:migrate';
    const COMMAND_DESCRIPTION = 'Console command to migrate shipment prices to multi currency implementation.';

    /**
     * @var int[] Keys are currency iso codes, values are currency ids.
     */
    protected static $idCurrencyCache = [];

    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);

        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return void
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $storeTransferCollection = $this->getFactory()->getStoreFacade()->getAllStores();
        $shipmentMethodCollection = SpyShipmentMethodQuery::create()->find();

        if (count($shipmentMethodCollection) === 0) {
            $output->writeln('There are no shipment methods to migrate.');
            return;
        }
        if (count($storeTransferCollection) === 0) {
            $output->writeln('There are no stores set up to migrate.');
            return;
        }

        $question = new ConfirmationQuestion(
            sprintf('Migrate %s shipment methods? (y|n)', count($shipmentMethodCollection)),
            false
        );

        if (!$this->getQuestionHelper()->ask($input, $output, $question)) {
            $output->writeln('Aborted.');
            return;
        }

        $storeCurrencies = $this->getStoreCurrencies($storeTransferCollection);
        $defaultIdStore = $this->getDefaultIdStore();
        $defaultIdCurrency = $this->getDefaultIdCurrency();

        foreach ($shipmentMethodCollection as $shipmentMethodEntity) {
            $this->processShipmentMethod($shipmentMethodEntity, $storeCurrencies, $defaultIdStore, $defaultIdCurrency);

            $output->writeln(sprintf('Shipment method %d is migrated.', $shipmentMethodEntity->getIdShipmentMethod()));
        }

        $output->writeln('done.');
    }

    /**
     * @param \Orm\Zed\Shipment\Persistence\SpyShipmentMethod $shipmentMethodEntity
     * @param array $storeCurrencies
     * @param int $defaultIdStore
     * @param int $defaultIdCurrency
     *
     * @return void
     */
    protected function processShipmentMethod(SpyShipmentMethod $shipmentMethodEntity, array $storeCurrencies, $defaultIdStore, $defaultIdCurrency)
    {
        foreach ($storeCurrencies as list($idStore, $idCurrency)) {
            $shipmentMethodPriceEntity = SpyShipmentMethodPriceQuery::create()
                ->filterByFkShipmentMethod($shipmentMethodEntity->getIdShipmentMethod())
                ->filterByFkStore($idStore)
                ->filterByFkCurrency($idCurrency)
                ->findOneOrCreate();

            $isDefaultStoreCurrency = $idStore === $defaultIdStore && $idCurrency === $defaultIdCurrency;

            $this->setNetPrice($shipmentMethodPriceEntity);
            $this->setGrossPrice($shipmentMethodPriceEntity, $shipmentMethodEntity, $isDefaultStoreCurrency);

            $shipmentMethodPriceEntity->save();
        }
    }

    /**
     * @param \Orm\Zed\Shipment\Persistence\SpyShipmentMethodPrice $shipmentMethodPrice
     *
     * @return void
     */
    protected function setNetPrice(SpyShipmentMethodPrice $shipmentMethodPrice)
    {
        if ($shipmentMethodPrice->getDefaultNetPrice() !== null) {
            return;
        }

        $shipmentMethodPrice->setDefaultNetPrice(0);
    }

    /**
     * @param \Orm\Zed\Shipment\Persistence\SpyShipmentMethodPrice $shipmentMethodPrice
     * @param \Orm\Zed\Shipment\Persistence\SpyShipmentMethod $shipmentMethod
     * @param bool $isDefaultStoreCurrency
     *
     * @return void
     */
    protected function setGrossPrice(SpyShipmentMethodPrice $shipmentMethodPrice, SpyShipmentMethod $shipmentMethod, $isDefaultStoreCurrency)
    {
        if ($shipmentMethodPrice->getDefaultGrossPrice() !== null) {
            return;
        }

        $shipmentMethodPrice->setDefaultGrossPrice($isDefaultStoreCurrency ? (int)$shipmentMethod->getDefaultPrice() : 0);
    }

    /**
     * Returns with a list of available store-currency id pairs.
     *
     * Example:
     *   Store 1 has currency 5, 6
     *   Store 2 has currency 10
     *   Result: [
     *              [1, 5],
     *              [1, 6],
     *              [2, 10]
     *           ]
     *
     * @param \Generated\Shared\Transfer\StoreTransfer[] $storeTransferCollection
     *
     * @return array
     */
    protected function getStoreCurrencies(array $storeTransferCollection)
    {
        $currencies = [];

        foreach ($storeTransferCollection as $storeTransfer) {
            foreach ($storeTransfer->getAvailableCurrencyIsoCodes() as $isoCode) {
                $currencies[] = [$storeTransfer->getIdStore(), $this->getIdCurrencyByIsoCode($isoCode)];
            }
        }

        return $currencies;
    }

    /**
     * @param string $currencyIsoCode
     *
     * @return int
     */
    protected function getIdCurrencyByIsoCode($currencyIsoCode)
    {
        if (!isset(static::$idCurrencyCache[$currencyIsoCode])) {
            static::$idCurrencyCache[$currencyIsoCode] = $this->getFactory()
                ->getCurrencyFacade()
                ->fromIsoCode($currencyIsoCode)
                ->getIdCurrency();
        }

        return static::$idCurrencyCache[$currencyIsoCode];
    }

    /**
     * @return int
     */
    protected function getDefaultIdCurrency()
    {
        return $this->getIdCurrencyByIsoCode(
            $this->getFactory()
                ->getStoreFacade()
                ->getCurrentStore()
                ->getDefaultCurrencyIsoCode()
        );
    }

    /**
     * @return int
     */
    protected function getDefaultIdStore()
    {
        return $this->getFactory()->getStoreFacade()->getCurrentStore()->getIdStore();
    }

    /**
     * @return \Symfony\Component\Console\Helper\QuestionHelper
     */
    protected function getQuestionHelper()
    {
        return $this->getHelper('question');
    }

}                         
```
</br>
</details>

6. Register the prepared multi-currency handling `MoneyCollectFormType` form type in your project. 

Here is the example of MoneyCollectionTypePlugin registration:

```php
<?php
namespace Pyz\Zed\Shipment;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Money\Communication\Plugin\Form\MoneyCollectionFormTypePlugin;
use Spryker\Zed\Shipment\ShipmentDependencyProvider as SprykerShipmentDependencyProvider;

class ShipmentDependencyProvider extends SprykerShipmentDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function createMoneyCollectionFormTypePlugin(Container $container)
    {
        return new MoneyCollectionFormTypePlugin();
    }
} 
```

7. The `ShipmentFacadeInterface::createMethod` method now expects "prices" `MoneyValue` transfer object collection to be set in the provided `ShipmentMethod` transfer object. Update your custom calls to this method accordingly.

8. The `ShipmentFacadeInterface::updateMethod` method now expects "prices" `MoneyValue` transfer object collection to be set in the provided `ShipmentMethod` transfer object. Update your custom calls to this method accordingly.

9. The `ShipmentFacadeInterface::getAvailableMethods` method applies multi-currency feature:
        1. Does not populate `taxRate` transfer object property anymore in shipment method transfer objects.
        2. Excludes shipment methods which would end up with `NULL` value for the request's currency and preconfigured `store + price` mode.
    Amend your custom calls to ShipmentFacadeInterface::getAvailableMethods method accordingly to your requirements.
    {% info_block errorBox "Important" %}
`CheckoutAvailableShipmentMethodsPlugin` is an adapter to `ShipmentFacadeInterface::getAvailableMethods`. If you use this plugin, you will need to amend its usage in your code.
{% endinfo_block %}

10. The `MethodForm::setDefaultOptions` deprecated method was removed, use `MethodForm::configureOptions` instead.

11. The `ShipmentDependencyProvider::STORE` static dependency access was replaced with proper `StoreFacadeInterface` bridged access. Amend your implementation if you have customized it.

12. Note: The `MethodForm.defaultPrice` form field was replaced with its multi-currency representation. Amend your implementation if you have customized it.

13. Note: The `MethodForm` form now works on the `ShipmentMethod` transfer object instead of simple array. Amend your implementation if you have customized it.

14. Note: The `ShipmentMethodDeliveryTimePluginInterface` interface now expects the returned delivery time in seconds. Amend your implementations of this plugin accordingly. The DemoShop example implementation of the plugin and its usage in the `ShipmentFormDataProvider::getDeliveryTime` method are also updated.

Go to the Shipment management Back Office to verify your shipment method prices.
***
## Upgrading from Version 4.* to Version 5.*

In version 5, shipment lost the direct foreign key `sales.fk_shipment_method` to the `sales_order` table, it was replaced with the `spy_sales_shipment` table where all shipment information is stored.

A new `SalesOrderHydration` plugin was added to populate `OrderTransfer` with shipment information `ShipmentOrderHydratePlugin`.

The new shipment table structure requires manual data migration, we have provided migration script, you can read how to migrate shipment data in [Migration Guide Sales](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-sales).
***
## Upgrading from Version 2.* to Version 3.*

The tax plugins are using the version 3.* of the Tax module. You need to upgrade the [Tax](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-tax) module.
