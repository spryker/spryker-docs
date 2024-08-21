---
title: Configure Spryker after installing with DevVM
description: This article provides post-installation steps and additional info for the Spryker project.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/post-installation-steps-and-additional-info
originalArticleId: 4c5b7267-f2d3-4d94-bb26-76dcb69befe1
redirect_from:
  - /2021080/docs/post-installation-steps-and-additional-info
  - /2021080/docs/en/post-installation-steps-and-additional-info
  - /docs/post-installation-steps-and-additional-info
  - /docs/en/post-installation-steps-and-additional-info
  - /v6/docs/post-installation-steps-and-additional-info
  - /v6/docs/en/post-installation-steps-and-additional-info
  - /v5/docs/post-installation-steps-and-additional-info
  - /v5/docs/en/post-installation-steps-and-additional-info
  - /v4/docs/post-installation-steps-and-additional-info
  - /v4/docs/en/post-installation-steps-and-additional-info
  - /v3/docs/post-installation-steps-and-additional-info
  - /v3/docs/en/post-installation-steps-and-additional-info
  - /v2/docs/post-installation-steps-and-additional-info
  - /v2/docs/en/post-installation-steps-and-additional-info
  - /v1/docs/post-installation-steps-and-additional-info
  - /v1/docs/en/post-installation-steps-and-additional-info
  - /docs/scos/dev/set-up-spryker-locally/post-installation-steps-and-additional-info.html
related:
  - title: Configuring database servers
    link: docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-spryker-with-devvm/configuring-database-servers.html
  - title: Updating Node.js in DevVM to the latest version
    link: docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-spryker-with-devvm/updating-node.js-in-devvm-to-the-latest-version.html
---
{% info_block warningBox "Warning" %}

We will soon deprecate the DevVM and stop supporting it. Therefore, we highly recommend [installing Spryker with Docker](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).

{% endinfo_block %}

## Configuring Git

If you want to commit from within the VM, it is recommended to set the right Git preferences:

```bash
git config --global user.email "your.email@domain.tld"
git config --global user.name "Your Name"
git config --global push.default simple
git config --global pull.rebase true
```

## Configuring VM

If you like to change the default configuration of the virtual machine, you can do this by following the example below.

```bash
export VM_CPUS=2
export VM_MEMORY=4192
export VM_NAME="My custom name"
export VM_IP_PREFIX="10.10.0."
```

## Disabling a shared folder

For non-standard setups you have the option to disable shared folder with Spryker code.

If you decide not to use shared folders feature, it’s your responsibility to get Spryker code into the `/data/shop/development/current` directory of your VM. For example, you can use a file synchronization utility like [Unison](https://www.cis.upenn.edu/~bcpierce/unison/).

```bash
export VM_SKIP_SF=1
```

## Using SSH instead of HTTPS

In case you already have your SSH keys set up on your host system, it can be more convenient to directly use them for downloading the repository:

```bash
export SPRYKER_REPOSITORY="git@github.com:spryker-shop/suite.git"
```

{% info_block warningBox %}

Before proceeding with the installation, please make sure you have your SSH public key in GitHub.

{% endinfo_block %}

To generate your SSH key, follow [Generating SSH keys](https://help.github.com/articles/generating-ssh-keys/).

## Filesystem layout

A common Spryker Project is like a typical web project. There is the project level code and the Spryker Commerce OS code. Spryker Commerce OS code is installed into the vendor folder. As you are running both Yves and Zed inside the VM, you will actually see the source code for both. They share a similar directory layout, but specific folders are indicated by the name of the application. So, a folder named Zed naturally belongs to Zed. A Shared folder belongs to Yves and Zed.

| PATH | USAGE |
| --- | --- |
| config | configuration files |
| data | log files and caches |
| src | your project code |
| static | static | assets and the public document roots for Yves and Zed |
| vendor | packages installed via composer. In particular vendor/spryker contains Yves and Zed bundles. |


## Services and ports

| SERVICE | PORT | COMMENTS |
| --- | --- | --- |
| MySQL or MariaDB Server | 3306 | Username is `development`, password is `mate20mg`. |
| PostgreSQL Server | 5432 | Username is `development`, password is `mate20mg`. |
| Redis | 10009 | You can explore Redis with Redis Desktop Manager or a similar tool. |
| Mailcatcher|1080|Catches all the mails that are sent during development in the Dev VM.|
|Management UI|15672|See [Default Queue Engine](/docs/dg/dev/backend-developmentdata-manipulation/queue/queue.html#default-queue-engine) for more information. |

## Activating the Opcache module

To optimize the performance of the system, you can enable the Opcache. This is not recommend for development, because you may get strange results. To activate the Opcache, just put the following lines at the end of the `php.ini` and `restart.php`.

This configuration is not optimized for production environments!

```bash
sudo nano /etc/php7.2/fpm/php.ini
```

```yaml
[Cache]
; configuration for php ZendOpcache module
; priority=05
zend_extension=opcache.so
; Determines if Zend OPCache is enabled
opcache.enable=1
; Determines if Zend OPCache is enabled for the CLI version of PHP
>opcache.enable_cli=1
; The OPcache shared memory storage size.
opcache.memory_consumption=64
; The amount of memory for interned strings in Mbytes.
opcache.interned_strings_buffer=8
; The maximum number of keys (scripts) in the OPcache hash table.
; Only numbers between 200 and 100000 are allowed.
opcache.max_accelerated_files=8000
; The maximum percentage of "wasted" memory until a restart is scheduled.
opcache.max_wasted_percentage=5
; When disabled, you must reset the OPcache manually or restart the
; webserver for changes to the filesystem to take effect.
opcache.validate_timestamps=1
; How often (in seconds) to check file timestamps for changes to the shared
; memory storage allocation. ("1" means validate once per second, but only
; once per request. "0" means always validate)
opcache.revalidate_freq=1
; If enabled, a fast shutdown sequence is used for the accelerated code
opcache.fast_shutdown=1
```

```bash
sudo service php7.2-fpm restart
```

## Setting VM name

It is advised to label your VM (especially when you have more than a single one):

```bash
set-vm-name my-project
```
This will display `vagrant@my-project` in your console starting with the next login.

## Setting a domain name for the shop

To set a domain name for your Spryker shop, change values of the following keys in the shop configuration file:

```bash
$config[ApplicationConstants::HOST_ZED] = 'zed.de.XXX.local';
$config[ApplicationConstants::HOST_YVES] = 'www.de.XXX.local';
```

The first key is responsible for proper call from Yves to Zed, while the second one is used for domain name used for session cookies.

## Upgrading to a newer version

To check for newer released versions, we recommend that you follow the steps described in [Core Updates](/docs/dg/dev/set-up-spryker-locally/manage-dependencies-with-composer.html#core-updates).
