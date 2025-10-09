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

In addition to not covered features, Data Exchange API also have some technical limitation that you must to consider:

- No complex validation OOTB. Currently only a basic validation is present. You can check a field type, if it required or not and length or range of the field value.
- Additional business logic that you might want to be executed together with data saving, possible only after data was saved via [Post Plugins[(/docs/integrations/spryker-glue-api/backend-api/data-exchange-api/create-post-plugins-for-data-exchange-api.html)
- No ManyToMany relations is possible to configure via Complex Endpoint configuration. For those relations extra API calls are required.
- Currently Complex Endpoints are not possible to configure via GUI and can be done only via install file or directly in database configuration.
