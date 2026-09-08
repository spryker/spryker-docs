---
title: Handle price explosion and ERP-owned pricing in B2B
description: A decision-oriented guideline that helps you choose a pricing architecture for large-volume, ERP-owned B2B pricing before you start technical optimization.
last_updated: Sep 8, 2026
template: concept-topic-template
---

**A decision-oriented guideline for large-volume, ERP-owned B2B pricing**

{% info_block infoBox "About this guide" %}

**Scope:** Mid-to-large Industrial Goods and Manufacturing (IGM) B2B, contract-heavy pricing, up to 20M+ price records.

**What this is:** A framework that helps you choose the right pricing architecture first, before you begin technical optimization.

**What this is not:** A low-level performance-tuning page, or a promise of one universal solution.

{% endinfo_block %}

## How to use this guide

Large-volume B2B pricing projects usually fail for one reason: teams begin technical optimization — index tuning, cache sizing, import batching — before they answer the strategic questions. Answer these first: who owns pricing, where prices come from, how fresh they must be, and whether the ERP can meet the required sync and performance expectations.

Read this guide in order:

1. **Understand the problem** — learn why price volume explodes (see [The problem](#1-the-problem-why-price-volume-explodes)).
2. **Recognize the challenges** — learn which effects appear only at unusual scale (see [Typical challenges](#2-typical-challenges-at-scale)).
3. **Run discovery** — answer the questions before you choose anything (see [Discovery questions](#3-discovery-questions--answer-these-before-you-choose-a-strategy)).
4. **Choose an architecture** — apply the decision framework and matrix (see [The decision framework](#4-the-decision-framework)).
5. **Apply a strategy pattern** — compare freshness, performance, failure modes, and when to choose or avoid each one (see [Recommended strategy patterns](#5-recommended-strategy-patterns)).

## 1. The problem: why price volume explodes

B2B pricing is rarely one price per product. The total number of price records is a *product* of independent dimensions, and each dimension multiplies the others.

| Dimension | Typical driver | Why it multiplies |
|---|---|---|
| Customer / Business Unit | ~1,000 customers, each with contract prices | The largest multiplier in contract-heavy B2B |
| Product (abstract + concrete) | ~25,000 abstracts × ~25,000 concretes (1:1 is common in IGM) | Spryker stores prices on *both* abstract and concrete by default |
| Price type | Standard, customer-specific, contract | Each type is a separate record |
| Currency | Multi-currency stores | Multiplies by the number of currencies |
| Store / market | Multi-store setups | Multiplies by the number of stores |
| Volume / tier | Quantity-break pricing | Each tier adds another row |
| Contract | Negotiated agreements per customer | The core source of the explosion |
| Marketplace offers *(if applicable)* | The same product sold by many sellers, each with its own price set | An *orthogonal* multiplier on top of everything above |

### The scale math

Consider a conservative mid-size IGM example:

```text
1,000 customers × 25,000 products × 2 (abstract + concrete) = 50,000,000 theoretical records
```

Even at only 20% contract coverage, this produces approximately 20,000,000 price records. This is the documented threshold where the Spryker out-of-the-box sync pipeline begins to degrade seriously.

The problem has three independent dimensions, and you must solve each one separately:

- **Storage** — Can the database and search index physically hold the data?
- **Sync performance** — Can you import and propagate prices fast enough?
- **Retrieval performance** — Can a single storefront request resolve the correct price in under 100 ms?

A strategy that fixes storage may do nothing for sync, and a strategy that fixes sync may not help retrieval. Keep all three dimensions in view.

{% info_block infoBox "Marketplace and multi-source note" %}

If the same concrete product can be sold by many sellers through product offers, each offer carries its *own* price set. This adds an orthogonal dimension: `25,000 concretes × up to 2,000 offers × currencies × price types`. Offers also change the *shape* of storage — a per-product aggregate that Spryker rewrites wholesale on any change — not just the row count. If this applies to you, read [the marketplace addendum](#56-marketplace-addendum--offers-as-an-orthogonal-dimension). If it does not, you can skip every offer-tagged callout in this guide.

{% endinfo_block %}

## 2. Typical challenges at scale

Spryker's standard pricing pipeline runs typical B2B catalogs — including sizeable contract-pricing assortments — without any of the work described below. The effects in this section appear only as you approach unusual scale (contract-price counts climbing toward the millions), and even then you address them selectively. Think of this section as a map of what *can* matter at the far end of the volume curve, not a list of problems every project faces. Discovery (see [Discovery questions](#3-discovery-questions--answer-these-before-you-choose-a-strategy)) tells you which of these are actually relevant to your project — for many, the answer is none.

The effects are grouped by the dimension each one touches.

### Storage

- **Search index explosion** — When you embed customer-specific prices into search documents, the documents inflate to several MB each, and the index can exceed 1 TB. This slows both indexing and search.
- **In-memory (Redis) footprint** — Resolved prices held in cache grow to tens of GB at 20M+ records.
- **Abstract/concrete duplication** — In 1:1 projects, Spryker stores every price twice for no business value.

### Sync performance

- **Publish and Sync bottleneck** — A nightly import that touches 20M rows fires 20M events. At realistic throughput, this takes hours to process, during which storefront prices are stale and non-deterministic.
- **Data import performance** — A naive row-by-row import of 20M rows is not viable.
- **ERP sync lag or unavailability** — Nightly-batch ERPs leave a multi-hour stale window, and some ERPs cannot produce a delta or even a full export at the required volume.

### Retrieval performance

- **Price resolution at checkout** — Large carts that re-resolve customer-specific prices add latency.
- **Cache as single source of truth** — When you bypass the standard pipeline and write prices directly to the cache, you create a data-loss risk if the cache is lost. See the mitigation in [Recommended strategy patterns](#5-recommended-strategy-patterns).

{% info_block infoBox "Marketplace-specific challenges (offers)" %}

A single aggregate key per concrete causes **write amplification** (one offer change rewrites all offers of that SKU), **read fan-out** (one product view reads thousands of keys, with no pagination out of the box), **hot-key contention**, four separate row-by-row offer importers, and **no built-in buy-box ranking** (the default winner is the first offer published).

{% endinfo_block %}

## 3. Discovery questions — answer these before you choose a strategy

This section is the heart of the guideline. Do not select an architecture until you answer these questions. The answers, not the technology, determine the right path.

### 3.1 Volume and cardinality

- **How many prices do you expect, of what types, and why?** Break the number down by dimension: customers, SKUs, price types, currencies, stores, volume tiers, and offers. A single "20M" figure hides which dimension actually drives the total, and that dimension is where you intervene.
- Is the high cardinality a *real business need*, or an *import artifact*? For example, you might mirror every price on both abstract and concrete, or import thousands of offers per SKU that no buyer will ever compare.

### 3.2 Ownership and source of truth

- **Which systems own pricing?** The ERP, a pricing engine, a PIM, a contract-management system, or Spryker itself?
- **Is that system the long-term source of truth, or is the customer transitioning?** For example, a SAP ECC to S/4HANA migration where two systems are partially authoritative at once. See [the guidance for asynchronous ERPs](#43-what-to-do-when-the-erp-cannot-provide-data-as-synchronously-as-you-need).

### 3.3 Integration shape

- **Do you expect direct integration, or is middleware involved** (for example, MuleSoft, Boomi, or Azure Integration Services)?
- **Is the preferred exchange file-based (SFTP/S3), event-driven, or API/REST?**

### 3.4 Freshness and verification

- **How often do prices update** — nightly, intraday, per contract change, or continuously?
- **When does the price need verification?** At browse time, cart time, or only at checkout? In most B2B flows, you place the order at the price the customer confirmed, and you handle disputes commercially. See [Checkout price revalidation](#55-hybrid-local-browsecart-prices--checkout-revalidation).
- **How stale is acceptably stale?** This is a *business* decision, not a technical limit.

### 3.5 Other systems that affect the final price

- Do external systems apply **discounts, taxes, surcharges, or other fees** — for example, a tax engine or a rebate service? These compose with base pricing and can change the effective load and the latency budget.

### 3.6 Load, latency, and ERP capability

- **What load do you expect** — peak concurrent buyers, and request rates for the catalog, PDP, cart, and checkout?
- **Can the ERP or pricing engine handle that load** at the target latency and availability, if you intend to call it live? Get real numbers from the ERP team rather than assumptions. This single answer decides whether live pricing is even on the table.

### 3.7 Phasing and the 1/2/5-year view

- **What is the right phasing?** You rarely need to solve for peak volume on day one.
- Slice the data volume for the first go-live, but design for what the business expects in one, two, and five years — more customers, more contracts, and marketplace expansion. The cheapest architecture today can become the most expensive rework later.

## 4. The decision framework

After you complete discovery, choose *where prices live* and *when you resolve them*. There are four base architectures. They are not mutually exclusive — the hybrid model deliberately combines them.

### 4.1 The four base architectures

| # | Architecture | Prices live in | Resolved | Best when |
|---|---|---|---|---|
| 1 | **Store / sync prices into Spryker** | Spryker DB + cache/index | At publish time, served locally | The ERP can export reliably, and freshness needs are hours, not seconds |
| 2 | **Cache prices from ERP / pricing service** | Cache (TTL), backed by the ERP | On demand, cached for a TTL | The ERP can answer on demand but cannot sync in bulk, and some staleness is acceptable |
| 3 | **Retrieve prices live from ERP / pricing service** | The ERP only | Every request, live | Prices must be current, and the ERP is proven to meet the load and latency |
| 4 | **Hybrid: local base + checkout revalidation** | Local base + live top-up | Locally for browse and cart, revalidated at checkout | The realistic default for most enterprises, especially those in transition |

### 4.2 Quick selection guide

| Discovery answer | Points toward |
|---|---|
| The ERP can do a reliable daily or delta export | **(1)** Store and sync |
| The ERP can answer per-SKU on demand, but bulk export is slow or impossible | **(2)** Cache with a TTL |
| Prices change constantly *and* the ERP is proven to handle live load at the target latency | **(3)** Live retrieve |
| The ERP is unreliable, mid-migration, or you accept "good enough locally, confirmed at order" | **(4)** Hybrid |
| Buyers never sort or filter by price in the catalog | Remove prices from the search index (**S1**) |
| Contracts are negotiated at the company level, not the BU level | Model pricing at the company level (**S2**), often a 3–10× record reduction |
| Products are 1:1 abstract-to-concrete | Use a single price per abstract and disable concrete search documents (**S8**, **S3**) |
| There are more than 50 distinct price levels, but few are truly unique per customer | Use price lists or price groups (**S9**) |

### 4.3 What to do when the ERP cannot provide data as synchronously as you need

This is the most common real-world constraint, so it has its own decision path. Apply this path when the ERP cannot sync in bulk, cannot produce a delta, is mid-migration, or is periodically unavailable:

1. **Decouple storefront availability from ERP reliability.** Never let a slow or unavailable ERP take down the storefront. Serve from a local base or the last-known cache instead.
2. **Cache with a business-agreed TTL** (architecture 2). For browse and cart, stale-but-available beats fresh-but-unavailable.
3. **Make staleness visible** (strategy **S7**). Show "Price as of HH:MM" and a "confirmed at order placement" badge so that buyers trust what they see.
4. **Confirm the real price at order placement** (see [the hybrid pattern](#55-hybrid-local-browsecart-prices--checkout-revalidation)), not at every page view.
5. **During an ERP migration** (for example, ECC to S/4HANA with two partial sources), use a **dual-source resolver**: try the new ERP, then fall back to the legacy cache, then fall back to the last-known local price, and finally show "Price on Request" and trigger the Quote Request flow.
6. **If you cannot resolve any price,** treat "Price on Request" plus Request-a-Quote as the correct B2B business process for high-value or uncatalogued items, not as an error state.

## 5. Recommended strategy patterns

{% info_block infoBox "These patterns build on what Spryker already does" %}

The first two patterns describe how a standard Spryker shop already resolves prices out of the box — most projects go live on them with little or no special engineering. The remaining patterns add capability for specific needs (live freshness, ERP independence, migration). The strategy references (**S1**–**S10**, **O1**–**O9**) throughout are *optional levers* you reach for only at unusual scale or to meet a particular requirement; treat them as tuning options, not as a pre-launch checklist.

{% endinfo_block %}

Each pattern below uses the same structure, so that you can compare the patterns directly, in this order: **Choose it when**, **Operational complexity**, **Freshness**, **Failure modes**, **Performance assumptions**, and **When to avoid**.

Choose the pattern that matches your discovery answers. Most IGM projects land on [the Spryker-managed read model](#51-spryker-managed-read-model-for-high-volume-prices) plus [the hybrid pattern](#55-hybrid-local-browsecart-prices--checkout-revalidation) — a synced read model plus checkout confirmation — and add [cached pricing](#53-cached-pricing-via-middleware-or-pricing-service) during an ERP transition.

### 5.1 Spryker-managed read model for high-volume prices

In this pattern, Spryker owns the resolved, storefront-ready price representation. The ERP — or any other source — feeds prices into Spryker, and from that point the storefront reads them locally and never calls the ERP at request time. This is how a standard Spryker shop already works: prices are imported, published to the storefront cache and search index, and served from there. It is therefore the natural starting point for most projects, and you add the scale levers below only if your actual volume or refresh needs call for them.

- **Choose it when** the ERP can export prices reliably (a daily or delta feed) and freshness needs are measured in hours rather than seconds. This fits the large majority of B2B contract-pricing catalogs.
- **Operational complexity:** Low. This is the closest pattern to standard Spryker, and the tooling — import, Publish and Sync, storefront resolution — already exists out of the box. The write-path levers below are optional extras for very high record counts; most projects go live without them.
- **Freshness:** As fresh as the last import and publish, typically hours. It is not aimed at prices that must be current to the second — use [cached pricing](#53-cached-pricing-via-middleware-or-pricing-service) or [the hybrid pattern](#55-hybrid-local-browsecart-prices--checkout-revalidation) for that.
- **Failure modes:** Sync lag shows prices from the previous publish within a known, bounded window — rarely a concern for stable contract pricing. If you deliberately make the cache the sole source of truth, plan for cache loss with persistence (AOF/RDB), enough memory to avoid eviction, and a warm-up re-publish on restart.
- **Performance assumptions:** All reads are served locally from the cache, index, or database, so they are fast, predictable, and independent of the ERP. Out of the box this scales comfortably for typical catalogs. Only at extreme volume (contract prices in the millions) might you *optionally* tune the write path — batched imports (**S4**), delta-only updates, an optimized Publish and Sync (**S5**), and trimming price data out of the search index (**S1**); **S2**, **S3**, and **S8** further reduce the record count at the source.
- **When to avoid:** Skip this pattern only when prices genuinely must reflect ERP changes within seconds, or when the ERP cannot export at all — then use [live pricing](#54-live-pricing-from-erp--pricing-engine), [cached pricing](#53-cached-pricing-via-middleware-or-pricing-service), or [the hybrid pattern](#55-hybrid-local-browsecart-prices--checkout-revalidation).

### 5.2 ERP-owned pricing with batch/import synchronization

Here the ERP stays the definitive source of truth and pushes prices into Spryker on a schedule — a nightly full export, or, better, a delta feed of only what changed. Spryker imports the feed and publishes it to the storefront. It is essentially the read-model pattern (5.1) with an explicit contract that the ERP owns the data and Spryker holds a served copy, and it is the most common integration for stable contract pricing.

- **Choose it when** pricing is stable contract pricing without intraday urgency and the ERP owns it long-term. A daily or delta feed keeps the storefront correct with very few moving parts.
- **Operational complexity:** Low to medium. You monitor the import and the sync queue as you would any scheduled integration. A delta feed keeps daily volumes small, so most projects run this comfortably without special tuning.
- **Freshness:** Up to one cycle stale — for example, around 22 hours with a single nightly 02:00 import. A delta or event-triggered feed narrows this to minutes.
- **Failure modes:** A price change is not visible until the next cycle; a failed import simply leaves the previous prices in place (safe, if not fresh); and a very large full re-import can queue for a while. Delta feeds and basic monitoring remove most of this.
- **Performance assumptions:** Comfortable for typical daily volumes out of the box. The optional import and Publish-and-Sync levers matter only when a single load approaches millions of rows — bulk writes, delta-only filtering, pre-loaded lookups, and streaming (**S4**, **S5**). At that scale, prefer a delta or API feed (**S10**, the Data Exchange API) over a full nightly file; a 20M-row flat file is an integration smell, not a Spryker limit.
- **When to avoid:** Avoid a batch-only approach when buyers must see intraday price changes immediately, or when the ERP cannot produce any usable export — move to [cached pricing](#53-cached-pricing-via-middleware-or-pricing-service) or [the hybrid pattern](#55-hybrid-local-browsecart-prices--checkout-revalidation).

### 5.3 Cached pricing via middleware or pricing service

In this demand-driven pattern, Spryker asks the ERP or a pricing service for a price the first time it is needed — often through middleware — and caches the answer for a configurable time (the TTL). Later requests are served from the cache until the TTL expires, then refreshed on the next request. It keeps prices close to real time without requiring the ERP to push bulk syncs, which suits sources that can answer on demand but cannot export everything.

- **Choose it when** the ERP can answer per-SKU on demand but cannot sync in bulk, or the customer is mid-migration between systems. You get near-live prices without a heavy sync pipeline.
- **Operational complexity:** Medium. You add a source connector, pick a TTL, and add a circuit breaker so a slow source never blocks the storefront. These are standard integration building blocks, and the TTL is a simple business dial.
- **Freshness:** Near real time, bounded by the TTL — a *business* choice such as 15 minutes or 1 hour.
- **Failure modes:** If the source is slow or unavailable, a circuit breaker serves the last-known price and a staleness badge (**S7**) keeps buyers informed; without one, request latency would rise. Because the cache holds prices between fetches, apply the same persistence and warm-up care as in [the read-model pattern](#51-spryker-managed-read-model-for-high-volume-prices).
- **Performance assumptions:** The first request for a SKU and customer pays one source round-trip; everything after is cache-fast until the TTL expires. Batch the misses on a page into a single source call (**S6**) to keep it responsive, and pair with **S7** for transparency.
- **When to avoid:** Avoid this when the source cannot meet even on-demand latency and availability under load — in that case, fall back to a synced base (see [the read-model pattern](#51-spryker-managed-read-model-for-high-volume-prices)).

### 5.4 Live pricing from ERP / pricing engine

This pattern resolves every price directly from the ERP or pricing engine on every request, with no local price store. It offers the strongest possible freshness guarantee, and in exchange it places the ERP on the critical path of every storefront page. It is the right choice only in the specific cases where prices must always be live and the ERP has been proven able to carry that load.

- **Choose it when** prices genuinely must be live on every page *and* the ERP or pricing engine is proven — through the load and latency discovery in [section 3.6](#36-load-latency-and-erp-capability) — to sustain that traffic at the required latency and availability.
- **Operational complexity:** High. The ERP and the storefront must be capacity-planned, scaled, and monitored together, because they now share one critical path. Choose this deliberately, not by default.
- **Freshness:** Always current — the strongest guarantee available.
- **Failure modes:** The ERP's latency, availability, and rate limits become the storefront's. An ERP incident becomes a storefront incident, and there is no local fallback by design — which is exactly why the hybrid pattern (5.5) exists.
- **Performance assumptions:** Every catalog, PDP, cart, and checkout request depends on the ERP responding inside the storefront's latency budget at peak concurrency. This is viable only when [section 3.6](#36-load-latency-and-erp-capability) discovery proved that headroom, and with aggressive request batching.
- **When to avoid:** Avoid this whenever there is any doubt about ERP capacity, which is the common case. Prefer [cached pricing](#53-cached-pricing-via-middleware-or-pricing-service) or [the hybrid pattern](#55-hybrid-local-browsecart-prices--checkout-revalidation), which deliver most of the freshness with none of the single-point-of-failure risk.

### 5.5 Hybrid: local browse/cart prices + checkout revalidation

The hybrid pattern is the realistic default for most enterprises. Spryker serves prices locally for browsing and the cart, so those high-traffic pages stay fast and always available, and then confirms the authoritative price once, at order placement. You get the responsiveness of a local read model together with the correctness of a final live check — and Spryker performs that checkout re-resolution out of the box.

- **Choose it when** you build almost any large IGM B2B shop, especially for customers in ERP transition or with imperfect exports. A local base serves everyday traffic, and a live top-up fills the gaps (new customers, missing prices).
- **Operational complexity:** Medium. You run a local read model plus a revalidation path, but each is simpler than full-live, and the checkout re-resolution is standard Spryker behavior rather than custom code.
- **Freshness:** Browse and cart prices are as fresh as the local base (see patterns [5.1](#51-spryker-managed-read-model-for-high-volume-prices), [5.2](#52-erp-owned-pricing-with-batchimport-synchronization), and [5.3](#53-cached-pricing-via-middleware-or-pricing-service)), and Spryker confirms the *final order price at placement*, so the committed price is always correct and current.
- **Failure modes:** The browse price may differ slightly from the confirmed price at order. You handle this *commercially, not technically*: Spryker places the order at the confirmed price, and B2B buyers can cancel through normal order management if they disagree. A staleness indicator (**S7**) keeps this transparent.
- **Performance assumptions:** High-traffic pages get fast local reads, and the single authoritative resolution happens once, at checkout. The Spryker calculator stack re-resolves prices at order placement out of the box, so you need no custom blocking logic.
- **When to avoid:** Avoid this only when the *displayed* browse price must itself be contractually binding in real time — rare in B2B, where the order confirmation is the point of commitment.

### 5.6 Marketplace addendum — offers as an orthogonal dimension

This addendum is relevant only if the same product is sold by multiple sellers through product offers. Offers multiply the record count and change the storage shape — Spryker rewrites a per-concrete aggregate wholesale on any change. The same freshness, performance, and failure thinking applies, plus these offer-specific patterns:

- **Split the per-concrete aggregate keys** so that one offer change is an O(1) write instead of an O(all offers) write (**O1**, **O2**).
- **Deduplicate and apply incremental offer Publish and Sync** (**O4**).
- **Pre-resolve the buy-box (winning offer) at publish time.** Buyers see one winner, so do not sort thousands of offers at read time (**O5**).
- **Paginate and lazy-load offers.** There is no offer pagination out of the box on either the API or the storefront, so you must build it (**O6**).
- **Use live/TTL offer fetch** for external seller systems (**O7**), and **direct/synchronous sync** for latency-sensitive interactive edits (**O9**).

**Recommended offer stack for high-offer-count marketplaces:** O1 + O2 + O4 + O5 + O6.

## 6. Putting it together

**Your starting point is standard Spryker.** A default installation already imports prices, publishes them, resolves customer-specific and contract pricing, and revalidates at checkout — no strategies from this guide required. For a typical IGM mid-market customer, that out-of-the-box behavior is the baseline you build on, and often it is enough on its own.

The strategies in this guide are a *menu*, not a bundle. You turn one on only when a specific condition in your project makes it worthwhile — and many projects turn on few or none. Use the table below to match a condition to the optional refinement that addresses it.

| If this is true for your project… | …you may optionally apply | Why |
|---|---|---|
| Buyers never sort or filter by price in the catalog | **S1** | Keeps price data out of the search index — smaller, faster index |
| Contracts are negotiated per company, not per business unit | **S2** | Models pricing at company level; often a 3–10× record reduction |
| Products are 1:1 abstract-to-concrete | **S3**, **S8** | Avoids duplicating documents and prices that carry no extra meaning |
| Contract-price counts climb toward the millions | **S4**, **S5** | Tunes the import and Publish-and-Sync write path for extreme volume |
| The ERP is in transition or exports unreliably | **S6**, **S7** + dual-source resolver | Serves cached/last-known prices with visible freshness (see asynchronous-ERP guidance) |
| Prices change intraday | Architecture 2 or 4 (cache or hybrid) | Reflects same-day changes without a heavier live integration |
| The shop is a marketplace with many offers per concrete | **O1**, **O2**, **O4**, **O5**, **O6** | Handles the offer dimension (see marketplace addendum) |

None of these are prerequisites for going live. Treat each row as a lever you reach for when — and only when — its condition applies. If your project is a straightforward contract-pricing catalog with a reliable ERP feed, you may never open this menu at all.

One thing worth deciding early, though, is *direction* rather than effort: frame your architecture against the 1/2/5-year view (see [Phasing and the 1/2/5-year view](#37-phasing-and-the-125-year-view)). Sizing the first go-live to a sliced data volume is fine, but choose an architecture the business will not outgrow in year two.

## Appendix — strategy index

The **What to do** column summarizes the approach for each lever. Treat it as a starting point for a technical design, not as a step-by-step implementation guide: the exact plugins, keys, and configuration depend on your project setup and Spryker version.

| ID | Strategy | Effort | What to do |
|---|---|---|---|
| S1 | Remove prices from Elasticsearch | 🟢 Low | Exclude price data from the product abstract search document by removing the price map from the product page search plugin stack, and resolve prices from the key-value store on the catalog and product details page instead, lazy-loading them over AJAX where needed. Price sorting and price-range facets become unavailable. |
| S2 | Company-level pricing (not BU-level) | 🟢 Low | Associate merchant relationships with the company instead of each business unit, and use the company identifier as the price dimension key during price resolution. Reduces the record count by the average number of business units per company, typically 3–10×. |
| S3 | Disable Elasticsearch for concrete products (1:1) | 🟢 Low | Remove `product_concrete` documents from the search index and serve concrete product search from the key-value store instead. Follow [Search index deduplication](/docs/dg/dev/guidelines/performance-guidelines/search-index-deduplication.html), which covers the required packages, the configuration, the plugin stacks per feature, and the console command that cleans up existing index data. Combines well with **S1**. |
| S4 | Optimize price data import | 🟡 Medium | Replace row-by-row writes with batched statements of 500–1,000 rows (see [Batch processing of Propel entities](/docs/dg/dev/guidelines/performance-guidelines/performance-guidelines-batch-processing-propel-entities.html)), write only rows that actually changed by tracking a timestamp or version hash on the source side, pre-load merchant relationship, currency, and store lookups once per batch instead of per row, and stream rows with PHP generators to keep memory flat. |
| S5 | Optimize the Publish and Sync pipeline | 🟢 Low | Batch the key-value store writes, accumulate and deduplicate publish events per product so one logical change publishes once, increase the queue consumer chunk size, and pre-load relational lookups once per event batch to remove per-event queries from the publisher. |
| S6 | ERP live fetch with a Redis TTL cache | 🟡 Medium | Add a price dimension expander plugin that reads a dedicated key namespace in the key-value store. On a miss, call the ERP price API through a dedicated client, batching every missing SKU of the current page or cart into one request, and store the result under a single configurable TTL. Add a circuit breaker that serves the last-known price when the ERP is unreachable, and plan cache persistence and warm-up, because the cache is now the only price store. |
| S7 | Price staleness indicator (UX) | 🟢 Low | Store a fetch timestamp next to each cached price, and render it in the Storefront templates as, for example, `Price as of 14:23`. Once the timestamp is older than a configurable threshold, show a badge stating that the price may have changed and is confirmed at order placement. Pairs with **S6** and with checkout revalidation. |
| S8 | Single price for abstract and concrete | 🟢 Low | Link price records to the abstract product only and let concrete products read through to the abstract price, applying this equally to standard, merchant relationship, and volume prices. Halves the record count in the database, cache, and search index. Keep the current per-variant model as an explicit opt-in for products whose variants genuinely carry different prices. |
| S9 | Price group abstraction (price lists) | 🔴 High | Introduce a custom price dimension for a named price group — for example, "Tier A customer" or "Automotive OEM" — map each company to a group through a dedicated join table, and resolve company to group to price, layering customer-specific overrides on top for key-account exceptions. Requires the ERP to export prices per group rather than per customer, so agree it with the ERP team first. |
| S10 | Import prices via the Data Exchange API | 🟢 Low | Expose the price tables through the [Data Exchange API](/docs/integrations/spryker-api/backend-api/data-exchange-api/data-exchange-api.html) and push single or batched updates with its `POST` and `PATCH` endpoints, after which the standard Publish and Sync events propagate the rows — no custom API resource, import command, or transfer objects needed. Throughput is the limiting factor, so use it for intraday, per-contract changes and keep **S4** for bulk nightly loads. |
| O1 | Split the per-concrete offer reference key | 🟡 Medium | Replace the monolithic JSON array of offer references with a structure that supports partial reads and writes — a hash, a sorted set, or references bucketed into shards per SKU — and make the publisher add or remove a single reference instead of rebuilding the whole value. Turns an O(N) write per offer change into O(1) and makes paginated offer reads possible. |
| O2 | Key offer prices per offer, not per concrete | 🟡 Medium | Publish each offer's price set under its own per-offer key, next to the existing per-offer data, and resolve offer prices only for the offers actually displayed — the buy-box winner and the current page of the offer list. One price change then rewrites one small key, and the product details page no longer loads the full price payload of every offer. |
| O3 | Optimize offer data import | 🟡 Medium | Apply the **S4** write-path work across all four offer pipelines — offer, price, stock, and validity: batched writes of 500–1,000 rows, delta-only updates driven by a timestamp or version hash on the seller feed, lookups pre-loaded once per batch, and generator-based streaming. Consolidate the per-offer events so the four importers do not each trigger a separate republish for the same SKU. |
| O4 | Optimize offer Publish and Sync | 🟢 Low | Deduplicate and accumulate offer events per concrete SKU so a burst of per-offer changes triggers one republish per SKU rather than one per offer, apply incremental add and remove to the aggregate once **O1** is in place, batch the key-value store writes, pre-load relational data per batch, and increase the chunk size of the offer sync queues. |
| O5 | Pre-resolve the buy-box at publish time | 🟡 Medium | Compute the winning offer by a configurable strategy — lowest price, in stock, seller rating, or delivery time — whenever offers change, and store only the winner, or the top N, per concrete and dimension in a small dedicated key that the catalog listing and product details page read directly. Recompute only when a relevant offer attribute changes. |
| O6 | Paginate and lazy-load offers | 🟡 Medium | Apply **O1** first so offer references can be read by page, then add offset and limit parameters to the offer storage client and reader, expose page offset, page limit, and a total on the offer endpoint, and change the Storefront offer widget and the seller-selection form to request one page instead of the whole list. Render the buy-box offer synchronously and lazy-load the seller list page by page with server-side sorting and filtering. |
| O7 | Live/TTL offer fetch | 🟡 Medium | Apply the **S6** demand-driven pattern to offers: on a cache miss, batch-fetch the buy-box offer with its price and stock from the seller or marketplace-operator system and cache it under a configurable TTL, with a circuit breaker to the last-known offer plus the **S7** staleness indicator when the source is unreachable. Plan cache persistence and warm-up, because the cache becomes the authoritative offer store. |
| O8 | Product offers via the Data Exchange API | 🟢 Low | Expose the offer, offer store, offer price, offer stock, and offer validity tables through the [Data Exchange API](/docs/integrations/spryker-api/backend-api/data-exchange-api/data-exchange-api.html) so sellers and middleware can push per-offer updates with no custom development, after which standard Publish and Sync propagates them. Put **O1** and **O4** in place first, otherwise every write republishes the full per-concrete aggregate, and keep **O3** for bulk loads. |
| O9 | Direct sync (synchronous P&S on write) | 🟡 Medium | Resolve and write the affected storage keys inline, in the same request that stores the data, instead of only queuing a publish event, and scope the inline work to the single affected offer and its buy-box so that it stays O(1) — which requires **O1**. Keep the asynchronous pipeline as the fallback and reconciliation path. The write becomes slower, so use this only for low-volume, latency-sensitive edits such as a merchant editing an offer or a checkout-time price confirmation, never for nightly bulk loads. |

