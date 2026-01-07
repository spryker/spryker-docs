---
title: Composable UI best practices
description: Best practices and guidelines for developing Composable UI modules in Spryker.
template: howto-guide-template
last_updated: Jan 6, 2026
related:
  - title: Composable UI overview
    link: docs/dg/dev/backend-development/composable-ui/composable-ui.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
  - title: Create a Composable UI module
    link: docs/dg/dev/backend-development/composable-ui/create-a-composable-ui-module.html
---

This document provides best practices and guidelines for developing Composable UI modules based on real-world implementation experience.

## Configuration design

### Use meaningful component IDs

Use a consistent naming convention for component IDs:

```yaml
# Good: Clear, namespaced IDs
layout.customer.page
table.customer.list
form.customer.create
form.customer.edit
field.customer.email
action.customer.create
headline.customer.create

# Avoid: Generic or unclear IDs
layout1
myTable
form
emailField
```

### Prefer composition over duplication

Reuse components with `use` and `overrides` instead of duplicating configuration:

```yaml
# Good: Reuse base field with overrides
form.customer.edit:
    inputs:
        config:
            controls:
                - use: field.customer.email
                  overrides:
                      value: '${row.email}'

# Avoid: Duplicating field definition
form.customer.edit:
    inputs:
        config:
            controls:
                - name: 'email'
                  controlType: 'input'
                  type: 'email'
                  label: 'Email'
                  value: '${row.email}'
```

### Keep configurations DRY

Extract common patterns into reusable components:

```yaml
# Define reusable notification actions
notification.success.created:
    type: 'notification'
    notifications:
        - title: 'Record created successfully'
          type: 'success'

notification.success.saved:
    type: 'notification'
    notifications:
        - title: 'Changes saved successfully'
          type: 'success'

# Reuse in forms
form.customer.create:
    inputs:
        config:
            submit:
                actions:
                    - use: notification.success.created
                    - type: 'close-drawer'
```

### Organize components logically

Group related components together in the configuration:

```yaml
view:
    components:
        # Layouts first
        layout.customer.page:
            # ...

        # Then fields
        field.customer.email:
            # ...
        field.customer.firstName:
            # ...

        # Then forms
        form.customer.create:
            # ...
        form.customer.edit:
            # ...

        # Then tables
        table.customer.list:
            # ...

        # Then actions
        action.customer.create:
            # ...

        # Then headlines
        headline.customer.create:
            # ...
```

## API design

### Use consistent naming

Follow REST conventions for resource naming:

| Resource | Endpoint | Description |
|----------|----------|-------------|
| Customers | `/customers` | Customer collection |
| Customer | `/customers/{id}` | Single customer |
| CustomerAddresses | `/customer-addresses` | Address collection |

### Design for pagination

Always enable pagination for collection endpoints:

```yaml
resource:
    paginationEnabled: true
    paginationItemsPerPage: 10
```

### Implement proper filtering

Support common filter patterns:

```php
protected function getFilterFieldMapping(): array
{
    return [
        // API field => Transfer field
        'status' => 'status',
        'createdAt' => 'createdAt',
        'category' => 'fkCategory',
    ];
}
```

### Handle null filters gracefully

The `AbstractBackendProvider` automatically skips null and empty filter values:

```php
// Filters like {"status": null} are ignored
// Filters like {"dateRange": {}} are ignored
```

### Provide searchable fields

Configure which fields are searchable:

```php
protected function getSearchableFields(): array
{
    return ['email', 'firstName', 'lastName', 'customerReference'];
}
```

## Form design

### Group related fields

Organize form fields logically:

```yaml
form.customer.create:
    inputs:
        config:
            controls:
                # Personal information
                - use: field.customer.salutation
                - use: field.customer.firstName
                - use: field.customer.lastName
                
                # Contact information
                - use: field.customer.email
                - use: field.customer.phone
                
                # Additional details
                - use: field.customer.dateOfBirth
                - use: field.customer.company
```

### Provide clear validation messages

Use descriptive validation messages:

```yaml
field.customer.email:
    name: 'email'
    controlType: 'input'
    type: 'email'
    label: 'Email Address'
    validators:
        required: true
        email: true
    # In validation.yml
    # - NotBlank:
    #     message: 'Please enter an email address'
    # - Email:
    #     message: 'Please enter a valid email address'
```

### Handle form submission feedback

Always provide success and error feedback:

```yaml
submit:
    label: 'Save'
    method: 'PATCH'
    url: '/customers/${row.customerReference}'
    actions:
        - type: 'notification'
          notifications:
              - title: 'Customer saved successfully'
                type: 'success'
        - type: 'close-drawer'
    errorActions:
        - type: 'notification'
          notifications:
              - title: 'Failed to save customer'
                description: 'Please check your input and try again.'
                type: 'error'
```

## Table design

### Choose appropriate column types

Use the right column type for each data type:

```yaml
columns:
    - { id: 'reference', title: 'Reference', type: 'text' }
    - { id: 'status', title: 'Status', type: 'chip' }
    - { id: 'createdAt', title: 'Created', type: 'date', typeOptions: { format: 'dd.MM.y' } }
    - { id: 'thumbnail', title: 'Image', type: 'image' }
    - { id: 'price', title: 'Price', type: 'text' }  # Format in provider
```

### Provide useful filters

Add filters for commonly searched fields:

```yaml
filters:
    enabled: true
    items:
        - id: 'status'
          title: 'Status'
          type: 'select'
          typeOptions:
              options:
                  - { value: 'active', title: 'Active' }
                  - { value: 'inactive', title: 'Inactive' }
        - id: 'createdAt'
          title: 'Created Date'
          type: 'date-range'
        - id: 'category'
          title: 'Category'
          type: 'select-http'
          typeOptions:
              datasource:
                  url: '/categories'
                  valueField: 'id'
                  titleField: 'name'
```

### Configure sensible pagination

Choose appropriate page sizes:

```yaml
pagination:
    enabled: true
    sizes: [10, 25, 50, 100]
```

## Security

### Always require authentication

Set security on all API resources:

```yaml
resource:
    security: "is_granted('IS_AUTHENTICATED_FULLY')"
```

### Use granular ACL rules

Create specific rules for each operation:

```text
module/entity/get-collection  # List
module/entity/get             # View
module/entity/post            # Create
module/entity/patch           # Update
module/entity/delete          # Delete
```

### Validate input on the server

Never trust client-side validation alone:

```yaml
# validation.yml
properties:
    email:
        - NotBlank: ~
        - Email: ~
    amount:
        - NotBlank: ~
        - Positive: ~
        - LessThanOrEqual: 1000000
```

## API Provider implementation

### Always use getter methods for Transfer mapping

**Critical:** When mapping Transfer objects to API resources in Providers, always use getter methods, never `toArray()`:

```php
// ✅ Correct - reliable data retrieval
protected function mapTransferToResource(AbstractTransfer $transfer): object
{
    return CustomersBackendResource::fromArray([
        'customerReference' => $transfer->getCustomerReference(),
        'email' => $transfer->getEmail(),
        'firstName' => $transfer->getFirstName(),
        'salutation' => $transfer->getSalutation(),
    ]);
}

// ❌ Wrong - returns null for unmodified fields
protected function mapTransferToResource(AbstractTransfer $transfer): object
{
    $resource = new CustomersBackendResource();
    $resource->fromArray($transfer->toArray());
    return $resource;
}
```

**Why:** The `toArray()` method only returns fields that were explicitly modified during the transfer's lifecycle. Unmodified fields return `null`, causing data loss.

### Extend AbstractBackendProvider

Use `AbstractBackendProvider` for standardized functionality:

```php
use Spryker\ApiPlatform\Provider\AbstractBackendProvider;

class CustomersBackendProvider extends AbstractBackendProvider
{
    protected function provideItem(string $identifier): ?object
    {
        $transfer = $this->facade->findByReference($identifier);
        return $transfer ? $this->mapTransferToResource($transfer) : null;
    }
    
    protected function fetchAllItems(): array
    {
        return $this->facade->getAllEntities();
    }
    
    protected function getSearchableFields(): array
    {
        return ['email', 'firstName', 'lastName'];
    }
}
```

### Configure public endpoints correctly

For reference data endpoints (salutations, countries), omit the `security` property:

```yaml
# Public endpoint - no authentication required
resource:
    name: Salutations
    provider: SprykerFeature\Glue\CustomerRelationManagement\Api\Backend\Provider\SalutationsBackendProvider
    operations:
        - type: GetCollection

# Protected endpoint - authentication required
resource:
    name: Customers
    security: "is_granted('IS_AUTHENTICATED_FULLY')"
    provider: SprykerFeature\Glue\CustomerRelationManagement\Api\Backend\Provider\CustomersBackendProvider
```

## Performance

### Optimize API queries

Fetch only required data:

```php
protected function fetchAllItems(): array
{
    // Use efficient queries with proper indexes
    return $this->facade->getCustomersForList();
}
```

### Use appropriate page sizes

Don't load too much data at once:

```yaml
paginationItemsPerPage: 10  # Good default
# Avoid: paginationItemsPerPage: 1000
```

### Lazy load related data

Load related data only when needed:

```yaml
# In table, show only essential columns
columns:
    - { id: 'reference', title: 'Reference' }
    - { id: 'name', title: 'Name' }
    - { id: 'status', title: 'Status' }

# Load full details in drawer
rowActions:
    actions:
        - type: 'drawer'
          # Drawer loads full entity data
```

## Testing

### Test API endpoints

Write tests for your API providers and processors:

```php
public function testGetCollectionReturnsCustomers(): void
{
    // Arrange
    $this->createTestCustomers();

    // Act
    $response = $this->get('/customers');

    // Assert
    $this->assertResponseIsSuccessful();
    $this->assertJsonContains(['totalItems' => 3]);
}
```

### Test ACL rules

Verify access control works correctly:

```php
public function testUnauthorizedUserCannotDelete(): void
{
    // Arrange
    $this->loginAsViewer();

    // Act
    $response = $this->delete('/customers/DE--1');

    // Assert
    $this->assertResponseStatusCodeSame(403);
}
```

### Validate configuration

Use schema validation for YAML configurations:

```bash
vendor/bin/console composable-ui:validate-config
```

## Documentation

### Document custom components

Add comments to explain non-obvious configuration:

```yaml
table.order.list:
    component: TableComponent
    inputs:
        config:
            # Custom column configuration for order status
            # Status values: pending, processing, shipped, delivered, cancelled
            columns:
                - id: 'status'
                  title: 'Status'
                  type: 'chip'
                  typeOptions:
                      # Color mapping for different statuses
                      color:
                          pending: 'yellow'
                          processing: 'blue'
                          shipped: 'purple'
                          delivered: 'green'
                          cancelled: 'red'
```