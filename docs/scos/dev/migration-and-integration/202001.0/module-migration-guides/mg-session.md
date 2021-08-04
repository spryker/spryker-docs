---
title: Migration Guide - Session
originalLink: https://documentation.spryker.com/v4/docs/mg-session
redirect_from:
  - /v4/docs/mg-session
  - /v4/docs/en/mg-session
---

## Upgrading from Version 3.* to Version 4.*
The previous version made use of the deprecated `spryker/new-relic` and the `spryker/new-relic-api` modules.
To be able to use this version you need to install the `spryker/monitoring` module if you haven't done already by running:
```yaml
composer require spryker/monitoring
```
All session handler classes provided by this module are now using the monitoring module instead of the new-relic module.
Additionally we moved some constants from the `SessionConstants` file to the `SessionConfig` file.
You need to update your `config_*` files and use as values for the session configuration the ones which come from the `SessionConfig` file now.

**Example:**

You need to change all:
`$config[SessionConstants::CONFIG_KEY] = SessionConstants::CONFIG_VALUE;`
**to:**
`$config[SessionConstants::CONFIG_KEY] = SessionConfig::CONFIG_VALUE;`
