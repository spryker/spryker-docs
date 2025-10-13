## Upgrading from version 0.1.* to version 1.0.*

*Estimated migration time: 5 minutes*

To upgrade the `ProductConfigurationWishlist` module from version 0.1.* to version 1.0.*, do the following:

1. Update the `ProductConfigurationWishlist` module to version 1.0.0:

```bash
composer require "spryker-shop/product-configurator-wishlist":"^1.0.0" --update-with-dependencies
```

2. Generate transfers:

```bash
console transfer:generate
```