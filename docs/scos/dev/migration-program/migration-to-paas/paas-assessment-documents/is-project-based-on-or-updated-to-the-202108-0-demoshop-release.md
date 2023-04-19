---
title: Is project based on or updated to the 202108.0 demoshop release?
description: This document allows you to assess if a project is based on or updated to the 202108.0 demoshop release.
template: howto-guide-template
---

# Is project based on or updated to the 202108.0 demoshop release?

{% info_block infoBox %}

Resources: Backend

{% endinfo_block %}

## Description

The `202108.0` release is considered to be compatible with the latest `docker/sdk`, therefore it’s suggested to update to this release at least.
But since the project update is time-consuming it’s possible to update only fewer packages that are exactly responsible for
the compatibility with the latest `docker/sdk`. Use the steps below to assess on how to become compatible with the latest `docker/sdk`
and get the required the `202108.0` release packages.

1. Use project code and the project’s `composer.json` to understand if the feature [Separate endpoint bootstraps](https://docs.spryker.com/docs/scos/dev/technical-enhancement-integration-guides/integrating-separate-endpoint-bootstraps.html)
    is integrated. If it is already in place then the migration is not required and the project should be already compatible with
    the latest `docker/sdk` which is used in `PaaS`.
2. If the `Separate endpoint bootstraps` feature is not integrated then the effort has to be estimated using the formula.
   Calculate which packages from the list below have to be updated in order to receive these versions:
    ```json
    "spryker/application": "3.28.0"
    "spryker/event-dispatcher": "1.3.0"
    "spryker/monitoring": "2.3.0"
    "spryker/router": "1.12.0"
    "spryker/session": "4.10.0"
    "spryker/twig": "3.15.1"
    ```

## Formula

#### Project customisation multiplier (PCM):
* No customisation - 1
* Medium customisation - 1.5
* Big customisation - 2

#### Project ongoing development multiplier (PODM):
* No parallel merges to master - 1
* Bug fixes will be merged to master - 1.25
* New features will be merged to master - 1.5
* Highly active development process is ongoing - 2

1. No project customisation:
    1. Approx 2h-4h per major.
    2. Detailed estimation can be found in [MG](/docs/scos/dev/module-migration-guides/about-migration-guides.html) per module.
    3. Approx 0.25h per minor/patch.
2. Project customisation:
    1. Approx {1.i} * PCM * PODM per major.
    2. Approx {1.ii} * PCM * PODM per major
    3. Approx {1.iii} * PCM * PODM per minor/patch.
