---
title: Upgrade the Back Office to Bootstrap 5
description: Learn how to migrate Spryker Back Office to Bootstrap 5 by updating dependencies, enabling assets, and configuring layouts for compatibility.
last_updated: Apr 15, 2025
template: howto-guide-template
---

To migrate Bootstrap in the Back Office to version 5, take the following steps:

1. Update the required modules:
```bash
  composer update spryker/configurable-bundle-gui:^1.4.1 spryker/customer-group:^2.8.1 spryker/customer-user-connector-gui:^1.5.1 spryker/file-manager-gui:^2.8.1 spryker/gui:^3.59.0 spryker/navigation-gui:^2.10.1 spryker/product-category:^4.28.2 spryker/product-category-filter-gui:^2.5.1 spryker/product-label-gui:^3.6.1 spryker/product-list-gui:^2.6.2 spryker/product-option:^8.22.1 spryker/product-relation-gui:^1.6.1 spryker/product-set-gui:^2.12.1 spryker/security-gui:^1.9.1 spryker/warehouse-user-gui
```

2. Update the `oryx-for-zed` dependency:
```bash
  npm install @spryker/oryx-for-zed@~3.5.0 --save-dev
```

3. Override the general layout from `Gui/Presentation/Layout/layout.twig` on the project level.

4. Enable Bootstrap 5 assets by setting the `isBootstrapLatest` twig variable:
 
**layout.twig** 
{% raw %} 
```twig
  {% set isBootstrapLatest = false %}
```
{% endraw %}


5. Update the `head_css` block:

**layout.twig** 
{% raw %} 
```twig
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


6. Update the `footer_js` block:

**layout.twig** 
{% raw %} 
```twig
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


7. Repeat steps 4-6 for the login layout in the separate module: `SecurityGui/Presentation/Layout/layout.twig`.


8. Clear cache:
```bash
  docker/sdk console c:e
```


9. Run twig cache warmer:
```bash
  docker/sdk console t:c:w
```


10. Build JS and CSS assets compatible with Bootstrap 5. To manage the version of bootstrap, set the `BOOTSTRAP_VERSION` variable:
```bash
docker/sdk cli BOOTSTRAP_VERSION=5 npm run zed
```

{% info_block warningBox "Verification" %}

To make sure that the assets are built with Bootstrap 5, check the public directory for the following files:
```bash
  /public/Backoffice/assets/css/spryker-zed-gui-commons-bootstrap-compatibility.css
  /public/Backoffice/assets/js/spryker-zed-gui-commons-bootstrap-compatibility.js
```

{% endinfo_block %}

















































