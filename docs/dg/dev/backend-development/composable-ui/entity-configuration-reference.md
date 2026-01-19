---
title: Entity configuration reference
description: Complete reference for Composable UI entity YAML configuration with detailed explanations and examples.
template: howto-guide-template
related:
  - title: Composable UI overview
    link: docs/dg/dev/backend-development/composable-ui/composable-ui.html
  - title: Create a Composable UI module
    link: docs/dg/dev/backend-development/composable-ui/create-a-composable-ui-module.html
---

This document explains how to configure entity UI using YAML files in Composable UI modules.

## Overview

An entity configuration file is a YAML file that describes the entire UI for one entity (like Customer, Product, Order). The file is located at `resources/entity/{entity}.yml` in your module.

Composable UI supports **three configuration formats**:

| Format | Description | Use case |
|--------|-------------|----------|
| **Auto-generated** | Minimal configuration, UI is fully generated | Standard CRUD operations |
| **Partial override** | Auto-generated base with specific customizations | CRUD with minor tweaks |
| **Custom mode** | Full manual control over every component | Complex or non-standard UIs |

### Choosing the right format

```
┌─────────────────────────────────────────────────────────────────┐
│                    Do you need standard CRUD?                    │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
             YES                              NO
              │                               │
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│  Do you need to tweak   │     │      Custom mode        │
│  pagination, headlines, │     │  (full manual control)  │
│  or specific fields?    │     └─────────────────────────┘
└─────────────────────────┘
              │
    ┌─────────┴─────────┐
    ▼                   ▼
   YES                  NO
    │                   │
    ▼                   ▼
┌─────────────┐   ┌─────────────┐
│   Partial   │   │    Auto-    │
│  override   │   │  generated  │
└─────────────┘   └─────────────┘
```

---

## Format 1: Auto-generated

The simplest format. Define fields and UI sections—the system generates everything else.

### Complete example

```yaml
entity: Customer

navigation:
    title: 'Customers'

fields:
    customerReference:
        readonly: true
        searchable: true

    email:
        type: email
        required: true
        searchable: true

    firstName:
        required: true
        searchable: true

    lastName:
        required: true
        searchable: true

    salutation:
        type: select
        required: true
        datasource:
            url: /salutations
        filterable: true

    dateOfBirth:
        type: date
        label: Date of Birth

    createdAt:
        type: date
        label: Registration Date
        format: dd.MM.y
        filterable: true

    reference:
        type: hidden
        label: reference

ui:
    list:
        columns:
            - customerReference
            - email
            - salutation
            - firstName
            - lastName
            - createdAt
        rowAction: edit

    create:
        fields:
            - email
            - firstName
            - lastName
            - salutation

    edit:
        fields:
            - email
            - firstName
            - lastName
            - createdAt
            - salutation
```

### What gets auto-generated

From this configuration, the system automatically creates:

- **Table** with 6 columns, pagination (5, 10, 20), and search
- **Filters** for `salutation` and `createdAt` (fields with `filterable: true`)
- **"Create" button** that opens a drawer with 4 fields
- **Row click** opens edit drawer with 5 fields and delete button
- **All forms** have validation, success/error notifications, and proper actions

### Structure breakdown

#### `entity`

The entity name in **singular form**. Maps to:
- API resource: `/customers` (plural)
- Database table: `spy_customer`

#### `navigation`

```yaml
navigation:
    title: 'Customers'  # Title shown in breadcrumbs
```

#### `fields`

Define all fields used in forms and tables:

```yaml
fields:
    fieldName:
        type: string          # Field type (default: string)
        label: 'Field Label'  # Display label (auto-generated if not specified)
        required: true        # Required in forms
        readonly: true        # Cannot be edited
        searchable: true      # Included in table search
        filterable: true      # Adds filter to table
        format: dd.MM.y       # Display format for dates
        datasource:           # For select fields
            url: /options
```

**Field types:**

| Type | Description | Form control |
|------|-------------|--------------|
| `string` | Text (default) | Text input |
| `email` | Email with validation | Email input |
| `date` | Date value | Date picker |
| `select` | Dropdown selection | Select with options |
| `hidden` | Not visible | Hidden input |

#### `ui`

Define what appears in list, create, and edit views:

```yaml
ui:
    list:
        columns: [field1, field2, field3]  # Columns to show in table
        rowAction: edit                     # Action on row click

    create:
        fields: [field1, field2]  # Fields in create form

    edit:
        fields: [field1, field2, field3]  # Fields in edit form
```

---

## Format 2: Partial override

Start with auto-generated configuration, then override specific components.

### Complete example

