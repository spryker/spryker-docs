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

This document explains how to configure entity UI using YAML files in Composable UI modules. It includes detailed explanations, complete examples, and common patterns.

## What is an entity configuration file?

An entity configuration file is a YAML file that describes the entire UI for one entity (like Customer, Product, Order). You define:

- **Tables** - how to display lists of data
- **Forms** - how to create and edit records
- **Buttons** - what actions users can perform
- **Fields** - what inputs appear in forms

The file is located at `resources/entity/{entity}.yml` in your module.

## Basic structure overview

Every entity configuration file has this structure:

```yaml
entity: EntityName              # 1. What entity this file describes

view:                           # 2. UI definition starts here
    layout:                     # 3. Entry point component
        use:
            - layout.entity.page
    
    components:                 # 5. All UI components defined here
        layout.entity.page:     # Main page layout
            # ...
        table.entity.list:      # Data table
            # ...
        form.entity.create:     # Create form
            # ...
```

### Step-by-step explanation

1. **entity**: The name of your entity (matches your API resource name)
2. **view**: Everything related to the UI goes inside this section
3. **layout.use**: Points to the main component that renders first (your page layout)
4. **components**: A library of reusable UI pieces you define once and reference multiple times

## Understanding components

Think of components as LEGO blocks. You define them once in the `components:` section, then reuse them by referencing their ID with `use:`.

### Component anatomy

Each component has:

```yaml
component-id:                    # Unique name (like 'table.customer.list')
    component: TableComponent    # Type of component
    inputs:                      # Configuration for this component
        config:
            # Component-specific settings
```

### Naming convention

Use this pattern: `{type}.{entity}.{purpose}`

Examples:
- `table.customer.list` - table for customer list
- `form.customer.create` - form to create customer
- `form.customer.edit` - form to edit customer
- `field.customer.email` - email field for customer
- `action.customer.create` - button to create customer

## Complete CRUD workflow example

Before diving into details, here's a complete working example showing how to build a Customer management page with Create, Read, Update, Delete operations:

