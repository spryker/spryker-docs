---
title: Debugging Setup for VM Prior Version 91
description: This article describes how to set up debugging in your development environment for VM prior version 91.
originalLink: https://documentation.spryker.com/v1/docs/debugging-setup-prior-vm91
redirect_from:
  - /v1/docs/debugging-setup-prior-vm91
  - /v1/docs/en/debugging-setup-prior-vm91
---

To configure debugging for the current VM, see [Debugging Setup](/docs/scos/dev/developer-guides/201811.0/installation/debugging/debugging-setup.html).

This article describes how to setup debugging in your development environment for VM prior version 91.

**Install Xdebug module**

If you don’t have the file `/etc/php5/mods-available/xdebug.ini` then you might be missing the Xdebug module on the virtual machine.

To install it, run the following command:

```php
sudo -i apt-get install php5-xdebug
```

## Enabling Xdebug

1. **Make sure that Xdebug is enabled in your php.ini file**

In your virtual machine, navigate to `/etc/php5/mods-available/xdebug.iniand` set:

```php
 xdebug.remote_enable=1
 xdebug.remote_host=10.10.0.1
 # This is needed to prevent max recursion exeception when Twig templates are very complicated
 xdebug.max_nesting_level=1000
```

2. **Export Xdebug config**

Run the following command from the command line or add it to you `~/.profile`.

```php
 export XDEBUG_CONFIG='idekey=PHPSTORM' 
```

3. **Restart PHP**

Run the following command from the command line:

```php
sudo /etc/init.d/php5-fpm restart
```



You should get this for a successful restart: [ ok ] Restarting php5-fpm (via systemctl): php5-fpm.service.

4. **Define servers in PHPStorm**

In PHPStorm go to Settings (Preferences->Languages & Frameworks)->PHP->Servers Add a new Server using (+) with the following values:

* Name: `zed.mysprykershop.com`
* Host: `zed.mysprykershop.com`
* Check “Use path mappings”
* Set “Absolute path on server” to: `/data/shop/development/current`
![Define servers in PHPStorm](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Debugging/Debugging+Setup+for+VM+Prior+Version+91/define-Servers-Php-Storm.png){height="" width=""}

For Yves, add another one using `mysprykershop.com/` as Name and Host.

5. **Configure Debugger**

In PHPStorm, go to: Settings (Preferences->Languages & Frameworks)->PHP->Debug -> Under External connections increase Max. simultaneous connections to 2.

This is necessary to allow debugging Zed through a connection from Yves.

## Debugging

1. **Debugging from PHPStorm**:

* Go to Run->Edit Configurations…
* Add a PHP Remote Debug using (+)
* Name: any name you like
* Servers: `zed.mysprykershop.com`
* Ide Key(session id): PHPSTORM
![Debugging PHPStorm](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Debugging/Debugging+Setup+for+VM+Prior+Version+91/debugging-Php-Storm.png){height="" width=""}

* Click on Listen for PHP Debug Connections button (in the picture)
* Click on Debug button (in the picture), you should get the message: “Waiting for incoming connection with ice key ‘PHPSTORM’”

 

2. **Debugging Console Commands**:

Add:

```php
XDEBUG_CONFIG="remote_host=10.10.0.1" PHP_IDE_CONFIG="serverName=zed.mysprykershop.com"
```

in front of vendor/bin/console <command>.

**Xdebug Google Chrome helper (Optional)**:

As a Chrome user, you can install the “Xdebug helper” extension. Under options set the IDE Key to “PhpStorm”. Everybody else can thengenerate bookmarklets with IDE key set to “PhpStorm” ([Debugger bookmarklets generator for PhpStorm](http://www.jetbrains.com/phpstorm/marklets/)).
