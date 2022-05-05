---
title: Multi-store setups
description: Types of multi-store setups in Spryker Cloud Commerce OS
template: concept-topic-template
---


## Into about supported setups

This document describes the multi-store setups supported by Spryker Cloud.

Currently, the following setups are available:

* Separated: separate databases and codebase.
* Shared: shared databases and codebase.


## Shared setup

With the separated setup, all the stores share a single database and codebase. It is the standard Spryker setup.


![shared setup diagram]()


### Shared setup: When to use


We recommend this setup for the stores that can be described as follows:

* All the stores are united into a multi-store system.

* All the stores follow the same business logic.

* Insignificant differences are covered in the code, for example, using code-buckets.

### Shared setup: Details

The shared setup features:

* Products, customers, orders, and so on are stored in the same database, which simplifies collaborative management.

* Applications are not scaled or deployed independently since all cloud resources are shared. This setup is much more cost effective if you don’t need to separate workflows.

    * All stores are hosted in a single AWS region.

    * Shared traffic distribution for all stores using ALB+NLBs.

* SSL certificates are generated automatically or managed manually in AWS.

    * SSL termination process is handled by ALB.

    * We can assign multiple certificates of different domains to one ALB.

* Single CI/CD pipeline is used for all the stores.

* On-demand setup of any type of environment: test, staging, and so on.




## Separated setup

With the separated setup, each store has a dedicated database and codebase.

![shared setup diagram]()


### Separated setup: When to use

We recommend this setup for the stores that can be described as follows:

* The stores are completely different from the perspective of:

    * design

    * business logic

    * features or modules

* Independent maintenance and development: each store is handled by a dedicated team with its development workflow and release cycles.

* Separated data management for products, customers, orders, and so on. Data sharing and synchronization requires external systems.


### Separated setup: Details


The separated setup features:

* Flexible but expensive scaling and deployment:

    * Stores can be hosted in different AWS regions. For example, US store in N. Virginia and DE store in Frankfurt.

    * Independent traffic distribution for every store using ALBs ([application load balancers](application load balancers)) and NLBs ([network load balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html)).

* SSL certificates are generated automatically or managed manually in AWS.

    * SSL termination process is handled by ALB.

    * We can assign multiple certificates of different domains to one ALB.

* Several CI/CD(continuous integration/continuous delivery) pipelines are shipped for every store by default.

* On-demand setup of any type of environment: test, staging, and so on.
