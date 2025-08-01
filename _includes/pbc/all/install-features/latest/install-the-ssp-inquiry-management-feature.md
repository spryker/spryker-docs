
This document describes how to install the Self-Service Portal (SSP) Inquiry Management feature.

## Prerequisites


| FEATURE         | VERSION | INSTALLATION GUIDE  |
|--------------| ------- | ------------------ |
| Spryker Core | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                        |
| Self-Service Portal | 202507.0 | [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)          |

## Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/self-service-portal:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following packages are now listed in `composer.lock`:

| MODULE            | EXPECTED DIRECTORY                         |
|-------------------|--------------------------------------------|
| SelfServicePortal | vendor/spryker-feature/self-service-portal |

{% endinfo_block %}

## Set up configuration

Update your `config/Shared/config_default.php`:

| CONFIGURATION                                                             | SPECIFICATION                                                                           | NAMESPACE                               |
|---------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|-----------------------------------------|
| FileSystemConstants::FILESYSTEM_SERVICE                                   | Flysystem configuration for file management.                                            | Spryker\Shared\FileSystem               |
| SelfServicePortalConstants::BASE_URL_YVES                                 | Yves URL used in mailing templates.                                                     | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConstants::DEFAULT_TOTAL_FILE_MAX_SIZE                   | Configurable total file upload limit.                                                   | SprykerFeature\Shared\SelfServicePortal |
| SelfServicePortalConstants::DEFAULT_FILE_MAX_SIZE                         | Configurable single file upload size.                                                   | SprykerFeature\Shared\SelfServicePortal |
| SspInquiryManagementConfig::getInquiryInitialStateMap()                   | Returns the inquiry state machine process to the initial state mapping.                 | SprykerFeature\Shared\SelfServicePortal |
| SspInquiryManagementConfig::getInquiryStateMachineProcessInquiryTypeMap() | Returns the inquiry type to state machine process mapping.                              | SprykerFeature\Shared\SelfServicePortal |
| SspInquiryManagementConfig::getInquiryCancelStateMachineEventName()       | Returns the inquiry event name of the inquiry cancellation.                             | SprykerFeature\Shared\SelfServicePortal |
| SspInquiryManagementConfig::getSspInquiryAvailableStatuses()              | Returns the list of inquiry statuses.                                                   | SprykerFeature\Shared\SelfServicePortal |
| SspInquiryManagementConfig::getInquiryStorageName()                       | Defines the Storage name for inquiry Flysystem files.                                   | SprykerFeature\Shared\SelfServicePortal |
| SalesConfig::getSalesDetailExternalBlocksUrls()                           | Defines the list of URLs for rendering blocks in the order details page.                | Spryker\Zed\Sales                       |
| SspInquiryManagementConfig::getInquiryStatusClassMap()                    | Returns the inquiry status to СSS class name mapping used for status indicator styling. | SprykerFeature\Zed\SelfServicePortal    |
| SspInquiryManagementConfig::getInquiryPendingStatus()                     | Identifies the status that will be considered `Pending`.                                | SprykerFeature\Zed\SelfServicePortal    |

**config/Shared/config_default.php**

```php
<?php

use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;
use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'ssp-inquiry' => [
        'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
        'root' => '/data',
        'path' => '/data/ssp-inquiry',
    ],
];

$config[SelfServicePortalConstants::BASE_URL_YVES] = 'https://your-yves-url';
$config[SelfServicePortalConstants::DEFAULT_TOTAL_FILE_MAX_SIZE] = getenv('SPRYKER_DEFAULT_TOTAL_FILE_MAX_SIZE') ?: '100M';
$config[SelfServicePortalConstants::DEFAULT_FILE_MAX_SIZE] = getenv('SPRYKER_DEFAULT_FILE_MAX_SIZE') ?: '20M';
```

<details>
  <summary>src/Pyz/Shared/SelfServicePortal/SelfServicePortalConfig.php</summary>

