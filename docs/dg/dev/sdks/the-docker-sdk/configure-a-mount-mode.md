---
title: Configure a mount mode
description: Learn about supported mount modes and how to configure one depending of your operating system for your Spryker Project.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/configuring-a-mount-mode
originalArticleId: fe2dc3e8-cd52-46d9-a77a-ee55d58fb07c
redirect_from:
  - /docs/scos/dev/the-docker-sdk/202311.0/configuring-a-mount-mode.html
  - /docs/scos/dev/the-docker-sdk/202204.0/configuring-a-mount-mode.html
  - /docs/scos/dev/the-docker-sdk/202307.0/configuring-a-mount-mode.html
  - /docs/scos/dev/the-docker-sdk/202212.0/configuring-a-mount-mode.html

related:
  - title: The Docker SDK
    link: docs/dg/dev/sdks/the-docker-sdk/the-docker-sdk.html
  - title: Docker SDK quick start guide
    link: docs/dg/dev/sdks/the-docker-sdk/docker-sdk-quick-start-guide.html
  - title: Docker environment infrastructure
    link: docs/dg/dev/sdks/the-docker-sdk/docker-environment-infrastructure.html
  - title: Configuring services
    link: docs/dg/dev/integrate-and-configure/configure-services.html
  - title: Docker SDK configuration reference
    link: docs/dg/dev/sdks/the-docker-sdk/docker-sdk-configuration-reference.html
  - title: Choosing a Docker SDK version
    link: docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html
  - title: Choosing a mount mode
    link: docs/dg/dev/sdks/the-docker-sdk/choosing-a-mount-mode.html
  - title: Configuring a mount mode
    link: docs/dg/dev/sdks/the-docker-sdk/configure-a-mount-mode.html
  - title: Configuring access to private repositories
    link: docs/dg/dev/sdks/the-docker-sdk/configure-access-to-private-repositories.html
  - title: Configuring debugging in Docker
    link: docs/dg/dev/set-up-spryker-locally/configure-after-installing/configure-debugging/configure-debugging.html
  - title: Running tests with the Docker SDK
    link: docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html
---

This document describes how to configure a mount mode.

## Configure the mutagen mount mode on MacOS

1. [Install or update Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/) to the latest stable version.

2. Adjust the `mount:` section of `deploy.local.yml` as follows:

```yaml
docker:
...
    mount:
        mutagen:
            platforms:
                 - macos

```

3. Bootstrap the Docker SDK:

```bash
docker/sdk boot
```

4. Follow the installation instructions displayed in the grey block of the output of the command you have run in the previous step.

5. Build and run Spryker application based on demo data:

```bash
docker/sdk up --build --data --assets
```


## Configure the docker-sync mount mode on MacOS

1. Install ruby and ruby-dev 2.7.0preview1 or higher:

```bash
sudo apt-get install ruby ruby-dev
```

2. Install Unison 2.51.2 or higher:

```bash
brew install unison
```

3. Install docker-sync 0.5.11 or higher:

```bash
sudo gem install docker-sync
```

4. Adjust the mount section of `deploy.local.yml` as follows:

```yaml
docker:
...
   mount:
       docker-sync:
           platforms:
               - macos
```

5. Bootstrap the Docker SDK:

```bash
docker/sdk boot
```

6. Follow the installation instructions displayed in the grey block of the output of the command you have run in the previous step.

7. Build and run the application based on demo data:

```bash
docker/sdk up --build --data --assets
```


## Configuring a native mount mode on Linux

1. Install or update Docker for Linux to the latest stable version.

2. Adjust the `mount:` section of `deploy.local.yml` as follows:

```yaml
docker:
...
   mount:
       native:
           platforms:
               - linux
```

3. Bootstrap the Docker SDK:

```bash
docker/sdk boot
```

4. Follow the installation instructions displayed in the grey block of the output of the command you have run in the previous step.

5. Build and run Spryker application based on demo data:

```bash
docker/sdk up --build --data --assets
```


## Configure the docker-sync mount mode on Windows with WSL1

Docker for Windows requires project files to be stored in the Windows file system. For example, you can store project files in `C:/my-project` and use `/c/my-project` as a working directory.
Find more details about it in [Ensure Volume Mounts Work](https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly).

### Install Docker Desktop and WSL1

