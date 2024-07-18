---
title: Ensure compatibility
description: Ensure compatibility
last_updated: Jun 7, 2024
template: howto-guide-template
related:
  - title: Go to the Next Step.
    link: docs/dg/dev/third-party-module-development/drive-usage-and-support-with-problems.html
---

## Code compatibility
Steps how to ensure code compatibility with latest Spryker releases:

**1.** Decide which demoshop is most relevant for testing your module, choose one of:
- https://github.com/spryker-shop/b2c-demo-shop
- https://github.com/spryker-shop/b2b-demo-shop
- https://github.com/spryker-shop/b2c-demo-marketplace
- https://github.com/spryker-shop/b2b-demo-marketplace

**2.** Install your module:
- Pull the latest tag from the demoshop (One from the list above)
- Install your module with Composer. Use the version that you want to test, e.g. if you run CI on a specific branch, this branch has to be used as the module package's version constraint
- Apply all the changes on demoshop project level that are necessary to fully integrate your module.

**3.** Tests functionality of your module.