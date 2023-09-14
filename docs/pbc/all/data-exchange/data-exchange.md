---
title: Data Exchange
description: 
template: concept-topic-template
---

Data exchange refers to the process of transferring data between Spryker and third-party systems to facilitate business transactions and data-driven decisions.Spryker offers various solutions to exchange data between a Spryker system and third-party systems to ensure compatibility, consistency, quality, secruity of your data are preserved.

https://docs.google.com/presentation/d/1RrnuZrbWbDQ_H8K0A5s06uW-oACf74t1TZMjrFzc_eQ/edit#slide=id.g22cbc8bf58b_0_73

There are four options to import and export data in Spryker: 

- Via the data importers and data exporters (availble in Spryker by default).
- Via the Data Exchnage API (availble in Spryker by default).
- Via the Spryker Middleware powered by Alumio:
    - Via the Spryker integration apps.
    - Via custom integrations using the existing Alumio connectors.
    - Via custom integration apps using the SDK to build own connectors.


## Data importers and data exporters
The Spryker default data importers and data exporters let you bring external data into and send data from Spryker Cloud Commerce OS, in CSV format. They require customization for each project, and ongoing development effort.

You can use the legacy data importers in the following cases:

- You need a cost-effective solution, which is included to the Spryker Commerce OS by default.
- You can wait up to a few weeks till the project importers are set up and ready to use.
- You have the developer resources who can do coding at the project level upon initial setup of the data importers.
- You have the developer resources who can do coding at the project level wherever you need to make changes to the existing data importers or troubleshoot issues.
- Your project isn't affected by some limitations of the data importers, like missing data orchestration (no dependency managerment), no delta synchronization, minimum error logging.

## Data Exchange API

Data exchange API is a robust API that facilitates real-time data transfers, ensuring data is always current across all integrated platforms.


## Spryker Middleware Powered by Alumio

The Spryker Middleware powered by Alumio, is a cloud-based integration Platform as a Service (iPaaS). It lets you exchange data between your Spryker system and third-party systems via a user-friendly interface.
The Spryker Middleware Powered by Alumio isn't a part of the Spryker Clould Commerce OS by default. To obtain it, reach out to [QUESTION: WHO?].
 

For more datails about the Spryker Middleware Powered by Alumio, see LINK

The Spryker Middleware Powered by Alumio is the foundation of the Spryker Integration apps, and can also be used to build custom integrations.

### Spryker Integration Apps

The Integration Apps let you import data data between your Spryker system and third-party systems quickly, without any development effort, and without the need to configure mapping, as the configurations are preset.

To exchange data between a Spryker system and a third-party system with an integration app, you need to do the following:

- Provision the Spryker Middleware Powered by Alumio.
- Provision the Spryker Integration Apps you need.
- Make minimum adjustiments to the existing mapping and transformation of data, if needed.

 Reach out to [CONTACT] with the request regarding the Spryker Middleware Powered by Alumio and the Integration Apps.

We recommend considering Integration Apps for data exchange in the following cases:

- You require a quick setup of the data exchange process, which should take up to a few hours.
- You don't have the developer resources to do the coding job upon initial setup.
- You don't have the developer resources to do the coding job when you need to update mapping or configuration settings.
- You need a pre-configured mapping and transformation of data for exchange between Spryker and a third-party system so you would have to make minimum adjustments, if needed.
- For your project, it is important that the data exchange solution allows for the the proper data orchestration like dependency management, error handling and logging, entity mapping, integration variable management, CSV validation, health monitoring, etc.

When you use the Spryker Integration Apps, the data exchange process looks like this:

1. Transfer of data via Dynamic Data Exchnage API. The data is transferred in the real-time, which ensures that the data is always current across all integrated platforms.
2. Data is fed into Alumio and transformed there.
3. Data is transferred to Spryker via the Sprker Middleware Powered by Alumio.

Schematically, the data exchange process like this:

