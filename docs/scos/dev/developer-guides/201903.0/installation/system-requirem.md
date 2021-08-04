---
title: System Requirements
originalLink: https://documentation.spryker.com/v2/docs/system-requirements
redirect_from:
  - /v2/docs/system-requirements
  - /v2/docs/en/system-requirements
---

| Operating System                          | Native: LinuxOnly via VM: MacOS and MS Windows               |
| ----------------------------------------- | ------------------------------------------------------------ |
| **Web Server**                                | One of the following:nginx - PreferredApacheBut, any webserver which supports PHP will work such as NginX, lighttpd, Apache, Cherokee. |
| **Databases**                             | Depending on the project, one of the databases:PostgreSQL >=9.6 - Default and PreferredMySQL >=5.7 |
| **PHP**                                   | Spryker supports PHP >=7.1 with the following extensions:`curl`, `json`, `mysql`, `pdo-sqlite`, `sqlite3`, `gd`, `intl`, `mysqli`, `pgsql`, `ssh2`, `gmp`, `mcrypt`, `pdo-mysql`, `readline`, `twig`, `imagick`, `memcache`, `pdo-pgsql`, `redis`, `xml`, `bz2`, `mbstring`The preferred version is 7.2. |
| **SSL**                                       | For production systems, a valid security certificate is required for HTTPS. |
| **Redis**                                     | Version >=3.2, >=5.0                                                |
| **Elasticsearch**                             | Version 5.x (not 6.x)                                        |
| **RabbitMQ**                                  | Version 3.6+                                                 |
| **Jenkins (for cronjob management)**          | Version 1.6.x or 2.x (with disabled authentication)          |
| **Graphviz (for statemachine visualization)** | 2.x                                                          |
|**Node.js**| Version 8.11.4 |
|**NPM**| Version 6.4.1 |



<!-- Last review date: November 5th, 2018
by Marco Podien, Oksana Karasyova -->
