---
title: Migration Guide - SalesAggregator
originalLink: https://documentation.spryker.com/v3/docs/mg-sales-aggregator
redirect_from:
  - /v3/docs/mg-sales-aggregator
  - /v3/docs/en/mg-sales-aggregator
---

## Upgrading from Version 4.* to Version 5.*

`SalesAggregator` version 4 is last version to be released for this module. Apart from future bug fixes, it will no longer be developed and Core will no longer use it to get order totals anymore.
There are two steps to the two migration process. 
* The first is to migrate all your orders to the new structure and drop use of `SalesAggregator`. 
* The second is to migrate your code to support the `old Aggregators`.
 
To learn how to migrate to the new structure, see [Migration Guide - Calculation](https://docs.demo-spryker.com/v4/docs/mg-calculation).

### Enable the `SalesAggregator` in Your Project
The `SalesAggregator` module has been deprecated but all calculators are still provided. If you want to keep them you can do so with a few changes to the code.
All `SalesAggregatorr` plugins were moved to the `SalesAggregator` module's, final core plugins list.

```php
<?php
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ProductBundlePriceAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\DiscountTotalAmountAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\DiscountTotalAmountWithProductOptionsAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ExpenseTotalAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\GrandTotalAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ItemDiscountsOrderAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ItemGrossPriceAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ItemsWithProductOptionsAndDiscountsTaxAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ItemTaxAmountAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderDiscountsAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderDiscountsWithProductOptionsAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderExpensesWithDiscountsAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderExpenseTaxAmountAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderExpenseTaxWithDiscountsAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderGrandTotalWithDiscountsAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\OrderTaxAmountWithProductOptionsAndDiscountsAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ProductOptionDiscountsAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\ProductOptionsGrossPriceAggregatorPlugin;
    use Spryker\Zed\SalesAggregator\Communication\Plugin\OrderAmountAggregator\SubtotalOrderAggregatorPlugin;
?>
```
If you extended any of the above, update your namespace accordingly.
To receive future patches for related plugins, update all your use statements to point to the `salesAggregator` modules.
The modules are: `ProductOption`, `DiscountSalesAggregatorConnector`, `DiscountSalesAggregatorConnector` - they will no longer store any Aggregator plugins.

### Migrate Your Code to Support the Old Aggregators Sales module
Inject the `salesAggregator` Facade into your `\Pyz\Zed\Sales\SalesDependencyProvider::provideBusinessLayerDependencies` as follows:
```php
<?php

 /**
   * @param \Spryker\Zed\Kernel\Container $container
   *
   * @return \Spryker\Zed\Kernel\Container
   */
  public function provideBusinessLayerDependencies(Container $container)
  {
      $container[static::FACADE_SALES_AGGREGATOR] = function (Container $container) {
          return $container->getLocator()->SalesAggregator()->facade();
      };
  }

  /**
    * @param \Spryker\Zed\Kernel\Container $container
    *
    * @return \Spryker\Zed\Kernel\Container
    */
   public function provideCommunicationLayerDependencies(Container $container)
   {
       $container[static::FACADE_SALES_AGGREGATOR] = function (Container $container) {
           return $container->getLocator()->SalesAggregator()->facade();
       };
   }
?>
```

#### Injecting the Aggregator facade:
A similar approach to injecting the Aggregator facade can be used in other modules where replacement is necessary.

The sales `hydrator \Spryker\Zed\Sales\Business\Model\Order\OrderHydrator` no longer uses the Aggregator facade.
* To use it, provide `salesAggregatorFacade` to this class and add a method call in `createOrderTransfer` to `$this-&gt;salesAggregatorFacade-&gt;getOrderTotalByOrderTransfer($orderTransfer)`;
* To get old calculated objects, the Order table list also was using the SalesAggregator and therefore you need to include it in the OrdersTable by adding it as follows:

```php
<?php

  /**
    * @param array $item
    *
    * @return int
    */
   protected function getGrandTotal(array $item)
   {
       $orderTransfer = $this->salesAggregatorFacade->getOrderTotalsByIdSalesOrder($item[OrdersTableQueryBuilder::COL_ID_SALES_ORDER]);
       return $orderTransfer->getTotals()->getGrandTotal();

       //return $this->formatPrice($item[OrdersTableQueryBuilder::FIELD_ORDER_GRAND_TOTAL]);
   }
```

#### OMS Module
`Spryker\Zed\Oms\Business\Mail\MailHandler` also used `SalesAggregator`. To add it to `getOrderTransfer` ad the following to the method's top object:
```php
<?php
  $orderTransfer = $this->salesAggregatorFacade->getOrderTotalsByIdSalesOrder($salesOrderEntity->getIdSalesOrder());
?>
```

#### Refund Module
`Spryker\Zed\Refund\Business\Model\RefundCalculator` used the Aggregator to calculate refundable amount. To keep injecting the `SalesAggregatorFacade` to class and include the Aggregator:

```php
<?php
/**
    * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $salesOrderEntity
    *
    * @return \Generated\Shared\Transfer\OrderTransfer
*/
protected function getOrderTransfer(SpySalesOrder $salesOrderEntity)
{
   $orderTransfer = $this->salesAggregatorFacade
       ->getOrderTotalsByIdSalesOrder($salesOrderEntity->getIdSalesOrder());

   return $orderTransfer;
}
```
#### Payment methods
The payment methods have changed accordingly to use `SalesFacade` instead of `SalesAggregatorFacade`.


## Upgrading from Version 2.* to Version 3.*
The tax plugins are using the version 3.* of the Tax module. See [Migration Guide - Tax](https://documentation.spryker.com/module_migration_guides/mg-tax.htm) for more details.

## SalesAggregator Migration Console Command

<details details>
<summary>SalesAggregator Migration Console Command:</summary>

```php
<?php
/**
 * Copyright © 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\SalesAggregator\Communication\Console;

use Exception;
use Generated\Shared\Transfer\ExpenseTransfer;
use Generated\Shared\Transfer\ItemTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Generated\Shared\Transfer\ProductOptionTransfer;
use Generated\Shared\Transfer\TaxTotalTransfer;
use Generated\Shared\Transfer\TotalsTransfer;
use Generated\Zed\Ide\Price;
use Orm\Zed\Sales\Persistence\Map\SpySalesOrderTableMap;
use Orm\Zed\Sales\Persistence\SpySalesExpense;
use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Orm\Zed\Sales\Persistence\SpySalesOrderItemOption;
use Orm\Zed\Sales\Persistence\SpySalesOrderQuery;
use Orm\Zed\Sales\Persistence\SpySalesOrderTotals;
use Propel\Runtime\Propel;
use Pyz\Zed\Calculation\CalculationDependencyProvider;
use Spryker\Shared\Price\PriceMode;
use Spryker\Zed\Calculation\Business\CalculationFacade;
use Spryker\Zed\Calculation\Business\Model\Executor\OrderCalculatorExecutor;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\CanceledTotalCalculationPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\DiscountAmountAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\DiscountTotalCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\ExpenseTotalCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\GrandTotalCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\ItemDiscountAmountFullAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\ItemProductOptionPriceAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\ItemSubtotalAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\ItemTaxAmountFullAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\OrderTaxTotalCalculationPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\PriceCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\PriceToPayAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\RefundableAmountCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\RefundTotalCalculatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\SubtotalCalculatorPlugin;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Spryker\Zed\Tax\Communication\Plugin\Calculator\TaxAmountAfterCancellationCalculatorPlugin;
use Spryker\Zed\Tax\Communication\Plugin\Calculator\TaxAmountCalculatorPlugin;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Propel\Runtime\ActiveQuery\Criteria;
use Symfony\Component\Console\Question\ConfirmationQuestion;

/**
 * @method \Spryker\Zed\SalesAggregator\Communication\SalesAggregatorCommunicationFactory getFactory()
 * @method \Spryker\Zed\SalesAggregator\Business\SalesAggregatorFacade getFacade()
 */
class SalesAggregatorMigrationConsole extends Console
{

    const COMMAND_NAME = 'sales-aggregator:migrate';
    const COMMAND_DESCRIPTION = 'Migrate sales old sales order which used sales aggregator';
    const CONSOLE_ARGUMENT_DRY_RUN = 'dry-run';


    /**
     * @return void
     */
    protected function configure()
    {
        $this->setName(static::COMMAND_NAME);
        $this->setDescription(static::COMMAND_DESCRIPTION);

        $this->addOption(
            static::CONSOLE_ARGUMENT_DRY_RUN,
            null,
            InputOption::VALUE_REQUIRED,
            'Run verification checks, do not store changes to database.',
            false
        );

        parent::configure();
    }

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return int|null|void
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $salesAggregatorFacade = $this->getFacade();
        $calculationExecutor = $this->createCalculationFacade();

        $exportOrdersTillGivenDate = new \DateTime();

        $ordersForUpdate = SpySalesOrderQuery::create()
            ->filterByCreatedAt(
                $exportOrdersTillGivenDate,
                Criteria::LESS_EQUAL
            )
            ->find();

        $totalNumberOfOrdersForUpdate = count($ordersForUpdate);

        if ($totalNumberOfOrdersForUpdate === 0) {
            $output->writeln(
                sprintf(
                    'No orders found for given date range <= %s ',
                    $exportOrdersTillGivenDate->format('Y-m-d')
                )
            );
            return;
        }

        $helper = $this->getQuestionHelper();
        $question = new ConfirmationQuestion(
            sprintf('Migrate %s orders? (y|n)', $totalNumberOfOrdersForUpdate),
            false
        );

        if (!$helper->ask($input, $output, $question)) {
            $output->writeln('Aborted.');
            return;
        }

        $output->writeln(sprintf('Processing %s orders...', $totalNumberOfOrdersForUpdate));

        $dryRun = $input->getOption(static::CONSOLE_ARGUMENT_DRY_RUN);
        $connection = Propel::getConnection();
        $numberOfProblems = 0;
        $numberMigrated = 0;
        foreach ($ordersForUpdate as $salesOrderEntity) {

            $orderTransfer = $salesAggregatorFacade->getOrderTotalsByIdSalesOrder($salesOrderEntity->getIdSalesOrder());

            $salesAggregatorOrderTransfer = new OrderTransfer();
            $salesAggregatorOrderTransfer->fromArray($orderTransfer->toArray());


            $orderTransfer = $this->resetRefundableAmount($orderTransfer);
            $orderTransfer->setPriceMode(PriceMode::PRICE_MODE_GROSS);
            $newCalculatedOrderTransfer = $calculationExecutor->recalculate($orderTransfer);

            $errors = $this->verifyCalculatedValues($salesAggregatorOrderTransfer, $newCalculatedOrderTransfer);

            if (count($errors) > 0) {

                $output->writeln(sprintf('Verification failed for order with id %d.', $salesOrderEntity->getIdSalesOrder()));
                $output->writeln('Found problems in:');

                foreach ($errors as $field => $values) {
                    list($aggregatorValue, $newCalculatedValue) = $values;
                    $output->writeln(
                        ' * Field: '. $field . ', Old aggregated value: ' . $aggregatorValue . ', New calculated Value: ' . $newCalculatedValue
                    );
                }
                $numberOfProblems++;
                $output->writeln('Skipping...');
                continue;
            }


            if ($dryRun) {
                continue;
            }

            try {

                $connection->beginTransaction();

                $this->updateOrderItems($salesOrderEntity, $newCalculatedOrderTransfer);
                $this->saveOrderTotals($newCalculatedOrderTransfer, $salesOrderEntity->getIdSalesOrder());
                $this->saveOrderExpenses($salesOrderEntity, $newCalculatedOrderTransfer);

                $salesOrderEntity->setPriceMode(PriceMode::TAX_MODE_GROSS);
                $salesOrderEntity->save();

                $connection->commit();

                $numberMigrated++;

            } catch (Exception $exception) {
                $numberOfProblems++;
                $output->writeln($exception->getMessage());
                $connection->rollBack();
            }
        }


        if ($dryRun) {
            if ($numberOfProblems > 0) {
                $output->writeln(sprintf('Dry run failed, %d problems found', $numberOfProblems));
            } else {
                $output->writeln('Dry run successful no problems were found.');
            }
        }

        $output->writeln(sprintf('Migration complete. %d orders migrated.', $numberMigrated));
    }

    /***
     * @param \Generated\Shared\Transfer\OrderTransfer $salesAggregatorOrderTransfer
     * @param \Generated\Shared\Transfer\OrderTransfer $newCalculatedOrderTransfer
     *
     * @return array
     */
    protected function verifyCalculatedValues(
        OrderTransfer $salesAggregatorOrderTransfer,
        OrderTransfer $newCalculatedOrderTransfer
    ) {

        $errors = [];

        $aggregatorTotals = $salesAggregatorOrderTransfer->getTotals();
        $newCalculatedTotals = $newCalculatedOrderTransfer->getTotals();

        $this->validateProperty($aggregatorTotals->getDiscountTotal(), $newCalculatedTotals->getDiscountTotal(), 'TotalsTransfer::' .TotalsTransfer::DISCOUNT_TOTAL, $errors);
        $this->validateProperty($aggregatorTotals->getExpenseTotal(), $newCalculatedTotals->getExpenseTotal(), 'TotalsTransfer::' .TotalsTransfer::EXPENSE_TOTAL, $errors);
        $this->validateProperty($aggregatorTotals->getSubtotal(), $newCalculatedTotals->getSubtotal(), 'TotalsTransfer::' .TotalsTransfer::SUBTOTAL, $errors);

        $this->validateProperty($aggregatorTotals->getTaxTotal()->getAmount(), $newCalculatedTotals->getTaxTotal()->getAmount(), 'TaxTotalTransfer::' . TaxTotalTransfer::AMOUNT, $errors);
        $this->validateProperty($aggregatorTotals->getGrandTotal(), $newCalculatedTotals->getGrandTotal(), 'TotalsTransfer::' .TotalsTransfer::GRAND_TOTAL, $errors);

        foreach ($salesAggregatorOrderTransfer->getItems() as $aggregatorItemTransfer) {
            foreach ($newCalculatedOrderTransfer->getItems() as $newItemTransfer) {
                if ($aggregatorItemTransfer->getIdSalesOrderItem() !== $newItemTransfer->getIdSalesOrderItem()) {
                    continue;
                }

                $this->validateProperty($aggregatorItemTransfer->getCanceledAmount(), $newItemTransfer->getCanceledAmount(), 'ItemTransfer::' . ItemTransfer::CANCELED_AMOUNT, $errors);
                $this->validateProperty($aggregatorItemTransfer->getRefundableAmount(), $newItemTransfer->getRefundableAmount(), 'ItemTransfer::' . ItemTransfer::REFUNDABLE_AMOUNT, $errors);
                $this->validateProperty($aggregatorItemTransfer->getUnitGrossPrice(), $newItemTransfer->getUnitPrice(), 'ItemTransfer::' . ItemTransfer::UNIT_PRICE, $errors);
                $this->validateProperty($aggregatorItemTransfer->getUnitGrossPriceWithProductOptions(), $newItemTransfer->getUnitSubtotalAggregation(), 'ItemTransfer::' . ItemTransfer::UNIT_SUBTOTAL_AGGREGATION, $errors);
                //$this->validateProperty($aggregatorItemTransfer->getUnitTaxAmount(), $newItemTransfer->getUnitTaxAmount(), 'ItemTransfer::' . ItemTransfer::UNIT_TAX_AMOUNT, $errors); //unit tax amount in new version is after discounts!!!
                $this->validateProperty($aggregatorItemTransfer->getUnitGrossPriceWithProductOptionAndDiscountAmounts(), $newItemTransfer->getUnitPriceToPayAggregation(), 'ItemTransfer::' . ItemTransfer::UNIT_PRICE_TO_PAY_AGGREGATION, $errors);

                $this->validateProperty($aggregatorItemTransfer->getUnitTaxAmountWithProductOptionAndDiscountAmounts(), $newItemTransfer->getUnitTaxAmountFullAggregation(), 'ItemTransfer::' . ItemTransfer::UNIT_TAX_AMOUNT_FULL_AGGREGATION, $errors);


                foreach ($aggregatorItemTransfer->getProductOptions() as $aggregatedProductOptionTransfer) {
                    foreach ($newItemTransfer->getProductOptions() as $newCalculatedOptionTransfer) {
                        if ($aggregatedProductOptionTransfer->getIdSalesOrderItemOption() !== $newCalculatedOptionTransfer->getIdSalesOrderItemOption()) {
                            continue;
                        }

                        $this->validateProperty($aggregatedProductOptionTransfer->getUnitTaxAmountWithDiscounts(), $newCalculatedOptionTransfer->getUnitTaxAmount(), 'ProductOptionTransfer::' . ProductOptionTransfer::UNIT_TAX_AMOUNT, $errors);
                        $this->validateProperty($aggregatedProductOptionTransfer->getUnitGrossPrice(), $newCalculatedOptionTransfer->getUnitPrice(), 'ProductOptionTransfer::' . ProductOptionTransfer::UNIT_PRICE, $errors);
                    }
                }

            }
        }

        foreach ($salesAggregatorOrderTransfer->getExpenses() as $aggregatorExpenseTransfer) {
            foreach ($newCalculatedOrderTransfer->getExpenses() as $newCalculatedExpenseTransfer) {
                if ($aggregatorExpenseTransfer->getIdSalesExpense() !== $newCalculatedExpenseTransfer->getIdSalesExpense()) {
                    continue;
                }

                $this->validateProperty($aggregatorExpenseTransfer->getCanceledAmount(), $newCalculatedExpenseTransfer->getCanceledAmount(), 'ExpenseTransfer::' . ExpenseTransfer::CANCELED_AMOUNT, $errors);
                $this->validateProperty($aggregatorExpenseTransfer->getRefundableAmount(), $newCalculatedExpenseTransfer->getRefundableAmount(), 'ExpenseTransfer::' . ExpenseTransfer::REFUNDABLE_AMOUNT, $errors);
                $this->validateProperty($aggregatorExpenseTransfer->getUnitGrossPrice(), $newCalculatedExpenseTransfer->getUnitPrice(), 'ExpenseTransfer::' . ExpenseTransfer::UNIT_PRICE, $errors);
                $this->validateProperty($aggregatorExpenseTransfer->getUnitTaxAmountWithDiscounts(), $newCalculatedExpenseTransfer->getUnitTaxAmount(), 'ExpenseTransfer::' . ExpenseTransfer::UNIT_TAX_AMOUNT, $errors);
                $this->validateProperty($aggregatorExpenseTransfer->getUnitGrossPriceWithDiscounts(), $newCalculatedExpenseTransfer->getUnitPriceToPayAggregation(), 'ExpenseTransfer::' . ExpenseTransfer::UNIT_PRICE_TO_PAY_AGGREGATION, $errors);

            }
        }

        return $errors;

    }

    /**
     * @param mixed $value1
     * @param mixed $value2
     * @param string $key
     * @param array $error
     *
     * @return void
     */
    public function validateProperty($value1, $value2, $key, array &$error)
    {
        if ($value1 !== $value2) {
            $error[$key] = [
                $value1,
                $value2
            ];
        }
    }


    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $salesOrderItemEntity
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderItem
     */
    protected function hydrateSalesOrderItemEntity(
        SpySalesOrderItem $salesOrderItemEntity,
        ItemTransfer $itemTransfer
    ) {

        $salesOrderItemEntity->setNetPrice($itemTransfer->getUnitNetPrice());
        $salesOrderItemEntity->setPrice($itemTransfer->getUnitPrice());
        $salesOrderItemEntity->setPriceToPayAggregation($itemTransfer->getUnitPriceToPayAggregation());
        $salesOrderItemEntity->setSubtotalAggregation($itemTransfer->getUnitSubtotalAggregation());
        $salesOrderItemEntity->setProductOptionPriceAggregation($itemTransfer->getUnitProductOptionPriceAggregation());
        $salesOrderItemEntity->setExpensePriceAggregation($itemTransfer->getUnitExpensePriceAggregation());
        $salesOrderItemEntity->setTaxAmount($itemTransfer->getUnitTaxAmount());
        $salesOrderItemEntity->setTaxAmountFullAggregation($itemTransfer->getUnitTaxAmountFullAggregation());
        $salesOrderItemEntity->setDiscountAmountAggregation($itemTransfer->getUnitDiscountAmountAggregation());
        $salesOrderItemEntity->setDiscountAmountFullAggregation($itemTransfer->getUnitDiscountAmountFullAggregation());
        $salesOrderItemEntity->setRefundableAmount($itemTransfer->getRefundableAmount());

        return $salesOrderItemEntity;
    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItemOption $salesOrderItemOptionEntity
     * @param \Generated\Shared\Transfer\ProductOptionTransfer $productOptionTransfer
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesOrderItemOption
     */
    protected function hydrateSalesOrderItemOptionEntity(
        SpySalesOrderItemOption $salesOrderItemOptionEntity,
        ProductOptionTransfer $productOptionTransfer
    ) {
        $salesOrderItemOptionEntity->setGrossPrice($productOptionTransfer->getUnitGrossPrice());
        $salesOrderItemOptionEntity->setNetPrice($productOptionTransfer->getUnitNetPrice());
        $salesOrderItemOptionEntity->setTaxAmount($productOptionTransfer->getUnitTaxAmount());
        $salesOrderItemOptionEntity->setDiscountAmountAggregation($productOptionTransfer->getUnitDiscountAmountAggregation());
        $salesOrderItemOptionEntity->setPrice($productOptionTransfer->getUnitPrice());


        return $salesOrderItemOptionEntity;

    }

    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesExpense $salesOrderExpenseEntity
     * @param \Generated\Shared\Transfer\ExpenseTransfer $expenseTransfer
     *
     * @return \Orm\Zed\Sales\Persistence\SpySalesExpense
     */
    protected function hydrateOrderExpenseEntity(
        SpySalesExpense $salesOrderExpenseEntity,
        ExpenseTransfer $expenseTransfer
    ) {
        $salesOrderExpenseEntity->setGrossPrice($expenseTransfer->getUnitGrossPrice());
        $salesOrderExpenseEntity->setNetPrice($expenseTransfer->getUnitNetPrice());
        $salesOrderExpenseEntity->setPrice($expenseTransfer->getUnitPrice());
        $salesOrderExpenseEntity->setTaxAmount($expenseTransfer->getUnitTaxAmount());
        $salesOrderExpenseEntity->setDiscountAmountAggregation($expenseTransfer->getUnitDiscountAmountAggregation());
        $salesOrderExpenseEntity->setPriceToPayAggregation($expenseTransfer->getUnitPriceToPayAggregation());

        return $salesOrderExpenseEntity;
    }

    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     * @param int $idSalesOrder
     *
     * @return void
     */
    protected function saveOrderTotals(OrderTransfer $orderTransfer, $idSalesOrder)
    {
        $taxTotal = 0;
        if ($orderTransfer->getTotals()->getTaxTotal()) {
            $taxTotal = $orderTransfer->getTotals()->getTaxTotal()->getAmount();
        }

        $salesOrderTotalsEntity = new SpySalesOrderTotals();
        $salesOrderTotalsEntity->setFkSalesOrder($idSalesOrder);
        $salesOrderTotalsEntity->fromArray($orderTransfer->getTotals()->toArray());
        $salesOrderTotalsEntity->setTaxTotal($taxTotal);
        $salesOrderTotalsEntity->setOrderExpenseTotal($orderTransfer->getTotals()->getExpenseTotal());
        $salesOrderTotalsEntity->save();
    }

    /**
     * @return \Spryker\Zed\Calculation\Business\Model\Executor\OrderCalculatorExecutor
     */
    protected function createCalculationFacade()
    {
        return new OrderCalculatorExecutor($this->getCalculatorPlugins());

    }

    /**
     * @return array
     */
    protected function getCalculatorPlugins()
    {
        return [
            new PriceCalculatorPlugin(),
            new ItemProductOptionPriceAggregatorPlugin(),
            new ItemSubtotalAggregatorPlugin(),

            new SubtotalCalculatorPlugin(),

            new DiscountAmountAggregatorPlugin(),
            new ItemDiscountAmountFullAggregatorPlugin(),

            new PriceToPayAggregatorPlugin(),

            new TaxAmountCalculatorPlugin(),
            new ItemTaxAmountFullAggregatorPlugin(),
            new TaxAmountAfterCancellationCalculatorPlugin(),

            new RefundableAmountCalculatorPlugin(),

            new ExpenseTotalCalculatorPlugin(),
            new DiscountTotalCalculatorPlugin(),
            new RefundTotalCalculatorPlugin(),
            new CanceledTotalCalculationPlugin(),
            new GrandTotalCalculatorPlugin(),

            new OrderTaxTotalCalculationPlugin(),
        ];
    }

    /**
     * @param SpySalesOrder $salesOrderEntity
     * @param OrderTransfer $orderTransfer
     *
     * @return void
     */
    protected function updateOrderItems(SpySalesOrder $salesOrderEntity, OrderTransfer $orderTransfer)
    {
        foreach ($salesOrderEntity->getItems() as $salesOrderItemEntity) {
            foreach ($orderTransfer->getItems() as $itemTransfer) {
                if ($salesOrderItemEntity->getIdSalesOrderItem() != $itemTransfer->getIdSalesOrderItem()) {
                    continue;
                }

                $salesOrderItemEntity = $this->hydrateSalesOrderItemEntity($salesOrderItemEntity, $itemTransfer);
                $salesOrderItemEntity->save();

                if (count($itemTransfer->getProductOptions()) === 0) {
                    continue;
                }

                $this->updateItemOptions($salesOrderItemEntity, $itemTransfer);

            }
        }
    }

    /**
     * @param $salesOrderItemEntity
     * @param ItemTransfer $itemTransfer
     *
     * @return void
     */
    protected function updateItemOptions(SpySalesOrderItem $salesOrderItemEntity, ItemTransfer $itemTransfer)
    {
        foreach ($salesOrderItemEntity->getOptions() as $salesOrderItemOptionEntity) {
            foreach ($itemTransfer->getProductOptions() as $productOptionTransfer) {
                if ($productOptionTransfer->getIdSalesOrderItemOption() !== $productOptionTransfer->getIdProductOptionValue()) {
                    continue;
                }

                $salesOrderItemOptionEntity = $this->hydrateSalesOrderItemOptionEntity($salesOrderItemOptionEntity, $productOptionTransfer);
                $salesOrderItemOptionEntity->save();
            }
        }
    }

    /**
     * @param SpySalesOrder $salesOrderEntity
     * @param OrderTransfer $orderTransfer
     *
     * @return void
     */
    protected function saveOrderExpenses(SpySalesOrder $salesOrderEntity, OrderTransfer $orderTransfer)
    {
        foreach ($salesOrderEntity->getExpenses() as $salesOrderExpenseEntity) {
            foreach ($orderTransfer->getExpenses() as $expenseTransfer) {
                if ($expenseTransfer->getIdSalesExpense() !== $salesOrderExpenseEntity->getIdSalesExpense()) {
                    continue;
                }

                $salesOrderExpenseEntity = $this->hydrateOrderExpenseEntity($salesOrderExpenseEntity, $expenseTransfer);
                $salesOrderExpenseEntity->save();
            }
        }
    }

    /**
     * @return mixed
     */
    protected function getQuestionHelper()
    {
        return $this->getHelper('question');
    }

    /**
     * @param OrderTransfer $orderTransfer
     *
     * @return OrderTransfer
     */
    protected function resetRefundableAmount(OrderTransfer $orderTransfer)
    {
        foreach ($orderTransfer->getItems() as $itemTransfer) {
            $itemTransfer->setRefundableAmount(0);
            foreach ($itemTransfer->getProductOptions() as $productOptionTransfer) {
                $productOptionTransfer->setRefundableAmount(0);
            }
        }

        foreach ($orderTransfer->getExpenses() as $expenseTransfer) {
            $expenseTransfer->setRefundableAmount(0);
        }

        return $orderTransfer;
    }

}

?>
```
    
</br>
</details>

