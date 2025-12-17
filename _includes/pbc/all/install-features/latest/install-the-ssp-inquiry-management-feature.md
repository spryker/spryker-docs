This document describes how to install the Self-Service Portal (SSP) Inquiry Management feature.

## Prerequisites


| FEATURE         | VERSION  | INSTALLATION GUIDE  |
|--------------|----------| ------------------ |
| Spryker Core | 202512.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                        |
| Self-Service Portal | 202512.0 | [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)          |

## Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/self-service-portal:"^202512.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following packages are now listed in `composer.lock`:

| MODULE            | EXPECTED DIRECTORY                         |
|-------------------|--------------------------------------------|
| SelfServicePortal | vendor/spryker-feature/self-service-portal |

{% endinfo_block %}

## Set up configuration

| CONFIGURATION                                                             | SPECIFICATION                                                                                                                   | NAMESPACE                               |
|---------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| FileSystemConstants::FILESYSTEM_SERVICE                                   | Configures the Flysystem service for managing file uploads, specifying the adapter and storage path for inquiry-related files.  | Spryker\Shared\FileSystem               |
| SelfServicePortalConstants::BASE_URL_YVES                                 | Defines the base URL for the Yves frontend, which is used to construct links in email notifications sent for inquiries.         | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConstants::DEFAULT_TOTAL_FILE_MAX_SIZE                   | Sets a maximum total size for all files that can be uploaded with a single inquiry, preventing excessively large submissions. | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConstants::DEFAULT_FILE_MAX_SIZE                         | Sets a maximum size for a single file that can be uploaded with an inquiry.                                                   | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConstants::INQUIRY_STORAGE_NAME                          | Defines the storage name for inquiry files in the Flysystem configuration, linking to the specified file system service.    | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConfig::getInquiryInitialStateMachineMap()               | Maps an inquiry's state machine process to its initial state, determining the starting point of the inquiry workflow.           | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConfig::getSspInquiryStateMachineProcessInquiryTypeMap() | Maps each inquiry type to a specific state machine process, allowing for different workflows based on the inquiry's nature.     | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConfig::getSspInquiryCancelStateMachineEventName()       | Defines the name of a state machine event that is triggered to cancel an inquiry.                                             | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConfig::getSspInquiryAvailableStatuses()                 | Provides a list of all possible statuses that an inquiry can have, which are used for filtering and display purposes.           | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConfig::getInquiryStatusClassMap()                       | Maps inquiry statuses to corresponding CSS class names, allowing for visual styling of status indicators in the user interface. | SprykerFeature\Zed\SelfServicePortal    |
| SelfServicePortalConfig::getInquiryPendingStatus()                        | Specifies which inquiry status is considered "Pending," which is used for dashboard widgets and filtering.                      | SprykerFeature\Zed\SelfServicePortal    |
| SalesConfig::getSalesDetailExternalBlocksUrls()                           | Extends the order details page in the Back Office by adding a block to display related inquiries.                               | Spryker\Zed\Sales                       |

**config/Shared/config_default.php**

```php
<?php

use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;
use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
     'ssp-inquiry' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'key' => getenv('SPRYKER_S3_SSP_CLAIM_KEY') ?: '',
        'secret' => getenv('SPRYKER_S3_SSP_CLAIM_SECRET') ?: '',
        'bucket' => getenv('SPRYKER_S3_SSP_CLAIM_BUCKET') ?: '',
        'region' => getenv('AWS_REGION') ?: 'eu-central-1',
        'version' => 'latest',
        'root' => '/ssp-inquiry',
        'path' => '',
    ],
];

$config[SelfServicePortalConstants::BASE_URL_YVES] = 'https://your-yves-url';
$config[SelfServicePortalConstants::DEFAULT_TOTAL_FILE_MAX_SIZE] = getenv('SPRYKER_DEFAULT_TOTAL_FILE_MAX_SIZE') ?: '100M';
$config[SelfServicePortalConstants::DEFAULT_FILE_MAX_SIZE] = getenv('SPRYKER_DEFAULT_FILE_MAX_SIZE') ?: '20M';
$config[SelfServicePortalConstants::INQUIRY_STORAGE_NAME] = 'ssp-inquiry';
```

