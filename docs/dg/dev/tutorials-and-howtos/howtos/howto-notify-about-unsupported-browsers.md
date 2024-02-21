  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-notify-about-unsupported-browsers.html
---
title: "HowTo: Notify about unsupported browsers"
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-notify-about-unsupported-browsers
originalArticleId: 96206081-8c2e-4086-80d6-94c8e5877ef4
redirect_from:
  - /2021080/docs/howto-notify-about-unsupported-browsers
  - /2021080/docs/en/howto-notify-about-unsupported-browsers
  - /docs/howto-notify-about-unsupported-browsers
  - /docs/en/howto-notify-about-unsupported-browsers
  - /v6/docs/howto-notify-about-unsupported-browsers
  - /v6/docs/en/howto-notify-about-unsupported-browsers
  - /v5/docs/howto-notify-about-unsupported-browsers
  - /v5/docs/en/howto-notify-about-unsupported-browsers
  - /v4/docs/howto-notify-about-unsupported-browsers
  - /v4/docs/en/howto-notify-about-unsupported-browsers
---

To notify your users about an unsupported browser, you can use our `unsupported-browser-popup` component. The component is not provided out of the box. Use the following link to download it:

[the-unsupported-browser-popup-component](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-notify-about-unsupported-browsers.md/unsupported-browser-popup.zip)

In the example, the component checks `userAgent` for Internet Explorer browsers by the inline script. If the component detects the Internet Explorer browser, it displays a message.

The component can also be changed to detect a feature, for example:

```php
var hasNativeCustomElements = !!window.customElements;
```

## Use the `unsupported-browser-popup` component

To use the `unsupported-browser-popup` component, add it to the molecules of the `ShopUi` module and include it in the current `page-blank` template in the `body` tag before script bundles. By default, the script bundles reside in the `footerScripts` block.

Example:

```twig
{% raw %}{%{% endraw %} include molecule('unsupported-browser-popup') only {% raw %}%}{% endraw %}
```

{% info_block infoBox %}

The example supports IE 9+ browsers.

{% endinfo_block %}
