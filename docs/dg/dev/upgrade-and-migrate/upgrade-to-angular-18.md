---
title: Upgrade to Angular 18
description: Learn how to upgrade your Spryker project to Angular 18 to benefit from latest improvements and security updates.
template: module-migration-guide-template
---

This document describes how to upgrade Angular to version 18. Angular 18 provides improved developer experience, performance optimizations, and tooling enhancements.

This upgrade affects the following Marketplace modules, which have been updated with minor changes:

| MODULE NAME                                 | VERSION       |
| ------------------------------------------- | ------------- |
| AgentDashboardMerchantPortalGui             | 1.0.0 → 1.1.0 |
| AgentSecurityMerchantPortalGui              | 1.1.0 → 1.2.0 |
| CommentMerchantPortalGui                    | 1.0.0 → 1.1.0 |
| DashboardMerchantPortalGui                  | 3.0.0 → 3.1.0 |
| DummyMerchantPortalGui                      | 0.5.0 → 0.5.1 |
| GuiTable                                    | 3.2.0 → 3.3.0 |
| MerchantAppMerchantPortalGui                | 1.1.0 → 1.2.0 |
| MerchantProfileMerchantPortalGui            | 3.0.0 → 3.1.0 |
| MerchantRelationRequestMerchantPortalGui    | 1.0.0 → 1.1.0 |
| MerchantRelationshipMerchantPortalGui       | 1.0.0 → 1.1.0 |
| ProductMerchantPortalGui                    | 4.6.0 → 4.7.0 |
| ProductOfferMerchantPortalGui               | 3.0.1 → 3.1.0 |
| SalesMerchantPortalGui                      | 3.0.2 → 3.1.0 |
| SecurityMerchantPortalGui                   | 3.5.0 → 3.6.0 |
| UserMerchantPortalGui                       | 3.2.0 → 3.3.0 |
| ZedUi                                       | 3.2.0 → 3.3.0 |

---

Estimated migration time: ~15 minutes

## 1) Update Spryker modules

Update the Marketplace modules:

```bash
composer update spryker/agent-dashboard-merchant-portal-gui spryker/agent-security-merchant-portal-gui spryker/comment-merchant-portal-gui spryker/dashboard-merchant-portal-gui spryker/dummy-merchant-portal-gui spryker/gui-table spryker/merchant-app-merchant-portal-gui spryker/merchant-profile-merchant-portal-gui spryker/merchant-relation-request-merchant-portal-gui spryker/merchant-relationship-merchant-portal-gui spryker/product-merchant-portal-gui spryker/product-offer-merchant-portal-gui spryker/sales-merchant-portal-gui spryker/security-merchant-portal-gui spryker/user-merchant-portal-gui spryker/zed-ui
```

## 2) Update `package.json`

1. In `package.json`, update the `engines` block:

```json
"engines": {
  "node": ">=18.19.0",
  "npm": ">=9.0.0"
},
```

2. In `package.json`, add or update dependencies:

```json
"dependencies": {
  "@angular/animations": "~18.2.9",
  "@angular/cdk": "~18.2.9",
  "@angular/common": "~18.2.9",
  "@angular/compiler": "~18.2.9",
  "@angular/core": "~18.2.9",
  "@angular/elements": "~18.2.9",
  "@angular/forms": "~18.2.9",
  "@angular/platform-browser": "~18.2.9",
  "@angular/platform-browser-dynamic": "~18.2.9",
  "@angular/router": "~18.2.9",
  "@ctrl/tinycolor": "^4.1.0",
  "ng-zorro-antd": "^18.2.1"
}
```

3. In `package.json`, add or update devDependencies:

```json
"devDependencies": {
  "@angular-builders/custom-webpack": "~18.0.0",
  "@angular-devkit/build-angular": "~18.2.9",
  "@angular-eslint/eslint-plugin": "~18.4.3",
  "@angular-eslint/eslint-plugin-template": "~18.4.3",
  "@angular-eslint/template-parser": "~18.4.3",
  "@angular/cli": "~18.2.9",
  "@angular/compiler-cli": "~18.2.9",
  "@angular/language-service": "~18.2.9"
}
```

Then install npm dependencies:

```bash
npm install
```


## Hint: Check for broken hoisting

If, after `npm install`, some dependencies end up in unexpected nested locations like (check in package-lock.json):

```
vendor/spryker-shop/zed-ui/node_modules/@spryker/notification
```

You should **fully regenerate** the lock file and reinstall everything:

```bash
rm -rf node_modules ./**/node_modules package-lock.json && npm install
```

```
rm -rf node_modules ./**/node_modules package-lock.json - drops node_modules everywhere
npm install - installs npm dependencies
```

This ensures hoisting is correctly applied and all dependencies are installed to the root.
