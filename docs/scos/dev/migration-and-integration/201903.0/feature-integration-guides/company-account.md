---
title: Company Account Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/company-account-feature-integration-201903
redirect_from:
  - /v2/docs/company-account-feature-integration-201903
  - /v2/docs/en/company-account-feature-integration-201903
---

{% info_block errorBox %}
Procedures described in this Feature Integration guide will only add the **Business on Behalf** functionality into your project. Prior to executing the described steps, please make sure that you have the basic feature already configured in your project.
{% endinfo_block %}

## Install Feature Core

### Prerequisites
To start feature integration, review and install the necessary features:
|Name|Version|
|---|---|
|Spryker Core|201903.0|
 
 ### 1) Install the Required Modules Using Composer
 Run the following command to install the required modules:
 
```bash
composer require spryker-feature/company-account: "^201903.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`BusinessOnBehalf`</td><td>`vvendor/spryker/business-on-behalf`</td></tr><tr><td>`BusinessOnBehalfDataImport`</td><td>`vendor/spryker/business-on-behalf-data-import`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects
Run the following commands to:

* apply database changes
* generate entity and transfer changes

```bash
console transfer:generate
console propel:install
console transfer:generate
```
{% info_block warningBox "Verification" %}
Make sure that the following change has been aplied by checking your database:<table><thead><tr><td>Database Entity</td><td>Type</td><td>Event</td></tr></thead><tbody><tr><td>`spy_company_user.is_default`</td><td>column</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following change has been applied in the transfer objects:<table><thead><tr><td>Transfer</td><td>Type</td><td>Event</td><td>Path</td></tr></thead><tbody><tr><td>`CompanyUser.isDefault`</td><td>property</td><td>created</td>></tr><tr><td>`Customer.isOnBehalf`</td><td>property</td><td>created</td><td>`src/Generated/Shared/Transfer/CustomerTransfer`</td></tr></tbody></table>
{% endinfo_block %}

### 3) Import Data
#### Import Business On Behalf

{% info_block infoBox "Info" %}
The following imported entities will be used as data for Business on Behalf Company Users (b2b extension for Company User module
{% endinfo_block %} in Spryker OS.)
Prepare your data according to your requirements using our demo data:

<details open>
<summary>vendor/spryker/spryker/Bundles/BusinessOnBehalfDataImport/data/import/company_user.csv</summary>
 
```bash
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
    
|Column|Is Obligatory?|Data Type|Data Example|Data Explanation|
|---|---|---|---|---|
|customer_reference|mandatory|string|DE--6|The key that will identify the Customer to which the data is added.|
|company_key|mandatory|string|BoB-Hotel-Mitte|The key that will identify the Company to which the data is added.|
|business_unit_key|mandatory|string|business-unit-mitte-1|The key that will identify the Company Business Unit to which the data is added.|
|default|mandatory|bool integer|0|Decides if there will be some pre-selected Company Business Unit for BoB User.|

Register the following plugin to enable data import:
|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`BusinessOnBehalfCompanyUserDataImportPlugin`|Imports Business on Behalf Company Users.|Assumes that the Customer keys exist in the database.</br>Assumes that the Company keys exist in the database.</br>Assumes that the Company Business Unit keys exist in the database.|`Spryker\Zed\BusinessOnBehalfDataImport\Communication\Plugin\DataImport`|

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
Make sure that the configured data is added to the `spy_company_user` table in the database.
{% endinfo_block %}

### 4) Set up Behavior

Enable the following behaviors by registering the plugins:
|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`DefaultCompanyUserCustomerTransferExpanderPlugin`|Sets default Company User for a Business on Behalf customer if no Company User was selected yet.|None|`Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer`|
|`IsOnBehalfCustomerTransferExpanderPlugin`| Sets `CustomerTransfer.IsOnBehalf` property so other features can determine if the selected Company User is a Business on Behalf Company User.|None|`Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer`|

<details open>
<summary>src/Pyz/Zed/Customer/CustomerDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Customer;

use Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer\DefaultCompanyUserCustomerTransferExpanderPlugin;
use Spryker\Zed\BusinessOnBehalf\Communication\Plugin\Customer\IsOnBehalfCustomerTransferExpanderPlugin;
use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;

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
</br>1. Log in with a сustomer who has multiple Company Users and a default one.</br>2. Check in the session if the default Company User was assigned to the Customer.</br>3. Check in the session if the IsOnBehalf property is set correctly for the Customer.
{% endinfo_block %}

## Install Feature Frontend
### Prerequisites
Please review and install the necessary features before beginning the integration step.
|Name|Version|
|---|---|
|Spryker Core|201903.0|
|Customer Account Management|201903.0|
|Company Account|201903.0|

### 1) Install the Required Modules Using Composer

Run the following command to install the required modules:

```bash
composer require spryker-feature/company-account: "^201903.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following module has been installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`BusinessOnBehalfWidget`</td><td>`vendor/spryker-shop/business-on-behalf-widget`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Add Translations
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

Run the following console command to import data:
```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data is added to the `spy_glossary` table.
{% endinfo_block %}

### 3) Set up Widgets

Register the following plugin to enable widgets:

|Plugin|Description|Prerequisites|Namespace|
|---|---|---|---|
|`BusinessOnBehalfStatusWidget`|Displays the selected Company Users and allows for Business on Behalf customers to change it through a link.|None|`SprykerShop\Yves\BusinessOnBehalfWidget\Widget`|

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
Log in with a Business on Behalf customer and see the selected Company User status widget in the top menu.
{% endinfo_block %}