<details>
  <summary>src/Pyz/Shared/SelfServicePortal/SelfServicePortalConfig.php</summary>

```php
<?php

namespace Pyz\Shared\SelfServicePortal;

use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConfig as SprykerSelfServicePortalConfig;

class SelfServicePortalConfig extends SprykerSelfServicePortalConfig
{
    public function getInquiryInitialStateMachineMap(): array
    {
        return [
            'SspInquiryDefaultStateMachine' => 'created',
        ];
    }

    public function getSspInquiryStateMachineProcessInquiryTypeMap(): array
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
    public function getSspInquiryAvailableStatuses(): array
    {
        return [
            'pending',
            'in_review',
            'approved',
            'rejected',
            'canceled',
        ];
    }
}

```

</details>

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
            'inquiries' => '/self-service-portal/list-order-inquiry'
        ];

        $externalBlocks = parent::getSalesDetailExternalBlocksUrls();

        return array_merge($externalBlocks, $projectExternalBlocks);
    }
}
```

## Set up database schema

Apply schema updates:

```bash
console propel:install
```

{% info_block warningBox "Verification" %}
Make sure the following tables have been created in the database:

- `spy_ssp_inquiry`
- `spy_ssp_inquiry_file`
- `spy_ssp_inquiry_sales_order`
- `spy_ssp_inquiry_sales_order_item`
- `spy_ssp_inquiry_ssp_asset`
  {% endinfo_block %}

## Set up transfer objects

Generate transfer classes:

```bash
console transfer:generate
```

## Add state machine configuration

Create an XML configuration file for the state machine.

<details>
  <summary>config/Zed/StateMachine/SspInquiry/SspInquiryDefaultStateMachine.xml</summary>

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

</details>

## Configure navigation

Add the `Inquiries` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <ssp>
        <self-service-portal-inquiries>
            <label>Inquiries</label>
            <title>Inquiries</title>
            <bundle>self-service-portal</bundle>
            <controller>list-inquiry</controller>
            <action>index</action>
        </self-service-portal-inquiries>
    </ssp>
</config>
```

{% info_block warningBox "Verification" %}
Make sure that, in the Back Office, the **Customer portal** > **Inquiries** menu item is available.
{% endinfo_block %}

## Set up behavior

| PLUGIN                                     | SPECIFICATION                                                                  | PREREQUISITES | NAMESPACE                                                                        |
|--------------------------------------------|--------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------|
| CreateSspInquiryPermissionPlugin           | Allows customer to create inquiries.                                           |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                        |
| ViewBusinessUnitSspInquiryPermissionPlugin | Allows customer to view inquiries within the same company business unit.       |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                        |
| ViewCompanySspInquiryPermissionPlugin      | Allows customer to view inquiries within the same company.                     |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                        |
| SspInquiryRouteProviderPlugin              | Provides Yves routes for the SSP inquiry feature.                              |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Router                              |
| SspInquiryRestrictionHandlerPlugin         | Restricts access to inquiries and inquiry details pages for non-company users. |               | SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication                     |
| FileSizeFormatterTwigPlugin                | Adds a Twig filter to format file sizes in a human-readable format.            |               | SprykerFeature\Zed\SelfServicePortal\Communication\Twig                          |
| SspInquiryDataImportPlugin                 | Introduces the `ssp-inquiry` import type.                                      |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport             |
| SspInquiryApprovedMailTypeBuilderPlugin    | Sends an email on inquiry approval.                                            |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Mail                   |
| SspInquiryRejectedMailTypeBuilderPlugin    | Sends an email on inquiry rejection.                                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Mail                   |
| SspInquiryListWidget                       | Displays inquiry list.                                                         |               | SprykerFeature\Yves\SelfServicePortal\Widget                                     |
| SspInquirySspAssetManagementExpanderPlugin | Adds the inquiries table to Assets.                                            |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspAssetManagement     |
| SspInquiryStateMachineHandlerPlugin        | State Machine handler for inquiry processing.                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\StateMachine           |
| ApproveSspInquiryCommandPlugin             | State Machine command that handles inquiry approval.                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspInquiryManagement   |
| RejectSspInquiryCommandPlugin              | State Machine command that handles inquiry rejection.                          |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspInquiryManagement   |
| SspInquiryDashboardDataExpanderPlugin      | Provides inquiry data for the dashboard.                                       |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement |

