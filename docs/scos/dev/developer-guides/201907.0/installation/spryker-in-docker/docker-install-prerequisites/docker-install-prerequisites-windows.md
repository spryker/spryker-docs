---
title: Docker Install Prerequisites - Windows
description: This page describes the steps that are to be performed before you can start working with Spryker in Docker on Windows.
originalLink: https://documentation.spryker.com/v3/docs/docker-install-prerequisites-windows-201907
redirect_from:
  - /v3/docs/docker-install-prerequisites-windows-201907
  - /v3/docs/en/docker-install-prerequisites-windows-201907
---



This article describes the install prerequisites for Windows.
{% info_block warningBox %}
When running commands, you should use absolute paths. For example: `mkdir /d/spryker && cd $_` or `mkdir /c/Users/spryker && cd $_`.
{% endinfo_block %}

## Minimum System Requirements

Before proceeding to the actual installation procedure, please review the minimum system requirements described in the table below:

| System Requirement | Additional Details |
| --- | --- |
| Windows 10 64bit | Pro, Enterprise, or Education (1607 Anniversary Update, Build 14393 or later). |
| BIOS Virtualization is enabled | Typically, virtualization is enabled by default. Note that having the virtualization enabled is different from having Hyper-V enabled. This setting can be checked in the **Task Manager** → **Performance** tab.  For more details, see [Virtualization must be enabled](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization-must-be-enabled). |
| CPU SLAT-capable feature | SLAT is CPU related feature. It is called Rapid Virtualization Indexing (RVI). |
| RAM: 4GB | This is a minimum requirement. The value can be higher than 4GB. A lower value is not sufficient for installation purposes. |
| vCPU: 2 | This is a minimum requirement. The value can be higher than 2. A lower value is not sufficient for running the application. |

<details open>
<summary> Install Docker Desktop</summary>
    
    
    
1. Download <a href="https://download.docker.com/win/stable/Docker for Windows Installer.exe"> Docker Desktop</a>.
    
2. Open the installation file and follow the instructions of the wizard.
</details>

<details open>
  <summary>Enable Docker Experimental Features</summary>

Experimental features are provided for testing and evaluation purposes.

1. Right-click **Docker** icon in the tray and select **Settings**.
2. Select **Daemon** tab.
3. Select Basic checkbox.
4. Update variables as follows:
```php
    {
  ....
  "experimental": true,
  "features": {
    "buildkit": true
  }
}
```
</details>
<details open>
   <summary>Enable the WSL</summary>

WSL is a Windows Subsystem for Linux. It allows Linux programs to run on Windows.

Follow the procedure described below to enable the WSL:

1. Open **Windows Control Panel** → **Programs** → **Programs and Features**.
2. Select **Turn Windows features on or off**  hyperlink.
![step 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Docker+Install+Prerequisites+-+Windows/w-features-on-off.png){height="" width=""}

3. Check **Windows Subsystem for Linux** and click **OK**.
![step 3](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Docker+Install+Prerequisites+-+Windows/windows-subsystem.png){height="" width=""}

</details>

<details open>
   <summary> Install and Update Ubuntu</summary>

Firstly, install Ubuntu:

1. Open Microsoft Store.
2. In the Search filed, enter "Ubuntu" and press **Enter**.
3. From the search results page, select **Ubuntu 18.04 LTS** and install it.<br>
![Ubuntu step 3](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Docker+Install+Prerequisites+-+Windows/ubuntu-in-store.png){height="" width=""}

Once Ubuntu is installed, update it:

1. Open the **Start menu**.
2. Find and launch **Ubuntu**.
3. Follow the instructions in the wizard.
4. Set the default root mount point in  `/etc/wsl.conf`.
```php
# Enable extra metadata options by default
[automount]
enabled = true
root = /
options = "metadata,umask=22,fmask=11"
mountFsTab = false
```
5. Restart Ubuntu.
</details>

<details open>
   <summary> Install Docker</summary>

### Docker

1. Update the apt package:
```shell
sudo apt-get update
```
    
2. Install packages to allow apt to use a repository over HTTPS:
```shell
sudo apt-get install \
apt-transport-https \
ca-certificates \
curl \
gnupg-agent \
software-properties-common
```

3. Add Docker's official GPG (GNU Privacy Guard) key:
```shell
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
    
4. Set up a stable repository:
```shell
sudo add-apt-repository \
"deb [arch=amd64] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) \
stable"
```
    
5. Install the latest version of Docker CE:
```shell
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### Docker Compose

1. Download the current stable release of Docker Compose:
```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
2. Apply executable permissions to the binary:
```shell
sudo chmod +x /usr/local/bin/docker-compose
```
</details>

<details open>
   <summary> Install Docker Sync</summary>

1. Install Ruby and Ruby -dev:
```shell
sudo apt-get install ruby ruby-dev
```
2. Install docker-sync
```shell
sudo gem install docker-sync
```
3. Set your Docker for Windows host as an ENV variable:

    a. Open the **Docker for Windows** settings and check **Expose daemon on tcp://localhost:2375 without TLS**.
    b. Run the following command in your WSL shell:
```shell
echo "export DOCKER_HOST=tcp://127.0.0.1:2375" >> ~/.bashrc
```
4. Compile and install OCaml.
Before proceeding, check [OCaml release changelog](https://github.com/ocaml/ocaml/releases) and ensure that the OCaml version that you are going to install is compatible.

    a. Install the build script:
    ```shell
    sudo apt-get install build-essential make
    ```
    b. Download the ocaml archive:
    ```shell
    wget http://caml.inria.fr/pub/distrib/ocaml-4.06/ocaml-4.06.0.tar.gz
    ```
    c. Extract the downloaded archive:
    ```shell
    tar xvf ocaml-4.06.0.tar.gz
    ```
    d. Change the directory:
    ```shell
    cd ocaml-4.06.0
    ```
    e. Configure and compile ocaml:
    
    ```shell
    ./configure
    make world
    make opt
    umask 022
    ```
    
    f. Install ocaml and clean:
    ```shell
    sudo make install
    sudo make clean
    ```
5. Compile and Install Unison.
{% info_block warningBox %}
Before proceeding:
{% endinfo_block %}
    
1. Check Unison release.
2. Download the source code.
3. Compile and install it.
    a. Download the Unison archive:
    ```shell
    wget https://github.com/bcpierce00/unison/archive/v2.51.2.tar.gz
    ```
    b. Extract the archive:
    ```shell
    tar xvf v2.51.2.tar.gz
    ```
    c. Change the directory:
    ```shell
    cd unison-2.51.2
    ```
    d. Compile and install Unison:
    ```shell
    make UISTYLE=text
    sudo cp src/unison /usr/local/bin/unison
    sudo cp src/unison-fsmonitor /usr/local/bin/unison-fsmonitor
    ```
</details>

<!-- Last review date: Aug 06, 2019by Mike Kalinin, Andrii Tserkovnyi -->
