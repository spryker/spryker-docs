---
title: "Adding stores in a multi-database setup"
description: Adding and deploying a new store in multi-db store setup requires additional steps and preparation. This guideline contains all the best practices you need to know.
last_updated: Nov 10, 2026
template: howto-guide-template
---

Setting up a new store in an existing multi-database environment requires a detailed plan to make sure that the data and operations of existing stores remain unaffected. This document describes how to seamlessly launch a new store within a region that already hosts other stores.

{% info_block warningBox %}

This guide can be used for projects that are managing stores programmatically through code. If you're using the Dynamic Multistore feature to manage stores in the Back Office, refer to [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/latest/dynamic-multistore.html).

{% endinfo_block %}

## Planning and best practices

This section describes how to properly prepare for making changes related to your stores setup.

### Clear roadmap

Create a long-term plan, detailing all the stores you want to add in future. This can affect database (DB) structure, configuration, and the choice of rollout approach, making sure it's cost-efficient over time.


### Backup strategy

A backup plan needs to be ready in case of issues during deployment. Apart from DB backups, this includes considerations on all the points in the following sections, including the business side.

### Environment preparation

To prepare production and non-production environments for a store rollout, make sure there's no parallel development and no additional functionality to be released on top. Teams and stakeholders need to be prepared and aware of the procedure.

### Repeatable process

If you're planning to release more stores in future, make the process easily repeatable. This includes creating detailed documentation, release procedure, and tickets, such as epics, stories, or tasks, in your project management software. This can be a detailed script or checklist tailored to your project, covering all relevant steps, configurations, and integrations.


## Store rollout considerations

This section describes parts of the application you need to take into account when preparing a rollout plan.

### Integrations and third-party systems

- Review and adjust all third-party integrations to ensure they work with the new store setup. This mainly concerns data and its isolation across virtual DBs. Teams working with both sides of the system, such as backend, frontend, merchant portal and APIs, should have access to all the needed data.
- Integrations, such as single sign-on, payment gateways, or inventory systems, may require updates. Teams responsible for those systems should be available and ready to do the needed changes on time.

### Data import

- Handle the data import process carefully, breaking it down into specific tasks such as configuring DBs and adjusting the data import setup to work with the new store.
- Make sure existing DBs, for example–a DB from another country, are correctly renamed or adjusted to fit the multi-DB structure.
- Anticipate and plan for potential updates that may arise after end-to-end testing of the project data migration.

### Code buckets

If code buckets are used, investigate and adjust their configurations, making sure code buckets keep working properly after the store is introduced. Thoroughly document the steps for adjusting the code buckets configuration.

### Cloud environment and monitoring

- Consider and adjust application performance monitoring tools, such as NewRelic and CloudWatch, to accommodate the new store. Check that all alerts and metrics are correctly configured to monitor the health and performance of the new store.
- Consider adjusting AWS services, for example–introduce S3 buckets for the new store.

### Environment variables and AWS limits

Every store you add usually adds environment variables or makes existing ones longer. In Spryker Cloud Commerce OS, environment variables are stored in AWS Systems Manager Parameter Store and passed to applications through Amazon ECS task definitions. Both services have size limits. If a deployment exceeds a limit, it fails, so check your environment variables before each store rollout.

#### AWS limits to keep in mind

| LIMIT | VALUE | WHAT IT AFFECTS |
|-------|-------|-----------------|
| Maximum size of an ECS task definition | 64 KiB (65,536 bytes) | All environment variables of a service together, because each environment variable adds an entry to the task definition. |
| Maximum size of a Parameter Store parameter value, Standard tier | 4 KB | The value of a single environment variable. |
| Maximum size of a Parameter Store parameter value, Advanced tier | 8 KB | The value of a single environment variable. |

Some environment variables grow with each store. For example, `SPRYKER_PAAS_SERVICES` contains a JSON mapping with the connection details of each store's database. With many stores, such a variable can reach the parameter value limit, and the total of all variables can reach the task definition limit.

For details about the limits, see [Amazon ECS service quotas](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-quotas.html) and [Managing parameter tiers](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html).

#### Keep only secrets in environment variables

To keep the number and size of environment variables small, use environment variables only for secrets, such as passwords, API keys, tokens, and hashes.

