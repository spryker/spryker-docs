---
title: Getting Started with Docker
originalLink: https://documentation.spryker.com/v3/docs/getting-started-with-docker-201907
redirect_from:
  - /v3/docs/getting-started-with-docker-201907
  - /v3/docs/en/getting-started-with-docker-201907
---

This document provides instructions on installing Spryker in Docker environment.

{% info_block errorBox %}
When working with Windows, use absolute paths while running commands. For example: `mkdir /d/spryker && cd $_` or `mkdir /c/Users/spryker && cd $_`.
{% endinfo_block %}

## Demo Mode

1. Open a terminal.
{% info_block infoBox %}
In case you are going to run the script on Windows, open Ubuntu (For more details, see the *Install Docker Desktop* section in [Docker Install Prerequisites - Windows](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/docker-install-prerequisites/docker-install-
{% endinfo_block %}.))
2. Create a new folder and navigate into this folder.
3. Depending on the desired shop type:

a. Clone the B2C repository:

```shell
git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 201907.0 --single-branch ./
```

b. Clone the  B2B repository:

```shell
git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 201907.0 --single-branch ./
```
4. Clone the docker repository:
```shell
git clone git@github.com:spryker/docker-sdk.git -b 1.2.2 --single-branch docker
```
{% info_block warningBox %}
Make sure `docker 18.09.1+` and `docker-compose 1.23+` are installed.
{% endinfo_block %}
5. Bootstrap local docker setup for demo:
```shell
docker/sdk bootstrap
```
6. Once the job finishes, build and start the instance:
```shell
docker/sdk up
```
7. Update the `hosts` file:

  - Linux/MacOS:
```shell
echo "127.0.0.1 zed.de.demo-spryker.com yves.de.demo-spryker.com glue.de.demo-spryker.com zed.at.demo-spryker.com yves.at.demo-spryker.com glue.at.demo-spryker.com zed.us.demo-spryker.com yves.us.demo-spryker.com glue.us.demo-spryker.com mail.demo-spryker.com scheduler.demo-spryker.com queue.demo-spryker.com" | sudo tee -a /etc/hosts
```

{% info_block infoBox %}
If needed, add corresponding entries for other stores. For example, if you are going to have a US store, add the following entries: `zed.us.demo-spryker.com glue.us.demo-spryker.com yves.us.demo-spryker`
{% endinfo_block %}
  - Windows:
    1. Click **Start** → **Search** and type "Notepad".
    2. Right-click **Notepad** and select the **Run as administrator option**.
    3. In the **User Account Control** window click **Yes** to confirm the action.
    4. In the upper navigation panel, select **File** → **Open**.
    5. Put the following path into the address line: `C:\Windows\System32\drivers\etc`
    6. In the **File name** line, enter "hosts" and click **Open**.
The hosts file is opened in the drop-down.
    7. Add the following line into the file:
`127.0.0.1   zed.de.demo-spryker.com glue.de.demo-spryker.com yves.de.demo-spryker.com scheduler.demo-spryker.com mail.demo-spryker.com queue.demo-spryker.com`
    {% info_block infoBox %}
If needed, add corresponding entries for other stores. For example, if you are going to have a US store, add the following entries: `zed.us.demo-spryker.com glue.us.demo-spryker.com yves.us.demo-spryker.com`
{% endinfo_block %}
    8. Click **File** → **Save**.
    9. Close the file.


{% info_block warningBox %}
Depending on the hardware performance, the first project launch can take up to 20 minutes.
{% endinfo_block %}


 ## Development Mode

1. Open a terminal.
{% info_block infoBox %}
In case you are going to run the script on Windows, open Ubuntu (For more details, see the *Install Docker Desktop* section in [Docker Install Prerequisites - Windows](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/docker-install-prerequisites/docker-install-
{% endinfo_block %}.))
2. Create a new folder and navigate into this folder.
3. Depending on the desired shop type:
   
a. Clone the B2C repository:

```shell
git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 201907.0 --single-branch ./
```

b. Clone the  B2B repository:

```shell
git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 201907.0 --single-branch ./
```

4. Clone the docker repository:
```shell
git clone git@github.com:spryker/docker-sdk.git -b 1.2.2 --single-branch docker
```
{% info_block warningBox %}
Make sure `docker 18.09.1+` and `docker-compose 1.23+` are installed.
{% endinfo_block %}
5. Bootstrap local docker setup:
```shell
docker/sdk bootstrap deploy.dev.yml
```
6. Once the job finishes, build and start the instance:
```shell
docker/sdk up
```
7. Update the `hosts` file:

  - Linux/MacOS:				
```shell
echo "127.0.0.1 zed.de.demo-spryker.com yves.de.demo-spryker.com glue.de.demo-spryker.com zed.at.demo-spryker.com yves.at.demo-spryker.com glue.at.demo-spryker.com zed.us.demo-spryker.com yves.us.demo-spryker.com glue.us.demo-spryker.com mail.demo-spryker.com scheduler.demo-spryker.com queue.demo-spryker.com" | sudo tee -a /etc/hosts
```
{% info_block infoBox %}
If needed, add corresponding entries for other stores. For example, if you are going to have a US store, add the following entries: `zed.us.demo-spryker.com glue.us.demo-spryker.com yves.us.demo-spryker`
{% endinfo_block %}
  - Windows:
    1. Click **Start** → **Search** and type "Notepad".
    2. Right-click **Notepad** and select the **Run as administrator option**.
    3. In the **User Account Control** window click **Yes** to confirm the action.
    4. In the upper navigation panel, select **File** → **Open**.
    5. Put the following path into the address line: `C:\Windows\System32\drivers\etc`
    6. In the **File name** line, enter "hosts" and click **Open**.
