
# Install the SSP Inquiry Management Feature

This document describes how to install the *SSP Inquiry Management* feature in your Spryker project.

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
composer require spryker-feature/ssp-inquiry-management:"^0.1.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Check that the following packages are now listed in `composer.lock`:

| MODULE                 | EXPECTED DIRECTORY                               |
|------------------------|--------------------------------------------------|
| SspFileManagement      | vendor/spryker-feature/ssp-file-management       |

{% endinfo_block %}

## Set up configuration

Update your `config/Shared/config_default.php` (or CI/Docker equivalents):

| CONFIGURATION                                              | SPECIFICATION                                     | NAMESPACE                                   |
|------------------------------------------------------------|---------------------------------------------------|---------------------------------------------|
| FileSystemConstants::FILESYSTEM_SERVICE                    | Flysystem configuration for file management.      | Spryker\Shared\FileSystem                   |
| SspInquiryManagementConstants::BASE_URL_YVES               | Yves URL used in mailing templates.               | SprykerFeature\Shared\SspInquiryManagement  |
| SspInquiryManagementConstants::DEFAULT_TOTAL_FILE_MAX_SIZE | Configurable total file upload limits.            | SprykerFeature\Shared\SspInquiryManagement  |
| SspInquiryManagementConstants::DEFAULT_FILE_MAX_SIZE       | Configurable single file upload size.             | SprykerFeature\Shared\SspInquiryManagement  |

