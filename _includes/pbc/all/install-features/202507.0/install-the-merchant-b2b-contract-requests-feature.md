This document describes how to install the Merchant B2B Contract Requests feature.

## Install feature core

To install the Merchant B2B Contract Requests feature core, take the following steps.

### Prerequisites

Install the required features:

| NAME                      | VERSION          | INSTALLATION GUIDE                                                                                                                                                             |
|---------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Mailing and Notifications | 202507.0 | [Install the Mailing and Notifications feature](/docs/pbc/all/emails/latest/install-the-mailing-and-notifications-feature.html)                                      |
| Merchant                  | 202507.0 | [Install the Merchant feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-feature.html)                             |
| Merchant B2B Contracts    | 202507.0 | [Install the Merchant B2B Contracts feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-b2b-contracts-feature.html) |
| Spryker Core              | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                    |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/merchant-contract-requests: "202507.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                           | EXPECTED DIRECTORY                                 |
|----------------------------------|----------------------------------------------------|
| MerchantRelationRequest          | vendor/spryker/merchant-relation-request           |
| MerchantRelationRequestExtension | vendor/spryker/merchant-relation-request-extension |
| MerchantRelationRequestGui       | vendor/spryker/merchant-relation-request-gui       |

{% endinfo_block %}

### 2) Set up the configuration

| CONFIGURATION                                | SPECIFICATION                                        | NAMESPACE                            |
|----------------------------------------------|------------------------------------------------------|--------------------------------------|
| MerchantRelationshipConstants::BASE_URL_YVES | Defines the base URL for Yves including scheme and port. | Spryker\Shared\MerchantRelationship  |

**config/Shared/config_default.php**

```php
use Spryker\Shared\MerchantRelationRequest\MerchantRelationRequestConstants;

$yvesHost = getenv('SPRYKER_FE_HOST');
$yvesPort = (int)(getenv('SPRYKER_FE_PORT')) ?: 443;

$config[MerchantRelationRequestConstants::BASE_URL_YVES] = sprintf(
    'https://%s%s',
    $yvesHost,
    $yvesPort !== 443 ? ':' . $yvesPort : '',
);
```


### 3) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY                                          | TYPE   | EVENT   |
|----------------------------------------------------------|--------|---------|
| spy_merchant_relation_request                            | table  | created |
| spy_merchant_relation_request_to_company_business_unit   | table  | created |
| spy_merchant_relationship.merchant_relation_request_uuid | column | created |
| spy_merchant.is_open_for_relation_request                | column | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| Transfer                                                        | Type     | Event   | Path                                                                                             |
|-----------------------------------------------------------------|----------|---------|--------------------------------------------------------------------------------------------------|
| MerchantRelationRequest                                         | class    | created | src/Generated/Shared/Transfer/MerchantRelationRequestTransfer                                    |
| MerchantRelationRequestCollection                               | class    | created | src/Generated/Shared/Transfer/MerchantRelationRequestCollectionTransfer                          |
| MerchantRelationRequestCriteria                                 | class    | created | src/Generated/Shared/Transfer/MerchantRelationRequestCriteriaTransfer                            |
| MerchantRelationRequestConditions                               | class    | created | src/Generated/Shared/Transfer/MerchantRelationRequestConditionsTransfer                          |
| MerchantRelationRequestSearchConditions                         | class    | created | src/Generated/Shared/Transfer/MerchantRelationRequestSearchConditionsTransfer                    |
| MerchantRelationRequestDeleteCriteria                           | class    | created | src/Generated/Shared/Transfer/MerchantRelationRequestDeleteCriteriaTransfer                      |
| MerchantRelationRequestToCompanyBusinessUnitDeleteCriteria      | class    | created | src/Generated/Shared/Transfer/MerchantRelationRequestToCompanyBusinessUnitDeleteCriteriaTransfer |
| MerchantRelationRequestCollectionRequest                        | class    | created | src/Generated/Shared/Transfer/MerchantRelationRequestCollectionRequestTransfer                   |
| MerchantRelationRequestCollectionResponse                       | class    | created | src/Generated/Shared/Transfer/MerchantRelationRequestCollectionResponseTransfer                  |
| MerchantRelationship.merchantRelationRequestUuid                | property | created | src/Generated/Shared/Transfer/MerchantRelationshipTransfer                                       |
| Merchant.isOpenForRelationRequest                               | property | created | src/Generated/Shared/Transfer/MerchantTransfer                                                   |
| MerchantStorage.isOpenForRelationRequest                        | property | created | src/Generated/Shared/Transfer/MerchantStorageTransfer                                            |
| MerchantSearch.isOpenForRelationRequest                         | property | created | src/Generated/Shared/Transfer/MerchantSearchTransfer                                             |

