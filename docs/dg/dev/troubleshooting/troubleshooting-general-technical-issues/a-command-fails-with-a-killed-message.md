---
title: A command fails with a `Killed` message
description: Learn how to resolve the issue with a command returning a `killed` message.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/a-command-fails-with-a-killed-message
originalArticleId: 09c3dd70-4e87-4604-b5d3-844e49e4c853
redirect_from:
  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/a-command-fails-with-a-killed-message.html
---

Running a CLI command with a long execution time returns a `Killed` message.

## Solution

* In PHP settings, increase `max_execution_time`. In Docker based projects, you can do it via a Deploy file as follows:

```yaml
image:
  tag: ...
  php:
    ini:
      'max_execution_time': 300
```

* Increase `PropelConfig` class timeout:

**/b2c/vendor/spryker/propel/src/Spryker/Zed/Propel/PropelConfig.php**

```php

class PropelConfig extends AbstractBundleConfig
{
    public const DB_ENGINE_MYSQL = 'mysql';
    public const DB_ENGINE_PGSQL = 'pgsql';

    protected const PROCESS_TIMEOUT = {process_timeout_value};

    ...
}
```

Replace `{process_timeout_value}` with a suitable value. We recommend setting the value that is just enough to run the command. Setting an unreasonably big value may cause performance issue.
