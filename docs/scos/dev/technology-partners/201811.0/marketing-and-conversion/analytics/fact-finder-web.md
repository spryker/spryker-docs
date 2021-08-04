---
title: Fact Finder Web Components
originalLink: https://documentation.spryker.com/v1/docs/fact-finder-web-components
redirect_from:
  - /v1/docs/fact-finder-web-components
  - /v1/docs/en/fact-finder-web-components
---

## Installation

To install the fact-finder-web-components module, run the following command:
```bash
composer require spryker-eco/fact-finder-web-components
```

## Configuration

To set up the authorization configuration, use the following code example:

<details open>
<summary>config/Shared/config_default.php</summary>

```php
...
// ---------- FACT-Finder components
$config[FactFinderWebComponentsConstants::COMMUNICATION_COMPONENT_CONFIG] = [
	'properties' => [
		'url' => 'http://search-web-components.fact-finder.de/FACT-Finder-7.2',
		'version' => '7.2',
		'default-query' => 'trousers',
		'channel' => 'heroku-fact-finder-de_DE',
		'search-immediate' => false,
	],
];
...
```
<br>
</details>

To set up the components configuration, use the following config code as an example:

<details open>
<summary>config/Shared/config_default.php</summary>

```php
...
$config[FactFinderWebComponentsConstants::BREADCRUMB_COMPONENT_CONFIG] = [
	'properties' => [
		'show-only' => false,
	],
	'items' => [
		'search',
		'filter',
		'advisor',
	],
];
 
$config[FactFinderWebComponentsConstants::SEARCH_BOX_COMPONENT_CONFIG] = [
	'properties' => [
		'suggest-onfocus' => 'true',
		'use-suggest' => 'true',
	],
];
 
$config[FactFinderWebComponentsConstants::SEARCH_BUTTON_COMPONENT_CONFIG] = [
	'suggest-onfocus' => false,
	'hidesuggest-onblur' => true,
	'select-onclick' => false,
	'use-suggest' => false,
	'suggest-delay' => 0,
];
 
$config[FactFinderWebComponentsConstants::HEADER_NAVIGATION_COMPONENT_CONFIG] = [
	'properties' => [
		'group-count' => 4,
		'group-size' => 4,
		'hide-empty-groups' => '1',
		'fetch-initial' => '1',
	],
];
 
$config[FactFinderWebComponentsConstants::SUGGEST_CONFIG] = [
	'properties' => [],
	'productItemType' => 'productName',
	'searchItems' => [
		[
			'type' => 'searchTerm',
			'title' => 'Search term',
		],
		[
			'type' => 'category',
			'title' => 'Category',
		],
		[
			'type' => 'brand',
			'title' => 'Brand',
		],
	],
];
 
$config[FactFinderWebComponentsConstants::RECORD_LIST_COMPONENT_CONFIG] = [
	'properties' => [],
	'record' => '',
];
 
$config[FactFinderWebComponentsConstants::CHECKOUT_TRACKING_CONFIG] = [
	'properties' => [
		'disable-auto-tracking' => true,
	],
	'items' => [
		[
			'recordId' => 'd44c3c7b5e52f7a6b27041c1e789e954',
			'count' => '2',
		],
		[
			'recordId' => '19532fa96a8e60a27328f01520cc4',
			'count' => '4',
		],
	],
];
 
$config[FactFinderWebComponentsConstants::RECORD_COMPONENT_CONFIG] = [
	'subscribe' => 'true',
	'is-recommendation' => false,
	'infinite-scrolling' => true,
	'infinite-debounce-delay' => 32,
	'infinite-scroll-margin' => 0,
];
 
$config[FactFinderWebComponentsConstants::ASN_GROUP_COMPONENT_CONFIG] = [
	'opened' => false,
	'collapsible' => true,
	'lazy-load' => true,
];
 
$config[FactFinderWebComponentsConstants::ASN_GROUP_ELEMENT_CONFIG] = [
	'selected' => true,
];
 
$config[FactFinderWebComponentsConstants::ASN_REMOVE_ALL_FILTER_CONFIG] = [
	'align' => 'vertical',
	'show-always' => true,
	'remove-params' => false,
];
 
$config[FactFinderWebComponentsConstants::ASN_SLIDER_CONFIG] = [
	'properties' => [
		'align' => 'vertical',
	],
];
 
$config[FactFinderWebComponentsConstants::ASN_SLIDER_CONTROL_CONFIG] = [
	'submit-on-input' => true,
];
 
$config[FactFinderWebComponentsConstants::PAGING_COMPONENT_CONFIG] = [
	'properties' => [
	],
];
 
$config[FactFinderWebComponentsConstants::PRODUCTS_PER_PAGE_COMPONENT_CONFIG] = [
	'properties' => [
	],
	'dropdown' => '',
	'list' => '',
	'item' => '',
];
 
$config[FactFinderWebComponentsConstants::SORT_BOX_COMPONENT_CONFIG] = [
	'properties' => [
	],
	'items' => [
		[
			'key' => 'default.template',
			'title' => 'factfinder.web-components.sort.box.default.style',
		],
		[
			'key' => 'Price.asc',
			'title' => 'factfinder.web-components.sort.box.overriden.for',
		],
		[
			'key' => 'null.desc',
			'title' => 'factfinder.web-components.sort.box.relevance',
		],
	],
];
 
$config[FactFinderWebComponentsConstants::SIMILAR_PRODUCTS_COMPONENT_CONFIG] = [
	'properties' => [
		'max-results' => 4,
	],
	'list' => '',
	'record' => '',
];
 
$config[FactFinderWebComponentsConstants::SIMILAR_PRODUCT_ID_CONFIG] = [
	'recordId' => 'd44c3c7b5e52f7a6b27041c1e789e954',
];
 
$config[FactFinderWebComponentsConstants::RECOMMENDATION_CONFIG] = [
	'properties' => [
		'max-results' => 4,
	],
	'list' => '',
	'record' => '',
];
 
$config[FactFinderWebComponentsConstants::RECOMMENDATION_RECORD_ID_CONFIG] = [
	'recordId' => '19532fa96a8e60a27328f01520cc4',
];
 
$config[FactFinderWebComponentsConstants::TAG_CLOUD_COMPONENT_CONFIG] = [
	'properties' => [
	],
];
 
$config[FactFinderWebComponentsConstants::PUSHED_PRODUCTS_COMPONENT_CONFIG] = [
	'properties' => [
	],
	'list' => '',
	'record' => '',
];
 
$config[FactFinderWebComponentsConstants::CAMPAIGN_COMPONENT_CONFIG] = [
	'properties' => [
	],
	'answer' => '',
	'question' => '',
	'feedbacktext' => '',
];
...
```
<br>
</details>

