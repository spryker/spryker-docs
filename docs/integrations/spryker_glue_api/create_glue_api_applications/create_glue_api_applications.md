---
title: Create GLUE API Applications
description: API documentation for dynamic-entity-availability-abstracts.
last_updated: July 9, 2025
layout: custom_new
---

Spryker's **Glue API** is a powerful tool for building custom front end applications, integrating with third party services, and creating unique customer experiences. This guide provides a high level overview of the process for creating a new API application.


### Key Concepts

Before diving into the development process, it's important to understand a few key concepts:

- **Glue API:** The core of Spryker's API infrastructure.
- **Storefront vs. Backend API:** Spryker distinguishes between two types of API applications:
  - **Storefront API:** Designed for customer facing applications (for example mobile apps, single page applications). It has access to services like search and key value storage.
  - **Backend API:** Intended for backend integrations and administrative tasks. It has more direct access to the database, broker, and other core services.
- **Decoupled Glue API:** The latest version of the Glue API infrastructure, which offers improved flexibility and performance. When creating a new application, it's recommended to use the decoupled infrastructure.
- **Modules and Resources:** Your API will be organized into modules, and each module can expose one or more resources (for example "products," "carts," "orders").


### The Development Process

Creating a new API application in Spryker involves the following key steps:

1. **Define Your Application Type:** The first step is to decide whether you are building a **Storefront** or a **Backend** API. This choice will determine which services your application has access to and how it's configured.

2. **Create a New Module:** You'll need to create a new module for your API. This module will contain all the code for your new API resources, including controllers, processors, and data transfer objects (DTOs).

3. **Define Your Resources:** For each resource you want to expose through your API (for example a new "wishlists" resource), you'll need to define the corresponding routes, controllers, and business logic.

4. **Implement Business Logic:** This is where you'll write the code that handles the actual work of your API. This might involve retrieving data from the database, calling other services, or performing calculations.

5. **Data Transfer Objects (DTOs):** You'll use DTOs to define the structure of the data that your API sends and receives. This helps to ensure that your API is well documented and easy to use.

6. **Register Your Resources:** Once you've created your resources, you'll need to register them with the Glue application so that they can be accessed through the API.

7. **Authentication and Authorization:** You'll need to secure your API by implementing authentication and authorization checks to ensure that only authorized users can access your resources.

8. **Documentation:** It's important to document your API so that other developers can understand how to use it. Spryker provides tools to help you generate API documentation automatically.


