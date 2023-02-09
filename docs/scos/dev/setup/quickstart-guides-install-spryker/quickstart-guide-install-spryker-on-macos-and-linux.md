---
title: "Quickstart guide: Install Spryker on MacOS and Linux"
description: Get started with Spryker on MacOS and Linux
last_updated: Feb 3, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/setup/quick-installation-guides/quick-installation-guide-macos-and-linux.html
---

This document describes how to quickly install Spryker on MacOS or Linux in Development mode. If you are installing Spryker for the first time or need detailed instructions, we recommend starting with [Installing Spryker with Docker](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html#prerequisites).

To install Spryker on Mac OS or Linux, follow these steps:

## Prerequisites

* Install [Docker](https://www.docker.com/).

* MacOS: Install or update Mutagen and Mutagen Compose:

```bash
brew list | grep mutagen | xargs brew remove && brew install mutagen-io/mutagen/mutagen mutagen-io/mutagen/mutagen-compose && mutagen daemon stop && mutagen daemon start
```


## 1. Clone the Demo Shop of your choice

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

Update the hosts file using the command provided in the output of the previous step.

## 3. Build and start the instance

```shell
docker/sdk up
```

Default demo shop configuration includes the stores *de*, *at*, and *us*.

You can now access your project applications using the following endpoints:
1. German Store
* Storefront: `yves.de.spryker.local`
* Back Office: `backoffice.de.spryker.local`

2. Austrian Store
* Storefront: `yves.at.spryker.local`
* Back Office: `backoffice.at.spryker.local`

3. USA Store
* Storefront: `yves.us.spryker.local`
* Back Office: `backoffice.us.spryker.local`


{% info_block infoBox "Info" %}

If you see `.de.` in your URL, the application is store-specific. By default, Spryker comes with three stores: *de*, *at*, and *us*.

{% endinfo_block %}
