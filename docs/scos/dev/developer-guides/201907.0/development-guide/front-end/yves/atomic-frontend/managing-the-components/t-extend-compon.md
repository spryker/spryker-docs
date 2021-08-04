---
title: Extending a Component
originalLink: https://documentation.spryker.com/v3/docs/t-extend-component
redirect_from:
  - /v3/docs/t-extend-component
  - /v3/docs/en/t-extend-component
---

With the idea of [atomic design](https://documentation.spryker.com/v4/docs/atomic-frontend) implemented in Spryker frontend, you have the possibility to develop each functional element of user interface in a self-contained, isolated container called a component. The frontend design allows you not only to [create components](/docs/scos/dev/developer-guides/202001.0/development-guide/front-end/yves/atomic-frontend/managing-the-components/t-create-compon) on your own, but also [replace](/docs/scos/dev/developer-guides/202001.0/development-guide/front-end/yves/atomic-frontend/managing-the-components/t-extend-compon) any of them with a component that suits your needs better. But what if you do not want to replace a component? You can create a new component on the basis of an existing one. In this case, you will be able to use both the new component and the source one at the same time.

Let us review the process of extending a component on the example of **side-drawer**. This component appears in Spryker Shop only on mobile screens. You can access it by clicking the menu button.

![Open side drawer](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Customize+Frontend/open-side-drawer.png){height="" width=""}

The following tutorial shows how to create a new component based on the default side drawer. The new side drawer will show an alert whenever it is present on a page. Also, the component outlook will be different.

## 1. Create Component Folder
The first thing we need to do is create a folder for the new component. Since we are going to implement it on the project level, we need to create a folder in `src/Pyz/Yves/ShopUi`. The side drawer is an organism, so let us create the following folder: `src/Pyz/Yves/ShopUi/Theme/default/components/**organisms**/new-existing-component-side-drawer`.

We are going to add new behavior, so the new component will have Javascript code. This requires an entry point for Webpack. To be able to add it, create an empty file named `index.ts` in the component folder.

## 2. Override Component on the Twig Level
No, we need to specify a name for the new component. Also, the component implements its own behavior, so we also need a to use a custom HTML tag to render it. We'll use the component name as the tag name. Let us create file `new-existing-component-side-drawer.twig` and add the **config** property as follows:

```twig
{% raw %}{%{% endraw %} extends organism('side-drawer') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define config = {
    name: 'new-existing-component-side-drawer',
    tag: 'new-existing-component-side-drawer'
} {% raw %}%}{% endraw %}
```

As you can see in the above code, the Twig of the new component extends the original side-drawer component.

Now, let us customize the template of the source component. The original template is defined in `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/organisms/side-drawer/side-drawer.twig`. The only change we are going to add is a different icon in the **close** block. To do this, add the following to `new-existing-component-side-drawer.twig`:

```twig
{% raw %}{%{% endraw %} block close {% raw %}%}{% endraw %}
    <div class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__close">
        <a href="#" class="link link--alt {% raw %}{{{% endraw %}attributes['trigger-selector']{% raw %}}}{% endraw %}">
            {% raw %}{{{% endraw %}'global.close' | trans{% raw %}}}{% endraw %}
            {% raw %}{%{% endraw %} include atom('icon') with {
                data: {
                    name: 'star'
                }
            } only {% raw %}%}{% endraw %}
        </a>
   </div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

## 3. Change Styles
Apart from changing the icon, we are going to use different colors. This can be done via styles.

First of all, we need to inherit the styles of the source component (_side-drawer_). It has a mixin called **shop-ui-side-drawer**. Since it is a core component shipped with Spryker Shop Suite, this mixin is shared. Therefore, it can be accessed everywhere in Shop UI. To inherit the styles, we need to include the mixin in the _SCSS_ file of our new component. To render the block, elements and modifiers with the class name of the new component, we need to pass its class name to the mxin.

Let us create file `new-existing-component-side-drawer.scss`, include the original mixin of the _side-drawer_ component, and pass the class name of the new component we are creating:

```css
@include shop-ui-side-drawer('.new-existing-component-side-drawer') {

}
```

We will change the main and overlay colors:

```css
@include shop-ui-side-drawer('.new-existing-component-side-drawer') {
    color: $setting-color-alt;

    &__overlay {
        background-color: $setting-color-main;
    }
}
```

{% info_block warningBox %}
You can find settings for the respective colors in configuration files. They are located in `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles/settings`.
{% endinfo_block %}

After defining the styles, let us make them visible to Webpack. Open the `index.ts` file and add the following content:

```Javascript
// Import component style
import './new-existing-component-side-drawer.scss';
```

## 4. Modify Behavior
Finally, let us define what the component does. Create the `new-existing-component-side-drawer.ts`file with the following content:

```Javascript
// Import class SideDrawer
import SideDrawer from 'ShopUi/components/organisms/side-drawer/side-drawer';

// export the extended class
export default class NewSideDrawer extends SideDrawer {
    protected readyCallback(): void {
        super.readyCallback();

        alert('New side drawer');
    }
}
```

In the above example, first, we import class **SideDrawer** from the global level. After that, we export a new class, `NewSideDrawer`. Since it extends the class of the default side drawer component, it also inherits its behavior.

{% info_block warningBox %}
If you want to define the component behavior from scratch rather than importing the behavior of a default component, you need to extend the base Component class instead
{% endinfo_block %}

```Javascript
:import Component from 'ShopUi/models/component';

export default class NewSideDrawer extends Component {
         // TODO: your code here
}
```

After implementing the component behavior, let us register it to the HTML tag of the new component. The tag name was defined in Twig on step **2**. Open the `index.ts` file again and add the following content:

```Javascript
// Import the 'register' function from the Shop Application
import register from 'ShopUi/app/registry';

// Register the component
// (in thei example, the original component tag is side-drawer)
export default register(
    'new-existing-component-side-drawer',
    () => import(/* webpackMode: "eager" */'./new-existing-component-side-drawer')
);
```

When importing the component, the **eager** keyword is used, as the component is used on every page, and we want it to be always available and loaded.

## 5. Build Frontend
Now, let us build the frontend. Run the following command in the console: `npm run yves`.

As soon as the frontend has been compiled, replace the original side drawer with the new implementation. To do this:

* Copy the file `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/page-layout-main/page-layout-main.twig` to `src/Pyz/Yves/ShopUi/Theme/default/page-layout-main/page-layout-main.twig`. Doing so overrides the default main page on the project level.
* Open the copied file.
* Replace the following line: `{% raw %}{%{% endraw %} include organism('side-drawer') with {` with this one:`{% raw %}{%{% endraw %} include organism('new-existing-component-side-drawer') with {`
* Save the file.

Now, whenever you access a page with a side drawer in Spryker Shop, you will get an alert from the new side drawer.

![Side drawer](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Customize+Frontend/side-drawer-notification.png){height="" width=""}

Also, the drawer itself has a new outlook.

![New side drawer](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Customize+Frontend/new-side-drawer.png){height="" width=""}

<!-- Last review date: Nov 19, 2018 -by Volodymyr Volkov-->
