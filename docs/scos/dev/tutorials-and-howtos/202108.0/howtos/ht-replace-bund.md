---
title: HowTo - Replace Spryker Module Dependencies
originalLink: https://documentation.spryker.com/2021080/docs/ht-replace-bundle-dependencies
redirect_from:
  - /2021080/docs/ht-replace-bundle-dependencies
  - /2021080/docs/en/ht-replace-bundle-dependencies
---

{% info_block infoBox "Spryker Dependencies" %}
This content describes how to identify module dependencies and replace a dependent module with another one.
{% endinfo_block %}

Each Spryker module might have several dependent modules that provide communication, utilities and added functionality. Usually adjustments are done via our plugin mechanism or via class extensions. However, when introducing a massive functional change, you may need to replace an entire core module with one of your own (or a 3rd party). To do so, there are two steps that you need to follow. Firstly, you will need to replace the module and secondly, connect the modules to the new functionality.

**For example:**
A company working with the Payone and Refund modules decides they want to use a different refund functionality. They can replace the core refund module with their own implementation that satisfies the same interface. This requires that they first replace the existing refund module with a new refund implementation in the project code. Then, they will have to reroute the Payone module to communicate with the new refund functionality instead.

**Prerequisites:**
In the example above we assume that you know exactly what core module you want to replace. If that is not the case, you will first need to know what are the core module’s dependencies. You can find this information in a module’s composer.json file. This file lists all the dependent components and can be used to locate the dependent functionality that you want to replace, based on your project’s requirements.

**To replace a module with another module:**
The following process describes adding a replace command into a new module to indicate that it replaces a core module.

For each module that you want to add:

1. Replace the old module with the new one by creating a dummy module repository in a directory accessible to composer.
    1. Name or rename the new module by using the old module’s name and prefixing it with `replace_`.  For example, create a dummy file called `replace_refund` to replace the refund module. This will help to keep track of any relplaces you do in the project.
    2. In the newly created dummy module directory, create an empty `composer.json` file and add the following Composer configuration information.
    3. Add the newly created module to your project’s `composer.json` file by going to `shop/composer.json` and adding the new location.
    4. Check if the core module is in your project’s `composer.json` file and if it is, remove it.
2. Execute composer update with the replace module name: composer update `“replace_<the name of the module you are replacing>”`. Running composer update will remove all mentions of the module (for example: refund) and replace it with your module (for example: replace_refund’).

{% info_block warningBox %}
For more information on using the composer replace command click [here](https://getcomposer.org/doc/04-schema.md#replace
{% endinfo_block %}.)

## Composer Configuration Information

```
{
     "name": “<vendor>/ replace_<the name of the module you are replacing> ",
     "replace": {
       "spryker/<the name of the module you are replacing> ":"*"
     },
     "description": “<add_decription_of_what_you_are_replacing>"
    }
```

If you added a replace module, go to `shop/vendor` and check that composer added the new `replace_ module/s` to this directory.

**To check this worked:**
Go to `shop/vendor/spryker` and check that composer removed the modules that needed to be replaced from the directory. The next step is to connect the module with your new functionality.

## Setting up a Connection With the New Functionality

Now that we have replaced a core module with a different module, we need to connect the rest of the OS to this new module.

To set up connectivity, check the replaced module’s usage and adapt its logic to the new module.

For further assistance on project level implementations, email us [support@spryker.com](mailto:support@spryker.com).
