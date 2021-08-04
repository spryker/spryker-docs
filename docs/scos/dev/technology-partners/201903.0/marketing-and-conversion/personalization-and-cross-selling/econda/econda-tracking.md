---
title: Econda - Tracking
originalLink: https://documentation.spryker.com/v2/docs/econda-tracking
redirect_from:
  - /v2/docs/econda-tracking
  - /v2/docs/en/econda-tracking
---

Now that we have integrated Econda to the website we can start adding the tracking code.

## Prerequisites

To add tracking, you should also be familiar with [Twig.](/docs/scos/dev/developer-guides/201903.0/development-guide/front-end/legacy-demoshop/twig-templates/twig-overview)

To enable Econda tracking for your application, you need to add `econda_tracker.twig` to the proper page template, for example:
```php
{% raw %}{%{% endraw %} include
"@econda/partials/econda_tracker.twig" with {
	'content': '/catalog/' ~ ((category is not null) ? category.name ~ '/' : '') ~ product.name,
	'product': product,
	'category': category
} {% raw %}%}{% endraw %}
```

To enable Econda tracking for your application, you need to download a personalized JavaScript library from the econda Analytics Configuration menu (you can find detailed instructions on this on [https://support.econda.de/display/MONDE/Tracking-Bibliothek+herunterladen](https://support.econda.de/display/MONDE/Tracking-Bibliothek+herunterladen)).

These instructions assume  you are using Antelope <!-- link to (http://documentation.spryker.com/front-end_developer_guide/demoshop/antelope_global_tool/overview) -->for your Yves assets management. If your project uses other frontend automation you can still use the instructions as guidelines.

Before getting started we recomend that you read the following topics: [asset management](https://documentation.spryker.com/v2/docs/frontend-overview#asset-management)
and [Twig](/docs/scos/dev/developer-guides/201903.0/development-guide/front-end/legacy-demoshop/twig-templates/twig-overview)

## Installing Assets

After  successfully downloading the `emos.js` you need to register it in Yves. One way is to create an econda folder in `assets/Yves/<themeName>` folder and to copy it to SDK folder (look at picture below)

Now you add an entry point for loading econda specific JS by adding `econda.js` file in Econda folder.

<!-- ![](../../../Resources/Images/Econda/econda-1.png)-->

Now you need to add a require line:

```bash
require('./sdk/emos2'); //make double check the path to emos2.js
```

Now we need to add our new econda module to `entry.js`

<!-- ![](../../../Resources/Images/Econda/econda-2.png)-->

by adding a line `require('js/econda/econda');`

## Integration

Tracking is highly customizable and it depends on your setup. Please refer to [econda official documentation](https://support.econda.de/display/INDE).

Here is a sample `econda-tracking.js` you can use as a help to integrate tracking to your website:
<details open>
<summary>Sample econda-tracking.js</summary>

```js
'use strict';

var $ = require('jquery');

module.exports = {
   init: function () {
       window.emosTrackVersion = 2; //version of tracking lib that you are using
       var hashCode = function(str){
           var hash = 0, char;
           if (str.length == 0) return hash;
           for (i = 0; i < str.length; i++) {
               char = str.charCodeAt(i);
               hash = ((hash<<5)-hash)+char;
               hash = hash & hash; // Convert to 32bit integer
           }
           if (hash < 0) {hash = -hash;}
           return "" + hash;
       };

       var emospro = {
           siteid: window.econda_siteid,
           content: window.econda_tracking_content,
           langid: $("html").prop("lang"),
           pageId: hashCode(window.location.href)
       };

       if (window.econda_search_query_string) {
           emospro.search = [window.econda_search_query_string, window.econda_search_number_results];
       }

       if (window.econda_register_result) {
           emospro.register = [window.econda_register_result, 0];
       } else if (window.econda_register_result == false) {
           emospro.register = [0, 1];
       }

       if (window.econda_login_result) {
           emospro.login = [window.econda_login_result, 0];
       } else if (window.econda_login_result == false) {
           emospro.login = [0, 1];
       }

       if (window.econda_newsletter_subscription) {
           emospro.Target =  ['newsletter', 'Default newsletter subscription', 1, 'd'];
       }

       if (window.econda_product_name) {
           emospro.ec_Event = [
               {
                   type: 'view' ,
                   pid: window.econda_product_sku,
                   sku: window.econda_product_sku,
                   name: window.econda_product_name,
                   price: window.econda_product_price,
                   group: window.econda_category_name,
                   count: 1
               }
           ];
       }

       if (window.econda_billing_order_value) {
           emospro.billing = [
               window.econda_billing_invoice_number,
               econda_billing_customer_id,
               econda_billing_location,
               econda_billing_order_value
           ];
       }

       if (window.econda_order_process) {
           emospro.orderProcess = window.econda_order_process;
       }

       if (window.econda_bought_product_name & window.econda_bought_product_name.length > 0) {
           emospro.ec_Event = [];
           for (var i = 0, len = econda_bought_product_name.length; i < len; i++) {
               emospro.ec_Event.push({
                   type: 'buy' ,
                   pid: window.econda_bought_product_sku[i],
                   sku: window.econda_bought_product_sku[i],
                   name: window.econda_bought_product_name[i],
                   price: window.econda_bought_product_price[i],
                   count: window.econda_bought_product_count[i]
               });
           }
       }

       window.emosPropertiesEvent(emospro);
       //console.log('econda tracking sent:');
       //console.log(emospro);
   }
};
```
<br>
</details>
Now you need to register your tracking module in econda.js by adding 

``` php
var econdaTracking = require('./econda-tracking');
econdaTracking.init();
```
to `econda.js`.
        
### Adding a Tracking Code to Twig
The econda module comes with a partial twig template `econda_tracker.twig` that you can use as an example in your project.

<details open>
<summary>Twig Template</summary>

```php
<input type="hidden" name="econda_tracking_content" value="{% raw %}{{{% endraw %} content {% raw %}}}{% endraw %}">
{% raw %}{%{% endraw %} if query is defined {% raw %}%}{% endraw %}
   <input type="hidden" name="econda_search_query_string" value="{% raw %}{{{% endraw %} query {% raw %}}}{% endraw %}">
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} if number is defined {% raw %}%}{% endraw %}
   <input type="hidden" name="econda_search_number_results" value="{% raw %}{{{% endraw %} number {% raw %}}}{% endraw %}">
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} if product is defined {% raw %}%}{% endraw %}
   <input type="hidden" name="econda_product_name" value="{% raw %}{{{% endraw %} product.name {% raw %}}}{% endraw %}">
   <input type="hidden" name="econda_product_sku" value="{% raw %}{{{% endraw %} product.sku {% raw %}}}{% endraw %}">
   <input type="hidden" name="econda_product_price" value="{% raw %}{{{% endraw %} product.price / 100 {% raw %}}}{% endraw %}">
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} if category is defined {% raw %}%}{% endraw %}
   <input type="hidden" name="econda_category_name" value="{% raw %}{{{% endraw %} category.name {% raw %}}}{% endraw %}">
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} if invoiceNumber is defined {% raw %}%}{% endraw %}
   <input type="hidden" name="econda_billing_invoice_number" value="{% raw %}{{{% endraw %} invoiceNumber {% raw %}}}{% endraw %}">
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} if location is defined {% raw %}%}{% endraw %}
   <input type="hidden" name="econda_billing_location" value="{% raw %}{{{% endraw %} location {% raw %}}}{% endraw %}">
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} if customerId is defined {% raw %}%}{% endraw %}
   <input type="hidden" name="econda_billing_customer_id" value="{% raw %}{{{% endraw %} customerId {% raw %}}}{% endraw %}">
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} if orderValue is defined {% raw %}%}{% endraw %}
   <input type="hidden" name="econda_billing_order_value" value="{% raw %}{{{% endraw %} orderValue {% raw %}}}{% endraw %}">
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} if orderProcess is defined {% raw %}%}{% endraw %}
   <input type="hidden" name="econda_order_process" value="{% raw %}{{{% endraw %} orderProcess {% raw %}}}{% endraw %}">
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %}  if items is defined {% raw %}%}{% endraw %}
   {% raw %}{%{% endraw %} for item in items {% raw %}%}{% endraw %}
       <input type="hidden" name="econda_bought_product_name[]" value="{% raw %}{{{% endraw %} item.name {% raw %}}}{% endraw %}">
       {#<input type="hidden" name="econda_bought_product_sku[]" value="{% raw %}{{{% endraw %} item.abstractSku {% raw %}}}{% endraw %}">#}
       <input type="hidden" name="econda_bought_product_sku[]" value="{% raw %}{{{% endraw %} item.sku {% raw %}}}{% endraw %}">
       <input type="hidden" name="econda_bought_product_price[]" value="{% raw %}{{{% endraw %} item.unitGrossPrice / 100 {% raw %}}}{% endraw %}">
       <input type="hidden" name="econda_bought_product_count[]" value="{% raw %}{{{% endraw %} item.quantity {% raw %}}}{% endraw %}">
   {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %}  endif {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} for econda_register_result in app.session.flashbag.get('flash.vars.register') {% raw %}%}{% endraw %}
   <input type="hidden" name="econda_user_register_result" value="{% raw %}{{{% endraw %} econda_register_result {% raw %}}}{% endraw %}">
{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} for econda_login_result in app.session.flashbag.get('flash.vars.login') {% raw %}%}{% endraw %}
   <input type="hidden" name="econda_login_result" value="{% raw %}{{{% endraw %} econda_login_result {% raw %}}}{% endraw %}">
{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} for econda_newsletter_subscription_result in app.session.flashbag.get('flash.vars.newsletter.subscription') {% raw %}%}{% endraw %}
   <input type="hidden" name="econda_newsletter_subscription_result" value="{% raw %}{{{% endraw %} econda_newsletter_subscription_result {% raw %}}}{% endraw %}">
{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
```
<br>
</details>

List of the accepted template variables:

|Name |Description |Notes |
| --- | --- | --- |
| content |Path of the current page, as displayed in econda Monitor. Use slashes (“/”) to separate path components for drill-down analysis.  | Translated into CONTENTLABEL parameter |
|query  |Search query (could be passed to the search results page template)  | Translated into QUERY parameter |
|number	  |Number of results returned by the search query (can be passed to the search results page template)  | Translated into NUMBEROFHITS parameter |
|product  | Associative array representing product data (can be passed to the product page template). Accepted keys: `abstract_name`, `abstractSku`, `price` | Product Information |
|category  | Associative array representing category (can be passed to the product page template). Accepted keys: `name` |Product Information |
|invoiceNumber  |Order number (can be passed to the checkout success template)  | Translated into INVOICENUMBER parameter |
|location  |Customer address (can be passed to the checkout success template)  | Translated into LOCATION parameter |
|customerId  |Customer ID (can be passed to the checkout success template)  |Translated into CUSTOMERID parameter  |
|orderValue  |Total order value (can be passed to the checkout success template)  | Translated into ORDERVALUE parameter|
|orderProcess  |Checkout step name  |Translated into STEPNAME parameter |
|items |Associative array representing cart items (can be passed to the checkout success template) |Link |
|flash.vars |Associative array representing intermittent data. Accepted keys: `register`, `login`, `newsletter.subscription` | |
{% info_block infoBox "Tip" %}
Remember to build your frontend  by running antelope build yves from your project root folder
{% endinfo_block %}
In your project you will probably want to customize the tracking to fit the business requirements either by writing your own partial template or by overriding and extending the existing one, see [Best Practices - Twig Templates](/docs/scos/dev/developer-guides/201903.0/development-guide/front-end/legacy-demoshop/twig-templates/twig-best-pract).

### Checking Your Setup

If your setup is correct you should see outgoing request going to Econda in browser developer tools when you navigate to a page that has tracing code included.

