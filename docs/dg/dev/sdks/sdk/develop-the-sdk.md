  - /docs/sdk/dev/develop-the-sdk.html
---
title: Develop the SDK
description: You can install and use Spryker SDK for your development needs
template: howto-guide-template
last_updated: Nov 22, 2022
related: 
  - title: Profiler
    link: docs/sdk/dev/profiler.html
redirect_from:
  - /docs/sdk/dev/developing-the-sdk.html
---

To install the Spryker SDK for your development needs, clone the project and export `SPRYKER_SDK_ENV` with the `dev` environment, then create an alias:

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

## Usage

- To run a task or a command, execute the following command:
  
```shell
spryker-sdk <task|command>
```

- To debug a task or a command, make sure the server name in IDE is `spryker-sdk` and run the following command:

```shell
spryker-sdk --mode=debug <task|command>
```

- To run the Spryker SDK in the production environment, execute the following command:
  
```shell
SPRYKER_SDK_ENV=prod spryker-sdk <task|command>
```

- To run any command inside the docker container, execute the following command:
- 
```shell
spryker-sdk --mode=docker "<command>"

spryker-sdk --mode=docker "cd /data && composer cs-check"
```

- To jump into the docker container, execute the following command:
  
```shell
spryker-sdk --mode=docker /bin/bash
```

## SDK helper

Inside the container, you can find the SDK helper which has useful commands, shortcuts, and aliases.

### Refreshing the state after switching to a new branch

To refresh the state of the SDK after switching to a new branch, run the following command:

```shell
spryker-sdk --mode=docker sdk --refresh
```
or

```shell
spryker-sdk --mode=docker sdk r
```

Here is the full list of commands you can use:

```shell
spryker-sdk --mode=docker sdk --help

    --refresh, -r           refreshes cache vendor and DB
    --composer, -c          runs the SDK composer
                            accepts composer arguments like 'sdk --composer install' 'sdk -c cs-check'
    --cache-clear, -cl      alias for 'rm -rf var/cache && bin/console cache:clear'
    --cs-fix, -cf           alias for 'composer cs-fix'
    --cs-check, -cc         alias for 'composer cs-check'
    --stan, -s              alias for 'composer stan'
    --unit, -u              runs codeception unit tests
                            accepts arguments like 'sdk -u someUnitTest.php'
    --acceptance, -a        runs codeception acceptance tests
                            accepts arguments like 'sdk -u someAcceptanceTest.php'
```

## Manage the project configuration
For details on the project configuration management, see the [Symfony configuration docs]()https://symfony.com/doc/current/configuration.html).

## Troubleshooting issues with the Docker container
If you face issues with:
- pulling the container from the Docker registry,
- file permissions and ownership on files created by the SDK,

you can build your own container from SDK sources. Refer to [Building flavored Spryker SDKs](/docs/sdk/dev/building-flavored-spryker-sdks.html) for details.
