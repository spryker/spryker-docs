---
title: Choosing an installation mode
description: Choose an installation mode to install Spryker in.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/choosing-an-installation-mode
originalArticleId: f463210d-1b1c-432f-b0f1-53ada2a017e5
redirect_from:
  - /2021080/docs/choosing-an-installation-mode
  - /2021080/docs/en/choosing-an-installation-mode
  - /docs/choosing-an-installation-mode
  - /docs/en/choosing-an-installation-mode
  - /v6/docs/choosing-an-installation-mode
  - /v6/docs/en/choosing-an-installation-mode
  - /v5/docs/modes-overview
  - /v5/docs/en/modes-overview
  - /v4/docs/modes-overview
  - /v4/docs/en/modes-overview
  - /v4/docs/getting-started-with-docker-old
  - /v4/docs/en/getting-started-with-docker-old
  - /v4/docs/getting-started-with-docker
  - /v4/docs/en/getting-started-with-docker
  - /v3/docs/getting-started-with-docker-201907
  - /v3/docs/en/getting-started-with-docker-201907
  - /docs/scos/dev/installation/spryker-in-docker/installation-guides/modes-overview.html
related:
  - title: Database access credentials
    link: docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html
---


In this section, you can find installation guides for Spryker in Docker. Currently, you can install Spryker in the following ways:

* Install Spryker in Development mode.
* Install Spryker in Demo mode.
* Integrate Docker into an exiting project.

## What installation mode do I choose?

To install Spryker with all the tools for developing your project, go with the Development mode. Depending on your OS, see one of the following guides for installation instructions:

* [Installing in Development mode on MacOS and Linux](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-development-mode-on-macos-and-linux.html)
* [Installing in Development mode on Windows](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-development-mode-on-windows.html)

To check out Spryker features and how Spryker works in general, go with the Demo mode. Depending on your OS, see one of the following guides for installation instructions:

* [Installing in Demo mode on MacOS and Linux](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-demo-mode-on-macos-and-linux.html)
* [Installing in Demo mode on Windows](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-demo-mode-on-windows.html)

If you are already running a Spryker project with another solution like Vagrant, and you want to switch to Docker, see [Integrating the Docker SDK into existing projects](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/integrating-the-docker-sdk-into-existing-projects.html).

Find more details about each mode in the following sections.

## Development mode

Development mode is a configuration in which Spryker is built and running with development tools and file synchronization.

### Use cases

Development mode is used in the following cases:

* To learn how Spryker works.
* To develop a new functionality.
* To debug a functionality.

### Development mode installation guides

See one of the following guides to install Spryker in Development mode:

* [Installing in Development mode on MacOS and Linux](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-development-mode-on-macos-and-linux.html)
* [Installing in Development mode on Windows](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-development-mode-on-windows.html)

## Demo mode

Demo mode is a configuration in which Spryker is built and running without development tools, like file synchronization. As a result, Docker images in this mode are smaller.

In Demo mode, the following functionalities are missing or disabled:

1. Swagger UI service
2. Debugging functionality
3. File synchronization

### Use Cases

Demo mode is used in the following cases:

* To check or show the functionalities of [B2B](/docs/scos/user/intro-to-spryker/b2b-suite.html)/[B2C demo shops](/docs/scos/user/intro-to-spryker/b2c-suite.html).
* To check a custom build or a new feature.
* To test or deploy an application using Continuous Integration and Continuous Delivery tools.

### Demo mode installation guides

See one of the following guides to install Spryker in Demo mode:

* [Installing in Demo mode on MacOS and Linux](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-demo-mode-on-macos-and-linux.html)
* [Installing in Demo mode on Windows](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-demo-mode-on-windows.html)

## Integrating Docker into existing projects

If you are already running a Spryker project based on Development Virtual Machine or any other solution, you can convert it into a Docker based project.
Learn how to convert a project into a Docker based instance in [Integrating the Docker SDK into existing projects](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/integrating-the-docker-sdk-into-existing-projects.html).

## Next steps

Once you've selected and installation mode, follow one of the guides below:

* [Installing in Development mode on MacOS and Linux](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-development-mode-on-macos-and-linux.html)
* [Installing in Development mode on Windows](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-development-mode-on-windows.html)
* [Installing in Demo mode on MacOS and Linux](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-demo-mode-on-macos-and-linux.html)
* [Installing in Demo mode on Windows](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/installing-in-demo-mode-on-windows.html)
* [Integrating Docker into existing projects](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/integrating-the-docker-sdk-into-existing-projects.html)
