---
title: Create a Composable UI module
description: Step-by-step guide to creating a new Composable UI feature module with YAML-driven Back Office UI.
template: howto-guide-template
last_updated: Feb 20, 2026
related:
  - title: Composable UI overview
    link: docs/dg/dev/backend-development/composable-ui/composable-ui.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
  - title: Entity configuration reference
    link: docs/dg/dev/backend-development/composable-ui/entity-configuration-reference.html
  - title: Composable UI troubleshooting
    link: docs/dg/dev/backend-development/composable-ui/composable-ui-troubleshooting.html
---

{% info_block warningBox "Beta" %}

Composable UI is currently in beta and intended for internal use. This functionality is under active development, and there is no backward compatibility guarantee at this time. We do not recommend using it in production projects until it reaches a stable release.

{% endinfo_block %}

This document describes how to create a new Composable UI feature module with YAML-driven Back Office UI.

{% info_block infoBox "Prerequisites" %}

Before creating a Composable UI module, ensure you have completed:
- [Install Composable UI](/docs/dg/dev/backend-development/composable-ui/install-composable-ui.html)
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Create API resources first

{% endinfo_block %}

## Prerequisites

- Spryker project with Composable UI infrastructure installed
- Basic understanding of YAML configuration
- Familiarity with Spryker module structure

## Module structure

Create the following directory structure for your module:

```text
src/SprykerFeature/{YourModule}/
├── resources/
│   ├── {your-module}.yml           # Feature definition
│   ├── entity/
│   │   └── {entity}.yml            # Entity UI configuration
│   ├── api/
│   │   └── backend/
│   │       ├── {entities}.resource.yml    # API resource definition
│   │       └── {entities}.validation.yml  # Validation rules
├── src/
│   └── SprykerFeature/
│       ├── Glue/
│       │   └── {YourModule}/
│       │       └── Api/
│       │           └── Backend/
│       │               ├── Provider/
│       │               │   └── {Entity}BackendProvider.php
│       │               └── Processor/
│       │                   └── {Entity}BackendProcessor.php
│       └── Zed/
│           └── {YourModule}/
│               └── Application/
│                   └── zed.entry.ts    # Optional: Custom Angular modules
├── composer.json
└── README.md
```

**Note**: The `zed.entry.ts` file is only required if you need to register custom Angular modules or components. For standard YAML-driven UI, this file is not needed. See [Extend with custom Angular modules](/docs/dg/dev/backend-development/composable-ui/extend-composable-ui-with-custom-angular-modules.html) for details.

## Step 1: Register the feature module

Register your feature module in `.spryker/features.yml`:

```yaml
features:
    YourModule:
        url: src/SprykerFeature/YourModule
```

This file registers all Composable UI feature modules in your project. Each feature entry includes:
- **Key** (for example, `YourModule`): Feature name in PascalCase
- **url**: Relative path to the feature module directory

Example with multiple features:

```yaml
features:
    CustomerRelationManagement:
        url: src/SprykerFeature/CustomerRelationManagement
    ProductManagement:
        url: src/SprykerFeature/ProductManagement
    YourModule:
        url: src/SprykerFeature/YourModule
```

## Step 2: Create the feature definition

Create `resources/{your-module}.yml` to define your feature:

```yaml
feature: YourModule

entities:
    - YourEntity
    - AnotherEntity
```

### Feature definition properties

| Property | Required | Description |
|----------|----------|-------------|
| `feature` | Yes | Module name in PascalCase |
| `entities` | Yes | List of entities managed by this module |

## Step 2: Create the entity configuration

Create `resources/entity/{entity}.yml` for each entity.

For detailed reference of all available components, fields, and configuration options, see [Entity configuration reference](/docs/dg/dev/backend-development/composable-ui/entity-configuration-reference.html).

### Option A: Auto-generated mode (recommended)

For standard CRUD operations, use the simplified auto-generated mode:

<details>
<summary>Auto-generated mode example</summary>

```yaml
entity: YourEntity

navigation:
    title: 'Your Entities'

fields:
    reference:
        readonly: true
        searchable: true

    name:
        required: true
        searchable: true

    status:
        type: select
        required: true
        datasource:
            url: /statuses
        filterable: true

    description:
        searchable: true

    createdAt:
        type: date
        label: Created At
        format: dd.MM.y
        filterable: true

ui:
    list:
        columns:
            - reference
            - name
            - status
            - description
            - createdAt
        rowAction: edit

    create:
        fields:
            - name
            - status
            - description

    edit:
        fields:
            - name
            - status
            - description
```

