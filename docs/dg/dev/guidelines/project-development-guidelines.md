---
title: Project development guidelines
description: This article describes the strategies a project team can take while building a Spryker-based project.
last_updated: Apr 26, 2024
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/project-development-guidelines
originalArticleId: 3608265d-c19f-4415-83c1-4584d50e48b0
redirect_from:
  - /docs/scos/dev/guidelines/project-development-guidelines.html
related:
  - title: Data Processing Guidelines
    link: docs/dg/dev/guidelines/data-processing-guidelines.html
  - title: Making your Spryker shop secure
    link: docs/dg/dev/guidelines/security-guidelines.html
  - title: Module configuration convention
    link: docs/dg/dev/guidelines/module-configuration-convention.html
---

Spryker OS exposes codebase projects, which enables a high level of customization and can satisfy  complex business requirements.

There are different strategies developers can use to develop projects. Before starting developing, choose a [development strategies](/docs/dg/dev/backend-development/extend-spryker/development-strategies.html) that meets your requirements. To get maximum from the Spryker OS codebase, atomic releases, leverage minimum efforts for the integration of the new features and keeping system up to date, we recommend the following approaches:
- Configuration
- Plug and play
- Project modules

Or you can [develop your own standalone module](/docs/dg/dev/developing-standalone-modules/developing-standalone-modules.html) and use it in your project.

## Updating Spryker
It is essential to ensure that [all Spryker modules are updated](/docs/dg/dev/updating-spryker/updating-spryker.html) to the latest stable version.

During development and after going live, we recommend checking for security updates of external and Spryker dependencies on a regular basis.

Additionally, we recommend keeping all modules up to date in general. [Evaluator tool](/docs/dg/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html) can be helpfull in this case.

In order to keep track of the Spryker's modules updates, you can use the [Release App history page](https://api.release.spryker.com/release-history). Release groups are created for each Spryker's feature/fix release. Each release group contains a list of modules that have been updated. You can use this information to check if any of the modules you are using have been updated and also use provided command to update them manually.

