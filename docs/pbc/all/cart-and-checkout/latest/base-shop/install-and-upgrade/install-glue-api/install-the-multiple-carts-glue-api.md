---
title: Install the Multiple Carts Glue API
description: The guide walks you through the process of installing the Multiple Carts API feature into the project.
last_updated: Aug 6, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/multiple-carts-api-feature-integration-201907
originalArticleId: 0b3107fb-825e-481e-bb6d-27e13f4a7d0f
redirect_from:
  - /v3/docs/multiple-carts-api-feature-integration-201907
  - /v3/docs/en/multiple-carts-api-feature-integration-201907
  - /docs/pbc/all/cart-and-checkout/202311.0/install-and-upgrade/install-glue-api/install-the-multiple-carts-glue-api.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/install-and-upgrade/install-glue-api/install-the-multiple-carts-glue-api.html
---

This document describes how to install the Multiple Carts Glue API.


## Prerequisites

Install the required features:

| Name | Version | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Multiple Carts | {{page.release_tag}} | [Install the Multiple Carts feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-feature.html) |
| Cart | {{page.release_tag}} | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/multi-carts-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

{% endinfo_block %}

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| `MultiCartsRestApi` | `vendor/spryker/multi-carts-rest-api` |

## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestCartsAttributesTransfer:name` | property | added | `src/Generated/Shared/Transfer/RestCartsAttributesTransfer` |
| `RestCartsAttributesTransfer:isDefault` | property | added | `src/Generated/Shared/Transfer/RestCartsAttributesTransfer` |

## 3) Enable resources and relationships

On a project level, install the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `QuoteCreatorPlugin` | Creates a quote for a customer. | None | `Spryker\Zed\PersistentCart\Communication\Plugin\CartsRestApi` |

<details>
<summary>src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\QuoteCreatorPluginInterface;
use Spryker\Zed\PersistentCart\Communication\Plugin\CartsRestApi\QuoteCreatorPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
	/**
	* @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\QuoteCreatorPluginInterface
	*/
	protected function getQuoteCreatorPlugin(): QuoteCreatorPluginInterface
	{
		return new QuoteCreatorPlugin();
	}
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure that the following endpoints are available:
- `https://glue.mysprykershop.com/carts`
- `https://glue.mysprykershop.com/guest-carts`

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that it's possible to create more than one cart.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that after creating several carts, a response from the `GET https://glue.mysprykershop.com/carts` request contains data about all created carts.
{% endinfo_block %}
