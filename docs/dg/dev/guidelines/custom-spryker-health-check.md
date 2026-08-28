---
title: Data Processing Guidelines
description: The article describes how to implement a custom health check plugin.
last_updated: Aug 28, 2026
template: concept-topic-template
related:
  - title: Integrate health checks
  - link: /docs/dg/dev/integrate-and-configure/integrate-health-checks.html#set-up-transfer-objects
---

# Implement a custom health check in Spryker

## Overview

Spryker’s `HealthCheck` module exposes application health-check endpoints and executes registered health-check plugins. A custom check is implemented through `HealthCheckPluginInterface`, which requires:

- `getName(): string` — returns the unique service name displayed in the health-check response.
- `check(): HealthCheckServiceResponseTransfer` — runs the check and returns its status and an optional failure message.

This guide uses **Yves** and a fictional external service named `AcmeService` as the example. The same plugin contract can also be used for Glue and Zed when the health check must run in those applications.

## Prerequisites

Ensure the required modules are installed in the project:

```bash
composer require spryker/health-check spryker/health-check-extension
```

Check your project’s existing Composer constraints before changing package versions.

## 1. Enable the health-check endpoint

Add the following configuration to `config/Shared/config_default.php`, or to the appropriate environment configuration:

```php
<?php

use Spryker\Shared\HealthCheck\HealthCheckConstants;

$config[HealthCheckConstants::HEALTH_CHECK_ENABLED] = true;
```

When disabled, a request to the health-check endpoint is rejected. Spryker documents `/health-check` as the application endpoint and recommends enabling it through `HealthCheckConstants::HEALTH_CHECK_ENABLED`.

> **Security:** Do not expose detailed dependency errors publicly unless the endpoint is protected at the ingress, load balancer, firewall, or monitoring layer. Exception messages can reveal internal hosts, ports, credentials, or infrastructure details.

## 2. Implement the checker

Create a checker in the project module. Keep the plugin thin and put the actual connection test in a dedicated class.

`src/Pyz/Yves/AcmeService/HealthCheck/AcmeServiceHealthCheckInterface.php`:

```php
<?php

declare(strict_types=1);

namespace Pyz\Yves\AcmeService\HealthCheck;

use Generated\Shared\Transfer\HealthCheckServiceResponseTransfer;

interface AcmeServiceHealthCheckInterface
{
    public function executeHealthCheck(): HealthCheckServiceResponseTransfer;
}
```

`src/Pyz/Yves/AcmeService/HealthCheck/AcmeServiceHealthCheck.php`:

```php
<?php

declare(strict_types=1);

namespace Pyz\Yves\AcmeService\HealthCheck;

use Generated\Shared\Transfer\HealthCheckServiceResponseTransfer;
use Pyz\Client\AcmeService\AcmeServiceClientInterface;
use Throwable;

class AcmeServiceHealthCheck implements AcmeServiceHealthCheckInterface
{
    public function __construct(
        protected AcmeServiceClientInterface $acmeServiceClient,
    ) {
    }

    public function executeHealthCheck(): HealthCheckServiceResponseTransfer
    {
        $responseTransfer = (new HealthCheckServiceResponseTransfer())
            ->setStatus(true);

        try {
            $this->acmeServiceClient->checkConnection();
        } catch (Throwable $throwable) {
            return $responseTransfer
                ->setStatus(false)
                ->setMessage($this->createSafeFailureMessage($throwable));
        }

        return $responseTransfer;
    }

    protected function createSafeFailureMessage(Throwable $throwable): string
    {
        return sprintf(
            'AcmeService is unavailable (%s).',
            $throwable::class,
        );
    }
}
```

Replace `AcmeServiceClientInterface` and `checkConnection()` with the client and the cheapest meaningful operation available in your project. The operation should prove that the dependency can serve requests without performing writes or loading a large dataset.

### Response semantics

Return:

```php
(new HealthCheckServiceResponseTransfer())
    ->setStatus(true);
```

when the dependency is healthy, and:

```php
(new HealthCheckServiceResponseTransfer())
    ->setStatus(false)
    ->setMessage('AcmeService is unavailable.');
```

when it is unhealthy.

The core Search health check follows this pattern: it initializes the response with `status = true`, calls the Search client’s connection check, and changes the response to `status = false` with a message when the operation throws.

## 3. Wire the checker through the factory

`src/Pyz/Yves/AcmeService/AcmeServiceFactory.php`:

```php
<?php

declare(strict_types=1);

namespace Pyz\Yves\AcmeService;

use Pyz\Yves\AcmeService\HealthCheck\AcmeServiceHealthCheck;
use Pyz\Yves\AcmeService\HealthCheck\AcmeServiceHealthCheckInterface;
use Spryker\Yves\Kernel\AbstractFactory;

class AcmeServiceFactory extends AbstractFactory
{
    public function createAcmeServiceHealthCheck(): AcmeServiceHealthCheckInterface
    {
        return new AcmeServiceHealthCheck(
            $this->getProvidedDependency(AcmeServiceDependencyProvider::CLIENT_ACME_SERVICE),
        );
    }
}
```

