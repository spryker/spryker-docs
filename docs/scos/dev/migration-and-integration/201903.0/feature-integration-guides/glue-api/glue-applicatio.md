---
title: Glue Application Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/glue-application-feature-integration-v2019030
redirect_from:
  - /v2/docs/glue-application-feature-integration-v2019030
  - /v2/docs/en/glue-application-feature-integration-v2019030
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Type | Version |
| --- | --- | --- |
| Spryker Core | Feature | 201903.0 |

### 1) Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker/glue-application:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox %}
Make sure that the following modules are installed:
{% endinfo_block %}

| Module | Expected directory |
| --- | --- |
| GlueApplication | `vendor/spryker/glue-application` |

### 2) Set up Configuration
Add the necessary parameters to `config/Shared/config_default.php`:

```
$config[GlueApplicationConstants::GLUE_APPLICATION_DOMAIN] = 'http://glue.mysprykershop.com';
$config[GlueApplicationConstants::GLUE_APPLICATION_CORS_ALLOW_ORIGIN] = 'http://glue.mysprykershop.com';
$config[GlueApplicationConstants::GLUE_APPLICATION_REST_DEBUG] = false;
```
{% info_block infoBox %}
`GLUE_APPLICATION_DOMAIN` and `GLUE_APPLICATION_CORS_ALLOW_ORIGIN` should be configured for every domain used in the project.
{% endinfo_block %}

### 3) Set up Transfer Objects
Run the following command to generate transfer objects:

```bash
console transfer:generate
```

{% info_block warningBox %}
Make sure that the following changes are present in transfer objects:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestPageOffsetsTransfer` | class | created | `src/Generated/Shared/Transfer/RestPageOffsetsTransfer` |
| `RestErrorMessageTransfer` | class | created | `src/Generated/Shared/Transfer/RestErrorMessageTransfer` |
| `RestErrorCollectionTransfer` | class | created | `src/Generated/Shared/Transfer/RestErrorCollectionTransfer` |
| `RestVersionTransfer` | class | created | `src/Generated/Shared/Transfer/RestVersionTransfer` |
| `RestUserTransfer` | class | created | `src/Generated/Shared/Transfer/RestUserTransfer.php` |

### 4) Set up Behavior
#### Set up frontend controller
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `GlueResourceBuilderService` | Registers the resource builder service in Glue Application. | None | `Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider` |
| `GlueApplicationServiceProvider` | Registers the pimple plugin, the controller resolver and configures the debug mode in Glue Application. | None | `Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider` |
| `SessionServiceProvider` | Registers session services in Glue Application. | None | `Silex\Provider` |
| `ServiceControllerServiceProvider` | Registers service the controller resolver in Glue Application. | None | Silex\Provider |
| `GlueServiceProviderPlugin` | Registers `onKernelController` event listeners in Glue Application. | None | `Spryker\Glue\GlueApplication\Plugin\Rest` |
| `GlueRoutingServiceProvider` | Registers the URL matcher and router services in Glue Application. | None | `Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider` |
| `SetStoreCurrentLocaleBeforeActionPlugin` | Sets a locale for the whole current store. | None | `Spryker\Glue\GlueApplication\Plugin\Rest\SetStoreCurrentLocaleBeforeActionPlugin` |

<details open>
<summary>src/Pyz/Glue/GlueApplication/Bootstrap/GlueBootstrap.php</summary>
    
```php
<?php
 
namespace Pyz\Glue\GlueApplication\Bootstrap;
 
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\SessionServiceProvider;
use Spryker\Glue\GlueApplication\Bootstrap\AbstractGlueBootstrap;
use Spryker\Glue\GlueApplication\Plugin\Rest\GlueServiceProviderPlugin;
use Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider\GlueApplicationServiceProvider;
use Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider\GlueResourceBuilderService;
use Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider\GlueRoutingServiceProvider;
 
class GlueBootstrap extends AbstractGlueBootstrap
{
    /**
     * @return void
     */
    protected function registerServiceProviders(): void
    {
        $this-&gt;application
            ->register(new GlueResourceBuilderService())
            ->register(new GlueApplicationServiceProvider())
            ->register(new SessionServiceProvider())
            ->register(new ServiceControllerServiceProvider())
            ->register(new GlueServiceProviderPlugin())
            ->register(new GlueRoutingServiceProvider());
    }
}
```

</br>
</details>

Create a new entry point for Glue Application:

<details open>
<summary>public/Glue/index.php</summary>

```php
<?php
 
use Pyz\Glue\GlueApplication\Bootstrap\GlueBootstrap;
use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;
 
define('APPLICATION', 'GLUE');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', realpath(__DIR__ . '/../..'));
 
require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';
 
Environment::initialize();
 
$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment-&gt;initialize();
 
$bootstrap = new GlueBootstrap();
$bootstrap
    ->boot()
    ->run();
```

</br>
</details>

#### Configure web server
Create Nginx VHOST configuration:

<details open>
<summary>/etc/nginx/sites-enabled/DE_development_glue</summary>

```php
server {
    # Listener for production/staging - requires external LoadBalancer directing traffic to this port
    listen 10001;
 
    # Listener for testing/development - one host only, doesn't require external LoadBalancer
    listen 80;
 
    server_name ~^glue\\..+\\.com$;
 
    keepalive_timeout 0;
    access_log  /data/logs/development/glue-access.log extended;
 
    # entry point for Glue Application
    root /data/shop/development/current/public/Glue;
 
    set $application_env development;
    # Binding store
    set $application_store DE;
    include "spryker/zed.conf";
}
```

</br>
</details>

Update hosts configuration by adding the following line (replace ip with your server's IP address):

`/etc/hosts`

```
ip glue.mysprykershop.com
```

{% info_block warningBox %}
If everything is set up correctly, you should be able to access `http://glue.mysprykershop.com` and get a correct JSON response as follows:
{% endinfo_block %}

```json
{
    "errors": [
        {
            "status": 404,
            "detail": "Not Found"
        }
    ]
}
```

<details open>
<summary>\Pyz\Glue\GlueApplication\GlueApplicationDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\Rest\SetStoreCurrentLocaleBeforeActionPlugin;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ControllerBeforeActionPluginInterface[]
     */
    protected function getControllerBeforeActionPlugins(): array
    {
        return [
            new SetStoreCurrentLocaleBeforeActionPlugin(),
        ];
    }
}
```

</br>
</details>

{% info_block warningBox %}
If everything is set up correctly, request to `http://glue.mysprykershop.com` with header `[{"key":"Accept-Language","value":"de_DE, de;q=0.9"}]` should result in a response that contains the content-language header set to de_DE.
{% endinfo_block %}

<!-- Last review date: Jul 10, 2019 by Ahmed Saaba and Volodymyr Volkov-->
