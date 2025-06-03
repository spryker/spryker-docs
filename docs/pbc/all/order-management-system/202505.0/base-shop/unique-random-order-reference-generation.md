---
title: Unique Random Order Reference Generation
description: 
last_updated: Jun 15, 2025
template: concept-topic-template
---

# Unique Random Order Reference Generation

> Available since **Sales Module v11.57.0**, Spryker introduces a new, performant, and customizable order reference generator based on the **NanoID** algorithm.

## What's New

Spryker now offers a high-performance alternative to the traditional sequential order reference generation mechanism. The new generator, `UniqueRandomIdOrderReferenceGenerator`,
allows you to generate **globally unique**, **non-sequential**, and **configurable** order references without database interaction.

### Key Additions:
- ✅ New `SalesConfig::useUniqueRandomIdOrderReferenceGenerator()` configuration option.
- 🔢 ID customization (alphabet, length, split format)
- 🔌 Backed by `UtilUuidGeneratorServiceInterface`
- 🔒 Fully **database-independent** (no row-level locks)

## ⚙️ Configuration

To switch from the default sequential generator to the new random generator, configure your `SalesConfig` as follows:

```php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesConfig as SprykerSalesConfig;

class SalesConfig extends SprykerSalesConfig
{

    public function useUniqueRandomIdOrderReferenceGenerator(): bool
    {
        return true;
    }
    
    public function getUniqueRandomIdOrderReferenceAlphabet(): string
    {
        return '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Example: Alphanumeric
    }
    
    public function getUniqueRandomIdOrderReferenceSize(): int
    {
        return 16; // ID length (see entropy guidance below)
    }
    
    public function getUniqueRandomIdOrderReferenceSplitLength(): int
    {
        return 4; // Optional: splits ID into chunks, for example by 4 characters: XXXX-XXXX-XXXX-XXXX
    }
}
```

## 🔐 How to Improve Random Entropy
To avoid collisions in systems with **high order volume**, the entropy of the generated ID must be high enough. Entropy increases with:

1. Larger Alphabet Size (for example alphanumeric vs. numeric only)
2. Longer ID Length (increase `getUniqueRandomIdOrderReferenceSize()`)

### Entropy Guidelines:

| Alphabet               | Length | Total Combinations |
|:-----------------------|:-------|:-------------------|
| 10 digits (`0-9`)      | 12     | 10¹² = 1 trillion  |
| 36 chars (`0-9A-Z`)    | 12     | ~4.7 trillion      |
| 36 chars (`0-9A-Z`)    | 16     | ~7.9 × 10²⁴        |
| 62 chars (`0-9A-Za-z`) | 16     | ~4.8 × 10²⁸        |

#### Recommendation for High-Volume Projects:

- Use at least **16 characters**.
- Use a **large alphabet** (for example alphanumeric).
- Avoid short numeric-only IDs (<12 digits) if generating thousands of orders per day.


## ✅ Pros and Cons

| Feature        | Random ID                      | Sequential ID                    |
|:---------------|--------------------------------|:---------------------------------|
| Performance    | ⚡ Instant (no DB interaction)  | 🐢 Slower under load (row locks) |
| Uniqueness     | ✅ Very high (randomized)      | ✅ Guaranteed via DB locking     |
| Sortability    | ❌ Not sequential              | ✅ Sorted by order               |
| Predictability | 🔒 Random and opaque           | 🔢 Easy to predict               |
| Database Load  | 🚫 None                        | ⚠️ Increases with scale          |
| Scalability    | 🚀 Horizontal-safe             | 🚫 Central bottleneck            |
| Customization  | 🎛️ Alphabet, size, split       | ⚙️ Custom prefixes only          |


## 🧠 When to Use Which

### Use Random ID Generator if:
- Your project handles high concurrency or traffic
- You require horizontally scalable services
- You don't need sequential order numbers
- You want customizable formats

### Use Sequential Generator if:
- You require strict ordering or tracking
- Your system relies on sequential patterns
- Your order volume is low-to-medium

## 🔄 Migration and Compatibility

This feature is **opt-in**. Your project will continue using the existing `SequenceNumberOrderReferenceGenerator` unless explicitly switched.

To safely migrate:
- Enable the new generator via SalesConfig
- Choose a unique alphabet and format to prevent confusion with legacy IDs
- Test with realistic load to validate uniqueness and performance

## 📌 Summary
The Random ID Generator offers a scalable and customizable alternative to sequence-based order reference generation.
It is ideal for **cloud-native**, **high-load**, or **globally distributed** commerce platforms.

Enable it in your config and enjoy faster, collision-free order handling!

## 🧪 Example Output
With alphabet `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ` and size 16, a generated ID might look like:

```
9X3G-L8P2-QZFA-72YV
```










