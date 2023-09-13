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
- Via the Spryker Middleware powered by Alumio.
- Via the Spryker integration apps that are based on the Spryker Middleware powered by Alumio.
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

The Spryker Middleware powered by Alumio, is a cloud-based integration Platform as a Service (iPaaS). It lets you exchange data between your Spryker system and third-party systems via a user-friendly interface without the development effort.
The Spryker Middleware Powered by Alumio isn't a part of the Spryker Clould Commerce OS by default. To obtain it, reach out to [QUESTION: WHO?] 

For more datails about the Spryker Middleware Powered by Alumio, see LINK

When you use the Spryker Middleware Powered by Alumio, the data exchange process looks like this:

1. Transfer of data via Dynamic Data Exchnage API. The data is transferred in the real-time, which ensures that the data is always current across all integrated platforms.
2. Data is fed into the Spryker Middleware powered by Alumio. You configure mapping of your data, and the middleware ensures that data is translated and formatted correctly, regardless of the source or destination.
3. Transfer of data via Dynamic Data Exchnage API.

Schematically, the process looks like this:

https://docs.google.com/presentation/d/1RrnuZrbWbDQ_H8K0A5s06uW-oACf74t1TZMjrFzc_eQ/edit#slide=id.g22d9016de29_0_37

For more details on how to import and export data with the Spryker Middleware Powered by Alumio, see LINK

We recommend to use the Spryker Middleware powered by Alumio in the following cases:
- You require a quick setup of the data exchange process, which should take up to a few days.
- You don't have the developer resources to do the coding job upon initial setup.
- You don't have the developer resources to do the coding job when you need to update mapping or configuration settings.
- You have a tech-savy person who can configure mapping of data for exchange between Spryker and a third-party system.
- For your project, it is important that the data exchange solution allows for the the proper data orchestration like dependency management, error handling and logging, entity mapping, integration variable management, CSV validation, health monitoring, etc.

## Spryker integration apps

The Spryker integration apps are build on the basis of the Spryker Middleware Powered by Alumio. They let you exchange data data between your Spryker system and third-party systems quickly, without any development work, and without the need to configure mapping.


If you want to export data from third-party systems to Spryker, you need a connector that would serve as a bridge between two systems. As the connector, you can use:

- Spryker Middleware powered by Alumio. 

If you use a default integration app, the data exchange process looks as follows:

1. Transfer of data via Dynamic Data Exchnage API. The data is transferred in the real-time, which ensures that the data is always current across all integrated platforms.
2. Data is fed into the Spryker Middleware powered by Alumio. The middleware ensures that data is translated and formatted correctly, regardless of the source or destination.
https://docs.google.com/presentation/d/1RrnuZrbWbDQ_H8K0A5s06uW-oACf74t1TZMjrFzc_eQ/edit#slide=id.g22d9016de29_0_37 (QUESTION: Alumio middleware is optional here? Can they also go without it at this stage, that is, map and transform data by their own, and then feed it into the integration app?)

3. Data goes through the pre-built connectors and integration apps for popular platfroms (like Akeneo PIM). New data exchange paths are established to allow for import or export to or from a third-party system.

https://docs.google.com/presentation/d/1RrnuZrbWbDQ_H8K0A5s06uW-oACf74t1TZMjrFzc_eQ/edit#slide=id.g22d9016de29_0_86


If you build custom integrations, you can do one of the following:
- Use the existing Alumio connectors between Spryker and a 3rd-party system, or between two 3rd-party systems. They only thing you have to provide in this case is mapping and transformation:

https://docs.google.com/presentation/d/1RrnuZrbWbDQ_H8K0A5s06uW-oACf74t1TZMjrFzc_eQ/edit#slide=id.g22d9016de29_0_124

- Build your own integrations between a Spryker or a 3rd-party system and a legacy system, even if there is no connector for the latter because there’s an [SDK](/docs/pbc/all/data-exchange/alumio/alumio-sdk-to-implement-connectors.html) to build such a connector:

https://docs.google.com/presentation/d/1RrnuZrbWbDQ_H8K0A5s06uW-oACf74t1TZMjrFzc_eQ/edit#slide=id.g22d9016de29_0_140
