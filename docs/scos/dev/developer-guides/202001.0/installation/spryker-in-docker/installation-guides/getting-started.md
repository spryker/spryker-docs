---
title: Getting Started with Docker Old
originalLink: https://documentation.spryker.com/v4/docs/getting-started-with-docker-old
redirect_from:
  - /v4/docs/getting-started-with-docker-old
  - /v4/docs/en/getting-started-with-docker-old
---

This document provides instructions on installing Spryker in Docker environment.

{% info_block errorBox %}
When working with Windows, use absolute paths while running commands. For example: `mkdir /d/spryker && cd $_` or `mkdir /c/Users/spryker && cd $_`.
{% endinfo_block %}

## Demo Mode

1. Open a terminal.
{% info_block infoBox %}
In case you are going to run the script on Windows, open Ubuntu (For more details, see the *Install Docker Desktop* section in [Docker Install Prerequisites - Windows](https://documentation.spryker.com/v4/docs/docker-install-prerequisites-windows
{% endinfo_block %}.))
2. Create a new folder and navigate into this folder.
3. Depending on the desired shop type:

a. Clone the B2C repository:

```shell
git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202001.0 --single-branch ./
```

b. Clone the  B2B repository:

```shell
git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202001.0 --single-branch ./
```
4. Clone the docker repository:
```shell
git clone git@github.com:spryker/docker-sdk.git -b 1.6.3 --single-branch docker
```
{% info_block warningBox %}
Make sure `docker 18.09.1+` and `docker-compose 1.23+` are installed.
{% endinfo_block %}
5. Bootstrap local docker setup for demo:
```shell
docker/sdk bootstrap
```

 
{% info_block warningBox "Bootstrap" %}

Once you finish the setup, you don't need to run `bootstrap` to start the instance. You only need to run it after:
* Docker SDK version update;
* Deploy file update.

{% endinfo_block %}
6. Once the job finishes, build and start the instance:
```shell
docker/sdk up
```
7. Update the `hosts` file:

  - Linux/MacOS:
```shell
echo "127.0.0.1 zed.de.spryker.local yves.de.spryker.local glue.de.spryker.local zed.at.spryker.local yves.at.spryker.local glue.at.spryker.local zed.us.spryker.local yves.us.spryker.local glue.us.spryker.local mail.spryker.local scheduler.spryker.local queue.spryker.local" | sudo tee -a /etc/hosts
```

{% info_block infoBox %}
If needed, add corresponding entries for other stores. For example, if you are going to have a US store, add the following entries: `zed.us.spryker.local glue.us.spryker.local yves.us.demo-spryker`
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
`127.0.0.1   zed.de.spryker.local glue.de.spryker.local yves.de.spryker.local scheduler.spryker.local mail.spryker.local queue.spryker.local`
    {% info_block infoBox %}
If needed, add corresponding entries for other stores. For example, if you are going to have a US store, add the following entries: `zed.us.spryker.local glue.us.spryker.local yves.us.spryker.local`
{% endinfo_block %}
    8. Click **File** → **Save**.
    9. Close the file.


{% info_block warningBox %}
Depending on the hardware performance, the first project launch can take up to 20 minutes.
{% endinfo_block %}


 ## Development Mode

1. Open a terminal.
{% info_block infoBox %}
In case you are going to run the script on Windows, open Ubuntu (For more details, see the *Install Docker Desktop* section in [Docker Install Prerequisites - Windows](https://documentation.spryker.com/v4/docs/docker-install-prerequisites-windows
{% endinfo_block %}.))
2. Create a new folder and navigate into this folder.
3. Depending on the desired shop type:
   
a. Clone the B2C repository:

```shell
git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202001.0 --single-branch ./
```

b. Clone the  B2B repository:

```shell
git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202001.0 --single-branch ./
```

4. Clone the docker repository:
```shell
git clone git@github.com:spryker/docker-sdk.git -b 1.6.3 --single-branch docker
```
{% info_block warningBox %}
Make sure `docker 18.09.1+` and `docker-compose 1.23+` are installed.
{% endinfo_block %}
5. Bootstrap local docker setup:
```shell
docker/sdk bootstrap deploy.dev.yml
```
{% info_block warningBox "Bootstrap" %}

