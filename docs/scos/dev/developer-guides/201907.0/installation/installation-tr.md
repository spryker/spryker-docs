---
title: Troubleshooting
originalLink: https://documentation.spryker.com/v3/docs/installation-troubleshooting
redirect_from:
  - /v3/docs/installation-troubleshooting
  - /v3/docs/en/installation-troubleshooting
---

## Peer authentication failed for user postgres

If you get the error below while running `./setup`, on the `Setup Zed` step:

```php
Zed Exception: RuntimeException - psql: FATAL:  Peer authentication failed for user "postgres"
```

then open the PostgreSQL configuration file :

```bash
sudo vim /etc/postgresql/9.4/main/pg_hba.conf
```

and make sure that the first line contains the following input:

```php
TYPE      DATABASE    USER      ADDRESS     METHOD
local     all         postgres              trust
```

## Too many open files in Dev VM

If you get the *Too many open files* error while running `./vendor/bin/install`, you need to adjust the maximum number of open files as follows:

```bash
ulimit -n 65535
```

## Error on box image download

If you get an error on downloading Spryker VM box image file, try running Vagrant with debug to see potential errors: `vagrant up --debug`.

Also, you can go to [Spryker VM Releases](https://github.com/spryker/devvm/releases/) page and download the box manually. After finishing the box download, you need to run the following:

```bash
vagrant box add /path/to/downloaded/image/file.box --name <boxname>
vagrant up
```

## The host path of the shared folder is missing

If you get *The host path of the shared folder is missing* error when building the virtual machine in Windows, you need to clone the Spryker repository manually and start the machine again. To do this, execute the following commands:

```php
mkdir project
cd project
git clone https://github.com/spryker-shop/suite.git .
cd ..
vagrant up
```

## VM stuck at 'Configuring and enabling network interfaces'

If Spryker Virtual Machine gets stuck at the *Configuring and enabling network interfaces* message during start up, do the following:

1. Press `Ctrl+C` twice to stop the VM start up process.

2. Execute the `vagrant halt` command to stop the VM.

3. Start the virtual machine again with *vagrant up*.

{% info_block infoBox %}
If you get a message that the machine is already running, end all processes related to *Vagrant*, *Virtualbox* and *Ruby*. Then try again.
{% endinfo_block %}

4. If the start up process halts again with the same message, delete all virtual network interfaces in **Virtualbox** and restart the VM again.

{% info_block infoBox %}
The interfaces will be re-created automatically.
{% endinfo_block %}

## NPM error during installation

During Spryker Commerce OS installation , you can get the following error:

```bash
npm ERR! code ELIFECYCLE
npm ERR! errno 137
npm ERR! spryker-master-suite@ zed: `node ./node_modules/@spryker/oryx-for-zed/build`
npm ERR! Exit status 137
npm ERR! Failed at the spryker-master-suite@ zed script.
```

To fix it:

1. On the host, execute the following commands:

   ```bash
   vagrant reload
   vagrant ssh
   ```

2. In the code installation directory, delete folder `node_modules` and file `package_lock.json`.

3. Execute the following command inside the VM:

   ```bash
   vendor/bin/install -s frontend
   ```

## NFS export issues

If you get the following error:

```
NFS is reporting that your exports file is invalid, this means that Vagrant does
this check before making any changes to the file. Please correct
the issues below and execute "vagrant reload":
exports:3: path contains non-directory or non-existent components: /devvm/pillar
exports:3: no usable directories in export entry
exports:3: using fallback (marked offline): /
exports:4: path contains non-directory or non-existent components: /devvm/saltstack
exports:4: no usable directories in export entry
exports:4: using fallback (marked offline): /
```

run the following commands, try re-creating NFS exports:

```bash
sudo rm /etc/exports
sudo touch /etc/exports
```

If you still get the *NFS is reporting that your export file is invalid* error, this can also happen because you previously had VMs that were not properly destroyed. Also, such an error can occur when multiple VMs are hosted o the same computer. To fix this:

```bash
sudo sed -i .bak '/VAGRANT-BEGIN/,/VAGRANT-END/d' /etc/exports
```

Then, you need to re-initialize the VM:

```bash
vagrant halt
vagrant up --provision
# - OR -
vagrant destroy
vagrant up
```

## .NFS files crash my console commands

You can get the following error when running `vendor/bin/console` or console commands inside the development VM:

```
Error: ENOTEMPTY, directory not empty
'/data/shop/development/current/static/public/Yves/images/icons' at Error (native)
```

This is caused by peculiarities of the NFS file system design. Make sure you have the latest version of the VM installed and also disable the Ngnix `open_file_cache` feature. To do so, execute the following commands:

```bash
sudo grep -r open_file_cache /etc/nginx/
/etc/nginx/nginx.conf:  open_file_cache off;
```

To get the latest Saltstack for your VM and reconfigure Nginx, do the following:

```bash
# on your host
cd vendor/spryker/saltstack # (or where you have the Saltstack repository on your host)
git pull
# inside the vm
sudo salt-call state.highstate whitelist=nginx
```

If you are running Mac OSX as a host system: disable Spotlight for your Code directory. For details, see: [How to disable spotlight index for specific folder in Mac OS X](http://www.techiecorner.com/254/how-to-disable-spotlight-index-for-specific-folder-in-mac-os-x/).

To remove stale .nfs files, execute the following either on your host or inside the VM:

```bash
find . -name .nfs\* -exec rm {} \;
```

## My Elasticsearch dies

```
[Elastica\Exception\Connection\HttpException]
Couldn't connect to host, Elasticsearch down?
```

Restart Elasticsearch:

```bash
# find out which Elasticsearch you are using:
grep -r ELASTICA_PARAMETER__PORT /data/shop/development/current/config/Shared
# If you have port 10005
sudo -i service elasticsearch-development restart
# Older VMs used port 9200
sudo -i service elasticsearch restart
```

Do you have more than one Elasticsearch instances running?

```bash
sudo -i service elasticsearch status
sudo -i service elasticsearch-development status
sudo -i service elasticsearch-testing status
# Stop some of them ... (see above on how to figure out which one)
sudo -i service elasticsearch... stop
# ... and disable them
sudo -i update-rc.d elasticsearch... disable
```

## Exception connecting to Redis

You can get the following exception from Redis:

```php
Exception: stream_socket_client(): unable to connect to tcp://......:10009 (Connection refused)
```

This means that Redis encountered a corrupted AOF file. The following error will also be logged in Redis logs located in the following folder: `/data/logs/development/redis`:

```
Bad file format reading the append only file: make a backup of your AOF file, then use ./redis-check-aof --fix [filename];
```

To fix the exception:

1. Run

   ```bash
   sudo redis-check-aof --fix /data/shop/development/shared/redis/appendonly.aof
   ```

   You should get:

   ```bash
   Successfully truncated AOF
   ```

2. Start Redis server

   ```bash
   sudo service redis-server-development start
   ```

3. Make sure Redis can write log files under: `/data/logs/development/redis/`

   ```bash
   sudo chown redis:redis /data/logs/development/redis/ -R
   ```

## Mac OSX and iterm2 (locale error)

If you encounter error messages like this one:

```bash
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
LANGUAGE = (unset),
LC_ALL = (unset),
LC_CTYPE = "de_DE.UTF-8",
LANG = "C"
are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
LANGUAGE = (unset),
LC_ALL = (unset),
LC_CTYPE = "de_DE.UTF-8",
LANG = "C"
are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
```

Go to iterm2 Preferences -> Profiles -> Terminal and disable option *Set locale variables automatically*.

## Setup MySQL Workbench to avoid port clashing with the host system

We recommend setting up TCP/IP over SSH for MySQL to avoid port clashing with the host system. For current connection values have a look at `config/Shared/config_default-development_DE.php`. Use `$HOME/.vagrant.d/insecure_private_key` as SSH Key File.

MySQL:
![Workbench vagrant setup](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Troubleshooting/msql-workbench-vagrant-setup.png){height="" width=""}

In case the connection fails, run the following command :

```bash
CREATE USER 'root'@'%' IDENTIFIED BY ''; # no password will be set
GRANT ALL PRIVILEGES ON * . * TO 'root'@'%';
FLUSH PRIVILEGES;
```

This command creates a new root user with full permissions.

## Wrong curl version error on Mac OS

If you receive an error about a wrong curl version on Mac OS, you resolve the issue using the following command:

```bash
sudo rm -rf /opt/vagrant/embedded/bin/curl
```

## Failed to decode response: zlib_decode(): data error

If you see the above error during `composer install` or `composer update`, you need to change your composer configuration. Run `composer config -ge` in the terminal and replace the configuration with the following one

```php
{
    "repositories": {
        "packagist": { "url": "https://packagist.org", "type": "composer" }
    }
}
```

## Installation fails on MacOS due to SIP

SIP (System Integrity Protection) is a MacOS feature that protects the system files from modification. In some cases, it precludes the proper functioning of third-party applications and may prevent you from installing Spryker on MacOS starting from version 10.11 El Capitan. To solve this problem, you need to disable SIP during the installation:

1. Reboot your Mac and hold down the Command+R as it boots.
2. Wait for entering the recovery environment.
3. Click on the “Utilities” menu and select “Terminal”.
4. Type `csrutil disable` in the terminal and press Enter.
5. Type `reboot`.

Now SIP is disabled and you can start your installation. After it’s finished, it is strongly recommended enabling SIP again. You can do this by following the previous steps again with typing `csrutil enable` at Step 4. To determine, whether SIP is enabled or not, you can type `csrutil status`.

 <!-- Last review date: November 11, 2018 by Dmitry Beirak -->
