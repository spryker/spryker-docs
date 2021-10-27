---
title: Legacy Demoshop Installation Guide
description: This article provides step-by-step instructions on the Legacy Demoshop installation.
last_updated: May 19, 2020
template: howto-guide-template
originalLink: https://documentation.spryker.com/v1/docs/installation-guide-legacy-demoshop
originalArticleId: eaf066b6-1b73-4c93-bec1-34825f063618
redirect_from:
  - /v1/docs/installation-guide-legacy-demoshop
  - /v1/docs/en/installation-guide-legacy-demoshop
---

To install the Legacy Demoshop, use the following instructions:

<!--
{% info_block infoBox %}

All customers using the Legacy Demoshop can make their project compatible with the new Spryker Commerce OS architecture available starting from the [November release](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-2018.11.0/release-notes-2018.11.0.html). For details, see [Updating the Legacy Demoshop with SCOS](/docs/scos/dev/migration-and-integration/{{site.version}}/updating-the-legacy-demoshop-with-scos/updating-the-legacy-demoshop-with-scos.html).


{% endinfo_block %}

-->


## Mac OS or Linux, with Development Virtual Machine

### 1. Install Prerequisites

To set up your environment, install the following prerequisites:

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [VirtualBox 5.2.2+](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant 2.0.0+](https://www.vagrantup.com/downloads.html)
* *vagrant-vbguest* and *vagrant-hostmanager* plugins:

```bash
vagrant plugin install vagrant-vbguest
vagrant plugin install vagrant-hostmanager
```

### 2. Install Spryker Virtual Machine

Run the following commands in your favorite shell (e.g. `Bash`):

1. **Create the folder in which you want the source code to be placed:**

```bash
mkdir devvm
cd devvm						
```

2. **Initialize the Vagrant environment**:

```bash
vagrant init devvm2.1.0 https://github.com/spryker/devvm/releases/download/v2.1.0/spryker-devvm.box
```

3. **Update the Vagrantfile**:

Add hostmanager plugin configuration:

```bash
mv Vagrantfile Vagrantfile.bak
awk '/^end/{print "  config.hostmanager.enabled = true\n  config.hostmanager.manage_host = true"}1' Vagrantfile.bak > Vagrantfile
```

4. **Build and start the virtual machine**:

```bash
vagrant up
```

When the VM is built and running, your local copy of the repository will be placed in the `project` subfolder of the folder where the VM is located (e.g. `~/devvm/project`). The subfolder will be mounted inside the VM to `/data/shop/development/current`.

### 3. Install the Shop

1. **Log into the VM:**

```bash
vagrant ssh
```

2. **Run the installation commands:**

```bash
ulimit -n 65535
composer install
vendor/bin/install
```

Executing these steps will install all required dependencies, and run the installation process. Also, this will install the demo data and export it to `Redis` and `Elasticsearch`.

When the installation process is complete, Spryker Commerce OS is ready to use. It can be accessed via the following links:

* [`http://www.de.demoshop.local`](http://www.de.demoshop.local/) - front-end;
* [http://zed.de.demoshop.local](http://zed.de.demoshop.local/) - backend (administrator interface).

Credentials to access the administrator interface: user `admin@spryker.com` and password `change123`.

## Windows, with Development Virtual Machine

### 1. Install Prerequisites

To set up your environment, install the following prerequisites:

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [VirtualBox 5.2.2+](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant 2.0.0+](https://www.vagrantup.com/downloads.html)
* *vagrant-vbguest* and *vagrant-hostmanager* plugins:

```bash
vagrant plugin install vagrant-vbguest
vagrant plugin install vagrant-hostmanager
```

### 2. Install Spryker Virtual Machine

To install the VM, you need to run the following commands. For this purpose, use `Git Bash` command prompt with administrative privileges.

#### How to Launch Git Bash

* Click **Start**.
* Start typing Git Bash.
* In the search results, right-click **Git Bash** and select **Run as administrator**.
![Run git bash as administrator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Legacy+Demoshop+Installation+Guide/run-git-bash-as-administrator.png)

1. **Create the folder in which you want the source code to be placed:**

```bash
mkdir devvm
cd devvm
```

2. **Initialize the Vagrant environment**:

```bash
vagrant init devvm2.1.0 https://github.com/spryker/devvm/releases/download/v2.1.0/spryker-devvm.box
```

3. **Update the Vagrantfile**:

Add hostmanager plugin configuration:

```bash
mv Vagrantfile Vagrantfile.bak
awk '/^end/{print "  config.hostmanager.enabled = true\n  config.hostmanager.manage_host = true"}1' Vagrantfile.bak > Vagrantfile
```

4. **Build and start the virtual machine**:

```bash
vagrant up
```

### 3. Install the Shop

1. **Log into the VM:**

```bash
vagrant ssh
```

2. **Update network configuration of the VM:**

```bash
sudo sed -i "s/eth1/eth1 $(ip -o -4 route show to default | cut -d ' ' -f 5)/g; s/create mask = 0775/create mask = 0777/g; s/directory mask = 0775/directory mask = 0777\n  force user = vagrant\n  force group = vagrant/g"  /etc/samba/smb.conf
```

3. **Restart the Samba server:**

```bash
sudo /etc/init.d/samba restart
```

4. **Update PHP and Jenkins configuration:**

```bash
sudo sed -i 's/user = www-data/user = vagrant/g'  /etc/php/7.2/fpm/pool.d/*.conf
sudo sed -i 's/=www-data/=vagrant/g' /etc/default/jenkins-devtest
sudo chown -R vagrant:vagrant /data/shop/devtest/shared/data/common/jenkins
```

5. **Restart PHP and Jenkins:**

```bash
sudo /etc/init.d/php7.2-fpm restart
sudo /etc/init.d/jenkins-devtest restart
```

6. **Change permissions for the project directory:**

```bash
sudo chown vagrant:vagrant .
sudo chmod og+rwx .
```

7. **Connect to the share in Windows. For example, you can enter the following in the address bar of Windows Explorer:**

```bash
\\spryker-vagrant\project\current
```

In addition to that, you can mount the share as a network drive in your system so that you have it always a available. For example, to mount the project codebase as the `s:` drive, execute the following in Windows Command Prompt:

```bash
net use s: \\spryker-vagrant\project\current /persistent:yes
```

8. **Copy the contents of the `project` subfolder of the VM folder to the `current` folder on the share (or to the root of the drive you've mounted).**

9. **Run the installation commands:**

```bash
ulimit -n 65535
composer install
vendor/bin/install
```

Executing these steps will install all required dependencies, and run the installation process. Also, this will install the demo data and export it to `Redis` and `Elasticsearch`.

When the installation process is complete, Spryker Commerce OS is ready to use. It can be accessed via the following links:

* [`http://www.de.demoshop.local`](http://www.de.demoshop.local/) - front-end;
* [http://zed.de.demoshop.local](http://zed.de.demoshop.local/) - backend (administrator interface).

Credentials to access the administrator interface: user `admin@spryker.com` and password `change123`.

## Without Development Virtual Machine

This guide will help you install Spryker's Demoshop without using the virtual machine that we offer.

**Recommended requirements**:

* PHP v7.2.x

  *apt-get install php7.2-curl php7.2-gd php7.2-gmp php7.2-intl php7.2-pgsql php7.2-redis php7.2-xml php7.2-mbstring php7.2-bz2 php7.2-json php7.2-bcmath php7.2-zip php7.2-cli*

* Jenkins 1.651.x
  Please install appropriate version for your system, refer to <https://jenkins.io/download/>.
  Make sure it runs on port **localhost:10007**, otherwise update config.

* Elasticsearch v2.3+
  Please install appropriate version for your system, refer to <https://www.elastic.co/guide/en/elasticsearch/guide/current/running-elasticsearch.html>. Make sure it runs on **localhost:10005**, otherwise update config.

* Graphviz v2.x
  Please follow the instructions at <https://www.graphviz.org/download/>.

* Nginx or Apache

* Redis v1.x
  Make sure it runs on **localhost:10009**, otherwise update config.

* PostgreSQL v9.x

* RabbitMQ 3.X
  Make sure it runs on **localhost:5672** and **localhost:15672**(for admin), otherwise update config.

### Minimum requirements

* PHP v7.1.x

  *apt-get install php-curl php-json php-mysql php-pdo-sqlite php-sqlite3 php-gd php-intl php-mysqli php-pgsql php-ssh2 php-gmp php-mcrypt php-pdo-mysql php-readline php-twig php-imagick php-memcache php-pdo-pgsql php-redis php-xml php-bz2 php-mbstring*

* Jenkins
  Please install appropriate version for your system, refer to <https://jenkins.io/download/>.
  Make sure it runs on port **localhost:10007**, otherwise update config.

* Elasticsearch v5.x (preferably v5.6.x)
  Please install appropriate version for your system, refer to <https://www.elastic.co/guide/en/elasticsearch/guide/current/running-elasticsearch.html>. Make sure it runs on **localhost:10005**, otherwise update config.

* Graphviz v2.x
  Please follow the instructions at <https://www.graphviz.org/download/>.

* Nginx or Apache

* Redis v3.x
  Make sure it runs on **localhost:10009**, otherwise update config.

* PostgreSQL v9.6

* RabbitMQ v3.6+

  Make sure it runs on **localhost:5672** and **localhost:15672**(for admin), otherwise update config.

### Nginx Configuration

#### Nginx Configuration for Yves

The following configuration must be included for Yves in the Nginx configuration file.

```php
location / {
    if (-f $document_root/maintenance.html) {
        return 503;
    }

    # CORS - Allow Ajax requests from http to https webservices on the same domain
    #more_set_headers "Access-Control-Allow-Origin: http://$server_name";
    #more_set_headers "Access-Control-Allow-Credentials: true";
    #more_set_headers "Access-Control-Allow-Headers: Authorization";

    # CORS - Allow Ajax calls from cdn/static scripts
    if ($http_origin ~* "^(http|https)://(img[1234]|cdn|static|cms)\.") {
      add_header "Access-Control-Allow-Origin" $http_origin;
    }

    # Frontend - force browser to use new rendering engine
    #more_set_headers "X-UA-Compatible: IE=Edge,chrome=1";

    # Terminate OPTIONS requests immediately. No need for calling php
    # OPTIONS is used by Ajax from http to https as a pre-flight-request
    # see http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    if ($request_method = OPTIONS) {
        return 200;
    }

    add_header X-Server $hostname;

    try_files $uri @rewriteapp;

    #more_clear_headers 'X-Powered-By' 'X-Store' 'X-Locale' 'X-Env' 'Server';
}

location @rewriteapp {
    # rewrite all to app.php
    rewrite ^(.*)$ /index.php last;
}
```

#### Nginx Configuration for Zed

The following configuration must be included for Yves in the Nginx configuration file.

```php
# Timeout for Zed requests - 10 minutes
# (longer requests should be converted to jobs and executed via jenkins)
proxy_read_timeout 600s;
proxy_send_timeout 600s;
fastcgi_read_timeout 600s;
client_body_timeout 600s;
client_header_timeout 600s;
send_timeout 600s;

# Static files can be delivered directly
location ~ (/images/|/scripts|/styles|/fonts|/bundles|/favicon.ico|/robots.txt) {
    access_log        off;
    expires           30d;
    add_header Pragma public;
    add_header Cache-Control "public, must-revalidate, proxy-revalidate";
    try_files $uri =404;
}

# Payone - PHP application gets all other requests without authorized
location /payone/ {
    auth_basic off;
    add_header X-Server $hostname;
    try_files $uri @rewriteapp;
}

# PHP application gets all other requests
location / {
    #add_header X-Server $hostname;
    try_files $uri @rewriteapp;
    #more_clear_headers 'X-Powered-By' 'X-Store' 'X-Locale' 'X-Env' 'Server';

}

location @rewriteapp {
    # rewrite all to app.php
    rewrite ^(.*)$ /index.php last;
}
```

### Configuration Files

#### Database

Edit config_local.php to configure the database access:

```php
<?php
$config[ApplicationConstants::ZED_DB_USERNAME] = 'development';
$config[ApplicationConstants::ZED_DB_PASSWORD] = 'mate20mg';
$config[ApplicationConstants::ZED_DB_DATABASE] = 'DE_development_zed';
$config[ApplicationConstants::ZED_DB_HOST] = '127.0.0.1';
$config[ApplicationConstants::ZED_DB_ENGINE] = $config[ApplicationConstants::ZED_DB_ENGINE_PGSQL];
$config[ApplicationConstants::ZED_DB_PORT] = 5432;
```

#### Redis

Configure Redis in your local configuration file:

```php
<?php
$config[ApplicationConstants::YVES_STORAGE_SESSION_REDIS_PROTOCOL] = 'tcp';
$config[ApplicationConstants::YVES_STORAGE_SESSION_REDIS_HOST] = '127.0.0.1';
$config[ApplicationConstants::YVES_STORAGE_SESSION_REDIS_PORT] = '10009';
$config[ApplicationConstants::YVES_STORAGE_SESSION_REDIS_PASSWORD] = '';
```

#### Elasticsearch

Configure Elasticsearch in your local configuration file:

```php
<?php
$config[ApplicationConstants::ELASTICA_PARAMETER__HOST] = 'localhost';
$config[ApplicationConstants::ELASTICA_PARAMETER__TRANSPORT] = 'http';
$config[ApplicationConstants::ELASTICA_PARAMETER__PORT] = '10005';
$config[ApplicationConstants::ELASTICA_PARAMETER__AUTH_HEADER] = '';
$config[ApplicationConstants::ELASTICA_PARAMETER__INDEX_NAME] = 'index_page';
$config[ApplicationConstants::ELASTICA_PARAMETER__DOCUMENT_TYPE] = 'page';
```

Configure Elasticsearch localized parameters:

```php
<?php
$config[ApplicationConstants::ELASTICA_PARAMETER__INDEX_NAME] = 'de_development_catalog';
```

#### RabbitMQ

Configure RabbitMQ permissions and virtual hosts according to the instructions [Tutorial - Set Up a "Hello World" Queue - Legacy Demoshop](/docs/scos/dev/legacy-demoshop/{{site.version}}/set-up-a-hello-world-queue-legacy-demoshop.html#rabbitmq-management-ui).

#### Hostname

If you want to configure the hostname, set the values for Yves and Zed hostnames in your local configuration file:

* `$config[ApplicationConstants::HOST_ZED_GUI]`
* `$config[ApplicationConstants::HOST_YVES]`

### Installing the Shop

After configuring all the required services, do the following:

1. Clone the [Store Repository](https://github.com/spryker/demoshop).

2. Run the installation commands inside the project folder:

   ```bash
   ulimit -n 65535
   composer install
   vendor/bin/install
   ```
<!-- Last review date: November 9th, 2018 by Volodymyr Volkov -->