</details>

This automatically generates table, forms, buttons, and all UI components.

### Option B: Custom mode (for advanced use cases)

For full control over UI components, use custom mode:

<details>
<summary>Custom mode example</summary>

```yaml
entity: YourEntity

navigation:
    title: 'Your Entities'

ui:
    mode: custom

view:
    layout:
        use: layout.your-entity.page

    components:
        layout.your-entity.page:
            component: LayoutComponent
            id: 'page-layout'
            virtualRoute: 'root'
            className: 'page-layout'
            contains:
                actions:
                    - use: action.your-entity.create
                content:
                    - use: table.your-entity.list

        # Field definitions
        field.your-entity.name:
            label: 'Name'
            required: true

        field.your-entity.status:
            type: select
            label: 'Status'
            required: true
            datasource:
                url: '/statuses'

        field.your-entity.description:
            label: 'Description'

        field.your-entity.reference:
            type: hidden

        # Headlines
        headline.your-entity.create:
            component: HeadlineComponent
            level: 'h3'
            style:
                background-color: 'var(--spy-white)'
                padding: '15px 30px'
            contains:
                content: 'Create New Entity'

        headline.your-entity.edit:
            component: HeadlineComponent
            level: 'h3'
            style:
                background-color: 'var(--spy-white)'
                padding: '15px 30px'
            contains:
                content: 'Update ${row.name} Entity'
                actions:
                    - use: form.your-entity.delete

        # Forms
        form.your-entity.create:
            component: DynamicFormComponent
            style:
                padding: '30px'
            fields:
                - use: field.your-entity.name
                - use: field.your-entity.status
                - use: field.your-entity.description
            submit:
                label: 'Create'
                url: '/your-entities'
                success: 'The entity is created.'
                error: 'Failed to create entity.'

        form.your-entity.edit:
            component: DynamicFormComponent
            style:
                padding: '30px'
            fields:
                - use: field.your-entity.name
                - use: field.your-entity.status
                - use: field.your-entity.description
            submit:
                label: 'Save'
                url: '/your-entities/${row.reference}'
                success: 'The entity is saved.'
                error: 'Failed to save entity.'

        form.your-entity.delete:
            component: DynamicFormComponent
            slot: 'actions'
            fields:
                - use: field.your-entity.reference
            submit:
                label: 'Delete'
                url: '/your-entities/${row.reference}'
                variant: 'critical'
                success: 'The entity is deleted.'
                error: 'Failed to delete entity.'

        # Action button
        action.your-entity.create:
            component: ButtonActionComponent
            contains:
                content: 'Create Entity'
            action:
                type: 'drawer'
                drawer:
                    - use: headline.your-entity.create
                    - use: form.your-entity.create

        # Data table
        table.your-entity.list:
            component: TableComponent
            id: 'your-entity-table'
            dataSource:
                url: '/your-entities'
            columns:
                - { id: 'reference', title: 'Reference' }
                - { id: 'name', title: 'Name' }
                - { id: 'status', title: 'Status' }
                - { id: 'description', title: 'Description' }
                - id: 'createdAt'
                  title: 'Created At'
                  type: 'date'
                  format: 'dd.MM.y'
            filters:
                - id: 'status'
                  title: 'Status'
                  type: 'select'
                  datasource:
                      url: '/statuses'
                - { id: 'createdAt', title: 'Created', type: 'date-range' }
            pagination: [10, 20, 50]
            search: 'Search entities...'
            rowClick:
                drawer:
                    - use: headline.your-entity.edit
                    - use: form.your-entity.edit
```

</details>

## Step 3: Register navigation

Add your module to the Back Office navigation in `config/Zed/navigation.xml`.

{% info_block warningBox "Troubleshooting" %}

