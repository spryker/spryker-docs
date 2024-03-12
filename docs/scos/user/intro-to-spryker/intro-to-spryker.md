---
title: Intro to Spryker
description: The Spryker Commerce OS or SCOS is a completely modular, API-first, headless commerce technology for transactional business models in a B2B or B2C context.
last_updated: Mar 4, 2024
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/about-spryker
originalArticleId: 0798f4ee-6a6b-46ed-baa8-e7e885700585
redirect_from:
  - /2021080/docs/about-spryker
  - /2021080/docs/en/about-spryker
  - /docs/about-spryker
  - /docs/en/about-spryker
  - /v5/docs/about-spryker
  - /v5/docs/en/about-spryker
  - /v4/docs/about-spryker
  - /v4/docs/en/about-spryker
  - /v4/docs/understanding-spryker
  - /v4/docs/en/understanding-spryker
  - /v3/docs/about-spryker
  - /v3/docs/en/about-spryker
  - /v3/docs/understanding-spryker
  - /v3/docs/en/understanding-spryker
  - /v2/docs/about-spryker
  - /v2/docs/en/about-spryker
  - /v2/docs/understanding-spryker
  - /v2/docs/en/understanding-spryker
  - /v1/docs/about-spryker
  - /v1/docs/en/about-spryker
  - /v1/docs/understanding-spryker
  - /v1/docs/en/understanding-spryker
  - /v6/docs/about-spryker
  - /v6/docs/en/about-spryker
  - /docs/scos/user/intro-to-spryker/whats-new/roadmap.html
  - /docs/fes/dev/launching-storefronts.html
  - /docs/fes/dev/installing-applications.html
  - /docs/scos/user/intro-to-spryker/roadmap.html
  - /docs/scos/user/intro-to-spryker/about-spryker-documentation.html
---



Spryker Cloud Commerce OS (SCCOS) is a completely modular e-commerce technology. With the modular design and API-based integration with all possible touchpoints, Spryker supports most business models: B2B, B2C, and marketplace.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/Spryker-OS-Overview-RGB-JULY19_Spryker-OS-Overview.png)


## Modular architecture

Modular architecture or modularity means that the system is composed of small parts called modules. A module is the smalles functionality unit in Spryker. Some modules are required to run Spryker, but many are optional and  provide certain functionality or connectivity to internal or external systems. Spryker consists of over 750 modules.

Modules combine into features and have limited dependencies. Limited dependencies result in less development effort, increasing your return on investment and lowering the total cost of ownership.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/modularity_transparent.png)

For a complete list of modules, see the [Spryker repository](https://github.com/spryker).

### Benefits of the modular architecture

* You take only the modules or features needed for your project, without overloading it with redundant code and investing effort into something you don’t need.
* You can easily grow your project by adding new modules at any time.
* You can add, delete, and test new features without worrying about breaking or pausing your live shop.
* Thanks to the atomic release approach, each module is released independently, has its own version, and is backward compatible. You can install and update the needed modules right after they are released without having to update any other installed modules.

## Layered architecture

Layered architecture separates your commercial offering and sales channels. When your commercial offering is hooked directly to an online web store, expanding to different channels and methods of selling poses a huge challenge in most cases. Spryker lets you create a clear separation between what you are selling and how you are selling it, so you get the flexibility in choosing sales methods and channels.

Spryker is split into four different layers:

* The *presentation layer* is a selling point that can be an online store, a mobile app, a voice skill, and anything else used to fulfill a commercial transaction.
* The *business layer* includes your products, pricing, stock, and general information surrounding your commercial offering.
* The *communication layer* connects the presentation layer to the business layer and transfers information between the business layer and the different presentation layers you may have.
* The *persistence layer* covers all the data storage and processing, such as database queries and advanced calculations.

![spryker-layers](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/spryker_layers_s.png)


### Benefits of the layered architecture

* We confine long and resource-intensive processes to the business and persistence layers, which ensures high performance on the presentation layer. The presentation side is separated from the rest of the OS to make sure that only lean processes are executed there. Anything that can impact the purchase process is offloaded to an area that does not impact the performance.
* Separate frontend and backend means developers can work in parallel, allowing for faster implementation, testing, and better optimization—all for less internal cost.
* Because your commercial offering is not dependent on a single channel, you can focus your effort on growth and improvement, rather than on solutions, extensions, and sometimes workarounds to make things work.
* Essential information is not tied up with the presentation. You can easily swap out, extend, replace this information, as well as change the ways it is presented.


## Managed cloud platform

Being a managed cloud platform, Spryker lets you develop applications without spending resources on setting up, managing, and scaling the infrastructure. All the cloud environments, like staging, development, and production, are provided during the onboarding. Included CI/CD tools and deployment pipelines enable your team to efficiently develop, test, and deploy your applications.

We take care of the infrastructure security and provide you with guidelines for keeping your project secure. Our 24/7 support team monitors your applications and informs you about potential issues to avoid downtimes.  

### Benefits of cloud

* Infrastructure scales with your project and traffic
* Increased speed
* Better control over costs
* Enhanced security
* CI/CD pipelines speed up development
* Flexible management of resources

## Customizable system

Being highly customizable at its core, Spryker is designed to cater the the most complex use cases. The functionality shipped by default can be extended and customized. Each module is released with an extension point so you can adjust it to your needs. On top of customizing the existing functionality, you can introduce completely new components.

Glue API enables you to integrate any external systems and touchpoints, making your shop an all-in-one commerce system.

## Demo Shops

Demo Shops are fully functional shops with collections of features that match different business models. They serve as a starting point and let you quickly get started with the development of your project.

If you want to check out how Spryker works, Demo Shops also quick to install on your machine. The following Demo Shops are available:

* [B2B](/docs/scos/user/intro-to-spryker/b2b-suite.html)
* [B2C Demo Shops](/docs/scos/user/intro-to-spryker/b2c-suite.html)
* [Marketplace B2B Suite](/docs/scos/user/intro-to-spryker/spryker-marketplace/marketplace-b2b-suite.html)
* [Marketplace B2C Suite](/docs/scos/user/intro-to-spryker/spryker-marketplace/marketplace-b2c-suite.html)

Demo Shops are covered by the same commercial license and the same support and long-term support rules as individual modules.

## Next steps

* To start developing your project or check out how Spryker works, [set up Spryker locally](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).
* For the catalog of functionality and related guides, see [Packaged Business Capabilities](/docs/pbc/all/pbc.html).
