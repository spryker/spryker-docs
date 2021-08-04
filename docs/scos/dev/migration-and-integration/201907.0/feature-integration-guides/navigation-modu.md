---
title: Navigation Module Integration
originalLink: https://documentation.spryker.com/v3/docs/navigation-module-integration
redirect_from:
  - /v3/docs/navigation-module-integration
  - /v3/docs/en/navigation-module-integration
---

## Prerequisites
To prepare your project to work with Navigation:

1. Require the Navigation modules in your `composer.json`.
2. Install the new database tables By running `vendor/bin/console propel:diff`. Propel will generate a migration file with the changes.
3. Apply the database changes by running `vendor/bin/console propel:migrate`.
4. Generate ORM models by running `vendor/bin/console propel:model:build`.
5. After running this command you’ll find some new classes in your project under `\Orm\Zed\Navigation\Persistence` namespace. 

    It’s important to make sure that they extend the base classes from the Spryker core, e.g.:

    * `\Orm\Zed\Navigation\Persistence\SpyNavigation` extends `\Spryker\Zed\Navigation\Persistence\Propel\AbstractSpyNavigation`
    * `\Orm\Zed\Navigation\Persistence\SpyNavigationNode` extends `\Spryker\Zed\Navigation\Persistence\Propel\AbstractSpyNavigationNode`
    * `\Orm\Zed\Navigation\Persistence\SpyNavigationNodeLocalizedAttributes` extends `\Spryker\Zed\Navigation\Persistence\Propel\AbstractSpyNavigationNodeLocalizedAttributes`
    * `\Orm\Zed\Navigation\Persistence\SpyNavigationQuery` extends `\Spryker\Zed\Navigation\Persistence\Propel\AbstractSpyNavigationQuery`
    * `\Orm\Zed\Navigation\Persistence\SpyNavigationNodeQuery` extends `\Spryker\Zed\Navigation\Persistence\Propel\AbstractSpyNavigationNodeQuery`
    * `\Orm\Zed\Navigation\Persistence\SpyNavigationNodeLocalizedAttributesQuery` extends `\Spryker\Zed\Navigation\Persistence\Propel\AbstractSpyNavigationNodeLocalizedAttributesQuery`

6. To get the new transfer objects, run `vendor/bin/console transfer:generate`.
7. Make sure that the new Zed UI assets are also prepared for use by running the `npm run zed` command (or `antelope build zed` for older versions).
8. To make the navigation management UI available in Zed navigation, run the `vendor/bin/console application:build-navigation-cache` command.
9. Activate the navigation menu collector by adding the `NavigationMenuCollectorStoragePlugin` to the storage collector plugin stack. To do that, see the following example:

```php
<?php

namespace Pyz\Zed\Collector;

use Spryker\Shared\Navigation\NavigationConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\NavigationCollector\Communication\Plugin\NavigationMenuCollectorStoragePlugin;
// ...

class CollectorDependencyProvider extends SprykerCollectorDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        // ...
       
        $container[self::STORAGE_PLUGINS] = function (Container $container) {
            return [
                // ...
                NavigationConfig::RESOURCE_TYPE_NAVIGATION_MENU => new NavigationMenuCollectorStoragePlugin(),
            ];
        };
        
        // ...
    }
}
```
### Data Setup
You should now be able to manage navigation menus from Zed UI, and the collectors should also be able to export the navigation menus to the KV storage. This is a good time to implement an installer in your project to install a selection of frequently used navigation menus. <!--Check out our Demoshop implementation for examples and ideas.-->

### Usage in Yves
The KV storage should by now have some navigation menus we can display in our frontend.

The `Navigation` module ships with a twig extension that provides the `spyNavigation()` twig function which renders a navigation menu.

`spyNavigation()` accepts two parameters:

* `$navigationKey`: Reference of a navigation menu by its key field (i.e. "MAIN_NAVIGATION").
* `$template`: Template path used to render the navigation menu (i.e. `"@application/layout/navigation/main.twig"`).

To enable the navigation twig function, register `\Spryker\Yves\Navigation\Plugin\Provider\NavigationTwigServiceProvider` in your application’s bootstrap.

