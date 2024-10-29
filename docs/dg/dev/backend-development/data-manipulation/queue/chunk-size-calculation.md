---
title: Chunk Size Calculation
description: Describes the challenges and solutions of selecting proper chunk sizes for project requirements
last_updated: Oct 25, 2024
template: concept-topic-template
redirect_from:
  - /docs/dg/dev/backend-development/data-manipulation/queue/queue.html#concepts
related:
  - title: Expert Chunk Size Calculation
    link: docs/dg/dev/backend-development/data-manipulation/queue/expert-chunk-size-calculation.html

---

## Chunk Size Calculation

In an e-commerce framework, selecting the correct queue chunk size for processing data is critical for ensuring optimal performance and efficient resource usage. The challenge arises from the diversity of business entities, stores, and locales, each with different memory and CPU requirements for denormalization. Furthermore, the frequency of updates, data sizes, and the specific configurations of various system services (e.g., Redis, Elasticsearch, RabbitMQ) make it difficult to determine the appropriate chunk size for each queue.

Without proper queue chunk size configuration, projects can either overconsume resources, leading to crashes or lag, or underutilize resources, resulting in slow performance. This is where the **Chunk Size Calculator** comes in—offering a solution that helps developers fine-tune queue chunk sizes based on the specific characteristics of the project.

### What is the Chunk Size Calculator?

The **Chunk Size Calculator** is a tool that helps developers determine the appropriate queue chunk sizes for processing data across different queues in a resource-efficient way. It ensures that memory and CPU usage are optimized and prevents the system from being overwhelmed during data processing tasks. This tool is designed to handle the variability in entity sizes, stores, locales, and update frequencies, giving developers confidence that project will run smoothly in production environments.

### The Three Levels of the Chunk Size Calculator

The **Chunk Size Calculator** is a powerful tool for optimizing Publish and Sync’s resource consumption. It consists of three levels—**Basic**, **Advanced**, and **Expert**—each designed to cater to varying use cases, from simple out-of-the-box configurations to highly customized, complex environments. Developers are encouraged to start with the **Basic Chunk Size Calculator** and progress to the **Advanced** or **Expert** calculators as the complexity of their projects increases.

- **Basic**: Ideal for standard configurations with minimal customization.
- **Advanced**: Suited for moderately customized projects requiring more precise control over performance and resource usage.
- **Expert**: Designed for highly customized entities that demand detailed configurations and fine-tuning.

#### 1. Basic Chunk Size Calculator

The **Basic Chunk Size Calculator** is a tool designed to help developers configure optimal queue chunk sizes for small to medium B2C projects with low customization with minimal configuration effort. It ensures efficient processing by aligning queue chunk sizes with traffic and data distribution. Ideal for out-of-the-box or minimally customized setups, it is available for use [here](link to Google spreadsheet).

##### Purpose and Use Case

In e-commerce environments, some business entities generate frequent updates due to high transaction volumes, commonly referred to as **high traffic entities**. These entities—such as products, prices, and offers—drive most of the traffic within the **publish and synchronize** operations. Misconfiguring queue chunk sizes can result in inefficient resource consumption, performance bottlenecks, or system overloads. The **Basic Chunk Size Calculator** streamlines this process by computing chunk sizes based on your project’s data profile, making it an ideal starting point for projects with standard configurations and predictable traffic patterns.

##### Key Input Parameters

To calculate the correct queue chunk sizes, the following data should be provided:

