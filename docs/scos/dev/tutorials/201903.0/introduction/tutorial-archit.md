---
title: Tutorial - Architectural Walkthrough - Spryker Commerce OS
originalLink: https://documentation.spryker.com/v2/docs/tutorial-architecture-walkthrough-scos
redirect_from:
  - /v2/docs/tutorial-architecture-walkthrough-scos
  - /v2/docs/en/tutorial-architecture-walkthrough-scos
---

{% info_block infoBox %}
This tutorial is also available on the Spryker Training web-site. For more information and hands-on exercises, visit the [Spryker Training](https://training.spryker.com/courses/developer-bootcamp
{% endinfo_block %} web-site.)
The main idea of this task is to understand the Spryker architecture and how things work all together.

We will implement a very simple functionality in the back-end application to reverse a string. Then we will let the front-end application connect to the back-end one in order to use this functionality and show the result on a webpage in the shop.

## Challenge Description
* Build a **HelloSpryker** module in Zed that will render the "Hello Spryker!" string in reverse order "!rekyrpS olleH" on the screen.
* Build a **HelloSpryker** module in Yves that communicates with Zed using the Client to retrieve the same reversed string "!rekyrpS olleH"  and shows on a webpage in the shop.
* Add Zed persistence layer in **HelloSpryker** module to store and get the reversed string to and from the database.
* Move the functionality that returns the reversed string to a new module (*StringFormat*), then provide the string to the HelloSpryker module. 

{% info_block infoBox "Info" %}
This means building a dependency from the HelloSpryker module to the StringFormat one.
{% endinfo_block %}

## Challenge Solving Highlights

### 1. Build the HelloSpryker module in Zed to reverse the string
1. To add a new module in Zed, go to `/src/Pyz/Zed` and add a new folder called **HelloSpryker**.
    {% info_block infoBox %}
A new module is simply a new folder.
{% endinfo_block %}
2. The communication layer in a module is its entry point, so we will add it first and check if your module responds:
    1. Create a new folder under HelloSpryker called Communication.
    2. Create a folder called Controller inside the Communication folder.
    3. Create a new controller called IndexController. This controller has an action that returns only "HelloSpryker!" for now:
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
3. To render the text in the Zed UI template, add the presentation layer with the twig file that loads as the action's response.
    1. Add a new folder called **Presentation**.
    2. Inside it add a folder for the controller and the twig file for the action. So this would be: `Index/index.twig`.
    The twig file for your action looks like this:
    ```xml
    {% raw %}{%{% endraw %} extends '@Gui/Layout/layout.twig' {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
	    {% raw %}{{{% endraw %} string {% raw %}}}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    ```
