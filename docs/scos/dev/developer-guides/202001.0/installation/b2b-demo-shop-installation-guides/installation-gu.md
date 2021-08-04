---
title: B2B Demo Shop Installation- Mac OS or Linux, with Development Virtual Machine
originalLink: https://documentation.spryker.com/v4/docs/installation-guide-b2b
redirect_from:
  - /v4/docs/installation-guide-b2b
  - /v4/docs/en/installation-guide-b2b
---

To install the [Demo Shop for B2B implementations](/docs/scos/dev/about-spryker/202001.0/b2b-suite) on Mac OS or Linux with Development Virtual Machine, follow the steps below.

### 1. Install Prerequisites

To set up your environment, install the following prerequisites:

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git){target="_blank"}
* [VirtualBox 5.2.2+](https://www.virtualbox.org/wiki/Downloads){target="_blank"}
* [Vagrant 2.0.0+](https://www.vagrantup.com/downloads.html){target="_blank"}
* *vagrant-vbguest* and *vagrant-hostmanager* plugins:

```bash
vagrant plugin install vagrant-vbguest
vagrant plugin install vagrant-hostmanager
```

### 2. Install Spryker Virtual Machine

Run the following commands in your favorite shell (e.g. `Bash`):

1. **Create the folder in which you want the source code to be placed:**

```bash
mkdir devvm
cd devvm						
```

2. **Initialize the Vagrant environment**:

```bash
vagrant init devvm3.0.0 https://github.com/spryker/devvm/releases/download/v3.0.0/spryker-devvm.box
```
{% info_block warningBox %}

For _Spryker Core_ version **201907.0** or prior, you need to use an older version of the development machine:
```bash
vagrant init devvm2.3.1 https://github.com/spryker/devvm/releases/download/v2.3.1/spryker-devvm.box
```

{% endinfo_block %}

3. **Update the Vagrantfile**:

Add hostmanager plugin configuration:

```bash
mv Vagrantfile Vagrantfile.bak
awk '/^end/{print "  config.hostmanager.enabled = true\n  config.hostmanager.manage_host = true"}1' Vagrantfile.bak > Vagrantfile
```

4. **Build and start the virtual machine**:

```bash
VM_PROJECT=b2b-demo-shop SPRYKER_REPOSITORY="https://github.com/spryker-shop/b2b-demo-shop.git" vagrant up
```

When the VM is built and running, your local copy of the repository will be placed in the `project` subfolder of the folder where the VM is located (e.g. `~/devvm/project`). The subfolder will be mounted inside the VM to `/data/shop/development/current`.

### 3. Install the Shop

1. **Log into the VM:**

```bash
vagrant ssh
```

2. **Run the installation commands:**

```bash
composer install
vendor/bin/install
```

{% info_block warningBox %}
If you are using a devvm version lower than 2.2.0, run the *ulimit -n 65535* command first.
{% endinfo_block %}

Executing these steps will install all required dependencies, and run the installation process. Also, this will install the demo data and export it to `Redis` and `Elasticsearch`.

When the installation process is complete, Spryker Commerce OS is ready to use. It can be accessed via the following links:

* [http://de.b2b-demo-shop.local/](http://www.de.b2b-demo-shop.local/){target="_blank"} - front-end (Storefront);
* [http://zed.de.b2b-demo-shop.local/](http://zed.de.b2b-demo-shop.local/){target="_blank"} - backend (the Back Office).
* [http://glue.de.b2b-demo-shop.local/](http://glue.de.b2b-demo-shop.local/){target="_blank"} - REST API (Glue).

Credentials to access the administrator interface: user `admin@spryker.com` and password `change123`.


