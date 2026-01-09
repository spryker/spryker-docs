---
title: Keeping dependencies updated for performance
description: Guidelines for keeping Spryker module dependencies up to date to maintain optimal performance and security.
last_updated: Dec 15, 2025
template: concept-topic-template
related:
  - title: General performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html
  - title: Architecture performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html
---

Keeping your project's Spryker module dependencies up to date is critical for maintaining optimal performance, security, and reducing long-term upgrade efforts.

## Why keep dependencies updated

Updating dependencies regularly provides several practical benefits:

1. **Risk of security vulnerabilities**: Most recent versions contain necessary fixes to all known vulnerabilities.
2. **Performance and resource consumption optimizations**: Spryker continuously releases performance improvements based on real-life experiences and scenarios.
3. **Decreasing upgrade efforts**: Distributing upgrades across many smaller steps is much easier than doing one massive upgrade later.

## Key resources

The following resources provide information about performance-related module releases:

- [Security release notes 202512.0](https://docs.spryker.com/docs/about/all/releases/security-releases/security-release-notes-202512.0.html)
- [Release notes 202410.0](https://docs.spryker.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202410.0/release-notes-202410.0.html)
- [Release notes 202507.0](https://docs.spryker.com/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202507.0/release-notes-202507.0.html)
- [General performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html) - contains the list of recent module versions with known performance optimizations
- [Cart page performance configuration](https://docs.spryker.com/docs/pbc/all/cart-and-checkout/latest/cart-page-performance-configuration.html)

## Critical module updates

The following sections list important module updates that include performance improvements. It's recommended that each Spryker project evaluates and applies these updates.

### Product search performance

**spryker/product-page-search** - Recent versions (for example, `3.38.0` - `3.40.0`) include improvements such as:
- Caching logic adjustments for product images
- Potential bulk operation support to make search document writes more efficient
- Avoiding duplicate locale events

### Session management

**spryker/session** - at least `^4.17.0`
- Provides configurable session locking mechanism
- See [Redis session lock](/docs/dg/dev/troubleshooting/troubleshooting-performance-issues/redis-session-lock.html) for configuration details

**spryker/session-redis** - at least `^1.11.2`
- Includes configurable session locker
- See [Redis session lock](/docs/dg/dev/troubleshooting/troubleshooting-performance-issues/redis-session-lock.html) for setup instructions

### Merchant Portal performance

- [spryker/category:^5.18.2](https://github.com/spryker/category/releases/tag/5.18.2)
- [spryker/acl:^3.22.0](https://github.com/spryker/acl/releases/tag/3.22.0)
- [spryker/acl-entity:^1.13.0](https://github.com/spryker/acl-entity/releases/tag/1.13.0)

### Order placement performance

- [spryker/calculation:^4.14.0](https://github.com/spryker/calculation/releases/tag/4.14.0)
- [spryker/discount-calculation-connector:^5.4.0](https://github.com/spryker/discount-calculation-connector/releases/tag/5.4.0)
- [spryker/merchant:^3.15.0](https://github.com/spryker/merchant/releases/tag/3.15.0)
- [spryker/sales:^11.60.0](https://github.com/spryker/sales/releases/tag/11.60.0)
- [spryker/product:^6.49.0](https://github.com/spryker/product/releases/tag/6.49.0)
- [spryker/discount:^9.43.0](https://github.com/spryker/discount/releases/tag/9.43.0)
- [spryker/product-cart-connector:^4.13.0](https://github.com/spryker/product-cart-connector/releases/tag/4.13.0)
- [spryker/company-role:^1.9.1](https://github.com/spryker/company-role/releases/tag/1.9.1)
- [spryker/propel:^3.43.0](https://github.com/spryker/propel/releases/tag/3.43.0)
- [spryker/sales:^11.63.0](https://github.com/spryker/sales/releases/tag/11.63.0)
- [spryker/sales-product-connector:^1.11.1](https://github.com/spryker/sales-product-connector/releases/tag/1.11.1)
- [spryker/shipment:^8.24.0](https://github.com/spryker/shipment/releases/tag/8.24.0)

### OMS availability check and order item reservation

- [spryker/availability:^9.27.0](https://github.com/spryker/availability/releases/tag/9.27.0)
- [spryker/stock:^8.10.1](https://github.com/spryker/stock/releases/tag/8.10.1)
- [spryker/oms:^11.45.1](https://github.com/spryker/oms/releases/tag/11.45.1)
- [spryker/propel:^3.43.0](https://github.com/spryker/propel/releases/tag/3.43.0)
- [spryker/sales:^11.63.0](https://github.com/spryker/sales/releases/tag/11.63.0)

### Publish and synchronization (merchant-related)

- [spryker/merchant-product-offer-storage:^2.6.0](https://github.com/spryker/merchant-product-offer-storage/releases/tag/2.6.0)
- [spryker/product-offer-storage:^1.8.0](https://github.com/spryker/product-offer-storage/releases/tag/1.8.0)
- [spryker/propel:^3.45.0](https://github.com/spryker/propel/releases/tag/3.45.0)

### Publish and synchronization (product-related)

- [spryker/price-product:^4.48.0](https://github.com/spryker/price-product/releases/tag/4.48.0)
- [spryker/product-page-search:^3.40.0](https://github.com/spryker/product-page-search/releases/tag/3.40.0)
- [spryker/product-search:^5.24.1](https://github.com/spryker/product-search/releases/tag/5.24.1)
- [spryker/product-storage:^1.47.0](https://github.com/spryker/product-storage/releases/tag/1.47.0)
- [spryker/product-offer-storage:^1.10.0](https://github.com/spryker/product-offer-storage/releases/tag/1.10.0)
- [spryker/price-product-offer:^1.7.1](https://github.com/spryker/price-product-offer/releases/tag/1.7.1)
- [spryker/price-product-offer-storage:^1.5.1](https://github.com/spryker/price-product-offer-storage/releases/tag/1.5.1)
- [spryker/price-product-storage:^4.13.0](https://github.com/spryker/price-product-storage/releases/tag/4.13.0)
- [spryker/product-image:^3.20.1](https://github.com/spryker/product-image/releases/tag/3.20.1)
- [spryker/product-category-storage:^2.11.0](https://github.com/spryker/product-category-storage/releases/tag/2.11.0)
- [spryker/product-category-search:^1.2.1](https://github.com/spryker/product-category-search/releases/tag/1.2.1)
- [spryker/propel:^3.47.0](https://github.com/spryker/propel/releases/tag/3.47.0)
  - Note: If you still use destructive deployments, update the `config/install/destructive.yml` file. You can copy it from any demo shop.
- [spryker/event-behavior:^1.32.0](https://github.com/spryker/event-behavior/releases/tag/1.32.0)
- [spryker/synchronization-behavior:^1.13.0](https://github.com/spryker/synchronization-behavior/releases/tag/1.13.0)

### Cart page and checkout for large carts (100+ items)

For comprehensive guidance on optimizing cart performance, see [Cart page performance configuration](https://docs.spryker.com/docs/pbc/all/cart-and-checkout/latest/cart-page-performance-configuration.html).

## Update strategy

To effectively manage dependency updates:

1. **Monitor release notes**: Regularly check Spryker release notes for performance-related updates.
2. **Test in staging**: Always test module updates in a staging environment before production deployment.
3. **Prioritize performance modules**: Focus on modules that directly impact your application's performance bottlenecks.
4. **Use semantic versioning**: Understand the impact of major, minor, and patch updates.
5. **Batch related updates**: Group related module updates together for testing efficiency.

## Compatibility considerations

When updating modules:

- Check module compatibility with your current Spryker version
- Review breaking changes in major version updates
- Test all affected functionality after updates
- Monitor application performance metrics before and after updates
- Consider using Spryker's [Composer Dependency Manager](https://docs.spryker.com/docs/scos/dev/setup/managing-scos-dependencies-with-composer.html)
