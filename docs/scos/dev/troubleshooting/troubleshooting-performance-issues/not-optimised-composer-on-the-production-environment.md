---
title: Not optimized Composer on the production environment
description: Fix the issue when all pages are slow on the production environment
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-performance-issues/not-optimised-composer-on-the-production-environment.html

last_updated: Mar 1, 2023
---

All pages are slow on the production environment.

## Cause

The possible cause can be an unoptimized Composer for the production environment.

Here is an example of a profile from [Blackfire](/docs/dg/dev/integrate-and-configure/configure-services.html#blackfire):

![blackfire-profile](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/not-optimised-composer-on-the-production-environment/blackfire-profile.png)

As can be seen, there are many *file_exists* checks and *findFilewithExtension* that should be optimized.

## Solution

Optimize the Composer autoloader. Follow the [general performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html#opcache-activation) and [Composer guidelines](https://getcomposer.org/doc/articles/autoloader-optimization.md#optimization-level-1-class-map-generation).

For example, you can run the `dump-autoload` command with `-o ` or `--optimize`.

After running the command defined in the guidelines, the profile can look like this:

![profile-after-command](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/not-optimised-composer-on-the-production-environment/profile-after-command.png)

As you can see, the two most time-consuming points are gone.

The comparison view looks like this:

![comparison-view](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/not-optimised-composer-on-the-production-environment/comparison-view.png)

We have optimized 40% of all time on the same action and reduced the number of `file_exists` checks and `findFilewithExtension`.

Some other possible optimizations include, for example, running the `dump-autoload` command with `-a` / `--classmap-authoritative`.

This is what profiling looks like after running this command:

![profiling-after-running-the-command](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/not-optimised-composer-on-the-production-environment/profile-after-running-the-command.png)

To identify what exactly got updated, check the comparison view:

![comparison-view](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/not-optimised-composer-on-the-production-environment/comparison-view-after-running-the-command.png)

Now, way more actions got removed from the profiling result. The time is optimized by 87% from the initial report.

However, to avoid any potential issues with the autoloader optimization, check trades-offs on the [official autoloader website](https://getcomposer.org/doc/articles/autoloader-optimization.md#optimization-level-1-class-map-generation).
