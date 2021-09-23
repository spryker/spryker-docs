---
title: System requirements
Descriptions: System requirements for the Spryker Marketplace with Merchant Portal
template: howto-guide-template
---

| Operating System                          | Native: LinuxOnly via VM: MacOS and MS Windows               |
| ----------------------------------------- | ------------------------------------------------------------ |
| **Web Server**                                | NginX - preferred. But any webserver which supports PHP will work such as lighttpd, Apache, Cherokee. |
| **Databases**                             | Depending on the project, one of the databases: MariaDB >= 10.4 - preferred, PostgreSQL >=9.6, or MySQL >=5.7. |
| **PHP**                                   | Spryker supports PHP >=7.3 with the following extensions: <ul><li>`curl`</li><li>`json`</li><li>`mysql`</li><li>`pdo-sqlite`</li><li>`sqlite3`</li><li>`gd`</li><li>`intl`</li><li>`mysqli`</li><li>`pgsql`</li><li>`ssh2`</li><li>`gmp`</li><li>`mcrypt`</li> <li>`pdo-mysql`</li><li>`readline`</li><li>`twig`</li><li>`imagick`</li><li>`memcache`</li><li>`pdo-pgsql`</li><li>`redis`</li><li>`xml`</li><li>`bz2`</li><li>`mbstring`</li></ul> The preferred version is 7.4. See [Supported Versions of PHP](https://documentation.spryker.com/docs/en/supported-versions-of-php) for details on the supported PHP versions.|
| **SSL**                                       | For production systems, a valid security certificate is required for HTTPS. |
| **Redis**                                     | Version >=3.2, >=5.0                                                |
| **Elasticsearch**                             | Version 6.x or 7.x                                        |
| **RabbitMQ**                                  | Version 3.6+                                                 |
| **Jenkins (for cronjob management)**          | Version 1.6.x or 2.x          |
| **Graphviz (for statemachine visualization)** | 2.x                                                          |
|**Symphony**| Version >= 4.0 |
|**Node.js**| Version >= 12.0.0 |
|**Yarn**| Version >= 2.0.0 && <= 2.3.x |
|**Intranet**| Back Office application (Zed) must be secured in an Intranet (using VPN, Basic Auth, IP Allowlist, DMZ, etc.) |
| **Spryker Commerce OS**| Version >= {{page.version}} |



### Supported browsers
The Spryker Marketplace supports the following browsers:

| Desktop (Marketplace and Merchant Portal) | Tablet (Marketplace and Merchant Portal) | Mobile (Marketplace only)
| --- | --- | --- |
| **Browsers**: <ul><li> Windows, macOS: Chrome (latest version)</li> <li>Windows: Firefox (latest version)</li><li>Windows: Edge (latest version)</li><li>macOS: Safari (latest version)</li></ul> **Windows versions**:<ul><li>Windows 10</li><li>Windows 7</li></ul>**macOS versions**:<ul><li> Catalina (basically, the latest released version)</li></ul>**Screen resolutions**:<ul><li>1024-1920 width</li></ul>| **Browsers**: <ul><li>iOS: Safari</li><li>Android: Chrome</li></ul>**iOS versions**:<ul><li>iOS 13</li></ul>**Screen resolutions**:<ul><li>1024x703 (e.g. iPad Air)</li></ul>|**Browsers**: <ul><li>iOS: Safari</li><li>Android: Chrome</li></ul>**Screen resolutions**:<ul><li>360x640 (e.g. Samsung Galaxy S8 or S9)</li><li>375x667 (e.g. iPhone 7 or 8)</li><li>iPhone X, Xs, Xr</li></ul>**Android versions**:<ul><li>8.0</li></ul>**iOS versions**:<ul><li>iOS 13 (basically the latest released version)</li></ul> |




