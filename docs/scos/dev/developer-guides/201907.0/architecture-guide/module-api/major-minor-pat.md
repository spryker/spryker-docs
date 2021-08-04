---
title: Major vs. Minor vs. Patch Release
originalLink: https://documentation.spryker.com/v3/docs/major-minor-patch-release
redirect_from:
  - /v3/docs/major-minor-patch-release
  - /v3/docs/en/major-minor-patch-release
---

## What is a Release?

A Pull Request can ship a new Feature, Bugfixes and Improvements to existing features. A PR contains one or multiple modules. Each module can be a major, minor or patch release.

It is very important to understand, that Patch Release and Bugfix are not the same. A Bugfix can be released as Major, Minor or Patch-Release, depending on the compatibility level. A Patch-Release can also ship an improvement of a feature (e.g. a performance increase).

## What is a "Major Release"?

A release is a major when we make a change in the external API of a module (see [Definition of Api](/docs/scos/dev/developer-guides/202001.0/architecture-guide/module-api/definition-api)). This includes changes to the internal contract. E.g. even when there is no change of a facade-method there can be a change in the behavior so that the contract (~ expected behavior) changed. Please obey the constraints for major releases.

Our customers need to change their `composer.json` file to get major versions of modules.

We have two types of Major Releases:

* A "Maxi Major" when the release effort is higher than 4 hours for clients who did not extend the module. This typically happens when data needs to be migrated. In case of a Maxi Major then the previous version automatically get all bug fixes and security patches (LTS) as long as anyone uses this version.
* A "Mini Major" when the release effort is lower than 4 hours for clients who did not extend the module.

## What is a "Minor Release"?

A release is minor when the internal API was changed. For instance, when the signature of internal models or constructors is changed, classes are renamed, etc. Actually, anything that can break extensions via inheritance or composition on a project level.

Our customers will get all new minor releases automatically during composer update if they use the ^ symbol in `composer.json` (e.g. `"spryker/category": "^4.1.2"`). We recommend to use the `~` symbol (e.g. `"spryker/category": "~4.1.0"`) for all modules that have been extended in project level to make sure that nothing breaks after a release. See [Using ~ Composer Constraint for Customized Modules](/docs/scos/dev/developer-guides/202001.0/architecture-guide/module-api/using-composer-) on how you can easily detect `^` in the extended modules and update them with `~`.

## What is a "Patch Release"?

A release is a patch when the internal API of a module is not changed. So all internal method-signatures are unaffected and there is no change in the call-flow or behavior of any method.

## Taking Updates

Usualy you need to run composer update to get Spryker Core updates as by default modules are constrainted with ^. After each update you need to run console transfer:generate to update DTOs. Adding a field to DTO is BC change and could be considered as Minor or Patch release.
