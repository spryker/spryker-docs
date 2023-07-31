---
title: System requirements
Descriptions: System infrastructure requirements for the Spryker Marketplace with Merchant Portal
template: howto-guide-template
redirect_from:
  - /docs/marketplace/dev/setup/system-requirements.html
  - /docs/marketplace/dev/setup/202212.0/infrastructure-requirements.html
---
| OPERATING SYSTEM                              | NATIVE: LinuxOnly via VM: MacOS and MS Windows               |
|-----------------------------------------------| ------------------------------------------------------------ |
| **Web Server**                                | NginX—preferred. But any webserver which supports PHP will work such as lighttpd, Apache, Cherokee. |
| **Databases**                                 | Depending on the project, one of the databases: MariaDB >= 10.4—preferred, PostgreSQL >=9.6, or MySQL >=5.7. |
| **PHP**                                       | Spryker supports PHP `>=7.4` with the following extensions: `curl`, `json`, `mysql`, `pdo-sqlite`, `sqlite3`, `gd`, `intl`, `mysqli`, `pgsql`, `ssh2`, `gmp`, `mcrypt`, `pdo-mysql`, `readline`, `twig`, `imagick`, `memcache`, `pdo-pgsql`, `redis`, `xml`, `bz2`, `mbstring`. The preferred version is `8.0`. For details about the supported PHP versions, see [Supported Versions of PHP](/docs/scos/user/intro-to-spryker/whats-new/supported-versions-of-php.html).|
| **SSL**                                       | For production systems, a valid security certificate is required for HTTPS. |
| **Redis**                                     | Version >=3.2, >=5.0                                                |
| **Elasticsearch**                             | Version 6.x or 7.x                                        |
| **RabbitMQ**                                  | Version 3.6+                                                 |
| **Jenkins (for cronjob management)**          | Version 1.6.x or 2.x          |
| **Graphviz (for statemachine visualization)** | 2.x                                                          |
| **Symfony**                                   | Version >= 4.0 |
| **Node.js**                                   | Version >= 12.0.0 |
| **Yarn**                                      | Version >= 2.0.0 && <= 2.3.x |
| **Intranet**                                  | Back Office application (Zed) must be secured in an Intranet (using VPN, Basic Auth, IP Allowlist, DMZ) |
| **Spryker Commerce OS**                       | Version >= {{page.version}} |
