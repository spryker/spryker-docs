---
title: Data Exchange API limitations
description: Learn about current limitations and unsupported features in the Data Exchange API, including OMS, Product Lists, and Product prices per Customer.
last_updated: September 26, 2025
template: default
---

The Data Exchange API provides powerful capabilities for data synchronization and management in Spryker. However, there are certain features and functionalities that are not supported by the Data Exchange API. This document outlines these limitations to help you plan your integration strategy accordingly.

## Unsupported Features

The following features are currently not supported by the Data Exchange API:

- Order Management System (OMS): The Data Exchange API does not support Order Management System operations.
- Product Lists: Product List functionality is not available through the Data Exchange API.
- Product Prices per Customer: Customer-specific pricing is not supported in the Data Exchange API.

## Other limitations

In addition to the features not covered, the Data Exchange API also has some technical limitations that you must consider:

- No complex validation out of the box (OOTB). Currently, only basic validation is available. You can check a field's type, whether it is required or not, and the length or range of the field value.
- Additional business logic that you might want to execute together with data saving is only possible after the data has been saved via [Post Plugins[(/docs/integrations/spryker-glue-api/backend-api/data-exchange-api/create-post-plugins-for-data-exchange-api.html).
- Many-to-many relations cannot be configured via Complex Endpoint configuration. For those relations, additional API calls are required.
- Currently, Complex Endpoints cannot be configured via the GUI and can only be set up via an install file or directly in the database configuration.