**config/Shared/config_default.php**
```php
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

---

## Add translations

1. Append the glossary:

```csv
permission.name.CreateSspInquiryPermissionPlugin,Create inquiry,en_US
permission.name.CreateSspInquiryPermissionPlugin,Anfrage stellen,de_DE
permission.name.ViewCompanySspInquiryPermissionPlugin,View company inquiries,en_US
permission.name.ViewCompanySspInquiryPermissionPlugin,Anfragen der Firma anzeigen,de_DE
permission.name.ViewBusinessUnitSspInquiryPermissionPlugin,View business unit inquiries,en_US
permission.name.ViewBusinessUnitSspInquiryPermissionPlugin,Anfragen der Geschäftseinheit anzeigen,de_DE
ssp_inquiry.success.created,Inquiry has been submitted successfully,en_US
ssp_inquiry.success.created,Anfrage wurde erfolgreich übermittelt,de_DE
ssp_inquiry.type.label,Type,en_US
ssp_inquiry.type.label,Typ,de_DE
ssp_inquiry.access.denied,Access denied.,en_US
ssp_inquiry.access.denied,Zugriff verweigert.,de_DE
ssp_inquiry.success.canceled,Inquiry has been canceled.,en_US
ssp_inquiry.success.canceled,Die Anfrage wurde storniert.,de_DE
ssp_inquiry.cancel,Cancel inquiry,en_US
ssp_inquiry.cancel,Anfrage stornieren,de_DE
ssp_inquiry.create.select_type,Select type,en_US
ssp_inquiry.create.select_type,Typ auswählen,de_DE
ssp_inquiry.status.pending,Pending,en_US
ssp_inquiry.status.pending,Ausstehend,de_DE
ssp_inquiry.status.in_review,In Review,en_US
ssp_inquiry.status.in_review,In Bearbeitung,de_DE
ssp_inquiry.status.approved,Approved,en_US
ssp_inquiry.status.approved,Genehmigt,de_DE
ssp_inquiry.status.rejected,Rejected,en_US
ssp_inquiry.status.rejected,Abgelehnt,de_DE
ssp_inquiry.status.canceled,Canceled,en_US
ssp_inquiry.status.canceled,Storniert,de_DE
ssp_inquiry.subject.label,Subject,en_US
ssp_inquiry.subject.label,Betreff,de_DE
ssp_inquiry.mail.trans.ssp_inquiry_list_page,View Inquiries,en_US
ssp_inquiry.mail.trans.ssp_inquiry_list_page,Anfragen anzeigen,de_DE
ssp_inquiry.mail.trans.ssp_inquiry_approved.salutation,Hello %name%,en_US
ssp_inquiry.mail.trans.ssp_inquiry_approved.salutation,Hallo %name%,de_DE
ssp_inquiry.mail.trans.ssp_inquiry_approved.subject,The status of your inquiry %reference% has been changed.,en_US
ssp_inquiry.mail.trans.ssp_inquiry_approved.subject,Der Status Ihrer Anfrage %reference% wurde geändert,de_DE
ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text,Your inquiry %reference% was approved.,en_US
ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text,Ihre Anfrage %reference% wurde genehmigt.,de_DE
ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation,Hello %name%,en_US
ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation,Hallo %name%,de_DE
ssp_inquiry.mail.trans.ssp_inquiry_rejected.subject,The status of your inquiry %reference% has been changed.,en_US
ssp_inquiry.mail.trans.ssp_inquiry_rejected.subject,Der Status Ihrer Anfrage %reference% wurde geändert,de_DE
ssp_inquiry.mail.trans.ssp_inquiry_rejected.main_text,Your inquiry %reference% was rejected.,en_US
ssp_inquiry.mail.trans.ssp_inquiry_rejected.main_text,Ihre Anfrage %reference% wurde abgelehnt.,de_DE
ssp_inquiry.description.label,Description,en_US
ssp_inquiry.description.label,Beschreibung,de_DE
ssp_inquiry.files.label,File Upload,en_US
ssp_inquiry.files.label,Datei-Upload,de_DE
ssp_inquiry.type.general,General,en_US
ssp_inquiry.type.general,Allgemein,de_DE
ssp_inquiry.type.order,Order Claim,en_US
ssp_inquiry.type.order,Bestellreklamation,de_DE
customer.account.ssp_inquiries,Inquiries,en_US
customer.account.ssp_inquiries,Anfragen,de_DE
customer.ssp_inquiry.create_ssp_inquiry,Create inquiry,en_US
customer.ssp_inquiry.create_ssp_inquiry,Anfrage stellen,de_DE
ssp_inquiry.validation.type.invalid,Invalid inquiry type.,en_US
ssp_inquiry.validation.type.invalid,Ungültiger Anfragetyp.,de_DE
ssp_inquiry.list.widget.title,Inquiries,en_US
ssp_inquiry.list.widget.title,Anfragen,de_DE
customer.ssp_inquiry.list,Inquiries,en_US
customer.ssp_inquiry.list,Anfragen,de_DE
ssp_inquiry.file.file_not_found,File not found,en_US
ssp_inquiry.file.file_not_found,Datei wurde nicht gefunden,de_DE
ssp_inquiry.file.mime_type.error,Invalid file type.,en_US
ssp_inquiry.file.mime_type.error,Ungültiger Dateityp.,de_DE
ssp_inquiry.validation.company_user.not_set,Company user is missing.,en_US
ssp_inquiry.validation.company_user.not_set,Firmenbenutzer fehlt.,de_DE
ssp_inquiry.validation.type.not_set,Inquiry type is missing.,en_US
ssp_inquiry.validation.type.not_set,Anfragetyp fehlt.,de_DE
ssp_inquiry.validation.subject.not_set,Inquiry subject is missing.,en_US
ssp_inquiry.validation.subject.not_set,Betreff der Anfrage fehlt.,de_DE
ssp_inquiry.validation.description.not_set,Inquiry description is missing.,en_US
ssp_inquiry.validation.description.not_set,Anfragebeschreibung fehlt.,de_DE
ssp_inquiry.error.file.format.invalid,An array of files is expected.,en_US
ssp_inquiry.error.file.format.invalid,Ein Array von Dateien wurde erwartet.,de_DE
ssp_inquiry.error.file.count.invalid,Invalid number of files. Maximum number of files: {{ limit }},en_US
ssp_inquiry.error.file.count.invalid,Ungültige Dateianzahl. Maximale Anzahl von Dateien: {{ limit }},de_DE
ssp_inquiry.error.file.size.invalid,"Invalid total file size. The maximum allowed size for all files is %maxSize%, but %size% was uploaded.",en_US
ssp_inquiry.error.file.size.invalid,"Ungültige Gesamtdateigröße. Die maximal zulässige Größe für alle Dateien beträgt %maxSize%, aber es wurde %size% hochgeladen.",de_DE
ssp_inquiry.error.status_change,The status change failed.,en_US
ssp_inquiry.error.status_change,Die Statusänderung ist fehlgeschlagen.,de_DE
ssp_inquiry.submit.button,Submit inquiry,en_US
ssp_inquiry.submit.button,Anfrage senden,de_DE
customer.ssp_inquiry.create.button,Create inquiry,en_US
customer.ssp_inquiry.create.button,Anfrage stellen,de_DE
customer.ssp_inquiry.all_ssp_inquiries,Inquiries,en_US
customer.ssp_inquiry.all_ssp_inquiries,Anfragen,de_DE
customer.ssp_inquiry.list.reference,Reference,en_US
customer.ssp_inquiry.list.reference,Referenz,de_DE
customer.ssp_inquiry.list.type,Type,en_US
customer.ssp_inquiry.list.type,Typ,de_DE
customer.ssp_inquiry.list.subject,Subject,en_US
customer.ssp_inquiry.list.subject,Betreff,de_DE
customer.ssp_inquiry.list.owner,Owner,en_US
customer.ssp_inquiry.list.owner,Eingentümer,de_DE
customer.ssp_inquiry.list.date_created,Date,en_US
customer.ssp_inquiry.list.date_created,Datum,de_DE
customer.ssp_inquiry.list.status,Status,en_US
customer.ssp_inquiry.list.status,Status,de_DE
ssp_inquiry.list.filter.type.placeholder,Select type,en_US
ssp_inquiry.list.filter.type.placeholder,Typ auswählen,de_DE
ssp_inquiry.list.filter.type.label,Type,en_US
ssp_inquiry.list.filter.type.label,Typ,de_DE
ssp_inquiry.list.filter.status.placeholder,Select status,en_US
ssp_inquiry.list.filter.status.placeholder,Status auswählen,de_DE
ssp_inquiry.list.filter.status.label,Status,en_US
ssp_inquiry.list.filter.status.label,Status,de_DE
customer.account.no_ssp_inquiries,You do not have inquiries yet.,en_US
customer.account.no_ssp_inquiries,Sie haben noch keine Anfragen.,de_DE
customer.ssp_inquiry.view_ssp_inquiry,View,en_US
customer.ssp_inquiry.view_ssp_inquiry,Ansehen,de_DE
ssp_inquiry.list.filter.apply,Apply,en_US
ssp_inquiry.list.filter.apply,Anwenden,de_DE
customer.ssp_inquiries.date_from,Date from,en_US
customer.ssp_inquiries.date_from,Datum von,de_DE
customer.ssp_inquiries.date_to,Date to,en_US
customer.ssp_inquiries.date_to,Datum bis,de_DE
customer.account.ssp_inquiry.details,Inquiry,en_US
customer.account.ssp_inquiry.details,Anfrage,de_DE
customer.ssp_inquiry.details.reference,Reference,en_US
customer.ssp_inquiry.details.reference,Referenz,de_DE
customer.ssp_inquiry.details.date,Date,en_US
customer.ssp_inquiry.details.date,Datum,de_DE
customer.ssp_inquiry.details.status,Status,en_US
customer.ssp_inquiry.details.status,Status,de_DE
customer.ssp_inquiry.details,Inquiry Details,en_US
customer.ssp_inquiry.details,Anfragedetails,de_DE
customer.ssp_inquiry.details.type,Type,en_US
customer.ssp_inquiry.details.type,Typ,de_DE
customer.ssp_inquiry.details.subject,Subject,en_US
customer.ssp_inquiry.details.subject,Betreff,de_DE
customer.ssp_inquiry.details.description,Description,en_US
customer.ssp_inquiry.details.description,Beschreibung,de_DE
customer.ssp_inquiry.owner,Owner,en_US
customer.ssp_inquiry.owner,Eigentümer,de_DE
customer.ssp_inquiry.details.first_name,First Name,en_US
customer.ssp_inquiry.details.first_name,Vorname,de_DE
customer.ssp_inquiry.details.last_name,Last Name,en_US
customer.ssp_inquiry.details.last_name,Nachname,de_DE
customer.ssp_inquiry.details.email,E-mail,en_US
customer.ssp_inquiry.details.email,E-Mail,de_DE
customer.ssp_inquiry.details.company,Company / Business Unit,en_US
customer.ssp_inquiry.details.company,Firma / Geschäftseinheit,de_DE
customer.ssp_inquiry.details.file.name,File name,en_US
customer.ssp_inquiry.details.file.name,Dateiname,de_DE
customer.ssp_inquiry.details.file.size,Size,en_US
customer.ssp_inquiry.details.file.size,Größe,de_DE
customer.ssp_inquiry.details.file.extension,Type,en_US
customer.ssp_inquiry.details.file.extension,Typ,de_DE
customer.ssp_inquiry.details.file.download,Download,en_US
customer.ssp_inquiry.details.file.download,Herunterladen,de_DE
ssp_inquiry.file.unavailable,File is not available,en_US
ssp_inquiry.file.unavailable,Datei ist nicht verfügbar,de_DE
customer.ssp_inquiry.details.files,Files,en_US
customer.ssp_inquiry.details.files,Dateien,de_DE
ssp_inquiry.order.create_ssp_inquiry,Inquiry,en_US
ssp_inquiry.order.create_ssp_inquiry,Reklamation,de_DE
ssp_inquiry.order_reference.label,Order Reference,en_US
ssp_inquiry.order_reference.label,Bestellnummer,de_DE
customer.ssp_inquiry.details.order_reference,Order Reference,en_US
customer.ssp_inquiry.details.order_reference,Bestellnummer,de_DE
ssp_inquiry.error.company_user_not_found,Company user not found.,en_US
ssp_inquiry.error.company_user_not_found,Firmenbenutzer nicht gefunden.,de_DE
ssp_inquiry.type.general-question,General Question,en_US
ssp_inquiry.type.general-question,Allgemeine Frage,de_DE
ssp_inquiry.type.general-ssp_inquiry,General Inquiry,en_US
ssp_inquiry.type.general-ssp_inquiry,Allgemeine Anfrage,de_DE
ssp_inquiry.type.ssp_asset,Asset,en_US
ssp_inquiry.type.ssp_asset,Asset,de_DE
customer.ssp_inquiry.details.ssp_asset_reference,Asset Reference,en_US
customer.ssp_inquiry.details.ssp_asset_reference,Asset-Referenz,de_DE
customer.ssp_inquiry.ssp_asset.details,Asset Details,en_US
customer.ssp_inquiry.ssp_asset.details,Asset-Details,de_DE
customer.ssp_inquiry.details.ssp_asset_not_available,Asset not available,en_US
customer.ssp_inquiry.details.ssp_asset_not_available,Asset nicht verfügbar,de_DE
customer.ssp_inquiry.create.button,Create inquiry,en_US
customer.ssp_inquiry.create.button,Anfrage stellen,de_DE
ssp_inquiry.ssp_asset_reference.label,Asset Reference,en_US
ssp_inquiry.ssp_asset_reference.label,Asset-Referenz,de_DE
customer.ssp_inquiry.details.ssp_asset_name,Asset Name,en_US
customer.ssp_inquiry.details.ssp_asset_name,Asset-Name,de_DE
ssp_dashboard.general.inquiries,Pending Inquiries,en_US
ssp_dashboard.general.inquiries,Ausstehende Ansprüche,de_DE
```
2. Append the ssp_inquiry.csv:
```csv
DE-INQR--1,DE,general,Spryker--8,Request for documentation,Please provide detailed documentation on the warranty and return policies for the products purchased under my account.
DE-INQR--2,DE,general,Spryker--8,Product catalog issue,I noticed that several products in the catalog are missing specifications and images. This makes it difficult to make informed purchasing decisions. Please update the product details.
```
3. Append the cms_block.csv:
```csv
cms-block-email--customer_email_change_notification--html,customer_email_change_notification--html,HTML Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.html.twig,1,,,,,,,"<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <!--[if gte mso 9]> <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%""> <![endif]--> <tbody class=""sprykerBoxedTextBlockOuter""> <tr> <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <!--[if gte mso 9]> <td align=""center"" valign=""top"" ""> <![endif]--> <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""> <tbody> <tr> <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0""> <tbody> <tr> <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top""> <p style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"">{{ 'mail.customer.customer_email_change_notification.text' | trans }}</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if gte mso 9]> </td> <![endif]--> <!--[if gte mso 9]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <tbody class=""sprykerTextBlockOuter""> <tr> <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top""><br> <!--[if mso]> </td> <![endif]--> <!--[if mso]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE -->","<table class=""sprykerBoxedTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <!--[if gte mso 9]> <table align=""center"" border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%""> <![endif]--> <tbody class=""sprykerBoxedTextBlockOuter""> <tr> <td class=""sprykerBoxedTextBlockInner"" valign=""top"" style=""mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <!--[if gte mso 9]> <td align=""center"" valign=""top"" ""> <![endif]--> <table style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" class=""sprykerBoxedTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""> <tbody> <tr> <td style=""padding-top: 18px;padding-left: 18px;padding-bottom: 18px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <table class=""sprykerTextContentContainer"" style=""min-width: 100% !important;background-color: #F9F9F9;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" border=""0""> <tbody> <tr> <td class=""sprykerTextContent"" style=""padding-top: 18px;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;color: #F2F2F2;font-family:Helvetica, Arial, Verdana, sans-serif;font-size: 22px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;"" valign=""top""> <p style=""text-align: center;display: block;margin: 0;padding: 0px 0px 18px 0px;color: #202020;font-family: Helvetica;font-size: 16px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;"">{{ 'mail.customer.customer_email_change_notification.text' | trans }}</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if gte mso 9]> </td> <![endif]--> <!--[if gte mso 9]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <table class=""sprykerTextBlock"" style=""min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""> <tbody class=""sprykerTextBlockOuter""> <tr> <td class=""sprykerTextBlockInner"" style=""padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"" valign=""top""><br> <!--[if mso]> </td> <![endif]--> <!--[if mso]> </tr> </table> <![endif]--> </td> </tr> </tbody> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> <!-- // END TEMPLATE -->"
cms-block-email--company-status--text,company-status--text,TEXT Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.text.twig,1,,,,,,,"{{ 'mail.trans.common.hello_for_first_name' | trans }} {{ mail.customer.firstName }} {{ mail.customer.lastName }},  {{ 'mail.trans.company_status.title' | trans }} {{ ('mail.company.status.' ~ mail.company.status) | trans }}","{{ 'mail.trans.common.hello_for_first_name' | trans }} {{ mail.customer.firstName }} {{ mail.customer.lastName }},  {{ 'mail.trans.company_status.title' | trans }} {{ ('mail.company.status.' ~ mail.company.status) | trans }}"
cms-block-email--ssp-inquiry-approved--html,ssp-inquiry-approved--html,HTML Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.html.twig,1,,,,,,,"<table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><h1 style=""text-align:center;margin:0;color:#202020;font-family:Helvetica;font-size:20px;font-weight:normal;line-height:125%;padding:15px"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.salutation' | trans({'%name%':mail.customer.firstName~' '~mail.customer.lastName})}}</h1></td></tr></tbody></table></td></tr></tbody></table><table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><p style=""text-align:center;margin:0;font-weight:bold"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text' | trans({'%reference%':mail.sspInquiry.reference})}}</p></td></tr><tr><td style=""padding-top:18px;padding-bottom:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center""><table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse:separate!important;border-radius:2px;background-color:#1EBEA0;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody><tr><td class=""sprykerButtonContent"" style=""font-family:Helvetica,Helvetica,Arial,Verdana,sans-serif;font-size:14px;padding:13px 18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""middle"" align=""center""><a class=""sprykerButton"" href=""{{ mail.sspInquiryUrl }}"" target=""_blank"" style=""font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#FFFFFF;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;display:block"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>","<table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><h1 style=""text-align:center;margin:0;color:#202020;font-family:Helvetica;font-size:20px;font-weight:normal;line-height:125%;padding:15px"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.salutation' | trans({'%name%':mail.customer.firstName~' '~mail.customer.lastName})}}</h1></td></tr></tbody></table></td></tr></tbody></table><table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><p style=""text-align:center;margin:0;font-weight:bold"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text' | trans({'%reference%':mail.sspInquiry.reference})}}</p></td></tr><tr><td style=""padding-top:18px;padding-bottom:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center""><table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse:separate!important;border-radius:2px;background-color:#1EBEA0;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody><tr><td class=""sprykerButtonContent"" style=""font-family:Helvetica,Helvetica,Arial,Verdana,sans-serif;font-size:14px;padding:13px 18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""middle"" align=""center""><a class=""sprykerButton"" href=""{{ mail.sspInquiryUrl }}"" target=""_blank"" style=""font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#FFFFFF;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;display:block"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>"
cms-block-email--ssp-inquiry-approved--text,ssp-inquiry-approved--text,TEXT Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.text.twig,1,,,,,,,"{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.salutation' | trans({'%name%' : mail.customer.firstName ~ ' ' ~ mail.customer.lastName})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text' | trans({'%reference%' : mail.sspInquiry.reference})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}: {{ mail.sspInquiryUrl }}","{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.salutation' | trans({'%name%' : mail.customer.firstName ~ ' ' ~ mail.customer.lastName})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_approved.main_text' | trans({'%reference%' : mail.sspInquiry.reference})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}: {{ mail.sspInquiryUrl }}"
cms-block-email--ssp-inquiry-rejected--html,ssp-inquiry-rejected--html,HTML Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.html.twig,1,,,,,,,"<table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><h1 style=""text-align:center;margin:0;color:#202020;font-family:Helvetica;font-size:20px;font-weight:normal;line-height:125%;padding:15px"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation' | trans({'%name%':mail.customer.firstName~' '~mail.customer.lastName})}}</h1></td></tr></tbody></table></td></tr></tbody></table><table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><p style=""text-align:center;margin:0;font-weight:bold"">{{ 'ssp_inquiry.mail.trans.sspInquiry_rejected.main_text' | trans({'%reference%':mail.sspInquiry.reference})}}</p></td></tr><tr><td style=""padding-top:18px;padding-bottom:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center""><table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse:separate!important;border-radius:2px;background-color:#1EBEA0;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody><tr><td class=""sprykerButtonContent"" style=""font-family:Helvetica,Helvetica,Arial,Verdana,sans-serif;font-size:14px;padding:13px 18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""middle"" align=""center""><a class=""sprykerButton"" href=""{{ mail.sspInquiryUrl }}"" target=""_blank"" style=""font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#FFFFFF;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;display:block"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>","<table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><h1 style=""text-align:center;margin:0;color:#202020;font-family:Helvetica;font-size:20px;font-weight:normal;line-height:125%;padding:15px"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation' | trans({'%name%':mail.customer.firstName~' '~mail.customer.lastName})}}</h1></td></tr></tbody></table></td></tr></tbody></table><table class=""sprykerTextBlock"" style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody class=""sprykerTextBlockOuter""><tr><td class=""sprykerTextBlockInner"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""top""><table style=""min-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerTextContentContainer"" width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" align=""left""><tbody><tr><td class=""sprykerTextContent"" style=""mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;color:#202020;font-family:Helvetica;font-size:16px;line-height:150%;text-align:center"" valign=""top""><p style=""text-align:center;margin:0;font-weight:bold"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.main_text' | trans({'%reference%':mail.sspInquiry.reference})}}</p></td></tr><tr><td style=""padding-top:18px;padding-bottom:18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" class=""sprykerButtonBlockInner"" valign=""top"" align=""center""><table class=""sprykerButtonContentContainer"" style=""min-width:30%;border-collapse:separate!important;border-radius:2px;background-color:#1EBEA0;mso-table-lspace:0pt;mso-table-rspace:0pt;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" cellspacing=""0"" cellpadding=""0"" border=""0""><tbody><tr><td class=""sprykerButtonContent"" style=""font-family:Helvetica,Helvetica,Arial,Verdana,sans-serif;font-size:14px;padding:13px 18px;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"" valign=""middle"" align=""center""><a class=""sprykerButton"" href=""{{ mail.sspInquiryUrl }}"" target=""_blank"" style=""font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#FFFFFF;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;display:block"">{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>"
cms-block-email--ssp-inquiry-rejected--text,ssp-inquiry-rejected--text,TEXT Email Template With Header And Footer,@CmsBlock/template/email-template-with-header-and-footer.text.twig,1,,,,,,,"{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation' | trans({'%name%' : mail.customer.firstName ~ ' ' ~ mail.customer.lastName})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.main_text' | trans({'%reference%' : mail.sspInquiry.reference})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}: {{ mail.sspInquiryUrl }}","{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.salutation' | trans({'%name%' : mail.customer.firstName ~ ' ' ~ mail.customer.lastName})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_rejected.main_text' | trans({'%reference%' : mail.sspInquiry.reference})}}\n{{ 'ssp_inquiry.mail.trans.ssp_inquiry_list_page' | trans }}: {{ mail.sspInquiryUrl }}"
```
4. Append the cms_block_store.csv:
```csv
cms-block-email--ssp-inquiry-approved--html,DE
cms-block-email--ssp-inquiry-approved--text,DE
cms-block-email--ssp-inquiry-rejected--html,DE
cms-block-email--ssp-inquiry-rejected--text,DE
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
