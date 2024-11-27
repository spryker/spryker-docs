---
title: Dynamic Multistore FAQ
description: This document contains frequently asked questions for Dynamic Multistore.
past_updated: Nov 1, 2024
template: howto-guide-template
last_updated: Nov 1, 2024
---

This document contains frequently asked questions about Dynamic Multistore feature.

## Questions

### How to check if Dynamic Multistore is enabled on your environment?

#### Option #1 (On env side)
- Verify the value of `SPRYKER_DYNAMIC_STORE_MODE` environment variable, if it's exists and it equals to `true` then you project operates in Dynamic Multistore mode.
#### Option #2 (On interface side)
- Navigate to
  http://backoffice.eu.spryker.local/store-gui/list, verify if `Edit` button is available on each store on the page.

### What is the difference of how Storefront and GlueStorefront (as well as Glue) vs Backoffice and Merchant Portal works in Dynamic Multistore mode?

In both cases, the applications works with the several stores within the one region, but:
* Backoffice, MerchantPortal operates with data from all the stores within the specific region without requirement to provide the specific store.
* Storefront and GlueStorefront (as well as Glue) requires store to operate, and operates within only one provided store. (If store is not provided explicitly, the default one is used.)

[See more details](/docs/pbc/all/dynamic-multistore/202410.0/base-shop/difference-between-modes.html).

### Infrastructure in PaaS: is there anything that needs to be done in PaaS?

The only difference is in the deployment files. More details that can be found [here](/docs/pbc/all/dynamic-multistore/202410.0/base-shop/difference-between-modes.html).


### How store-specific entities should be managed in Data Exchange API?

There are no specific requirements, all depends on the database structure. Should be handled the same way as any other exposed through Data Exchange API database table.