If your module doesn't appear in navigation after completing this step, see [Module doesn't appear in navigation](/docs/dg/dev/backend-development/composable-ui/composable-ui-troubleshooting.html#module-doesnt-appear-in-navigation).

{% endinfo_block %}

```xml
<?xml version="1.0"?>
<config>
    <your-module>
        <label>Your Module</label>
        <title>Your Module</title>
        <icon>fa-cube</icon>
        <pages>
            <your-entity>
                <label>Your Entities</label>
                <title>Your Entities</title>
                <bundle>falcon-ui</bundle>
                <controller>feature</controller>
                <action>index</action>
                <uri>/your-module/your-entity</uri>
            </your-entity>
        </pages>
    </your-module>
</config>
```

Navigation structure:
- **bundle**: Always `falcon-ui` for Composable UI modules
- **controller**: Always `feature` for Composable UI modules
- **action**: Always `index`
- **uri**: Route path `/{module-name}/{entity-name}` in kebab-case
- **icon**: Optional FontAwesome icon class
- **pages**: Nested items for each entity

## Step 4: Create API resources

Create API resources for your entities following the [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) guide.

For Composable UI modules, place API resources in:

```text
src/SprykerFeature/YourModule/resources/api/backend/
├── your_entities.resource.yml
└── your_entities.validation.yml
```

### Implement Provider with AbstractBackendProvider

Composable UI modules should extend `AbstractBackendProvider` for standardized data fetching with built-in search, filtering, and pagination:

**src/SprykerFeature/YourModule/src/SprykerFeature/Glue/YourModule/Api/Backend/Provider/YourEntitiesBackendProvider.php**:

<details>
<summary>Provider implementation example</summary>

```php
<?php

namespace SprykerFeature\Glue\YourModule\Api\Backend\Provider;

use Spryker\ApiPlatform\Provider\AbstractBackendProvider;
use Generated\Api\Backend\YourEntitiesBackendResource;
use Generated\Shared\Transfer\AbstractTransfer;

class YourEntitiesBackendProvider extends AbstractBackendProvider
{
    protected function provideItem(string $identifier): ?object
    {
        $entityTransfer = $this->yourModuleFacade->findByReference($identifier);
        
        if (!$entityTransfer) {
            return null;
        }
        
        return $this->mapTransferToResource($entityTransfer);
    }
    
    protected function mapTransferToResource(AbstractTransfer $transfer): object
    {
        return YourEntitiesBackendResource::fromArray([
            'id' => $transfer->getId(),
            'name' => $transfer->getName(),
            'description' => $transfer->getDescription(),
            'status' => $transfer->getStatus(),
            'createdAt' => $transfer->getCreatedAt(),
        ]);
    }
}
```

</details>

#### Search and filtering configuration

Search and filtering are configured in your entity YAML file using field properties:

**Searchable fields** - mark fields with `searchable: true`:

```yaml
fields:
    name:
        searchable: true
    description:
        searchable: true
```

- When users type in the search box, the table sends `GET /your-entities?search=keyword`
- `AbstractBackendProvider` automatically searches across all `searchable: true` fields

**Filterable fields** - mark fields with `filterable: true`:

```yaml
fields:
    status:
        type: select
        filterable: true
    
    createdAt:
        type: date
        filterable: true
```

- User selects "Active" in status filter → `GET /your-entities?filter[status]=active`
- User selects date range → `GET /your-entities?filter[createdAtFrom]=2024-01-01&filter[createdAtTo]=2024-12-31`
- `AbstractBackendProvider` automatically applies these filters to database queries

**Built-in capabilities** - `AbstractBackendProvider` automatically handles:
- **Pagination**: `?page=2&itemsPerPage=20`
- **Search**: Full-text search across `searchable: true` fields
- **Filtering**: Field-based filtering with automatic null handling
- **Date ranges**: Supports `From`/`To` suffixes (for example, `createdAtFrom`, `createdAtTo`)

### Optional: Implement Processors for write operations

If your module needs create, update, or delete operations, implement separate Processors for each operation.

#### Create base Processor with mapping logic

**src/SprykerFeature/YourModule/src/SprykerFeature/Glue/YourModule/Api/Backend/Processor/AbstractYourEntitiesProcessor.php**:

<details>
<summary>AbstractProcessor implementation</summary>

```php
<?php

namespace SprykerFeature\Glue\YourModule\Api\Backend\Processor;

use Generated\Api\Backend\YourEntitiesBackendResource;
use Generated\Shared\Transfer\YourEntityTransfer;
use Spryker\Zed\YourModule\Business\YourModuleFacadeInterface;

abstract class AbstractYourEntitiesProcessor
{
    public function __construct(
        protected YourModuleFacadeInterface $yourModuleFacade
    ) {
    }

    protected function mapResourceToTransfer(YourEntitiesBackendResource $resource): YourEntityTransfer
    {
        $entityTransfer = new YourEntityTransfer();

        if ($resource->getName() !== null) {
            $entityTransfer->setName($resource->getName());
        }
        if ($resource->getDescription() !== null) {
            $entityTransfer->setDescription($resource->getDescription());
        }
        if ($resource->getStatus() !== null) {
            $entityTransfer->setStatus($resource->getStatus());
        }

        return $entityTransfer;
    }

    protected function mapTransferToResource(YourEntityTransfer $entityTransfer): YourEntitiesBackendResource
    {
        return YourEntitiesBackendResource::fromArray([
            'reference' => $entityTransfer->getReference(),
            'name' => $entityTransfer->getName(),
            'description' => $entityTransfer->getDescription(),
            'status' => $entityTransfer->getStatus(),
            'createdAt' => $entityTransfer->getCreatedAt(),
        ]);
    }
}
```

</details>

#### Create Processor (POST)

**src/SprykerFeature/YourModule/src/SprykerFeature/Glue/YourModule/Api/Backend/Processor/CreateYourEntityProcessor.php**:

<details>
<summary>CreateProcessor implementation</summary>

```php
<?php

namespace SprykerFeature\Glue\YourModule\Api\Backend\Processor;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Generated\Api\Backend\YourEntitiesBackendResource;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * @implements \ApiPlatform\State\ProcessorInterface<\Generated\Api\Backend\YourEntitiesBackendResource, \Generated\Api\Backend\YourEntitiesBackendResource>
 */
class CreateYourEntityProcessor extends AbstractYourEntitiesProcessor implements ProcessorInterface
{
    public function process(
        mixed $data,
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ): YourEntitiesBackendResource {
        $entityTransfer = $this->mapResourceToTransfer($data);
        $responseTransfer = $this->yourModuleFacade->createEntity($entityTransfer);

        if (!$responseTransfer->getIsSuccess()) {
            $errors = [];
            foreach ($responseTransfer->getErrors() as $error) {
                $errors[] = $error->getMessage();
            }

            throw new BadRequestHttpException('Failed to create entity: ' . implode(', ', $errors));
        }

        return $this->mapTransferToResource($responseTransfer->getEntityOrFail());
    }
}
```

</details>

#### Update Processor (PATCH) and Delete Processor (DELETE)

Create `UpdateYourEntityProcessor.php` and `DeleteYourEntityProcessor.php` following the same pattern as CreateProcessor:

- **UpdateYourEntityProcessor**: Calls `$this->yourModuleFacade->updateEntity()`, extracts entity reference from `$uriVariables['reference']`, returns updated resource
- **DeleteYourEntityProcessor**: Calls `$this->yourModuleFacade->deleteEntity()`, returns `void` (no content response)

#### Register Processors in resource configuration

In `resources/api/backend/your_entities.resource.yml`, specify which Processor handles each operation.

For detailed API resource configuration options, see [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html).

```yaml
resource:
    name: YourEntities
    shortName: YourEntity
    description: Your entity management API

    provider: SprykerFeature\Glue\YourModule\Api\Backend\Provider\YourEntitiesBackendProvider

    paginationItemsPerPage: 10

    security: "is_granted('IS_AUTHENTICATED_FULLY')"

    operations:
        - type: Post
          processor: SprykerFeature\Glue\YourModule\Api\Backend\Processor\CreateYourEntityProcessor
        - type: Get
        - type: GetCollection
        - type: Patch
          processor: SprykerFeature\Glue\YourModule\Api\Backend\Processor\UpdateYourEntityProcessor
        - type: Delete
          processor: SprykerFeature\Glue\YourModule\Api\Backend\Processor\DeleteYourEntityProcessor

    properties:
        reference:
            type: string
            description: Unique reference
            identifier: true

        name:
            type: string
            description: Entity name
            required: true

        description:
            type: string
            description: Entity description

        status:
            type: string
            description: Entity status

        createdAt:
            type: string
            description: Creation date
            writable: false
```

**Key points**:
- Each operation (POST, PATCH, DELETE) has its own Processor class
- All Processors extend `AbstractYourEntitiesProcessor` for shared mapping logic
- Processors implement `ProcessorInterface` from API Platform
- `process()` method handles the operation
- Error handling and Response transfers
- Processors are registered per operation in resource YAML
- `security` property applies to all operations (authentication required for POST, PATCH, DELETE)

### Configure API security

API resources should be protected with authentication to ensure only authorized users can access them.

#### Add authentication requirement

In your resource YAML, add the `security` property:

```yaml
resource:
    name: YourEntities
    shortName: YourEntity
    
    security: "is_granted('IS_AUTHENTICATED_FULLY')"
```

**What it does**:
- `security: "is_granted('IS_AUTHENTICATED_FULLY')"` requires users to be authenticated with a valid OAuth token
- Unauthenticated requests return `401 Unauthorized`
- Only users logged into Back Office can access this API

**Why it's needed**:
- Protects sensitive business data from unauthorized access
- Ensures audit trail - all actions are tied to authenticated users
- Enables ACL (Access Control List) rules per user role

**Authentication flow**:
1. User logs into Back Office
2. System generates OAuth access token (if `SecurityGuiConfig::IS_ACCESS_TOKEN_GENERATION_ON_LOGIN_ENABLED = true`, see [Install Composable UI](/docs/dg/dev/backend-development/composable-ui/install-composable-ui.html))
3. Frontend sends token in `Authorization: Bearer {token}` header
4. API validates token before processing request

### Optional: Create reference data endpoints for filters

If your table has filters with dynamic options from API (like salutations, statuses, categories), create reference data endpoints.

#### When to use

In your entity YAML, when you have a filter with HTTP datasource:

```yaml
# In auto-generated mode
fields:
    salutation:
        type: select
        filterable: true
        datasource:
            url: /salutations      # This endpoint needs to be created

# Or in custom mode
filters:
    - id: 'salutation'
      type: 'select'
      datasource:
          url: '/salutations'
```

#### Create reference data Provider

**src/SprykerFeature/YourModule/src/SprykerFeature/Glue/YourModule/Api/Backend/Provider/SalutationsBackendProvider.php**:

<details>
<summary>Reference data Provider example</summary>

```php
<?php

namespace SprykerFeature\Glue\YourModule\Api\Backend\Provider;

use Spryker\ApiPlatform\Provider\AbstractBackendProvider;
use Generated\Api\Backend\SalutationsBackendResource;

class SalutationsBackendProvider extends AbstractBackendProvider
{
    protected function provideCollection(): iterable
    {
        // Return static list or fetch from database
        $salutations = [
            ['value' => 'mr', 'title' => 'Mr.'],
            ['value' => 'mrs', 'title' => 'Mrs.'],
            ['value' => 'ms', 'title' => 'Ms.'],
            ['value' => 'dr', 'title' => 'Dr.'],
        ];

        foreach ($salutations as $salutation) {
            yield SalutationsBackendResource::fromArray($salutation);
        }
    }
}
```

</details>

**For database-driven options**:

```php
protected function provideCollection(): iterable
{
    $statusTransfers = $this->yourModuleFacade->getStatusList();
    
    foreach ($statusTransfers as $statusTransfer) {
        yield SalutationsBackendResource::fromArray([
            'value' => $statusTransfer->getKey(),
            'title' => $statusTransfer->getLabel(),
        ]);
    }
}
```

#### Create reference data resource

**resources/api/backend/salutations.resource.yml**:

```yaml
resource:
    name: Salutations
    shortName: Salutation
    description: Salutation options for filters

    provider: SprykerFeature\Glue\YourModule\Api\Backend\Provider\SalutationsBackendProvider

    # No security property = public endpoint (accessible without authentication)

    operations:
        - type: GetCollection

    properties:
        value:
            type: string
            description: Option value
            identifier: true

        title:
            type: string
            description: Option display text
```

**Key points**:
- Reference data endpoints typically use only `GetCollection` operation (no POST/PATCH/DELETE)
- Resource properties must match the `valueField` and `titleField` specified in your filter configuration

**Response example**:

<details>
<summary>JSON response</summary>

```json
{
    "@context": "\/contexts\/Salutation",
    "@id": "\/salutations",
    "@type": "Collection",
    "totalItems": 5,
    "member": [
        {
            "@id": "\/salutations\/1",
            "@type": "Salutation",
            "id": 1,
            "value": "Mr",
            "title": "Mr"
        },
        {
            "@id": "\/salutations\/2",
            "@type": "Salutation",
            "id": 2,
            "value": "Mrs",
            "title": "Mrs"
        },
        {
            "@id": "\/salutations\/3",
            "@type": "Salutation",
            "id": 3,
            "value": "Dr",
            "title": "Dr"
        },
        {
            "@id": "\/salutations\/4",
            "@type": "Salutation",
            "id": 4,
            "value": "Ms",
            "title": "Ms"
        },
        {
            "@id": "\/salutations\/5",
            "@type": "Salutation",
            "id": 5,
            "value": "n\/a",
            "title": "n\/a"
        }
    ]
}
```

</details>

## Step 5: Generate API resources

Generate API resource classes from your YAML definitions:

```bash
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate
```

This generates resource classes in `src/Generated/Api/Backend/`.

## Step 6: Build and verify

1. Generate transfers:

```bash
docker/sdk cli console transfer:generate
```

2. Build navigation cache:

```bash
docker/sdk cli console navigation:build-cache
```

3. Build the Falcon UI:

```bash
npm run falcon:install && npm run falcon:build
```

4. Clear caches:

```bash
docker/sdk cli console cache:empty-all
docker/sdk cli glue cache:clear
```

{% info_block warningBox "Troubleshooting" %}

If changes don't appear after rebuilding, see [Changes to YAML don't appear](/docs/dg/dev/backend-development/composable-ui/composable-ui-troubleshooting.html#changes-to-yaml-dont-appear).

{% endinfo_block %}

## Step 7: Configure ACL permissions

Composable UI modules automatically integrate with Spryker's ACL (Access Control List) system. You can manage user permissions for your module in the Back Office.

For detailed information about ACL configuration and best practices, see [Install the ACL feature](/docs/pbc/all/user-management/{{site.version}}/base-shop/install-and-upgrade/install-the-acl-feature.html).

## Verification

1. **Check navigation**: Log in to the Back Office and verify your module appears in the navigation menu.
   - If module is not visible, see [Module doesn't appear in navigation](/docs/dg/dev/backend-development/composable-ui/composable-ui-troubleshooting.html#module-doesnt-appear-in-navigation)

2. **Test the list page**: 
   - Navigate to your module
   - Verify the table displays with correct columns
   - Test pagination, search, and filters
   - If table shows "No data", see [Table shows "No data" or empty](/docs/dg/dev/backend-development/composable-ui/composable-ui-troubleshooting.html#table-shows-no-data-or-empty)
   - If filters/search don't work, see [Filters or search don't work](/docs/dg/dev/backend-development/composable-ui/composable-ui-troubleshooting.html#filters-or-search-dont-work)

3. **Test CRUD operations**:
   - Create a new entity using the drawer form
   - Edit an existing entity
   - Delete an entity
   - Verify success notifications appear
   - If forms don't submit, see [Forms don't submit or show errors](/docs/dg/dev/backend-development/composable-ui/composable-ui-troubleshooting.html#forms-dont-submit-or-show-errors)

4. **Check API endpoints**:

   ```bash
   # List all entities
   curl -X GET http://glue-backend.your-domain.local/your-entities \
     -H "Authorization: Bearer YOUR_TOKEN"
   
   # Create entity
   curl -X POST http://glue-backend.your-domain.local/your-entities \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/ld+json" \
     -d '{"name":"Test Entity"}'
   ```

## Troubleshooting

If you encounter issues while creating or working with your Composable UI module, see [Composable UI troubleshooting](/docs/dg/dev/backend-development/composable-ui/composable-ui-troubleshooting.html) for solutions to common problems.

## Next steps

- [Entity configuration reference](/docs/dg/dev/backend-development/composable-ui/entity-configuration-reference.html) - Complete YAML configuration guide
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Detailed API Platform resource configuration
- [Composable UI best practices](/docs/dg/dev/backend-development/composable-ui/composable-ui-best-practices.html) - Implementation patterns
