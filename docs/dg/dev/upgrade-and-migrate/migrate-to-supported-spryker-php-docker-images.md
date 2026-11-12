---
title: Migrate to supported Spryker PHP Docker images
description: Replace legacy, Alpine-pinned, or custom PHP Docker images with supported spryker/php semantic tags to keep your runtime and operating system components up to date.
last_updated: Nov 12, 2026
template: howto-guide-template
---

Older PHP and Alpine Linux versions eventually reach the end of their support lifecycle. Some previously published image variants, including intermediate and specialized variants such as certain `otel` images, are no longer part of the actively maintained Spryker image stream and do not receive updates.

Moving to a maintained semantic tag keeps your runtime and operating system components up to date, reduces your exposure to vulnerabilities, and removes the need to track Alpine Linux lifecycles manually. A *semantic tag* is an image tag that specifies only the PHP version line, such as `spryker/php:8.4`, without the operating system version or other implementation details.

## Supported semantic tags

Spryker maintains the following semantic PHP image tags:

- `spryker/php:8.3`
- `spryker/php:8.4`
- `spryker/php:8.5`

We strongly recommend migrating to one of these tags and selecting the latest PHP version that is compatible with your Spryker project and application dependencies.

Spryker maintains semantic tags directly. Each semantic tag automatically receives the underlying image updates within its PHP version line, including security and maintenance updates, so you do not need to migrate manually between individual image variants.

## Image tags to avoid

Do not pin an environment to an implementation-specific image tag, such as `spryker/php:8.x-alpineX.Y`. Use the corresponding semantic tag instead — for example, replace `spryker/php:8.4-alpine3.22` with `spryker/php:8.4`.

## Custom and third-party images

If you use custom or third-party PHP images, we highly recommend migrating to the standard Spryker PHP images. This keeps your underlying components aligned with the Spryker-supported lifecycle and reduces your internal maintenance overhead.

## Migrate to a semantic tag

To migrate your project to a supported semantic tag, update every project configuration file where the Docker image is defined:

1. Locate your image definitions. Search your project repository for references to your current PHP image. Image definitions are typically located in the following files:
    - Deploy files, such as `deploy.yml`
    - `Dockerfile`
    - `docker-compose.yml`
    - CI/CD pipeline configuration files

    To list all files that reference Spryker PHP images, search the project root:

    ```bash
    grep -rn "spryker/php" --exclude-dir=vendor --exclude-dir=node_modules .
    ```

    If you use a custom or third-party image, search for its image name instead.

2. Replace the legacy, pinned, or custom image tag with the semantic tag you selected. For example, in a deploy file, replace the following image definition:

    ```yaml
    image:
        tag: spryker/php:8.2-alpine3.18
    ```

    With the following one:

    ```yaml
    image:
        tag: spryker/php:8.4
    ```

    {% info_block warningBox "Check PHP compatibility" %}

    If the new tag uses a newer PHP version than your current image, make sure your application is compatible with that version before you switch. For instructions, see [Upgrade to PHP 8.4](/docs/dg/dev/upgrade-and-migrate/upgrade-to-php-84.html) or [Upgrade to PHP 8.5](/docs/dg/dev/upgrade-and-migrate/upgrade-to-php-85.html).

    {% endinfo_block %}

3. Rebuild and test. Build your containers locally or in a development environment, and verify that your application dependencies are fully compatible with the new image. If you use the Docker SDK, rebuild the containers as follows:

    ```bash
    docker/sdk boot && docker/sdk up --build
    ```

4. Deploy. After validating the changes, commit them and run your deployment pipeline to promote the updated image to your non-production and production environments.
