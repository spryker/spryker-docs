---
title: "Tutorial: Using Zed API"
description: Learn how to use the ZED API, creating simple client librarys or extracting controller endpoints to use within your Spryker Projects.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-zed-rest-api
originalArticleId: 26d10b63-ffce-4945-9aa0-cd15ecddb4d7
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-zed-rest-api.html
related:
  - title: Facade
    link: docs/dg/dev/backend-development/zed/business-layer/facade/facade.html
  - title: Create, use, and extend the transfer objects
    link: docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/create-use-and-extend-the-transfer-objects.html
  - title: Add a new module
    link: docs/scos/dev/back-end-development/extend-spryker/create-modules.html
  - title: Controllers and Actions
    link: docs/dg/dev/backend-development/yves/controllers-and-actions.html

---

Spryker shops expose module business logic through a simple API in Zed. The API is self-documented and can be easily explored for each module.

This tutorial describes how to the following:

* Create a simple client library to authorize and talk to Zed through API.
* Extract the controller endpoint from Zed authorization or provide another authorization mechanism.

## Preparation

As a basis for solution, we use an idea of exposing facade methods through HTTP. Each module provides a stateless public interface, which operates either by using scalar types or transfer objects. We can dynamically examine this API using PHP Reflection and expose it through a Zed controller. This requires to be authorized in Zed, which is fine for a demo challenge, as a bonus challenge one might implement a separate authentication for the API endpoint.

Transfer objects can be deserialized from JSON; this simplifies a transport layer.

{% info_block errorBox %}

Reflection is used here for educational purposes, blindly exposing internal code structure in production might lead to security-related consequences.

{% endinfo_block %}

We recommend recapping the following topics before starting the challenge:

* [PHP Reflection](http://php.net/manual/en/book.reflection.php)
* [Facades](/docs/dg/dev/backend-development/zed/business-layer/facade/facade.html)
* [Transfer objects](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/create-use-and-extend-the-transfer-objects.html)
* ["Tutorial: Add a new module](/docs/dg/dev/backend-development/extend-spryker/create-modules.html)
* [Controllers in Zed](/docs/dg/dev/backend-development/zed/communication-layer/communication-layer.html)

{% info_block infoBox %}

The following code snippets are stripped of doc strings and comments to minimize footprint. We recommend always correctly specifying method signatures to take advantage of IDE autocompletion.

{% endinfo_block %}

## 1. Create a Zed module with controller

Create a new module Api in the `Pyz/Zed` scope.

It is a good practice to version an API, so create a controller `V1Controller` in this module. At this point, the module contains one file – the controller, and looks as follows:

```php
Pyz/Zed
|__ Api
    |__ Communication
        |__ Controller
            |__ V1Controller.php
```

Actions can be empty and just returning some random string.

```php
<?php
namespace Pyz\Zed\Api\Communication\Controller;

use Symfony\Component\HttpFoundation\Request;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;

class V1Controller extends AbstractController
{
    // This action will be used to show documentation of a facade.
    public function docAction(Request $request)
    {
        return 'docAction';
    }
    // This action will be used to show documentation of a transfer object.
    public function docTransferAction(Request $request)
    {
        return 'docTransferAction';
    }
}
```

After this step log into Zed and try opening `http://ZED_HOST/api/v1/doc` and `http://ZED_HOST/api/v1/doc-transfer`.

## 2. Create a business model to examine facade classes using reflection

First, it's needed to create an empty model class `ApiEntry` in the business layer, it can be placed in `Business/Model/ApiEntry.php`.

This class must be created in a factory of the module. Additionally, the factory must provide additional dependencies from facades of other modules. To simplify the solution, facades can be created dynamically based on GET parameters of the request, while in real life it's advised to always specify these dependencies implicitly.

Considering all of above, the factory implementation can look like this:

```php
<?php
namespace Pyz\Zed\Api\Business;

use Pyz\Zed\Api\Business\Model\ApiEntry;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

class ApiBusinessFactory extends AbstractBusinessFactory
{
    // Here we will dynamically create facades of modules based on a module name.
    protected function getBundleFacade($bundle)
    {
        $locator = $this->createContainer()->getLocator();
        return $locator->$bundle()->facade();
    }
    // This instantiates our business model and passes the facade inside it.
    public function createFacadeProxy($bundle)
    {
        return new ApiEntry(
            $this->getBundleFacade($bundle)
        );
    }
}
```

Now implement the `__construct` method of `ApiEntry` to receive a facade and add an empty endpoint to be used in controller:

```php
<?php
...
class ApiEntry
...
    protected $wrappedFacade;

    public function __construct(AbstractFacade $wrappedFacade)
    {
        $this->wrappedFacade = $wrappedFacade;
    }

    public function getAnnotations()
    {
        // TODO
    }
```

The `getAnnotations` method of the model must be exposed through the facade of the `Api` module, before it can be used in the controller we prepared in the previous step:

```php
<?php
namespace Pyz\Zed\Api\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

class ApiFacade extends AbstractFacade implements ApiFacadeInterface
{
    public function getAnnotations($bundle)
    {
        return $this->getFactory()->createFacadeProxy($bundle)->getAnnotations();
    }
}
```

After this we can call the method from the controller and think about implementing the business logic of the `ApiEntry` class:

```php
<?php
...
class V1Controller extends AbstractController
...
    public function docAction(Request $request)
    {
        return [
            'annotations' => $this->getFacade()->getAnnotations($request->get('bundle'))
        ];
    }
```

And template for this action `Presentation/V1/doc.twig`:

```twig
{% raw %}{{{% endraw %} dump() {% raw %}}}{% endraw %}
```

Now the controller should work, but will return empty values, we can start implementing the business logic. To dynamically read documentation from facade we will use `ReflectionClass` of standard PHP library, the idea is to go through public methods, extract doc-strings and parameter types and render them on the page. This will result in self-documenting API. The final version of the `ApiEntry` for this step will look like:

<details>
<summary>Code sample</summary>

```php
<?php
namespace Pyz\Zed\Api\Business\Model;
use Spryker\Zed\Kernel\Business\AbstractFacade;
use ReflectionClass;
use ReflectionMethod;
use ReflectionType;

class ApiEntry
{
    protected $wrappedFacade;

    public function __construct(AbstractFacade $wrappedFacade)
    {
        $this->wrappedFacade = $wrappedFacade;
    }

    public function getAnnotations()
    {
        $className = get_class($this->wrappedFacade); // Locator returns an instance, reflection needs a class name.
        $reflection = new ReflectionClass($className);
        return $this->getPublicInterfaceAnnotations($reflection);
    }

    protected function getPublicInterfaceAnnotations(ReflectionClass $reflection)
    {
        $result = [];
        // Go through all public methods of the facade.
        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            // Docstring lookup in interfaces implemented by the facade.
            $docDomment = $method->getDocComment();
            if (stripos($docDomment, '@inheritdoc') !== false) {
                foreach ($reflection->getInterfaces() as $interface) {
                    if ($interface->hasMethod($method->getName())) {
                        $docDomment = $interface->getMethod($method->getName())->getDocComment();
                        break;
                    }
                }
            }
            // As result we build an array from the doc-string and parameters.
            $result[$method->getName()] = [
                'docString' => $docDomment,
                'parameters' => $this->annotateIncomingParameters($method),
            ];
        }

        return $result;
    }

    protected function annotateIncomingParameters(ReflectionMethod $method)
    {
        $result = [];
        foreach ($method->getParameters() as $parameter) {
            $result[$parameter->getName()] = $this->annotateType($parameter->getType(), $parameter->getClass());
        }
        return $result;
    }
    protected function annotateType(ReflectionType $type = null, ReflectionClass $class = null)
    {
        return [
            'type' => $class !== null ? $class->getName() : $type,
            'isTransfer' => $class !== null ? $class->isSubclassOf('Spryker\Shared\Transfer\AbstractTransfer') : false,
        ];
    }

}
```
</details>

The resulting structure of the array is following:

```php
[
  "methodName" =>; [
      'docString' => 'abc',
      'parameters' => ['parameterName' => ['type' => 'string', 'isTransfer' => false  ] ],
  ],
]
```

Now modify template to output the array:

<details>
<summary>Code sample</summary>

```html
<html>
    <table border="1">
        <thead>
            <tr><td>Method</td><td>Annotation</td><td>Parameters</td></tr>
        </thead>
        <tbody>
        {% raw %}{%{% endraw %} for method, annotation in annotations {% raw %}%}{% endraw %}
            <tr>
                <td>{% raw %}{{{% endraw %} method | nl2br{% raw %}}}{% endraw %}</td>
                <td>{% raw %}{{{% endraw %} annotation.docString | nl2br {% raw %}}}{% endraw %}</td>
                <td>
                    {% raw %}{%{% endraw %} for parameter_name, parameter_annotation in annotation.parameters {% raw %}%}{% endraw %}
                        {% raw %}{{{% endraw %} parameter_name {% raw %}}}{% endraw %}:
                        {% raw %}{%{% endraw %} if parameter_annotation.isTransfer {% raw %}%}{% endraw %}
                            <a href="docTransfer?transfer={% raw %}{{{% endraw %} parameter_annotation.type | escape{% raw %}}}{% endraw %}" target="_blank">
                        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                        {% raw %}{{{% endraw %} parameter_annotation.type {% raw %}}}{% endraw %}
                        {% raw %}{%{% endraw %} if parameter_annotation.isTransfer {% raw %}%}{% endraw %}
                            </a>
                        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                        </br>
                    {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
                </td>
            </tr>
        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
        </tbody>
    </table>
</html>
```
</details>

Open `http://ZED_HOST/api/v1/doc?bundle=customerGroup` to see the results.

## 3. Create a business model to examine transfer objects using reflection

Now, let us repeat everything from the previous step, but for a new model TransferAnnotator, which we will use to annotate transfer objects. The model should implement a method public function `annotate($transfer)`, it should be exposed through the facade of the module and used in the `docTransferAction`, which we prepared in the controller.

{% info_block infoBox "Attention" %}

Transfer objects have a private property `transferMetadata`, which describes all the fields, the easiest is to read it for exercise purposes.

```php
<?php
namespace Pyz\Zed\Api\Business\Model;
use ReflectionClass;
class TransferAnnotator implements TransferAnnotatorInterface
{
    public function annotate($transfer)
    {
        $reflection = new ReflectionClass($transfer);
        $metadata = $reflection->getDefaultProperties()['transferMetadata'];
        $result = [];
        foreach ($metadata as $attribute => $properties) {
            $result[$attribute] = print_r($properties, true);
        }
        return $result;
    }
}
```

{% endinfo_block %}

Template `doc-transfer.twig`:

```html
<html>
    <table border="1">
        <thead>
            <tr><td>Property</td><td>Type</td></tr>
        </thead>
        <tbody>
        {% raw %}{%{% endraw %} for name, annotation in transfer_annotation {% raw %}%}{% endraw %}
            <tr>
                <td>{% raw %}{{{% endraw %} name | nl2br{% raw %}}}{% endraw %}</td>
                <td>{% raw %}{{{% endraw %} annotation | nl2br {% raw %}}}{% endraw %}</td>
            </tr>
        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
        </tbody>
    </table>
</html>
```

After completing this step we should be able to see transfer object annotation by accessing `http://ZED_HOST/api/v1/docTransfer?transfer=Generated\Shared\Transfer\CustomerGroupTransfer`.

## 4. Implement an "execute" controller action, which will proxy calls to specific methods of a facade and pass all the arguments to it

This step is not directly related to Spryker but to an idea to cast incoming parameters to types based on method signature dynamically and forward a call to respective facade method. The big advantage is that Spryker allows to unserialize transfer objects from JSON, it means, we can just send values for complex objects as JSON objects and those can be automatically cast to transfer objects and be safely used, when calling different facade methods.

Let us extend `ApiEntry` with:

```php
<?php
...
    public function forwardCall($name, array $arguments)
    {
        if (method_exists($this->wrappedFacade, $name)) {
            return call_user_func_array([$this->wrappedFacade, $name], $this->castArguments($name, $arguments));
        }
        throw new \BadMethodCallException('Non-existing method ' . get_class($this->wrappedFacade) . '::' . $name);
    }
    protected function castArguments($methodName, array $arguments = [])
    {
        $className = get_class($this->wrappedFacade);
        $reflection = new ReflectionClass($className);
        $parameters = $this->annotateIncomingParameters($reflection->getMethod($methodName));
        $result = [];
        foreach ($parameters as $name => $annotation) {
            // Here JSON is casted to transfer object.
            if ($annotation['isTransfer']) {
                $class = $annotation['type'];
                /** @var \Spryker\Shared\Kernel\Transfer\AbstractTransfer $transfer */
                $transfer = new $class();
                $transfer->unserialize($arguments[$name]);
                $result[$name] = $transfer;
            } else {
                $result[$name] = $arguments[$name];
            }
        }
        return $result;
    }
```

Publish this method in the facade of our module and add a controller method to forward the call and render the result of the call. Let us just convert the return values to JSON for simplicity, new methods of `V1Controller` may look like:

```php
<?php
...
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use Symfony\Component\HttpFoundation\JsonResponse;
...
    public function executeAction(Request $request)
    {
        return new JsonResponse($this->resultToArray(
            $this->getFacade()->callBundleMethod(
                $request->get('bundle'),
                $request->get('method'),
                $request->get('arguments', [])
            )
        ));
    }
    protected function resultToArray($mixed)
    {
        if (is_scalar($mixed)) {
            return $mixed;
        }
        if ($mixed instanceof AbstractTransfer) {
            return $mixed->toArray(true);
        }
        if (is_array($mixed)) {
            $result = [];
            foreach ($mixed as $key => $value) {
                $result[$key] = $this->resultToArray($value);
            }
            return $result;
        }
        if ($mixed === null) {
            return null;
        }
        throw new \InvalidArgumentException();
    }
```

## Test the API

Finally the challenge is finished, now we can finally play with our API, here are a couple of examples of calling the facade of the `CustomerGroup` module:

```
-> http://ZED_HOST/api/v1/execute?bundle=customerGroup&method=add&arguments[customerGroupTransfer]={% raw %}{%{% endraw %}22name%22:%22test98597435%22}

<- {"id_customer_group":13,"name":"test98597435","description":null,"customers":{% raw %}{}}{% endraw %}

-> http://ZED_HOST/api/v1/execute?bundle=customerGroup&method=get&arguments[customerGroupTransfer]={% raw %}{%{% endraw %}22idCustomerGroup%22:1}

<- {"id_customer_group":1,"name":"test","description":null,"customers":{% raw %}{}}{% endraw %}
```

In this challenge we implemented self-documenting API based on a public API of modules, we learned how to use Reflection in PHP, extend Zed, forward calls dynamically to different facades and how Spryker powerful and flexible is regarding public API and boundaries of modules.
