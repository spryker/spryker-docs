---
title: Add and remove databases of stores
description: Learn how to add and remove store-specific databases in Spryker Cloud Commerce OS, including configuration and deployment steps for multi-store setups.
template: howto-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/multi-store-setups/add-and-remove-databases-of-stores.html
---

This document describes how to add and remove a dedicated database of a store.

## Prerequisites

Make sure that your project supports the [separated multi-store setup](/docs/ca/dev/multi-store-setups/multi-store-setups.html).


## Add a database for a store


In this example, there is an existing DE store with a dedicated database, and you are going to add a database for AT store.


### Define a database

1. In the needed deploy file, define the AT database:

```yaml
...

regions:
    EU:
        services:
            mail:
                sender:
                    name: Spryker No-Reply
                    email: no-reply@spryker.local
            databases:
                eu-region-de-database:
                eu-region-at-database:

...                
```

2. Bind the defined database to the needed stores:

```yaml
...

regions:
    ...
       stores:
            DE:
                services:
                    broker:
                        namespace: de-docker
                    key_value_store:
                        namespace: 1
                    search:
                        namespace: de_search
                    database:
                        name: eu-region-de-database
            AT:
                services:
                    broker:
                        namespace: at-docker
                    key_value_store:
                        namespace: 2
                    search:
                        namespace: at_search
                    database:
                        name: eu-region-at-database
```

### Deploy the database

Run a destructive pipeline for the application. Based on the environment, follow the instructions in one of the following docs:

* [Deploying in a staging environment](/docs/ca/dev/deploy-in-a-staging-environment.html)
* [Deploying in a production environment](/docs/ca/dev/deploy-in-a-production-environment.html)


## Remove a database of store

To remove a database of a store, you need to remove its configuration from the needed deploy file. In this example, you are going to remove the AT store that was used as an example for [adding a database](#add-a-database-for-a-store).


### Remove the configuration of the database

1. In the needed deploy file, remove the definition the AT database:

```yaml
...

regions:
    EU:
        services:
            mail:
                sender:
                    name: Spryker No-Reply
                    email: no-reply@spryker.local
            databases:
                eu-region-de-database:

...                
```

2. Remove the configuration of the AT store:

```yaml
...

regions:
    ...
       stores:
            DE:
                services:
                    broker:
                        namespace: de-docker
                    key_value_store:
                        namespace: 1
                    search:
                        namespace: de_search
                    database:
                        name: eu-region-existing-database
```


### Deploy the application without the removed database

Run a destructive pipeline for the application. Based on the environment, follow the instructions in one of the following docs:

* [Deploying in a staging environment](/docs/ca/dev/deploy-in-a-staging-environment.html)
* [Deploying in a production environment](/docs/ca/dev/deploy-in-a-production-environment.html)
