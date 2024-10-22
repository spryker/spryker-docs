---
title: Add audit log types
description: Learn how to add an audit log type.
template: howto-guide-template
last_updated: Jun 16, 2024
related:
  - title: Extend the log structure
    link: docs/dg/dev/backend-development/audit-logs/extend-the-audit-log-structure.html
---

Audit logs are used for tracking system events, user actions, and other significant activities in an application. Adding new audit log types is needed when you have specific tracking requirements.

In this guide, `Checkout` log type for the `Yves` application is added as an example. Using this guide, you can added different log types for any application.

## Prerequisites

[Install the Spryker Core feature](/docs/pbc/all/miscellaneous/202410.0/install-and-upgrade/install-features/install-the-spryker-core-feature.html)


## Add a checkout log type for Yves


1. Introduce `AuditLoggerConfigPlugin` for `Checkout` logs handlers and processors:

<details>
  <summary>src/Pyz/Yves/Log/Plugin/Log/YvesCheckoutAuditLoggerConfigPlugin.php</summary>

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

</details>


2. Register the plugin in the config:

**config/Shared/config_default.php**

```php
<?php

use Pyz\Yves\Log\Plugin\Log\YvesCheckoutAuditLoggerConfigPlugin;

$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_YVES] = [
    //other plugins
    YvesCheckoutAuditLoggerConfigPlugin::class,
    //other plugins
];
```

3. To add the `Checkout` type for other applications, introduce `AuditLoggerConfig` plugins and register them in the config file following the example:

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
    //other plugins
];
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_GLUE] = [
    //other plugins
    GlueCheckoutAuditLoggerConfigPlugin::class,
    //other plugins
];
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_GLUE_BACKEND] = [
    //other plugins
    GlueBackendCheckoutAuditLoggerConfigPlugin::class,
    //other plugins
];
$config[LogConstants::AUDIT_LOGGER_CONFIG_PLUGINS_MERCHANT_PORTAL] = [
    //other plugins
    MerchantPortalCheckoutAuditLoggerConfigPlugin::class,
    //other plugins
];
```


Now you can add audit logs with `Checkout` type across the application.

3. Introduce `AuditLoggerCheckoutPostSavePlugin`, which is called after an order is placed:

**Pyz/Zed/Log/Communication/Plugin/Checkout/AuditLoggerCheckoutPostSavePlugin.php**

```php
<?php

namespace Pyz\Zed\Log\Communication\Plugin\Checkout;

use Generated\Shared\Transfer\AuditLoggerConfigCriteriaTransfer;
use Generated\Shared\Transfer\CheckoutResponseTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Shared\Log\AuditLoggerTrait;
use Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPostSaveInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Spryker\Zed\Log\Communication\LogCommunicationFactory getFactory()
 * @method \Spryker\Zed\Log\LogConfig getConfig()
 * @method \Spryker\Zed\Log\Business\LogFacadeInterface getFacade()
 */
class AuditLoggerCheckoutPostSavePlugin extends AbstractPlugin implements CheckoutPostSaveInterface
{
    use AuditLoggerTrait;

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     * @param \Generated\Shared\Transfer\CheckoutResponseTransfer $checkoutResponseTransfer
     *
     * @return void
     */
    public function executeHook(QuoteTransfer $quoteTransfer, CheckoutResponseTransfer $checkoutResponseTransfer)
    {
        $this->getAuditLogger(
            (new AuditLoggerConfigCriteriaTransfer())->setChannelName('checkout'),
        )->info('any checkout action', ['tags' => ['any_checkout_action']]);
    }
}

```

4. Register the plugin in the `CheckoutDependencyProvider`:

**Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Pyz\Zed\Log\Communication\Plugin\Checkout\AuditLoggerCheckoutPostSavePlugin;
use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
/**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPostSaveInterface>
     */
    protected function getCheckoutPostHooks(Container $container): array
    {
        return [
            new AuditLoggerCheckoutPostSavePlugin(),
        ];
    }
}

```

Now after an order is placed, a log with the `checkout` type is added.
