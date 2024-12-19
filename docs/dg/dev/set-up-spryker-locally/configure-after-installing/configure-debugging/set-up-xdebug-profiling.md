---
title: Set up XDebug profiling
description: Learn how to setup XDebug profiling in a local development environment for your Spryker based projects.
template: howto-guide-templatel
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-setup-xdebug-profiling.html

last_updated: Jun 19, 2023
---

This document explains how to set up *XDebug profiling* in a local development environment to understand in detail the cost of functions and transactions in terms of time and memory demand. XDebug profiling lets you analyze your applications, find out the reason for performance and stability issues, and start profiling your Spryker project.

## Prerequisites

* An integrated development environment (IDE) of your choice—for example, PHPStorm or Visual Studio Code.
* A plugin or software to view cachegrind files: kqachegrind, qcachegrind, or a plugin for your IDE.

## 1. Prepare the deploy.yml file for XDebug

Spryker's `deploy.yml` file brings native support for all the configurations you need to activate the profiling mode of XDebug and route the created profiling snapshots to a location of your choice. The following code is an example that you can adjust according to your needs:
```yml
environment: docker.dev
image:
    tag: spryker/php:8.1
    php:

        ini:
            # Switch XDebug Mode to profile
            "xdebug.mode": profile
            # Define a folder to route the output to. Please create this folder in your project as it will not be created automatically.
            "xdebug.output_dir": "/data/src/Generated/Xdebug"

```

## 2. Set up XDebug configuration

To use XDebug with your IDE, configure your IDE so it can connect to your application. For this, see [Configuring debugging in Docker](/docs/dg/dev/set-up-spryker-locally/configure-after-installing/configure-debugging/configure-debugging.html).

## 3. Bring up your application and start profiling

1. Once your application is setup, you can start everything up:
```bash
# Bootstrap your adjusted deploy.yml file. Here you have used deploy.dev.yml
docker/sdk boot deploy.dev.yml
# Next, we start up the application in debugging mode
docker/sdk up -x
```

2. When the application is running, you can navigate the shop. This creates cachegrind files in the folder created and specified in the `deploy.yml` file.

To create profiles for console commands, start the command line interface (CLI):
```bash
# We can start up CLI in debugging mode too:
docker/sdk cli -x
```

Running any command from CLI creates cachegrind files, and you can now see them create in your file system:

![XDebug cachegrind files](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-setup-x-debug-profiling/cachegrind-files-in-IDE.png)

## 4. Analyze your results

When cachegrind files are  created, you can analyze them. For this, you have multiple options. Some IDEs, like PHPStorm, bring native support for viewing cachegrind files. To access the corresponding tool, navigate to **Tools**&nbsp;<span aria-label="and then">></span> **Analyze Xdebug Profiler Snapshot**.

For Visual Studio Code, you can use an extension such as PHP Profiler by DEVSENSE.
You can also use a standalone cachegrind viewer, such as [KCachegrind](https://kcachegrind.github.io/html/Home.html) (Linux) or [QCachegrind](https://github.com/ekiefl/qcachegrind-mac-instructions) (MacOS/Windows).

The following examples show how a cachegrind file looks like when opened with the standalone cachegrind file viewer QCachegrind.

You can look at what function was the most expensive in terms of time:

![Cachegrind Analysis Time spent](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-setup-x-debug-profiling/qcachegrind-time-spent.png)

You can also see which one was the most expensive in terms of memory:

![Cachegrind Analysis Memory used](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-setup-x-debug-profiling/qcachegrind-memory-used.png)

## Next steps

Once you have deployed your application, you can use NewRelic APM to monitor its performance in real-time. If you still haven't done it, see the "New Relic" section in the [Configure services](/docs/dg/dev/integrate-and-configure/configure-services.html#new-relic) guide.
