---
title: Tutorial - Architectural Walkthrough - Legacy Demoshop
originalLink: https://documentation.spryker.com/v1/docs/architectural-walkthrough-legacy-demoshop
redirect_from:
  - /v1/docs/architectural-walkthrough-legacy-demoshop
  - /v1/docs/en/architectural-walkthrough-legacy-demoshop
---

<!-- TODO: Optimize the internal links in this page
used to be: http://spryker.github.io/onboarding/hello-spryker/
-->

This is an architecture walkthrough as a coding exercise.

## Challenge Description

1. Build a **HelloSpryker** module in Zed that will render the `Hello Spryker!` string, in reverse order, on the screen. The string must be retrieved from the config.
2. Build a **HelloSpryker** module in Yves that will render the `Hello Spryker!` string, in reverse order, on the screen. Yves must communicate with Zed in order to retrieve the string.
3. Add Zed persistence layer to a **HelloSpryker** module.
4. Move the functionality that returns a string in reverse order to a new module (StringFormat). Use this functionality from the **HelloSpryker** module.

## Challenge Solving Highlights
### 1. Building the HelloSpryker Module in Zed

* Add the module folder in Zed.
* Add the config class with a method `getString` holding the default string `'Hello Spryker!'`.
* Add the logic for returning the string reversed under the business layer in the `/Model` sub-folder.
* Create a business factory under the business layer to create this class.
* Create a `HelloSprykerFacade` under the business layer and call the business class here.
* Create a controller with an `indexAction()` method that will use the facade.
* Create the Twig template `index.twig` under the presentation layer inside a `HelloSpryker` subfolder.
* Display the string on the screen, navigate to the URL `/hello-spryker/hello-spryker` for this.
* Add the controller in your navigation on the left by providing a `navigation.xml` file in the Communication folder (see references at the bottom).
* Run `vendor/bin/console application:build-navigation-cache` to generate a new navigation tree.

#### Implementation Tips
Make sure that you facade only delegates and the factory itself creates the HelloSpryker business class including the necessary constructor arguments:

```php
<?php
return new HelloSpryker($this->getConfig());
```

The facade method should then just call

```php
<?php
return $this->getFactory()->createHelloSpryker()->getReversedString();
```

