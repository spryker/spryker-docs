---
title: Install the Spryker core keyboard accessibility improvements
description: Learn how to the Spryker core keyboard accessibility improvements.
last_updated: March 31, 2025
template: feature-integration-guide-template
---

Keyboard accessibility improvements include the following changes:

- Adjusted multiple components to be more accessible via keyboard:
  - Added `aria-label` attributes to the multiple components to improve screen reader support
  - Adjusted `tabIndex` attributes to improve keyboard navigation
- Add a new attribute `parent-class-name` for the `suggest-search` component that helps to improve keyboard accessibility for the product searching process.
- Improved color schema for better text to background contrast

To install Yves keyboard accessibility improvements, take the following steps:

1. Update modules
  1.1 Update the `spryker-shop/catalog-page` module to version `1.29.0` or later.
  1.2 Update the `spryker-shop/company-page` module to version `1.32.0` or later.
  1.3 Update the `spryker-shop/customer-page` module to version `1.58.0` or later.1.2
  1.4 Update the `spryker-shop/product-group-widget` module to version `1.11.1` or later.
  1.5 Update the `spryker-shop/product-review-widget` module to version `1.16.2` or later.
  1.6 Update the `spryker-shop/shop-ui` module to version `1.84.0` or later.

2. Adjust templates and files on the project lvl.

1. Build Javascript and CSS changes:

```bash
console frontend:project:install-dependencies
console frontend:yves:build -e production
```

2. Generate translation cache for Yves:

```bash
console data:import glossary
```
