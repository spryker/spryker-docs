---
title: What's changed in Dynamic Store
last_updated: Aug 2, 2023
description: This document lists the latest Dynamic Store releases
template: concept-topic-template
---

## April 3rd, 2023

This release contains 5 modules 
[StoresApi](https://github.com/spryker/stores-api/releases/tag/1.0.0)
[StoresBackendApi](https://github.com/spryker/stores-backend-api/releases/tag/1.0.0)
[Storage](https://github.com/spryker/storage/releases/tag/3.21.0)
[Store](https://github.com/spryker/store/releases/tag/1.21.0)
[StoresRestApi](https://github.com/spryker/stores-rest-api/releases/tag/1.2.0)

[Public release details](https://api.release.spryker.com/release-group/4877).


**Improvements**

* Introduced `StoresApi` module that provides endpoints that provides store information for Storefront.
* Introduced `StoresBackendApi` module that provides endpoints for Store management.
* Introduced `StoresApplicationPlugin` that resolves store for Glue API usage
* Adjusted `StoreHttpHeaderApplicationPlugin` so now it allows passing store name as a get parameter.

## April 3rd, 2023

This release contains 371 modules

[Public release details](https://api.release.spryker.com/release-group/4521).


**Improvements**

* Added a full support of Dynamic Store infrastructure
* Introduced major releases for `Country`, `Currency`, `Locale` modules.
* Adjusted dependency for modules that are using those modules.
* Introduced data import and P&S functionality for new store management system.
* Deprecated usage of `Store` singleton and replace it with usage of corresponded public API methods.
* Added required plugins and new public API methods that are required for Dynamic Store work