---
title: HowTo - Notify About Unsupported Browsers
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

To notify your users about an unsupported browser, you can use our `unsupported-browser-popup` component. The component is not provided out of the box, download it:
![]https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-notify-about-unsupported-browsers.md/unsupported-browser-popup.zip)

In our example, the component checks `userAgent` for Internet Explorer browsers by the inline script. If the component detects the Internet Explorer browser, it displays a message.

The component can also be changed to detect a feature, for example:

```php
var hasNativeCustomElements = !!window.customElements;
```
## Usage
To make use of the `unsupported-browser-popup` component, add it to the molecules of the **ShopUi** module and include in the current `page-blank` template in the `body` tag before script bundles. By default, the script bundles reside in the `footerScripts` block.

Example:
```php
{% raw %}{%{% endraw %} include molecule('unsupported-browser-popup') only {% raw %}%}{% endraw %}
```
{% info_block infoBox %}

Our example supports IE 9+ browsers.

{% endinfo_block %}
