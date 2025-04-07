---
title: Install the Spryker core keyboard accessibility improvements
description: Learn how to the Spryker core keyboard accessibility improvements.
last_updated: March 31, 2025
template: feature-integration-guide-template
---

Keyboard accessibility improvements include the following changes:

- Introduced a new `skip-link` element to skip to main content
- Adjusted multiple components to be more accessible via keyboard:
  - Added `aria-label` attributes to the multiple components to improve screen reader support
  - Adjusted `tabIndex` attributes to improve keyboard navigation
- Add a new attribute `parent-class-name` for the `suggest-search` component that helps to improve keyboard accessibility for the product searching process.
- Improved color schema for better text to background contrast

To install Yves keyboard accessibility improvements, take the following steps:

1. Build Javascript and CSS changes:

```bash
console frontend:project:install-dependencies
console frontend:yves:build -e production
```

2. Generate translation cache for Yves:

```bash
console data:import glossary
```