```yaml
entity: Customer

navigation:
    title: 'Customers'

view:
    layout:
        use:
            - layout.customer.page

    components:
        # STEP 1: Main page layout - the container for everything
        layout.customer.page:
            id: 'page-layout'
            virtualRoute: 'root'
            component: LayoutComponent
            className: 'page-layout'
            slots:
                actions:                          # Top right corner
                    - use: action.customer.create # "Create Customer" button
                content:                          # Main content area
                    - use: table.customer.list    # Customer data table

        # STEP 2: Data table - shows all customers
        table.customer.list:
            component: TableComponent
            inputs:
                config:
                    dataSource:
                        type: 'http'
                        url: '/customers'         # API endpoint to fetch data
                    columns:
                        - { id: 'customerReference', title: 'Reference' }
                        - { id: 'email', title: 'Email' }
                        - { id: 'firstName', title: 'First Name' }
                        - { id: 'lastName', title: 'Last Name' }
                    pagination: { enabled: true, sizes: [10, 20, 50] }
                    search: { enabled: true, placeholder: 'Search customers...' }
                    rowActions:                   # What happens when you click a row
                        enabled: true
                        click: drawer
                        actions:
                            - id: 'drawer'
                              type: 'drawer'
                              component: 'component-builder'
                              options:
                                  inputs:
                                      configuration:
                                          - use: headline.customer.edit
                                          - use: form.customer.edit

        # STEP 3: Create button
        action.customer.create:
            component: ButtonActionComponent
            slots:
                - content: 'Create Customer'
            inputs:
                action:
                    type: 'drawer'                # Opens a slide-out drawer
                    component: 'component-builder'
                    options:
                        inputs:
                            configuration:
                                - use: headline.customer.create
                                - use: form.customer.create

        # STEP 4: Form fields - define once, reuse in create and edit forms
        field.customer.email:
            name: 'email'
            controlType: 'input'
            type: 'email'
            label: 'Email Address'
            validators:
                required: true
                email: true

        field.customer.firstName:
            name: 'firstName'
            controlType: 'input'
            type: 'text'
            label: 'First Name'
            validators:
                required: true

        field.customer.lastName:
            name: 'lastName'
            controlType: 'input'
            type: 'text'
            label: 'Last Name'
            validators:
                required: true

        field.customer.reference:
            name: 'reference'
            controlType: 'input'
            type: 'hidden'                        # Hidden field for delete operation
            label: 'reference'

        # STEP 5: Create form
        headline.customer.create:
            component: HeadlineComponent
            style:
                background-color: 'var(--spy-white)'
                padding: '15px 30px'
            slots:
                - content: 'Create New Customer'
            inputs:
                level: 'h3'

        form.customer.create:
            component: DynamicFormComponent
            style:
                padding: '30px'
            inputs:
                config:
                    controls:
                        - use: field.customer.email
                        - use: field.customer.firstName
                        - use: field.customer.lastName
                    submit:
                        label: 'Create'
                        method: 'POST'
                        url: '/customers'
                        actions:                  # What happens on success
                            - type: 'notification'
                              notifications:
                                  - title: 'The customer is created.'
                                    type: 'success'
                            - type: 'close-drawer'
                            - type: 'refresh-table' # Reload table to show new customer
                        errorActions:             # What happens on error
                            - type: 'notification'
                              notifications:
                                  - title: 'Failed to create customer'
                                    description: 'Please refresh the page and try again.'
                                    type: 'error'

        # STEP 6: Edit form (notice the overrides with ${row.field})
        headline.customer.edit:
            component: HeadlineComponent
            style:
                background-color: 'var(--spy-white)'
                padding: '15px 30px'
            slots:
                - content: 'Edit Customer ${row.customerReference}'
                - slot: 'actions'                 # Delete button in header
                  use: form.customer.delete
            inputs:
                level: 'h3'

        form.customer.edit:
            component: DynamicFormComponent
            style:
                padding: '30px'
            inputs:
                config:
                    controls:
                        - use: field.customer.email
                          overrides:
                              value: '${row.email}' # Pre-fill with current value
                        - use: field.customer.firstName
                          overrides:
                              value: '${row.firstName}'
                        - use: field.customer.lastName
                          overrides:
                              value: '${row.lastName}'
                    submit:
                        label: 'Save'
                        method: 'PATCH'
                        url: '/customers/${row.customerReference}'
                        actions:
                            - type: 'notification'
                              notifications:
                                  - title: 'The customer is saved.'
                                    type: 'success'
                            - type: 'close-drawer'
                            - type: 'refresh-table'
                        errorActions:
                            - type: 'notification'
                              notifications:
                                  - title: 'Failed to save customer'
                                    description: 'Please refresh the page and try again.'
                                    type: 'error'

        # STEP 7: Delete form (shown as button in edit drawer header)
        form.customer.delete:
            component: DynamicFormComponent
            slot: 'actions'
            inputs:
                config:
                    controls:
                        - use: field.customer.reference
                    submit:
                        active: true
                        label: 'Delete'
                        method: 'DELETE'
                        url: '/customers/${row.customerReference}'
                        variant: 'critical'       # Red/danger button styling
                        actions:
                            - type: 'notification'
                              notifications:
                                  - title: 'The customer is deleted.'
                                    type: 'success'
                            - type: 'close-drawer'
                            - type: 'refresh-table'
                        errorActions:
                            - type: 'notification'
                              notifications:
                                  - title: 'Failed to delete customer'
                                    description: 'Please refresh the page and try again.'
                                    type: 'error'
```

### How this works

1. **User opens the page** → `layout.customer.page` renders with the table and create button
2. **User clicks "Create Customer"** → Opens drawer with `form.customer.create`
3. **User fills form and clicks "Create"** → POST to `/customers`, shows success notification, closes drawer, refreshes table
4. **User clicks a table row** → Opens drawer with `form.customer.edit` pre-filled with current values
5. **User edits and clicks "Save"** → PATCH to `/customers/{reference}`, shows success, closes drawer, refreshes table
6. **User clicks "Delete" in edit drawer** → DELETE to `/customers/{reference}`, shows success, closes drawer, refreshes table

## Component types reference

Now let's explain each component type in detail.

### LayoutComponent

**Purpose**: The main page container. This is always your starting point.

**When to use**: Once per entity, as the root component.

```yaml
layout.customer.page:
    id: 'page-layout'              # Unique ID
    virtualRoute: 'root'           # Always 'root' for main page
    component: LayoutComponent
    className: 'page-layout'       # CSS class for styling
    slots:                         # Named areas where you place other components
        actions:                   # Top right corner (for buttons)
            - use: action.customer.create
        content:                   # Main content area (for tables, forms)
            - use: table.customer.list
```

**Available slots**:
- `actions` - Top right corner, typically for create/action buttons
- `content` - Main content area, typically for tables or cards

### TableComponent

**Purpose**: Display data in a table with pagination, search, filters, and row actions.

**When to use**: For list views where users need to browse and select records.

#### Basic table example

