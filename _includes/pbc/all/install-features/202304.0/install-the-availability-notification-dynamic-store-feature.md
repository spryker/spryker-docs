
This document describes how to ingrate the Avalability Notification + Dynamic Store feature into a Spryker project.

## Install feature core

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |


### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/availability-notification:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| AvailabilityNotification | vendor/spryker/availability-notification |


{% endinfo_block %}

### 2) Set up configuration

Add the following configuration to your project:

| CONFIGURATION  | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| AvailabilityNotificationConstants::REGION_TO_YVES_HOST_MAPPING (See below in `config/Shared/config_default.php`) | Defines regions to Yves host mapping. | - |


**config/Shared/config_default.php**

```php

<?php

use Spryker\Shared\AvailabilityNotification\AvailabilityNotificationConstants;

$config[AvailabilityNotificationConstants::REGION_TO_YVES_HOST_MAPPING] = [
    'EU' => getenv('SPRYKER_YVES_HOST_EU'),
    'US' => getenv('SPRYKER_YVES_HOST_US'),
];

```
