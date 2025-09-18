---
title: Creating components
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-create-component
originalArticleId: ab0fbc97-d449-45e6-8bab-d70d14183aaf
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/yves/atomic-frontend/managing-the-components/creating-a-component.html
  - /docs/scos/dev/front-end-development/yves/atomic-frontend/managing-the-components/creating-a-component.html
related:
  - title: Using a Component
    link: docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/using-components.html
  - title: Extending a Component
    link: docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/extending-components.html
  - title: Overriding a Component
    link: docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/overriding-components.html
---

As Spryker Shop implements the [Component Model](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/atomic-frontend.html#component-model), adding new functionality to it usually means implementing a new component. In this document, we shall review creation of a new component on the example of a simple block that displays the count of DOM elements of a certain type. To implement it:

## 1. Create a component folder

First of all, you need to create a folder on the file system where all component files will be located. By default, project level components are located under `src/Pyz/Yves/ShopUi/Theme/default/components`. This folder should contain subfolders for each component type (*atoms*, *molecules*, *organisms*). A links counter is a simple molecule, so it will be created under the **molecules** subfolder. Per naming conventions, the folder name follows [Kebab Case](http://wiki.c2.com/?KebabCase): `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/new-component-counter`.

Open the `new-component-counter` folder and create the following files:

- `index.ts` - Webpack entry point;
- `new-component-counter.scss` - styles;
- `new-component-counter.ts` - Javascript code;
- `new-component-counter.twig` - component template.

## 2. Define a template

The first thing to do when creating a component is to define a template for it. A template specifies which blocks a component consists of and how they are arranged. This is done in Twig. Open the `new-component-counter.twig` file.

First, we need to define the inheritance of the component. A component can inherit from a model or another component. Since we are creating a new component, it can be inherited from the following models defined in Spryker Shop Application:

- atoms, molecules and organisms extend model **component**:

```twig
{% raw %}{%{% endraw %} extends model('component') {% raw %}%}{% endraw %}
```

- templates and views extend model **template**

```twig
{% raw %}{%{% endraw %} extends model('template') {% raw %}%}{% endraw %}
```

As we are creating a molecule, it must inherit the **component** model. For this purpose, add the following:

```twig
{% raw %}{%{% endraw %} extends model('component') {% raw %}%}{% endraw %}
```

After that, we need to define a configuration object for our new component. A configuration consists of the following:

- **name** - specifies the component name. It is also used as the class name of the component.
- Optional: **tag** - specifies the name of the DOM tag that will be used to render the component. It also defines the component Javascript class name (**jsName**) automatically.

{% info_block infoBox %}

If the tag name is not defined, **div** is used by default.

{% endinfo_block %}

- Optional: **jsName** - explicitly specifies the Javascript class name (**.js-classname**) of the component.

{% info_block warningBox "Separation of Logic from Styles" %}

To enforce separation between logic and visual styles and achieve clear understanding as to which code is responsible for what, the following convention has been put in place:<br>- code related to **styles** is always contained in `{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__element` classes;<br>- code related to behavior is always contained in `{% raw %}{{{% endraw %}config.jsName{% raw %}}}{% endraw %}__element classes`;

{% endinfo_block %}

The same as with files and folders, Kebab Case should be used

We will use a custom tag for the component. It will have the same name as the name of the component. Add the *config* element as follows:

```twig
{% raw %}{%{% endraw %} define config = {
    name: 'new-component-counter',
```

```twig
    tag: 'new-component-counter'
} {% raw %}%}{% endraw %}
```

Now, we need to define a contract for the component. Contract consists of the attributes required for the component to function properly. Attributes can be either **required** or **optional**. *Required* attributes must always be defined whenever a component is used, while *optional* ones can be left undefined. Nevertheless, by convention, attributes cannot have their value undefined. For this reason, if you define an optional attribute in your contract, you must set a default value for it.

Let us define 2 attributes. They will be used to pass the component title and description displayed on a page. *Title* will be required and *description* will be optional with the default value of *no description*.

```twig
{% raw %}{%{% endraw %} define data = {
    name: required,
    description: 'no description'
} {% raw %}%}{% endraw %}
```

In addition to the data contract, you can also add attributes that will be passed in the HTML tag of the component. The same as **data** attributes, they can be required or not.

For our component, we will use an attribute called *element-selector*. It will be used to specify the type of HTML elements to count. Let us add the attribute and make it required:

```twig
{% raw %}{%{% endraw %} define attributes = {
    'element-selector': required
} {% raw %}%}{% endraw %}
```

With the above configuration, if we want our component to count **a** tags, we need to embed it on a page as follows:

```twig
{% raw %}{%{% endraw %} include molecule('new-component-counter') with {
                ...
                attributes: {
                    'element-selector': 'a'
                }
            } only {% raw %}%}{% endraw %}
```

Finally, let us define the template. You can do this like you would normally do in Twig.

```twig
{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} spaceless {% raw %}%}{% endraw %}
       <strong class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__name">
            {% raw %}{{{% endraw %}data.name{% raw %}}}{% endraw %}
       </strong>
      <em class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__description">
            {% raw %}{%{% endraw %} if data.description is not empty {% raw %}%}{% endraw %}{% raw %}{{{% endraw %}data.description{% raw %}}}{% endraw %}{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
        </em>
        {% raw %}{%{% endraw %} block counter {% raw %}%}{% endraw %}
            Found <strong class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__counter {% raw %}{{{% endraw %}config.jsName{% raw %}}}{% endraw %}__counter"></strong> elements
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endspaceless {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

## 3. Create styles

Now, let us create visual styles used to display the component on a page. When creating styles, use [BEM methodology](https://en.bem.info/methodology/css/). To link the style to the new component, the class name must be the same as the component name, also in *Kebab Case*.

Open file `new-component-counter.scss` file and add the following code:

```css
.new-component-counter {
    &__name {
        display: block;
    }

    &__description {
        display: block;
        color: $setting-color-dark;
    }

    &__counter {
        color: $setting-color-alt;
    }

    &--big {
        @include helper-font-size(big);
    }
}
```

{% info_block infoBox %}

As shown in the example, you can use global variables, functions and mixins in your styles, for example `$setting-color-alt` or `$setting-color-dark`. They can be found in the `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles` folder. For more details, see the [SASS Layer](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/atomic-frontend.html#sass-layer) section in *Atomic Frontend*.

{% endinfo_block %}

Also, the styles must be locatable by Webpack. For this purpose, we need to add them to the entry point of the component. Open the `index.ts` file and add the following line:

```css
import './new-component-counter.scss';
```

## 4. Implement behavior

Finally, we need to implement the actual code that will count the elements. Open the `new-component-counter.ts` file.

The component we are creating is a molecule which is inherited from the *Component* model. Because of this, it must extend the Component base class defined in the `ShopUI` module. First, we need to import the base class:

```css
import Component from 'ShopUi/models/component';
```

After that, we need to create the new component class extending the base class. The new component class must implement a DOM callback. You can use any callback defined by the [Web Components Specification](https://developer.mozilla.org/en-US/docs/Web/Web_Components). When the component receives the callback you define, it should execute the behavioral logic.

{% info_block warningBox %}

It is recommended to use **ready** callback. This callback is triggered when the component is ready and all other components have already been loaded in the DOM. It is the safest approach from the point of view of DOM manipulation.

{% endinfo_block %}

Let us implement the **ready** callback. Upon receiving the callback, the component will count the number of tags defined by *element-selector*.

To fulfill our goal, we can use keyword *this*. It provides direct access to the public API of the HTML element associated with the component.

Names of Javascript classes follow [Camel Case](http://wiki.c2.com/?CamelCase), thus, the behavior of our component will be implemented by Javascript class `NewComponentCounter`:

```js
export default class NewComponentCounter extends Component {
    protected counter: HTMLElement
    protected elements: HTMLElement[]

    protected readyCallback(): void {
        this.counter = <HTMLElement>document.querySelector(`.${this.jsName}__counter`);
        this.elements = <HTMLElement[]>Array.from(document.querySelectorAll(this.elementSelector));
        this.count();
    }

    count(): void {
        this.counter.innerText = `${this.elements.length}`;
    }

    get elementSelector(): string {
        return this.getAttribute('element-selector');
    }
}
```

After implementing the behavior, we also need to bind the Javascript class to the DOM. For this purpose, we need to use the **register** function of the Spryker Shop application. It accepts **2** arguments:

- **name** - specifies the component name. This name will be associated with the component and can be used in Twig to insert the component in a template. Also, it will be used in the DOM as a tag name. Whenever a tag with the specified name occurs in the DOM, the Shop Application will load the component. It must be the same as the `data.tag` specified in the component Twig on step **2**.

- **importer** - must be a call of Webpack's **import** function to import Typescript code for the component.

The call must include a Webpack magic comment that specifies which type of import you want for the component, 'lazy' or 'eager'. For details, see [Dynamic Imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports).

In twig, we used tag name `new-component-counter`. Let us bind it to the Javascript class we created and use 'lazy' import. To do this, open file `index.ts` again and attach the following code:

```js
// Import the 'register' function from the Shop Application
import register from 'ShopUi/app/registry';

// Register the component
export default register(
    'new-component-counter',
    () => import(/* webpackMode: "lazy" */'./new-component-counter')
);
```

## 5. Compile and use the component

Our component is almost complete. The only thing left is to compile it. Execute the following line in the console: `npm run yves`

When done, you can include it into other components, views and templates.

- Copy file `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/page-layout-main/page-layout-main.twig` to `src/Pyz/Yves/ShopUi/Theme/default/page-layout-main/page-layout-main.twig`. Doing so overrides the default main page on the project level.

- Add the following code to the very beginning of the `<main>` block. It will include our new component and configure it to count **a** tags:

```twig
{% raw %}{%{% endraw %} include molecule('new-component-counter') with {
    modifiers: ['big'],
    data: {
        name: 'Counting a tags...',
        description: 'How many links are there on this page?'
    },
    attributes: {
        'element-selector': 'a'
    }
} only {% raw %}%}{% endraw %}
```

<details>
<summary>See resulting file (page-layout-main.twig)</summary>

```twig
{% raw %}{%{% endraw %} extends template('page-blank') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %}- block class -{% raw %}%}{% endraw %}js-page-layout-main__side-drawer-container{% raw %}{%{% endraw %}- endblock -{% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} block notifications {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} include organism('notification-area') only {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block sidebar {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} include organism('component-side-drawer') with {
            class: 'is-hidden-lg-xl',
            attributes: {
                'container-selector': 'js-page-layout-main__side-drawer-container',
                'trigger-selector': 'js-page-layout-main__side-drawer-trigger'
            }
        } only {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block outside {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block header {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} embed organism('header') only {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} block mobile {% raw %}%}{% endraw %}
                <a href="#" class="link link--alt js-page-layout-main__side-drawer-trigger">
                    {% raw %}{%{% endraw %} include atom('icon') with {
                        modifiers: ['big'],
                        data: {
                            name: 'bars'
                        }
                    } only {% raw %}%}{% endraw %}
                </a>
            {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    <div class="container">
        {% raw %}{%{% endraw %} block pageInfo {% raw %}%}{% endraw %}
            <div class="box">
                {% raw %}{%{% endraw %} block breadcrumbs {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} include molecule('breadcrumb') only {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

                <hr />

                {% raw %}{%{% endraw %} block title {% raw %}%}{% endraw %}
                    <h3>{% raw %}{{{% endraw %}data.title{% raw %}}}{% endraw %}</h3>
                {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
            </div>
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

        <main>
            {#
                Use the new component
            #}
            {% raw %}{%{% endraw %} include molecule('new-component-counter') with {
                modifiers: ['big'],
                    data: {
                    name: 'Counting a tags...',
                    description: 'How many links are there on this page?'
                },
                attributes: {
                    'element-selector': 'a'
                }
            } only {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
        </main>

        {% raw %}{%{% endraw %} block footer {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} include organism('footer') only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

        {% raw %}{%{% endraw %} block copyright {% raw %}%}{% endraw %}
            <p class="text-center text-small text-secondary">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                <br>Aenean commodo ligula eget dolor. Aenean massa.
                <br>© ACME Company
            </p>
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    </div>

    {% raw %}{%{% endraw %} block icons {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} include atom('icon-sprite') only {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

</details>

Now, open the front page of Spryker Shop. The new component will appear on the top of the page, below the header.

![New component counter](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Customize+Frontend/new-component-counter.png)
