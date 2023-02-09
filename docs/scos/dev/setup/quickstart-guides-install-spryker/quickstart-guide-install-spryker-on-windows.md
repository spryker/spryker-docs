---
title: "Quickstart guide: Install Spryker on Windows"
description: Get started with Spryker using Docker on Windows
last_updated: Feb 03, 2023
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/setup/quick-installation-guides/quick-installation-guide-windows.html
---

This document describes how to quickly install Spryker on Windows in Development mode. If you are installing Spryker for the first time or need detailed instructions, we recommend starting with [Installing Spryker with Docker](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html#prerequisites).

To install Spryker on Windows, follow these steps:

## Prerequisites

Install the following applications:

* [Ubuntu](https://apps.microsoft.com/store/detail/ubuntu/9PDXGNCFSCZV?ref=spryker-documentation)
* [Docker](https://www.docker.com/)


## 1. Clone the Demo Shop of your choice

Depending on the needed Demo Shop, run one of the following in Ubuntu:

- B2B Demo Shop:

```shell
git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202204.0-p1 --single-branch ./b2b-demo-shop && \
cd b2b-demo-shop && \
git clone https://github.com/spryker/docker-sdk.git --single-branch docker && \
docker/sdk bootstrap deploy.dev.yml
```

- B2C Demo Shop:

```shell
git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202204.0-p1 --single-branch ./b2c-demo-shop && \
cd b2c-demo-shop && \
git clone https://github.com/spryker/docker-sdk.git --single-branch docker && \
docker/sdk bootstrap deploy.dev.yml
```

- B2B Marketplace Demo Shop:

```shell
git clone https://github.com/spryker-shop/b2b-demo-marketplace.git -b 202204.0-p1 --single-branch ./b2b-demo-marketplace && \
cd b2b-demo-marketplace && \
git clone https://github.com/spryker/docker-sdk.git --single-branch docker && \
docker/sdk bootstrap deploy.dev.yml
```

- B2C Marketplace Demo Shop:

```shell
git clone https://github.com/spryker-shop/b2c-demo-marketplace.git -b 202204.0-p1 --single-branch ./b2c-demo-marketplace && \
cd b2b-demo-marketplace && \
git clone https://github.com/spryker/docker-sdk.git --single-branch docker && \
docker/sdk bootstrap deploy.dev.yml
```


## 2. Update the hosts

Update `C:\Windows\System32\drivers\etc\hosts` using the instructions provided in the output of the previous step.

## 3. Build and start the instance

```shell
docker/sdk up
```

You can now access your project using the following endpoints:

* Storefront: `yves.de.spryker.local`
* Back Office: `backoffice.de.spryker.local`


{% info_block infoBox "Info" %}

If you see `.de.` in your URL, the application is store-specific. By default, Spryker comes with three stores: *de*, *at*, and *us*.

{% endinfo_block %}

For detailed installation instructions, start with [Installing Spryker with Docker](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html#prerequisites).