```yaml
table.customer.list:
    component: TableComponent
    id: 'customer-table'           # Unique ID for this table
    inputs:
        config:
            dataSource:
                type: 'http'       # Fetch data from API
                url: '/customers'  # Your API endpoint
            columns:               # What columns to show
                - { id: 'email', title: 'Email' }
                - { id: 'firstName', title: 'First Name' }
                - { id: 'lastName', title: 'Last Name' }
            pagination: { enabled: true, sizes: [10, 20, 50] }
            search: { enabled: true, placeholder: 'Search...' }
```

#### Column types and formatting

**Simple text column** (default):
```yaml
- { id: 'email', title: 'Email Address' }
```

**Date column with formatting**:
```yaml
- id: 'registrationDate'
  title: 'Registration Date'
  type: 'date'
  editable: false              # Don't allow editing this column
  typeOptions:
      format: 'dd.MM.y'        # Date format: 31.12.2024
```

**Available column types**:
- `text` - Plain text (default)
- `date` - Date with formatting options
- `chip` - Colored badge/tag
- `image` - Image thumbnail

**Column properties**:

| Property | Description | Example |
|----------|-------------|----------|
| `id` | Field name from API response | `'email'` |
| `title` | Column header text | `'Email Address'` |
| `type` | Column type | `'date'`, `'text'`, `'chip'` |
| `typeOptions` | Type-specific options | `{ format: 'dd.MM.y' }` |
| `editable` | Allow inline editing | `false` (default: `true`) |

#### Filters

Filters let users narrow down results.

**Enable filters**:
```yaml
filters:
    enabled: true
    items:
        - # Filter definitions here
```

**Select filter with static options**:
```yaml
- id: 'status'
  title: 'Status'
  type: 'select'
  typeOptions:
      multiselect: false
      options:
          - { value: 'active', title: 'Active' }
          - { value: 'inactive', title: 'Inactive' }
```

**Select filter with options from API**:
```yaml
- id: 'salutation'
  title: 'Salutation'
  type: 'select'
  typeOptions:
      multiselect: false
      datasource:
          type: 'http'
          url: '/salutations'      # API endpoint returning options
          valueField: 'value'      # Field to use as option value
          titleField: 'title'      # Field to use as option label
```

**Date range filter**:
```yaml
- id: 'createdAt'
  title: 'Created Date'
  type: 'date-range'               # User can select from/to dates
```

**Available filter types**:

| Type | Description | Use case |
|------|-------------|----------|
| `select` | Dropdown selection | Status, category, type |
| `date-range` | Date from/to picker | Created date, updated date |
| `tree-select` | Hierarchical selection | Categories with subcategories |

**How filters work**: When a user selects a filter, the table automatically sends the filter value to your API as a query parameter. For example, selecting "Active" status sends `GET /customers?filter[status]=active`.

#### Pagination

```yaml
pagination:
    enabled: true
    sizes: [10, 20, 50]            # Let users choose page size
```

The table automatically handles pagination. Your API receives `?page=2&itemsPerPage=20`.

#### Search

```yaml
search:
    enabled: true
    placeholder: 'Search customers...'  # Placeholder text in search box
```

The table sends `?search=keyword` to your API. Your backend Provider should implement `getSearchableFields()` to define which fields are searchable.

#### Row actions (what happens when you click a row)

**Open edit form in drawer**:
```yaml
rowActions:
    enabled: true
    click: drawer                  # Open a slide-out drawer
    actions:
        - id: 'drawer'
          title: 'Edit'
          type: 'drawer'
          component: 'component-builder'
          options:
              inputs:
                  configuration:
                      - use: headline.customer.edit
                      - use: form.customer.edit
```

When a user clicks a table row, it:
1. Opens a drawer
2. Loads the edit form
3. Pre-fills form fields with `${row.fieldName}` values from the clicked row

**Complete table example with all features**:

```yaml
table.customer.list:
    component: TableComponent
    id: 'customer-table'
    inputs:
        config:
            dataSource:
                type: 'http'
                url: '/customers'
            columns:
                - { id: 'customerReference', title: 'Reference' }
                - { id: 'email', title: 'Email Address' }
                - { id: 'firstName', title: 'First Name' }
                - { id: 'lastName', title: 'Last Name' }
                - id: 'registrationDate'
                  title: 'Registered'
                  type: 'date'
                  editable: false
                  typeOptions: { format: 'dd.MM.y' }
            filters:
                enabled: true
                items:
                    - id: 'salutation'
                      title: 'Salutation'
                      type: 'select'
                      typeOptions:
                          multiselect: false
                          datasource:
                              type: 'http'
                              url: '/salutations'
                              valueField: 'value'
                              titleField: 'title'
                    - { id: 'registrationDate', title: 'Registered', type: 'date-range' }
            pagination: { enabled: true, sizes: [10, 20, 50] }
            search: { enabled: true, placeholder: 'Search customers...' }
            rowActions:
                enabled: true
                click: drawer
                actions:
                    - id: 'drawer'
                      title: 'Edit Customer'
                      type: 'drawer'
                      component: 'component-builder'
                      options:
                          inputs:
                              configuration:
                                  - use: headline.customer.edit
                                  - use: form.customer.edit
```

