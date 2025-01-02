---
title: "Adding stores in a multi-datatabse setup"
description: Adding and deploying a new store in multi-db store setup requires additional steps and preparation. This guideline contains all the best practices you need to know.
last_updated: Dec 02, 2024
template: howto-guide-template
redirect_from:
  - /docs/dg/dev/internationalization-and-multi-store/add-new-store-in-multi-db-setup.html
---

Setting up a new store in an existing multi-database environment requires a carefully crafted plan to ensure that the data and operations of existing stores remain unaffected. This document describes how to launch a new store within a region that already hosts other stores, guaranteeing a seamless and safe deployment.

{% info_block warningBox %}
This guide can be used for projects that are managing stores programmatically through code. If you're using the Dynamic Multistore feature to manage your stores in the Back Office, refer to [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/202410.0/dynamic-multistore.html)
{% endinfo_block %}

## Initial planning and best practices

This section describes the planning stage of launching a store.

### Clear roadmap

Create a long-term plan, detailing all the stores you want to add in future. This can affect database (DB) structure, configuration, and  the choice of rollout approach, making sure it's cost-efficient over time.


### Backup strategy

A backup plan needs to be ready in case of issues during deployment. Apart from DB backups, this includes considerations on all the points in the following sections, including the business side.

### Environment preparation

To prepare production and non-production environments for a store rollout, make sure there's no additional functionality to be released on top or parallel development. Teams and stakeholders need to be prepared and aware of the procedure.

### Repeatability
If you're planning to release more stores in future, make the process easily repeatable. This includes creating detailed documentation, release procedure, and tickets, such as epics, stories, or tasks, in your project management software. This can be a detailed script or checklist tailored to your project, covering all relevant steps, configurations, and integrations.


## Store rollout considerations

This section describes parts of the application you need to consider when preparing a rollout plan.

### Integrations and third-party systems
* Review and adjust all third-party integrations to ensure they work with the new store setup. This mainly concerns data and it’s isolation across virtual DBs. Teams working with both sides of the system, such as backend, frontend, merchant portal and APIs, should have access to all the needed data.
* Integrations, such as single sign-on, payment gateways, or inventory systems, may require updates. Teams responsible for those systems should be available and ready to do needed changes on time.

### Data import
* Handle the data import process carefully, breaking it down into specific tasks such as configuring DBs and adjusting the data import setup to work with the new store.
* Make sure existing DBs, for example–a DB from another country, are correctly renamed or adjusted to fit the multi-DB structure.
* Anticipate and plan for potential updates that may arise after end-to-end testing of the project data migration.

### Code buckets

If code buckets are used, investigate and adjust their configurations, making sure code buckets keeps working properly after the stored is introduced. Thoroughly document the steps for adjusting the code buckets configuration.

### Cloud environment and monitoring
* Consider and adjust application performance monitoring tools, such as NewRelic and CloudWatch, to accommodate the new store. Check that all alerts and metrics are correctly configured to monitor the health and performance of the new store.
* Consider adjusting AWS services, for example–introduce S3 buckets for the new store.

### Frontend considerations

Reconsider the prior topics relative to your frontend. For example–frontend separation might be a significant task, requiring layout changes between different stores and API changes.






## Releasing a store

This section provides detailed guidelines for releasing stores.

For general instructions for defining new DBs, connecting them with new stores, and adding configuration, follow [Integrate multi-DB logic](/docs/dg/dev/integrate-and-configure/integrate-multi-DB-logic.html).

### 1. Local setup

This section describes how to add the configuration and deployment recipes for a new store.


#### Add the configuration for the new store

* Using [Add and remove DBs of stores](/docs/ca/dev/multi-store-setups/add-and-remove-DBs-of-stores.html), define the following new entities in your deploy file:

| ENTITY | SECTION |
| Database | `regions.<region_name>.services.DBs` |
 | Store | `regions.<region_name>.stores`|
| Domains | `groups.<region_name>.applications`  |

* In `stores.php`, add the configuration for the new store. For instructions, see [Integrate multi-DB logic](/docs/dg/dev/integrate-and-configure/integrate-multi-DB-logic.html).
* Prepare data import configurations and data files for the new store.
* Adjust the local environment setup as needed, including configurations and environment variables. Examples:
  * Frontend router configuration
  * Code bucket configuration
  * Create new Back Office users
* To make these steps repeatable in future, document them.

#### Running initial setup locally

Bootstrap the updated configuration and run the project:
  ```bash
  docker/sdk boot deploy.dev.yml
  docker/sdk up
  ```

Make sure the new store’s DB has been correctly initialized and filled up with demo data.

#### Setting up additional deployment recipes

When adding and deleting stores, for testing purposes, we recommend creating additional deployment install recipes in `config/install`. The following are examples of such recipes, which we tested in action. The examples are based on the default folder structure with the EU folder as a base, but you can introduce your own structure.

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

### 2. Staging setup

This section describes how to roll out a new store in a staging environment.

#### Staging environment configuration

Add the configuration for the new store to the staging environment’s configuration.

To initialize the DB, run a destructive deployment for the new store. To not affect existing stores, in the `image.environment` section of the deployment file, define only the new store in `SPRYKER_HOOK_DESTRUCTIVE_INSTALL`. In the following example, new PL and AT stores are introduced:

```yml
...
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "vendor/bin/install PL,AT -r EU/destructive --no-ansi -vvv"
...
```

You can also use a custom recipe as described in [Setting up additional deployment recipes](#setting-up-additional-deployment-recipes).

#### Support requests
* Open a support request to apply the new configuration to the environment. Attach the deploy file and shortly explain expected changes, that is the stores that need to be introduced. If the necessary configuration is in a specific repository branch, reference it in the ticket and make sure the support team has access to your code base.
* Run the destructive deployment, assuring the right store(s) is specified.

#### Deployment Execution
* Deploy the new store in the staging environment.
* Test the new store thoroughly to confirm it operates correctly without affecting other stores, including all the external integrations in the staging mode.

### 3. Production setup

This section describes how to roll out a new store in a production environment.


#### Production environment configuration

Prepare the production environment’s configuration similarly to the staging setup.

#### Support and deployment
* Open a support request to deploy the new store configuration to production.
* Execute the deployment, closely monitoring the process to catch any issues early.

#### Post-deployment
* After deployment, verify that the new store is fully operational and that no data or services for existing stores were affected.
* If you updated an existing installation recipe during environment configuration, revert it back to its original state.

## Releasing multiple stores in a row

This section describes the changes you need to make to the procedure in [Releasing a store] to release multiple stores in a row.

When releasing multiple stores, you need to prepare configuration for all the stores, but release one store at a time.

This lets you avoid repeating some of the steps for multiple stores.

### Release of the first store

#### 1. Local setup

Prepare and test the configuration for *all* the stores you want to release.

#### 2. Staging setup
1. Prepare a staging deploy file, containing all the stores you want to release.
2. Open a support request an describe the end result. Attach the deploy file and optionally provide a rollout schedule for all the stores.

3. Save the configuration you've prepared separately.
4. Update the configuration to contain only the first store you want to release.
5. Run a destructive deployment.

#### 3. Production setup
Repeat the procedure from the previous step for production environment.

### Releases of subsequent stores

After releasing the first store, you can append the configuration for the next store and run a destructive deployment. This way you can release all the stores you've provided the configuration for in your initial support request. You don't have to create additional support tickets.
