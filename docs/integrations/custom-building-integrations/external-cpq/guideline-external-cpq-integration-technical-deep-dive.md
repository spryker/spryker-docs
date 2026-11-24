---
title: "Integrating an external CPQ with Spryker: technical deep dive"
description: Technical detail of a CPQ integration with Spryker - behavior per storefront step and pattern, data contracts, pricing, quoting, failure handling, security and extension points.
last_updated: Nov 24, 2026
template: concept-topic-template
---

The detail behind the [integration guideline](/docs/integrations/custom-building-integrations/external-cpq/guideline-external-cpq-integration.html): what happens per step and pattern, and where the
project plugs in. Codes in brackets name CPQ capabilities. This document uses three:

- **C1 On-demand validation:** the CPQ confirms a stored or submitted configuration and its price.
- **C2 Stored configurations:** the CPQ restores a configuration by identifier.
- **C3 Bill of materials:** the CPQ returns manufacturing output per configuration.

[What to establish about the CPQ](/docs/integrations/custom-building-integrations/external-cpq/guideline-external-cpq-integration.html#what-to-establish-about-the-cpq) lists all capabilities.

## Patterns

[Patterns](/docs/integrations/custom-building-integrations/external-cpq/guideline-external-cpq-integration.html#patterns) in the guideline describes both patterns and how to choose between them.

- **Embedded:** the configurator's own UI runs on its own host. The storefront asks an adapter on the CPQ side for a
  redirect URL through the
  [configurator gateway](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/configurable-product-feature-overview/configuration-process-flow-of-configurable-product.html),
  and the configurator posts the signed result back. The CPQ side builds and hosts the adapter.
- **Headless:** the Spryker storefront or a composable frontend renders the configuration UI, which the project builds.
  Zed calls the CPQ session API for every selection, so CPQ credentials stay server-side.

## Steps by pattern

Differences only; shared behaviour in the middle column.

| Step | Both | Embedded | Headless |
|---|---|---|---|
| Catalog and search | Base product listed with its catalog price | — | — |
| Product page | Shows the default configuration's display data, or the buyer's session configuration | Configure button posts to the gateway | Project route or resource opens the project UI |
| Start configuration | Context: customer, store, locale, currency, price mode (+ project: company, business unit) | Server-to-server request for a redirect URL, then redirect | Session start call per product |
| Finish configuration | Instance carries configurator key, configuration, display data, completeness, prices, available quantity | Signed post back; signature, timestamp and mandatory fields checked; instance stored in session | Commit and price call; Zed builds the instance |
| Add to cart | Line separated by instance hash; price from the instance; project check validates and prices through on-demand validation (C1) | Instance taken from the session | Instance written by Zed |
| Change a configured line | The new instance replaces the line | Reconfigure through the gateway from the cart | Project UI restores from a stored configuration (C2) or full configuration |
| [Wishlist, shopping list](/docs/pbc/all/shopping-list-and-wishlist/latest/shopping-list-and-wishlist.html) | Instance stored with the item; not refreshed on open; checked when moved to the cart | Reconfigure through the gateway | Project UI |
| [Request for quote](/docs/pbc/all/request-for-quote/latest/request-for-quote.html) | Built from the cart; core checks completeness; project check validates and prices through on-demand validation (C1); agent changes price and quantity; configuration changes go back to the buyer's cart | — | — |
| Checkout | Core blocks incomplete lines; project check validates and prices before the order through on-demand validation (C1); a changed price blocks and shows the new one | — | — |
| Order | Order item keeps key, configuration and display data; storefront, back office and returns show it | — | — |
| [Reorder](/docs/pbc/all/customer-relationship-management/latest/base-shop/reorder-feature-overview.html) | Configuration restored as incomplete for confirmation; with on-demand validation (C1) a project check revalidates and reprices; otherwise the buyer reconfigures | Reconfigure through the gateway | Project UI |

## The configured line

- **Product:** the concrete product that carries the configurator key in Spryker's product configuration data.
- **Configuration instance:** configurator key, configuration, display data, completeness flag, prices, available
  quantity, quantity.
- **Configuration:** stored and returned by Spryker as is. Either the CPQ's reference to a stored configuration (C2) or the full document. Spryker stores it on the cart, wishlist, shopping list and order.
- **Display data:** what storefront, back office and returns render. Rendering is project work per configurator key.
- **Line identity:** the group key gets the hash of the instance appended, so two configurations of one product stay
  two lines. In the [B2B Demo Marketplace](https://github.com/spryker-shop/b2b-demo-marketplace) we excluded quantity
  from the hash through `ProductConfigurationConfig::getConfigurationFieldsNotAllowedForEncoding()`; adjust it to your
  requirements. Merchant and offer references are part of item identity.
- **Price:** the instance prices per currency and price mode, with optional volume prices. The cart takes the price
  whose instance hash matches the line. A source price on the item overrides it.

## Data contracts

The [configuration process flow](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/configurable-product-feature-overview/configuration-process-flow-of-configurable-product.html)
names the gateway fields, and
[Create a product configurator](/docs/pbc/all/product-information-management/latest/base-shop/tutorials-and-howtos/howto-create-a-product-configurator.html)
shows an adapter built against them.

**Gateway request** (Spryker → adapter, server-to-server JSON): configurator key, customer reference, store, locale,
price mode, currency, product SKU, item group key, current configuration and display data, quantity, wishlist or
shopping-list item identifier, source type, back URL, submit URL. Answer: success flag, redirect URL, message. The
project secures the request (see [Security](#security)).

**Gateway response** (configurator → Spryker, browser form post): configuration instance, SKU, item group key, customer
reference, source type, wishlist or shopping-list item identifier, timestamp, checksum. Mandatory: source type,
checksum, timestamp, configurator key. The checksum is a CRC32 of the posted data, encrypted with a key and
initialisation vector shared between Spryker and the adapter; the
[checksum section](/docs/pbc/all/product-information-management/latest/base-shop/tutorials-and-howtos/howto-create-a-product-configurator.html#configuratorpage)
shows the generator the adapter calls. Spryker rejects a timestamp older than 60 seconds.

**Prices in the instance:** per currency, a gross and a net amount for the default price type, plus optional price
data that carries volume prices.

**Configuration document:** owned and versioned by the configurator. Spryker stores and returns it unchanged.

**Identifier mapping:** the configurator key and default configuration per concrete product are imported into Spryker
product configuration data. The default configuration carries the CPQ model identifier; the adapter or CPQ client maps
SKU to model from it.

**Headless CPQ calls:** On-demand validation: start, set value, state, commit, price, validate; for stored configurations : restore. Build the client on the [ERP integration template](/docs/integrations/custom-building-integrations/erp-integration-template.html), with one request and mapper per operation, credentials from the environment, and two error classes: business errors (invalid selection, conflict, incomplete, price unavailable) shown to the buyer, technical errors (timeout, unavailable, authentication) that stop the operation.

**CPQ quote handoff:** quote reference, status, validity, quoted lines with configuration reference and quoted price.

## Pricing

The configuration instance is the price cache. Price validity, when the CPQ returns one, goes into the
configuration so the project check can skip calls while it is valid. For
[Spryker discounts](/docs/pbc/all/discount-management/latest/base-shop/promotions-discounts-feature-overview.html), decide per project: apply them, exclude configured items from discountable items, or delegate promotion codes to the CPQ. 
When the CPQ returns a price breakdown that cart or order must show, aggregate it in a calculation plugin and store it on the order item.
To lower the number of calls to the CPQ and still show prices to buyers, we recommend these prices per step:

| Step | Price shown | Authority |
|---|---|---|
| Listing, product page before configuring | Catalog price of the base product | Spryker catalog |
| While configuring | Configurator's price | CPQ |
| Cart | Instance price, confirmed at every cart write through on-demand validation (C1) | CPQ |
| Request for quote | Instance price as start price; agent sets a source price | Agent |
| Accepted quote | Source price, kept by the locked cart | Negotiated |
| Quote unlocked | Source price cleared; instance price applies again | CPQ |
| Order placement | Instance price confirmed before the order through on-demand validation (C1); a change blocks the order and shows the new price | CPQ |
| Reorder | Catalog price until revalidated through on-demand validation (C1) or reconfigured | CPQ after revalidation |


## Quoting

**[Spryker request for quote](/docs/pbc/all/request-for-quote/latest/request-for-quote.html).** A request is always created from a cart: each version stores a copy of the cart, and
creation is rejected for an empty one. The core rejects incomplete configurations at creation by buyer and agent; the
project validator adds revalidation through on-demand validation (C1). Agents change price and quantity; a configuration change goes back to the
buyer's cart, where the buyer reconfigures through the configurator. Acceptance turns the version into a locked cart
that keeps the source prices. A composable frontend reads configured lines of a request from its cart.

**CPQ quote.** Block Spryker requests for quote for carts with configured lines. Quote operations run through project
entry points. Acceptance reads the quote, writes the quoted lines with their source prices into the cart, stores quote
reference, status and validity on the cart, and locks it. A checkout pre-condition rejects an expired, withdrawn or
unapproved quote. Status arrives by a [Backend API](/docs/integrations/spryker-api/backend-api/backend-api.html) resource the CPQ calls, or by reading it at checkout. Documents are
streamed through project routes in storefront and back office.

## After the order

The order item keeps configurator key, configuration and display data; the order item price is the price the buyer
paid. Order management hands the configuration to the ERP with the order: the reference to a stored configuration (C2) or the full document,
plus a bill of materials (C3) when the CPQ provides one, fetched asynchronously. Both run in the order's
[state machine](/docs/pbc/all/order-management-system/latest/base-shop/state-machine-cookbook/state-machine-cookbook-state-machine-fundamentals.html):
a project command fetches the bill of materials and stores it on the order item, a condition moves the order on once
every configured item has one, and a timeout event runs the command again until it succeeds. A second command exports
the order to the ERP; the
[ERP integration template](/docs/integrations/custom-building-integrations/erp-integration-template.html)
ships one as a starting point. Cancellation and returns work per
order item; returns show the configuration.
[Order amendment](/docs/pbc/all/order-management-system/latest/base-shop/order-amendment-feature-overview.html) restores configured items in the amendment cart like reorder: configuration kept, marked incomplete, without configuration price; the order item saves the configuration as amended.
To change a configuration after the order, cancel the item and order it again with the new configuration.

When the project places orders during a CPQ outage, an unconfirmed order enters a waiting state in the state machine
before the bill of materials and the ERP export. A project command revalidates all configured items of the order in
one bulk call (C1), and a timeout event runs it again while the CPQ is unavailable. A condition moves the order on
when the CPQ confirms configuration and price. When the CPQ reports a changed price or an invalid configuration, the
order follows the project's decision: (a) it waits in a state for the buyer, who accepts the new price or cancels;
(b) it moves to cancelled; (c) it moves on at the original price. A project command notifies the buyer of the outcome
by mail.

## Calls and limits

Revalidation sends all configured lines of a cart in one bulk call at every cart write, request for quote, order
placement and reorder. Set timeouts per operation: short for interactive calls, longer for
validation, longest for quotes and documents. Retry read calls only. Keep the configuration small: the cart, lists
and order store it, and every cart load reads it. Calls per step:

| Step | Embedded | Headless |
|---|---|---|
| Start | 1 server-to-server call, then a redirect | 1 call |
| Each selection | 0 (inside the configurator) | 1 call |
| Finish | 0 (browser post) | 1 commit + 1 price |
| Cart write, with on-demand validation (C1) | 1 bulk validate-and-price call per cart | Same |
| Request for quote, order placement, with on-demand validation (C1) | 1 bulk call per cart | Same |
| Reorder or list to cart, with on-demand validation (C1) | 1 bulk call per cart | Same |


## Failure per step

Report every failure with its error class, operation, configurator key, configuration reference and cart
reference. A [health check](/docs/dg/dev/integrate-and-configure/integrate-health-checks.html) calls the cheapest read-only CPQ endpoint with the configured credentials. Failures, step
by step:

| Step | Failure | Buyer sees | Recovery |
|---|---|---|---|
| Start (embedded) | Adapter unreachable | Back on the page with an error | Retry later |
| Selection (headless) | CPQ timeout | Error on the selection; state re-read before retry | Re-read state |
| Signed response | Bad checksum, expired timestamp, missing field | Error; nothing stored | Configure again |
| Cart write, with on-demand validation (C1) | CPQ unavailable | Project decision: line rejected, or accepted unconfirmed | Confirmed before the order |
| Cart write, with on-demand validation (C1) | Configuration invalid | Line rejected, or kept and flagged for reconfiguration | Reconfigure |
| Order placement, with on-demand validation (C1) | Price changed | Order blocked, new price shown | Confirm and place again |
| Order placement, with on-demand validation (C1) | CPQ unavailable | Project decision: order refused with an error, or placed unconfirmed | Retry; or background revalidation, buyer notified of the outcome |
| Background revalidation | Price changed or configuration invalid | Project decision; we propose: (a) order held until the buyer accepts the new price or cancels, (b) order cancelled and the buyer asked to order again, (c) order goes ahead at the original price | Buyer notified |
| CPQ quote status | Status missed | Expired quote looks valid | Status checked at checkout |
| Order handoff | Bill of materials unavailable | Nothing; order placed | Asynchronous retry |


## Security

- **Shared signing key.** The adapter holds the same key and initialisation vector as Spryker. Set both per
  environment; the B2B Demo Marketplace defaults are for development.
- **Gateway request.** Authenticate the request to the adapter: restrict the adapter to calls from Spryker, or add a
  token through a request expander.
- **CPQ quote status.** The CPQ calls a Spryker Backend API resource. Authenticate the CPQ as an API client, see
  [Integrate API Platform security](/docs/integrations/spryker-api/authenticating-and-authorization/integrate-api-platform-security.html).
- **Short validity.** A signed response older than 60 seconds is rejected.
- **API clients.** [Glue](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-configuration-glue-api.html) cart, wishlist and shopping-list items accept a configuration instance including completeness
  and prices from the client as posted, and check that the configurator key matches the product. A composable
  frontend therefore needs on-demand validation (C1) at cart write; without it, the project sets prices and completeness
  server-side and cannot accept price changes via API.
- **Credentials.** Headless CPQ credentials live in the environment and are used from Zed only.
- **Personal data.** The gateway sends the customer reference. Send company and business unit when the CPQ
  prices by them; the customer reference stands in for names and addresses.

## Audit and observability

Log every CPQ call with operation, configurator key, configuration reference, cart reference, duration and error
class, and send a correlation ID the CPQ logs as well. 

Price origin is visible on the line: a source price means a negotiated price, otherwise the instance price came from the 
CPQ. The order keeps the configuration as placed. 
Model changes are recorded in the CPQ; the model version inside the configuration ties a line to the model it was built on.

## Extension points

Verified against the [B2B Demo Marketplace](https://github.com/spryker-shop/b2b-demo-marketplace).
Core: provided and wired by the
[Configurable Product feature](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html).
Project: built by the project on the named interface.

| Piece | Purpose | Interface → stack | Core / project |
|---|---|---|---|
| Configurator | Configurator host and context per key | `ProductConfiguratorRequestExpanderPluginInterface` → Client `ProductConfigurationDependencyProvider::getProductConfigurationRequestExpanderPlugins()` | Project (the example plugin sets one host for all keys) |
| Configurator | Supported configurator keys per source | `getSupportedConfiguratorKeys()` in the Yves configs `ProductConfiguratorGatewayPageConfig`, `ProductConfigurationCartWidgetConfig`, `ProductConfigurationWishlistWidgetConfig`, `ProductConfigurationShoppingListWidgetConfig` | Project |
| Configurator | Round trip for product page, cart, wishlist, shopping list | `ProductConfiguratorRequestStrategyPluginInterface`, `ProductConfiguratorResponseStrategyPluginInterface` → Yves `ProductConfiguratorGatewayPageDependencyProvider` | Core |
| Configurator | Instance from session or default on add to cart | `ProductConfigurationCartChangeRequestExpanderPlugin` → Client `CartDependencyProvider::getAddItemsRequestExpanderPlugins()` | Core |
| Configurator | Line separation | `ProductConfigurationGroupKeyItemExpanderPlugin` → Zed `CartDependencyProvider::getExpanderPlugins()` | Core |
| Configurator, pricing | Validate and price on cart write, with on-demand validation (C1) | `CartPreCheckPluginInterface` → Zed `CartDependencyProvider::getCartPreCheckPlugins()`; `ItemExpanderPluginInterface` → `getExpanderPlugins()`, after the group key expander | Project |
| Configurator | Completeness at checkout | `ProductConfigurationCheckoutPreConditionPlugin` → Zed `CheckoutDependencyProvider::getCheckoutPreConditions()` | Core |
| Configurator, pricing | Validate and price before order, with on-demand validation (C1) | `CheckoutPreConditionPluginInterface` → `getCheckoutPreConditions()`; `CheckoutDataValidatorPluginInterface` → Zed `CheckoutRestApiDependencyProvider::getCheckoutDataValidatorPlugins()` | Project |
| Pricing | Price from the instance | `ProductConfigurationPriceProductExpanderPlugin` → Zed `PriceCartConnectorDependencyProvider::getPriceProductExpanderPlugins()`; `ProductConfigurationPriceProductFilterPlugin`, `ProductConfigurationVolumePriceProductFilterPlugin` → Service `PriceProductDependencyProvider::getPriceProductDecisionPlugins()` | Core |
| Pricing | Negotiated price over CPQ price | Item source price applied by `CartItemPricePlugin`; cleared on unlock by `SanitizeSourcePricesQuoteLockPreResetPlugin` → Zed `CartDependencyProvider::getQuoteLockPreResetPlugins()` | Core |
| Pricing | Exclude configured items from discounts | `DiscountableItemFilterPluginInterface` → Zed `DiscountDependencyProvider::getDiscountableItemFilterPlugins()` | Project |
| Pricing | Price breakdown in totals | `CalculationPluginInterface` → Zed `CalculationDependencyProvider::getQuoteCalculatorPluginStack()`, `::getOrderCalculatorPluginStack()` | Project |
| Quoting | Completeness at request for quote | `ProductConfigurationQuoteRequestQuoteCheckPlugin`, `ProductConfigurationQuoteRequestValidatorPlugin`, `ProductConfigurationQuoteRequestUserValidatorPlugin` → Client and Zed `QuoteRequestDependencyProvider` | Core |
| Quoting | Validate and price at request for quote, with on-demand validation (C1) | `QuoteRequestValidatorPluginInterface`, `QuoteRequestUserValidatorPluginInterface` → Zed `QuoteRequestDependencyProvider` | Project |
| Quoting | Block Spryker request for quote (CPQ quote) | `QuoteRequestPreCreateCheckPluginInterface` → Zed `QuoteRequestDependencyProvider::getQuoteRequestPreCreateCheckPlugins()` | Project |
| Quoting | Quote reference, status, validity on the cart | `QuoteExpanderPluginInterface` → Zed `QuoteDependencyProvider::getQuoteExpanderPlugins()` | Project |
| Quoting | Lock the accepted quote | `QuoteFacadeInterface::lockQuote()` | Core |
| Quoting | Quote reference on the order | `OrderExpanderPreSavePluginInterface` → Zed `SalesDependencyProvider::getOrderExpanderPreSavePlugins()` | Project |
| Quoting | Quote status from the CPQ | Backend API route provider → `GlueBackendApiApplicationDependencyProvider::getRouteProviderPlugins()` | Project |
| Quoting | Quote notifications | `MailTypeBuilderPluginInterface` → Zed `MailDependencyProvider::getMailTypeBuilderPlugins()` | Project |
| Configurator | Configuration on the order | `ProductConfigurationOrderItemsPostSavePlugin`, `ProductConfigurationOrderItemExpanderPlugin` → Zed `SalesDependencyProvider` | Core |
| Order handoff | Fetch the bill of materials (C3), retried by a timeout event; export the order to the ERP | `CommandByOrderInterface` → Zed `OmsDependencyProvider::extendCommandPlugins()` | Project |
| Order handoff | Hold the order until every configured item has its bill of materials (C3) | `ConditionInterface` → Zed `OmsDependencyProvider::extendConditionPlugins()` | Project |
| Configurator, pricing | Revalidate an order placed unconfirmed during a CPQ outage, retried by a timeout event (C1); notify the buyer of the outcome | `CommandByOrderInterface` → Zed `OmsDependencyProvider::extendCommandPlugins()` | Project |
| Configurator, pricing | Move an order placed unconfirmed on once the CPQ confirms it, or into the project's choice of (a) hold, (b) cancel, (c) original price | `ConditionInterface` → Zed `OmsDependencyProvider::extendConditionPlugins()` | Project |
| Configurator | Configuration in back office and storefront order views | `ProductConfigurationSalesOrderDetailDataExpanderPlugin`; order item display widget | Core, display per key project |
| Configurator | Reorder restores configuration | `ProductConfigurationCartReorderItemHydratorPlugin` → Zed `CartReorderDependencyProvider::getCartReorderItemHydratorPlugins()` | Core |
| Configurator | Revalidate on reorder, with on-demand validation (C1) | `CartReorderValidatorPluginInterface` → `getCartReorderValidatorPlugins()`, or the cart-write check | Project |
| Configurator, pricing | Verify and price on reorder and amendment (C1) | `CartReorderItemHydratorPluginInterface` → Zed `CartReorderDependencyProvider::getCartReorderItemHydratorPlugins()`, after `ProductConfigurationCartReorderItemHydratorPlugin` | Project |
| Pricing | Amendment price strategy per configuration | `OriginalSalesOrderItemPriceGroupKeyExpanderPluginInterface` → Service `PriceProductSalesOrderAmendmentDependencyProvider::getOriginalSalesOrderItemPriceGroupKeyExpanderPlugins()` | Project |
| Configurator | Glue cart items with configuration | `CartItemProductConfigurationRestRequestValidatorPlugin`, `ProductConfigurationCartItemExpanderPlugin`, `ProductConfigurationCartItemMapperPlugin`, `ProductConfigurationRestCartItemsAttributesMapperPlugin` | Core |
| Configurator | Headless session entry points | Yves `RouteProviderPluginInterface` → `RouterDependencyProvider::getRouteProvider()`; storefront resources on [API Platform](/docs/integrations/spryker-api/api-platform/api-platform.html) | Project |
| All | Health check | `HealthCheckPluginInterface` → Zed `HealthCheckDependencyProvider::getHealthCheckPlugins()` | Project |
