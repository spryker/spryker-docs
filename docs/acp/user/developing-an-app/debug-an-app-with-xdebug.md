---
title: Debugging Your App with Xdebug
Descriptions: Learn how to use Xdebug
template: howto-guide-template
redirect_from:
- /docs/acp/user/developing-an-app.html
---

## Introduction

Debugging your application becomes a seamless process with the provided DockerSDK, which comes equipped with a configuration to effortlessly run your app with Xdebug. This guide will walk you through the steps to set up and use Xdebug for debugging purposes.

### Setting Up DockerSDK with XDebug

To start a testing container with XDebug enabled (disabled in the default container), execute the following command in your terminal:

```bash
docker/sdk testing -x
```


### Configuring PHPStorm for XDebug

1. Open PHPStorm and navigate to Preferences → PHP → Servers.
2. Click the "+" sign to add a new configuration with the following details:
   - Name: spryker
   - Host: spryker.local
3. Enable the Use path mappings option, selecting it based on whether the server is remote or if symlinks are used. For example, map the path from /path/to/root/of/the/app to /data.
4. Click `Apply` and then `OK` to save the configuration.

Now, PHPStorm is ready to accept XDebug connections, and you can efficiently debug your application using Xdebug.

Remember that these steps may vary slightly depending on your specific development environment, but this general guide should help you set up Xdebug for debugging in most scenarios.

