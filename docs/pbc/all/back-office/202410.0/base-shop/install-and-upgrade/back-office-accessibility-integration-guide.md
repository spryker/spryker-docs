---
title: Install Back Office accessibility improvements
description: Learn how to install Back Office accessibility improvements to improve navigation and pagination.
last_updated: Feb 5, 2025
template: feature-integration-guide-template
---

Back Office accessibility improvements include the following changes:

- Adjusted current green and grey colors to the new one with bigger contrast ratio.
- Fixed pagination accessibility, so now disabled elements are skipped.
- Improved navigation accessibility.
- Added `lang` attribute to the HTML tag.

Follow the steps below to install the BO accessibility improvements.


1. Install the required modules using Composer:

```bash
composer require spryker/gui:"~3.53.5"
```

2. Build Javascript and CSS changes:

```bash
console frontend:zed:install-dependencies
console frontend:zed:build
```

3. Add translations:

Generate translation cache for Zed:

```bash
console translator:generate-cache
```
