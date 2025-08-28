---
title: Aggregated Module Architecture Concept
description: The Spryker framework includes a diverse range of components designed to address common challenges and streamline development processes. These components establish conventions and guidelines to ensure appropriate application responses.
last_updated: Apr 25, 2025
template: concept-topic-template
redirect_from:
- /docs/dg/dev/architecture/aggregated-module-architecture.html
related:
  - title: Conceptual Overview
    link: docs/dg/dev/architecture/conceptual-overview.html
  - title: Modules and Application Layers
    link: docs/dg/dev/architecture/modules-and-application-layers.html
---

This document provides an overview on the Aggregated Module Architecture Concept, utilized for the feature development in Spryker.

Your feedback and suggestions are highly valued to enhance the accuracy, relevance, and effectiveness of Spryker. We encourage you to contribute your insights and recommendations by submitting changes through our designated channels.

## Overview

With the new Aggregated Module Architecture, Spryker shifts from a granular modularisation to a domain oriented modularisation mindset, where sub-domains and layers (CRUD, GUI, Yves, P&S, Glue) are combined into a single self-contained package. This creates a domain aligned packaging that reduces fragmentation, simplifies feature consumption, and significantly reduces cross-module dependencies.

### Feature Structure

Example of the Aggregated Module structure:

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

### Feature development changes on the Project Level

* The project-level [application layering](https://docs.spryker.com/docs/dg/dev/architecture/architectural-convention#application-layers) remains unchanged.
* Feature code at the project level now uses the SprykerFeature namespace instead of Spryker.
* In the new Aggregated Module Architecture, all sub-domains of the same feature are placed into a single feature folder, rather than being split across multiple modules.
