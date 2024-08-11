---
title: Integrate health checks
description: Health checks allow to determine whether application services are working properly and, when automated, detect issues right when they appear.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/health-checks
originalArticleId: 6436e19e-66bf-45a6-a935-889c88531bc2
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-health-checks.html
  - /docs/scos/dev/technical-enhancements/health-checks.html
---

A health checks allows you to identify whether application services are functioning properly by sending GET requests to application endpoints.

In the table below you can find all the Spryker services that you can run health checks for. The services are grouped by the applications they belong to.

|  ZED | YVES | GLUE |
| --- | --- | --- |
| Search | Search | Search |
| Storage | Storage | Storage |
| Database | ZedRequest | ZedRequest |
| Session | Session |  |

## Endpoints

By default, all the application endpoints are closed for security reasons. You can check it by opening `http://application.mysprykershop.com/health-check` in a browser or sending a GET curl request to receive the status code 403.

To enable the endpoints, add the following to `/config/Shared/config_default.php`:

```php
use Spryker\Shared\HealthCheck\HealthCheckConstants;

$config[HealthCheckConstants::HEALTH_CHECK_ENABLED] = true;
```

## Running Application Health Checks

To run a health check, either open the URL of an application endpoint in a browser or send a curl GET request. The pattern is `http://application.mysprykershop.com/health-check`. For example, `http://zed.mysprykershop.com/health-check`.

Depending on the application status, you will see:

* status code 200 and the list of application services with the `available` status;
* status code 503 and the list of application services where at least one service has the `unavailable` status.

## Running Application Service Health Checks

When an application service is unavailable, you might want to apply a fix and run a health check for that particular service. To do that, you can specify the application service(s) you want to run a health check for in the request URL. The pattern is `http://application.mysprykershop.com/health-check?services={service},{service}`. For example, `https://glue.mysprykershop.com/health-check?services=storage`.

## Integration

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |

### 1) Install the required modules

Run the following command to install the required modules:

```bash
composer require spryker-feature/spryker-core: "^{{page.version}}" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| HealthCheck | vendor/spryker/health-check |
| HealthCheckExtension | vendor/spryker/health-check-extension |

{% endinfo_block %}

### 2) Set up configuration

1. Extend ACL configuration settings:

```php
// ACL: Allow or disallow of urls for Zed Admin GUI for ALL users
$config[AclConstants::ACL_DEFAULT_RULES] = [
  ...,
     [
        'bundle' => 'health-check',
        'controller' => 'index',
        'action' => 'index',
        'type' => 'allow',
    ],
];

// ACL: Allow or disallow of urls for Zed Admin GUI
$config[AclConstants::ACL_USER_RULE_WHITELIST] = [
   ...,
    [
        'bundle' => 'health-check',
        'controller' => 'index',
        'action' => 'index',
        'type' => 'allow',
    ],
];
```

2. Adjust `\Pyz\Zed\Auth\AuthConfig.php` to ignore authentication of Zed application health check requests:

```php
<?php

namespace Pyz\Zed\Auth;

use Spryker\Zed\Auth\AuthConfig as SprykerAuthConfig;

class AuthConfig extends SprykerAuthConfig
{
    /**
     * @return array
     */
    public function getIgnorable()
    {
        $this->addIgnorable('health-check', 'index', 'index');
        ...

        return parent::getIgnorable();
    }
}
```

### 3) Set up Behavior

1. Register the following plugins for `Zed` application:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| SessionHealthCheckPlugin | Performs a health check for the Session service. | None | Spryker\Zed\Session\Communication\Plugin\HealthCheck |
| KeyValueStoreHealthCheckPlugin | Performs a health check for the Storage service. | None | Spryker\Zed\Storage\Communication\Plugin\HealthCheck |
| SearchHealthCheckPlugin | Performs a health check for the Search service. | None | Spryker\Zed\Search\Communication\Plugin\HealthCheck |
| DatabaseHealthCheckPlugin | Performs a health check for the Propel service. | None | `Spryker\Zed\Propel\Communication\Plugin\HealthCheck |