`src/Pyz/Yves/AcmeService/AcmeServiceDependencyProvider.php`:

```php
<?php

declare(strict_types=1);

namespace Pyz\Yves\AcmeService;

use Spryker\Yves\Kernel\AbstractBundleDependencyProvider;
use Spryker\Yves\Kernel\Container;

class AcmeServiceDependencyProvider extends AbstractBundleDependencyProvider
{
    public const CLIENT_ACME_SERVICE = 'CLIENT_ACME_SERVICE';

    public function provideDependencies(Container $container): Container
    {
        $container = parent::provideDependencies($container);

        $container->set(static::CLIENT_ACME_SERVICE, function (Container $container) {
            return $container->getLocator()->acmeService()->client();
        });

        return $container;
    }
}
```

If your project already exposes the dependency through another module, use that module’s dependency bridge or client wiring instead of duplicating it.

## 4. Implement the health-check plugin

Create `src/Pyz/Yves/AcmeService/Plugin/HealthCheck/AcmeServiceHealthCheckPlugin.php`:

```php
<?php

declare(strict_types=1);

namespace Pyz\Yves\AcmeService\Plugin\HealthCheck;

use Generated\Shared\Transfer\HealthCheckServiceResponseTransfer;
use Spryker\Shared\HealthCheckExtension\Dependency\Plugin\HealthCheckPluginInterface;
use Spryker\Yves\Kernel\AbstractPlugin;

/**
 * @method \Pyz\Yves\AcmeService\AcmeServiceFactory getFactory()
 */
class AcmeServiceHealthCheckPlugin extends AbstractPlugin implements HealthCheckPluginInterface
{
    protected const SERVICE_NAME = 'acme-service';

    public function getName(): string
    {
        return static::SERVICE_NAME;
    }

    public function check(): HealthCheckServiceResponseTransfer
    {
        return $this->getFactory()
            ->createAcmeServiceHealthCheck()
            ->executeHealthCheck();
    }
}
```

Use a stable, unique, machine-readable name such as `acme-service`. Monitoring rules may depend on it, so changing the name later can break dashboards or alerts.

## 5. Register the plugin in Yves

Extend the project-level HealthCheck dependency provider:

`src/Pyz/Yves/HealthCheck/HealthCheckDependencyProvider.php`:

```php
<?php

declare(strict_types=1);

namespace Pyz\Yves\HealthCheck;

use Pyz\Yves\AcmeService\Plugin\HealthCheck\AcmeServiceHealthCheckPlugin;
use Spryker\Yves\HealthCheck\HealthCheckDependencyProvider as SprykerHealthCheckDependencyProvider;

class HealthCheckDependencyProvider extends SprykerHealthCheckDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\HealthCheckExtension\Dependency\Plugin\HealthCheckPluginInterface>
     */
    protected function getHealthCheckPlugins(): array
    {
        return [
            ...parent::getHealthCheckPlugins(),
            new AcmeServiceHealthCheckPlugin(),
        ];
    }
}
```

If the project already overrides `getHealthCheckPlugins()`, append the plugin to the existing list. Do not accidentally remove the Search, Storage, Session, or ZedRequest checks already registered by the project.

## 6. Register the plugin in Glue or Zed when needed

A health-check plugin only runs in the application where it is registered.

For Glue, use:

```php
namespace Pyz\Glue\HealthCheck;

use Pyz\Glue\AcmeService\Plugin\HealthCheck\AcmeServiceHealthCheckPlugin;
use Spryker\Glue\HealthCheck\HealthCheckDependencyProvider as SprykerHealthCheckDependencyProvider;
```

For Zed, use the project’s Zed `HealthCheckDependencyProvider` and implement the plugin in the Zed layer. Do not reuse a Yves plugin that depends on a Yves factory inside Zed.

Choose the application according to what must be tested:

| Dependency or behavior | Recommended application |
|---|---|
| Storefront client dependency | Yves |
| API-facing client dependency | Glue |
| Database, business facade, back-office integration | Zed |
| Dependency used independently by multiple applications | Implement and register an application-specific plugin in each relevant layer |

## 7. Generate transfers and clear caches

Run the project’s standard generation and cache commands. In Spryker Docker SDK projects, this commonly includes:

```bash
docker/sdk console transfer:generate
docker/sdk console cache:empty-all
```

If you added only project classes and the required transfer already exists, transfer generation may not introduce changes, but running the project’s normal post-change workflow verifies that generated classes and autoloading are current.

## 8. Test the endpoint

Call the endpoint on the application host:

```bash
curl --fail-with-body --show-error \
    https://application.example.com/health-check
```

Also test the failure path by making the dependency temporarily unreachable in a local or isolated test environment. Verify that:

- the custom service name appears in the response;
- a healthy dependency returns `status: true`;
- an unavailable dependency returns `status: false`;
- the overall endpoint signals failure as expected by your monitoring setup;
- the response does not expose secrets or sensitive infrastructure details;
- the check finishes well below the probe timeout.

Do not validate the failure path by disrupting a shared or production dependency. Health checks are meant to find fires, not start one.

