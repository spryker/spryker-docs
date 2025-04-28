---
title: Create modules
description: Learn how to create custom modules in Spryker with this step-by-step guide. Understand the module creation process and how to extend Spryker's functionality to meet your ecommerce needs.
last_updated: Jun 16, 2021
template: howto-guide-template
keywords: Module, Spryker module, custom module
originalLink: https://documentation.spryker.com/2021080/docs/t-add-new-bundle
originalArticleId: c6eb6a48-4626-41ae-add8-a425bce184f5
redirect_from:
  - /docs/scos/dev/back-end-development/extend-spryker/create-modules.html
  - /docs/scos/dev/back-end-development/extend-spryker/adding-a-new-module.html
  - /docs/scos/dev/back-end-development/extend-spryker/project-modules/adding-a-new-module.html
  - /docs/scos/dev/back-end-development/extending-spryker/development-strategies/project-modules/add-a-new-module.html
---

{% info_block infoBox %}

This tutorial shows how to create a test `HelloWorld` module; the module's functionality is to display a _Hello world!_ message to users.

{% endinfo_block %}

When a new concept needs to be defined, you need to add a new module on the project side to encapsulate that concept. The new module needs to follow the same folder structure and conventions as the ones in Core.

## Prerequisites

To implement this functionality, you need an index view together with its matching controller and a `HelloWorld` dependency provider.

## Create a new module

1. Create the necessary files, following the folder structure conventions:

```bash
mkdir -p src/Pyz/Zed/HelloWorld/Presentation/Index
touch src/Pyz/Zed/HelloWorld/Presentation/Index/index.twig

mkdir -p src/Pyz/Zed/HelloWorld/Communication/Controller
touch src/Pyz/Zed/HelloWorld/Communication/Controller/IndexController.php

touch src/Pyz/Zed/HelloWorld/HelloWorldDependencyProvider.php
```

2. In the view (`index.twig`), add the _Hello world !_ message:

```twig
{% raw %}{%{% endraw %} extends '@Gui/Layout/layout.twig' {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
   Hello world!
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

`IndexController` is empty (its index action returns an empty array):

```php
<?php
namespace Pyz\Zed\HelloWorld\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
class IndexController extends AbstractController
{
    public function indexAction(): array
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

Additionally, you can use the code generator to create a module. For this, create the basic module structure:

```bash
console spryk:run AddModule
```

Requesting the URL `https://zed.mysprykershop.com/hello-world` shows the Hello World example.

## Display a random salutation message

You can extend this example to display a random salutation message on the screen. For this, you need to create a class containing the logic for generating the random salutation message, name it `MessageGenerator`, and place it under the business layer.

To display a random salutation message, follow these steps:

1. In `MessageGenerator`, implement the method that returns the message:

```php
<?php
namespace Pyz\Zed\HelloWorld\Business;

class MessageGenerator
{
    /**
     * @return string
     */
    public function generateHelloMessage(): string
    {
        $helloMessages = ["Hello!","Bonjour!","Namaste!","Hallo", "Hola!", "Ciao!"];
        shuffle($helloMessages);
        return $helloMessages[0];
    }
}
```

2. To get an instance of this class in the facade, add a business factory:

```php
<?php

namespace Pyz\Zed\HelloWorld\Business;

use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

class HelloWorldBusinessFactory extends AbstractBusinessFactory
{

    /**
     * @return MessageGenerator
     */
    public function createMessageGenerator(): MessageGenerator
    {
        return new MessageGenerator();
    }
}
```

3. Create the `HelloWorldFacade` and the corresponding interface and call this functionality from it:

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
    public function getSalutationMessage(): string
    {
         return $this->getFactory()->createMessageGenerator()->generateHelloMessage();
    }
}
```

```php
<?php

namespace Pyz\Zed\HelloWorld\Business;

interface HelloWorldFacadeInterface
{
    /**
     * Specification:
     * - Returns a salutation text
     *
     * @api
     *
     * @return string
     */
    public function getSalutationMessage(): string;
}
```

4. Modify the controller so that it calls the just added method to your facade:

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
    public function indexAction(): array
    {
        $helloMessage = $this->getFacade()->getSalutationMessage();
        return [
            'helloMessage' => $helloMessage
        ];
    }
}
```

5. Modify the twig template to display the random salutation message instead of the static one we previously defined:

```twig
{% raw %}{%{% endraw %} extends '@Gui/Layout/layout.twig' {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %} helloMessage {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

<!-- for demoshop -->http://zed.mysprykershop.com/ displays a random salutation message.