```php
<?php

namespace Pyz\Zed\HealthCheck;

use Spryker\Zed\HealthCheck\HealthCheckDependencyProvider as SprykerHealthCheckDependencyProvider;
use Spryker\Zed\Propel\Communication\Plugin\HealthCheck\DatabaseHealthCheckPlugin;
use Spryker\Zed\Search\Communication\Plugin\HealthCheck\SearchHealthCheckPlugin;
use Spryker\Zed\Session\Communication\Plugin\HealthCheck\SessionHealthCheckPlugin;
use Spryker\Zed\Storage\Communication\Plugin\HealthCheck\KeyValueStoreHealthCheckPlugin;

class HealthCheckDependencyProvider extends SprykerHealthCheckDependencyProvider
{
    /**
     * @return \Spryker\Shared\HealthCheckExtension\Dependency\Plugin\HealthCheckPluginInterface[]
     */
    protected function getHealthCheckPlugins(): array
    {
        return [
            new SessionHealthCheckPlugin(),
            new KeyValueStoreHealthCheckPlugin(),
            new SearchHealthCheckPlugin(),
            new DatabaseHealthCheckPlugin(),
        ];
    }
}
```

2. Register the following plugins for `Yves` application:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| SessionHealthCheckPlugin | Performs a health check for the Session service. | None | Spryker\Yves\Session\Plugin\HealthCheck |
| KeyValueStoreHealthCheckPlugin | Performs a health check for the Storage service. | None | Spryker\Yves\Storage\Plugin\HealthCheck |
| SearchHealthCheckPlugin |Performs a health check for the Search service.| None | Spryker\Yves\Search\Plugin\HealthCheck |
| ZedRequestHealthCheckPlugin | Performs a health check for the ZedRequest service. | None | Spryker\Yves\ZedRequest\Plugin\HealthCheck |    

```php
<?php

namespace Pyz\Yves\HealthCheck;

use Spryker\Yves\HealthCheck\HealthCheckDependencyProvider as SprykerHealthCheckDependencyProvider;
use Spryker\Yves\Search\Plugin\HealthCheck\SearchHealthCheckPlugin;
use Spryker\Yves\Session\Plugin\HealthCheck\SessionHealthCheckPlugin;
use Spryker\Yves\Storage\Plugin\HealthCheck\KeyValueStoreHealthCheckPlugin;
use Spryker\Yves\ZedRequest\Plugin\HealthCheck\ZedRequestHealthCheckPlugin;

class HealthCheckDependencyProvider extends SprykerHealthCheckDependencyProvider
{
    /**
     * @return \Spryker\Shared\HealthCheckExtension\Dependency\Plugin\HealthCheckPluginInterface[]
     */
    protected function getHealthCheckPlugins(): array
    {
        return [
            new SessionHealthCheckPlugin(),
            new SearchHealthCheckPlugin(),
            new KeyValueStoreHealthCheckPlugin(),
            new ZedRequestHealthCheckPlugin(),
        ];
    }
}
```

3. Register the following plugins for `Glue` application:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| KeyValueStoreHealthCheckPlugin | Performs a health check for the Storage service. | None | Spryker\Glue\Storage\Plugin\HealthCheck |
| SearchHealthCheckPlugin | Performs a health check for the Search service. | None | Spryker\Glue\Search\Plugin\HealthCheck |
| ZedRequestHealthCheckPlugin |Performs a health check for the ZedRequest service.| None |Spryker\Glue\ZedRequest\Plugin\HealthCheck |

```php
<?php

namespace Pyz\Glue\HealthCheck;

use Spryker\Glue\HealthCheck\HealthCheckDependencyProvider as SprykerHealthCheckDependencyProvider;
use Spryker\Glue\Search\Plugin\HealthCheck\SearchHealthCheckPlugin;
use Spryker\Glue\Storage\Plugin\HealthCheck\KeyValueStoreHealthCheckPlugin;
use Spryker\Glue\ZedRequest\Plugin\HealthCheck\ZedRequestHealthCheckPlugin;

class HealthCheckDependencyProvider extends SprykerHealthCheckDependencyProvider
{
    /**
     * @return \Spryker\Shared\HealthCheckExtension\Dependency\Plugin\HealthCheckPluginInterface[]
     */
    protected function getHealthCheckPlugins(): array
    {
        return [
            new SearchHealthCheckPlugin(),
            new KeyValueStoreHealthCheckPlugin(),
            new ZedRequestHealthCheckPlugin(),
        ];
    }
}
```

### 4) Set up transfer objects

Run the following command to apply transfer changes:

```bash
vendor/bin/console transfer:generate
```

{% info_block warningBox “Verification” %}

Make sure that the following changes took place in transfer objects:

| TRANSFER | TYPE | EVENT | NAMESPACE |
| --- | --- | --- | --- |
| HealthCheckRequestTransfer | class | created | src\Generated\Shared\Transfer\HealthCheckRequestTransfer |
| HealthCheckResponseTransfer | class | created | src\Generated\Shared\Transfer\HealthCheckResponseTransfer |
| HealthCheckServiceResponseTransfer | class | created | src\Generated\Shared\Transfer\HealthCheckServiceResponseTransfer |

{% endinfo_block %}
