---
title: Product Approval Process feature walkthrough
description: Product Approval Process feature adds approval mechanism for products.
template: feature-walkthrough-template
---

The *Product Approval Process* feature adds the approval mechanism for products by providing
an optional `spy_product_abstract.approval_status` DB column to store product approval statuses. Thus,
a shop owner can follow the review process and manage which products will be placed in the store by setting the
corresponding approval statuses. The feature also provides the Back Office UI for managing the approval statuses and
the corresponding Data importer.

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Product Approval Process* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/e83e1c59-8592-46ec-906e-1483779419c7.png?utm_medium=live&utm_source=custom)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| [ProductApproval](https://github.com/spryker/product-approval) | This module provides product approval functionality. |
| [ProductApprovalDataImport](https://github.com/spryker/product-approval-data-import) | Module for importing Product approval statuses from .csv file. |
| [ProductApprovalGui](https://github.com/spryker/product-approval-gui) | This module provides Zed UI interface for product approval management. |

## Domain model

The following schema illustrates the *Product Approval Process* domain model:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/9307bb4e-6cb5-43d7-b7a5-e0b3d98ef664.png?utm_medium=live&utm_source=custom)

## Related Developer articles

|INSTALLATION GUIDES  | DATA IMPORT |
|---------|---------|
| [Product Approval Process feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-approval-process-feature-integration.html) | [File details: product_abstract_approval_status.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract-approval-status.csv.html)  |
