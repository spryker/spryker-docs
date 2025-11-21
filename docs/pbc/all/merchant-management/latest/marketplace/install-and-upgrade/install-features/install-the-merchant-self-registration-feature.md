---
title: Install the Merchant Self-Registration feature
last_updated: Nov 21, 2025
description: Learn how to install the Merchant Self-Registration feature into your Spryker Marketplace project.
template: feature-integration-guide-template
---

This document describes how to install the Merchant Self-Registration feature.

## Install feature core

Follow the steps below to install the Merchant Self-Registration feature core.

### Prerequisites

Install the required features:

| NAME                    | VERSION          | INSTALLATION GUIDE                                                                                                                                          |
|-------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core            | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Marketplace Merchant    | 202507.0 | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/merchant-registration-request:"^1.1.0" spryker-shop/merchant-registration-request-page:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                              | EXPECTED DIRECTORY                                     |
|-------------------------------------|--------------------------------------------------------|
| MerchantRegistrationRequest         | vendor/spryker/merchant-registration-request           |
| MerchantRegistrationRequestPage     | vendor/spryker-shop/merchant-registration-request-page |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

1. Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have occurred in the database:

| DATABASE ENTITY                   | TYPE  | EVENT   |
|-----------------------------------|-------|---------|
| spy_merchant_registration_request | table | created |

{% endinfo_block %}

2. Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have occurred in transfer objects:

| TRANSFER                             | TYPE  | EVENT   | PATH                                                                      |
|--------------------------------------|-------|---------|---------------------------------------------------------------------------|
| MerchantRegistrationRequest          | class | Created | src/Generated/Shared/Transfer/MerchantRegistrationRequestTransfer         |
| MerchantRegistrationResponse         | class | Created | src/Generated/Shared/Transfer/MerchantRegistrationResponseTransfer        |
| SpyMerchantRegistrationRequestEntity | class | Created | src/Generated/Shared/Transfer/SpyMerchantRegistrationRequestEntityTransfer |

{% endinfo_block %}

### 3) Add translations

1. Append glossary for the Back Office and Storefront according to your configuration:

**data/import/common/common/glossary.csv**

