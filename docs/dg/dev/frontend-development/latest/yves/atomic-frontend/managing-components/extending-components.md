---
title: Extending components
last_updated: Aug 5, 2026
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-extend-component
originalArticleId: b51d63f2-d18b-4383-8e17-dd87379c1271
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/yves/atomic-frontend/managing-the-components/extending-a-component.html
  - /docs/scos/dev/front-end-development/yves/atomic-frontend/managing-the-components/extending-a-component.html
related:
  - title: Creating a Component
    link: docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/creating-components.html
  - title: Using a Component
    link: docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/using-components.html
  - title: Overriding a Component
    link: docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/overriding-components.html
---

With the idea of [atomic design](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/atomic-frontend.html) implemented in Spryker Frontend, you have the possibility to develop each functional element of user interface in a self-contained, isolated container called a component. The frontend design allows you not only to [create components](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/creating-components.html) on your own, but also [replace](/docs/dg/dev/frontend-development/latest/yves/atomic-frontend/managing-components/extending-components.html) any of them with a component that suits your needs better. But what if you do not want to replace a component? You can create a new component on the basis of an existing one. In this case, you will be able to use both the new component and the source one at the same time.

Let us review the process of extending a component on the example of **side-drawer**. This component appears in Spryker Shop only on mobile screens. You can access it by clicking the menu button.

![Open side drawer](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Customize+Frontend/open-side-drawer.png)

The following tutorial shows how to create a new component based on the default side drawer. The new side drawer will show an alert whenever it's present on a page. Also, the component outlook will be different.

## 1. Create component folder

The first thing we need to do is create a folder for the new component. Since we are going to implement it on the project level, we need to create a folder in `src/Pyz/Yves/ShopUi`. The side drawer is an organism, so let us create the following folder: `src/Pyz/Yves/ShopUi/Theme/default/components/**organisms**/new-existing-component-side-drawer`.

We are going to add new behavior, so the new component will have Javascript code. This requires an entry point for Webpack. To be able to add it, create an empty file named `index.ts` in the component folder.

## 2. Override component on the twig level

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

## 3. Change styles

Apart from changing the icon, we are going to use different colors. This can be done via styles.

First of all, we need to inherit the styles of the source component (*side-drawer*). It has a mixin called **shop-ui-side-drawer**. The builder resolves component mixins through its mixin index, so the mixin can be included in any component SCSS file without imports. To render the block, elements and modifiers with the class name of the new component, we need to pass its class name to the mixin.

The styles of the new component consist of two files: the component SCSS file defines the mixin of the new component, and `style.scss` is the style entry point that emits it. Let us create file `new-existing-component-side-drawer.scss`, include the original mixin of the *side-drawer* component, and pass the class name of the new component as the default value of the `$name` parameter:

```css
@mixin new-existing-component-side-drawer($name: '.new-existing-component-side-drawer') {
    @include shop-ui-side-drawer($name);
}
```

We will change the main and overlay colors. The source mixin emits its `@content` block after its own nested rules, so pass the nested rules as content and add the base declarations in a separate rule:

```css
@mixin new-existing-component-side-drawer($name: '.new-existing-component-side-drawer') {
    @include shop-ui-side-drawer($name) {
        &__overlay {
            background-color: $setting-color-main;
        }
    }

    #{$name} {
        color: $setting-color-alt;
    }
}
```

Now let us create file `style.scss`—the style entry point of the new component—and emit the mixin from it. The entry point must not define styles of its own: it only includes the component mixin, wrapped in `helper-import` so that the component stays excludable through the `$setting-import-blacklist` setting:

```css
@include helper-import(organism, new-existing-component-side-drawer) {
    @include new-existing-component-side-drawer;
}
```

{% info_block warningBox %}

You can find settings for the respective colors in configuration files. They are located in `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles/settings`.

{% endinfo_block %}

After defining the styles, let us load them from the component entry point. Open the `index.ts` file and add the following content:

```js
// Load the component styles
import './style';
```

### Extend base styles with a base hook

Starting from `spryker-shop/shop-ui` version 2.0.0 (which ships [frontend builder v2](/docs/dg/dev/frontend-development/latest/yves/frontend-builder-for-yves-v2.html)), there is an additional way to customize a core component: **base hooks**. A base hook lets you add or override declarations in the *base* of a core component—everywhere the component is rendered—without copying the component to the project level.

