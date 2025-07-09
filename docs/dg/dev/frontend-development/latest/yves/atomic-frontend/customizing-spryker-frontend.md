---
title: Customizing Spryker frontend
description: This guide reviews customizing Spryker UI on each of these levels.
last_updated: Aug 31, 2022
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/customizing-spryker-front-end
originalArticleId: 55fa7cff-928c-4fb4-ad8e-3acb63774bc3
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/yves/atomic-frontend/customizing-spryker-front-end.html
  - /docs/scos/dev/front-end-development/yves/atomic-frontend/customizing-spryker-front-end.html
related:
  - title: Atomic Frontend - general overview
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/atomic-frontend.html
  - title: Integrating JQuery into Atomic Frontend
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/integrate-jquery-into-atomic-frontend.html
  - title: Integrating React into Atomic Frontend
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/integrate-react-into-atomic-frontend.html
---

Spryker Frontend user interface can be customized and extended to meet the needs of your business. You can change the layout, styles, and behavior of existing components, as well as create components on your own.

There are three aspects of the Spryker user interface that can be extended:
- Views, templates, and layout of components comprising the frontend (*Twig*)
- Styles (*SASS*)
- Component behavior (*Typescript* or *Javascript*)

This guide reviews customizing Spryker UI on each of these levels.

## Twig

The visual layout of each component, whether it's a molecule or a whole organism, is defined using Symphony Twig. Twig is a template language for defining the HTML code of pages rendered dynamically. It is a common technology used for building web components, like the ones that comprise Spryker Atomic Frontend.

For more information about Twig basics, see [Twig Homepage](https://twig.symfony.com/).


After integrating the Spryker Shop application into your project, all UI components shipped with Spryker are located in `vendor/spryker-shop`. The layout of any of them can be overridden on the project level. For this, create a Twig file with your own layout in the `src/Pyz/Yves` folder. To override the structure of any component, the Twig file name must be the same as the name of the Twig template you want to override, and also the folder structure must replicate the structure of the component you are overriding.

To extend an existing component template, you need to copy the whole Twig you are extending to the project level, and then add your own code to the project-level file. For instance, if you need to add a new component to the main layout of the whole Shop Suite, copy the layout to your project level, and then make changes to the project-level file. To do this, copy file `page-layout-main.twig` to your project level to `src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig`. Then, make changes as follows:

<details><summary>page-layout-main.twig</summary>

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

</details>

Let's see how to extend the Twig template of a molecule. By default, the front page of Spryker Shop displays a list of available products. Each product in the list is displayed by the `product-card` component. Let's add product images to those cards.

1. The default implementation of the component is located in the following file: `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-card/product-card.twig`. To override it, create the following file in the following folder: `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-card/product-card.twig`. The Twig on the project level overrides the global-level Twig. This means that whenever the `product-card` component is used, the created file is used instead of the default one. Also, copy the content of the default `product-card.twig` file to the project-level Twig to copy the template of the source component.
2. Add the product image to the component. The Twig block enclosed in the `{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}` tags contains the main content of the component. Let's place product images before it. The block with images looks as follows:

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

<details><summary>Resulting Twig file</summary>

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

</details>

3. Open the start page of Spryker Shop. It looks as follows:

In addition to extending templates of existing components, you can create components on your own. When creating a component, you can define what it looks like in Twig. For detailed information, see the *2. Define a template* section in [Tutorial: Frontend - Create a Component](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/creating-components.html#define-a-template).

## Styles

Another important aspect you can override is styles. The global styles are defined in the following folder: `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles`. The same as Twig, you can extend the global styles on your local project level or even replace them. For this purpose, you need to create your own style files in the following folder `src/Pyz/Yves/ShopUi/Theme/default/styles`. You can use the following files for your project styles:

- `shared.scss`. You can use it for global SASS variables, functions, and mixins and for overriding the topmost styles and settings of your project, like background color and foreground colors, fonts, spacings, grid settings, visual effects, and splitters.
- `basic.scss`. You can use it for global styles like reset or typography.
- `util.scss`. You can use it for utility stYles, like reset, align, or is-hidden implementations.

{% info_block infoBox %}

For detailed information about global styles, see the *SASS Layer* section in [Atomic Frontend general overview](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/atomic-frontend.html#sass-layer).

{% endinfo_block %}

Typical implementations on the project level look as follows:

- **`shared.scss`**

```SCSS
@import '~ShopUi/styles/shared';
```

- **`basic.scss`**

```SCSS
@import '~ShopUi/styles/basic';

@include basic-reset;
@include basic-typography;
@include basic-grid;
@include basic-animation;
```

- **`util.scss`**

```SCSS
@import '~ShopUi/styles/util';

@include util-spacing;
@include util-text;
@include util-float;
@include util-visibility
```

In addition to global styles, each component can have its own styles. For information about defining styles for a component, see the following tutorials:
- [Tutorial: Frontend - Create a Component](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/creating-components.html)
- [Tutorial: Frontend - Override a Component](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/overriding-components.html)

## Behavior

The behavior of different components is defined by Javascript. For stricter typing and better code quality, we recommend using a strong-typed subset of Javascript called *Typescript*. It is enforced by default. However, you can always switch to regular ES6-ES7 Javascript by modifying the `tsconfig.json` file located in the root folder of your local Spryker code installation. You need to add the `allowJs` option to the `compilerOptions` section and set it to `true`:

```json
{
    "compilerOptions": {
        "allowJs": true,
        ...
    }
}
```

All component assets are compiled using a bundler called Webpack. Spryker Shop Application (Shop UI) can have three entry points for Webpack on the project level. They are located in the root folder of the Shop UI (`src/Pyz/Yves/ShopUi/Theme/default`). The entry points are as follows (in processing order):

- `vendor.ts`. It contains external dependencies for the system. We recommend using this file for dependencies as Webpack loads the dependency code only once, and then references are provided per request.

You can add your own dependencies depending on the project needs—for example, *jquery*, *react*, *vue*).

- `app.ts`. This file contains the bootstrap code, which simply loads the components. You can change the logic of how the application starts here. For example, this file can be used to add `document.ready` for *jquery*, main `conatiner/fragment` rendering for *react* and so on.

**Default Bootstrap**

```js
import { bootstrap } from 'ShopUi/app';
bootstrap();
```

You can find additional information about bootstrap implementation in the application folder `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/app`.

Apart from Webpack bootstrap, each component can have its own logic defined in the dedicated component Javascript or Typescript. For information about defining component behavior, see the folloing tutorials:
- [Tutorial: Frontend - Create a Component](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/creating-components.html)
- [Tutorial: Frontend - Extend a Component](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/extending-components.html)
- [Tutorial: Frontend - Override a Component](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/overriding-components.html)

## Installing dependencies

Spryker Shop Application comes with a set of dependencies required to run the application. The dependency list can be found in the `package.json` file. You can add dependencies on your own. For example, you can add *react*, *foundation*, *jquery*, or customize Webpack with *file-loader*. For this purpose, create an SSH session to your virtual machine with `vagrant ssh` and execute the following commands:
- `npm install --save dependency-name`—for application dependencies.
- `npm install --save-dev dev-dependency-name`—or Webpack and tooling dependencies.

The dependencies are installed and written to `package.json` and `package-lock.json` files.
