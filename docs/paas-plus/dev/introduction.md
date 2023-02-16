---
title: Spryker Code Upgrader
description: Spryker Code Upgrader is a key to easy upgrades
template: concept-topic-template
---

Keeping enterprise software up-to-date is a known hurdle. Especially when it comes to sophisticated transactional business models with complex customizations. Current upgrade strategies often require a high investment of time, resources, and money that projects would rather spend on innovation. However, low upgrade frequency comes with reduced access to security and improvements patches and new features.

Spryker Code Upgrader is a new service in Spryker PaaS+, which addresses application upgradability challenges. Spryker Code Upgrader runs on Spryker CI and provides you with automated upgrades and code quality checks while giving you full control of what to bring to your software platform. By reducing upgrade efforts to a minimum, Spryker Code Upgrader offers a reliable way to keep up with Spryker’s daily releases.

![Spryker Code Commerce OS](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/introduction.md/spryker-code-commerce-os.png)

![Spryker Code Upgrader](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/introduction.md/spryker-code-upgrader.png)

## Spryker Code Upgrader

Spryker Code Upgrader provides semi-automated upgrades for your application as follows:

* Once a week Spryker Code Upgrader checks the branch you connect to it (the schedule can be adapted to your development process)

* The service then creates a Pull Request towards your repository. This pull request contains new [minor and patch module versions](/docs/scos/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html) that Spryker released since your last upgrade

* As well for major releases the service shares additional instructions or warnings that might need a human review

## Next steps

[Integrate Spryker Code Upgrader into your development process](/docs/paas-plus/dev/integrate-spryker-code-upgrader.html)