Base hooks are not limited to ShopUi: the components of the other storefront modules expose them too. The modules were released together with the builder—`spryker-shop/shop-ui` as a major version, all the others as minor versions. Modules that ship component styles received the base hooks and the Sass `mixed-decls` fix; the remaining ones only update their ShopUi constraint.

Updating is optional: the builder compiles older module versions as is. Update the modules whose components you customize to at least the following versions:

<details><summary>Module versions released with builder v2</summary>

| Module | Minimum version |
| --- | --- |
| `spryker-shop/shop-ui` | `^2.0.0` |
| `spryker/multi-factor-auth` | `^2.6.0` |
| `spryker-feature/ai-commerce` | `^0.7.8` |
| `spryker-feature/buy-box` | `^1.4.0` |
| `spryker-feature/order-experience-management` | `^0.2.0` |
| `spryker-feature/purchasing-control` | `^1.2.0` |
| `spryker-feature/self-service-portal` | `^20.12.0` |
| `spryker-shop/agent-page` | `^1.25.0` |
| `spryker-shop/agent-widget` | `^1.4.0` |
| `spryker-shop/availability-widget` | `^1.5.0` |
| `spryker-shop/barcode-widget` | `^1.1.0` |
| `spryker-shop/business-on-behalf-widget` | `^1.3.0` |
| `spryker-shop/calculation-page` | `^1.4.0` |
| `spryker-shop/cart-note-widget` | `^1.7.0` |
| `spryker-shop/cart-page` | `^3.60.0` |
| `spryker-shop/cart-reorder-page` | `^1.2.0` |
| `spryker-shop/catalog-page` | `^1.37.0` |
| `spryker-shop/category-image-storage-widget` | `^1.1.0` |
| `spryker-shop/category-widget` | `^1.6.0` |
| `spryker-shop/checkout-page` | `^3.43.0` |
| `spryker-shop/checkout-widget` | `^1.5.0` |
| `spryker-shop/click-and-collect-page-example` | `^0.4.0` |
| `spryker-shop/cms-block-widget` | `^2.5.0` |
| `spryker-shop/cms-page` | `^1.9.0` |
| `spryker-shop/cms-search-page` | `^1.6.0` |
| `spryker-shop/comment-widget` | `^1.5.0` |
| `spryker-shop/company-page` | `^2.37.0` |
| `spryker-shop/company-user-agent-widget` | `^1.2.0` |
| `spryker-shop/company-user-invitation-page` | `^2.6.0` |
| `spryker-shop/company-widget` | `^1.11.0` |
| `spryker-shop/configurable-bundle-note-widget` | `^1.2.0` |
| `spryker-shop/configurable-bundle-page` | `^1.5.0` |
| `spryker-shop/configurable-bundle-widget` | `^1.10.0` |
| `spryker-shop/content-navigation-widget` | `^1.7.0` |
| `spryker-shop/content-product-widget` | `^1.5.0` |
| `spryker-shop/currency-widget` | `^1.7.0` |
| `spryker-shop/customer-page` | `^2.83.0` |
| `spryker-shop/customer-reorder-widget` | `^6.18.0` |
| `spryker-shop/date-time-configurator-page-example` | `^0.8.0` |
| `spryker-shop/discount-promotion-widget` | `^3.8.0` |
| `spryker-shop/discount-widget` | `^1.10.0` |
| `spryker-shop/error-page` | `^1.12.0` |
| `spryker-shop/file-manager-widget` | `^2.2.0` |
| `spryker-shop/gift-card-widget` | `^1.3.0` |
| `spryker-shop/home-page` | `^1.3.0` |
| `spryker-shop/language-switcher-widget` | `^1.9.0` |
| `spryker-shop/merchant-product-offer-widget` | `^2.9.0` |
| `spryker-shop/merchant-product-widget` | `^1.8.0` |
| `spryker-shop/merchant-profile-widget` | `^1.3.0` |
| `spryker-shop/merchant-registration-request-page` | `^1.1.0` |
| `spryker-shop/merchant-relation-request-page` | `^1.3.0` |
| `spryker-shop/merchant-relation-request-widget` | `^1.1.0` |
| `spryker-shop/merchant-relationship-page` | `^1.1.0` |
| `spryker-shop/merchant-relationship-widget` | `^1.1.0` |
| `spryker-shop/merchant-sales-return-widget` | `^1.2.0` |
| `spryker-shop/merchant-search-widget` | `^1.1.0` |
| `spryker-shop/merchant-switcher-widget` | `^0.9.0` |
| `spryker-shop/merchant-widget` | `^1.6.0` |
| `spryker-shop/money-widget` | `^1.8.0` |
| `spryker-shop/multi-cart-page` | `^2.9.0` |
| `spryker-shop/multi-cart-widget` | `^1.11.0` |
| `spryker-shop/newsletter-page` | `^1.3.0` |
| `spryker-shop/newsletter-widget` | `^1.9.0` |
| `spryker-shop/order-cancel-widget` | `^1.2.0` |
| `spryker-shop/order-custom-reference-widget` | `^1.2.0` |
| `spryker-shop/payment-app-widget` | `^1.4.0` |
| `spryker-shop/persistent-cart-share-widget` | `^1.4.0` |
| `spryker-shop/price-product-volume-widget` | `^1.10.0` |
| `spryker-shop/price-widget` | `^1.5.0` |
| `spryker-shop/product-alternative-widget` | `^1.7.0` |
| `spryker-shop/product-barcode-widget` | `^1.2.0` |
| `spryker-shop/product-bundle-widget` | `^1.9.0` |
| `spryker-shop/product-category-widget` | `^1.10.0` |
| `spryker-shop/product-comparison-page` | `^1.1.0` |
| `spryker-shop/product-comparison-widget` | `^1.1.0` |
| `spryker-shop/product-configuration-cart-widget` | `^1.1.0` |
| `spryker-shop/product-configuration-shopping-list-widget` | `^1.1.0` |
| `spryker-shop/product-configuration-widget` | `^1.1.0` |
| `spryker-shop/product-configuration-wishlist-widget` | `^1.1.0` |
| `spryker-shop/product-detail-page` | `^3.33.0` |
| `spryker-shop/product-group-widget` | `^1.13.0` |
| `spryker-shop/product-image-widget` | `^1.1.0` |
| `spryker-shop/product-label-widget` | `^1.7.0` |
| `spryker-shop/product-measurement-unit-widget` | `^1.5.0` |
| `spryker-shop/product-new-page` | `^1.5.0` |
| `spryker-shop/product-offer-service-point-availability-widget` | `^1.3.0` |
| `spryker-shop/product-option-widget` | `^1.6.0` |
| `spryker-shop/product-packaging-unit-widget` | `^1.9.0` |
| `spryker-shop/product-relation-widget` | `^1.5.0` |
| `spryker-shop/product-replacement-for-widget` | `^1.8.0` |
| `spryker-shop/product-review-widget` | `^1.20.0` |
| `spryker-shop/product-search-widget` | `^3.8.0` |
| `spryker-shop/product-set-detail-page` | `^1.12.0` |
| `spryker-shop/product-set-list-page` | `^1.3.0` |
| `spryker-shop/product-set-widget` | `^1.11.0` |
| `spryker-shop/product-widget` | `^1.7.0` |
| `spryker-shop/quick-order-page` | `^4.15.0` |
| `spryker-shop/quote-approval-widget` | `^1.6.0` |
| `spryker-shop/quote-request-agent-page` | `^3.6.0` |
| `spryker-shop/quote-request-agent-widget` | `^2.7.0` |
| `spryker-shop/quote-request-page` | `^3.7.0` |
| `spryker-shop/quote-request-widget` | `^2.6.0` |
| `spryker-shop/sales-configurable-bundle-widget` | `^1.7.0` |
| `spryker-shop/sales-order-amendment-widget` | `^1.2.0` |
| `spryker-shop/sales-order-threshold-widget` | `^1.2.0` |
| `spryker-shop/sales-product-bundle-widget` | `^1.3.0` |
| `spryker-shop/sales-product-configuration-widget` | `^1.2.0` |
| `spryker-shop/sales-return-page` | `^1.12.0` |
| `spryker-shop/sales-service-point-widget` | `^1.3.0` |
| `spryker-shop/service-point-widget` | `^1.8.0` |
| `spryker-shop/shared-cart-page` | `^2.6.0` |
| `spryker-shop/shared-cart-widget` | `^1.8.0` |
| `spryker-shop/shipment-type-widget` | `^1.6.0` |
| `spryker-shop/shopping-list-note-widget` | `^1.2.0` |
| `spryker-shop/shopping-list-page` | `^1.11.0` |
| `spryker-shop/shopping-list-widget` | `^1.7.0` |
| `spryker-shop/tabs-widget` | `^1.1.0` |
| `spryker-shop/traceable-event-widget` | `^1.3.0` |
| `spryker-shop/wishlist-page` | `^1.15.0` |
| `spryker-shop/wishlist-widget` | `^1.4.0` |