https://docs.google.com/presentation/d/1RrnuZrbWbDQ_H8K0A5s06uW-oACf74t1TZMjrFzc_eQ/edit#slide=id.g22d9016de29_0_86

Spryker provides Early Access to the Akeneo PIM integration app. Spryker Akeneo PIM Integration App allows for product import from Akeneo to Spryker. The connector between Spryker and Akeneo is set up in a configurable way. Once new objects such as categories, attributes, product are created in Akeneo, they are transformed in the Alumio middleware before the data is transferred to Spryker via the Spryker Middleware Powered by Alumio. 

The middleware allows customers to configure data which is to be transferred to Spryker. For example, attributes and super attributes. 

{% info_block infoBox "Info" %}

Akeneo handles the so-called “cold data”. Cold data is product information directly linked to the product that describes product properties. The Akeneo PIM Integration does not include the transfer of “hot data” such as stock or pricing. 

{% endinfo_block %}

For details on how to import data from Akeneo to Spryker, see [Akeneo PIM](LINK)

### Custom Integration Apps

For cases, where there are no integration apps for data exchange, you can build them by your own using the Spryker Alumio Middleware. Alumio provides a number of built-in API connectors to third-party systems that you can use to build integrations between these Systems and Spryker. Check the available connectors for Spryker on the [Alumio web-site](https://www.alumio.com/platforms/spryker). 

To build these integrations you need:

1. Provision the Spryker Middleware Powered by Alumio.
2. Enable the API connectors offered by Alumio.
3. Build the mapping and transformation of data. Initial configuration of data mapping and transformation usually takes up to a few days, changing them takes up to a few hours.

When you use the Spryker Middleware Powered by Alumio, the data exchange process looks like this:

1. Transfer of data via the Alumio API connector. The data is transferred in the real-time, which ensures that the data is always current across all integrated platforms.
2. Data is fed into the Spryker Middleware powered by Alumio. You configure mapping of your data, and the middleware ensures that data is translated and formatted correctly, regardless of the source or destination.
3. Transfer of data to the target system.

Schematically, the data exchange process like this:

https://docs.google.com/presentation/d/1RrnuZrbWbDQ_H8K0A5s06uW-oACf74t1TZMjrFzc_eQ/edit#slide=id.g22d9016de29_0_37


We recommend to use the Spryker Middleware powered by Alumio in the following cases:
- You require a quick setup of the data exchange process, which should take up to a few days.
- You don't have the developer resources to do the coding job upon initial setup.
- You don't have the developer resources to do the coding job when you need to update mapping or configuration settings.
- You have a tech-savy person who can configure mapping of data for exchange between Spryker and a third-party system.
- For your project, it is important that the data exchange solution allows for the the proper data orchestration like dependency management, error handling and logging, entity mapping, integration variable management, CSV validation, health monitoring, etc.

For more details on how to manage integrations and exchange data in the Alumio platform, see LINK

1. Provision the Spryker Middleware Powered by Alumio.

### Legacy Integration Apps

If you have legacy systems or systems of old versions with which you need to exchange data and for which Alumio does not provide a connector, you can you can still build you intergation apps. You can build a connector to this systems, because Spryker Middleware Powered by Alumio provides includes an SDK to build own connectors.

To build an integration app for a legacy system, you need:

1. Provision the Spryker Middleware Powered by Alumio.
2. Build a connector to the legacy system using the SDK from the Spryker Middleware Powered by Alumio. Building a connector with SDK usually takes up to a few weeks.
3. Build the mapping and transformation of data. Initial configuration of data mapping and transformation usually takes up to a few days, changing them takes up to a few hours.


- Build your own integrations between a Spryker or a 3rd-party system and a legacy system, even if there is no connector for the latter because there’s an [SDK](/docs/pbc/all/data-exchange/alumio/alumio-sdk-to-implement-connectors.html) to build such a connector:

https://docs.google.com/presentation/d/1RrnuZrbWbDQ_H8K0A5s06uW-oACf74t1TZMjrFzc_eQ/edit#slide=id.g22d9016de29_0_140
