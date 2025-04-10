
# Install the SSP Inquiry Management Feature

This document describes how to install the *SSP Inquiry Management* feature in your Spryker project.

---

## Prerequisites

Before installing this feature, make sure the following are already set up in your project:

| NAME              | VERSION | INSTALLATION GUIDE  |
|-------------------| ------- | ------------------ |
| Spryker Core      | {{site.version}}  | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                        |
| Click and collect | {{site.version}}  | |
| SSP features      | {{site.version}}  | [Install the SSP feature](/docs/pbc/all/miscellaneous/{{site.version}}/ssp/install-ssp-features.md)          |

## Install the required modules using Composer

Install the necessary packages via Composer:

```bash
composer require spryker-feature/ssp-service-management:"^0.1.2" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Check that the following packages are now listed in `composer.lock`:

| MODULE               | EXPECTED DIRECTORY                               |
|----------------------|--------------------------------------------------|
| SspServiceManagement | vendor/spryker-feature/ssp-service-management       |

{% endinfo_block %}

## Set up configuration

| CONFIGURATION                                                                   | SPECIFICATION                                                                           | NAMESPACE                                  |
|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|--------------------------------------------|
| FileSystemConstants::FILESYSTEM_SERVICE                                         | Flysystem configuration for file management.                                            | Spryker\Shared\FileSystem                  |
| SspInquiryManagementConstants::BASE_URL_YVES                                    | Yves URL used in mailing templates.                                                     | SprykerFeature\Shared\SspInquiryManagement |
| SspInquiryManagementConstants::DEFAULT_TOTAL_FILE_MAX_SIZE                      | Configurable total file upload limits.                                                  | SprykerFeature\Shared\SspInquiryManagement |
| SspInquiryManagementConstants::DEFAULT_FILE_MAX_SIZE                            | Configurable single file upload size.                                                   | SprykerFeature\Shared\SspInquiryManagement |
| SspInquiryManagementConfig::getSspInquiryInitialStateMap()                      | Returns the inquiry state machine process to initial state mapping.                     | SprykerFeature\Shared\SspInquiryManagement |
| SspInquiryManagementConfig::getSspInquiryStateMachineProcessSspInquiryTypeMap() | Returns the inquiry type to state machine process mapping.                              | SprykerFeature\Shared\SspInquiryManagement |
| SspInquiryManagementConfig::getSspInquiryCancelStateMachineEventName()          | Returns inquiry event name of the inquiry cancellation.                                 | SprykerFeature\Shared\SspInquiryManagement |
| SspInquiryManagementConfig::getAvailableStatuses()                              | Returns the list of inquiry statuses.                                                   | SprykerFeature\Shared\SspInquiryManagement |
| SspInquiryManagementConfig::getStorageName()                                    | Defines the Storage name for inquiry Flysystem files.                                   | SprykerFeature\Shared\SspInquiryManagement |
| SalesConfig::getSalesDetailExternalBlocksUrls()                                 | Defines the list of URLs to render blocks inside order detail page.                     | Spryker\Zed\Sales                          |
| SspInquiryManagementConfig::getSspInquiryStatusClassMap()                       | Returns the inquiry status to СSS class name mapping used for status indicator styling. | SprykerFeature\Zed\SspInquiryManagement    |
| SspInquiryManagementConfig::getPendingStatus()                                  | Identifies the status that will be considered `Pending`.                                | SprykerFeature\Zed\SspInquiryManagement    |
| SspInquiryManagementConfig::getPendingStatus()                                  | Identifies the status that will be considered `Pending`.                                | SprykerFeature\Zed\SspInquiryManagement    |

**config/Shared/config_default.php**
```php
<?php

use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;
use SprykerFeature\Shared\SspInquiryManagement\SspInquiryManagementConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'ssp-inquiry' => [
        'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
        'root' => '/data',
        'path' => '/data/ssp-inquiry',
    ],
];

