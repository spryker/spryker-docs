---
title: Configuring debugging in DevVM
description: This article describes how to setup debugging in your development environment.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/configuring-debugging-in-vagrant
originalArticleId: ce2a45b3-ef13-494b-a774-3be1c46caf17
redirect_from:
  - /2021080/docs/configuring-debugging-in-vagrant
  - /2021080/docs/en/configuring-debugging-in-vagrant
  - /docs/configuring-debugging-in-vagrant
  - /docs/en/configuring-debugging-in-vagrant
  - /v6/docs/configuring-debugging-in-vagrant
  - /v6/docs/en/configuring-debugging-in-vagrant
  - /v5/docs/debugging-setup
  - /v5/docs/en/debugging-setup
  - /v4/docs/debugging-setup
  - /v4/docs/en/debugging-setup
  - /v3/docs/debugging-setup
  - /v3/docs/en/debugging-setup
  - /v2/docs/debugging-setup
  - /v2/docs/en/debugging-setup
  - /v1/docs/debugging-setup
  - /v1/docs/en/debugging-setup
  - /docs/scos/dev/set-up-spryker-locally/installing-spryker-with-vagrant/debugger-configuration/configuring-debugging-in-vagrant.html
related:
  - title: Configuring debugging in a DevVM below version 91
    link: docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-debugging-in-devvm/configuring-debugging-in-a-devvm-below-version-91.html
---
{% info_block warningBox "Warning" %}

We will soon deprecate the DevVM and stop supporting it. Therefore, we highly recommend [installing Spryker with Docker](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).

{% endinfo_block %}

This article describes how to configure debugging in your development environment.

{% info_block warningBox %}

To configure debugging for the VM below version 91, see [Configuring debugging in a DevVM below version 91](/docs/dg/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-debugging-in-devvm/configuring-debugging-in-a-devvm-below-version-91.html).

{% endinfo_block %}

## 1. Install the Xdebug module

1. Install Xdebug:

```bash
sudo -i apt-get install php-xdebug
```

2. Depending on the needed version, enable Xdebug by updating `/etc/php/7.4/mods-available/xdebug.ini` with one of the following:

    * Xdebug v3

    ```bash
     xdebug.mode=debug
     xdebug.client_host=10.10.0.1
     # This is needed to prevent max recursion exception when Twig templates are very complicated
     xdebug.max_nesting_level=1000
     # Disable Opcache to avoid IDE issues
     opcache.enable=0
     opcache.enable_cli=0
    ```

    * Xdebug v2

    ```bash
     xdebug.remote_enable=1
     xdebug.remote_host=10.10.0.1
     # This is needed to prevent max recursion exception when Twig templates are very complicated
     xdebug.max_nesting_level=1000
     # Disable Opcache to avoid IDE issue
     opcache.enable=0
     opcache.enable_cli=0
    ```


3. Enable the module and restart PHP-FPM:

```bash
sudo -i bash -c "phpenmod xdebug && systemctl restart php7.4-fpm.service"
```

{% info_block warningBox "Heavy memory usage" %}

After you've finished debugging, make sure to disable the module by running the following command:

```bash
sudo -i bash -c "phpdismod xdebug && systemctl restart php7.4-fpm.service"
```

{% endinfo_block %}

## 2. Configure PhpStorm servers

Define servers in PhpStorm:

1. In PhpStorm, go to **Preferences** > **Languages & Frameworks** > **PHP** > **Servers**.
2. Add a new server:
    1. Select **+**.
    2. Enter a **Name**. For example, `zed.mysprykershop.com` (it's used in CLI below).
    3. For **Host**, enter `~^zed\.de\..+\.local$`.
    4. Select **Use path mappings**.
    5. For **Absolute path on server**, select `/data/shop/development/current`.
3. Add another server for Yves. Copy the settings from the previous step, but, for **Host**, enter `~^www\.de\..+\.local$`.


## 3. Configure debugger

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

4. Select *Debug* ![debug-button](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Debugging/Configuring+debugging+in+Vagrant/debug-button.png). You should get the message: Waiting for incoming connection with IDE key ‘PHPSTORM’.

### Debugging console commands

To trigger Xdebug in CLI, prepend environment variables to commands as shown in the following example.

```bash
XDEBUG_CONFIG="remote_host=10.10.0.1" PHP_IDE_CONFIG="serverName=zed.mysprykershop.com" vendor/bin/console <command>
```

The value of `serverName` should should correspond to the server name you've entered when [configuring servers](#configure-phpstorm-servers).

## Configuring a Google Chrome helper for Xdebug

As a Chrome user, you can optionally configure the Xdebug helper extension as follows:

1. Add [Xdebug helper](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc?hl=en) to the browser.
2. In the extension settings, for *IDE Key*, select **PhpStorm**.

Now you can manage debugging sessions in the browser toolbar.

## Configuring browser bookmarklets for Xdebug

To manage debugging sessions directly in a browser, configure browser bookmarklets as follows:
1. [Generate helper bookmarklets](http://www.jetbrains.com/phpstorm/marklets/).
2. Bookmark the generated links.

Now you can manage debugging sessions using the bookmarks you've created.
