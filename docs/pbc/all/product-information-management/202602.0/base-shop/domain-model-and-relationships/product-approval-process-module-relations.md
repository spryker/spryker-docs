---
title: "Product approval process: Module relations"
last_updated: Dec 22, 2022
template: concept-topic-template
redirect_from:
- /docs/pbc/all/product-information-management/202204.0/base-shop/domain-model-and-relationships/product-approval-process-module-relations.html
---

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
