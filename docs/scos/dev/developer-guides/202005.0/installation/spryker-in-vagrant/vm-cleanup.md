---
title: Virtual Machine Cleanup
originalLink: https://documentation.spryker.com/v5/docs/vm-cleanup
redirect_from:
  - /v5/docs/vm-cleanup
  - /v5/docs/en/vm-cleanup
---

<!-- Used to be: http://spryker.github.io/getting-started/installation/virtual-machine-cleanup/ -->

If you need to cleanup the environment set up in the virtual machine, you can either do this by running a script or execute the cleanup steps manually.

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

Make sure the Elasticsearch service is up and running; if it’s not, restart it with:

```bash
sudo /etc/init.d/elasticsearch restart
```

Delete all indices in Elasticsearch:

curl -XDELETE 'http://localhost:9200/_all'

2. **Clear Zed database**:

In this step, DE_development_zed database will be dropped if it already exists.

CURRENT_STORE=`php -r "echo require 'config/Shared/default_store.php';"` sudo dropdb --if-exists "${CURRENT_STORE}_development_zed"

3. **Clear Redis:**

redis-cli -p 10009 flushdb

4. **Install dependencies Install composer dependencies**:

```bash
php composer.phar install
```

Install npm dependencies:
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