## Integration into Project

<details open>
<summary> frontend/settings.js</summary>

```js
// define project relative paths to context
const paths = {
 ...

 // eco folders
 eco: {
 // all modules
 modules: './vendor/spryker-eco'
 },

 // project folders
 project: {
 ...
 }
};

...

// export settings
module.exports = {
 ...

 // define settings for suite-frontend-builder finder
 find: {
 // webpack entry points (components) finder settings
 componentEntryPoints: {
 // absolute dirs in which look for
 dirs: [
 ...
 path.join(context, paths.eco.modules),
 ...
 ],
 ...
 },

 ...
 }
}
```
<br>
</details>

 <details open>
<summary>src/Pyz/Yves/ShopUi/Theme/default/es6-polyfill.ts</summary>

```js
// add es6 polyfill
import 'core-js/fn/promise';
import 'core-js/fn/array';
import 'core-js/fn/set';
import 'core-js/fn/map';

// check if the browser natively supports webcomponents (and es6)
const hasNativeCustomElements = !!window.customElements;

// then load a shim for es5 transpilers (typescript or babel)
// https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs
if (hasNativeCustomElements) {
 import(/* webpackMode: "eager" */'@webcomponents/webcomponentsjs/custom-elements-es5-adapter');
}
```
<br>
</details>

 <details open>
<summary> src/Pyz/Yves/ShopUi/Theme/default/vendor.ts</summary>

```js
// add es6 polyfill
import 'core-js/fn/promise';
import 'core-js/fn/array';
import 'core-js/fn/set';
import 'core-js/fn/map';

// check if the browser natively supports webcomponents (and es6)
const hasNativeCustomElements = !!window.customElements;

// then load a shim for es5 transpilers (typescript or babel)
// https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs
if (hasNativeCustomElements) {
 import(/* webpackMode: "eager" */'@webcomponents/webcomponentsjs/custom-elements-es5-adapter');
}
```
<br>
</details>

 <details open>
<summary>src/Pyz/Yves/ShopUi/Theme/default/vendor.ts</summary>

```js
// add webcomponents polyfill
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-loader';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import 'ff-web-components/dist/bundle';
```
<br>
</details>

Update in Core "@webcomponents/webcomponentsjs": "^2.0.4",

 <details open>
<summary>package.json</summary>

```json
"dependencies": {
"ff-web-components": "git+https://github.com/FACT-Finder-Web-Components/ff-web-components.git#release/3.0"
},
```
<br>
</details>

## Frontend Integration

Add the required Communication element:

```html
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} include atom('communication', 'FactFinderWebComponents') with {
 data: {
 properties: {
 component: 'url="http://search-web-components.fact-finder.de/FACT-Finder-7.2" version="7.2" default-query="trousers" channel="bergfreunde-co-uk" search-immediate="true"'
 }
 }
 } only {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

Add a widget:
```json
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} include atom('communication', 'FactFinderWebComponents') with {
 data: {
 properties: {
 component: 'url="http://search-web-components.fact-finder.de/FACT-Finder-7.2" version="7.2" default-query="trousers" channel="bergfreunde-co-uk" search-immediate="true"'
 }
 }
 } only {% raw %}%}{% endraw %}

 {% raw %}{%{% endraw %} include atom('header-navigation', 'FactFinderWebComponents') with {
 data: {
 properties: {
 component: 'group-count="4" group-size="4" hide-empty-groups="1" fetch-initial="1"'
 }
 }
 } only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
