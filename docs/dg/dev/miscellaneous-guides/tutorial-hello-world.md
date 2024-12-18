---
title: "Tutorial: Hello World"
description: The tutorial describes how to display a text string on the page in the browser by adding a new Yves module.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/tutorial-hello-world-scos
originalArticleId: ae140622-175b-44ee-8ff3-b6a57a20c814
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-hello-world-spryker-commerce-os.html
related:
  - title: Module configuration convention
    link: docs/scos/dev/guidelines/module-configuration-convention.html
---

{% info_block infoBox %}

This tutorial is also available on the Spryker Training website. For more information and hands-on exercises, visit the [Spryker Training](https://training.spryker.com/courses/developer-bootcamp) website.

{% endinfo_block %}

## Challenge description

Show the *Hello World!* string on a web page on your browser. To do so, build a new module called `HelloWorld`.

## Build the HelloWorld module

The steps described in this procedure describe how to build a new module.  To add the `HelloWorld` module, do the following:

1. Go to `/src/Pyz/Yves/` and add a new module called HelloWorld.

{% info_block infoBox %}

A new module is simply a new folder.

{% endinfo_block %}

2. Add a new controller for the module:
   1. In `HelloWorld`, add a new folder called `Controller`.
   2. Add the controller class called `IndexController`:

```php
<?php

namespace Pyz\Yves\HelloWorld\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class IndexController extends AbstractController
{
	/**
    * @param Request $request
	*
	* @return \Spryker\Yves\Kernel\View\View
	*/
	public function indexAction(Request $request)
		{
			$data = ['helloWorld' => 'Hello World!'];

			return $this->view(
				$data,
				[],
				'@HelloWorld/views/index/index.twig'
			);
		}
}
```

1. Add the route to the controller:
   1. In `HelloWorld`, add a new folder called `Plugin`.
   2. In `Plugin`, add a folder called **Router**.
   3. Add your `RouteProviderPlugin` class with the name `HelloWorldRouteProviderPlugin`:

```php
<?php

namespace Pyz\Yves\HelloWorld\Plugin\Provider;

use Spryker\Yves\Router\Plugin\RouteProvider\AbstractRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class HelloWorldRouteProviderPlugin extends AbstractRouteProviderPlugin
{
	protected const ROUTE_HELLO_WORLD = 'hello-world';

	/**
	 * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
         *
         * @return \Spryker\Yves\Router\Route\RouteCollection
         */
        public function addRoutes(RouteCollection $routeCollection): RouteCollection
        {
            $route = $this->buildRoute('/hello-world', 'HelloWorld', 'Index', 'indexAction');
            $routeCollection->add(static::ROUTE_HELLO_WORLD, $route);

            return $routeCollection;
        }
}
```

4. In the application, register `RouteProviderPlugin`, so the application knows about your controller action.
5. In the `Router` module, go to `RouterDependencyProvider::getRouteProvider()` method and add `HelloWorldRouteProviderPlugin` to the array.
6. Add the twig file to render your **Hello World** page.
7. In `HelloWorld`, add the `Theme/default/views/index` folder structure.

{% info_block infoBox %}

This folder structure reflects your theme and controller names. Default is the theme name, and index is the controller name. For every action, there is a template with the same name.

{% endinfo_block %}

As your action is called index, add a twig file for your action called `index.twig`:

```php
{% raw %}{%{% endraw %} extends template('page-layout-main') {% raw %}%}{% endraw %}

	{% raw %}{%{% endraw %} define data = {
	helloWorld: _view.helloWorld
	} {% raw %}%}{% endraw %}

	{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
		<div><h2>{% raw %}{{{% endraw %} data.helloWorld {% raw %}}}{% endraw %}</h2></div>
	{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

8. Open the new page `http://www.de.suite.local/hello-world`.
