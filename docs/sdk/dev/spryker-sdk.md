---
title: Spryker SDK
description: Learn about the Spryker SDK and how you can use it in your project.
template: concept-topic-template
redirect_from: 
    - /docs/sdk/dev/sdk-conventions.com
---
The Spryker SDK aims to provide a single entry point to accelerate your productivity while working with Spryker. The Spryker SDK provides tools to validate existing code, implement new features with Spryker, and go live with your project.

## Installation

1. Ensure the `auth` file is available for composer. See [Authentication for privately hosted packages and repositories](https://getcomposer.org/doc/articles/authentication-for-private-packages.md) for details.
2. Install [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/).
3. Download the `installer.sh` file from [the latest release](https://github.com/spryker-sdk/sdk/releases).
4. Run `installer.sh </path/to/install/sdk/in>`.
5. Optional: To add spryker-sdk as an alias if you use Bash or Zsh, execute `"add alias spryker-sdk='</path/to/install/sdk/in>/bin/spryker-sdk.sh'" >> ~/.bashrc && source ~/.bashrc` for Bash or `"alias spryker-sdk=\"</path/to/install/sdk/in>/bin/spryker-sdk.sh\"" >> ~/.zshrc  && source ~/.zshrc` for Zsh.c

## Getting started

Run `sdk:setting:set` to set up your local settings.

To get an overview of the available capabilities of the Spryker SDK, run `spryker-sdk list`.

You can execute any task by running `spryker-sdk <task-id>` from the project root folder. To get information about the options that you can pass into a task, run `bin/consolespryker-sdk <task-id> -h`.