### DynamicFormComponent

**Purpose**: Create forms for creating and editing data.

**When to use**: For create, edit, and delete operations.

#### Basic form structure

```yaml
form.customer.create:
    component: DynamicFormComponent
    style:                         # Optional styling
        padding: '30px'
    inputs:
        config:
            controls:              # List of form fields
                - use: field.customer.email
                - use: field.customer.firstName
            submit:                # Submit button configuration
                label: 'Create'
                method: 'POST'
                url: '/customers'
                actions: []        # What to do on success
                errorActions: []   # What to do on error
```

#### Form fields (controls)

You reference field components defined elsewhere:

```yaml
controls:
    - use: field.customer.email      # Use field as-is
    - use: field.customer.firstName  # Use field as-is
```

**For edit forms**, use `overrides` to pre-fill with current values:

```yaml
controls:
    - use: field.customer.email
      overrides:
          value: '${row.email}'        # ${row.field} gets value from clicked table row
    - use: field.customer.firstName
      overrides:
          value: '${row.firstName}'
```

#### Submit button configuration

```yaml
submit:
    label: 'Create'                    # Button text
    method: 'POST'                     # HTTP method: POST, PATCH, DELETE
    url: '/customers'                  # API endpoint
    variant: 'critical'                # Optional: 'critical' for red delete button
    active: true                       # Optional: show immediately (for delete button)
    actions: []                        # What happens on success
    errorActions: []                   # What happens on error
```

**HTTP methods**:
- `POST` - Create new record
- `PATCH` - Update existing record
- `DELETE` - Delete record

**For edit and delete forms**, use `${row.field}` in URLs:

```yaml
submit:
    method: 'PATCH'
    url: '/customers/${row.customerReference}'  # Uses value from table row
```

#### Success actions

Actions that run when the form submits successfully:

```yaml
actions:
    - type: 'notification'             # Show success message
      notifications:
          - title: 'Customer created!'
            type: 'success'
    - type: 'close-drawer'             # Close the form drawer
    - type: 'refresh-table'            # Reload table to show changes
```

**Available actions**:

| Action | Description | When to use |
|--------|-------------|-------------|
| `notification` | Show message to user | Always for feedback |
| `close-drawer` | Close current drawer | After create/edit/delete |
| `refresh-table` | Reload table data | After create/edit/delete to show changes |
| `redirect` | Navigate to URL | Navigate to another page |

#### Error actions

Actions that run when the form submission fails:

```yaml
errorActions:
    - type: 'notification'
      notifications:
          - title: 'Failed to create customer'
            description: 'Please refresh the page and try again.'
            type: 'error'
```

**Always add error handling** to inform users when something goes wrong.

#### Complete form examples

**Create form**:
```yaml
form.customer.create:
    component: DynamicFormComponent
    style:
        padding: '30px'
    inputs:
        config:
            controls:
                - use: field.customer.email
                - use: field.customer.firstName
                - use: field.customer.lastName
            submit:
                label: 'Create'
                method: 'POST'
                url: '/customers'
                actions:
                    - type: 'notification'
                      notifications:
                          - title: 'The customer is created.'
                            type: 'success'
                    - type: 'close-drawer'
                    - type: 'refresh-table'
                errorActions:
                    - type: 'notification'
                      notifications:
                          - title: 'Failed to create customer'
                            description: 'Please refresh the page and try again.'
                            type: 'error'
```

**Edit form** (note the `overrides` and `${row.field}` in URL):
```yaml
form.customer.edit:
    component: DynamicFormComponent
    style:
        padding: '30px'
    inputs:
        config:
            controls:
                - use: field.customer.email
                  overrides:
                      value: '${row.email}'
                - use: field.customer.firstName
                  overrides:
                      value: '${row.firstName}'
                - use: field.customer.lastName
                  overrides:
                      value: '${row.lastName}'
            submit:
                label: 'Save'
                method: 'PATCH'
                url: '/customers/${row.customerReference}'
                actions:
                    - type: 'notification'
                      notifications:
                          - title: 'The customer is saved.'
                            type: 'success'
                    - type: 'close-drawer'
                    - type: 'refresh-table'
                errorActions:
                    - type: 'notification'
                      notifications:
                          - title: 'Failed to save customer'
                            description: 'Please refresh the page and try again.'
                            type: 'error'
```

