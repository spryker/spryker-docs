---
title: Post-Installation Steps and Additional Info
originalLink: https://documentation.spryker.com/v3/docs/post-installation-steps-and-additional-info
redirect_from:
  - /v3/docs/post-installation-steps-and-additional-info
  - /v3/docs/en/post-installation-steps-and-additional-info
---

## Git Configuration
If you want to commit from within the VM, it is recommended to set the right Git preferences:

```bash
git config --global user.email "your.email@domain.tld"
git config --global user.name "Your Name"
git config --global push.default simple
git config --global pull.rebase true	
```

## VM Configuration
If you like to change the default configuration of the virtual machine, you can do this by following the example below.

```bash
export VM_CPUS=2
export VM_MEMORY=4192
export VM_NAME="My custom name"
export VM_IP_PREFIX="10.10.0."
```

## Disable Shared Folder
For non-standard setups you have the option to disable shared folder with Spryker code.

If you decide not to use shared folders feature, it’s your responsibility to get Spryker code into the /data/shop/development/currentdirectory of your VM. For example, you can use a file synchronization utility like [Unison](https://www.cis.upenn.edu/~bcpierce/unison/).

```bash
export VM_SKIP_SF=1
```

## Using SSH Instead of HTTPS
In case you already have your SSH keys set up on your host system, it can be more convenient to directly use them for downloading the repository:
```bash
export SPRYKER_REPOSITORY="git@github.com:spryker-shop/suite.git"
```

{% info_block warningBox %}
Before proceeding with the installation, please make sure you have your SSH public key in GitHub.
{% endinfo_block %}

In order to generate your SSH key, follow the steps presented in the following article: [Generating SSH keys](https://help.github.com/articles/generating-ssh-keys/).

## Filesystem Layout
A common Spryker Project is like a typical web project. There is the project level code and the Spryker Commerce OS code. Spryker Commerce OS code is installed into the vendor folder. As you are running both Yves and Zed inside the VM, you will actually see the source code for both. They share a similar directory layout, but specific folders are indicated by the name of the application. So, a folder named Zed naturally belongs to Zed. A Shared folder belongs to Yves and Zed.

| Path | Usage |
| --- | --- |
| config | configuration files |
| data | log files and caches |
| src | your project code |
| static | static | assets and the public document roots for Yves and Zed |
| vendor | packages installed via composer. In particular vendor/spryker contains Yves and Zed bundles. |

## Services and Ports: Docker

### Services

Spryker provides an easily manageable and extendable way to configure required services according to the predefined `deploy.*.yml` file that contains a `service` section which describes services used to deploy Spryker Applications for different environments.

Configuration can be defined on different levels: project-wide, region-wide, store-specific or endpoint-specific with limitations depending on the service type.

Below, you can find an example of the service declaration that represents type and configuration of the `broker` service.

```PHP
...
services:
    // Defines the service name
    broker:
        engine: rabbitmq
        // Defines the list of the environment variables
        api:
            username: "spryker"
            password: "secret"
        // Defined the list of Endpoints that points to the Service web interface or service's port
        endpoints:
            queue.demo-spryker.com:
...
```

### Endpoints

Endpoint is a point of access to a Spryker Application or Service.

Individual endpoints and ports are set in `deploy.*.yml` file.

{% info_block warningBox %}
Key format: `domain[:port]`. By default, the port for HTTP endpoints is 80. A port is mandatory for TCP endpoints.
{% endinfo_block %}

### How to apply changes

1. Apply the necessary changes in `deploy.*.yml`.

```PHP
...
groups:
    EU:
        region: EU
        applications:
            yves_eu:
                application: yves
                endpoints:
                    {endpointName}:
                        store: DE
                        services:
                            session:
                                namespace: 1
...
```
2. Bootstrap the local docker setup:

```shell
docker/sdk boot
```
3. Once the job finishes, build and start the instance:

```shell
docker/sdk up
```
4. Update the hosts file:

```shell
echo "127.0.0.1 {endpointName}" | sudo tee -a /etc/hosts
```


## Services and Ports: DevVM

| Service | Port | Comments |
| --- | --- | --- |
| MySQL Server | 3306 | Username is development, password is mate20mg. |
| PostgreSQL Server | 5432 | Username is development, password is mate20mg. |
| Redis | 10009 | You can explore Redis with Redis Desktop Manager or a similar tool. |
| Mailcatcher|1080|Catches all the mails that are sent during development in the Dev VM.|
|Management UI|15672|See [Default Queue Engine](https://documentation.spryker.com/v3/docs/queue#default-queue-engine) for more information. |

## Activating the Opcache Module
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
sudo -i
service php7.2-fpm restart
exit
```

## Setting VM Name
It is advised to label your VM (especially when you have more than a single one):
```
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

## Upgrading to a Newer Version
To check for newer released versions, we recommend that you follow the steps described here Checking for newer versions.
