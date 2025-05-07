---
title: Extend the audit log structure
description: Extend the structure of your Spryker audit logs to include additional data fields, providing more detailed tracking of backend activities and enhancing system monitoring capabilities.
template: howto-guide-template
last_updated: Jun 16, 2024
related:
  - title: Add audit log types
    link: docs/dg/dev/backend-development/audit-logs/add-audit-log-types.html

---

This document describes how to extend the audit log structure with additional data. As an example, a business unit of a logged-in customer for the `Yves` application will be added.

There are two primary methods to extend data in audit logs:
* Introduce processor plugins: When registered for an audit log type and application, plugins will be executed on each request to try to extend the log data. For more information, see [Add audit log types](/docs/dg/dev/backend-development/audit-logs/add-audit-log-types.html).
* Pass the data to a specific log context: You can pass additional data directly to a needed log context, providing flexibility for different logging scenarios.

## Prerequisites

[Install the Spryker Core feature](/docs/pbc/all/miscellaneous/202410.0/install-and-upgrade/install-features/install-the-spryker-core-feature.html)


## Extend the audit log structure by introducing processor plugins

1. Add the `RequestStack` service to the dependency provider of your module to get access to the customer session:

<details>
  <summary>src/Pyz/Yves/Log/LogDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Yves\Log;

use Spryker\Yves\Kernel\Container;
use Spryker\Yves\Log\LogDependencyProvider as SprykerLogDependencyProvider;

class LogDependencyProvider extends SprykerLogDependencyProvider
{
    /**
     * @uses \Spryker\Yves\Http\Plugin\Application\HttpApplicationPlugin::SERVICE_REQUEST_STACK
     *
     * @var string
     */
    public const SERVICE_REQUEST_STACK = 'request_stack';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container): Container
    {
        $container = parent::provideDependencies($container);
        $container = $this->addRequestStackService($container);

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addRequestStackService(Container $container): Container
    {
        $container->set(static::SERVICE_REQUEST_STACK, function (Container $container) {
            return $container->getApplicationService(static::SERVICE_REQUEST_STACK);
        });

        return $container;
    }
}
```

</details>

2. Add a factory method to get the `RequestStack` service:

**src/Pyz/Yves/Log/LogFactory.php**

```php
<?php

namespace Pyz\Yves\Log;

use Spryker\Yves\Log\LogFactory as SprykerShopLogFactory;
use Symfony\Component\HttpFoundation\RequestStack;

class LogFactory extends SprykerShopLogFactory
{
    /**
     * @return \Symfony\Component\HttpFoundation\RequestStack
     */
    public function getRequestStackService(): RequestStack
    {
        return $this->getProvidedDependency(LogDependencyProvider::SERVICE_REQUEST_STACK);
    }
}

```

3. Introduce `CustomerBusinessUnitProcessorPlugin`, which extracts the business unit name from the customer session and adds it to the log data:

<details>
  <summary>src/Pyz/Yves/Log/Plugin/Log/CustomerBusinessUnitProcessorPlugin.php</summary>

```php
<?php

namespace Pyz\Yves\Log\Plugin\Log;

use Generated\Shared\Transfer\CustomerTransfer;
use Spryker\Shared\Log\Dependency\Plugin\LogProcessorPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;
use Symfony\Component\HttpFoundation\Request;

class CustomerBusinessUnitProcessorPlugin extends AbstractPlugin implements LogProcessorPluginInterface
{
    /**
     * @param array<string, mixed> $data
     *
     * @return array<string, mixed>
     */
    public function __invoke(array $data): array
    {
        $customerTransfer = $this->findCurrentCustomer();

        if (!$customerTransfer) {
            return $data;
        }

        $currentRequestData = $this->getCurrentRequestData($customerTransfer);

        if (isset($data['extra']['request'])) {
            $data['extra']['request'] = array_merge(
                $data['extra']['request'],
                $currentRequestData,
            );

            return $data;
        }

        $data['extra']['request'] = $currentRequestData;

        return $data;
    }

    /**
     * @return \Generated\Shared\Transfer\CustomerTransfer|null
     */
    protected function findCurrentCustomer(): ?CustomerTransfer
    {
        $currentRequest = $this->getFactory()->getRequestStackService()->getCurrentRequest();

        if (!$currentRequest || !$currentRequest->hasSession()) {
            return null;
        }

        return $this->findCustomerInRequest($currentRequest);
    }

    /**
     * @param \Generated\Shared\Transfer\CustomerTransfer $customerTransfer
     *
     * @return array<string, mixed>
     */
    protected function getCurrentRequestData(CustomerTransfer $customerTransfer): array
    {
        $currentRequestData = [];

        $currentRequestData['customer_business_unit_name'] = $customerTransfer->getCompanyUserTransferOrFail()
            ->getCompanyBusinessUnitOrFail()
            ->getName();

        return $currentRequestData;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer|null
     */
    protected function findCustomerInRequest(Request $request): ?CustomerTransfer
    {
        return $request->getSession()->get('customer data');
    }
}
```

</details>

4. Register the newly introduced plugin for the `security` log type for the `Yves` application:

**src/Pyz/Yves/Log/LogDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Log;

use Spryker\Yves\Kernel\Container;
use Spryker\Yves\Log\LogDependencyProvider as SprykerLogDependencyProvider;

class LogDependencyProvider extends SprykerLogDependencyProvider
{
    /**
     * @return list<\Spryker\Shared\Log\Dependency\Plugin\LogProcessorPluginInterface>
     */
    protected function getYvesSecurityAuditLogProcessorPlugins(): array
    {
        return [
            // other plugins
            new CustomerBusinessUnitProcessorPlugin(),
        ];
    }
}
```

Now when you log in as a customer with a business unit, the corresponding business unit name will be added to the log data.

## Extend the audit log structure by pass the data to the specific log context

Pass the data directly to the specific log context as needed:

```php
<?php

use Generated\Shared\Transfer\AuditLoggerConfigCriteriaTransfer;
use Spryker\Shared\Log\AuditLoggerTrait;

class AnyClassWhereAuditLoggingIsNeeded
{
    use AuditLoggerTrait;

    public function someLogic()
    {
        //other logic

        $this->getAuditLogger(
            (new AuditLoggerConfigCriteriaTransfer())->setChannelName('checkout'),
        )->info('any action', [
            'tags' => ['any_checkout_action'],
            'customer_business_unit_name' => $customerTransfer->getCompanyUserTransferOrFail()
                ->getCompanyBusinessUnitOrFail()
                ->getName(),
        ]);

        //other logic
    }
}
```

Now when you log in as a customer with a business unit, the corresponding business unit name will be added to the log data.
