This document describes how to install the Multiple Carts Glue API.


## Prerequisites

Install the required features:

| Name | Version | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Multiple Carts | {{page.version}} | [Install the Multiple Carts feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-feature.html) |
| Cart | {{page.version}} | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/multi-carts-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

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

{% info_block warningBox “Verification” %}

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
* `https://glue.mysprykershop.com/carts`
* `https://glue.mysprykershop.com/guest-carts`

{% endinfo_block %}

{% info_block warningBox “Verification” %}

Make sure that it's possible to create more than one cart.

{% endinfo_block %}

{% info_block warningBox “Verification” %}

Make sure that after creating several carts, a response from the `GET https://glue.mysprykershop.com/carts` request contains data about all created carts.
{% endinfo_block %}