- **High Traffic Entities**: Input the total count of each high-traffic entity type (e.g., products, prices, offers) across all stores, along with an estimate of the daily refresh rate (either as a percentage or a daily update count).
- **Stores and Locales**: Specify the total number of stores and the maximum number of supported locales across these stores. This information impacts data distribution and chunk sizing.
  > For detailed information on configuring stores and locales, [click here](https://docs.spryker.com/docs/pbc/all/dynamic-multistore/202410.0/base-shop/dynamic-multistore-feature-overview.html).
- **Publish and Synchronize Setup**: Since entity data updates are managed through **publish and synchronize** operations, describe how workers are set up in relation to stores in the system.
  > For additional details on workers and tasks, refer to [this link](https://docs.spryker.com/docs/pbc/all/dynamic-multistore/202410.0/base-shop/dynamic-multistore-feature-overview.html).
- **Number of Tasks Per Worker**: Define the number of tasks each worker will handle, as this affects resource allocation and task distribution. This parameter should align with your project’s specific setup.
  > Learn more about configuring tasks per worker [here](https://docs.spryker.com/docs/pbc/all/dynamic-multistore/202410.0/base-shop/dynamic-multistore-feature-overview.html).

##### Output and Configuration

After entering the required data, the **Basic Chunk Size Calculator** will determine optimal queue chunk sizes for each queue within your system. These chunk sizes help to balance load across queues, facilitating smooth operations and resource efficiency. Developers should configure these queue chunk sizes based on the calculator’s recommendations.

> For instructions on setting up chunk sizes for queues, [click here](https://docs.spryker.com/docs/dg/dev/backend-development/data-manipulation/queue/queue.html#configuration-for-chunk-size).

##### Important Considerations

- The **Basic Chunk Size Calculator** is optimized for systems with standard, out-of-the-box configurations. If your setup includes significant customization, consider using the **Advanced** or **Expert Chunk Size Calculator** for fine-tuned configuration.
- This calculator requires only a basic understanding of your system’s entity data and store structure. More complex metrics, like memory usage and container performance, might necessitate advanced calculators.
- Ensure the recommended queue chunk sizes are correctly configured to maintain optimal system performance.

#### 2. Advanced Chunk Size Calculator

The **Advanced Chunk Size Calculator** builds upon the **Basic Chunk Size Calculator**, requiring developers to have a deeper understanding of the services that make up the project. It is available for use [here](link to Google spreadsheet).

##### Purpose and Use Case

The **Advanced Chunk Size Calculator** is ideal for moderately customized projects or when developers need greater control over performance and resource usage. It goes beyond the **Basic Chunk Size Calculator** by taking into account resource allocations, such as container sizes, CPU, and memory limits, allowing for a more tailored configuration that aligns with specific project needs. 

##### Key Input Parameters

To calculate the correct queue chunk sizes, the following data should be provided:

- **Scheduler and Worker Setup**: Provide details on non-standard configurations, such as multiple containers or distinct worker distributions within containers if your scheduler setup differs from the default.
- **Resource Configuration**: Specify the hardware setup, including instance types, CPU, and memory limits for services like **Persistence**, **Storage**, **Search**, or **Message Broker** to optimize chunk sizes based on actual resource availability.
- **Detailed Product Configuration**: Provide specific metrics for products, the highest-traffic entity. This supports more precise chunk sizing without requiring an in-depth understanding of **Publish & Synchronize**.
- **Event and Message Processing Metrics**: Provide expected processing metrics, including deviations from default settings such as message trigger rates, custom application warm-up times, event size limits, and data division rate multipliers, allowing configuration adjustments that align with real-world performance.

##### Output and Configuration

Once the required data is entered into the **Advanced Chunk Size Calculator**, it will compute the optimal queue chunk sizes for each queue. Developers should configure these queue chunk sizes in the project to align with the calculated values.

> For instructions on setting up chunk sizes for queues, [click here](https://docs.spryker.com/docs/dg/dev/backend-development/data-manipulation/queue/queue.html#configuration-for-chunk-size).

##### Important Considerations

- The **Advanced Chunk Size Calculator** allows for further configuration of chunk sizes based on custom hardware limitations and performance metrics.
- For systems requiring individual queue configurations and detailed customization of message setups, consider using the **Expert Chunk Size Calculator**.
- Ensure the recommended chunk sizes are correctly configured to maintain optimal system performance.

#### 3. Expert Chunk Size Calculator

The **Expert Chunk Size Calculator** is designed for developers working with heavily customized entities within their projects. It provides the granular control needed to fine-tune each queue's performance, especially when entities are significantly customized in terms of size, relationships, or data complexity.

As the complexity of an entity increases, so does the denormalization time, which can slow down the entire system. Developers using the **Expert Chunk Size Calculator** must have a solid understanding of how containerization works in the project, including the distribution of resources like memory and CPU among containers, workers, and tasks. Additionally, understanding the limitations of the receiving side services (such as search and storage) and provider systems (like the database) is crucial. The message broker, which delivers messages and imposes throughput limits, is also a critical component of the overall system architecture that needs to be considered.

The **Expert Chunk Size Calculator** is available [here](link to google spreadsheet).

##### Purpose and Use Case

The **Expert Chunk Size Calculator** is essential for projects that involve complex entities with large data sets and intricate relationships. Basic or Advanced queue chunk size configurations may not suffice in such scenarios. This calculator provides detailed, queue-by-queue configuration options that enable developers to optimize performance under these conditions.

##### Input Parameters

To properly configure chunk sizes, the **Expert Chunk Size Calculator** requires a wide range of detailed inputs. Developers need to provide in-depth information about the production environment, including:

- **Entity Customization**: Details about the size and cardinality of the entities, which affect how much memory and CPU is consumed during the denormalization process.
- **Message Handling**: Specific configuration data regarding the size of messages processed by the system and the limits imposed by the message broker and receiving systems.

The expert calculator offers the ability to set individual performance and resource consumption metrics for each queue, allowing for precise optimization of the entire **publish and synchronize** process.

##### Output

The result of the **Expert Chunk Size Calculator** is a set of optimized queue chunk sizes for each individual queue in the project.

> For instructions on how to set up chunk sizes for the queues, [click here](https://docs.spryker.com/docs/dg/dev/backend-development/data-manipulation/queue/queue.html#configuration-for-chunk-size).

##### Important Notes

- The **Expert Chunk Size Calculator** is intended for projects with significant customizations at the entity level. For more standard setups, consider using the **Basic** or **Advanced Chunk Size Calculators**.
- This calculator requires an in-depth understanding of how system components interact, including containerization, message brokers, search and storage, and resource distribution across workers and tasks.

##### Additional Knowledge Required

To effectively use the **Expert Chunk Size Calculator**, developers must have a strong grasp of key concepts related to resource management and system architecture, including:

###### Container-Worker-Task Resource Relationship
TBD
