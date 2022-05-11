---
title: Configuring New Relic logging
template: howto-guide-template
---


Every request is automatically logged by New Relic. The name of the requests will be the name of the used route for Yves and the `[module]/[controller]/[action]` for Zed. Also, URL request and the host are stored as custom parameters for each request.

To enable the New Relic monitoring extension, add it to the `MonitoringDependencyProvider` in your project:

```php
 '12345',
    'zed_de'    =&gt; '12346',
    'yves_us'   =&gt; '12347',
    'zed_us'    =&gt; '12348',
];
```
Therefore, it will be possible to use the record deployment functionality built-in in the console commands, as follows:

```bash
vendor/bin/console newrelic:record-deployment
```
