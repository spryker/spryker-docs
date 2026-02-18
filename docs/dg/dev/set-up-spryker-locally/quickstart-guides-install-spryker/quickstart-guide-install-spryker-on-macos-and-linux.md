---
title: "Quickstart guide: Install Spryker on MacOS and Linux"
description: A quickstart guide to get you up and running installing Spryker in a local environment on MacOS and Linux.
last_updated: Feb 3, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/setup/quick-installation-guides/quick-installation-guide-macos-and-linux.html
  - /docs/scos/dev/set-up-spryker-locally/quickstart-guides-install-spryker/quickstart-guide-install-spryker-on-macos-and-linux.html

---

This document describes how to quickly install Spryker on MacOS or Linux in Development mode. If you are installing Spryker for the first time or need detailed instructions, we recommend starting with [Install Spryker](/docs/dg/dev/set-up-spryker-locally/install-spryker/install-spryker.html).

To install Spryker on macOS or Linux, follow these steps:

## Prerequisites

- Install [Docker](https://www.docker.com/) or [OrbStack](https://orbstack.dev/)(macOS only).

- macOS: Install or update Mutagen and Mutagen Compose:

```bash
brew list | grep mutagen | xargs brew remove && brew install mutagen-io/mutagen/mutagen mutagen-io/mutagen/mutagen-compose && mutagen daemon stop && mutagen daemon start
```


## 1. Clone the Demo Shop

{% info_block warningBox %}

Product images, product data, other images or fonts displaced in a demo shop are examples, and you may need to purchase your own licenses to use any of them.

{% endinfo_block %}

```shell
git clone https://github.com/spryker-shop/b2b-demo-marketplace.git -b {{site.versionid}} --single-branch ./b2b-demo-marketplace && \
cd b2b-demo-marketplace && \
git clone https://github.com/spryker/docker-sdk.git --single-branch docker && \
docker/sdk bootstrap deploy.dev.yml
```

## 2. Update the hosts

Update the hosts file using the command provided in the output of the previous step. It should be similar to the following:

![update-hosts](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/setup/quickstart-guides-install-spryker/quickstart-guide-install-spryker-on-macos-and-linux/update-hosts.png)

## 3. Build and start the instance

```shell
docker/sdk up
```

The project is now running. For the full list of the project's endpoints, see `http://spryker.local`.


For detailed installation instructions, start with [Install Spryker](/docs/dg/dev/set-up-spryker-locally/install-spryker/install-spryker.html).
