---
title: B2C API React Example Installation
description: This article describes installation of B2C API Demo Shop to experience the use of Spryker Glue REST API.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/b2c-api-react-example-installation
originalArticleId: 6d6a1bec-4ae4-4f93-b406-2d0d24bd8988
redirect_from:
  - /2021080/docs/b2c-api-react-example-installation
  - /2021080/docs/en/b2c-api-react-example-installation
  - /docs/b2c-api-react-example-installation
  - /docs/en/b2c-api-react-example-installation
  - /v6/docs/b2c-api-react-example-installation
  - /v6/docs/en/b2c-api-react-example-installation
  - /v5/docs/b2c-api-react-example-installation
  - /v5/docs/en/b2c-api-react-example-installation
  - /v4/docs/b2c-api-react-example-installation
  - /v4/docs/en/b2c-api-react-example-installation
  - /v3/docs/b2c-api-react-example-installation
  - /v3/docs/en/b2c-api-react-example-installation
  - /v2/docs/b2c-api-react-example-installation
  - /v2/docs/en/b2c-api-react-example-installation
  - /v1/docs/b2c-api-react-example-installation
  - /v1/docs/en/b2c-api-react-example-installation
---

B2C API React Example can be installed inside [Spryker Development Virtual Machine](/docs/scos/dev/sdk/development-virtual-machine-docker-containers-and-console.html) (VM) or on a separate dedicated server. Below, you will find detailed steps on how to perform both the installation scenarios.

{% info_block infoBox %}
Installation inside the VM ensures quicker roll out as the VM has all the required components installed.
{% endinfo_block %}

{% info_block errorBox %}
The example application is provided for display purposes only and should not under any circumstances be used as a starting point for any project.
{% endinfo_block %}

## Installation Inside the Development Virtual Machine

To perform the app installation on the VM:

1. Make sure that you have Spryker Glue REST API [installed and working](/docs/scos/dev/feature-integration-guides/{{site.version}}/glue-api/glue-api-installation-and-configuration.html).
2. Log in to the VM. For this purpose, execute the following command on the host where the VM runs:
`vagrant ssh`
3. After logging in to the VM, the current directory will be the folder where your Spryker project is installed, which is /data/shop/development/current by default. Go one directory up. To do this, execute the following command:
`cd ..`
4. Prepare a folder where the example app will be installed. For example, if you want to place it in folder `api-rest-example`, execute the following

```
commands:sudo mkdir api-rest-example
cd api-rest-example
sudo chown vagrant:vagrant .
sudo chmod og+rwx .
```

5. Clone the B2C API React Example repository:
`git clone https://github.com/spryker-shop/b2c-api-react-example .`

6. Open the `local_inside_vm.env` file for editing.
7. Change the `DEV_SERVER_HOST` variable to point to the Glue host. For example, if your project name is `b2c-demo-shop`, the host address will be `glue.de.b2c-demo-shop.local`. Also, you can change the example app page title. It is specified via the `APP_TITLE` variable.
Sample local_inside_vm.env file implementation for a VM running B2C Demo Shop:
    ```
    NODE_ENV=development
    DEV_SERVER_HOST=glue.de.b2c-demo-shop.local
    DEV_SERVER_PORT=3000
    WEB_PORT=3000
    WEB_PATH="/react/"
    API_URL="/"
    APP_TITLE=Spryker API React Example
    ```
    When done, save the changes and close the file.

8. Install `npm cpy` globally:
`sudo npm install --global cpy-cli`
9. Open the Nginx configuration file for the Glue vhost:
`sudo nano /etc/nginx/sites-available/DE_development_glue`
10. Add a new **location** block as follows:

    ```
    location /react/ {
        proxy_pass `http://glue.de.b2c-demo-shop.local`:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    ```

    where `proxy_pass` specifies the host and port where the B2C API React Example will run. The value must match the values of `DEV_SERVER_HOST` and `DEV_SERVER_PORT` of the `local_inside_vm.env` file you edited on step **7**.
**Sample vhost implementation for a VM running B2C Demo Shop**

    ```php
    server {
        # Listener for production/staging - requires external LoadBalancer directi$
        listen 10002;

        # Listener for testing/development - one host only, doesn't require extern$
        listen 80;

        server_name ~^glue\\.de\\..+\\.local$;

        keepalive_timeout 0;
        access_log  /data/logs/development/glue-access.log extended;

        root /data/shop/development/current/public/Glue;

        set $application_env development;
        set $application_store DE;
        include "spryker/glue.conf";
        location /react/ {
            proxy_pass `http://glue.de.b2c-demo-shop.local`:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
    ```

    When done, save the changes and close the file.

11.  Restart the nginx service:

```
sudo /etc/init.d/nginx restart`
```

12. Build and run the application:

```
npm i
npm run dist
npm run serve:vm
```

13. Check that the example application is available at the following URL: `http://glue.de.b2c-demo-shop.local/react/`, where `glue.de.b2c-demo-shop.local` is the host name you specified in the `local_inside_vm.env` file.
14. To stop the app, press Ctrl+C. To start it again, run:
```
npm run serve:vm
```

## Installation on a Dedicated Server
To perform the app installation on a dedicated web server:

1. Make sure that you have Spryker Glue REST API [installed and working](/docs/scos/dev/feature-integration-guides/{{site.version}}/glue-api/glue-api-installation-and-configuration.html).

2. Make sure that the following prerequisites are installed on the server:
    * [Node 8.9.3](https://nodejs.org/en/) or newer.

3. Add the following entries to the **hosts** file of the server

```text
<Glue_IP> glue.de.project-name.local
127.0.0.1 react.local
```

where:

* **<Glue_IP>** - the IP of the Glue REST API server;
* **glue.de.project-name.local** - the local hostname of the Glue REST AP   server;
* **react.local** - the local hostname of the B2C API React Exampl    application.

4. Clone the B2C API React Example repository:

```
git clone https://github.com/spryker-shop/b2c-api-react-example .
```

5. Open the `local_outside_vm.env` file for editing.
6. Change the `DEV_SERVER_HOST` variable to point to the example app hostname, for example, `react.local`, and the `API_URL` variable to point to the local hostname of the Glue REST API server. Also, you can change the example app page title. It is specified via the `APP_TITLE` variable.
Sample `local_outside_vm.env` file implementation:

    ```
    NODE_ENV=development
    DEV_SERVER_HOST=localhost
    DEV_SERVER_PORT=3000
    WEB_PORT=3000
    WEB_PATH="/"
    API_URL="`https://glue.mysprykershop.com`"
    APP_TITLE=Spryker API React Example
    ```

    When done, save the changes and close the file.

7. Install npm cpy globally:

```
npm install --global cpy-cli
```
8. Build and run the application:

```
npm i
npm run dist
npm run serve:local
```
9. Check that the example application is available at the following URL: `http://react.local`
10. To stop the app, press Ctrl+C. To start it again, run:

```
npm run serve:local
```