## 9. Add automated tests

At minimum, cover these cases:

1. The checker returns `status = true` when `checkConnection()` succeeds.
2. The checker returns `status = false` when the client throws.
3. The failure response contains a safe, actionable message.
4. The plugin returns the expected service name.
5. The plugin delegates to the checker.

Example checker test outline:

```php
public function testExecuteHealthCheckReturnsSuccessfulResponse(): void
{
    $clientMock = $this->createMock(AcmeServiceClientInterface::class);
    $clientMock->expects($this->once())
        ->method('checkConnection');

    $checker = new AcmeServiceHealthCheck($clientMock);

    $this->assertTrue($checker->executeHealthCheck()->getStatus());
}

public function testExecuteHealthCheckReturnsFailedResponseWhenClientThrows(): void
{
    $clientMock = $this->createMock(AcmeServiceClientInterface::class);
    $clientMock->method('checkConnection')
        ->willThrowException(new RuntimeException('Internal connection details'));

    $checker = new AcmeServiceHealthCheck($clientMock);
    $responseTransfer = $checker->executeHealthCheck();

    $this->assertFalse($responseTransfer->getStatus());
    $this->assertSame(
        'AcmeService is unavailable (RuntimeException).',
        $responseTransfer->getMessage(),
    );
}
```

## Design guidelines

### Keep the check fast

A health check may be called frequently by infrastructure. Use the fastest operation that proves the service is usable:

- a lightweight ping or connection check;
- a `HEAD` request;
- a minimal read-only query;
- a provider-specific status endpoint.

Avoid expensive searches, full catalog reads, writes, queue publication, or multi-step business operations.

### Apply strict timeouts

Configure short connection and total request timeouts in the underlying client. The health-check endpoint should fail promptly instead of consuming PHP workers while a dependency is unavailable.

### Distinguish liveness from readiness

Use dependency checks for **readiness**: whether the application can currently serve its intended traffic. A **liveness** check should usually verify only that the application process is responsive; tying liveness to an optional external service can cause unnecessary restart loops.

If your platform uses the same Spryker endpoint for both probes, configure orchestration behavior carefully and avoid adding non-critical dependencies that could repeatedly restart healthy application containers.

### Define required versus optional dependencies

A failed plugin contributes to application health. Register only dependencies whose failure should make the application unavailable. For optional integrations, prefer metrics and alerts over marking the entire application unhealthy.

### Avoid side effects

The operation must be idempotent and read-only. A health check can run many times per minute across multiple instances.

### Handle all operational failures

Catching `Throwable` at the health-check boundary ensures both exceptions and PHP errors from the dependency are converted into a controlled unhealthy result. Log the original failure through the project’s logging facilities if operators need detailed diagnostics, while returning a sanitized public message.

## Troubleshooting

### The custom check is missing from the response

- Confirm the plugin is registered in the dependency provider for the host you are calling.
- Confirm the namespace matches the application layer: `Pyz\Yves`, `Pyz\Glue`, or `Pyz\Zed`.
- Clear application caches.
- Check that the module is present in the relevant application’s bundle configuration when required by the project setup.

### The endpoint returns 403

Confirm that:

```php
$config[HealthCheckConstants::HEALTH_CHECK_ENABLED] = true;
```

is applied in the active environment configuration.

### The endpoint times out

- Reduce the dependency client’s connection and request timeouts.
- Replace expensive business operations with a lightweight connectivity test.
- Check whether several plugins are each waiting on their own timeout.

### A failed optional service takes down readiness

Remove the service from the aggregate health check and monitor it separately, or redesign the application so that the dependency is genuinely required before including it in readiness.

## Implementation checklist

- [ ] Enable the health-check endpoint in the correct environment.
- [ ] Implement a dedicated, read-only checker.
- [ ] Return `HealthCheckServiceResponseTransfer` with `status` and a safe failure message.
- [ ] Implement `HealthCheckPluginInterface`.
- [ ] Use a unique and stable service name.
- [ ] Register the plugin in the correct application layer.
- [ ] Preserve existing registered plugins.
- [ ] Configure strict client timeouts.
- [ ] Clear caches and run the project’s standard generation workflow.
- [ ] Test both healthy and unhealthy paths.
- [ ] Protect the endpoint and avoid leaking internal details.
- [ ] Add monitoring based on the endpoint’s HTTP status and response.

## References

- [Spryker documentation: Integrate health checks](https://docs.spryker.com/docs/dg/dev/integrate-and-configure/integrate-health-checks.html)
- [HealthCheckPluginInterface source](https://github.com/spryker/health-check-extension/blob/master/src/Spryker/Shared/HealthCheckExtension/Dependency/Plugin/HealthCheckPluginInterface.php)
- [SearchHealthCheck implementation](https://github.com/spryker/search/blob/master/src/Spryker/Yves/Search/HealthCheck/SearchHealthCheck.php)
- [SearchHealthCheckPlugin implementation](https://github.com/spryker/search/blob/master/src/Spryker/Yves/Search/Plugin/HealthCheck/SearchHealthCheckPlugin.php)
