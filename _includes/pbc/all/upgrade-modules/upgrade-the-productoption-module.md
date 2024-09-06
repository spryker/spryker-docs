

## Upgrading from version 6.* to version 8.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}

## Upgrading from version 5.* to version 6.*

1. Update `spryker/product-option` to at least version 6.0.0.
2. Install/Update `spryker/currency` to at least version 3.0.0. See [Upgrade the Currency module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-currency-module.html) for more details.
3. Install/Update `spryker/price` to at least version 5.0.0. See [Upgrade the Price module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-price-module.html) for more details.
4. Update `spryker/product-option-cart-connector` to at least version 5.0.0 (if you have this module already installed). See [Upgrade the ProductOptionCartConnector module](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productoptioncartconnector-module.html) for more details.
5. Install the new database tables by running `vendor/bin/console propel:diff`. Propel should generate a migration file with the changes.
6. Run `vendor/bin/console propel:migrate` to apply the database changes.
7. Generate ORM models by running `vendor/bin/console propel:model:build`.
This command will generate some new classes in your project under `\Orm\Zed\ProductOption\Persistence namespace`. It is important to make sure that they extend the base classes from the Spryker core, e.g.:
`\Orm\Zed\ProductOption\Persistence\SpyProductOptionValuePrice` extends `\Spryker\Zed\ProductOption\Persistence\Propel\AbstractSpyProductOptionValuePrice\Orm\Zed\ProductOption\Persistence\SpyProductOptionValuePriceQuery` extends `\Spryker\Zed\ProductOption\Persistence\Propel\AbstractSpyProductOptionValuePriceQuery`
8. Run `vendor/bin/console transfer:generate` to generate the new transfer objects.
9. Make sure the new Zed user interface assets are built by running `npm run zed` (or antelope build Zed for older versions).
10. Register `MoneyCollectionFormTypePlugin` in product option dependency provider to support multi-currency price configuration in the Back Office.

**Example of the plugin registration:**

```php
<?php
namespace Pyz\Zed\ProductOption;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Money\Communication\Plugin\Form\MoneyCollectionFormTypePlugin;
use Spryker\Zed\ProductOption\ProductOptionDependencyProvider as SprykerProductOptionDependencyProvider;

class ProductOptionDependencyProvider extends SprykerProductOptionDependencyProvider
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

11. Migrate prices from `spy_product_option_value.price` field to `spy_product_option_value_price` table. Each `spy_product_option_value` row must have at least 1 `spy_product_option_value_price` row connected. A `ProductOptionValue` entity can have multiple `ProductOptionValuePrices` connected. You can define different gross/net price per currency per store by populating the `fk_currency` and `fk_store` fields accordingly. When either `gross_price` or `net_price` database field is left as `null`, that option will not be available for customers in that exact currency, store, price mode trio. If you set a price field as 0, the option is available for customers and it means it is free of charge.

<details>
<summary>Example of the migration</summary>

```php
<?php
/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Spryker\Zed\ProductOption\Communication\Console;

use Orm\Zed\Product\Persistence\SpyProductAbstractQuery;
use Orm\Zed\ProductOption\Persistence\Base\SpyProductOptionValue;
use Orm\Zed\ProductOption\Persistence\SpyProductOptionValuePrice;
use Orm\Zed\ProductOption\Persistence\SpyProductOptionValuePriceQuery;
use Orm\Zed\ProductOption\Persistence\SpyProductOptionValueQuery;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Spryker\Zed\ProductOption\ProductOptionConfig;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;

/**
 * @method \Spryker\Zed\ProductOption\Communication\ProductOptionCommunicationFactory getFactory()
 */
class MigrateProductOptionValuePricesConsole extends Console
{
    const COMMAND_NAME = 'product-option:price:migrate';
    const COMMAND_DESCRIPTION = 'Console command to migrate product option value prices to multi currency implementation.';

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
        $productOptionCollection = SpyProductOptionValueQuery::create()->find();

