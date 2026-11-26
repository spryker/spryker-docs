---
title: Integrating an external CPQ with Spryker
description: Plan a CPQ integration with Spryker - choose the embedded or headless pattern, decide who owns configuration rules, price and quotes, and learn the rules that always hold.
last_updated: Nov 24, 2026
template: concept-topic-template
---

This guideline helps you plan a CPQ integration with Spryker. The capabilities to establish about the CPQ are numbered
C1–C9 in [What to establish about the CPQ](#what-to-establish-about-the-cpq) and referenced in parentheses, for
example quote API (C7).

A configurable product is sold in Spryker as one concrete product, but the buyer orders a combination of options that
only the configurator can validate and price. The CPQ owns the rules and the price, while Spryker owns the buying journey.
Spryker's Configurable Product feature carries a configuration from the configurator through cart, wishlist, shopping
list, request for quote, order and reorder. The
[feature overview](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html)
and the
[configuration process flow](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/configurable-product-feature-overview/configuration-process-flow-of-configurable-product.html)
describe the configured item, the configurator gateway and the journey. This guideline covers what an external CPQ
adds: the pattern, ownership of data and price, and a safe connection.

A CPQ contributes three pieces: configurator, pricing and quoting. A project adopts one, two or all
three. Pricing and quoting build on the configurator.

## Rules that always hold

These rules hold in every pattern. The pattern, the quote owner, price caching, how Spryker discounts apply, and
whether a CPQ-side cart is kept in step are negotiable per project.

| Rule | Why |
|---|---|
| Configuration rules run only in the CPQ. | The CPQ is the single source of the product model; a second rule engine drifts with every model change. |
| Spryker owns cart, checkout, order placement, reorder and the order handoff, and calls the CPQ when it needs data. | Tax, payment, availability, approval and order management run in Spryker; the order is placed where they run. |
| The CPQ sets the price of a configured line; a negotiated price overrides it. | One price authority per step. The CPQ price is the start price for negotiation. |
| The order keeps the configuration: configurator key, configuration and display data. | Order history, back office, returns and the ERP handoff work without calling the CPQ. |
| Spryker never takes a price or completeness posted by a browser or API client as given: the configurator gateway checks the signed result, and an API client's post is confirmed with the CPQ (C1) or set server-side. | Glue accepts the configuration as posted; the CPQ is the one that says it is valid. |

### What Spryker keeps and sends

Spryker keeps a copy of each configuration on the line: configurator key, configuration (a CPQ reference or the full
document), display data, completeness, prices and available quantity. Wishlists, shopping lists and order history
show their copy; the copy is refreshed when the item enters the cart. The gateway sends customer reference, store,
locale, currency and price mode to the configurator; the project adds company, business unit and merchant when the
CPQ prices by them.

## What to establish about the CPQ

To integrate as a configurator, the CPQ needs a configurator UI that hands the finished configuration back, or an
API to drive a configuration step by step. The UI enables the embedded pattern, the API the headless pattern. With
neither, its products are sold as Spryker catalog products.

The embedded pattern needs an adapter on the configurator side that connects the configurator to the Spryker
configurator gateway. The
[configuration process flow](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/configurable-product-feature-overview/configuration-process-flow-of-configurable-product.html)
describes the contract the adapter implements, and
[Create a product configurator](/docs/pbc/all/product-information-management/latest/base-shop/tutorials-and-howtos/howto-create-a-product-configurator.html)
shows how to build one on its own host.

| # | Capability | If yes | If no |
|---|---|---|---|
| C1 | **On-demand validation:** confirms stored or submitted configurations and their prices, in bulk for all lines of a cart | Spryker revalidates at every cart write, request for quote and order | Spryker treats a committed configuration as final |
| C2 | **Stored configurations:** restorable by identifier | Spryker keeps the identifier | Spryker keeps the full configuration and sends it back as the start state |
| C3 | **Bill of materials:** manufacturing output per configuration | The order handoff carries it | The ERP derives it from the configuration |
| C4 | **Configurator UI:** runs on its own host and hands a finished configuration back to a URL | Embedded pattern possible | Headless |
| C5 | **Session API:** start, set value, state with conflicts and completeness, commit | Headless pattern possible | Embedded |
| C6 | **Configuration pricing:** price for customer, company, store, currency, price mode and quantity | The CPQ is the price authority | The configurator's indicative price or the catalog price applies; negotiation sets the final price |
| C7 | **Quote API:** quotes with readable or pushed status | CPQ quote possible | Spryker request for quote owns the quote |
| C8 | **Server authentication** for server-to-server calls | Every server-side call uses it | Put authentication in front of the CPQ, for example in an API gateway |
| C9 | **Licence metric** for calls driven by storefront traffic | Size it against cart writes and buyer sessions | — |

## Patterns

Each pattern works with either quote owner: a Spryker agent negotiates in the Spryker request for quote, or sales
negotiates in a CPQ quote. [How to choose](#how-to-choose-the-pattern) gives the triggers, and
[Price and quotes](#price-and-quotes) describes both. Integration logic runs in Zed-layer in both patterns. Interactive
calls are synchronous. Quote status, bill of materials and the order handoff are asynchronous: Zed-layer runs them as
queue jobs or console commands, the CPQ can push quote status and bill of materials to Spryker through webhooks, and the
customer's external integration platform can carry them when one exists.

The first deciding question: **who renders the configuration UI?**

| | Embedded configurator | Headless CPQ |
|---|---|---|
| UI | The configurator's own UI, on its own host | Spryker storefront or a separate frontend |
| Connection | Spryker configurator gateway: redirect to the configurator, signed result posted back | Zed calls the CPQ session API for every selection |
| Fits when | The CPQ team maintains the UI (guided steps, visualisation) and the journey can hand the buyer over | The UI follows the storefront's design system, the frontend is composable, or each selection needs Spryker data |
| What it costs | A handover in the journey; the adapter; an API-only frontend builds the handover itself | The full configuration UI is project-built; one CPQ call per selection |

### Embedded configurator

The storefront asks the adapter for a redirect URL, the buyer configures in the configurator UI, and the configurator
posts the signed, timestamped result back. Spryker stores it where the journey started.

{% comment %}
Diagram source (Mermaid). The rendered SVG is hosted on S3.
After editing, re-render with mermaid-cli using htmlLabels disabled
(labels inside foreignObject do not display when the SVG is loaded as an image),
then re-upload the SVG under the same file name.

flowchart LR
    Buyer((Buyer))
    subgraph K[Spryker]
        Y[Storefront<br/>configurator gateway]
        Z[Zed<br/>cart, RFQ, checkout, order]
    end
    subgraph C[CPQ side]
        A[Adapter]
        UI[Configurator UI]
        E[CPQ engine]
    end
    Buyer -->|1 Configure| Y
    Y -->|2 Request redirect URL| A
    A --> E
    Y -->|3 Redirect| UI
    Buyer --> UI
    UI --> E
    UI -->|4 Signed result via browser| Y
    Y -->|5 Add or replace line| Z
    Z -.->|6 Validate and price| E
{% endcomment %}
![Embedded configurator pattern: the storefront configurator gateway requests a redirect URL from the CPQ adapter, redirects the buyer to the configurator UI, receives the signed result through the browser, and adds or replaces the line in Zed, which can validate and price it with the CPQ engine](https://spryker.s3.eu-central-1.amazonaws.com/docs/integrations/external-cpq/cpq-embedded-configurator.svg)

### Headless CPQ

The frontend sends every selection through Zed, so CPQ credentials stay server-side. On commit, Zed writes the
configuration onto the cart line; from there the line behaves like an embedded one.

Dotted arrows run with on-demand validation (C1), see [Revalidation](#revalidation).

{% comment %}
Diagram source (Mermaid). The rendered SVG is hosted on S3.
After editing, re-render with mermaid-cli using htmlLabels disabled
(labels inside foreignObject do not display when the SVG is loaded as an image),
then re-upload the SVG under the same file name.

flowchart LR
    Buyer((Buyer))
    subgraph K[Spryker]
        F[Storefront or<br/>composable frontend]
        Z[Zed<br/>CPQ client, cart, RFQ, checkout, order]
    end
    E[CPQ API]
    Buyer --> F
    F -->|1 Start, select, commit| Z
    Z -->|2 Session calls| E
    Z -->|3 Write instance on cart line| Z
    Z -.->|4 Validate and price| E
{% endcomment %}
![Headless CPQ pattern: the storefront or a composable frontend sends start, select and commit to Zed, Zed makes the session calls to the CPQ API, writes the instance on the cart line, and can validate and price it with the CPQ API](https://spryker.s3.eu-central-1.amazonaws.com/docs/integrations/external-cpq/cpq-headless.svg)

### How to choose the pattern

Rules, that you cannot negotiate, are:
- No configurator UI (C4) → go headless.
- No session API (C5) → embedded.
- No quote API (C7) → Spryker request for quote.

**Default: embedded with Spryker request for quote.** It reuses the UI the CPQ team already maintains and the most
Spryker functionality.

**Deviate to headless when** the UI must follow the storefront's design or accessibility rules, the buyer configures
many products in one journey, the frontend is composable, the configurator UI is built for internal users only, or
each selection needs Spryker data such as availability or customer prices. **Deviate to CPQ quote when** quotes need
the CPQ approval workflow or documents, or sales works in the CPQ or its CRM.

Both patterns, from one or several systems, can run side by side: the configurator key on each product decides which configurator serves it.

## What every integration must get right

### Price and quotes

Before configuring, the buyer sees the base product's catalog price. The configuration price from the CPQ applies in
the cart. A negotiated price is set as the item source price and overrides it; a locked cart keeps it, and unlocking
falls back to the CPQ price. The CPQ applies ERP contract prices itself or by calling the ERP. Decide per project
whether Spryker discounts apply to configured lines.

**Spryker request for quote.** A request is built from a cart. The agent changes price and quantity; configuration
changes go back to the buyer's cart. Acceptance turns the request into a locked cart with the negotiated prices.

**CPQ quote.** The project blocks Spryker requests for quote for configured carts. When the buyer accepts, Spryker reads the
quote (C7) and writes the quoted lines and prices into a locked cart with quote reference, status and validity;
checkout reads the status again and rejects an expired or withdrawn quote.

### Revalidation

With on-demand validation (C1), Spryker confirms configuration and price at every cart write (add, replace, move from a
list, reorder), at request-for-quote creation and before order placement. A changed price blocks the order and shows
the new one; an invalid configuration sends the buyer back to the configurator. A price validity returned by the CPQ
lets the check skip calls while it lasts. Without it, the committed configuration is final and a reorder is
reconfigured by the buyer.

### Trust and security

- Configure the gateway authentication per environment.
- Authenticate the gateway request to the adapter: allow calls from Spryker only, or add a token.
- CPQ credentials stay in Zed. The customer reference stands in for names and addresses.

### Availability and load

When the CPQ is down, starting or changing a configuration fails. At cart write, the project decides: block, or accept
and recheck before the order. At order placement, the project decides: refuse the order with an error until the CPQ
answers, or place it unconfirmed, revalidate it in the background and notify the buyer of the outcome. When the
background revalidation finds a changed price or an invalid configuration, the project team decides the outcome;
we propose one of:

- (a) the order is held until the buyer accepts the new price or cancels;
- (b) the order is cancelled and the buyer is asked to order again;
- (c) the order goes ahead at the original price.

Order history, back office and returns work from the stored configuration. Spryker insists on bulk operations for cart processing, so revalidation sends all configured
lines of a cart in one bulk call. A CPQ that validates one configuration per call is a risk once carts exceed 20
items or the project's response-time requirements. Retry read calls only. Calls driven by storefront traffic count against the
licence metric (C9). Log every CPQ call with a correlation ID.

### Order handoff

The order passes the configuration to the ERP as a reference to a stored configuration (C2) or the full document, plus
a bill of materials (C3), fetched asynchronously.
[Order amendment](/docs/pbc/all/order-management-system/latest/base-shop/order-amendment-feature-overview.html)
and reorder load the order into a cart with each configuration kept, marked incomplete and without a price. A project
hydrator verifies the configuration with on-demand validation (C1) and requests its price, so the line stays
orderable; otherwise the buyer configures the item again. The amendment price strategy (current, original or best
price) keys original prices by SKU; the project adds the
[configuration](/docs/pbc/all/product-information-management/latest/base-shop/tutorials-and-howtos/howto-create-a-product-configurator.html#5-allow-the-configurator-key-in-the-shop)
to that key, so each configured line keeps
its own original price.
Amendment covers orders placed from a cart; orders created through a request for quote keep their negotiated terms.

## What the project builds

This is the scope a project plans on top of the Configurable Product feature
([Install the Product Configuration feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-configuration-feature.html)). [Extension points](/docs/integrations/custom-building-integrations/external-cpq/guideline-external-cpq-integration-technical-deep-dive.html#extension-points) names the plug-in point for each.

| Need | Pattern | Why |
|---|---|---|
| Configurator adapter for the gateway contract | Embedded | Connects the CPQ's UI to the Spryker configurator gateway |
| Configurator host and context per configurator key | Embedded | Each CPQ model is reached at its host with the buyer's commerce context |
| Configuration UI, entry points and CPQ client | Headless | The frontend renders the configuration; Zed holds the CPQ credentials |
| Display of a configuration | Both | Cart, order and back office show what the buyer chose |
| Revalidation at cart write, request for quote and checkout (C1) | Both | The CPQ confirms configuration and price before Spryker relies on them |
| Verified and priced configurations on reorder and amendment (C1) | Both | Reordered and amended lines stay orderable |
| Background revalidation of orders placed during a CPQ outage, and buyer notification | Both | Orders placed unconfirmed are confirmed or rejected later |
| Amendment price strategy per configuration | Both | Each configured line keeps its own original price |
| CPQ quote operations, status, and blocking Spryker requests for quote | CPQ quote | Quotes stay in the CPQ |
| Discounts on configured lines | Both | The project decides whether Spryker discounts apply |
| CPQ health check | Both | Operations sees a CPQ outage first |