```php
<?php

namespace Pyz\Shared\SelfServicePortal;

use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConfig as SprykerSelfServicePortalConfig;

class SelfServicePortalConfig extends SprykerSelfServicePortalConfig
{
    public function getInquiryInitialStateMap(): array
    {
        return [
            'SspInquiryDefaultStateMachine' => 'created',
        ];
    }

    public function getInquiryStateMachineProcessInquiryTypeMap(): array
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
    public function getInquiryCancelStateMachineEventName(): string
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

    /**
     * @return string
     */
    public function getInquiryStorageName(): string
    {
        return 'ssp-inquiry';
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

{% info_block warningBox "Verification" %}
Make sure the following transfer objects have been generated:

| TRANSFER                            | TYPE     | EVENT   | PATH                                                                      |
|-------------------------------------|----------|---------|---------------------------------------------------------------------------|
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

Create an XML configuration file for the state machine::

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
        <self-service-portal-inquiries>
            <label>Inquiries</label>
            <title>Inquiries</title>
            <bundle>self-service-portal</bundle>
            <controller>index</controller>
            <action>index</action>
        </self-service-portal-inquiries>
    </sales>
</config>
```

{% info_block warningBox "Verification" %}
Make sure that, in the Back Office, the **Customer portal** > **Inquiries** menu item is available.
{% endinfo_block %}

## Add translations

1. Append the glossary:

<details>
  <summary>Glossary</summary>

