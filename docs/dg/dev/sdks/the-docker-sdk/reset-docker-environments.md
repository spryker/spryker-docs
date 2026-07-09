---
title: Reset Docker environments
description: Learn how to restart and reset your docker environments to start from scratch for your Spryker projects.
last_updated: Jun 18, 2021
template: howto-guide-template
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-reset-a-docker-environment.html
related:
  - title: Docker SDK quick start guide
    link: docs/dg/dev/sdks/the-docker-sdk/docker-sdk-quick-start-guide.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


Sometimes, after experimenting or getting unexpected behavior from the `docker/sdk up` command, it may be helpful to reset the entire Docker environment and start from scratch.

To reset a Docker environment, follow these steps:

1. Delete all containers, networks, unused images, and build cache:

```bash
sudo docker/sdk prune
```

2. In the project root directory, clean data, bootstrap the deploy file, and start the instance:

```bash
docker/sdk clean-data && docker/sdk boot {deploy_file_name} && docker/sdk up
```

You've restarted your instance from scratch.
