---
title: Migrate the Back Office to Bootstrap 5
description: Learn how to migrate Spryker Back Office to Bootstrap 5 by updating dependencies, enabling assets, and configuring layouts for compatibility.
last_updated: Apr 15, 2025
template: howto-guide-template
---

To migrate Bootstrap to version 5 in the Back Office, take the following steps:

1. Update the required modules:
```bash
  composer update spryker/configurable-bundle-gui:^1.4.1 spryker/customer-group:^2.8.1 spryker/customer-user-connector-gui:^1.5.1 spryker/file-manager-gui:^2.8.1 spryker/gui:^3.59.0 spryker/navigation-gui:^2.10.1 spryker/product-category:^4.28.2 spryker/product-category-filter-gui:^2.5.1 spryker/product-label-gui:^3.6.1 spryker/product-list-gui:^2.6.2 spryker/product-option:^8.22.1 spryker/product-relation-gui:^1.6.1 spryker/product-set-gui:^2.12.1 spryker/security-gui:^1.9.1 spryker/warehouse-user-gui
```

2. Update the `oryx-for-zed` dependency:
```bash
  npm install @spryker/oryx-for-zed@~3.5.0 --save-dev
```

3. Enable Bootstrap 5 assets by setting `isBootstrapLatest` twig variable in general layout.
 - In case you already override a general layout from `Gui/Presentation/Layout/layout.twig`, add the following code to your `layout.twig` file:
 
{% raw %} 
```bash
  {% set isBootstrapLatest = false %}
```
{% endraw %}

Update `head_css` block


{% raw %} 
```bash
{% block head_css %}
    {% if isBootstrapLatest %}
        <link rel="stylesheet" href="{{ assetsPath('css/spryker-zed-gui-commons-bootstrap-compatibility.css') }}">
    {% else %}
        <link rel="stylesheet" href="{{ assetsPath('css/spryker-zed-gui-commons.css') }}">
    {% endif %}
    ...
{% endblock %}
```
{% endraw %}

Update `footer_js` block
{% raw %} 
```bash
{% block footer_js %}
    {% if isBootstrapLatest %}
        <script src="{{ assetsPath('js/spryker-zed-gui-commons-bootstrap-compatibility.js') }}"></script>
    {% else %}
        <script src="{{ assetsPath('js/spryker-zed-gui-commons.js') }}"></script>
    {% endif %}
    ...
{% endblock %}
```    
{% endraw %}


- In case you don't override a general layout, create a new file `src/Gui/Presentation/Layout/layout.twig` in your project and add the code from the previous step.

- The same changes have to be done for login layout which is located in the separate module: `SecurityGui/Presentation/Layout/layout.twig`.


4. Clear cache:
```bash
  docker/sdk console c:e
```


5. Run twig cache warmer:
```bash
  docker/sdk console t:c:w
```


6. Build JS and CSS assets compatible with Bootstrap 5. There is an environment variable created to manage the version of bootstrap - `BOOTSTRAP_VERSION`. The easiest way to set it:
```bash
  docker/sdk cli BOOTSTRAP_VERSION=5 npm run zed
```

How to make sure that the assets are built with Bootstrap 5:
- Check the public directory for the following files:
```bash
  /public/Backoffice/assets/css/spryker-zed-gui-commons-bootstrap-compatibility.css
  /public/Backoffice/assets/js/spryker-zed-gui-commons-bootstrap-compatibility.js
```















































