---
title: Glue API - Multiple Carts feature integration
description: The guide walks you through the process of installing the Multiple Carts API feature into the project.
last_updated: Nov 22, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/multiple-carts-api-feature-integration-201907
originalArticleId: 0b3107fb-825e-481e-bb6d-27e13f4a7d0f
redirect_from:
  - /v3/docs/multiple-carts-api-feature-integration-201907
  - /v3/docs/en/multiple-carts-api-feature-integration-201907
related:
  - title: Managing Guest Carts
    link: docs/scos/dev/glue-api-guides/page.version/managing-carts/guest-carts/managing-guest-carts.html
  - title: Managing Carts of Registered Users
    link: docs/scos/dev/glue-api-guides/page.version/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Integration guide |
| --- | --- | --- |
| Spryker Core | 201907.0 | Glue Application feature integration |
| Multiple Carts | 201907.0 | Multiple Carts feature integration |
| Cart | 201907.0 | Cart feature integration |

### 1) Install the required modules using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker/multi-carts-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following modules were installed:
{% endinfo_block %}

| Module | Expected Directory |
| --- | --- |
| `MultiCartsRestApi` | `vendor/spryker/multi-carts-rest-api` |

### 2) Set up Transfer Objects
Run the following commands to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox “Verification” %}

Make sure that the following changes have been applied in transfer objects:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestCartsAttributesTransfer:name` | property | added | `src/Generated/Shared/Transfer/RestCartsAttributesTransfer` |
| `RestCartsAttributesTransfer:isDefault` | property | added | `src/Generated/Shared/Transfer/RestCartsAttributesTransfer` |

### 3) Set up Behavior
#### Enable resources and relationships
On a project level, install the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `QuoteCreatorPlugin` | Creates a quote for a customer. | None | `Spryker\Zed\PersistentCart\Communication\Plugin\CartsRestApi` |

<details open>
<summary markdown='span'>src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php</summary>
    
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

<br>
</details>

{% info_block warningBox "your title goes here" %}
Make sure that the following endpoints are available:<ul><li>http://glue.mysprykershop.com/carts</li><li>http://glue.mysprykershop.com/guest-carts</li></ul>
{% endinfo_block %}

{% info_block warningBox “Verification” %}

Make sure that it is possible to create more than one cart.
{% endinfo_block %}

{% info_block warningBox “Verification” %}

Make sure that after creating several carts, a response from http://glue.mysprykershop.com/carts GET request contains data about all created carts.
{% endinfo_block %}

<!-- links to:
Managing Guest Carts
Managing Carts of Registered Users

Spryker Core feature integration
Multiple Carts feature integration
Cart feature integration -->

*Last review date: Aug 02, 2019*

<!--Tihran Voitov, Yuliia Boiko-->