**src/Pyz/Zed/Permission/PermissionDependencyProvider.php**

```php
use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\CreateSspInquiryPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewBusinessUnitSspInquiryPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanySspInquiryPermissionPlugin;

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
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\CreateSspInquiryPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewBusinessUnitSspInquiryPermissionPlugin;
use SprykerFeature\Shared\SelfServicePortal\Plugin\Permission\ViewCompanySspInquiryPermissionPlugin;

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
use SprykerFeature\Yves\SelfServicePortal\Plugin\Router\SelfServicePortalPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new SelfServicePortalPageRouteProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication\SspInquiryRestrictionHandlerPlugin;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspInquiryListWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspInquiryMenuItemWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getGlobalWidgets(): array
    {
        return [
            SspInquiryListWidget::class,
            SspInquiryMenuItemWidget::class
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
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\SspInquiryDataImportPlugin;

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
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\FileManager\SspInquiryManagementFilePreDeletePlugin;

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
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Mail\SspInquiryApprovedMailTypeBuilderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Mail\SspInquiryRejectedMailTypeBuilderPlugin;

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

**src/Pyz/Zed/SelfServicePortal/SelfServicePortalDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SelfServicePortal;

use SprykerFeature\Zed\SelfServicePortal\SprykerSelfServicePortalDependencyProvider as SprykerSelfServicePortalDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement\SspInquiryDashboardDataExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspAssetManagement\SspInquirySspAssetManagementExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\StateMachine\ApproveSspInquiryCommandPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\StateMachine\RejectSspInquiryCommandPlugin;

class SelfServicePortalDependencyProvider extends SprykerSelfServicePortalDependencyProvider
{
    /**
     * @return array<int, \SprykerFeature\Zed\SelfServicePortal\Dependency\Plugin\DashboardDataExpanderPluginInterface>
     */
    protected function getDashboardDataExpanderPlugins(): array
    {
        return [
            new SspInquiryDashboardDataExpanderPlugin(),
        ];
    }

    /**
     * @return array<\SprykerFeature\Zed\SspAssetManagement\Dependency\Plugin\SspAssetManagementExpanderPluginInterface>
     */
    protected function getSspAssetManagementExpanderPlugins(): array
    {
        return [
            new SspInquirySspAssetManagementExpanderPlugin(),
        ];
    }

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

**src/Pyz/Zed/StateMachine/StateMachineDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\StateMachine;

use Spryker\Zed\StateMachine\StateMachineDependencyProvider as SprykerStateMachineDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\StateMachine\SspInquiryStateMachineHandlerPlugin;

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

**src/Pyz/Zed/Twig/TwigDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Twig;

use Spryker\Zed\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Twig\FileSizeFormatterTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new FileSizeFormatterTwigPlugin(),
        ];
    }
}
```



## Set up widgets

| PLUGIN                      | SPECIFICATION                                        | PREREQUISITES | NAMESPACE                                    |
|-----------------------------|------------------------------------------------------|---------------|----------------------------------------------|
| CreateOrderSspInquiryWidget | Provides a button to create an inquiry for an order. |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspInquiryListWidget        | Provides the inquiries table.                        |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| DashboardInquiryWidget      | Provides the inquiries table for the Dashboard.      |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspInquiryMenuItemWidget    | Provides a customer menu item for the inquiries.     |               | SprykerFeature\Yves\SelfServicePortal\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\SelfServicePortal\Widget\CreateOrderSspInquiryWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspInquiryListWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspInquiryMenuItemWidget;
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
            CreateOrderSspInquiryWidget::class,
            SspInquiryListWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Set customer permissions for inquiry management:

