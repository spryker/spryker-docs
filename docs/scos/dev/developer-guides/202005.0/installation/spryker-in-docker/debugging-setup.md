---
title: Debugger Setup in Docker
originalLink: https://documentation.spryker.com/v5/docs/debugging-setup-in-docker
redirect_from:
  - /v5/docs/debugging-setup-in-docker
  - /v5/docs/en/debugging-setup-in-docker
---

This document provides information about setting up the debugging for Spryker in Docker.

[Xdebug](https://xdebug.org) is used to debug setup in Docker. To enable Xdebug, run the command:
```bash
docker/sdk {run|start|up} -x
``` 
## Configuring Xdebug in PhpStorm - Required Configuration

This section describes the required configuration for Xdebug in PHPStorm.

### Xdebug configuration
Follow the steps to configure Xdebug in PHPstorm:
1. Open **Preferences** → **Languages & Frameworks** → **PHP** → **Debug**.

2. In the **Xdebug** block:

      a. Depending on your requirements, change the **Debug port** value. It is set to "9000" by default.
      b. If not selected, select the **Can accept external connections** checkbox.
      c. If selected, clear the **Force break at first line when no path mapping specified** and **Force break at first line when a script is outside the project** checkboxes.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/binary.png){height="" width=""}

3. In the **External connections** block:

      a. Increase **Max. simultaneous connection** from 4 to 5.
      b. If selected, unselect the **Ignore external connections through unregistered server configurations** and **Break at first line in PHP scripts** checkboxes.

![image 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/binary2.png){height="" width=""}

### Servers configuration
Follow the steps to configure servers:
1. Open PHPStorm → **Preferences** → **Languages & Frameworks** → **PHP** → **Servers**.

2. Add a server:

    1. In the **Name** field, enter *spryker*.
    2. In the **Host** section, enter *spryker*.
    3. Select the **Use path mappings** checkbox.
    4. Set the absolute path to the `/data` folder on the server for the folder with your Spryker project files.
    ![Servers config](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/servers-confg.png){height="" width=""}


## Configuring Xdebug in PhpStorm - Optional Configuration
This section describes the optional configuration for Xdebug in PHPStorm.

### Remote PHP Interpreter Setup
Follw the steps to add a PHP interpreter:
1. Open **Preferences** → **Languages & Frameworks** → **PHP**.
2. Add new remote PHP interpreter:
  a. Server: "Docker"
  b. Image name: "spryker_app:latest"
  c. PHP interpreter path: **php** 

![Remote php interpreter](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/remote-php-interpreter.png){height="" width=""}

### Remote Debug configuration
Follow the steps to add a PHP Remote Debug configuration:
1. Open **Run** → **Edit Configurations...**.
![Edit configurations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/edit-configs.png){height="" width=""}

2. Add new **PHP Remote Debug** configuration.
![PHP remote debug](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/php-remote-debug.png){height="" width=""}

3. Set the name to "spryker".
4. Select the **spryker** server.
5. Set the **PHPSTORM** IDE key.

## Debugging with Xdebug

To debug an application, do the following:

1. Make a breakpoint:
![Breakpoint](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/breakpoint.png)

2. Click ![Start listening](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/start-listening.png)
3. Open the application in browser.
4. Navigate to the action for which you configured the breakpoint in step 1. The debugging process should be running in the IDE:
![Debug process](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/debug-process.png)

