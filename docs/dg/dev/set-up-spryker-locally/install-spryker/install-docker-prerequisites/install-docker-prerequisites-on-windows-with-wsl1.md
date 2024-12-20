---
title: Install Docker prerequisites on Windows with WSL1
description: This page describes the steps that are to be performed before you can start working with Spryker in Docker on Windows with WSL1.
template: howto-guide-template
last_updated: Jul 5, 2023
originalLink: https://documentation.spryker.com/v5/docs/docker-installation-prerequisites-windows
redirect_from:
- /docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-windows-with-wsl1.html  
- /docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl1.html

related:
  - title: Install Docker prerequisites on Linux
    link: /docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-linux.html
  - title: Install Docker prerequisites on MacOS
    link: docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-macos.html
  - title: Install Docker prerequisites on Windows with WSL2
    link: docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl2.html
---

This document describes the prerequisites for installing Spryker on Windows.


## System requirements for installing Spryker

| REQUIREMENT | VALUE OR VERSION  | ADDITIONAL DETAILS |
| --- |-------------------| --- |
| Windows | 10 or 11 (64bit)  | Pro, Enterprise, or Education (1607 Anniversary Update, Build 14393 or later). |
| BIOS Virtualization | Enabled           | Typically, virtualization is enabled by default. Note that having the virtualization enabled is different from having Hyper-V enabled. You can check it in **Task Manager&nbsp;<span aria-label="and then">></span> Performance** tab. For more details, see [Virtualization must be enabled](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization-must-be-enabled). |
| CPU SLAT-capable feature | Enabled   |  SLAT is CPU related feature. It is called Rapid Virtualization Indexing (RVI). |
| Docker | 18.09.1 or higher |
| Docker Compose | 2.0 or higher      |  
| RAM  | 16GB or more       |
| Swap  | 4GB or more       |

## Install and configure the required software

{% info_block errorBox "Outdated software" %}

WSL1 is outdated, so we highly recommend [installing and configuring the required software with WSL2](/docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl2.html). Use it only if you can't use WSL2.

{% endinfo_block %}

{% info_block warningBox %}

When running commands described in this document, use absolute paths. For example: `mkdir /d/spryker && cd $_` or `mkdir /c/Users/spryker && cd $_`.

{% endinfo_block %}

Follow the steps below to install and configure the required software with WSL1.


### Install Docker Desktop    

1. Download [Docker Desktop for Windows](https://download.docker.com/win/static/stable/x86_64/).

2. Open the installation file and follow the instructions of the wizard.

### Enable Docker experimental features

1. Right-click the **Docker** icon in the tray and select **Settings**.
2. Select the **Daemon** tab.
3. Click the **Basic** checkbox.
4. Update variables as follows:

```json
    {
  ....
  "experimental": true,
  "features": {
    "buildkit": true
  }
}
```

### Enable WSL1

WSL is a Windows Subsystem for Linux. It allows Linux programs to run on Windows.

To enable WSL1, follow the steps:

1. Open **Windows Control Panel** > **Programs** > **Programs and Features**.
2. Click the **Turn Windows features on or off** hyperlink.
![step 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Docker+Install+Prerequisites+-+Windows/w-features-on-off.png)

3. Select **Windows Subsystem for Linux** and click **OK**.
![step 3](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Docker+Install+Prerequisites+-+Windows/windows-subsystem.png)

### Install Ubuntu

1. Open Microsoft Store.
2. In the **Search** field, enter `Ubuntu` and press <kbd>Enter</kbd>.
3. From the search results page, select **Ubuntu 18.04 LTS** and install it.
![Ubuntu step 3](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Docker+Install+Prerequisites+-+Windows/ubuntu-in-store.png)

### Update Ubuntu

1. Open the **Start menu**.
2. Find and launch **Ubuntu**.
3. Follow the instructions in the wizard.
4. Set the default root mount point in  `/etc/wsl.conf`.

```yaml
# Enable extra metadata options by default
[automount]
enabled = true
root = /
options = "metadata,umask=22,fmask=11"
mountFsTab = false
```

5. Restart Ubuntu.

### Install Docker

1. Update the APT package:

```bash
sudo apt-get update
```

2. To allow APT to use a repository over HTTPS, install the packages:

```bash
sudo apt-get install \
apt-transport-https \
ca-certificates \
curl \
gnupg-agent \
software-properties-common
```

3. Add Docker's official GNU Privacy Guard key:

```bash
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

4. Set up a stable repository:

```bash
sudo add-apt-repository \
"deb [arch=amd64] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) \
stable"
```

5. Install the latest version of Docker CE:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### Install Docker Compose

1. Download the current stable release of Docker Compose:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

2. Apply executable permissions to the binary:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

### Install docker-sync


1. Install `ruby` and `ruby -dev`:

```bash
sudo apt-get install ruby ruby-dev
```

2. Install docker-sync:

```bash
sudo gem install docker-sync
```

3. Set your Docker for Windows host as an ENV variable:

    a. Open the **Docker for Windows** settings and select **Expose daemon on tcp://localhost:2375 without TLS**.
    b. Run the following command in your WSL shell:

    ```bash
    echo "export DOCKER_HOST=tcp://127.0.0.1:2375" >> ~/.bashrc
    ```

### Install OCaml

1. Check [OCaml release changelog](https://github.com/ocaml/ocaml/releases) and make sure that the version you are going to install is compatible. In the procedure below, we are using version 4.06.0.

2. Install the build script:

```bash
sudo apt-get install build-essential make
```

3. Download the Ocaml archive:

```bash
wget http://caml.inria.fr/pub/distrib/ocaml-4.06/ocaml-4.06.0.tar.gz
```

4. Extract the downloaded archive:

```bash
tar xvf ocaml-4.06.0.tar.gz
```

5. Change the directory:

```bash
cd ocaml-4.06.0
```

6. Configure and compile Ocaml:

```bash
./configure
make world
make opt
umask 022
```

7. Install Ocaml and clean:

```bash
sudo make install
sudo make clean
```

## Install Unison

1. Download the source code of the latest Unison version.
2. Download the Unison archive:

```bash
wget https://github.com/bcpierce00/unison/archive/v2.51.2.tar.gz
```

3. Extract the archive:

```bash
tar xvf v2.51.2.tar.gz
```

4. Change the directory:

```bash
cd unison-2.51.2
```

5. Compile and install Unison:

```bash
$ make UISTYLE=text
$ sudo cp src/unison /usr/local/bin/unison
$ sudo cp src/unison-fsmonitor /usr/local/bin/unison-fsmonitor
```

You've installed and configured the required software.


## Next steps

To choose an installation mode, see [Choose an installation mode](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/choose-an-installation-mode.html).
If you've already selected an installation mode, follow one of the guides below:
* [Install in Development mode on Windows](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/install-in-development-mode-on-windows.html)
* [Install in Demo mode on Windows](/docs/dg/dev/set-up-spryker-locally/install-spryker/install/install-in-demo-mode-on-windows.html)
* [Integrating Docker into existing projects](/docs/dg/dev/upgrade-and-migrate/migrate-to-docker/migrate-to-docker.html)
