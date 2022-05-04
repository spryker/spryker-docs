---
title: Marketplace Product Approval Process feature walkthrough
description: Marketplace Product Approval Process feature adds Merchant context to product approval process.
template: feature-walkthrough-template
---

The *Marketplace Product Approval Process* feature adds a merchant context to Product Approval Process by providing an optional `spy_merchant.default_product_abstract_approval_status` DB column where default product approval statuses for merchants are stored and can be used as default product approval statuses for merchant products. Also, the feature provides the data importer for the merchant's default product approval statuses.

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Product Approval Process* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/bdeba422-0437-4c39-a29f-9340eb153a6a.png?utm_medium=live&utm_source=custom)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| [MerchantProductApproval](https://github.com/spryker/merchant-product-approval) | This module provides merchant product approval functionality. |
| [MerchantProductApprovalDataImport](https://github.com/spryker/merchant-product-approval-data-import) | This module provides functionality to import the merchant product approval process related data. |

## Domain model

The following schema illustrates the *Marketplace Product Approval Process* domain model:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/6e87c4b8-7481-4150-a5e9-ff04ab90b762.png?utm_medium=live&utm_source=custom)

## Related Developer articles

|INTEGRATION GUIDES  | DATA IMPORT |
|---------| --- |
| [Marketplace Product Approval Process feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-approval-process-feature-integration.html) | [File details: merchant_product_approval_status_default.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-approval-status-default.csv.html) |
