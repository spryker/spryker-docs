---
title: Data Exchange
description: 
template: concept-topic-template
---

Data exchange refers to the process of transferring data between different systems to facilitate business transactions and data-driven decisions.Spryker offers various solutions to exchange data between a Spryker system and third-party systems to ensure compatibility, consistency, quality, secruity of your data are preserved.

https://docs.google.com/presentation/d/1RrnuZrbWbDQ_H8K0A5s06uW-oACf74t1TZMjrFzc_eQ/edit#slide=id.g22cbc8bf58b_0_73

By default, there are four options to import and export data in Spryker: 
- Via the data importers and data exporters (availble in Spryker by default).
- Via the Data Exchnage API (availble in Spryker by default).
- Via the end-to-end integration apps
- Via the Alumio middleware

## Data importers and data exporters
The Spryker default data importers and data exporters let you bring external data into and send data from Spryker Cloud Commerce OS, in CSV format. They require customization for each project, and ongoing development effort.

QUESTION: In which cases are the legacy data importrs and expoerts most suitable?
Advantages:
- Cost efficiency
- QUESTION: what esle?

Disadvantages:
- Coding is required at the project level to set up new importers or to update the existing ones.
- No data orchestration (no dependency management).
- No delta synchronization.
- Minimum error logging.

## Data Exchange API

Data exchange API is a robust API that facilitates real-time data transfers, ensuring data is always current across all integrated platforms.



If you want to export data from third-party systems to Spryker, you need a middleware that would serve as as a bridge between two systems and an itegration app to set up the data exchange path. You can use either a default integration app provided by Spryker, or build your one onw. 

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