```csv
permission.name.CreateSspInquiryPermissionPlugin,Create inquiry,en_US
permission.name.CreateSspInquiryPermissionPlugin,Anfrage stellen,de_DE
permission.name.ViewCompanySspInquiryPermissionPlugin,View company inquiries,en_US
permission.name.ViewCompanySspInquiryPermissionPlugin,Anfragen der Firma anzeigen,de_DE
permission.name.ViewBusinessUnitSspInquiryPermissionPlugin,View business unit inquiries,en_US
permission.name.ViewBusinessUnitSspInquiryPermissionPlugin,Anfragen der Geschäftseinheit anzeigen,de_DE
self_service_portal.inquiry.success.created,Inquiry has been submitted successfully,en_US
self_service_portal.inquiry.success.created,Anfrage wurde erfolgreich übermittelt,de_DE
self_service_portal.inquiry.type.label,Type,en_US
self_service_portal.inquiry.type.label,Typ,de_DE
self_service_portal.inquiry.access.denied,Access denied.,en_US
self_service_portal.inquiry.access.denied,Zugriff verweigert.,de_DE
self_service_portal.inquiry.success.canceled,Inquiry has been canceled.,en_US
self_service_portal.inquiry.success.canceled,Die Anfrage wurde storniert.,de_DE
self_service_portal.inquiry.cancel,Cancel inquiry,en_US
self_service_portal.inquiry.cancel,Anfrage stornieren,de_DE
self_service_portal.inquiry.create.select_type,Select type,en_US
self_service_portal.inquiry.create.select_type,Typ auswählen,de_DE
self_service_portal.inquiry.status.pending,Pending,en_US
self_service_portal.inquiry.status.pending,Ausstehend,de_DE
self_service_portal.inquiry.status.in_review,In Review,en_US
self_service_portal.inquiry.status.in_review,In Bearbeitung,de_DE
self_service_portal.inquiry.status.approved,Approved,en_US
self_service_portal.inquiry.status.approved,Genehmigt,de_DE
self_service_portal.inquiry.status.rejected,Rejected,en_US
self_service_portal.inquiry.status.rejected,Abgelehnt,de_DE
self_service_portal.inquiry.status.canceled,Canceled,en_US
self_service_portal.inquiry.status.canceled,Storniert,de_DE
self_service_portal.inquiry.subject.label,Subject,en_US
self_service_portal.inquiry.subject.label,Betreff,de_DE
self_service_portal.inquiry.mail.trans.ssp_inquiry_list_page,View Inquiries,en_US
self_service_portal.inquiry.mail.trans.ssp_inquiry_list_page,Anfragen anzeigen,de_DE
self_service_portal.inquiry.mail.trans.ssp_inquiry_approved.salutation,Hello %name%,en_US
self_service_portal.inquiry.mail.trans.ssp_inquiry_approved.salutation,Hallo %name%,de_DE
self_service_portal.inquiry.mail.trans.ssp_inquiry_approved.subject,The status of your inquiry %reference% has been changed.,en_US
self_service_portal.inquiry.mail.trans.ssp_inquiry_approved.subject,Der Status Ihrer Anfrage %reference% wurde geändert,de_DE
self_service_portal.inquiry.mail.trans.ssp_inquiry_approved.main_text,Your inquiry %reference% was approved.,en_US
self_service_portal.inquiry.mail.trans.ssp_inquiry_approved.main_text,Ihre Anfrage %reference% wurde genehmigt.,de_DE
self_service_portal.inquiry.mail.trans.ssp_inquiry_rejected.salutation,Hello %name%,en_US
self_service_portal.inquiry.mail.trans.ssp_inquiry_rejected.salutation,Hallo %name%,de_DE
self_service_portal.inquiry.mail.trans.ssp_inquiry_rejected.subject,The status of your inquiry %reference% has been changed.,en_US
self_service_portal.inquiry.mail.trans.ssp_inquiry_rejected.subject,Der Status Ihrer Anfrage %reference% wurde geändert,de_DE
self_service_portal.inquiry.mail.trans.ssp_inquiry_rejected.main_text,Your inquiry %reference% was rejected.,en_US
self_service_portal.inquiry.mail.trans.ssp_inquiry_rejected.main_text,Ihre Anfrage %reference% wurde abgelehnt.,de_DE
self_service_portal.inquiry.description.label,Description,en_US
self_service_portal.inquiry.description.label,Beschreibung,de_DE
self_service_portal.inquiry.files.label,File Upload,en_US
self_service_portal.inquiry.files.label,Datei-Upload,de_DE
self_service_portal.inquiry.type.general,General,en_US
self_service_portal.inquiry.type.general,Allgemein,de_DE
self_service_portal.inquiry.type.order,Order Claim,en_US
self_service_portal.inquiry.type.order,Bestellreklamation,de_DE
customer.account.ssp_inquiries,Inquiries,en_US
customer.account.ssp_inquiries,Anfragen,de_DE
customer.self_service_portal.inquiry.create_ssp_inquiry,Create inquiry,en_US
customer.self_service_portal.inquiry.create_ssp_inquiry,Anfrage stellen,de_DE
self_service_portal.inquiry.validation.type.invalid,Invalid inquiry type.,en_US
self_service_portal.inquiry.validation.type.invalid,Ungültiger Anfragetyp.,de_DE
self_service_portal.inquiry.list.widget.title,Inquiries,en_US
self_service_portal.inquiry.list.widget.title,Anfragen,de_DE
customer.self_service_portal.inquiry.list,Inquiries,en_US
customer.self_service_portal.inquiry.list,Anfragen,de_DE
self_service_portal.inquiry.file.file_not_found,File not found,en_US
self_service_portal.inquiry.file.file_not_found,Datei wurde nicht gefunden,de_DE
self_service_portal.inquiry.file.mime_type.error,Invalid file type.,en_US
self_service_portal.inquiry.file.mime_type.error,Ungültiger Dateityp.,de_DE
self_service_portal.inquiry.validation.company_user.not_set,Company user is missing.,en_US
self_service_portal.inquiry.validation.company_user.not_set,Firmenbenutzer fehlt.,de_DE
self_service_portal.inquiry.validation.type.not_set,Inquiry type is missing.,en_US
self_service_portal.inquiry.validation.type.not_set,Anfragetyp fehlt.,de_DE
self_service_portal.inquiry.validation.subject.not_set,Inquiry subject is missing.,en_US
self_service_portal.inquiry.validation.subject.not_set,Betreff der Anfrage fehlt.,de_DE
self_service_portal.inquiry.validation.description.not_set,Inquiry description is missing.,en_US
self_service_portal.inquiry.validation.description.not_set,Anfragebeschreibung fehlt.,de_DE
self_service_portal.inquiry.error.file.format.invalid,An array of files is expected.,en_US
self_service_portal.inquiry.error.file.format.invalid,Ein Array von Dateien wurde erwartet.,de_DE
self_service_portal.inquiry.error.file.count.invalid,Invalid number of files. Maximum number of files: {{ limit }},en_US
self_service_portal.inquiry.error.file.count.invalid,Ungültige Dateianzahl. Maximale Anzahl von Dateien: {{ limit }},de_DE
self_service_portal.inquiry.error.file.size.invalid,"Invalid total file size. The maximum allowed size for all files is %maxSize%, but %size% was uploaded.",en_US
self_service_portal.inquiry.error.file.size.invalid,"Ungültige Gesamtdateigröße. Die maximal zulässige Größe für alle Dateien beträgt %maxSize%, aber es wurde %size% hochgeladen.",de_DE
self_service_portal.inquiry.error.status_change,The status change failed.,en_US
self_service_portal.inquiry.error.status_change,Die Statusänderung ist fehlgeschlagen.,de_DE
self_service_portal.inquiry.submit.button,Submit inquiry,en_US
self_service_portal.inquiry.submit.button,Anfrage senden,de_DE
customer.self_service_portal.inquiry.create.button,Create inquiry,en_US
customer.self_service_portal.inquiry.create.button,Anfrage stellen,de_DE
customer.self_service_portal.inquiry.all_ssp_inquiries,Inquiries,en_US
customer.self_service_portal.inquiry.all_ssp_inquiries,Anfragen,de_DE
customer.self_service_portal.inquiry.list.reference,Reference,en_US
customer.self_service_portal.inquiry.list.reference,Referenz,de_DE
customer.self_service_portal.inquiry.list.type,Type,en_US
customer.self_service_portal.inquiry.list.type,Typ,de_DE
customer.self_service_portal.inquiry.list.subject,Subject,en_US
customer.self_service_portal.inquiry.list.subject,Betreff,de_DE
customer.self_service_portal.inquiry.list.owner,Owner,en_US
customer.self_service_portal.inquiry.list.owner,Eingentümer,de_DE
customer.self_service_portal.inquiry.list.date_created,Date,en_US
customer.self_service_portal.inquiry.list.date_created,Datum,de_DE
customer.self_service_portal.inquiry.list.status,Status,en_US
customer.self_service_portal.inquiry.list.status,Status,de_DE
self_service_portal.inquiry.list.filter.type.placeholder,Select type,en_US
self_service_portal.inquiry.list.filter.type.placeholder,Typ auswählen,de_DE
self_service_portal.inquiry.list.filter.type.label,Type,en_US
self_service_portal.inquiry.list.filter.type.label,Typ,de_DE
self_service_portal.inquiry.list.filter.status.placeholder,Select status,en_US
self_service_portal.inquiry.list.filter.status.placeholder,Status auswählen,de_DE
self_service_portal.inquiry.list.filter.status.label,Status,en_US
self_service_portal.inquiry.list.filter.status.label,Status,de_DE
customer.account.no_ssp_inquiries,You do not have inquiries yet.,en_US
customer.account.no_ssp_inquiries,Sie haben noch keine Anfragen.,de_DE
customer.self_service_portal.inquiry.view_ssp_inquiry,View,en_US
customer.self_service_portal.inquiry.view_ssp_inquiry,Ansehen,de_DE
customer.ssp_inquiries.date_from,Date from,en_US
customer.ssp_inquiries.date_from,Datum von,de_DE
customer.ssp_inquiries.date_to,Date to,en_US
customer.ssp_inquiries.date_to,Datum bis,de_DE
customer.account.self_service_portal.inquiry.details,Inquiry,en_US
customer.account.self_service_portal.inquiry.details,Anfrage,de_DE
customer.self_service_portal.inquiry.details.reference,Reference,en_US
customer.self_service_portal.inquiry.details.reference,Referenz,de_DE
customer.self_service_portal.inquiry.details.date,Date,en_US
customer.self_service_portal.inquiry.details.date,Datum,de_DE
customer.self_service_portal.inquiry.details.status,Status,en_US
customer.self_service_portal.inquiry.details.status,Status,de_DE
customer.self_service_portal.inquiry.details,Inquiry Details,en_US
customer.self_service_portal.inquiry.details,Anfragedetails,de_DE
customer.self_service_portal.inquiry.details.type,Type,en_US
customer.self_service_portal.inquiry.details.type,Typ,de_DE
customer.self_service_portal.inquiry.details.subject,Subject,en_US
customer.self_service_portal.inquiry.details.subject,Betreff,de_DE
customer.self_service_portal.inquiry.details.description,Description,en_US
customer.self_service_portal.inquiry.details.description,Beschreibung,de_DE
customer.self_service_portal.inquiry.owner,Owner,en_US
customer.self_service_portal.inquiry.owner,Eigentümer,de_DE
customer.self_service_portal.inquiry.details.first_name,First Name,en_US
customer.self_service_portal.inquiry.details.first_name,Vorname,de_DE
customer.self_service_portal.inquiry.details.last_name,Last Name,en_US
customer.self_service_portal.inquiry.details.last_name,Nachname,de_DE
customer.self_service_portal.inquiry.details.email,E-mail,en_US
customer.self_service_portal.inquiry.details.email,E-Mail,de_DE
customer.self_service_portal.inquiry.details.company,Company / Business Unit,en_US
customer.self_service_portal.inquiry.details.company,Firma / Geschäftseinheit,de_DE
customer.self_service_portal.inquiry.details.file.name,File name,en_US
customer.self_service_portal.inquiry.details.file.name,Dateiname,de_DE
customer.self_service_portal.inquiry.details.file.size,Size,en_US
customer.self_service_portal.inquiry.details.file.size,Größe,de_DE
customer.self_service_portal.inquiry.details.file.extension,Type,en_US
customer.self_service_portal.inquiry.details.file.extension,Typ,de_DE
customer.self_service_portal.inquiry.details.file.download,Download,en_US
customer.self_service_portal.inquiry.details.file.download,Herunterladen,de_DE
self_service_portal.inquiry.file.unavailable,File is not available,en_US
self_service_portal.inquiry.file.unavailable,Datei ist nicht verfügbar,de_DE
customer.self_service_portal.inquiry.details.files,Files,en_US
customer.self_service_portal.inquiry.details.files,Dateien,de_DE
self_service_portal.inquiry.order.create_ssp_inquiry,Claim,en_US
self_service_portal.inquiry.order.create_ssp_inquiry,Anspruch stellen,de_DE
self_service_portal.inquiry.order_reference.label,Order Reference,en_US
self_service_portal.inquiry.order_reference.label,Bestellnummer,de_DE
customer.self_service_portal.inquiry.details.order_reference,Order Reference,en_US
customer.self_service_portal.inquiry.details.order_reference,Bestellnummer,de_DE
self_service_portal.inquiry.error.company_user_not_found,Company user not found.,en_US
self_service_portal.inquiry.error.company_user_not_found,Firmenbenutzer nicht gefunden.,de_DE
self_service_portal.inquiry.type.general-question,General Question,en_US
self_service_portal.inquiry.type.general-question,Allgemeine Frage,de_DE
self_service_portal.inquiry.type.general-ssp_inquiry,General Inquiry,en_US
self_service_portal.inquiry.type.general-ssp_inquiry,Allgemeine Anfrage,de_DE
self_service_portal.inquiry.type.ssp_asset,Asset,en_US
self_service_portal.inquiry.type.ssp_asset,Asset,de_DE
customer.self_service_portal.inquiry.details.ssp_asset_reference,Asset Reference,en_US
customer.self_service_portal.inquiry.details.ssp_asset_reference,Asset-Referenz,de_DE
customer.self_service_portal.inquiry.ssp_asset.details,Asset Details,en_US
customer.self_service_portal.inquiry.ssp_asset.details,Asset-Details,de_DE
customer.self_service_portal.inquiry.details.ssp_asset_not_available,Asset not available,en_US
customer.self_service_portal.inquiry.details.ssp_asset_not_available,Asset nicht verfügbar,de_DE
self_service_portal.asset.error.reference_not_found,Asset reference not found,en_US
self_service_portal.asset.error.reference_not_found,Asset-Referenz nicht gefunden,de_DE
self_service_portal.asset.error.company_user_not_found,Company user not found,en_US
self_service_portal.asset.error.company_user_not_found,Firmenbenutzer nicht gefunden,de_DE
customer.self_service_portal.inquiry.create.button,Create inquiry,en_US
customer.self_service_portal.inquiry.create.button,Anfrage stellen,de_DE
self_service_portal.inquiry.ssp_asset_reference.label,Asset Reference,en_US
self_service_portal.inquiry.ssp_asset_reference.label,Asset-Referenz,de_DE
customer.self_service_portal.inquiry.details.ssp_asset_name,Asset Name,en_US
customer.self_service_portal.inquiry.details.ssp_asset_name,Asset-Name,de_DE
ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text,Your inquiry %reference% was approved.,en_US
ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text,Ihre Anfrage %reference% wurde genehmigt.,de_DE
ssp_inquiry.mail.trans.ssp_inquiry_list_page,View Inquiries,en_US
ssp_inquiry.mail.trans.ssp_inquiry_list_page,Anfragen anzeigen,de_DE
ssp_dashboard.general.inquiries,Pending Inquiries,en_US
ssp_dashboard.general.inquiries,Ausstehende Ansprüche,de_DE
```