```yaml
entity: Customer

navigation:
    title: 'Customers (Partial Override)'

fields:
    customerReference:
        readonly: true
        searchable: true

    email:
        type: email
        required: true
        searchable: true

    firstName:
        required: true
        searchable: true

    lastName:
        required: true
        searchable: true

    salutation:
        type: select
        required: true
        datasource:
            url: /salutations
        filterable: true

    createdAt:
        type: date
        label: Registration Date
        format: dd.MM.y
        filterable: true

ui:
    list:
        columns:
            - customerReference
            - email
            - salutation
            - lastName
            - createdAt
        rowAction: edit

    create:
        fields:
            - email
            - firstName
            - lastName
            - salutation

    edit:
        fields:
            - email
            - firstName
            - lastName
            - createdAt
            - salutation

# Override specific components
view:
    components:
        headline.customer.edit:
            style:
                background-color: 'var(--spy-red)'
            contains:
                content: 'Custom: Update ${row.customerReference} Customer'

        table.customer.list:
            pagination: [25, 50, 100]
            search: 'Search by name or email...'
```

### How it works

1. **System generates all components** from `fields` and `ui` sections
2. **You add `view.components`** with only the parts you want to change
3. **Deep merge** combines your overrides with auto-generated components
4. **Result**: Only specified properties are overridden

### Component IDs for overrides

Auto-generated components have predictable IDs:

| Component | ID Pattern | Example |
|-----------|------------|---------|
| Table | `table.{entity}.list` | `table.customer.list` |
| Create form | `form.{entity}.create` | `form.customer.create` |
| Edit form | `form.{entity}.edit` | `form.customer.edit` |
| Create headline | `headline.{entity}.create` | `headline.customer.create` |
| Edit headline | `headline.{entity}.edit` | `headline.customer.edit` |
| Field | `field.{entity}.{fieldName}` | `field.customer.email` |

### Common overrides

**Custom pagination:**
```yaml
view:
    components:
        table.customer.list:
            pagination: [25, 50, 100]
```

**Custom search placeholder:**
```yaml
view:
    components:
        table.customer.list:
            search: 'Search customers...'
```

**Custom headline styling:**
```yaml
view:
    components:
        headline.customer.edit:
            style:
                background-color: 'var(--spy-red)'
            contains:
                content: 'Edit: ${row.customerReference}'
```

**Custom field validation message:**
```yaml
view:
    components:
        field.customer.email:
            validators:
                email:
                    message: 'Please enter a valid email'
```

---

## Format 3: Custom mode

Full manual control over every UI component. Uses a simplified syntax.

### Complete example

