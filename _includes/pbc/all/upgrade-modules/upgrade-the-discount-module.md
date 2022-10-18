

## Upgrading from version 7.* to version 9.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}

## Upgrading from version 6.* to version 7.*

The seventh version of the `Discount` module introduces the Minimum Quantity of Items value for discounts. This functionality allows you to define discounts that will be applied only when the number of items which satisfies the conditions, is equal to or greater than the defined amount.

To achieve this, we have added a new database field: `spy_discount.minimum_item_amount`.

To upgrade the `Discount` module with this change, run:

```bash
console propel:install
```

This will generate a propel migration file as well update the database and the model for the Minimum Quantity of Items functionality to take effect.

## Upgrading from version 5.* to version 6.*

1. Update/install `spryker/discount` to at least 6.0.0 version.
2. Run `vendor/bin/console transfer:generate` to generate the new transfer objects.
3. Install the new database tables by running `vendor/bin/console propel:diff`. Propel should generate a migration file with the changes.
4. Run `vendor/bin/console propel:migrate` to apply the database changes.
5. Generate ORM models by running the command:

```bash
vendor/bin/console propel:model:build
```

This command will generate some new classes in your project under the  `\Orm\Zed\Discount\Persistence` namespace. It is important to make sure that they extend the base classes from the Spryker core, e.g.:

* `\Orm\Zed\Discount\Persistence\SpyDiscountStore` extends `\Spryker\Zed\Discount\Persistence\Propel\AbstractSpyDiscountStore`
* `\Orm\Zed\Discount\Persistence\SpyDiscountStoreQuery` extends `\Spryker\Zed\Discount\Persistence\Propel\AbstractSpyDiscountStoreQuery`

6. Each row in the newly created `spy_discount_store` table represents a connection between a `Store` and a `Discount`, meaning that a specific discount is available in that specific Store.

To migrate the `spy_discount_store` table, create connections between your discounts and the desired stores.

**Example migration for multiple (or single) stores**

PostgreSQL:

```sql
    INSERT INTO spy_discount_store (id_discount_store, fk_discount, fk_store)
    SELECT nextval('id_discount_store_pk_seq'), id_discount, id_store FROM spy_discount, spy_store;
```

MySQL:

```sql
    INSERT INTO spy_discount_store (fk_discount, fk_store)
    SELECT id_discount, id_store FROM spy_discount, spy_store;
```

7. To populate current Store information into the Quote transfer object, the `StoreQuoteTransferExpanderPlugin` has to be provided through the `QuoteDependencyProvider::getQuoteTransferExpanderPlugins()`.

**Example plugin registration**

```php
<?php
namespace Pyz\Client\Quote;

use Spryker\Client\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;
use Spryker\Client\Store\Plugin\StoreQuoteTransferExpanderPlugin;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Quote\Dependency\Plugin\QuoteTransferExpanderPluginInterface[]
     */
    protected function getQuoteTransferExpanderPlugins($container)
    {
        return [
            new StoreQuoteTransferExpanderPlugin(),
        ];
    }
}    
```

8. To allow `Discount` in the Back Office to handle multi-store concept (even if you are using single-store), `FormTypeInterface` has to be provided through `DiscountDependencyProvider::getStoreRelationFormTypePlugin()` to handle store relation. You can use the already implemented `StoreRelationToggleFormTypePlugin`.

**Example plugin registration**

```php
<?php
namespace Pyz\Zed\Discount;

use Spryker\Zed\Discount\DiscountDependencyProvider as SprykerDiscountDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class DiscountDependencyProvider extends SprykerDiscountDependencyProvider
{
    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getStoreRelationFormTypePlugin()
    {
        return new StoreRelationToggleFormTypePlugin();
    }
}
```