</details>

2. Append `ssp_inquiry.csv`:

```csv
DE-INQR--1,DE,general,Spryker--8,Request for documentation,Please provide detailed documentation on the warranty and return policies for the products purchased under my account.
DE-INQR--2,DE,general,Spryker--8,Product catalog issue,I noticed that several products in the catalog are missing specifications and images. This makes it difficult to make informed purchasing decisions. Please update the product details.
```

3. Append `cms_block.csv`:

<details>
  <summary>cms_block.csv</summary>

```csv
{% raw %}cms-block-email--customer_email_change_notification--html,customer_email_change_notification--html,HTML Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.html.twig,1,,,,,,,"<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <!--[if gte mso 9]> <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%""> <![endif]--> <tbody class=""sprykerBoxedTextBlockOuter""> <tr> <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <!--[if gte mso 9]> <td align=""center"" valign=""top"" ""> <![endif]--> <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""> <tbody> <tr> <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0""> <tbody> <tr> <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top""> <p style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"">{{ 'mail.customer.customer_email_change_notification.text' | trans }}</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if gte mso 9]> </td> <![endif]--> <!--[if gte mso 9]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <tbody class=""sprykerTextBlockOuter""> <tr> <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top""><br> <!--[if mso]> </td> <![endif]--> <!--[if mso]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE -->","<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <!--[if gte mso 9]> <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%""> <![endif]--> <tbody class=""sprykerBoxedTextBlockOuter""> <tr> <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <!--[if gte mso 9]> <td align=""center"" valign=""top"" ""> <![endif]--> <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""> <tbody> <tr> <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0""> <tbody> <tr> <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top""> <p style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"">{{ 'mail.customer.customer_email_change_notification.text' | trans }}</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if gte mso 9]> </td> <![endif]--> <!--[if gte mso 9]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <tbody class=""sprykerTextBlockOuter""> <tr> <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top""><br> <!--[if mso]> </td> <![endif]--> <!--[if mso]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE -->"
cms-block-email--company-status--text,company-status--text,TEXT Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.text.twig,1,,,,,,,"{{ 'mail.trans.common.hello_for_first_name' | trans }} {{ mail.customer.firstName }} {{ mail.customer.lastName }},  {{ 'mail.trans.company_status.title' | trans }} {{ ('mail.company.status.' ~ mail.company.status) | trans }}","{{ 'mail.trans.common.hello_for_first_name' | trans }} {{ mail.customer.firstName }} {{ mail.customer.lastName }},  {{ 'mail.trans.company_status.title' | trans }} {{ ('mail.company.status.' ~ mail.company.status) | trans }}"
cms-block-email--ssp-inquiry-approved--html,ssp-inquiry-approved--html,HTML Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.html.twig,1,,,,,,,"<table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><h1 style=""text-align:center;margin:0;color:#202020;font-family:Helvetica;font-size:20px;font-weight:normal;line-height:125%;padding:15px"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.salutation' | trans({'%name%':mail.customer.firstName~' '~mail.customer.lastName})}}</h1></td></tr></tbody></table></td></tr></tbody></table><table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><p style=""text-align:center;margin:0;font-weight:bold"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text' | trans({'%reference%':mail.sspInquiry.reference})}}</p></td></tr><tr><td style=""padding-top:18px;padding-bottom:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center""><table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse:separate!important;border-radius:2px;background-color:#1EBEA0;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody><tr><td class=""sprykerButtonContent"" style=""font-family:Helvetica,Helvetica,Arial,Verdana,sans-serif;font-size:14px;padding:13px 18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""middle"" align=""center""><a class=""sprykerButton"" href=""{{ mail.sspInquiryUrl }}"" target=""_blank"" style=""font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#FFFFFF;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;display:block"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>","<table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><h1 style=""text-align:center;margin:0;color:#202020;font-family:Helvetica;font-size:20px;font-weight:normal;line-height:125%;padding:15px"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.salutation' | trans({'%name%':mail.customer.firstName~' '~mail.customer.lastName})}}</h1></td></tr></tbody></table></td></tr></tbody></table><table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><p style=""text-align:center;margin:0;font-weight:bold"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text' | trans({'%reference%':mail.sspInquiry.reference})}}</p></td></tr><tr><td style=""padding-top:18px;padding-bottom:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center""><table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse:separate!important;border-radius:2px;background-color:#1EBEA0;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody><tr><td class=""sprykerButtonContent"" style=""font-family:Helvetica,Helvetica,Arial,Verdana,sans-serif;font-size:14px;padding:13px 18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""middle"" align=""center""><a class=""sprykerButton"" href=""{{ mail.sspInquiryUrl }}"" target=""_blank"" style=""font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#FFFFFF;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;display:block"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>"
cms-block-email--ssp-inquiry-approved--text,ssp-inquiry-approved--text,TEXT Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.text.twig,1,,,,,,,"{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.salutation' | trans({'%name%' : mail.customer.firstName ~ ' ' ~ mail.customer.lastName})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text' | trans({'%reference%' : mail.sspInquiry.reference})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}: {{ mail.sspInquiryUrl }}","{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.salutation' | trans({'%name%' : mail.customer.firstName ~ ' ' ~ mail.customer.lastName})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text' | trans({'%reference%' : mail.sspInquiry.reference})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}: {{ mail.sspInquiryUrl }}"
cms-block-email--ssp-inquiry-rejected--html,ssp-inquiry-rejected--html,HTML Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.html.twig,1,,,,,,,"<table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><h1 style=""text-align:center;margin:0;color:#202020;font-family:Helvetica;font-size:20px;font-weight:normal;line-height:125%;padding:15px"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation' | trans({'%name%':mail.customer.firstName~' '~mail.customer.lastName})}}</h1></td></tr></tbody></table></td></tr></tbody></table><table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><p style=""text-align:center;margin:0;font-weight:bold"">{{ 'ssp_inquiry.mail.trans.sspInquiry_rejected.main_text' | trans({'%reference%':mail.sspInquiry.reference})}}</p></td></tr><tr><td style=""padding-top:18px;padding-bottom:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center""><table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse:separate!important;border-radius:2px;background-color:#1EBEA0;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody><tr><td class=""sprykerButtonContent"" style=""font-family:Helvetica,Helvetica,Arial,Verdana,sans-serif;font-size:14px;padding:13px 18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""middle"" align=""center""><a class=""sprykerButton"" href=""{{ mail.sspInquiryUrl }}"" target=""_blank"" style=""font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#FFFFFF;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;display:block"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>","<table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><h1 style=""text-align:center;margin:0;color:#202020;font-family:Helvetica;font-size:20px;font-weight:normal;line-height:125%;padding:15px"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation' | trans({'%name%':mail.customer.firstName~' '~mail.customer.lastName})}}</h1></td></tr></tbody></table></td></tr></tbody></table><table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><p style=""text-align:center;margin:0;font-weight:bold"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.main_text' | trans({'%reference%':mail.sspInquiry.reference})}}</p></td></tr><tr><td style=""padding-top:18px;padding-bottom:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center""><table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse:separate!important;border-radius:2px;background-color:#1EBEA0;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody><tr><td class=""sprykerButtonContent"" style=""font-family:Helvetica,Helvetica,Arial,Verdana,sans-serif;font-size:14px;padding:13px 18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""middle"" align=""center""><a class=""sprykerButton"" href=""{{ mail.sspInquiryUrl }}"" target=""_blank"" style=""font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#FFFFFF;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;display:block"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>"
cms-block-email--ssp-inquiry-rejected--text,ssp-inquiry-rejected--text,TEXT Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.text.twig,1,,,,,,,"{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation' | trans({'%name%' : mail.customer.firstName ~ ' ' ~ mail.customer.lastName})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.main_text' | trans({'%reference%' : mail.sspInquiry.reference})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}: {{ mail.sspInquiryUrl }}","{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation' | trans({'%name%' : mail.customer.firstName ~ ' ' ~ mail.customer.lastName})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.main_text' | trans({'%reference%' : mail.sspInquiry.reference})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}: {{ mail.sspInquiryUrl }}"{% endraw %}
```

