---
title: Setup MySQL Workbench to avoid port clashing with the host system
originalLink: https://documentation.spryker.com/2021080/docs/setup-mysql-workbench-to-avoid-port-clashing-with-the-host-system
redirect_from:
  - /2021080/docs/setup-mysql-workbench-to-avoid-port-clashing-with-the-host-system
  - /2021080/docs/en/setup-mysql-workbench-to-avoid-port-clashing-with-the-host-system
---

We recommend setting up TCP/IP over SSH for MySQL to avoid port clashing with the host system. For current connection values have a look at `config/Shared/config_default-development_DE.php`. Use `$HOME/.vagrant.d/insecure_private_key` as SSH Key File.

MySQL:
![Workbench vagrant setup](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Troubleshooting/msql-workbench-vagrant-setup.png){height="" width=""}

In case the connection fails, run the following command :

```bash
CREATE USER 'root'@'%' IDENTIFIED BY ''; # no password will be set
GRANT ALL PRIVILEGES ON * . * TO 'root'@'%';
FLUSH PRIVILEGES;
```

This command creates a new root user with full permissions.
