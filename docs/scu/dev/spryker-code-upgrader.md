---
title: Spryker Code Upgrader
description: Spryker Code Upgrader is a key to easy upgrades
template: concept-topic-template
redirect_from:
  - /docs/paas-plus/dev/spryker-code-upgrader.html
---

Keeping enterprise software up-to-date is a known hurdle, especially when it comes to sophisticated transactional business models with complex customizations. Current upgrade strategies often require a high investment of time, resources, and money that projects would rather spend on innovation. At the same time, low upgrade frequency comes with reduced access to security, improvements, patches, and new features.

The Spryker Code Upgrader addresses the challenges of an application's upgradability. The Upgrader runs on [Spryker CI](/docs/scu/dev/spryker-ci.html) to provide automated upgrades and code quality checks. You retain full control of what customizations to make and apply in your application. By reducing upgrade efforts to a minimum, the Upgrader makes it easy to keep up with Spryker’s daily releases.

![Spryker Code Commerce OS](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/spryker-code-upgrader.md/spryker-code-commerce-os.png)

![Spryker Code Upgrader](https://spryker.s3.eu-central-1.amazonaws.com/docs/paas%2B/dev/spryker-code-upgrader.md/spryker-code-upgrader.png)

## Semi-automated upgrade process

Once a week, the Upgrader checks the connected branch of your application's repository. If new updates were released since your last upgrade, the Upgrader creates a pull request. The pull request contains [minor and patch module versions](/docs/scos/dev/architecture/module-api/semantic-versioning-major-vs.-minor-vs.-patch-release.html) which you need to review and merge. If there are any major updates, the PR will contain instructions for a manual update.

{% info_block infoBox "Upgrade schedule" %}

You can update the upgrade schedule to better fit your development process.

{% endinfo_block %}


## Next steps

[Spryker CI](/docs/scu/dev/spryker-ci.html)
