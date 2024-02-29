---
title: Spryker SDK
description: Learn about the Spryker SDK and how you can use it in your project.
template: concept-topic-template
last_updated: Aug 31, 2023
redirect_from:
    - /docs/sdk/dev/sdk-conventions.com
    - /docs/scos/dev/sdk/sdk.html
---
The Spryker SDK aims to provide a single entry point to accelerate your productivity while working with Spryker. The Spryker SDK provides tools to validate existing code, implement new features with Spryker, and go live with your project.

## Requirements
- Make sure an auth file is available for the [Composer](https://getcomposer.org/doc/articles/authentication-for-private-packages.md).
- If you're using a MacOS computer, install **Coreutils**.
  ```shell
  brew install coreutils
  ```
- Installed [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

## Installation

### Manual installation
- Download the **installer.sh** from the latest release at https://github.com/spryker-sdk/sdk/releases.
- Run
  ```shell
  installer.sh </path/to/install/sdk/in>
  ```
- Follow the installer's instructions.
- Alias **spryker-sdk** should be set and **SPRYKER_SDK_PATH** env variable should be exported.


### Installation command
Install sdk into the current dir.
```shell
PATH_TO_SDK=$(pwd) \
&& curl -fL github.com/spryker-sdk/sdk/releases/latest/download/installer.sh -O \
&& chmod +x installer.sh \
&& ./installer.sh "${PATH_TO_SDK}" \
&& rm -f installer.sh \
&& if [ -e ~/.zshrc ]; then source ~/.zshrc; else source ~/.bashrc; fi; \
echo "Current SDK version: $(spryker-sdk --version)"
```

## Getting started

To get an overview on the available capabilities of the Spryker SDK, run **spryker-sdk list**.

Any task can be executed by running **spryker-sdk \<task-id\>** from project root folder.
Using **bin/console spryker-sdk \<task-id\> -h** will give a description on what options can be passed into the task.