Also, you need to update you infrastructure and use latest provided docker images. E.g. each year we update PHP version and provide new docker images for it. Also all code updates from Spryker side will require new PHP version, so you need to update it as well.
You can check supported PHP versions in the [Docker Hub](https://hub.docker.com/r/spryker/php) or you can check version of Docker SDK in the [Spryker Docker SDK repo](https://github.com/spryker/docker-sdk).

## Apply coding guidelines
Starting from the first day of development, apply the [coding guidelines](/docs/dg/dev/guidelines/coding-guidelines/coding-guidelines.html).
Pay attention to an [architecture convention](/docs/dg/dev/architecture/architectural-convention.html) page as in addition it provides a set of rules and recommendations that applicable specifically for project development.

## Use custom namespaces
Instead of using the `Pyz` namespace, it's possible to use your own namespace for project development. For example, use the project name as a namespace.
Please note that most of existing examples and documentation use the `Pyz` namespace, and you will have to adjust the code every time you want to use it.

## Use custom names
Use custom names for everything that is added on the project level, like the following:
- Transfers
- Transfer properties
- DB tables (using project namespace as a prefix is recommended)
- DB table fields,
- Modules
- Classes

For example, customize the names by adding the project name. This will help to avoid conflicts with the Spryker core and other projects.

## Avoid using, extending, and overriding Private API
Instead of using, extending, and overriding [Private API](/docs/dg/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html) (everything that is not a Public API), send a request about the missing endpoints to your Spryker account manager. Spryker offers extension points that allow you to extend via the Public API and helps you to customize the application. We recommend to use the extension points instead of overriding Private API.

Extending Private API is still possible, but Spryker development team can change them without a notice in the minor change, since Spryker BC break policy is only considering a Public API.
We recommend to not extend Private API classes, but implement new one based on the same interface. In this case changes in core classes will not affect your code.

If you believe that you found a bug in Spryker module, or you want to submit a fix, new functionality by yourself, you can create a pull request to the corresponding module repository. It will be reviewed by the Spryker team and, if it is accepted, it will be merged into the core via our release process. Be advised that such PRs will be checked as a Core contribution and should be prepared accordingly.

## Development and tests
Starting from the first day of development, write tests for all the customizations you implement. We provide infrastructure for unit, functional, and acceptance tests.

## Implement CI/CD
Starting from the first day of development, we recommend establishing an incremental development process based on CI/CD and the tests mentioned in the previous section.

## Establish coding standards
Before you start developing, establish coding standards. Implement code checks based on the standards into your CI/CD. The default code checks shipped with Spryker are located in `/config/install/sniffs.yml`. You might want to add more checks that are based on your project's requirements.

Make sure that the code is merged only when it corresponds to your coding standards. But [Don't be slowed down by Spryker's core rules](#dont-be-slowed-down-by-sprykers-core-rules).

## Code maintainability
Code maintainability is important because it ensures that your code remains understandable, adaptable, and modifiable throughout its lifecycle. It helps development teams to manage and enhance code efficiently, reducing the likelihood of bugs and costly errors over time.

The following tools can help you make your code maintainable:

- [PHPStan](/docs/dg/dev/sdks/sdk/development-tools/phpstan.html)
- [Architecture Sniffer](/docs/dg/dev/sdks/sdk/development-tools/architecture-sniffer.html)
- [Code Style Sniffer](/docs/dg/dev/sdks/sdk/development-tools/code-sniffer.html)
- [PHP Mess detector](https://github.com/spryker/architecture-sniffer)

## Don't be slowed down by Spryker's core rules
Spryker core development has a lot of rules that are not always applicable to the project level. If you find that a rule is slowing you down, you are not forced to use it. But pay attention that some of the rules are not just recommendations, but conventions and must be followed in order to get a working functionality.

E.g. in code development we use Bridges instead of direct usage of Facades from other modules. We do it to keep our dependencies in track, but it's not required for the project level. So there we can use Facades directly.
But you MUST to follow a directory structure, naming conventions, and other rules that are required for the project level. E.g. controllers will not work if you put them in the wrong directory.

## Tips and tricks
It's an always a good idea to define a proper GIt Flow in your project. E.g. as a tip, we recommend to put your ticket ID in the branch name. It will help you to track the changes and to understand what is done in the branch.

Commit messages should also include the ticket ID and a short description of the changes. This will help you to understand what was done in the commit and to track the changes in the future.

Describe what you wanted to achieve in the PR description. It will help the reviewer to understand what you wanted to achieve and to check if it was done correctly.

Add typehints everywhere you can. It will help you to understand what is expected in the method and what is returned. It will also help you to avoid errors in the future.

On the other hand you can avoid using docblocs for the methods that are self-explanatory. Spryker code use those in order to keep code consistent with older versions. But it's definitely not required for the project level.

Use strict types.

Use private scope where you need it. Spryker usually avoids using private scope in order to make the code more flexible and extendable. But on the project level you can use it to make your code more strict and to avoid errors.

Do not use arrays as a return type if possible. Use Transfer objects instead. It will help you to keep your code a bit more strict and understandable for the future developers (or even for you in the future).

Don't leave unused code in the project. It will make your project bigger and harder to maintain. If you don't need it, remove it. Spryker tends to deprecate code that is not used, but on the project you can just remove it. If you really need it in the future, you can check the history of the file in the git.

Spryker code usually focused on code quality and keeping the code clean. We recommend to follow the same approach in your project, but from time to time this approach can decrease a performance. So you need to find a balance between the code quality and performance.

Do not leave credentials in the code.

Define Transfer objects on the project level even if it's defined in the core. It will help you avoid unnecessary dependencies and will make your code more flexible.

Use minor lock on the project for modules that you updated and extended private API. It will help you to avoid critical errors with the next minor update. Installing [Composer Constrainer](https://github.com/spryker-sdk/composer-constrainer) and including `code:constraint:modules` helps automating this process.

Avoid using deprecated code from Spryker. It will be eventually removed and you will need to update your code. So, minimizing the amount of deprecated code reduces the maintenance effort.

Add tests for everything you implement on the project, including the customizations of the core code. Tests ensure modules can be upgraded smoothly and that no errors go to production.

To make code more predictable and understandable, return updated object instead of just updating it by reference.

Use common sense. If you think that something is wrong, it probably is. Check and fix it.
