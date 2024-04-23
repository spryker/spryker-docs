---
title: Installing Spryker with DevVM on Windows
description: Learn how to install a B2B or a B2C Demo Shop B2B or B2C Demo Shop on Windows, with Development Virtual Machine
last_updated: Oct 18, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/b2b-b2c-demo-shop-installation-windows-with-development-virtual-machine
originalArticleId: ecc0e603-220e-4f66-b22a-73f339b97ebf
redirect_from:
  - /2021080/docs/b2b-b2c-demo-shop-installation-windows-with-development-virtual-machine
  - /2021080/docs/en/b2b-b2c-demo-shop-installation-windows-with-development-virtual-machine
  - /docs/b2b-b2c-demo-shop-installation-windows-with-development-virtual-machine
  - /docs/en/b2b-b2c-demo-shop-installation-windows-with-development-virtual-machine
  - /v6/docs/b2b-b2c-demo-shop-installation-windows-with-development-virtual-machine
  - /v6/docs/en/b2b-b2c-demo-shop-installation-windows-with-development-virtual-machine
  - /v5/docs/b2b-b2c-demo-shop-installation-windows-with-development-virtual-machine
  - /v5/docs/en/b2b-b2c-demo-shop-installation-windows-with-development-virtual-machine
  - /v4/docs/b2b-demo-shop-installation-windows-with-development-virtual-machine
  - /v4/docs/en/b2b-demo-shop-installation-windows-with-development-virtual-machine
  - /v4/docs/b2c-demo-shop-installation-windows-with-development-virtual-machine
  - /v4/docs/en/b2c-demo-shop-installation-windows-with-development-virtual-machine
  - /docs/b2c-demo-shop-installation-windows-with-development-virtual-machine
  - /docs/scos/dev/set-up-spryker-locally/installing-spryker-with-vagrant/b2b-or-b2c-demo-shop-installation-windows-with-development-virtual-machine.html
related:
  - title: DevVM system requirements
    link: docs/scos/dev/system-requirements/page.version/system-requirements.html
  - title: Installing Spryker with development virtual machine
    link: docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/installing-spryker-with-development-virtual-machine.html
  - title: Installing Spryker with DevVM on MacOS and Linux
    link: docs/scos/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/installing-spryker-with-devvm-on-macos-and-linux.html
---

{% info_block warningBox "Warning" %}

We will soon deprecate the DevVM and stop supporting it. Therefore, we highly recommend [installing Spryker with Docker](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).

{% endinfo_block %}

To install the Demo Shop for [B2B](/docs/about/all/b2b-suite.html) or [B2C](/docs/about/all/b2c-suite.html) implementations on Windows with Spryker development virtual machine (DevVM), follow the steps below.

## 1. Install prerequisites

To set up your environment, do the following:

