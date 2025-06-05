---
title: "Tutorial: Architectural walkthrough"
description: The tutorial describes Spryker architecture and explains on the example of how its components work together to provide the result in the shop application.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/tutorial-architecture-walkthrough-scos
originalArticleId: 8a582525-be21-49b8-9b48-ca3420302cab
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-architectural-walkthrough-spryker-commerce-os.html
  - /tutorials/introduction/tutorial-architecture-walkthrough-scos.htm
related:
  - title: Conceptual overview
    link: docs/dg/dev/architecture/conceptual-overview.html
  - title: Programming concepts
    link: docs/dg/dev/architecture/programming-concepts.html
  - title: Modules and layers
    link: docs/dg/dev/architecture/modules-and-application-layers.html
---

{% info_block infoBox %}

This tutorial is also available on the Spryker Training website. For more information and hands-on exercises, visit the [Spryker Training](https://training.spryker.com/courses/developer-bootcamp) website.

{% endinfo_block %}

This tutorial explains the Spryker architecture and how things work altogether. It challenges you to implement a simple functionality in the backend application to reverse a string and then to let the frontend application connect to the backend application to use this functionality and show the result on a webpage in the shop.

## Challenge description

- Build a `HelloSpryker` module in Zed that renders the `Hello Spryker!` string in reverse order on the screen: `!rekyrpS olleH`.
- Build the `HelloSpryker` module in Yves that communicates with Zed using the client to retrieve the same reversed string `!rekyrpS olleH` and shows the string on a webpage in the shop.
- Add Zed persistence layer in the `HelloSpryker` module to store and get the reversed string to and from the database.
- Move the functionality that returns the reversed string to a new module (`StringFormat`), then provide the string to the `HelloSpryker` module.

{% info_block infoBox "" %}

This means building a dependency from the `HelloSpryker` module to the `StringFormat` module.

{% endinfo_block %}

## 1. Build a `HelloSpryker` module in Zed to reverse the string

1. To add a new module in Zed, go to `/src/Pyz/Zed` and add a new folder called `HelloSpryker`.

{% info_block infoBox %}

A new module is a new folder.

{% endinfo_block %}

2. A `Communication` layer in the module is its entry point. Add it and check if your module responds:
    1. Under `HelloSpryker`, create a new folder called `Communication`.
    2. Inside the `Communication` folder, create a folder called `Controller`.
    3. Create a new controller called `IndexController`. This controller has an action that returns only `HelloSpryker!`:

    ```php
    namespace Pyz\Zed\HelloSpryker\Communication\Controller;

    use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Request;

    class IndexController extends AbstractController
    {
        /**
        * @param Request $request
        *
        * @return array
        */
        public function indexAction(Request $request)
        {
        return ['string' => 'Hello Spryker!'];
        }
    }						
    ```

3. To render text in the Zed UI template, add a `Presentation` layer with a twig file, which loads as the action's response.
    1. Add a new folder called `Presentation`.
    2. Inside the folder, add a folder for the controller and a twig file for the action: `Index/index.twig`.
    The twig file for your action looks like this:

    ```xml
    {% raw %}{%{% endraw %} extends '@Gui/Layout/layout.twig' {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
        {% raw %}{{{% endraw %} string {% raw %}}}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    ```

4. To see `Hello Spryker!`, go to `https://zed.mysprykershop.com/hello-spryker`.

Because reversing a string belongs to the business logic, you need to build a `Business` layer for your module:

1. Inside the `HelloSpryker` module, add a folder called `Business`.
   The `Business` layer needs three main classes:
    - `Facade` to work as the main API.
    - `Factory` to instantiate the needed objects and inject their dependencies.
    - `Model` to perform the actual business logic.

2. Build the facade class, and don't forget the facade interface:

```php
namespace Pyz\Zed\HelloSpryker\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

class HelloSprykerFacade extends AbstractFacade implements HelloSprykerFacadeInterface
{
	// Your code goes here
}
```

3. Add the factory:

```php
namespace Pyz\Zed\HelloSpryker\Business;

use Pyz\Zed\HelloSpryker\Business\Model\StringReverser;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

class HelloSprykerBusinessFactory extends AbstractBusinessFactory
{
	// Your code goes here
}
```

4. Inside the `Business` layer, add your model folder and add a class to handle reversing the string.
5. Call the method as `reverseString()`.

{% info_block infoBox "Info" %}

To reverse the string, you can use the `strrev()` method.

{% endinfo_block %}

To hook things together, follow these steps:

1. Instantiate an object from your class in the factory and let a facade method use the new factory method to get the needed object.
2. From the object, call the `reverseString()` method.

Your facade method looks like the following example:

```php
/**
* @return StringReverser
*/
public function createStringReverser()
{
    return new StringReverser();
}												
```

```php
/**
* @param string $originalString
*
* @return string
*/
public function reverseString($originalString)
{
   return $this->getFactory()
       ->createStringReverser()
       ->reverseString($originalString);
}									
```

3. Call the facade method from the controller you have built in the beginning.

```php
/**
* @param Request $request
*
* @return array
*/
public function indexAction(Request $request)
{
    $originalString = "Hello Spryker!";
    $reversedString = $this->getFacade()->reverseString($originalString);

    return ['string' => $reversedString];
}		
```

When accessing a URL in Zed UI, the action responds to the requests, and then it calls the facade, which finally calls the model to perform the needed business logic.

4. To see `!rekyrpS olleH`, go to `https://zed.mysprykershop.com/hello-spryker`.

### 2. Build the `HelloSpryker` module in Yves

1. Add a new Yves module called **HelloSpryker** in `/src/Pyz/Yves`.
2. Add a new controller for the module:
    1. Add a new folder called Controller inside the `HelloSpryker` module.
    2. Add the following controller class called `IndexController`:

    ```php
    namespace Pyz\Yves\HelloSpryker\Controller;

    use Generated\Shared\Transfer\HelloSprykerTransfer;
    use Spryker\Yves\Kernel\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Request;

	    /**
	    * @method \Pyz\Client\HelloSpryker\HelloSprykerClientInterface getClient()
	    */
	    class IndexController extends AbstractController
	    {
	    /**
	    * @param Request $request
	    *
	    * @return \Spryker\Yves\Kernel\View\View
	    */
	    public function indexAction(Request $request)
	    {
		    $data = ['reversedString' => 'Hello Spryker!'];

		    return $this->view(
			    $data,
			    [],
			    '@HelloSpryker/views/index/index.twig'
		    );
	    }
    }
    ```

3. Add the route to the controller:
    1. Add a new folder inside the `HelloSpryker` module called `Plugin`.
    2. Inside the `Plugin` folder, add a folder called `Router`.
    3. Add your `RouteProviderPlugin` class with the name `HelloSprykerRouteProviderPlugin`:

    ```php
    namespace Pyz\Yves\HelloSpryker\Plugin\Router;

    use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
    use Spryker\Yves\Router\Route\RouteCollection;

    class HelloSprykerRouteProviderPlugin extends AbstractRouteProviderPlugin
    {
	    public const ROUTE_NAME_HELLO_SPRYKER_INDEX = 'hello-spryker-index';

	    /**
             * Specification:
             * - Adds Routes to the RouteCollection.
             *
             * @api
             *
             * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
             *
             * @return \Spryker\Yves\Router\Route\RouteCollection
             */
            public function addRoutes(RouteCollection $routeCollection): RouteCollection
	    {
	        $route = $this->buildRoute('/hello-spryker', 'HelloSpryker', 'Index', 'index');
	        $routeCollection->add(static::ROUTE_NAME_HELLO_SPRYKER_INDEX, $route);

        	return $routeCollection;
	    }
    }
    ```

4. In the application, register `HelloSprykerRouteProviderPlugin`, so the application knows about your controller action.
5. In the `Router` module, go to the `RouterDependencyProvider::getRouteProvider()` method and add `HelloSprykerRouteProviderPlugin` to the array.
6. To render your **Hello Spryker** page, add the twig file.
7. Inside the `HelloSpryker` module, add the following folder structure: `Theme/default/views/index`.
    This folder structure reflects your theme and controller names. `default` is the theme name, and `index` is the controller name.
    For every action, there is a template with the same name.
8. Because your action is called `index`, add a twig file for your action called `index.twig`:

    ```xml
    {% raw %}{%{% endraw %} extends template('page-layout-main') {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} define data = {
	    reversedString: _view.reversedString
    } {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
	    <div><h2>{% raw %}{{{% endraw %} data.reversedString {% raw %}}}{% endraw %}</h2></div>
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    ```

### 3. Create a `HelloSpryker` transfer object and use it

Transfer objects are a great way to send data from Yves to Zed and to communicate between different objects in general. Transfer object definitions are located in the `Shared` directories because these objects are shared between Yves and Zed.

To add a `HelloSpryker` transfer, follow these steps:
1. Add a new folder inside `/src/Pyz/Shared` and call it `HelloSpryker`.
2. Add another folder called `Transfer`.
3. To define their transfer objects' schemas, XML is used. Therefore, inside the `Transfer` directory, add an XML file and call it `hello_spryker.transfer.xml`.
4. Add the following transfer schema:

```	xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="HelloSpryker">
	    <property name="originalString" type="string" />
	    <property name="reversedString" type="string" />
	    </transfer>
</transfers>
```

5. Run the following command:

```bash
console transfer:generate
```

6. After generating the transfer object, update the facade to use the transfer object instead of a string as a parameter:

```php
/**
* @param HelloSprykerTransfer $helloSprykerTransfer
*
* @return HelloSprykerTransfer
*/
public function reverseString(HelloSprykerTransfer $helloSprykerTransfer)
{
    return $this->getFactory()
	    ->createStringReverser()
	    ->reverseString($helloSprykerTransfer);
}
```

7. Update your model and `IndexController` accordingly.

{% info_block infoBox "Info" %}

When accessing `https://zed.mysprykershop.com/hello-spryker`, you must get `!rekyrpS olleH`.

{% endinfo_block %}

### 4. Build a `HelloSpryker` client to connect Yves to Zed

To connect Yves to Zed, you need a *client*. Building a client for `HelloSpryker` is similar to building a module in Zed or Yves.

To build a client, follow these steps:
1. Under `/src/Pyz/Client`, add a new folder and call it `HelloSpryker`.
   <br>The Client structure consists of three main classes:
    - `Client` to function as the main API to the client.
    - `Factory` to instantiate the needed objects and inject their dependencies.
    - `Stub` to do the actual call to Zed with the right payload.

2. Create the client class inside the `HelloSpryker` client folder:

    ```php
    namespace Pyz\Client\HelloSpryker;

    use Spryker\Client\Kernel\AbstractClient;

    class HelloSprykerClient extends AbstractClient implements HelloSprykerClientInterface
    {
	    // Your code goes here
    }		
    ```

3. Add the factory:

    ```php
    namespace Pyz\Client\HelloSpryker;

    use Pyz\Client\HelloSpryker\Zed\HelloSprykerStub;
    use Spryker\Client\Kernel\AbstractFactory;

    class HelloSprykerFactory extends AbstractFactory
    {
	    // Your code goes here
    }
	```

4. Add the stub. As the client is calling Zed, create a folder called `Zed` and add the stub inside it:

    ```php
    namespace Pyz\Client\HelloSpryker\Zed;

    use Spryker\Client\ZedRequest\Stub\ZedRequestStub;

    class HelloSprykerStub extends ZedRequestStub implements HelloSprykerStubInterface
    {
	    // Your code goes here
    }									
    ```

5. To provide the `ZedRequest Client` to your `HelloSpryker Client`, inside the `HelloSpryker` module, add the `HelloSprykerDependencyProvider` class.

{% info_block infoBox "Info" %}

Any client that calls Zed from Yves uses the `ZedRequest` module. This module is responsible for the request from Yves to Zed and uses its own client to do so. The client name is `ZedRequest`.
Following the modular approach in Spryker, all other modules need to use the `ZedRequest Client` whenever a request is sent to Zed from Yves.
As `ZedRequest` is a separated module, a dependency is needed between the calling module, `HelloSpryker` in this case, and the `ZedRequest` module. An architectural concept in Spryker called `DependencyProvider` is used to inject these dependencies between different modules.

```php
namespace Pyz\Client\HelloSpryker;

use Spryker\Client\Kernel\AbstractDependencyProvider;
use Spryker\Client\Kernel\Container;

class HelloSprykerDependencyProvider extends AbstractDependencyProvider
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
	    $container->set(static::CLIENT_ZED_REQUEST, function (Container $container) {
		    return $container->getLocator()->zedRequest()->client();
	    });

	    return $container;
    }
}
```

{% endinfo_block %}

Because the factory is responsible for dependency injection inside your module (the `DependencyProvider` is responsible for the dependencies between modules and not inside one module), inject the `ZedRequest` Client into the stub using the factory:

```php
/**
* @return \Pyz\Client\HelloSpryker\Zed\HelloSprykerStubInterface
*/
public function createZedHelloSprykerStub()
{
    return new HelloSprykerStub($this->getZedRequestClient());
}

/**
* @return \Spryker\Client\ZedRequest\ZedRequestClientInterface
*/
protected function getZedRequestClient()
{
    return $this->getProvidedDependency(HelloSprykerDependencyProvider::CLIENT_ZED_REQUEST);
}								
```

Now, you have all the objects you need and the client is ready to call Zed.

6. Add a method to the stub to call Zed and pass the transfer object as a pay load like this:

```php
/**
* @param HelloSprykerTransfer $helloSprykerTransfer
*
* @return HelloSprykerTransfer|\Spryker\Shared\Kernel\Transfer\TransferInterface
*/
public function reverseString(HelloSprykerTransfer $helloSprykerTransfer)
{
    return $this->zedStub->call(
	    '/hello-spryker/gateway/reverse-string',
	    $helloSprykerTransfer
    );
}
```

{% info_block infoBox "Info" %}

This method calls the Zed module `HelloSpryker`.

The first parameter in the `call()` method is the endpoint of the request, which is divided into three main sections: `moduleName/controllerName/ActionName`. Here, you call `HelloSpryker`, `GatewayController`, and `ReverseStringAction`.

By convention, clients send requests to `GatewayControllers`. The second parameter is the payload of the request, which is always a transfer object, any transfer object.

{% endinfo_block %}

6. In `HelloSprykerClient`, add a client method  to call the `reverseString()` method in the stub.

```php
/**
* @param HelloSprykerTransfer $helloSprykerTransfer
*
* @return HelloSprykerTransfer|\Spryker\Shared\Kernel\Transfer\TransferInterface
*/
public function reverseString(HelloSprykerTransfer $helloSprykerTransfer)
{
    return $this->getFactory()
	    ->createZedHelloSprykerStub()
	    ->reverseString($helloSprykerTransfer);
}																													
```

Get everything hooked together:

1. In the communication layer of Zed, create `GatewayController`, the one that responds to the client's request.

```php
namespace Pyz\Zed\HelloSpryker\Communication\Controller;

use Generated\Shared\Transfer\HelloSprykerTransfer;
use Spryker\Zed\Kernel\Communication\Controller\AbstractGatewayController;

class GatewayController extends AbstractGatewayController
{
    /**
    * @param HelloSprykerTransfer $helloSprykerTransfer
    *
    * @return HelloSprykerTransfer
    */
    public function reverseStringAction(HelloSprykerTransfer $helloSprykerTransfer)
    {
	    return $this->getFacade()
		    ->reverseString($helloSprykerTransfer);
    }
}																															
```

2. To reverse the string, In Yves, from `IndexController`, call the client.

```php
/**
* @param \Symfony\Component\HttpFoundation\Request $request
*
* @return array|\Symfony\Component\HttpFoundation\RedirectResponse
*/
public function indexAction(Request $request)
{
    $helloSprykerTransfer = new HelloSprykerTransfer();
    $helloSprykerTransfer->setOriginalString('Hello Spryker!');

    $helloSprykerTransfer = $this->getClient()
	    ->reverseString($helloSprykerTransfer);

    $data = ['reversedString' => $helloSprykerTransfer->getReversedString()];

    return $this->view(
        $data,
        [],
        '@HelloSpryker/views/index/index.twig'
    );
}			
```

3. In Yves, update the twig template to use `reversedString`.

4. Go to `https://mysprykershop.com/hello-spryker1`. The `!rekyrpS olleH` string is displayed.

### 5. Make the `HelloSpryker` module read from the database

Working with the database means working with the persistence layer in Zed.

1. Go back to Zed, and inside `HelloSpryker`, add a new folder called `Persistence`.
2. Inside `Persistence`, add the directories `Propel/Schema`.
3. Propel uses XML, thus Spryker uses XML as well. Inside the Schema directory, add the database XML schema file and call it `pyz_hello_spryker.schema.xml`:

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
name="zed"  xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-    01.xsd"
    namespace="Orm\Zed\HelloSpryker\Persistence"
    namespaceAutoPackage="false"
    package="src.Orm.Zed.HelloSpryker.Persistence">

	    <table name="pyz_hello_spryker" idMethod="native">
		    <column name="id_hello_spryker" required="true" type="INTEGER" autoIncrement="true" primaryKey="true"/>
		    <column name="reversed_string" required="true" size="128" type="VARCHAR"/>

		    <id-method-parameter value="pyz_hello_spryker_pk_seq"/>
	    </table>
</database>
```

4. Apply database changes and generate entity and transfer changes:

```bash
console propel:install
```

5. The `HelloSpryker` table is in the database.

{% info_block infoBox "Verification" %}

Open the database and check if the `HelloSpryker` table is there.

{% endinfo_block %}

6. Write the reversed string into the database.
7. In the `Business` layer, modify your model to do so after reversing the string:

```php
/**
* @param HelloSprykerTransfer $helloSprykerTransfer
*
* @return void
*/
protected function saveReversedString(HelloSprykerTransfer $helloSprykerTransfer)
{
    $helloSprykerEntity = new PyzHelloSpryker();

    $helloSprykerEntity->setReversedString($helloSprykerTransfer->getReversedString())->save();
}
```

8. To read from the database, Spryker provides a concept called `QueryContainer`. It's the place where you create query objects to get data from the database. Inside the `Persistence` directory, create `HelloSprykerPersistenceFactory` and `HelloSprykerQueryContainer`:

```php
namespace Pyz\Zed\HelloSpryker\Persistence;

use Orm\Zed\HelloSpryker\Persistence\PyzHelloSprykerQuery;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

class HelloSprykerPersistenceFactory extends AbstractPersistenceFactory
{
    /**
    * @return PyzHelloSprykerQuery
    */
    public function createHelloSprykerQuery()
    {
	    return PyzHelloSprykerQuery::create();
    }
}																	
```

```php
namespace Pyz\Zed\HelloSpryker\Persistence;

use Spryker\Zed\Kernel\Persistence\AbstractQueryContainer;

class HelloSprykerQueryContainer extends AbstractQueryContainer implements HelloSprykerQueryContainerInterface
{
    /**
    * @param $idHelloSpryker
    *
    * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
    *
    * @return \Orm\Zed\HelloSpryker\Persistence\PyzHelloSprykerQuery
    */
    public function queryHelloSprykerById($idHelloSpryker)
    {
	    return $this->getFactory()
		    ->createHelloSprykerQuery()
		    ->filterByIdHelloSpryker($idHelloSpryker);
    }

    /**
    * @api
    *
    * @return \Orm\Zed\HelloSpryker\Persistence\PyzHelloSprykerQuery
    */
    public function queryHelloSpryker()
    {
	    return $this->getFactory()
		    ->createHelloSprykerQuery();
    }
}																																
```

9. Let `IndexController` in Zed read from the database:

    1. Add a facade method with a model to read and from the database in the `Business` layer.
    2. Call the model `StringReader`.
    3. From `IndexController` in the communication layer, call the facade method.
    4. To read from the database, inside `StringReader`, inject `HelloSprykerQueryContainer` using `HelloSprykerBusinessFactory`:

    ```php
    /**
    * @return StringReader
    */
    public function createStringReader()
    {
	    return new StringReader($this->getQueryContainer());
    }						
    ```

    5. Inject `readString()method` as follows:

    ```php
    /**
    * @param int $id
    *
    * @return HelloSprykerTransfer
    */
    public function readString($id)
    {
	    $helloSprykerEntity = $this->helloSprykerQueryContainer
		    ->queryHelloSprykerById($id)
		    ->findOne();

	    $helloSprykerTransfer = new HelloSprykerTransfer();
	    $helloSprykerTransfer->fromArray($helloSprykerEntity->toArray(), true);

	    return $helloSprykerTransfer;
    }							
    ```

10. To see `!rekyrpS olleH`, go to `https://zed.mysprykershop.com/hello-spryker`.

### 6. Extra task: `HelloSpryker` module dependency with `StringReverser`

The idea of this extra task is to handle module dependency using the concept of dependency providers.
As mentioned before, dependency providers provide dependencies at a module level, from one module to another. Mainly, they provide facades and clients only.

1. One module can't access other classes from another module. To use dependency providers, create a new module called `StringReverser`.
2. Move the logic of the reversing string from `HelloSpryker` to `StringReverser`.

{% info_block infoBox "Info" %}

Build a business layer inside `StringReverser` with a facade and a model to reverse the string.

{% endinfo_block %}

3. In the `HelloSpryker` module, create a dependency provider class called `HelloSprykerDependencyProvider`.
4. Provide the business layer dependency to `HelloSpryker` and internally use the `StringReverser` facade to provide the string reversing functionality. `HelloSprykerDependencyProvider` looks like this:

```php
namespace Pyz\Zed\HelloSpryker;

use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;

class HelloSprykerDependencyProvider extends AbstractBundleDependencyProvider
{
    const FACADE_STRING_REVERSER = 'FACADE_STRING_REVERSER';

    /**
    * @param \Spryker\Zed\Kernel\Container $container
    *
    * @return \Spryker\Zed\Kernel\Container
    */
    public function provideBusinessLayerDependencies(Container $container)
    {
	    $container = $this->addStringReverserFacade($container);

	    return $container;
    }

    /**
    * @param \Spryker\Zed\Kernel\Container $container
    *
    * @return \Spryker\Zed\Kernel\Container
    */
    protected function addStringReverserFacade(Container $container)
    {
	    $container[static::FACADE_STRING_REVERSER] = function (Container $container) {
		    return $container->getLocator()->stringReverser()->facade();
	    };

	    return $container;
    }
}																	
```

5. Inject the dependency using `HelloSprykerBusinessFactory`.

```php
/**
* @return StringReverserFacade
*/
protected function getStringReverserFacade()
{
    return $this->getProvidedDependency(HelloSprykerDependencyProvider::FACADE_STRING_REVERSER);
}						
```

6. To reverse the string, use `StringReverserFacade` instead of using the logic directly inside the `HelloSpryker` module.
7. To see `!rekyrpS olleH`, go to `https://zed.mysprykershop.com/hello-spryker` and `https://mysprykershop.com/hello-spryker`.