**Delete form** (note the `variant: 'critical'` for red button):
```yaml
form.customer.delete:
    component: DynamicFormComponent
    slot: 'actions'                    # Goes in headline actions slot
    inputs:
        config:
            controls:
                - use: field.customer.reference  # Hidden field
            submit:
                active: true                   # Show button immediately
                label: 'Delete'
                method: 'DELETE'
                url: '/customers/${row.customerReference}'
                variant: 'critical'            # Red/danger styling
                actions:
                    - type: 'notification'
                      notifications:
                          - title: 'The customer is deleted.'
                            type: 'success'
                    - type: 'close-drawer'
                    - type: 'refresh-table'
                errorActions:
                    - type: 'notification'
                      notifications:
                          - title: 'Failed to delete customer'
                            description: 'Please refresh the page and try again.'
                            type: 'error'
```

### Field components

**Purpose**: Define reusable form fields (inputs, selects, date pickers, etc.).

**When to use**: Define each field once, then reuse it in multiple forms.

#### Why define fields separately?

Instead of repeating field definitions in every form, you define them once and reference them:

```yaml
# Define once
field.customer.email:
    name: 'email'
    controlType: 'input'
    type: 'email'
    label: 'Email Address'
    validators:
        required: true
        email: true

# Use in create form
form.customer.create:
    inputs:
        config:
            controls:
                - use: field.customer.email  # Reference the field

# Use in edit form with different value
form.customer.edit:
    inputs:
        config:
            controls:
                - use: field.customer.email
                  overrides:
                      value: '${row.email}'  # Pre-fill with current value
```

#### Text input field

```yaml
field.customer.firstName:
    name: 'firstName'           # Field name sent to API
    controlType: 'input'        # Input field type
    type: 'text'                # HTML input type
    label: 'First Name'         # Label shown to user
    validators:
        required: true          # This field is required
```

**Available input types**:
- `text` - Regular text input
- `email` - Email input with validation
- `password` - Password input (masked)
- `number` - Number input
- `hidden` - Hidden field (for IDs, references)

#### Email field with validation

```yaml
field.customer.email:
    name: 'email'
    controlType: 'input'
    type: 'email'
    label: 'Email Address'
    validators:
        required: true          # Must be filled
        email: true             # Must be valid email format
```

#### Textarea (multi-line text)

```yaml
field.product.description:
    name: 'description'
    controlType: 'textarea'
    label: 'Description'
    validators:
        maxLength: 500          # Max 500 characters
```

#### Select (dropdown) with static options

```yaml
field.customer.status:
    name: 'status'
    controlType: 'select'
    label: 'Status'
    validators:
        required: true
    options:                    # Static list of options
        - { value: 'active', title: 'Active' }
        - { value: 'inactive', title: 'Inactive' }
        - { value: 'blocked', title: 'Blocked' }
```

#### Select with options from API

```yaml
field.customer.salutation:
    name: 'salutation'
    controlType: 'select'
    label: 'Salutation'
    validators:
        required: true
    datasource:                 # Fetch options from API
        type: 'http'
        url: '/salutations'     # API endpoint
        valueField: 'value'     # Which field to use as option value
        titleField: 'title'     # Which field to use as option label
```

Your API should return:
```json
[
    { "value": "mr", "title": "Mr." },
    { "value": "mrs", "title": "Mrs." },
    { "value": "ms", "title": "Ms." }
]
```

#### Date picker

```yaml
field.customer.birthDate:
    name: 'birthDate'
    controlType: 'datepicker'
    label: 'Date of Birth'
    validators:
        required: true
```

#### Checkbox (true/false)

```yaml
field.customer.newsletter:
    name: 'newsletter'
    controlType: 'checkbox'
    label: 'Subscribe to newsletter'
```

#### Hidden field (for IDs)

```yaml
field.customer.reference:
    name: 'reference'
    controlType: 'input'
    type: 'hidden'              # User doesn't see this
    label: 'reference'
```

Useful for delete operations where you need to pass an ID without showing it.

#### Available control types

| Control Type | Description | Example use case |
|--------------|-------------|------------------|
| `input` | Text input | Name, email, phone |
| `textarea` | Multi-line text | Description, notes |
| `select` | Dropdown selection | Status, category |
| `datepicker` | Date selection | Birth date, start date |
| `checkbox` | Boolean checkbox | Newsletter, active |
| `toggle` | Toggle switch | Enable/disable |

#### Validators

Validators ensure data quality before sending to API.

| Validator | Description | Example |
|-----------|-------------|----------|
| `required` | Field must have a value | `required: true` |
| `email` | Must be valid email format | `email: true` |
| `minLength` | Minimum string length | `minLength: 3` |
| `maxLength` | Maximum string length | `maxLength: 100` |
| `min` | Minimum numeric value | `min: 0` |
| `max` | Maximum numeric value | `max: 100` |
| `pattern` | Regex pattern match | `pattern: '^[A-Z0-9]+$'` |

