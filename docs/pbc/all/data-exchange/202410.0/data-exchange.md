---
title: Data Exchange
description: Learn all about Spryker's data exchange options that you can use within your Spryker project.
template: concept-topic-template
last_updated: Dec 18, 2023
redirect_from:
  - /spryker-middleware.htm
  - https://docs.spryker.com/spryker-middleware.htm   
  - /docs/pbc/all/data-exchange/202410.0/spryker-middleware-powered-by-alumio/spryker-middleware-powered-by-alumio.html
  - /docs/pbc/all/data-exchange/202410.0/spryker-middleware-powered-by-alumio/incrementally-import-products-with-spryker-middleware-powered-by-alumio.html
  - /docs/pbc/all/data-exchange/202410.0/spryker-middleware-powered-by-alumio/integration-apps/integration-apps.html
  - /docs/pbc/all/data-exchange/202410.0/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/create-tasks-and-import-products-from-akeneo-to-sccos.html
  - /docs/pbc/all/data-exchange/202410.0/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-smpa-connection-with-akeneo-pim-and-sccos.html       
  - /docs/pbc/all/data-exchange/202410.0/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-data-integration-path-between-akeneo-and-sccos.html  
  - /docs/pbc/all/data-exchange/202410.0/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app.html
  - /docs/pbc/all/data-exchange/202410.0/spryker-middleware-powered-by-alumio/integration-apps/akeneo-pim-integration-app/configure-the-akeneo-pim-integration-app/configure-data-mapping-between-akeneo-and-sccos.html  

---

Data Exchange refers to the process of transferring data between Spryker and third-party systems.

Spryker offers the following options to import and export data:

- Data Exchange API: available in SCCOS by default
- Data Importers and Data Exporters: available in Spryker Cloud Commerce OS (SCCOS) by default


### Custom integrations with custom connectors

{% include pbc/all/data-exchange/202311.0/custom-integrations-with-custom-connectors.md %} <!-- To edit, see /_includes/pbc/all/data-exchange/202311.0/custom-integrations-with-custom-connectors.md -->

## Data Exchange API

Data Exchange API is a dynamic database API that facilitates data transfer in real-time, ensuring data is exchanged across all integrated platforms. It's part of the SCCOS platform core.

Data Exchange API lets you build, customize, and manage database APIs tailored to your specific business requirements through a user interface.

The main benefits of the Data Exchange API include the following:

- No coding is required: The API endpoints are created from the user interface.
- Rapid API generation: The APIs are generated within minutes.
- Flexibility and customization: You can tailor APIs to your needs. You can define parameters to ensure compatibility with your systems.
- Real-time updates: The infrastructure supports dynamic changes, so you can modify APIs on the fly.
- Security and Access Control: The infrastructure incorporates strong security measures and access controls, which safeguards sensitive information.

We recommend considering the Data Exchange API if you want to create your own data integration engine via API, without using any middleware software.


## Data Importers and Data Exporters

Data Importers and Data Exporters are tools that let you bring external data into and send data from SCCOS, using .CSV files.  Data Importers and Data Exporters are part of the SCCOS platform core.
Data Importers and Data Exporters require extensive customization development for each project and ongoing development effort, which makes them less suitable for demanding data exchange.

For information on how Data importers and Exporters work, see [Data import](/docs/dg/dev/data-import/{{site.version}}/data-import.html) and [Data export](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/import-and-export-data/orders-data-export/orders-data-export.html).
