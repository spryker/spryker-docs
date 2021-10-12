---
title: Combined Product Offer Import Integration
last_updated: Oct 12, 2021
description: This document describes the process how to integrate combined product offer import functionality.
draft: true
template: feature-integration-guide-template
---

### Prerequisites

To start integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Spryker Core | {{page.version}} | [Glue API: Spryker Core feature integration](https://documentation.spryker.com/docs/glue-api-spryker-core-feature-integration)  |
| Marketplace Product Offer | {{page.version}} | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html)  |
| Marketplace Product Offer Prices | {{page.version}} | [Marketplace Product Offer Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-prices-feature-integration.html)  |
| Marketplace Inventory Management | {{page.version}} | [Marketplace Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-inventory-management-feature-integration.html)  |


{% info_block infoBox "Info" %}

It's project level implementation applied on top on existing features.
No core feature installation required.

{% endinfo_block %}

### 1. Create project level implementation

- Merchant Product Offer

<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Business/MerchantProductOfferDataImportBusinessFactory.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport\Business;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Pyz\Zed\DataImport\Business\Model\DataImporterConditional;
use Pyz\Zed\DataImport\Business\Model\DataSet\DataSetConditionInterface;
use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Condition\CombinedMerchantProductOfferMandatoryColumnCondition;
use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Condition\CombinedMerchantProductOfferStoreMandatoryColumnCondition;
use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Step\CombinedApprovalStatusValidationStep;
use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Step\CombinedConcreteSkuValidationStep;
use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Step\CombinedMerchantProductOfferWriterStep;
use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Step\CombinedMerchantReferenceToIdMerchantStep;
use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Step\CombinedMerchantSkuValidationStep;
use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Step\CombinedStoreNameToIdStoreStep;
use Spryker\Zed\DataImport\Business\Model\DataImporterInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface;
use Spryker\Zed\MerchantProductOfferDataImport\Business\MerchantProductOfferDataImportBusinessFactory as SprykerMerchantProductOfferDataImportBusinessFactory;

/**
 * @method \Pyz\Zed\MerchantProductOfferDataImport\MerchantProductOfferDataImportConfig getConfig()
 */
