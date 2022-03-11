---
title: About Spryker
description: The Spryker Commerce OS or SCOS is a completely modular, API-first, headless commerce technology for transactional business models in a B2B or B2C context.
last_updated: Sep 9, 2021
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
---

## What is the Spryker Commerce OS?
The Spryker Commerce OS (SCOS) is a completely modular B2B and B2C e-commerce technology. With the modular application and API-based integration with all possible customer touchpoints (front-ends), SCOS provides significantly shorter time-to-market and reduced total cost of ownership, while increasing your ROI due to the digital best practices.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/Spryker-OS-Overview-RGB-JULY19_Spryker-OS-Overview.png)

We establish a unique advantage for our customers by creating a commerce operating system that revolves around two cornerstones for success: modular and layered architectures.

### Modular architecture
Modular architecture, or modularity of the Spryker Commerce OS, means that the system is composed of small parts called modules. The Spryker Commerce OS consists of over 750 modules. Some of them are mandatory and required by the OS to run, but many are optional and designed to provide certain functionality or connectivity to either internal or external systems.
The modules combine to create [features](/docs/scos/user/features/{{site.version}}/features.html) and have limited dependencies. The limited dependencies imply less development effort, increasing your return on investment and lowering the total cost of ownership.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/modularity_transparent.png)

#### Benefits of the Spryker modular architecture:

* You **take only the modules or features that you need** for your project, without overloading it with redundant code and investing effort in something you don’t need.
* You can **grow a project easily** using any of the wide selection of modules.
* You can **add, delete, and test new features** without worrying about breaking or pausing your production shop site.
* We adhere to the atomic release approach. This means that each module is released independently and has its own version. It is developed and tested so as to ensure backward compatibility with other modules that you might not want to update. This means you can **take new and update existing modules or features right after they have been released**.

{% info_block infoBox %}

The Spryker OS code is stored in GitHub under the [Spryker repository](https://github.com/spryker). Here you can find a complete list of all the modules, along with a description and a link to the relevant documentation for each module.

{% endinfo_block %}

### Layered architecture
Layered Architecture is used to separate your commercial offering and sales channels.
When your commercial offering is hooked directly to an online web store, expanding to different channels and methods of selling poses a huge challenge in most cases. If you create a clear separation between what you are selling and how you are selling it, you gain the freedom and flexibility in choosing sales methods and channels.
Separation is established by using layers.

SCOS is split into four different layers:

* The **presentation layer**  is a selling point that can be an online store, a mobile app, a voice skill, and anything else used to effectuate a commercial transaction.
* The **business layer** includes your products, pricing, stock, and general information surrounding your commercial offering.
* The **communication layer** connects the presentation layer to the business layer and transfers information between the business layer and the different presentation layers you may have.
* The **persistence layer** covers all the data storage and processing, such as database queries and advanced calculations.

<!---![Spryker layers](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/spryker_layers.png)-->

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/spryker_layers_s.png)


#### Benefits of the layered architecture:

* We confine long and resource-intensive processes to the Business and Persistence layers, which ensures **high performance**. The presentation side is separated from the rest of the OS to make sure that only lean processes are executed there. Basically, anything that can wait or can impact the purchase process is offloaded to an area that does not impact the performance.
* Separate front- and back-end means **developers can work in parallel**, allowing for faster implementation, testing, and better optimization—all for less internal cost.
* Since your commercial offering is not dependent on a single channel, you can **focus your effort on growth and improvement**, rather than on solutions, extensions, and sometimes hacks to “make things work”.
* The separation ensures that **essential information is not tied-up with presentation**. You can easily swap-out, extend, replace this information, as well as change the ways it is presented.

## Spryker B2B/B2C Demo Shops
Our [B2B](/docs/scos/user/intro-to-spryker/b2b-suite.html) and [B2C Demo Shops](/docs/scos/user/intro-to-spryker/b2c-suite.html) showcase Spryker functionality and help you choose the best possible starting point and set of features based on your business needs. The Demo Shops pose a clear starting point and upgrade path for everything you base your project on. We ship our B2B/B2C Demo Shops as a part of the product, covered by the same commercial license and the same support and LTS (long-term support) rules as individual Spryker Commerce OS modules.

## I am a new customer, where should I start?
The recommended starting points for all standard commerce projects are our [B2B](/docs/scos/user/intro-to-spryker/b2b-suite.html#b2b-demo-shop) and [B2C Demo Shops](/docs/scos/user/intro-to-spryker/b2c-suite.html#b2c-demo-shop). We have taken the time to identify the best combination of modules and functionalities for each particular business type and to keep development as lean as possible. Thus, the only thing that remains is to identify your business requirements and select the shop that fits your needs best.

Apart from that, if your business case does not fit in one of the proposed models, you can start building your project by cherry-picking the modules you need. Since they are released under a commercial license with stable and predictable release cycles, you can build your e-commerce business with reliance and certainty. Our engineers make sure that each module is reliable, backward compatible, and fully regression-tested, and all our releases are supported with an LTS flag (12 months).

## What’s next?
This documentation site contains lots of information on Spryker Commerce OS. Select one of the topics below depending on what you want to do next:

* [What's new](/docs/scos/user/intro-to-spryker/whats-new/whats-new.html): general information about Spryker, news, and release notes.
* [Setup](/docs/scos/dev/setup/setup.html): installation of Spryker.
* [Features](/docs/scos/user/features/{{site.version}}/features.html): the Spryker features.
* [Glue REST API](/docs/scos/dev/glue-api-guides/{{site.version}}/glue-rest-api.html): Spryker Glue REST API overview, reference, and features.
* [User Guides](/docs/scos/user/back-office-user-guides/{{site.version}}/about-back-office-user-guides.html): step-by-step Backoffice and Storefront user guides.
* [Developer Guides](/docs/scos/dev/developer-getting-started-guide.html): technical information and guides for developers.
* [Technology Partners](/docs/scos/user/technology-partners/{{site.version}}/technology-partners.html): Spryker technology partners information and integration guides.
* [Tutorials](/docs/scos/dev/tutorials-and-howtos/tutorials-and-howtos.html): tutorials and HowTos.