1. Install the following prerequisites:

    * [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    * [VirtualBox 5.2.2](https://www.virtualbox.org/wiki/Download_Old_Builds_5_2)
    * [Vagrant 2.0.0+](https://www.vagrantup.com/downloads.html)

2. Install *vagrant-vbguest* and *vagrant-hostmanager* plugins:

```bash
vagrant plugin install vagrant-vbguest &&
vagrant plugin install vagrant-hostmanager
```

## 2. Install Spryker DevVM

1. Launch Git Bash:

    1. Click **Start**.

    2. Start typing `Git Bash`.

    3. In the search results, right-click **Git Bash** and select **Run as administrator**.
![Run git bash as administrator](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/B2B+Demo+Shop+Installation+Guide/run-git-bash-as-administrator.png)

2. Create a folder for the DevVM:

```bash
mkdir devvm
```

3. Navigate to the folder you've created:

```bash
cd devvm				
```

4. Initialize the Vagrant environment:

```bash
vagrant init devv410 https://u220427-sub1:PpiiHzuF2OIUzmcH@u220427-sub1.your-storagebox.de/devvm_v4.1.0.box
```

{% info_block warningBox %}

For _Spryker Core_ version 201907.0 or prior, initialize an older version of DevVM:

```bash
vagrant init devvm2.3.1 https://github.com/spryker/devvm/releases/download/v2.3.1/spryker-devvm.box
```

{% endinfo_block %}

5. Add hostmanager plugin configuration to the Vagrantfile:

```bash
mv Vagrantfile Vagrantfile.bak &&
awk '/^end/{print "  config.hostmanager.enabled = true\n  config.hostmanager.manage_host = true"}1' Vagrantfile.bak &gt; Vagrantfile
```

6. Build and start the DevVM without cloning the Demo Shop:

    * For the B2B Demo Shop:

    ```bash
    VM_SKIP_SF="1" VM_PROJECT=b2b-demo-shop SPRYKER_REPOSITORY="https://github.com/spryker-shop/b2b-demo-shop.git" vagrant up
    ```

    * For the B2C Demo Shop:

    ```bash
    VM_SKIP_SF="1" VM_PROJECT=b2c-demo-shop SPRYKER_REPOSITORY="https://github.com/spryker-shop/b2c-demo-shop.git" vagrant up
    ```

### 3. Configure the DevVM

1. Log into the DevVM:

```bash
vagrant ssh
```

2. Update the network configuration of the DevVM:

```bash
sudo sed -i "s/eth1/eth1 $(ip -o -4 route show to default | cut -d ' ' -f 5)/g; s/create mask = 0775/create mask = 0777/g; s/directory mask = 0775/directory mask = 0777\n  force user = vagrant\n  force group = vagrant/g"  /etc/samba/smb.conf
```

3. Add the Samba server to the autoload configuration and restart it:

```bash
sudo systemctl enable smbd.service nmbd.service &&
sudo /etc/init.d/samba restart
```

4. Update PHP and Jenkins configuration:

```bash
sudo sed -i 's/user = www-data/user = vagrant/g'  /etc/php/7.4/fpm/pool.d/*.conf &&
sudo sed -i 's/=www-data/=vagrant/g' /etc/default/jenkins-devtest &&
sudo chown -R vagrant:vagrant /data/shop/devtest/shared/data/common/jenkins
```

5. Restart PHP and Jenkins:

```bash
sudo /etc/init.d/php7.4-fpm restart &&
sudo /etc/init.d/jenkins-devtest restart
```

6. Change the permissions of the project directory:

```bash
sudo chown vagrant:vagrant . &&
sudo chmod og+rwx .
```

7. Mount the share in Windows:

    1. To start Windows Command Prompt, do the following:
        1. Press `Win+R`.
        2. Enter `cmd`.
        3. Press `Enter`.

    2. Mount the share as a network drive:

       ```bash
       net use s: \\spryker-vagrant\project\current /persistent:yes
       ```

This mounts the share as the `s:` drive.


## 4. Install the Demo Shop

1. Clone the needed Demo Shop to the VM:

    * Clone the B2B Demo Shop:

        1. Log out from the VM.
        2. In Git Bash, clone the Demo Shop:

        ```bash
        cd /c/ &&
        git clone https://github.com/spryker-shop/b2b-demo-shop.git
        ```

        3. In Windows Command Prompt, move the `c:\b2b-demo-shop` directory to the network drive:

        ```bash
        xcopy C:\b2b-demo-shop s: /he
        ```
        where:    
          `s:` - is the network drive you've mounted in the previous step.

    * Clone the B2C Demo Shop:
        1. Log out from the VM.
        2. In Git Bash, clone the Demo Shop:
        
        ```bash
        cd /c/ &&
        git clone https://github.com/spryker-shop/b2c-demo-shop.git
        ```

        3. In Windows Command Prompt, move the `c:\b2c-demo-shop` directory to the network drive:
        
        ```bash
        xcopy C:\b2c-demo-shop s: /he
        ```
        where:
          `s:` - is the network drive you've mounted in the previous step.


2. In Git Bash, go to the `devvm` folder you've created in [Install Spryker DevVM](#install-spryker-devvm).

3. DevVM version below 2.2.0: Set the maximum number of connections to 65535:

```bash
ulimit -n 65535
```

4. Install the Demo Shop:

```bash
vagrant ssh
composer install
vendor/bin/install
```

This installs all required dependencies, and runs the installation process. Also, this installs demo data and exports it to Redis and Elasticsearch.

When the installation process is complete, you can access your Spryker Commerce OS via the following links:

* B2B Demo Shop:

    * `http://de.b2b-demo-shop.local` - frontend (Storefront)
    * `http://zed.de.b2b-demo-shop.local` - backend (the Back Office)
    * `http://glue.de.b2b-demo-shop.local` - REST API (Glue)

* B2C Demo Shop:

    * `http://de.b2c-demo-shop.local` - frontend (Storefront)
    * `http://zed.de.b2c-demo-shop.local` - backend (the Back Office)
    * `http://glue.de.b2c-demo-shop.local` - REST API (Glue)

Back Office credentials:

* EMAIL: `admin@spryker.com`
* PASSWORD: `change123`

## Next steps

* [Troubleshooting installation issues](/docs/dg/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/troubleshooting-spryker-in-vagrant-installation-issues.html)

* [Configure Spryker after installing with DevVM](/docs/dg/dev/set-up-spryker-locally/installing-spryker-with-development-virtual-machine/configuring-spryker-with-devvm/configuring-spryker-after-installing-with-devvm.html)
