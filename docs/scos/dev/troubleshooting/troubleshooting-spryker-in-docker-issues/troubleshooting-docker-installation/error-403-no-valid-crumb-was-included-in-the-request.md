---
title: Error 403 No valid crumb was included in the request
description: Learn how to fix the issue with no valid crumbs provided.
last_updated: May 4, 2022
template: troubleshooting-guide-template
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
