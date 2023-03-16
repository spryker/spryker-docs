---
title: Spryker Code Upgrader supported extension scenarios
description: Spryker extensions scenarios covered by the Spryker Code Upgrader
last_updated: Mar 13, 2023
template: concept-topic-template
related:
  - title: Plugins registration
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html
  - title: Event subscribers registration
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html
  - title: Modules configuration
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/modules-configuration.html
---

## Introduction

The Spryker Code Upgrader implements code changes on the project level.

Code changes on the project level can be delivered to a customer's projects through manifest files.
The manifest files cover a list of the ways code changes can be done.
This article aims to describe how ro tegister a plugin and configure modules, that can be covered by manifests.

To ensure the successful delivery of Spryker updates, we recommend using the extension points that exist in the article.

{% info_block infoBox "" %}

In case when the project uses a way how to change code that is not covered, expected changes will be skipped during the update process.

{% endinfo_block %}

## Supported extension scenarios

* [Plugins registration](docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html)
* [Event subscribers registration](docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html)
* [Modules configuration](docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/modules-configuration.html)
