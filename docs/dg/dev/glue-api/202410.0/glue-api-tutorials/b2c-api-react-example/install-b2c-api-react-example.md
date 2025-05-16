---
title: Install B2C API React example
description: This document describes how to install B2C API Demo Shop to experience the use of Spryker Glue REST API.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/b2c-api-react-example-installation
originalArticleId: 6d6a1bec-4ae4-4f93-b406-2d0d24bd8988
redirect_from:
  - /docs/scos/dev/glue-api-guides/202404.0/glue-api-tutorials/b2c-api-react-example/install-b2c-api-react-example.html
  - /docs/scos/dev/tutorials-and-howtos/advanced-tutorials/glue-api/b2c-api-react-example/b2c-api-react-example-installation.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-api-tutorials/b2c-api-react-example/install-b2c-api-react-example.html
related:
  - title: B2C API React example
    link: docs/dg/dev/glue-api/page.version/glue-api-tutorials/b2c-api-react-example/b2c-api-react-example.html
---

The B2C API React example can be installed inside [Spryker Development Virtual Machine](/docs/scos/dev/sdk/development-virtual-machine-docker-containers-and-console.html) (VM) or on a separate dedicated server. To perform both installation scenarios, take the following steps.

{% info_block infoBox %}

Using a virtual machine ensures a faster deployment as the VM already has all the necessary components installed.

{% endinfo_block %}

{% info_block errorBox %}

The example application is provided only for display purposes and must under no circumstances be used as a starting point for any project.

{% endinfo_block %}

## Install on a dedicated server

To install the app on a dedicated web server, follow these steps:

1. Make sure that you have Spryker Glue REST API [installed and working](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html).

2. Make sure that the following prerequisites are installed on the [Node 8.9.3](https://nodejs.org/en/) server or newer.

3. Add the following entries to the `hosts` file of the server:

```text
<Glue_IP> glue.de.project-name.local
127.0.0.1 react.local
```

where:

- `<Glue_IP>`—the IP of the Glue REST API server.
- `glue.de.project-name.local`—the local hostname of the Glue REST AP server.
- `react.local`—the local hostname of the B2C API React Example application.

4. Clone the B2C API React Example repository:

```bash
git clone https://github.com/spryker-shop/b2c-api-react-example
```

5. Open the `local_outside_vm.env` file for editing.
6. Change the `DEV_SERVER_HOST` variable to point to the example app hostname—for example, `react.local`—and the `API_URL` variable to point to the local hostname of the Glue REST API server. Also, you can change the example app page title. It is specified using the `APP_TITLE` variable.
The sample `local_outside_vm.env` file implementation is as follows:

```
NODE_ENV=development
DEV_SERVER_HOST=localhost
DEV_SERVER_PORT=3000
WEB_PORT=3000
WEB_PATH="/"
API_URL="`https://glue.mysprykershop.com`"
APP_TITLE=Spryker API React Example
```

7. Save the changes and close the file.

8. Install `npm cpy` globally:

```bash
npm install --global cpy-cli
```

9. Build and run the application:

```bash
npm i
npm run dist
npm run serve:local
```

10. Check that the example application is available at the following URL: `http://react.local`
11. To stop the app, press <kbd>Ctrl+C</kbd>. To start it again, run `npm run serve:local`.
