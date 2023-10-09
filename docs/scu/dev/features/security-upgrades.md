---
title: Handling Security Releases by Spryker Code Upgrader
description: How Spryker Code Upgrader works with releases related to known security vulnerabilities
template: concept-topic-template
---

TBD: Generic Description

# What kind of security releases covered?

The static code analysis tools provide the capability to detect various known vulnerabilities.

These tools assist in identifying and preventing potential security risks from these sources:
1. Spryker Security releases
2. PHP Ecosystem
3. NPM Ecosystem

## Spryker Security releases

Security release is a type of release that aims to deliver a security vulnerability fixes, rather than introducing new features or functionalities.
The example of security release is [https://api.release.spryker.com/release-group/4753](https://api.release.spryker.com/release-group/4753)

The security releases are applied alongside other releases, but the security release being prioritized and delivered first, ensuring the fast delivery of critical security updates.

Automatic installation of security releases is only available between the major version releases. However, the major releases require manual installation, similar to all major releases.

[Evaluator analysis tool](/docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html) can be used to detect if there are any security fixes available for the Spryker modules in your project.
It has the corresponding [Spryker security checker](docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/spryker-security-checker.md) for that.

## PHP Ecosystem
The PHP ecosystem refers to everything related to the PHP code, which includes the Spryker PHP conventions and rules.

To detect violations related to it [Evaluator analysis tool](/docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html) can be used.

The Evaluator checkers responsible for that:
- [Additional logic in dependency provider checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/additional-logic-in-dependency-provider.html)
- [Container set function checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/container-set-function.html)
- [Dead code checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/dead-code-checker.html)
- [Minimum allowed shop version checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/minimum-allowed-shop-version.html)
- [Multidimensional array checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/multidimensional-array.html)
- [Open-source vulnerabilities checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/open-source-vulnerabilities.html)
- [PHP versions checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/php-version.html)
- [Plugin registration with restrictions checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/plugin-registration-with-restrintions.html)
- [Single plugin argument checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/single-plugin-argument.html)
- [Spryker dev packages checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/spryker-dev-packages-checker.html)
- [Upgradability guidelines checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html)

## NPM Ecosystem
The NPM ecosystem refers to everything related to the packages and tools available through the NPM.

NPM violations can be detected by [Evaluator analysis tool](/docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html) with the corresponding [NPM checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/npm-checker.html) for that.
