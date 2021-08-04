---
title: HowTo - Install Spryker in AWS Environment
originalLink: https://documentation.spryker.com/v3/docs/ht-install-spryker-in-aws-environment
redirect_from:
  - /v3/docs/ht-install-spryker-in-aws-environment
  - /v3/docs/en/ht-install-spryker-in-aws-environment
---

## Introduction
This how-to is aimed to provide you with additional information about native configuration of AWS services and Spryker installation using AWS cloud as a base of infrastructure.

Following the instructions, you will get Spryker running on AWS. The first part is devoted to step-by-step configuration of AWS native services like RDS, Elasticsearch Service, ElastiCache to prepare a suitable infrustructure for running Spryker. The second part is the installation of Spryker itself.

## AWS native services configuration
    
### RDS (Managed relational database service)

1. Open RDS console. 
![RDS console](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/rds-console.png){height="" width=""}

2. Click **Create database**.
    
![Create database](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/create-database.png){height="" width=""}

3. Select **PostgreSQL**. 

![Choose PostgreSQL](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/choose-postgresql.png){height="" width=""}

4. Choose a use case ( For production purpose, we recommend Multi-AZ Deployment). 
    
![Choose usecase](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/choose-use-case.png){height="" width=""}

5. Fill out all the outlined fields. 
    
![Choose database details](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/choose-db-details.png){height="" width=""}

![Database login details](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/db-login-details.png){height="" width=""}

![Network and security](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/network-and-security.png){height="" width=""}

![Database options](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/db-options.png){height="" width=""}

6. Get **DB Name**, **Endpoint** and **port**. 
    
![Get database name endpoint](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/get-db-name-endpoint.png){height="" width=""}

See [Database creation manual](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Tutorials.WebServerDB.CreateDBInstance.html) for more details.
    
### Elasticsearch Service

1. Open Elasticsearch service console. 
    
![Elasticsearch console](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/elastic-search-console.png){height="" width=""}

2. Click **Create a new domain**.

![Create new domain](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/create-new-domain.png){height="" width=""}

3. Fill out all the outlined fields. 
    
![Define domain](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/define-domain.png){height="" width=""}

![Node config](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/node-config.png){height="" width=""}

![VPC access](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/vpc-access.png){height="" width=""}

4. Get **VPC endpoint**. 

![Get VPS endpoint](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/get-vpc-endpoint.png){height="" width=""}