Put all non-secret values into the project configuration files in `config/Shared`, for example, `config_default.php` or an environment-specific file such as `config_production.php`. Non-secret values include the following:

- URLs and hostnames of third-party services
- Folder and file paths
- File names
- Email addresses
- Feature flags and other settings

Configuration files are versioned together with your code, so this also makes configuration changes easier to review and roll back. For more information about adding variables, see [Add variables in the Parameter Store](/docs/ca/dev/add-variables-in-the-parameter-store.html).

#### Combine per-store secrets into one environment variable

If a secret has a different value per store, for example, an API key of a payment provider, do not create a separate environment variable for each store, such as `PAYMENT_API_KEY_DE`, `PAYMENT_API_KEY_AT`, and `PAYMENT_API_KEY_PL`. Each of them adds a name and a value to the task definition.

Instead, store all values in one environment variable as a JSON mapping, with store names as keys:

```json
{"DE": "de-api-key", "AT": "at-api-key", "PL": "pl-api-key"}
```

In the configuration file, decode the mapping and select the value for the current store:

```php
$paymentApiKeys = json_decode(getenv('PAYMENT_API_KEYS') ?: '{}', true);
$config[PaymentConstants::API_KEY] = $paymentApiKeys[getenv('APPLICATION_STORE')] ?? null;
```

`PaymentConstants::API_KEY` is an example constant. Replace it with the constant of your module.

When you add a store, add its key to the existing mapping instead of creating a new environment variable. Make sure that the value of the mapping stays within the parameter value limit of your Parameter Store tier.

### Frontend considerations

Reconsider the prior topics relative to your frontend. For example–frontend separation might be a significant task, requiring layout changes between different stores and API changes.






## Releasing a store

This section provides detailed guidelines for releasing a store.

For general instructions for defining new DBs, connecting them with new stores, and adding configuration, follow [Integrate multi-DB logic](/docs/dg/dev/integrate-and-configure/integrate-multi-database-logic.html).

### 1. Local setup

This section describes how to add the configuration and deployment recipes for a new store.


#### Add the configuration for the new store

- Using [Add and remove DBs of stores](/docs/ca/dev/multi-store-setups/add-and-remove-databases-of-stores.html), define the following new entities in your deploy file:

| ENTITY   | SECTION                              |
|----------|--------------------------------------|
| Database | `regions.<region_name>.services.DBs` |
| Store    | `regions.<region_name>.stores`       |
| Domains  | `groups.<region_name>.applications`  |

