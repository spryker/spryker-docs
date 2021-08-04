---
title: Tutorial - Hello World - Spryker Commerce OS
originalLink: https://documentation.spryker.com/2021080/docs/tutorial-hello-world-scos
redirect_from:
  - /2021080/docs/tutorial-hello-world-scos
  - /2021080/docs/en/tutorial-hello-world-scos
---

{% info_block infoBox %}
This tutorial is also available on the Spryker Training web-site. For more information and hands-on exercises, visit the [Spryker Training](https://training.spryker.com/courses/developer-bootcamp
{% endinfo_block %} web-site.)

## Challenge Description
Show "Hello World!" string on a web page on your browser. To do so, build a new module called **HelloWorld**.

## Build the HelloWorld Module
The steps described in this procedure describe how to build a new module.  To add a new Yves module called **HelloWorld**, do the following:
1. Go to `/src/Pyz/Yves/` and add a new module called HelloWorld.
{% info_block infoBox %}
A new module is simply a new folder. 
{% endinfo_block %}
2. Add a new controller for the module. 
Add a new folder inside the HelloWorld module called `Controller`, and then add the following controller class called `IndexController`:

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

3. Add the route to the controller:
    1. Add a new folder inside the HelloWorld module called `Plugin`.
    2. Inside the **Plugin** folder, add a folder called **Provider**.
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
4. Register the `RouteProviderPlugin` in the application, so the application knows about your controller action.
Go to `RouterDependencyProvider::getRouteProvider()` method in `Router` module and add `HelloWorldRouteProviderPlugin` to the array.
5. Finally, add the twig file to render your Hello World page. Add the following folder structure inside the **HelloWorld** module: `Theme/default/views/index`. 

{% info_block infoBox %}
This folder structure reflects your theme and controller names. Default is the theme name, and index is the controller name. For every action there is a template with the same name.
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
6. Open the new page `http://www.de.suite.local/hello-world`.

