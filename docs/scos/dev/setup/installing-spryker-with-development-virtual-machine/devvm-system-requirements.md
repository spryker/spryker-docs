---
title: DevVM system requirements
description: This article provides the configuration that a system must have in order for the Spryker project to run smoothly and efficiently.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/system-requirements
originalArticleId: 6f7d36c1-2ee4-47d1-8f7f-ea0f1b7f93a7
redirect_from:
  - /2021080/docs/system-requirements
  - /2021080/docs/en/system-requirements
  - /docs/system-requirements
  - /docs/en/system-requirements
  - /v6/docs/system-requirements
  - /v6/docs/en/system-requirements
  - /v5/docs/system-requirements
  - /v5/docs/en/system-requirements
  - /v4/docs/system-requirements
  - /v4/docs/en/system-requirements
  - /v3/docs/system-requirements
  - /v3/docs/en/system-requirements
  - /v2/docs/system-requirements
  - /v2/docs/en/system-requirements
  - /v1/docs/system-requirements
  - /v1/docs/en/system-requirements
  - /v4/docs/supported-browsers
  - /v4/docs/en/supported-browsers
  - /docs/scos/dev/setup/system-requirements.html
---

| Requirement | Value|
| ----------------------------------------- | ------------------------------------------------------------ |
| OS                          | <ul><li>Native: Linux</li><li>DevVM: MacOS and Windows</li></ul>  |
| **Web Server**                                | NginX - preferred. But any webserver which supports PHP will work such as lighttpd, Apache, Cherokee. |
| **Databases**                             | Depending on the project, one of the databases: MariaDB >= 10.4 - preferred, PostgreSQL >=9.6, or MySQL >=5.7. |
| **PHP**                                   | Spryker supports PHP `>=7.4` with the following extensions: `curl`, `json`, `mysql`, `pdo-sqlite`, `sqlite3`, `gd`, `intl`, `mysqli`, `pgsql`, `ssh2`, `gmp`, `mcrypt`, `pdo-mysql`, `readline`, `twig`, `imagick`, `memcache`, `pdo-pgsql`, `redis`, `xml`, `bz2`, `mbstring`. The preferred version is `8.0`. See [Supported Versions of PHP](/docs/scos/user/intro-to-spryker/whats-new/supported-versions-of-php.html) for details on the supported PHP versions.|
| **SSL**                                       | For production systems, a valid security certificate is required for HTTPS. |
| **Redis**                                     | Version >=3.2, >=5.0                                                |
| **Elasticsearch**                             | Version 6.x or 7.x                                        |
| **RabbitMQ**                                  | Version 3.6+                                                 |
| **Jenkins (for cronjob management)**          | Version 1.6.x or 2.x          |
| **Graphviz (for statemachine visualization)** | 2.x                                                          |
|**Node.js**| Version >= 12.0.0 |
|**NPM**| Version >= 6.9.0 |
|**Intranet**| Back Office application (Zed) must be secured in an Intranet (using VPN, Basic Auth, IP Allowlist, DMZ, etc.) |



### Supported browsers
The Spryker Commerce OS supports the following browsers for all frontend-related projects/products ([B2B Demo Shop](/docs/scos/user/intro-to-spryker/b2b-suite.html), [B2C Demo Shop](/docs/scos/user/intro-to-spryker/b2c-suite.html), [Master Suite](/docs/scos/user/intro-to-spryker/master-suite.html)):

| Desktop (Yves and Zed) | Mobile (Yves only) | Tablet (Yves only) |
| --- | --- | --- |
| **Browsers**: <ul><li> Windows, macOS: Chrome (latest version)</li> <li>Windows: Firefox (latest version)</li><li>Windows: IE 11</li><li>Windows: Edge (latest version)</li><li>macOS: Safari (latest version)</li></ul> **Windows versions**:<ul><li>Windows 10</li><li>Windows 7</li></ul>**macOS versions**:<ul><li> Catalina (basically, the latest released version)</li></ul>**Screen resolutions**:<ul><li>1024-1920 width</li></ul>|**Browsers**: <ul><li>iOS: Safari</li><li>Android: Chrome</li></ul>**Screen resolutions**:<ul><li>360x640 (e.g. Samsung Galaxy S8 or S9)</li><li>375x667 (e.g. iPhone 7 or 8)</li><li>iPhone X, Xs, Xr</li></ul>**Android versions**:<ul><li>8.0</li></ul>**iOS versions**:<ul><li>iOS 13 (basically the latest released version)</li></ul> | **Browsers**: <ul><li>iOS: Safari</li><li>Android: Chrome</li></ul>**iOS versions**:<ul><li>iOS 13</li></ul>**Screen resolutions**:<ul><li>1024x703 (e.g. iPad Air)</li></ul>|
