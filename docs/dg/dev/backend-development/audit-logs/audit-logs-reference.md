---
title: Audit logs reference
description: Learn how to work with Audit logs in Spryker.
template: howto-guide-template
---

Audit logging is crucial for web applications because it enhances security by tracking user activities and detecting 
unauthorized access. It helps meet regulatory requirements by ensuring accountability and transparency. 
Additionally, audit logs aid in troubleshooting by recording system events and user interactions, making it easier 
to identify and resolve issues.

## AuditLoggerConfigPluginInterface

Audit logging in Spryker is facilitated through various plugins that implement the
`Spryker\Shared\LogExtension\Dependency\Plugin\AuditLoggerConfigPluginInterface`. These plugins provide the necessary 
configuration for audit logging across different applications. This document outlines the main rules and guidelines 
for working with audit logs in Spryker.

The `AuditLoggerConfigPluginInterface` is central to audit logging in Spryker. It defines the contract for configuring 
audit loggers. Here are the main methods in this interface:

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

## Plugin Configuration

Each plugin supports one type of logs (channel).
See [HowTo: Add a new audit log type](/docs/pbc/all/miscellaneous/{{page.version}}/tutorials-and-howtos/how-to-add-a-new-audit-log-type.md)

The configuration for these plugins is defined in the
`config/Shared/config_default.php` file. Below is an example of how to register plugins for different applications:

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

## Out-of-the-Box Plugins

Spryker provides out-of-the-box plugins for the `security` log type. These plugins are pre-configured and can be used 
directly to log security-related events in various applications.

## Adding Audit Logs

Audit logs can be added using the `AuditLoggerTrait` trait.
Here is an example that demonstrates how to add an audit log:

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

When adding audit logs, it is recommended to include tags. Tags provide additional context and help categorize logs,
making them easier to search and analyze. In the example above, the tag `user_logged_in` is used to indicate a user login action.

We do not recommend tracking all DB-based activity actions in the audit logs, such as user status updates or
customer email updates. This is because logging every database interaction can quickly lead to excessive log volume,
making it harder to find relevant information and potentially impacting system performance. Instead, focus on logging
critical actions that have significant security implications.

## Example of Audit Log Data

This is an example of an audit log entry recorded during a successful login attempt in a Spryker-based application:

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
            "user_ip": "192.168.000.00",
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

The data can be further enriched by creating and integrating custom processors. These processors can be registered
within the plugins implementing the AuditLoggerConfigPluginInterface, allowing for enhanced log details.
This extensibility ensures that audit logs can be tailored to meet specific requirements and provide deeper insights
into application activities.

See  [HowTo: Extend the log structure with additional data](/docs/pbc/all/miscellaneous/{{page.version}}/tutorials-and-howtos/how-to-extend-the-log-structure-with-additional-data.html).

## Disallowing Logging for Specific Tags

It is also possible to disallow logging for specific tags if certain types of actions should not be logged.
This can be configured to ensure that only relevant and necessary information is recorded, thereby maintaining log
clarity and security. This approach allows for fine-grained control over what gets logged and helps in managing log
volume effectively. Here is an example that demonstrates how to disallow logging for specific tags:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Log\LogConstants;

$config[LogConstants::AUDIT_LOG_TAG_DISALLOW_LIST] = [
    'user_logged_in',
];

```

In this example, the tag `user_logged_in` is disallowed, which means that any log entry with this tag will not be recorded.

## Configuring Log Path

You can configure the log path to either a file or an output stream like `php://stdout` (for example in case an application 
is hosted on AWS, data logged to `php://stdout` can be displayed in CloudWatch for centralized monitoring and analysis). 
For example, the following configuration sets the log path for Yves, Zed and Glue applications to `php://stdout`:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Log\LogConstants;

$config[LogConstants::LOG_FILE_PATH_YVES]
    = $config[LogConstants::LOG_FILE_PATH_ZED]
    = $config[LogConstants::LOG_FILE_PATH_GLUE]
    = 'php://stdout';
```

## Sanitizing Audit Log Data

You can sanitize sensitive data in audit logs by replacing specific values with a sanitized placeholder.
Out-of-the-Box the data is replaced in `request` section which is provided by the `Spryker\Shared\Log\Processor\RequestProcessor`
which uses the corresponding sanitizer. You can reuse the sanitizer in any other processor by implementing it on project level.
For instance, to replace sensitive fields like passwords, you can configure the following:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Log\LogConstants;

$config[LogConstants::AUDIT_LOG_SANITIZE_FIELDS] = [
    'password',
];
$config[LogConstants::AUDIT_LOG_SANITIZED_VALUE] = '*****';
```

## Related topics

* [Spryker Core feature integration](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html).
* [HowTo: Extend the log structure with additional data](/docs/pbc/all/miscellaneous/{{site.version}}/tutorials-and-howtos/how-to-extend-the-log-structure-with-additional-data.html).
* [HowTo: Add a new audit log type](/docs/pbc/all/miscellaneous/{{site.version}}/tutorials-and-howtos/how-to-add-a-new-audit-log-type.md)