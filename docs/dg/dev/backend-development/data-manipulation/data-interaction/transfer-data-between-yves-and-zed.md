---
title: Transfer data between Yves and Zed
description: This document shows how to set up communication between Yves and Zed.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-transfer-data-yves-zed
originalArticleId: 92fb4df1-548a-44eb-aa4a-8ee1d8e70376
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-interaction/transfer-data-between-yves-and-zed.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-interaction/transfering-data-between-yves-and-zed.html
---

Yves gets most of its data from the client-side NoSQL data stores (data such as product details, product categories, and prices). There are situations when Yves needs to communicate with Zed either to submit data (for example, the customer has submitted a new order or subscribed to a newsletter) or to retrieve data (for example, order history for the customer or customer account details).

This document shows how to set up communication between Yves and Zed and display a random salutation message that is retrieved from Zed.

{% info_block warningBox "Prerequisites" %}

You need a module for which you set up communication between Yves and Zed. To add the module, see [Add a new module](/docs/dg/dev/backend-development/extend-spryker/create-modules.html).

{% endinfo_block %}

To implement communication between Yves and Zed, follow the steps below.

## 1. Create a transfer object

Communication between Yves and Zed is done using [transfer objects](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/create-use-and-extend-the-transfer-objects.html). So to establish communication between Yves and Zed, you need to create a transfer object as follows:

1. Create a new transfer object and add it to the `src/Pyz/Shared/HelloWorld/Transfer/` folder. In the example, it's called the `helloworld.transfer.xml` transfer object, and one property is assigned to it:

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="HelloWorldMessage">
        <property name="value" type="string" />
    </transfer>

</transfers>
```

2. Generate the transfer object so that it's ready to be used:

```bash
console transfer:generate
```

1. Add an operation to your `HelloWorldFacade` that returns a random salutation message using the transfer object you've just defined:

```php
<?php
/**
 * @return \Generated\Shared\Transfer\HelloWorldMessageTransfer
 */
public function getSalutationMessage()
{
    return $this->getFactory()->createMessageGenerator()->generateHelloMessage();
}
```


## 2. Create a gateway controller

The `GatewayController` controller is responsible for communication with Yves. It must extend the `AbstractGatewayController` class. So your next step is to create the controller.

Create the `GatewayController` in Zed under `Pyz\Zed\HelloWorld\Communication\Controller`. Add an action to this controller that calls the functionality you have exposed through your facade:

```php
<?php
namespace Pyz\Zed\HelloWorld\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractGatewayController;

/**
 * @method \Pyz\Zed\HelloWorld\Business\HelloWorldFacade getFacade()
 */
class GatewayController extends AbstractGatewayController
{
    /**
     *  @return \Generated\Shared\Transfer\HelloWorldMessageTransfer
     */
    public function getSalutationMessageAction()
    {
        return $this->getFacade()
                    ->getSalutationMessage();
    }
}
```

## 3. Implement the stub

Move to the client part to add support for calling the added controller action and follow these steps:

1. In `src/Pyz/Client/HelloWorld/Zed`, create a `HelloWorldStub` stub. This stub lets you submit an HTTP request to Zed.

<details>
<summary markdown='span'>Pyz\Client\HelloWorld\Zed</summary>

```php
<?php

namespace Pyz\Client\HelloWorld\Zed;

use Generated\Shared\Transfer\HelloWorldMessageTransfer;
use Spryker\Client\ZedRequest\ZedRequestClientInterface;

class HelloWorldStub implements HelloWorldStubInterface
{

    /**
     * @var \Spryker\Client\ZedRequest\ZedRequestClientInterface
     */
    protected $zedRequestClient;

    /**
     * @param \Spryker\Client\ZedRequest\ZedRequestClientInterface $zedRequestClient
     */
    public function __construct(ZedRequestClientInterface $zedRequestClient)
    {
        $this->zedRequestClient = $zedRequestClient;
    }

    /**
     * @return \Generated\Shared\Transfer\HelloWorldMessageTransfer
     */
    public function getSalutationMessage()
    {
        return $this->zedRequestClient->call(
            '/hello-world/gateway/get-salutation-message',
            new HelloWorldMessageTransfer()
        );
    }

}
```
</details>

{% info_block infoBox "Request parameter" %}

Through the second parameter, you can pass a transfer object as a request parameter to the request client call.

{% endinfo_block %}

2. Add a corresponding interface for the stub (`HelloWorldStubInterface`). The interface should contain the `getSalutationMessage()` method defined.

{% info_block infoBox %}

In the example, the stub depends on `ZedRequestClient` that can be provided by implementing `HelloWorldDependencyProvider`:

<details>
<summary markdown='span'>Pyz\Client\HelloWorld</summary>

```php
<?php

namespace Pyz\Client\HelloWorld;

use Spryker\Client\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
use Spryker\Client\Kernel\Container;

class HelloWorldDependencyProvider extends SprykerCustomerDependencyProvider
{

    const CLIENT_ZED_REQUEST = 'CLIENT_ZED_REQUEST';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container)
    {
        $container = $this->addZedRequestClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    protected function addZedRequestClient(Container $container)
    {
        $container[self::CLIENT_ZED_REQUEST] = function (Container $container) {
            return $container->getLocator()->zedRequest()->client();
        };

        return $container;
    }

}
```
</details>

{% endinfo_block %}

3. To get an instance of `HelloWorldStub`, create `HelloWorldFactory`:

```php
<?php