**Example with multiple validators**:
```yaml
field.customer.password:
    name: 'password'
    controlType: 'input'
    type: 'password'
    label: 'Password'
    validators:
        required: true
        minLength: 8
        maxLength: 50
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$'  # Must have lowercase, uppercase, number
```

### ButtonActionComponent

**Purpose**: Create action buttons (like "Create Customer" button).

**When to use**: For triggering operations like opening forms, navigation, or API calls.

#### Basic button example

```yaml
action.customer.create:
    component: ButtonActionComponent
    slots:
        - content: 'Create Customer'    # Button text
    inputs:
        action:
            type: 'drawer'              # What happens when clicked
            component: 'component-builder'
            options:
                inputs:
                    configuration:
                        - use: headline.customer.create
                        - use: form.customer.create
```

This button opens a drawer with a headline and create form.

#### Available action types

**Open drawer** (most common for forms):
```yaml
action:
    type: 'drawer'
    component: 'component-builder'
    options:
        inputs:
            configuration:
                - use: headline.customer.create
                - use: form.customer.create
```

**Navigate to URL**:
```yaml
action:
    type: 'redirect'
    url: '/customers/${row.customerReference}'
```

**Make API call**:
```yaml
action:
    type: 'http'
    url: '/customers/${row.customerReference}/approve'
    method: 'POST'
```

**Available action types**:

| Type | Description | Use case |
|------|-------------|----------|
| `drawer` | Open slide-out drawer | Create/edit forms |
| `modal` | Open modal dialog | Confirmations |
| `redirect` | Navigate to URL | Go to detail page |
| `http` | Make HTTP request | Trigger action without form |

### HeadlineComponent

**Purpose**: Display headings and titles with optional action buttons.

**When to use**: As headers for drawers, forms, and sections.

#### Basic headline

```yaml
headline.customer.create:
    component: HeadlineComponent
    style:                          # Optional styling
        background-color: 'var(--spy-white)'
        padding: '15px 30px'
    slots:
        - content: 'Create New Customer'  # Headline text
    inputs:
        level: 'h3'                 # HTML heading level: h1, h2, h3, etc.
```

#### Headline with dynamic text (using ${row.field})

```yaml
headline.customer.edit:
    component: HeadlineComponent
    style:
        background-color: 'var(--spy-white)'
        padding: '15px 30px'
    slots:
        - content: 'Edit Customer ${row.customerReference}'  # Shows actual customer reference
    inputs:
        level: 'h3'
```

#### Headline with action button (delete button)

```yaml
headline.customer.edit:
    component: HeadlineComponent
    style:
        background-color: 'var(--spy-white)'
        padding: '15px 30px'
    slots:
        - content: 'Edit Customer ${row.customerReference}'
        - slot: 'actions'                  # Action button area (top right)
          use: form.customer.delete        # Delete form/button
    inputs:
        level: 'h3'
```

This puts a delete button in the top right corner of the drawer header.

## Understanding slots

**What are slots?** Slots are named areas where you place components. Think of them as containers.

**Common slots**:
- `actions` - For buttons (top right in layouts, action area in headlines)
- `content` - For main content (tables, forms)

### Slot format (recommended)

```yaml
slots:
    actions:                        # Slot name
        - use: action.customer.create  # Component to put in this slot
    content:
        - use: table.customer.list
```

### Alternative list format

```yaml
slots:
    - slot: 'actions'               # Explicitly specify slot name
      use: action.customer.create
    - slot: 'content'
      use: table.customer.list
```

**When to use list format**: When placing a component in a headline's actions slot:

```yaml
headline.customer.edit:
    slots:
        - content: 'Edit Customer ${row.customerReference}'
        - slot: 'actions'           # List format needed here
          use: form.customer.delete
```

## Component references with `use`

**Purpose**: Reuse components you've defined.

**Basic usage**:
```yaml
- use: field.customer.email         # References field.customer.email from components
```

**With overrides** (for edit forms):
```yaml
- use: field.customer.email
  overrides:
      value: '${row.email}'         # Pre-fill with current value
      disabled: true                # Make field read-only
```

**What can you override?**
- `value` - Field value
- `disabled` - Make field read-only
- `label` - Change label text
- Any other field property

## Variable interpolation with ${row.fieldName}

**What is `${row.fieldName}`?** It's a placeholder that gets replaced with actual data from a table row.

**Where it works**: In edit and delete operations triggered by clicking a table row.

### Common use cases