{% endinfo_block %}

### 4) Add translations

1. Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
merchant_relation_request.mail.merchant_relation_request_status_change.subject,"The status of your merchant relation request has been changed.",en_US
merchant_relation_request.mail.merchant_relation_request_status_change.subject,Der Status Ihrer Händlerbeziehungsanfrage wurde geändert.,de_DE
merchant_relation_request.mail.trans.merchant_relation_request_status_change.salutation,"Hello %first_name% %last_name%,",en_US
merchant_relation_request.mail.trans.merchant_relation_request_status_change.salutation,"Hallo %first_name% %last_name%,",de_DE
merchant_relation_request.mail.trans.merchant_relation_request_status_change.main_text,"Merchant %merchant_name% changed the status of your merchant relation request to %status%. Please review it in your Company Account.",en_US
merchant_relation_request.mail.trans.merchant_relation_request_status_change.main_text,"Händler %merchant_name% hat den Status Ihrer Händlerbeziehungsanfrage in %status% geändert. Bitte überprüfen Sie es in Ihrem Firmenkonto.",de_DE
merchant_relation_request.mail.trans.merchant_relation_request_status_change.button,View merchant relation request,en_US
merchant_relation_request.mail.trans.merchant_relation_request_status_change.button,Händlerbeziehungsanfrage anzeigen,de_DE
merchant_relation_request.mail.trans.merchant_relation_request_status_change.decision_note_title,Comment from Merchant,en_US
merchant_relation_request.mail.trans.merchant_relation_request_status_change.decision_note_title,Anmerkung vom Händler,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 5) Import data

1. Add the `is_open_for_relation_request` column to the `merchant.csv` file:

**data/import/common/common/merchant.csv**

```csv
merchant_reference,merchant_name,registration_number,status,email,is_active,url.de_DE,url.en_US,is_open_for_relation_request
MER000006,Sony Experts,HYY 134306,approved,michele@sony-experts.com,1,/de/merchant/sony-experts,/en/merchant/sony-experts,1
MER000005,Budget Cameras,HXX 134305,approved,jason.weidmann@budgetcamerasonline.com,1,/de/merchant/budget-cameras,/en/merchant/budget-cameras,1
MER000004,Impala Merchant,3,waiting-for-approval,impala.merchant@merchant.kudu,0,/en/merchant/impala-merchant-1,/de/merchant/impala-merchant-1,1
MER000003,Sugar Monster,4,waiting-for-approval,sugar.monster@merchant.kudu,0,/de/merchant/sugar-monster,/en/merchant/sugar-monster,1
MER000007,Restrictions Merchant,5,waiting-for-approval,restrictions.merchant@merchant.kudu,0,/de/merchant/restrictions-merchant,/en/merchant/restrictions-merchant,1
MER000001,Spryker,HRB 134310,approved,harald@spryker.com,1,/de/merchant/spryker,/en/merchant/spryker,1
MER000002,Video King,1234.4567,approved,martha@video-king.nl,1,/de/merchant/video-king,/en/merchant/video-king,1
```

| COLUMN                       | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                                |
|------------------------------|----------|-----------|--------------|-------------------------------------------------|
| is_open_for_relation_request |  | boolean   | 1            | Defines a merchant relation request allowance. |

2. Import data:

```bash
console data:import stock
```

{% info_block warningBox "Verification" %}

Make sure the defined picking list strategies have been imported to the `spy_stock` database table.

{% endinfo_block %}

