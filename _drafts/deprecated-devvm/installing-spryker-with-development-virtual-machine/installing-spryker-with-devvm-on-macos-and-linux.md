---
title: Installing Spryker with DevVM on MacOS and Linux
description: This article provides step-by-step instructions on the B2B or B2C Demo Shop installation on Mac OS or Linux with Development Virtual Machine.
last_updated: Oct 18, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm
originalArticleId: 1d644ef6-acab-4d55-afa8-24628043bae7
redirect_from:
  - /2021080/docs/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /2021080/docs/en/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /docs/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /docs/en/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /v6/docs/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /v6/docs/en/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /v5/docs/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /v5/docs/en/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /v4/docs/installation-guide-b2b
  - /v4/docs/en/installation-guide-b2b
  - /v4/docs/b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /v4/docs/en/b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /v3/docs/installation-guide-b2b
  - /v3/docs/en/installation-guide-b2b
  - /v3/docs/b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /v3/docs/en/b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /v2/docs/installation-guide-b2b
  - /v2/docs/en/installation-guide-b2b
  - /v2/docs/b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /v2/docs/en/b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /v1/docs/installation-guide-b2b
  - /v1/docs/en/installation-guide-b2b
  - /v1/docs/installation-guide-b2c
  - /v1/docs/en/installation-guide-b2c
  - /docs/b2c-demo-shop-installation-mac-os-or-linux-with-devvm
  - /docs/scos/dev/set-up-spryker-locally/installing-spryker-with-vagrant/b2b-or-b2c-demo-shop-installation-mac-os-or-linux-with-development-virtual-machine.html
related:
  - title: System requirements
    link: docs/scos/dev/system-requirements/latest/system-requirements.html
  - title: Installing Spryker with development virtual machine
    link: docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/installing-spryker-with-development-virtual-machine.html
  - title: Installing Spryker with DevVM on Windows
    link: docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/installing-spryker-with-devvm-on-windows.html
---

{% info_block warningBox "Warning" %}

We will soon deprecate the DevVM and stop supporting it. Therefore, we highly recommend [installing Spryker with Docker](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).

{% endinfo_block %}

To install the [B2B Demo Shop](/docs/about/all/b2b-suite.html) or [B2C Demo Shop](/docs/about/all/b2c-suite.html) on MacOS or Linux with DevVM, follow the steps below.

## 1. Install prerequisites

To set up your environment, do the following.

1. Install the following prerequisites:
    * [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    * [VirtualBox 5.2.2+](https://www.virtualbox.org/wiki/Downloads)
    * [Vagrant 2.0.0+](https://www.vagrantup.com/downloads.html)

2. Install *vagrant-vbguest* and *vagrant-hostmanager* plugins:

```bash
vagrant plugin install vagrant-vbguest &&
vagrant plugin install vagrant-hostmanager
```

### 2. Install DevVM

1. Create a folder for the DevVM:

```bash
mkdir devvm
```

2. Navigate to the folder you've created:

```bash
cd devvm				
```

3. Initialize the Vagrant environment:

```bash
vagrant init devv410 https://u220427-sub1:PpiiHzuF2OIUzmcH@u220427-sub1.your-storagebox.de/devvm_v4.1.0.box
```

{% info_block warningBox %}

For _Spryker Core_ version 201907.0 or prior, initialize an older version of DevVM:

```bash
vagrant init devvm2.3.1 https://github.com/spryker/devvm/releases/download/v2.3.1/spryker-devvm.box
```

{% endinfo_block %}

4. Add hostmanager plugin configuration to the Vagrantfile:

```bash
mv Vagrantfile Vagrantfile.bak &&
awk '/^end/{print "  config.hostmanager.enabled = true\n  config.hostmanager.manage_host = true"}1' Vagrantfile.bak > Vagrantfile
```

5. Build and start the DevVM with the needed Demo Shop:

    * With B2B Demo Shop:

    ```bash
    VM_PROJECT=b2b-demo-shop SPRYKER_REPOSITORY="https://github.com/spryker-shop/b2b-demo-shop.git" vagrant up
    ```

    * With B2C Demo Shop:

    ```bash
    VM_PROJECT=b2c-demo-shop SPRYKER_REPOSITORY="https://github.com/spryker-shop/b2c-demo-shop.git" vagrant up
    ```

This builds and runs the DevVM, and copies the repository to the `project` subfolder of the DevVM (e.g. `~/devvm/project`). The subfolder is mounted inside the DevVM to `/data/shop/development/current`.

## 3. Install the shop

1. Log into the DevVM:

```bash
vagrant ssh
```

2. DevVM version below 2.2.0: Set the maximum number of connections to 65535:

```bash
ulimit -n 65535
```

3. Install the Demo Shop:

```bash
composer install &&
vendor/bin/install
```

This installs all required dependencies, and runs the installation process. Also, this installs demo data and exports it to Redis and Elasticsearch.

When the installation process is complete, you can access your Spryker Commerce OS via the following links:

* B2B Demo Shop:

    * `http://de.b2b-demo-shop.local` - frontend (Storefront)
    * `http://zed.de.b2b-demo-shop.local` - backend (the Back Office)
    * `http://glue.de.b2b-demo-shop.local` - REST API (Glue)

* B2C Demo Shop:

    * `http://de.b2c-demo-shop.local/` - frontend (Storefront)
    * `http://zed.de.b2c-demo-shop.local` - backend (the Back Office)
    * `http://glue.de.b2c-demo-shop.local` - REST API (Glue)

Back Office credentials:

* EMAIL: `admin@spryker.com`
* PASSWORD: `change123`

## Next steps

* [Troubleshooting installation issues](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/troubleshooting-spryker-in-vagrant-installation-issues.html)
* [Configure Spryker after installing with DevVM](/docs/dg/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-spryker-with-devvm/configuring-spryker-after-installing-with-devvm.html)
