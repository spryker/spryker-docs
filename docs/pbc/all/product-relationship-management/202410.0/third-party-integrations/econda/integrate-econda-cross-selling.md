---
title: Integrating Econda cross-selling
description: Learn how to integrate Econda cross-selling in to your Spryker Cloud Commerce OS based projects.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/econda-cross-sell
originalArticleId: 66c188de-e8fa-4643-872c-98dc97d37c27
redirect_from:
  - /docs/scos/user/technology-partners/202204.0/marketing-and-conversion/personalization-and-cross-selling/econda/econda-cross-sell.html
  - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/personalization-and-cross-selling/econda/integrating-econda-cross-selling.html
  - /docs/scos/dev/technology-partner-guides/202311.0/marketing-and-conversion/personalization-and-cross-selling/econda/integrating-econda-cross-selling.html
  - /docs/scos/dev/technology-partner-guides/202204.0/marketing-and-conversion/personalization-and-cross-selling/econda/integrating-econda-cross-selling.html
---

Cross sell is highly customizable and it depends on your setup. Please refer to [Econda offical documentation](https://support.econda.de/display/CSDE/Control+Panel).

All necessary JS files are already integrated into the module, the only thing you need to do is to add your API key inside the `econda_crosssell.twig` template:

```twig
<input type="hidden" name="econda_aid" value="ADD_YOUR_API_KEY_HERE">
```

## Prerequisites

The [econda JS SDK](http://downloads.econda.de/support/releases/js-sdk/current/econda-recommendations.php) download

An Econda ID can be found in your account details (see image below).

<!-- ![](../../../Resources/Images/Econda/econda-3.png)-->

These instructions assume  you are using Antelope<!-- add link https://documentation.spryker.com/front-end_developer_guide/demoshop/antelope_global_tool/overview--> for your Yves assets management. If your project uses other frontend automation you can still use the instructions as guidelines.

## Installing assets

After you have successfully downloaded the SDK you need to register it in Yves. One way is to create an Econda folder in `assets/Yves/<themeName>` folder and extract the SDK to it (look at picture below)

<!-- ![](../../../Resources/Images//Econda/econda-4.png)-->

Now add an entry point for loading econda specific JS by adding the `econda.js` file in the Econda folder.

Add a require line `require('./sdk/econda-recommendations');`

Now we need to add our new Econda module to `entry.js`.

<!-- ![](../../../Resources/Images/Econda/econda-2.png)-->

by adding a line:

```js
require('js/econda/econda');
```

## Integration

Cross sell is highly customizable and it depends on your setup. Please refer to Econda offical [documentation](https://support.econda.de/display/CSDE/Control+Panel).

Here is a sample `econda-widget.js` you can use as a help to integrate cross sell widget to your website:

```js
'use strict';

require('../../html/vendor/econda/cross-sell-widget.html');

var econda_aid = "<put_your_econda_id_here>";

module.exports = {
 init: function() {
 /**
 * Setup widget, load data and render using defined rendering function
 */
 if(typeof window.ecWidgets == 'undefined') {
 window.ecWidgets = [];
 }
 if (document.getElementById('econda_widget_container')) {
 var product_sku = document.getElementsByName('econda_product_sku')[0].value;
 var category_name = document.getElementsByName('econda_category_name')[0].value;
 window.ecWidgets.push({
 element: document.getElementById('econda_widget_container'),
 renderer: {type: 'template', uri: '/assets/default/html/cross-sell-widget.html'},
 accountId: econda_aid,
 id: 2, //id of widget you defined in econda UI
 context: {
 products: [{id: product_sku }],
 categories: [{
 type: 'productcategory',
 path: category_name
 }]
 },
 chunkSize: 3
 });
 }
 }
};
```

Register your tracking module in `econda.js` by adding to `econda.js`.

```bash
var econdaWidget = require('./econda-widget');
econdaWidget.init();
```

In `econda-widget.js` we are include the `cross-sell-widget.html` for the widget template. Template example is below.

```js
<section class="products-set">
 <h3>You may also like</h3>
 <% for (ip = 0; ip < products.length; ip++) { %>
 <article class="catalog__product">
 <a href="<%= products[ip].deeplink %>" title="<%= products[ip].name %>" class="product__link">
 <img src="<%= products[ip].iconurl %>" alt="<%= products[ip].name %>" class="product__image"/>
 <h1 class="product__name"><%= products[ip].name %></h1>
 <h2 class="product__price"><%= products[ip].price %></h2>
 </a>
 </article>
 <% } %>
</section>
```

## Adding the Cross Sell Widget to Twig

To include this snippet in your project, you need to include this code in your twig template:

```php
{% raw %}{%{% endraw %} include "@econda/partials/econda_crosssell.twig" with {
 product: product,
 category: category
} {% raw %}%}{% endraw %}
```

List of accepted template variables:

| NAME | DESCRIPTION |
| --- | --- |
| product | Associative array representing product data. Accepted keys: `abstractSku` |
| category | Associative array representing category. Accepted keys: `name` |

## Building

Do not forget to build your frontend by running antelope build yves from you project root folder.

## Checking Your Setup

If your setup is correct you should see the new Econda widget on the page where the cross sell widget was added.