Once you finish the setup, you don't need to run `bootstrap` to start the instance. You only need to run it after:
* Docker SDK version update;
* Deploy file update.

{% endinfo_block %}
6. Once the job finishes, build and start the instance:
```shell
docker/sdk up
```
7. Update the `hosts` file:

  - Linux/MacOS:				
```shell
echo "127.0.0.1 zed.de.spryker.local yves.de.spryker.local glue.de.spryker.local zed.at.spryker.local yves.at.spryker.local glue.at.spryker.local zed.us.spryker.local yves.us.spryker.local glue.us.spryker.local mail.spryker.local scheduler.spryker.local queue.spryker.local" | sudo tee -a /etc/hosts
```
{% info_block infoBox %}
If needed, add corresponding entries for other stores. For example, if you are going to have a US store, add the following entries: `zed.us.spryker.local glue.us.spryker.local yves.us.demo-spryker`
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
	`127.0.0.1   zed.de.spryker.local glue.de.spryker.local yves.de.spryker.local scheduler.spryker.local mail.spryker.local queue.spryker.local`
    {% info_block infoBox %}
If needed, add corresponding entries for other stores. For example, if you are going to have a US store, add the following entries: `zed.us.spryker.local glue.us.spryker.local yves.us.spryker.local`
{% endinfo_block %}
    8. Click **File** → **Save**.
    9. Close the file.


{% info_block warningBox %}
Depending on the hardware performance, the first project launch can take up to 20 minutes.
{% endinfo_block %}

Learn more about development mode in [Spryker in Docker - Development Mode](https://documentation.spryker.com/v4/docs/development-mode).

## Running Production
Currently, there are no particular instructions on deploying Spryker in Docker in a production environment. This section describes how to generate the images suitable for a production environment and the archives with assets for each application (Yves, Zed and Glue). After going through all the steps, it's up to you how to proceed further.

{% info_block infoBox "Info" %}
This functionality is available in Docker SDK starting from version 1.7.2.
{% endinfo_block %}

1. Clone or update the Docker SDK repository to version 1.7.2. 

```
git clone https://github.com/spryker/docker-sdk.git -b 1.7.2 --single-branch docker
```

2. Bootstrap docker setup:

```
docker/sdk bootstrap
```
{% info_block warningBox "Bootstrap" %}

Once you finish the setup, you don't need to run `bootstrap` to start the instance. You only need to run it after:
* Docker SDK version update;
* Deploy file update.

{% endinfo_block %}
3. Run the command to generate docker images for each application:

```
docker/sdk export images [tag]
```

* The `[tag]` argument is an alphanumerical value used for patching the images. The value will be added to the name of each generated image.
* After running the command, you will see the list of created images in the output.

4. Run the command to generate archives with assets for each application:

```
docker/sdk export assets [tag] [path]
```

* The `[tag]` argument is an alphanumerical value used for patching the archives. The value will be added to the name of each generated archive.
* The `[path]` argument defines the folder into which the generated archives are placed.
* After running the command, you will see the list of created archives in the output.





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
```shell
docker/sdk up
```

## Endpoints

{% info_block warningBox %}
To ensure that the installation is successful, make sure you can open the following endpoints:
{% endinfo_block %}

* yves.de.spryker.local, yves.at.spryker.local, yves.us.spryker.local - Shop UI (*Storefront*)
* zed.de.spryker.local, zed.at.spryker.local, zed.us.spryker.local - Back-office UI (*the Back Office*)
* glue.de.spryker.local, glue.at.spryker.local, glue.us.spryker.local - API endpoint
* scheduler.spryker.local - Jenkins
* queue.spryker.local - RabbitMQ UI (*queue*).
{% info_block infoBox %}
Use "spryker" as a username and "secret" as a password. They are defined in your `deploy.yml`.
{% endinfo_block %}
* mail.spryker.local - Mailhog UI (*email catcher*)


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

<!-- Last review date: Jan 06, 2020 by Dmytro Mykhailov, Andrii Tserkovnyi -->

