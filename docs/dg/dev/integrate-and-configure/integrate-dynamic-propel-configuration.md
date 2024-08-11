---
title: Integrate dynamic Propel configuration
description: Learn about dynamic propel configuration and how to integrate it into your project.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/dynamic-propel-configuration
originalArticleId: 8fd4016c-928a-4abc-968e-0f1518cc96da
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-dynamic-propel-configuration.html
  - /docs/scos/dev/technical-enhancements/dynamic-propel-configuration.html
---

Previously, it was always necessary to run the `vendor/bin/console propel:config:convert` command for Propel to fetch database configuration and generate the `propel.json` file where it was stored.

If the configuration changed, it was necessary to run the command again for Propel to re-generate the file with the new database configuration.

To avoid running the command each time the configuration changes, we introduce a dynamic propel configuration that is:

* real-time available;
* fetched from the current environment configuration without running any commands.

## Integration

### Prerequisites

Ensure that the related features are installed:

| NAME | VERSION | REQUIRED SUB-FEATURE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/propel:"^3.10.0" spryker/propel-orm:"^1.9.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
|  Propel |  vendor/spryker/propel |
|  PropelOrm |  vendor/spryker/propel-orm |

{% endinfo_block %}

### 2) Set up behavior

#### Clean up install recipes

Delete the `propel:config:convert` command from all install recipes ( `config/install/developing.yml`,  `config/install/testing.yml`, etc.):

```yml
propel-config:
    command: "vendor/bin/console propel:config:convert"
```

{% info_block infoBox %}

`Spryker\Zed\Propel\Communication\Console\ConvertConfigConsole` is deprecated.

{% endinfo_block %}

### 3) Delete the related JSON files

Delete all the `src/Orm/Propel/*/Config/*/propel.json` files - they are not needed from now on.

## Supporting native Propel commands

To run Propel commands directly, set up a runtime configuration by creating the file:

**src/Orm/Propel/propel.php**

```php
<?php

use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\Config\Config;
use Spryker\Shared\Propel\PropelConstants;

define('APPLICATION', 'ZED');
define('APPLICATION_ROOT_DIR', dirname(__DIR__, 3));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

Environment::initialize();

$config = Config::getInstance();
$config::init(APPLICATION_ENV);

return [
    'propel' => $config::get(PropelConstants::PROPEL)
];
```

Run native Propel commands with the following argument:

```bash
$ propel migration:down --config-dir src/Orm/Propel/
```