- In `stores.php`, add the configuration for the new store. For instructions, see [Integrate multi-DB logic](/docs/dg/dev/integrate-and-configure/integrate-multi-database-logic.html).
- Prepare data import configurations and data files for the new store.
- Adjust the local environment setup as needed, including configurations and environment variables. Examples:
  - Frontend router configuration
  - Code bucket configuration
  - Environment variables of the new store. To stay within AWS limits, see [Environment variables and AWS limits](#environment-variables-and-aws-limits).
  - Create new Back Office users
- To make these steps repeatable in future, document them.

#### Running initial setup locally

Bootstrap the updated configuration and run the project:

  ```bash
  docker/sdk boot deploy.dev.yml
  docker/sdk up
  ```

Make sure the new store's DB has been correctly initialized and filled up with demo data.

#### Setting up additional deployment recipes

When adding and deleting stores, for testing purposes, we recommend creating additional deployment install recipes in `config/install`. The following are examples of such recipes, which we tested in action. The examples are based on the default folder structure with the EU folder as a base, but you can introduce your own structure.

A recipe for adding a store:

**config/install/EU/setup-store.yml**

```yml
env:
  NEW_RELIC_ENABLED: 0
command-timeout: 7200
stores:
  - PL # the new store
sections:
  init-storage:
    setup-search-create-sources:
      command: "vendor/bin/console search:setup:sources -vvv --no-ansi"
      stores: true
  init-storages-per-store:
    propel-migration-delete:
      command: "vendor/bin/console propel:migration:delete -vvv --no-ansi"
      stores: true
    propel-diff:
      command: "vendor/bin/console propel:diff -vvv --no-ansi"
      stores: true
    propel-migrate:
      command: "vendor/bin/console propel:migrate -vvv --no-ansi"
      stores: true
    propel-migration-cleanup:
      command: "vendor/bin/console propel:migration:delete -vvv --no-ansi"
      stores: true
    init-database:
      command: "vendor/bin/console setup:init-db -vvv --no-ansi"
      stores: true
  queue-setup:
    queue-setup:
      command: "vendor/bin/console queue:setup -vvv --no-ansi"
      stores: true
  data-import:
    import-store-data:
      command: "vendor/bin/console data:import --config=data/import/production/full_${APPLICATION_STORE}.yml"
      stores: true
  scheduler-setup:
    scheduler-setup:
      command: "vendor/bin/console scheduler:setup -vvv --no-ansi"
      stores: true
  publish-data:
    trigger-events:
      command: "vendor/bin/console publish:trigger-events -vvv --no-ansi"
      stores: true
```

The recipe runs the following commands for each store in the `stores` list:

| COMMAND | PURPOSE |
|---------|---------|
| `search:setup:sources` | Creates the search indexes of the store. |
| `propel:migration:delete`, `propel:diff`, `propel:migrate` | Generate the migrations for the empty DB of the store and create its tables. The last `propel:migration:delete` removes the generated migration files. |
| `setup:init-db` | Fills the DB with the initial data, such as Back Office users and ACL rules. |
| `queue:setup` | Declares the exchanges and queues in the RabbitMQ vhost of the store. Required only if runtime setup is disabled. For details, see [Set up message queues for the new store](#set-up-message-queues-for-the-new-store). |
| `data:import` | Imports the data of the store. Replace the configuration file with your own. |
| `scheduler:setup` | Creates the scheduler jobs of the store, such as queue workers. |
| `publish:trigger-events` | Publishes the imported data to the key-value store and the search engine. |

The recipe does not create the DB itself. In Spryker Cloud Commerce OS, the deployment pipeline creates the DB of each store defined in the deploy file. Locally, `docker/sdk boot` and `docker/sdk up` create it.

The `propel:diff` step is required if your project does not commit migration files, which is the default in the Spryker demo shops. Without it, `propel:migrate` reports that there is nothing to migrate, the DB of the new store stays empty, and `setup:init-db` fails.

A minimal recipe for removing a store:

**config/install/EU/delete-store.yml**

```yml
env:
  NEW_RELIC_ENABLED: 0
command-timeout: 7200
stores:
  - PL # the store to remove
sections:
  scheduler-clean:
    scheduler-clean:
      command: "vendor/bin/console scheduler:clean -vvv --no-ansi || true"
      stores: true
  clean-storage:
    clean-storage:
      command: "vendor/bin/console storage:delete -vvv --no-ansi"
      stores: true
  # ...
```

You can use these custom recipes for the deployment of the application by adding them to the `image.environment` section of your deploy file. In the following examples, `PL` is the store to add or remove:

```yml
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "vendor/bin/install PL -r EU/setup-store --no-ansi -vvv"
```

```yml
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "vendor/bin/install PL -r EU/delete-store --no-ansi -vvv"
```

{% info_block warningBox "Hooks run one command" %}

The deployment pipeline runs the value of a hook variable as a single command, without a shell. Shell operators, such as `&&`, `;`, or `|`, are passed to the command as arguments and do not work. To run several commands, put them into a script in your repository and call the script from the hook.

{% endinfo_block %}

The following sections describe how custom recipes are used in a store rollout.

#### Choose the deployment pipeline

In Spryker Cloud Commerce OS, you can add a store with a destructive or a normal deployment. Both pipelines create the DB of the new store and the RabbitMQ vhost of the new store. They differ in the following steps:

| STEP | NORMAL PIPELINE | DESTRUCTIVE PIPELINE |
|------|-----------------|----------------------|
| Manual approval | No | Yes |
| RabbitMQ vhosts in the `Build_and_Prepare` step | Creates missing vhosts and keeps existing ones | Deletes and re-creates the vhosts of all stores |
| Install hook in the `Run_install` step | `SPRYKER_HOOK_INSTALL` | `SPRYKER_HOOK_DESTRUCTIVE_INSTALL` |

{% info_block warningBox "Default destructive install" %}

If `SPRYKER_HOOK_DESTRUCTIVE_INSTALL` is not set, the destructive pipeline runs `vendor/bin/install -r destructive --no-ansi -vvv`. In the Spryker demo shops, this recipe deletes the DB tables, the key-value store data, and the search indexes of all stores. Before you run a destructive deployment, make sure that the hook runs only the recipe for the new store, and create a DB backup.

{% endinfo_block %}

Because a normal deployment keeps the vhosts and messages of existing stores, we recommend using it to add a store. To add a store with a normal deployment, do the following:

1. Create a script that runs the recipe for the new store first, and then your regular install recipe. Replace `EU/production` with the recipe that `SPRYKER_HOOK_INSTALL` runs in your project.

    **config/install/add-store.sh**

    ```bash
    #!/usr/bin/env bash
    set -euo pipefail

    vendor/bin/install "$1" -r EU/setup-store --no-ansi -vvv
    vendor/bin/install -r EU/production --no-ansi -vvv
    ```

2. For one deployment, set `SPRYKER_HOOK_INSTALL` to run the script for the new store:

    ```yml
    SPRYKER_HOOK_INSTALL: "bash config/install/add-store.sh PL"
    ```

3. Run a normal deployment.
4. Revert `SPRYKER_HOOK_INSTALL` to its original value.

Make sure that the recipe for adding a store can run more than once without side effects. A normal deployment has no manual approval step, and if it fails, you need to run it again.

#### Set up message queues for the new store

In a multi-store setup, each store has its own RabbitMQ virtual host (vhost), for example, `de_queue` or `us_queue`.

If you add the store with a normal deployment, the vhosts of existing stores are not changed. If runtime setup is disabled, as described later in this section, run `queue:setup` only for the new store in the recipe for adding a store. The rest of this section applies to destructive deployments.

{% info_block warningBox "Destructive deployments re-create the vhosts of all stores" %}

In Spryker Cloud Commerce OS, the destructive pipeline deletes and re-creates the RabbitMQ vhosts of all stores in the `Build_and_Prepare` step. This happens even if `SPRYKER_HOOK_DESTRUCTIVE_INSTALL` runs the recipe only for the new store. After this step, the vhosts of all stores are empty, and all messages that were still in the queues are lost.

{% endinfo_block %}

Before you start a destructive deployment, make sure that the queues of all stores are empty. For example, enable maintenance mode and wait until the queue workers process all messages.

After the vhosts are re-created, the exchanges and queues must be declared again. How this happens depends on runtime setup. With runtime setup, the application declares the exchanges and queues it needs each time it connects to RabbitMQ. Runtime setup is controlled by `RabbitMqEnv::RABBITMQ_ENABLE_RUNTIME_SETTING_UP`:

- `true`, the default: the application declares the exchanges and queues of each store automatically. You do not need to run `queue:setup`.
- `false`: exchanges and queues exist only after you run `queue:setup`. Projects often disable runtime setup to improve performance. For details about the performance impact and how to disable runtime setup, see [Disable automatic queue creation](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html#disable-automatic-queue-creation).

If runtime setup is disabled, the `queue:setup` command declares exchanges and queues only in the vhost of the store it runs for. If it runs only for the new store, the existing stores stay without queues, and their data import, publish, and sync commands fail with an error like the following:

```text
NOT_FOUND - no exchange 'publish.translation' in vhost 'de_queue'
```

If runtime setup is disabled in your project, do the following:

1. Create a recipe that runs `queue:setup` for all stores, including the new one:

    **config/install/EU/queue-setup.yml**

    ```yml
    env:
      NEW_RELIC_ENABLED: 0
    stores:
      - DE
      - AT
      - PL # the new store
    sections:
      queue-setup:
        queue-setup:
          command: "vendor/bin/console queue:setup -vvv --no-ansi"
          stores: true
    ```

2. Create a script that runs this recipe before the recipe for the new store, and call it from `SPRYKER_HOOK_DESTRUCTIVE_INSTALL`:

    **config/install/add-store-destructive.sh**

    ```bash
    #!/usr/bin/env bash
    set -euo pipefail

    vendor/bin/install -r EU/queue-setup --no-ansi -vvv
    vendor/bin/install "$1" -r EU/setup-store --no-ansi -vvv
    ```

    ```yml
    SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "bash config/install/add-store-destructive.sh PL"
    ```

3. In the recipe for adding a store, run `queue:setup` with `stores: true` after the DB is initialized and migrated, and before any data import or publish command that writes to queues.
4. In the recipe for normal deployments, which is defined in `SPRYKER_HOOK_INSTALL`, run `queue:setup` with `stores: true`, and add the new store to its `stores` list. This way, normal deployments declare queues that new code introduces.
5. Run `scheduler:setup` with `stores: true`, so that the scheduler, for example Jenkins, gets the queue worker and other jobs of the new store. Make sure the new store is included in the jobs configuration in `config/Zed/cronjobs/jenkins.php`.

{% info_block warningBox "Do not delete data of existing stores" %}

Do not add commands that purge or delete data to the recipe for adding a store, such as `queue:queue:purge-all`, `propel:tables:drop`, `storage:delete`, `elasticsearch:index:delete`, or `scheduler:clean` without store scoping. These commands remove data of existing stores.

{% endinfo_block %}

The vhost re-creation happens in the cloud pipeline, so a local run of your recipes does not reproduce it. To test the scenario locally, delete the vhosts of all stores, for example, with `rabbitmqctl delete_vhost`, run the command from `SPRYKER_HOOK_DESTRUCTIVE_INSTALL`, and check that the vhost of each store has its exchanges and queues.

### 2. Staging setup

This section describes how to roll out a store in a staging environment. This rollout is used to test the new store and how it affects the existing stores.

#### Staging environment configuration

Add the configuration for the new store to the staging environment's configuration.

To initialize the new store's DB, run a normal or a destructive deployment, as described in [Choose the deployment pipeline](#choose-the-deployment-pipeline). For a destructive deployment, in the `image.environment` section of the deployment file, define only the new store in `SPRYKER_HOOK_DESTRUCTIVE_INSTALL`. In the following example, new PL and AT stores are introduced:

```yml
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "vendor/bin/install PL,AT -r EU/setup-store --no-ansi -vvv"
```

We also recommend using a custom recipe for this deployment as described in [Setting up additional deployment recipes](#setting-up-additional-deployment-recipes).

#### Apply the configuration

1. Open a support request and explain the expected changes, that is that stores need to be introduced. Attach the deploy file. If the needed configuration is in a specific repository branch, reference it in the ticket and make sure the support team has access to your code base.
2. Run the normal or destructive deployment for the stores that have been configured in the support request.

#### Deployment execution

1. Deploy the new store in the staging environment.
2. Thoroughly test the new store to confirm it operates correctly without affecting other stores, including all the external integrations in the staging mode.

### 3. Production setup

This section describes how to roll out a new store in a production environment.


#### Production environment configuration

Prepare the production environment's configuration similarly to the staging setup.

#### Apply the configuration

- Open a support request to deploy the new store configuration to production.
- Execute the deployment, closely monitoring the process to catch any issues early.

#### Post-deployment

- Verify that the new store is fully operational and that no data or services for existing stores have been affected.
- Verify that the RabbitMQ vhosts of all stores have their exchanges and queues, and that the queue workers of all stores consume messages.
- If you updated an existing installation recipe during environment configuration, revert it back to its original state.

## Releasing multiple stores in a row

This section describes the changes you need to make to the procedure in [Releasing a store](#releasing-a-store) to release multiple stores in a row.

When releasing multiple stores, you need to prepare configuration for all the stores, but release one store at a time.

This lets you avoid repeating some of the steps for multiple stores.

### Release of the first store

This section describes how to release the first store. It includes the preparation for releasing subsequent stores.

#### 1. Local setup

Prepare and test the configuration for *all* the stores you want to release.

#### 2. Staging setup

1. Prepare a staging deploy file, containing all the stores you want to release.
2. Open a support request and describe the end result. Attach the deploy file and optionally provide a rollout schedule for all the stores.
3. Save the configuration you've prepared separately.
4. Update the configuration to contain only the first store you want to release.
5. Run a normal or destructive deployment, as described in [Choose the deployment pipeline](#choose-the-deployment-pipeline).

#### 3. Production setup

Repeat the procedure from the previous step for production environment.

### Releases of subsequent stores

After releasing the first store, you can append the configuration for the next store and run a normal or destructive deployment. This way you can release all the stores you've provided the configuration for in your initial support request. You don't have to create additional support tickets.
