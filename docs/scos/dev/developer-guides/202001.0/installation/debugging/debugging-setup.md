---
title: Debugging Setup
originalLink: https://documentation.spryker.com/v4/docs/debugging-setup
redirect_from:
  - /v4/docs/debugging-setup
  - /v4/docs/en/debugging-setup
---

This article describes how to setup debugging in your development environment.

{% info_block warningBox %}
To configure debugging for old version of the VM prior 91, see [Debugging Setup for VM Prior Version 91](https://documentation.spryker.com/v4/debugging-setup-prior-vm91
{% endinfo_block %}.)

## Installing the Xdebug Module

**To install Xdebug run**:

```bash
sudo -i apt-get install php-xdebug
```

**Enable Xdebug**:

Make sure that Xdebug is enabled in your `php.ini` file.

In your virtual machine, navigate to `/etc/php/7.2/mods-available/xdebug.ini` and set:

```bash
 xdebug.remote_enable=1
 xdebug.remote_host=10.10.0.1
 # This is needed to prevent max recursion exeception when Twig templates are very complicated
 xdebug.max_nesting_level=1000
```

**Enable module and restart PHP-FPM**:

Run the following command from the command line:

```bash
sudo -i bash -c "phpenmod xdebug && systemctl restart php7.2-fpm.service"
```

To disable:

```bash
sudo -i bash -c "phpdismod xdebug && systemctl restart php7.2-fpm.service"
```

**Define servers in PHPStorm**:

In PHPStorm go to Settings (Preferences->Languages & Frameworks)->PHP->Servers Add a new Server using (+) with the following values:

* Name: Any name, e.g. `zed.mysprykershop.com` (it is used in CLI below)
* Host: `~^zed\.de\..+\.local$`
* Check “Use path mappings”
* Set “Absolute path on server” to: `/data/shop/development/current`

For Yves, add another one using `~^www\.de\..+\.local$` as Host.

{% info_block errorBox "Host names changed " %}
Starting from VM91 a regular expression is used to define host names and is forwarded to PHPStorm. This allows to support custom domains in your setup
{% endinfo_block %}

## Configure Debugger

In PHPStorm, go to: Settings (Preferences->Languages & Frameworks)->PHP->Debug -> Under External connections increase Max. simultaneous connections to 2.

This is necessary to allow debugging Zed through a connection from Yves.

## Debugging

**To debug from PHPStorm**:

* Go to Run->Edit Configurations…
* Add a PHP Remote Debug using (+)
* Name: any name you like
* Servers: zed.mysprykershop.com
* Ide Key(session id): PHPSTORM
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Debugging/debugging-php-storm.png){height="" width=""}

* Click on Listen for PHP Debug Connections button (in the picture)
* Click on Debug button (in the picture), you should get the message: “Waiting for incoming connection with IDE key ‘PHPSTORM’”

**Debugging Console Commands**:

In order to trigger Xdebug in CLI, prepend environment variables to commands like

```bash
XDEBUG_CONFIG="remote_host=10.10.0.1" PHP_IDE_CONFIG="serverName=zed.mysprykershop.com" vendor/bin/console <command>
```

The `serverName` variable should be equal to the server name used when defining servers in PHPStorm.

**Xdebug Google Chrome helper (Optional)**:

As a Chrome user, you can install the “Xdebug helper” extension. Under options set the IDE Key to “PhpStorm”. Everybody else can thengenerate bookmarklets with IDE key set to “PhpStorm” ([Debugger bookmarklets generator for PhpStorm](http://www.jetbrains.com/phpstorm/marklets/)).

