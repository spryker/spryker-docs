---
title: "Adding stores in a multi-database setup"
description: Learn how to add a store to a region that already runs other stores with one database each, using normal deployments and without affecting the existing stores.
last_updated: Nov 18, 2026
template: howto-guide-template
---

This guide describes how to add a store to a region that already runs other stores, when each store has its own database (DB). You add the store with a normal deployment, the same pipeline you use for day-to-day releases, so the existing stores keep running during the rollout.

{% info_block infoBox "Dynamic Multistore" %}

This guide applies to projects that define stores in code. If you manage stores in the Back Office, see [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/latest/dynamic-multistore.html).

{% endinfo_block %}

## How a store rollout works

Each store in a multi-DB region has its own resources:

- A DB
- A RabbitMQ virtual host (vhost), for example, `de_queue`
- Search indexes
- Scheduler jobs, for example, `DE_consume-queue` in Jenkins

A rollout creates these resources for the new store and leaves the resources of the existing stores unchanged. It has the following steps:

1. [Plan the rollout](#plan-the-rollout).
2. [Configure the new store](#configure-the-new-store) in the deploy file and in the project code.
3. [Create the install recipes](#create-the-install-recipes) that set up the new store.
4. [Set up message queues for the new store](#set-up-message-queues-for-the-new-store).
5. [Test the rollout locally](#test-the-rollout-locally).
6. [Deploy the new store](#deploy-the-new-store) to staging and then to production.
7. [Verify the rollout](#verify-the-rollout).

For the general multi-DB configuration, see [Integrate multi-DB logic](/docs/dg/dev/integrate-and-configure/integrate-multi-database-logic.html).

## Plan the rollout

A store rollout touches many parts of a project. Plan it before you change code, so that the rollout does not block other teams and you can repeat it for the next store.

### Prepare the project

- **Roadmap:** List all stores you plan to add. The list affects the DB structure, the configuration, and the cost of the setup.
- **Release freeze:** Do not release other features together with the new store. Inform the teams and stakeholders about the rollout dates.
- **Backup plan:** Plan how to restore the DBs and the business processes if the rollout fails.
- **Repeatable process:** Document each step as a checklist or a script, and create the related tasks in your project management tool.

### Check the affected areas

<div class="width-100">

| AREA | WHAT TO CHECK |
|------|---------------|
| Third-party integrations | Payment gateways, single sign-on, inventory, and other systems that need configuration for the new store. Make sure the teams that own them are available for the rollout. |
| Data import | Each store imports only its own data. Import files with rows of other stores fail with an error like `Store not found: AT`, because the other stores do not exist in this DB. This also applies to import files in vendor packages and to console commands that create data for a fixed store. |
| Code buckets | If you use code buckets, make sure their configuration covers the new store. |
| Monitoring | Alerts and dashboards in your monitoring tools, such as New Relic and CloudWatch, for the new store. |
| AWS resources | Resources that are created per store, such as S3 buckets. |
| Frontend | Layouts, routing, and API changes that differ per store. |
| Scheduler capacity | The number of scheduler executors. See [Check the scheduler capacity](#check-the-scheduler-capacity). |
| Environment variables | The size of the environment variables. See [Keep environment variables within AWS limits](#keep-environment-variables-within-aws-limits). |

</div>

### Check the scheduler capacity

The queue worker job of each store, for example, `DE_consume-queue`, runs for several minutes. Jenkins runs only as many jobs at the same time as it has executors. If there are fewer executors than long-running jobs, the jobs of some stores wait, and the queues of these stores are not processed.

Before you add a store, make sure the scheduler has enough executors for the jobs of all stores. To change the number of executors in Spryker Cloud Commerce OS, contact support.

## Configure the new store

1. In the deploy file, define the following entities for the new store. For details, see [Add and remove DBs of stores](/docs/ca/dev/multi-store-setups/add-and-remove-databases-of-stores.html).

    | ENTITY | SECTION |
    |--------|---------|
    | DB | `regions.<region_name>.services.databases` |
    | Store | `regions.<region_name>.stores` |
    | Domains | `groups.<region_name>.applications` |

2. In `config/Shared/stores.php`, add the configuration of the new store. For details, see [Integrate multi-DB logic](/docs/dg/dev/integrate-and-configure/integrate-multi-database-logic.html).
3. Add the data import configuration and data files of the new store.
4. Add the new store to the scheduler jobs configuration, for example, `config/Zed/cronjobs/jenkins.php`.
5. Adjust other per-store configuration, for example, the frontend routing, code buckets, and Back Office users.
6. Add the environment variables of the new store. Follow [Keep environment variables within AWS limits](#keep-environment-variables-within-aws-limits).

{% info_block warningBox "Name each DB after its store" %}

In Spryker Cloud Commerce OS, the deployment pipeline adds the connection data of each DB to the `SPRYKER_PAAS_SERVICES` environment variable. The key of each entry is the DB name in upper case: the DB `de` gets the key `DE`. The application looks up the entry by the store or the code bucket. If no key matches, the application uses the default DB connection. This connection is not set when the region has no `database` section, so commands fail with `Database is not reachable`.

- Give each DB the lower-case name of its store, or map the store to the DB name in your configuration.
- Define the DBs only in `regions.<region_name>.services.databases`. If the region also has a `database` section, the pipeline does not create the DBs of the stores.

{% endinfo_block %}

## Create the install recipes

Install recipes are YAML files in `config/install` that the `vendor/bin/install` command runs. The rollout uses two recipes:

- A *store setup recipe* that creates the tables, data, search indexes, queues, and jobs of the new store. You run it once.
- Your *production recipe* that runs on every normal deployment. It must cover the new store too.

The examples in this section are based on the default [B2B Marketplace Demo Shop](https://github.com/spryker-shop/b2b-demo-marketplace) with the `EU` region. `PL` is the new store, and `DE` and `AT` are existing stores.

### Store setup recipe

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

<div class="width-100">

| COMMAND | PURPOSE |
|---------|---------|
| `search:setup:sources` | Creates the search indexes of the store. |
| `propel:migration:delete`, `propel:diff`, `propel:migrate` | Generate the migrations for the empty DB and create its tables. The last `propel:migration:delete` removes the generated migration files. |
| `setup:init-db` | Fills the DB with initial data, such as Back Office users and ACL rules. |
| `queue:setup` | Declares the exchanges and queues in the vhost of the store. Required only if runtime setup is disabled. See [Set up message queues for the new store](#set-up-message-queues-for-the-new-store). |
| `data:import` | Imports the data of the store. Replace the configuration file with your own. |
| `scheduler:setup` | Creates the scheduler jobs of the store, such as queue workers. |
| `publish:trigger-events` | Publishes the imported data to the key-value store and the search engine. |

</div>

Keep the following in mind:

- The recipe does not create the DB. In Spryker Cloud Commerce OS, the deployment pipeline creates the DB of each store defined in the deploy file. Locally, `docker/sdk boot` and `docker/sdk up` create it.
- `propel:diff` is required if your project does not commit migration files, which is the default in the Spryker demo shops. Without it, `propel:migrate` has nothing to migrate, the DB stays empty, and `setup:init-db` fails.
- The recipe must be safe to run more than once. If the rollout fails halfway, you run it again.

{% info_block warningBox "Do not delete data of existing stores" %}

Do not add commands that purge or delete data to the store setup recipe, such as `queue:queue:purge-all`, `propel:tables:drop`, `storage:delete`, `elasticsearch:index:delete`, or `scheduler:clean`. If these commands are not scoped to the new store, they remove data of existing stores.

{% endinfo_block %}

### Production recipe

The production recipe is the recipe that `SPRYKER_HOOK_INSTALL` runs on every normal deployment. When the deployment that adds the store runs, the DB of the new store is still empty. Update the recipe as follows:

- Add the new store to the `stores` list.
- Run only commands that are safe to repeat, with `stores: true`.
- Run the DB migration before all other commands that use the DB. Otherwise, commands such as `oms:clear-locks` fail for the new store, because its tables do not exist yet.

**config/install/EU/production.yml**

```yml
env:
  NEW_RELIC_ENABLED: 0
command-timeout: 1200
stores:
  - DE
  - AT
  - PL # the new store
sections:
  diff:
    propel-migration-delete:
      command: "vendor/bin/console propel:migration:delete -vvv --no-ansi"
    propel-diff-and-migrate:
      command: "vendor/bin/console propel:diff -vvv --no-ansi && vendor/bin/console propel:migrate -vvv --no-ansi && vendor/bin/console propel:migration:delete -vvv --no-ansi"
      stores: true
  clean-oms:
    clear-oms-locks:
      command: "vendor/bin/console oms:clear-locks -vvv --no-ansi"
      stores: true
  queues-and-search:
    queue-setup:
      command: "vendor/bin/console queue:setup -vvv --no-ansi"
      stores: true
    setup-search-create-sources:
      command: "vendor/bin/console search:setup:sources -vvv --no-ansi"
      stores: true
  scheduler-start:
    scheduler-setup:
      command: "vendor/bin/console scheduler:setup -vvv --no-ansi"
      stores: true
```

Also add the new store to the `stores` list of other recipes that run for each store, for example, the recipe in `SPRYKER_HOOK_BEFORE_DEPLOY`.

## Set up message queues for the new store

The deployment pipeline creates the vhost of the new store and does not change the vhosts of the existing stores. The new vhost is empty: it has no exchanges and no queues. How they are created depends on *runtime setup*, which is controlled by `RabbitMqEnv::RABBITMQ_ENABLE_RUNTIME_SETTING_UP`:

<div class="width-100">

| VALUE | BEHAVIOR | WHAT YOU DO |
|-------|----------|-------------|
| `true`, the default | The application declares the exchanges and queues it needs each time it connects to RabbitMQ. | Nothing. You can remove `queue:setup` from the store setup recipe. |
| `false` | Exchanges and queues exist only after `queue:setup` runs. | Run `queue:setup` with `stores: true` in both recipes, as in the examples in [Create the install recipes](#create-the-install-recipes). |

</div>

Projects often disable runtime setup to improve performance. For details, see [Disable automatic queue creation](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html#disable-automatic-queue-creation).

If runtime setup is disabled, keep the following in mind:

- `queue:setup` declares exchanges and queues only in the vhost of the store it runs for.
- In the store setup recipe, run `queue:setup` after the DB is migrated and before any data import or publish command, because these commands write to the queues.
- In the production recipe, `queue:setup` also declares the queues that new code introduces on later deployments.

## Test the rollout locally

1. Add the new store to your local deploy file, for example, `deploy.dev.yml`.
2. Bootstrap the configuration and start the project:

    ```bash
    docker/sdk boot deploy.dev.yml
    docker/sdk up
    ```

3. Check that the new store has its DB tables, data, search indexes, and queues.
4. Check that the existing stores still have their data and queues, and that their queue workers consume messages.

## Deploy the new store

Roll out the store to staging first. Repeat the same procedure for production only after staging is verified.

### Prepare the environment

1. Add the configuration of the new store to the deploy file of the environment.
2. Open a support request and describe the change. Attach the deploy file, or reference the repository branch with the configuration and make sure the support team has access to it.
3. Create a manual DB snapshot directly before the deployment. Spryker Cloud Commerce OS also creates automatic snapshots every hour. For details, see [Create and restore database backups](/docs/ca/dev/create-and-restore-database-backups.html).

### Run the deployment

1. Run a normal deployment. The pipeline creates the DB and the vhost of the new store. The production recipe creates the tables, queues, search indexes, and scheduler jobs of the new store. The new store has no data yet.
2. Run the store setup recipe once, only for the new store, for example, from a one-time Jenkins job:

    ```bash
    vendor/bin/install PL -r EU/setup-store --no-ansi -vvv
    ```

    The data import runs outside the deployment, so the time limit of the install step does not apply to it.

We tested this procedure in Spryker Cloud Commerce OS with one DB per store. During the deployment, the existing stores kept their queues and waiting messages, their queue workers continued to process messages, and their storefronts answered without errors.

### Alternative: set up the store within the deployment

If you cannot run a one-time job, run the store setup recipe as part of the deployment:

1. Create a script that runs the store setup recipe and then your production recipe:

    **config/install/add-store.sh**

    ```bash
    #!/usr/bin/env bash
    set -euo pipefail

    vendor/bin/install "$1" -r EU/setup-store --no-ansi -vvv
    vendor/bin/install -r EU/production --no-ansi -vvv
    ```

2. For one deployment, set `SPRYKER_HOOK_INSTALL` to run the script for the new store:

    **deploy.{environment}.yml**

    ```yml
    image:
      environment:
        SPRYKER_HOOK_INSTALL: "bash config/install/add-store.sh PL"
    ```

3. Run a normal deployment.
4. Revert `SPRYKER_HOOK_INSTALL` to its original value before the next deployment.

{% info_block warningBox "Hooks run one command" %}

The pipeline runs the value of a hook variable as a single command, without a shell. Shell operators, such as `&&`, `;`, or `|`, are passed to the command as arguments and do not work. To run several commands, call a script, as in the preceding example.

{% endinfo_block %}

## Verify the rollout

After each deployment, check the following:

- The new store works: storefront, Back Office, APIs, and integrations.
- The existing stores work and their data is unchanged.
- The vhost of each store has its exchanges and queues.
- The queue workers of all stores consume messages.
- `SPRYKER_HOOK_INSTALL` and other hooks have their original values, if you changed them for the rollout.

## Release several stores

To release several stores, prepare the configuration of all of them at once, but deploy one store at a time:

1. Prepare and test the configuration of all stores locally.
2. Open one support request that describes all stores. Attach the deploy file and, optionally, the rollout schedule.
3. Keep the full configuration aside and deploy only the first store, as described in [Deploy the new store](#deploy-the-new-store). Do this in staging first, and then in production.
4. For each next store, add its configuration and repeat the deployment. You do not need a new support request.

## Remove a store

To remove a store, run a recipe that cleans up the resources of that store only. The following is a minimal example to start from:

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

Run it once, only for the store you remove:

```bash
vendor/bin/install PL -r EU/delete-store --no-ansi -vvv
```

Then remove the store from the deploy file, the project configuration, and the `stores` lists of your recipes, and run a normal deployment.

## Keep environment variables within AWS limits

Each store you add usually adds environment variables or makes existing ones longer. In Spryker Cloud Commerce OS, environment variables are stored in AWS Systems Manager Parameter Store and passed to applications through Amazon ECS task definitions. Both services have size limits, and a deployment that exceeds a limit fails. Check your environment variables before each store rollout.

<div class="width-100">

| LIMIT | VALUE | WHAT IT AFFECTS |
|-------|-------|-----------------|
| ECS task definition size | 64 KiB (65,536 bytes) | All environment variables of a service together. Each variable adds an entry to the task definition. |
| Parameter Store value size, Standard tier | 4 KB | The value of one environment variable. |
| Parameter Store value size, Advanced tier | 8 KB | The value of one environment variable. |

</div>

Some variables grow with each store. For example, `SPRYKER_PAAS_SERVICES` contains the connection details of the DB of each store. With many stores, it can reach the value limit, and all variables together can reach the task definition limit.

For details, see [Amazon ECS service quotas](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-quotas.html) and [Managing parameter tiers](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html).

### Keep only secrets in environment variables

Use environment variables only for secrets, such as passwords, API keys, tokens, and hashes. Put all other values into the configuration files in `config/Shared`, for example, `config_default.php` or `config_production.php`:

- URLs and hostnames of third-party services
- Folder paths and file names
- Email addresses
- Feature flags and other settings

Configuration files are versioned with your code, so changes are also easier to review and roll back. For details about adding variables, see [Add variables in the Parameter Store](/docs/ca/dev/add-variables-in-the-parameter-store.html).

### Combine per-store secrets into one variable

If a secret has a different value per store, do not create one variable per store, such as `PAYMENT_API_KEY_DE` and `PAYMENT_API_KEY_AT`. Each of them adds a name and a value to the task definition. Instead, store all values in one variable as a JSON mapping with store names as keys:

```json
{"DE": "de-api-key", "AT": "at-api-key", "PL": "pl-api-key"}
```

In the configuration file, decode the mapping and select the value of the current store:

```php
$paymentApiKeys = json_decode(getenv('PAYMENT_API_KEYS') ?: '{}', true);
$config[PaymentConstants::API_KEY] = $paymentApiKeys[getenv('APPLICATION_STORE')] ?? null;
```

`PaymentConstants::API_KEY` is an example. Replace it with the constant of your module.

When you add a store, add its key to the existing mapping. Make sure the value stays within the value limit of your Parameter Store tier.
