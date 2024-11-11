---
title: About Spryker
description: High-level overview of Spryker Cloud Commerce OS
last_updated: Sep 9, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/about-spryker
originalArticleId: 0798f4ee-6a6b-46ed-baa8-e7e885700585
redirect_from:
  - /docs/scos/user/intro-to-spryker/intro-to-spryker.html
  - /docs/scos/user/intro-to-spryker/whats-new/roadmap.html
  - /docs/fes/dev/launching-storefronts.html
  - /docs/fes/dev/installing-applications.html
  - /docs/scos/user/intro-to-spryker/roadmap.html
  - /docs/scos/user/intro-to-spryker/about-spryker-documentation.html
  - /docs/scos/user/intro-to-spryker/mvp-project-structuring.html
  - /docs/scos/user/intro-to-spryker/faq.html
  - /docs/scos/user/intro-to-spryker/whats-new/upcoming-major-module-releases.html
  - /docs/marketplace/user/intro-to-spryker-marketplace/upcoming-major-module-releases.html
  - /docs/scos/user/intro-to-spryker/whats-new/ie11-end-of-life.html
  - /docs/scos/user/intro-to-spryker/whats-new/whats-new.html
  - /docs/scos/user/intro-to-spryker/whats-new/vat-rates-reduction-in-germany-between-july-2020-and-january-2021.html

---



*Spryker Cloud Commerce OS (Spryker)* is an e-commerce platform-as-a-service solution designed to provide businesses with the flexibility and efficiency needed to create a unique digital commerce experience. Built on a modular and layered architecture, it increases operational efficiency and lowers the total cost of ownership. With the modular design and API-based integration with all possible touchpoints, Spryker supports most business models: B2B, B2C, and marketplace. This document provides an overview of the key features and benefits of Spryker.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/Spryker-OS-Overview-RGB-JULY19_Spryker-OS-Overview.png)


## Modular architecture

Modular architecture or modularity means that the system is composed of small parts called modules. A module is the smalles functionality unit in Spryker. Some modules are required to run Spryker, but many are optional and provide certain functionality or connectivity to internal or external systems. Spryker consists of over 750 modules.

Modules combine into features and have limited dependencies. Limited dependencies result in less development effort, increasing your return on investment and lowering the total cost of ownership.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/modularity_transparent.png)

For a complete list of modules, see the [Spryker repository](https://github.com/spryker).

### Benefits of the modular architecture

* *Selectivity*: Use only the modules you need, reducing redundant code.
* *Scalability*: Grow your project with the wide selection of available modules.
* *Flexibility*: Add, delete, and test new features without hindering your live shop.
* *Atomic release approach*: Each module is developed and released independently, ensuring backward compatibility.

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

### Benefits of cloud infrastructure

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
* [B2C](/docs/scos/user/intro-to-spryker/b2c-suite.html)
* [Marketplace B2B](/docs/scos/user/intro-to-spryker/spryker-marketplace/marketplace-b2b-suite.html)
* [Marketplace B2C](/docs/scos/user/intro-to-spryker/spryker-marketplace/marketplace-b2c-suite.html)

Demo Shops are covered by the same commercial license and the same support and long-term support rules as individual modules.

## Next steps

* To start developing your project or check out how Spryker works, [set up Spryker locally](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).
* For the catalog of functionality and related guides, see [Packaged Business Capabilities](/docs/pbc/all/pbc.html).
