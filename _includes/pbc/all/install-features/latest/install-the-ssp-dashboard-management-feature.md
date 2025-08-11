This document describes how to install the Self-Service Portal (SSP) Dashboard Management feature.

## Prerequisites

| FEATURE         | VERSION | INSTALLATION GUIDE  |
|--------------| ------- | ------------------ |
| Spryker Core | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                        |
| Self-Service Portal | 202507.0 | [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)          |

## Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/self-service-portal:"^202507.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following packages are now listed in `composer.lock`:

| MODULE            | EXPECTED DIRECTORY                         |
|-------------------|--------------------------------------------|
| SelfServicePortal | vendor/spryker-feature/self-service-portal |

{% endinfo_block %}

## Set up transfer objects

Generate transfer classes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure the following transfer objects have been generated:

| TRANSFER                   | TYPE     | EVENT   | PATH                                                             |
|----------------------------|----------|---------|------------------------------------------------------------------|
| DashboardRequest           | transfer | created | src/Generated/Shared/Transfer/DashboardRequestTransfer           |
| DashboardComponentCriteria | transfer | created | src/Generated/Shared/Transfer/DashboardComponentCriteriaTransfer |
| DashboardResponse          | transfer | created | src/Generated/Shared/Transfer/DashboardResponseTransfer          |
| CmsBlockRequest            | transfer | created | src/Generated/Shared/Transfer/CmsBlockRequestTransfer            |
| CmsBlock                   | transfer | created | src/Generated/Shared/Transfer/CmsBlockTransfer                   |
| SynchronizationData        | transfer | created | src/Generated/Shared/Transfer/SynchronizationDataTransfer        |
| Customer                   | transfer | created | src/Generated/Shared/Transfer/CustomerTransfer                   |
| CompanyUser                | transfer | created | src/Generated/Shared/Transfer/CompanyUserTransfer                |
| Store                      | transfer | created | src/Generated/Shared/Transfer/StoreTransfer                      |

{% endinfo_block %}

## Add translations

1. Append the glossary:

