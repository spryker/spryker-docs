---
title: KV storage deduplication
description: Learn how to reduce Redis/ValKey memory usage by eliminating duplicated URL and product abstract data through storage structure optimization.
last_updated: May 18, 2026
template: concept-topic-template
related:
  - title: Key-Value storage performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/key-value-storage-performance-guidelines.html
  - title: General performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html
---

## Overview

This guide describes two optimizations that eliminate redundant data from Redis/ValKey storage:

- **Product abstract key consolidation**: reduces the number of `kv:product_abstract` keys from one per store–locale combination to one per locale.
- **URL locale map deduplication**: moves the repeated `locale_urls` array out of every `kv:url` key into a single shared `kv:url_locale_map` key per product.

## Install the required packages

```bash
composer update spryker/event-behavior:"^1.35.0" spryker/product-storage:"^1.51.0" spryker-shop/storage-router:"^0.1.7" spryker/url-storage:"^1.24.0"
```

## Product abstract key consolidation

### How to migrate

#### Step 1: Extend the configuration

Extend `src/Pyz/Shared/ProductStorage/ProductStorageConfig.php`:

```php
namespace Pyz\Shared\ProductStorage;

use Spryker\Shared\ProductStorage\ProductStorageConfig as SprykerProductStorageConfig;

class ProductStorageConfig extends SprykerProductStorageConfig
{
    public function isProductAbstractStorageUnifiedEnabled(): bool
    {
        return true;
    }
}
```

{% info_block infoBox "Info" %}

This migration is backward-compatible. After you enable the flag, the system continues to work normally. Storage is not yet optimized until the republish in step 2 completes, but no downtime is required.

{% endinfo_block %}

#### Step 2: Republish product abstract events

```bash
vendor/bin/console publish:trigger-events -r product_abstract
```

Wait until the sync is complete before proceeding.

#### Step 3: Verify

Open a search page to confirm that products display correctly and that you can navigate to a product page from the catalog.

#### Rollback

To roll back, disable the flag in `ProductStorageConfig` and trigger a republish:

```bash
vendor/bin/console publish:trigger-events -r product_abstract
```

### How it works

Before this optimization, a separate Redis key is published for every store–locale combination. With 2 stores and 2 locales, that is 4 keys per product. With 5 stores and 10 locales, it becomes 50 keys per product—even though the vast majority of each value is identical across all store copies.

**Before optimization — one key per store + locale:**

```text
kv:product_abstract:at:de_de:1
kv:product_abstract:at:en_us:1
kv:product_abstract:de:de_de:1
kv:product_abstract:de:en_us:1
```

Each key contains the full payload, including fields such as `store_relations`, `attribute_map`, `attributes`, `sku`, and `is_active`, which are identical in every copy. Only `name`, `url`, and `description` vary by locale.

**After optimization — one key per locale:**

```text
kv:product_abstract:product_store_unified:de_de:1
kv:product_abstract:product_store_unified:en_us:1
```

The data is unchanged. The store dimension is removed from the key, and all stores share the same locale-scoped key. The number of keys per product is reduced from `stores × locales` to just `locales`.

| Setup | Benefit |
|---|---|
| Multiple stores sharing the same locales | High — every additional store previously multiplied the key count |
| Large catalog (100K+ products), 3+ stores | High — significant memory and key count reduction |
| Multiple stores, single locale | Low — fewer keys are merged, limited impact |
| Single store only | None — the key structure before and after is effectively the same |

## URL locale map deduplication

### How to migrate

#### Step 1: Extend the configuration

Extend `src/Pyz/Shared/UrlStorage/UrlStorageConfig.php`:

```php
namespace Pyz\Shared\UrlStorage;

use Spryker\Shared\UrlStorage\UrlStorageConfig as SprykerUrlStorageConfig;

class UrlStorageConfig extends SprykerUrlStorageConfig
{
    public function isUrlLocaleMapStorageEnabled(): bool
    {
        return true;
    }
}
```

After you enable this flag, the system attempts to read data from the new `kv:url_locale_map` entity. If the URL data still exists at the original location, the system reads from there as a fallback. No downtime is expected during this step.

#### Step 2: Generate Propel entity classes

Generate the Propel ORM skeleton files for the new `spy_url_locale_map_storage` table:

```bash
vendor/bin/console propel:install
```

This generates the following two files.

- `src/Orm/Zed/UrlStorage/Persistence/SpyUrlLocaleMapStorage.php`:
- `src/Orm/Zed/UrlStorage/Persistence/SpyUrlLocaleMapStorageQuery.php`:

#### Step 3: Publish URL events

```bash
vendor/bin/console publish:trigger-events -r url
```

#### Step 4: Verify

Open a product page, check the language switcher, and test a catalog search to confirm that all locales resolve correctly.

#### Rollback

To roll back, disable the flag in `UrlStorageConfig` and trigger a republish:

```bash
vendor/bin/console publish:trigger-events -r url
```

### How it works

Before this optimization, every `kv:url` key for a product embeds the full `locale_urls` array — a list of equivalent URLs across all locales. This array is identical in every locale copy of the same product's URL keys.

**Before optimization:**

```json
// kv:url:/en-gb/hydraulic-pump-model-x500
{
  "id_url": 1042871,
  "fk_locale": 12,
  "url": "/en-gb/hydraulic-pump-model-x500",
  "locale_urls": [
    { "url": "/de-de/hydraulikpumpe-modell-x500",  "locale_name": "de_DE" },
    { "url": "/fr-fr/pompe-hydraulique-modele-x500", "locale_name": "fr_FR" },
    { "url": "/es-es/bomba-hidraulica-modelo-x500",  "locale_name": "es_ES" }
  ]
}
```

After enabling this optimization, the `locale_urls` data is moved to a dedicated key per product, stored exactly once:

**After optimization:**

```json
// kv:url_locale_map:8821
{
  "de_DE": "/de-de/hydraulikpumpe-modell-x500",
  "fr_FR": "/fr-fr/pompe-hydraulique-modele-x500",
  "es_ES": "/es-es/bomba-hidraulica-modelo-x500"
}

// kv:url:/en-gb/hydraulic-pump-model-x500
{
  "id_url": 1042871,
  "fk_locale": 12,
  "fk_resource_product_abstract": 8821,
  "url": "/en-gb/hydraulic-pump-model-x500"
}
```

The data is the same — it is just no longer duplicated. Instead of embedding the full locale map in every URL key, it is stored once and looked up on demand.

| Setup | Benefit |
|---|---|
| Multiple stores with multiple locales | High — this is the primary use case |
| Many products, few locales (1–2) | Low — duplication factor is minimal |
| Single store, single locale | None — no duplication exists |

## Related guides

- [Key-Value storage performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/key-value-storage-performance-guidelines.html)
- [Performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/performance-guidelines.html)