$config[SspInquiryManagementConstants::BASE_URL_YVES] = 'https://your-yves-url';
$config[SspInquiryManagementConstants::DEFAULT_TOTAL_FILE_MAX_SIZE] = getenv('SPRYKER_SSP_INQUIRY_DEFAULT_TOTAL_FILE_MAX_SIZE') ?: '100M';
$config[SspInquiryManagementConstants::DEFAULT_FILE_MAX_SIZE] = getenv('SPRYKER_SSP_INQUIRY_DEFAULT_FILE_MAX_SIZE') ?: '20M';
```

**src/Pyz/Shared/SspInquiryManagement/SspInquiryManagementConfig.php**
```php
<?php

namespace Pyz\Shared\SspInquiryManagement;

use SprykerFeature\Shared\SspInquiryManagement\SspInquiryManagementConfig as SprykerSspInquiryConfig;

class SspInquiryManagementConfig extends SprykerSspInquiryConfig
{
    public function getSspInquiryInitialStateMap(): array
    {
        return [
            'SspInquiryDefaultStateMachine' => 'created',
        ];
    }

    public function getSspInquiryStateMachineProcessSspInquiryTypeMap(): array
    {
        return [
            'general' => 'SspInquiryDefaultStateMachine',
            'order' => 'SspInquiryDefaultStateMachine',
            'ssp_asset' => 'SspInquiryDefaultStateMachine',
        ];
    }

    /**
     * @return string
     */
    public function getSspInquiryCancelStateMachineEventName(): string
    {
        return 'cancel';
    }

    /**
     * @return array<string>
     */
    public function getAvailableStatuses(): array
    {
        return [
            'pending',
            'in_review',
            'approved',
            'rejected',
            'canceled',
        ];
    }

    /**
     * @return string
     */
    public function getStorageName(): string
    {
        return 'ssp-inquiry';
    }
}
```

**src/Pyz/Zed/Sales/SalesConfig.php**
```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesConfig as SprykerSalesConfig;

