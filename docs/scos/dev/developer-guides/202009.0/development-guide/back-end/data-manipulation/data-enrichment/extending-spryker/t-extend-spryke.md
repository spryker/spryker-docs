---
title: Extending the Spryker-Core Functionality
originalLink: https://documentation.spryker.com/v6/docs/t-extend-spryker
redirect_from:
  - /v6/docs/t-extend-spryker
  - /v6/docs/en/t-extend-spryker
---

<!--used to be: http://spryker.github.io/tutorials/zed/extending-spryker/-->
To extend the Spryker-Core functionality and to use the Spryker Engine to develop a project, it’s important to understand the folder structure used in Spryker Commerce OS.

The project consists of two parts : **Spryker Core** and **Project** implementation. They both follow the same structure and the project implementation goes on top of the Spryker Core functionalities.

The picture below shows how a request is being handled:
![Request handling](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Advanced/Tutorial+Extending+Spryker/request_handling.png){height="" width=""}

## Project Structure Overview
The code is divided into three parts:

* `src/` folder contains the code of the current project
* `vendor/spryker/` folder contains the Spryker OS
* `vendor/spryker-eco/` folder contains the Spryker Ecosystem modules, which are distributed separately from core
* `vendor/spryker-sdk/` folder contains the development tools
* `vendor/spryker-shop/` folder contains the Shop App (Yves)

All projects, **SprykerCore** and **SprykerEco** parts follow a very similar directory structure:

For example, if `CustomerFacade` is extended on the project side, it will have the following locations and namespaces:

in Spryker Core :

* location: `vendor/spryker/customer/src/Spryker/Zed/Customer/Business`
* namespace: `Spryker\Zed\Customer\Business`

on the Project layer :

* location: `src/Pyz/Zed/Customer/Business`
* namespace: `Pyz\Zed\Customer\Business`

As it can be observed from the example above, the location of the file reflects the namespace its located in.

**SprykerEco modules can be treated as Spryker Core in the context of replacing.**

## Folder organization
Depending on where and how the code is intended to be used, it can be placed in one of the following folders :

* Client - the code placed in here handles communication between Yves and Zed
* Shared - the code placed in here is used both by Yves and Zed ( to avoid code duplication)
* Zed - the code in here is meant only for the backend application
* Yves - the frontend code
* Glue - the code placed in here handles communication between Glue API and Client

Each module contains one folder for every layer of the application :

* Business
* Communication
* Persistence
* Presentation

## Extending SprykerCore Functionality
To extend the functionality of a class from SprykerCore, a new class with the same name must be added to the corresponding location on the project side.

Replacement rules, described in the [Extending the Core](https://documentation.spryker.com/docs/core-extension ) article work for the next classes in Spryker module:

* `Facade`
* `BusinessFactory`
* `Controller`
* `QueryContainer`
* `DependencyProvider`
* `Config`

The example below illustrates how `CategoryFacade` can be extended on the project side:

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

