---
title: Audit logs
description: Learn how to work with Audit logs in Spryker.
template: howto-guide-template
last_updated: Jun 16, 2024
related:
  - title: Install the Spryker Core feature
    link: docs/pbc/all/miscellaneous/page.version/install-and-upgrade/install-features/install-the-spryker-core-feature.html
  - title: Extend the audit log structure
    link: docs/dg/dev/backend-development/audit-logs/extend-the-audit-log-structure.html
  - title: Add audit log types
    link: docs/dg/dev/backend-development/audit-logs/add-audit-log-types.html
---

Audit logging is used in web applications for tracking user activities and detecting unauthorized access. It helps meet regulatory requirements by ensuring accountability and transparency. Additionally, audit logs help with troubleshooting by recording system events and user interactions, making it easier to identify and resolve issues.

## Installing audit logs

To install audit logs, install the following features:

* [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/202410.0/install-and-upgrade/install-features/install-the-spryker-core-feature.html)
* [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/202410.0/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html)
* [Install the Spryker Core Back Office feature](/docs/pbc/all/back-office/202410.0/base-shop/install-and-upgrade/install-the-spryker-core-back-office-feature.html)
* [Install the Agent Assist feature](/docs/pbc/all/user-management/202410.0/base-shop/install-and-upgrade/install-the-agent-assist-feature.html)

## AuditLoggerConfigPluginInterface interface

Audit logging is enabled by various plugins that implement `Spryker\Shared\LogExtension\Dependency\Plugin\AuditLoggerConfigPluginInterface`. These plugins provide the necessary configuration for audit logging across different applications.

`AuditLoggerConfigPluginInterface` defines the main configuration for audit loggers. Here are the main methods in this interface:

<details>
  <summary>AuditLoggerConfigPluginInterface</summary>

```php
<?php

namespace Spryker\Shared\LogExtension\Dependency\Plugin;

use Generated\Shared\Transfer\AuditLoggerConfigCriteriaTransfer;

/**
 * Interface is used to provide configuration for audit logging.
 */
interface AuditLoggerConfigPluginInterface
{
    /**
     * Specification:
     * - Determines if the configuration is applicable based on the given criteria.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\AuditLoggerConfigCriteriaTransfer $auditLoggerConfigCriteriaTransfer
     *
     * @return bool
     */
    public function isApplicable(AuditLoggerConfigCriteriaTransfer $auditLoggerConfigCriteriaTransfer): bool;

    /**
     * Specification:
     * - Retrieves the name of the logging channel.
     *
     * @api
     *
     * @return string
     */
    public function getChannelName(): string;

    /**
     * Specification:
     * - Retrieves the handlers for the logger.
     *
     * @api
     *
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogHandlerPluginInterface>
     */
    public function getHandlers(): array;

    /**
     * Specification:
     * - Retrieves the processors for the logger.
     *
     * @api
     *
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogProcessorPluginInterface>
     */
    public function getProcessors(): array;
}
```

</details>

## Plugin configuration

Each plugin supports one type of logs (channel), ensuring that different kinds of activities and events are properly categorized and managed. Different channels are used to segregate log data based on context, purpose, and level of importance. For instructions on adding audit log types, see [Add audit log types](/docs/dg/dev/backend-development/audit-logs/add-audit-log-types.html).

The configuration for these plugins is defined in `config/Shared/config_default.php`. Here's an example of how to register plugins for different applications:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Glue\Log\Plugin\Log\GlueBackendSecurityAuditLoggerConfigPlugin;
use Spryker\Glue\Log\Plugin\Log\GlueSecurityAuditLoggerConfigPlugin;
use Spryker\Shared\Log\LogConstants;
use Spryker\Yves\Log\Plugin\Log\YvesSecurityAuditLoggerConfigPlugin;
use Spryker\Zed\Log\Communication\Plugin\Log\MerchantPortalSecurityAuditLoggerConfigPlugin;
use Spryker\Zed\Log\Communication\Plugin\Log\ZedSecurityAuditLoggerConfigPlugin;

$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_YVES] = [
    YvesSecurityAuditLoggerConfigPlugin::class,
];
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_ZED] = [
    ZedSecurityAuditLoggerConfigPlugin::class,
];
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_GLUE] = [
    GlueSecurityAuditLoggerConfigPlugin::class,
];
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_GLUE_BACKEND] = [
    GlueBackendSecurityAuditLoggerConfigPlugin::class,
];
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_MERCHANT_PORTAL] = [
    MerchantPortalSecurityAuditLoggerConfigPlugin::class,
];
```

## Default plugins

By default, there are plugins for the `security` log type. These plugins are preconfigured and used to log security-related events in various applications.

## Adding audit logs

Audit logs are added using the `AuditLoggerTrait` trait. Example:

```php
<?php

