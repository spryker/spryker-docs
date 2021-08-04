---
title: Cart module- Reference information
originalLink: https://documentation.spryker.com/2021080/docs/cart-module-reference-information
redirect_from:
  - /2021080/docs/cart-module-reference-information
  - /2021080/docs/en/cart-module-reference-information
---

Our Cart consists of a few components in Yves and Zed. The Yves components create the cart requests and persist the cart into the session. The Zed components persist the data into the database and expand the items with data obtained from plugins.

Cart operations are invoked in `CartClient`, which contains methods for all common operations (add, update, remove).

Each cart operation uses `CartChangeTransfer` objects. Each transfer holds the current quote transfer and the items that are being modified. Current `QuoteTransfer` is read from current session and is provided by the `QuoteSession` session adapter.

When an operation is invoked, `CartClient` makes an HTTP request to Zed Cart module. The cart module gateway controller forwards the request to the `CartFacade` where a corresponding operation is handled and modified; `QuoteTransfer` is returned to Yves and persisted into the session.

## Cart Data Flow

![Cart Data Flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+Cart/Cart/Cart+Functionality/cart_data_flow.png){height="" width=""}

## Cart Operations
The Cart module in Zed has a cart operation class that handles cart operation requests. Each operation does the following:

* **Expand cart items** - augment cart items with additional data (prices, product details, ProductOptions, …)
* **Persisting** - storage provider stores items into the database, merges items if same item was added, by default it uses a NonPersistentProvider.
* **Item grouping** - cart uses the item grouper to group items in the cart using a specially crafted group key, which is provided by cart Expander (e.g.: a list containing the same item coming from different merchants should be split into separate groups and shipped separately).
* **Log operation message** - Cart writes to messenger messages which should be returned to Yves (for example: validation messages, success, failure messages).
* **Cart recalculation** - happens for each operation in cart recalculation. Cart amounts are reset and recalculated with new added items.

## Cart Persistence Providers
The Cart has different persistence providers in Zed. By default, it only modifies current QuoteTransfer and it doesn’t persists the data. An example for use case for this is building a cart where the cart items are persisted between log-ins. In this case the `StorageProviderInterface` needs to be implemented and the operation dependency must be changed.

## Cart Expanders
Zed Cart modules can have expander plugins registered. Expander plugins expand the cart with additional data such as price information, product information and add product options.

Currently we ship with a couple of plugins:

| Cart Expander | Description |
| --- | --- |
| ProductCartPlugin | Adds product information to ItemTransfer (idConcreteProduct, idAbstractProduct, abstractSku, name and taxRate). |
| CartItemPricePlugin | Adds unitGrossPrice into itemTransfer. |
| CartItemProductOptionPlugin | Adds productOption collection into ItemTransfer. |
| SkuGroupKeyPlugin | Appends SKU to the group key so item's int are grouped by SKU. |
| CartItemGroupKeyOptionPlugin | Creates product option group key from option ids, so items with different option combinations would be placed separated. |

## Cart Pre-Checks
The Zed Cart module has a list of Pre-Checks. These are validators which run when adding a new item to the cart. We have a list of default Pre-Checks and of course you might want to add your own. To do so just add a new plugin to `Pyz\Zed\Cart\CartDependencyProvider::getCartPreCheckPlugins()`.

Currently we ship a couple of default Pre-Checks:

| Cart Pre-Check | Description |
| --- | --- |
| ProductExistsCartPreCheckPlugin | Checks that passed products exist in the DB. This plugin is provided by ProductCartConnector module. |
| CartBundleAvailabilityPreCheckPlugin | Check availability of new cart items (products and product bundles). Provided by ProductBundle module. |
| CheckAvailabilityPlugin | Check availability of new cart items (only products). Provided by AvailabilityCartConnector module. |