```yaml
entity: Customer

navigation:
    title: 'Customers (Custom)'

ui:
    mode: custom

view:
    layout:
        use: layout.customer.page

    components:
        # ═══════════════════════════════════════════════════════════
        # LAYOUT
        # ═══════════════════════════════════════════════════════════
        layout.customer.page:
            component: LayoutComponent
            id: 'page-layout'
            virtualRoute: 'root'
            className: 'page-layout'
            contains:
                actions:
                    - use: action.customer.create
                content:
                    - use: table.customer.list

        # ═══════════════════════════════════════════════════════════
        # FIELDS
        # ═══════════════════════════════════════════════════════════
        field.customer.email:
            type: email
            label: 'Email'
            required: true
            searchable: true

        field.customer.firstName:
            label: 'First Name'
            required: true
            searchable: true

        field.customer.lastName:
            label: 'Last Name'
            required: true
            searchable: true

        field.customer.salutation:
            type: select
            label: 'Salutation'
            required: true
            datasource:
                url: '/salutations'

        field.customer.registrationDate:
            type: date
            label: 'Registration Date'

        field.customer.reference:
            type: hidden

        # ═══════════════════════════════════════════════════════════
        # HEADLINES
        # ═══════════════════════════════════════════════════════════
        headline.customer.create:
            component: HeadlineComponent
            level: 'h3'
            style:
                background-color: 'var(--spy-white)'
                padding: '15px 30px'
            contains:
                content: 'Create New Customer'

        headline.customer.edit:
            component: HeadlineComponent
            level: 'h3'
            style:
                background-color: 'var(--spy-white)'
                padding: '15px 30px'
            contains:
                content: 'Update ${row.customerReference} Customer'
                actions:
                    - use: form.customer.delete

        # ═══════════════════════════════════════════════════════════
        # FORMS
        # ═══════════════════════════════════════════════════════════
        form.customer.create:
            component: DynamicFormComponent
            style:
                padding: '30px'
            fields:
                - use: field.customer.email
                - use: field.customer.firstName
                - use: field.customer.lastName
                - use: field.customer.salutation
            submit:
                label: 'Create'
                url: '/customers'
                success: 'The customer is created.'
                error: 'Failed to create customer.'

        form.customer.edit:
            component: DynamicFormComponent
            style:
                padding: '30px'
            fields:
                - use: field.customer.email
                - use: field.customer.firstName
                - use: field.customer.lastName
                - use: field.customer.registrationDate
                - use: field.customer.salutation
            submit:
                label: 'Save'
                url: '/customers/${row.customerReference}'
                success: 'The customer is saved.'
                error: 'Failed to save customer.'

        form.customer.delete:
            component: DynamicFormComponent
            slot: 'actions'
            fields:
                - use: field.customer.reference
            submit:
                label: 'Delete'
                url: '/customers/${row.customerReference}'
                variant: 'critical'
                success: 'The customer is deleted.'
                error: 'Failed to delete customer.'

        # ═══════════════════════════════════════════════════════════
        # BUTTON
        # ═══════════════════════════════════════════════════════════
        action.customer.create:
            component: ButtonActionComponent
            contains:
                content: 'Create Customer'
            action:
                type: 'drawer'
                drawer:
                    - use: headline.customer.create
                    - use: form.customer.create

        # ═══════════════════════════════════════════════════════════
        # TABLE
        # ═══════════════════════════════════════════════════════════
        table.customer.list:
            component: TableComponent
            id: 'customer-table'
            dataSource:
                url: '/customers'
            columns:
                - { id: 'customerReference', title: 'Reference' }
                - { id: 'email', title: 'Email' }
                - { id: 'salutation', title: 'Salutation' }
                - { id: 'firstName', title: 'First Name' }
                - { id: 'lastName', title: 'Last Name' }
                - id: 'registrationDate'
                  title: 'Registration Date'
                  type: 'date'
                  format: 'dd.MM.y'
            filters:
                - id: 'salutation'
                  title: 'Salutation'
                  type: 'select'
                  datasource:
                      url: '/salutations'
                - { id: 'registrationDate', title: 'Registered', type: 'date-range' }
            pagination: [5, 10, 20]
            search: 'Search customers...'
            rowClick:
                drawer:
                    - use: headline.customer.edit
                    - use: form.customer.edit
```

### Structure breakdown

#### Required settings

```yaml
ui:
    mode: custom  # Enables custom mode

view:
    layout:
        use: layout.customer.page  # Entry point component

    components:
        # All components defined here
```

#### Component types

| Component | Purpose |
|-----------|---------|
| `LayoutComponent` | Page container with slots for actions and content |
| `TableComponent` | Data table with columns, filters, pagination |
| `DynamicFormComponent` | Forms for create, edit, delete |
| `HeadlineComponent` | Headers with optional action buttons |
| `ButtonActionComponent` | Action buttons that open drawers |