1. In the Back Office, go to **Customers** > **Company Roles**.
2. Click **Add Company User Role**.
3. Select a company.
4. Enter a name for the role.
5. In **Unassigned Permissions**, enable the following permissions:
    - **Create inquiry**
    - **View company inquiries**
    - **View business unit inquiries**
6. Click **Submit**.
7. Go to **Customers** > **Company Users**.
8. Click **Edit** next to a user.
9. Assign the role you've created to the user.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify customer permissions on Storefront:

1. On the Storefront, log in with the company user you've assigned the role to.
2. Go to **Customer Account** > **Inquiries**.
3. Click **Create Inquiry**.
4. Fill in the required fields.
5. Optional: Upload up to 5 files.
6. Click **Submit Inquiry**.
   Make sure this saves the inquiry and opens the inquiry details page.
7. Go to **Customer Account** > **Inquiries**.
   Make sure the inquiry you've created is displayed in the list.
8. Go to **Customer Account** > **Dashboard**.
   Make sure the Inquiry widget displays the inquiry you've created.
9. Log out and log in with another company user that doesn't have the role.
   Make sure the **Inquiries** menu item is not displayed, and you can't access the **Inquiries** page.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify inquiries in the Back Office:

1. In the Back Office, go to **Customer Portal** > **Inquiries** page. Make sure the following applies:

- The inquiry you've created on the Storefront is displayed in the list.
- You can filter the list by **Inquiry status** and **Inquiry type**.

2. Click **View** next to an inquiry.
   Make sure that, in the **Status** section, **Start review** and **Reject** buttons are displayed.
3. Click **Start review**.
   Make sure the inquiry status changes to **In review**.

{% endinfo_block %}

## Demo data for EU region / DE store

### Add translations

[Here you can find how to import translations for Self-Service Portal feature](/docs/pbc/all/self-service-portal/latest/install/ssp-glossary-data-import.html)

### Add inquiry demo data

Add to **data/import/common/EU/ssp_inquiry.csv**:

```csv
reference,store,type,company_user_key,subject,description
DE-INQR--1,DE,general,Spryker--8,Request for documentation,Please provide detailed documentation on the warranty and return policies for the products purchased under my account.
DE-INQR--2,DE,general,Spryker--8,Product catalog issue,I noticed that several products in the catalog are missing specifications and images. This makes it difficult to make informed purchasing decisions. Please update the product details.
DE-INQR--3,AT,general,Spryker--8,Request for documentation,Please provide detailed documentation on the warranty and return policies for the products purchased under my account.
DE-INQR--4,AT,general,Spryker--8,Product catalog issue,I noticed that several products in the catalog are missing specifications and images. This makes it difficult to make informed purchasing decisions. Please update the product details.
```

#### Extend the data import configuration

**/data/import/local/full_EU.yml**

```yaml
# ...

# SelfServicePortal
- data_entity: ssp-inquiry
  source: data/import/common/common/ssp_inquiry.csv
```

### Add cms block data import for email templates

Add to **data/import/common/common/cms_block.csv**:

<details>
  <summary>cms_block.csv</summary>

