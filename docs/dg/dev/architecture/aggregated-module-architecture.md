---
title: Aggregated module architecture
description: The Spryker framework includes a diverse range of components designed to address common challenges and streamline development processes. These components establish conventions and guidelines to ensure appropriate application responses.
last_updated: Apr 25, 2025
template: concept-topic-template
related:
  - title: Conceptual Overview
    link: docs/dg/dev/architecture/conceptual-overview.html
  - title: Modules and Application Layers
    link: docs/dg/dev/architecture/modules-and-application-layers.html
---

With aggregated module architecture, Spryker shifts from a granular modularization to a domain oriented modularization, where sub-domains and layers, such as CRUD, GUI, Yves, P&S, or Glue, are combined into a single self-contained package. This creates a domain aligned packaging that reduces fragmentation, simplifies feature consumption, and significantly reduces cross-module dependencies.

## Feature structure

Example of the aggregated module structure:

```text
[FeatureName]
├── Client
│   └── [FeatureName]
│       ├── Exception
│       ├── Search
│       ├── Plugin
│       │   └── Elasticsearch
│       │   └── Catalog
│       │   └── ... 
│       ├── [FeatureName]ClientInterface.php
│       ├── [FeatureName]Client.php
│       ├── [FeatureName]Config.php
│       ├── [FeatureName]DependencyProvider.php
│       ├── [FeatureName]Factory.php
│       └── ...
├── Glue
│   └── [FeatureName] 
│       ├── Controller
│       │   ├── BackendApi
│       │   │   └── [BackendApiEntityName]ResourceController.php
│       │   └── StorefrontApi
│       │       └── RestApi
│       │           └── [RestApiEntityName]ResourceController.php
│       ├── Processor
│       │   ├── BackendApi
│       │   │   └── [BackendApiEntityName]Reader
│       │   └── StorefrontApi
│       │       └── RestApi
│       │           └── [RestApiEntityName]Reader
│       ├── Plugin
│       │   ├── BackendApi
│       │   └── StorefrontApi
│       ├── [FeatureName]Config.php
│       ├── [FeatureName]DependencyProvider.php
│       ├── [FeatureName]Factory.php
│       └── ...
├── Service
│   └── [FeatureName]
│       ├── [FeatureName]Config.php
│       ├── [FeatureName]DependencyProvider.php
│       ├── [FeatureName]Service.php
│       ├── [FeatureName]ServiceInterface.php
│       ├── [FeatureName]Factory.php
│       └── ...
├── Shared
│   └── [FeatureName]
│       ├── [FeatureName]Config.php
│       ├── [FeatureName]Constants.php
│       └── ...
├── Yves
│   └── [FeatureName]
│       ├── [FeatureName]Config.php
│       ├── [FeatureName]DependencyProvider.php
│       ├── [FeatureName]Factory.php
│       └── ...
└── Zed
   └── [FeatureName]
       ├── Business
       │   ├── [FeatureName]Factory.php
       │   ├── [FeatureName]Facade.php
       │   ├── [FeatureName]FacadeInterface.php
       │   └── ...
       ├── Communication
       ├── Persistence
       ├── Presentation 
       ├── [FeatureName]Config.php
       └── [FeatureName]DependencyProvider.php
```

### Feature development on the project level

- The project-level [application layering](https://docs.spryker.com/docs/dg/dev/architecture/architectural-convention#application-layers) remains unchanged.
- Feature code at the project level uses the SprykerFeature (SprykerFeature\Zed\[FeatureName]\...) namespace instead of Spryker (Spryker\Zed\[ModuleName]\...).
- All subdomains of the same feature are placed into a single feature folder, rather than being split across multiple modules.

### Example

For en example of feature usage on the project level, see [the self-service portal feature](https://github.com/spryker-shop/b2b-demo-shop/tree/ssp-master/src/Pyz/Zed/SelfServicePortal).














