        if (count($productOptionCollection) === 0) {
            $output->writeln('There are no product option values to migrate.');
            return;
        }
        if (count($storeTransferCollection) === 0) {
            $output->writeln('There are no stores set up to migrate.');
            return;
        }

        $question = new ConfirmationQuestion(
            sprintf('Migrate %s product option values? (y|n)', count($productOptionCollection)),
            false
        );

        if (!$this->getQuestionHelper()->ask($input, $output, $question)) {
            $output->writeln('Aborted.');
            return;
        }

        $storeCurrencies = $this->getStoreCurrencies($storeTransferCollection);
        $defaultIdStore = $this->getDefaultIdStore();
        $defaultIdCurrency = $this->getDefaultIdCurrency();

        foreach ($productOptionCollection as $productOptionEntity) {
            $this->processProductOption($productOptionEntity, $storeCurrencies, $defaultIdStore, $defaultIdCurrency);

            $this->touchRelatedProductAbstracts($productOptionEntity->getIdProductOptionValue());
            $output->writeln(sprintf('Product option value %d is migrated.', $productOptionEntity->getIdProductOptionValue()));
        }

        $output->writeln('done.');
    }

    /**
     * @param \Orm\Zed\ProductOption\Persistence\Base\SpyProductOptionValue $productOptionValueEntity
     * @param array $storeCurrencies
     * @param int $defaultIdStore
     * @param int $defaultIdCurrency
     *
     * @return void
     */
    protected function processProductOption(SpyProductOptionValue $productOptionValueEntity, array $storeCurrencies, $defaultIdStore, $defaultIdCurrency)
    {
        foreach ($storeCurrencies as list($idStore, $idCurrency)) {
            $productOptionValuePriceEntity = SpyProductOptionValuePriceQuery::create()
                ->filterByFkProductOptionValue($productOptionValueEntity->getIdProductOptionValue())
                ->filterByFkStore($idStore)
                ->filterByFkCurrency($idCurrency)
                ->findOneOrCreate();

            $isDefaultStoreCurrency = $idStore === $defaultIdStore && $idCurrency === $defaultIdCurrency;

            $this->setNetPrice($productOptionValuePriceEntity);
            $this->setGrossPrice($productOptionValuePriceEntity, $productOptionValueEntity, $isDefaultStoreCurrency);

            $productOptionValuePriceEntity->save();
        }
    }

    /**
     * @param \Orm\Zed\ProductOption\Persistence\SpyProductOptionValuePrice $productOptionValuePriceEntity
     *
     * @return void
     */
    protected function setNetPrice(SpyProductOptionValuePrice $productOptionValuePriceEntity)
    {
        if ($productOptionValuePriceEntity->getNetPrice() !== null) {
            return;
        }
    }

    /**
     * @param \Orm\Zed\ProductOption\Persistence\SpyProductOptionValuePrice $productOptionValuePriceEntity
     * @param \Orm\Zed\ProductOption\Persistence\Base\SpyProductOptionValue $productOptionValue
     * @param bool $isDefaultStoreCurrency
     *
     * @return void
     */
    protected function setGrossPrice(SpyProductOptionValuePrice $productOptionValuePriceEntity, SpyProductOptionValue $productOptionValue, $isDefaultStoreCurrency)
    {
        if ($productOptionValuePriceEntity->getGrossPrice() !== null) {
            return;
        }

        $productOptionValuePriceEntity->setGrossPrice($isDefaultStoreCurrency ? (int)$productOptionValue->getPrice() : null);
    }

    /**
     * @param int $idProductOptionValue
     *
     * @return void
     */
    protected function touchRelatedProductAbstracts($idProductOptionValue)
    {
        $productAbstractCollection = SpyProductAbstractQuery::create()
            ->joinSpyProductAbstractProductOptionGroup()
            ->useSpyProductAbstractProductOptionGroupQuery()
                ->joinSpyProductOptionGroup()
                ->useSpyProductOptionGroupQuery()
                    ->joinSpyProductOptionValue()
                    ->useSpyProductOptionValueQuery()
                        ->filterByIdProductOptionValue($idProductOptionValue)
                    ->endUse()
                ->endUse()
            ->endUse()
            ->find();

        foreach ($productAbstractCollection as $productAbstractEntity) {
            $this->getFactory()
                ->getTouchFacade()
                ->touchActive(
                    ProductOptionConfig::RESOURCE_TYPE_PRODUCT_OPTION,
                    $productAbstractEntity->getIdProductAbstract()
                );
        }
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
</details>

12. The product option collector has to be amended to support multi-currency prices on product option values. The Storage has to save all product option value prices within a given store using the new Storage data structure:

```js
{  
   "idProductOptionValue":1,
   "sku":"OP_1_year_warranty",
   "prices":{  
      "CHF":{  
         "GROSS_MODE":{  
            "amount":600
         },
         "NET_MODE":{  
            "amount":null
         }
      },
      "EUR":{  
         "GROSS_MODE":{  
            "amount":800
         },
         "NET_MODE":{  
            "amount":900
         }
      }
   },
   "value":"product.option.warranty_1"
},
```
A new API call was added to get the store specific prices back: `ProductOptionFacadeInterface::getProductOptionValueStorePrices()`.

**Example of the collector upgrade**

```php
<?php
namespace Pyz\Zed\Collector\Business\Storage;

use ArrayObject;
use Generated\Shared\Transfer\MoneyValueTransfer;
use Generated\Shared\Transfer\ProductOptionValueStorePricesRequestTransfer;

class ProductOptionCollector extends Spryker\Zed\Collector\Business\Collector\Storage\AbstractStoragePdoCollector
{
    /**
     * @var \Spryker\Zed\ProductOption\Business\ProductOptionFacadeInterface
     */
    protected $productOptionFacade;

    ...

    /**
     * @param \Orm\Zed\ProductOption\Persistence\SpyProductOptionGroup $productOptionGroupEntity
     *
     * @return array
     */
    protected function getOptionGroupValues(SpyProductOptionGroup $productOptionGroupEntity)
    {
        $optionValues = [];
        foreach ($productOptionGroupEntity->getSpyProductOptionValues() as $optionValueEntity) {
            $optionValues[] = [
                StorageProductOptionValueTransfer::ID_PRODUCT_OPTION_VALUE => $optionValueEntity->getIdProductOptionValue(),
                StorageProductOptionValueTransfer::SKU => $optionValueEntity->getSku(),
                StorageProductOptionValueTransfer::PRICES => $this->getPrices($optionValueEntity->getProductOptionValuePrices()),
                StorageProductOptionValueTransfer::VALUE => $optionValueEntity->getValue(),
            ];
        }

        return $optionValues;
    }

    /**
     * @param \Propel\Runtime\Collection\ObjectCollection|\Orm\Zed\ProductOption\Persistence\SpyProductOptionValuePrice[] $objectCollection
     *
     * @return array
     */
    protected function getPrices(ObjectCollection $objectCollection)
    {
        $moneyValueCollection = $this->transformPriceEntityCollectionToMoneyValueTransferCollection($objectCollection);
        $priceResponse = $this->productOptionFacade->getProductOptionValueStorePrices(
            (new ProductOptionValueStorePricesRequestTransfer())->setPrices($moneyValueCollection)
        );

        return $priceResponse->getStorePrices();
    }

    /**
     * @param \Propel\Runtime\Collection\ObjectCollection|\Orm\Zed\ProductOption\Persistence\SpyProductOptionValuePrice[] $priceEntityCollection
     *
     * @return \ArrayObject|\Generated\Shared\Transfer\MoneyValueTransfer[]
     */
    protected function transformPriceEntityCollectionToMoneyValueTransferCollection(ObjectCollection $priceEntityCollection)
    {
        $moneyValueCollection = new ArrayObject();
        foreach ($priceEntityCollection as $productOptionValuePriceEntity) {
            $moneyValueCollection->append(
                (new MoneyValueTransfer())
                    ->fromArray($productOptionValuePriceEntity->toArray(), true)
                    ->setNetAmount($productOptionValuePriceEntity->getNetPrice())
                    ->setGrossAmount($productOptionValuePriceEntity->getGrossPrice())
            );
        }

        return $moneyValueCollection;
    }
}
```

13. Transfer objects were amended to support multi-currency price storage. Check your customized codes for the following fields to apply the new behavior:

    * `ProductOptionValue` transfer object's price field is replaced by prices field which contains a collection of `MoneyValue` transfer objects to support multi-currency behavior. This field can not be used directly anymore to display a price to customer in Yves.
    * `StorageProductOptionValue` transfer object contains a "prices" field which contains prices within a specific store for all currencies and price modes.
    * `StorageProductOptionValue` transfer object's price field now represents a price for a given store, currency, and price mode trio.

14. The following public API elements were changed, check your custom calls to them:

    * `ProductOptionFacadeInterface::getProductOptionGroupById()` populates all multi-currency prices instead of the singular price.
    * `ProductOptionFacadeInterface::getProductOptionValueById()` sets both net and gross prices for the current store and current currency.
    * `ProductOptionFacadeInterface::saveProductOptionValue()` saves multi-currency prices instead of a single price and expects new data structure accordingly.
    * `ProductOptionFacadeInterface::saveProductOptionGroup()` saves multi-currency prices instead of a single price and expects new data structure accordingly.
    * `ProductOptionClientInterface::getProductOptions()` uses the modified StorageProductOptionValue transfer, selects a multi-currency price.
    * `ProductOptionQueryContainer::queryProductOptionGroupWithValues()` is removed without replacement.
    * `ProductOptionQueryContainerInterface::queryProductsAbstractBySearchTerm()` is removed from public API and now it's a protected method.
    * `ProductOptionToTaxInterface::getTaxAmountFromGrossPrice()` is removed.
    * `ProductOptionToMoneyInterface::convertIntegerToDecimal()` is removed.
    * `ProductOptionToMoneyInterface::fromFloat()` is removed.
    * `ProductOptionToMoneyInterface::fromString()` is removed.
    * `ProductOptionFacadeInterface::toggleOptionActive()` expects 1st argument to be int.
    * `ProductOptionCommunicationFactory::createProductOptionGroup()` does not accept null argument anymore.
    * `ProductOptionDependencyProvider`'s constants are refactored.
    * Client dependency interfaces are renamed (postfixed with "Client").
    * Zed dependency interfaces are renamed (postfixed with the corresponding layer name).

15. Some additional changes that might have effect on you if you have customized any of these classes directly or their factory method:

    * `AbstractProductOptionSaver`
    * `ProductOptionGroupReader`
    * `ProductOptionListTable`
    * `ProductOptionStorage`
    * `ProductOptionTaxRateCalculator`
    * `ProductOptionValueForm`
    * `ProductOptionValueReader`
    * `ProductOptionValueSaver`

16. Verify your product option value prices on the Product Options page in the Back Office.

## Upgrading from version 4.* to version 5.*

In version 5 Product Options were updated to work with the new calculator concept. Therefore, the `SalesAggregator` plugin was moved to the `SalesAggregator` module `SubtotalWithProductOptionsAggregatorPlugin`.
The sales option database tables received new columns for storing calculated values.
To learn how to migrate to new structure, see the [Upgrading from version 3.* to version 4.*](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-calculation-module.html#upgrading-from-version-3-to-version-4) section in *Upgrade the Calculation module*.
