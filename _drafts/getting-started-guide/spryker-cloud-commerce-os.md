

Spryker Cloud Commerce OS (SCCOS) is a completely modular e-commerce technology. With the modular design and API-based integration with all possible touchpoints, Spryker supports most use cases: B2B, B2C, and marketplace.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/Spryker-OS-Overview-RGB-JULY19_Spryker-OS-Overview.png)


## Modular architecture

Modular architecture or modularity means that the system is composed of small parts called modules. A module is the smalles functionality unit in Spryker. Some modules are required to run Spryker, but many are optional and  provide certain functionality or connectivity to internal or external systems. Spryker consists of over 750 modules.

Modules combine into features and have limited dependencies. Limited dependencies result in less development effort, increasing your return on investment and lowering the total cost of ownership.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/modularity_transparent.png)

For a complete list of modules, see the [Spryker repository](https://github.com/spryker).

### Benefits of the modular architecture

* You *take only the modules or features needed* for your project, without overloading it with redundant code and investing effort in something you don’t need.
* You can easily grow your project by adding new modules at any time.
* You can *add, delete, and test new features* without worrying about breaking or pausing your live shop.
* We follow the atomic release approach. Each module is released independently and has its own version. Because you might not want to update some of your current modules, new versions of released modues are always backward compatible. This means that you can *take new and update existing modules or features right after they were released*.

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

Being a managed cloud platform, Spryker lets you develop applications without spending resources on setting up, managing, and scaling the infrastructure. All the cloud enviroments, like staging, development, and production, are provided during the onboarding. Included CI/CD tools and deployment pipelines enable your team to efficiently develop, test, and deploy your applicatons.

We take care of the infrastructure security and provide you with guidelines for keeping your project secure. Our 24/7 support team monitors your applications and informs you about potential issues to avoid downtimes.  

### Benefits of cloud

* Infrastructure scales with your project and traffic
* Increased speed
* Better contrtol over costs
* Enhanced security
* CI/CD pipelines speed up development
* Flexible management of resources

## Customizible system

Being highly customizable at its core, Spryker is designed to cater the the most complex use cases. The functionality shipped by default can be extended and customizied. Each module is released with an extension point so you can adjust it to your needs. On top of customizing the existing fuctionality, you can introduce completely new components.

Glue API enables you to integrate any external systems and touchpoints, making your shop an all-in-one commerce system.

## Demo Shops

Demo Shops are fully functional shops with collections of features that match different business models. They serve as a starting point and let you quickly get started with the development of your project.

If you want to check out how Spryker works, Demo Shops also take a short amount of time to install them on your machine. The following Demo Shops are available:

* [B2B](/docs/scos/user/intro-to-spryker/b2b-suite.html)
* [B2C Demo Shops](/docs/scos/user/intro-to-spryker/b2c-suite.html)
* [Marketplace B2B Suite](/docs/scos/user/intro-to-spryker/spryker-marketplace/marketplace-b2b-suite.html)
* [Marketplace B2C Suite](/docs/scos/user/intro-to-spryker/spryker-marketplace/marketplace-b2c-suite.html)

Demo Shops are covered by the same commercial license and the same support and long-term support rules as individual modules.

## I am a new customer, where should I start?

The recommended starting points for all standard commerce projects are our [B2B](/docs/scos/user/intro-to-spryker/b2b-suite.html#b2b-demo-shop) and [B2C Demo Shops](/docs/scos/user/intro-to-spryker/b2c-suite.html#b2c-demo-shop). We have taken the time to identify the best combination of modules and functionalities for each particular business type and to keep development as lean as possible. Thus, the only thing that remains is to identify your business requirements and select the shop that fits your needs best.

Apart from that, if your business case does not fit in one of the proposed models, you can start building your project by cherry-picking the modules you need. Since they are released under a commercial license with stable and predictable release cycles, you can build your e-commerce business with reliance and certainty. Our engineers make sure that each module is reliable, backward compatible, and fully regression-tested, and all our releases are supported with an LTS flag (12 months).

## What’s next?

This documentation site contains lots of information on Spryker Commerce OS. Select one of the topics below depending on what you want to do next:

* [What's new](/docs/scos/user/intro-to-spryker/whats-new/whats-new.html): general information about Spryker, news, and release notes.
* [Setup](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html): installation of Spryker.
* [Packaged Business Capabilities](/docs/pbc/all/pbc.html): catalogue of functionality and related guides.
* [Glue REST API](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/glue-rest-api.html): Spryker Glue REST API overview, reference, and features.
* [Developer Guides](/docs/scos/dev/developer-getting-started-guide.html): technical information and guides for developers.
