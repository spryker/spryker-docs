---
title: 'Quick installation guide: Mac OS and Linux'
description: Get started with Spryker using Docker on Mac OS and Linux
last_updated: Sep 8, 2022
template: howto-guide-template
---
To install Spryker on Mac OS or Linux, follow these steps:

## 1. Clone the Demo Shop of your choice

- B2B Demo Shop:

```shell
git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202204.0-p1 --single-branch ./b2b-demo-shop
```

- B2C Demo Shop:

```shell
git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202204.0-p1 --single-branch ./b2c-demo-shop
```

- B2B Marketplace Demo Shop:

```shell
git clone https://github.com/spryker-shop/b2b-demo-marketplace.git -b 202204.0-p1 --single-branch ./b2b-demo-marketplace
```

- B2C Marketplace Demo Shop:

```shell
git clone https://github.com/spryker-shop/b2c-demo-marketplace.git -b 202204.0-p1 --single-branch ./b2c-demo-marketplace
```

## 2. Go to the newly created folder

```shell
cd <new-folder-name>
```

## 3. Clone the Docker SDK repository into the same folder

```shell
git clone https://github.com/spryker/docker-sdk.git --single-branch docker
```

## 4. Bootstrap the local Docker environment

1. Run the following command:

```shell
docker/sdk bootstrap deploy.dev.yml
```

{% info_block infoBox "Info" %}

If you do not need to build Spryker with development tools and file synchronization, run the following command:

```shell
docker/sdk bootstrap
```
This mode is better suited to showcase Spryker features.

{% endinfo_block %}

2. Update the host file `/etc/hosts` with the command that the `docker/sdk bootstrap` command displays.

## 5. Build and start your local instance

```shell
docker/sdk up
```

## 6. Open your new Spryker project in the browser

* Storefront: `yves.de.spryker.local`
* Back Office: `backoffice.de.spryker.local`
* Frontend API: `glue-storefront.de.spryker.local` and its schema `swagger.spryker.local`

{% info_block infoBox "Info" %}

If you see `.de.` in your URL, it means that this application is store-specific. By default, Spryker comes with three stores: *de*, *at*, and *us*.

{% endinfo_block %}

If you need more details about the installation, see the detailed installation guides:
- [Installing in Development mode on MacOS and Linux](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-development-mode-on-macos-and-linux.html)
- [Installing in Demo mode on MacOS and Linux](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-demo-mode-on-macos-and-linux.html)