4. To see **"Hello Spryker!"**, go to[http://zed.de.suite.local/hello-spryker](http://zed.de.suite.local/hello-spryker).

As reversing a string belongs to the business logic, you need to build a Business layer for your module.
1. Add a folder called **Business** inside the **HelloSpryker** module.
2. Business layer needs three main classes:
    * Facade to work as the main API
    * Factory to instantiate the needed objects and inject their dependencies
    * Model to perform the actual business logic

Following that, first build the facade class, and don't forget the facade interface:
```php
namespace Pyz\Zed\HelloSpryker\Business;
 
use Spryker\Zed\Kernel\Business\AbstractFacade;
 
class HelloSprykerFacade extends AbstractFacade implements HelloSprykerFacadeInterface
{
	// Your code goes here
}
```						

Second, add the factory:
```php
namespace Pyz\Zed\HelloSpryker\Business;
 
use Pyz\Zed\HelloSpryker\Business\Model\StringReverser;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;
 
class HelloSprykerBusinessFactory extends AbstractBusinessFactory
{
	// Your code goes here
}
```
And thirdly, add your model folder inside the business layer and add class to handle reversing the string. Call the method as `reverseString()`.
{% info_block infoBox "Info" %}
To reverse the string, you can simply use method `strrev(
{% endinfo_block %}`.)
It's time to hook things together.
1. Instantiate an object from your class in the factory and let a facade method use the new factory method in order to get the needed object. Then call the `reverseString()` method from the object.
    Your facade method should look like this:
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
2. Finally, let's call the facade method from the controller we built in the very begging.
    ``` php   
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
    To summarize, when accessing a URL in Zed UI the action responds to the requests, then it calls the facade which finally calls the model to perform the needed business logic.
3. Go to [http://zed.de.suite.local/hello-spryker](http://zed.de.suite.local/hello-spryker) to see **"!rekyrpS olleH"**

### 2. Build the HelloSpryker module in Yves

1. Add a new Yves module called **HelloSpryker** in `/src/Pyz/Yves`.
2. Add a new controller for the module.
    1. Add a new folder called Controller inside the **HelloSpryker module**.
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
    1. Add a new folder inside the **HelloSpryker** module called *Plugin*.
    2. Inside the *Plugin* folder, add a folder called *Provider*.
    3. Add your ControllerProvider class with the name `HelloSprykerControllerProvider`:
    ```php
    namespace Pyz\Yves\HelloSpryker\Plugin\Provider;
 
    use Silex\Application;
    use         SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider;
 
    class HelloSprykerControllerProvider extends    AbstractYvesControllerProvider
    {
	    const HELLO_SPRYKER_INDEX = 'hello-spryker-index';
 
	    /**
	    * @param \Silex\Application $app
	    *
	    * @return void
	    */
	    protected function defineControllers(Application $app)
	    {
		    $this->createGetController('/hello-spryker', static::HELLO_SPRYKER_INDEX, 'HelloSpryker', 'Index', 'index');
	    }
    }
    ```
4. Register the `ControllerProvider` in the application, so the application knows about your controller action. 
    Go to `YvesBootstrap::getControllerProviderStack` method in **ShopApplication** module and add `HelloSprykerControllerProvider` to the array.
5. Finally add the twig file to render your Hello Spryker page.
    Add the following folder structure inside the HelloSpryker module: `Theme/default/views/index`.
    This folder structure reflects your theme and controller names. Default is the theme name, and index is the controller name. For every action there is a template with the same name.
    As your action is called index, add a twig file for your action called `index.twig`:
    ```xml
    {% raw %}{%{% endraw %} extends template('page-layout-main') {% raw %}%}{% endraw %}
 
    {% raw %}{%{% endraw %} define data = {
	    reversedString: _view.reversedString
    } {% raw %}%}{% endraw %}
 
    {% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
	    <div><h2>{% raw %}{{{% endraw %} data.reversedString {% raw %}}}{% endraw %}</h2></div>
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    ```
    
### 3. Create HelloSpryker transfer object and use it
Transfer objects are a great way to send data from Yves to Zed, and for communication between different objects in general. Transfer object definitions are located in Shared directories as these objects are shared between Yves and Zed.
1. To add a **HelloSpryker** transfer, add a new folder inside `/src/Shared` and call it *HelloSpryker*. Then add another folder called *Transfer*.
2. Transfer objects utilize XML to define their schemas. Add an XML file inside Transfer directory and call it `hello_spryker.transfer.xm`l then add the following transfer schema:
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
3. Run the console command: console transfer:generate.
    The transfer object is generated and ready to use.
4. Update the Facade to use the transfer object instead of string as a parameter:
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
5. Update your model and `IndexController` accordingly. 
    {% info_block infoBox "Info" %}
You should still get **"!rekyrpS olleH"** when accessing [http://zed.de.suite.local/hello-spryker](http://zed.de.suite.local/hello-spryker
{% endinfo_block %}.)
    
### 4. Build a HelloSpryker Client to connect Yves to Zed
To build the communication between Yves and Zed, we need the **Client**. Building a client for **HelloSpryker** is similar to building a module in Zed or Yves.
1. Add a new folder under `/src/Pyz/Client` and call it *HelloSpryker*.
2. The Client structure consists also of three main classes: 
    * Client to function as the main API to the clilent
    * Factory  to instantiate the needed objects and inject their dependencies
    * Stub to do the actual call to Zed with the right payload.
    Create the client class inside the *HelloSpryker*client folder like this:
    ```php
    namespace Pyz\Client\HelloSpryker;
 
    use Spryker\Client\Kernel\AbstractClient;
 
    class HelloSprykerClient extends AbstractClient implements  HelloSprykerClientInterface
    {
	    // Your code goes here
    }		
    ```
    Now add the factory:
    ```php
    namespace Pyz\Client\HelloSpryker;
 
    use Pyz\Client\HelloSpryker\Zed\HelloSprykerStub;
    use Spryker\Client\Kernel\AbstractFactory;
 
    class HelloSprykerFactory extends AbstractFactory
    {
	    // Your code goes here
    }
	```					
    Then add the stub. As the client is calling Zed, create a folder called *Zed* and add the stub inside it:
    ```php
    namespace Pyz\Client\HelloSpryker\Zed;
 
    use Spryker\Client\ZedRequest\Stub\ZedRequestStub;
 
    class HelloSprykerStub extends ZedRequestStub implements    HelloSprykerStubInterface
    {
	    // Your code goes here
    }									
	```								
3. Add the class `HelloSprykerDependencyProvider` inside the `HelloSpryker` module in order to provide the `ZedRequest Client` to our `HelloSpryker Client`.
    {% info_block infoBox "Info" %}
Any client that calls Zed from Yves uses the **ZedRequest** module. This module is responsible, as the name suggest, for the request to Zed from Yves, and uses its own client to do so. The client name is **ZedRequest** Client.</br>Following the modular approach in Spryker, all other modules need to use the `ZedRequest Client` whenever a request is to be sent to Zed from Yves.</br>As **ZedRequest** is a separated module, a dependency is needed between the calling module, **HelloSpryker** in our case, and **ZedRequest** module.An architectural concept in Spryker called `DependencyProvider` is used to inject these dependencies between different modules.
{% endinfo_block %}
    ```php									
    namespace Pyz\Client\HelloSpryker;
 
    use Spryker\Client\Kernel\AbstractDependencyProvider;
    use Spryker\Client\Kernel\Container;
 
    class HelloSprykerDependencyProvider extends    AbstractDependencyProvider
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
		    $container[static::CLIENT_ZED_REQUEST] = function (Container    $container) {
			    return $container->getLocator()->zedRequest()->client();
		    };
 
		    return $container;
	    }
    }
	```								
    As the factory is responsible for dependency injection inside our module (the DependencyProvider on the other hand is responsible for the dependencies between modules and not inside one module), inject the ZedRequest Client into the stub using the factory:
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
	    return $this-   >getProvidedDependency(HelloSprykerDependencyProvider::CLIENT_ZED_R EQUEST);
    }								
    ```									
    Now, you have all the objects you need and the client is ready to call Zed.
