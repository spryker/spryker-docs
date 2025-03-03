---
title: Cleaning up DevVM
description: If you need to cleanup the environment set up in the virtual machine, you can either do this by running a script or execute the cleanup steps manually.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/vm-cleanup
originalArticleId: 828ae01d-b6d2-4c63-8dc1-b6eb3a438a64
redirect_from:
  - /2021080/docs/vm-cleanup
  - /2021080/docs/en/vm-cleanup
  - /docs/vm-cleanup
  - /docs/en/vm-cleanup
  - /v6/docs/vm-cleanup
  - /v6/docs/en/vm-cleanup
  - /v5/docs/vm-cleanup
  - /v5/docs/en/vm-cleanup
  - /v4/docs/vm-cleanup
  - /v4/docs/en/vm-cleanup
  - /v3/docs/vm-cleanup
  - /v3/docs/en/vm-cleanup
  - /v2/docs/vm-cleanup
  - /v2/docs/en/vm-cleanup
  - /v1/docs/vm-cleanup
  - /v1/docs/en/vm-cleanup
  - /docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/virtual-machine-cleanup.html
---

<!-- Used to be: http://spryker.github.io/getting-started/installation/virtual-machine-cleanup/ -->

If you need to cleanup the environment set up in the DevVM, you can either do this by running a script or execute the cleanup steps manually.

## VM Cleanup - Automatic
To cleanup the VM:

Run the setup script with the reset parameter, as in the examples below:

```
./setup -r
./setup --reset
```

When running the setup script with the reset parameter, the execution will clear Redis and Elasticsearch data storages, the database will be dropped, the node_modules folder will be removed as well as the cache folders from Yves and Zed.

**To clear the data stored in Redis and Elasticsearch and drop the database**:

Run the setup script with the delete option as in one of the examples below:

```
./setup -d
./setup --delete
```

**To reinitialize the application**:

Run the setup script again without any argument.

**To see available parameters for** **setup**:

Run one of the following commands:

```
./setup -h
./setup --help
```

## VM Cleanup - Manual
First, navigate to the project folder from your virtual machine:

```
cd /data/shop/development/current
```

1. **Clear the Elasticsearch service:**

Make sure the Elasticsearch service is up and running; if it's not, restart it with:

```bash
sudo /etc/init.d/elasticsearch restart
```

Delete all indices in Elasticsearch:

```bash
curl -XDELETE 'http://localhost:9200/_all'
```

2. **Clear Zed database**:

In this step, DE_development_zed database will be dropped if it already exists.

```shell
CURRENT_STORE=`php -r "echo require 'config/Shared/default_store.php';"` sudo dropdb --if-exists "${CURRENT_STORE}_development_zed"
```

3. **Clear Redis:**

```shell
redis-cli -p 10009 flushdb
```

4. **Install dependencies:**

    1. Install composer dependencies:

    ```bash
    php composer.phar install
    ```

    2. Install npm dependencies:
    ```bash
    npm install -d
    ```

5. **Install application:**

```
vendor/bin/console setup:install
vendor/bin/console setup:install-demo-data
sudo /etc/init.d/elasticsearch restart
vendor/bin/console collector:search:export
vendor/bin/console collector:storage:export
```

Using `-v` helps to show more details on the progress.