### 6) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                                         | SPECIFICATION                                                                                                                                             | PREREQUISITES | NAMESPACE                                                                        |
|--------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------|
| MerchantRelationRequestCompanyBusinessUnitPreDeletePlugin                      | When a company business unit is deleted, deletes merchant relation request entities and the related merchant relation request to company business unit entities.  |               | Spryker\Zed\MerchantRelationRequest\Communication\Plugin\CompanyBusinessUnit     |
| MerchantRelationRequestCompanyUserPreDeletePlugin                              | When a company user is deleted, deletes merchant relation request entities and the related merchant relation request to company business unit entities.            |               | Spryker\Zed\MerchantRelationRequest\Communication\Plugin\CompanyUser             |
| MerchantRelationRequestStatusChangeMailTypeBuilderPlugin                       | Builds `MailTransfer` with the data for the merchant relation request status change email.     |               | Spryker\Zed\MerchantRelationRequest\Communication\Plugin\Mail                    |
| StatusChangeCompanyUserNotificationMerchantRelationshipRequestPostUpdatePlugin | Sends a status change notification email to the company user who initiated the request to the merchant.                              |               | Spryker\Zed\MerchantRelationRequest\Communication\Plugin\MerchantRelationRequest |
| CreateMerchantRelationRequestPermissionPlugin                                  | Checks if a customer is allowed to create merchant relation requests.                                                                                   |               | Spryker\Client\MerchantRelationRequest\Plugin\Permission                         |
| IsOpenForRelationRequestMerchantFormExpanderPlugin                             | Expands `MerchantCreateForm` with the field that defines the merchant relation request allowance.              |               | Spryker\Zed\MerchantRelationRequestGui\Communication\Plugin\MerchantGui          |

**src/Pyz/Zed/CompanyBusinessUnit/CompanyBusinessUnitDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CompanyBusinessUnit;

use Spryker\Zed\CompanyBusinessUnit\CompanyBusinessUnitDependencyProvider as SprykerCompanyBusinessUnitDependencyProvider;
use Spryker\Zed\MerchantRelationRequest\Communication\Plugin\CompanyBusinessUnit\MerchantRelationRequestCompanyBusinessUnitPreDeletePlugin;