For a complete list of available components and their inputs, see the [Spryker UI Components Library](https://spy-storybook.web.app/).

#### Component inputs

**Important:** Available inputs vary by component. Check the [Spryker UI Components Library](https://spy-storybook.web.app/) to see which inputs each component supports.

**Common examples:**

```yaml
# HeadlineComponent - 'level' input for heading size
headline.customer.edit:
    component: HeadlineComponent
    level: 'h3'

# TableComponent - pagination and search
table.customer.list:
    component: TableComponent
    pagination: [10, 25, 50]
    search: 'Search...'

# DynamicFormComponent - fields and submit
form.customer.edit:
    component: DynamicFormComponent
    fields:
        - use: field.customer.email
    submit:
        label: 'Save'
        url: '/customers/${row.id}'
```

#### Component slots with `contains`

The `contains` keyword defines content for component **slots**. Each component type has different available slots.

**Syntax:**
```yaml
contains:
    {slot-name}: 'text content'           # Simple text
    {slot-name}:                          # Or nested components
        - use: {component-id}
```

**Important:** Available slots vary by component. Check the [Spryker UI Components Library](https://spy-storybook.web.app/) to see which slots each component supports.

```yaml
# LayoutComponent - has 'actions' and 'content' slots
layout.customer.page:
    component: LayoutComponent
    contains:
        actions:
            - use: action.customer.create
        content:
            - use: table.customer.list

# HeadlineComponent - has 'content' and 'actions' slots
headline.customer.edit:
    component: HeadlineComponent
    contains:
        content: 'Update ${row.customerReference} Customer'
        actions:
            - use: form.customer.delete

# ButtonActionComponent - has 'content' slot
action.customer.create:
    component: ButtonActionComponent
    contains:
        content: 'Create Customer'
```

#### Component references with `use`

The `use` keyword references a component defined elsewhere in `view.components`. This enables:
- **Reusability**: Define a component once, use it in multiple places
- **Composition**: Build complex UIs by combining smaller components
- **Overrides**: Modify specific properties when reusing

**Syntax:**
```yaml
- use: {component-id}           # Reference by component ID
  overrides:                    # Optional: override specific properties
      property: 'new value'
```

**How it works:**
1. Define components in `view.components` with unique IDs (e.g., `field.customer.email`, `form.customer.edit`)
2. Reference them using `use: {component-id}`
3. The system replaces `use` with the full component definition at runtime

**Examples:**

```yaml
# In form fields - reference field components
fields:
    - use: field.customer.email           # Use as-is
    - use: field.customer.firstName
      overrides:
          value: '${row.firstName}'       # Override specific property

# In drawers - reference headline and form components
rowClick:
    drawer:
        - use: headline.customer.edit     # First component in drawer
        - use: form.customer.edit         # Second component in drawer

# In layout slots - reference action buttons and tables
contains:
    actions:
        - use: action.customer.create     # Button in actions slot
    content:
        - use: table.customer.list        # Table in content slot
```

**Component ID naming convention:**
- `field.{entity}.{fieldName}` - Form fields (e.g., `field.customer.email`)
- `form.{entity}.{action}` - Forms (e.g., `form.customer.create`, `form.customer.edit`)
- `headline.{entity}.{action}` - Headlines (e.g., `headline.customer.edit`)
- `table.{entity}.list` - Tables (e.g., `table.customer.list`)
- `action.{entity}.{action}` - Action buttons (e.g., `action.customer.create`)
- `layout.{entity}.page` - Page layouts (e.g., `layout.customer.page`)

#### Variable interpolation

Use `${row.fieldName}` to insert values from the current table row:

```yaml
# In URLs
url: '/customers/${row.customerReference}'

# In headlines
content: 'Edit ${row.customerReference}'

# In field values
overrides:
    value: '${row.email}'
```

---

## Reference

### Field types

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text input (default) | Name, description |
| `email` | Email with validation | Email address |
| `date` | Date picker | Birth date, created date |
| `select` | Dropdown with options | Status, category |
| `hidden` | Not visible to user | IDs, references |

### Field properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | string | Field type |
| `label` | string | Display label |
| `required` | boolean | Required in forms |
| `readonly` | boolean | Cannot be edited |
| `searchable` | boolean | Included in table search |
| `filterable` | boolean | Adds filter to table |
| `format` | string | Display format (e.g., `dd.MM.y`) |
| `datasource` | object | Options source for select fields |

### Validators

| Validator | Description | Example |
|-----------|-------------|---------|
| `required: true` | Field must have value | All required fields |
| `email: true` | Valid email format | Email fields |
| `minLength: N` | Minimum string length | `minLength: 3` |
| `maxLength: N` | Maximum string length | `maxLength: 100` |
| `min: N` | Minimum number | `min: 0` |
| `max: N` | Maximum number | `max: 100` |
| `pattern: 'regex'` | Regex pattern | `pattern: '^[A-Z]+$'` |

### HTTP methods

| Operation | Method | URL pattern |
|-----------|--------|-------------|
| Create | `POST` | `/entities` |
| Update | `PATCH` | `/entities/${row.id}` |
| Delete | `DELETE` | `/entities/${row.id}` |

---

## Troubleshooting

### Form doesn't pre-fill in edit mode

Add `overrides` with `${row.fieldName}`:

```yaml
fields:
    - use: field.customer.email
      overrides:
          value: '${row.email}'
```

### Table row click doesn't open drawer

Add `rowClick` (custom mode) or `rowAction: edit` (auto-generated):

```yaml
# Auto-generated
ui:
    list:
        rowAction: edit

# Custom mode
rowClick:
    drawer:
        - use: headline.customer.edit
        - use: form.customer.edit
```

### Table doesn't refresh after form submit

Ensure `refresh-table` action is included (automatic in simplified syntax):

```yaml
submit:
    success: 'Saved!'  # Includes close-drawer and refresh-table by default
```

### Date shows raw timestamp

Add `type: date` and `format`:

```yaml
columns:
    - id: 'createdAt'
      title: 'Created'
      type: 'date'
      format: 'dd.MM.y'
```

---

## Next steps

- [Create a Composable UI module](/docs/dg/dev/backend-development/composable-ui/create-a-composable-ui-module.html)
- [Composable UI best practices](/docs/dg/dev/backend-development/composable-ui/composable-ui-best-practices.html)
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html)
