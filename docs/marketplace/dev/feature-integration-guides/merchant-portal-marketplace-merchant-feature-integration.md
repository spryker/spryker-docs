---
title: Merchant Portal - Marketplace Merchant feature integration
description: This document describes the process how to integrate the Marketplace Merchant into the Spryker  Merchant Portal.
published: false
template: feature-integration-guide-template
---

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME                 | VERSION | INTEGRATION GUIDE  |
| -------------------- | ------- | ------------------ |
| Spryker Core         | master  | [Spryker Core feature integration ](https://documentation.spryker.com/docs/spryker-core-feature-integration)|
| Marketplace Merchant | master  | [Marketplace Merchants feature integration](docs/marketplace/dev/feature-integration-guides/marketplace-merchants-feature-integration.html) |

### 1) Install the required modules using Composer

Run the following commands to install the required modules:

```bash
composer require spryker/merchant-profile-merchant-portal-gui:"^0.3.0" --update-with-dependencies
```

Make sure that the following modules have been installed:

| MODULE   | EXPECTED DIRECTORY |
| -------------- | --------------- |
| MerchantProfileMerchantPortalGui | vendor/spryker/merchant-profile-merchant-portal-gui |

### 2) Set up transfer objects

Run the following command to generate transfer changes:

```bash
console transfer:generate
```

Make sure that the following changes have been applied in transfer objects:

| Transfer  | Type   | Event   | Path |
| ------------- | ------ | ------- | ----------------- |
| MerchantProfile | object | Created | src/Generated/Shared/Transfer/MerchantProfile |

### 3) Add Translations

#### Zed translations

Run the following command to generate a new translation cache for Zed:

```bash
console translator:generate-cache
```
