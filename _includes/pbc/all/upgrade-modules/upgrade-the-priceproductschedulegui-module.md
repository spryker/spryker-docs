

## Upgrading from version 1.* to version 2.0.0

*Estimated migration time: 5 minutes*

1. Upgrade the `PriceProductScheduleGui` module to version 2.0.0:

```bash
composer require spryker/price-product-schedule-gui: "^2.0.0" --update-with-dependencies
```

2. Generate transfers:

```bash
console transfer:generate
```
