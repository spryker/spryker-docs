---
title: Install Spryker on Linux
description: Get started with Spryker via Docker on Linux
last_updated: Jul 5, 2022
template: concept-topic-template
---

## 1. Clone the demo shop of your choice

**B2B Demo Shop**

```shell
git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202204.0-p1 --single-branch ./b2b-demo-shop
```

**B2C Demo Shop**

```shell
git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202204.0-p1 --single-branch ./b2c-demo-shop
```

**B2B Marketplace Demo Shop**

```shell
git clone https://github.com/spryker-shop/b2b-demo-marketplace.git -b 202204.0-p1 --single-branch ./b2b-demo-marketplace
```

**B2C Marketplace Demo Shop**

```shell
git clone https://github.com/spryker-shop/b2c-demo-marketplace.git -b 202204.0-p1 --single-branch ./b2c-demo-marketplace
```

## 2. Navigate to the newly created folder

```shell
cd <new-folder-name>
```

## 3. Clone the Docker SDK repository into the same folder

```shell
git clone https://github.com/spryker/docker-sdk.git --single-branch docker
```

## 4. Bootstrap the local Docker environment

```shell
docker/sdk bootstrap deploy.dev.yml
```

{% info_block infoBox "Good to know" %}

If you do not need to build Spryker with development tools and file synchronisation, just run `docker/sdk bootstrap` instead. This mode is better suited to showcase Spryker features.

{% endinfo_block %}

### 4.a Update the host file

Update your `/etc/hosts` file with the command that the `docker/sdk bootstrap` command will display.

## 5. Build and start your local instance

```shell
docker/sdk up
```

## 6. Open your new Spryker project in your browser

* Storefront [yves.de.spryker.local](yves.de.spryker.local)
* Back-Office [backoffice.de.spryker.local](backoffice.de.spryker.local)
* Frontend API [glue-storefront.de.spryker.local](glue-storefront.de.spryker.local) and its schema [swagger.spryker.local](swagger.spryker.local)

{% info_block infoBox "Good to know" %}

Whenever you see `.de.` in your URL, it means that this application is store specific. Out of the box, Spryker comes with three stores (de, at, and us).

{% endinfo_block %}