<details>
  <summary>Glossary</summary>

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
dashboard.access.denied,Access denied.,en_US
dashboard.access.denied,Zugriff verweigert.,de_DE
customer.account.files,Files,en_US
customer.account.files,Dateien,de_DE
customer.account.no_files,There is no data yet,en_US
customer.account.no_files,Es existieren noch keine Daten,de_DE
customer.account.no_ssp_booked_services,You do not have booked services yet.,en_US
customer.account.no_ssp_booked_services,Sie haben noch keine gebuchten Services.,de_DE
customer.account.ssp_booked_services,Booked Services,en_US
customer.account.ssp_booked_services,Gebuchte Services,de_DE
customer.self_service_portal.service.list.product_name,Product Name,en_US
customer.self_service_portal.service.list.product_name,Produktname,de_DE
customer.self_service_portal.service.list.order_reference,Order Reference,en_US
customer.self_service_portal.service.list.order_reference,Bestellreferenz,de_DE
customer.self_service_portal.service.list.scheduled_at,Date and Time,en_US
customer.self_service_portal.service.list.scheduled_at,Datum und Uhrzeit,de_DE
customer.self_service_portal.service.list.status,Status,en_US
customer.self_service_portal.service.list.status,Status,de_DE
ssp_dashboard.general.booked_services,Booked Services,en_US
ssp_dashboard.general.booked_services,Gebuchte Services,de_DE
permission.name.ViewCompanySspServicePermissionPlugin,ViewCompanySspServicePermissionPlugin,en_US
permission.name.ViewCompanySspServicePermissionPlugin,ViewCompanySspServicePermissionPlugin,de_DE
permission.name.ViewBusinessUnitSspServicePermissionPlugin,ViewBusinessUnitSspServicePermissionPlugin,en_US
permission.name.ViewBusinessUnitSspServicePermissionPlugin,ViewBusinessUnitSspServicePermissionPlugin,de_DE
```

</details>

3. Append `cms_block.csv`:

<details>
  <summary>cms_block.csv</summary>

```csv
cms-sales_rep:default,sales_rep:default,Title and Content,@CmsBlock/template/title_and_content_block.twig,1,,,<div class='contact-list box box--dark' data-qa='component contact-list'><div class='block-title spacing-bottom' data-qa='component block-title'><div class='grid grid--middle'><h5 class='block-title__title spacing-right col'>Mitarbeiter des Kundendienstes</h5></div></div><div class='contact-list__representative'><div class='contact-list__representative-logo'><svg class='icon' data-qa='component icon' title='user'><use xlink:href='#:user'></use></svg><span class='contact-list__representative-image' style='background-image: url('');'></span></div><div class='contact-list__representative-info'><span class='contact-list__representative-name'>Alice Johnson</span><span class='contact-list__representative-data'><span class='contact-list__representative-data-col'><a href='mailto:alice.johnson@example.com' class='contact-list__representative-mail'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='mail'><use xlink:href='#:mail'></use></svg> alice.johnson@example.com</a></span><span class='contact-list__representative-data-col'><a href='tel:+1 555-123-4567' class='contact-list__representative-phone'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='phone'><use xlink:href='#:phone'></use></svg> +1 555-123-4567</a></span></span></div></div><div class='contact-list__representative'><div class='contact-list__representative-logo'><svg class='icon' data-qa='component icon' title='user'><use xlink:href='#:user'></use></svg><span class='contact-list__representative-image' style='background-image: url('');'></span></div><div class='contact-list__representative-info'><span class='contact-list__representative-name'>Michael Smith</span><span class='contact-list__representative-data'><span class='contact-list__representative-data-col'><a href='mailto:michael.smith@example.com' class='contact-list__representative-mail'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='mail'><use xlink:href='#:mail'></use></svg> michael.smith@example.com</a></span><span class='contact-list__representative-data-col'><a href='tel:+1 555-987-6543' class='contact-list__representative-phone'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='phone'><use xlink:href='#:phone'></use></svg> +1 555-987-6543</a></span></span></div></div></div>,<div class='contact-list box box--dark' data-qa='component contact-list'><div class='block-title spacing-bottom' data-qa='component block-title'><div class='grid grid--middle'><h5 class='block-title__title spacing-right col'>Service Representatives</h5></div></div><div class='contact-list__representative'><div class='contact-list__representative-logo'><svg class='icon' data-qa='component icon' title='user'><use xlink:href='#:user'></use></svg><span class='contact-list__representative-image' style='background-image: url('');'></span></div><div class='contact-list__representative-info'><span class='contact-list__representative-name'>Alice Johnson</span><span class='contact-list__representative-data'><span class='contact-list__representative-data-col'><a href='mailto:alice.johnson@example.com' class='contact-list__representative-mail'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='mail'><use xlink:href='#:mail'></use></svg> alice.johnson@example.com</a></span><span class='contact-list__representative-data-col'><a href='tel:+1 555-123-4567' class='contact-list__representative-phone'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='phone'><use xlink:href='#:phone'></use></svg> +1 555-123-4567</a></span></span></div></div><div class='contact-list__representative'><div class='contact-list__representative-logo'><svg class='icon' data-qa='component icon' title='user'><use xlink:href='#:user'></use></svg><span class='contact-list__representative-image' style='background-image: url('');'></span></div><div class='contact-list__representative-info'><span class='contact-list__representative-name'>Michael Smith</span><span class='contact-list__representative-data'><span class='contact-list__representative-data-col'><a href='mailto:michael.smith@example.com' class='contact-list__representative-mail'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='mail'><use xlink:href='#:mail'></use></svg> michael.smith@example.com</a></span><span class='contact-list__representative-data-col'><a href='tel:+1 555-987-6543' class='contact-list__representative-phone'><svg class='icon contact-list__representative-icon' data-qa='component icon' title='phone'><use xlink:href='#:phone'></use></svg> +1 555-987-6543</a></span></span></div></div></div>,,,,
ssp-news-block-1,News Banner-1,Title and Content,@CmsBlock/template/title_and_content_block.twig,1,"<h5 class='spacing-x'>{{ 'ssp_dashboard.general.news' | trans }}</h5>","<h5 class='spacing-x'>{{ 'ssp_dashboard.general.news' | trans }}</h5>","<div class='grid grid--with-gutter'><div class='col col--with-gutter col--md-6 col--sm-12'>{{ content_banner('ssp-br-1', 'bottom-title') }}</div><div class='col col--with-gutter col--md-6 col--sm-12'>{{ content_banner('ssp-br-2', 'bottom-title') }}</div></div>","<div class='grid grid--with-gutter'><div class='col col--with-gutter col--md-6 col--sm-12'>{{ content_banner('ssp-br-1', 'bottom-title') }}</div><div class='col col--with-gutter col--md-6 col--sm-12'>{{ content_banner('ssp-br-2', 'bottom-title') }}</div></div>",,,,
```

</details>

4. Append `cms_block_store.csv`:

```csv
ssp-news-block-1,DE
cms-sales_rep:default,DE
```

5. Append `cms_slot.csv`:

```csv
ssp-news,ssp-news-block-1,"SSP News.",SprykerCmsSlotBlock,@SelfServicePortal/views/dashboard/dashboard.twig,1
```

6. Append `cms_slot_block.csv`:

```csv
slt-mobile-header,blck-9,1,@ShopUi/templates/page-layout-main/page-layout-main.twig,,,,,,,
ssp-news,ssp-news-block-1,1,@SelfServicePortal/views/dashboard/dashboard.twig,,,,,,,
```

7. Append `cms_slot_template.csv`:

```csv
SSP Dashboard,Dashboard Page.,@SelfServicePortal/views/dashboard/dashboard.twig
```

8. Append `content_banner.csv`:

```csv
ssp-br-1,SSP Banner Name 1,SSP Banner Description 1, ,,, ,,,/assets/current/default/images/400x200.png,,,/en/demo-landing-page,,,ssp-banner-image,,
ssp-br-2,SSP Banner Name 2,SSP Banner Description 2, ,,, ,,,/assets/current/default/images/400x200.png,,,/en/demo-landing-page,,,ssp-banner-image,,
```

9. Append `company_role_permission.csv`

```csv
Ottom_Admin,ViewBusinessUnitSspServicePermissionPlugin,
Spryker_Admin,ViewBusinessUnitSspServicePermissionPlugin,
test-company_Admin,ViewBusinessUnitSspServicePermissionPlugin,
trial-company_Admin,ViewBusinessUnitSspServicePermissionPlugin,
proof-company_Admin,ViewBusinessUnitSspServicePermissionPlugin,
BoB-Hotel-Jim_Admin,ViewBusinessUnitSspServicePermissionPlugin,
BoB-Hotel-Kudamm_Admin,ViewBusinessUnitSspServicePermissionPlugin,
BoB-Hotel-Mitte_Admin,ViewBusinessUnitSspServicePermissionPlugin,
BoB-Regular_Admin,ViewBusinessUnitSspServicePermissionPlugin,
test-company-2_Admin,ViewBusinessUnitSspServicePermissionPlugin,
Spryker_Buyer_With_Limit,ViewBusinessUnitSspServicePermissionPlugin,
Ottom_Admin,ViewCompanySspServicePermissionPlugin,
Spryker_Admin,ViewCompanySspServicePermissionPlugin,
test-company_Admin,ViewCompanySspServicePermissionPlugin,
trial-company_Admin,ViewCompanySspServicePermissionPlugin,
proof-company_Admin,ViewCompanySspServicePermissionPlugin,
BoB-Hotel-Jim_Admin,ViewCompanySspServicePermissionPlugin,
BoB-Hotel-Kudamm_Admin,ViewCompanySspServicePermissionPlugin,
BoB-Hotel-Mitte_Admin,ViewCompanySspServicePermissionPlugin,
BoB-Regular_Admin,ViewCompanySspServicePermissionPlugin,
test-company-2_Admin,ViewCompanySspServicePermissionPlugin,
Spryker_Buyer_With_Limit,ViewCompanySspServicePermissionPlugin,
```

## Add twig template

1. Create a new CMS template to be used for dashboard content sourced from the CMS:

**src/Pyz/Shared/CmsBlock/Theme/default/template/title_and_content_block.twig**

```twig
{% raw %}{% block content %}{% endraw %}
    <!-- CMS_BLOCK_PLACEHOLDER : "title" -->
    <!-- CMS_BLOCK_PLACEHOLDER : "content" -->

    {{ spyCmsBlockPlaceholder('title') | raw }}
    {{ spyCmsBlockPlaceholder('content') | raw }}
{% raw %}{% endblock %}{% endraw %}
```

## Import data

Import glossary and demo data:

```bash
console data:import glossary
console data:import cms-slot-template
console data:import content-banner
console data:import cms-block
console data:import cms-block-store
console data:import cms-slot
console data:import cms-slot-block
console data:import company-role-permission
```

{% info_block warningBox "Verification" %}

- Make sure the glossary keys have been added to `spy_glossary_key` and `spy_glossary_translation` tables.
- Make sure that the imported data on CMS blocks, CMS slots, and content banners is present in the Back Office.
  {% endinfo_block %}

## Set up behavior

| PLUGIN                                                 | SPECIFICATION                                              | PREREQUISITES | NAMESPACE                                                      |
|--------------------------------------------------------|------------------------------------------------------------|---------------|----------------------------------------------------------------|
| ViewDashboardPermissionPlugin                          | Provides access to the dashboard page.                     |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Permission      |
| ViewCompanySspServicePermissionPlugin                          | Provides access to the company services on dashboard page.                     |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Permission      |
| ViewBusinessUnitSspServicePermissionPlugin                          | Provides access to the company business unit services on dashboard page.                     |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Permission      |
| CmsBlockCompanyBusinessUnitCmsBlockStorageReaderPlugin | Enables business unit-specific CMS blocks.                 |               | SprykerFeature\Client\SelfServicePortal\Plugin\CmsBlockStorage |
| SelfServicePortalPageRouteProviderPlugin               | Provides Yves routes for the SSP dashboard page.           |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Router            |
| SspDashboardFilterControllerEventHandlerPlugin         | Restricts access to dashboard pages for non-company users. |               | SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication   |
| SspServiceDashboardDataExpanderPlugin         | Expands dashboard data with services. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement   |
| SspInquiryDashboardDataExpanderPlugin         | Expands dashboard data with inquiries. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement   |
| SspFileDashboardDataExpanderPlugin         | Expands dashboard data with file attachments. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement   |
| SspAssetDashboardDataExpanderPlugin         | Expands dashboard data with assets. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement   |


**src/Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Permission\ViewDashboardPermissionPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Permission\ViewBusinessUnitSspServicePermissionPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\Permission\ViewCompanySspServicePermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    protected function getPermissionPlugins(): array
    {
        return [
            new ViewDashboardPermissionPlugin(),
            new ViewBusinessUnitSspInquiryPermissionPlugin(),
            new ViewCompanySspInquiryPermissionPlugin(),
            new ViewCompanySspServicePermissionPlugin(),
            new ViewBusinessUnitSspServicePermissionPlugin(),
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

use SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication\SspDashboardFilterControllerEventHandlerPlugin;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getFilterControllerEventSubscriberPlugins(): array
    {
        return [
            new SspDashboardFilterControllerEventHandlerPlugin(),
        ];
    }
}

```

