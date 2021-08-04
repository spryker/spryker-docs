---
title: PHP `xdebug` extension is not active when accessing the website via a browser or curl
originalLink: https://documentation.spryker.com/v6/docs/php-xdebug-extension-is-not-active-when-accessing-the-website-via-a-browser-or-curl
redirect_from:
  - /v6/docs/php-xdebug-extension-is-not-active-when-accessing-the-website-via-a-browser-or-curl
  - /v6/docs/en/php-xdebug-extension-is-not-active-when-accessing-the-website-via-a-browser-or-curl
---

## Description
PHP `xdebug` extension is not active when accessing the website via a browser or curl.

## Solution
Try the following:
* Set the `XDEBUG_SESSION=spryker` cookie for the request. You can use a browser extension like [Xdebug helper](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc).
* Run the following command to switch all applications to debug mode:
    ```bash
    docker/sdk run -x
    ```
