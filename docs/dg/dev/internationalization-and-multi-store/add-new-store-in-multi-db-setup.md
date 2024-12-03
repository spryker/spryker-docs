---
title: "Adding new store in multi-db setup"
description: Adding and deploying a new store in multi-db store setup requires additional steps and preparation. This guideline contains all the best practices you need to know.
last_updated: Dec 02, 2024
template: howto-guide-template
originalLink: 
originalArticleId: 
redirect_from:
---

Setting up a new store in an existing multi-DB environment requires a carefully crafted plan to ensure that the data and operations of existing stores remain unaffected. This guide outlines a detailed procedure for launching a new store within a region that already hosts other stores, guaranteeing a seamless and safe deployment.

{% info_block warningBox %}
This guide is applicable in scenarios where store configurations and setups are managed programmatically through code. If you are utilizing the Dynamic Multistore feature to manage your stores via Backoffice, please refer to this {guide}(/docs/pbc/all/dynamic-multistore/202410.0/dynamic-multistore.html)
{% endinfo_block %}

## Initial planning and best practices

### Clear Roadmap
It is good to have overall plan, detailing all stores that will be added in the future. This can impact not only database structure and configurations, but overall decisions on how to approach the rollout, making sure it is cost-efficient over time, on all ends.

### Backup strategy
Always have a backup plan ready in case of issues during the deployment. This includes not only database backups but also considerations on all points you will find below, including the business side.

### Environment Preparation
Prepare your production and non-production environments for a new store rollout. Make sure you don’t have additional functionality to be released on top or parallel development. This involves ensuring that teams are prepared and stakeholders are aware of the procedure.

### Repeatability
If you plan to release more stores in the future, focus that this process is easily repeatable in the future. That includes creating detailed technical documentation, release procedure, and tickets (epics, stories, tasks) in your project management software. This can be a detailed script or checklist tailored to your project, covering all relevant steps, configurations, and integrations. This documentation will be invaluable for future deployments and troubleshooting.

## Detailed Considerations for the Migration

### Integrations and 3rd party systems
* Review and adjust all third-party integrations to ensure they work with the new store setup. Here we mainly talk about data and it’s isolation across multiple virtual DBs. Assure that people working with both sides of the system (backend, frontend, merchant portal and APIs) do have all needed data access.
* Integrations such as single sign-on, payment gateways, inventory systems may require updates. Make sure tech teams responsible for that systems are available, and ready to do necessary changes on time.

### Data Import
* Handle the data import process carefully, breaking it down into specific tasks such as configuring databases and adjusting the data import setup to work with the new store.
* Ensure any existing databases, such as the one from another country in one case, are correctly renamed or adjusted to fit the new multi-DB structure.
* Anticipate and plan for potential updates that may arise after end2end testing of the project data migration.

### Code Buckets
* If used, investigate and adjust code bucket configurations as necessary. The technical steps required for these adjustments should be documented thoroughly, ensuring that code-bucket related functionalities are not disrupted by the addition of a new store.

### Cloud environment and monitoring
* Think of and adjust monitoring tools and APM (such as NewRelic, CloudWatch) to accommodate the new store. Check that all alerts and metrics are correctly configured to monitor the health and performance of the new store alongside existing ones.
* Think of adjusting AWS Services such as S3, introducing buckets for the new store(s).

### Front-end Considerations
* Consider any other activities related to the above epics that might impact the deployment. For instance, front-end separation might be a significant task, requiring layout adjustments between different stores and possible adjustments on the API side.

## Step-by-Step Procedure to release a new store(s)

Follow [this guideline](/docs/scos/dev/technical-enhancement-integration-guides/integrate-multi-database-logic.html#define-databases) as a generic technical guideline for defining new database(s), connecting them with new store(s) and adding necessary configuration.

### Local Setup
#### New store configuration

* Define a new database and the store in the deploy file, following [that guide](/docs/ca/dev/multi-store-setups/add-and-remove-databases-of-stores.html#remove-the-configuration-of-the-database). As a result you should have:
  * new database in regions.<region_name>.services.databases 
  * new store in regions.<region_name>.stores 
  * new domains in groups.<region_name>.applications  
* Adjust stores.php with the configurations, relevant for your new store, following generic technical guideline. 
* Prepare data import configurations and data files, specific to the new store. 
* Adjust the local environment setup as needed, including configurations and environment variables. Examples: frontend router configuration, code bucket configuration, creating new backoffice users. 
* Document all the steps you have done, to make sure they are repeatable in the future.

#### Running initial setup locally

* Bootstrap your updated configuration and run your environment as usual:
  ```bash
  docker/sdk boot deploy.dev.yml
  docker/sdk up
  ```
* Verify that the new store’s database is correctly initialized and filled up with the demo data.

#### Setting up additional deployment recipes

It is convenient to create additional deployment install recipes (located under config/install folder) to setup a new and delete an existing stores, for testing purposes. Below is an example of such setup that proves to be working well on prcatice. We took the existing folder structure, and EU folder as a base, but you can introduce your structure:

1. config/install/EU/setup-store.yml - contains everything needed to do a minimal setup of a new store(s):
```
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
2. config/install/EU/delete-store.yml - contains everything needed to remove an existing store(s):
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
In further sections below you’ll see how you can use your new custom recipe during the deployment in your main deployment yml file’s “SPRYKER_HOOK_DESTRUCTIVE_INSTALL“ parameter as following:

```SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "vendor/bin/install {STORES_GO_HERE} -r EU/setup-store --no-ansi -vvv"```

or

```SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "vendor/bin/install {STORES_GO_HERE} -r EU/delete-store --no-ansi -vvv"```

### Staging Setup
#### Environment Configuration

* Update the staging environment’s configuration to include the new store.
* For database to be initialised, you will need to run a destructive deployment for your new store. To assure existing stores are not affected, you need to specify only new store code(s) in your deployment yml file (image.environment section), in `SPRYKER_HOOK_DESTRUCTIVE_INSTALL`. Example, for new PL and AT stores to be introduced:
`SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "vendor/bin/install PL,AT -r EU/destructive --no-ansi -vvv"`
You can also use your custom recipe following the examples above (see “Setting up additional deployment recipes “)

#### Support Requests
* Open a support request to apply the new configuration to the staging environment. Attach all necessary files and provide detailed deployment instructions. You can also have the necessary configuration in a specific branch of your repository
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