class CompanyBusinessUnitDependencyProvider extends SprykerCompanyBusinessUnitDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CompanyBusinessUnitExtension\Dependency\Plugin\CompanyBusinessUnitPreDeletePluginInterface>
     */
    protected function getCompanyBusinessUnitPreDeletePlugins(): array
    {
        return [
            new MerchantRelationRequestCompanyBusinessUnitPreDeletePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that, when a company business unit is deleted, all related merchant relation requests are deleted too.

{% endinfo_block %}

**src/Pyz/Zed/CompanyUser/CompanyUserDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CompanyUser;

use Spryker\Zed\CompanyUser\CompanyUserDependencyProvider as SprykerCompanyUserDependencyProvider;
use Spryker\Zed\MerchantRelationRequest\Communication\Plugin\CompanyUser\MerchantRelationRequestCompanyUserPreDeletePlugin;

class CompanyUserDependencyProvider extends SprykerCompanyUserDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CompanyUserExtension\Dependency\Plugin\CompanyUserPreDeletePluginInterface>
     */
    protected function getCompanyUserPreDeletePlugins(): array
    {
        return [
            new MerchantRelationRequestCompanyUserPreDeletePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that, when a company user is deleted, all merchant relation requests initiated by the user are deleted too.

{% endinfo_block %}

**src/Pyz/Zed/Mail/MailDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Mail;

use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;
use Spryker\Zed\MerchantRelationRequest\Communication\Plugin\Mail\MerchantRelationRequestStatusChangeMailTypeBuilderPlugin;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MailExtension\Dependency\Plugin\MailTypeBuilderPluginInterface>
     */
    protected function getMailTypeBuilderPlugins(): array
    {
        return [
            new MerchantRelationRequestStatusChangeMailTypeBuilderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/MerchantRelationship/MerchantRelationshipDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantRelationRequest;

use Spryker\Zed\MerchantRelationRequest\Communication\Plugin\MerchantRelationRequest\StatusChangeCompanyUserNotificationMerchantRelationshipRequestPostUpdatePlugin;
use Spryker\Zed\MerchantRelationRequest\MerchantRelationRequestDependencyProvider as SprykerMerchantRelationRequestDependencyProvider;

class MerchantRelationRequestDependencyProvider extends SprykerMerchantRelationRequestDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantRelationRequestExtension\Dependency\Plugin\MerchantRelationRequestPostUpdatePluginInterface>
     */
    protected function getMerchantRelationRequestPostUpdatePlugins(): array
    {
        return [
            new StatusChangeCompanyUserNotificationMerchantRelationshipRequestPostUpdatePlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Make sure that, when you change the status of a merchant relationship request, the notification email is sent to the email address of the company user who initiated the request.

{% endinfo_block %}

**Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Permission;

use Spryker\Client\MerchantRelationRequest\Plugin\Permission\CreateMerchantRelationRequestPermissionPlugin;
use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
            new CreateMerchantRelationRequestPermissionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Log in as a company admin.
2. Go to `https://www.mysprykershop.com/en/company/company-role`.
3. Click **Edit** next to a role.
    Make sure you can assign the **Send Merchant Relation Request** permission.

{% endinfo_block %}

**src/Pyz/Zed/MerchantGui/MerchantGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantGui;

use Spryker\Zed\MerchantGui\MerchantGuiDependencyProvider as SprykerMerchantGuiDependencyProvider;
use Spryker\Zed\MerchantRelationRequestGui\Communication\Plugin\MerchantGui\IsOpenForRelationRequestMerchantFormExpanderPlugin;

class MerchantGuiDependencyProvider extends SprykerMerchantGuiDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantFormExpanderPluginInterface>
     */
    protected function getMerchantFormExpanderPlugins(): array
    {
        return [
            new IsOpenForRelationRequestMerchantFormExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Marketplace** > **Merchants**.
2. Press **Edit** button for some merchant or press **Create Merchant** button and make sure that you see **Allow merchant relation requests** checkbox in the form.

{% endinfo_block %}

### 6) Configure navigation

1. Add the `MerchantRelationshipGui` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <marketplace>
        <label>Marketplace</label>
        <title>Marketplace</title>
        <icon>fa-shopping-basket</icon>
        <pages>
            <merchant-relation-request-gui>
                <label>Merchant Relation Requests</label>
                <title>Merchant Relation Requests</title>
                <bundle>merchant-relation-request-gui</bundle>
                <controller>list</controller>
                <action>index</action>
            </merchant-relation-request-gui>
        </pages>
    </marketplace>
</config>
```

2. Build the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Log in to the Back Office. Make sure there is the **Merchant Relation Requests** navigation menu item under the **Marketplace** menu item.

{% endinfo_block %}

## Install feature frontend

Follow these steps to install feature frontend

### Prerequisites

Overview and install the necessary features before beginning the integration step.

| NAME            | VERSION          | INSTALLATION GUIDE                                                                                                                                                                             |
|-----------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Company Account | 202507.0 | [Install the Company Account feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html) |
| Merchant        | 202507.0 | [Install the Merchant feature](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-the-merchant-feature.html)                                             |
| Spryker Core    | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                    |

### 1) Install the required modules

Install the required modules:

```bash
composer require spryker-feature/merchant-contract-requests: "202507.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules are installed:

| MODULE                        | EXPECTED DIRECTORY                                   |
|-------------------------------|------------------------------------------------------|
| MerchantRelationRequestPage   | vendor/spryker-shop/merchant-relation-request-page   |
| MerchantRelationRequestWidget | vendor/spryker-shop/merchant-relation-request-widget |

{% endinfo_block %}

### 2) Add translations

Append glossary according to your configuration:

<details>
  <summary>src/data/import/glossary.csv</summary>

```yaml
merchant_relation_request.validation.status_not_pending,New requests can only be made if the current status is pending.,en_US
merchant_relation_request.validation.status_not_pending,"Neue Anfragen können nur gestellt werden, wenn der aktuelle Status ausstehend ist.",de_DE
merchant_relation_request.validation.decision_note_empty,Please clear the decision note before submitting your request.,en_US
merchant_relation_request.validation.decision_note_empty,"Bitte leeren Sie die Entscheidungsnotiz, bevor Sie Ihre Anfrage einreichen.",de_DE
merchant_relation_request.validation.assignee_business_units_empty,Please specify at least one assignee business unit to proceed.,en_US
merchant_relation_request.validation.assignee_business_units_empty,"Bitte geben Sie mindestens eine zugewiesene Geschäftseinheit an, um fortzufahren.",de_DE
merchant_relation_request.validation.request_note_wrong_length,A merchant relation request note must have length from %min% to %max% characters.,en_US
merchant_relation_request.validation.request_note_wrong_length,Eine Händlerbeziehungsanfrage-Notiz muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
merchant_relation_request.validation.incompatible_company_account,Only company users from the same company can create requests for this list of business units.,en_US
merchant_relation_request.validation.incompatible_company_account,Nur Nutzer desselben Unternehmens können Anfragen für diese Liste von Geschäftseinheiten erstellen.,de_DE
merchant_relation_request.validation.decision_note_wrong_length,A merchant relation request decision note must have length from %min% to %max% characters.,en_US
merchant_relation_request.validation.decision_note_wrong_length,Eine Entscheidungsbemerkung zu einer Händlerbeziehungsanfrage muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
merchant_relation_request.validation.not_found,Merchant Relation Request not found.,en_US
merchant_relation_request.validation.not_found,Händlerbeziehungsanfrage nicht gefunden.,de_DE
merchant_relation_request.validation.cant_be_approved,"Merchant Relation Request can't be approved.",en_US
merchant_relation_request.validation.cant_be_approved,Händlerbeziehungsanfrage kann nicht genehmigt werden.,de_DE
merchant_relation_request.validation.cant_be_canceled,"Merchant Relation Request can't be canceled.",en_US
merchant_relation_request.validation.cant_be_canceled,Händlerbeziehungsanfrage kann nicht storniert werden.,de_DE
merchant_relation_request.validation.cant_be_rejected,"Merchant Relation Request can't be rejected.",en_US
merchant_relation_request.validation.cant_be_rejected,Händlerbeziehungsanfrage kann nicht abgelehnt werden.,de_DE
merchant_relation_request.validation.cant_become_pending,"Merchant Relation Request can't become pending.",en_US
merchant_relation_request.validation.cant_become_pending,Händlerbeziehungsanfrage kann nicht ausstehend werden.,de_DE
permission.name.CreateMerchantRelationRequestPermissionPlugin,Send Merchant Relation Request,en_US
permission.name.CreateMerchantRelationRequestPermissionPlugin,Händlerbeziehungsanfrage senden,de_DE
merchant_relation_request_widget.request_for_relation.link,Merchant Relation Request,en_US
merchant_relation_request_widget.request_for_relation.link,Händlerbeziehungsanfrage,de_DE
merchant_relation_request_widget.request_for_relation.button,Send Request,en_US
merchant_relation_request_widget.request_for_relation.button,Anfrage senden,de_DE
merchant_relation_request_widget.request_for_relation.details,Contact Details,en_US
merchant_relation_request_widget.request_for_relation.details,Kontaktdetails,de_DE
merchant_relation_request_widget.create_request.label,Create the merchant relation request,en_US
merchant_relation_request_widget.create_request.label,Händlerbeziehungsanfrage erstellen,de_DE
merchant_relation_page.merchant_relation.view.empty,You do not have any merchant relations yet.,en_US
merchant_relation_page.merchant_relation.view.empty,Sie haben noch keine Händlerbeziehungen.,de_DE
merchant_relation_request_widget.merchant_relation_request.list.title,Merchant Relation Requests,en_US
merchant_relation_request_widget.merchant_relation_request.list.title,Händlerbeziehungsanfragen,de_DE
merchant_relation_request_page.merchant_relation_request.view.empty,You do not have any merchant relation requests yet.,en_US
merchant_relation_request_page.merchant_relation_request.view.empty,Sie haben noch keine Händlerbeziehungsanfragen.,de_DE
merchant_relation_request_page.merchant_relation_request,Merchant Relation Requests,en_US
merchant_relation_request_page.merchant_relation_request,Händlerbeziehungsanfragen,de_DE
merchant_relation_request_page.merchant_relation_request.list.manage,Manage Merchant Relation Requests,en_US
merchant_relation_request_page.merchant_relation_request.list.manage,Verwalten Sie Händlerbeziehungsanfragen,de_DE
merchant_relation_request_page.merchant_relation_request.list.create_link,Create request,en_US
merchant_relation_request_page.merchant_relation_request.list.create_link,Anfrage erstellen,de_DE
merchant_relation_request_page.merchant_relation_request.breadcrumb.create,Create,en_US
merchant_relation_request_page.merchant_relation_request.breadcrumb.create,Erstellen,de_DE
merchant_relation_request_page.merchant_relation_request.title_create,Merchant Relation Request,en_US
merchant_relation_request_page.merchant_relation_request.title_create,Händlerbeziehung Anfrage,de_DE
merchant_relation_request_page.merchant_relation_request.actions.cancel,Cancel,en_US
merchant_relation_request_page.merchant_relation_request.actions.cancel,Stornieren,de_DE
merchant_relation_request_page.merchant_relation_request.actions.back,Back,en_US
merchant_relation_request_page.merchant_relation_request.actions.back,Zurück,de_DE
merchant_relation_request_page.merchant_relation_request.actions.send_request,Submit Request,en_US
merchant_relation_request_page.merchant_relation_request.actions.send_request,Anfrage einreichen,de_DE
merchant_relation_request_page.merchant_relation_request.submit,Submit Request,en_US
merchant_relation_request_page.merchant_relation_request.submit,Anfrage absenden,de_DE
merchant_relation_request_page.merchant_relation_request.request_note,Message to the Merchant,en_US
merchant_relation_request_page.merchant_relation_request.request_note,Nachricht an den Händler,de_DE
merchant_relation_request_page.merchant_relation_request.business_units,Business Units,en_US
merchant_relation_request_page.merchant_relation_request.business_units,Geschäftseinheiten,de_DE
merchant_relation_request_page.merchant_relation_request.business_unit_owner,Business Unit Owner,en_US
merchant_relation_request_page.merchant_relation_request.business_unit_owner,Inhaber der Geschäftseinheit,de_DE
merchant_relation_request_page.merchant_relation_request.business_unit_owner.placeholder,Select Business Unit Owner,en_US
merchant_relation_request_page.merchant_relation_request.business_unit_owner.placeholder,Inhaber der Geschäftseinheit auswählen,de_DE
merchant_relation_request_page.merchant_relation_request.merchant,Merchant,en_US
merchant_relation_request_page.merchant_relation_request.merchant,Händler,de_DE
merchant_relation_request_page.merchant_relation_request.merchant.placeholder,Select Merchant,en_US
merchant_relation_request_page.merchant_relation_request.merchant.placeholder,Händler auswählen,de_DE
merchant_relation_request_page.merchant_relation_request.created,Merchant relation request has been submitted successfully.,en_US
merchant_relation_request_page.merchant_relation_request.created,Die Anfrage zur Händlerbeziehung wurde erfolgreich übermittelt.,de_DE
merchant_relation_request_page.merchant_relation_request.created_at,Created,en_US
merchant_relation_request_page.merchant_relation_request.created_at,Erstellt,de_DE
merchant_relation_request_page.merchant_relation_request.company_user,Company User,en_US
merchant_relation_request_page.merchant_relation_request.company_user,Firmenbenutzer,de_DE
merchant_relation_request_page.merchant_relation_request.status,Status,en_US
merchant_relation_request_page.merchant_relation_request.status,Status,de_DE
merchant_relation_request_page.merchant_relation_request.actions,Actions,en_US
merchant_relation_request_page.merchant_relation_request.actions,Aktionen,de_DE
merchant_relation_request_page.merchant_relation_request.actions.view,View,en_US
merchant_relation_request_page.merchant_relation_request.actions.view,Sicht,de_DE
merchant_relation_request_page.merchant_relation_request.empty_business_units.error,At least one business unit must be assigned to a user,en_US
merchant_relation_request_page.merchant_relation_request.empty_business_units.error,Einem Benutzer muss mindestens eine Geschäftseinheit zugeordnet sein,de_DE
merchant_relation_request_page.merchant_relation_request.success.canceled,Merchant relation request canceled successfully.,en_US
merchant_relation_request_page.merchant_relation_request.success.canceled,Die Anfrage zur Händlerbeziehung wurde erfolgreich abgebrochen.,de_DE
merchant_relation_request.validation.company_user_access_denied,Access denied.,en_US
merchant_relation_request.validation.company_user_access_denied,Zugriff verweigert.,de_DE
merchant_relation_request.validation.merchant_not_found,Merchant not found.,en_US
merchant_relation_request.validation.merchant_not_found,Händler nicht gefunden.,de_DE
merchant_relation_request.merchant_notification.active_filters,Active Filters:,en_US
merchant_relation_request.merchant_notification.active_filters,Aktive Filter:,de_DE
merchant_relation_request.merchant_notification.reset_all,Reset All,en_US
merchant_relation_request.merchant_notification.reset_all,Alles zurücksetzen,de_DE
merchant_relation_request.merchant_notification.apply,Apply,en_US
merchant_relation_request.merchant_notification.apply,Anwenden,de_DE
merchant_relation_request_page.merchant_relation_request.status.placeholder,Select Status,en_US
merchant_relation_request_page.merchant_relation_request.status.placeholder,Status auswählen,de_DE
merchant_relation_request_page.merchant_relation_request.status.pending,Pending ,en_US
merchant_relation_request_page.merchant_relation_request.status.pending,Ausstehend,de_DE
merchant_relation_request_page.merchant_relation_request.status.canceled,Canceled ,en_US
merchant_relation_request_page.merchant_relation_request.status.canceled,Storniert,de_DE
merchant_relation_request_page.merchant_relation_request.status.rejected,Rejected ,en_US
merchant_relation_request_page.merchant_relation_request.status.rejected,Abgelehnt,de_DE
merchant_relation_request_page.merchant_relation_request.status.approved,Approved ,en_US
merchant_relation_request_page.merchant_relation_request.status.approved,Genehmigt,de_DE
merchant_relation_request_page.merchant_relation_request.request_note_label,Message from the user,en_US
merchant_relation_request_page.merchant_relation_request.request_note_label,Nachricht vom Benutzer,de_DE
merchant_relation_request_page.merchant_relation_request.decision_note_label,Message to the user,en_US
merchant_relation_request_page.merchant_relation_request.decision_note_label,Nachricht an den Benutzer,de_DE
merchant_relation_request_page.merchant_relation_request_detail.date_created,Created date,en_US
merchant_relation_request_page.merchant_relation_request_detail.date_created,Erstellt am,de_DE
merchant_relation_request_page.merchant_relation_request_detail.company_details,Company Details,en_US
merchant_relation_request_page.merchant_relation_request_detail.company_details,Firmendetails,de_DE
merchant_relation_request_page.merchant_relation_request_detail.company,Company,en_US
merchant_relation_request_page.merchant_relation_request_detail.company,Firma,de_DE
merchant_relation_request_page.merchant_relation_request_detail.business_unit_owner,Business Unit Owner,en_US
merchant_relation_request_page.merchant_relation_request_detail.business_unit_owner,Inhaber der Geschäftseinheit,de_DE
merchant_relation_request_page.merchant_relation_request_detail.business_units,Business Units,en_US
merchant_relation_request_page.merchant_relation_request_detail.business_units,Geschäftseinheiten,de_DE
merchant_relation_request_page.merchant_relation_request_detail.details,Contact Details,en_US
merchant_relation_request_page.merchant_relation_request_detail.details,Kontaktdetails,de_DE
merchant_relation_request_page.merchant_relation_request_detail.first_name,Vorname,de_DE
merchant_relation_request_page.merchant_relation_request_detail.first_name,First Name,en_US
merchant_relation_request_page.merchant_relation_request_detail.last_name,Nachname,de_DE
merchant_relation_request_page.merchant_relation_request_detail.last_name,Last Name,en_US
merchant_relation_request_page.merchant_relation_request_detail.email,E-mail-Adresse,de_DE
merchant_relation_request_page.merchant_relation_request_detail.email,E-mail,en_US
merchant_relation_request_page.merchant_relation_request_detail.additional_details,Zusätzliche Details,de_DE
merchant_relation_request_page.merchant_relation_request_detail.additional_details,Additional details,en_US
merchant_relation_request_page.merchant_relation_request_detail.comment_from_merchant,Kommentar vom Händler,de_DE
merchant_relation_request_page.merchant_relation_request_detail.comment_from_merchant,Comment from merchant,en_US
merchant_relation_request_page.merchant_relation_request_detail.notification.title.pending,Merchant relation request pending!,en_US
merchant_relation_request_page.merchant_relation_request_detail.notification.title.pending,Anfrage zur Händlerbeziehung ausstehend!,de_DE
merchant_relation_request_page.merchant_relation_request_detail.notification.title.canceled,Merchant relation request canceled!,en_US
merchant_relation_request_page.merchant_relation_request_detail.notification.title.canceled,Anfrage zur Händlerbeziehung abgelehnt!,de_DE
merchant_relation_request_page.merchant_relation_request_detail.notification.title.approved,Merchant relation request approved!,en_US
merchant_relation_request_page.merchant_relation_request_detail.notification.title.approved,Anfrage zur Händlerbeziehung genehmigt!,de_DE
merchant_relation_request_page.merchant_relation_request_detail.notification.title.rejected,Merchant relation request rejected!,en_US
merchant_relation_request_page.merchant_relation_request_detail.notification.title.rejected,Anfrage zur Händlerbeziehung abgelehnt!,de_DE
merchant_relation_request_page.merchant_relation_request_detail.notification.description.pending,Your merchant relation request is pending at the moment.,en_US
merchant_relation_request_page.merchant_relation_request_detail.notification.description.pending,Ihre Anfrage zur Händlerbeziehung wird derzeit bearbeitet.,de_DE
merchant_relation_request_page.merchant_relation_request_detail.notification.description.canceled,Your merchant relation request was cancelled.,en_US
merchant_relation_request_page.merchant_relation_request_detail.notification.description.canceled,Ihre Anfrage zur Händlerbeziehung wurde abgelehnt.,de_DE
merchant_relation_request_page.merchant_relation_request_detail.notification.description.approved,The following merchant relations were created.,en_US
merchant_relation_request_page.merchant_relation_request_detail.notification.description.approved,Die folgenden Händlerbeziehungen wurden erstellt.,de_DE
merchant_relation_request_page.merchant_relation_request_detail.notification.description.rejected,Your merchant relation request was rejected.,en_US
merchant_relation_request_page.merchant_relation_request_detail.notification.description.rejected,Ihre Anfrage zur Händlerbeziehung wurde abgelehnt.,de_DE
merchant_relation_request_page.merchant_relation_request_detail.labels.company,Company,en_US
merchant_relation_request_page.merchant_relation_request_detail.labels.company,Unternehmen,de_DE
```

</details>

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 3) Enable controllers

Register the following route providers on the Storefront:

| PROVIDER                                       | NAMESPACE                                                  |
|------------------------------------------------|------------------------------------------------------------|
| MerchantRelationRequestPageRouteProviderPlugin | SprykerShop\Yves\MerchantRelationRequestPage\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\MerchantRelationRequestPage\Plugin\Router\MerchantRelationRequestPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return list<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new MerchantRelationRequestPageRouteProviderPlugin(),
        ];
    }
}
```

### 4) Set up widgets

To enable widgets, register the following plugins:

| PLUGIN                                    | SPECIFICATION                                                                            | PREREQUISITES | NAMESPACE                                        |
|-------------------------------------------|------------------------------------------------------------------------------------------|---------------|--------------------------------------------------|
| MerchantRelationRequestCreateButtonWidget | Adds the `Send Request` button to initiate the creation of a merchant relation request.            |               | SprykerShop\Yves\MerchantRelationshipPage\Widget |
| MerchantRelationRequestCreateLinkWidget   | Adds the `Merchant Relation Request` link to initiate the creation of a merchant relation request. |               | SprykerShop\Yves\MerchantRelationshipPage\Widget |
| MerchantRelationRequestMenuItemWidget     | Adds the `Merchant Relation Requests` item to the company navigation menu.                       |               | SprykerShop\Yves\MerchantRelationshipPage\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantRelationRequestWidget\Widget\MerchantRelationRequestCreateButtonWidget;
use SprykerShop\Yves\MerchantRelationRequestWidget\Widget\MerchantRelationRequestCreateLinkWidget;
use SprykerShop\Yves\MerchantRelationRequestWidget\Widget\MerchantRelationRequestMenuItemWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return list<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            MerchantRelationRequestCreateButtonWidget::class,
            MerchantRelationRequestCreateLinkWidget::class,
            MerchantRelationRequestMenuItemWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify the following widgets have been registered by adding the respective code snippets to a Twig template:

| WIDGET                                    | CODE TO ADD                                                                                                                                                                  | VERIFICATION |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| - |
| MerchantRelationRequestCreateButtonWidget | `{% raw %}{%{% endraw %} widget 'MerchantRelationRequestCreateButtonWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` | The **Send Request** button is displayed. |
| MerchantRelationRequestCreateLinkWidget   | `{% raw %}{%{% endraw %} widget 'MerchantRelationRequestCreateLinkWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`   | The `Merchant Relation Request` link is displayed. |
| MerchantRelationRequestMenuItemWidget     | `{% raw %}{%{% endraw %} widget 'MerchantRelationRequestMenuItemWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}`     | The `Merchant Relation Requests` menu item is displayed in the company navigation menu. |


{% endinfo_block %}

### 5) Update breadcrumbs

If `vendor/spryker-shop/company-page/src/SprykerShop/Yves/CompanyPage/Theme/default/templates/page-layout-company` is overridden on the project level, in the `page-layout-company` template, update the breadcrumbs as follows:

```twig
{% raw %}{% block breadcrumbs %}
    {% set breadcrumbs = [] %}

    {% block breadcrumbsContent %}
        {% set breadcrumbBase = [{
            label: 'company.account.page-title' | trans,
            url: url('company/overview'),
        }] %}

        {% set breadcrumbsList = data.currentBreadcrumb ? breadcrumbBase | merge([{
            label: data.currentBreadcrumb | trans
        }]) : breadcrumbBase | merge(breadcrumbs) %}

        {% include molecule('breadcrumb') with {
            data: {
                steps: breadcrumbsList,
            }
        } only %}
    {% endblock %}
{% endblock %}{% endraw %}
```
