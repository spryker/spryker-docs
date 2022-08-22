---
title: DevVM system requirements
descriptions: System infrastructure requirements for the Spryker Marketplace with Merchant Portal
last_updated: Aug 5, 2022
template: howto-guide-template
related:
  - title: Infrastructure requirements
    link: docs/marketplace/dev/setup/page.version/infrastructure-requirements.html
---

{% info_block warningBox "Warning" %}

We will soon deprecate the DevVM and stop supporting it. Therefore, we highly recommend [installing Spryker with Docker](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html).

{% endinfo_block %}

| OPERATING SYSTEM | NATIVE: LINUXONLY VIA VM: MACOS AND MS WINDOWS |
| --- | ---|
| Web Server | NginX—preferred. But any webserver which supports PHP will work such as lighttpd, Apache, Cherokee. |
| Databases | Depending on the project, one of the databases: MariaDB >= 10.4—preferred, PostgreSQL >=9.6, or MySQL >=5.7. |
| PHP | Spryker supports PHP `>=7.4` with the following extensions: `curl`, `json`, `mysql`, `pdo-sqlite`, `sqlite3`, `gd`, `intl`, `mysqli`, `pgsql`, `ssh2`, `gmp`, `mcrypt`, `pdo-mysql`, `readline`, `twig`, `imagick`, `memcache`, `pdo-pgsql`, `redis`, `xml`, `bz2`, `mbstring`. The preferred version is `8.0`. For details about the supported PHP versions, see [Supported Versions of PHP](/docs/scos/user/intro-to-spryker/whats-new/supported-versions-of-php.html).|
|  SSL | For production systems, a valid security certificate is required for HTTPS. |
|  Redis | Version >=3.2, >=5.0   |
|  Elasticsearch   | Version 6.x or 7.x  |
|  RabbitMQ  | Version 3.6+ |
|  Jenkins (for cronjob management) | Version 1.6.x or 2.x  |
|  Graphviz (for statemachine visualization)  | 2.x |
| Symfony | Version >= 4.0 |
| Node.js | Version >= 16.0.0 |
| NPM | Version >= 8.0.0 |
| Intranet | Back Office application (Zed) must be secured in an Intranet (using VPN, Basic Auth, IP Allowlist, DMZ) |
|  Spryker Commerce OS | Version >= {{page.version}} |
