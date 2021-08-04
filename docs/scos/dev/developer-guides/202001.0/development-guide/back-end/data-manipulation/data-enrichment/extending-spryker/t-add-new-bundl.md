---
title: Adding a New Module
originalLink: https://documentation.spryker.com/v4/docs/t-add-new-bundle
redirect_from:
  - /v4/docs/t-add-new-bundle
  - /v4/docs/en/t-add-new-bundle
---

{% info_block infoBox %}
In this tutorial we will create a test module: `HelloWorld` module; the module’s functionality is to show a ‘Hello world!’ message to the user.
{% endinfo_block %}

When a new concept needs to be defined, a new module needs to be added on the project side to encapsulate that concept. The new module needs to follow the same folder structure and conventions as the ones in Core.

## Prerequisites
To implement this functionality, it’s necessary to have an index view together with its matching controller and a `HelloWorld` dependency provider.

## Creating a new module
To create a new module:
1. Run the following commands to create the necessary files, following the folder structure conventions:

```
mkdir -p src/Pyz/Zed/HelloWorld/Presentation/Index
touch src/Pyz/Zed/HelloWorld/Presentation/Index/index.twig

mkdir -p src/Pyz/Zed/HelloWorld/Communication/Controller
touch src/Pyz/Zed/HelloWorld/Communication/Controller/IndexController.php

touch src/Pyz/Zed/HelloWorld/HelloWorldDependencyProvider.php
```

2. Insert the ‘Hello world !’ message inside the view (`index.twig`):

```
{% raw %}{%{% endraw %} extends '@Gui/Layout/layout.twig' {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
   Hello world!
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
`IndexController`at the moment is empty (its index action returns an empty array) :

```php
<?php
namespace Pyz\Zed\HelloWorld\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
class IndexController extends AbstractController
{
    public function indexAction()
    {
        return [];
    }
}
```

The dependency provider inherits the `AbstractBundleDependencyProvider` functionality.

```php
<?php
namespace Pyz\Zed\HelloWorld;

use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;

class HelloWorldDependencyProvider extends AbstractBundleDependencyProvider
{

}
```

Additionally, you can use the code generator to create a module. For this, run `console spryk:run AddModule` that will create the basic module structure.

<!-- for demoshop --> Requesting the URL http://zed.de.demoshop.local/hello-world will show the Hello World example. 

## Displaying a random salutation message

We can now extend this example to display a random salutation message on the screen. For this, we’ll create a class that will contain the logic for generating the random salutation message; we’ll call it `MessageGenerator` and we will place it under the business layer.

**To display a random salutation message:**
1. In this class, implement the method that will return the message:

```php
<?php
namespace Pyz\Zed\HelloWorld\Business;

class MessageGenerator
{
    /**
     * @return string
     */
    public function generateHelloMessage()
    {
        $helloMessages = ["Hello!","Bonjour!","Namaste!","Hallo", "Hola!", "Ciao!"];
        shuffle($helloMessages);
        return $helloMessages[0];
    }
}
```

2. Next, add a business factory so that we can get an instance of this class in the facade:

```php
<?php

namespace Pyz\Zed\HelloWorld\Business;

use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

class HelloWorldBusinessFactory extends AbstractBusinessFactory
{

    /**
     * @return MessageGenerator
     */
    public function createMessageGenerator()
    {
        return new MessageGenerator();
    }
}
```

3. Create the `HelloWorldFacade` and call this functionality from it:

```php
<?php
namespace Pyz\Zed\HelloWorld\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

/**
 * @method \Pyz\Zed\HelloWorld\Business\HelloWorldBusinessFactory getFactory()
 */
class HelloWorldFacade extends AbstractFacade implements HelloWorldFacadeInterface
{
    /**
     * @return string
     */
    public function getSalutationMessage()
    {
         return  $this->getFactory()->createMessageGenerator()->generateHelloMessage();
    }
}
```
4. Modify the controller so that it calls the method you just added to your facade:

```php
<?php
namespace Pyz\Zed\HelloWorld\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;

/**
 * @method \Pyz\Zed\HelloWorld\Business\HelloWorldFacade getFacade()
 */
class IndexController extends AbstractController
{
    /**
     * @return array
     */
    public function indexAction()
    {
        $helloMessage = $this->getFacade()->getSalutationMessage();
        return [
            'helloMessage' => $helloMessage
        ];
    }
}
```
5. Modify the twig template to display the random salutation message instead of the static one we previously defined:

```php
{% raw %}{%{% endraw %} extends '@Gui/Layout/layout.twig' {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %} helloMessage {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```


<!-- for demoshop --> We are done! http://zed.mysprykershop.com/ now displays a random salutation message.
