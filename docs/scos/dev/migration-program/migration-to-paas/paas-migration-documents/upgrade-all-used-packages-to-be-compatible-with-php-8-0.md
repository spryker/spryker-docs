---
title: Upgrade all used packages to be compatible with PHP >=8.0
description: This document describes how to upgrade all used packages to be compatible with PHP >=8.0.
template: howto-guide-template
---



## Resources for migration

Backend


1. Check the packages that are not compatible with PHP 8.0:

```bash
composer why-not php 8.0
```

2. If the incompatible package is coming from root `composer.json` then it has to be updated to the state when it will be
   working fine with PHP 8.0. If there is no PHP 8.0 support for the external package then it has to be replaced with
   analog and the solution dependent on this package should be reworked.
3. If the incompatible package is coming as part of the Spryker package dependency then a newer version of the Spryker package
   has to be used with an already fixed dependency. `202108.0` release should be already PHP 8.0 compatible, but some
   third-party dependencies could be still behind php 8.0, therefore some Spryker packages could require an [update](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/upgrade-project-packages.html).
