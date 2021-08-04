---
title: Adding Navigation in Zed
originalLink: https://documentation.spryker.com/v2/docs/adding-navigation-in-zed
redirect_from:
  - /v2/docs/adding-navigation-in-zed
  - /v2/docs/en/adding-navigation-in-zed
---

This article describes how to make your new controller action accessible in the navigation bar.

There are two locations where you can define the navigation config :

* In the global `config/Zed/navigation.xml` config file
* Within your module in `src/Pyz/Zed/{moduleName}/Communication/navigation.xml` (replace {moduleName} with the actual module name)

## Add Navigation Using the Global Navigation Config
Add the following XML block within the config tag scope of `config/Zed/navigation.xml` :
```php
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
then run the following from the command line :
```php
vendor/bin/console application:build-navigation-cache
```
and you will have your new menu point visible in the navigation

## Add Navigation Using the Module Navigation Config
To add your controller action in the navigation bar we need to define the the new menu point in the navigation config of our module.

```php
touch src/Pyz/Zed/HelloWorld/Communication/navigation.xml
```
Insert the following xml block into the created file :
```php
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
and run the following command:
```php
vendor/bin/console application:build-navigation-cache
```
Now reload your Zed page and you will find your “Greeter” menu point under the main point “Hello World”.

## Tip
### Hiding Root Navigation Elements
Since all navigation XML files will be merged, you cannot just omit a root element to hide a root element. Instead, use `visible` keyword to hide it.
In your `config/Zed/navigation.xml` config file:
```php
...
<sales><visible>0</visible></sales>
...
```


<!--Last review date: Dec. 12th, 2017 by Mark Scherer-->
 