</details>

Every ShopUi component mixin includes an optional hook mixin at the top of its base block, before any element and modifier rules:

```css
@mixin shop-ui-side-drawer($name: '.side-drawer') {
    #{$name} {
        @if meta.mixin-exists(shop-ui-side-drawer-base-hook) {
            @include shop-ui-side-drawer-base-hook;
        }
        // ... element and modifier rules
    }
}
```

To use it, define a mixin named `<component-mixin-name>-base-hook` in a project-level component SCSS file:

```css
@mixin shop-ui-side-drawer-base-hook {
    color: $setting-color-alt;
}
```

The builder's mixin index picks the definition up automatically and wires it into the core component at compile time—no imports needed. The declarations are emitted inside the component's base selector, before its nested rules.

{% info_block infoBox "Why base hooks exist" %}

Base hooks fix a Sass cascade problem. Styles added through the component mixin's body (the `@content` block) are emitted *after* the component's nested rules, such as `&__overlay` or `&--show`. Since Sass 1.92, declarations that follow nested rules are no longer hoisted to the top of the parent rule (the `mixed-decls` deprecation): they stay in source order, which triggers deprecation warnings and can flip which rule wins at equal specificity—base declarations placed after a modifier would override the modifier.

In `spryker-shop/shop-ui` 2.0.0, the core styles were fixed to emit base declarations before nested rules, and base hooks give project code a safe place to contribute base declarations in the correct position. Unlike the v1 builder, builder v2 doesn't silence Sass deprecation warnings, so any remaining `mixed-decls` cases in your project code are visible in the build output and should be fixed the same way.

