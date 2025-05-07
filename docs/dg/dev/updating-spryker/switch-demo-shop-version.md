---
title: Switch Demo Shop version
description: Learn how you can switch the version of a Demo Shop to a previous or next version within your Spryker projects.
last_updated: Apr 13, 2023
template: howto-guide-template
redirect_from:
- /docs/scos/dev/updating-spryker/switch-demo-shop-version.html
---

This document describes how to switch the version of a Demo Shop. You can switch to the next or the previous version. To do that, follow the steps:


1. Stop the environment, clear cache and resources:

```shell
docker/sdk clean-data && \
rm -Rf data/cache && rm -Rf src/Orm/Zed/*/Persistence/Base/ && rm -Rf src/Orm/Zed/*/Persistence/Map/ && rm -rf vendor/
```

2. Switch to the needed version of the Demo Shop, build and run the project:

```shell
git checkout {DEMOSHOP_VERSION} && \
docker/sdk bootstrap deploy.dev.yml && \
docker/sdk up --build --assets --data --jobs
```

Example:

```shell
git checkout 202212.0 && \
docker/sdk bootstrap deploy.dev.yml && \
docker/sdk up --build --assets --data --jobs
```

This switches and runs the Demo Shop of version 202212.0.
