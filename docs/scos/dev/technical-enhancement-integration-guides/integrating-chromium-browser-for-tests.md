---
title: Integrating Chromium browser for tests
description: Integrate Chromium with ChromeDriver into your project for acceptance and functional test.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/chromium-browser-for-tests
originalArticleId: 689f82e3-3fdb-4c39-91b7-10c81daa018f
redirect_from:
  - /2021080/docs/chromium-browser-for-tests
  - /2021080/docs/en/chromium-browser-for-tests
  - /docs/chromium-browser-for-tests
  - /docs/en/chromium-browser-for-tests
  - /v6/docs/chromium-browser-for-tests
  - /v6/docs/en/chromium-browser-for-tests
  - /docs/scos/dev/technical-enhancements/chromium-browser-for-tests.html
---

[Chromium](https://www.chromium.org/Home) is a headless browser used with [ChromeDriver](https://chromedriver.chromium.org/) for acceptance and functional tests. It provides full-control API to make end-to-end testing flexible and comfortable.  

## Integration into Docker-based projects

For Docker-based integration instructions, see [ChromeDriver](/docs/scos/dev/the-docker-sdk/{{site.version}}/configuring-services.html#chromedriver).

## Integration into DevVM-based projects
To integrate Chromium into a DevVM-based project:

1. Update Vagrant to version 3.2.0 or higher.

2. Set the `SPRYKER_TEST_IN_BROWSER=chrome` environment variable.

3. Point the `SPRYKER_TEST_BROWSER_BIN` environment variable to the Chromium binary file.

{% info_block infoBox "Chromium binary file location" %}

By default, the Chromium binary file is located in `vendor/bin/chrome`.

{% endinfo_block %}

4. Update `codeception*.yml` as follows:


```yaml
extensions:
    ...
    config:
        \SprykerTest\Shared\Testify\Helper\WebDriverHelper:
            ...
            browser: "%SPRYKER_TEST_IN_BROWSER%"
            capabilities:
                "goog:chromeOptions":
                    args: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"]
                    binary: "%SPRYKER_TEST_BROWSER_BIN%"
```
