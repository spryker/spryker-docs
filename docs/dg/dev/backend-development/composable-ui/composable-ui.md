---
title: Composable UI overview
description: Learn about Spryker's Composable UI - a configuration-driven approach to building Back Office functionality with zero frontend code for standard CRUD operations.
template: concept-topic-template
last_updated: Feb 20, 2026
---

{% info_block warningBox "Beta" %}

Composable UI is currently in beta and intended for internal use. This functionality is under active development, and there is no backward compatibility guarantee at this time. We do not recommend using it in production projects until it reaches a stable release.

{% endinfo_block %}

Composable UI is a development layer for the Spryker Back Office that enables configuration-driven UI generation. It provides a zero-frontend approach for standard CRUD operations, letting developers define the Back Office pages through YAML configuration instead of writing custom JavaScript or markup.

## Composable UI explained

Composable UI is an embedded Single Page Application (SPA) called FalconUI, integrated into the existing Spryker Back Office. Each section registered by a Composable UI module is a standalone SPA page that communicates with the Glue Backend API.

The key components include:

- **FalconUI**: An Angular-based PWA frontend that renders UI components dynamically based on YAML definitions.
- **Glue Backend API**: REST API layer that handles all data operations between the frontend and backend.
- **API Platform**: Generates REST endpoints and contracts from YAML resource definitions.
- **Angular component library**: Reuses the Merchant Portal component library to maintain a unified tech stack.
- **ACL integration**: Built-in authorization mechanism against REST APIs.

## Composable UI use cases

- **Accelerate development**: Build Back Office CRUD features in hours instead of days using declarative YAML configuration—no frontend code required for standard cases.
- **Reduce costs**: Eliminate repetitive boilerplate code with auto-generated APIs and UI components, letting your team focus on business logic.
- **Lower the barrier to entry**: Backend developers can deliver complete Back Office functionality without specialized frontend expertise.
- **Ship faster**: Standard features go from concept to production without custom JavaScript or markup, significantly reducing time-to-market.
- **Ensure consistency**: A unified REST API contract between frontend and backend improves maintainability, testability, and developer experience.

## Benefits of Composable UI

Composable UI offers significant advantages for teams building Back Office functionality:
- Faster feature delivery with declarative configuration
- Reduced maintenance overhead through auto-generated components
- Consistent user experience across all CRUD interfaces
- Lower complexity with standardized patterns

## Architecture overview

```text
┌─────────────────────────────────────────────────────────────┐
│                 Spryker Back Office (Zed)                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 FalconUI (Angular SPA)                │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │  │
│  │  │   Tables    │  │    Forms    │  │   Drawers   │    │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Glue Backend API                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 API Platform Resources                │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │  │
│  │  │  Providers  │  │ Processors  │  │ Validators  │    │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘    │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                │    
│  ┌───────────────────────────────────────────────────────┐  │
│  │              SprykerFeature Modules                   │  │
│  │         (Customer, Product, Order, etc.)              │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## How it works

### Configuration loading

When a user clicks a Composable UI navigation item:

1. The Back Office triggers a request to fetch the module configuration from the backend.
2. The configuration endpoint returns the YAML-defined UI structure as JSON.
3. The Angular SPA renders the UI based on the retrieved configuration.
4. Configuration is cached in the browser to avoid repeated requests.

### PWA routing

Composable UI modules operate as Progressive Web Applications with virtual routing:

- **Virtual URLs**: The kernel supports PWA-style URLs that don't correspond to physical backend routes.
- **Deep linking**: Navigating to a deep PWA route (for example, `/customer-relation-management/customers/edit/DE--1`) correctly falls back to the module's main route.
- **Browser refresh**: Refreshing on any PWA sub-route works without 404 errors—the kernel serves the SPA shell, which then handles client-side routing.

### Authentication flow

1. During Back Office login, the system retrieves an OAuth2 access token.
2. The token is stored in the browser session.
3. All API requests include the token in the `Authorization` header.
4. Token refresh is handled automatically when the token expires.

## Module structure

A Composable UI module lives in the `SprykerFeature` namespace and consists of:

| Directory/File | Purpose |
|----------------|---------|
| `.spryker/features.yml` | Registers the feature and points to its configuration file |
| `resources/{feature}.yml` | Feature definition listing entities |
| `resources/entity/*.yml` | Entity UI configurations (tables, forms, fields, actions) |
| `resources/api/backend/*.resource.yml` | API resource definitions (provider, processor, properties) |
| `resources/api/backend/*.validation.yml` | Validation rules per HTTP method |
| `src/.../Glue/.../Api/Backend/Provider/` | Data providers for read operations |
| `src/.../Glue/.../Api/Backend/Processor/` | Processors for create, update, delete operations |

## Supported capabilities

Composable UI supports the following out of the box:

- **Lists with pagination**: Configurable data tables with sorting and filtering.
- **Search**: Full-text search across configured fields.
- **Filters**: Select, multi-select, date range, and custom filter types.
- **Forms**: Dynamic form generation with validation.
- **CRUD operations**: Create, read, update, and delete via REST endpoints.
- **Drawers and modals**: Slide-out panels for detail views and editing.
- **Navigation integration**: Registration in Back Office navigation via `navigation.xml`.
- **ACL**: Role-based access control at the API level.

## Limitations

- **Non-standard UI/UX**: Complex or custom UI scenarios may still require frontend development.
- **Learning curve**: Teams need to adapt to the configuration-driven approach.
- **Not a replacement**: Composable UI is an additional way of delivering features, not a replacement for the existing Back Office UI.

## Next steps

- [Install Composable UI](/docs/dg/dev/backend-development/composable-ui/install-composable-ui.html)
- [Create a Composable UI module](/docs/dg/dev/backend-development/composable-ui/create-a-composable-ui-module.html)
- [Entity configuration reference](/docs/dg/dev/backend-development/composable-ui/entity-configuration-reference.html)
- [Extend with custom Angular modules](/docs/dg/dev/backend-development/composable-ui/extend-composable-ui-with-custom-angular-modules.html)
- [Best practices](/docs/dg/dev/backend-development/composable-ui/composable-ui-best-practices.html)
