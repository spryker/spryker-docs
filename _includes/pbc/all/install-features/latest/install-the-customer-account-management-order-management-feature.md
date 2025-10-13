

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Customer Account Management | 202507.0 |
| Order Management | 202507.0 |
| Spryker Core | 202507.0 |

### 1) Set up configuration

To enable order search functionality, adjust config as shown below.

**src/Pyz/Yves/CustomerPage/CustomerPageConfig.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageConfig as SprykerCustomerPageConfig;

class CustomerPageConfig extends SprykerCustomerPageConfig
{
    protected const IS_ORDER_HISTORY_SEARCH_ENABLED = true;
}
```

{% info_block warningBox "Verification" %}

Make sure you see the order search form at the Order History page.

{% endinfo_block %}


### 2) Add Translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
customer.order.number_of_items,No. of Items,en_US
customer.order.number_of_items,Anzahl der Artikel,de_DE
customer.order.reference,Reference,en_US
customer.order.reference,Referenz,de_DE
customer.order.email,Email,en_US
customer.order.email,E-Mail-Adresse,de_DE
customer.order_history.search_type.all,All,en_US
customer.order_history.search_type.all,Alle,de_DE
customer.order_history.search_type.orderReference,Order Reference,en_US
customer.order_history.search_type.orderReference,Bestellnummer,de_DE
customer.order_history.search_type.itemName,Product Name,en_US
customer.order_history.search_type.itemName,Produktname,de_DE
customer.order_history.search_type.itemSku,Product SKU,en_US
customer.order_history.search_type.itemSku,Produkt-SKU,de_DE
customer.order_history.search,Search,en_US
customer.order_history.search,Suchen,de_DE
customer.order_history.date_from,From,en_US
customer.order_history.date_from,Von,de_DE
customer.order_history.date_to,To,en_US
customer.order_history.date_to,Bis,de_DE
customer.order_history.apply,Apply,en_US
customer.order_history.apply,Anwenden,de_DE
customer.order_history.is_order_items_visible,Show products in search results,en_US
customer.order_history.is_order_items_visible,Produkte in Suchergebnissen anzeigen,de_DE
customer.order_history.active_filters,Active Filters:,en_US
customer.order_history.active_filters,Aktive Filter:,de_DE
customer.order_history.reset_all,Reset All,en_US
customer.order_history.reset_all,Alles zurücksetzen,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}
