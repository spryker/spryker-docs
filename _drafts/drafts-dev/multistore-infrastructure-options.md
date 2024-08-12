---
title: Multi-store setup infrastructure options
template: howto-guide-template
last_updated: May 3, 2023
---

Extracted from this doc: docs\scos\dev\tutorials-and-howtos\howtos\howto-set-up-multiple-stores.md

## Multi-store setup infrastructure options

Multi-store setup 1: Database, search engine, and key-value storage are shared between stores.

![multi-store setup 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/how-to-set-up-multiple-stores.md/multi-store-setup-configuration-option-1.png)

Due to the resources being shared, the infrastructure costs are low. This setup is most suitable for B2C projects with low traffic and a small amount of data like products and prices.

Multi-store setup 2: Each store has a dedicated search engine and key-value storage while the database is shared.

![multi-store setup 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/how-to-set-up-multiple-stores.md/multi-store-setup-configuration-option-2.png)

This setup is most suitable for B2B projects with high traffic and a large amount of data.

Multi-store setup 3: Each store has a dedicated database, search engine, and key-value storage.

![multi-store setup 3](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/how-to-set-up-multiple-stores.md/multi-store-setup-configuration-option-3.png)

This setup is most suitable for projects with the following requirements:

* Completely different business requirements per store, like business logic and features.
* Independent maintenance and development flow.
* Separated data management for entities like products, customers, and orders.
* On-demand setup of any type of environment per store, like test, staging, or production.

It's the most expensive but flexible option in terms of per-store scaling and performance.