4. Add a method to the stub to call Zed and pass the transfer object as a pay load like this:
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
This method will call the Zed module **HelloSpryker**.</br>The first parameter in the `call(
{% endinfo_block %}` method is the endpoint of the request which is divided into three main sections: `moduleName/controllerName/ActionName`. Here, we are calling the module **HelloSpryker**, the `GatewayController`, and the `ReverseStringAction`.</br>By convention, clients send requests to `GatewayControllers`. The second parameter is the payload of the request which is always a transfer object, any transfer object.)
5. Add a client method in the `HelloSprykerClient` to call the `reverseString()` method in the stub.
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
    That's it from the client side.

Let's get everything hooked together:
1. First, create the `GatewayController` in the communication layer of Zed, the one that responds to the client's request. 
    ```php
    namespace Pyz\Zed\HelloSpryker\Communication\Controller;
 
    use Generated\Shared\Transfer\HelloSprykerTransfer;
    use     Spryker\Zed\Kernel\Communication\Controller\AbstractGatewayController;
 
    class GatewayController extends AbstractGatewayController
    {
	    /**
	    * @param HelloSprykerTransfer $helloSprykerTransfer
	    *
	    * @return HelloSprykerTransfer
	    */
	    public function reverseStringAction(HelloSprykerTransfer    $helloSprykerTransfer)
	    {
		    return $this->getFacade()
			    ->reverseString($helloSprykerTransfer);
	    }
    }																	
    ```