</details>

4. Append `cms_block_store.csv`:

```csv
cms-block-email--ssp-inquiry-approved--html,DE
cms-block-email--ssp-inquiry-approved--text,DE
cms-block-email--ssp-inquiry-rejected--html,DE
cms-block-email--ssp-inquiry-rejected--text,DE
```

## Import data

Import glossary and demo data:

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

## Set up behavior

| PLUGIN                                     | SPECIFICATION                                                                  | PREREQUISITES | NAMESPACE                                                                        |
|--------------------------------------------|--------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------|
| CreateSspInquiryPermissionPlugin           | Allows creating inquiries.                                                     |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                        |
| ViewBusinessUnitSspInquiryPermissionPlugin | Allows access to inquiries in the same business unit.                          |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                        |
| ViewCompanySspInquiryPermissionPlugin      | Allows access to inquiries in the same company.                                |               | SprykerFeature\Shared\SelfServicePortal\Plugin\Permission                        |
| SspInquiryRouteProviderPlugin              | Provides Yves routes for the SSP files feature.                                |               | SprykerFeature\Yves\SelfServicePortal\Plugin\Router                              |
| SspInquiryRestrictionHandlerPlugin         | Restricts access to inquiries and inquiry details pages for non-company users. |               | SprykerFeature\Yves\SelfServicePortal\Plugin\ShopApplication                     |
| FileSizeFormatterTwigPlugin                | Adds a Twig filter to format file sizes in a human-readable format.               |               | SprykerFeature\Zed\SelfServicePortal\Communication\Twig                          |
| SspInquiryDataImportPlugin                 | Introduces the `ssp-inquiry` import type.                                      |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport             |
| SspInquiryManagementFilePreDeletePlugin    | Ensures files are deleted when an inquiry is removed.                          |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\FileManager            |
| SspInquiryApprovedMailTypeBuilderPlugin    | Sends an email on inquiry approval.                                            |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Mail                   |
| SspInquiryRejectedMailTypeBuilderPlugin    | Sends an email on inquiry rejection.                                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Mail                   |
| SspInquiryDashboardDataProviderPlugin      | Adds the inquiries table to the SSP Dashboard.                                 |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspDashboardManagement |
| SspInquirySspAssetManagementExpanderPlugin | Adds the inquiries table to Assets.                                            |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspAssetManagement     |
| SspInquiryStateMachineHandlerPlugin        | State Machine handler for inquiry processing.                                  |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\StateMachine           |
| ApproveSspInquiryCommandPlugin             | State Machine command that handles inquiry approval.                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspInquiryManagement   |
| RejectSspInquiryCommandPlugin              | State Machine command that handles inquiry rejection.                          |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\SspInquiryManagement   |

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

<!--

{% info_block warningBox "Verification" %}
 
{% endinfo_block %}

-->

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

Verify permission management:

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

Verify permissions on Storefront:

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

1. In the Back Office, go to **Sales** > **Inquiries** page. Make sure the following applies:

- The inquiry you've created on the Storefront is displayed in the list.
- You can filter the list by **Inquiry status** and **Inquiry type**.

2. Click **View** next to an inquiry.
   Make sure that, in the **Status** section, **Start review** and **Reject** buttons are displayed.
3. Click **Start review**.
   Make sure the inquiry status changes to **In review**.

{% endinfo_block %}
