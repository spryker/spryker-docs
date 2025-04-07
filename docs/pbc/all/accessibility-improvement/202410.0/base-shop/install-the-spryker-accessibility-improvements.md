---
title: Install the Spryker core keyboard accessibility improvements
description: Learn how to the Spryker core keyboard accessibility improvements.
last_updated: March 31, 2025
template: feature-integration-guide-template
---

Keyboard accessibility improvements include the following changes:

- Introduced a new `skip-link` element to skip to main content
  - Allows customer to skip navigation and go directly to the main content of the page 
  - Become visible on the page when the user presses the `Tab` key.
- Adjusted multiple components to be more accessible via keyboard (form elements, navigation, etc.):
  - Added `aria-label` attribute to improve screen reader support
  - Added `tabIndex` attributes to improve keyboard navigation
  - Introduced new TWIG variable `viewportUserScaleable` to control `user-scalable` options of the  `meta name="viewport"` attribute.
    - Accepted values - `yes`, `no`
- Improved `suggest-search` component so customer can use `search` functionality with keyboard.
  - Introduced new attribute `parent-class-name` for the `suggest-search` molecule. 
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
