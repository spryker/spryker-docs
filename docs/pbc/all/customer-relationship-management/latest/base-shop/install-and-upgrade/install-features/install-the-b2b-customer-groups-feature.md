---
title: Install the B2B Customer Groups feature
description: Learn how to let customer groups hold companies and business units, and how to import customer groups and their memberships in your Spryker project.
last_updated: Oct 14, 2026
template: feature-integration-guide-template
related:
  - title: Customer Groups overview
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-groups-overview.html
  - title: Manage customer groups
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/manage-customer-groups.html
  - title: "Backend API: Manage companies and business units of customer groups"
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-companies-and-business-units-of-customer-groups.html
---

This document describes how to install the B2B Customer Groups feature. The feature lets a customer group hold companies and business units in addition to customers. It adds the following:

- The **Companies** and **Business Units** tabs on the Back Office pages that create and edit a customer group, and the matching panels on the page that shows a customer group.
- Two Backend API resources that list, add, replace, and remove the companies and business units of a customer group.
- Four data importers that create customer groups and assign companies, business units, and customers to them.

Discounts and other rules that target a customer group evaluate only its customers: company and business unit memberships do not affect them. For how the memberships behave, see [Customer Groups overview](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-groups-overview.html).

## Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Customer Account Management | {{page.release_tag}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |
| Company Account | {{page.release_tag}} | [Install the Company Account feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html) |
| API Platform | — | [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html). Required only for the Backend API resources in [Set up the Backend API](#6-set-up-the-backend-api). |

## Install feature core

### 1) Install the required modules

Install the feature using Composer:

```bash
composer require spryker-feature/customer-experience-management --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CustomerExperienceManagement | vendor/spryker-feature/customer-experience-management |
| CustomerGroup | vendor/spryker/customer-group |
| CustomerGroupExtension | vendor/spryker/customer-group-extension |

{% endinfo_block %}

### 2) Set up the database schema and transfer objects

The feature stores the memberships in two new tables. For the data importers, it also declares the `key` columns of `spy_company` and `spy_company_business_unit`, which the company and business unit data importers already add in most projects, and a unique key on the business unit key.

{% info_block warningBox "Check business unit keys for duplicates" %}

If your project does not use the `spryker/company-business-unit-data-import` module, two business units can share a key, and the unique key on `spy_company_business_unit.key` cannot be created. Before you apply the schema, run the following query and make every key it returns unique:

```sql
SELECT unit.key, COUNT(*) FROM spy_company_business_unit unit WHERE unit.key IS NOT NULL GROUP BY unit.key HAVING COUNT(*) > 1;
```

{% endinfo_block %}

Apply the database schema changes and generate the transfer objects:

```bash
docker/sdk console propel:install
docker/sdk console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in the database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_customer_group_to_company | table | created |
| spy_customer_group_to_company_business_unit | table | created |
| index-spy_company_user-fk_company | index | created |
| index-spy_company_user-fk_company_business_unit | index | created |
| spy_company.key | column | created if it did not exist |
| spy_company-index-key | index | created |
| spy_company_business_unit.key | column | created if it did not exist |
| spy_company_business_unit-unique-key | unique index | created if it did not exist |

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| CustomerGroupToCompanyAssignment | class | created | src/Generated/Shared/Transfer/CustomerGroupToCompanyAssignmentTransfer |
| CustomerGroupToCompanyBusinessUnitAssignment | class | created | src/Generated/Shared/Transfer/CustomerGroupToCompanyBusinessUnitAssignmentTransfer |
| CustomerGroup.companyAssignment | property | created | src/Generated/Shared/Transfer/CustomerGroupTransfer |
| CustomerGroup.companyBusinessUnitAssignment | property | created | src/Generated/Shared/Transfer/CustomerGroupTransfer |
| CustomerGroupCompanyCriteria | class | created | src/Generated/Shared/Transfer/CustomerGroupCompanyCriteriaTransfer |
| CustomerGroupCompanyCollection | class | created | src/Generated/Shared/Transfer/CustomerGroupCompanyCollectionTransfer |
| CustomerGroupCompanyBusinessUnitCriteria | class | created | src/Generated/Shared/Transfer/CustomerGroupCompanyBusinessUnitCriteriaTransfer |
| CustomerGroupCompanyBusinessUnitCollection | class | created | src/Generated/Shared/Transfer/CustomerGroupCompanyBusinessUnitCollectionTransfer |

{% endinfo_block %}

The two `spy_company_user` indexes back the **Customers** column of the Back Office tables, which counts the company users of each company and business unit. They have the same names as the indexes that the index generator creates, so a project that already has them does not get duplicates.

### 3) Add Zed translations

Generate a new translation cache for Zed:

```bash
docker/sdk console translator:generate-cache
```

### 4) Set up behavior

The customer group pages and the customer group save run plugin stacks of the `CustomerGroup` module. Register the following plugins to add the **Companies** and **Business Units** tabs, save their selections, and show the memberships on the page that displays a customer group:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CompanyCustomerGroupFormTabExpanderPlugin | Adds the **Companies** tab to the pages that create and edit a customer group. | `CompanyCustomerGroupFormExpanderPlugin` is registered. | SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup |
| CompanyBusinessUnitCustomerGroupFormTabExpanderPlugin | Adds the **Business Units** tab to the pages that create and edit a customer group. | `CompanyBusinessUnitCustomerGroupFormExpanderPlugin` is registered. | SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup |
| CompanyCustomerGroupFormExpanderPlugin | Adds the fields that carry the companies selected to be assigned and de-assigned, and validates them on save. | `CompanyCustomerGroupPostSavePlugin` is registered. | SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup |
| CompanyBusinessUnitCustomerGroupFormExpanderPlugin | Adds the fields that carry the business units selected to be assigned and de-assigned, and validates them on save. | `CompanyBusinessUnitCustomerGroupPostSavePlugin` is registered. | SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup |
| CompanyCustomerGroupPostSavePlugin | Saves the company memberships of a customer group in the transaction of the customer group save. | None | SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup |
| CompanyBusinessUnitCustomerGroupPostSavePlugin | Saves the business unit memberships of a customer group in the transaction of the customer group save. | None | SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup |
| CompanyCustomerGroupViewExpanderPlugin | Adds the **Companies** panel to the page that shows a customer group. | None | SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup |
| CompanyBusinessUnitCustomerGroupViewExpanderPlugin | Adds the **Business Units** panel to the page that shows a customer group. | None | SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup |

**src/Pyz/Zed/CustomerGroup/CustomerGroupDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CustomerGroup;

use Spryker\Zed\CustomerGroup\CustomerGroupDependencyProvider as SprykerCustomerGroupDependencyProvider;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup\CompanyBusinessUnitCustomerGroupFormExpanderPlugin;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup\CompanyBusinessUnitCustomerGroupFormTabExpanderPlugin;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup\CompanyBusinessUnitCustomerGroupPostSavePlugin;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup\CompanyBusinessUnitCustomerGroupViewExpanderPlugin;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup\CompanyCustomerGroupFormExpanderPlugin;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup\CompanyCustomerGroupFormTabExpanderPlugin;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup\CompanyCustomerGroupPostSavePlugin;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup\CompanyCustomerGroupViewExpanderPlugin;

class CustomerGroupDependencyProvider extends SprykerCustomerGroupDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CustomerGroupExtension\Dependency\Plugin\CustomerGroupPostSavePluginInterface>
     */
    protected function getCustomerGroupPostSavePlugins(): array
    {
        return [
            new CompanyCustomerGroupPostSavePlugin(),
            new CompanyBusinessUnitCustomerGroupPostSavePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CustomerGroupExtension\Dependency\Plugin\CustomerGroupFormTabExpanderPluginInterface>
     */
    protected function getCustomerGroupFormTabExpanderPlugins(): array
    {
        return [
            new CompanyCustomerGroupFormTabExpanderPlugin(),
            new CompanyBusinessUnitCustomerGroupFormTabExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CustomerGroupExtension\Dependency\Plugin\CustomerGroupFormExpanderPluginInterface>
     */
    protected function getCustomerGroupFormExpanderPlugins(): array
    {
        return [
            new CompanyCustomerGroupFormExpanderPlugin(),
            new CompanyBusinessUnitCustomerGroupFormExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\CustomerGroupExtension\Dependency\Plugin\CustomerGroupViewExpanderPluginInterface>
     */
    protected function getCustomerGroupViewExpanderPlugins(): array
    {
        return [
            new CompanyCustomerGroupViewExpanderPlugin(),
            new CompanyBusinessUnitCustomerGroupViewExpanderPlugin(),
        ];
    }
}
```

Register the tab, form, and post-save plugins of a company or business unit together:

- A tab plugin without its form plugin breaks the page, because the tab renders the fields that the form plugin adds.
- A form plugin without its post-save plugin accepts selections that are never saved.

The view plugins are independent of the others. Without them, the page that shows a customer group displays only the **General Information** and **Customers** panels.

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Customers&nbsp;<span aria-label="and then">></span> Customer Groups** and click **Add Customer Group**. Make sure the **Companies** and **Business Units** tabs are displayed after the **Customers** tab.
2. Enter a name, select a company on the **Companies** tab and a business unit on the **Business Units** tab, and click **Save**.
3. On the **Customer Groups** page, click **View** next to the group. Make sure the **Companies** and **Business Units** panels list the company and the business unit.
4. Go back to the **Customer Groups** page and click **Edit** next to the group. Make sure the company and the business unit are listed in the assigned tables and are missing from the available tables.

{% endinfo_block %}

#### Grant access to restricted Back Office roles

The tables of the new tabs and panels load their rows from the `customer-experience-management` module, not from `customer-group`. A Back Office role that has access to every module, such as the root role, needs no changes. A role with restricted access rules shows empty tables until you allow the following:

| BUNDLE | CONTROLLER | ACTIONS |
| --- | --- | --- |
| customer-experience-management | available-company-table | selectable-table |
| customer-experience-management | assigned-company-table | selectable-table, table |
| customer-experience-management | available-company-business-unit-table | selectable-table |
| customer-experience-management | assigned-company-business-unit-table | selectable-table, table |

The **Edit** buttons of the **Companies** and **Business Units** panels open the edit pages of the company and the business unit, so the role also needs access to `company-gui/edit-company/index` and `company-business-unit-gui/edit-company-business-unit`. To add rules to a role, see [Edit user roles](/docs/pbc/all/user-management/latest/base-shop/manage-in-the-back-office/manage-user-roles/edit-user-roles.html).

If your project uses [Persistence ACL](/docs/pbc/all/user-management/latest/marketplace/persistence-acl-feature-overview/persistence-acl-feature-configuration.html) for Back Office users, also allow the `SpyCustomerGroupToCompany` and `SpyCustomerGroupToCompanyBusinessUnit` entities.

#### Optional: Reopen the edit page after a save

By default, saving a customer group on its edit page opens the page that shows the group. To reopen the edit page instead, on the tab that was open when the form was submitted, enable the following setting:

**src/Pyz/Zed/CustomerGroup/CustomerGroupConfig.php**

```php
<?php

namespace Pyz\Zed\CustomerGroup;

use Spryker\Zed\CustomerGroup\CustomerGroupConfig as SprykerCustomerGroupConfig;

class CustomerGroupConfig extends SprykerCustomerGroupConfig
{
    public function isRedirectToEditPageAfterUpdateEnabled(): bool
    {
        return true;
    }
}
```

This setting affects only the edit page. Saving a new customer group always opens the **Customer Groups** page.

#### Optional: Change the order of the tabs

By default, the pages that create and edit a customer group render the **General Information**, **Customers**, **Companies**, and **Business Units** tabs, and the page that shows a customer group renders its panels in the same order. To use another order on all three pages, list the tab names. Tabs that you do not list follow the listed ones, and the first listed tab opens when the page loads.

**src/Pyz/Zed/CustomerGroup/CustomerGroupConfig.php**

```php
<?php

namespace Pyz\Zed\CustomerGroup;

use Spryker\Zed\CustomerGroup\CustomerGroupConfig as SprykerCustomerGroupConfig;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup\CompanyBusinessUnitCustomerGroupFormTabExpanderPlugin;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup\CompanyCustomerGroupFormTabExpanderPlugin;

class CustomerGroupConfig extends SprykerCustomerGroupConfig
{
    /**
     * @return list<string>
     */
    public function getFormTabOrder(): array
    {
        return [
            static::FORM_TAB_NAME_GENERAL,
            CompanyCustomerGroupFormTabExpanderPlugin::TAB_NAME,
            CompanyBusinessUnitCustomerGroupFormTabExpanderPlugin::TAB_NAME,
            static::FORM_TAB_NAME_CUSTOMER_ASSIGNMENT,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Open the page that creates a customer group. Make sure the tabs follow the order you configured. Then open the page that shows a customer group, and make sure its panels follow the same order.

{% endinfo_block %}

### 5) Build Zed UI frontend

The feature relies on the Back Office scripts of the `Gui` and `CustomerGroup` modules: the selectable tables of the new tabs restore their selection after a save fails validation, and the edit page reopens on the tab that was open. Rebuild the Back Office assets:

```bash
docker/sdk console frontend:zed:build
```

{% info_block warningBox "Verification" %}

On the page that creates a customer group, enter the name of an existing customer group, select a company on the **Companies** tab, and click **Save**. Make sure the page shows the validation error and the company is still selected on the **Companies** tab.

{% endinfo_block %}

### 6) Set up the Backend API

The `customer-group-companies` and `customer-group-company-business-units` resources are generated by API Platform. They write the memberships through the customer group save, so they rely on the post-save plugins from [Set up behavior](#4-set-up-behavior): without those plugins, a write answers `204` and changes nothing.

The resource schemas ship inside the installed package, in `vendor/spryker-feature/customer-experience-management/resources/api/backend/`. In `config/GlueBackend/packages/spryker_api_platform.php`, confirm that `apiTypes()` includes `backend`, and leave `sourceDirectories()` unchanged unless your project overrides it. For details, see [Configuration](/docs/integrations/spryker-api/api-platform/configuration.html).

Generate the API resources, then clear the Glue Backend kernel cache:

```bash
docker/sdk cli "GLUE_APPLICATION=GLUE_BACKEND vendor/bin/glue api:generate"
rm -rf data/cache/GlueBackend/*
```

The resources address a customer group by its UUID. If your project had customer groups before it installed the customer group UUIDs, generate the missing ones as described in [Backend API: Manage customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html#installation).

{% info_block warningBox "Verification" %}

1. Make sure the generated resource classes exist:
    - `src/Generated/Api/Backend/CustomerGroupsCompaniesBackendResource.php`
    - `src/Generated/Api/Backend/CustomerGroupsCompanyBusinessUnitsBackendResource.php`
2. Get an access token as described in [Authenticate as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).
3. Add a company to a customer group:

```bash
curl -X POST "https://glue-backend.mysprykershop.com/customer-groups/{customer_group_uuid}/companies" \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/vnd.api+json" \
  -d '{"data":{"type":"customer-group-companies","attributes":{"companyUuids":["{company_uuid}"]}}}'
```

The request returns `204`.

4. Retrieve the companies of the customer group:

```bash
curl "https://glue-backend.mysprykershop.com/customer-groups/{customer_group_uuid}/companies?include=companies" \
  -H "Authorization: Bearer {access_token}" \
  -H "Accept: application/vnd.api+json"
```

The company is returned in `data` and in `included`. In the Back Office, the **Companies** tab of the customer group lists the company.

{% endinfo_block %}

If the endpoints return `404` while the generated resource classes exist, see [API Platform troubleshooting](/docs/integrations/spryker-api/api-platform/troubleshooting.html).

### 7) Import data

The feature provides four data importers. Use them to load customer groups and their members in bulk, for example, from an ERP export:

| DATA ENTITY | FILE | WHAT IT DOES |
| --- | --- | --- |
| customer-group | [customer_group.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group.csv.html) | Creates customer groups and updates their descriptions. |
| customer-group-company | [customer_group_to_company.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group-to-company.csv.html) | Assigns companies to customer groups. |
| customer-group-company-business-unit | [customer_group_to_company_business_unit.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group-to-company-business-unit.csv.html) | Assigns business units to customer groups. |
| customer-group-customer | [customer_group_to_customer.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group-to-customer.csv.html) | Assigns customers to customer groups. |

The membership importers only add memberships: they never remove a membership, and they never create or change a company, business unit, or customer. The file details pages describe the columns and the rows that are rejected.

1. Prepare your data according to your requirements. For example, `data/import/common/common/customer_group_to_company.csv`:

```csv
customer_group_name,company_key
Key Accounts,acme_corporation
Key Accounts,Ottom_ltd
Hospitality,BoB-Hotel-Jim
Hospitality,BoB-Hotel-Mitte
```

2. Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CustomerGroupDataImportPlugin | Imports customer groups. Creates a group when no group has the name, and updates the description otherwise. | None | SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\DataImport |
| CustomerGroupCompanyDataImportPlugin | Imports the company memberships of customer groups. | The customer groups and the company keys exist. The plugins from [Set up behavior](#4-set-up-behavior) are registered to show and edit the memberships in the Back Office. | SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\DataImport |
| CustomerGroupCompanyBusinessUnitDataImportPlugin | Imports the business unit memberships of customer groups. | The customer groups and the business unit keys exist. The plugins from [Set up behavior](#4-set-up-behavior) are registered to show and edit the memberships in the Back Office. | SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\DataImport |
| CustomerGroupCustomerDataImportPlugin | Imports the customer memberships of customer groups. | The customer groups and the customer references exist. | SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\DataImport\CustomerGroupCompanyBusinessUnitDataImportPlugin;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\DataImport\CustomerGroupCompanyDataImportPlugin;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\DataImport\CustomerGroupCustomerDataImportPlugin;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\DataImport\CustomerGroupDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new CustomerGroupDataImportPlugin(),
            new CustomerGroupCompanyDataImportPlugin(),
            new CustomerGroupCompanyBusinessUnitDataImportPlugin(),
            new CustomerGroupCustomerDataImportPlugin(),
        ];
    }
}
```

3. Add the four data entities to the data import configuration, after `company-business-unit`, with `customer-group` first. The customer groups, companies, business units, and customers that the membership files refer to must be imported before the membership files.

**data/import/local/full_EU.yml**

```yaml
    - data_entity: company-business-unit
      source: data/import/common/common/company_business_unit.csv
    - data_entity: customer-group
      source: data/import/common/common/customer_group.csv
    - data_entity: customer-group-company
      source: data/import/common/common/customer_group_to_company.csv
    - data_entity: customer-group-company-business-unit
      source: data/import/common/common/customer_group_to_company_business_unit.csv
    - data_entity: customer-group-customer
      source: data/import/common/common/customer_group_to_customer.csv
```

A data entity in the configuration without its registered plugin fails the whole import, so add the entities and the plugins together. Repeat the change for every data import configuration file your project uses.

4. Import data:

```bash
docker/sdk console data:import --config=data/import/local/full_EU.yml customer-group
docker/sdk console data:import --config=data/import/local/full_EU.yml customer-group-company
docker/sdk console data:import --config=data/import/local/full_EU.yml customer-group-company-business-unit
docker/sdk console data:import --config=data/import/local/full_EU.yml customer-group-customer
```

{% info_block warningBox "Verification" %}

1. Make sure each command reports `Import status: Successful`.
2. In the Back Office, go to **Customers&nbsp;<span aria-label="and then">></span> Customer Groups** and open one of the imported groups. Make sure its **Companies**, **Business Units**, and **Customers** panels list the imported memberships.
3. Run the commands again. Make sure they report the same result and add no memberships.

{% endinfo_block %}

A membership row whose customer group, key, or customer reference does not exist is rejected. The other rows are still imported, the run is reported as failed, and the import command exits with code `1`. Because a deployment stops at a failed import, make sure every customer group that a membership file names is in `customer_group.csv` or exists before the import.

### Optional: Adjust the limits

The following methods of `SprykerFeature\Zed\CustomerExperienceManagement\CustomerExperienceManagementConfig` set the limits of the feature. To change a limit, override the method in `src/Pyz/Zed/CustomerExperienceManagement/CustomerExperienceManagementConfig.php`.

| METHOD | DEFAULT | DESCRIPTION |
| --- | --- | --- |
| getCustomerGroupAssignmentIdsLimit() | 1000 | Maximum number of companies or business units that one Back Office save can select to be assigned or de-assigned on one tab. A save with more fails validation. |
| getCustomerGroupRelationChunkSize() | 500 | Number of memberships written in one batch by a customer group save and by the membership importers. Lower values make each query smaller at the cost of more queries. |
| getCustomerGroupMembershipCollectionMaxLimit() | 1000 | Maximum number of memberships that one read of the company or business unit memberships returns. |
