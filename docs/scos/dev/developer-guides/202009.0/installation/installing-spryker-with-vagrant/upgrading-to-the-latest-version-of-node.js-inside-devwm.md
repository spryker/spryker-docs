---
title: Upgrading to the latest version of Node.js inside devwm
description: Learn how to upgrade to the latest version of Node.js if your devvm vesion is lower than 3.1.0
originalLink: https://documentation.spryker.com/v6/docs/upgrading-to-the-latest-version-of-nodejs-inside-devwm
originalArticleId: 52b4c2fa-c1ce-4066-b5f7-e7fb68a41ddf
redirect_from:
  - /v6/docs/upgrading-to-the-latest-version-of-nodejs-inside-devwm
  - /v6/docs/en/upgrading-to-the-latest-version-of-nodejs-inside-devwm
---

As per [Spryker system requirements](/docs/scos/dev/developer-guides/202009.0/installation/system-requirements.html), we recommend using 12.x version of Node.js. In the [devvm version 3.1.0](https://github.com/spryker/devvm/releases/tag/v3.1.0), we have added support of Node.js 12.x. Earlier devvm versions require a manual upgrade of Node.js.

So if you are:

* a new Spryker user and started the Spryker project from the devvm version lower than 3.1.0, or
* an existing Spryker user having the devvm version lower than 3.1.0, and decided to upgrade to the latest version of the project level,

then you need to upgrade to the latest version of Node.js inside devvm. 

To upgrade, do the following:

1.  Run inside devvm:

```Bash
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```
 {% info_block infoBox %}

You can specify an exact version instead of *stable*: `sudo n [version]`. For example, if you want to upgrade the Node .js version to 12.0.0, the last command would be `sudo n 12.0.0`.

{% endinfo_block %}

2. Restart the console to apply the changes.

That’s it. You now how the latest stable Node.js inside your devvm.