class SalesConfig extends SprykerSalesConfig
{
    /**
     * @return array<string>
     */
    public function getSalesDetailExternalBlocksUrls(): array
    {
        $projectExternalBlocks = [
            'inquiries' => '/ssp-inquiry-management/order-ssp-inquiry-list',
        ];

        $externalBlocks = parent::getSalesDetailExternalBlocksUrls();

        return array_merge($externalBlocks, $projectExternalBlocks);
    }
}
```

## Set up database schema and transfer objects

### Set up database schema

Run Propel commands to apply schema updates:

```bash
console propel:install
```

{% info_block warningBox "Verification" %}
Verify the following tables are created in your database:

- `spy_ssp_inquiry`
- `spy_ssp_inquiry_file`
- `spy_ssp_inquiry_sales_order`
- `spy_ssp_inquiry_sales_order_item`
- `spy_ssp_inquiry_ssp_asset`
{% endinfo_block %}

### Set up transfer objects

Generate transfer classes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}
Ensure the following transfer objects were generated:

| TRANSFER                            | TYPE | EVENT | PATH                                                                      |
|-------------------------------------|------|--------|---------------------------------------------------------------------------|
| SspInquiryCollection                | transfer | created | src/Generated/Shared/Transfer/SspInquiryCollectionTransfer                |
| SspInquiry                          | transfer | created | src/Generated/Shared/Transfer/SspInquiryTransfer                          |
| File                                | transfer | created | src/Generated/Shared/Transfer/FileTransfer                                |
| Mail                                | transfer | created | src/Generated/Shared/Transfer/MailTransfer                                |
| SspInquiryCriteria                  | transfer | created | src/Generated/Shared/Transfer/SspInquiryCriteriaTransfer                  |
| SspInquiryInclude                   | transfer | created | src/Generated/Shared/Transfer/SspInquiryIncludeTransfer                   |
| SspInquiryConditions                | transfer | created | src/Generated/Shared/Transfer/SspInquiryConditionsTransfer                |
| SspInquiryOwnerConditionGroup       | transfer | created | src/Generated/Shared/Transfer/SspInquiryOwnerConditionGroupTransfer       |
| Order                               | transfer | created | src/Generated/Shared/Transfer/OrderTransfer                               |
| SspInquiryCollectionRequest         | transfer | created | src/Generated/Shared/Transfer/SspInquiryCollectionRequestTransfer         |
| SspInquiryCollectionResponse        | transfer | created | src/Generated/Shared/Transfer/SspInquiryCollectionResponseTransfer        |
| Error                               | transfer | created | src/Generated/Shared/Transfer/ErrorTransfer                               |
| Pagination                          | transfer | created | src/Generated/Shared/Transfer/PaginationTransfer                          |
| Item                                | transfer | created | src/Generated/Shared/Transfer/ItemTransfer                                |
| Sort                                | transfer | created | src/Generated/Shared/Transfer/SortTransfer                                |
| CommentThread                       | transfer | created | src/Generated/Shared/Transfer/CommentThreadTransfer                       |
| SequenceNumberSettings              | transfer | created | src/Generated/Shared/Transfer/SequenceNumberSettingsTransfer              |
| FileManagerData                     | transfer | created | src/Generated/Shared/Transfer/FileManagerDataTransfer                     |
| SspInquiryFileDownloadRequest       | transfer | created | src/Generated/Shared/Transfer/SspInquiryFileDownloadRequestTransfer       |
| Customer                            | transfer | created | src/Generated/Shared/Transfer/CustomerTransfer                            |
| FileInfo                            | transfer | created | src/Generated/Shared/Transfer/FileInfoTransfer                            |
| CompanyUser                         | transfer | created | src/Generated/Shared/Transfer/CompanyUserTransfer                         |
| FileUpload                          | transfer | created | src/Generated/Shared/Transfer/FileUploadTransfer                          |
| Company                             | transfer | created | src/Generated/Shared/Transfer/CompanyTransfer                             |
| CompanyBusinessUnit                 | transfer | created | src/Generated/Shared/Transfer/CompanyBusinessUnitTransfer                 |
| Store                               | transfer | created | src/Generated/Shared/Transfer/StoreTransfer                               |
| DataImporterReport                  | transfer | created | src/Generated/Shared/Transfer/DataImporterReportTransfer                  |
| DataImporterConfiguration           | transfer | created | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer           |
| DataImporterDataSourceConfiguration | transfer | created | src/Generated/Shared/Transfer/DataImporterDataSourceConfigurationTransfer |
| OrderCriteria                       | transfer | created | src/Generated/Shared/Transfer/OrderCriteriaTransfer                       |
| OrderConditions                     | transfer | created | src/Generated/Shared/Transfer/OrderConditionsTransfer                     |
| MailRecipient                       | transfer | created | src/Generated/Shared/Transfer/MailRecipientTransfer                       |
| CommentsRequest                     | transfer | created | src/Generated/Shared/Transfer/CommentsRequestTransfer                     |
| StateMachineProcess                 | transfer | created | src/Generated/Shared/Transfer/StateMachineProcessTransfer                 |
| OrderCollection                     | transfer | created | src/Generated/Shared/Transfer/OrderCollectionTransfer                     |
| CompanyUserCriteriaFilter           | transfer | created | src/Generated/Shared/Transfer/CompanyUserCriteriaFilterTransfer           |
| MailTemplate                        | transfer | created | src/Generated/Shared/Transfer/MailTemplateTransfer                        |
| StateMachineItem                    | transfer | created | src/Generated/Shared/Transfer/StateMachineItemTransfer                    |
| CompanyUserCollection               | transfer | created | src/Generated/Shared/Transfer/CompanyUserCollectionTransfer               |
| DashboardResponse                   | transfer | created | src/Generated/Shared/Transfer/DashboardResponseTransfer                   |
| DashboardComponentInquiry           | transfer | created | src/Generated/Shared/Transfer/DashboardComponentInquiryTransfer           |
| DashboardRequest                    | transfer | created | src/Generated/Shared/Transfer/DashboardRequestTransfer                    |
| SspAsset                            | transfer | created | src/Generated/Shared/Transfer/SspAssetTransfer                            |
| SspAssetCollection                  | transfer | created | src/Generated/Shared/Transfer/SspAssetCollectionTransfer                  |
| SspAssetConditions                  | transfer | created | src/Generated/Shared/Transfer/SspAssetConditionsTransfer                  |
| SspAssetCriteria                    | transfer | created | src/Generated/Shared/Transfer/SspAssetCriteriaTransfer                    |
| FileCollection                      | transfer | created | src/Generated/Shared/Transfer/FileCollectionTransfer                      |
| SspAssetInclude                     | transfer | created | src/Generated/Shared/Transfer/SspAssetIncludeTransfer                     |

{% endinfo_block %}

## Add state machine configuration

Create an XML configuration file for the state machine in `config/Zed/StateMachine/SspInquiry/SspInquiryDefaultStateMachine.xml`:

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:state-machine-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:state-machine-01 http://static.spryker.com/state-machine-01.xsd"
>
    <process name="SspInquiryDefaultStateMachine" main="true">

        <states>
            <state name="created"/>
            <state name="pending"/>
            <state name="in_review"/>
            <state name="canceled"/>
            <state name="approved"/>
            <state name="rejected"/>
            <state name="closed"/>
        </states>
        <transitions>
            <transition happy="true">
                <source>created</source>
                <target>pending</target>
                <event>initiate</event>
            </transition>
            <transition happy="true">
                <source>pending</source>
                <target>in_review</target>
                <event>start_review</event>
            </transition>
            <transition happy="true">
                <source>pending</source>
                <target>canceled</target>
                <event>cancel</event>
            </transition>
            <transition>
                <source>in_review</source>
                <target>approved</target>
                <event>approve</event>
            </transition>
            <transition>
                <source>in_review</source>
                <target>rejected</target>
                <event>reject</event>
            </transition>
        </transitions>
        <events>
            <event name="initiate" onEnter="true"/>
            <event name="start_review" manual="true"/>
            <event name="cancel" manual="true"/>
            <event name="approve" manual="true" command="SspInquiry/Approve"/>
            <event name="reject" manual="true" command="SspInquiry/Reject"/>
        </events>
    </process>

</statemachine>
```

