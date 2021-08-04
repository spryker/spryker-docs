---
title: Customizing Spryker front end
originalLink: https://documentation.spryker.com/v6/docs/customizing-spryker-front-end
redirect_from:
  - /v6/docs/customizing-spryker-front-end
  - /v6/docs/en/customizing-spryker-front-end
---

Spryker frontend user interface can be customized and extended to meet the needs of your business. You can change the layout, styles and behavior of existing components, as well as create components on your own.

There are 3 aspects of Spryker user interface that can be extended:

* views, templates and layout of components comprising the frontend (_Twig_)
* styles (_SASS_)
* component behavior (_Typescript_ or _Javascript_)

In the following guide, we will review customizing Spryker UI on each of these levels.

## Twig
The visual layout of each component, be that a molecule or a whole organism, is defined using Symphony Twig. Twig is a template language for defining the HTML code of pages rendered dynamically. It is a common technology used for building web components, like the ones that comprise Spryker atomic frontend.

{% info_block infoBox %}
For more information on Twig basics, see [Twig Homepage](https://twig.symfony.com/
{% endinfo_block %}.)

After you integrate Spryker Shop application in your project, all UI components shipped with Spryker will be located in `vendor/spryker-shop`. The layout of any of them can be overridden on the project level. For this purpose, you need to create a Twig file with your own layout in folder `src/Pyz/Yves`. To override the structure of any component, the Twig file name must be the same as the name of the Twig template you want to override, and also the folder structure must replicate the structure of the component you are overriding.

To extend an existing component template, first, you need to copy the whole Twig you are extending to the project level, and then add your own code to the project-level file. For instance, if you need to add a new component to the main layout of the whole Shop Suite, you need to copy the layout to your project level, and then make changes to the project-level file. To do this, copy file `page-layout-main.twig` to your project level to `src/Pyz/Yves/ShovarpUi/Theme/default/templates/page-layout-main/page-layout-main.twig`. Then, make changes as follows:

**page-layout-main.twig**
    
```twig
{% raw %}{%{% endraw %} extends template('page-blank') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %}- block class -{% raw %}%}{% endraw %}js-page-layout-main__side-drawer-container{% raw %}{%{% endraw %}- endblock -{% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} block notifications {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} include organism('notification-area') only {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block sidebar {% raw %}%}{% endraw %}
        {#
            Use a new component
        #}
        {% raw %}{%{% endraw %} include organism('new-existing-component-side-drawer') with {
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

Let us also review how to extend the Twig template of a molecule. By default, the front page of Spryker Shop displays a list of available products. Each product in the list is displayed by component called `product-card`. We will add product images to those cards.

1. The default implementation of the component is located in the following file: `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-card/product-card.twig`. To override it, we need to create the following file in the following folder: `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-card/product-card.twig`. Now, our Twig on the project level will override the global-level Twig. This means that whenever the `product-card` component is used, the file we created will be used instead of the default one. Also, copy the content of the default `product-card.twig` file to the project-level Twig to copy the template of the source component.
2. Now, we need to add the product image to the component. The Twig block enclosed in the `{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}` tags contains the main content of the component. Let us place product images before it. The block with images looks as follows:

```twig
{% raw %}{%{% endraw %} block image {% raw %}%}{% endraw %}
   <a href="{% raw %}{{{% endraw %}data.url{% raw %}}}{% endraw %}">
        {% raw %}{%{% endraw %} include atom('thumbnail') with {
            class: 'js-product-color-group__image-' ~ data.abstractId,
            attributes: {
                alt: data.name,
                src: data.imageUrl,
                title: data.name
            }
        } only {% raw %}%}{% endraw %}
   </a>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

**Resulting Twig File**
    
```twig
{% raw %}{%{% endraw %} extends molecule('card') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define config = {
    name: 'product-card',
    tag: 'article'
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
    name: required,
    abstractId: required,
    url: required,
    imageUrl: required,
    price: required,
    originalPrice: null
} {% raw %}%}{% endraw %}

{#
    New content that is different from the original template
#}
{% raw %}{%{% endraw %} block image {% raw %}%}{% endraw %}
    <a href="{% raw %}{{{% endraw %}data.url{% raw %}}}{% endraw %}">
        {% raw %}{%{% endraw %} include atom('thumbnail') with {
            class: 'js-product-color-group__image-' ~ data.abstractId,
            attributes: {
                alt: data.name,
                src: data.imageUrl,
                title: data.name
            }
        } only {% raw %}%}{% endraw %}
    </a>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
{#
    Original template starts here
#}
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} block labels {% raw %}%}{% endraw %}
        {% raw %}{{{% endraw %} widget('ProductAbstractLabelWidgetPlugin', data.abstractId) {% raw %}}}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block groups {% raw %}%}{% endraw %}
        {% raw %}{{{% endraw %} widget('ProductGroupWidgetPlugin', data.abstractId) {% raw %}}}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block name {% raw %}%}{% endraw %}
    <strong>{% raw %}{{{% endraw %}data.name{% raw %}}}{% endraw %}</strong>
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block rating {% raw %}%}{% endraw %}
        {% raw %}{{{% endraw %} widget('ProductAbstractReviewWidgetPlugin', data.abstractId) {% raw %}}}{% endraw %}
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block price {% raw %}%}{% endraw %}
        <p>
            {% raw %}{%{% endraw %} include molecule('price') with {
                data: {
                    amount: data.price | money,
                    originalAmount: data.originalPrice is empty ? null : (data.originalPrice | money)
                }
            } only {% raw %}%}{% endraw %}
    </p>
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

3. Now, let us open the start page of Spryker Shop. It will look like this:

In addition to extending templates of existing components, you can as well create components on your own. When creating a component, you can also define how it looks like, and this is also done in Twig. For detailed information, see the _Create Component Template_ section in [Tutorial - Frontend - Create a Component](https://documentation.spryker.com/docs/t-create-component).

## Styles
Another important aspect you can override are styles. The global styles are defined in the following folder: `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles`. The same as Twig, you can extend the global styles on your local project level or even replace them. For this purpose, you need to create your own style files in the following folder `src/Pyz/Yves/ShopUi/Theme/default/styles`. You can use the following files for your project styles:

* `shared.scss` - can be used for global SASS variables, functions and mixins. This file can be used to override the topmost styles and settings of your project, like background color and foreground colors, fonts, spacings, grid settings, visual effects, spliters etc.
* `basic.scss` - can be used for global styles like reset or typography.
* `util.scss` - can be used for utility stles, like reset, align or is-hidden implementations.

{% info_block infoBox %}
For detailed information on global styles, see the _SASS Layer_ section in [Atomic Frontend](https://documentation.spryker.com/docs/atomic-frontend#sass-layer
{% endinfo_block %}.)

Typical implementations on the project level look as follows:

* **shared.scss**

```SCSS
@import '~ShopUi/styles/shared';
```

* **basic.scss**

```SCSS
@import '~ShopUi/styles/basic';