```csv
{% raw %}cms-block-email--customer_email_change_notification--html,customer_email_change_notification--html,HTML Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.html.twig,1,,,,,,,"<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <!--[if gte mso 9]> <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%""> <![endif]--> <tbody class=""sprykerBoxedTextBlockOuter""> <tr> <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <!--[if gte mso 9]> <td align=""center"" valign=""top"" ""> <![endif]--> <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""> <tbody> <tr> <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0""> <tbody> <tr> <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top""> <p style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"">{{ 'mail.customer.customer_email_change_notification.text' | trans }}</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if gte mso 9]> </td> <![endif]--> <!--[if gte mso 9]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <tbody class=""sprykerTextBlockOuter""> <tr> <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top""><br> <!--[if mso]> </td> <![endif]--> <!--[if mso]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE -->","<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <!--[if gte mso 9]> <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%""> <![endif]--> <tbody class=""sprykerBoxedTextBlockOuter""> <tr> <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <!--[if gte mso 9]> <td align=""center"" valign=""top"" ""> <![endif]--> <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""> <tbody> <tr> <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0""> <tbody> <tr> <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top""> <p style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"">{{ 'mail.customer.customer_email_change_notification.text' | trans }}</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if gte mso 9]> </td> <![endif]--> <!--[if gte mso 9]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <tbody class=""sprykerTextBlockOuter""> <tr> <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top""><br> <!--[if mso]> </td> <![endif]--> <!--[if mso]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE -->"
cms-block-email--company-status--text,company-status--text,TEXT Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.text.twig,1,,,,,,,"{{ 'mail.trans.common.hello_for_first_name' | trans }} {{ mail.customer.firstName }} {{ mail.customer.lastName }},  {{ 'mail.trans.company_status.title' | trans }} {{ ('mail.company.status.' ~ mail.company.status) | trans }}","{{ 'mail.trans.common.hello_for_first_name' | trans }} {{ mail.customer.firstName }} {{ mail.customer.lastName }},  {{ 'mail.trans.company_status.title' | trans }} {{ ('mail.company.status.' ~ mail.company.status) | trans }}"
cms-block-email--ssp-inquiry-approved--html,ssp-inquiry-approved--html,HTML Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.html.twig,1,,,,,,,"<table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><h1 style=""text-align:center;margin:0;color:#202020;font-family:Helvetica;font-size:20px;font-weight:normal;line-height:125%;padding:15px"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.salutation' | trans({'%name%':mail.customer.firstName~' '~mail.customer.lastName})}}</h1></td></tr></tbody></table></td></tr></tbody></table><table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><p style=""text-align:center;margin:0;font-weight:bold"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text' | trans({'%reference%':mail.sspInquiry.reference})}}</p></td></tr><tr><td style=""padding-top:18px;padding-bottom:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center""><table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse:separate!important;border-radius:2px;background-color:#1EBEA0;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody><tr><td class=""sprykerButtonContent"" style=""font-family:Helvetica,Helvetica,Arial,Verdana,sans-serif;font-size:14px;padding:13px 18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""middle"" align=""center""><a class=""sprykerButton"" href=""{{ mail.sspInquiryUrl }}"" target=""_blank"" style=""font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#FFFFFF;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;display:block"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>","<table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""top""><h1 style=""text-align:center;margin:0;color:#202020;font-family:Helvetica;font-size:20px;font-weight:normal;line-height:125%;padding:15px"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.salutation' | trans({'%name%':mail.customer.firstName~' '~mail.customer.lastName})}}</h1></td></tr></tbody></table></td></tr></tbody></table><table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""top""><p style=""text-align:center;margin:0;font-weight:bold"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text' | trans({'%reference%':mail.sspInquiry.reference})}}</p></td></tr><tr><td style=""padding-top:18px;padding-bottom:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center""><table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse:separate!important;border-radius:2px;background-color:#1EBEA0;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody><tr><td class=""sprykerButtonContent"" style=""font-family:Helvetica,Helvetica,Arial,Verdana,sans-serif;font-size:14px;padding:13px 18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""middle"" align=""center""><a class=""sprykerButton"" href=""{{ mail.sspInquiryUrl }}"" target=""_blank"" style=""font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#FFFFFF;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%;display:block"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>","<table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""top""><h1 style=""text-align:center;margin:0;color:#202020;font-family:Helvetica;font-size:20px;font-weight:normal;line-height:125%;padding:15px"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation' | trans({'%name%':mail.customer.firstName~' '~mail.customer.lastName})}}</h1></td></tr></tbody></table></td></tr></tbody></table><table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""top""><p style=""text-align:center;margin:0;font-weight:bold"">{{ 'ssp_inquiry.mail.trans.sspInquiry_rejected.main_text' | trans({'%reference%':mail.sspInquiry.reference})}}</p></td></tr><tr><td style=""padding-top:18px;padding-bottom:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center""><table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse:separate!important;border-radius:2px;background-color:#1EBEA0;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody><tr><td class=""sprykerButtonContent"" style=""font-family:Helvetica,Helvetica,Arial,Verdana,sans-serif;font-size:14px;padding:13px 18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""middle"" align=""center""><a class=""sprykerButton"" href=""{{ mail.sspInquiryUrl }}"" target=""_blank"" style=""font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#FFFFFF;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%;display:block"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>","<table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""top""><h1 style=""text-align:center;margin:0;color:#202020;font-family:Helvetica;font-size:20px;font-weight:normal;line-height:125%;padding:15px"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation' | trans({'%name%':mail.customer.firstName~' '~mail.customer.lastName})}}</h1></td></tr></tbody></table></td></tr></tbody></table><table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""top""><p style=""text-align:center;margin:0;font-weight:bold"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.main_text' | trans({'%reference%':mail.sspInquiry.reference})}}</p></td></tr><tr><td style=""padding-top:18px;padding-bottom:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center""><table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse:separate!important;border-radius:2px;background-color:#1EBEA0;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody><tr><td class=""sprykerButtonContent"" style=""font-family:Helvetica,Helvetica,Arial,Verdana,sans-serif;font-size:14px;padding:13px 18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%"" valign=""middle"" align=""center""><a class=""sprykerButton"" href=""{{ mail.sspInquiryUrl }}"" target=""_blank"" style=""font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#FFFFFF;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size_adjust:100%;display:block"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>"
cms-block-email--ssp-inquiry-rejected--text,ssp-inquiry-rejected--text,TEXT Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.text.twig,1,,,,,,,"{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation' | trans({'%name%' : mail.customer.firstName ~ ' ' ~ mail.customer.lastName})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.main_text' | trans({'%reference%' : mail.sspInquiry.reference})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}: {{ mail.sspInquiryUrl }}","{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation' | trans({'%name%' : mail.customer.firstName ~ ' ' ~ mail.customer.lastName})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.main_text' | trans({'%reference%' : mail.sspInquiry.reference})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}: {{ mail.sspInquiryUrl }}"{% endraw %}
```

