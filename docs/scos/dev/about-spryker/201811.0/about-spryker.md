---
title: About Spryker
originalLink: https://documentation.spryker.com/v1/docs/about-spryker
redirect_from:
  - /v1/docs/about-spryker
  - /v1/docs/en/about-spryker
---

## What is the Spryker Commerce OS
The Spryker Commerce OS or SCOS is a completely modular, API-first, headless commerce technology for transactional business models in a B2B or B2C context. Given the decoupled application and API based integration with all possible customer touchpoints (front ends) such as traditional B2B or B2C e-commerce shops, marketplaces, mobile applications for commercial or customer service purposes or newer touchpoints like voice, bots or IoT (smart hardware), the Spryker Commerce OS enables a significantly shorter time-to-market and ROI as well as total cost of ownership (TCO) due to applying all digital best practices.
We established our unique advantage by creating a commerce operating system that evolves around two fundamental cornerstones for success and they are:

### Modular Architecture
Growth, agility, and adaptability are essential for maintaining a commercial offering that lives in an ever-changing and fast paced environment. You want to be able to reach the market fast, grow where you need to and be ready for new buying trends and technologies.

The Spryker Commerce OS consists of around 300 modules and that number is growing all the time. A module is a part of the OS dedicated to a single concept and designed in such a way that it can interact and be used by other modules. Some modules are mandatory and required by the OS to run. The rest is optional and designed to provide certain functionality or connectivity to internal or external systems.

Our modular architecture has two dimensions. Not only do you need to take only the functionality that you want (ensuring you only deal with the parts you truly need to work with), we also develop, extend and release our functionality atomically (when a feature is tested and ready we publish it for use). This means that as a developer you start with a lean project where every piece of code contributes directly to your desired functionality, and nothing is redundant. Moreover, you can grow your project with the understanding that with every new feature you get with minimal to no baggage at all. On top of that, you never have to wait for a new feature or functionality. As mentioned, atomic means that as soon as a feature is tested and ready, it is released for you to take.

Therefore, modularity allows you to be conservative during the initial stages where you want to focus on key functionalities in order to quickly achieve an MVP. Also, it gives you the confidence knowing that as technology evolves and new methods and ways to handle e-commerce transactions are introduced, you are using an OS that will grow with you.

Visit our code today:
The Spryker OS code is stored in github under the Spryker repository: [https://github.com/spryker](https://github.com/spryker){target="_blank"}.

![Spryker repository in Github](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Understanding+Spryker/Understanding+the+Spryker+Commerce+OS/github.png){height="" width=""}

Here you can find a complete list of all their modules, along with a description and a link to their relevant documentation.

### Layered Architecture
The Layered Architecture is used to define the division between your commercial offering and your sales channels. When you are able to create a clear separation between what you are selling and how you are selling it, you gain the freedom to offer your products in different methods and channels. When your commercial offering is hooked directly to an online web store, to expand to different channels and methods of selling is in most cases not a native expansion path. This results in investing time and money in innovative solutions, extensions and sometimes hacks in order to “make things work”. Whereas, when your commercial offering is not dependent on a single channel, all efforts automatically go towards growth and improvement.
    
Separation is established by using layers. We identified four different layers: 

* The **presentation layer** that can be an online store, a mobile app, a Voice skill and anything else used to create a commercial transaction. 
* The **communication layer** that connects the presentation to the business layer and passes information between the business layer and the different presentation layers you may have.
*  The **business layer** includes your products, pricing, stock, and general information surrounding your commercial offering. 
*  Finally, there is the **persistence layer** that covers all the data storage and processing such as database queries and advanced calculations.
![Spryker layers](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Understanding+Spryker/Understanding+the+Spryker+Commerce+OS/spryker-layers.png){height="" width=""}

Creating this separation ensures that essential information is not tied-up with presentation information and you can easily swap-out, extend, replace and change the ways you present this information.

Another advantage of separation is performance. High performance is essential for a positive sales experience. Slow and clunky user experience is a sure way to make sure a customer will never return. The method we have adopted to ensure high performance is to confine long and resource heavy processes to the Business and persistence layers. We use controllers to communicate between the layers to ensure that only lean processes are executed on the presentation side. Basically, anything that can wait or will impact the sales process is offloaded to an area that will not impact performance.

## What is the “Legacy Demoshop” ? 

The **Legacy Demoshop** is our previous implementation example boilerplate that until April 2018 was our project implementation starting point for projects using the Spryker Commerce OS. It was released and licensed under an MIT license.

## Why did we Change it?
Although never intended this way, customers and partners used the Demoshop as a starting point and expected a clear update path for everything they base their custom code upon and demanded much more predictability and reliability in terms of potential BC breaks and general support. This is why we now ship our B2B/B2C Demo Shops as part of the product under our commercial license with all support and LTS rules being the same as for individual Spryker Commerce OS modules (note: The B2B/B2C Demo Shops are n-potential combination of exactly the same module from the full, 500+ modules strong SCOS).

By doing this we:

* Reduced the amount of project level code.
* Increased the number of modules supported by Spryker and made them upgradable.
* Implemented industry best practices by applying Atomic Design principles.

Moreover, this move allowed us to improve data exchange scalability and reliability between the storefront part Yves and the Backend Zed. This is referred to as Publish and Sync architecture,  which is a new way to handle data exchange.

We now ship two new demo shops, to showcase our functionality and help you choose the best possible starting point. Our focus is on functionality and reliability providing a scope of functionality relevant to you and a version that will follow the same release frequency and rules as the rest of the product. You can now start with a B2B Shop and B2C Shop . These demo shops, include all new functionality and are already based on the listed above enhancements.

## What if I Built my Project Based on the Demoshop Boilerplate?
As the Spryker Commerce OS is a highly modular product you will be able to incorporate any new functionality that you need to support your business requirements. A new functionality is available for you and Publish and Sync is compatible with Collectors and can be used together in a project.

## I am a New Customer Where Should I Start?
If you are new to Spryker, please choose either our B2B Shop or B2C shop, based on your business requirements. This way, your application will stay as lean as needed. These Shops are what we believe to be the right combination of modules and functionality to fully represent B2C and B2B commerce respectively. You will get a fully integrated product that is consistent in the way the technology is presented and its functionality. The B2B shop and B2C shop are our recommended starting point for all standard commerce projects. Alternatively, if you are a sophisticated user or when you have a complex business case that does not require one of the two demo shops, you can start by cherry-picking needed modules directly from the SCOS. Released under a commercial license, we provide stable and predictable release cycles supported by an LTS flag (12 months). This makes it an ideal solution for building your business with certainty while benefiting from a reliable, backward compatible and fully regression tested version. With that said, if you still need a functionality we offer that is not included in the shop flavor you chose, you are still free to add or remove any feature and functionality from our larger range of functionality as you need.

