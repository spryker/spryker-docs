---
title: Configuring debugging in a DevVM below version 91
description: This article describes how to set up debugging in your development environment for VM prior version 91.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/configuring-debugging-in-vagrant-with-vm-below-version-91
originalArticleId: 636a0413-5406-4fbb-b758-a625a58c77fb
redirect_from:
  - /2021080/docs/configuring-debugging-in-vagrant-with-vm-below-version-91
  - /2021080/docs/en/configuring-debugging-in-vagrant-with-vm-below-version-91
  - /docs/configuring-debugging-in-vagrant-with-vm-below-version-91
  - /docs/en/configuring-debugging-in-vagrant-with-vm-below-version-91
  - /v6/docs/configuring-debugging-in-vagrant-with-vm-below-version-91
  - /v6/docs/en/configuring-debugging-in-vagrant-with-vm-below-version-91
  - /v5/docs/debugging-setup-prior-vm91
  - /v5/docs/en/debugging-setup-prior-vm91
  - /v4/docs/debugging-setup-prior-vm91
  - /v4/docs/en/debugging-setup-prior-vm91
  - /v3/docs/debugging-setup-prior-vm91
  - /v3/docs/en/debugging-setup-prior-vm91
  - /v2/docs/debugging-setup-prior-vm91
  - /v2/docs/en/debugging-setup-prior-vm91
  - /v1/docs/debugging-setup-prior-vm91
  - /v1/docs/en/debugging-setup-prior-vm91
  - /docs/scos/dev/set-up-spryker-locally/installing-spryker-with-vagrant/debugger-configuration/configuring-debugging-in-vagrant-with-vm-below-version-91.html
related:
  - title: Configuring debugging in DevVM
    link: docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-debugging-in-devvm/configuring-debugging-in-devvm.html
---
{% info_block warningBox "Warning" %}

We will soon deprecate the DevVM and stop supporting it. Therefore, we highly recommend [installing Spryker with Docker](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).

{% endinfo_block %}

This article describes how to configure debugging in a development environment for VM below version 91.

## Installing the Xdebug module

To install the Xdebug module:

1. Install Xdebug:

```bash
sudo -i apt-get install php5-xdebug
```

## Enabling Xdebug

1. **Make sure that Xdebug is enabled in your php.ini file**

2. Enable Xdebug by updating `/etc/php5/mods-available/xdebug.ini` with the following:

```text
 xdebug.remote_enable=1
 xdebug.remote_host=10.10.0.1
 # This is needed to prevent max recursion exeception when Twig templates are very complicated
 xdebug.max_nesting_level=1000
```

3. Export Xdebug configuration:

```php
export XDEBUG_CONFIG='idekey=PHPSTORM'
```

4. Restart PHP:

```php
sudo /etc/init.d/php5-fpm restart
```

If the restart is successful, you should get the following message: `[ ok ] Restarting php5-fpm (via systemctl): php5-fpm.service`.

## Configuring servers

Define servers in PhpStorm:

1. In PhpStorm, go to **Preferences** > **Languages & Frameworks** > **PHP** > **Servers**.
2. Add a new server:
    1. Select **+**.
    2. For **Name**, enter *zed.mysprykershop.com*.
    3. For **Host**, enter *zed.mysprykershop.com*.
    4. Select **Use path mappings**.
    5. Set **Absolute path on server** to `/data/shop/development/current`.

![Define servers in PHPStorm](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Debugging/Debugging+Setup+for+VM+Prior+Version+91/define-Servers-Php-Storm.png)

3. For Yves, add another server. Copy the settings from the previous step, but, for **Name** and **Host**, enter.

## Configuring debugger

1. In PhpStorm, go to **Preferences** > **Languages & Frameworks** > **PHP** > **Debug**.

2. In the *External connections* section, for **Max. simultaneous connections**, select **2**.

Now you can debug Zed through a connection from Yves.

## Debugging

To debug with PhpStorm:

1. Go to **Run** > **Edit Configurations…**.
2. Add a PHP Remote Debug:
    1.  Select **+**.
    2. Enter a **Name**.
    3. For **Servers**, enter *zed.mysprykershop.com*.
    4. For **Ide Key(session id)**, enter *PHPSTORM*.
3. Select *Listen for PHP Debug Connections* ![listen-to-php-debug-button](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Debugging/Configuring+debugging+in+Vagrant/listen-php-debug-connections.png).


4. Select *Debug* ![debug-button](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Debugging/Configuring+debugging+in+Vagrant/debug-button.png). You should get the message: “Waiting for incoming connection with IDE key ‘PHPSTORM’”.

### Debugging console commands

To trigger Xdebug in CLI, prepend environment variables to commands as follows.

```bash
XDEBUG_CONFIG="remote_host=10.10.0.1" PHP_IDE_CONFIG="serverName=zed.mysprykershop.com" vendor/bin/console <command>
```


## Configuring a Google Chrome helper for Xdebug

As a Chrome user, you can optionally configure the Xdebug helper extension as follows:

1. Add [Xdebug helper](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc?hl=en) to the browser.
2. In the extension settings, for *IDE Key*, select **PhpStorm**.

Now you can manage debugging sessions in the browser toolbar.

## Configuring browser bookmarklets for Xdebug

To manage debugging sessions directly in a browser, configure browser bookmarklets as follows:
1. [Generate helper bookmarklets](http://www.jetbrains.com/phpstorm/marklets/).
2. Bookmark the generated links.


As a Chrome user, you can install the “Xdebug helper” extension. Under options set the IDE Key to “PhpStorm”. Everybody else can then generate bookmarklets with IDE key set to “PhpStorm” ([Debugger bookmarklets generator for PhpStorm](http://www.jetbrains.com/phpstorm/marklets/)).

Now you can manage debugging sessions using the bookmarks you've created.
