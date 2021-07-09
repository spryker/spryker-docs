---
title: Product offer validity dates
description: This article provides details about Marketplace Product Offer validity dates feature of the back-end project in the Spryker Marketplace.
template: concept-topic-template
---

This article provides details about Marketplace Product Offer validity dates feature of the back-end project in the Spryker Marketplace.

Validity dates specify date range when product offer is active. It manipulates product offer activity field (spy_product_offer.is_active),
turners it on and off based on validity date range. 

To update product offer activity by validity dates data, use the command:

```bash
console product-offer:check-validity
```

### Module dependancy graph

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/c49ca6db-3655-4d86-bdb1-ed05d2e1e721.png?utm_medium=live&utm_source=custom)


### Domain model

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/b20c2abe-77c4-4c33-b361-48034e64dc7b.png?utm_medium=live&utm_source=custom)

### Validity data import

Product offer validity data could be imported from [product_offer_validity.csv](/docs/marketplace/dev/data-import/{{ site.version }}/file-details-product-offer-validity-csv.html) by 
```bash
data:import product-offer-validity
``` 

