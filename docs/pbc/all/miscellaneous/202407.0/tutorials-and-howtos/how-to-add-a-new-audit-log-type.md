---
title: "HowTo: Add a new audit log type"
description: Learn how to add a new audit log type to your system.
template: howto-guide-template
---

In this guide, we will walk you through the steps to add a new audit log type to your system.
Audit logs are essential for tracking system events, user actions, and other significant activities within your application.
By following this guide, you will be able to define and implement a new audit log type that meets your specific tracking requirements.
**Checkout** log type for **Yves** application will be added as an example. You can follow the same instructions to add a new type for other applications.

## Prerequisites

Before you begin, ensure that the [Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)
is installed. Without it, you will not be able to proceed with the steps outlined in this guide.

## Step-by-step instructions

### Introduce AuditLoggerConfigPlugin

Introduce **AuditLoggerConfigPlugin** with all the needed for **Checkout** logs handlers and processors:

**src/Pyz/Yves/Log/Plugin/Log/YvesCheckoutAuditLoggerConfigPlugin.php**

```php
<?php

namespace Pyz\Yves\Log\Plugin\Log;

use Generated\Shared\Transfer\AuditLoggerConfigCriteriaTransfer;
use Spryker\Shared\LogExtension\Dependency\Plugin\AuditLoggerConfigPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;
use Spryker\Yves\Log\Plugin\Log\AuditLogMetaDataProcessorPlugin;
use Spryker\Yves\Log\Plugin\Log\AuditLogRequestProcessorPlugin;
use Spryker\Yves\Log\Plugin\Log\AuditLogTagFilterBufferedStreamHandlerPlugin;
use Spryker\Yves\Log\Plugin\Processor\EnvironmentProcessorPlugin;
use Spryker\Yves\Log\Plugin\Processor\PsrLogMessageProcessorPlugin;
use Spryker\Yves\Log\Plugin\Processor\ResponseProcessorPlugin;
use Spryker\Yves\Log\Plugin\Processor\ServerProcessorPlugin;

class YvesCheckoutAuditLoggerConfigPlugin extends AbstractPlugin implements AuditLoggerConfigPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\AuditLoggerConfigCriteriaTransfer $auditLoggerConfigCriteriaTransfer
     *
     * @return bool
     */
    public function isApplicable(AuditLoggerConfigCriteriaTransfer $auditLoggerConfigCriteriaTransfer): bool
    {
        return $auditLoggerConfigCriteriaTransfer->getChannelName() === $this->getChannelName();
    }

    /**
     * @return string
     */
    public function getChannelName(): string
    {
        return 'checkout';
    }

    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogHandlerPluginInterface>
     */
    public function getHandlers(): array
    {
        return [
            new AuditLogTagFilterBufferedStreamHandlerPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogProcessorPluginInterface>
     */
    public function getProcessors(): array
    {
        return [
           new PsrLogMessageProcessorPlugin(),
           new EnvironmentProcessorPlugin(),
           new ServerProcessorPlugin(),
           new AuditLogRequestProcessorPlugin(),
           new ResponseProcessorPlugin(),
           new AuditLogMetaDataProcessorPlugin(),
       ];
    }
}
```

### Register plugin in the config file

**config/Shared/config_default.php**

```php
<?php

use Pyz\Yves\Log\Plugin\Log\YvesCheckoutAuditLoggerConfigPlugin;

$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_YVES] = [
    //other plugins
    YvesCheckoutAuditLoggerConfigPlugin::class,
];
```

To add **Checkout** type for other applications introduce AuditLoggerConfig plugins in the same way as in example
and register them in the config file:

**config/Shared/config_default.php**

```php
<?php

use Pyz\Yves\Log\Plugin\Log\YvesCheckoutAuditLoggerConfigPlugin;
use Pyz\Glue\Log\Plugin\Log\GlueBackendCheckoutAuditLoggerConfigPlugin;
use Pyz\Glue\Log\Plugin\Log\GlueCheckoutAuditLoggerConfigPlugin;
use Pyz\Zed\Log\Communication\Plugin\Log\MerchantPortalCheckoutAuditLoggerConfigPlugin;
use Pyz\Zed\Log\Communication\Plugin\Log\ZedCheckoutAuditLoggerConfigPlugin;

$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_ZED] = [
    //other plugins
    ZedCheckoutAuditLoggerConfigPlugin::class,
];
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_GLUE] = [
    //other plugins
    GlueCheckoutAuditLoggerConfigPlugin::class,
];
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_GLUE_BACKEND] = [
    //other plugins
    GlueBackendCheckoutAuditLoggerConfigPlugin::class,
];
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_MERCHANT_PORTAL] = [
    //other plugins
    MerchantPortalCheckoutAuditLoggerConfigPlugin::class,
];
```

## Summary

Now you can add Audit logs with **Checkout** type in any place where it is needed, for example:

```php
<?php

use Generated\Shared\Transfer\AuditLoggerConfigCriteriaTransfer;
use Spryker\Shared\Log\AuditLoggerTrait;

class AnyCheckoutClassWhereAuditLoggingIsNeeded
{
    use AuditLoggerTrait;

    public function checkout()
    {
        //other logic
        
        $this->getAuditLogger(
            (new AuditLoggerConfigCriteriaTransfer())->setChannelName('checkout'),
        )->info('any checkout action', ['tags' => ['any_checkout_action']]);
        
        //other logic
    }
}
```

## Related topics

* [Spryker Core feature integration](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html).
* [HowTo: Extend the log structure with additional data](/docs/pbc/all/miscellaneous/{{page.version}}/tutorials-and-howtos/how-to-extend-the-log-structure-with-additional-data.html).