---
title: HowTo - Install Spryker in AWS Environment
originalLink: https://documentation.spryker.com/2021080/docs/ht-install-spryker-in-aws-environment
redirect_from:
  - /2021080/docs/ht-install-spryker-in-aws-environment
  - /2021080/docs/en/ht-install-spryker-in-aws-environment
---

## Introduction
This how-to is aimed to provide you with additional information about native configuration of AWS services and Spryker installation using AWS cloud as a base of infrastructure.

Following the instructions, you will get Spryker running on AWS. The first part is devoted to step-by-step configuration of AWS native services like RDS, Elasticsearch Service, ElastiCache to prepare a suitable infrastructure for running Spryker. The second part is the installation of Spryker itself.

## AWS Native Services Configuration
The first thing you need to do to install Spryker or AWS is to configure the following AWS native services:

* Security Group
* RDS (Managed relational database service)
* Elasticsearch Service
* ElastiCache

Follow the guidelines below to create and configure the services.

    
### Security Group

To create a security group, do the following:

1. Open EC2 console. 
    
![EC2 console](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/ec2-console.png){height="" width=""}

2. Click **Create Security Group**. 
    
![Create security group](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/create-security-group.png){height="" width=""}

3. Fill out the outlined fields and click **Create**. 
    
![Choose security group](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/choose-security-group.png){height="" width=""}

