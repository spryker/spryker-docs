---
title: Build flavored Spryker SDKs
description: Find out how you can build flavored Spryker SDKs
template: howto-guide-template
last_updated: Nov 22, 2022
redirect_from:
    - /docs/sdk/dev/building-flavored-spryker-sdks.html
    - /docs/sdk/dev/build-flavored-spryker-sdks.html

---
Sometimes, a [simple extendibility](/docs/dg/dev/sdks/sdk/extending-spryker-sdk.html) and core SDK capabilities are not enough. This is especially the case when an extension to the SDK requires additional dependencies or a deep integration of the SDK.
You can extend the SDK by adding more Symfony bundles to the SDK and building your own flavored Spryker SDK image.

Besides extending the Spryker SDK through [Yaml definitions](/docs/dg/dev/sdks/sdk/extending-spryker-sdk.html#implementing-a-task-via-yaml-definition), more complex extensions can be provided via [PHP implementations](/docs/dg/dev/sdks/sdk/extending-spryker-sdk.html#implementing-a-task-via-a-php-class). You must add these extensions through a PHP implementation as a composer dependency and register them as Symfony bundles. To achieve this, follow the steps below.

## 1. Download the SDK source code

```shell
git clone --depth 1 --branch <tag_name> git@github.com:spryker-sdk/sdk.git`
```

For testing and development purposes, you can run the Spryker SDK in [development mode](/docs/dg/dev/sdks/sdk/developing-with-spryker-sdk.html).

## 2. Add dependencies via Composer

Add additional dependencies via Composer:

```text
composer require {COMPANY}/{PACKAGE}
```

## 3. Register a Symfony bundle

Register the Symfony bundle in `config/bundles.php`:

```diff
$bundles = [
    ...,
    Doctrine\Bundle\MigrationsBundle\DoctrineMigrationsBundle::class => ['all' => true],
+   {NAMESPACE}\{BUNDLE}\{BUNDLE}::class => ['all' => true],
];
```

## 4. Optional: Add private repositories

Tp add private repositories as dependencies to the SDK repository, add the [auth.json](https://getcomposer.org/doc/articles/authentication-for-private-packages.md) file to the project.

## 5. Build the image

```shell
docker-compose -f docker-compose.yml build -build-arg UID=$(id -u) --build-arg GID=$(id -g) --no-cache
```

Once the flavored SDK is built, you can execute it the same way as a non-flavored one.
