---
title: Docker SDK configuration reference
description: Instructions for the most common configuration cases of the Docker SDK.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/docker-sdk-configuration-reference
originalArticleId: 624e91c2-a207-41b4-957f-98de2a96f90b
redirect_from:
- /docs/scos/dev/the-docker-sdk/202212.0/docker-sdk-configuration-reference.html
related:
  - title: The Docker SDK
    link: docs/scos/dev/the-docker-sdk/page.version/the-docker-sdk.html
  - title: Docker SDK quick start guide
    link: docs/scos/dev/the-docker-sdk/page.version/docker-sdk-quick-start-guide.html
  - title: Docker environment infrastructure
    link: docs/scos/dev/the-docker-sdk/page.version/docker-environment-infrastructure.html
  - title: Configuring services
    link: docs/scos/dev/the-docker-sdk/page.version/configure-services.html
  - title: Choosing a Docker SDK version
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-docker-sdk-version.html
  - title: Choosing a mount mode
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-mount-mode.html
  - title: Configuring a mount mode
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-a-mount-mode.html
  - title: Configuring access to private repositories
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-access-to-private-repositories.html
  - title: Configuring debugging in Docker
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-debugging-in-docker.html
  - title: Running tests with the Docker SDK
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-docker-sdk-version.html
---

This document is a quick reference for the most common configuration options of the Docker SDK.

The configuration parameters in this document are exemplary. You may need to adjust them per your project requirements.


## Configuring Opcache

To configure Opcache, adjust `deploy.*.yml` as follows:

```yaml
image:
    tag: spryker/php:7.3
    php:
        ini:
            "opcache.revalidate_freq": 0
            "opcache.enable_cli": 0
            "opcache.enable": 0
            ...
```

## Defining a memory limit

To define a memory limit, adjust `deploy.*.yml` as follows:

```yaml
image:
    tag: spryker/php:7.3
    php:
        ini:
            "memory_limit": 512m
```

## Providing custom environment variables to Spryker applications

To provide custom environment variables to Spryker applications, adjust `deploy.*.yml` as follows:

```yaml
image:
    tag: spryker/php:7.3
    environment:
        MY_CUSTOM_ENVIRONMENT_VARIABLE: 1
        ...
```

{% info_block infoBox %}

The environment variables defined in `environment:` are embedded into all application images.

{% endinfo_block %}

## Increasing maximum upload size

To increase maximum upload size, update `deploy.*.yml` as follows:

1. In Nginx configuration, update maximum request body size:
```yaml
...
		applications:
			backoffice:
				application: backoffice
				http:
					max-request-body-size: {request_body_size_value}
				...
```

2. Update PHP memory limit:

```yaml
image:
    ...
    php:
        ini:
            memory_limit: {memroy_limit_value}
            ...
```
