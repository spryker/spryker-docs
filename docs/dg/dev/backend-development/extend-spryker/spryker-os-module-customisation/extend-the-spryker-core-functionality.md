---
title: Extend the Spryker Core functionality
description: To extend the Spryker-Core functionality and to use the Spryker Engine to develop a project, it's important to understand the folder structure used in Spryker Commerce OS.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-extend-spryker
originalArticleId: f35fbe40-fe6e-49e4-9311-7025e2f7c259
redirect_from:
  - /docs/scos/dev/back-end-development/extend-spryker/spryker-os-module-customisation/extend-the-spryker-core-functionality.html
  - /docs/scos/dev/back-end-development/extend-spryker/extending-the-spryker-core-functionality.html
  - /docs/scos/dev/back-end-development/extend-spryker/spryker-os-module-customisation/extending-the-spryker-core-functionality.html
related:
  - title: Extend the core
    link: docs/scos/dev/back-end-development/extend-spryker/spryker-os-module-customisation/extend-the-core.html
  - title: Extend a core module that is used by another
    link: docs/scos/dev/back-end-development/extend-spryker/spryker-os-module-customisation/extend-a-core-module-that-is-used-by-another.html
---

To extend the Spryker Core functionality and to use the Spryker Engine to develop a project, you must understand the folder structure used in Spryker Commerce OS.

The project consists of two parts: *Spryker Core* and *Project* implementation. They both follow the same structure and the project implementation goes on top of the Spryker Core functionalities.

The following schema shows how a request is handled:
![Request handling](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Advanced/Tutorial+Extending+Spryker/request_handling.png)

## Project structure overview

The code is divided into three parts:
* The `src/` folder contains the code of the current project.
* The `vendor/spryker/` folder contains the Spryker OS.
* The `vendor/spryker-eco/` folder contains the Spryker Ecosystem modules, which are distributed separately from the core.
* The `vendor/spryker-sdk/` folder contains the development tools.
* The `vendor/spryker-shop/` folder contains the Shop App (Yves).

All projects, *SprykerCore* and *SprykerEco* parts follow a very similar directory structure:

For example, if `CustomerFacade` is extended on the project side, it has the following locations and namespaces:

In Spryker Core:

* Location: `vendor/spryker/customer/src/Spryker/Zed/Customer/Business`
* Namespace: `Spryker\Zed\Customer\Business`

On the Project layer:

* Location: `src/Pyz/Zed/Customer/Business`
* Namespace: `Pyz\Zed\Customer\Business`

As it can be observed from the preceding example, the location of the file reflects the namespace it's located in.

*SprykerEco modules can be treated as Spryker Core in the context of replacing.*

## Folder organization

Depending on where and how the code is intended to be used, it can be placed in one of the following folders:

* `Client`: The code placed here handles communication between Yves and Zed.
* `Shared`: The code placed here is used both by Yves and Zed (to avoid code duplication).
* `Zed`: The code here is meant only for the backend application.
* `Yves`: The frontend code.
* `Glue`: The code placed here handles communication between Glue API and Client.

Each module contains one folder for every layer of the application:
* `Business`
* `Communication`
* `Persistence`
* `Presentation`

## Extending SprykerCore Functionality
To extend the functionality of a class from SprykerCore, a new class with the same name must be added to the corresponding location on the project side.

Replacement rules, described in the [Extend the core](/docs/dg/dev/backend-development/extend-spryker/spryker-os-module-customisation/extend-the-core.html) document work for the next classes in the Spryker module:

* `Facade`
* `BusinessFactory`
* `Controller`
* `QueryContainer`
* `DependencyProvider`
* `Config`

The following example illustrates how `CategoryFacade` can be extended on the project side:

**Spryker Core:**

```php
<?php

namespace Spryker\Zed\Category\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

class CategoryFacade extends AbstractFacade
{
  ...
}
```

**Project:**

```php
<?php

namespace Pyz\Zed\Category\Business;

use Spryker\Zed\Category\Business\CategoryFacade as SprykerCategoryFacade;

class CategoryFacade extends SprykerCategoryFacade
{
  ...
}
```
