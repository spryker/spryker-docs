---
title: Upcoming major module releases
description: Learn what modules and when will have the next major versions release
last_updated: Sep 27, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/upcoming-major-module-releases
originalArticleId: e02b704f-db3a-4c76-a522-b81e326b0c08
redirect_from:
  - /2021080/docs/upcoming-major-module-releases
  - /2021080/docs/en/upcoming-major-module-releases
  - /docs/upcoming-major-module-releases
  - /docs/en/upcoming-major-module-releases
  - /v6/docs/upcoming-major-module-releases
  - /v6/docs/en/upcoming-major-module-releases
---

{% info_block infoBox "Info" %}

Learn about Marketplace related upcoming major releases [here](/docs/marketplace/user/intro-to-the-spryker-marketplace/upcoming-major-module-releases.html).

{% endinfo_block %}

[Major module releases](/docs/scos/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html) might require some development efforts from projects. To help you plan in advance, check out the following table for information on modules for which we plan major releases.

| MODULE | DATE | REASON FOR THE MAJOR VERSION |
| --- | --- | --- |
| [Search](https://github.com/spryker/search) | Q4 2021 | Getting rid of the ElasticSearch 5.6 support, which is end-of-life with no security fixes. It’s a consequence of the ElasticSearch 7 support. |
| [Locale](https://github.com/spryker/locale) | Q1 2022 | Adding relation between the Locale and Store objects. |
| [Currency](https://github.com/spryker/currency) | Q1 2022 | Adding relation between the Currency and Store objects. |
| [Country](https://github.com/spryker/country) | Q1 2022 | Adding relation between the Country and Store objects. |
| [Wishlist](https://github.com/spryker/wishlist) | Q2 2022 | Adding wishlist UUID and wishlist item UUID to use it as the main identifier. Changing customer foreign key relation to reference. |
| [WishlistsRestApi](https://github.com/spryker/wishlists-rest-api) | Q2 2022 | Using wishlist item UUID as `wishlist_item_id` for requests. |
| [WishlistPage](https://github.com/spryker-shop/wishlist-page) | Q2 2022 | Using wishlist UUID and wishlist item UUID as the main identifier. |
| [WishlistWidget](https://github.com/spryker-shop/wishlist-widget) | Q2 2022 | Using wishlist UUID and wishlist item UUID as the main identifier. |

