---
title: Product Experience Management
description: Manage product data in bulk through Back Office CSV imports and exports, control attribute visibility on the Storefront, and manage products programmatically through the Products Backend API.
last_updated: Sep 7, 2026
template: concept-topic-template
---

The *Product Experience Management* (PEM) capability covers three ways of working with product data beyond the standard Back Office product forms: bulk CSV imports and exports, control over which product attributes appear on the Storefront, and a Glue Backend API for programmatic product management.

The three features are independent. Install only the ones you need.

## Features

### Back Office Product CSV Import and Export

Back Office users import and export product data in bulk through a guided CSV workflow, with schema-driven column mapping, batch processing, and per-row error reporting. Use it for bulk changes that a person prepares and reviews, and for one-time or scheduled data loads.

See [Back Office product CSV import and export feature overview](/docs/pbc/all/product-experience-management/latest/back-office-product-csv-import-and-export-feature-overview.html) and [Install the Back Office Product CSV Import and Export feature](/docs/pbc/all/product-experience-management/latest/install/install-the-back-office-product-csv-import-and-export-feature.html).

### Product Attribute Visibility

Configure where each product attribute is displayed on the Storefront — Product Detail Page, Product Listing Page, cart, or nowhere at all — and publish those rules to storage.

This feature is documented under Product Information Management, because it governs how product information is displayed. See [Product Attribute Visibility](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-attribute-visibility-overview.html) and [Install the Product Attribute Visibility feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-attribute-visibility-feature.html).

### Products Backend API

External systems create, read, and update products over HTTP at `/products` on the Glue Backend API. Every request runs through the same business rules as the Back Office. Use it for ongoing programmatic access from a custom Back Office application or a third-party system such as a PIM or an ERP.

See [Products Backend API](/docs/pbc/all/product-experience-management/latest/products-backend-api.html), [Glue API: Manage products](/docs/pbc/all/product-experience-management/latest/glue-api-manage-products.html), and [Install the Products Backend API](/docs/pbc/all/product-experience-management/latest/install/install-the-products-backend-api.html).

## Related Developer documents

| OVERVIEWS | GLUE API GUIDES | INSTALLATION GUIDES |
| --- | --- | --- |
| [Back Office product CSV import and export feature overview](/docs/pbc/all/product-experience-management/latest/back-office-product-csv-import-and-export-feature-overview.html) | [Glue API: Manage products](/docs/pbc/all/product-experience-management/latest/glue-api-manage-products.html) | [Install the Back Office Product CSV Import and Export feature](/docs/pbc/all/product-experience-management/latest/install/install-the-back-office-product-csv-import-and-export-feature.html) |
| [Products Backend API](/docs/pbc/all/product-experience-management/latest/products-backend-api.html) | | [Install the Products Backend API](/docs/pbc/all/product-experience-management/latest/install/install-the-products-backend-api.html) |
| [Product Attribute Visibility](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-attribute-visibility-overview.html) | | [Install the Product Attribute Visibility feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-attribute-visibility-feature.html) |
