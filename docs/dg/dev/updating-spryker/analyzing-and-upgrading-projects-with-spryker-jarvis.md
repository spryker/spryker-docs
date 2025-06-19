---
title: Analyzing and upgrading projects with Spryker Jarvis
description: Learn how to install and use the Spryker Jarvis tool for upgrade and analysis of your project.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/analyzing-and-upgrading-your-project-with-spryker-jarvis
originalArticleId: 156a13c8-ce34-4d8f-ba1c-203af2975226
redirect_from:
  - /docs/scos/dev/updating-spryker/analyzing-and-upgrading-projects-with-spryker-jarvis.html
  - /docs/scos/dev/analyzing-and-upgrading-your-project-with-spryker-jarvis.html
---

<!-- Remove this doc until the end of 2024 -->

{% info_block warningBox "Jarvis deprecation" %}

Jarvis is not actively supported. For upgrading your projects, use [Spryker Code Upgrader](/docs/ca/devscu/spryker-code-upgrader.html).

{% endinfo_block %}

[Spryker Jarvis](https://github.com/spryker/jarvis) is the command-line tool that lets you analyze your Spryker-based project and eventually migrate it to the most up-to-date version of Spryker. The tool helps you quickly get answers to the following questions:

- How outdated is your project compared to the latest Spryker product release?
- What features does your project already use, and what are the other features it could use?
- What should you do to update your project to the latest Spryker product release?
- How did the new Spryker module version affect your project?
- How far are your modules behind the latest Spryker minor and major module versions?
- What features are compatible with your current project version?

Spryker Jarvis is meant mostly for developers working on the Spryker projects who want to get a clear view of what it takes to update their project to the latest product release version of Spryker. The tools can also be useful for project managers, as it answers the question "How outdated is the project?" and helps to estimate efforts to update the project.

This document shows how to install and use the Spryker Jarvis tool for the analysis and upgrade of your project.

## Prerequisites

- [Install Spryker project locally](/docs/dg/dev/development-getting-started-guide.html#install-spryker)
- [Install Node.js](https://nodejs.org/en/download/package-manager)

## Install Spryker Jarvis

1. Fork, clone, or download the [Spryker Jarvis repository](https://github.com/spryker/jarvis).
2. Open the terminal and do the following:
    1. Go to the Spryker Jarvis folder.
    2. Run `npm install`. Now you have Spryker Jarvis installed.

## Use Spryker Jarvis to migrate your project

To migrate your project to the latest version of Spryker using the Spryker Jarvis tool, follow these steps:

1. Inside the Spryker Jarvis folder, run the command

```bash
node jarvis.js <path to your spryker project folder>
```

2. Follow the terminal script about your project name.
3. In your browser, open `http://localhost:7777` and enjoy the migration analysis.

## Jarvis views

Depending on your project's specifics and your goals, you can use various migration views available in Jarvis and take necessary actions. There are three views:

- *Basic* view—for migrating to a newer product release.
- *No-features* view—for upgrading your project modules to their current major and minor versions.
- *Missing-features* view—for upgrading your project with the compatible Spryker features.

<a name="basic"></a>

### Basic view: Migrating to a newer product release

To migrate to a newer product release, use the Jarvis *basic* view. This view lists all the Spryker features that require an upgrade to make your project up-to-date with the latest Spryker version. For each feature, the upgraded and the removed dependencies are listed.

This view is especially useful when:

- You have a Spryker-based product and finished the main development part of it.
- Your project uses feature repositories, or the project is based on the Spyker[B2B Demo Shop](/docs/about/all/b2b-suite.html) or the [B2C Demo Shop](/docs/about/all/b2c-suite.html).

Use this view if you want to stay up-to-date with Spryker and get new features of every Spryker product release.

To see this view, run `node jarvis.js <path to your spryker project folder>` in the terminal. This shows you the main Spryker Jarvis page with information about the product release you can upgrade your project to.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screenshot+2020-08-04a+at+13.58.50.png)

It can be that a dependency has been upgraded, but no migration is needed. In this case, we will highlight it:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screenshot+2020-08-04+at+14.00.13.png)

In this view, under the list of features to upgrade and the dependencies, you can also check the features you don't use but might be interested in. The recently released features are marked as *New feature*:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/unused-features.png)

 You can go to the repository of each feature by clicking the feature names.

### No-features view: Upgrading modules to their current versions

To upgrade your modules to their current major and minor versions, use the *no-features* view.

This view provides information about modules that have been upgraded to new versions by Spryker.

The *no-features* view is especially useful when your project does not use any feature repository; you use just modules. This can be the case if your project is in active development or is very old.

Use this view to understand to what extent your project is outdated and estimate the effort to update it.

{% info_block infoBox "Note" %}

If you use Spryker features and want to be up-to-date with them, we recommend using the [basic view](#basic-view-migrating-to-a-newer-product-release).

{% endinfo_block %}

To see this view, run `node jarvis.js <path to your spryker project folder> --no-features` in the terminal. This shows you what modules are behind their minor and major versions, and how far they are behind:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screenshot+2020-08-06+at+09.57.56.png)

To see details on a module, such as, what changes have been made in the later versions compared to your module version, click the module:

<video width="720" height="480" controls>
  <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screen+Recording+2020-08-06+at+10.04.06.mov">
</video>

The detailed view of modules lets you analyze the changes, and if needed, upgrade the modules. To upgrade to the latest minor module versions, run the module [composer update command](/docs/dg/dev/set-up-spryker-locally/manage-dependencies-with-composer.html#composer-update). To upgrade to a major version, follow the migration guide of the respective module.

### Missing-features view: Upgrading your project with the compatible Spryker features

To upgrade your project with the compatible Spryker features, use the *missing-features* view.

This view shows you what features you can use based on the modules you already have installed. The *missing-features* view tells you which modules you need to install to enable the respective Spryker features. So with this view, you can quickly identify what you need to do to replace separate modules with full-fledged features compatible with your project.

The *missing-features* view is especially useful when your project uses just Spryker modules and does not use the Spryker features, but you want to use them. If you want to start keeping your project up-to-date with the Spryker product release, but you do not know which Spryker features of which versions are compatible with your project, this the right view.

To see this view, run `node jarvis.js <path to your spryker project folder> --missing-features` in the terminal. This shows you which modules of which features you have installed and what modules you still need to install to be able to use those features. This page tells you which highest versions of the features you can replace the modules with and what integration guide you should follow to enable the respective features:

<video width="720" height="480" controls>
  <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screen+Recording+2020-08-06+at+10.50.47.mov">
</video>

In most cases, you need to add missing dependencies to your project to be able to use the Spryker features. But sometimes, you can swap your modules with the Spryker features because your project already has all the dependencies, as in this example:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screenshot+2020-08-06+at+11.02.11.png)

## Current constraints

For now, you can not do the following things with Jarvis:

- In the no-features view, the starting point for module updates is not provided. So as of now, the tool does not tell you which module to update first.
- For the basic view, if you use the old Legacy Demoshop, there is no migration path. To migrate such projects, an individual approach is needed. The same is true if you use an old technology of Spryker, like collectors that have been replaced with Publish&Synchronization.


## Reference

To see Spryker Jarvis in action, check out this video:

{% wistia jtkjogkxht 720 480 %}
