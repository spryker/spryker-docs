---
title: Building flavored Spryker SDKs
description: Find out how you can build flavored Spryker SDKs
template: howto-guide-template
---
Sometimes, a [simple extendibility](/docs/sdk/dev/extending-the-sdk.html) and core SDK capabilities might not be enough. This is especially the case when an extension to the SDK requires additional dependencies or a deep integration of the SDK.
You can extend the SDK by adding additional Symfony bundles to the SDK and building an own flavored Spryker SDK image. To do this, follow the steps below.

## 1. Add additional dependencies

Besides extending the Spryker SDK through [Yaml definitions](/docs/sdk/dev/extending-the-sdk.html#implementation-via-yaml-definition), more complex extensions can be provided via [PHP implementations](/docs/sdk/dev/extending-the-sdk.html#implementation-via-php-implementation).
You need to add this extension through a PHP implementation as a composer dependency and register it as Symfony bundle. To achieve this, Follow the steps below.

#### Download the SDK source code

First you need to download the source to be able to build your own flavored Spryker SDK.

`git clone --depth 1 --branch <tag_name> git@github.com:spryker-sdk/sdk.git`

For testing and development purposes you can run the Spryker SDK in [development mode](development.md#run-sdk-in-development-mode).

#### Composer

Additional dependencies can be added via composer.
`composer require <your company>/<your package>`

#### Symfony Bundle registration

Modify `config/bundles.php`:

```diff
$bundles = [
    ...,
    Doctrine\Bundle\MigrationsBundle\DoctrineMigrationsBundle::class => ['all' => true],
+   YourNamespace\YourBundle\YourBundle::class => ['all' => true],
];
```

#### Build your own image

`docker-compose -f docker-compose.yml build -build-arg UID=$(id -u) --build-arg GID=$(id -g) --no-cache`

Once the flavored Spryker SDK is build you can execute the same way a non-flavored one will be executed.

#### Private repositories

Adding private repositories requires to add an [auth.json](https://getcomposer.org/doc/articles/authentication-for-private-packages.md) before building the container.