{% info_block warningBox "Verification" %}
Verification will be possible after the integration of the `SspInquiryStateMachineHandlerPlugin`.
{% endinfo_block %}

## Configure navigation

Add the `Inquiries` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <sales>
        <ssp-service-management>
            <label>Services</label>
            <title>Services</title>
            <bundle>ssp-service-management</bundle>
            <controller>list</controller>
            <action>index</action>
        </ssp-service-management>
    </sales>
</config>
```

{% info_block warningBox "Verification" %}
Login to the backoffice. Make sure the `Inquiries` section is visible in the navigation menu under `Sales` section.
{% endinfo_block %}

## Add translations

1. Append the glossary:

```csv
ssp_service_management.validation.no_order_items_provided,No order items provided.,en_US
ssp_service_management.validation.no_order_items_provided,Keine Auftragspositionen angegeben.,de_DE
ssp_service_management.validation.order_not_found,Order with ID %id% not found.,en_US
ssp_service_management.validation.order_not_found,Bestellung mit ID %id% nicht gefunden.,de_DE
ssp_service_management.validation.no_payment_methods_found,No payment methods found for this order.,en_US
ssp_service_management.validation.no_payment_methods_found,Keine Zahlungsmethoden für diese Bestellung gefunden.,de_DE
ssp_service_management.list.search_placeholder,Search,en_US
ssp_service_management.list.search_placeholder,Search,de_DE
ssp_service_management.list.search_button,Search,en_US
ssp_service_management.list.search_button,Suchen,de_DE
ssp_service_management.list.title,Services,en_US
ssp_service_management.list.title,Dienstleistungen,de_DE
ssp_service_management.list.order_reference,Order Reference,en_US
ssp_service_management.list.order_reference,Bestellreferenz,de_DE
ssp_service_management.list.product_name,Service Name,en_US
ssp_service_management.list.product_name,Servicename,de_DE
ssp_service_management.list.service_sku,SKU,en_US
ssp_service_management.list.service_sku,SKU,de_DE
ssp_service_management.list.scheduled_at,Time and Date,en_US
ssp_service_management.list.scheduled_at,Zeit und Datum,de_DE
ssp_service_management.list.created_at,Created At,en_US
ssp_service_management.list.created_at,Erstellt am,de_DE
ssp_service_management.list.empty,You don't have any services yet.,en_US
ssp_service_management.list.empty,Sie haben noch keine Dienstleistungen.,de_DE
ssp_service_management.list.widget.title,Services,en_US
ssp_service_management.list.widget.title,Dienstleistungen,de_DE
ssp_service_management.list.state,State,en_US
ssp_service_management.list.state,Status,de_DE
ssp_service_management.list.reset_button,Reset,en_US
ssp_service_management.list.reset_button,Zurücksetzen,de_DE
ssp_service_management.list.my_services,My Services,en_US
ssp_service_management.list.my_services,Meine Dienstleistungen,de_DE
ssp_service_management.list.business_unit_services,Business Unit Services,en_US
ssp_service_management.list.business_unit_services,Geschäftsbereich Dienstleistungen,de_DE
ssp_service_management.list.company_services,Company Services,en_US
ssp_service_management.list.company_services,Unternehmensdienstleistungen,de_DE
ssp_service_management.update_scheduled_time,Change scheduled time,en_US
ssp_service_management.update_scheduled_time,Geplante Zeit ändern,de_DE
ssp_service_management.update_scheduled_time.service.sku,SKU,en_US
ssp_service_management.update_scheduled_time.service.sku,SKU,de_DE
ssp_service_management.update_scheduled_time.service.name,Name,en_US
ssp_service_management.update_scheduled_time.service.name,Name,de_DE
ssp_service_management.update_scheduled_time.service.quantity,Quantity,en_US
ssp_service_management.update_scheduled_time.service.quantity,Menge,de_DE
ssp_service_management.update_scheduled_time.service.state,State,en_US
ssp_service_management.update_scheduled_time.service.state,Status,de_DE
ssp_service_management.update_scheduled_time.title,Update Service Scheduled Time,en_US
ssp_service_management.update_scheduled_time.title,Geplante Servicezeit aktualisieren,de_DE
ssp_service_management.update_scheduled_time.success,Order item rescheduled successfully.,en_US
ssp_service_management.update_scheduled_time.success,Bestellposition erfolgreich neu geplant.,de_DE
ssp_service_management.update_scheduled_time.order_item_details,Order Item Details,en_US
ssp_service_management.update_scheduled_time.order_item_details,Bestellpositionsdetails,de_DE
ssp_service_management.update_scheduled_time.button.save,Save,en_US
ssp_service_management.update_scheduled_time.button.save,Speichern,de_DE
ssp_service_management.update_scheduled_time.button.cancel,Cancel,en_US
ssp_service_management.update_scheduled_time.button.cancel,Abbrechen,de_DE
ssp_service_management.update_scheduled_time.error.order_item_not_found,Order item with uuid %uuid% not found.,en_US
ssp_service_management.update_scheduled_time.error.order_item_not_found,Bestellposition mit UUID %uuid% nicht gefunden.,de_DE
ssp_service_management.list.field.business_unit,Business Unit,en_US
ssp_service_management.list.field.business_unit,Geschäftsbereich,de_DE
ssp_service_management.list.button.view,View,en_US
ssp_service_management.list.button.view,Ansehen,de_DE
```
2. Append the shipment.csv:
```csv
on-site-service,On-Site Service,On-Site Service,Tax Exempt
```
3. Append the shipment_type.csv:
```csv
on-site-service,On-Site Service,1
```
4. Append the service.csv:
```csv
s3,sp1,on-site-service,1
```
5. Append the service_type.csv:
```csv
On-Site Service,on-site-service
```
6. Append the shipment_method_shipment_type.csv:
```csv
on-site-service,on-site-service
```
7. Append the shipment_type_service_type.csv:
```csv
on-site-service,on-site-service
```
8. Append the shipment_method_store.csv:
```csv
on-site-service,DE,EUR,,0
```
9. Append the product_abstract_product_abstract_type.csv:
```csv
abstract_sku,product_abstract_type_key
001,product
666,service
```
11. Append the product_abstract_type.csv:
```csv
key,name
product,product
service,service
```
12. Append the shipment_type_store.csv:
```csv
on-site-service,DE
```
13. Append the shipment_price.csv:
```csv
on-site-service,DE,EUR,,0
```
14. Append the product_shipment_type.csv:
```csv
concrete_sku,shipment_type_key
001_25904006,delivery
```

## Import data

Import glossary and demo data required for the feature:

```bash
console data:import glossary
console data:import product-abstract-product-abstract-type
console data:import product-abstract-type
console data:import product-shipment-type
console data:import shipment-price
console data:import shipment-type-store
console data:import product-abstract-product-abstract-type
console data:import shipment-method-store
console data:import shipment-type-service-type
console data:import shipment-method-shipment-type
console data:import service-type
console data:import service
console data:import shipment-type
console data:import shipment
```

{% info_block warningBox "Verification" %}
Check the data is present in the database.
{% endinfo_block %}

---

### Set up behavior

| PLUGIN                                     | SPECIFICATION                                              | PREREQUISITES | NAMESPACE                                                                           |
|--------------------------------------------|------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------|
| CreateSspInquiryPermissionPlugin           | Allows creating inquiries.                                 |               | SprykerFeature\Shared\SspInquiryManagement\Plugin\Permission                        |
| ViewBusinessUnitSspInquiryPermissionPlugin | Allows access to inquiries in the same business unit.      |               | SprykerFeature\Shared\SspInquiryManagement\Plugin\Permission                        |
| ViewCompanySspInquiryPermissionPlugin      | Allows access to inquiries in the same company.            |               | SprykerFeature\Shared\SspInquiryManagement\Plugin\Permission                        |
| SspInquiryRouteProviderPlugin              | Provides Yves routes for SSP files feature.                |               | SprykerFeature\Yves\SspInquiryManagement\Plugin\Router                              |
| SspInquiryRestrictionHandlerPlugin         | Restricts access to inquiries pages for non-company users. |               | SprykerFeature\Yves\SspInquiryManagement\Plugin\ShopApplication                     |
| BytesTwigPlugin                            | Adds `format_bytes` twig function.                         |               | SprykerFeature\Zed\SspInquiryManagement\Communication\Twig                                |
| SspInquiryDataImportPlugin                 | Introduces import type `ssp-inquiry`                       |               | SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\DataImport             |
| SspInquiryManagementFilePreDeletePlugin    | Ensures the files are deleted when the inquiry is removed. |               | SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\FileManager            |
| SspInquiryApprovedMailTypeBuilderPlugin    | Sends email on inquiry approval.                           |               | SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\Mail                   |
| SspInquiryRejectedMailTypeBuilderPlugin    | Sends email on inquiry rejection.                          |               | SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\Mail                   |
| SspInquiryDashboardDataProviderPlugin      | Adds inquiries table to the SSP Dashboard.                 |               | SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\SspDashboardManagement |
| SspInquirySspAssetManagementExpanderPlugin | Adds inquiries table to Assets.                            |               | SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\SspAssetManagement     |
| SspInquiryStateMachineHandlerPlugin        | StateMachine handler for inquiry processing.               |               | SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\StateMachine           |
| ApproveSspInquiryCommandPlugin             | StateMachine command that handles the inquiry approval.    |               | SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\SspInquiryManagement   |
| RejectSspInquiryCommandPlugin              | StateMachine command that handles the inquiry rejection.   |               | SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\SspInquiryManagement   |
| CreateOrderSspInquiryLinkWidget            | Provides button to create an inquiry for an order.         |               | SprykerFeature\Yves\SspInquiryManagement\Widget                                     |
| DashboardInquiryWidget                     | Provides the inquiries table for the Dashboard.            |               | SprykerFeature\Yves\SspInquiryManagement\Widget                                     |
| SspInquiryListWidget                       | Provides the inquiries table.                              |               | SprykerFeature\Yves\SspInquiryManagement\Widget                                     |
| SspInquiryMenuItemWidget                   | Provides a customer menu item for the inquiries.           |               | SprykerFeature\Yves\SspInquiryManagement\Widget                                     |


Update your Zed dependency providers.

**src/Pyz/Zed/Permission/PermissionDependencyProvider.php**

```php
use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Shared\SspInquiryManagement\Plugin\Permission\CreateSspInquiryPermissionPlugin;
use SprykerFeature\Shared\SspInquiryManagement\Plugin\Permission\ViewBusinessUnitSspInquiryPermissionPlugin;
use SprykerFeature\Shared\SspInquiryManagement\Plugin\Permission\ViewCompanySspInquiryPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    protected function getPermissionPlugins(): array
    {
        return [
            new CreateSspInquiryPermissionPlugin(),
            new ViewBusinessUnitSspInquiryPermissionPlugin(),
            new ViewCompanySspInquiryPermissionPlugin(),
        ];
    }
}
```

**src/Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
use Spryker\Yves\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Shared\SspInquiryManagement\Plugin\Permission\CreateSspInquiryPermissionPlugin;
use SprykerFeature\Shared\SspInquiryManagement\Plugin\Permission\ViewBusinessUnitSspInquiryPermissionPlugin;
use SprykerFeature\Shared\SspInquiryManagement\Plugin\Permission\ViewCompanySspInquiryPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    protected function getPermissionPlugins(): array
    {
        return [
            new CreateSspInquiryPermissionPlugin(),
            new ViewBusinessUnitSspInquiryPermissionPlugin(),
            new ViewCompanySspInquiryPermissionPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerFeature\Yves\SspInquiryManagement\Plugin\Router\SspInquiryRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new SspInquiryRouteProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\SspInquiryManagement\Plugin\ShopApplication\SspInquiryRestrictionHandlerPlugin;
use SprykerFeature\Yves\SspInquiryManagement\Widget\SspInquiryListWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getGlobalWidgets(): array
    {
        return [
            SspInquiryListWidget::class,
        ];
    }
    
    protected function getFilterControllerEventSubscriberPlugins(): array
    {
        return [
            new SspInquiryRestrictionHandlerPlugin(),
        ];
    }
}

```

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\DataImport\SspInquiryDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new SspInquiryDataImportPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/FileManager/FileManagerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\FileManager;

