---
title: Add navigation in the Back Office
description: This document describes how to make your new controller action accessible in the navigation bar.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/adding-navigation-in-the-back-office
originalArticleId: dcc2dc3b-5c24-4239-8c24-a49fc8e2351f
redirect_from:
  - /docs/scos/dev/back-end-development/zed/add-navigation-in-the-back-office.html
related:
  - title: Zed overview
    link: docs/dg/dev/backend-development/zed/zed.html
---

This document describes how to make a controller action accessible in the navigation bar.

There are two places to define the navigation configuration:

* In the global configuration file: `config/Zed/navigation.xml`.
* In a module configuration file: `src/Pyz/Zed/{moduleName}/Communication/navigation.xml`.

{% info_block infoBox "Replace a placeholder" %}

Replace `{moduleName}` with the actual module name.

{% endinfo_block %}

## Define a navigation merge strategy

When you add navigation on a project level, you need to merge it with the core navigation. There are two strategies to do that: `BREADCRUMB_MERGE_STRATEGY` and `FULL_MERGE_STRATEGY`.

Using `BREADCRUMB_MERGE_STRATEGY`, the first two levels of project-level navigation elements replace the core-level ones. All the project-level navigation elements below level two are appended to the core-level navigation elements. Use this strategy to avoid duplication of the navigation elements that can have different parent elements in core and project-level navigations.

Using `FULL_MERGE_STRATEGY`, all the project-level navigation elements are appended to the core-level navigation elements.

To define a merging strategy, follow these steps:
1. Add the following code to `src/Pyz/Zed/ZedNavigation/ZedNavigationConfig.php`.

```php
<?php

namespace Pyz\Zed\ZedNavigation;

use Spryker\Zed\ZedNavigation\ZedNavigationConfig as SprykerZedNavigationConfig;

class ZedNavigationConfig extends SprykerZedNavigationConfig
{
    /**
     *
     * @return string
     */
    public function getMergeStrategy(): string
    {
        return static::{merging_strategy};
    }
}
```

2. Replace `{merging_strategy}`with the desired merging strategy type.

## Add navigation using the global navigation configuration

After you've [defined a navigation merge strategy](#define-a-navigation-merge-strategy), do the following to add a controller action to the navigation bar:

1. Add the following XML block within the configuration tag scope of `config/Zed/navigation.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
[...]
    <hello-world>
        <label>Hello World</label>
        <title>Hello World</title>
        <bundle>hello-world</bundle>
        <pages>
            <greeter>
                <label>Greeter</label>
                <title>Greeter</title>
                <bundle>hello-world</bundle>
                <controller>index</controller>
                <action>index</action>
                <visible>1</visible>
            </greeter>
        </pages>
    </hello-world>
[...]
</config>
```

2. Build a navigation cache to apply the changes:

```bash
vendor/bin/console application:build-navigation-cache
```


## Add navigation using the module navigation configuration

After you've [defined a navigation merge strategy](#define-a-navigation-merge-strategy), do the following to add a controller action to the navigation bar:

1. Define the new menu point in the navigation configuration of the module:

```php
touch src/Pyz/Zed/HelloWorld/Communication/navigation.xml
```

2. Insert the following into the created file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
    <hello-world>
        <label>Hello World</label>
        <title>Hello World</title>
        <bundle>hello-world</bundle>
        <pages>
            <greeter>
                <label>Greeter</label>
                <title>Greeter</title>
                <bundle>hello-world</bundle>
                <controller>index</controller>
                <action>index</action>
                <visible>1</visible>
            </greeter>
        </pages>
    </hello-world>
</config>
```

3. Build the navigation cache to apply the changes:

```php
vendor/bin/console application:build-navigation-cache
```

{% info_block warningBox "Verification" %}

Reload the Back Office page. You can see the **Greeter** navigation element under the **Hello World** navigation element.

{% endinfo_block %}

## Hide root navigation elements

When navigation XML files are merged, you can hide a root element by adding a `visible` keyword.
Add the following to `config/Zed/navigation.xml`:

```xml
...
<sales><visible>0</visible></sales>
...
```
