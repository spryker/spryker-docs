---
title: Reclamations feature integration
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/reclamations-feature-integration
originalArticleId: a4e601de-2e86-44a0-8806-d3ba35776f6b
redirect_from:
  - /2021080/docs/reclamations-feature-integration
  - /2021080/docs/en/reclamations-feature-integration
  - /docs/reclamations-feature-integration
  - /docs/en/reclamations-feature-integration
---

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Order Management | {{page.version}} |
| Spryker Core | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/reclamations: "{{page.version}}" --update-with-dependencies`
```

{% info_block warningBox “Verification” %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| SalesReclamation | vendor/spryker/sales-reclamation |
| SalesReclamationGui | vendor/spryker/sales-reclamation-gui |

{% endinfo_block %}

### 2) Set up the database schema and transfer objects

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox “Verification” %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE |
| --- | --- |
| spy_sales_reclamation | table |
| spy_sales_reclamation_item | table |

{% endinfo_block %}


{% info_block warningBox “Verification” %}

Make sure that the following changes were implemented in the transfer objects:

| TRANSFER | TYPE | PATH |
| --- | --- | --- |
| Reclamation | class | src/Generated/Shared/Transfer/ReclamationTransfer |
| ReclamationItem | class | src/Generated/Shared/Transfer/ReclamationItemTransfer |
| ReclamationCreateRequest | class | src/Generated/Shared/Transfer/ReclamationCreateRequestTransfer |
| SpySalesReclamationEntity | class | src/Generated/Shared/Transfer/SpySalesReclamationEntityTransfer |
| SpySalesReclamationItemEntity | class | src/Generated/Shared/SpySalesReclamationItemEntityTransfer |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ReclamationSalesTablePlugin | Expands sales order table with a "Claim" button, that redirects to "Create Reclamation" page, where the whole order or its specific items can be reclaimed. | None | Spryker\Zed\SalesReclamationGui\Communication\Plugin\Sales |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesReclamationGui\Communication\Plugin\Sales\ReclamationSalesTablePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
	/**
	 * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\SalesTablePluginInterface[]
	 */
	protected function getSalesTablePlugins()
	{
		return [
			new ReclamationSalesTablePlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}

Make sure that the sales order table in the back office has a "Claim" button for each order, clicking on which will redirect you to create reclamation page.

{% endinfo_block %}
