---
title: Upgrade project packages
description: This document describes how to upgrade project packages.
template: howto-guide-template
---

## Resources for migration

Backend


## Project with feature packages
1. Open a public demo shop that has been used for your project as a boilerplate, like the [B2C Demo Shop](https://github.com/spryker-shop/b2c-demo-shop/blob/202108.0/composer.json).
    Change the version of the release tag to the one you are going to update.
2. Find the feature package which you want to update from release A to release B and check if this feature package is
    still present in release B.
    * If it is, then change the version in `composer.json` for this feature package to newer and run the update:
        ```bash
        composer update spryker-feature/catalog
        ```
        it’s highly likely that the package itself could not be updated, because the newer version requires other updates
        to happen first. To solve this challenge use `-W` flag or `--update-with-dependencies`:
        ```bash
        composer update spryker-feature/catalog --update-with-dependencies
        ```
    * If it’s not, then find which feature package has been released as a replacement. For this, you can navigate to
        the [Spryker release app](https://release.spryker.com/features/view/76) and see the **Deprecation Note** section.
        Remove the deprecated feature package from `composer.json` and require a new one which replaces it:
        ```bash
        composer require spryker-feature/catalog:^202108.0 --update-with-dependencies
        ```
3. Once feature-package updated/installed, it’s necessary to open feature package dependencies diff and go through each
    dependency of your feature package and see what has been changed for them:

    Imagine we had the following migration `spryker-feature/catalog: ^A` → `spryker-feature/catalog:^B`.

    **Example 1**: Inside the feature package we had **major** changes between releases:
    `spryker/catalog:^3.0.0` → `spryker/catalog:^4.0.0`. It means that we need to perform [additional steps](/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/upgrade-project-packages.html#majors).

    **Example 2**: Inside the feature package we had **minor** changes between releases:
    `spryker/catalog:^3.0.0` → `spryker/catalog:^3.5.0`. It means that we need to perform [additional steps]((/docs/scos/dev/migration-program/migration-to-paas/paas-migration-documents/upgrade-project-packages.html#minors)).
4. Check extended vendor classes of recently updated packages on the project level with newer versions inside the
    vendor folder in order to validate the backward compatibility.
5. Remove the deprecated feature package once you have installed all required replacements.

## Project without feature packages

### Minors

1. Run composer outdated command to get the list of modules that requires update:
    ```bash
    composer outdated --minor-only
    ```
2. Try to update a single package:
    ```bash
    composer update spryker/shipment
    ```

    it’s highly likely that, the package itself could not be updated, because newer version requires other updates to
    happen first. To solve this challenge use `-W` flag or `--update-with-dependencies`:
    ```bash
    composer update spryker/shipment --update-with-dependencies
    ```

    this flag will update dependent packages as well as the one which is explicitly specified `spryker/shipment`.
3. It could be the case that there is some migration steps has to be performed even for minor update, so it’s better to
    double check [migration guide](/docs/scos/dev/module-migration-guides/about-migration-guides.html).
4. Navigate to GitHub and see the diff for updated packages and compare if updated version is compatible with project's code.
5. If module has been customised on project it has to be bind with `~` so only patches could be received within next updates automatically:
    ```json
    "spryker/country": "~3.4.0",
    ```

### Majors

1. Bump up major version of the module in `composer.json`:
    ```bash
    "spryker/{package-name}": "^4.0.5" -> "spryker/{package-name}": "^5.0.0"
    ```

    and execute the update command from console:
    ```bash
    composer update spryker/{package-name}
    ```

    It’s possible that new major version requires additional packages to be updated as well. To solve this challenge
    use `-W` flag or `--update-with-dependencies`:
    ```bash
    composer update spryker/{package-name} --update-with-dependencies
    ```
2. Follow migration guide for a major update you are going to perform in the [documentation](/docs/scos/dev/module-migration-guides/about-migration-guides.html).
3. Navigate to Github and see the diff for updated packages and compare if updated version is compatible with project's code.
4. If module has been customised on project it has to be bind with `~` so only patches could be received within next updates automatically:
    ```json
    "spryker/country": "~3.4.0",
    ```
5. If major update contains DB structural changes it could be necessary to create propel migration in order to fulfil
    some required data. This step should be applied based on specific update analysis.

### Note

After modules update it’s up to project if you want to replace now concrete modules in `composer.json` with feature packages.

## Common sanity steps after Major and Minor updates

1. Check that FE dependencies versions of updated packages matches FE dependencies versions of project, e.g. Angular, Node JS versions.
2. Run some automated checkers right after packages update, things like **phpcs**, **phpmd** and **phpstan** could already
    identify bugs produced by update.
3. Run project’s automated tests.
4. Perform smoke tests e.g. add to cart, checkout steps, place order.
5. After each feature upgrade please, check the corresponding feature integration guide, go through all the guide steps
    and check if all the requirements are fulfilled, for example, if all the plugins are injected, if glossary
    translations are added, widgets, etc. All the feature integration guides are [here](/docs/scos/dev/feature-integration-guides/202204.0/feature-integration-guides.html).
    At the top of the right sidebar, you can choose a version to which you upgraded the feature package to see actual for you information.

    In case your project has no feature packages in `composer.json` you can find to which feature the module you updating
    belongs using `composer.json`/`composer.lock` from the demo shop Git repository and update all the feature-related
    modules together to be able to use integration guides.
6. Check project dependency providers if there are usages of deprecated plugins and if yes, please replace deprecated plugins
    with new plugins mentioned in deprecated ones. In order to search for deprecated plugins usages using `PhpStorm`,
    you need to do the following steps:
    * Open `Code` → `Inspect Code`;
    * Create new `Custom Scope` with pattern `file[spryker]:src/*DependencyProvider.php`;
    * Create a new inspection profile with only one rule `PHP` → `General` → `Deprecated`;
    * Run the inspection tool and check all the deprecated plugins it found.

## Hints

* Spryker [guide](/docs/scos/dev/updating-a-spryker-based-project.html#spryker-product-structure) about project updates.
* If for some reasons it’s unclear what has to be modified on project level after the minor/major update then
    the default demoshops could be used as an examples:
    * [B2B Demo Shop](https://github.com/spryker-shop/b2b-demo-shop)
    * [B2C Demo Shop](https://github.com/spryker-shop/b2c-demo-shop)
    * [B2B Demo Marketplace](https://github.com/spryker-shop/b2b-demo-marketplace)
    * [B2C Demo Marketplace](https://github.com/spryker-shop/b2c-demo-marketplace)
* If module is outdated for more than 1 major version than smooth update per one major at a time is safer e.g. current
    version of ModuleA is v1.0.0, newest version is v3.0.0, it means that first you need to update to v.2.0.0 and only after that to v3.0.0.
* Use the following command to get the list of extended modules on project level, in case those extended versions were locked:
    ```bash
    console code:constraint:modules -d
    ```
* Use `composer why-not` feature in order to understand why certain package couldn’t be installed:
    ```bash
    composer why-not spryker/{package-name} 2.9.1
    ```
