---
title: "Adding stores in a multi-database setup"
description: Adding and deploying a new store in multi-db store setup requires additional steps and preparation. This guideline contains all the best practices you need to know.
last_updated: Dec 02, 2024
template: howto-guide-template
originalLink:
originalArticleId:
redirect_from:
---

Setting up a new store in an existing multi-database environment requires a carefully crafted plan to ensure that the data and operations of existing stores remain unaffected. This document describes how to launch a new store within a region that already hosts other stores, guaranteeing a seamless and safe deployment.

{% info_block warningBox %}
This guide can be used for projects that are managing stores programmatically through code. If you're using the Dynamic Multistore feature to manage your stores in the Back Office, refer to [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/202410.0/dynamic-multistore.html)
{% endinfo_block %}

## Initial planning and best practices

This section describes the planning stage of launching a store.

### Clear roadmap

It's good to have an overall plan, detailing all the stores you want to add in future. This can affect database structure, configuration, and overall decisions on how to approach the rollout, making sure it is cost-efficient over time, on all ends.


### Backup strategy

A backup plan needs to be ready in case of issues during deployment. Apart from database backups, this includes considerations on all the points in the following sections, including the business side.

### Environment preparation
To prepare your production and non-production environments for a store rollout, make sure there's no additional functionality to be released on top or parallel development. Teams and stakeholders need to be prepared and aware of the procedure.

### Repeatability
If you're planning to release more stores in future, prepare process to be easily repeatable. This includes creating various detailed documentation, release procedure, and tickets, such as epics, stories, tasks, in your project management software. This can be a detailed script or checklist tailored to your project, covering all relevant steps, configurations, and integrations.


## Detailed considerations for the migration

### Integrations and third-party systems
* Review and adjust all third-party integrations to ensure they work with the new store setup. This mainly concerns data and it’s isolation across multiple virtual DBs. Make sure that people working with both sides of the system, such as backend, frontend, merchant portal and APIs, have access to all the needed data.
* Integrations, such as single sign-on, payment gateways, or inventory systems, may require updates. Make sure tech teams responsible for those systems are available and ready to do needed changes on time.

### Data import
* Handle the data import process carefully, breaking it down into specific tasks such as configuring databases and adjusting the data import setup to work with the new store.
* Make sure existing DBs, for example–a DB from another country, are correctly renamed or adjusted to fit the new multi-DB structure.
* Anticipate and plan for potential updates that may arise after end-to-end testing of the project data migration.

### Code buckets
* If code buckets are used, investigate and adjust their configurations as necessary. Thoroughly document the steps for adjusting the configurations, making sure that code bucket keep working properly after a new store is added.

### Cloud environment and monitoring
* Consider and adjust monitoring tools and APM, such as NewRelic and CloudWatch, to accommodate the new store. Check that all alerts and metrics are correctly configured to monitor the health and performance of the new store.
* Check if you need to adjust AWS services, for example–introduce buckets for the new store in S3.

### Frontend considerations

Reconsider the prior topics relative to your frontend. For example–frontend separation might be a significant task, requiring layout changes between different stores and API changes.

## Releasing stores

This section provides detailed guidelines for releasing stores.

For general instructions for defining new databases, connecting them with new stores, and adding configuration, follow [Integrate multi-database logic](/docs/dg/dev/integrate-and-configure/integrate-multi-database-logic.html).

### Local setup



#### New store configuration

