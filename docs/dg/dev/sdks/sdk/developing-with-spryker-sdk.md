---
title: Developing with Spryker SDK
description: Learn how you can install and use Spryker SDK for your development needs with the dev enironment.
template: howto-guide-template
last_updated: Nov 22, 2022
related:
  - title: Profiler
    link: docs/sdk/dev/profiler.html
redirect_from:
  - /docs/sdk/dev/developing-the-sdk.html
  - /docs/sdk/dev/develop-the-sdk.html

---

To install Spryker SDK for your development needs, clone the project and export `SPRYKER_SDK_ENV` with the `dev` environment, then create an alias:

```shell
git clone git@github.com:spryker-sdk/sdk.git && \
cd sdk; \
PATH_TO_SDK=$(pwd) && \
if [ -e ~/.zshrc ]; then \
  echo 'export SPRYKER_SDK_ENV=dev' >> ~/.zshrc && \
  echo 'alias spryker-sdk="$PATH_TO_SDK/bin/spryker-sdk.sh"' >> ~/.zshrc && \
  source ~/.zshrc; \
else \
  echo 'export SPRYKER_SDK_ENV=dev' >> ~/.bashrc && \
  echo 'alias spryker-sdk="'$PATH_TO_SDK'/bin/spryker-sdk.sh"' >> ~/.bashrc && \
  source ~/.bashrc; \
fi; \
git describe --abbrev=0 --tags > VERSION; \
spryker-sdk --mode=docker sdk --install
```

## Using Spryker SDK

- Run a task or a command:

```shell
spryker-sdk <task|command>
```

- To debug a task or a command, make sure the server name in IDE is `spryker-sdk` and run the following command:

```shell
spryker-sdk --mode=debug {TASK | COMMAND}
```

- Run Spryker SDK in the production environment:

```shell
SPRYKER_SDK_ENV=prod spryker-sdk {TASK | COMMAND}
```

- Run any command inside the docker container:

```shell
spryker-sdk --mode=docker "{COMMAND}"

spryker-sdk --mode=docker "cd /data && composer cs-check"
```

- Jump into the docker container:

```shell
spryker-sdk --mode=docker /bin/bash
```

## SDK helper

To get the list of useful commands, shortcuts, and aliases, run the SDK helper:

```shell
spryker-sdk --mode=docker sdk --help
```

## Manage the project configuration
For details on the project configuration management, see the [Symfony configuration docs](https://symfony.com/doc/current/configuration.html).

## Troubleshooting issues with the Docker container

If you face the following issues:
- pulling the container from the Docker registry,
- file permissions and ownership on files created by the SDK,

you can build your own container from SDK sources. Refer to [Building flavored Spryker SDKs](/docs/dg/dev/sdks/sdk/build-flavored-spryker-sdks.html) for details.
