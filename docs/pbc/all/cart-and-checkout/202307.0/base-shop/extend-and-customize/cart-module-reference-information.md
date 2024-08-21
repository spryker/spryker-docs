---
title: "Cart module: reference information"
last_updated: Aug 12, 2021
description: The extensive Cart module lets your customers add products to their cart by simply selecting the desired quantity.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202005.0/cart-feature-walkthrough/cart-module-reference-information.html
  - /docs/scos/dev/feature-walkthroughs/202307.0/cart-feature-walkthrough/cart-module-reference-information.html
  - /docs/pbc/all/cart-and-checkout/extend-and-customize/cart-module-reference-information.html
---

The `Cart` module consists of several components in Yves and Zed. The Yves components create the cart requests and persist the cart into the session. The Zed components persist the data into the database and expand the items with data obtained from plugins.

Cart operations are invoked in `CartClient`, which contains methods for all common operations (add, update, remove).

Each cart operation uses `CartChangeTransfer` objects. Each transfer holds the current quote transfer and the items that are being modified. Current `QuoteTransfer` is read from the current session and is provided by the `QuoteSession` session adapter.

When an operation is invoked, `CartClient` makes an HTTP request to the Zed `Cart` module. The cart module gateway controller forwards the request to `CartFacade` where a corresponding operation is handled and modified; `QuoteTransfer` is returned to Yves and persisted into the session.

## Cart data flow

![Cart Data Flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Cart+Functionality/cart_data_flow.png)

## Cart operations

The `Cart` module in Zed has a cart operation class that handles cart operation requests. Each operation does the following:

* *Expands cart items*. Augments cart items with additional data (prices, product details, and product options).
* *Persisting*. Storage provider stores items into the database and merges items if the same item is added. By default, it uses `NonPersistentProvider`.
* *Item grouping*. `Cart` uses the item grouper to group items in the cart using a specially crafted group key, which is provided by the cart expander. For example, a list containing the same item coming from different merchants must be split into separate groups and shipped separately.
* *Log operation message*. `Cart` writes messages to the messenger. These messages are returned to Yves — for example, validation messages, success, and failure messages.
* *Cart recalculation*. This happens for each operation in cart recalculation. Cart amounts are reset and recalculated with newly added items.

## Cart persistence providers

`Cart` has different persistence providers in Zed. By default, it only modifies the current `QuoteTransfer`, and it doesn't persist the data. A use case example is building a cart where the cart items are persisted between log-ins. In this case, `StorageProviderInterface` needs to be implemented, and the operation dependency must be changed.

## Cart expanders

Zed `Cart` modules can have expander plugins registered. Expander plugins expand the cart with additional data such as price information and product information, and they add product options.

Currently, we ship with several plugins:

| CART EXPANDER | DESCRIPTION |
| --- | --- |
| ProductCartPlugin | Adds product information to `ItemTransfer` (`idConcreteProduct`, `idAbstractProduct`, `abstractSku`, `name` and `taxRate`). |
| CartItemPricePlugin | Adds `unitGrossPrice` into `itemTransfer`. |
| CartItemProductOptionPlugin | Adds the `productOption` collection into `ItemTransfer`. |
| SkuGroupKeyPlugin | Appends SKU to the group key, so the item's int are grouped by SKU. |
| CartItemGroupKeyOptionPlugin | Creates a product option group key from option IDs, so items with different option combinations are placed separately. |

## Cart prechecks

The Zed `Cart` module has a list of pre-checks. These are validators that run when adding a new item to the cart. We have a list of default prechecks, which you may add your own to. To do so, add a new plugin to `Pyz/Zed/Cart/CartDependencyProvider::getCartPreCheckPlugins()`.

Currently, we ship a couple of default prechecks:

| CART PRE-CHECK | DESCRIPTION |
| --- | --- |
| ProductExistsCartPreCheckPlugin | Checks that the passed products exist in the DB. This plugin is provided by the `ProductCartConnector` module. |
| CartBundleAvailabilityPreCheckPlugin | Checks the availability of new cart items (products and product bundles). Provided by the `ProductBundle` module. |
| CheckAvailabilityPlugin | Checks the availability of new cart items (only products). Provided by the `AvailabilityCartConnector` module. |
