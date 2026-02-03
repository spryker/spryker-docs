---
title: Enable the Zero State Component for Empty Data
description: Learn how to enable the Zero State component in Spryker Cloud Commerce OS Yves so you can display user-friendly messages and visuals when no data is available.
last_updated: Feb 3, 2026
template: module-migration-guide-template
---

This guide explains how to enable the **Zero State component** in Spryker Cloud Commerce OS Yves so you can display user-friendly messages and visuals when no data is available.

To add the Zero State component to your project, include the `molecule('empty-state')` in the relevant Twig file.

**vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/empty-state/empty-state.twig**

Example:
```twig
{% include molecule('empty-state') with {
    data: {
        title: 'title.glossary.key' | trans,
        description: 'description.glossary.key' | trans,
        iconName: 'icon-name',
        actionButton: {
            text: 'button.glossary.key' | trans,
            link: url('url-key'),
            qa: 'qa-key',
            icon: {
                name: 'icon-name',
            },
        },
    },
} only %}
```
---

## Steps to Enable the Zero State Component

### 1. Update `SprykerShop` modules

Update the following modules to the specified versions or higher:
- `spryker-shop/shop-ui`: 1.101.0  
- `spryker-shop/customer-page`: 2.73.0  
- `spryker-shop/sales-return-page`: 1.11.0

```bash
composer update spryker-shop/shop-ui:"^1.101.0" spryker-shop/customer-page:"^2.73.0" spryker-shop/sales-return-page:"^1.11.0"
```

---

### 2. Add icons to the icon sprite

Add new icons into `icon-sprite` atom:

**src/Pyz/Yves/ShopUi/Theme/default/components/atoms/icon-sprite/icon-sprite.twig**

```twig
<symbol id=":flash-message-alert" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z"/></symbol>   
<symbol id=":local-mall" viewBox="0 -960 960 960" fill="currentColor">
    <title id=":local-mall">Local Mall</title>
    <path d="M200-80q-33 0-56.5-23.5T120-160v-480q0-33 23.5-56.5T200-720h80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720h80q33 0 56.5 23.5T840-640v480q0 33-23.5 56.5T760-80H200Zm0-80h560v-480H200v480Zm280-240q83 0 141.5-58.5T680-600h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85h-80q0 83 58.5 141.5T480-400ZM360-720h240q0-50-35-85t-85-35q-50 0-85 35t-35 85ZM200-160v-480 480Z"/>
</symbol>
<symbol id=":globe-location-pin" viewBox="0 -960 960 960" fill="currentColor">
    <title id=":globe-location-pin">Globe Location Pin</title>
    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q152 0 263.5 98T876-538q-20-10-41.5-15.5T790-560q-19-73-68.5-130T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q11 0 20.5 5.5T595-459q-17 27-26 57t-9 62q0 63 32.5 117T659-122q-41 20-86 31t-93 11Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm340 82q-7 0-12-4t-7-10q-11-35-31-65t-43-59q-21-26-34-57t-13-65q0-58 41-99t99-41q58 0 99 41t41 99q0 34-13.5 64.5T873-218q-23 29-43 59t-31 65q-2 6-7 10t-12 4Zm0-113q10-17 22-31.5t23-29.5q14-19 24.5-40.5T860-340q0-33-23.5-56.5T780-420q-33 0-56.5 23.5T700-340q0 24 10.5 45.5T735-254q12 15 23.5 29.5T780-193Zm0-97q-21 0-35.5-14.5T730-340q0-21 14.5-35.5T780-390q21 0 35.5 14.5T830-340q0 21-14.5 35.5T780-290Z"/>
</symbol>
<symbol id=":add" viewBox="0 -960 960 960" fill="currentColor">
    <title id=":add">Add</title>
    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
</symbol>
<symbol id=":shopping-bag-speed" viewBox="0 -960 960 960" fill="currentColor">
    <title id=":shopping-bag-speed">Shopping Bag Speed</title>
    <path d="m40-240 20-80h220l-20 80H40Zm80-160 20-80h260l-20 80H120Zm623 240 20-160 29-240 10-79-59 479ZM240-80q-33 0-56.5-23.5T160-160h583l59-479H692l-11 85q-2 17-15 26.5t-30 7.5q-17-2-26.5-14.5T602-564l9-75H452l-11 84q-2 17-15 27t-30 8q-17-2-27-15t-8-30l9-74H220q4-34 26-57.5t54-23.5h80q8-75 51.5-117.5T550-880q64 0 106.5 47.5T698-720h102q36 1 60 28t19 63l-60 480q-4 30-26.5 49.5T740-80H240Zm220-640h159q1-33-22.5-56.5T540-800q-35 0-55.5 21.5T460-720Z"/>
</symbol>
```
---

### 3. Glossary keys

Add glossary keys for the empty state component (for example, Customer pages – Addresses, Order History, and Returns):

**data/import/common/common/glossary.csv**

```csv
customer.account.address.no-addresses,Noch keine Adressen hinzugefügt!,de_DE
customer.account.address.no-addresses-description,"This is where you'll find and manage addresses once it's available.",en_US
customer.account.address.no-addresses-description,"Hier können Sie Ihre Adressen sehen und verwalten, sobald sie verfügbar sind.",de_DE
customer.order.no_orders,No order history available!,en_US
customer.order.no_orders,Keine Bestellungen gefunden!,de_DE
customer.order.no_orders_description,"This is where you'll find and manage order history once it's available.",en_US
customer.order.no_orders_description,"Hier können Sie Ihre Bestellhistorie sehen und verwalten, sobald sie verfügbar ist.",de_DE
return_page.account.no_return,No returns found!,en_US
return_page.account.no_return,Keine Retouren gefunden!,de_DE
return_page.account.no_return_description,"This is where you'll find and manage returns once it's available.",en_US
return_page.account.no_return_description,"Hier können Sie Ihre Retouren sehen und verwalten, sobald sie verfügbar sind.",de_DE
```

---

### 4. Update Twig files to enable the new `Zero State` component

**src/Pyz/Yves/CustomerPage/Theme/default/components/molecules/order-table/order-table.twig**

```twig
{% if data.orders is empty %}
    {% block noOrder %}
        {{ parent() }}
    {% endblock %}
{% else %}
```

**src/Pyz/Yves/CustomerPage/Theme/default/views/address/address.twig**

```twig
{% for address in data.addresses %}
    ...
{% else %}
    {% block emptyState %}
        {% include molecule('empty-state') with {
            data: {
                title: 'customer.account.address.no-addresses' | trans,
                description: 'customer.account.address.no-addresses-description' | trans,
                iconName: 'globe-location-pin',
                actionButton: {
                    text: 'customer.account.button.add_new_address' | trans,
                    link: url('customer/address/new'),
                    qa: 'customer-add-new-address',
                    icon: {
                        name: 'add',
                    },
                },
            },
        } only %}
    {% endblock %}
{% endfor %}
```
---
    
{% info_block infoBox "Tip" %}
To prevent the newly created `Zero State` component from rendering on the `Customer/Overview` page, adjust the `order-table` molecule include by replacing the content of the `noOrder` block.

**src/Pyz/Yves/CustomerPage/Theme/default/views/overview/overview.twig**

```twig
{% embed molecule('order-table', 'CustomerPage') with {
    data: {
        orders: data.orders,
        ordersAggregatedItemStateDisplayNames: data.ordersAggregatedItemStateDisplayNames,
    },
} only %}
    {% block noOrder %}
        <p>{{ 'customer.account.no_order' | trans }}</p>
    {% endblock %}
{% endembed %}
```

{% endinfo_block %}

---