See [Creating a Security Group](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html#creating-security-group) and [Adding Rules to a Security Group](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html#creating-security-group) for more information on how to create and configure the security group.

{% info_block warningBox %}

You need to choose the security group for all services/instances that you will create following this instruction.

{% endinfo_block %}

### RDS (Managed relational database service)

To create and configure RDS, do the following:

1. Open RDS console. 
![RDS console](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/rds-console.png){height="" width=""}

2. Click **Create database**.
    
![Create database](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/create-database.png){height="" width=""}

3. Select **PostgreSQL**. 

![Choose PostgreSQL](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/choose-postgresql.png){height="" width=""}

4. Choose a use case
{% info_block infoBox %}

For production purposes, we recommend choosing Multi-AZ Deployment. 

{% endinfo_block %}
    
![Choose usecase](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/choose-use-case.png){height="" width=""}

5. Fill out all the outlined fields. 
    
![Choose database details](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/choose-db-details.png){height="" width=""}

![Database login details](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/db-login-details.png){height="" width=""}

![Network and security](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/network-and-security.png){height="" width=""}

![Database options](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/db-options.png){height="" width=""}

6. Get **DB Name**, **Endpoint** and **port**. 
    
![Get database name endpoint](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/get-db-name-endpoint.png){height="" width=""}

See [Database creation manual](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Tutorials.WebServerDB.CreateDBInstance.html) for more details on how to create the database.
    
### Elasticsearch Service
To create and configure Elasticsearch service console, do the following:

1. Open Elasticsearch service console. 
    
![Elasticsearch console](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/elastic-search-console.png){height="" width=""}

2. Click **Create a new domain**.

![Create new domain](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/create-new-domain.png){height="" width=""}

3. Fill out all the outlined fields. 
   
4. Choose a deployment type 

{% info_block infoBox %}

For production purposes, we recommend choosing the Production deployment type.

{% endinfo_block %}


![Deployment type](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/deployment-type.png){height="" width=""}

![Define domain](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/define-domain.v2.png){height="" width=""}

![VPC access](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/vpc-access.png){height="" width=""}

![Domain access policy](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/domain-access-policy.png){height="" width=""}

5. Get **VPC endpoint**. 

![Get VPS endpoint](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/get-vpc-endpoint.png){height="" width=""}

See [Elasticseacrh service creation manual](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-createupdatedomains.html#es-createdomains) for more details on how to create an Elasticsearch service domain.
    
### ElastiCache

To configure ElastiCache, do the following:

1. Open ElastiCache console. 
    
![ElastiCache console](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/elasticache-console.png){height="" width=""}

2. Click **Get Started Now**. 
    
![Elastisearch - Get started now](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/elastisearch-start.png){height="" width=""}

3. Fill out all the outlined fields. 
    
![Elastisearch config](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/elastisearch-config.png){height="" width=""}


4. Get **Primary Endpoint**. 
    
![Primary endpoint](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/get-primary-endpoint.png){height="" width=""}

See [ElastiCache creation manual](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/GettingStarted.CreateCluster.html) for more details.
    
## EC2 Instance Installation and Configuration
To install and configure EC2 instance, you need to:

* Create SSH key
* Launch instance
* Configure Elastic IP
* Connect to the Instance

Follow the guidelines below to perform these actions.
    
### Creating the SSH Key
Use the [manual](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair) to create the SSH key.

    
### Launching Instance
To launch the instance, do the following:

1. Open EC2 console. 
    
![EC2 console](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/ec2-console.png){height="" width=""}

2. Click **Launch instance**. 
    
![Launch instance](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/launch-instance.png){height="" width=""}

3. Select the Ubuntu server with the **64-bit (x86)** configuration. 
    
![Choose OS](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/choose-os.png){height="" width=""}

4. Choose the instance type and click **Next: Configure Instance Details**.
    
![Choose instance](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/choose-instance.png){height="" width=""}

5. Leave default configuration and click  **Next: Add Storage**.
6. Add storage and click **Next: Add Tags**. 
    
![Add storage](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/add-storage.png){height="" width=""}

7. Add a Name tag and click **Next: Configure Security Group**. 
    
![Add tags](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/add-tags.png){height="" width=""}

8. Choose the security group which you have previously created and click **Review and Launch**.
9. Choose the ssh key you have previously created, download it, and click **Launch Instances**. 

![Select SHH keys](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/select-ssh-key.png){height="" width=""}

### Elastic IP
To configure Elastic IP, do the following:

1. Open EC2 console. 

![EC2 console](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/ec2-console.png){height="" width=""}

2. Click **Allocate new address**. 
    
![Allocate new address](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/allocate-new-address.png){height="" width=""}

3. Leave the default setup and click **Allocate**. 
    
![Allocate](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/allocate.png){height="" width=""}

4. Click **Actions** > **Associate address**. 
    
![Associate address](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/associate-address.png){height="" width=""}

5. Choose Spryker instance and click **Associate**. 
    

![Choose Spryker instance](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/choose-spryker-instance.png){height="" width=""}

See [Allocating an Elastic IP Address](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating) and [Associating an Elastic IP Address with a Running Instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-associating) for more details on configuring the Elastic IP Address.

### Connecting to the Instance

To connect to the instance, do the following:

1. Click **Actions** > **Connect**. 
    
![Connect action](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/actions-connect.png){height="" width=""}

2. Connect to the Spryker instance using the provided details. 
    
![Connection instructions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/connection-instructions.png){height="" width=""}

## Installing Additional Software

You need to install and configure additional software to install Spryker in AWS. Follow the guidelines below for instructions.
    
### System Tools Installation

To install the system toools, do the following:

1. Configure additional repositories:

```shell
sudo apt-get update
sudo apt-get install -q -y --no-install-recommends wget gnupg apt-transport-https
sudo add-apt-repository ppa:ondrej/php
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
```
    
2. Install additional software and dependencies:

```shell
sudo apt-get -q -y update
sudo apt-get install -q -y --no-install-recommends ca-certificates \
curl \
git \
graphviz \
libedit2 \
libpq5 \
libsqlite3-0 \
postgresql-client \
psmisc \
python-dev \
python-setuptools \
redis-tools \
unzip \
vim \
zip \
composer \
gcc \
g++ \
make  \
apache2-utils
```
    
### PHP Installation
To install PHP, run the commands:
    
```shell
sudo apt-get install -q -y php7.2-fpm \
php7.2-curl \
php7.2-gd \
php7.2-gmp \
php7.2-intl \
php7.2-bcmath \
php7.2-pgsql \
php-redis \
php7.2-xml \
php7.2-mbstring \
php7.2-bz2 \
php-ssh2 \
php-msgpack \
php-memcached \
php-imagick \
php-igbinary \
php7.2-opcache \
php7.2-zip \
php7.2-sqlite3 \
php7.2-mysql \
php7.2-intl \
php7.2-fpm \
php7.2-cli \
php7.2-dev
```
    
```shell
sudo update-alternatives --set php /usr/bin/php7.2
sudo update-alternatives --set phar /usr/bin/phar7.2
sudo update-alternatives --set phar.phar /usr/bin/phar.phar7.2
sudo update-alternatives --set phpize /usr/bin/phpize7.2
sudo update-alternatives --set php-config /usr/bin/php-config7.2
```
    
### PHP Configuration
To configure PHP, do the following:

1. Create or update the following files using the provided templates:

<details open>
<summary>/etc/php/7.2/fpm/php.ini</summary>
    
```
memory_limit = 1024M
[mail function]
sendmail_path = /usr/sbin/sendmail -t -i
```
    <br>
</details>

    
<details open>
<summary>/etc/php/7.2/fpm/pool.d/yves.conf</summary>
    
```
[yves]
clear_env = no
catch_workers_output = yes
listen = /tmp/.fpm.$pool.sock
listen.backlog = 1000
listen.allowed_clients = 127.0.0.1
listen.mode=0666
user = www-data
group = www-data
pm = dynamic
pm.max_children = 4
pm.start_servers = 4
pm.min_spare_servers = 4
pm.max_spare_servers = 4
; Avoid PHP memory leaks
pm.max_requests = 500

pm.status_path = /php-fpm-status-yves
ping.path = /fpm-ping.php
ping.response = OK

request_terminate_timeout = 1800

chdir = /

php_admin_value[memory_limit] = 256M
php_admin_value[expose_php] = off
php_admin_value[error_log] = /dev/stderr
```
 <br>
</details>
    
<details open>
<summary>/etc/php/7.2/fpm/pool.d/zed.conf</summary>/
    
```
[zed]
clear_env = no
catch_workers_output = yes
listen = /tmp/.fpm.$pool.sock
listen.backlog = 1000
listen.allowed_clients = 127.0.0.1
listen.mode=0666
user = www-data
group = www-data
pm = dynamic
pm.max_children = 4
pm.start_servers = 4
pm.min_spare_servers = 4
pm.max_spare_servers = 4
; Avoid PHP memory leaks
pm.max_requests = 500

pm.status_path = /php-fpm-status-zed
ping.path = /fpm-ping.php
ping.response = OK

request_terminate_timeout = 1800

chdir = /

php_admin_value[memory_limit] = 256M
php_admin_value[expose_php] = off
php_admin_value[error_log] = /dev/stderr
```
<br>
</details>

<details open>
<summary>/etc/php/7.2/fpm/pool.d/glue.conf</summary>
    
```
[glue]
clear_env = no
catch_workers_output = yes
listen = /tmp/.fpm.$pool.sock
listen.backlog = 1000
listen.allowed_clients = 127.0.0.1
listen.mode=0666
user = www-data
group = www-data
pm = dynamic
pm.max_children = 4
pm.start_servers = 4
pm.min_spare_servers = 4
pm.max_spare_servers = 4
; Avoid PHP memory leaks
pm.max_requests = 500

pm.status_path = /php-fpm-status-glue
ping.path = /fpm-ping.php
ping.response = OK

request_terminate_timeout = 1800

chdir = /

php_admin_value[memory_limit] = 256M
php_admin_value[expose_php] = off
php_admin_value[error_log] = /dev/stderr
```
<br>
</details>    
    

2. Edit the following file using the template:

<details open>
<summary>
/etc/php/7.2/fpm/conf.d/10-opcache.ini</summary> 
    
```
;zend_extension=opcache.so
opcache.enable=1
opcache.enable_cli=1
opcache.file_cache=/var/tmp/opcache
opcache.max_accelerated_files=8192
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.fast_shutdown=1

; Check if file updated each 2 seconds - for development
opcache.revalidate_freq=2
; Check if file updated each 60 seconds - for production
;opcache.revalidate_freq=60

; Workaround for PHP 7.2 bug
; https://bugs.php.net/bug.php?id=76029
opcache.optimization_level=0
```
    <br>
</details>  

### Postfix Installation
Postfix is a mail server which will be used to send mail. Run these commands to install it:    
    
```shell
sudo apt update
sudo apt install -q -y postfix
```
    
### Nginx Installation
Nginx  is an open source web server which will proxy requests to PHP FPM via FCGI protocol. Run these commands to install it:
    
```shell
sudo apt update 
sudo apt-get  install -q -y nginx nginx-extras
sudo rm /etc/nginx/sites-enabled/default
```
    
### Nginx Configuration
To configure Nginx, do the following:

1. Update `{% raw %}{{{% endraw %}YVES_HOST{% raw %}}}{% endraw %}` and `application_store` variables for each store (AT, DE, US), and create `/etc/nginx/conf.d/vhost-yves-{% raw %}{{{% endraw %}STORE_NAME{% raw %}}}{% endraw %}.conf` using the template:

<details open>
<summary>vhost-yves.conf template</summary>
    
```
upstream backend-yves {
server unix:/tmp/.fpm.yves.sock;
}

server {
listen 80 default;
server_name {% raw %}{{{% endraw %}YVES_HOST{% raw %}}}{% endraw %};
keepalive_timeout 0;
access_log /var/log/nginx/yves.log;

root /data/public/Yves;

set $application_env staging;
set $application_store DE;
 
# Maintenance mode
#include /etc/nginx/maintenance.conf;

# Static files - allow only specified here paths
# all other resources should be served via static host (and cached, if possible, via reverse proxy or cdn)
location ~ (/assets/|/maintenance.html|/favicon.ico|/crossdomain.xml) {
access_log off;
expires 30d;
add_header Pragma public;
add_header Cache-Control "public";
try_files $uri $uri/ =404;
more_clear_headers 'X-Powered-By' 'X-Store' 'X-Locale' 'X-Env' 'Server';
}

location ~ \.(jpg|gif|png|css|js|html|xml|ico|txt|csv|map)$ {
access_log off;
expires 30d;
add_header Pragma public;
add_header Cache-Control "public";
try_files $uri /index.php?$args;
more_clear_headers 'X-Powered-By' 'X-Store' 'X-Locale' 'X-Env' 'Server';
}

# PHP application

location / {
# Frontend - force browser to use new rendering engine
more_set_headers "X-UA-Compatible: IE=Edge,chrome=1";

# Terminate OPTIONS requests immediately. No need for calling php
# OPTIONS is used by Ajax from http to https as a pre-flight-request
# see http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
if ($request_method = OPTIONS) {
return 200;
}

add_header X-Server $hostname;
fastcgi_pass backend-yves;
fastcgi_index index.php;
include /etc/nginx/fastcgi_params;
fastcgi_param SCRIPT_NAME /index.php;
fastcgi_param SCRIPT_FILENAME $document_root/index.php;
    
fastcgi_param APPLICATION_ENV $application_env;
fastcgi_param APPLICATION_STORE $application_store;

more_clear_headers 'X-Powered-By' 'X-Store' 'X-Locale' 'X-Env' 'Server';
    
}

}
```
 <br>
</details>

    
2. Create a `passwd` file by running the command:

```
sudo htpasswd -c /etc/nginx/.htpasswd {% raw %}{{{% endraw %}SOME_USER{% raw %}}}{% endraw %}
```
    
3. Update `{% raw %}{{{% endraw %}ZED_HOST{% raw %}}}{% endraw %}` and `application_store` variables for each store (AT, DE, US), and create `/etc/nginx/conf.d/vhost-zed-{% raw %}{{{% endraw %}STORE_NAME{% raw %}}}{% endraw %}.conf` using the template:

<details open>
<summary>vhost-zed.conf template</summary>
    
```
upstream backend-zed {
server unix:/tmp/.fpm.zed.sock;
}

server {
listen 80;
server_name {% raw %}{{{% endraw %}ZED_HOST{% raw %}}}{% endraw %};
keepalive_timeout 0;
access_log /var/log/nginx/zed.log;

root /data/public/Zed;
    
set $application_env staging;
set $application_store DE;

# Maintenance mode

#include /etc/nginx/maintenance.conf;

# Timeout for ZED requests - 10 minutes
# (longer requests should be converted to jobs and executed via jenkins)
proxy_read_timeout 600s;
proxy_send_timeout 600s;
fastcgi_read_timeout 600s;
client_body_timeout 600s;
client_header_timeout 600s;
send_timeout 600s;

# Static files can be delivered directly
location ~ (/assets/|/favicon.ico|/robots.txt) {
access_log off;
expires 30d;
add_header Pragma public;
add_header Cache-Control "public, must-revalidate, proxy-revalidate";
try_files $uri =404;
}

# PHP application gets all other requests
location / {
add_header X-Server $hostname;
fastcgi_pass backend-zed;
fastcgi_index index.php;
include /etc/nginx/fastcgi_params;
fastcgi_param SCRIPT_NAME /index.php;
fastcgi_param SCRIPT_FILENAME $document_root/index.php;

fastcgi_param APPLICATION_ENV $application_env;
fastcgi_param APPLICATION_STORE $application_store;

more_clear_headers 'X-Powered-By' 'X-Store' 'X-Locale' 'X-Env' 'Server';
    
}
    
}
```
 <br>
</details>
    
4. Update `{% raw %}{{{% endraw %}GLUE_HOST{% raw %}}}{% endraw %}` and `application_store` variables for each store (AT, DE, US), and create `/etc/nginx/conf.d/vhost-glue-{% raw %}{{{% endraw %}STORE_NAME{% raw %}}}{% endraw %}.conf` using the template:

<details open>
<summary>vhost-glue.conf template</summary>
    
```
upstream backend-glue {
server unix:/tmp/.fpm.glue.sock;
}

server {
## Listener for production/staging - requires external LoadBalancer directing traffic to this port
#listen 10001;

# istener for testing/development - one host only, doesn't require external LoadBalancer
listen 80;

server_name {% raw %}{{{% endraw %}GLUE_HOST{% raw %}}}{% endraw %};
keepalive_timeout 0;
access_log /var/log/nginx/glue.log;

root /data/public/Glue;
# Maintenance mode
#include /etc/nginx/maintenance.conf;

set $application_env staging;
set $application_store DE;

# Timeout for Api requests - 10 minutes
# (longer requests should be converted to jobs and executed via jenkins)
proxy_read_timeout 600s;
proxy_send_timeout 600s;
fastcgi_read_timeout 600s;
client_body_timeout 600s;
client_header_timeout 600s;
send_timeout 600s;

# Static files can be delivered directly
location ~ (/assets/|/favicon.ico|/robots.txt) {
access_log off;
expires 30d;
add_header Pragma public;
add_header Cache-Control "public, must-revalidate, proxy-revalidate";
try_files $uri =404;
}

# PHP application gets all other requests
location / {
add_header X-Server $hostname;
fastcgi_pass backend-glue;
fastcgi_index index.php;
include /etc/nginx/fastcgi_params;
fastcgi_param SCRIPT_NAME /index.php;
fastcgi_param APPLICATION_ENV $application_env;
fastcgi_param APPLICATION_STORE $application_store;
fastcgi_param SCRIPT_FILENAME $document_root/index.php;
more_clear_headers 'X-Powered-By' 'X-Store' 'X-Locale' 'X-Env' 'Server';
}

}
```
 <br>
</details>

5. Restart php-fpm service:
```
sudo service php7.2-fpm restart
``` 
6. Create  `/etc/nginx/conf.d/jenkins.conf`:

<details open>
<summary>/etc/nginx/conf.d/jenkins.conf</summary>
    
```
server {


auth_basic 'Administrator’s Area';
auth_basic_user_file /etc/nginx/.htpasswd;

listen 80;
server_name {% raw %}{{{% endraw %}JENKINS_HOST{% raw %}}}{% endraw %};

location / {


access_log /var/log/nginx/jenkins.log;
proxy_set_header Host $host:$server_port;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;

# Fix the "It appears that your reverse proxy set up is broken" error.
proxy_pass http://127.0.0.1:8080;
proxy_read_timeout 90;

# Required for new HTTP-based CLI
proxy_http_version 1.1;
proxy_request_buffering off;
# workaround for https://issues.jenkins-ci.org/browse/JENKINS-45651
#add_header 'X-SSH-Endpoint' 'jenkins.domain.tld:50022' always;

}
}
```
  <br>
</details>
   
7. Create `/etc/nginx/fastcgi_params` using the template:

<details open>
<summary>fastcgi_params template</summary>
    
```
fastcgi_param QUERY_STRING $query_string;
fastcgi_param REQUEST_METHOD $request_method;
fastcgi_param CONTENT_TYPE $content_type;
fastcgi_param CONTENT_LENGTH $content_length;

fastcgi_param SCRIPT_FILENAME $request_filename;
fastcgi_param SCRIPT_NAME $fastcgi_script_name;
fastcgi_param REQUEST_URI $request_uri;
fastcgi_param DOCUMENT_URI $document_uri;
fastcgi_param DOCUMENT_ROOT $document_root;
fastcgi_param SERVER_PROTOCOL $server_protocol;

fastcgi_param GATEWAY_INTERFACE CGI/1.1;
fastcgi_param SERVER_SOFTWARE nginx/$nginx_version;

fastcgi_param REMOTE_ADDR $remote_addr;
fastcgi_param REMOTE_PORT $remote_port;
fastcgi_param SERVER_ADDR $server_addr;
fastcgi_param SERVER_PORT $server_port;
fastcgi_param SERVER_NAME $server_name;

# PHP only, required if PHP was built with --enable-force-cgi-redirect
fastcgi_param REDIRECT_STATUS 200;

# Are we using ssl? Backward compatibility env, to emulate Apache.
# According to RFC, app should take a look at "X-Forwarded-Proto" header to deterimine if SSL is on.
if ($http_x_forwarded_proto = "https") {
set $have_https on;
}
fastcgi_param HTTPS $have_https;

# Pass request start time to CGI script - NewRelic uses this to monitor queue wait time
fastcgi_param HTTP_X_REQUEST_START "t=${msec}";
```
 <br>
</details>
    
### Node.js Installation
To install Node.js, run the following command:
    
```shell
sudo apt-get install -y nodejs
```
    
### RabbitMQ Installation
To install RabbitMQ, run the commands as root:
    
```shell
wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -
sudo dpkg -i erlang-solutions_1.0_all.deb
wget -O- https://dl.bintray.com/rabbitmq/Keys/rabbitmq-release-signing-key.asc | sudo apt-key add -
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -
echo "deb https://dl.bintray.com/rabbitmq/debian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/rabbitmq.list
sudo apt-get update
sudo apt-get install -y rabbitmq-server
```
    
### RabbitMQ Configuration
To configure RabbitMQ, run the commands as root:   

* Service configuration.

```shell
sudo service rabbitmq-server start
sudo rabbitmq-plugins enable rabbitmq_management
sudo chown -R rabbitmq:rabbitmq /var/lib/rabbitmq/
```
    
* Admin user configuration.

```shell
sudo rabbitmqctl add_user admin password
sudo rabbitmqctl add_vhost /DE_spryker_zed
sudo rabbitmqctl set_user_tags admin administrator
sudo rabbitmqctl set_permissions -p /DE_spryker_zed admin ".*" ".*" ".*"
```
Repeat for '/AT_spryker_zed', '/US_spryker_zed' virtual hosts.

*  Spryker user configuration.

```shell
sudo rabbitmqctl add_user spryker password
sudo rabbitmqctl set_user_tags spryker administrator
sudo rabbitmqctl set_permissions -p /DE_spryker_zed spryker ".*" ".*" ".*"
```
Repeat for '/AT_spryker_zed', '/US_spryker_zed' virtual hosts.
    
### Jenkins Installation
To install Jenkins, do the following:
1. Run the commands as root:
    
```shell
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add - 
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/>/etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install -y jenkins=2.164.3 openjdk-8-jdk
```

2. Update java configuration
```
sudo update-alternatives --set java /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
```

3. Stop Jenkins service
```
sudo service jenkins stop
```

### Jenkins Configuration
To configure Jenkins, do the following:

1. Change the `JENKINS_USER` variable in the `/etc/init.d/jenkins` and `/etc/default/jenkins` files to `JENKINS_USER="www-data"`.
2. Create an init scripts directory
```shell
sudo mkdir -p /var/lib/jenkins/init.groovy.d/
```
3. Create an init script which disabled CSRF 
**/var/lib/jenkins/init.groovy.d/init.groovy**
```
import jenkins.model.Jenkins

def instance = Jenkins.instance
instance.setCrumbIssuer(null)
```

4. Change the owner of jenkins folders:

```shell
sudo chown -R www-data:www-data /var/lib/jenkins
sudo chown -R www-data:www-data /var/cache/jenkins
sudo chown -R www-data:www-data /var/log/jenkins
```
5. Reload services configuration:

```shell
sudo systemctl daemon-reload
```
6. Update Jenkins configuration file: 

<details open>
<summary>/var/lib/jenkins/config.xml</summary>
    
```
<?xml version='1.1' encoding='UTF-8'?>
<hudson>
<disabledAdministrativeMonitors>
<string>jenkins.CLI</string>
    <string>jenkins.diagnostics.SecurityIsOffMonitor</string>
</disabledAdministrativeMonitors>
    <version>2.164.3</version>
<installStateName>DOWNGRADE</installStateName>
    <numExecutors>2</numExecutors>
<mode>NORMAL</mode>
    <useSecurity>true</useSecurity>
<authorizationStrategy class="hudson.security.AuthorizationStrategy$Unsecured"/>
<securityRealm class="hudson.security.SecurityRealm$None"/>
<disableRememberMe>false</disableRememberMe>
<projectNamingStrategy class="jenkins.model.ProjectNamingStrategy$DefaultProjectNamingStrategy"/>
    <workspaceDir>${JENKINS_HOME}/workspace/${ITEM_FULL_NAME}</workspaceDir>
    <buildsDir>${ITEM_ROOTDIR}/builds</buildsDir>
<jdks/>
<viewsTabBar class="hudson.views.DefaultViewsTabBar"/>
<myViewsTabBar class="hudson.views.DefaultMyViewsTabBar"/>
<clouds/>
<scmCheckoutRetryCount>0</scmCheckoutRetryCount>
<views>
<hudson.model.AllView>
<owner class="hudson" reference="../../.."/>
<name>all</name>
    <filterExecutors>false</filterExecutors>
<filterQueue>false</filterQueue>
>properties class="hudson.model.View$PropertyList"/>
</hudson.model.AllView>
    </views>
    <primaryView>all</primaryView>
<slaveAgentPort>-1</slaveAgentPort>
    <label></label>
<crumbIssuer class="hudson.security.csrf.DefaultCrumbIssuer">
    <excludeClientIPFromCrumb>false</excludeClientIPFromCrumb>
</crumbIssuer>
<nodeProperties/>
<globalNodeProperties/>
    </hudson>
```
<br>
</details>
   

5. Restart Jenkins service:

```shell
sudo service jenkins start
```
### System Configuration

1. Change swappiness configuration:

```shell
echo "vm.swappiness=5" | sudo tee /etc/sysctl.conf
sudo sysctl -p
```
2. Change file limit configuration:

```shell
ulimit -n 65535
```
3. Create logrotate configuration for Spryker:

**/etc/logrotate.d/spryker**
    
```
/data/data/*/logs/*/*.log {
daily
missingok
rotate 14
compress
delaycompress
notifempty
create 0640 www-data www-data
sharedscripts
postrotate
/bin/kill -SIGUSR1 `cat /run/php-fpm/php-fpm.pid 2>/dev/null` 2>/dev/null || true
endscript
su www-data www-data
}
```
    
## Spryker Installation
To install Spryker, do the following:    

1. Create data folder:

```shell
sudo mkdir /data
sudo chown ubuntu /data
cd /data
```
2. Clone project:

```shell
git clone https://github.com/spryker-shop/b2c-demo-shop.git ./
git checkout tags/202001.0
```

3. Create local configurations using the template.  


You should update all variables in curly braces such as {% raw %}{{{% endraw %}RDS_USERNAME{% raw %}}}{% endraw %} or {% raw %}{{{% endraw %} REDIS_ENDPOINT {% raw %}}}{% endraw %}.


<details open>
<summary>/data/config/Shared/config_local.php</summary>
    
```
<?php
use Pyz\Shared\Scheduler\SchedulerConfig;
use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\Collector\CollectorConstants;
use Spryker\Shared\Customer\CustomerConstants;
use Spryker\Shared\Event\EventConstants;
use Spryker\Shared\GlueApplication\GlueApplicationConstants;
use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\Newsletter\NewsletterConstants;
use Spryker\Shared\Oauth\OauthConstants;
use Spryker\Shared\ProductManagement\ProductManagementConstants;
use Spryker\Shared\PropelQueryBuilder\PropelQueryBuilderConstants;
use Spryker\Shared\Propel\PropelConstants;
use Spryker\Shared\RabbitMq\RabbitMqEnv;
use Spryker\Shared\Router\RouterConstants;
use Spryker\Shared\Search\SearchConstants;
use Spryker\Shared\SearchElasticsearch\SearchElasticsearchConstants;
use Spryker\Shared\Scheduler\SchedulerConstants;
use Spryker\Shared\SchedulerJenkins\SchedulerJenkinsConfig;
use Spryker\Shared\SchedulerJenkins\SchedulerJenkinsConstants;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\Session\SessionConfig;
use Spryker\Shared\SessionFile\SessionFileConstants;
use Spryker\Shared\SessionRedis\SessionRedisConfig;
use Spryker\Shared\SessionRedis\SessionRedisConstants;
use Spryker\Shared\StorageRedis\StorageRedisConstants;
use Spryker\Shared\Setup\SetupConstants;
use Spryker\Shared\Storage\StorageConstants;
use Spryker\Shared\Twig\TwigConstants;
use Spryker\Shared\ZedNavigation\ZedNavigationConstants;
use Spryker\Shared\ZedRequest\ZedRequestConstants;


// ---------- KV storage
$config[StorageConstants::STORAGE_KV_SOURCE] = 'redis';

$config[StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION] = true;
$config[StorageRedisConstants::STORAGE_REDIS_PROTOCOL] = 'redis';
$config[StorageRedisConstants::STORAGE_REDIS_HOST] = '{% raw %}{{{% endraw %} REDIS_ENDPOINT {% raw %}}}{% endraw %}';
$config[StorageRedisConstants::STORAGE_REDIS_PORT] = '{% raw %}{{{% endraw %} REDIS_PORT {% raw %}}}{% endraw %}';
$config[StorageRedisConstants::STORAGE_REDIS_PASSWORD] = false;
$config[StorageRedisConstants::STORAGE_REDIS_DATABASE] = 0;

// ---------- Session
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING;
$config[SessionConstants::YVES_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_HOUR;
$config[SessionRedisConstants::YVES_SESSION_TIME_TO_LIVE] = $config[SessionConstants::YVES_SESSION_TIME_TO_LIVE];
$config[SessionFileConstants::YVES_SESSION_TIME_TO_LIVE] = $config[SessionConstants::YVES_SESSION_TIME_TO_LIVE];
$config[SessionConstants::YVES_SESSION_COOKIE_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_0_5_HOUR;
$config[SessionFileConstants::YVES_SESSION_FILE_PATH] = session_save_path();
$config[SessionConstants::YVES_SESSION_PERSISTENT_CONNECTION] = $config[StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION];
$config[SessionConstants::ZED_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_REDIS;
$config[SessionConstants::ZED_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_HOUR;
$config[SessionRedisConstants::ZED_SESSION_TIME_TO_LIVE] = $config[SessionConstants::ZED_SESSION_TIME_TO_LIVE];
$config[SessionFileConstants::ZED_SESSION_TIME_TO_LIVE] = $config[SessionConstants::ZED_SESSION_TIME_TO_LIVE];
$config[SessionConstants::ZED_SESSION_COOKIE_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_BROWSER_SESSION;
$config[SessionFileConstants::ZED_SESSION_FILE_PATH] = session_save_path();
$config[SessionConstants::ZED_SESSION_PERSISTENT_CONNECTION] = $config[StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION];
$config[SessionRedisConstants::LOCKING_TIMEOUT_MILLISECONDS] = 0;
$config[SessionRedisConstants::LOCKING_RETRY_DELAY_MICROSECONDS] = 0;
$config[SessionRedisConstants::LOCKING_LOCK_TTL_MILLISECONDS] = 0;

$config[SessionRedisConstants::YVES_SESSION_REDIS_PROTOCOL] = $config[StorageRedisConstants::STORAGE_REDIS_PROTOCOL];
$config[SessionRedisConstants::YVES_SESSION_REDIS_HOST] = $config[StorageRedisConstants::STORAGE_REDIS_HOST];
$config[SessionRedisConstants::YVES_SESSION_REDIS_PORT] = $config[StorageRedisConstants::STORAGE_REDIS_PORT];
$config[SessionRedisConstants::YVES_SESSION_REDIS_PASSWORD] = $config[StorageRedisConstants::STORAGE_REDIS_PASSWORD];
$config[SessionRedisConstants::YVES_SESSION_REDIS_DATABASE] = 1;

$config[SessionRedisConstants::ZED_SESSION_REDIS_PROTOCOL] = $config[StorageRedisConstants::STORAGE_REDIS_PROTOCOL];
$config[SessionRedisConstants::ZED_SESSION_REDIS_HOST] = $config[StorageRedisConstants::STORAGE_REDIS_HOST];
$config[SessionRedisConstants::ZED_SESSION_REDIS_PORT] = $config[StorageRedisConstants::STORAGE_REDIS_PORT];
$config[SessionRedisConstants::ZED_SESSION_REDIS_PASSWORD] = $config[StorageRedisConstants::STORAGE_REDIS_PASSWORD];
$config[SessionRedisConstants::ZED_SESSION_REDIS_DATABASE] = 2;

/** Database credentials **/
$config[PropelConstants::ZED_DB_USERNAME] = '{% raw %}{{{% endraw %}RDS_USERNAME{% raw %}}}{% endraw %}';
$config[PropelConstants::ZED_DB_PASSWORD] = '{% raw %}{{{% endraw %}RDS_PASSWORD{% raw %}}}{% endraw %}';
$config[PropelConstants::ZED_DB_HOST] = '{% raw %}{{{% endraw %}RDS_ENDPOINT{% raw %}}}{% endraw %}';
$config[PropelConstants::ZED_DB_PORT] = '5432';
$config[PropelConstants::ZED_DB_ENGINE]
    = $config[PropelQueryBuilderConstants::ZED_DB_ENGINE]
    = $config[PropelConstants::ZED_DB_ENGINE_PGSQL];
$config[PropelConstants::USE_SUDO_TO_MANAGE_DATABASE] = false;


/** Elasticsearch  */
$config[ApplicationConstants::ELASTICA_PARAMETER__HOST] = '{% raw %}{{{% endraw %}ELASTICSEARCH_ENDPOINT WITHOUT HTTPS:// and trailing /{% raw %}}}{% endraw %}';
$config[ApplicationConstants::ELASTICA_PARAMETER__PORT] = '443';
$config[ApplicationConstants::ELASTICA_PARAMETER__INDEX_NAME]
    = $config[CollectorConstants::ELASTICA_PARAMETER__INDEX_NAME]
    = $config[SearchConstants::ELASTICA_PARAMETER__INDEX_NAME]
    = 'de_search';
unset($config[SearchConstants::ELASTICA_PARAMETER__AUTH_HEADER]);
$ELASTICA_PARAMETER__EXTRA = [
    // AWS ElasticSearch service additional parameters for aws/aws-sdk-php module
    //'aws_region' => 'eu-central-1',
    //'transport' => 'AwsAuthV4'
];
$config[ApplicationConstants::ELASTICA_PARAMETER__EXTRA] = $ELASTICA_PARAMETER__EXTRA;
$config[SearchConstants::ELASTICA_PARAMETER__EXTRA] = $ELASTICA_PARAMETER__EXTRA;

$config[SearchConstants::ELASTICA_PARAMETER__HOST]
    = $config[SearchElasticsearchConstants::HOST] = '{% raw %}{{{% endraw %}ELASTICSEARCH_ENDPOINT WITHOUT HTTPS:// and trailing /{% raw %}}}{% endraw %}';
$config[SearchConstants::ELASTICA_PARAMETER__PORT]
    = $config[SearchElasticsearchConstants::PORT] = '443';
$config[SearchConstants::ELASTICA_PARAMETER__EXTRA]
    = $config[SearchElasticsearchConstants::EXTRA] = $ELASTICA_PARAMETER__EXTRA;

// ---------- Scheduler
$config[SchedulerConstants::ENABLED_SCHEDULERS] = [
    SchedulerConfig::SCHEDULER_JENKINS,
];
$config[SchedulerJenkinsConstants::JENKINS_CONFIGURATION] = [
    SchedulerConfig::SCHEDULER_JENKINS => [
        SchedulerJenkinsConfig::SCHEDULER_JENKINS_BASE_URL => 'http://' . 'localhost' . ':' . '8080' . '/',
    ],
];


/** RabbitMQ **/
$config[RabbitMqEnv::RABBITMQ_API_HOST] = '{% raw %}{{{% endraw %}RABBITMQ_HOST{% raw %}}}{% endraw %}';
$config[RabbitMqEnv::RABBITMQ_API_PORT] = '15672';
$config[RabbitMqEnv::RABBITMQ_API_USERNAME] = '{% raw %}{{{% endraw %}RABBITMQ_USERNAME{% raw %}}}{% endraw %}';
$config[RabbitMqEnv::RABBITMQ_API_PASSWORD] = '{% raw %}{{{% endraw %}RABBITMQ_PASSWORD{% raw %}}}{% endraw %}';

/** Debugging **/
$config[EventConstants::LOGGER_ACTIVE] = true;

/** Add Glue API auth parameters **/
$config[OauthConstants::PRIVATE_KEY_PATH] = 'file://' . APPLICATION_ROOT_DIR . '/config/Zed/dev_only_private.key';
$config[OauthConstants::PUBLIC_KEY_PATH] = 'file://' . APPLICATION_ROOT_DIR . '/config/Zed/dev_only_public.key';

/** Optimizing **/
/** Deactivate All Debug Functions And the Symfony Toolbar **/
$config[ApplicationConstants::ENABLE_APPLICATION_DEBUG] = false;
$config[ApplicationConstants::ENABLE_WEB_PROFILER] = false;
$config[PropelConstants::PROPEL_DEBUG] = false;

/** Activate Twig Compiler **/
$config[TwigConstants::ZED_TWIG_OPTIONS] = [
   'cache' => new Twig_Cache_Filesystem(sprintf(
	'%s/data/%s/cache/Zed/twig',
	 APPLICATION_ROOT_DIR, 'DE'),
	 Twig_Cache_Filesystem::FORCE_BYTECODE_INVALIDATION),
];

$config[TwigConstants::YVES_TWIG_OPTIONS] = [
    'cache' => new Twig_Cache_Filesystem(sprintf(
	'%s/data/%s/cache/Yves/twig',
	 APPLICATION_ROOT_DIR, 'DE'),
	 Twig_Cache_Filesystem::FORCE_BYTECODE_INVALIDATION),
];

/** Activate Twig Path Cache **/
$config[TwigConstants::YVES_PATH_CACHE_FILE] = sprintf(
    '%s/data/%s/cache/Yves/twig/.pathCache',
    APPLICATION_ROOT_DIR,
    'DE'
);
$config[TwigConstants::ZED_PATH_CACHE_FILE] = sprintf(
    '%s/data/%s/cache/Zed/twig/.pathCache',
    APPLICATION_ROOT_DIR,
    'DE'
);

/** Activate Zed Navigation Cache (Default On) **/
$config[ZedNavigationConstants::ZED_NAVIGATION_CACHE_ENABLED] = true;

/** Activate Class Resolver Cache **/
$config[KernelConstants::AUTO_LOADER_UNRESOLVABLE_CACHE_ENABLED] = true;

// ---------- Routing
$config[ApplicationConstants::YVES_SSL_ENABLED] = false;
$config[ApplicationConstants::ZED_SSL_ENABLED] = false;

$config[RouterConstants::YVES_IS_SSL_ENABLED] = false;
$config[RouterConstants::ZED_IS_SSL_ENABLED] = false;

// ---------- Session
$config[SessionConstants::YVES_SESSION_COOKIE_SECURE] = false;
$config[SessionConstants::ZED_SESSION_COOKIE_SECURE] = false;
$config[SessionConstants::ZED_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_YEAR;
$config[SessionRedisConstants::ZED_SESSION_TIME_TO_LIVE] = $config[SessionConstants::ZED_SESSION_TIME_TO_LIVE];
$config[SessionFileConstants::ZED_SESSION_TIME_TO_LIVE] = $config[SessionConstants::ZED_SESSION_TIME_TO_LIVE];
```
 <br>
</details>


<details open>
<summary>/data/config/Shared/config_local_DE.php</summary>

```
<?php
use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\Collector\CollectorConstants;
use Spryker\Shared\Customer\CustomerConstants;
use Spryker\Shared\GlueApplication\GlueApplicationConstants;
use Spryker\Shared\Http\HttpConstants;
use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\Newsletter\NewsletterConstants;
use Spryker\Shared\ProductManagement\ProductManagementConstants;
use Spryker\Shared\PropelQueryBuilder\PropelQueryBuilderConstants;
use Spryker\Shared\Propel\PropelConstants;
use Spryker\Shared\RabbitMq\RabbitMqEnv;
use Spryker\Shared\Search\SearchConstants;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\Setup\SetupConstants;
use Spryker\Shared\Storage\StorageConstants;
use Spryker\Shared\ZedRequest\ZedRequestConstants;

/**  Yves host  **/
$config[ApplicationConstants::HOST_YVES] = '{% raw %}{{{% endraw %}YVES_DE_HOST{% raw %}}}{% endraw %}';

$config[ApplicationConstants::PORT_YVES] = '';
$config[ApplicationConstants::PORT_SSL_YVES] = '';
$config[ApplicationConstants::BASE_URL_YVES] = sprintf(
    'http://%s%s',
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::PORT_YVES]
);
$config[ApplicationConstants::BASE_URL_SSL_YVES] = sprintf(
    'https://%s%s',
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::PORT_SSL_YVES]
);
$config[ProductManagementConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_YVES];
$config[NewsletterConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_YVES];
$config[CustomerConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::YVES_TRUSTED_HOSTS]
    = $config[HttpConstants::YVES_TRUSTED_HOSTS]
    = [];

/**  Zed host  **/
$config[ApplicationConstants::HOST_ZED] = '{% raw %}{{{% endraw %}ZED_DE_HOST{% raw %}}}{% endraw %}';

$config[ApplicationConstants::PORT_ZED] = '';
$config[ApplicationConstants::PORT_SSL_ZED] = '';
$config[ApplicationConstants::BASE_URL_ZED] = sprintf(
    'http://%s%s',
    $config[ApplicationConstants::HOST_ZED],
    $config[ApplicationConstants::PORT_ZED]
);
$config[ApplicationConstants::BASE_URL_SSL_ZED] = sprintf(
    'https://%s%s',
    $config[ApplicationConstants::HOST_ZED],
    $config[ApplicationConstants::PORT_SSL_ZED]
);
$config[ApplicationConstants::ZED_TRUSTED_HOSTS]
    = $config[HttpConstants::ZED_TRUSTED_HOSTS]
    = [];

$config[ZedRequestConstants::HOST_ZED_API] = $config[ApplicationConstants::HOST_ZED];
$config[ZedRequestConstants::BASE_URL_ZED_API] = $config[ApplicationConstants::BASE_URL_ZED];
$config[ZedRequestConstants::BASE_URL_SSL_ZED_API] = $config[ApplicationConstants::BASE_URL_SSL_ZED];

/**  Assets / Media   **/
$config[ApplicationConstants::BASE_URL_STATIC_ASSETS] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::BASE_URL_STATIC_MEDIA] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::BASE_URL_SSL_STATIC_ASSETS] = $config[ApplicationConstants::BASE_URL_SSL_YVES];
$config[ApplicationConstants::BASE_URL_SSL_STATIC_MEDIA] = $config[ApplicationConstants::BASE_URL_SSL_YVES];

/**  Session  **/
$config[SessionConstants::YVES_SESSION_COOKIE_NAME] = $config[ApplicationConstants::HOST_YVES];
$config[SessionConstants::YVES_SESSION_COOKIE_DOMAIN] = $config[ApplicationConstants::HOST_YVES];
$config[SessionConstants::ZED_SESSION_COOKIE_NAME] = $config[ApplicationConstants::HOST_ZED];


/** Database credentials **/
$config[PropelConstants::ZED_DB_DATABASE] = 'spryker_DE';

/** Elasticsearch  */
$config[ApplicationConstants::ELASTICA_PARAMETER__INDEX_NAME]
    = $config[CollectorConstants::ELASTICA_PARAMETER__INDEX_NAME]
    = $config[SearchConstants::ELASTICA_PARAMETER__INDEX_NAME]
    = 'de_search';

/** RabbitMQ **/
$config[RabbitMqEnv::RABBITMQ_API_VIRTUAL_HOST] = '/DE_spryker_zed';
$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [
    'DE' => [
        RabbitMqEnv::RABBITMQ_CONNECTION_NAME => 'DE-connection',
        RabbitMqEnv::RABBITMQ_HOST => '{% raw %}{{{% endraw %}RABBITMQ_HOST{% raw %}}}{% endraw %}',
        RabbitMqEnv::RABBITMQ_PORT => '5672',
        RabbitMqEnv::RABBITMQ_PASSWORD => '{% raw %}{{{% endraw %}RABBITMQ_PASSWORD{% raw %}}}{% endraw %}',
        RabbitMqEnv::RABBITMQ_USERNAME => '{% raw %}{{{% endraw %}RABBITMQ_USERNAME{% raw %}}}{% endraw %}',
        RabbitMqEnv::RABBITMQ_VIRTUAL_HOST => '/DE_spryker_zed',
        RabbitMqEnv::RABBITMQ_STORE_NAMES => ['DE'],
        RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION => true,
  ],
];


// ----------- HTTP Security
$config[KernelConstants::DOMAIN_WHITELIST] = [
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::HOST_ZED],
];
```
 <br>
</details>

<details open>
<summary>/data/config/Shared/config_local_AT.php</summary>

```
<?php
use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\Collector\CollectorConstants;
use Spryker\Shared\Customer\CustomerConstants;
use Spryker\Shared\GlueApplication\GlueApplicationConstants;
use Spryker\Shared\Http\HttpConstants;
use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\Newsletter\NewsletterConstants;
use Spryker\Shared\ProductManagement\ProductManagementConstants;
use Spryker\Shared\PropelQueryBuilder\PropelQueryBuilderConstants;
use Spryker\Shared\Propel\PropelConstants;
use Spryker\Shared\RabbitMq\RabbitMqEnv;
use Spryker\Shared\Search\SearchConstants;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\Setup\SetupConstants;
use Spryker\Shared\Storage\StorageConstants;
use Spryker\Shared\ZedRequest\ZedRequestConstants;

/**  Yves host  **/
$config[ApplicationConstants::HOST_YVES] = '{% raw %}{{{% endraw %}YVES_AT_HOST{% raw %}}}{% endraw %}';

$config[ApplicationConstants::PORT_YVES] = '';
$config[ApplicationConstants::PORT_SSL_YVES] = '';
$config[ApplicationConstants::BASE_URL_YVES] = sprintf(
    'http://%s%s',
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::PORT_YVES]
);
$config[ApplicationConstants::BASE_URL_SSL_YVES] = sprintf(
    'https://%s%s',
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::PORT_SSL_YVES]
);
$config[ProductManagementConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_YVES];
$config[NewsletterConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_YVES];
$config[CustomerConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::YVES_TRUSTED_HOSTS]
    = $config[HttpConstants::YVES_TRUSTED_HOSTS]
    = [];

/**  Zed host  **/
$config[ApplicationConstants::HOST_ZED] = '{% raw %}{{{% endraw %}ZED_AT_HOST{% raw %}}}{% endraw %}';

$config[ApplicationConstants::PORT_ZED] = '';
$config[ApplicationConstants::PORT_SSL_ZED] = '';
$config[ApplicationConstants::BASE_URL_ZED] = sprintf(
    'http://%s%s',
    $config[ApplicationConstants::HOST_ZED],
    $config[ApplicationConstants::PORT_ZED]
);
$config[ApplicationConstants::BASE_URL_SSL_ZED] = sprintf(
    'https://%s%s',
    $config[ApplicationConstants::HOST_ZED],
    $config[ApplicationConstants::PORT_SSL_ZED]
);
$config[ApplicationConstants::ZED_TRUSTED_HOSTS]
    = $config[HttpConstants::ZED_TRUSTED_HOSTS]
    = [];

$config[ZedRequestConstants::HOST_ZED_API] = $config[ApplicationConstants::HOST_ZED];
$config[ZedRequestConstants::BASE_URL_ZED_API] = $config[ApplicationConstants::BASE_URL_ZED];
$config[ZedRequestConstants::BASE_URL_SSL_ZED_API] = $config[ApplicationConstants::BASE_URL_SSL_ZED];

/**  Assets / Media   **/
$config[ApplicationConstants::BASE_URL_STATIC_ASSETS] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::BASE_URL_STATIC_MEDIA] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::BASE_URL_SSL_STATIC_ASSETS] = $config[ApplicationConstants::BASE_URL_SSL_YVES];
$config[ApplicationConstants::BASE_URL_SSL_STATIC_MEDIA] = $config[ApplicationConstants::BASE_URL_SSL_YVES];

/**  Session  **/
$config[SessionConstants::YVES_SESSION_COOKIE_NAME] = $config[ApplicationConstants::HOST_YVES];
$config[SessionConstants::YVES_SESSION_COOKIE_DOMAIN] = $config[ApplicationConstants::HOST_YVES];
$config[SessionConstants::ZED_SESSION_COOKIE_NAME] = $config[ApplicationConstants::HOST_ZED];


/** Database credentials **/
$config[PropelConstants::ZED_DB_DATABASE] = 'spryker_AT';

/** Elasticsearch  */
$config[ApplicationConstants::ELASTICA_PARAMETER__INDEX_NAME]
    = $config[CollectorConstants::ELASTICA_PARAMETER__INDEX_NAME]
    = $config[SearchConstants::ELASTICA_PARAMETER__INDEX_NAME]
    = 'at_search';

/** RabbitMQ **/
$config[RabbitMqEnv::RABBITMQ_API_VIRTUAL_HOST] = '/AT_spryker_zed';
$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [
    'AT' => [
        RabbitMqEnv::RABBITMQ_CONNECTION_NAME => 'AT-connection',
        RabbitMqEnv::RABBITMQ_HOST => '{% raw %}{{{% endraw %}RABBITMQ_HOST{% raw %}}}{% endraw %}',
        RabbitMqEnv::RABBITMQ_PORT => '5672',
        RabbitMqEnv::RABBITMQ_PASSWORD => '{% raw %}{{{% endraw %}RABBITMQ_PASSWORD{% raw %}}}{% endraw %}',
        RabbitMqEnv::RABBITMQ_USERNAME => '{% raw %}{{{% endraw %}RABBITMQ_USERNAME{% raw %}}}{% endraw %}',
        RabbitMqEnv::RABBITMQ_VIRTUAL_HOST => '/AT_spryker_zed',
        RabbitMqEnv::RABBITMQ_STORE_NAMES => ['AT'],
        RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION => true,
  ],
];

// ----------- HTTP Security
$config[KernelConstants::DOMAIN_WHITELIST] = [
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::HOST_ZED],
];
```
<br>
</details>

<details open>
<summary>/data/config/Shared/config_local_US.php</summary>

```
<?php
use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\Collector\CollectorConstants;
use Spryker\Shared\Customer\CustomerConstants;
use Spryker\Shared\GlueApplication\GlueApplicationConstants;
use Spryker\Shared\Http\HttpConstants;
use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\Newsletter\NewsletterConstants;
use Spryker\Shared\ProductManagement\ProductManagementConstants;
use Spryker\Shared\PropelQueryBuilder\PropelQueryBuilderConstants;
use Spryker\Shared\Propel\PropelConstants;
use Spryker\Shared\RabbitMq\RabbitMqEnv;
use Spryker\Shared\Search\SearchConstants;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\Setup\SetupConstants;
use Spryker\Shared\Storage\StorageConstants;
use Spryker\Shared\ZedRequest\ZedRequestConstants;

/**  Yves host  **/
$config[ApplicationConstants::HOST_YVES] = '{% raw %}{{{% endraw %}YVES_US_HOST{% raw %}}}{% endraw %}';

$config[ApplicationConstants::PORT_YVES] = '';
$config[ApplicationConstants::PORT_SSL_YVES] = '';
$config[ApplicationConstants::BASE_URL_YVES] = sprintf(
    'http://%s%s',
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::PORT_YVES]
);
$config[ApplicationConstants::BASE_URL_SSL_YVES] = sprintf(
    'https://%s%s',
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::PORT_SSL_YVES]
);
$config[ProductManagementConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_YVES];
$config[NewsletterConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_YVES];
$config[CustomerConstants::BASE_URL_YVES] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::YVES_TRUSTED_HOSTS]
    = $config[HttpConstants::YVES_TRUSTED_HOSTS]
    = [];

/**  Zed host  **/
$config[ApplicationConstants::HOST_ZED] = '{% raw %}{{{% endraw %}ZED_US_HOST{% raw %}}}{% endraw %}';

$config[ApplicationConstants::PORT_ZED] = '';
$config[ApplicationConstants::PORT_SSL_ZED] = '';
$config[ApplicationConstants::BASE_URL_ZED] = sprintf(
    'http://%s%s',
    $config[ApplicationConstants::HOST_ZED],
    $config[ApplicationConstants::PORT_ZED]
);
$config[ApplicationConstants::BASE_URL_SSL_ZED] = sprintf(
    'https://%s%s',
    $config[ApplicationConstants::HOST_ZED],
    $config[ApplicationConstants::PORT_SSL_ZED]
);
$config[ApplicationConstants::ZED_TRUSTED_HOSTS]
    = $config[HttpConstants::ZED_TRUSTED_HOSTS]
    = [];

$config[ZedRequestConstants::HOST_ZED_API] = $config[ApplicationConstants::HOST_ZED];
$config[ZedRequestConstants::BASE_URL_ZED_API] = $config[ApplicationConstants::BASE_URL_ZED];
$config[ZedRequestConstants::BASE_URL_SSL_ZED_API] = $config[ApplicationConstants::BASE_URL_SSL_ZED];

/**  Assets / Media   **/
$config[ApplicationConstants::BASE_URL_STATIC_ASSETS] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::BASE_URL_STATIC_MEDIA] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::BASE_URL_SSL_STATIC_ASSETS] = $config[ApplicationConstants::BASE_URL_SSL_YVES];
$config[ApplicationConstants::BASE_URL_SSL_STATIC_MEDIA] = $config[ApplicationConstants::BASE_URL_SSL_YVES];

/**  Session  **/
$config[SessionConstants::YVES_SESSION_COOKIE_NAME] = $config[ApplicationConstants::HOST_YVES];
$config[SessionConstants::YVES_SESSION_COOKIE_DOMAIN] = $config[ApplicationConstants::HOST_YVES];
$config[SessionConstants::ZED_SESSION_COOKIE_NAME] = $config[ApplicationConstants::HOST_ZED];


/** Database credentials **/
$config[PropelConstants::ZED_DB_DATABASE] = 'spryker_US';

/** Elasticsearch  */
$config[ApplicationConstants::ELASTICA_PARAMETER__INDEX_NAME]
    = $config[CollectorConstants::ELASTICA_PARAMETER__INDEX_NAME]
    = $config[SearchConstants::ELASTICA_PARAMETER__INDEX_NAME]
    = 'us_search';

/** RabbitMQ **/
$config[RabbitMqEnv::RABBITMQ_API_VIRTUAL_HOST] = '/US_spryker_zed';
$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [
    'US' => [
        RabbitMqEnv::RABBITMQ_CONNECTION_NAME => 'US-connection',
        RabbitMqEnv::RABBITMQ_HOST => '{% raw %}{{{% endraw %}RABBITMQ_HOST{% raw %}}}{% endraw %}',
        RabbitMqEnv::RABBITMQ_PORT => '5672',
        RabbitMqEnv::RABBITMQ_PASSWORD => '{% raw %}{{{% endraw %}RABBITMQ_PASSWORD{% raw %}}}{% endraw %}',
        RabbitMqEnv::RABBITMQ_USERNAME => '{% raw %}{{{% endraw %}RABBITMQ_USERNAME{% raw %}}}{% endraw %}',
        RabbitMqEnv::RABBITMQ_VIRTUAL_HOST => '/US_spryker_zed',
        RabbitMqEnv::RABBITMQ_STORE_NAMES => ['US'],
        RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION => true,
  ],
];

// ----------- HTTP Security
$config[KernelConstants::DOMAIN_WHITELIST] = [
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::HOST_ZED],
];
```
 <br>
</details>

Run the following commands:
```Shell
composer global require hirak/prestissimo
composer install
composer require --no-update aws/aws-sdk-php
```

4. Add Jenkins `Max # of builds to keep` configuration by updating the  `<numToKeep>-1</numToKeep>` parameter in `/data/vendor/spryker/setup/src/Spryker/Zed/Setup/Business/Model/Cronjobs.php` to the desired one. For example, if you wanted to keep 100 items in the Jenkins history, you would change the parameter from -1 to 100 to look this way: `<numToKeep>100</numToKeep>`

5. Create the following file:

<details open>
<summary>/data/config/install/staging.yml</summary>

```
env:
    APPLICATION_ENV: staging

stores:
    - DE
    - AT
    - US

command-timeout: 3600

sections:

    hidden:
        excluded: true
        maintenance-all-on:
            command: "vendor/bin/console maintenance:enable"

        maintenance-all-off:
            command: "vendor/bin/console maintenance:disable"

        maintenance-zed-on:
            command: "vendor/bin/console maintenance:enable zed"

        maintenance-zed-off:
            command: "vendor/bin/console maintenance:disable zed"

        maintenance-yves-on:
            command: "vendor/bin/console maintenance:enable yves"

        maintenance-yves-off:
            command: "vendor/bin/console maintenance:disable yves"


    environment:
        console-environment:
            command: "if [ ! -f ./config/Shared/console_env_local.php ]; then cp ./config/Shared/console_env_local.dist.php ./config/Shared/console_env_local.php ; fi"


    clear:
        remove-logs:
            command: "vendor/bin/console log:clear"

        remove-cache:
            command: "vendor/bin/console cache:empty-all"

        remove-generated-files:
            command: "vendor/bin/console setup:empty-generated-directory"

    generate:
        generate-transfers:
            command: "vendor/bin/console transfer:generate"


    jenkins-down:
        jenkins-stop:
            command: "vendor/bin/console scheduler:clean"
            stores: true

    cache:
        router-cache-warmup-yves:
            command: "vendor/bin/yves router:cache:warm-up"

        router-cache-warmup-zed:
            command: "vendor/bin/console router:cache:warm-up"

        twig-cache-warmup:
            command: "vendor/bin/console twig:cache:warmer"

        navigation-cache-warmup:
            command: "vendor/bin/console navigation:build-cache"

        rest-request-validation-cache-warmup:
            command: "vendor/bin/console glue:rest:build-request-validation-cache"


    queue-flush:
        set-permissions:
            command: "vendor/bin/console queue:permission:set"
            stores: true

        purge-all-queues:
            command: "vendor/bin/console queue:queue:purge-all"
            stores: true

        delete-all-queues:
            command: "vendor/bin/console queue:queue:delete-all"
            stores: true

        delete-all-exchanges:
            command: "vendor/bin/console queue:exchanges:delete-all"
            stores: true


    database-flush:
        delete-elastic-search-index:
            command: "vendor/bin/console search:index:delete"
            stores: true
            groups:
                - elastic

        delete-storage:
            command: "vendor/bin/console storage:delete"
            stores: true
            groups:
                - redis

        drop-database:
            command: "vendor/bin/console propel:database:drop"
            pre: "hidden/maintenance-zed-on"
            stores:
                - US
                - DE
            groups:
                - propel

        delete-migration-files:
            command: "vendor/bin/console propel:migration:delete"
            stores:
                - US
                - DE
            groups:
                - propel


    database-migrate:
        propel-create:
            command: "vendor/bin/console propel:database:create"
            stores:
                - US
                - DE
            groups:
                - propel

        propel-postgres-compatibility:
            command: "vendor/bin/console propel:pg-sql-compat"
            stores:
                - US
                - DE
            groups:
                - propel

        propel-copy-schema:
            command: "vendor/bin/console propel:schema:copy"
            stores:
                - US
                - DE
            groups:
                - propel

        propel-build:
            command: "vendor/bin/console propel:model:build"
            groups:
                - propel

        propel-diff:
            command: "vendor/bin/console propel:diff"
            stores:
                - US
                - DE
            groups:
                - propel

        propel-migration-check:
            command: "vendor/bin/console propel:migration:check"
            breakOnFailure: false
            stores:
                - US
                - DE
            groups:
                - propel

        maintenance-page-enable:
            command: "vendor/bin/console maintenance:enable"
            stores: true
            condition:
                command: "propel-migration-check"
                ifExitCode: 2

        propel-migrate:
            command: "vendor/bin/console propel:migrate"
            stores:
                - US
                - DE
            groups:
                - propel

        maintenance-page-disable:
            command: "vendor/bin/console maintenance:disable"
            stores: true

        generate-entity-transfer:
            command: "vendor/bin/console transfer:entity:generate"

        init-database:
            command: "vendor/bin/console setup:init-db"
            stores:
                - US
                - DE

        setup-search-create-sources:
            command: "vendor/bin/console search:setup:sources"
            stores: true
            groups:
                - elastic

        setup-seach-create-source-map:
            command: "vendor/bin/console search:setup:source-map"
            stores: true
            groups:
                - elastic

    demodata:
        import:
            command: "vendor/bin/console data:import"
            stores:
                - US
                - DE

        update-product-labels:
            command: "vendor/bin/console product-label:relations:update"
            stores:
                - US
                - DE

    jenkins-up:
        jenkins-generate:
            command: "vendor/bin/console scheduler:setup"
            stores: true

        jenkins-enable:
            command: "vendor/bin/console scheduler:resume"
            stores: true

    frontend:
        dependencies-install:
            command: "vendor/bin/console frontend:project:install-dependencies -vvv"
            groups:
                - project

        yves-install-dependencies:
            command: "vendor/bin/console frontend:yves:install-dependencies -vvv"
            groups:
                - yves

        yves-build-frontend:
            command: "vendor/bin/console frontend:yves:build -vvv"
            groups:
                - yves

        zed-install-dependencies:
            command: "vendor/bin/console frontend:zed:install-dependencies -vvv"
            groups:
                - zed

        zed-build-frontend:
            command: "vendor/bin/console frontend:zed:build"
            groups:
                - zed
```
 <br>
</details>

6. Run the `transfer:generate` and `propel:install` commands:

```shell
export APPLICATION_ENV=staging
vendor/bin/console transfer:generate -vvv
vendor/bin/console propel:install -vvv
vendor/bin/console transfer:generate -vvv
```
7. Run the install command:

```shell
APPLICATION_ENV=staging vendor/bin/install -vvv
```
8. Change owner of the data folder:

```shell
sudo chown -R www-data:www-data /data
```

{% info_block errorBox %}
Make sure to provide secure configuration of Zed service. Sufficient security is not provided by "Basic AUTH" based on web server configuration, IP address restriction or direct VPN connection to the server.
{% endinfo_block %}

**Requirements**

| RDS (Managed relational database service)  |
| --- | --- |
| Instance type |  >= db.t2.micro|
| Database type: |  |
|PostgreSQL  |>= 9.6 - Default and preferred |
| MySQL | >= 5.7 |
| Public accessibility | no |

| Elasticsearch Service   |
| --- | --- |
| Instance type | >= t2.small.elasticsearch |
| Elasticsearch version | 5.6 |
| Volume size | >= 10 GB |
| Endpoint | VPC |

| EC2  |
| --- | --- |
| Instance type | >= t2.medium |
| Storage size | >= 20Gb |
| OS | Ubuntu 18.04|

| Security Groups |
| --- | --- |
| Incoming ports | 22, 80, 443 |


|  List of Connections  |
| --- | --- |
| Nginx | TCP: 80, 443 (Any) |
| Yves, Glue, Zed | TCP: 9000 ( Nginx ) |
| Jenkins  | TCP: 8080 ( Nginx ) |
| PostgreSQL | TCP: 5432 ( Zed ) |
| RabbitMQ | TCP: 5672, 15672 ( Zed ) |
| Redis | TCP: 6379 ( Yves, Glue, Zed ) |
| Elasticsearch | TCP: 9200 ( Yves, Glue, Zed ) |

## AWS Services Setup Validation

### RDS Latency Check

Perform RDS LatencyCheck by running the commands below.

#### PostgreSQL

```
export PGPASSWORD={% raw %}{{{% endraw %}RDS_PASSWORD{% raw %}}}{% endraw %}
/usr/bin/pgbench -i -h {% raw %}{{{% endraw %}RDS_ENDPOINT{% raw %}}}{% endraw %} -p 5432 -U {% raw %}{{{% endraw %}RDS_USERNAME{% raw %}}}{% endraw %} -d {% raw %}{{{% endraw %}RDS_DATABASE{% raw %}}}{% endraw %}
/usr/bin/pgbench -c 10 -h {% raw %}{{{% endraw %}RDS_ENDPOINT{% raw %}}}{% endraw %} -p 5432 -U {% raw %}{{{% endraw %}RDS_USERNAME{% raw %}}}{% endraw %} -d {% raw %}{{{% endraw %}RDS_DATABASE{% raw %}}}{% endraw %}
```

{% info_block infoBox %}
Benchmark result examples: Average latency for db.t2.micro / db.t2.micro - 29 ms
{% endinfo_block %}

#### MySQL

```
sudo apt-get -y install mysql-client
mysqlslap --host= {% raw %}{{{% endraw %}RDS_ENDPOINT{% raw %}}}{% endraw %} --user={% raw %}{{{% endraw %}RDS_USERNAME{% raw %}}}{% endraw %} --concurrency=50 --iterations=10 --password={% raw %}{{{% endraw %}RDS_PASSWORD{% raw %}}}{% endraw %} --auto-generate-sql --verbose
```

{% info_block infoBox "Benchmark result examples:" %}
Average number of seconds to run all queries: 0.739 seconds - db.t2.small </br>Average number of seconds to run all queries: 0.485 seconds - db.t2.medium
{% endinfo_block %}

#### Redis Latency Check
Run the command:

```
redis-cli --latency -h {% raw %}{{{% endraw %}ELASTICACHE_ENDPOINT{% raw %}}}{% endraw %} -p 6379
```

{% info_block infoBox "Benchmark result examples:" %}
avg: 0.48 (20038 samples
{% endinfo_block %} - cache.t2.micro </br>avg: 0.31 (20047 samples) - cache.t2.medium)

## List of Connections
The following diagramm illustrates the connections:

![List of connections](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/connections-list.jpg){height="" width=""}

