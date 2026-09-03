---
title: Content Management System
description: The Content Management System Feature within Spryker Cloud Commerce OS and Marketplace, a perfect way to manage your content based pages and items.
last_updated: August 28, 2026
template: concept-topic-template
redirect_from:
- /docs/pbc/all/content-management-system/202204.0/content-management-system.html
---

*Content Management System* (CMS) capability enables content managers to add, customize, and effectively manage content on all the pages of a shop.

The base shop features provide the basic search functionality that is needed in any shop type.

The marketplace features provide marketplace-specific functionality. Even running a marketplace, you still need most of the base shop features.

Spryker modules supporting CMS at one glance:

| Capability | Modules | What it gives you |
| --- | --- | --- |
| **CMS pages** | [Cms](/docs/pbc/all/content-management-system/latest/base-shop/cms-feature-overview/cms-pages-overview.html), `CmsStorage`, `CmsGui`, [CmsPageSearch](/docs/pbc/all/content-management-system/latest/base-shop/cms-feature-overview/cms-pages-in-search-results-overview.html), `CmsPagesRestApi` | Templated pages with localized URLs, placeholders, draft and publish state, versioning with rollback, per-store activation, Back Office editing, Glue read API, search indexing |
| **CMS blocks** | [CmsBlock](/docs/pbc/all/content-management-system/latest/base-shop/cms-feature-overview/cms-blocks-overview.html), `CmsBlockStorage`, `CmsBlockWidget`, `CmsBlockCategoryConnector`, `CmsBlockProductConnector` | Reusable fragments with their own templates, validity dates, and assignment to categories and products |
| **Declared content positions** | [CmsSlot](/docs/pbc/all/content-management-system/latest/base-shop/cms-feature-overview/templates-and-slots-overview.html), [CmsSlotBlock](/docs/pbc/all/content-management-system/latest/base-shop/cms-feature-overview/templates-and-slots-overview.html), `CmsSlotStorage`, `CmsSlotBlockStorage`, `ShopCmsSlot`, `CmsSlotBlockWidget` | Named locations inside Twig templates that content plugs into, with conditional assignment and pluggable visibility |
| **Content items** | [Content](/docs/pbc/all/content-management-system/latest/base-shop/content-items-feature-overview.html), `ContentBanner`, `ContentProduct`, [ContentProductSet](/docs/pbc/all/content-management-system/latest/base-shop/product-sets-feature-overview.html), [ContentNavigation](/docs/pbc/all/content-management-system/latest/base-shop/navigation-feature-overview.html), [ContentFile](/docs/pbc/all/content-management-system/latest/base-shop/file-manager-feature-overview.html), `ContentStorage`, and the matching `*Widget` modules | Typed, reusable content that **references commerce entities** — product lists, product sets, banners, navigation trees — rendered by governed Twig widgets |
| **Embedding inside content** | `CmsContentWidget` plus the `*Connector` modules | Twig-function widgets usable inside CMS content, so editorial text can carry live product, product-set, product-group, and search-driven output |
| **Publishing pipeline** | [Publisher](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html), [Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html), [Event](/docs/dg/dev/backend-development/data-manipulation/event/event.html), [Queue](/docs/dg/dev/backend-development/data-manipulation/queue/queue.html), [Storage](/docs/dg/dev/architecture/key-value-storage-redis-and-valkey.html), [StorageRedis](/docs/dg/dev/architecture/key-value-storage-redis-and-valkey.html) | Publish and synchronize to Redis read storage and to Elasticsearch, asynchronously, with a rebuild path |
| **Import** | `CmsPageDataImport`, `CmsSlotDataImport`, `CmsSlotBlockDataImport`, the `Content*DataImport` modules | Bulk provisioning and environment seeding |
| **API exposure** | `CmsPagesRestApi`, `ContentBannersRestApi`, `ContentProductAbstractListsRestApi`, `UrlsRestApi`, plus the relationship modules | CMS pages and content items readable by any frontend, related to commerce resources |

