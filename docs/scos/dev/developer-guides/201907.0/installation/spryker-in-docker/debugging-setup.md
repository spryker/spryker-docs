---
title: Debugging Setup in Docker
originalLink: https://documentation.spryker.com/v3/docs/debugging-setup-in-docker-201907
redirect_from:
  - /v3/docs/debugging-setup-in-docker-201907
  - /v3/docs/en/debugging-setup-in-docker-201907
---

## Running Spryker containers with Xdebug enabled

Run containers:
```shell
docker/sdk up -x
```

{% info_block infoBox %}
If containers are already running, the fastest option is to run `docker/sdk run -x`.
{% endinfo_block %}

## Configuring Xdebug in PhpStorm

### Required Configuration

<details open>
    <summary> Xdebug configuration</summary>

Open **Preferences** → **Languages & Frameworks** → **PHP** → **Debug** in PhpStorm and do the following:

1. In the **Xdebug** block:

  a. Depending on your requirements, change the **Debug port** value. It is set to "9000" by default.
  b. If not selected, select the **Can accept external connections** checkbox.
  c. If selected, clear the **Force break at first line when no path mapping specified** and **Force break at first line when a script is outside the project** checkboxes.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/binary.png){height="" width=""}

2. In the **External connections** block:

  a. Increase **Max. simultaneous connection** from 4 to 5.
  b. If selected, unselect the **Ignore external connections through unregistered server configurations** and **Break at first line in PHP scripts** checkboxes.

![image 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/binary2.png){height="" width=""}

</details>

<details open>
    <summary> Servers configuration</summary>

Open **Preferences** → **Languages & Frameworks** → **PHP** → **Servers** in PhpStorm and do the following:

Add a server:

1. In the **Name** field, enter *spryker*.
2. In the **Host** section, enter *spryker*.
3. Select the **Use path mappings** checkbox.
4. Set the absolute path to the `/data` folder on the server for the folder with your Spryker project files.
![Servers config](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/servers-confg.png){height="" width=""}

</details>

### Optional Configuration

<details open>
    <summary> Remote PHP interpreter Setup</summary>

1. Open **Preferences** → **Languages & Frameworks** → **PHP**.
2. Add new remote PHP interpreter:
  a. Server: "Docker"
  b. Image name: "spryker_app:latest"
  c. PHP interpreter path: **php** 

![Remote php interpreter](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/remote-php-interpreter.png){height="" width=""}

</details>

<details open>
    <summary>Remote Debug configuration</summary>

1. Open **Run** → **Edit Configurations...**.
![Edit configurations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/edit-configs.png){height="" width=""}

2. Add new **PHP Remote Debug** configuration.
![PHP remote debug](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/php-remote-debug.png){height="" width=""}

3. Set the name to "spryker".
4. Select the **spryker** server.
5. Set the **PHPSTORM** IDE key.

</details>

## Debugging with Xdebug

To use Xdebug to debug an application, do the following:

1. Make a breakpoint:
![Breakpoint](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/breakpoint.png)

2. Click ![Start listening](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/start-listening.png)
3. Open the application in browser.
4. Navigate to the action for which you configured the breakpoint in step 1. The debugging process should be running in the IDE:
![Debug process](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Installation/Spryker+in+Docker/Debugging+Setup+in+Docker/debug-process.png)

<!-- Last review date: Aug 06, 2019by Mike Kalinin, Andrii Tserkovnyi -->
