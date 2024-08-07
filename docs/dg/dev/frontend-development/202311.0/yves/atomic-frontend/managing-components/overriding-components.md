---
title: Overriding components
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-override-component
originalArticleId: 9a8dbfcd-e0ef-4ff2-b435-5a66f638a503
redirect_from:
  - /docs/scos/dev/front-end-development/202311.0/yves/atomic-frontend/managing-the-components/overriding-a-component.html
  - /docs/scos/dev/front-end-development/yves/atomic-frontend/managing-the-components/overriding-a-component.html
related:
  - title: Creating a Component
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/managing-components/creating-components.html
  - title: Using a Component
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/managing-components/using-components.html
  - title: Extending a Component
    link: docs/dg/dev/frontend-development/page.version/yves/atomic-frontend/managing-components/extending-components.html
---

If the implementation of any of the components shipped with Spryker Frontend does not suite your needs, you can override it with a component of your own. The following article shows how to override a molecule called **simple-carousel**. By default, the component is used, for example, to display product suggestions at the bottom of the page.

![Old simple carousel](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Customize+Frontend/old-simple-carousel.png)

Let us replace the default implementation of this molecule with our own version. It will look basically the same as the default one, but we'll use a different color for the left and right arrows; the current view number will be displayed in the browser console. Also, when reaching the last image in the set, the component will no longer be reset to the first view automatically by pressing the right button.

## 1. Create component folder on project level

On the global level, the molecule we want to override is located in the following folder: `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/simple-carousel`. It is a part of the main Shop UI application. To override it, we need to place our implementation in the Shop UI folder on the project level, and also replicate the folder structure. In other words, we need to create the following folder for the component: `src/Pyz/Yves/ShopUi/Theme/default/components/molecules/simple-carousel`.

Also, we need to create an entry point for Webpack. Create an empty `index.ts` file in the folder.

## 2. Override component template

The first thing we need to do is to override the Twig of the default component. To do this, we need to create a Twig file for the component on the project level. Since the project level has priority over the global level, the newly created project-side Twig will override the global one. In other words, whenever the component is used on a page, your implementation will be used instead of the default one.

To override the global component, the Twig file name on the project level must be the same as on the global level. Also, component _name_ and _tag_ name specified in the config property must be the same as on the global level. In our case, the file name on the project level must be `simple-carousel.twig`, and the **config** property will look as follows:

```twig
{% raw %}{%{% endraw %} define config = {
    name: 'simple-carousel',
    tag: 'simple-carousel'
} {% raw %}%}{% endraw %}
```

Since the new component will be used everywhere instead of the global one, it is also recommended to replicate the data contracts. For this purpose, the **data** and **attributes** properties need to be configured the same as in the source component. If you are going to change the outlook of the component only, without changing its **data** property, attributes etc, you can copy the source Twig file, and then make changes to the **body** block only. The block contains the visual layout of a component.

As we are not going to change the component template, let us copy the whole of the source twig implementation (`vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/simple-carousel/simple-carousel.twig`) to the project level (`src/Pyz/Yves/ShopUi/Theme/default/components/molecules/simple-carousel.twig`). The Twig file will look as follows:

<details open>
<summary markdown='span'>simple-carousel.twig</summary>

