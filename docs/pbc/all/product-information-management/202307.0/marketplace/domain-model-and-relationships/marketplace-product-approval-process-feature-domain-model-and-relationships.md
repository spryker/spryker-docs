---
title: "Marketplace Product Approval Process feature: Domain model and relationships"
description: Marketplace Product Approval Process feature adds Merchant context to product approval process.
template: feature-walkthrough-template
last_updated: Jul 25, 2023
---

The *Marketplace Product Approval Process* feature adds a merchant context to Product Approval Process by providing an optional `spy_merchant.default_product_abstract_approval_status` DB column where default product approval statuses for merchants are stored and can be used as default product approval statuses for merchant products. Also, the feature provides the data importer for the merchant's default product approval statuses.

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Product Approval Process* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/411046ea-9d59-40c3-9d41-7473eb45d2d6.png?utm_medium=live&utm_source=custom)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| [MerchantProductApproval](https://github.com/spryker/merchant-product-approval) | This module provides merchant product approval functionality. |
| [MerchantProductApprovalDataImport](https://github.com/spryker/merchant-product-approval-data-import) | This module provides functionality to import the merchant product approval process related data. |

## Domain model

The following schema illustrates the *Marketplace Product Approval Process* domain model:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/dd3fdb7e-e244-4472-a7ed-1341bfa8bcbc.png?utm_medium=live&utm_source=custom)
