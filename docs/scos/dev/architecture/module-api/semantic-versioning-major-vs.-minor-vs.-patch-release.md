---
title: Semantic Versioning- Major vs. Minor vs. Patch Release
description: Spryker releases update as major, minor, patch release or a bugfix. Learn more about them in this article.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/major-minor-patch-release
originalArticleId: 5ec4d624-685a-4332-bb21-6228cb63ca74
redirect_from:
  - /2021080/docs/major-minor-patch-release
  - /2021080/docs/en/major-minor-patch-release
  - /docs/major-minor-patch-release
  - /docs/en/major-minor-patch-release
  - /v6/docs/major-minor-patch-release
  - /v6/docs/en/major-minor-patch-release
  - /v5/docs/major-minor-patch-release
  - /v5/docs/en/major-minor-patch-release
  - /v4/docs/major-minor-patch-release
  - /v4/docs/en/major-minor-patch-release
  - /v3/docs/major-minor-patch-release
  - /v3/docs/en/major-minor-patch-release
  - /v2/docs/major-minor-patch-release
  - /v2/docs/en/major-minor-patch-release
  - /v1/docs/major-minor-patch-release
  - /v1/docs/en/major-minor-patch-release
---

The Spryker Commerce OS versioning of modules relies on the [semantic versioning](https://semver.org/) approach, which implies a clear set of rules and requirements that dictate how version numbers are assigned and incremented. This article describes how we release modules and version them depending on the release type.

## What is a Release?

A Pull Request can ship a new Feature, Bugfixes, and Improvements to existing features. A Pull Request contains one or multiple modules. Each module can be a **major, minor**, or **patch** release.

## What is a "Major Release"?

A release is a **major** when we make a change in the [external API of a module](/docs/scos/dev/architecture/module-api/definition-of-module-api.html). This includes changes to the internal contract. E.g., even when there is no change of a facade-method, there can be a change in the behavior so that the contract (~ expected behavior) changed. Please obey the constraints for major releases.

Our customers need to change their `composer.json` file to get major versions of modules.

We have two types of Major Releases:

* A "Maxi Major", when the release effort is higher than 4 hours for clients who did not extend the module. This typically happens when data needs to be migrated. In case of a Maxi Major, the previous version automatically gets all bug fixes and security patches (LTS) as long as anyone uses this version.
* A "Mini Major", when the release effort is lower than 4 hours for clients who did not extend the module.

## What is a "Minor Release"?

A release is **minor** when the internal API was changed. For instance, when the signature of internal models or constructors is changed, classes are renamed, etc. Actually, anything that can break extensions via inheritance or composition on a project level.

Our customers will get all new minor releases automatically during composer update if they use the ^ symbol in `composer.json` (e.g. `"spryker/category": "^4.1.2"`). We recommend to use the `~` symbol (e.g. `"spryker/category": "~4.1.0"`) for all modules that have been extended at the project level to make sure that nothing breaks after a release. See [Using ~ Composer Constraint for Customized Modules](/docs/scos/dev/architecture/module-api/using-composer-constraint-for-customized-modules.html) on how you can easily detect `^` in the extended modules and update them with `~`.

## What is a "Patch Release"?

A release is a patch when the internal API of a module is not changed. So all internal method-signatures are unaffected, and there is no change in the call-flow or behavior of any method.

{% info_block infoBox %}

It is very important to understand that Patch Release and Bugfix are not the same. A Bugfix can be released as Major, Minor or Patch-Release, depending on the compatibility level. A Patch-Release can also ship an improvement of a feature (e.g., a performance increase).

{% endinfo_block %}

## Taking Updates

Usually, you need to run `composer update` to get Spryker Core updates, as by default the modules are constrainted with ^. After each update, you need to run `console transfer:generate` to update DTOs. Adding a field to DTO is BC change and could be considered as Minor or Patch release.
{% info_block infoBox %}

Some minor updates require specific development effort for the project, which is caused by deprecation of some old approach or 3rd party modules. It's adviced to check out the [release notes](/docs/scos/user/intro-to-spryker/releases/release-notes/release-notes.html) published after the project's start.
Also, check out [General Troubleshooting](/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/class-silex-controllerproviderinterface-not-found.html) for solutions of general technical issues you might have.

{% endinfo_block %}

