---
title: Upgrade to Angular 22
description: Learn how you can upgrade to Version 22 of Angular for your Spryker project for bug fixes, optimized performance and tooling.
last_updated: Sep 23, 2026
template: module-migration-guide-template
related:
  - title: Upgrade to frontend builder v2 for the Merchant Portal
    link: docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-merchant-portal.html
  - title: Upgrade to frontend builder v2 for Yves
    link: docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-yves.html
---

This document explains what to do in case you use Spryker Frontend that relies on Angular.

## Angular 22 comes with the new frontend builder

Unlike previous Angular upgrades, Angular 22 does not have a standalone migration. Angular is updated as part of the migration to frontend builder v2.

In builder v2, the ZedUi module ships the Merchant Portal build tooling and declares the whole npm dependency set of the Merchant Portal, including Angular, ng-zorro, the Angular builders and CLI, and the `@spryker/*` packages. Your project no longer declares these dependencies in its own `package.json`. When you update ZedUi and switch to the new builder, your project receives Angular 22 from the module.

To upgrade Angular to version 22, follow [Upgrade to frontend builder v2 for the Merchant Portal](/docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-merchant-portal.html). The guide covers the Angular-related changes:

- Updating Node.js to a version supported by Angular 22.
- Removing the Angular dependencies from the project `package.json`, so that only the versions declared by ZedUi are installed.
- Updating TypeScript to version 6, which the builder requires.

If you need to adopt the new builder before upgrading Angular, you can keep Angular 20. For details, see [Staying on Angular 20](/docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-merchant-portal.html#staying-on-angular-20).

## Upgrade the Yves frontend builder

The Yves storefront does not use Angular. However, frontend builder v2 for Yves is released together with the Merchant Portal builder and has the same Node.js and npm requirements. To move the Yves build to the new builder, follow [Upgrade to frontend builder v2 for Yves](/docs/dg/dev/upgrade-and-migrate/upgrade-to-frontend-builder-v2-for-yves.html).