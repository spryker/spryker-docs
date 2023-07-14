---
title: Is project based on or updated to the 202108.0 demoshop release?
description: This document allows you to assess if a project is based on or updated to the 202108.0 demoshop release.
template: howto-guide-template
---


`202108.0` is the earliest release compatible with the latest `docker/sdk`, so it’s the earliest release to update to.
Because the update is time consuming, it makes sense to update only the packages responsible for the compatibility with the latest Docker SDK. Follow the steps to estimate the upgrade effort.

1. Based on the project's code and `composer.json`, check if [Separate endpoint bootstraps](https://docs.spryker.com/docs/scos/dev/technical-enhancement-integration-guides/integrating-separate-endpoint-bootstraps.html) are integrated.
    If it is integrated, the project is compatible with the latest Docker SDK and the migration is not required.

2. If the separate endpoint bootstraps are not integrated, using the [formula](#formula), estimate the required effort to update the packages to the provided versions:
```json
"spryker/application": "3.28.0"
"spryker/event-dispatcher": "1.3.0"
"spryker/monitoring": "2.3.0"
"spryker/router": "1.12.0"
"spryker/session": "4.10.0"
"spryker/twig": "3.15.1"
```


## Resources for assessment

Backend

## Formula for calculating the migration effort

### Project customization multiplier (PCM)

* No customization: 1
* Medium customization: 1.5
* Big customization: 2

### Project ongoing development multiplier (PODM)

* No parallel merges to master: 1
* Bug fixes will be merged to master: 1.25
* New features will be merged to master: 1.5
* Highly active development process is ongoing: 2

1. No project customization:
    1. Approximately 2h to 4h per major.
    2. For a per-module estimation, see the the needed modules' upgrade guides.
    3. Approximately 1h per minor or patch.
2. Project customization:
    1. Approximately {1.i} * PCM * PODM per major.
    2. Approximately {1.ii} * PCM * PODM per major
    3. Approximately {1.iii} * PCM * PODM per minor or patch.
