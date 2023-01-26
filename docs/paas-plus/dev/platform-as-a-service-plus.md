---
title: Platform as a Service Plus
description: PaaS+ is a key to easy upgrades
template: concept-topic-template
---

Keeping enterprise software up-to-date is a known hurdle. Especially when it comes to sophisticated transactional business models with complex customizations. Current upgrade strategies often require a high investment of time, resources, and money that projects would rather spend on innovation. However, low upgrade frequency comes with reduced access to security and improvements patches, as well as new features.

Platform as a Service Plus (PaaS+) is a new service on top of Spryker PaaS, which addresses application upgradability challenges. PaaS+ includes a CI that provides you with automated upgrades and code quality checks while giving you full control of what to bring to your platform. By reducing upgrade efforts to a minimum, PaaS+ offers a reliable way to keep up with Spryker’s daily updates.

![Spryker PaaS+](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/platform-as-a-service-plus.md/spryker-paas-plus.png)

## Spryker Upgrader Service

The upgrader service provides automated upgrades for your application as follows:
* Runs upgrades once per week.
* Provides upgrades for minor and patch releases by creating PRs in your connected Git repository.
* Automatically applies code changes, like deprecations.
* If major releases are available, adds links to instructions for manual upgrades to PRs.

## Next steps

[Onboarding to PaaS+](/docs/paas-plus/dev/onboarding-to-paas-plus.html)