See [Elasticseacrh service creation manual](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-createupdatedomains.html#es-createdomains) for more details.
    
### ElastiCache

1. Open ElastiCache console. 
    
![ElastiCache console](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/elasticache-console.png){height="" width=""}

2. Click **Get Started Now**. 
    
![Elastisearch - Get started now](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/elastisearch-start.png){height="" width=""}

3. Fill out all the outlined fields. 
    
![Elastisearch config](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/elastisearch-config.png){height="" width=""}

4. Get **Primary Endpoint**. 
    
![Primary endpoint](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/get-primary-endpoint.png){height="" width=""}

See [ElastiCache creation manual](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/GettingStarted.CreateCluster.html) for more details.
    
## EC2 instance installation and configuration
    
### SSH Key
Use the [manual](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair) to create it.

### Security Group

1. Open EC2 console. 
    
![EC2 console](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/ec2-console.png){height="" width=""}

2. Click **Create Security Group**. 
    
![Create security group](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/create-security-group.png){height="" width=""}

3. Fill out the outlined fields and click **Create**. 
    
![Choose security group](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/choose-security-group.png){height="" width=""}

See [Creating a Security Group](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html#creating-security-group) and [Adding Rules to a Security Group](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html#creating-security-group)
    
### Elastic IP

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

See [Allocating an Elastic IP Address](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating) and [Associating an Elastic IP Address with a Running Instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-associating).
    
### Launching Instance

1. Open EC2 console. 
    
![EC2 console](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/ec2-console.png){height="" width=""}

2. Click **Launch instance**. 
    
![Launch instance](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/launch-instance.png){height="" width=""}

3. Select the Ubuntu server with the **64-bit (x86)** configuration. 
    
![Choose OS](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/choose-os.png){height="" width=""}

4. Choose the instance type and click **Next: Configure Instance Details**.
    
![Choose instance](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/choose-instance.png){height="" width=""}

5. Add storage and click **Next: Add Tags**. 
    
![Add storage](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/add-storage.png){height="" width=""}

6. Add a Name tag and click **Next: Configure Security Group**. 
    
![Add tags](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/add-tags.png){height="" width=""}

7. Choose the security group which you have previously created and click **Review and Launch**.
8. Choose the ssh key you have previously created, download it and click **Launch Instances**. 

![Select SHH keys](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/select-ssh-key.png){height="" width=""}

### Connecting to the instance

1. Click **Actions** > **Connect**. 
    
![Connect action](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/actions-connect.png){height="" width=""}

2. Connect to the Spryker instance using the provided details. 
    
![Connection instructions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/connection-instructions.png){height="" width=""}

## Install additional software
    
### System tools installation

1. Configure additional repositories.

```shell
sudo apt-get update
sudo apt-get install -q -y --no-install-recommends wget gnupg apt-transport-https
sudo add-apt-repository ppa:ondrej/php
echo "deb https://deb.nodesource.com/node_8.x stretch main" |sudo tee /etc/apt/sources.list.d/node.list
wget --quiet -O - https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
```
    
2. Install additional software and dependencies.

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
    
### PHP installation
Run the commands:
    
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
    
### PHP configuration

1. Create the following files using the provided templates:

** /etc/php/7.2/fpm/php.ini**
    
```
memory_limit = 1024M
[mail function]
sendmail_path = /usr/sbin/sendmail -t -i
```
    
**/etc/php/7.2/fpm/pool.d/yves.conf**
    
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
    
**/etc/php/7.2/fpm/pool.d/zed.conf**
    
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

**/etc/php/7.2/fpm/pool.d/glue.conf **
    
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

2. Edit the following file using the template:

**/etc/php/7.2/fpm/conf.d/10-opcache.ini** 
    
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

### Postfix installation
Postfix is a mail server which will be used to send mail. Run the commands to install it:    
    
```
sudo apt update
sudo apt install -q -y postfix
```
    
### Nginx installation
Nginx  is an open source web server which will proxy requests to PHP FPM via FCGI protocol. Run the commands to install:
    
```
sudo apt update 
sudo apt-get  install -q -y nginx nginx-extras
sudo rm /etc/nginx/sites-enabled/default
```
    
### Nginx configuration

1. Update `{% raw %}{{{% endraw %}YVES_HOST{% raw %}}}{% endraw %}` and `application_store` variables, and create `/etc/nginx/conf.d/vhost-yves.conf` using the template:

**vhost-yves.conf template**
    
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
    
2. Create a `passwd` file by running the command:

```
sudo htpasswd -c /etc/nginx/.htpasswd {% raw %}{{{% endraw %}SOME_USER{% raw %}}}{% endraw %}
```
    
3. Update `{% raw %}{{{% endraw %}ZED_HOST{% raw %}}}{% endraw %}` and `application_store` variables, and create `/etc/nginx/conf.d/vhost-zed.conf` using the template:

**vhost-zed.conf template**
    
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
    
4. Update `{% raw %}{{{% endraw %}GLUE_HOST{% raw %}}}{% endraw %}` and `application_store` variables, and create `/etc/nginx/conf.d/vhost-glue.conf` using the template:

**vhost-glue.conf template**
    
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
    
5. Create  `/etc/nginx/conf.d/jenkins.conf`:

**/etc/nginx/conf.d/jenkins.conf**
    
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
    
6. Create `/etc/nginx/fastcgi_params` using the template:

**fastcgi_params template**
    
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
    
### Node.js installation
Run the commands as root:
    
```
##curl -sL https://deb.nodesource.com/setup_8.x | bash - # step1
apt-get install -y nodejs
```
    
### RabbitMQ installation
Run the commands as root:
    
```
wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -
sudo dpkg -i erlang-solutions_1.0_all.deb
wget -O- https://dl.bintray.com/rabbitmq/Keys/rabbitmq-release-signing-key.asc | sudo apt-key add -
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -
echo "deb https://dl.bintray.com/rabbitmq/debian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/rabbitmq.list
sudo apt-get update
sudo apt-get install -y rabbitmq-server
```
    
### RabbitMQ configuration
Run the commands as root:   

* Service configuration.

```
sudo service rabbitmq-server start
sudo rabbitmq-plugins enable rabbitmq_management
sudo chown -R rabbitmq:rabbitmq /var/lib/rabbitmq/
```
    
* Admin user configuration.

```
sudo rabbitmqctl add_user admin password
sudo rabbitmqctl add_vhost /spryker
sudo rabbitmqctl set_user_tags admin administrator
sudo rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
sudo rabbitmqctl set_permissions -p /spryker admin ".*" ".*" ".*"
```

*  Spryker user configuration.

```
sudo rabbitmqctl add_user spryker password
sudo rabbitmqctl set_user_tags spryker administrator
sudo rabbitmqctl set_permissions -p /spryker spryker ".*" ".*" ".*"
```
    
### Jenkins installation
Run the commands as root:
    
```
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add - sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/>/etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins openjdk-8-jdk
sudo update-alternatives --set java /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
sudo service jenkins stop
```
 
### Jenkins configuration

1. Change the `JENKINS_USER` variable in the `/etc/init.d/jenkins` and `/etc/default/jenkins` files to `JENKINS_USER="www-data"`.
2. Change the owner of jenkins folders:

```
sudo chown -R www-data:www-data /var/lib/jenkins
sudo chown -R www-data:www-data /var/cache/jenkins
sudo chown -R www-data:www-data /var/log/jenkins
```
3. Reload services configuration:

```
sudo systemctl daemon-reload
```
4. Update Jenkins configuration file: 

**/var/lib/jenkins/config.xml**
    
```
<?xml version='1.1' encoding='UTF-8'?>
<hudson>
<disabledAdministrativeMonitors>
<string>jenkins.CLI</string>
    <string>jenkins.diagnostics.SecurityIsOffMonitor</string>
</disabledAdministrativeMonitors>
    <version>2.150.2</version>
<installStateName>DOWNGRADE</installStateName>
    <numExecutors>2</numExecutors>
<mode>NORMAL</mode>
    <useSecurity>true</useSecurity>
<authorizationStrategy class="hudson.security.AuthorizationStrategy$Unsecured"/>
<securityRealm class="hudson.security.SecurityRealm$None"/>
<disableRememberMe&gt;false&lt;/disableRememberMe>
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

5. Restart Jenkins service:

```
sudo service jenkins start
```
    
6. Create `/data/deploy directory`:

```
mkdir -p /data/deploy
```
    
7. Create variables file /data/deploy/vars with variables:

```
destination_release_dir=/data
PGPASSWORD={% raw %}{{{% endraw %}RDS_PASSWORD{% raw %}}}{% endraw %}
   
```
    
### System configuration

1. Change swappiness configuration:

```
echo "vm.swappiness=5" | sudo tee /etc/sysctl.conf
sudo sysctl -p
```
2. Change file limit configuration:

```
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
    
## Spryker installation
    

1. Create data folder:

```
sudo mkdir /data
sudo chown ubuntu /data
cd /data
```
2. Clone project:

```
git clone https://github.com/spryker-shop/suite.git ./
```
3. Create local configuration using the template:

**/data/config/Shared/config_local.php**
    
```
<?php

use Spryker\Shared\Application\ApplicationConstants;
use Spryker\Shared\Collector\CollectorConstants;
use Spryker\Shared\Customer\CustomerConstants;
use Spryker\Shared\Newsletter\NewsletterConstants;
use Spryker\Shared\ProductManagement\ProductManagementConstants;
use Spryker\Shared\Propel\PropelConstants;
use Spryker\Shared\Search\SearchConstants;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\Setup\SetupConstants;
use Spryker\Shared\Storage\StorageConstants;
use Spryker\Shared\PropelQueryBuilder\PropelQueryBuilderConstants;
use Spryker\Shared\ZedRequest\ZedRequestConstants;
use Spryker\Shared\Log\LogConstants;
use Monolog\Logger;
use Spryker\Shared\RabbitMq\RabbitMqEnv;
use Spryker\Shared\GlueApplication\GlueApplicationConstants;

// ---------- Yves host
$config[ApplicationConstants::HOST_YVES] = '{% raw %}{{{% endraw %}YVES_HOST{% raw %}}}{% endraw %}';
$config[ApplicationConstants::PORT_YVES] = ':80';
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
$config[ApplicationConstants::YVES_TRUSTED_HOSTS] = [];

// ---------- Zed host
$config[ApplicationConstants::HOST_ZED] = '{% raw %}{{{% endraw %}ZED_HOST{% raw %}}}{% endraw %}';
$config[ApplicationConstants::PORT_ZED] = ':80';
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
$config[ZedRequestConstants::HOST_ZED_API] = $config[ApplicationConstants::HOST_ZED];
$config[ZedRequestConstants::BASE_URL_ZED_API] = $config[ApplicationConstants::BASE_URL_ZED];
$config[ZedRequestConstants::BASE_URL_SSL_ZED_API] = $config[ApplicationConstants::BASE_URL_SSL_ZED];

// ---------- Assets / Media
$config[ApplicationConstants::BASE_URL_STATIC_ASSETS] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::BASE_URL_STATIC_MEDIA] = $config[ApplicationConstants::BASE_URL_YVES];
$config[ApplicationConstants::BASE_URL_SSL_STATIC_ASSETS] = $config[ApplicationConstants::BASE_URL_SSL_YVES];
$config[ApplicationConstants::BASE_URL_SSL_STATIC_MEDIA] = $config[ApplicationConstants::BASE_URL_SSL_YVES];

// ---------- Session
$config[SessionConstants::YVES_SESSION_COOKIE_NAME] = $config[ApplicationConstants::HOST_YVES];
$config[SessionConstants::YVES_SESSION_COOKIE_DOMAIN] = $config[ApplicationConstants::HOST_YVES];
$config[SessionConstants::ZED_SESSION_COOKIE_NAME] = $config[ApplicationConstants::HOST_ZED];


/** Database credentials */
$config[PropelConstants::ZED_DB_USERNAME] = '{% raw %}{{{% endraw %}RDS_USERNAME{% raw %}}}{% endraw %}';
$config[PropelConstants::ZED_DB_PASSWORD] = '{% raw %}{{{% endraw %}RDS_PASSWORD{% raw %}}}{% endraw %}';
$config[PropelConstants::ZED_DB_DATABASE] = '{% raw %}{{{% endraw %}RDS_DATABASE{% raw %}}}{% endraw %}';
$config[PropelConstants::ZED_DB_HOST] = '{% raw %}{{{% endraw %}RDS_ENDPOINT{% raw %}}}{% endraw %}';
$config[PropelConstants::ZED_DB_PORT] = '5432';
$config[PropelConstants::ZED_DB_ENGINE]
= $config[PropelQueryBuilderConstants::ZED_DB_ENGINE]
= $config[PropelConstants::ZED_DB_ENGINE_PGSQL];
$config[PropelConstants::USE_SUDO_TO_MANAGE_DATABASE] = false;


/** Elasticsearch */
$config[ApplicationConstants::ELASTICA_PARAMETER__HOST] = '{% raw %}{{{% endraw %}ELASTICSEARCH_ENDPOINT WITHOUT HTTPS:// and trailing /{% raw %}}}{% endraw %}';
$config[ApplicationConstants::ELASTICA_PARAMETER__PORT] = '443';
$config[ApplicationConstants::ELASTICA_PARAMETER__INDEX_NAME]
= $config[CollectorConstants::ELASTICA_PARAMETER__INDEX_NAME]
= $config[SearchConstants::ELASTICA_PARAMETER__INDEX_NAME]
= 'de_search';
unset($config[SearchConstants::ELASTICA_PARAMETER__AUTH_HEADER]);


/** Session and KV storage */
$config[StorageConstants::STORAGE_REDIS_PROTOCOL] = 'redis';
$config[StorageConstants::STORAGE_REDIS_HOST] = '{% raw %}{{{% endraw %}ELASTICACHE_ENDPOINT{% raw %}}}{% endraw %}';
$config[StorageConstants::STORAGE_REDIS_PORT] = 6379;
$config[StorageConstants::STORAGE_REDIS_DATABASE] = 0;

$config[SessionConstants::YVES_SESSION_REDIS_PROTOCOL] = 'redis';
$config[SessionConstants::YVES_SESSION_REDIS_HOST] = '{% raw %}{{{% endraw %}ELASTICACHE_ENDPOINT{% raw %}}}{% endraw %}';
$config[SessionConstants::YVES_SESSION_REDIS_PORT] = 6379;
$config[SessionConstants::YVES_SESSION_REDIS_DATABASE] = 1;

$config[SessionConstants::ZED_SESSION_REDIS_PROTOCOL] = 'redis';
$config[SessionConstants::ZED_SESSION_REDIS_HOST] = '{% raw %}{{{% endraw %}ELASTICACHE_ENDPOINT{% raw %}}}{% endraw %}';
$config[SessionConstants::ZED_SESSION_REDIS_PORT] = 6379;
$config[SessionConstants::ZED_SESSION_REDIS_DATABASE] = 2;

/** RabbitMQ **/
$config[RabbitMqEnv::RABBITMQ_API_HOST] = '{% raw %}{{{% endraw %}EC2_INSTANCE_HOSTNAME OR 127.0.0.1{% raw %}}}{% endraw %}';
$config[RabbitMqEnv::RABBITMQ_API_PORT] = '15672';
$config[RabbitMqEnv::RABBITMQ_API_USERNAME] = '{% raw %}{{{% endraw %}RABBITMQ_USERNAME{% raw %}}}{% endraw %}';
$config[RabbitMqEnv::RABBITMQ_API_PASSWORD] = '{% raw %}{{{% endraw %}RABBITMQ_PASSWORD{% raw %}}}{% endraw %}';
$config[RabbitMqEnv::RABBITMQ_API_VIRTUAL_HOST] = '/spryker';
$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [
'DE' => [
RabbitMqEnv::RABBITMQ_CONNECTION_NAME => 'DE-connection',
RabbitMqEnv::RABBITMQ_HOST => '{% raw %}{{{% endraw %}EC2_INSTANCE_HOSTNAME OR 127.0.0.1{% raw %}}}{% endraw %}',
RabbitMqEnv::RABBITMQ_PORT => '5672',
RabbitMqEnv::RABBITMQ_PASSWORD => '{% raw %}{{{% endraw %}RABBITMQ_PASSWORD{% raw %}}}{% endraw %}',
RabbitMqEnv::RABBITMQ_USERNAME => '{% raw %}{{{% endraw %}RABBITMQ_USERNAME{% raw %}}}{% endraw %}',
RabbitMqEnv::RABBITMQ_VIRTUAL_HOST => '/spryker',
RabbitMqEnv::RABBITMQ_STORE_NAMES => ['DE'],
RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION => true,
],
];

/** Jenkins **/
$config[SetupConstants::JENKINS_BASE_URL] = 'http://' . '{% raw %}{{{% endraw %}EC2_INSTANCE_HOSTNAME OR 127.0.0.1{% raw %}}}{% endraw %}' . ':' . 8080 . '/';
$config[SetupConstants::JENKINS_CSRF_PROTECTION_ENABLED] = true;
$config[LogConstants::LOG_LEVEL] = Logger::ERROR;

// ----------- Glue Application
$config[GlueApplicationConstants::GLUE_APPLICATION_DOMAIN] = sprintf('%s', '{% raw %}{{{% endraw %}GLUE_DNS_NAME{% raw %}}}{% endraw %}')
```

```
composer global require hirak/prestissimo
composer install
```
4. Update the following variables in `/data/config/Shared/config_default.php`:

```
$config[StorageRedisConstants::STORAGE_REDIS_HOST] = '{% raw %}{{{% endraw %} REDIS_ENDPOINT {% raw %}}}{% endraw %}';
$config[StorageRedisConstants::STORAGE_REDIS_PORT] = {% raw %}{{{% endraw %} REDIS_PORT {% raw %}}}{% endraw %};
```
5. Add Jenkins `Max # of builds to keep` configuration by updating the  `<numToKeep>-1</numToKeep>` parameter in `/data/vendor/spryker/setup/src/Spryker/Zed/Setup/Business/Model/Cronjobs.php` to the desired one. For example, if you wanted to keep 100 items in the Jenkins history, you would change the parameter from -1 to 100 to look this way: `<numToKeep>100</numToKeep>`
6. Create the following file:

**/data/config/install/staging.yml**

```
env:
APPLICATION_ENV: staging

stores:
- DE

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


# clear:
# remove-logs:
# command: "vendor/bin/console log:clear"
#
# remove-cache:
# command: "vendor/bin/console cache:empty-all"

# remove-generated-files:
# command: "vendor/bin/console setup:empty-generated-directory"


jenkins-down:
jenkins-stop:
command: "vendor/bin/console setup:jenkins:disable"


generate:
generate-transfers:
command: "vendor/bin/console transfer:generate"

# generate-ide-auto-completion:
# command: "vendor/bin/console dev:ide:generate-auto-completion"


cache:
twig-cache-warmup:
command: "vendor/bin/console twig:cache:warmer"

navigation-cache-warmup:
command: "vendor/bin/console navigation:build-cache"


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

# drop-database:
# pre: "hidden/maintenance-zed-on"
# command: "vendor/bin/console propel:database:drop"
# stores: true
# groups:
# - propel

delete-migration-files:
command: "vendor/bin/console propel:migration:delete"
stores: true
groups:
- propel


database-migrate:
propel-config:
command: "vendor/bin/console propel:config:convert"
stores: true
groups:
- propel

propel-create:
command: "vendor/bin/console propel:database:create"
stores: true
groups:
- propel

propel-postgres-compatibility:
command: "vendor/bin/console propel:pg-sql-compat"
stores: true
groups:
- propel

propel-copy-schema:
command: "vendor/bin/console propel:schema:copy"
stores: true
groups:
- propel

propel-build:
command: "vendor/bin/console propel:model:build"
groups:
- propel

propel-diff:
command: "vendor/bin/console propel:diff"
stores: true
groups:
- propel

propel-migration-check:
command: "vendor/bin/console propel:migration:check"
breakOnFailure: false
stores: true
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
stores: true
groups:
- propel

maintenance-page-disable:
command: "vendor/bin/console maintenance:disable"
stores: true

generate-entity-transfer:
command: "vendor/bin/console transfer:generate"

init-database:
command: "vendor/bin/console setup:init-db"
stores: true

setup-search:
command: "vendor/bin/console setup:search"
stores: true
groups:
- elastic

demodata:
import:
command: "vendor/bin/console data:import"
stores: true

update-product-labels:
command: "vendor/bin/console product-label:relations:update"
stores: true


jenkins-up:
jenkins-generate:
command: "vendor/bin/console setup:jenkins:generate"

jenkins-enable:
command: "vendor/bin/console setup:jenkins:enable"


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
7. Set environment variables:

```
export PGPASSWORD={% raw %}{{{% endraw %}RDS_PASSWORD{% raw %}}}{% endraw %}
export APPLICATION_STORE=DE
export APPLICATION_ENV=staging
```

8. Run the install command:

```
vendor/bin/install -vvv
```
9. Change owner of the folder:

```
chown -R www-data:www-data /data
```

{% info_block errorBox "your title goes here" %}
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

## AWS services setup validation

### RDS latency check

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

#### Redis latency check

```
redis-cli --latency -h {% raw %}{{{% endraw %}ELASTICACHE_ENDPOINT{% raw %}}}{% endraw %} -p 6379
```

{% info_block infoBox "Benchmark result examples:" %}
avg: 0.48 (20038 samples
{% endinfo_block %} - cache.t2.micro </br>avg: 0.31 (20047 samples) - cache.t2.medium)

## List of connection

![List of connections](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/Spryker+AWS+Installation/connections-list.jpg){height="" width=""}
