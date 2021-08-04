---
title: Reference informaton- AvailabilityStorage module overview
originalLink: https://documentation.spryker.com/v6/docs/reference-informaton-availabilitystorage-module-overview
redirect_from:
  - /v6/docs/reference-informaton-availabilitystorage-module-overview
  - /v6/docs/en/reference-informaton-availabilitystorage-module-overview
---

The [AvailabilityStorage](https://github.com/spryker/availability-storage) module publishes all the availability information for abstract and concrete products. Items are grouped by abstract product, and the process is handled by [Publish and Synchronize](https://documentation.spryker.com/docs/publish-and-synchronization).

Published data example:

```json
{
    "id_availability_abstract": 1,
    "fk_store": 1,
    "abstract_sku": "001",
    "quantity": 10,
    "SpyAvailabilities": [
        {
            "id_availability": 1,
            "fk_availability_abstract": 1,
            "fk_store": 1,
            "is_never_out_of_stock": false,
            "quantity": 10,
            "sku": "001_25904006"
        }
    ],
    "Store": {
        "id_store": 1,
        "name": "DE"
    },
    "id_product_abstract": 1,
    "_timestamp": 1554886713.989162
}
```

{% info_block infoBox %}

This information is used on the product details page when **Add to cart** is rendered.

{% endinfo_block %}

The events are triggered in these two cases:

* Availability amount was 0, and now it’s more than 0.
* Availability amount was more than 0, and now it’s 0.

By default, the product quantity does not affect the *available* or *unavailable* product state. Even though the events are triggered when the product quantity changes from 0 to N or from N to 0, it's not the quantity change that triggers events, but the change of product status. You can change the default behavior for the events to be triggered whenever the quantity is changed. See [HowTo - Change the default behavior of event triggering in the AvailabilityStorage module](https://documentation.spryker.com/docs/ht-change-default-behaviour-of-event-trigerring-in-availability-storage-module) for details on how to do that.
