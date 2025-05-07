---
title: Multi-store setups
description: Learn about multi-store setups in Spryker Cloud Commerce OS, including shared and separated configurations for flexible store management, deployment, and data handling.
template: concept-topic-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/multi-store-setups/multi-store-setups.html
---

The Multi-Store is a capability in the Spryker Cloud Commerce OS that gives you the flexibility to create multiple stores for different scenarios—giving you the ability to easily reach your customers everywhere.

The Spryker Cloud Commerce OS supports following multi-store setups:

* Separated: a codebase with dedicated databases per store.
* Shared: a codebase with all the stores sharing a database.


## Shared setup

With the shared setup, stores share a single codebase and databases per region. If there are several stores in a region, they share a single database.


![shared setup diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/multi-store-setups.md/shared-setup.png)


### Shared setup: When to use

We recommend this setup for simple shops that have two to three stores that follow the same business logic and have insignificant differences.

### Shared setup: Advantages

* Products, customers, orders, and so on are stored in the same database, which simplifies collaborative management.

* All stores are hosted in the same AWS region.

For more details on this setup, see [Setup 1: Shared infrastructure resources (default)](/docs/ca/dev/multi-store-setups/multistore-setup-options.html#setup-1-shared-infrastructure-resources-default)

## Separated setup

With the separated setup, stores share the same codebase but have dedicated databases. It's the standard setup.

![separated setup diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/multi-store-setups.md/separated-setup.png)

{% info_block warningBox %}

With Dynamic Multistore, the separated setup is only possible with stores belonging to different regions. For more information, see [Dymamic Multistore](/docs/pbc/all/dynamic-multistore/{{site.version}}/base-shop/dynamic-multistore-feature-overview.html).

{% endinfo_block %}

### Separated setup: When to use

* The stores are completely different from the perspective of the following:

  * Design

  * Business logic

  * Features or modules

* Separated data management for products, customers, orders, etc. Data sharing and synchronization requires external systems.


### Separated setup: Advantages

* Flexible deployment: since stores are independent of one another, deploy, remove, and scale each store without affecting other stores.

* Flexible URL management. For example, the same product in different stores can have the same URL.

* Flexible management of the configuration of stores: distinct category navigation, product schema details, and users.

* Separate deployment of each database per store: deploy a new version of a store's database without affecting the other stores' databases.

### Separated setup: Integration

New projects are shipped with a shared setup by default. To switch to a separated setup, reach out to your sales representative.


### Dynamic Multistore

Dynamic Multistore extends multi-store, allowing several stores within one domain (region based). For more information, see [Dymamic Multistore](/docs/pbc/all/dynamic-multistore/{{site.version}}/base-shop/dynamic-multistore-feature-overview.html).
