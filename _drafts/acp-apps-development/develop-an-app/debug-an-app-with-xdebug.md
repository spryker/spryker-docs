---
title: Debug an app with XDebug
Descriptions: Learn how to use XDebug for your app
template: howto-guide-template
last_updated: Jan 10, 2024
redirect_from:
- /docs/acp/user/develop-an-app/debug-an-app-with-xdebug.html
---

This document describes how to set up and use XDebug to debug your app. 

Keep in mind that the steps described here may vary slightly depending on your specific development environment; however, they should still assist you in setting up XDebug for debugging in most scenarios.

## Set up DockerSDK with XDebug

To start a testing container with XDebug enabled (disabled in the default container), execute the following command:

```bash
docker/sdk testing -x
```

### Configure PHPStorm for XDebug

To configure PHPStorm for XDebug, do the following:

1. In PHPStorm, go to **Preferences → PHP → Servers**.
2. Click the `+` sign to add a new configuration with the following details:
   - Name: spryker
   - Host: spryker.local
3. Enable the *Use path mappings* option, selecting it based on whether the server is remote or if symlinks are used. For example, map the path from `/path/to/root/of/the/app` to `/data`.
4. Click `Apply` and then `OK` to save the configuration.

PHPStorm is now ready to accept XDebug connections, allowing you to debug your app using XDebug.



