---
title: Setup MySQL Workbench to avoid port clashing with the host system
description: Learn how to set up MySQL Workbench to avoid port clashing with the host system
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/setup-mysql-workbench-to-avoid-port-clashing-with-the-host-system
originalArticleId: 800cac27-89a1-463b-a7e0-3e863717c363
redirect_from:
  - /2021080/docs/setup-mysql-workbench-to-avoid-port-clashing-with-the-host-system
  - /2021080/docs/en/setup-mysql-workbench-to-avoid-port-clashing-with-the-host-system
  - /docs/setup-mysql-workbench-to-avoid-port-clashing-with-the-host-system
  - /docs/en/setup-mysql-workbench-to-avoid-port-clashing-with-the-host-system
  - /v6/docs/setup-mysql-workbench-to-avoid-port-clashing-with-the-host-system
  - /v6/docs/en/setup-mysql-workbench-to-avoid-port-clashing-with-the-host-system
related:
  - title: Exception connecting to Redis
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/databases-and-services-issues/exception-connecting-to-redis.html
  - title: My Elasticsearch dies
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/databases-and-services-issues/my-elasticsearch-dies.html
  - title: Peer authentication failed for user postgres
    link: docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/databases-and-services-issues/peer-authentication-failed-for-user-postgres.html
---

We recommend setting up TCP/IP over SSH for MySQL to avoid port clashing with the host system. For current connection values have a look at `config/Shared/config_default-development_DE.php`. Use `$HOME/.vagrant.d/insecure_private_key` as SSH Key File.

MySQL:
![Workbench vagrant setup](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Troubleshooting/msql-workbench-vagrant-setup.png) 

In case the connection fails, run the following command :

```bash
CREATE USER 'root'@'%' IDENTIFIED BY ''; # no password will be set
GRANT ALL PRIVILEGES ON * . * TO 'root'@'%';
FLUSH PRIVILEGES;
```

This command creates a new root user with full permissions.
