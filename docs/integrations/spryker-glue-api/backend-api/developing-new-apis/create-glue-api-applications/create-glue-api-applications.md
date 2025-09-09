---
title: Create Backend API applications
description: Guide for creating Backend API applications in Spryker.
last_updated: July 9, 2025
template: default

---

Spryker's Backend API is a powerful tool for building administrative applications, integrating with third party services, and creating backend system integrations. This guide provides a high level overview of the process for creating a new Backend API application.


### Key concepts

Before diving into the development process, it's important to understand a few key concepts:

- Backend API: The core API infrastructure for administrative and system-to-system operations.
- Backend API Features: Designed for backend integrations and administrative tasks with direct access to Zed Facades, database, broker, and other core services.
- Modern API Infrastructure: Uses the latest API infrastructure which offers improved flexibility and performance for backend operations.
- Modules and Resources: Your API will be organized into modules, and each module can expose one or more resources (for example "products," "carts," "orders").


### The development process

Creating a new API application in Spryker involves the following key steps:

1. Define Your Backend API Requirements: Determine what administrative or system integration functionality your Backend API will provide and which Zed Facades it needs to access.

2. Create a New Backend Module: You'll need to create a new module for your Backend API. This module will contain all the code for your new API resources, including controllers, processors, and data transfer objects (DTOs).

3. Define Your Resources: For each resource you want to expose through your API (for example a new "wishlists" resource), you'll need to define the corresponding routes, controllers, and business logic.

4. Implement Business Logic: This is where you'll write the code that handles the actual work of your API. This might involve retrieving data from the database, calling other services, or performing calculations.

5. Data Transfer Objects (DTOs): You'll use DTOs to define the structure of the data that your API sends and receives. This helps to ensure that your API is well documented and easy to use.

6. Register Your Resources: Once you've created your resources, you'll need to register them with the Backend API application so that they can be accessed through the API.

7. Authentication and Authorization: You'll need to secure your API by implementing authentication and authorization checks to ensure that only authorized users can access your resources.

8. Documentation: It's important to document your Backend API so that other developers can understand how to use it. Spryker provides tools to help you generate API documentation automatically.