@include basic-reset;
@include basic-typography;
@include basic-grid;
@include basic-animation;
```

* **util.scss**

```SCSS
@import '~ShopUi/styles/util';

@include util-spacing;
@include util-text;
@include util-float;
@include util-visibility
```

In addition to global styles, each component can have it own styles. For information on how to define styles for a component, see [Tutorial - Frontend - Create a Component](https://documentation.spryker.com/docs/t-create-component) and [Tutorial - Frontend - Override a Component](https://documentation.spryker.com/docs/t-override-component).

## Behavior
The behavior of different components is defined by Javascript. For stricter typing and better code quality, we recommend using a strong-typed subset of Javascript called _Typescript_. It is enforced by default. However, you can always switch to regular ES6-ES7 Javascript by modifying the tsconfig.json file located in the root folder of your local Spryker code installation. You need to add the `allowJs` option to the `compilerOptions` section and set it to `true`:

```json
{
    "compilerOptions": {
        "allowJs": true,
        ...
    }
}
```

All component assets are compiled using a bundler called Webpack. Spryker Shop Application (Shop UI) can have 3 entry points for Webpack on the project level. They should be located in the root folder of the Shop UI (`src/Pyz/Yves/ShopUi/Theme/default`). The entry points are as follows (in processing order):

* `es6-polyfill.ts`

Contains polyfills required to make ES6 features (promises, sets, maps, arrays etc) available in older browsers, like IE11. You can add and remove as many polyfills as you may need for your project.

**Recommended Polyfills**

```JavaScript
// ES6 polyfill
import 'core-js/fn/promise';
import 'core-js/fn/array';
import 'core-js/fn/set';
import 'core-js/fn/map';

// Check if the browser natively supports web components nd ES6
const hasNativeCustomElements = !!window.customElements;

// Load a shim for ES5 transpilers (typescript or babel)
// https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs
if (hasNativeCustomElements) {
    import(/* webpackMode: "eager" */'@webcomponents/webcomponentsjs/custom-elements-es5-adapter');
}
```

* `vendor.ts`

Contains external dependencies for the system. It is recommended to use this file for dependencies as Webpack will load the dependency code only once, and then references will be provided per request.

Out of the box, the _Web Components_ dependency is provided. You can add your own dependencies depending on the project needs (e.g. _jquery_, _recat_, _vue_ etc).

**Default Dependencies**
    
```Javascript
// Add webcomponents polyfill
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
```

* `app.ts`

This file contains the bootstrap code. Basically, this code simply loads the components. You can change the logic of how the application starts here. For example, this file can be used to add `document.ready` for _jquery_, main `conatiner/fragment` rendering for _react_ and so on.

**Default Bootstrap**
    
```Javascript
import { bootstrap } from 'ShopUi/app';
bootstrap();
```

Additional information on bootstrap implementation can be found in the application folder here: `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/app`.

Apart from Webpack bootstrap, each component can have its own logic defined in the dedicated component Javascript or Typescript. For information on how to define component behavior, see [Tutorial - Frontend - Create a Component](https://documentation.spryker.com/docs/t-create-component), [Tutorial - Frontend - Extend a Component](https://documentation.spryker.com/docs/t-extend-component) and [Tutorial - Frontend - Override a Component](https://documentation.spryker.com/docs/t-override-component).

## Installing Dependencies
Spryker Shop Application comes with a set of dependencies required to run the application. The dependency list can be found in the `package.json` file. You can add dependencies on your own. For example, you can add _recat_, _foundation_, _jquery_ or customize Webpack with _file-loader_ etc. For this purpose, create an SSH session to your virtual machine with `vagrant ssh` and execute the following commands:

* `npm install --save dependency-name` - for application dependencies;
* `npm install --save-dev dev-dependency-name` - for Webpack and tooling dependencies.

The dependencies will be installed and written to `package.json` and `package-lock.json` files.

