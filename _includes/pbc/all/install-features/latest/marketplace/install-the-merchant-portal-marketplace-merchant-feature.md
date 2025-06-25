
This document describes how to install the Merchant Portal - Marketplace Merchant feature.

## Install feature core

Follow the steps below to install the Merchant Portal - Marketplace Merchant feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE  |
| -------------------- | ------- | ------------------ |
| Marketplace Merchant Portal Core | {{page.version}}  | [Install the Merchant Portal Core feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html) |
| Marketplace Merchant | {{page.version}} | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

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

### 3) Add translations

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

Make sure that the navigation menu of the Merchant Portal has the **Profile** section.

{% endinfo_block %}
