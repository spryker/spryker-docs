---
title: Install Back Office accessibility improvements
description: Learn how to install Back Office accessibility improvements to improve navigation and pagination.
last_updated: Feb 5, 2025
template: feature-integration-guide-template
---

Back Office accessibility improvements include the following changes:

- Green and grey colors have a bigger contrast ratio
- Disabled elements are skipped in pagination
- Improved navigation accessibility
- HTML tag has a `lang` attribute, which signals screen readers to switch to a defined language

To install Back Office accessibility improvements, take the following steps:

1. Install the required modules using Composer:

```bash
composer require spryker/gui:"~3.53.5"
```

2. Build Javascript and CSS changes:

```bash
console frontend:zed:install-dependencies
console frontend:zed:build
```

3. Generate translation cache for Zed:

```bash
console translator:generate-cache
```