2. Second, call the client from the IndexController in Yves to reverse the string.
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
 
	    return ['reversedString' => $helloSprykerTransfer->getReversedString()];
    }			
    ```
3. Finally, update the twig template in Yves to use `reversedString`.
Done! Now go to [http://www.de.suite.local/hello-spryker](http://www.de.suite.local/hello-spryker). You should see: **"!rekyrpS olleH"**.

### 5. Make HelloSpryker Module Read from Database
1. Working with the database means working with the persistence layer in Zed. Go back to Zed and add a new folder inside the **HelloSpryker** module and call it *Persistence*. Inside *Persistence*, add the directories *Propel*/*Schema*.
2. Propel uses XML, thus Spryker uses XML as well. Inside the Schema directory, add the database XML schema file and call it `pyz_hello_spryker.schema.xml`:
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
3. Run the console command: `console propel:install.` Now you have the HelloSpryker table in the database.
    {% info_block infoBox "Verification" %}
To make sure, open the database and check if the table is there.
{% endinfo_block %}
4. Let's write the reversed string into the database. Modify your model in the Business layer to do so after reversing the string:
    ```php
    /**
    * @param HelloSprykerTransfer $helloSprykerTransfer
    *
    * @return void
    */
    protected function saveReversedString(HelloSprykerTransfer $helloSprykerTransfer)
    {
	    $helloSprykerEntity = new PyzHelloSpryker();
 
	    $helloSprykerEntity->setReversedString($helloSprykerTransfer-   >getReversedString())->save();
    }	
    ```					
5. To read from the database, Spryker provides a concept called *QueryContainer*. It's the place where you create query objects to get data from the database. 
    Inside the **Persistence** directory, create the `HelloSprykerPersistenceFactory` and `HelloSprykerQueryContainer`:
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
 
    class HelloSprykerQueryContainer extends AbstractQueryContainer     implements HelloSprykerQueryContainerInterface
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
6. Now, let the *IndexController* in Zed read from the database. 
    To do so, add a facade method with a model to read and from the database in the business layer.
    Call the model *StringReader*. Then call the facade method from the *IndexController* in the communication layer.
    To read from the database, you need to inject the `HelloSprykerQueryContainer` inside the *StringReader* using the `HelloSprykerBusinessFactory` like this:
    ```php
    /**
    * @return StringReader
    */
    public function createStringReader()
    {
	    return new StringReader($this->getQueryContainer());
    }						
    ```

    And the readString()method looks like this:
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
Now go to [http://zed.de.suite.local/hello-spryker](http://zed.de.suite.local/hello-spryker) to see **"!rekyrpS olleH"**.

### 6. Bonus: HelloSpryker Module Dependency with StringReverser
The idea of this bonus task is to handle module dependency using the concept of Dependency Providers.
As mentioned before, Dependency Providers provide dependencies in a module level, from one module to another. Mainly they provide facades and clients only.
1. One module can't access other classes form another module. To use Dependency Providers, create a new module in Zed and call it *StringReverser*.
2. Move the logic of reversing a string from **HelloSpryker** to *StringReverser*. 
    {% info_block infoBox "Info" %}
You need to build a business later inside *StringReverser* with a facade and a model to revers the string.
{% endinfo_block %}
3. In the **HelloSpryker** module, create a dependency provider class and call it `HelloSprykerDependencyProvider`.
4. Provide the business layer dependency to the **HelloSpryker** module and internally use the *StringReverser* facade to provide the string reversing functionality. 
    The HelloSprykerDependencyProvider will look like this:
    ```php
    namespace Pyz\Zed\HelloSpryker;
 
    use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
    use Spryker\Zed\Kernel\Container;
 
    class HelloSprykerDependencyProvider extends    AbstractBundleDependencyProvider
    {
	    const FACADE_STRING_REVERSER = 'FACADE_STRING_REVERSER';
 
	    /**
	    * @param \Spryker\Zed\Kernel\Container $container
	    *
	    * @return \Spryker\Zed\Kernel\Container
	    */
	    public function provideBusinessLayerDependencies(Container  $container)
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
		    $container[static::FACADE_STRING_REVERSER] = function (Container    $container) {
			    return $container->getLocator()->stringReverser()->facade();
		    };
 
		    return $container;
	    }
    }									
    ```
								
5. Inject the dependency using the HelloSprykerBusinessFactory.
    ```php
    /**
    * @return StringReverserFacade
    */
    protected function getStringReverserFacade()
    {
	    return $this-   >getProvidedDependency(HelloSprykerDependencyProvider::FACADE_STRIN G_REVERSER);
    }						
    ```
					
6. Use the `StringReverserFacade` to reverse the string instead of using the logic directly inside the **HelloSpryker** module.

Go to [http://zed.de.suite.local/hello-spryker](http://zed.de.suite.local/hello-spryker) and [http://www.de.suite.local/hello-spryker](http://www.de.suite.local/hello-spryker). You should see: **"!rekyrpS olleH"**.
