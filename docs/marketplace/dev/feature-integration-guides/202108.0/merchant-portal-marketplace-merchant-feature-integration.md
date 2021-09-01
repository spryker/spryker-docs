---
title: Merchant Portal - Marketplace Merchant feature integration
last_updated: Jul 05, 2021
description: This document describes the process how to integrate the Marketplace Merchant into the Spryker  Merchant Portal.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Portal - Marketplace Merchant feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Merchant feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE  |
| -------------------- | ------- | ------------------ |
| Spryker Core         | master  | [Spryker Core feature integration ](https://documentation.spryker.com/docs/spryker-core-feature-integration)|
| Marketplace Merchant | master | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/merchant-profile-merchant-portal-gui:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE   | EXPECTED DIRECTORY |
| -------------- | --------------- |
| MerchantProfileMerchantPortalGui | vendor/spryker/merchant-profile-merchant-portal-gui |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```
{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
| ------------- | ------ | ------- | ----------------- |
| Country | object | Created | src/Generated/Shared/Transfer/CountryTransfer |
| CountryCollection | object | Created | src/Generated/Shared/Transfer/CountryCollectionTransfer |
| Locale | object | Created | src/Generated/Shared/Transfer/LocaleTransfer |
| Merchant | object | Created | src/Generated/Shared/Transfer/MerchantTransfer |
| MerchantCriteria | object | Created | src/Generated/Shared/Transfer/MerchantCriteriaTransfer |
| MerchantError | object | Created | src/Generated/Shared/Transfer/MerchantErrorTransfer |
| MerchantProfile | object | Created | src/Generated/Shared/Transfer/MerchantProfileTransfer |
| MerchantProfileAddress | object | Created | src/Generated/Shared/Transfer/MerchantProfileAddressTransfer |
| MerchantProfileGlossaryAttributeValues | object | Created | src/Generated/Shared/Transfer/MerchantProfileGlossaryAttributeValuesTransfer |
| MerchantProfileLocalizedGlossaryAttributes.locale | attribute | Created | src/Generated/Shared/Transfer/MerchantProfileLocalizedGlossaryAttributesTransfer |
| MerchantProfileLocalizedGlossaryAttributes.merchantProfileGlossaryAttributeValues | attribute | Created | src/Generated/Shared/Transfer/MerchantProfileLocalizedGlossaryAttributesTransfer |
| MerchantProfileLocalizedGlossaryAttributes.fkLocale | attribute | Created | src/Generated/Shared/Transfer/MerchantProfileLocalizedGlossaryAttributesTransfer |
| MerchantResponse | object | Created | src/Generated/Shared/Transfer/MerchantResponseTransfer |
| MerchantUser.idMerchantUser | attribute | Created | src/Generated/Shared/Transfer/MerchantUserTransfer |
| MerchantUser.idMerchant | attribute | Created | src/Generated/Shared/Transfer/MerchantUserTransfer |
| MerchantUser.merchant | attribute | Created | src/Generated/Shared/Transfer/MerchantUserTransfer |
| Store | object | Created | src/Generated/Shared/Transfer/StoreTransfer |
| StoreRelation | object | Created | src/Generated/Shared/Transfer/StoreRelationTransfer |
| Translation | object | Created | src/Generated/Shared/Transfer/TranslationTransfer |
| Url | object | Created | src/Generated/Shared/Transfer/UrlTransfer |
| User | object | Created | src/Generated/Shared/Transfer/UserTransfer |

{% endinfo_block %}

### 3) Zed translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```
### 4) Configure navigation

Build navigation cache

Execute the following command:
```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure that, the navigation menu of the **MerchantPortal** has **Profile** section.

{% endinfo_block %}
