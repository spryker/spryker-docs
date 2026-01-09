---
title: Monitoring
description: This guideline explains the importance of effective monitoring for production e-commerce applications and how to properly configure APM tools.
last_updated: Nov 28, 2025
template: concept-topic-template
---

**First things first.** Effective monitoring is required for a production e-commerce application to stay healthy and react on potential issues fast. The Spryker Cloud team does environment monitoring and adjustments as necessary (for PROD environments). But application monitoring is the responsibility of a partner or customer.

## Ensure the APM tool is active

It can be NewRelic or OpenTelemetry with any supported backend (for example Grafana, DataDog, etc).

### OpenTelemetry

For OpenTelemetry integration, see [OpenTelemetry - Spryker Monitoring Integration](/docs/ca/dev/monitoring/spryker-monitoring-integration/spryker-monitoring-integration.html).

### NewRelic

For NewRelic configuration:
- [Configure services](/docs/dg/dev/integrate-and-configure/configure-services#new-relic)
- [Deploy file inheritance: common use cases - Enabling NewRelic](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-inheritance-common-use-cases#enabling-new-relic)
- [Troubleshooting Performance Issues](/docs/dg/dev/troubleshooting/troubleshooting-performance-issues/troubleshooting-performance-issues)

#### NewRelic instrumentation tips for Backend-Gateway

The default OOTB setup of NewRelic integration registers all Backend-Gateway transactions under a single transaction name, namely `index.php`. This leads to limited visibility as NewRelic aggregates and filters out slow traces only for this one transaction type, showing detailed traces only for the slowest transactions (often in the 30-60s range).

Faster transactions (10-30s range) are rarely visible in such a setup. Splitting one single transaction type (`index.php`) into multiple based on URL increases visibility, as NewRelic will show the slowest transactions per transaction type, same as it is for Yves/Zed/Glue apps.

**Implementation steps:**

1. Create `src/Pyz/Zed/Monitoring/Communication/Plugin/EventDispatcher/BackendGatewayMonitoringRequestTransactionEventDispatcherPlugin.php`:

```php
<?php

namespace Pyz\Zed\Monitoring\Communication\Plugin\EventDispatcher;

use Spryker\Zed\Monitoring\Communication\Plugin\EventDispatcher\MonitoringRequestTransactionEventDispatcherPlugin as SprykerMonitoringRequestTransactionEventDispatcherPlugin;
use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\EventDispatcher\EventDispatcherInterface;

/**
 * @method \Spryker\Zed\Monitoring\Communication\MonitoringCommunicationFactory getFactory()
 */
class BackendGatewayMonitoringRequestTransactionEventDispatcherPlugin extends SprykerMonitoringRequestTransactionEventDispatcherPlugin
{
    public function extend(EventDispatcherInterface $eventDispatcher, ContainerInterface $container): EventDispatcherInterface
    {
        // Don't call parent - we need custom behavior
        $eventDispatcher->addSubscriber(
            $this->getFactory()->createBackendGatewayControllerListener()
        );

        return $eventDispatcher;
    }
}
```

2. Create `src/Pyz/Zed/Monitoring/Communication/MonitoringCommunicationFactory.php`:

```php
<?php
namespace Pyz\Zed\Monitoring\Communication;

use Pyz\Zed\Monitoring\Communication\Plugin\BackendGatewayControllerListener;
use Spryker\Zed\Monitoring\Communication\MonitoringCommunicationFactory as SprykerMonitoringCommunicationFactory;

class MonitoringCommunicationFactory extends SprykerMonitoringCommunicationFactory
{
    public function createBackendGatewayControllerListener(): BackendGatewayControllerListener
    {
        return new BackendGatewayControllerListener(
            $this->getMonitoringService()
        );
    }
}
```

3. Create `src/Pyz/Zed/Monitoring/Communication/Plugin/BackendGatewayControllerListener.php`:

```php
<?php
namespace Pyz\Zed\Monitoring\Communication\Plugin;

use Spryker\Service\Monitoring\MonitoringServiceInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class BackendGatewayControllerListener extends AbstractPlugin implements EventSubscriberInterface
{
    public const PRIORITY = -255;

    protected $monitoringService;

    public function __construct(MonitoringServiceInterface $monitoringService)
    {
        $this->monitoringService = $monitoringService;
    }

    public function onKernelController(ControllerEvent $event): void
    {
        if (!$event->isMasterRequest()) {
            return;
        }

        $request = $event->getRequest();
        $transactionName = $this->getTransactionName($request);

        $this->monitoringService->setTransactionName($transactionName);
        $this->monitoringService->addCustomParameter('request_uri', $request->server->get('REQUEST_URI', 'n/a'));
    }

    protected function getTransactionName(Request $request): string
    {
        // Backend-gateway uses _route like "module:gateway:action"
        $route = $request->attributes->get('_route', 'n/a');
        return str_replace(':', '/', $route);
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::CONTROLLER => ['onKernelController', static::PRIORITY],
        ];
    }
}
```

4. Update `src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php`:

Add the custom `BackendGatewayMonitoringRequestTransactionEventDispatcherPlugin` after `MonitoringRequestTransactionEventDispatcherPlugin` in `\Pyz\Zed\EventDispatcher\EventDispatcherDependencyProvider::getBackendGatewayEventDispatcherPlugins()`.

## APM is properly configured

Traces/transactions are grouped by application (Yves, Zed, Glue, etc) and by URL or command name (for example `/place-order` or `oms:check-conditions`, etc). Spryker OpenTelemetry APM has it OOTB, NewRelic has to be configured on a project level.

For NewRelic transactions grouping, see [New Relic transactions grouping by queue names](/docs/dg/dev/guidelines/performance-guidelines/elastic-computing/new-relic-transaction-grouping-by-queue-names).

## APM access

The development team has a NewRelic "Full User" account and is able to access APM metrics for a project.
