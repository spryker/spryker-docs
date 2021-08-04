---
title: Business on Behalf Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/business-on-behalf-feature-integration
redirect_from:
  - /v1/docs/business-on-behalf-feature-integration
  - /v1/docs/en/business-on-behalf-feature-integration
---

## Install Feature Core

### Prerequisites

To start Business on Behalf feature integration, overview and install the necessary features:

| Name | Version |
|---|---|
| Spryker Core | 2018.11.0 |
| Company Account | 2018.11.0 |

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`BusinessOnBehalf`</td><td>`vendor/spryker/business-on-behalf`</td></tr><tr><td>`BusinessOnBehalfDataImport`</td><td>`vendor/spryker/business-on-behalf-data-import`</td></tr></tbody></table>
{% endinfo_block %}

### 1) Set up Database Schema and Transfer Objects

Run the following commands to apply database changes and generate entity and transfer changes:
```shell
console transfer:generate
console propel:install
console transfer:generate 
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:<table><thead><tr><td>Database Entity</td><td>Type</td><td>Event</td></tr></thead><tbody><tr><td>`spy_company_user.is_default`</td><td>column</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes in transfer objects have been applied:<table><thead><tr><td>Transfer</td><td>Type</td><td>Event</td><td>Path</td></tr></thead><tbody><tr><td>`Customer.isOnBehalf`</td><td>property</td><td>created</td><td>`src/Generated/Shared/Transfer/CustomerTransfer`</td></tr><tr><td>`CompanyUser.isDefault`</td><td>property</td><td>created</td><td>`src/Generated/Shared/Transfer/CompanyUserTransfer`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Import Data

#### Import Business On Behalf Company Users

{% info_block infoBox "Info" %}
Company user data import and business on behalf data import have currently very similar structure, however, both importers represent a different concept.</br>Include only business on behalf company users in the current data import step and do not mix data with company user data importer.
{% endinfo_block %}


Prepare your data according to your requirements using our demo data:

<details open>
<summary>vendor/spryker/business-on-behalf-data-import/data/import/company_user.csv</summary>

 ```yaml
 customer_reference,company_key,business_unit_key,default
DE--6,BoB-Hotel-Mitte,business-unit-mitte-1,0
DE--6,BoB-Hotel-Mitte,business-unit-mitte-2,0
DE--6,BoB-Hotel-Mitte,business-unit-mitte-3,0
DE--7,BoB-Hotel-Jim,business-unit-jim-1,0
DE--7,BoB-Hotel-Mitte,business-unit-mitte-1,0
DE--7,BoB-Hotel-Kudamm,business-unit-kudamm-1,0
DE--7,spryker_systems,spryker_systems_HQ,0
```
<br>
 </details>

| Column | Is obligatory? | Data type | Data example | Data explanation |
|---|---|---|---|---|
|  `customer_reference` | mandatory | string | DE--6 | The company user will be connected to this customer. |
|  `company_key` | mandatory | string | BoB-Hotel-Mitte | The company user will be connected to this company. |
|  `business_unit_key` | mandatory | string | business-unit-mitte-1 | The company user will be connected to this business unit. |
|  `default` | mandatory | bool integer | 0 | Decides if this is the default company user of the customer. |

Register the following plugins to enable data import:

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `BusinessOnBehalfCompanyUserDataImportPlugin` | Imports business on behalf company users. |<ul><li>Expects customers to be in database already</li><li>Expects companies to be in the database already</li><li>Expects business units to be in the database already</li></ul> |  `Spryker\Zed\BusinessOnBehalfDataImport\Communication\Plugin\DataImport` |

<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
 <?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\BusinessOnBehalfDataImport\Communication\Plugin\DataImport\BusinessOnBehalfCompanyUserDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
 protected function getDataImporterPlugins(): array
 {
 return [
 new BusinessOnBehalfCompanyUserDataImportPlugin(),
 ];
 }
} 
```
<br>
</details>

Run the following console command to import data:
```bash
console data:import company-user-on-behalf
```

