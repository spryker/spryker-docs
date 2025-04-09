
# Install the SSP Dashboard Management Feature

This document describes how to install the *SSP Dashboard Management* feature in your Spryker project.

---

## Prerequisites

Before installing this feature, make sure the following are already set up in your project:

| NAME         | VERSION | INSTALLATION GUIDE  |
|--------------| ------- | ------------------ |
| Spryker Core | {{site.version}}  | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                        |
| SSP features | {{site.version}}  | [Install the SSP feature](/docs/pbc/all/miscellaneous/{{site.version}}/ssp/install-ssp-features.md)          |

## Install the required modules using Composer

Install the necessary packages via Composer:

```bash
composer require spryker-feature/ssp-dashboard-management:"^0.1.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Check that the following packages are now listed in `composer.lock`:

| MODULE                 | EXPECTED DIRECTORY                               |
|------------------------|--------------------------------------------------|
| SspDashboardManagement | vendor/spryker-feature/ssp-dashboard-management       |

{% endinfo_block %}

## Set up transfer objects

Generate transfer classes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}
Ensure the following transfer objects were generated:

| TRANSFER                          | TYPE | EVENT | PATH                                                             |
|-----------------------------------|------|--------|------------------------------------------------------------------|
| DashboardRequest                  | transfer | created | src/Generated/Shared/Transfer/DashboardRequestTransfer           |
| DashboardComponentCriteria        | transfer | created | src/Generated/Shared/Transfer/DashboardComponentCriteriaTransfer |
| DashboardResponse                 | transfer | created | src/Generated/Shared/Transfer/DashboardResponseTransfer          |
| CmsBlockRequest                   | transfer | created | src/Generated/Shared/Transfer/CmsBlockRequestTransfer            |
| CmsBlock                          | transfer | created | src/Generated/Shared/Transfer/CmsBlockTransfer                   |
| SynchronizationData               | transfer | created | src/Generated/Shared/Transfer/SynchronizationDataTransfer        |
| Customer                          | transfer | created | src/Generated/Shared/Transfer/CustomerTransfer                   |
| CompanyUser                       | transfer | created | src/Generated/Shared/Transfer/CompanyUserTransfer                |
| Store                             | transfer | created | src/Generated/Shared/Transfer/StoreTransfer                      |


{% endinfo_block %}

---

## Add translations

1. Append the glossary:

```csv
ssp_dashboard.index.widget.title,Dashboard,en_US
ssp_dashboard.index.widget.title,Dashboard,de_DE
dashboard.index.widget.title,Dashboard,en_US
dashboard.index.widget.title,Dashboard,de_DE
ssp_dashboard.general.view_all,View All,en_US
ssp_dashboard.general.view_all,Alle anzeigen,de_DE
ssp_dashboard.general.welcome,"Welcome, %name%",en_US
ssp_dashboard.general.welcome,"Willkommen, %name%",de_DE
ssp_dashboard.overview.title,My Overview,en_US
ssp_dashboard.overview.title,Meine Übersicht,de_DE
ssp_dashboard.general.ssp_assets,Assets,en_US
ssp_dashboard.general.ssp_assets,Assets,de_DE
dashboard.general.assets,Assets,en_US
dashboard.general.assets,Assets,de_DE
ssp_dashboard.general.inquiries,Pending Inquiries,en_US
ssp_dashboard.general.inquiries,Ausstehende Ansprüche,de_DE
ssp_dashboard.general.services,Planned Services,en_US
ssp_dashboard.general.services,Geplante Services,de_DE
ssp_dashboard.representatives.title,Service Representatives,en_US
ssp_dashboard.representatives.title,Mitarbeiter des Kundendienstes,de_DE
ssp_dashboard.general.no_data,There is no data yet,en_US
ssp_dashboard.general.no_data,Es gibt noch keine Daten,de_DE
ssp_dashboard.general.news,News & Events,en_US
ssp_dashboard.general.news,Nachrichten & Veranstaltungen,de_DE
ssp_dashboard.general.news,News & Events,en_US
ssp_dashboard.general.news,Nachrichten & Veranstaltungen,de_DE
dashboard.access.denied,Access denied.,en_US
dashboard.access.denied,Zugriff verweigert.,de_DE
customer.account.files,Files,en_US
customer.account.files,Dateien,de_DE
customer.account.no_files,No Files,en_US
customer.account.no_files,Keine Dateien,de_DE
ssp_dashboard.overview.not_applicable,n/a,en_US
ssp_dashboard.overview.not_applicable,n/a,de_DE
```


TODO: below is WIP
3. Append the cms_block.csv:
```csv
cms-sales_rep:default,sales_rep:default,Title and Content,@CmsBlock/template/title_and_content_block.twig,1,,,"<div class='contact-list box box--dark' data-qa='component contact-list'><div class='block-title spacing-bottom' data-qa='component block-title'><div class='grid grid--middle'><h5 class='block-title__title spacing-right col'>Service Representatives</h5></div></div><div class='contact-list__representative'><div class='contact-list__representative-logo'><svg class='icon' data-qa='component icon' title='user'><use xlink:href='#:user'></use></svg><span class='contact-list__representative-image' style='background-image: url('');'></span></div><div class='contact-list__representative-info'><span class='contact-list__representative-name'>Alice Johnson</span><span class='contact-list__representative-data'><span class='contact-list__representative-data-col'><a href='mailto:alice.johnson@example.com' class='contact-list__representative-mail'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='mail'><use xlink:href='#:mail'></use></svg> alice.johnson@example.com</a></span><span class='contact-list__representative-data-col'><a href='tel:+1 555-123-4567' class='contact-list__representative-phone'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='phone'><use xlink:href='#:phone'></use></svg> +1 555-123-4567</a></span></span></div></div><div class='contact-list__representative'><div class='contact-list__representative-logo'><svg class='icon' data-qa='component icon' title='user'><use xlink:href='#:user'></use></svg><span class='contact-list__representative-image' style='background-image: url('');'></span></div><div class='contact-list__representative-info'><span class='contact-list__representative-name'>Michael Smith</span><span class='contact-list__representative-data'><span class='contact-list__representative-data-col'><a href='mailto:michael.smith@example.com' class='contact-list__representative-mail'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='mail'><use xlink:href='#:mail'></use></svg> michael.smith@example.com</a></span><span class='contact-list__representative-data-col'><a href='tel:+1 555-987-6543' class='contact-list__representative-phone'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='phone'><use xlink:href='#:phone'></use></svg> +1 555-987-6543</a></span></span></div></div></div>","<div class='contact-list box box--dark' data-qa='component contact-list'><div class='block-title spacing-bottom' data-qa='component block-title'><div class='grid grid--middle'><h5 class='block-title__title spacing-right col'>Service Representatives</h5></div></div><div class='contact-list__representative'><div class='contact-list__representative-logo'><svg class='icon' data-qa='component icon' title='user'><use xlink:href='#:user'></use></svg><span class='contact-list__representative-image' style='background-image: url('');'></span></div><div class='contact-list__representative-info'><span class='contact-list__representative-name'>Alice Johnson</span><span class='contact-list__representative-data'><span class='contact-list__representative-data-col'><a href='mailto:alice.johnson@example.com' class='contact-list__representative-mail'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='mail'><use xlink:href='#:mail'></use></svg> alice.johnson@example.com</a></span><span class='contact-list__representative-data-col'><a href='tel:+1 555-123-4567' class='contact-list__representative-phone'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='phone'><use xlink:href='#:phone'></use></svg> +1 555-123-4567</a></span></span></div></div><div class='contact-list__representative'><div class='contact-list__representative-logo'><svg class='icon' data-qa='component icon' title='user'><use xlink:href='#:user'></use></svg><span class='contact-list__representative-image' style='background-image: url('');'></span></div><div class='contact-list__representative-info'><span class='contact-list__representative-name'>Michael Smith</span><span class='contact-list__representative-data'><span class='contact-list__representative-data-col'><a href='mailto:michael.smith@example.com' class='contact-list__representative-mail'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='mail'><use xlink:href='#:mail'></use></svg> michael.smith@example.com</a></span><span class='contact-list__representative-data-col'><a href='tel:+1 555-987-6543' class='contact-list__representative-phone'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='phone'><use xlink:href='#:phone'></use></svg> +1 555-987-6543</a></span></span></div></div></div>",,,,
ssp-news-block-1,News Banner-1,Title and Content,@CmsBlock/template/title_and_content_block.twig,1,"<h5 class='spacing-x'>{{ 'dashboard.general.news' | trans }}</h5>","<h5 class='spacing-x'>{{ 'dashboard.general.news' | trans }}</h5>","<div class='grid grid--with-gutter'><div class='col col--with-gutter col--md-6 col--sm-12'>{{ content_banner('ssp-br-1', 'bottom-title') }}</div><div class='col col--with-gutter col--md-6 col--sm-12'>{{ content_banner('ssp-br-2', 'bottom-title') }}</div></div>","<div class='grid grid--with-gutter'><div class='col col--with-gutter col--md-6 col--sm-12'>{{ content_banner('ssp-br-1', 'bottom-title') }}</div><div class='col col--with-gutter col--md-6 col--sm-12'>{{ content_banner('ssp-br-2', 'bottom-title') }}</div></div>",,,,
```
4. Append the cms_block_store.csv:
```csv
ssp-news-block-1,DE
cms-sales_rep:default,DE
```
5. Append the cms_slot.csv:
```csv
ssp-news,ssp-news-block-1,"SSP News.",SprykerCmsSlotBlock,@SspDashboardManagement/views/dashboard/dashboard.twig,1
```
6. Append the cms_slot_block.csv:
```csv
slt-mobile-header,blck-9,1,@ShopUi/templates/page-layout-main/page-layout-main.twig,,,,,,,
ssp-news,ssp-news-block-1,1,@SspDashboardManagement/views/dashboard/dashboard.twig,,,,,,,
```
7. Append the cms_slot_template.csv:
```csv
SSP Dashboard,Dashboard Page.,@SspDashboardManagement/views/dashboard/dashboard.twig
```

## Import data

Import glossary and demo data required for the feature:

```bash
console data:import glossary
console data:import ssp-inquiry
console data:import cms-block
console data:import cms-block-store
```

{% info_block warningBox "Verification" %}
Check `spy_glossary_key` and `spy_glossary_translation` tables for the new glossary keys.
Make sure the `ssp_inquiry` table contains the new inquiries.
Check CMS blocks and make sure the new blocks are assigned to the correct stores.
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

**src/Pyz/Yves/Permission/PermissionDependencyProvider.php**

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