Make the Config class configurable in a way that you can provide any string via `config_default.php`. You would use a `HelloSprykerConstants` class and inside the `getString()` method you would use `$this->get(HelloSprykerConstants::STRING, 'Hello Spryker!')`. The second argument is the default string in case no config has yet been provided. Constants classes are put into the `Pyz\Shared\` namespace.

To test if you can use any string via config now, add this to `config_default.php`, for example:

```php
<?php
$config[HelloSprykerConstants::STRING] = 'Foo Bar';
```

Your `index.twig` template ideally extends from the Gui layout to have the complete layout included:

```php
{% raw %}{%{% endraw %} extends '@Gui/Layout/layout.twig' {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
<div class="row">
    <div class="col-sm-12">
        {% raw %}{{{% endraw %} reversedString {% raw %}}}{% endraw %}
    </div>
</div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

### 2. Building a HelloSpryker Module in Yves
Add Yves layer:

* Add the module folder in Yves.
* Add controller + action.
* Create the Twig template under the presentation layer (`/HelloSpryker/Theme/default/hello-spryker/index.twig`).
* Add a route to the controller provider (for URL `/hello-spryker`).
* Register the controller provider in YvesBootstrap.

Communicate with Zed:

* Create a `hello_spryker.transfer.xml` file in the `Shared/HelloSpryker/Transfer` building a `HelloSprykerTransfer` object which contains a `reversedString` property.
* Run `vendor/bin/console transfer:generate` to generate the class.
* Create a client directory for Zed (`/Pyz/Client/HelloSpryker/Zed`).
* Add a client and a stub (see references at the bottom).
* Add `HelloSprykerDependencyProvider` for the Client layer.
* Add a gateway call in `client/stub` with an empty transfer object.
* Add `GatewayController` with a `getReversedStringAction()` method in Zed which calls the facade and returns the filled transfer object.

#### Implementation Tips
The Yves route you need to set up can look like this:

```php
<?php
$this->createController('/hello-spryker', 'hello-spryker', 'HelloSpryker', 'HelloSpryker', 'index');
```

The `HelloSprykerStub` class must have a constructor argument and property for `zedStub` which will be passed in from the Client layer factory. The gateway call could look like this:

```php
<?php
$helloSprykerTransfer = new HelloSprykerTransfer();

return $this->zedStub->call(
    '/hello-spryker/gateway/get-reversed-string',
    $helloSprykerTransfer
);
```

The dependency provider needs to provide the client to the factory:

```php
<?php
$container['HelloSpryker client'] = function (Container $container) {
    return $container->getLocator()->helloSpryker()->client();
};
```

`GatewayController` just populates the passed in transfer object and returns this again:

```php
<?php
public function getReversedStringAction(HelloSprykerTransfer $helloSprykerTransfer)
{
	$reversedString = $this->getFacade()->getReversedString();
	$helloSprykerTransfer->setReversedString($reversedString);

	return $helloSprykerTransfer;
}
```

The Twig template here should extend the main layout:

```php
{% raw %}{%{% endraw %} extends "@application/layout/layout.twig" {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block title {% raw %}%}{% endraw %}
    <h3>{% raw %}{{{% endraw %} helloSpryker.reversedString {% raw %}}}{% endraw %}</h3>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

### 3. Make HelloSpryker Module Read from Database

* In Zed, add a persistence layer and a schema XML file with a very basic table holding the string.
* Run `vendor/bin/console propel:install` to generate the table and classes.
* Also, pass the new `QueryContainer` into the HelloSpryker class as a second constructor dependency.
* You can populate the database from the config, e.g. in the constructor of the HelloSpryker class.
* Read inside the Zed business logic from the QueryContainer now instead of config.

#### Implementation Tips
The snippet to store our test string could look like this:

```php
<?php
protected function initDatabaseFromConfig(HelloSprykerConfig $helloSprykerConfig)
{
    $helloSprykerEntity = $this->helloSprykerQueryContainer->queryHelloSpryker()->findOne();
    if (!$helloSprykerEntity) {
        $helloSprykerEntity = new PyzHelloSpryker();
        $helloSprykerEntity->setString($helloSprykerConfig->getString());
    } else {
        $helloSprykerEntity->setString($helloSprykerConfig->getString());
    }
    $helloSprykerEntity->save();
}
```

It will always update the database according to your config.

The `/Pyz/Zed/HelloSpryker/Persistence/Propel/Schema/pyz_hello_spryker.schema.xml` could look like this:

```php
<xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
    namespace="Orm\Zed\HelloSpryker\Persistence"
    namespaceAutoPackage="false"
    package="src.Orm.Zed.HelloSpryker.Persistence">

    <table name="pyz_hello_spryker" idMethod="native">
        <column name="id_hello_spryker" required="true" type="INTEGER" autoIncrement="true" primaryKey="true"/>
        <column name="string" required="true" size="128" type="VARCHAR"/>

        <unique name="pyz_hello_spryker-string">
            <unique-column name="string"/>
       </unique>
        <id-method-parameter value="pyz_hello_spryker_pk_seq"/>
    </table>

</database>
```

### 4. StringFormat Module

* Create the `StringFormat` module in Zed.
* In the `HelloSpryker` module, create a dependency provider class and call it `HelloSprykerDependencyProvider`.
* Extract the functionality that formats the string and move it to the new module.
* Create a `StringFormatFacade` class.
* Provide the business layer dependency to the `HelloSpryker` module and internally use this other facade now.

#### Implementation Tips

* The HelloSpryker class will now have a third constructor argument, the provided facade.

* You can use the transfer object to pass the string between modules.

* Try to add interfaces for your classes so that the constructor typehints are abstract instead of concrete.

## More Tips
Run `vendor/bin/console dev:ide:generate-auto-completion` to get IDE typehinting for the new module for both Yves and Zed.

Add `@method` annotations to your classes to get complete IDE type-hinting and clickability:

<details open>
<summary>Code sample</summary>
    
```
<?php
/**
 * @method \Pyz\Zed\HelloSpryker\Business\HelloSprykerFacade getFacade()
 */
class HelloSprykerController extends AbstractController
{
}

/**
 * @method \Pyz\Zed\HelloSpryker\Business\HelloSprykerBusinessFactory getFactory()
 */
class HelloSprykerFacade extends AbstractFacade
{
}

/**
 * @method \Pyz\Zed\HelloSpryker\HelloSprykerConfig getConfig()
 * @method \Pyz\Zed\HelloSpryker\Persistence\HelloSprykerQueryContainer getQueryContainer()
 */
class HelloSprykerBusinessFactory extends AbstractBusinessFactory
{
}

/**
 * @method \Pyz\Client\HelloSpryker\HelloSprykerFactory getFactory()
 */
class HelloSprykerClient extends AbstractClient
{
}
```
 
<br>

</details>

This is useful for all OS internal “locatable” classes.