{% info_block warningBox "Verification" %}
Make sure that in the database that the configured data are added to the `spy_company_user table`.
{% endinfo_block %}

### 3) Set up Behavior

#### Set up Customer Transfer Expanders

Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `DefaultCompanyUserCustomerTransferExpanderPlugin` | Sets default company user for a business on behalf customer if no company user was selected yet. | None |  `Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer` |
|  `IsOnBehalfCustomerTransferExpanderPlugin` | Sets `CustomerTransfer.IsOnBehalf` property so other features can determine if the selected company user is a business on behalf company user. | None |  `Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer` |

<details open>
<summary>src/Pyz/Zed/Stock/StockDependencyProvider.php</summary>

 ```php
 <?php

namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
use Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer\DefaultCompanyUserCustomerTransferExpanderPlugin;
use Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer\IsOnBehalfCustomerTransferExpanderPlugin;

class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
 /**
 * @return \Spryker\Zed\Customer\Dependency\Plugin\CustomerTransferExpanderPluginInterface[]
 */
 protected function getCustomerTransferExpanderPlugins()
 {
 return [
 new IsOnBehalfCustomerTransferExpanderPlugin(),
 new DefaultCompanyUserCustomerTransferExpanderPlugin(),
 ];
 }
} 
```
<br>
</details>

{% info_block warningBox "Verification" %}
To check that the step has been completed correctly:</br>Log in with a customer who has multiple company users and a default company user.</br>Check in the session if the default company user was assigned to the customer.</br>Check in the session if the IsOnBehalf property is set correctly for the customer.
{% endinfo_block %}

## Install Feature Frontend

### Prerequisites

To start Business on Behalf feature integration, overview and install the necessary features:

| Name | Version |
|---|---|
| Spryker Core E-commerce | 2018.11.0 |
| Customer Account Management | 2018.11.0 |
| Company Account | 2018.11.0 |

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`BusinessOnBehalfWidget`</td><td>`vendor/spryker-shop/business-on-behalf-widget`</td></tr></tbody></table>
{% endinfo_block %}

### 1) Add Translations

Append glossary according to your configuration:

<details open>
<summary>src/data/import/glossary.csv</summary>

```yaml
business_on_behalf_widget.no_selected_company,No selected company,en_US
business_on_behalf_widget.no_selected_company,Kein Unternehmen ausgewählt,de_DE
business_on_behalf_widget.change_company_user,Change Company User,en_US
business_on_behalf_widget.change_company_user,Firmenbenutzer Profil ändern,de_DE
company_user.business_on_behalf.error.company_not_active,"You can not select this company user, company is not active.",en_US
company_user.business_on_behalf.error.company_not_active,"Sie können diesen Firmennutzer nicht auswählen da die Firma inaktiv ist",de_DE
company_user.business_on_behalf.error.company_user_invalid,"You can not select this company user, it is invalid.",en_US
company_user.business_on_behalf.error.company_user_invalid,"Sie können diesen Firmennutzer nicht auswählen da er ungültig ist",de_DE 
```
<br>
</details>

Run the following console command to import the data:
```bash
console data:import glossary
```
{% info_block warningBox "Verification" %}
Make sure that in the database the configured data are added to the `spy_glossary` table.
{% endinfo_block %}

### 2) Set up Widgets
Enable the following global widget:

|Widget|Description|Namespace|
|---|---|---|
|`BusinessOnBehalfStatusWidget`|Displays the selected company users and allows for business on behalf customers to change it through a link.|`SprykerShop\Yves\BusinessOnBehalfWidget|

<details open>
<summary>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\BusinessOnBehalfWidget\Widget\BusinessOnBehalfStatusWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	 * @return string[]
	 */
	protected function getGlobalWidgets(): array
	{
		return [
			BusinessOnBehalfStatusWidget::class,
		];
	}
} 
```
<br>
</details>

Run the following command to enable Javascript and CSS changes:
```bash
console frontend:yves:build 
```
{% info_block warningBox "Verification" %}
Log in with a business on behalf customer and see the selected company user status widget in the top menu.
{% endinfo_block %}