namespace Pyz\Client\HelloWorld;

use Pyz\Client\HelloWorld\Zed\HelloWorldStub;
use Spryker\Client\Kernel\AbstractFactory;

class HelloWorldFactory extends AbstractFactory
{

    /**
     * @return \Pyz\Client\HelloWorld\Zed\HelloWorldStubInterface
     */
    public function createZedStub()
    {
        return new HelloWorldStub($this->getZedRequestClient());
    }

    /**
     * @return \Spryker\Client\ZedRequest\ZedRequestClientInterface
     */
    protected function getZedRequestClient()
    {
        return $this->getProvidedDependency(HelloWorldDependencyProvider::CLIENT_ZED_REQUEST);
    }

}
```

## 4. Implement the client

Now you can create the client that consumes this service.

In `src/Pyz/Client/HelloWorld`, create the `HelloWorldClient` client together with its corresponding interface.

```php
<?php
namespace Pyz\Client\HelloWorld;

use Spryker\Client\Kernel\AbstractClient;

/**
 * @method \Pyz\Client\HelloWorld\HelloWorldFactory getFactory()
 */
class HelloWorldClient extends AbstractClient implements HelloWorldClientInterface
{
    /**
     *
     * @return \Generated\Shared\Transfer\HelloWorldMessageTransfer
     */
    public function getSalutationMessage()
    {
        return $this->getFactory()
                    ->createZedStub()
                    ->getSalutationMessage();
    }
}
```

## 5. Create a controller and a view in Yves

Now you can move to Yves and create the controller and the Twig template that renders a random message:

1. In `src/Pyz/Yves/HelloWorld/Controller`, create `IndexController`:

```php
<?php
namespace Pyz\Yves\HelloWorld\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;

/**
 * @method \Pyz\Client\HelloWorld\HelloWorldClientInterface getClient()
 */
class IndexController extends AbstractController
{
    /**
     * @return array
     */
    public function indexAction()
    {

        return [
            'salutationMessage' => $this->getClient()->getSalutationMessage()
        ];
    }

}
```

2. In `src/Pyz/Yves/HelloWorld/Theme/default/index`, create the `index.twig` file:

```php
{% raw %}{%{% endraw %} extends "@application/layout/layout.twig" {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %} salutationMessage.value {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

## 6. Set up the URL routing

1. In `src/Pyz/Yves/HelloWorld/Plugin/Route`, add `HelloWorldRouteProviderPlugin`:

```php
<?php
namespace Pyz\Yves\HelloWorld\Plugin\Router;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class HelloWorldRouteProviderPlugin extends AbstractRouteProviderPlugin
{
    protected const ROUTE_HELLO_WORD = 'hello-word';

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addNewProductsRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/hello', 'HelloWorld', 'index', 'indexAction');
        $routeCollection->add(static::ROUTE_HELLO_WORD, $route);

        return $routeCollection;
    }
}
```

2. Register your route provider plugin under `RouterDependencyProvider`:

```php
protected function getRouteProvider($isSsl)
	  {
		 return [
			//...
			 new HelloWorldRouteProviderPlugin(),
		 ];
	  }
```

3. Clear cache for routes:

```bash
vendor/bin/console router:cache:warm-up
```

That's it! `https://mysprykershop.com/hello` now displays a random salutation message.

## ZedRequest header

Since [ZedRequest 3.16.0](https://github.com/spryker/zed-request/releases/tag/3.16.0), you can alter the headers sent with each ZedRequest. You can either use the *default header plugins* or *create your own* by using the `\Spryker\Client\ZedRequestExtension\Dependency\Plugin\HeaderExpanderPluginInterface`.

### Default header plugins

You can use the following default header plugins:

- `\Spryker\Client\ZedRequest\Plugin\AcceptEncodingHeaderExpanderPlugin`, adds the `Accept-Encoding` header to the request.
- `\Spryker\Client\ZedRequest\Plugin\AuthTokenHeaderExpanderPlugin`, adds the `Auth-Token` header to the request.
- `\Spryker\Client\ZedRequest\Plugin\RequestIdHeaderExpanderPlugin`, adds the `X-Request-ID` header to the request.

These plugins can be added to `\Pyz\Client\ZedRequest\ZedRequestDependencyProvider::getHeaderExpanderPlugins()`.

### Create your own header plugin

You can create your own header expander plugin with the `\Spryker\Client\ZedRequestExtension\Dependency\Plugin\HeaderExpanderPluginInterface`.
For example, if you need a header with the name `Project-Name`, you just create a plugin like this:

```php
<?php

namespace Pyz\Client\ZedRequest\Plugin;

use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Client\ZedRequestExtension\Dependency\Plugin\HeaderExpanderPluginInterface;

class ProjectNameHeaderExpanderPlugin extends AbstractPlugin implements HeaderExpanderPluginInterface
{
    /**
     * @param array $headers
     *
     * @return array
     */
    public function expandHeader(array $headers): array
    {
        $headers['Project-Name'] = 'My project name';

        return $headers;
    }
}
```

After adding this plugin to `\Pyz\Client\ZedRequest\ZedRequestDependencyProvider::getHeaderExpanderPlugins()`, your new header is used with every `ZedRequest`.