1. [Install Docker Desktop Stable](https://docs.docker.com/docker-for-windows/install/) 2.3.0.2 or higher.

2. [Enable WSL1](https://learn.microsoft.com/en-us/windows/wsl/install).

### Install and configure Docker in WSL

In WSL, install the latest version of Docker:

1. Update packages to the latest versions:

```bash
sudo apt-get update
```

2. Install the following packages to allow apt to access repositories via HTTPS:

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

5. Install the latest version of Docker Community Edition:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### Install Docker Compose

1. Check the latest stable [release of Docker Compose](https://github.com/docker/compose/releases).
2. Download Docker Compose:

{% info_block infoBox "Docker Compose version" %}

Replace `{docker-compose-release}` in the command parameter with the version you have selected in the previous step.

{% endinfo_block %}

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/{docker-compose-release}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

3. Apply executable permissions to the binary:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

### Install docker-sync

1. Install ruby and ruby-dev:

```bash
sudo apt-get install ruby ruby-dev
```

2. Install docker-sync:

```bash
sudo gem install docker-sync
```


### Set your Docker for Windows host as an environment variable

1. In Docker for Windows settings, select **Expose daemon on tcp://localhost:2375 without TLS**.
2. To update the profile with the environment variable, in your WSL shell, run the command:

```bash
echo "export DOCKER_HOST=tcp://127.0.0.1:2375" >> ~/.bashrc
```

### Compile and install OCaml

1. Install the build script:

```bash
sudo apt-get install build-essential make
```

2. Check the latest compatible [OCaml release](https://github.com/ocaml/ocaml/releases).
In the next steps, replace `{ocaml-version}` in command parameters with the version you choose.
3. Download the OCaml archive:

```bash
wget http://caml.inria.fr/pub/distrib/ocaml-{ocaml-version}/ocaml-{ocaml-version}.tar.gz
```

4. Extract the archive:

```bash
tar xvf ocaml-{ocaml-version}.tar.gz
```

5. Change the directory:

```bash
cd ocaml-{ocaml-version}
```

6. Configure and compile OCaml:

```bash
./configure
make world
make opt
umask 022
```

7. Install OCaml and clean:

```bash
sudo make install
sudo make clean
```

### Compile and install Unison

1. Check the latest [release of Unison](https://github.com/bcpierce00/unison/releases).
In the next steps, replace `{unison-version}` in command parameters with the version you choose.
2. Download the Unison archive:

```bash
wget https://github.com/bcpierce00/unison/archive/{unison-version}.tar.gz
```

3. Extract the archive:

```bash
tar xvf {unison-version}.tar.gz
```

4. Change the directory:

```bash
cd unison-{unison-version}
```

5. Compile and install Unison:

```bash
make UISTYLE=text
sudo cp src/unison /usr/local/bin/unison
sudo cp src/unison-fsmonitor /usr/local/bin/unison-fsmonitor
```

### Configure the environment

1. Adjust the `mount:` section of `deploy.local.yml` as follows:

```yaml
docker:
...
   mount:
       docker-sync:
           platforms:
               - windows
```

2. Bootstrap the Docker SDK:

```bash
docker/sdk boot
```

3. Follow the installation instructions displayed in the grey block of the output of the command you have run in the previous step.

4. Build and run Spryker application based on demo data:

```bash
docker/sdk up --build --data --assets
```

## Configure the native mount mode for Windows with WSL2

Configure the native mount mode for Windows with WSL2, take the following steps.

### Install Docker Desktop and WSL2

1. [Download and install Docker Desktop Stable](https://docs.docker.com/docker-for-windows/install/) 2.3.0.2 or higher.
2. [Enable WSL2](https://learn.microsoft.com/en-us/windows/wsl/install).

### Install and configure Docker in WSL

1. In WSL, update packages to the latest version:

```bash
sudo apt-get update
```

2. Install packages to allow apt to access repositories via HTTPS:

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

5. Install the latest version of Docker Community Edition:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### Install Docker Compose

1. Check the latest stable [release of Docker Compose](https://github.com/docker/compose/releases).
2. Download Docker Compose:

{% info_block infoBox "Docker Compose version" %}

Replace `{docker-compose-release}` in the command parameter with the version you have selected in thprevious step.

{% endinfo_block %}

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/{docker-compose-release}/docker-compos$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

3. Apply executable permissions to the binary:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

### Configure the environment

1. Bootstrap the Docker SDK:

```bash
docker/sdk boot
```

2. Follow the installation instructions displayed in the grey block of the output of the command you have run in the previous step.

3. Build and run Spryker application based on demo data.

```bash
docker/sdk up --build --data --assets
```
