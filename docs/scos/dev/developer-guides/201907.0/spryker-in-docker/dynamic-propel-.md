---
title: Dynamic Propel Configuration
originalLink: https://documentation.spryker.com/v3/docs/dynamic-propel-configuration
redirect_from:
  - /v3/docs/dynamic-propel-configuration
  - /v3/docs/en/dynamic-propel-configuration
---

Previously, it was always necessary to run the `vendor/bin/console propel:config:convert` command for Propel to fetch database configuration and generate the `propel.json` file where it was stored.

If the configuration changed, it was necessary to run the command again for Propel to re-generate the file with the new database configuration.

To avoid running the command each time the configuration changes, we introduce a dynamic propel configuration that is:

*     real-time available;
*     fetched from the current environment configuration without running any commands.

## Integration

### Prerequisites

Ensure that the related features are installed:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201907.0 | [Feature](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/spryker-core-fe) |

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker/propel:"^3.10.0" spryker/propel-orm:"^1.9.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

    
Make sure that the following modules have been installed:

| Module | Expected Directory |
| --- | --- |
|  `Propel ` |  `vendor/spryker/propel ` |
|  `PropelOrm ` |  `vendor/spryker/propel-orm ` |

{% endinfo_block %}

### 2) Set up Behavior

#### Clean up Install Recipes

Delete the `propel:config:convert ` command from all install recipes ( `config/install/developing.yml `,  `config/install/testing.yml `, etc.):

```bash
propel-config:
    command: "vendor/bin/console propel:config:convert"
```

{% info_block infoBox %}
`Spryker\Zed\Propel\Communication\Console\ConvertConfigConsole ` is deprecated.
{% endinfo_block %}

### 3) Delete Related JSON Files

Delete all the `src/Orm/Propel/*/Config/*/propel.json ` files - they are not needed from now on.

## Supporting Native Propel Commands

To run Propel commands directly, you can set up a runtime configuration by creating the file:


<details open>
    <summary>src/Orm/Propel/propel.php</summary>
    
```PHP
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

</details>

Run native Propel commands with the following argument:

```bash
$ propel migration:down --config-dir src/Orm/Propel/
```

<!-- Last review date: Aug 07, 2019 -->
