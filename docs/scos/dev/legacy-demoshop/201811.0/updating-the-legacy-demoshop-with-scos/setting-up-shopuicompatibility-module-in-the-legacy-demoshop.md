---
title: Setting up ShopUiCompatibility module in the Legacy Demoshop
description: Use the guide to learn how to install the ShopUICompatibility module for the Atomic Frontend in the Legacy Demoshop.
last_updated: Aug 27, 2020
template: howto-guide-template
originalLink: https://documentation.spryker.com/v6/docs/setting-up-shopuicompatibility
originalArticleId: f6d3249c-0d19-440c-9230-313043541be0
redirect_from:
  - /v6/docs/setting-up-shopuicompatibility
  - /v6/docs/en/setting-up-shopuicompatibility
  - /v5/docs/setting-up-shopuicompatibility
  - /v5/docs/en/setting-up-shopuicompatibility
  - /v4/docs/setting-up-shopuicompatibility
  - /v4/docs/en/setting-up-shopuicompatibility
  - /v3/docs/setting-up-shopuicompatibility
  - /v3/docs/en/setting-up-shopuicompatibility
  - /v2/docs/setting-up-shopuicompatibility
  - /v2/docs/en/setting-up-shopuicompatibility
  - /v1/docs/setting-up-shopuicompatibility
  - /v1/docs/en/setting-up-shopuicompatibility
related:
  - title: Making the Legacy Demoshop Compatible with the Modular Frontend
    link: docs/scos/dev/migration-and-integration/page.version/updating-the-legacy-demoshop-with-scos/making-the-legacy-demoshop-compatible-with-the-modular-frontend.html
  - title: Making the Legacy Demoshop Compatible with the Atomic Frontend
    link: docs/scos/dev/migration-and-integration/page.version/updating-the-legacy-demoshop-with-scos/making-the-legacy-demoshop-compatible-with-the-atomic-frontend.html
  - title: Twig Compatibility- Legacy Demoshop vs SCOS
    link: docs/scos/dev/migration-and-integration/page.version/updating-the-legacy-demoshop-with-scos/twig-compatibility-legacy-demoshop-vs-scos.html
---

The `ShopUiCompatibility` module is the main module necessary for the [Atomic Frontend](/docs/scos/dev/front-end-development/yves/atomic-frontend/atomic-front-end-general-overview.html). This module is provided in SCOS by default.
The following guide describes how to set up the ShopUICompatibility in the Legacy Demoshop.

To install `ShopUiCompatibility` module in the Legacy Demoshop, follow the instructions below:
1. `ShopUiCompatibility` requires `ShopUi` module of a version no older than 1.7.0. If you don't have it, run the following code:

```bash
composer require composer require spryker-shop/shop-ui "^1.7.0"
```
2. Add the following line to `./src/Pyz/Yves/Application/YvesBootstrap.php`:

```php
use SprykerEco\Yves\ShopUiCompatibility\Plugin\Provider\ShopUiCompatibilityTwigServiceProvider;
```

3. Add the following line to `./src/Pyz/Yves/Application/YvesBootstrap.php`, at the very end of the protected function `registerServiceProviders() {`:

```php
$this->application->register(new ShopUiCompatibilityTwigServiceProvider());
```

4. Add the following section to `./package.json`:

```json
"config": {
"shopUiCompatibilityPath": "./vendor/spryker-eco/shop-ui-compatibility/assets/Yves",
"yvesPath": "./assets/Yves/default",
"zedPath": "./node_modules/@spryker/oryx-for-zed"
},
```

5. Replace the script section in `./package.json` with this:

```json
"engines": {
"node": ">=6.0.0"
},
```

6. Change `./src/Pyz/Yves/Application/Theme/default/layout/layout.twig` as follows:

```php
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
	<meta name="description" content="{% raw %}{{{% endraw %} page_description | default('') | trans {% raw %}}}{% endraw %}" />
	<meta name="keywords" content="{% raw %}{{{% endraw %} page_keywords | default('') | trans {% raw %}}}{% endraw %}" />
	<meta name="generator" content="spryker" />
	{% raw %}{%{% endraw %} block page_meta {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

	<link rel="stylesheet" href="/assets/default/shopui/css/yves_default.app.css" /> <!-- add this line here, before any other style -->
	<link rel="stylesheet" href="/assets/default/css/vendor.css" />
	<link rel="stylesheet" href="/assets/default/css/app.css" />
	{% raw %}{%{% endraw %} block stylesheets {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

	<script src="/assets/default/shopui/js/yves_default.runtime.js"></script>  <!-- add this line here, before any other script -->

	<title>{% raw %}{%{% endraw %} block page_title {% raw %}%}{% endraw %}{% raw %}{{{% endraw %} page_title | default('global.spryker.shop') | trans {% raw %}}}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}</title>
</head>
```

7. Add the following lines to `./src/Pyz/Yves/Application/Theme/default/layout/layout.twig`, at the very end of the body, after any other script:

```php
<script src="/assets/default/js/vendor.js"></script>
	<script src="/assets/default/js/app.js"></script>
	<script src="/assets/default/shopui/js/yves_default.es6-polyfill.js"></script> <!-- add this line here, after any other script -->
	<script src="/assets/default/shopui/js/yves_default.vendor.js"></script> <!-- add this line here, after any other script -->
	<script src="/assets/default/shopui/js/yves_default.app.js"></script> <!-- add this line here, after any other script -->
	{% raw %}{%{% endraw %} block javascript {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
</body>
```

8. Add all the files from this [ZIP-archive](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/ShopUi_Compatibility_Migration_Guide.zip) to the root of your project.
        Files in folders must be copied to the same folders.

<!-- Last review date: Oct 30, 2018 by Yuriy Gerton, Dmitry Beirak, Helen Kravchenko -->