use Generated\Shared\Transfer\AuditLoggerConfigCriteriaTransfer;
use Spryker\Shared\Log\AuditLoggerTrait;

class AuditLogger
{
    use AuditLoggerTrait;

    /**
     * @param string $action
     * @param list<string> $tags
     *
     * @return void
     */
    public function addAuditLog(string $action, array $tags): void
    {
        $this->getAuditLogger(
            (new AuditLoggerConfigCriteriaTransfer())->setChannelName('security'),
        )->info('user logged in', ['tags' => ['user_logged_in']]);
    }
}
```

When adding audit logs, we recommend including tags. Tags provide additional context and help categorize logs, making them easier to search and analyze. In the prior example, the tag `user_logged_in` is used to indicate a user login action.

We don't recommend tracking all database related activity actions in the audit logs, such as user status updates or customer email updates. Logging every database interaction can quickly lead to excessive log volume, making it harder to find relevant information and potentially impacting system performance. Focus on logging critical actions that have significant security implications.

## Example of audit log data

This example of an audit log entry was recorded during a successful login attempt:


<details>
  <summary>Audit log example</summary>
  
```json
{
    "@timestamp": "2024-07-16T09:45:12.310532+00:00",
    "@version": 1,
    "host": "b0bc3b05abf2",
    "message": "Successful Login",
    "type": "YVES",
    "channel": "security",
    "level": "INFO",
    "monolog_level": 200,
    "extra": {
        "environment": {
            "application": "YVES",
            "environment": "docker.dev",
            "store": null,
            "codeBucket": "EU",
            "locale": "en_US"
        },
        "server": {
            "url": "http://yves.de.spryker.local/en/login_check",
            "is_https": false,
            "hostname": "yves.de.spryker.local",
            "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            "user_ip": "192.168.0.1",
            "request_method": "POST",
            "referer": "http://yves.de.spryker.local/en/login"
        },
        "request": {
            "requestId": "502835fe",
            "type": "WEB",
            "request_params": {
                "loginForm": {
                    "email": "sonia@spryker.com",
                    "password": "***",
                    "_token": "f4dd629da0074c0b.b3QpFehJ8cMYAlDmDTcqm-se4sxEdz_BvLQXXmzo2iw.Lj1mRYQRifJTYDW2emhI0qNflZkMNQ-U6_xiLCbYjH8NOWAnrC-_hXF3aA"
                },
                "username": "sonia@spryker.com",
                "customer_reference": "DE--21"
            },
            "log_type": "audit_log"
        },
        "context": {
            "tags": ["successful_login"]
        }
    }
}
```

</details>

The data can be further enriched by creating and integrating custom processors. These processors can be registered within the plugins implementing `AuditLoggerConfigPluginInterface`. This extensibility ensures that audit logs can be tailored to meet specific requirements and provide deeper insights into application activities.

For instructions, see [Extend the log structure](/docs/dg/dev/backend-development/audit-logs/extend-the-audit-log-structure.html).

## Disallowing logging for specific tags

If you don't want some actions to be logged, you can disallow logging for specific tags. In the following example, the `user_logged_in` tag is disallowed, preventing logs with this tag from being recorded.

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Log\LogConstants;

$config[LogConstants::AUDIT_LOG_TAG_DISALLOW_LIST] = [
    'user_logged_in',
];

```


## Configuring the log path

You can configure the log path to either a file or an output stream like `php://stdout`. For centralized monitoring and analysis in CloudWatch, you need to configure it with `php://stdout`. The following configuration sets the log path for Yves, Zed, and Glue applications to `php://stdout`:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Log\LogConstants;

$config[LogConstants::LOG_FILE_PATH_YVES]
    = $config[LogConstants::LOG_FILE_PATH_ZED]
    = $config[LogConstants::LOG_FILE_PATH_GLUE]
    = 'php://stdout';
```

## Sanitizing audit log data

You can sanitize sensitive data in audit logs by replacing specific values with a sanitized placeholder. By default the data is sanitized in the `request` section provided by `Spryker\Shared\Log\Processor\RequestProcessor`, which uses the corresponding sanitizer. You can reuse the sanitizer in any other processor by implementing it on project level. For example, to replace sensitive fields like passwords, you can add the following configuration:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Log\LogConstants;

$config[LogConstants::AUDIT_LOG_SANITIZE_FIELDS] = [
    'password',
];
$config[LogConstants::AUDIT_LOG_SANITIZED_VALUE] = '*****';
```
