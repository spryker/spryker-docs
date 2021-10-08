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
| Marketplace Merchant Portal Core | {{page.version}}  | [Merchant Portal Core feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-portal-core-feature-integration.html)
| Marketplace Merchant | {{page.version}} | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |

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

Make sure that, the navigation menu of the **MerchantPortal** has **Profile** section.

{% endinfo_block %}