{% endinfo_block %}

Use the base hook when you want to change the base styles of the original component itself. Use the mixin-include approach described above when you're building a new component based on an existing one.

## 4. Modify behavior

Finally, let us define what the component does. Create the `new-existing-component-side-drawer.ts`file with the following content:

```js
// Import class SideDrawer
import SideDrawer from 'ShopUi/components/organisms/side-drawer/side-drawer';

// export the extended class
export default class NewSideDrawer extends SideDrawer {
    protected init(): void {
        super.init();

        alert('New side drawer');
    }
}
```

In the above example, first, we import class **SideDrawer** from the global level. After that, we export a new class, `NewSideDrawer`. Since it extends the class of the default side drawer component, it also inherits its behavior.

{% info_block warningBox %}

If you want to define the component behavior from scratch rather than importing the behavior of a default component, you need to extend the base Component class instead.

{% endinfo_block %}

```js
:import Component from 'ShopUi/models/component';

export default class NewSideDrawer extends Component {
         // TODO: your code here
}
```

After implementing the component behavior, let us register it to the HTML tag of the new component. The tag name was defined in Twig on step **2**. Open the `index.ts` file again and add the following content:

```js
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

## 5. Build frontend

Now, let us build the frontend: `npm run yves`.

As soon as the frontend has been compiled, replace the original side drawer with the new implementation. To do this:

- Copy the file `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/page-layout-main/page-layout-main.twig` to `src/Pyz/Yves/ShopUi/Theme/default/page-layout-main/page-layout-main.twig`. Doing so overrides the default main page on the project level.
- Open the copied file.
- Replace the following line: `{% raw %}{%{% endraw %} include organism('side-drawer') with {` with this one:`{% raw %}{%{% endraw %} include organism('new-existing-component-side-drawer') with {`
- Save the file.

Now, whenever you access a page with a side drawer in Spryker Shop, you will get an alert from the new side drawer.

![Side drawer](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Customize+Frontend/side-drawer-notification.png)

Also, the drawer itself has a new outlook.

![New side drawer](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Customize+Frontend/new-side-drawer.png)
