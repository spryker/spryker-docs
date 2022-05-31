---
title: Adding databases for stores
description: Learn how to deploy a dedicated database for a store
template: howto-guide-template
---

This document describes how to deploy a dedicated database for a store.


## Define a database

1. In the needed deploy file, define the new database:
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
                eu-region-existing-database:
                eu-region-new-database:

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
                        name: eu-region-existing-database
            AT:
                services:
                    broker:
                        namespace: at-docker
                    key_value_store:
                        namespace: 2
                    search:
                        namespace: at_search
                    database:
                        name: eu-region-new-database
```                        

## Deploy the database

Run a destructive pipeline for the application. Based on the environment, follow the instructions in one of the following docs:

* [Deploying in a staging environment](/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-staging-environment.html)
* [Deploying in a production environment](/docs/cloud/dev/spryker-cloud-commerce-os/deploying-in-a-production-environment.html)
