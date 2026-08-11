---
title: Comparison of Storefront and Backend APIs
description: Comparison of Storefront API and Backend API capabilities and differences.
last_updated: July 30, 2026
template: default
redirect_from:
  - /docs/integrations/spryker-glue-api/getting-started-with-apis/backend-and-storefront-api-differences.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/create-backend-vs-storefront-api-endpoint.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/backend-and-storefront-api-module-differences.html
  - /docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-infrastructure/backend-and-storefront-api-module-differences.html
  - /docs/scos/dev/glue-api-guides/202404.0/decoupled-glue-infrastructure/backend-and-storefront-api-module-differences.html
  - /docs/scos/dev/glue-api-guides/202204.0/decoupled-glue-infrastructure/backend-and-storefront-api-module-differences.html
  - /docs/scos/dev/glue-api-guides/202404.0/backend-and-storefront-api-module-differences.html
  - /docs/dg/dev/glue-api/latest/backend-and-storefront-api-module-differences.html

  - /docs/integrations/spryker-glue-api/getting-started-with-apis/comparison-of-storefront-and-backend-apis.html
---

This document describes differences between Storefront API (REST API) and Backend API.

Spryker provides two main API applications in the same project. *Storefront APIs* are designed for consumer-facing applications and provide access to Storage and Elasticsearch, making RPC Zed calls using Clients. *Backend APIs* are designed for administrative and system-to-system communication with direct access to Facades, enabling performant backend operations.

Storefront API uses customer-based authentication, while Backend API uses user-based authentication.

For the module-level implementation differences on the Glue infrastructure, see [Backend and Storefront API module differences](/docs/integrations/spryker-api/backend-api/developing-apis/backend-and-storefront-api-module-differences.html).