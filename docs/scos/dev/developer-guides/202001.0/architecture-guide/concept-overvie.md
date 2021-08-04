---
title: Conceptual Overview
originalLink: https://documentation.spryker.com/v4/docs/concept-overview
redirect_from:
  - /v4/docs/concept-overview
  - /v4/docs/en/concept-overview
---

Spryker is a Commerce Operating System composed of the following applications: Storefront (Yves), Backoffice (Zed), Storefront API (Glue).

* Storefront - Front-end-presentation layer for customers, provided by Yves Application Layer based on [Symfony Components](https://symfony.com/components).
* Backoffice - an application that contains all business logic and the backend GUI, provided by Zed Application Layer, also makes use of on Symfony Components.
* Storefront API - an application providing resources for customers' interaction, provided by Glue Application Layer, based on [JSON API convention](https://jsonapi.org/).

The following diagram shows the conceptual parts of the application and their connections:
![Spryker overview](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Architecture+Concepts/Conceptual+Overview/spryker-overview.png){height="" width=""}

The Spryker OS provides the following Application Layers:

* Yves - provides frontend functionality with the light-weight data access
* Zed - provides backoffice/backend functionality with heavy calculations
* Glue - provides infrastructure for API with the mixed data access
* Client - provides data access infrastructure
* Shared - provides shared code abstractions to be used in other Application Layers
* Service - provides infrastructure for the stateless operations, usually utils

{% info_block infoBox %}

See [Programming Concepts](/docs/scos/dev/developer-guides/202001.0/architecture-guide/programming-con) to learn about the Spryker building blocks contained in each of the Application Layers.

{% endinfo_block %}

Application Layers structure support you in a better conceptual decoupling and not always represent a bootstraped Application.

## Code Structure

When you look into the source-code, you can see that the code is divided in two parts:

1. in the `src/` directory you can find the code of your current project. This is where you will do your implementations.
2. in the `vendor/spryker`,  `vendor/spryker-shop` directories you will find what we call the Spryker-core.

Directories

|            Path            |                           Purpose                            |
| :------------------------: | :----------------------------------------------------------: |
|      src/{Namespace}/      | This is where you will do the programming. Here you can find all the code for Yves and Zed. |
|  vendor/spryker,  vendor/spryker-shop  | Here you can find the code of the Spryker-core. It follows the same architectural rules which you use in the project’s code. |
| vendor/{vendor}/{package}/ | In the vendor directory you can also find other packages that are installed via composer install. |
|           data/            |      Directory for log files and other temporary data.       |
|   public/Yves/index.php    |      Web-server entry point of Storefront application.       |
|    public/Yves/assets/     |  Static files (CSS, JS, and assets) for the project’s Yves.  |
|    public/Zed/index.php    |      Web-server entry point of Backoffice application.       |
|     public/Zed/assets/     |  Static files (CSS, JS, and assets) for the project’s Zed.   |
|   public/Glue/index.php    |    Web-server entry point of Storefront API application.     |

<!-- Last review date: Feb 28th, 2019-- by Denis Turkov, Oksana Karasyova -->