9. A bug was fixed in our [Demoshop implementation](https://github.com/spryker/demoshop) when displaying promotion items using `DiscountPromotion/Theme/default/discount-promotion/item-list.twig`. In case you used it, please amend your implementation to check the same variable for number of elements and iterating through.

**Modified version**

```html
{% raw %}{%{% endraw %} if promotionStorageProducts|length > 0 {% raw %}%}{% endraw %}
    <div class="small-12 columns">
        <h1> {% raw %}{{{% endraw %} 'cart.promotion.items' | trans {% raw %}}}{% endraw %}</h1>
        {% raw %}{%{% endraw %} for promotionStorageProduct in promotionStorageProducts {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} include '@DiscountPromotion/discount-promotion/item.twig' {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
</div>
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```

10.  The following classes' constructor dependencies were altered, please check if you have customized any of them or their constructor method:

* `Calculator/Discount`
* `DiscountConfigurationHydrate`
* `DiscountPersist`
* `GeneralForm`
* `DiscountsTable`

11. The following methods were enhanced, please check if you have customized any of them:

* `Calculator/Discount::retrieveActiveCartAndVoucherDiscounts()`
* `DiscountFormDataProvider::createDiscountGeneralTransferDefaults()`
* `DiscountConfigurationHydrate::getByIdDiscount()`
* `DiscountCommunicationFactory::getVoucherForm()`

12. The following methods/classes were removed or renamed, please check if you have customized any of them:

* `DiscountConfigurationHydrate::setDiscountConfigurationExpanderPlugins()`
* `DiscountPersist::setDiscountPostCreatePlugins()`
* `DiscountPersist::setDiscountPostUpdatePlugins()`
* `DiscountQueryContainerInterface::queryDiscountsBySpecifiedVouchers()`
* `DiscountQueryContainerInterface::queryActiveCartRules()`
* `Business/Persistence/DiscountOrderSaver`
* `Business/Persistence/DiscountOrderSaverInterface`
* `Communication/Plugin/Sales/DiscountOrderSavePlugin`
* `DiscountFacadeInterface::saveOrderDiscounts()`
* `DiscountFacade::saveOrderDiscounts()`
* `DiscountCommunicationFactory::createGeneralFormType()`
* `DiscountCommunicationFactory::createCalculatorFormType()`
* `DiscountCommunicationFactory::createConditionsFormType()`
* `DiscountCommunicationFactory::createVoucherFormType()`
* `DiscountCommunicationFactory::createVoucherForm()`
* `CalculatorForm::getName()`
* `ConditionsForm::getName()`
* `DiscountForm::getName()`
* `GeneralForm::getName()`
* `VoucherForm::getName()`
* `DiscountCommunicationFactory::createDiscountForm()`
* `DiscountCommunicationFactory::createVoucherForm()`

13. You can find additional information on the [Discount module release page](https://github.com/spryker/discount/releases) or by checking out our [Demoshop implementation](https://github.com/spryker/demoshop) for implementation example and idea.
14. You are ready now to use Discount Zed Admin UI and manage discounts per Store.

## Upgrading from version 4.* to version 5.*

In the `Discount` module version 5, we have introduced multi-currency support for fixed discount calculation. This update also includes:

* Support for net/gross amounts.
* Currency decision rule -  to filter discounts by currency.
* PriceMode decision rule - to filter discounts by price mode(net/gross).
* Database schema changes to store discount amounts and fk_store for later multi store support.
* Sales table changed deprecated column type from decimal to int as discount amounts were already stored as integers.
* `CalculatorInterface` renamed to `CalculatorTypeInterface`, concrete calculators Fixed and Percentage rename to `FixedType` and `PercentageType` accordingly.

1. Run the following command:

```bash
composer update spryker/discount spryker/currency spryker/store spryker/money spryker/calculation spryker/cart spryker/kernel.
```

Install the new module to be able to use the new currency plugin.

```bash
composer require spryker/cart-currency-connector
```

2. Run schema migration:

```sql
CREATE SEQUENCE "spy_discount_amount_pk_seq";

CREATE TABLE "spy_discount_amount"
(
  "id_discount_amount" INTEGER NOT NULL,
  "fk_currency" INTEGER NOT NULL,
  "fk_discount" INTEGER NOT NULL,
  "gross_amount" INTEGER,
  "net_amount" INTEGER,
  PRIMARY KEY ("id_discount_amount")
);

CREATE UNIQUE INDEX "spy_discount_amount-unique-currency-discount" ON "spy_discount_amount" ("fk_currency","fk_discount");

ALTER TABLE "spy_discount" ADD CONSTRAINT "spy_discount-fk_store"
    FOREIGN KEY ("fk_store")
    REFERENCES "spy_store" ("id_store");

ALTER TABLE "spy_sales_discount" ALTER COLUMN "amount" TYPE INTEGER;
```

3. Then, run console commands:

```bash
vendor/bin/console propel:model:build
```

```bash
vendor/bin/console transfer:generate
```

4. We have prepared a console command, discount migration script, to migrate old discount amounts to a new structure. Place it in your project Discount module and include in the Console module dependency provider.
This console command will move all discount amount with fixed calculator plugin to a new discount amount tables. It won't delete old values.

5. Register a new currency plugin to reload cart items when currency is changed. Take `\Spryker\Yves\CartCurrencyConnector\CurrencyChange\RebuildCartOnCurrencyChangePlugin`and place it to `\Pyz\Yves\Currency\CurrencyDependencyProvider::getCurrencyPostChangePlugins` plugin stack. This way we make sure that when currency in Yves is changed, we have updated product prices and discounts.

**Discount Amounts Migration Console Command**

```php
<?php

/**

 * Copyright © 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Discount\Communication\Console;

use Orm\Zed\Currency\Persistence\SpyCurrencyQuery;
use Orm\Zed\Discount\Persistence\SpyDiscountAmount;
use Orm\Zed\Discount\Persistence\SpyDiscountQuery;
use Spryker\Shared\Kernel\Store;
use Spryker\Zed\Discount\DiscountDependencyProvider;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Spryker\Zed\PropelOrm\Business\Runtime\ActiveQuery\Criteria;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;

class MigrateDiscountsConsole extends Console
{
    const COMMAND_NAME = 'discount:migrate';
    const COMMAND_DESCRIPTION = 'Console command to migrate discount amounts to multi currency implementation.';

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
        $discounts = SpyDiscountQuery::create()
            ->filterByCalculatorPlugin(DiscountDependencyProvider::PLUGIN_CALCULATOR_FIXED)
            ->useDiscountAmountQuery(null, Criteria::LEFT_JOIN)
                ->filterByIdDiscountAmount(null,Criteria::EQUAL)
            ->endUse()
            ->find();

        if (count($discounts) === 0) {
            $output->writeln('There are no discounts to migrate.');
            return;
        }

        $helper = $this->getHelper('question');
        $question = new ConfirmationQuestion(
            sprintf('Migrate %s discounts? (y|n)', count($discounts)),
            false
        );

        if (!$helper->ask($input, $output, $question)) {
            $output->writeln('Aborted.');
            return;
        }

        $currencyIsoCode = Store::getInstance()->getCurrencyIsoCode();

        $currencyEntity = SpyCurrencyQuery::create()
            ->filterByCode($currencyIsoCode)
            ->findOne();

        foreach ($discounts as $discountEntity) {
            $amount = $discountEntity->getAmount();

            $discountAmountEntity = new SpyDiscountAmount();
            $discountAmountEntity->setGrossAmount($amount);
            $discountAmountEntity->setFkDiscount($discountEntity->getIdDiscount());
            $discountAmountEntity->setFkCurrency($currencyEntity->getIdCurrency());
            $discountAmountEntity->save();

            $output->writeln(sprintf('Discount with id %s updated.', $discountEntity->getIdDiscount()));
        }

        $output->writeln('done.');
    }

}
?>
```
