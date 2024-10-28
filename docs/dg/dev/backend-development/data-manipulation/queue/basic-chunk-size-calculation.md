---
title: Basic Chunk Size Calculation
description: Gives an overview over the basic chunk size calculation
last_updated: Oct 25, 2024
template: concept-topic-template
redirect_from:
  - /docs/dg/dev/backend-development/data-manipulation/queue/chunk-size-calculation.html
related:
  - title: Advanced Chunk Size Calculation
    link: docs/dg/dev/backend-development/data-manipulation/queue/advanced-chunk-size-calculation.html
  - title: Expert Chunk Size Calculation
    link: docs/dg/dev/backend-development/data-manipulation/queue/expert-chunk-size-calculation.html
  - title: Queue
    link: docs/dg/dev/backend-development/data-manipulation/queue/queue.html

---

## Basic Chunk Size Calculation

The **Basic Chunk Size Calculator** is designed to help developers configure the correct chunk sizes for their Spryker Commerce Operating System based on the traffic and data patterns in their system. This tool simplifies the setup process for out-of-the-box and low-customised webshops, ensuring that the system can handle high-traffic entities efficiently without over-consuming resources.

The **Basic Chunk Size Calculator** is available [here](link to google spreadsheet).

### Problem Overview

In an e-commerce environment, certain business entities generate a large volume of update events due to frequent refreshes and high data volume. These **high traffic entities** account for the majority of the traffic within the **publish and synchronize**. Misconfiguring chunk sizes for these entities can lead to inefficient resource consumption, system lags, or overloads. The **Basic Chunk Size Calculator** offers a straightforward way to address this by determining the appropriate chunk size for each queue based on the production environment’s data profile.

### Input Parameters

To calculate the correct queue chunk sizes, developers must provide the following information based on their specific production environment:

- **High Traffic Entities**: Provide the total count of each high-traffic entity (e.g., products, prices, offers) across all stores, and estimate the daily refresh rate (percentage or count of entities updated daily) for ongoing system operations.
- **Stores and Locales**: Provide the total number of stores in the system and the maximum number of supported locales across all stores, as these factors impact chunk size calculation for data distribution.
  > For more information on stores and locales in our system, [click here](https://docs.spryker.com/docs/pbc/all/dynamic-multistore/202410.0/base-shop/dynamic-multistore-feature-overview.html).
- **Publish and Synchronize Setup**: The **publish and synchronize** processes entity data updates, and the worker setup plays a crucial role in determining how this is managed. Developers need to specify how project workers are set up in relation to stores.
  > For more information on workers, tasks, and how they are related to stores, [click here](https://docs.spryker.com/docs/pbc/all/dynamic-multistore/202410.0/base-shop/dynamic-multistore-feature-overview.html).
- **Number of Tasks Per Worker**: Provide the **number of tasks per worker**. This value is essential to calculating how resources are distributed among tasks. Note that there is no additional help or explanation for determining this number, as it is specific to each setup.
  > For more information on workers, tasks, and how they are related to stores, [click here](https://docs.spryker.com/docs/pbc/all/dynamic-multistore/202410.0/base-shop/dynamic-multistore-feature-overview.html).

### Output

Once the required data is entered into the **Basic Chunk Size Calculator**, it will compute the optimal chunk sizes for each queue used by the system. These queues handle different business entities, and setting the right queue chunk size ensures efficient processing and resource allocation. Developers will need to configure these queue chunk sizes.

> For instructions on how to set up chunk sizes for the queues, [click here](https://docs.spryker.com/docs/dg/dev/backend-development/data-manipulation/queue/queue.html#configuration-for-chunk-size).

### Important Notes

- The **Basic Chunk Size Calculator** is designed for systems that follow a standard, out-of-the-box configuration. If your system is more customized, consider using the **Advanced** or **Expert Chunk Size Calculator** for fine-tuning.
- This calculator only requires a basic understanding of the system's entity data and store structure. For more complex metrics like memory usage or container performance, the advanced calculators may be necessary.
- Always ensure that the chunk sizes provided by the calculator are properly configured to avoid system performance issues.

---

For more detailed information about the different levels of the **Chunk Size Calculator**, see the [overview here](https://docs.spryker.com/docs/dg/dev/backend-development/data-manipulation/queue/chunk-size-calculation.html).