**1. Pre-fill edit form fields**:
```yaml
controls:
    - use: field.customer.email
      overrides:
          value: '${row.email}'     # Gets email from clicked row
```

**2. Build API URLs**:
```yaml
submit:
    method: 'PATCH'
    url: '/customers/${row.customerReference}'  # Uses reference from clicked row
```

**3. Dynamic headlines**:
```yaml
headline.customer.edit:
    slots:
        - content: 'Edit Customer ${row.customerReference}'  # Shows actual reference
```

**4. Conditional display**:
```yaml
slots:
    - content: '${row.firstName} ${row.lastName}'  # Shows full name
```

**Important**: `${row.fieldName}` only works when the component is opened from a table row action. It won't work in the create form because there's no row data.

## Common patterns

Here are real-world patterns you'll use frequently.

### Pattern 1: Simple list page with create button

```yaml
entity: Product

navigation:
    title: 'Products'

view:
    layout:
        use:
            - layout.product.page
    
    components:
        layout.product.page:
            id: 'page-layout'
            virtualRoute: 'root'
            component: LayoutComponent
            className: 'page-layout'
            slots:
                actions:
                    - use: action.product.create
                content:
                    - use: table.product.list
        
        action.product.create:
            component: ButtonActionComponent
            slots:
                - content: 'Create Product'
            inputs:
                action:
                    type: 'drawer'
                    component: 'component-builder'
                    options:
                        inputs:
                            configuration:
                                - use: headline.product.create
                                - use: form.product.create
        
        table.product.list:
            component: TableComponent
            inputs:
                config:
                    dataSource: { type: 'http', url: '/products' }
                    columns:
                        - { id: 'sku', title: 'SKU' }
                        - { id: 'name', title: 'Name' }
                    pagination: { enabled: true, sizes: [10, 20, 50] }
                    search: { enabled: true }
```

### Pattern 2: Table with filters

```yaml
table.customer.list:
    component: TableComponent
    inputs:
        config:
            dataSource: { type: 'http', url: '/customers' }
            columns:
                - { id: 'email', title: 'Email' }
                - { id: 'status', title: 'Status' }
            filters:
                enabled: true
                items:
                    # Select filter with API options
                    - id: 'status'
                      title: 'Status'
                      type: 'select'
                      typeOptions:
                          multiselect: false
                          datasource:
                              type: 'http'
                              url: '/customer-statuses'
                              valueField: 'value'
                              titleField: 'title'
                    # Date range filter
                    - id: 'createdAt'
                      title: 'Created Date'
                      type: 'date-range'
            pagination: { enabled: true, sizes: [10, 20, 50] }
            search: { enabled: true, placeholder: 'Search...' }
```

### Pattern 3: Reusable fields in create and edit forms

```yaml
# Define field once
field.product.name:
    name: 'name'
    controlType: 'input'
    type: 'text'
    label: 'Product Name'
    validators:
        required: true
        maxLength: 255

# Use in create form
form.product.create:
    component: DynamicFormComponent
    inputs:
        config:
            controls:
                - use: field.product.name  # As-is
            submit:
                label: 'Create'
                method: 'POST'
                url: '/products'

# Use in edit form with pre-filled value
form.product.edit:
    component: DynamicFormComponent
    inputs:
        config:
            controls:
                - use: field.product.name
                  overrides:
                      value: '${row.name}'  # Pre-fill from row
            submit:
                label: 'Save'
                method: 'PATCH'
                url: '/products/${row.sku}'
```

### Pattern 4: Delete button in edit drawer header

```yaml
# Headline with delete button
headline.product.edit:
    component: HeadlineComponent
    style:
        background-color: 'var(--spy-white)'
        padding: '15px 30px'
    slots:
        - content: 'Edit Product ${row.name}'
        - slot: 'actions'
          use: form.product.delete  # Delete form appears as button
    inputs:
        level: 'h3'

# Delete form (appears as red button)
form.product.delete:
    component: DynamicFormComponent
    slot: 'actions'
    inputs:
        config:
            controls:
                - use: field.product.id  # Hidden field
            submit:
                active: true
                label: 'Delete'
                method: 'DELETE'
                url: '/products/${row.sku}'
                variant: 'critical'  # Red/danger styling
                actions:
                    - type: 'notification'
                      notifications:
                          - title: 'Product deleted'
                            type: 'success'
                    - type: 'close-drawer'
                    - type: 'refresh-table'
                errorActions:
                    - type: 'notification'
                      notifications:
                          - title: 'Failed to delete product'
                            type: 'error'
```

## Troubleshooting

### Form doesn't pre-fill in edit mode

**Problem**: Edit form shows empty fields.

