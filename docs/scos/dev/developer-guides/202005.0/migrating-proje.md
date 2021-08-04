---
title: Migrating Projects to the Latest Spryker Version with Spryker Jarvis
originalLink: https://documentation.spryker.com/v5/docs/migrating-projects-to-the-latest-spryker-version-with-spryker-jarvis
redirect_from:
  - /v5/docs/migrating-projects-to-the-latest-spryker-version-with-spryker-jarvis
  - /v5/docs/en/migrating-projects-to-the-latest-spryker-version-with-spryker-jarvis
---

[Spryker Jarvis](https://github.com/spryker/jarvis)’s goal is to help you migrate your project to the most up-to-date version of Spryker.

This tool is meant for developers working on the Spryker projects. Spryker Jarvis can also be useful for project managers, as it answers the question “How outdated is the project?“.

This article will teach you how to install and use the Spryker Jarvis tool for upgrade and analysis of your project.

## Prerequisites
Before you can install Spryker Jarvis, make sure that you have:

* [Spryker project installed locally.](https://documentation.spryker.com/docs/en/dev-getting-started#step-1--install-spryker)
* [NodeJS installed.](https://nodejs.org/en/download)  

## Installation
To install Spryker Jarvis:

1. Fork/Clone/Download [Spryker Jarvis repository](https://github.com/spryker/jarvis).
2. Open the terminal and do the following:
    2.1. Go to the Spryker Jarvis folder.
    2.2. Run `npm install`.

That’s it. Now you have Spryker Jarvis installed.

## Usage
To migrate your project to the latest version of Spryker using the Spryker Jarvis tool:

Inside the Spryker Jarvis folder, run `node jarvis.js <path to your spryker project folder>`.

Follow the terminal script about your project name.

Open `http://localhost:7777` in your browser and enjoy the migration analysis.

## Migration Views
Depending on the specifics of your project and your goals, you can use various migration views available in Jarvis and take necessary actions. There are three views that are meant for the following goals:

* Migration to a newer product release.
* Upgrading your project modules to their current major versions.
* Upgrading your project with the compatible Spryker features.

### Migration to a Newer Product Release
Run `node jarvis.js <path to your spryker project folder>` in the terminal to see this view:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screenshot+2020-08-04+at+13.55.08.png){height="" width=""}

This view lists all the Spryker features for your project, where manual migration is needed. For each feature, we list the upgraded and removed dependencies. Each dependency contains the migration guide that you should follow to migrate. We also show the namespace you should check in your project when a dependency is removed from a feature:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screenshot+2020-08-04+at+13.58.50.png){height="" width=""}

It can be that a dependency has been upgraded, but no migration is needed. In this case, we will highlight it:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screenshot+2020-08-04+at+14.00.13.png){height="" width=""}

### Upgrading Modules to their Current Majors

Run `node jarvis.js <path to your spryker project folder> --no-features` in the terminal to see this view.

This view is only useful when your project does not use Spryker features, as it lists just modules.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screenshot+2020-08-06+at+09.57.56.png){height="" width=""}

This view allows you to understand to what extent your project is outdated. You can see all modules that are behind majors and minors.

By clicking a module, you will see its detailed view as shown in the video below.

<video width="720" height="480" controls>
  <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screen+Recording+2020-08-06+at+10.04.06.mov">
</video>

The detailed view allows you to migrate your modules to the latest version of their current majors. You can also see the changes between your current version and the latest version of the next major.

### Upgrading your Project with the Compatible Spryker Features
Run `node jarvis.js <path to your spryker project folder> --missing-features` in the terminal to see this view.

This view is useful when you want to use Spryker features but do not know which versions are compatible with your project.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screenshot+2020-08-06+at+10.42.15.png){height="" width=""}

This view allows you to see all Spryker features that are compatible with your project and which minimum version you must take.

Here you can also see what modules are already installed on your project and what are missing. To install the missing modules, follow the [integration guide](https://documentation.spryker.com/docs/en/about-integration) of the respective feature.

<video width="720" height="480" controls>
  <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screen+Recording+2020-08-06+at+10.50.47.mov">
</video>

Most of the time, you will need to add missing dependencies to your project to be able to use the Spryker features. But in some cases, you can swap your modules with the Spryker features, because your project already has all the dependencies:

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Migrating+Your+Project+to+the+Latest+Spryker+Version+with+Spryker+Jarvis/Screenshot+2020-08-06+at+11.02.11.png){height="" width=""}


