---
title: Test a third-party module's compatibility
description: Ensure compatibility
last_updated: Jun 7, 2024
template: howto-guide-template
related:
  - title: Go to the Next Step.
    link: docs/dg/dev/third-party-module-development/drive-usage-and-support-with-problems.html
---

To test a third-party module's compatibility with a Spryker Demo Shop, follow the steps:

1. From one of the following, choose one Demo Shop to test the compatibility of your module with:
- https://github.com/spryker-shop/b2c-demo-shop
- https://github.com/spryker-shop/b2b-demo-shop
- https://github.com/spryker-shop/b2c-demo-marketplace
- https://github.com/spryker-shop/b2b-demo-marketplace

2. Pull the latest version of the Demo Shop you've selected.
3. Install your module using Composer.
  Use the version you want to test. For example, if you're running CI on a specific branch, this branch has to be used as the module package's version constraint.
4. On the demo shop project level, apply all the manual changes needed to complete the module installation.
5. Test the functionality of the module.
