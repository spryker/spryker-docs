---
title: An error during front end setup
originalLink: https://documentation.spryker.com/2021080/docs/an-error-during-front-end-setup
redirect_from:
  - /2021080/docs/an-error-during-front-end-setup
  - /2021080/docs/en/an-error-during-front-end-setup
---

## Description
The `frontend:project:install-dependencies` command returns an error similar to the following:
```
-->  DEVELOPMENT MODE
Store: US | Environment: docker
Install Project dependencies
[info] npm
[info]  WARN prepare
[info]  removing existing node_modules/ before installation
[info]
> fsevents@1.2.11 install /data/node_modules/fsevents
> node-gyp rebuild
[info] gyp
[info]  ERR! find Python
gyp ERR! find Python
[info]  Python is not set from command line or npm configuration
gyp ERR!
[info] find Python Python is not set from environment variable PYTHON
gyp ERR!
[info]  find Python checking if "python" can be used
gyp ERR!
```
## Solution
1. In `deploy.*.yaml`, change the base PHP image:
```yaml
image:
    tag: spryker/php:7.3-alpine3.10
```

2. Fetch the changes and start the instance:
```bash
docker/sdk boot && docker/sdk up
```
