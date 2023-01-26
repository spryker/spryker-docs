---
title: Project namespaces
description:
last_updated: Nov 22, 2022
template: howto-guide-template
---

In Spryker, the project namespace is used to identify and distinguish your project from other projects within the framework. It helps to ensure that the code and resources specific to your project are properly organized and separated from the rest of the framework.

Using a project namespace also helps to prevent naming conflicts with other projects, as it allows you to use unique names for your project's classes, functions, and other code elements. This can be especially important when working with a large, complex framework like Spryker, as it can help to keep your code organized and maintainable.
Overall, the project namespace is an important part of Spryker framework and can help to improve the reliability, scalability, and maintainability of your project.

At Spryker the default project name is Pyz and the project code is located in: `src/Pyz` folder. According to the PSR-4 standard PHP namespace has to correlate with folder name. In this case the namespace must be `Pyz` and followed that in a subfolder e.g. `src/Pyz/Zed/Cart` the namespace will be `Pyz\Zed\Cart`.

Projects can be renamed but to follow up the PSR-4 standard namespaces must be rewritten in all php files in projects directory and all sub-directories.
In the case of creating new directories for projects source codes it’s also mandatory to follow the namespace convention, started the naming from the src directory level.

## How to configure project namespaces

After You decided the unique custom namespace of Your project e.g. "*MyProject*", you will need to follow these steps:

1. Create a directory for your namespace under the src directory of your Spryker project. The directory should have the same name as your namespace, with each part of the namespace separated by a directory separator (e.g., `src/MyProject` for the *MyProject* namespace).
   
2. Inside the namespace directory, create a Shared directory. This directory will contain code that is shared between the client and the server parts of your Spryker application.

3. Add the namespace to the autoloader configuration in the *composer.json* file. You can do this by adding the namespace to the psr-4 autoloader configuration
```json
"autoload": {
    "psr-4": {
        "MyProject\\": "src/MyProject"
    }
}

```

Run the `composer dump-autoload` command to regenerate the autoloader files.


4. Next, you will need to configure the project name as root project in the framework. `PROJECT_NAMESPACE` constant is a predefined constant in Spryker that represents the root namespace of your project. This can be configured in different ways.

   1.  This can typically be done by modifying the **`config_default.php`** file, which is located in the **`config`** directory of your Spryker project.
In the **`config_default.php`** file, you will need to set the **`PROJECT_NAMESPACE`** constant to your desired namespace. In our excample to *MyProject*.

    ```php
    $config[KernelConstants::PROJECT_NAMESPACE] = 'MyProject';
    ```
   2. Another possibility is to set the **`PROJECT_NAMESPACE`** constant to create a SharedConfig class. In a Spryker project, the SharedConfig class is used to define configuration constants that are shared between the client and the server parts of the application. 
To use the SharedConfig class in your project, you will need to define it in a PHP file under the Shared directory of your namespace. For example, you could create a file called `src/MyProject/Shared/config/SharedConfig.php` and define your constants like this:

    ```php
    namespace MyProject\Shared\Config;

    use Spryker\Shared\Config\Config;

    class SharedConfig
    {
        public const PROJECT_NAMESPACE = 'MyProject';
    }

```
