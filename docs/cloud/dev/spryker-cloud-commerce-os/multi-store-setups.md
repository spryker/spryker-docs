---
title: Multi-store setups
description: Types of multi-store setups in Spryker Cloud Commerce OS
template: concept-topic-template
---

This document describes the multi-store setups supported by Spryker Cloud Commerce OS.

Currently, the following setups are available:

* Separated: a codebase with dedicated databases per store.
* Shared: a codebase with all the stores sharing a database.


## Shared setup

With the shared setup, all the stores share a single database and codebase. It is the standard Spryker setup.


![shared setup diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/multi-store-setups.md/shared-setup.png)


### Shared setup: When to use


We recommend this setup for the stores that can be described as follows:

* All the stores are united into a multi-store system.

* All the stores follow the same business logic.

* Insignificant differences are covered in the code, for example, using code-buckets.

* Stores are scaled together and don't need different deployment workflows.

### Shared setup: Advantages

The shared setup features:

* Products, customers, orders, and so on are stored in the same database, which simplifies collaborative management.

* All the stores are deployed together, which is the most cost-effective solution.

* All stores are hosted in the same AWS region.

* Shared traffic distribution for all stores using ALB+NLBs.

* SSL certificates are generated automatically or managed manually in AWS.

    * SSL termination process is handled by ALB.

    * We can assign multiple certificates of different domains to one ALB.

* Single CI/CD pipeline is used for all the stores.

* On-demand setup of any type of environment: test, staging, and so on.

## Separated setup

With the separated setup, store share the same codebase but have dedicated databases.

![separated setup diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/cloud/spryker-cloud-commerce-os/multi-store-setups.md/separated-setup.png)


### Separated setup: When to use

We recommend this setup for the stores that can be described as follows:

* The stores are completely different from the perspective of the following:

    * Design

    * Business logic

    * Features or modules

* Independent maintenance and development: each store is handled by a dedicated team with its development workflow and release cycles.

* Separated data management for products, customers, orders, and so on. Data sharing and synchronization requires external systems.


### Separated setup: Advantages


The separated setup features:

* Flexible deployment and scaling: since stores are independent of one another, deploy, remove, and scale each store without affecting other stores.

* Several CI/CD(continuous integration/continuous delivery) pipelines are shipped for every store by default.

* Better control over expenses of each store.

* Flexible URL management. For example, you can solve the uniqueness issue with URLs.

* Flexible management of the configuration of stores: distinct category navigation, product schema details, and users.
