---
title: Product Relation Integration
originalLink: https://documentation.spryker.com/v2/docs/product-relation-integration
redirect_from:
  - /v2/docs/product-relation-integration
  - /v2/docs/en/product-relation-integration
---


1. Register a new collector plugin. How to is in .
2. Then register a new twig service plugin 
`\Spryker\Yves\ProductRelation\Plugin\ProductRelationTwigServiceProvider` inside the `\Pyz\Yves\Application\YvesBootstrap::registerServiceProviders` plugin stack. This will allow to use the UI carousel component to display relations.
3. Add this new twig extension to your templates. By default, it is included in the product detail and cart overview pages of our demoshop.

**To render the component, include the provided twig function as shown bellow**:

* **Product detail**- `product_relation("related-products", {idProductAbstract : product.idProductAbstract}, 'Similar products', '@ProductRelation/partial/product_relation_carousel.twig') ` .
* **Cart Overview** - `product_relation("up-selling", {quote : quoteTransfer}, 'You might also be interested in these products', '@ProductRelation/partial/product_relation_carousel.twig')`.

Each type accepts a number of parameters:

"up-selling" - `abstractProductIds` which is an array of abstract product ids `(['abstractProductIds' => [1,2,3]])` or `quote `which is quote transfer object `(['quote' => $quoteTransfer])`.

"related-products" - i`dProductAbstract (['idProductAbstract' => 1])`.

* Include javascript carousel component `slick.js` In `package.json `include

```php
"dependencies": {
...
"slick-carousel": "~1.6.0",
} 
```

and run `npm install`

Create a new component under `assets/Yves/default/app/components/carousel/_carousel.scss` with contents.

```css
.carousel {
    font-size:14px;

    .image-container {
       width: 150px;
       height: 180px;
    }

    .slick-slide {
       margin-left: 10px;
    }

    .product-name {
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
    }

  } 
  ```
  
include this style file in `/assets/Yves/default/app/style/index.scss` like `@import '../components/carousel/carousel';assets/Yves/default/app/components/carousel/index.js` - configures the slick.js javascript carousel component.

```css
var $ = require('jquery');
var carousel = require('slick-carousel');

module.exports = {
name: 'carousel',
	view: {
    	init: function($root) {
        	this.$root = $root;
        	this.$root.slick({
           		infinite: true,
                slidesToShow: 6,
                slidesToScroll: 6,
                responsive: [
              		{
                   		breakpoint: 1024,
                       	settings: {
                        	slidesToShow: 3,
                       		slidesToScroll: 3
                       }
                },
                {
                	breakpoint: 600,
                	settings: {
                    	slidesToShow: 2,
                    	slidesToScroll: 2
                  	}
               	},
               	{
                   	breakpoint: 480,
                   	settings: {
                    	slidesToShow: 1,
                     	slidesToScroll: 1
                     }
                }
              ]
           });
       },
    }
}; 

```

Include this `js` file in` assets/Yves/default/app/index.js`:

```css      
run([
              ...
              require('./components/carousel')
      ]);
```

Create file `/assets/Yves/default/vendor/slick-carousel.scss` with contents.

```css
$slick-assets-relative-path: "../../../../node_modules/slick-carousel/slick/";

    $slick-font-path: "#{$slick-assets-relative-path}fonts/";
    $slick-font-family: "slick";
    $slick-loader-path: $slick-assets-relative-path;
    $slick-arrow-color: black;
    $slick-dot-color: black;
    $slick-dot-color-active: black;
    $slick-prev-character: "\2190";
    $slick-next-character: "\2192";
    $slick-dot-character: "\2022";
    $slick-dot-size: 30px;
    $slick-opacity-default: 0.75;
    $slick-opacity-on-hover: 1;
    $slick-opacity-not-active: 0.25;

    @import '~slick-carousel/slick/slick.scss';
    @import '~slick-carousel/slick/slick-theme.scss';

    .slick-list {
      .slick-loading & {
        background: none !important;
      }
    }
  ```
    
 Run `npm run yves` to generate javascript and css. 

{% info_block warningBox "Note" %}
To reference an example implementation, see the latest demoshop .
{% endinfo_block %}

Add template for rendering html `src/Pyz/Yves/ProductRelation/Theme/default/partial/product_relation_carousel.twig`

```html
{% raw %}{%{% endraw %} if productRelations {% raw %}%}{% endraw %}
            <div class="row">
                <div class="small-12 columns">
                    <div class="callout">
                        <h3>{% raw %}{{{% endraw %} name {% raw %}}}{% endraw %}</h3>
                        <div class="row align-spaced">
                            <div class="small-11 columns">
                                <div class="carousel" data-component="carousel">
                                {% raw %}{%{% endraw %} for relation in productRelations {% raw %}%}{% endraw %}

                                    {% raw %}{%{% endraw %} include "@catalog/catalog/partials/product.twig" with {
                                      detailsUrl: relation.url,
                                      name:relation.name,
                                      priceValue: relation.price,
                                      product: relation,
                                      imageUrl: (relation.imageSets|length ? relation.imageSets.default[0].externalUrlSmall : '')
                                    } {% raw %}%}{% endraw %}

                                {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
 ```
This is sample a template and has to be updated for the project.

You may also want to adjust the product relations updater script (how often it should run). The relations have a periodic updater `product-relation:update` which is started by Jenkins.
