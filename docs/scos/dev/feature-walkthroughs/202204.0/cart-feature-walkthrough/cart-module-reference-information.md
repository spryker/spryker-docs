---
title: "Cart module: reference information"
last_updated: Aug 12, 2021
description: The extensive Cart allows your customers to add products to their Cart by simply selecting the desired quantity.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202005.0/cart-feature-walkthrough/cart-module-reference-information.html
---

Our `Cart` consists of a few components in Yves and Zed. The Yves components create the cart requests and persist the cart into the session. The Zed components persist the data into the database and expand the items with data obtained from plugins.

Cart operations are invoked in `CartClient`, which contains methods for all common operations (add, update, remove).

Each cart operation uses `CartChangeTransfer` objects. Each transfer holds the current quote transfer and the items that are being modified. Current `QuoteTransfer` is read from the current session and is provided by the `QuoteSession` session adapter.

When an operation is invoked, `CartClient` makes an HTTP request to the Zed `Cart` module. The cart module gateway controller forwards the request to the `CartFacade` where a corresponding operation is handled and modified; `QuoteTransfer` is returned to Yves and persisted into the session.

## Cart data flow

![Cart Data Flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Cart+Functionality/cart_data_flow.png)

## Cart operations

The Cart module in Zed has a cart operation class that handles cart operation requests. Each operation does the following:

* *Expand cart items*—augment cart items with additional data (prices, product details, or `ProductOptions`.)
* *Persisting*—storage provider stores items into the database and merges items if the same item is added. By default, it uses a `NonPersistentProvider`.
* *Item grouping*—the cart uses the item grouper to group items in the cart using a specially crafted group key, which is provided by a cart expander—for example, a list containing the same item coming from different merchants must be split into separate groups and shipped separately).
* *Log operation message*—сart writes to messenger messages which must be returned to Yves—for example, validation messages, success, failure messages.
* *Cart recalculation*—happens for each operation in cart recalculation. Cart amounts are reset and recalculated with newly added items.

## Cart persistence providers

The Cart has different persistence providers in Zed. By default, it only modifies current `QuoteTransfer` and it doesn't persist the data. A use case example of this is building a cart where the cart items are persisted between log-ins. In this case, the `StorageProviderInterface` needs to be implemented and the operation dependency must be changed.

## Cart expanders

Zed `Cart` modules can have expander plugins registered. Expander plugins expand the cart with additional data, such as price information, and product information, and they add product options.

Currently, we ship with a couple of plugins:

| CART EXPANDER | DESCRIPTION |
| --- | --- |
| ProductCartPlugin | Adds product information to `ItemTransfer` (`idConcreteProduct`, `idAbstractProduct`, `abstractSku`, `name` and `taxRate`). |
| CartItemPricePlugin | Adds `unitGrossPrice` into `itemTransfer`. |
| CartItemProductOptionPlugin | Adds `productOption` collection into `ItemTransfer`. |
| SkuGroupKeyPlugin | Appends SKU to the group key so item's int are grouped by SKU. |
| CartItemGroupKeyOptionPlugin | Creates product option group key from option IDs, so items with different option combinations would be placed separated. |

## Cart prechecks

The Zed `Cart` module has a list of Prechecks. These are validators that run when adding a new item to the cart. We have a list of default prechecks, which you may add your own to. To do so, add a new plugin to `Pyz/Zed/Cart/CartDependencyProvider::getCartPreCheckPlugins()`.

Currently, we ship a couple of default prechecks:

| CART PRE-CHECK | DESCRIPTION |
| --- | --- |
| ProductExistsCartPreCheckPlugin | Checks that passed products exist in the DB. This plugin is provided by `ProductCartConnector` module. |
| CartBundleAvailabilityPreCheckPlugin | Check availability of new cart items (products and product bundles). Provided by `ProductBundle` module. |
| CheckAvailabilityPlugin | Check availability of new cart items (only products). Provided by `AvailabilityCartConnector` module. |