* Using [Add and remove databases of stores](/docs/ca/dev/multi-store-setups/add-and-remove-databases-of-stores.html#remove-the-configuration-of-the-database), define the following new entities in your deploy file:

| ENTITY | SECTION |
| Database | `regions.<region_name>.services.databases` |
 | Store | `regions.<region_name>.stores`|
| Domains | `groups.<region_name>.applications`  |

* Using [Integrate multi-database logic](/docs/dg/dev/integrate-and-configure/integrate-multi-database-logic.html), add the configuration needed for the new store to `stores.php`.
* Prepare data import configurations and data files for the new store.
* Adjust the local environment setup as needed, including configurations and environment variables. Examples:
  * Frontend router configuration
  * Code bucket configuration
  * Create new Back Office users
* To make sure these steps are repeatable in future, document them.

#### Running initial setup locally

Bootstrap your updated configuration and run the project:
  ```bash
  docker/sdk boot deploy.dev.yml
  docker/sdk up
  ```

Make sure the new store’s database has been correctly initialized and filled up with the demo data.

#### Setting up additional deployment recipes

When adding and deleting stores, for testing purposes, we recommend creating additional deployment install recipes in `config/install`. The following are examples of such recipes, which we tested in action. The examples recipes are based on the default folder structure with the EU folder as a base, but you can introduce your own structure.

A minimal recipe for adding a store:

**config/install/EU/setup-store.yml**
```json
env:
  NEW_RELIC_ENABLED: 0
command-timeout: 7200
stores:
  - { STORE-1 }
  - { STORE-2 }
  ...
sections:
  init-storage:
    setup-search-create-sources:
      command: "vendor/bin/console search:setup:sources -vvv --no-ansi"
      stores: true
  init-storages-per-store:
    propel-migrate:
      command: "vendor/bin/console propel:migrate -vvv --no-ansi"
      stores: true
  ...
```

A minimal recipe to remove a store:
**config/install/EU/delete-store.yml**
```
env:
    NEW_RELIC_ENABLED: 0
command-timeout: 7200
stores:
  - { STORE-1 }
  - { STORE-2 }
  ...
sections:
    scheduler-clean:
        scheduler-clean:
            command: "vendor/bin/console scheduler:clean -vvv --no-ansi || true"
            stores: true
    clean-storage:
        clean-storage:
            command: "vendor/bin/console storage:delete -vvv --no-ansi"
            stores: true
    ...
```

You can use these custom recipes for the deployment of the application by adding them to your main deployment file. Examples:

```json
...
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "vendor/bin/install {STORES_GO_HERE} -r EU/setup-store --no-ansi -vvv"
...
```

```json
...
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "vendor/bin/install {STORES_GO_HERE} -r EU/delete-store --no-ansi -vvv"
...
```

More information on this is provided in the following sections.

### Staging setup


#### Environment configuration

* Add the configuration for the new store to the staging environment’s configuration.


For the database to be initialized, you will need to run a destructive deployment for the new store.

To make sure existing stores are not affected, you need to specify only new store code(s) in your deployment yml file (image.environment section), in `SPRYKER_HOOK_DESTRUCTIVE_INSTALL`.

Example, for new PL and AT stores to be introduced: `SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "vendor/bin/install PL,AT -r EU/destructive --no-ansi -vvv"`

You can also use your custom recipe following the examples above (see “Setting up additional deployment recipes “)

#### Support Requests
* Open a support request to apply the new configuration to the environment. Attach deploy file and explain shortly expected changes, i.e. new DB should be created. In case you have the necessary configuration in a specific branch of your repository, provide a reference to it in the ticket, making sure support team has access to your code base.
* Run the destructive deployment, assuring the right store(s) is specified.

#### Deployment Execution
* Deploy the new store in the staging environment, ensuring existing stores remain unaffected.
* Test the new store thoroughly to confirm it operates correctly without impacting other stores, including all the external integrations in the staging mode.

### Production Setup
#### Configuration Preparation

* Prepare the production environment’s configuration similarly to the staging setup.

#### Support and Deployment
* Open a support request to deploy the new store configuration to production, ensuring all configurations are correct.
* Execute the deployment, closely monitoring the process to catch any issues early.

#### Post-Deployment
* After deployment, verify that the new store is fully operational and that no data or services for existing stores have been impacted.
* During environment configuration, if you have chosen to update existing installation recipe (production or destructive), revert it back to its original state.

## Releasing many stores one after another
When you plan releasing multiple stores one after another you can save some time on support requests, doing only one request per environment for all stores upfront, which will make the overall process faster. To do so, adjust the above procedure as following:

### First release
#### Local Setup
* Prepare and test the configuration for ALL stores you are planning to release in the future.

#### Staging Setup
* Prepare staging deploy yml file, containing ALL stores you are planning to release in the future. Open a support request and hand the deploy file to them, explaining your intent and ideally - approx. schedule on when are you going to release all the stores.
* Once the preparation is ready - you can revert the configuration, leaving only store you’d like to release now. We recommend to save this configuration separately, to be able to come back to it later.
* Run the destructive deployment, assuring the right store(s) is specified and check the result.

#### Production Setup
Repeat the same procedure as you’ve done for Staging

### Next releases
While doing next releases, you can add stores you’d like to release one by one and running the destructive deployment on your own and when you need it, w.o. raising a new request with the Support team. Make sure that configuration you’re appending matches with the one you sent during the “first release“ above.
