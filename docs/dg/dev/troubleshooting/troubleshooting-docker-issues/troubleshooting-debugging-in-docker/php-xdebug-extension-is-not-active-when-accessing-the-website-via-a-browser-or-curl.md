---
title: PHP `xdebug` extension is not active when accessing the website via a browser or curl
description: Learn how to fix an issue when PHP `xdebug` extension is not active when accessing the website via a browser or curl
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/php-xdebug-extension-is-not-active-when-accessing-the-website-via-a-browser-or-curl.html
related:
  - title: PHP `xdebug` extension is not active in CLI
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/php-xdebug-extension-is-not-active-in-cli.html
  - title: Xdebug does not work
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/xdebug-does-not-work.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


## Description

PHP `xdebug` extension is not active when accessing the website via a browser or curl.

## Solution

Try the following:

- Set the `XDEBUG_SESSION=spryker` cookie for the request. You can use a browser extension like [Xdebug helper](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc).
- Run the following command to switch all applications to debug mode:

    ```bash
    docker/sdk run -x
    ```
