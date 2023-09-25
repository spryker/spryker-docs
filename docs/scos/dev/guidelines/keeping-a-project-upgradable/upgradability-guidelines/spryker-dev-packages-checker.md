---
title: Spryker dev packages checker
description: Reference information for evaluator tools.
template: howto-guide-template
---

Spryker dev packages checker checks the project spryker dependencies for the "dev-*" constraints.

## Problem description

The project contains the spryker packages dependencies in the `require` section of the `composer.json` file.

Integration may break if some of these packages have references to specific branches using `dev-*` constraint versions.

To prevent this, it is essential to ensure that all Spryker packages have valid version constraints.

## Example of code that causes an evaluator error

composer.json
```json
{
    "name": "spryker-shop/b2b-demo-shop",
    "description": "Spryker B2B Demo Shop",
    "license": "proprietary",
    "require": {
      "spryker/asset": "dev-master",
      "spryker/asset-storage": "dev-some-branch"
    }
}
```

## Example of an evaluator error message

```bash
============================
SPRYKER DEV PACKAGES CHECKER
============================

Message: Spryker package "spryker/asset:dev-master" has forbidden "dev-*" version constraint 
 Target: spryker/storage-gui                                                                    
                                                                                                
Message: Spryker package "spryker/asset-storage:dev-some-branch" has forbidden "dev-*" version constraint 
 Target: spryker/uuid                                                                                                           
                                                                                                                                

Read more: https://docs.spryker.com/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/spryker-dev-packages-checker.html

```