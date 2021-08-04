---
title: A command fails with a `Killed` message
originalLink: https://documentation.spryker.com/v6/docs/a-command-fails-with-a-killed-message
redirect_from:
  - /v6/docs/a-command-fails-with-a-killed-message
  - /v6/docs/en/a-command-fails-with-a-killed-message
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

```php
/b2c/vendor/spryker/propel/src/Spryker/Zed/Propel/PropelConfig.php
class PropelConfig extends AbstractBundleConfig
{
    public const DB_ENGINE_MYSQL = 'mysql';
    public const DB_ENGINE_PGSQL = 'pgsql';

    protected const PROCESS_TIMEOUT = {process_timout_value};
    
    ...
}
```
Replace `{process_timout_value}` with a suitable value. We recommend setting the value that is just enough to run the command. Setting an unreasonably big value may cause performance issue. 