class MerchantProductOfferDataImportBusinessFactory extends SprykerMerchantProductOfferDataImportBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
     */
    public function getCombinedMerchantProductOfferDataImporter(): DataImporterInterface
    {
        $dataImporter = $this->getConditionalCsvDataImporterFromConfig(
            $this->getConfig()->getCombinedMerchantProductOfferDataImporterConfiguration()
        );

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep($this->createCombinedMerchantReferenceToIdMerchantStep())
            ->addStep($this->createCombinedConcreteSkuValidationStep())
            ->addStep($this->createCombinedMerchantSkuValidationStep())
            ->addStep($this->createCombinedApprovalStatusValidationStep())
            ->addStep($this->createCombinedMerchantProductOfferWriterStep());

        $dataImporter
            ->setDataSetCondition($this->createCombinedMerchantProductOfferMandatoryColumnCondition())
            ->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
     */
    public function getCombinedMerchantProductOfferStoreDataImporter(): DataImporterInterface
    {
        $dataImporter = $this->getConditionalCsvDataImporterFromConfig(
            $this->getConfig()->getCombinedMerchantProductOfferStoreDataImporterConfiguration()
        );

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep($this->createProductOfferReferenceToIdProductOfferStep())
            ->addStep($this->createCombinedStoreNameToIdStoreStep())
            ->addStep($this->createMerchantProductOfferStoreWriterStep());

        $dataImporter
            ->setDataSetCondition($this->createCombinedMerchantProductOfferStoreMandatoryColumnCondition())
            ->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer $dataImporterConfigurationTransfer
     *
     * @return \Pyz\Zed\DataImport\Business\Model\DataImporterConditional
     */
    public function getConditionalCsvDataImporterFromConfig(
        DataImporterConfigurationTransfer $dataImporterConfigurationTransfer
    ): DataImporterConditional {
        $csvReader = $this->createCsvReaderFromConfig($dataImporterConfigurationTransfer->getReaderConfiguration());

        return $this->createDataImporterConditional($dataImporterConfigurationTransfer->getImportType(), $csvReader);
    }

    /**
     * @param string $importType
     * @param \Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface $reader
     *
     * @return \Pyz\Zed\DataImport\Business\Model\DataImporterConditional
     */
    public function createDataImporterConditional(
        string $importType,
        DataReaderInterface $reader
    ): DataImporterConditional {
        return new DataImporterConditional($importType, $reader, $this->getGracefulRunnerFacade());
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedMerchantReferenceToIdMerchantStep(): DataImportStepInterface
    {
        return new CombinedMerchantReferenceToIdMerchantStep();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedConcreteSkuValidationStep(): DataImportStepInterface
    {
        return new CombinedConcreteSkuValidationStep();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedMerchantSkuValidationStep(): DataImportStepInterface
    {
        return new CombinedMerchantSkuValidationStep();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedMerchantProductOfferWriterStep(): DataImportStepInterface
    {
        return new CombinedMerchantProductOfferWriterStep($this->getEventFacade());
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedStoreNameToIdStoreStep(): DataImportStepInterface
    {
        return new CombinedStoreNameToIdStoreStep();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedApprovalStatusValidationStep(): DataImportStepInterface
    {
        return new CombinedApprovalStatusValidationStep();
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\DataSet\DataSetConditionInterface
     */
    public function createCombinedMerchantProductOfferStoreMandatoryColumnCondition(): DataSetConditionInterface
    {
        return new CombinedMerchantProductOfferStoreMandatoryColumnCondition();
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\DataSet\DataSetConditionInterface
     */
    public function createCombinedMerchantProductOfferMandatoryColumnCondition(): DataSetConditionInterface
    {
        return new CombinedMerchantProductOfferMandatoryColumnCondition();
    }
}
```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Business/MerchantProductOfferDataImportFacade.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport\Business;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Spryker\Zed\MerchantProductOfferDataImport\Business\MerchantProductOfferDataImportFacade as SprykerMerchantProductOfferDataImportFacade;

/**
 * @method \Pyz\Zed\MerchantProductOfferDataImport\Business\MerchantProductOfferDataImportBusinessFactory getFactory()
 */
class MerchantProductOfferDataImportFacade extends SprykerMerchantProductOfferDataImportFacade implements MerchantProductOfferDataImportFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function importCombinedMerchantProductOfferData(
        ?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null
    ): DataImporterReportTransfer {
        return $this->getFactory()
            ->getCombinedMerchantProductOfferDataImporter()
            ->import($dataImporterConfigurationTransfer);
    }

    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function importCombinedMerchantProductOfferStoreData(
        ?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null
    ): DataImporterReportTransfer {
        return $this->getFactory()
            ->getCombinedMerchantProductOfferStoreDataImporter()
            ->import($dataImporterConfigurationTransfer);
    }
}
```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Business/MerchantProductOfferDataImportFacadeInterface.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport\Business;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Spryker\Zed\MerchantProductOfferDataImport\Business\MerchantProductOfferDataImportFacadeInterface as SprykerMerchantProductOfferDataImportFacadeInterface;

interface MerchantProductOfferDataImportFacadeInterface extends SprykerMerchantProductOfferDataImportFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function importCombinedMerchantProductOfferData(
        ?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null
    ): DataImporterReportTransfer;

    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function importCombinedMerchantProductOfferStoreData(
        ?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null
    ): DataImporterReportTransfer;
}
```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Business/Model/Condition/CombinedMerchantProductOfferMandatoryColumnCondition.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Condition;

use Pyz\Zed\DataImport\Business\CombinedProduct\DataSet\CombinedProductMandatoryColumnCondition;
use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\DataSet\CombinedMerchantProductOfferDataSetInterface;

class CombinedMerchantProductOfferMandatoryColumnCondition extends CombinedProductMandatoryColumnCondition
{
    /**
     * @return string[]
     */
    protected function getMandatoryColumns(): array
    {
        return [
            CombinedMerchantProductOfferDataSetInterface::MERCHANT_SKU,
            CombinedMerchantProductOfferDataSetInterface::MERCHANT_REFERENCE,
            CombinedMerchantProductOfferDataSetInterface::IS_ACTIVE,
            CombinedMerchantProductOfferDataSetInterface::CONCRETE_SKU,
            CombinedMerchantProductOfferDataSetInterface::APPROVAL_STATUS,
        ];
    }
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Business/Model/Condition/CombinedMerchantProductOfferStoreMandatoryColumnCondition.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Condition;

use Pyz\Zed\DataImport\Business\CombinedProduct\DataSet\CombinedProductMandatoryColumnCondition;
use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\DataSet\CombinedMerchantProductOfferDataSetInterface;

class CombinedMerchantProductOfferStoreMandatoryColumnCondition extends CombinedProductMandatoryColumnCondition
{
    /**
     * @return string[]
     */
    protected function getMandatoryColumns(): array
    {
        return [
            CombinedMerchantProductOfferDataSetInterface::STORE_NAME,
        ];
    }
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Business/Model/DataSet/CombinedMerchantProductOfferDataSetInterface.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport\Business\Model\DataSet;

interface CombinedMerchantProductOfferDataSetInterface
{
    public const STORE_NAME = 'merchant_product_offer_store.store_name';
    public const PRODUCT_OFFER_REFERENCE = 'product_offer_reference';
    public const CONCRETE_SKU = 'merchant_product_offer.concrete_sku';
    public const MERCHANT_REFERENCE = 'merchant_product_offer.merchant_reference';
    public const MERCHANT_SKU = 'merchant_product_offer.merchant_sku';
    public const IS_ACTIVE = 'merchant_product_offer.is_active';
    public const APPROVAL_STATUS = 'merchant_product_offer.approval_status';
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Business/Model/Step/CombinedApprovalStatusValidationStep.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Step;

use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\DataSet\CombinedMerchantProductOfferDataSetInterface;
use Spryker\Zed\MerchantProductOfferDataImport\Business\Model\Step\ApprovalStatusValidationStep;

class CombinedApprovalStatusValidationStep extends ApprovalStatusValidationStep
{
    protected const APPROVAL_STATUS = CombinedMerchantProductOfferDataSetInterface::APPROVAL_STATUS;
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Business/Model/Step/CombinedConcreteSkuValidationStep.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Step;

use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\DataSet\CombinedMerchantProductOfferDataSetInterface;
use Spryker\Zed\MerchantProductOfferDataImport\Business\Model\Step\ConcreteSkuValidationStep;

class CombinedConcreteSkuValidationStep extends ConcreteSkuValidationStep
{
    protected const CONCRETE_SKU = CombinedMerchantProductOfferDataSetInterface::CONCRETE_SKU;
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Business/Model/Step/CombinedMerchantProductOfferWriterStep.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Step;

use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\DataSet\CombinedMerchantProductOfferDataSetInterface;
use Spryker\Zed\MerchantProductOfferDataImport\Business\Model\Step\MerchantProductOfferWriterStep;

class CombinedMerchantProductOfferWriterStep extends MerchantProductOfferWriterStep
{
    protected const PRODUCT_OFFER_REFERENCE = CombinedMerchantProductOfferDataSetInterface::PRODUCT_OFFER_REFERENCE;
    protected const CONCRETE_SKU = CombinedMerchantProductOfferDataSetInterface::CONCRETE_SKU;
    protected const MERCHANT_SKU = CombinedMerchantProductOfferDataSetInterface::MERCHANT_SKU;
    protected const IS_ACTIVE = CombinedMerchantProductOfferDataSetInterface::IS_ACTIVE;
    protected const APPROVAL_STATUS = CombinedMerchantProductOfferDataSetInterface::APPROVAL_STATUS;
    protected const MERCHANT_REFERENCE = CombinedMerchantProductOfferDataSetInterface::MERCHANT_REFERENCE;
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Business/Model/Step/CombinedMerchantReferenceToIdMerchantStep.php</summary>

```php

<?php


namespace Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Step;

use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\DataSet\CombinedMerchantProductOfferDataSetInterface;
use Spryker\Zed\MerchantProductOfferDataImport\Business\Model\Step\MerchantReferenceToIdMerchantStep;

class CombinedMerchantReferenceToIdMerchantStep extends MerchantReferenceToIdMerchantStep
{
    protected const MERCHANT_REFERENCE = CombinedMerchantProductOfferDataSetInterface::MERCHANT_REFERENCE;
}
```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Business/Model/Step/CombinedMerchantSkuValidationStep.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Step;

use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\DataSet\CombinedMerchantProductOfferDataSetInterface;
use Spryker\Zed\MerchantProductOfferDataImport\Business\Model\Step\MerchantSkuValidationStep;

class CombinedMerchantSkuValidationStep extends MerchantSkuValidationStep
{
    protected const MERCHANT_SKU = CombinedMerchantProductOfferDataSetInterface::MERCHANT_SKU;
    protected const MERCHANT_REFERENCE = CombinedMerchantProductOfferDataSetInterface::MERCHANT_REFERENCE;
}
```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Business/Model/Step/CombinedStoreNameToIdStoreStep.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport\Business\Model\Step;

use Pyz\Zed\MerchantProductOfferDataImport\Business\Model\DataSet\CombinedMerchantProductOfferDataSetInterface;
use Spryker\Zed\MerchantProductOfferDataImport\Business\Model\Step\StoreNameToIdStoreStep;

class CombinedStoreNameToIdStoreStep extends StoreNameToIdStoreStep
{
    protected const STORE_NAME = CombinedMerchantProductOfferDataSetInterface::STORE_NAME;
}
```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Communication/Plugin/CombinedMerchantProductOfferDataImportPlugin.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport\Communication\Plugin;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Pyz\Zed\MerchantProductOfferDataImport\MerchantProductOfferDataImportConfig;
use Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\MerchantProductOfferDataImport\Business\MerchantProductOfferDataImportFacadeInterface getFacade()
 * @method \Pyz\Zed\MerchantProductOfferDataImport\MerchantProductOfferDataImportConfig getConfig()
 */
class CombinedMerchantProductOfferDataImportPlugin extends AbstractPlugin implements DataImportPluginInterface
{
    /**
     * @return string
     */
    public function getImportType(): string
    {
        return MerchantProductOfferDataImportConfig::IMPORT_TYPE_COMBINED_MERCHANT_PRODUCT_OFFER;
    }

    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function import(?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null): DataImporterReportTransfer
    {
        return $this->getFacade()->importCombinedMerchantProductOfferData($dataImporterConfigurationTransfer);
    }
}
```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/Communication/Plugin/CombinedMerchantProductOfferStoreDataImportPlugin.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport\Communication\Plugin;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Pyz\Zed\MerchantProductOfferDataImport\MerchantProductOfferDataImportConfig;
use Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\MerchantProductOfferDataImport\Business\MerchantProductOfferDataImportFacadeInterface getFacade()
 * @method \Pyz\Zed\MerchantProductOfferDataImport\MerchantProductOfferDataImportConfig getConfig()
 */
class CombinedMerchantProductOfferStoreDataImportPlugin extends AbstractPlugin implements DataImportPluginInterface
{
    /**
     * @return string
     */
    public function getImportType(): string
    {
        return MerchantProductOfferDataImportConfig::IMPORT_TYPE_COMBINED_MERCHANT_PRODUCT_OFFER_STORE;
    }

    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function import(?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null): DataImporterReportTransfer
    {
        return $this->getFacade()->importCombinedMerchantProductOfferStoreData($dataImporterConfigurationTransfer);
    }
}
```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/MerchantProductOfferDataImportConfig.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Spryker\Zed\MerchantProductOfferDataImport\MerchantProductOfferDataImportConfig as SprykerMerchantProductOfferDataImportConfig;

class MerchantProductOfferDataImportConfig extends SprykerMerchantProductOfferDataImportConfig
{
    public const IMPORT_TYPE_COMBINED_MERCHANT_PRODUCT_OFFER = 'combined-merchant-product-offer';
    public const IMPORT_TYPE_COMBINED_MERCHANT_PRODUCT_OFFER_STORE = 'combined-merchant-product-offer-store';

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getCombinedMerchantProductOfferDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildImporterConfiguration(
            $this->getCombinedMerchantProductOfferFilePath(),
            static::IMPORT_TYPE_COMBINED_MERCHANT_PRODUCT_OFFER
        );
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getCombinedMerchantProductOfferStoreDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildImporterConfiguration(
            $this->getCombinedMerchantProductOfferFilePath(),
            static::IMPORT_TYPE_COMBINED_MERCHANT_PRODUCT_OFFER_STORE
        );
    }

    /**
     * @return string
     */
    public function getCombinedMerchantProductOfferFilePath(): string
    {
        $moduleDataImportDirectory = $this->getDataImportRootPath() . 'common' . DIRECTORY_SEPARATOR . 'common' . DIRECTORY_SEPARATOR;

        return $moduleDataImportDirectory . 'combined_merchant_product_offer.csv';
    }
}
```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/MerchantProductOfferDataImport/MerchantProductOfferDataImportDependencyProvider.php</summary>

```php

<?php

namespace Pyz\Zed\MerchantProductOfferDataImport;

use Spryker\Zed\MerchantProductOfferDataImport\MerchantProductOfferDataImportDependencyProvider as SprykerMerchantProductOfferDataImportDependencyProvider;

class MerchantProductOfferDataImportDependencyProvider extends SprykerMerchantProductOfferDataImportDependencyProvider
{
}

```

</details>

- Price Product Offer

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/Model/Condition/CombinedPriceProductOfferMandatoryColumnCondition.php</summary>


```php

<?php


namespace Pyz\Zed\PriceProductOfferDataImport\Business\Model\Condition;

use Pyz\Zed\DataImport\Business\CombinedProduct\DataSet\CombinedProductMandatoryColumnCondition;
use Pyz\Zed\PriceProductOfferDataImport\Business\Model\DataSet\CombinedPriceProductOfferDataSetInterface;

class CombinedPriceProductOfferMandatoryColumnCondition extends CombinedProductMandatoryColumnCondition
{
    /**
     * @return string[]
     */
    protected function getMandatoryColumns(): array
    {
        return [
            CombinedPriceProductOfferDataSetInterface::PRICE_TYPE,
            CombinedPriceProductOfferDataSetInterface::STORE,
            CombinedPriceProductOfferDataSetInterface::CURRENCY,
            CombinedPriceProductOfferDataSetInterface::VALUE_NET,
            CombinedPriceProductOfferDataSetInterface::VALUE_GROSS,
        ];
    }
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/Model/DataSet/CombinedPriceProductOfferDataSetInterface.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Business\Model\DataSet;

interface CombinedPriceProductOfferDataSetInterface
{
    public const PRODUCT_OFFER_REFERENCE = 'product_offer_reference';
    public const CONCRETE_SKU = 'merchant_product_offer.concrete_sku';
    public const PRICE_TYPE = 'price_product_offer.price_type';
    public const STORE = 'price_product_offer.store';
    public const CURRENCY = 'price_product_offer.currency';
    public const VALUE_NET = 'price_product_offer.value_net';
    public const VALUE_GROSS = 'price_product_offer.value_gross';
    public const PRICE_DATA_VOLUME_PRICES = 'price_product_offer.price_data.volume_prices';
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/Model/Step/CombinedCurrencyToIdCurrencyStep.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step;

use Pyz\Zed\PriceProductOfferDataImport\Business\Model\DataSet\CombinedPriceProductOfferDataSetInterface;
use Spryker\Zed\PriceProductOfferDataImport\Business\Step\CurrencyToIdCurrencyStep;

class CombinedCurrencyToIdCurrencyStep extends CurrencyToIdCurrencyStep
{
    protected const CURRENCY = CombinedPriceProductOfferDataSetInterface::CURRENCY;
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/Model/Step/CombinedPreparePriceDataStep.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step;

use Pyz\Zed\PriceProductOfferDataImport\Business\Model\DataSet\CombinedPriceProductOfferDataSetInterface;
use Spryker\Zed\PriceProductOfferDataImport\Business\Step\PreparePriceDataStep;

class CombinedPreparePriceDataStep extends PreparePriceDataStep
{
    protected const PRICE_DATA_VOLUME_PRICES = CombinedPriceProductOfferDataSetInterface::PRICE_DATA_VOLUME_PRICES;
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/Model/Step/CombinedPriceProductStoreWriterStep.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step;

use Pyz\Zed\PriceProductOfferDataImport\Business\Model\DataSet\CombinedPriceProductOfferDataSetInterface;
use Spryker\Zed\PriceProductOfferDataImport\Business\Step\PriceProductStoreWriterStep;

class CombinedPriceProductStoreWriterStep extends PriceProductStoreWriterStep
{
    protected const VALUE_NET = CombinedPriceProductOfferDataSetInterface::VALUE_NET;
    protected const VALUE_GROSS = CombinedPriceProductOfferDataSetInterface::VALUE_GROSS;
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/Model/Step/CombinedPriceProductWriterStep.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step;

use Spryker\Zed\PriceProductOfferDataImport\Business\Step\PriceProductWriterStep;

class CombinedPriceProductWriterStep extends PriceProductWriterStep
{
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/Model/Step/CombinedPriceTypeToIdPriceTypeStep.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step;

use Pyz\Zed\PriceProductOfferDataImport\Business\Model\DataSet\CombinedPriceProductOfferDataSetInterface;
use Spryker\Zed\PriceProductOfferDataImport\Business\Step\PriceTypeToIdPriceTypeStep;

class CombinedPriceTypeToIdPriceTypeStep extends PriceTypeToIdPriceTypeStep
{
    protected const PRICE_TYPE = CombinedPriceProductOfferDataSetInterface::PRICE_TYPE;
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/Model/Step/CombinedProductOfferReferenceToProductOfferDataStep.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step;

use Pyz\Zed\PriceProductOfferDataImport\Business\Model\DataSet\CombinedPriceProductOfferDataSetInterface;
use Spryker\Zed\PriceProductOfferDataImport\Business\Step\ProductOfferReferenceToProductOfferDataStep;

class CombinedProductOfferReferenceToProductOfferDataStep extends ProductOfferReferenceToProductOfferDataStep
{
    protected const PRODUCT_OFFER_REFERENCE = CombinedPriceProductOfferDataSetInterface::PRODUCT_OFFER_REFERENCE;
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/Model/Step/CombinedProductOfferToIdProductStep.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step;

use Spryker\Zed\PriceProductOfferDataImport\Business\Step\ProductOfferToIdProductStep;

class CombinedProductOfferToIdProductStep extends ProductOfferToIdProductStep
{
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/Model/Step/CombinedStoreToIdStoreStep.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step;

use Pyz\Zed\PriceProductOfferDataImport\Business\Model\DataSet\CombinedPriceProductOfferDataSetInterface;
use Spryker\Zed\PriceProductOfferDataImport\Business\Step\StoreToIdStoreStep;

class CombinedStoreToIdStoreStep extends StoreToIdStoreStep
{
    protected const STORE = CombinedPriceProductOfferDataSetInterface::STORE;
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/Model/Step/CombinedStoreToIdStoreStep.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step;

use Pyz\Zed\PriceProductOfferDataImport\Business\Model\DataSet\CombinedPriceProductOfferDataSetInterface;
use Spryker\Zed\PriceProductOfferDataImport\Business\Step\StoreToIdStoreStep;

class CombinedStoreToIdStoreStep extends StoreToIdStoreStep
{
    protected const STORE = CombinedPriceProductOfferDataSetInterface::STORE;
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/PriceProductOfferDataImportBusinessFactory.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Business;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Pyz\Zed\DataImport\Business\Model\DataImporterConditional;
use Pyz\Zed\DataImport\Business\Model\DataSet\DataSetConditionInterface;
use Pyz\Zed\PriceProductOfferDataImport\Business\Model\Condition\CombinedPriceProductOfferMandatoryColumnCondition;
use Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step\CombinedCurrencyToIdCurrencyStep;
use Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step\CombinedPreparePriceDataStep;
use Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step\CombinedPriceProductStoreWriterStep;
use Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step\CombinedPriceProductWriterStep;
use Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step\CombinedPriceTypeToIdPriceTypeStep;
use Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step\CombinedProductOfferReferenceToProductOfferDataStep;
use Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step\CombinedProductOfferToIdProductStep;
use Pyz\Zed\PriceProductOfferDataImport\Business\Model\Step\CombinedStoreToIdStoreStep;
use Spryker\Zed\DataImport\Business\Model\DataImporterInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface;
use Spryker\Zed\PriceProductOfferDataImport\Business\PriceProductOfferDataImportBusinessFactory as SprykerPriceProductOfferDataImportBusinessFactory;

/**
 * @method \Pyz\Zed\PriceProductOfferDataImport\PriceProductOfferDataImportConfig getConfig()
 */
class PriceProductOfferDataImportBusinessFactory extends SprykerPriceProductOfferDataImportBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
     */
    public function getCombinedPriceProductOfferDataImport(): DataImporterInterface
    {
        $dataImporter = $this->getConditionalCsvDataImporterFromConfig(
            $this->getConfig()->getCombinedPriceProductOfferDataImporterConfiguration()
        );

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep($this->createCombinedProductOfferReferenceToProductOfferDataStep())
            ->addStep($this->createCombinedProductOfferToIdProductStep())
            ->addStep($this->createCombinedPriceTypeToIdPriceTypeStep())
            ->addStep($this->createCombinedPriceProductWriterStep())
            ->addStep($this->createCombinedStoreToIdStoreStep())
            ->addStep($this->createCombinedCurrencyToIdCurrencyStep())
            ->addStep($this->createCombinedPreparePriceDataStep())
            ->addStep($this->createCombinedPriceProductStoreWriterStep())
            ->addStep($this->createPriceProductOfferWriterStep());

        $dataImporter
            ->setDataSetCondition($this->createCombinedPriceProductOfferMandatoryColumnCondition())
            ->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer $dataImporterConfigurationTransfer
     *
     * @return \Pyz\Zed\DataImport\Business\Model\DataImporterConditional
     */
    public function getConditionalCsvDataImporterFromConfig(
        DataImporterConfigurationTransfer $dataImporterConfigurationTransfer
    ): DataImporterConditional {
        $csvReader = $this->createCsvReaderFromConfig($dataImporterConfigurationTransfer->getReaderConfiguration());

        return $this->createDataImporterConditional($dataImporterConfigurationTransfer->getImportType(), $csvReader);
    }

    /**
     * @param string $importType
     * @param \Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface $reader
     *
     * @return \Pyz\Zed\DataImport\Business\Model\DataImporterConditional
     */
    public function createDataImporterConditional(
        string $importType,
        DataReaderInterface $reader
    ): DataImporterConditional {
        return new DataImporterConditional($importType, $reader, $this->getGracefulRunnerFacade());
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedProductOfferReferenceToProductOfferDataStep(): DataImportStepInterface
    {
        return new CombinedProductOfferReferenceToProductOfferDataStep();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedProductOfferToIdProductStep(): DataImportStepInterface
    {
        return new CombinedProductOfferToIdProductStep();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedPriceTypeToIdPriceTypeStep(): DataImportStepInterface
    {
        return new CombinedPriceTypeToIdPriceTypeStep();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedPriceProductWriterStep(): DataImportStepInterface
    {
        return new CombinedPriceProductWriterStep();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedStoreToIdStoreStep(): DataImportStepInterface
    {
        return new CombinedStoreToIdStoreStep();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedCurrencyToIdCurrencyStep(): DataImportStepInterface
    {
        return new CombinedCurrencyToIdCurrencyStep();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedPriceProductStoreWriterStep(): DataImportStepInterface
    {
        return new CombinedPriceProductStoreWriterStep();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedPreparePriceDataStep(): DataImportStepInterface
    {
        return new CombinedPreparePriceDataStep($this->getPriceProductFacade(), $this->getUtilEncodingService());
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\DataSet\DataSetConditionInterface
     */
    public function createCombinedPriceProductOfferMandatoryColumnCondition(): DataSetConditionInterface
    {
        return new CombinedPriceProductOfferMandatoryColumnCondition();
    }
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/PriceProductOfferDataImportFacade.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Business;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Spryker\Zed\PriceProductOfferDataImport\Business\PriceProductOfferDataImportFacade as SprykerPriceProductOfferDataImportFacade;

/**
 * @method \Pyz\Zed\PriceProductOfferDataImport\Business\PriceProductOfferDataImportBusinessFactory getFactory()
 */
class PriceProductOfferDataImportFacade extends SprykerPriceProductOfferDataImportFacade implements PriceProductOfferDataImportFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function importCombinedPriceProductOfferData(
        ?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null
    ): DataImporterReportTransfer {
        return $this->getFactory()
            ->getCombinedPriceProductOfferDataImport()
            ->import($dataImporterConfigurationTransfer);
    }
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Business/PriceProductOfferDataImportFacadeInterface.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Business;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Spryker\Zed\PriceProductOfferDataImport\Business\PriceProductOfferDataImportFacadeInterface as SprykerPriceProductOfferDataImportFacadeInterface;

interface PriceProductOfferDataImportFacadeInterface extends SprykerPriceProductOfferDataImportFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function importCombinedPriceProductOfferData(
        ?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null
    ): DataImporterReportTransfer;
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/Communication/Plugin/CombinedPriceProductOfferDataImportPlugin.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport\Communication\Plugin;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Pyz\Zed\PriceProductOfferDataImport\PriceProductOfferDataImportConfig;
use Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\PriceProductOfferDataImport\Business\PriceProductOfferDataImportFacadeInterface getFacade()
 * @method \Pyz\Zed\PriceProductOfferDataImport\PriceProductOfferDataImportConfig getConfig()
 */
class CombinedPriceProductOfferDataImportPlugin extends AbstractPlugin implements DataImportPluginInterface
{
    /**
     * @return string
     */
    public function getImportType(): string
    {
        return PriceProductOfferDataImportConfig::IMPORT_TYPE_COMBINED_PRICE_PRODUCT_OFFER;
    }

    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function import(?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null): DataImporterReportTransfer
    {
        return $this->getFacade()->importCombinedPriceProductOfferData($dataImporterConfigurationTransfer);
    }
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/PriceProductOfferDataImportConfig.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Spryker\Zed\PriceProductOfferDataImport\PriceProductOfferDataImportConfig as SprykerPriceProductOfferDataImportConfig;

class PriceProductOfferDataImportConfig extends SprykerPriceProductOfferDataImportConfig
{
    public const IMPORT_TYPE_COMBINED_PRICE_PRODUCT_OFFER = 'combined-price-product-offer';

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getCombinedPriceProductOfferDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        $moduleDataImportDirectory = $this->getDataImportRootPath() . 'common' . DIRECTORY_SEPARATOR . 'common' . DIRECTORY_SEPARATOR;

        return $this->buildImporterConfiguration(
            $moduleDataImportDirectory . 'combined_merchant_product_offer.csv',
            static::IMPORT_TYPE_COMBINED_PRICE_PRODUCT_OFFER
        );
    }
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/PriceProductOfferDataImport/PriceProductOfferDataImportDependencyProvider.php</summary>

```php

<?php

namespace Pyz\Zed\PriceProductOfferDataImport;

use Spryker\Zed\PriceProductOfferDataImport\PriceProductOfferDataImportDependencyProvider as SprykerPriceProductOfferDataImportDependencyProvider;

class PriceProductOfferDataImportDependencyProvider extends SprykerPriceProductOfferDataImportDependencyProvider
{
}

```

</details>


- Product Offer Stock

<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferStockDataImport/Business/Model/Condition/CombinedProductOfferStockMandatoryColumnCondition.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferStockDataImport\Business\Model\Condition;

use Pyz\Zed\DataImport\Business\CombinedProduct\DataSet\CombinedProductMandatoryColumnCondition;
use Pyz\Zed\ProductOfferStockDataImport\Business\Model\DataSet\CombinedProductOfferStockDataSetInterface;

class CombinedProductOfferStockMandatoryColumnCondition extends CombinedProductMandatoryColumnCondition
{
    /**
     * @return string[]
     */
    protected function getMandatoryColumns(): array
    {
        return [
            CombinedProductOfferStockDataSetInterface::STOCK_NAME,
            CombinedProductOfferStockDataSetInterface::QUANTITY,
            CombinedProductOfferStockDataSetInterface::IS_NEVER_OUT_OF_STOCK,
        ];
    }
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferStockDataImport/Business/Model/DataSet/CombinedProductOfferStockDataSetInterface.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferStockDataImport\Business\Model\DataSet;

interface CombinedProductOfferStockDataSetInterface
{
    public const PRODUCT_OFFER_REFERENCE = 'product_offer_reference';
    public const STOCK_NAME = 'product_offer_stock.stock_name';
    public const QUANTITY = 'product_offer_stock.quantity';
    public const IS_NEVER_OUT_OF_STOCK = 'product_offer_stock.is_never_out_of_stock';
    public const STORE_NAME = 'merchant_product_offer_store.store_name';
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferStockDataImport/Business/Model/Step/CombinedProductOfferReferenceToIdProductOfferStep.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferStockDataImport\Business\Model\Step;

use Pyz\Zed\ProductOfferStockDataImport\Business\Model\DataSet\CombinedProductOfferStockDataSetInterface;
use Spryker\Zed\ProductOfferStockDataImport\Business\Step\ProductOfferReferenceToIdProductOfferStep;

class CombinedProductOfferReferenceToIdProductOfferStep extends ProductOfferReferenceToIdProductOfferStep
{
    protected const PRODUCT_OFFER_REFERENCE = CombinedProductOfferStockDataSetInterface::PRODUCT_OFFER_REFERENCE;
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferStockDataImport/Business/Model/Step/CombinedProductOfferStockWriterStep.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferStockDataImport\Business\Model\Step;

use Pyz\Zed\ProductOfferStockDataImport\Business\Model\DataSet\CombinedProductOfferStockDataSetInterface;
use Spryker\Zed\ProductOfferStockDataImport\Business\Step\ProductOfferStockWriterStep;

class CombinedProductOfferStockWriterStep extends ProductOfferStockWriterStep
{
    protected const QUANTITY = CombinedProductOfferStockDataSetInterface::QUANTITY;
    protected const IS_NEVER_OUT_OF_STOCK = CombinedProductOfferStockDataSetInterface::IS_NEVER_OUT_OF_STOCK;

    protected const REQUIRED_DATA_SET_KEYS = [
        self::FK_STOCK,
        self::FK_PRODUCT_OFFER,
        self::QUANTITY,
        self::IS_NEVER_OUT_OF_STOCK,
    ];
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferStockDataImport/Business/Model/Step/CombinedStockNameToIdStockStep.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferStockDataImport\Business\Model\Step;

use Pyz\Zed\ProductOfferStockDataImport\Business\Model\DataSet\CombinedProductOfferStockDataSetInterface;
use Spryker\Zed\ProductOfferStockDataImport\Business\Step\StockNameToIdStockStep;

class CombinedStockNameToIdStockStep extends StockNameToIdStockStep
{
    protected const PRODUCT_STOCK_NAME = CombinedProductOfferStockDataSetInterface::STOCK_NAME;
    protected const STORE_NAME = CombinedProductOfferStockDataSetInterface::STORE_NAME;
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferStockDataImport/Business/ProductOfferStockDataImportBusinessFactory.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferStockDataImport\Business;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Pyz\Zed\DataImport\Business\Model\DataImporterConditional;
use Pyz\Zed\DataImport\Business\Model\DataSet\DataSetConditionInterface;
use Pyz\Zed\ProductOfferStockDataImport\Business\Model\Condition\CombinedProductOfferStockMandatoryColumnCondition;
use Pyz\Zed\ProductOfferStockDataImport\Business\Model\Step\CombinedProductOfferReferenceToIdProductOfferStep;
use Pyz\Zed\ProductOfferStockDataImport\Business\Model\Step\CombinedProductOfferStockWriterStep;
use Pyz\Zed\ProductOfferStockDataImport\Business\Model\Step\CombinedStockNameToIdStockStep;
use Spryker\Zed\DataImport\Business\Model\DataImporterInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface;
use Spryker\Zed\ProductOfferStockDataImport\Business\ProductOfferStockDataImportBusinessFactory as SprykerProductOfferStockDataImportBusinessFactory;

/**
 * @method \Pyz\Zed\ProductOfferStockDataImport\ProductOfferStockDataImportConfig getConfig()
 */
class ProductOfferStockDataImportBusinessFactory extends SprykerProductOfferStockDataImportBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
     */
    public function getCombinedProductOfferStockDataImporter(): DataImporterInterface
    {
        $dataImporter = $this->getConditionalCsvDataImporterFromConfig(
            $this->getConfig()->getCombinedProductOfferStockDataImporterConfiguration()
        );

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep($this->createCombinedProductOfferReferenceToIdProductOfferStep())
            ->addStep($this->createCombinedStockNameToIdStockStep())
            ->addStep($this->createCombinedProductOfferStockWriterStep());

        $dataImporter
            ->setDataSetCondition($this->createCombinedProductOfferStockMandatoryColumnCondition())
            ->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer $dataImporterConfigurationTransfer
     *
     * @return \Pyz\Zed\DataImport\Business\Model\DataImporterConditional
     */
    public function getConditionalCsvDataImporterFromConfig(
        DataImporterConfigurationTransfer $dataImporterConfigurationTransfer
    ): DataImporterConditional {
        $csvReader = $this->createCsvReaderFromConfig($dataImporterConfigurationTransfer->getReaderConfiguration());

        return $this->createDataImporterConditional($dataImporterConfigurationTransfer->getImportType(), $csvReader);
    }

    /**
     * @param string $importType
     * @param \Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface $reader
     *
     * @return \Pyz\Zed\DataImport\Business\Model\DataImporterConditional
     */
    public function createDataImporterConditional(
        string $importType,
        DataReaderInterface $reader
    ): DataImporterConditional {
        return new DataImporterConditional($importType, $reader, $this->getGracefulRunnerFacade());
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedProductOfferReferenceToIdProductOfferStep(): DataImportStepInterface
    {
        return new CombinedProductOfferReferenceToIdProductOfferStep(
            $this->getProductOfferFacade()
        );
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedStockNameToIdStockStep(): DataImportStepInterface
    {
        return new CombinedStockNameToIdStockStep();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedProductOfferStockWriterStep(): DataImportStepInterface
    {
        return new CombinedProductOfferStockWriterStep();
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\DataSet\DataSetConditionInterface
     */
    public function createCombinedProductOfferStockMandatoryColumnCondition(): DataSetConditionInterface
    {
        return new CombinedProductOfferStockMandatoryColumnCondition();
    }
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferStockDataImport/Business/ProductOfferStockDataImportFacade.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferStockDataImport\Business;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Spryker\Zed\ProductOfferStockDataImport\Business\ProductOfferStockDataImportFacade as SprykerProductOfferStockDataImportFacade;

/**
 * @method \Pyz\Zed\ProductOfferStockDataImport\Business\ProductOfferStockDataImportBusinessFactory getFactory()
 */
class ProductOfferStockDataImportFacade extends SprykerProductOfferStockDataImportFacade implements ProductOfferStockDataImportFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function importCombinedProductOfferStock(
        ?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer
    ): DataImporterReportTransfer {
        return $this->getFactory()
            ->getCombinedProductOfferStockDataImporter()
            ->import($dataImporterConfigurationTransfer);
    }
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferStockDataImport/Communication/Plugin/CombinedProductOfferStockDataImportPlugin.php</summary>

```php

<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductOfferStockDataImport\Communication\Plugin;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Pyz\Zed\ProductOfferStockDataImport\ProductOfferStockDataImportConfig;
use Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\ProductOfferStockDataImport\ProductOfferStockDataImportConfig getConfig()
 * @method \Pyz\Zed\ProductOfferStockDataImport\Business\ProductOfferStockDataImportFacade getFacade()
 */
class CombinedProductOfferStockDataImportPlugin extends AbstractPlugin implements DataImportPluginInterface
{
    /**
     * @return string
     */
    public function getImportType(): string
    {
        return ProductOfferStockDataImportConfig::IMPORT_TYPE_COMBINED_PRODUCT_OFFER_STOCK;
    }

    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function import(
        ?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null
    ): DataImporterReportTransfer {
        return $this->getFacade()->importCombinedProductOfferStock($dataImporterConfigurationTransfer);
    }
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferStockDataImport/ProductOfferStockDataImportConfig.php</summary>

```php

<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductOfferStockDataImport;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Spryker\Zed\ProductOfferStockDataImport\ProductOfferStockDataImportConfig as SprykerProductOfferStockDataImportConfig;

class ProductOfferStockDataImportConfig extends SprykerProductOfferStockDataImportConfig
{
    public const IMPORT_TYPE_COMBINED_PRODUCT_OFFER_STOCK = 'combined-product-offer-stock';

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getCombinedProductOfferStockDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        $moduleDataImportDirectory = $this->getDataImportRootPath() . 'common' . DIRECTORY_SEPARATOR . 'common' . DIRECTORY_SEPARATOR;

        return $this->buildImporterConfiguration(
            $moduleDataImportDirectory . 'combined_merchant_product_offer.csv',
            static::IMPORT_TYPE_COMBINED_PRODUCT_OFFER_STOCK
        );
    }
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferStockDataImport/ProductOfferStockDataImportDependencyProvider.php</summary>

```php

z<?php

namespace Pyz\Zed\ProductOfferStockDataImport;

use Spryker\Zed\ProductOfferStockDataImport\ProductOfferStockDataImportDependencyProvider as SprykerProductOfferStockDataImportDependencyProvider;

class ProductOfferStockDataImportDependencyProvider extends SprykerProductOfferStockDataImportDependencyProvider
{
}

```

</details>

- Product Offer Validity

<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferValidityDataImport/Business/Model/Condition/CombinedProductOfferValidityMandatoryColumnCondition.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferValidityDataImport\Business\Model\Condition;

use Pyz\Zed\DataImport\Business\CombinedProduct\DataSet\CombinedProductMandatoryColumnCondition;
use Pyz\Zed\ProductOfferValidityDataImport\Business\Model\DataSet\CombinedProductOfferValidityDataSetInterface;

class CombinedProductOfferValidityMandatoryColumnCondition extends CombinedProductMandatoryColumnCondition
{
    /**
     * @return string[]
     */
    protected function getMandatoryColumns(): array
    {
        return [
            CombinedProductOfferValidityDataSetInterface::VALID_FROM,
            CombinedProductOfferValidityDataSetInterface::VALID_TO,
        ];
    }
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferValidityDataImport/Business/Model/DataSet/CombinedProductOfferValidityDataSetInterface.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferValidityDataImport\Business\Model\DataSet;

interface CombinedProductOfferValidityDataSetInterface
{
    public const PRODUCT_OFFER_REFERENCE = 'product_offer_reference';
    public const VALID_FROM = 'product_offer_validity.valid_from';
    public const VALID_TO = 'product_offer_validity.valid_to';
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferValidityDataImport/Business/Model/Step/CombinedProductOfferReferenceToIdProductOfferStep.php</summary>

```php

<?php


namespace Pyz\Zed\ProductOfferValidityDataImport\Business\Model\Step;

use Pyz\Zed\ProductOfferValidityDataImport\Business\Model\DataSet\CombinedProductOfferValidityDataSetInterface;
use Spryker\Zed\ProductOfferValidityDataImport\Business\Step\ProductOfferReferenceToIdProductOfferStep;

class CombinedProductOfferReferenceToIdProductOfferStep extends ProductOfferReferenceToIdProductOfferStep
{
    protected const PRODUCT_OFFER_REFERENCE = CombinedProductOfferValidityDataSetInterface::PRODUCT_OFFER_REFERENCE;
}

```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferValidityDataImport/Business/Model/Step/CombinedProductOfferValidityWriterStep.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferValidityDataImport\Business\Model\Step;

use Pyz\Zed\ProductOfferValidityDataImport\Business\Model\DataSet\CombinedProductOfferValidityDataSetInterface;
use Spryker\Zed\ProductOfferValidityDataImport\Business\Step\ProductOfferValidityWriterStep;

class CombinedProductOfferValidityWriterStep extends ProductOfferValidityWriterStep
{
    protected const PRODUCT_VALID_FROM = CombinedProductOfferValidityDataSetInterface::VALID_FROM;
    protected const PRODUCT_VALID_TO = CombinedProductOfferValidityDataSetInterface::VALID_TO;
}
```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferValidityDataImport/Business/ProductOfferValidityDataImportBusinessFactory.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferValidityDataImport\Business;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Pyz\Zed\DataImport\Business\Model\DataImporterConditional;
use Pyz\Zed\DataImport\Business\Model\DataSet\DataSetConditionInterface;
use Pyz\Zed\ProductOfferValidityDataImport\Business\Model\Condition\CombinedProductOfferValidityMandatoryColumnCondition;
use Pyz\Zed\ProductOfferValidityDataImport\Business\Model\Step\CombinedProductOfferReferenceToIdProductOfferStep;
use Pyz\Zed\ProductOfferValidityDataImport\Business\Model\Step\CombinedProductOfferValidityWriterStep;
use Spryker\Zed\DataImport\Business\Model\DataImporterInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface;
use Spryker\Zed\ProductOfferValidityDataImport\Business\ProductOfferValidityDataImportBusinessFactory as SprykerProductOfferValidityDataImportBusinessFactory;

/**
 * @method \Pyz\Zed\ProductOfferValidityDataImport\ProductOfferValidityDataImportConfig getConfig()
 */
class ProductOfferValidityDataImportBusinessFactory extends SprykerProductOfferValidityDataImportBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
     */
    public function getCombinedProductOfferValidityDataImporter(): DataImporterInterface
    {
        $dataImporter = $this->getConditionalCsvDataImporterFromConfig(
            $this->getConfig()->getCombinedProductOfferValidityDataImporterConfiguration()
        );

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker
            ->addStep($this->createCombinedProductOfferReferenceToIdProductOfferStep())
            ->addStep($this->createCombinedProductOfferValidityWriterStep());

        $dataImporter
            ->setDataSetCondition($this->createCombinedProductOfferValidityMandatoryColumnCondition())
            ->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer $dataImporterConfigurationTransfer
     *
     * @return \Pyz\Zed\DataImport\Business\Model\DataImporterConditional
     */
    public function getConditionalCsvDataImporterFromConfig(
        DataImporterConfigurationTransfer $dataImporterConfigurationTransfer
    ): DataImporterConditional {
        $csvReader = $this->createCsvReaderFromConfig($dataImporterConfigurationTransfer->getReaderConfiguration());

        return $this->createDataImporterConditional($dataImporterConfigurationTransfer->getImportType(), $csvReader);
    }

    /**
     * @param string $importType
     * @param \Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface $reader
     *
     * @return \Pyz\Zed\DataImport\Business\Model\DataImporterConditional
     */
    public function createDataImporterConditional(
        string $importType,
        DataReaderInterface $reader
    ): DataImporterConditional {
        return new DataImporterConditional($importType, $reader, $this->getGracefulRunnerFacade());
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedProductOfferReferenceToIdProductOfferStep(): DataImportStepInterface
    {
        return new CombinedProductOfferReferenceToIdProductOfferStep(
            $this->getProductOfferFacade()
        );
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
     */
    public function createCombinedProductOfferValidityWriterStep(): DataImportStepInterface
    {
        return new CombinedProductOfferValidityWriterStep();
    }

    /**
     * @return \Pyz\Zed\DataImport\Business\Model\DataSet\DataSetConditionInterface
     */
    public function createCombinedProductOfferValidityMandatoryColumnCondition(): DataSetConditionInterface
    {
        return new CombinedProductOfferValidityMandatoryColumnCondition();
    }
}
```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferValidityDataImport/Business/ProductOfferValidityDataImportFacade.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferValidityDataImport\Business;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Spryker\Zed\ProductOfferValidityDataImport\Business\ProductOfferValidityDataImportFacade as SprykerProductOfferValidityDataImportFacade;

/**
 * @method \Pyz\Zed\ProductOfferValidityDataImport\Business\ProductOfferValidityDataImportBusinessFactory getFactory()
 */
class ProductOfferValidityDataImportFacade extends SprykerProductOfferValidityDataImportFacade implements ProductOfferValidityDataImportFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function importCombinedProductOfferValidity(
        ?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null
    ): DataImporterReportTransfer {
        return $this->getFactory()
            ->getCombinedProductOfferValidityDataImporter()
            ->import($dataImporterConfigurationTransfer);
    }
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferValidityDataImport/Business/ProductOfferValidityDataImportFacadeInterface.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferValidityDataImport\Business;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Spryker\Zed\ProductOfferValidityDataImport\Business\ProductOfferValidityDataImportFacadeInterface as SprykerProductOfferValidityDataImportFacadeInterface;

interface ProductOfferValidityDataImportFacadeInterface extends SprykerProductOfferValidityDataImportFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function importCombinedProductOfferValidity(
        ?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null
    ): DataImporterReportTransfer;
}


```

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferValidityDataImport/Communication/Plugin/CombinedProductOfferValidityDataImportPlugin.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferValidityDataImport\Communication\Plugin;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Generated\Shared\Transfer\DataImporterReportTransfer;
use Pyz\Zed\ProductOfferValidityDataImport\ProductOfferValidityDataImportConfig;
use Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\ProductOfferValidityDataImport\Business\ProductOfferValidityDataImportFacadeInterface getFacade()
 * @method \Pyz\Zed\ProductOfferValidityDataImport\ProductOfferValidityDataImportConfig getConfig()
 */
class CombinedProductOfferValidityDataImportPlugin extends AbstractPlugin implements DataImportPluginInterface
{
    /**
     * @return string
     */
    public function getImportType(): string
    {
        return ProductOfferValidityDataImportConfig::IMPORT_TYPE_COMBINED_PRODUCT_OFFER_VALIDITY;
    }

    /**
     * @param \Generated\Shared\Transfer\DataImporterConfigurationTransfer|null $dataImporterConfigurationTransfer
     *
     * @return \Generated\Shared\Transfer\DataImporterReportTransfer
     */
    public function import(
        ?DataImporterConfigurationTransfer $dataImporterConfigurationTransfer = null
    ): DataImporterReportTransfer {
        return $this->getFacade()->importCombinedProductOfferValidity($dataImporterConfigurationTransfer);
    }
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferValidityDataImport/ProductOfferValidityDataImportConfig.php</summary>

```php

<?php

namespace Pyz\Zed\ProductOfferValidityDataImport;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Spryker\Zed\ProductOfferValidityDataImport\ProductOfferValidityDataImportConfig as SprykerProductOfferValidityDataImportConfig;

class ProductOfferValidityDataImportConfig extends SprykerProductOfferValidityDataImportConfig
{
    public const IMPORT_TYPE_COMBINED_PRODUCT_OFFER_VALIDITY = 'combined-product-offer-validity';

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getCombinedProductOfferValidityDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        $moduleDataImportDirectory = $this->getDataImportRootPath() . 'common' . DIRECTORY_SEPARATOR . 'common' . DIRECTORY_SEPARATOR;

        return $this->buildImporterConfiguration(
            $moduleDataImportDirectory . 'combined_merchant_product_offer.csv',
            static::IMPORT_TYPE_COMBINED_PRODUCT_OFFER_VALIDITY
        );
    }
}

```

</details>


<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferValidityDataImport/ProductOfferValidityDataImportDependencyProvider.php</summary>

```php

<?php


namespace Pyz\Zed\ProductOfferValidityDataImport;

use Spryker\Zed\ProductOfferValidityDataImport\ProductOfferValidityDataImportDependencyProvider as SprykerProductOfferValidityDataImportDependencyProvider;

class ProductOfferValidityDataImportDependencyProvider extends SprykerProductOfferValidityDataImportDependencyProvider
{
}

```

</details>

### Update DataImporterConditional::setDataSetCondition().
- Method should return $this instead of void.

<details>
<summary markdown='span'>src/Pyz/Zed/DataImport/Business/Model/DataImporterConditional.php</summary>

```php

<?php
namespace Pyz\Zed\DataImport\Business\Model;
use Pyz\Zed\DataImport\Business\Model\DataSet\DataSetConditionInterface;
use Spryker\Zed\DataImport\Business\Model\DataImporter;

class DataImporterConditional extends DataImporter
{
    /**
     * @var \Pyz\Zed\DataImport\Business\Model\DataSet\DataSetConditionInterface
     */
    protected $dataSetCondition;
    /**
     * @param \Pyz\Zed\DataImport\Business\Model\DataSet\DataSetConditionInterface $dataSetCondition
     *
     * @return void
     * @return $this
     */
    public function setDataSetCondition(DataSetConditionInterface $dataSetCondition)
    {
        $this->dataSetCondition = $dataSetCondition;

        return $this;
    }
}

```

</details>

### 2) Import data

To import data:

1. Prepare combined product offer data according to your requirements using the demo data:

<details>
<summary markdown='span'>data/import/common/DE/combined_merchant_product_offer.csv</summary>

```csv
product_offer_reference,merchant_product_offer.concrete_sku,merchant_product_offer.merchant_reference,merchant_product_offer.merchant_sku,merchant_product_offer.is_active,merchant_product_offer.approval_status,merchant_product_offer_store.store_name,product_offer_stock.stock_name,product_offer_stock.quantity,product_offer_stock.is_never_out_of_stock,price_product_offer.price_type,price_product_offer.store,price_product_offer.currency,price_product_offer.value_net,price_product_offer.value_gross,price_product_offer.price_data.volume_prices,product_offer_validity.valid_from,product_offer_validity.valid_to
offer1000,093_24495843,MER000006,SE1000-01,1,approved,DE,Budget Cameras MER000005 Warehouse 1,100,1,DEFAULT,DE,EUR,50,70,,,
offer1000,,,,,,,,,,ORIGINAL,DE,EUR,150,170,,,
offer1000,,,,,,,,,,DEFAULT,AT,EUR,51,71,,,
offer1000,,,,,,,,,,ORIGINAL,AT,EUR,151,171,,,
offer1000,,,,,,AT,,,,,,,,,,,
offer1001,090_24495844,MER000006,SE1001-01,1,approved,DE,Sony Experts MER000006 Warehouse 1,50,0,DEFAULT,DE,EUR,160,180,"[{""quantity"":5,""net_price"":6050,""gross_price"":7065}, {""quantity"":10,""net_price"":5045,""gross_price"":6058}, {""quantity"":20,""net_price"":4040,""gross_price"":5052}]",2021-01-01 00:00:00.000000,2025-12-01 00:00:00.000000
offer1001,,,,,,,,,,DEFAULT,DE,CHF,260,280,,,
```

</details>


<details>
<summary markdown='span'>data/import/common/US/combined_merchant_product_offer.csv</summary>

```csv
product_offer_reference,merchant_product_offer.concrete_sku,merchant_product_offer.merchant_reference,merchant_product_offer.merchant_sku,merchant_product_offer.is_active,merchant_product_offer.approval_status,merchant_product_offer_store.store_name,product_offer_stock.stock_name,product_offer_stock.quantity,product_offer_stock.is_never_out_of_stock,price_product_offer.price_type,price_product_offer.store,price_product_offer.currency,price_product_offer.value_net,price_product_offer.value_gross,price_product_offer.price_data.volume_prices,product_offer_validity.valid_from,product_offer_validity.valid_to
offer1000,093_24495843,MER000006,SE1000-01,1,approved,DE,Budget Cameras MER000005 Warehouse 1,100,1,DEFAULT,DE,EUR,50,70,,,
offer1000,,,,,,,,,,ORIGINAL,DE,EUR,150,170,,,
offer1000,,,,,,,,,,DEFAULT,AT,EUR,51,71,,,
offer1000,,,,,,,,,,ORIGINAL,AT,EUR,151,171,,,
offer1000,,,,,,AT,,,,,,,,,,,
offer1001,090_24495844,MER000006,SE1001-01,1,approved,DE,Sony Experts MER000006 Warehouse 1,50,0,DEFAULT,DE,EUR,160,180,"[{""quantity"":5,""net_price"":6050,""gross_price"":7065}, {""quantity"":10,""net_price"":5045,""gross_price"":6058}, {""quantity"":20,""net_price"":4040,""gross_price"":5052}]",2021-01-01 00:00:00.000000,2025-12-01 00:00:00.000000
offer1001,,,,,,,,,,DEFAULT,DE,CHF,260,280,,,
```

</details>

2. Create combined data importer configuration

<details>
<summary markdown='span'>data/import/common/combined_merchant_product_offer_import_config_EU.yml</summary>

```csv
# Example of demo shop 'combined merchant product offer' data import.
version: 0

actions:
    - data_entity: combined-merchant-product-offer
      source: data/import/common/DE/combined_merchant_product_offer.csv
    - data_entity: combined-merchant-product-offer-store
      source: data/import/common/DE/combined_merchant_product_offer.csv
    - data_entity: combined-product-offer-validity
      source: data/import/common/DE/combined_merchant_product_offer.csv
    - data_entity: combined-product-offer-stock
      source: data/import/common/DE/combined_merchant_product_offer.csv
    - data_entity: combined-price-product-offer
      source: data/import/common/DE/combined_merchant_product_offer.csv
```

</details>

<details>
<summary markdown='span'>data/import/common/combined_merchant_product_offer_import_config_US.yml</summary>

```csv
# Example of demo shop 'combined merchant product offer' data import.
version: 0

actions:
    - data_entity: combined-merchant-product-offer
      source: data/import/common/US/combined_merchant_product_offer.csv
    - data_entity: combined-merchant-product-offer-store
      source: data/import/common/US/combined_merchant_product_offer.csv
    - data_entity: combined-product-offer-validity
      source: data/import/common/US/combined_merchant_product_offer.csv
    - data_entity: combined-product-offer-stock
      source: data/import/common/US/combined_merchant_product_offer.csv
    - data_entity: combined-price-product-offer
      source: data/import/common/US/combined_merchant_product_offer.csv
```

</details>

3. Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| CombinedMerchantProductOfferDataImportPlugin | Imports merchant profile data into the database. |   | Pyz\Zed\MerchantProductOfferDataImport\Communication\Plugin |
| CombinedMerchantProductOfferStoreDataImportPlugin | Imports merchant profile address data into the database. |   | Pyz\Zed\MerchantProductOfferDataImport\Communication\Plugin |
| CombinedPriceProductOfferDataImportPlugin | Imports merchant profile address data into the database. |   | Pyz\Zed\PriceProductOfferDataImport\Communication\Plugin |
| CombinedProductOfferValidityDataImportPlugin | Imports merchant profile address data into the database. |   | Pyz\Zed\ProductOfferStockDataImport\Communication |
| CombinedProductOfferStockDataImportPlugin | Imports merchant profile address data into the database. |   | Pyz\Zed\ProductOfferValidityDataImport\Communication\Plugin |

<details>
<summary markdown='span'>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php

<?php

namespace Pyz\Zed\DataImport;

use Pyz\Zed\MerchantProductOfferDataImport\Communication\Plugin\CombinedMerchantProductOfferDataImportPlugin;
use Pyz\Zed\MerchantProductOfferDataImport\Communication\Plugin\CombinedMerchantProductOfferStoreDataImportPlugin;
use Pyz\Zed\PriceProductOfferDataImport\Communication\Plugin\CombinedPriceProductOfferDataImportPlugin;
use Pyz\Zed\ProductOfferStockDataImport\Communication\Plugin\CombinedProductOfferStockDataImportPlugin;
use Pyz\Zed\ProductOfferValidityDataImport\Communication\Plugin\CombinedProductOfferValidityDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new CombinedMerchantProductOfferDataImportPlugin(),
            new CombinedMerchantProductOfferStoreDataImportPlugin(),
            new CombinedPriceProductOfferDataImportPlugin(),
            new CombinedProductOfferValidityDataImportPlugin(),
            new CombinedProductOfferStockDataImportPlugin(),
        ];
    }
}
```

</details>

4. Import data:

Run the following command (do not forget to replace {store} param with the store name)
 
```bash
console data:import --config data/import/common/combined_merchant_product_offer_import_config_{store}.yml
```

{% info_block warningBox "Verification" %}

Make sure that:
1. New Product offer is created at spy_product_offer table.
2. New Product offer price is created at spy_price_product_offer table.
3. New Product offer stock is created at spy_product_offer_stock table.
4. New Product offer validity is created at spy_product_offer_validity table.

{% endinfo_block %}