The hosts file is opened in the drop-down.
    7. Add the following line into the file:
	`127.0.0.1   zed.de.demo-spryker.com glue.de.demo-spryker.com yves.de.demo-spryker.com scheduler.demo-spryker.com mail.demo-spryker.com queue.demo-spryker.com`
    {% info_block infoBox %}
If needed, add corresponding entries for other stores. For example, if you are going to have a US store, add the following entries: `zed.us.demo-spryker.com glue.us.demo-spryker.com yves.us.demo-spryker.com`
{% endinfo_block %}
    8. Click **File** → **Save**.
    9. Close the file.


{% info_block warningBox %}
Depending on the hardware performance, the first project launch can take up to 20 minutes.
{% endinfo_block %}

Learn more about development mode in [Spryker in Docker - Development Mode](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/spryker-in-dock).

## SSL Mode

1. Set the value of `docker: ssl: enable:` property to true in `deploy.yml` (or `deploy.dev.yml` if needed).
```yaml
...
docker:
    ssl:
        enabled: true
...
```

2. Apply the changes:
```shell
docker/sdk bootstrap deploy.yml
```
{% info_block warningBox %}
Make sure to use the name of the file from step 1.
{% endinfo_block %}

3. Run the script to build and restart containers with SSL settings.
```shell
docker/sdk up
```

While running the script, you should see the following output:

```yaml
Generating a RSA private key
....................................................+++++
..............+++++
writing new private key to '/certs/spryker_ssl.key'
-----
Signature ok
subject=C = DE, ST = Berlin, L = Berlin, OU = Spryker, O = Spryker, CN = Spryker
Getting CA Private Key
Checking chain
/certs/spryker_ssl.crt: OK
```

4. In the meanwhile, if you haven't installed the CA certificate, take `spryker.crt` from `/docker/deployment/default/` and follow the instructions in [HowTo - Install Self-Signed SSL Certificates ](https://documentation.spryker.com/v3/docs/ht-install-self-signed-ssl-certificates-201907).

## Using MySQL instead of PostgreSQL

1. Set the value of `services:database:engine:` property to `mysql` in `deploy.yml` (or `deploy.dev.yml` if needed).

```php
...
services:
    database:
        engine: mysql
...
```

2. Apply the changes:
```shell
docker/sdk bootstrap deploy.yml
```
{% info_block infoBox %}
Make sure to use the name of the file from step 1.
{% endinfo_block %}

3. Run the script to build and restart containers with MySQL settings:
```
shelldocker/sdk up
```

## Endpoints

{% info_block warningBox %}
To ensure that the installation is successful, make sure you can open the following endpoints:
{% endinfo_block %}

* yves.de.demo-spryker.com, yves.at.demo-spryker.com, yves.us.demo-spryker.com - Shop UI (*storefront*)
* zed.de.demo-spryker.com, zed.at.demo-spryker.com, zed.us.demo-spryker.com - Back-office UI (*administration interface*)
* glue.de.demo-spryker.com, glue.at.demo-spryker.com, glue.us.demo-spryker.com - API endpoint
* scheduler.demo-spryker.com - Jenkins
* queue.demo-spryker.com - RabbitMQ UI (*queue*).
{% info_block infoBox %}
Use "spryker" as a username and "secret" as a password. They are defined in your `deploy.yml`.
{% endinfo_block %}
* mail.demo-spryker.com - Mailhog UI (*email catcher*)

## Useful Commands

{% info_block infoBox %}
Run the `docker/sdk help` command to get the full and up-to-date list of commands.
{% endinfo_block %}

The following commands are used to manage Docker-based Spryker applications:

1. `boot` - Initialize docker setup for the project. Aliases: `bootstrap`
2. `build` - Build Spryker images.
3. `clean` - Stop containers, and remove all Spryker images and volumes. Aliases: `remove`.
4. `clean-data` - Remove all Spryker volumes including all storages.
5. `cli` - Start a new container where you can run cli commands.
6. `cli <command>` - Run a cli command, e.g. `docker/sdk cli composer install`.
7. `console` - Run a Spryker console command, e.g. `docker/sdk console code:test -vvv -g Acceptance`.
8. `codecept` - Start a new container where you can run Codeception commands in the test environment.
9. `code-checks` - Run code checks.
10. `demo-data` - Populate Spryker demo data. Aliases: `demo`
11. `down` - Stop all Spryker containers. Aliases: `stop`.
12. `help` - Show help page.
13. `jobs` - Generate and start jobs.
14. `logs` - Tail all application exception logs.
15. `pull` - Pull external docker images.
16. `reset` - Remove and build all Spryker images and volumes.
17. `restart` - Restart Spryker containers.
18. `run` - Run Spryker containers. Aliases:  `start`.
19. `testing` - Start a new container where you can run cli commands in testing environment, e.g. `codecept build`.
20. `testing <command>` - Run a cli command in testing environment, e.g. `docker/sdk codecept codecept build`.
21. `up` - Build and run Spryker apps based on demo data.
22. `wait` - Wait for requested services, e.g. `docker/sdk wait database broker`.

Arguments:

* `-v` - Enable verbose mode.
You can set the environment variable `VERBOSE=1` instead of using this option.
* `-x` - Enable Xdebug.
You can set the environment variable `SPRYKER_XDEBUG_ENABLE=1` instead of using this option.
* `-t` - Enable testing mode.
You can set environment variable `SPRYKER_TESTING_ENABLE=1` instead of using this option.

<!-- Last review date: Aug 06, 2019by Mike Kalinin, Andrii Tserkovnyi -->
