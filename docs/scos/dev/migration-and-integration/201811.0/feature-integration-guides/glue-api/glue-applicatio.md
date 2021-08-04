---
title: Glue Application Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/glue-application-feature-integration
redirect_from:
  - /v1/docs/glue-application-feature-integration
  - /v1/docs/en/glue-application-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, review and install the necessary features:
|Name|Version|
|---|---|
|Spryker Core|2018.12.0|
### 1) Install the Required Modules Using Composer

Run the following command to install the required modules:
```yaml
composer require spryker/glue-application:"^1.9.1" spryker/glue-application-extension:"^1.1.0" --update-with-dependencies
```

{% info_block infoBox "Verification" %}
Make sure that the following modules are installed:
{% endinfo_block %}
|Module|Expected Directory|
|---|---|
|`GlueApplication`|`vendor/spryker/glue-application`|
|`GlueApplicationExtension`|`vendor/spryker/glue-application-extension`|

### 2) Set up Configuration
{% info_block infoBox "Info" %}
`GLUE_APPLICATION_DOMAIN` should be configured for every domain used in project.
{% endinfo_block %}

Add the required parameters to `config/Shared/config_default.php`:
```php
$config[GlueApplicationConstants::GLUE_APPLICATION_DOMAIN] = 'http://glue.example.com';
$config[GlueApplicationConstants::GLUE_APPLICATION_REST_DEBUG] = false;
```

### 3) Set up Transfer objects

Run the following command to generate transfer objects:
```yaml
console transfer:generate
```

{% info_block infoBox "Verification" %}
Make sure that the following changes are present in transfer objects:
{% endinfo_block %}
|Transfer|Type|Event|Path|
|---|---|---|---|
|`RestPageOffsetsTransfer`|class|created|`src/Generated/Shared/Transfer/RestPageOffsetsTransfer`|
|`RestErrorMessageTransfer`|class|created|`src/Generated/Shared/Transfer/RestErrorMessageTransfer`|
|`RestErrorCollectionTransfer`|class|created|`src/Generated/Shared/Transfer/RestErrorCollection`|
|`TransferRestVersionTransfer`|class|created|`src/Generated/Shared/Transfer/RestVersionTransfer`|

### 4) Set up Behavior
#### Set up front controller
**Implementation**
Activate the following plugins:
|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`GlueResourceBuilderService`|Registers the resource builder service in the Glue application.|None|`Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider`|
|`GlueApplicationServiceProvider`|Registers the pimple plugin, controller resolver and configures the debug mode in the Glue application.|None|`Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider`|
|`SessionServiceProvider`|Registers the session services in the Glue application.|None|`Silex\Provider`|
|`ServiceControllerServiceProvider`|Registers the service controller resolver in the Glue application.|None|`Silex\Provider`|
|`GlueServiceProviderPlugin`|Registers the `onKernelController` event listeners in the Glue application.|None|`Spryker\Glue\GlueApplication\Plugin\Rest`|
|`GlueRoutingServiceProvider`|Registers the url matcher and router services in the Glue application.|None|`Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider`|

Create a GlueBootstrap file for your project and register all the needed plugins:
**`src/Pyz/Glue/GlueApplication/Bootstrap/GlueBootstrap.php`**
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
            -&gt;register(new GlueResourceBuilderService())
            -&gt;register(new GlueApplicationServiceProvider())
            -&gt;register(new SessionServiceProvider())
            -&gt;register(new ServiceControllerServiceProvider())
            -&gt;register(new GlueServiceProviderPlugin())
            -&gt;register(new GlueRoutingServiceProvider());
    }
}
```
Create a new entry point for the Glue Application in the public/Glue folder:
**`public/Glue/index.php`**
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
    -&gt;boot()
    -&gt;run();
```
#### Configure web server
Configure your web server's host to have access to the freshly created front controller. If you use nginx, you can use the following configuration for your web-server:
Nginx configuration example:
```nginx
server {
    # Listener for production/staging - requires external LoadBalancer directing traffic to this port
    listen 10001;
 
    # Listener for testing/development - one host only, doesn't require external LoadBalancer
    listen 80;
 
    server_name ~^glue\\.de\\..+\\.com$;
 
    keepalive_timeout 0;
    access_log  /data/logs/development/glue-access.log extended;
 
    root /data/shop/development/current/public/Glue;
 
    set $application_env development;
    set $application_store DE;
    include "spryker/zed.conf";
}
```
**Verification**
{% info_block infoBox %}
If everything has been set up correctly, you should be able to access http://glue.example.com/ and see the correct JSON response:
{% endinfo_block %}
```JSON
{
    "errors": [
        {
            "status": 404,
            "detail": "Not Found"
        }
    ]
}
```
 *Last review date: Feb 25, 2019* <!-- by  Anton Khabiuk and Dmitry Beirak-->
