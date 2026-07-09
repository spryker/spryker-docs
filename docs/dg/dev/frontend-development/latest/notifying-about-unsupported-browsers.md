---
title: Notifying about unsupported browsers
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-notify-about-unsupported-browsers.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


To notify users about an unsupported browser, you can download and implement the [the-unsupported-browser-popup-component](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-notify-about-unsupported-browsers.md/unsupported-browser-popup.zip) component.

The component checks `userAgent` for Internet Explorer browsers using the inline script. If the component detects Internet Explorer browser, it displays a message about the unsupported browser.

The component can also be changed to detect a feature:

```php
var hasNativeCustomElements = !!window.customElements;
```

## Using the `unsupported-browser-popup` component

To use the `unsupported-browser-popup` component, add it to the molecules of the `ShopUi` module and include it in the current `page-blank` template in the `body` tag before script bundles. By default, the script bundles are located in the `footerScripts` block.

Example:

```twig
{% raw %}{%{% endraw %} include molecule('unsupported-browser-popup') only {% raw %}%}{% endraw %}
```

The example supports Internet Explorer 9+ browsers.
