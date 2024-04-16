---
title: Error 403 No valid crumb was included in the request
description: Learn how to fix the issue with no valid crumbs provided.
last_updated: May 4, 2022
template: troubleshooting-guide-template
redirect_from:
  - /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-docker-installation/error-403-no-valid-crumb-was-included-in-the-request.html
  - /docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/error-403-no-valid-crumb-was-included-in-the-request.html

related:
  - title: An error during front end setups
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/an-error-during-front-end-setup.html
  - title: Demo data was imported incorrectly
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/demo-data-was-imported-incorrectly.html
  - title: Docker daemon is not running
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/docker-daemon-is-not-running.html
  - title: docker-sync cannot start
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/docker-sync-cannot-start.html
  - title: Node Sass does not yet support your current environment
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/node-saas-does-not-yet-support-your-current-environment.html
  - title: Setup of new indexes throws an exception
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/setup-of-new-indexes-throws-an-exception.html
  - title: Vendor folder synchronization error
    link: docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/vendor-folder-synchronization-error.html
---


You get the error: `Error 403 No valid crumb was included in the request`

## Solution

Enable Jenkins CSRF protection:


1. In the deploy file, enable the usage of the CSRF variable:

```yaml
...
services:
  scheduler:
    csrf-protection-enabled: true
...
```    

2. In the config file, enable Jenkins CSRF protection by defining the CSRF variable:

```php
...
$config[SchedulerJenkinsConstants::JENKINS_CONFIGURATION] = [
    SchedulerConfig::SCHEDULER_JENKINS => [
        SchedulerJenkinsConfig::SCHEDULER_JENKINS_CSRF_ENABLED => (bool)getenv('SPRYKER_JENKINS_CSRF_PROTECTION_ENABLED'),
    ],
];
...
```
