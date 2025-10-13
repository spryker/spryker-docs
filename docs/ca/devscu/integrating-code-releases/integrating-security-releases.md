---
title: Integrating security releases
description: Integrate Spryker security releases to mitigate vulnerabilities, enhance protection, and maintain compliance by applying critical security updates via the Spryker Code Upgrader.
template: concept-topic-template
last_updated: Dec 20, 2023
---

Being on top of security releases of your vendor or third parties is very crucial:
- *Vulnerability mitigation*: Security updates often address known vulnerabilities or weaknesses in software. Installing these updates helps to mitigate these vulnerabilities, reducing the risk of unauthorized access, data breaches, or malicious activities.
- *Enhanced protection and risk mitigation*: Security updates typically include patches and improvements that enhance the overall security of the system.
- *Regulatory compliance*: Many regulatory bodies require organizations to maintain up-to-date security measures, which often includes installing security updates promptly. Compliance with these regulations reduces legal and financial risks and helps to maintain a positive reputation and trust with stakeholders and customers.

## Coverage of security releases

The static code analysis tools provide the capability to detect various known vulnerabilities. These tools assist in identifying and preventing potential security risks from the following sources:
- Spryker security releases
- PHP ecosystem
- NPM ecosystem

## Spryker Security releases

A security release is a type of release that aims to deliver vulnerability fixes rather than introducing new features or functionalities. Here's an example of a security release: [4753](https://api.release.spryker.com/release-group/4753).

Even though security releases are applied alongside other releases, they are prioritized to ensure faster delivery of critical security updates.

## Installing security releases

The Upgrader creates PR for security releases in the same way it does for the regular code releases. For more information, see [Integrating code releases](/docs/ca/devscu/integrating-code-releases/integrating-code-releases.html)

Automatic installation of security releases is only available for minor releases. The major releases require a manual installation.

Major releases may come with backports to support backward compatibility. In such cases, they will be applied as replacements for major changes.

## Checking for available security fixes

To check for available security fixes for your project, [run the evaluator tool](/docs/dg/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html).
