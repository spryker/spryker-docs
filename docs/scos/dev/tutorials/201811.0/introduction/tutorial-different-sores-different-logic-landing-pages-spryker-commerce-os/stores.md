---
title: Tutorial - Stores - Legacy Demoshop
originalLink: https://documentation.spryker.com/v1/docs/stores
redirect_from:
  - /v1/docs/stores
  - /v1/docs/en/stores
---

<!--used to be: http://spryker.github.io/onboarding/stores/-->

## Challenge Description
Override a `Zed` core module on a project level, and then override it on a store level. You can also repeat the same challenge for a Yvesmodule.

## Challenge Solving Highlights
### Project Level
Let’s first override on the project level.

* Add the `ndexController::indexAction()` to `src/Pyz/Zed/Application/Communication/Controller` that outputs a string containing a message about the project level.

Check [http://zed.de.demoshop.local](http://zed.de.demoshop.local/). That’s it!

### Store Level
Now, let’s override the same module for a store level.

1. Add store configuration for XY inside the `config/Shared/stores.php` configuration file.
2. Create `config_default-<store>.php` and `config_default_<environment>_<store>.php`. You can copy another config file and change the name for XY store.
3. Add a new module called `ApplicationXY` inside `src/Pyz/Zed`.
4. Add an `IndexController::indexAction()` to your new module `ApplicationXY` that outputs a string containing a message about the store level.
5. Change the store in Nginx config for Zed. To do so, open the config file: `/etc/nginx/sites-available/DE_development_zed` and change the `$application_store to XY`.
6. Restart Nginx by running `sudo /etc/init.d/nginx restart`.

Configuring the store XY is done! Check again [http://zed.de.demoshop.local](http://zed.de.demoshop.local/) to see the new message for the XY store.
