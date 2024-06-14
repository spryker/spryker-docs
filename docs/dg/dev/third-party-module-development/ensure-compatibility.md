---
title: Ensure compatibility
description: Ensure compatibility
last_updated: Jun 7, 2024
template: howto-guide-template

---

## Code compatibility
Steps how to ensure code compatibility with latest Spryker releases:

**1.** Decide which demoshop is most relevant for testing your module, choose one of:
- https://github.com/spryker-shop/b2c-demo-[shop](https://github.com/spryker-shop/b2c-demo-shop/blob/master/.github/workflows/ci.yml)
- https://github.com/spryker-shop/b2b-demo-shop
- https://github.com/spryker-shop/b2c-demo-marketplace
- https://github.com/spryker-shop/b2b-demo-marketplace

**2.** Add to you module CI pipeline that does the following thing:
- Pulls the latest tag from the demoshop (One from the list above)
- Installs your module with composer (in the version that you want to test, e.g. if we run CI on specific branch, specific branch should be used)
- Apply all the changes on demoshop project level that are necessary to fully integrate your module.
- Run all the demoshop tests, the same way as done in your demoshop CI https://github.com/spryker-shop/{chosen-demoshop-name}/blob/master/.github/workflows/* (As example for b2c demoshop see [ci.yml](https://github.com/spryker-shop/b2c-demo-shop/blob/master/.github/workflows/ci.yml) and [robot-ui-e2e-tests.yml](https://github.com/spryker-shop/b2c-demo-shop/blob/master/.github/workflows/robot-ui-e2e-tests.yml)

