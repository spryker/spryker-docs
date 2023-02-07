---
title: 'Quick installation guide: Mac OS and Linux'
description: Get started with Spryker using Docker on Mac OS and Linux
last_updated: Sep 8, 2022
template: howto-guide-template
---


To install Spryker on Mac OS or Linux, follow these steps:

## System requirements

| REQUIREMENT | VALUE OR VERSION |
| --- | --- |
| Docker | 18.09.1 or higher |
| Docker Compose | 1.28 or 1.29 |
| vCPU | 4 or more |
| RAM  | 4GB or more |
| Swap  | 2GB or more |

## MacOS: Install or update Mutagen and Mutagen Compose

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



## 2. Update the hosts file

Update the hosts file using the command provided in the output of the previous step.

## 5. Build and start a local instance

```shell
docker/sdk up
```

You should be able to access your project using the following endpoints:

* Storefront: `yves.de.spryker.local`
* Back Office: `backoffice.de.spryker.local`


{% info_block infoBox "Info" %}

If you see `.de.` in your URL, it means that this application is store-specific. By default, Spryker comes with three stores: *de*, *at*, and *us*.

{% endinfo_block %}

For detailed installation instructions, start with [Installing Spryker with Docker](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html#prerequisites).