**src/Pyz/Client/CmsBlockStorage/CmsBlockStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\CmsBlockStorage;

use Spryker\Client\CmsBlockStorage\CmsBlockStorageDependencyProvider as SprykerCmsBlockStorageDependencyProvider;
use SprykerFeature\Client\SelfServicePortal\Plugin\CmsBlockStorage\CmsBlockCompanyBusinessUnitCmsBlockStorageReaderPlugin;

class CmsBlockStorageDependencyProvider extends SprykerCmsBlockStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\CmsBlockStorageExtension\Dependency\Plugin\CmsBlockStorageReaderPluginInterface>
     */
    protected function getCmsBlockStorageReaderPlugins(): array
    {
        return [
            new CmsBlockCompanyBusinessUnitCmsBlockStorageReaderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/SelfServicePortal/SelfServicePortalDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SelfServicePortal;

use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement\SspAssetDashboardDataExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement\SspFileDashboardDataExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement\SspInquiryDashboardDataExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement\SspServiceDashboardDataExpanderPlugin;
use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalDependencyProvider as SprykerSelfServicePortalDependencyProvider;

class SelfServicePortalDependencyProvider extends SprykerSelfServicePortalDependencyProvider
{
    /**
     * @return array<int, \SprykerFeature\Zed\SelfServicePortal\Dependency\Plugin\DashboardDataExpanderPluginInterface>
     */
    protected function getDashboardDataExpanderPlugins(): array
    {
        return [
            new SspInquiryDashboardDataExpanderPlugin(),
            new SspFileDashboardDataExpanderPlugin(),
            new SspAssetDashboardDataExpanderPlugin(),
            new SspServiceDashboardDataExpanderPlugin(),
        ];
    }
}
```

## Set up widgets

| PLUGIN                  | SPECIFICATION                                                                                             | PREREQUISITES | NAMESPACE                                    |
|-------------------------|-----------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------|
| DashboardMenuItemWidget | Provides a menu item widget for the customer account side menu.                                           |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspFileListWidget       | Displays a file attachment available to a company user on the dashboard page in the customer account. |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspServiceListWidget       | Displays services available to a company user on the dashboard page in the customer account. |               | SprykerFeature\Yves\SelfServicePortal\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\SelfServicePortal\Widget\DashboardMenuItemWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspFileListWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            DashboardMenuItemWidget::class,
            SspFileListWidget::class,
            SspServiceListWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Customers** > **Company Roles**.
2. Click **Add Company User Role**.
3. Select a company.
4. Enter a name for the role.
5. In **Unassigned Permissions**, enable the **View Dashboard** permission.
6. Click **Submit**.
7. Go to **Customers** > **Company Users**.
8. Click **Edit** next to a user.
9. Assign the role you've just created to the user.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

1. On the Storefront, log in with the company user you've assigned the role to.
   Make sure the **Dashboard** menu item is displayed.
2. Go to **Customer Account** > **Dashboard**. Make sure the page shows the following:

- Correct company account information
- Widgets for Assets, Inquiries, and Files

3. Log out and log in with a compnay user without the role you've created.

- Make sure the **Dashboard** menu item is not displayed, and you can't access the **Dashboard** page.

{% endinfo_block %}