use Spryker\Zed\FileManager\FileManagerDependencyProvider as SprykerFileManagerDependencyProvider;
use SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\FileManager\SspInquiryManagementFilePreDeletePlugin;

class FileManagerDependencyProvider extends SprykerFileManagerDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\FileManagerExtension\Dependency\Plugin\FilePreDeletePluginInterface>
     */
    protected function getFilePreDeletePlugins(): array
    {
        return [
            new SspInquiryManagementFilePreDeletePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Mail/MailDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Mail;

use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;
use SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\Mail\SspInquiryApprovedMailTypeBuilderPlugin;
use SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\Mail\SspInquiryRejectedMailTypeBuilderPlugin;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    protected function getMailTypeBuilderPlugins(): array
    {
        return [
            new SspInquiryApprovedMailTypeBuilderPlugin(),
            new SspInquiryRejectedMailTypeBuilderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SspDashboardManagement/SspDashboardManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SspDashboardManagement;

use SprykerFeature\Zed\SspDashboardManagement\SspDashboardManagementDependencyProvider as SprykerSspDashboardManagementDependencyProvider;
use SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\SspDashboardManagement\SspInquiryDashboardDataProviderPlugin;

class SspDashboardManagementDependencyProvider extends SprykerSspDashboardManagementDependencyProvider
{
    /**
     * @return array<int, \SprykerFeature\Zed\SspDashboardManagement\Dependency\Plugin\DashboardDataProviderPluginInterface>
     */
    protected function getDashboardDataProviderPlugins(): array
    {
        return [
            new SspInquiryDashboardDataProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SspAssetManagement/SspAssetManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SspAssetManagement;

use SprykerFeature\Zed\SspAssetManagement\SspAssetManagementDependencyProvider as SprykerSspAssetManagementDependencyProvider;
use SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\SspAssetManagement\SspInquirySspAssetManagementExpanderPlugin;

class SspAssetManagementDependencyProvider extends SprykerSspAssetManagementDependencyProvider
{
    /**
     * @return array<\SprykerFeature\Zed\SspAssetManagement\Dependency\Plugin\SspAssetManagementExpanderPluginInterface>
     */
    protected function getSspAssetManagementExpanderPlugins(): array
    {
        return [
            new SspInquirySspAssetManagementExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/StateMachine/StateMachineDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\StateMachine;

use Spryker\Zed\StateMachine\StateMachineDependencyProvider as SprykerStateMachineDependencyProvider;
use SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\StateMachine\SspInquiryStateMachineHandlerPlugin;

class StateMachineDependencyProvider extends SprykerStateMachineDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StateMachine\Dependency\Plugin\StateMachineHandlerInterface>
     */
    protected function getStateMachineHandlers(): array
    {
        return [
            new SspInquiryStateMachineHandlerPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SspInquiryManagement/SspInquiryManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SspInquiryManagement;

use SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\SspInquiryManagement\ApproveSspInquiryCommandPlugin;
use SprykerFeature\Zed\SspInquiryManagement\Communication\Plugin\SspInquiryManagement\RejectSspInquiryCommandPlugin;
use SprykerFeature\Zed\SspInquiryManagement\SspInquiryManagementDependencyProvider as SprykerSspInquiryManagementDependencyProvider;

class SspInquiryManagementDependencyProvider extends SprykerSspInquiryManagementDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StateMachine\Dependency\Plugin\CommandPluginInterface>
     */
    protected function getStateMachineCommandPlugins(): array
    {
        return [
            'SspInquiry/Approve' => new ApproveSspInquiryCommandPlugin(),
            'SspInquiry/Reject' => new RejectSspInquiryCommandPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerFeature\Zed\SspInquiryManagement\Communication\Twig\BytesTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new BytesTwigPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

{% endinfo_block %}

### Set up widgets

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\SspInquiryManagement\Widget\CreateOrderSspInquiryLinkWidget;
use SprykerFeature\Yves\SspInquiryManagement\Widget\DashboardInquiryWidget;
use SprykerFeature\Yves\SspInquiryManagement\Widget\SspInquiryListWidget;
use SprykerFeature\Yves\SspInquiryManagement\Widget\SspInquiryMenuItemWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

/**
 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
 */
class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            SspInquiryMenuItemWidget::class,
            CreateOrderSspInquiryLinkWidget::class,
            DashboardInquiryWidget::class,
            SspInquiryListWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

{% endinfo_block %}
