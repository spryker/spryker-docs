---
title: Configure the timezone in the Back Office
description: Configure the time-zone used to display date time in the Back Office UI.
template: howto-guide-template
last_updated: Sep 13, 2023
---

This document explains how to configure the timezone to display the correct date and time in the Back Office.

To configure the timezone, do the following:

1. Set the config value for the key `\Spryker\Shared\UtilDateTime\UtilDateTimeConstants::DATE_TIME_ZONE`,
choosing one of the [PHP-supported timezones](https://www.php.net/manual/en/timezones.php).

2. Update the corresponding config, for example in `config/Shared/config_default.php`:

```php
use Spryker\Shared\UtilDateTime\UtilDateTimeConstants;

$config[UtilDateTimeConstants::DATE_TIME_ZONE] = 'Europe/Berlin';
```

For the US store, the configuration could be set as follows:

```php
use Spryker\Shared\UtilDateTime\UtilDateTimeConstants;

$config[UtilDateTimeConstants::DATE_TIME_ZONE] = 'America/New_York';
```