**Solution**: Make sure you're using `overrides` with `${row.fieldName}`:

```yaml
controls:
    - use: field.customer.email
      overrides:
          value: '${row.email}'  # ← Add this
```

### Table row click doesn't open drawer

**Problem**: Clicking table rows does nothing.

**Solution**: Add `rowActions` to your table:

```yaml
table.customer.list:
    inputs:
        config:
            # ... columns, etc.
            rowActions:
                enabled: true
                click: drawer
                actions:
                    - id: 'drawer'
                      type: 'drawer'
                      component: 'component-builder'
                      options:
                          inputs:
                              configuration:
                                  - use: headline.customer.edit
                                  - use: form.customer.edit
```

### Form submits but table doesn't update

**Problem**: After creating/editing, the table shows old data.

**Solution**: Add `refresh-table` to form actions:

```yaml
submit:
    actions:
        - type: 'notification'
          # ...
        - type: 'close-drawer'
        - type: 'refresh-table'  # ← Add this
```

### Filter options don't load from API

**Problem**: Select filter is empty.

**Solution**: Check your datasource configuration:

```yaml
filters:
    items:
        - id: 'status'
          type: 'select'
          typeOptions:
              datasource:
                  type: 'http'        # ← Add this
                  url: '/statuses'
                  valueField: 'value' # ← Must match API response field
                  titleField: 'title' # ← Must match API response field
```

Your API must return: `[{"value": "...", "title": "..."}, ...]`

### Delete button doesn't appear in header

**Problem**: Delete button missing from edit drawer header.

**Solution**: Use list format for slots in headline:

```yaml
headline.customer.edit:
    slots:
        - content: 'Edit Customer'
        - slot: 'actions'           # ← List format, not map
          use: form.customer.delete
```

### Date column shows timestamps instead of formatted dates

**Problem**: Date column shows "2024-01-15T10:30:00Z" instead of "15.01.2024".

**Solution**: Add `type` and `typeOptions` to column:

```yaml
columns:
    - id: 'createdAt'
      title: 'Created'
      type: 'date'              # ← Add this
      typeOptions:
          format: 'dd.MM.y'     # ← Add this
```

## Quick reference

### Component types summary

| Component | Purpose | Key properties |
|-----------|---------|----------------|
| `LayoutComponent` | Page container | `slots: { actions, content }` |
| `TableComponent` | Data table | `dataSource`, `columns`, `filters`, `pagination`, `search`, `rowActions` |
| `DynamicFormComponent` | Forms | `controls`, `submit: { method, url, actions, errorActions }` |
| `ButtonActionComponent` | Action buttons | `action: { type, url }` |
| `HeadlineComponent` | Headers | `slots`, `inputs: { level }` |
| Field (input) | Text input | `controlType: 'input'`, `type`, `validators` |
| Field (select) | Dropdown | `controlType: 'select'`, `options` or `datasource` |
| Field (datepicker) | Date picker | `controlType: 'datepicker'` |
| Field (textarea) | Multi-line text | `controlType: 'textarea'` |

### HTTP methods for forms

| Operation | Method | URL pattern | Example |
|-----------|--------|-------------|----------|
| Create | `POST` | `/entities` | `/customers` |
| Update | `PATCH` | `/entities/${row.id}` | `/customers/${row.customerReference}` |
| Delete | `DELETE` | `/entities/${row.id}` | `/customers/${row.customerReference}` |

### Form actions

| Action | Effect | Use when |
|--------|--------|----------|
| `notification` | Show message | Always (success and error) |
| `close-drawer` | Close drawer | After create/edit/delete |
| `refresh-table` | Reload table | After create/edit/delete |
| `redirect` | Navigate | Going to another page |

### Variable interpolation

| Syntax | Gets value from | Works in |
|--------|-----------------|----------|
| `${row.fieldName}` | Clicked table row | Edit/delete forms, URLs, headlines |

### Validator types

| Validator | Checks | Example |
|-----------|--------|----------|
| `required: true` | Field not empty | All required fields |
| `email: true` | Valid email format | Email fields |
| `minLength: N` | Min string length | Passwords, names |
| `maxLength: N` | Max string length | Descriptions, text |
| `min: N` | Min number | Prices, quantities |
| `max: N` | Max number | Percentages, limits |
| `pattern: 'regex'` | Regex match | Custom validation |

## Next steps

- [Create a Composable UI module](/docs/dg/dev/backend-development/composable-ui/create-a-composable-ui-module.html) - Step-by-step module creation guide
- [Composable UI best practices](/docs/dg/dev/backend-development/composable-ui/composable-ui-best-practices.html) - Implementation patterns and tips
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Backend API resource configuration