```csv
merchant_registration_request_page.page_title,Register and get started on the Spryker Marketplace,en_US
merchant_registration_request_page.page_title,Registrieren und loslegen auf den Spryker Marktplatz,de_DE
merchant_registration_request_page.company_subform_title,Company Registration,en_US
merchant_registration_request_page.company_subform_title,Registrierung des Unternehmens,de_DE
merchant_registration_request_page.company_subform_text,Fill in your company details to initiate your registration process as a marketplace merchant.,en_US
merchant_registration_request_page.company_subform_text,"Geben Sie Ihre Unternehmensdaten ein, um den Registrierungsprozess als Marktplatz-Händler zu starten.",de_DE
merchant_registration_request_page.account_subform_title,Merchant User Account creation,en_US
merchant_registration_request_page.account_subform_title,Händler-Benutzerkonto erstellen,de_DE
merchant_registration_request_page.account_subform_text,Add the details of your first merchant user account.,en_US
merchant_registration_request_page.account_subform_text,Fügen Sie die Details Ihres ersten Händler-Benutzerkontos hinzu.,de_DE
merchant_registration_request_page.accept_terms,Accept terms,en_US
merchant_registration_request_page.accept_terms,AGB akzeptieren,de_DE
merchant_registration_request_page.contact_person_role,Role,en_US
merchant_registration_request_page.contact_person_role,Role,de_DE
merchant_registration_request_page.contact_person_phone,Phone,en_US
merchant_registration_request_page.contact_person_phone,Telefonnummer,de_DE
merchant_registration_request_page.contact_person_first_name,First name,en_US
merchant_registration_request_page.contact_person_first_name,Vorname,de_DE
merchant_registration_request_page.contact_person_last_name,Last name,en_US
merchant_registration_request_page.contact_person_last_name,Nachname,de_DE
merchant_registration_request_page.contact_person_title,Title,en_US
merchant_registration_request_page.contact_person_title,Titel,de_DE
merchant_registration_request_page.email,Email,en_US
merchant_registration_request_page.email,E-Mail,de_DE
merchant_registration_request_page.company_name,Company name,en_US
merchant_registration_request_page.company_name,Unternehmensname,de_DE
merchant_registration_request_page.country,Country,en_US
merchant_registration_request_page.country,Land,de_DE
merchant_registration_request_page.street,Street,en_US
merchant_registration_request_page.street,Straße,de_DE
merchant_registration_request_page.house_number,House Number,en_US
merchant_registration_request_page.house_number,Hausnummber,de_DE
merchant_registration_request_page.zip_code,Zip Code,en_US
merchant_registration_request_page.zip_code,PLZ,de_DE
merchant_registration_request_page.city,City,en_US
merchant_registration_request_page.city,Stadt,de_DE
merchant_registration_request_page.merchant_registration_number,Registration number,en_US
merchant_registration_request_page.merchant_registration_number,Registrierungsnummer,de_DE
merchant_registration_request_page.form_submit,Submit registration request,en_US
merchant_registration_request_page.form_submit,Registrierungsanfrage senden,de_DE
merchant_registration_request_page.success,Merchant registration request has been successfully submitted for review.,en_US
merchant_registration_request_page.success,Die Händlerregistrierungsanfrage wurde erfolgreich zur Überprüfung übermittelt.,de_DE
merchant_registration_request.error.email_already_exists,Email address already registered.,en_US
merchant_registration_request.error.email_already_exists,E-Mail-Adresse bereits registriert.,de_DE
merchant_registration_request.error.company_name_already_exists,Company name already registered.,en_US
merchant_registration_request.error.company_name_already_exists,Unternehmensname bereits registriert.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                       | SPECIFICATION                                                                       | PREREQUISITES | NAMESPACE                                                    |
|----------------------------------------------|------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------|
| CommentThreadMerchantRegistrationRequestPostCreatePlugin | Creates a comment thread for the merchant registration request after creation.     |               | Spryker\Zed\Comment\Communication\Plugin\MerchantRegistrationRequest |

**src/Pyz/Zed/MerchantRegistrationRequest/MerchantRegistrationRequestDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantRegistrationRequest;

use Spryker\Zed\Comment\Communication\Plugin\MerchantRegistrationRequest\CommentThreadMerchantRegistrationRequestPostCreatePlugin;
use Spryker\Zed\MerchantRegistrationRequest\MerchantRegistrationRequestDependencyProvider as SprykerMerchantRegistrationRequestDependencyProvider;

class MerchantRegistrationRequestDependencyProvider extends SprykerMerchantRegistrationRequestDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MerchantRegistrationRequestExtension\Dependency\Plugin\MerchantRegistrationRequestPostCreatePluginInterface>
     */
    protected function getMerchantRegistrationRequestPostCreatePlugins(): array
    {
        return [
            new CommentThreadMerchantRegistrationRequestPostCreatePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when you create a merchant registration request through the Storefront, a comment thread is also created for it.

{% endinfo_block %}

### 5) Configure navigation

1. Add the Merchant Registrations section to the Back Office navigation:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <marketplace>
        <label>Marketplace</label>
        <title>Marketplace</title>
        <icon>fa-shopping-basket</icon>
        <pages>
            <merchant-registration-request>
                <label>Merchant Registrations</label>
                <title>Merchant Registrations</title>
                <bundle>merchant-registration-request</bundle>
                <controller>list</controller>
                <action>index</action>
            </merchant-registration-request>
        </pages>
    </marketplace>
</config>
```

2. Build the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure that in the Back Office, under **Marketplace**, you can see the **Merchant Registrations** menu item.

{% endinfo_block %}

### 6) Set up Storefront routing

Register the route provider plugin to enable the merchant registration page on the Storefront:

| PLUGIN                                           | SPECIFICATION                                                  | PREREQUISITES | NAMESPACE                                                        |
|--------------------------------------------------|----------------------------------------------------------------|---------------|------------------------------------------------------------------|
| MerchantRegistrationRequestPageRouteProviderPlugin | Adds routes for the merchant registration request pages.     |               | SprykerShop\Yves\MerchantRegistrationRequestPage\Plugin\Router  |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\MerchantRegistrationRequestPage\Plugin\Router\MerchantRegistrationRequestPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new MerchantRegistrationRequestPageRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the `/merchant-registration-request` route is available on the Storefront by navigating to `https://mysprykershop.com/merchant-registration-request`.

{% endinfo_block %}

### 7) Set up Storefront navigation

To add a link to the merchant registration page in the Storefront footer, you can import the following navigation node:

1. Prepare navigation node data:

**data/import/common/common/navigation_node.csv**

```csv
navigation_key,node_key,parent_node_key,node_type,title.en_US,url.en_US,css_class.en_US,title.de_DE,url.de_DE,css_class.de_DE,valid_from,valid_to
FOOTER_NAVIGATION,nav-el-footer--5,,link,Sell on Spryker,/en/merchant-registration-request,footer-navigation__item,Auf Spryker verkaufen,/de/merchant-registration-request,footer-navigation__item,,
```

2. Import data:

```bash
console data:import navigation-node
```

{% info_block warningBox "Verification" %}

Make sure that the "Sell on Spryker" link appears in the footer of the Storefront and navigates to the merchant registration request page.

{% endinfo_block %}