</details>

Add to **data/import/common/DE/cms_block_store.csv**:

```csv
cms-block-email--ssp-inquiry-approved--html,DE
cms-block-email--ssp-inquiry-approved--text,DE
cms-block-email--ssp-inquiry-rejected--html,DE
cms-block-email--ssp-inquiry-rejected--text,DE
```

### Import data

### Import glossary and demo data

```bash
console data:import glossary
console data:import ssp-inquiry
console data:import cms-block
console data:import cms-block-store
```

{% info_block warningBox "Verification" %}

Make sure the following applies:

- Glossary keys have been added to `spy_glossary_key` and `spy_glossary_translation` tables.
- The `ssp_inquiry` table contains the new inquiries.
- The new CMS blocks are assigned to correct stores.

{% endinfo_block %}

## Enable Storefront API endpoints

| PLUGIN                          | SPECIFICATION                                              | PREREQUISITES | NAMESPACE                                                    |
|---------------------------------|------------------------------------------------------------|---------------|--------------------------------------------------------------|
| SspInquiriesResourceRoutePlugin | Provides the GET and POST endpoints for the SSP inquiries. |               | SprykerFeature\Glue\SelfServicePortal\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\GlueApplication;

use SprykerFeature\Glue\SelfServicePortal\Plugin\GlueApplication\SspInquiriesResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
   /**
     * {@inheritDoc}
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {    
        return [
            new SspInquiriesResourceRoutePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Create inquiries by importing demo data as described in the previous sections.

2. Get the access token by sending a `POST` request to the token endpoint with the company user credentials:

`POST https://glue.mysprykershop.com/token`

```json
{
    "data": {
        "type": "token",
        "attributes": {
            "grant_type": "password",
            "username": {% raw %}{{{% endraw %}username{% raw %}}}{% endraw %},
            "password": {% raw %}{{{% endraw %}password{% raw %}}}{% endraw %},
        }
    }
}
```

3. Use the access token to access the `ssp-inquiries` endpoint:


<details>
  <summary>GET https://glue.mysprykershop.com/ssp-inquiries</summary>

```json
{
  "data": [
    {
      "type": "ssp-inquiries",
      "id": "DE-INQR--1",
      "attributes": {
        "sspAssetReference": null,
        "orderReference": null,
        "type": "general",
        "status": "pending",
        "subject": "Request for documentation",
        "description": "Please provide detailed documentation on the warranty and return policies for the products purchased under my account.",
        "reference": "DE-INQR--1",
        "isCancellable": null
      },
      "links": {
        "self": "http://glue.eu.spryker.local/ssp-inquiries/DE-INQR--1"
      }
    },
    {
      "type": "ssp-inquiries",
      "id": "DE-INQR--2",
      "attributes": {
        "sspAssetReference": null,
        "orderReference": null,
        "type": "general",
        "status": "pending",
        "subject": "Product catalog issue",
        "description": "I noticed that several products in the catalog are missing specifications and images. This makes it difficult to make informed purchasing decisions. Please update the product details.",
        "reference": "DE-INQR--2",
        "isCancellable": null
      },
      "links": {
        "self": "http://glue.eu.spryker.local/ssp-inquiries/DE-INQR--2"
      }
    }
  ],
  "links": {
    "self": "http://glue.eu.spryker.local/ssp-inquiries"
  }
}
```

4. To get the particular inquiry, use the access token to send a `GET` request to the `ssp-inquiries` endpoint with the asset ID:
   `GET https://glue.mysprykershop.com/ssp-inquiries/DE-INQR--1`

```json
{
  "data": {
    "type": "ssp-inquiries",
    "id": "DE-INQR--1",
    "attributes": {
      "sspAssetReference": null,
      "orderReference": null,
      "type": "general",
      "status": "pending",
      "subject": "Request for documentation",
      "description": "Please provide detailed documentation on the warranty and return policies for the products purchased under my account.",
      "reference": "DE-INQR--1",
      "isCancellable": null
    },
    "links": {
      "self": "http://glue.eu.spryker.local/ssp-inquiries/DE-INQR--1"
    }
  }
}
```

5. Use the access token to create the `ssp-inquiries` resource:
   `POST https://glue.mysprykershop.com/ssp-inquiries`

```json
{
  "data": {
    "type": "ssp-inquiries",
    "attributes": {
      "reference": {% raw %}{{{% endraw %}Inquery reference{% raw %}}}{% endraw %},
      "subject": {% raw %}{{{% endraw %}Asset reference{% raw %}}}{% endraw %},
      "description": {% raw %}{{{% endraw %}Description{% raw %}}}{% endraw %},
      "type": {% raw %}{{{% endraw %}One of the following types: general, order, ssp_asset{% raw %}}}{% endraw %},
      "sspAssetReference": {% raw %}{{{% endraw %}Asset reference{% raw %}}}{% endraw %}
    }
  }
}
```

Example of a successful response:

```json
{
  "data": {
    "type": "ssp-inquiries",
    "id": "DE-INQR--3",
    "attributes": {
      "sspAssetReference": "AST--39",
      "orderReference": null,
      "type": "ssp_asset",
      "status": null,
      "subject": "TestInquiryAPIsubject",
      "description": "TestInquiryAPIdescription",
      "reference": "DE-INQR--3",
      "isCancellable": null
    },
    "links": {
      "self": "http://glue.eu.spryker.local/ssp-inquiries/DE-INQR--3"
    }
  }
}
```

{% endinfo_block %}