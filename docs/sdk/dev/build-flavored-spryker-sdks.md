---
title: Build flavored Spryker SDKs
description: Find out how you can build flavored Spryker SDKs
template: howto-guide-template
redirect_from:
    - /docs/sdk/dev/building-flavored-spryker-sdks.html
---
Sometimes, a [simple extendibility](/docs/sdk/dev/extending-the-sdk.html) and core SDK capabilities are not enough. This is especially the case when an extension to the SDK requires additional dependencies or a deep integration of the SDK.
You can extend the SDK by adding more Symfony bundles to the SDK and building your own flavored Spryker SDK image. To do this, follow these instructions.

## Adding more dependencies

Besides extending the Spryker SDK through [Yaml definitions](/docs/sdk/dev/extend-the-sdk.html#implementation-via-yaml-definition), more complex extensions can be provided via [PHP implementations](/docs/sdk/dev/extend-the-sdk.html#implementation-via-a-php-class).
You must add these extensions through a PHP implementation as a composer dependency and register them as Symfony bundles. To achieve this, follow the steps below.

### 1. Download the SDK source code

To be able to build your own flavored Spryker SDK, first download the source:

`git clone --depth 1 --branch <tag_name> git@github.com:spryker-sdk/sdk.git`

For testing and development purposes, you can run the Spryker SDK in [development mode](/docs/sdk/dev/develop-the-sdk.html).

### 2. Add dependencies via Composer

Add additional dependencies via Composer:
`composer require <your company>/<your package>`

### 3. Register a Symfony bundle

Modify `config/bundles.php`:

```diff
$bundles = [
    ...,
    Doctrine\Bundle\MigrationsBundle\DoctrineMigrationsBundle::class => ['all' => true],
+   YourNamespace\YourBundle\YourBundle::class => ['all' => true],
];
```

### 4. Build your own image

`docker-compose -f docker-compose.yml build -build-arg UID=$(id -u) --build-arg GID=$(id -g) --no-cache`

Once the flavored Spryker SDK is built, you can execute it the same way as a non-flavored one.

{% info_block infoBox "Private repositories" %}

Tp add private repositories as dependencies to the SDK repository, before building the container, add the [auth.json](https://getcomposer.org/doc/articles/authentication-for-private-packages.md) 
file to your project.

{% endinfo_block %}