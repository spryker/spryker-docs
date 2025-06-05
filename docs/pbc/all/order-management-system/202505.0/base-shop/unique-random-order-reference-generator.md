---
title: Unique random order reference generator
description: 
last_updated: Jun 15, 2025
template: concept-topic-template
---


Based on the Sales module v11.57.0, the unique order reference generator generates order references based on the NanoID algorithm.

As an alternative to the traditional sequential order reference generation mechanism, `UniqueRandomIdOrderReferenceGenerator` generates globally unique, non-sequential, and configurable order references without database interaction. It is ideal for cloud-native, high-load, or globally distributed commerce platforms.



## Switching the order reference generator

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

## Improving random entropy

To avoid collisions in systems with high order volume, the entropy of the generated ID must be high enough. The following increases entropy:

1. Larger alphabet size, such as alphanumeric versus numeric only
2. Longer ID length configured in `getUniqueRandomIdOrderReferenceSize()`

### Entropy guidelines

Recommendation for high-volume projects:

- Use at least 16 characters
- Use a large alphabet, such as alphanumeric)
- Avoid short numeric-only IDs (<12 digits) if generating thousands of orders per day

| Alphabet               | Length | Total Combinations |
|:-----------------------|:-------|:-------------------|
| 10 digits (`0-9`)      | 12     | 10¹² = 1 trillion  |
| 36 chars (`0-9A-Z`)    | 12     | ~4.7 trillion      |
| 36 chars (`0-9A-Z`)    | 16     | ~7.9 × 10²⁴        |
| 62 chars (`0-9A-Za-z`) | 16     | ~4.8 × 10²⁸        |


With alphabet `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ` and size 16, a generated ID might look as follows:

```text
9X3G-L8P2-QZFA-72YV
```


## Comparison with sequential ID generator

| Feature        | Random ID                      | Sequential ID                    |
|:---------------|--------------------------------|:---------------------------------|
| Performance    | ⚡ Instant (no DB interaction)  | 🐢 Slower under load (row locks) |
| Uniqueness     | ✅ Very high (randomized)      | ✅ Guaranteed via DB locking     |
| Sortability    | ❌ Not sequential              | ✅ Sorted by order               |
| Predictability | 🔒 Random and opaque           | 🔢 Easy to predict               |
| Database Load  | 🚫 None                        | ⚠️ Increases with scale          |
| Scalability    | 🚀 Horizontal-safe             | 🚫 Central bottleneck            |
| Customization  | 🎛️ Alphabet, size, split       | ⚙️ Custom prefixes only          |

Use random ID generator in the following cases:
- Your project handles high concurrency or traffic
- You require horizontally scalable services
- You don't need sequential order numbers
- You want customizable formats

Use a sequential generator in the following cases:
- You require strict ordering or tracking
- Your system relies on sequential patterns
- Your order volume is low-to-medium


































