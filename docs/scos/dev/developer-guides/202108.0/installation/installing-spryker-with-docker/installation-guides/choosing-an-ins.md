---
title: Choosing an installation mode
originalLink: https://documentation.spryker.com/2021080/docs/choosing-an-installation-mode
redirect_from:
  - /2021080/docs/choosing-an-installation-mode
  - /2021080/docs/en/choosing-an-installation-mode
---


In this section, you can find installation guides for Spryker in Docker. Currently, you can install Spryker in the following ways:
* Install Spryker in Development mode.
* Install Spryker in Demo mode.
* Integrate Docker into an exiting project.
* Generate Docker images and assets for a production environement.


## What installation mode do I choose? 

To install Spryker with all the tools for developing your project, go with the Development mode. Depending on your OS, see one of the following guides for installation instructions:
* [Installing in Development mode on MacOS and Linux](https://documentation.spryker.com/docs/installing-in-development-mode-on-macos-and-linux)
* [Installing in Development mode on Windows](https://documentation.spryker.com/docs/installing-in-development-mode-on-windows)

To check out Spryker features and how Spryker works in general, go with the Demo mode. Depending on your OS, see one of the following guides for installation instructions:
* [Installing in Demo mode on MacOS and Linux](https://documentation.spryker.com/docs/installing-in-demo-mode-on-macos-and-linux)
* [Installing in Demo mode on Windows](https://documentation.spryker.com/docs/installing-in-demo-mode-on-windows)


If you are already running a Spryker project with another solution like Vagrant, and you want to switch to Docker, see [Integrating the Docker SDK into existing projects](https://documentation.spryker.com/docs/integrating-the-docker-SDK-into-existing-projects).

To launch a live Spryker project based on Docker, see [Running production](https://documentation.spryker.com/docs/running-production).

Find more details about each mode below.



## Development mode 
Development mode is a configuration in which Spryker is built and running with development tools and file synchronization.

### Use cases
Develpment mode is used in the following cases:
* To learn how Spryker works.
* To develop a new functionality.
* To debug a functionality.

### Development mode installation guides

See one of the following guides to install Spryker in Development mode:
* [Installing in Development mode on MacOS and Linux](https://documentation.spryker.com/docs/installing-in-development-mode-on-macos-and-linux)
* [Installing in Development mode on Windows](https://documentation.spryker.com/docs/installing-in-development-mode-on-windows)

## Demo mode 
Demo mode is a configuration in which Spryker is built and running without development tools, like file synchronization. As a result, Docker images in this mode are smaller.

In Demo mode, the following functionalities are missing or disabled:
1. Swagger UI service
2. Debugging functionality
3. File synchronization

### Use Cases
Demo mode is used in the following cases:
* To check or show the functionalities of [[B2B](https://documentation.spryker.com/docs/en/b2b-suite)/[B2C demo shops](https://documentation.spryker.com/docs/en/b2c-suite)].
* To check a custom build or a new feature.
* To test or deploy an application using Continuous Integration and Continuous Delivery tools.

### Demo mode installation guides

See one of the following guides to install Spryker in Demo mode:
* [Installing in Demo mode on MacOS and Linux](https://documentation.spryker.com/docs/installing-in-demo-mode-on-macos-and-linux)
* [Installing in Demo mode on Windows](https://documentation.spryker.com/docs/installing-in-demo-mode-on-windows)

## Integrating Docker into existing projects

If you are already running a Spryker project based on Development Virtual Machine or any other solution, you can convert it into a Docker based project. 
Learn how to convert a project into a Docker based instance in [Integrating the Docker SDK into existing projects](https://documentation.spryker.com/docs/integrating-the-docker-sdk-into-existing-projects).

## Running production 

Currently, there is no installation guide for deploying Spryker in Docker in a production environment. But you can generate the images suitable for a production environment and the archives with assets for each application - Yves, BackOffice(Zed) and Glue.

Learn how to generate Docker images and assets for a production environment in [Running production](https://documentation.spryker.com/docs/running-production).

## Next steps 
Once you've selected and installation mode, follow one of the guides below:
* [Installing in Development mode on MacOS and Linux](https://documentation.spryker.com/docs/installing-in-development-mode-on-macos-and-linux)
* [Installing in Development mode on Windows](https://documentation.spryker.com/docs/installing-in-development-mode-on-windows)
* [Installing in Demo mode on MacOS and Linux](https://documentation.spryker.com/docs/installing-in-demo-mode-on-macos-and-linux)
* [Installing in Demo mode on Windows](https://documentation.spryker.com/docs/installing-in-demo-mode-on-windows)
* [Integrating Docker into existing projects](https://documentation.spryker.com/docs/integrating-docker-into-existing-projects)
* [Running production](https://documentation.spryker.com/docs/running-production)
