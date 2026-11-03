---
title: Add a custom data type to Data Exchange Jobs
description: Learn how to import and export your own data with Data Exchange Jobs by implementing a schema plugin for the DataExchange engine.
last_updated: Oct 29, 2026
template: howto-guide-template
---

The *Data Exchange Jobs* feature is driven by the `DataExchange` module, a type-agnostic engine that does not know what data it moves. It stores import jobs and runs, reads uploaded CSV files in batches, records per-row errors, and writes export files. The data itself is handled by *schema plugins*: one plugin per job type that tells the engine which columns the file has and which steps process each batch of rows. The product CSV workflow is one such plugin, `ProductCsvImportSchemaPlugin` of the `ProductExperienceManagement` module.

This document shows how to add a second job type, using a customer import as the example. A new type costs one schema plugin class, one import step class per concern, and one line in the project's dependency provider. Neither the engine nor the product module changes.

For an overview of the engine, see [Data Exchange Jobs feature overview](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/data-exchange-jobs-feature-overview.html).

## Prerequisites

Install the [Data Exchange Jobs feature](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/install/install-the-data-exchange-jobs-feature.html). It installs the `DataExchange` and `DataExchangeExtension` modules the plugin interfaces come from.

## 1. Define the schema plugin

The schema plugin implements `ImportSchemaPluginInterface` from the `DataExchangeExtension` module and answers four questions:

| METHOD | RETURNS |
| --- | --- |
| `getType()` | The unique job type. Back Office users pick it in the **Type** field when creating an import job, and the engine uses it to find the plugin for a run. |
| `getSchema()` | The columns of the file: for every column, the header as it appears in the file (`property_name_in_file`) and the system property name the import steps work with (`system_property_name`). |
| `getImportSteps()` | The import steps in processing order. |
| `getPlaceholderProvider()` | The values of the placeholders used in the column headers; see [Placeholders in column headers](#placeholders-in-column-headers). |

The engine stores the schema on the import job when the job is created, so changing `getSchema()` affects jobs created afterwards.

**src/Pyz/Zed/CustomerDataExchange/Communication/Plugin/DataExchange/CustomerCsvImportSchemaPlugin.php**

```php
<?php

namespace Pyz\Zed\CustomerDataExchange\Communication\Plugin\DataExchange;

use Pyz\Zed\CustomerDataExchange\Business\ImportStep\CustomerCsvImportStep;
use Pyz\Zed\CustomerDataExchange\Business\PlaceholderProvider\EmptyPlaceholderProvider;
use Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ColumnPlaceholderProviderInterface;
use Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ImportSchemaPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class CustomerCsvImportSchemaPlugin extends AbstractPlugin implements ImportSchemaPluginInterface
{
    protected const string TYPE = 'customers-csv-import';

    public function getType(): string
    {
        return static::TYPE;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function getSchema(): array
    {
        return [
            ['property_name_in_file' => 'Email', 'system_property_name' => 'email'],
            ['property_name_in_file' => 'First Name', 'system_property_name' => 'first_name'],
            ['property_name_in_file' => 'Last Name', 'system_property_name' => 'last_name'],
            ['property_name_in_file' => 'Salutation', 'system_property_name' => 'salutation'],
        ];
    }

    /**
     * @return array<\Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ImportStepInterface>
     */
    public function getImportSteps(): array
    {
        return [
            new CustomerCsvImportStep($this->getFactory()->getCustomerFacade()),
        ];
    }

    public function getPlaceholderProvider(): ColumnPlaceholderProviderInterface
    {
        return new EmptyPlaceholderProvider();
    }
}
```

The example keeps the step and the placeholder provider in a dedicated project module, `CustomerDataExchange`, whose factory provides the `Customer` facade. Place them in the module that owns the data you import.

### Placeholders in column headers

A column header can contain placeholders in curly braces, for example `Name ({locale})` mapped to `name.{locale}`. The engine expands such a column once per placeholder value when it builds the CSV template and the export file, and it matches the expanded headers back to the system property names when it reads an uploaded file. The values come from the placeholder provider of the schema plugin:

```php
<?php

namespace Pyz\Zed\CustomerDataExchange\Business\PlaceholderProvider;

use Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ColumnPlaceholderProviderInterface;

class LocalePlaceholderProvider implements ColumnPlaceholderProviderInterface
{
    /**
     * @return array<string, array<string>>
     */
    public function getPlaceholderValues(): array
    {
        return [
            'locale' => ['de_DE', 'en_US'],
        ];
    }
}
```

A placeholder with no values removes every column that uses it. If the schema has no placeholders, as in the customer example, return an empty array:

**src/Pyz/Zed/CustomerDataExchange/Business/PlaceholderProvider/EmptyPlaceholderProvider.php**

```php
<?php

namespace Pyz\Zed\CustomerDataExchange\Business\PlaceholderProvider;

use Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ColumnPlaceholderProviderInterface;

class EmptyPlaceholderProvider implements ColumnPlaceholderProviderInterface
{
    /**
     * @return array<string, array<string>>
     */
    public function getPlaceholderValues(): array
    {
        return [];
    }
}
```

## 2. Implement the import step

An import step implements `ImportStepInterface` and receives every batch of rows of a run, in the order the steps are returned by `getImportSteps()`. The engine ships no base class, so your module depends on `spryker/data-exchange-extension` only; the step builds the two transfers it reports itself:

| TRANSFER | PURPOSE |
| --- | --- |
| `ImportStepErrorTransfer` (`csvRowNumber`, `errorMessage`) | Reports that a row failed. The engine stores the error with the row number and counts the row as failed. |
| `ImportPublishEventTransfer` (`eventName`, `entityId`) | Asks the engine to trigger a publish event for an entity after the whole file has been processed. |

The `$rows` argument is indexed by the row number in the file, and each row is indexed by the system property names of the schema. The `$propertyNamesInFile` argument maps every system property name back to the header in the file, so that error messages can name the column the user sees.

**src/Pyz/Zed/CustomerDataExchange/Business/ImportStep/CustomerCsvImportStep.php**

```php
<?php

namespace Pyz\Zed\CustomerDataExchange\Business\ImportStep;

use Generated\Shared\Transfer\CustomerTransfer;
use Generated\Shared\Transfer\ImportPublishEventTransfer;
use Generated\Shared\Transfer\ImportStepErrorTransfer;
use Generated\Shared\Transfer\ImportStepResponseTransfer;
use Spryker\Zed\Customer\Business\CustomerFacadeInterface;
use Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ImportStepInterface;

class CustomerCsvImportStep implements ImportStepInterface
{
    protected const string EVENT_CUSTOMER_PUBLISH = 'Customer.customer.publish';

    public function __construct(protected CustomerFacadeInterface $customerFacade)
    {
    }

    /**
     * @param array<int, array<string, string>> $rows
     * @param array<string, string> $propertyNamesInFile
     */
    public function executeBatch(array $rows, array $propertyNamesInFile = []): ImportStepResponseTransfer
    {
        $response = (new ImportStepResponseTransfer())->setIsSuccessful(true);

        foreach ($rows as $rowNumber => $row) {
            if ($row['email'] === '') {
                $response->setIsSuccessful(false);
                $response->addError((new ImportStepErrorTransfer())
                    ->setCsvRowNumber($rowNumber)
                    ->setErrorMessage(sprintf('Column "%s" must not be empty.', $propertyNamesInFile['email'] ?? 'email')));

                continue;
            }

            $customerResponseTransfer = $this->customerFacade->addCustomer(
                (new CustomerTransfer())
                    ->setEmail($row['email'])
                    ->setFirstName($row['first_name'])
                    ->setLastName($row['last_name'])
                    ->setSalutation($row['salutation']),
            );

            if (!$customerResponseTransfer->getIsSuccess()) {
                $response->setIsSuccessful(false);

                foreach ($customerResponseTransfer->getErrors() as $customerErrorTransfer) {
                    $response->addError((new ImportStepErrorTransfer())
                        ->setCsvRowNumber($rowNumber)
                        ->setErrorMessage($customerErrorTransfer->getMessageOrFail()));
                }

                continue;
            }

            $response->addPublishEvent((new ImportPublishEventTransfer())
                ->setEventName(static::EVENT_CUSTOMER_PUBLISH)
                ->setEntityId($customerResponseTransfer->getCustomerTransferOrFail()->getIdCustomerOrFail()));
        }

        return $response;
    }
}
```

Keep the following engine rules in mind when writing a step:

- **Steps run in the order of `getImportSteps()`.** A step that needs entities another step creates, for example the address step after the customer step, must be registered after it.
- **Every step sees every batch.** Split the work by concern, for example one step for the customer and one for its addresses, and let each step read only the columns it needs.
- **A row fails as soon as one step reports an error for it**, but the remaining steps still receive the row. Validate before you persist.
- **Steps are stateless.** A step must not depend on data from a previous batch or from another step.
- **Entity events are off while rows are written.** The engine disables the `EventBehavior` events for the duration of the run and triggers the publish events the steps returned once, after the last row. A step must not call `EventBehaviorConfig::enableEvent()` itself. Report a publish event for every entity you create or change, or Storefront data is not updated.
- **There is no per-run setup or tear-down hook on a step.** Work that runs once per run, before or after the rows, goes into an `ImportPreProcessorPluginInterface` or `ImportPostProcessorPluginInterface` plugin (section 4).
- **An exception fails the run.** If a step throws, the engine marks the run as *failed*, records the exception message as a run error, and re-enables the entity events.

## 3. Optional: Make the type exportable

A job type is exportable when its schema plugin also implements `ExportSchemaPluginInterface` and is registered in `getExportSchemaPlugins()` (section 4). Both interfaces extend `SchemaPluginInterface`, so one class provides `getType()`, `getSchema()`, and `getPlaceholderProvider()` for both sides, and the engine writes a CSV file with the same columns as the import file. The export needs two more classes:

| INTERFACE | PURPOSE |
| --- | --- |
| `ExportDataProviderInterface` | Returns the rows to export in batches. `getBatch(array $columns, int $limit, int $lastId)` returns up to `$limit` rows whose primary key is greater than `$lastId`, sorted by the primary key in ascending order, each with the key `ExportDataProviderInterface::INTERNAL_COLUMN_CURSOR_ID` set to the primary key. The engine takes the cursor of the last row of a batch as the `$lastId` of the next call, so an unsorted batch skips rows; it stops at the first empty array, so the provider must return an empty array at the end. The cursor key never reaches the file: the engine writes only the requested `$columns` of every row. |
| `ExportStepInterface` | Fills the columns of its concern. `exportRows(array $rows, array $columns)` receives the batch and the resolved column headers and returns the rows with the columns filled. The first step initializes the row structure. |

```php
    /**
     * @return array<\Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ExportStepInterface>
     */
    public function getExportSteps(): array
    {
        return [
            new CustomerCsvExportStep($this->getFactory()->getCustomerFacade()),
        ];
    }

    public function getExportDataProvider(): ExportDataProviderInterface
    {
        return new CustomerExportDataProvider($this->getFactory()->getCustomerQuery());
    }
```

If the type is not exportable, register the plugin in `getImportSchemaPlugins()` only. The CSV template is still available for its import jobs; an export of such a job is rejected with an error.

## 4. Register the schema plugin

Register the plugin in the `DataExchange` dependency provider of your project:

**src/Pyz/Zed/DataExchange/DataExchangeDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataExchange;

use Pyz\Zed\CustomerDataExchange\Communication\Plugin\DataExchange\CustomerCsvImportSchemaPlugin;
use Spryker\Zed\DataExchange\DataExchangeDependencyProvider as SprykerDataExchangeDependencyProvider;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductCsvImportSchemaPlugin;

class DataExchangeDependencyProvider extends SprykerDataExchangeDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ImportSchemaPluginInterface>
     */
    protected function getImportSchemaPlugins(): array
    {
        return [
            new ProductCsvImportSchemaPlugin(),
            new CustomerCsvImportSchemaPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ExportSchemaPluginInterface>
     */
    protected function getExportSchemaPlugins(): array
    {
        return [
            new ProductCsvImportSchemaPlugin(),
            new CustomerCsvImportSchemaPlugin(),
        ];
    }
}
```

Register the plugin in `getExportSchemaPlugins()` only if it implements `ExportSchemaPluginInterface` (section 3).

The same dependency provider offers two optional hooks that run once per import run, before and after the rows are processed: `getImportPreProcessorPlugins()` with `ImportPreProcessorPluginInterface` and `getImportPostProcessorPlugins()` with `ImportPostProcessorPluginInterface`. Both receive the `ImportJobRunTransfer` of the run.

## 5. Verify the new type

1. In the Back Office, go to **Import & Export&nbsp;> Import** and click **Create Import Job**. Make sure that **customers-csv-import** is offered in the **Type** field, and create a job with it.
2. In the job row, click **Create Run**. Under *Step 1: Download Template*, click **Download CSV Template**. The file contains one header row with the columns of `getSchema()`.
3. Fill in a few rows, upload the file under *Step 2: Upload Filled CSV* with **Upload & Queue Import**, and process the run:

```bash
console import:job:run
```

4. Open the run. The status is *done*, the counters show the processed, successful, and failed rows, and rows rejected by the step are listed with their row number and message.

## Related topics

- [Data Exchange Jobs feature overview](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/data-exchange-jobs-feature-overview.html)
- [Install the Data Exchange Jobs feature](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/install/install-the-data-exchange-jobs-feature.html)
- [Back Office product CSV import and export feature overview](/docs/pbc/all/product-experience-management/latest/back-office-product-csv-import-and-export-feature-overview.html)
