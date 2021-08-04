---
title: Composer
originalLink: https://documentation.spryker.com/v2/docs/composer
redirect_from:
  - /v2/docs/composer
  - /v2/docs/en/composer
---

Spryker Commerce OS uses [Composer](https://getcomposer.org/) as a dependency manager. Composer allows declaring the libraries your project depends on and the versions required as well as it will manage them for you. Composer is downloaded as `composer.phar` file (PHP archive). To start using Composer in your project, all you need is a `composer.json` file. The file defines the required dependencies and is located in the root folder of the project.

{% info_block infoBox %}
Root folder is the main folder that includes all your project files.
{% endinfo_block %}

Spryker Commerce OS consists of a number of independent components. Each of them has a dedicated Git repository. Every module contains its own `composer.json` that defines its dependencies:

```php
{
"name": "spryker/cart",
"description": "Cart module",
"license": "proprietary",
"require": {
"php": ">=7.1",
"spryker/calculation": "^4.0.0",
"spryker/cart-extension": "^1.1.0",
"spryker/kernel": "^3.19.0",
"spryker/messenger": "^3.0.0",
"spryker/quote": "^2.0.0",
"spryker/zed-request": "^3.0.0"
}
```

You can check the current `composer.json` file in the corresponding [repository of the cart module](https://github.com/spryker/cart).

In the project level `composer.json` file you can specify the components that you want to use along with their versions like it is done in our [Demoshop](https://github.com/spryker/demoshop/blob/master/composer.json):

```php
...
"spryker/auth": "^3.0.0",
"spryker/auth-mail-connector": "^3.0.0",
"spryker/availability": "^6.0.0",
"spryker/availability-cart-connector": "^4.0.0",
"spryker/availability-data-feed": "^0.1.0",
"spryker/availability-gui": "^3.0.0",
"spryker/braintree": "^0.5.0",
"spryker/cache": "^3.0.0",
"spryker/calculation": "^4.0.0",
"spryker/cart": "^5.0.0",
"spryker/cart-currency-connector": "^1.0.0",
"spryker/cart-extension": "^1.0.0",
"spryker/cart-note": "^0.1.0",
"spryker/cart-note-extension": "^1.0.0"
...
```

For a detailed explanation on how to manage module versions see, Versioning.

## Core Updates

Pulling hundreds of composer dependencies declared in `composer.json` file takes time and can be tricky sometimes. On the one hand, you want your system to have all the newest functionality and improvements, but on the other hand, you might be reluctant to invest additional development effort into the updates. While minor updates do not affect compatibility, that might not be the case for major updates. Check the recommendations below in order to perform the core updates smoothly.

* **Stay Up-to-Date with the New Features** 
  First of all, make sure you do not miss our two-weekly release mail newsletter ([subscribe](https://now.spryker.com/release-notes) to them and be well informed). Staying up-to-date with the improvements and the new features will help you to understand what releases will bring business value to your company. It’s not recommended to take all major releases or the new modules just because they exist. Once you have taken a module, keep on following the release notes for minor releases and patches and incorporate them once they come out. This method of continuous updates should help to prevent the likelihood of incompatibility and breaks in your project. Always think of the business value you gain from the update, as updates always take some time and it’s up to you to decide if the migration effort is justified in your specific case.
  
* **Know What You Have** 
  We update dependencies based on Atomic Release process. To check what you have installed you can use the `composer.lock` file, that reflects the real status of your installation. composer.lock file can also be found in project’s root folder.

* **Check for Newer Module Versions** 
  You can easily keep track of new module versions [using composer-versions-check](https://github.com/Soullivaneuh/composer-versions-check) as add-on for your local composer tool. It will warn you about outdated Spryker Commerce OS module dependencies.

To install the composer version checker inside your VM run the following command:

```php
composer global require sllh/composer-versions-check
```

After composer update finishes, it will output the warning to help keeping track of the upgrades:

```php
{count} packages are not up to date:

- spryker/{module-name} (2.0.2) latest is 3.0.0
...
```

That means that you are currently running version 2.0.2 of the module, and a new major version 3.0.0 of this module is available.

{% info_block infoBox %}
Make sure every minor or patch release is applied before upgrading to a major released version.
{% endinfo_block %}

To update all the modules, run the following command:

```php
composer update "spryker/*"
```

This will fetch the latest matching versions (according to your `composer.json` file) and update the lock file with the new versions.

To check what major updates are available without changing `composer.json`, run:

```php
php composer.phar outdated
```

Just for the modules that have been extended (factory and classes have been overwritten) the version number needs to be changed and updates need to be performed manually.

To speed up the composer update process, use the [Prestissimo Composer tool](https://github.com/hirak/prestissimo). It will speed up the execution of the composer update and or composer install commands both for local development and in server deployments.

{% info_block infoBox %}
`composer install command will install the defined dependencies for your project.`
{% endinfo_block %}

To install the tool, run:

```php
composer global require hirak/prestissimo
```

Execute `composer update` command at least weekly to assert you have the latest fixes.

## Replace Spryker Module Dependencies

Each Spryker module might have several dependent modules that provide communication, utilities and added functionality. For example, `spryker/product` needs a dependent `spryker/product-label` module as the product label cannot be attached when there is no product itself. Usually, adjustments are done via our [plugin mechanism](/docs/scos/dev/developer-guides/201903.0/development-guide/back-end/data-manipulation/data-enrichment/plugin) or via class extensions. However, when introducing a massive functional change, you may need to replace an entire core module with one of your own (or a 3rd party). To do so, there are two steps that you need to follow. Firstly, you will need **to replace the module**, and secondly, **connect the module to the new functionality**.

The following process describes adding a replace command into a new module to indicate that it replaces a core module.

For each module that you want to add:

* Replace the old module with the new one by creating a dummy module repository in a directory accessible to composer.

* 1. Name or rename the new module by using the old module’s name and prefixing it with `replace_`. For example, create a dummy file called `replace_refund` to replace the refund module. This will help to keep track of any replaces you do in the project.
  2. In the newly created dummy module directory, create an empty `composer.json` file and add the following Composer Configuration Information.
  3. Add the newly created module to your project’s `composer.json` file by going into your project’s `composer.json` and adding the new location.
  4. Check if the core module is in your project’s `composer.json` file and if it is, remove it.

* Execute composer update with the replace module name:

  ```php
  composer update "replace_*the name of the module you are replacing*
  ```

  Running composer update will remove all mentions of the module (for example: `refund`) and replace it with your module (for example: `replace_refund`).

{% info_block infoBox %}
For more information on using the composer replace command see  [Composer website](https://getcomposer.org/doc/04-schema.md#replace
{% endinfo_block %}.)

```php
{
"name": “[vendor]/ replace_[the name of the module you are replacing] ",
"replace": {
"spryker/[the name of the module you are replacing] ":"*"
},
"description": “[add_decription_of_what_you_are_replacing]"			
}
	
```

If you added a replace module, navigate to `vendor/spryker/` and check that composer added the new `replace_` module/s to this directory.

**To check this worked:**

Navigate to `[ROOT]/vendor/spryker/` and check that composer removed the modules that needed to be replaced from the directory. The next step is to connect the module to your new functionality.

### Setting Up Connection With the New Functionality

Now that we have replaced a core module with a different one, we need to connect the rest of the OS to it.

To set up connectivity, check the usage of the replaced module and adapt the logic to the new module.

For further assistance on project level implementations, email us [support@spryker.com](mailto:support@spryker.com).
