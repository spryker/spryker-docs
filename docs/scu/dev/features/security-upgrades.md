---
title: Handling Security Releases by Spryker Code Upgrader
description: How Spryker Code Upgrader works with releases related to known security vulnerabilities
template: concept-topic-template
---

Being on top of security releases of your vendor or 3rd-parties is very crusial:
* *Vulnerability Mitigation*: Security updates often address known vulnerabilities or weaknesses in software. Installing these updates promptly helps to mitigate these vulnerabilities, reducing the risk of unauthorized access, data breaches, or malicious activities.
* *Enhanced Protection and risk mitigation*: Security updates typically include patches and improvements that enhance the overall security of the system.
* *Regulatory Compliance*: Many regulatory bodies require organizations to maintain up-to-date security measures, which often includes installing security updates promptly. Compliance with these regulations not only reduces legal and financial risks but also helps to maintain a positive reputation and trust with stakeholders and customers.

# What kind of security releases covered?

The static code analysis tools provide the capability to detect various known vulnerabilities.

These tools assist in identifying and preventing potential security risks from these sources:
1. Spryker Security releases
2. PHP Ecosystem
3. NPM Ecosystem

## Spryker Security releases

Security release is a type of release that aims to deliver a security vulnerability fixes, rather than introducing new features or functionalities.
The example of security release is [https://api.release.spryker.com/release-group/4753](https://api.release.spryker.com/release-group/4753)

The security releases are applied alongside other releases, but the security release is being prioritized and delivered first, ensuring the fast delivery of critical security updates.

Automatic installation of security releases is only available between the major version releases. However, the major releases require manual installation, similar to all major releases.

[Evaluator analysis tool](/docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html) can be used to detect if there are any security fixes available for the Spryker modules in your project.
It has the corresponding [Spryker security checker](docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/spryker-security-checker.md) for that.

## PHP Ecosystem
The PHP ecosystem refers to everything related to the PHP code, which includes the Spryker PHP conventions and rules.

To detect violations related to it [Evaluator analysis tool](/docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html) can be used.

The Evaluator checkers responsible for that:
- [Open-source vulnerabilities checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/open-source-vulnerabilities.html)
- [PHP versions checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/php-version.html)
- [Spryker dev packages checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/spryker-dev-packages-checker.html)

## NPM Ecosystem
The NPM ecosystem refers to everything related to the packages and tools available through the NPM.

NPM violations can be detected by [Evaluator analysis tool](/docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html) with the corresponding [NPM checker](/docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/npm-checker.html) for that.