```php
<?php

namespace Pyz\Yves\Application;

use Spryker\Yves\Navigation\Plugin\Provider\NavigationTwigServiceProvider;
// ...

class YvesBootstrap
{
    /**
     * @return void
     */
    protected function registerServiceProviders()
    {
        // ...
        $this->application->register(new NavigationTwigServiceProvider());
    }
}
```

Example of rendering navigation in an Yves twig template:

```
{% raw %}{{{% endraw %} spyNavigation('MAIN_NAVIGATION', '@application/layout/navigation/main.twig') {% raw %}}}{% endraw %}
```

### Rendering Navigation Templates
The templates used to render a navigation menu use the `navigationTree` template variable to traverse the navigation tree. The variable contains an instance of `\Generated\Shared\Transfer\NavigationTreeTransfer` with only one localized attribute per node for the current locale.

The following code examples show the Demoshop implementation of how to render `MAIN_NAVIGATION` which is a multi-level navigation menu. For styling we used the [Menu](https://foundation.zurb.com/sites/docs/menu.html) and [Dropdown](https://foundation.zurb.com/sites/docs/dropdown.html) components from Foundation framework.

In `Pyz/Yves/Application/Theme/default/layout/navigation/main.twig` we traverse the root navigation nodes of the navigation tree and for each root node we render their children nodes as well.

<details open>
<summary>Code sample:</summary>
    
```
<div class="callout show-for-large">
    <div class="row">
        <div class="large-12 columns">
            <ul class="menu">
                {% raw %}{%{% endraw %} for node in navigationTree.nodes {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} embed '@Application/layout/navigation/_partials/base-node.twig' {% raw %}%}{% endraw %}
                        {% raw %}{%{% endraw %} block url {% raw %}%}{% endraw %}
                            <li {% raw %}{%{% endraw %} if node.children|length {% raw %}%}{% endraw %}data-toggle="navigation-node-{% raw %}{{{% endraw %} node.navigationNode.idNavigationNode {% raw %}}}{% endraw %}-children"{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %} class="{% raw %}{{{% endraw %} class {% raw %}}}{% endraw %}">
                                <a href="{% raw %}{{{% endraw %} url {% raw %}}}{% endraw %}">{% raw %}{{{% endraw %} title {% raw %}}}{% endraw %}</a>
                            </li>
                        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

                        {% raw %}{%{% endraw %} block link {% raw %}%}{% endraw %}
                            <li {% raw %}{%{% endraw %} if node.children|length {% raw %}%}{% endraw %}data-toggle="navigation-node-{% raw %}{{{% endraw %} node.navigationNode.idNavigationNode {% raw %}}}{% endraw %}-children"{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %} class="{% raw %}{{{% endraw %} class {% raw %}}}{% endraw %}">
                                <a href="{% raw %}{{{% endraw %} link  {% raw %}}}{% endraw %}">{% raw %}{{{% endraw %} title {% raw %}}}{% endraw %}</a>
                            </li>
                        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

                        {% raw %}{%{% endraw %} block externalUrl {% raw %}%}{% endraw %}
                            <li {% raw %}{%{% endraw %} if node.children|length {% raw %}%}{% endraw %}data-toggle="navigation-node-{% raw %}{{{% endraw %} node.navigationNode.idNavigationNode {% raw %}}}{% endraw %}-children"{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %} class="{% raw %}{{{% endraw %} class {% raw %}}}{% endraw %}">
                                <a href="{% raw %}{{{% endraw %} externalUrl {% raw %}}}{% endraw %}" target="_blank">{% raw %}{{{% endraw %} title {% raw %}}}{% endraw %}</a>
                            </li>
                        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

                        {% raw %}{%{% endraw %} block other {% raw %}%}{% endraw %}
                            <li {% raw %}{%{% endraw %} if node.children|length {% raw %}%}{% endraw %}data-toggle="navigation-node-{% raw %}{{{% endraw %} node.navigationNode.idNavigationNode {% raw %}}}{% endraw %}-children"{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %} class="menu-text {% raw %}{{{% endraw %} class {% raw %}}}{% endraw %}">
                                {% raw %}{{{% endraw %} title {% raw %}}}{% endraw %}
                            </li>
                        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
            </ul>

            {% raw %}{%{% endraw %} for node in navigationTree.nodes {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} if node.navigationNode.isActive {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} if node.children|length {% raw %}%}{% endraw %}
                        <div class="dropdown-pane" id="navigation-node-{% raw %}{{{% endraw %} node.navigationNode.idNavigationNode {% raw %}}}{% endraw %}-children" data-dropdown data-hover="true" data-hover-pane="true">
                            {% raw %}{%{% endraw %} include '@Application/layout/navigation/_partials/nodes.twig' with {nodes: node.children} {% raw %}%}{% endraw %}
                        </div>
                    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
        </div>
    </div>
    </div>
```
    
</br>
</details>

The children nodes are rendered recursively by `Pyz/Yves/Application/Theme/default/layout/navigation/_partials/nodes.twig`.

<details open>
<summary>Code sample:</summary>
    
```
<ul class="vertical menu {% raw %}{%{% endraw %} if nested|default(false) {% raw %}%}{% endraw %}nested{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}">
    {% raw %}{%{% endraw %} for node in nodes {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} embed '@Application/layout/navigation/_partials/base-node.twig' {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} block nodeContainer {% raw %}%}{% endraw %}
                <li id="navigation-node-{% raw %}{{{% endraw %} node.navigationNode.idNavigationNode {% raw %}}}{% endraw %}" data-id-navigation-node="{% raw %}{{{% endraw %} node.navigationNode.idNavigationNode {% raw %}}}{% endraw %}" class="{% raw %}{{{% endraw %} class {% raw %}}}{% endraw %}">
                    {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}

                    {% raw %}{%{% endraw %} if node.children|length {% raw %}%}{% endraw %}
                        {% raw %}{%{% endraw %} include '@Application/layout/navigation/_partials/nodes.twig' with {nodes: node.children, nested:true} {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                </li>
            {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

            {% raw %}{%{% endraw %} block url {% raw %}%}{% endraw %}
                    <a href="{% raw %}{{{% endraw %} url {% raw %}}}{% endraw %}">{% raw %}{{{% endraw %} title {% raw %}}}{% endraw %}</a>
            {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

            {% raw %}{%{% endraw %} block link {% raw %}%}{% endraw %}
                    <a href="{% raw %}{{{% endraw %} link {% raw %}}}{% endraw %}">{% raw %}{{{% endraw %} title {% raw %}}}{% endraw %}</a>
            {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

            {% raw %}{%{% endraw %} block externalUrl {% raw %}%}{% endraw %}
                    <a href="{% raw %}{{{% endraw %} externalUrl {% raw %}}}{% endraw %}" target="_blank">{% raw %}{{{% endraw %} title {% raw %}}}{% endraw %}</a>
            {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

            {% raw %}{%{% endraw %} block other {% raw %}%}{% endraw %}
                <span class="menu-text">{% raw %}{{{% endraw %} title {% raw %}}}{% endraw %}</span>
            {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
    </ul>
```
    
</br>
</details>

To prevent code duplication we implemented the `Pyz/Yves/Application/Theme/default/layout/navigation/_partials/base-node.twig` template which we use to render a node by embedding it in the templates above.

This is also the place where we take the visibility controller parameters into account : `valid_from`, `valid_to`, and `is_active`.

<details open>
<summary>Code sample:</summary>
    
```
{% raw %}{%{% endraw %} set class = node.navigationNode.navigationNodeLocalizedAttributes[0].cssClass {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} set url = node.navigationNode.navigationNodeLocalizedAttributes[0].url {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} set externalUrl = node.navigationNode.navigationNodeLocalizedAttributes[0].externalUrl {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} set link = node.navigationNode.navigationNodeLocalizedAttributes[0].link {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} set title = node.navigationNode.navigationNodeLocalizedAttributes[0].title {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} set today = "now"|date("Ymd") {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} if node.navigationNode.isActive and
    (node.navigationNode.validFrom is empty or node.navigationNode.validFrom|date("Ymd") ‹= today) and
    (node.navigationNode.validTo is empty or node.navigationNode.validTo|date("Ymd") >= today)
{% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} block nodeContainer {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} if url {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} block url {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} elseif link {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} block link {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} elseif externalUrl {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} block externalUrl {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} block other {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```

</br>
</details>

