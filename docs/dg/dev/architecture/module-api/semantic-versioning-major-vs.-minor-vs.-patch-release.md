---
title: "Semantic versioning: major vs. minor vs. patch release"
description: Spryker releases update as major, minor, patch release or a bugfix. Learn more about them in this document.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/major-minor-patch-release
originalArticleId: 5ec4d624-685a-4332-bb21-6228cb63ca74
redirect_from:
  - /docs/scos/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html
related:
  - title: Performance and scalability
    link: docs/dg/dev/architecture/module-api/performance-and-scalability.html
  - title: Using ~ Composer constraint for customized modules
    link: docs/dg/dev/architecture/module-api/use-composer-constraint-for-customized-modules.html
  - title: "Declaration of module APIs: Public and private"
    link: docs/dg/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html
---

The Spryker Commerce OS versioning of modules relies on the [semantic versioning](https://semver.org/) approach, which implies a clear set of rules and requirements that dictate how version numbers are assigned and incremented. This document describes how we release modules and version them depending on the release type.

## Release

A pull request can ship a new feature, bug fixes, and improvements to existing features. A pull request contains one or multiple modules. Each module can be a *major*, *minor*, or *patch* release.

## Major release

When we make a change to the [external API of a module](/docs/dg/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html), it's a major release. This includes changes to the internal contract. Even when there is no change in a facade method, there can be a change in the behavior so that the contract (~ expected behavior) changes. Obey the constraints for major releases.

Our customers need to change their `composer.json` file to get major versions of modules.

We have two types of major releases:
- A *maxi-major*. When the release effort is higher than four hours for clients who did not extend the module. This typically happens when data needs to be migrated. In case of a maxi-major release, the previous version automatically gets all bug fixes and security patches (LTS) as long as anyone uses this version.
- A *mini-major*. When the release effort is lower than four hours for clients who did not extend the module.

## Minor release

A release is *minor* when the internal API is changed. For example, when the signature of internal models or constructors is changed, or classes are renamed. Actually, it's anything that can break extensions using inheritance or composition on a project level.

Our customers get all new minor releases automatically during composer update if they use the *^* (caret) symbol in `composer.json`—for example, `"spryker/category": "^4.1.2"`. We recommend using the *~* (tilde) symbol for all modules that have been extended at the project level to make sure that nothing breaks after a release—for example, `"spryker/category": "~4.1.0"`. For mode details about how you can easily detect *^* in the extended modules and update them with *~*, see [Using ~ Composer Constraint for Customized Modules](/docs/dg/dev/architecture/module-api/use-composer-constraint-for-customized-modules.html)

## Patch release

A release is a patch when the internal API of a module is not changed. So all internal method signatures are unaffected, and there is no change in the call flow or behavior of any method.

{% info_block infoBox %}

Patch release and bug fix are not the same. A bug fix can be released as a major, minor, or patch release, depending on the compatibility level. A patch release can also ship an improvement of a feature—for example, a performance increase.

{% endinfo_block %}

## Taking updates

Usually, you need to run `composer update` to get Spryker Core updates, because by default the modules are constrained with `^`. After each update, you need to run `console transfer:generate` to update DTOs. Adding a field to DTO is BC change and can be considered as a minor or patch release.

{% info_block infoBox %}

Some minor updates require specific development effort for the project, which is caused by the deprecation of some old approaches or third-party modules. We recommend reading the [release notes](/docs/about/all/releases/product-and-code-releases.html) published after the project's start.

For solutions to general technical issues you might have, see [Troubleshooting general technical issues](/docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-general-technical-issues.html).

{% endinfo_block %}