```
{% raw %}{%{% endraw %} extends model('component') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define config = {
    name: 'simple-carousel',
    tag: 'simple-carousel'
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
    slides: [],
    showDots: true
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define attributes = {
    'slides-to-show': 1,
    'slides-to-scroll': 1
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} set slidesCount = data.slides | length {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} set slideWidth = 100 / attributes['slides-to-show'] {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} set dotsCount = (((slidesCount - attributes['slides-to-show']) / attributes['slides-to-scroll']) | round(0, 'ceil')) + 1 {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} set showNavigation = data.slides | length > 1 {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} set showDots = data.showDots and dotsCount > 1 {% raw %}%}{% endraw %}

{#
    Insert customizations in the body of the component, if necessary
#}
{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    <div class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__container">
        {% raw %}{%{% endraw %} if showNavigation {% raw %}%}{% endraw %}
            <div class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__navigation {% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__navigation--prev">
                <a href="#prev" class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__arrow {% raw %}{{{% endraw %}config.jsName{% raw %}}}{% endraw %}__prev">
                    {% raw %}{%{% endraw %} include atom('icon') with {
                        modifiers: ['big'],
                        data: {
                            name: 'chevron-left'
                        }
                    } only {% raw %}%}{% endraw %}
                </a>
        </div>
        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}

        <div class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__view">
            <div class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__slider {% raw %}{{{% endraw %}config.jsName{% raw %}}}{% endraw %}__slider grid grid--stretch">
                {% raw %}{%{% endraw %} for slide in data.slides {% raw %}%}{% endraw %}
                    <div class="{% raw %}{{{% endraw %}config.jsName{% raw %}}}{% endraw %}__slide col" style="width:{% raw %}{{{% endraw %}slideWidth{% raw %}}}{% endraw %}%;min-width:{% raw %}{{{% endraw %}slideWidth{% raw %}}}{% endraw %}%;">
                        {% raw %}{%{% endraw %} block slide {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
                    </div>
                {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
            </div>
            {% raw %}{%{% endraw %} if showDots {% raw %}%}{% endraw %}
                <div class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__dots">
                    {% raw %}{%{% endraw %}- for dot in 1..dotsCount -{% raw %}%}{% endraw %}
                        <a href="#" class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__dot {% raw %}{{{% endraw %}config.jsName{% raw %}}}{% endraw %}__dot{% raw %}{%{% endraw %} if loop.first {% raw %}%}{% endraw %} {% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__dot--current{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}"></a>
                    {% raw %}{%{% endraw %}- endfor -{% raw %}%}{% endraw %}
                </div>
            {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
        </div>

        {% raw %}{%{% endraw %} if showNavigation {% raw %}%}{% endraw %}
            <div class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__navigation {% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__navigation--next">
                <a href="#next" class="{% raw %}{{{% endraw %}config.name{% raw %}}}{% endraw %}__arrow {% raw %}{{{% endraw %}config.jsName{% raw %}}}{% endraw %}__next">
                    {% raw %}{%{% endraw %} include atom('icon') with {
                        modifiers: ['big'],
                        data: {
                            name: 'chevron-right'
                        }
                    } only {% raw %}%}{% endraw %}
                </a>
        </div>
        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
    </div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
</details>

## 3. Define component styles
The next thing to do is to provide the styles to use in the component. We need to use the mixin of the default component and add our style customization within the mixin. For this purpose, create file `simple-carousel.scss` in the project folder with the following content:

```css
@include shop-ui-simple-carousel {
    color: $setting-color-alt;
}
```

With the above code, we inherit all styles of the default component, and then override the arrow color with another one. The color is taken from global configuration. It can be found in the followig folder: `vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/styles/settings`.

Now, we need to make the style visible for Webpack using the `index.ts` file:

```js
// Import component style
import './simple-carousel.scss';
```

## 4. Change component behavior

Finally, let us define what the component does. Create the `simple-carousel.ts` file with the following content:

```js
// Import the SimpleCarousel class
import SimpleCarousel from 'ShopUi/components/molecules/simple-carousel/simple-carousel';

// Export the extended class with additional behavior
export default class SimpleCarouselExtended extends SimpleCarousel {
    slide(): void {
        console.log(`Showing view number ${this.viewCurrentIndex + 1}/${this.viewsCount}!`);

        super.slide();

        // If we've reached the last image, prevent automatic transfer to the 1st one
        if (this.viewCurrentIndex + 1 === this.viewsCount) {
            this.viewCurrentIndex = this.viewCurrentIndex -1;
        }
    }
}
```

In the above example, first, we import class `SimpleCarousel` from the global level. After that, we declare and export a new class, `SimpleCarouselExtended`. Since it extends the class of the default component, it inherits all of its its behavior. The code contained inside the class adds behavior on its own.

If you want to define the component behavior from scratch rather than importing the behavior of the default component, you need to extend the base **Component** class instead:

```js
import Component from 'ShopUi/models/component';

export default class SimpleCarouselExtended extends Component {
         // TODO: your code here
}
```

After implementing the component behavior, let us bond it to the DOM element that represents the component. We need to use the same tag name as the default component, in our case, `simple-carousel`. Open the `index.ts` file again and add the following content:

```js
// Import the 'register' function from the Shop Application
import register from 'ShopUi/app/registry';

// Register the component
export default register(
    'simple-carousel',
    () => import(/* webpackMode: "lazy" */'./simple-carousel')
);
```

## 5. Build frontend

Now, let us build the frontend. Run the following command in the console: `npm run yves`.

As soon as **npm** finishes, you can see the changes in the simple carousel component. The arrow color is changed and you cannot switch to the **1st** element after reaching the last one:

![New simple carousel](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Customize+Frontend/new-simple-carousel.png)

If you open the browser console, you can see the current view number each time you press the left or the right arrow.

![Carousel console](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Customize+Frontend/new-carousel-console.png)

<!-- Last review date: Nov 19, 2018 by Volodymyr Volkov-->
