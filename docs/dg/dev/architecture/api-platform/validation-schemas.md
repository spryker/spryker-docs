---
title: Validation Schemas
description: Understanding API Platform validation schema definitions in Spryker.
last_updated: Dec 21, 2025
template: concept-topic-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: Resource Schemas
    link: docs/dg/dev/architecture/api-platform/resource-schemas.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
  - title: API Platform Testing
    link: docs/dg/dev/architecture/api-platform/testing.html
---

This document explains how to define validation rules for API Platform resources in Spryker.

## Validation schema basics

Validation schemas define constraints for resource properties per operation type. They are defined in separate YAML files alongside resource schemas.

### Validation schema location

Validation schemas must be placed in the same directory as resource schemas, using the `.validation.yml` suffix:

```MARKDOWN
src/
└── Pyz/
    └── Glue/
        └── Customer/
            └── resources/
                └── api/
                    └── backend/
                        ├── customers.yml            # Resource schema
                        └── customers.validation.yml # Validation schema
```

### Basic validation syntax

```yaml
post:
  email:
    - NotBlank:
        message: "Email is required"
    - Email:
        message: "Invalid email format"

  firstName:
    - NotBlank
    - Length:
        min: 2
        max: 100
        minMessage: "Name must be at least {{ limit }} characters"
        maxMessage: "Name cannot exceed {{ limit }} characters"

patch:
  email:
    - Optional:
        constraints:
          - NotBlank
          - Email
```

## Symfony validation constraints

API Platform supports all Symfony validation constraints out of the box.

### String constraints

```yaml
# Required field
- NotBlank:
    message: "This field is required"

# Email validation
- Email:
    message: "Invalid email format"

# Length validation
- Length:
    min: 2
    max: 100
    minMessage: "Too short"
    maxMessage: "Too long"

# Regular expression
- Regex:
    pattern: '/^[A-Z][a-z]+$/'
    message: "Must start with uppercase letter"

# Choice from list
- Choice:
    choices: ["active", "inactive", "pending"]
    message: "Invalid status"

# URL validation
- Url:
    message: "Invalid URL"
```

### Numeric constraints

```yaml
# Positive number
- Positive:
    message: "Must be positive"

# Range validation
- Range:
    min: 0
    max: 100
    notInRangeMessage: "{% raw %}Must be between {{ min }} and {{ max }}{% endraw %}"

# Greater than
- GreaterThan:
    value: 0
    message: "{% raw %}Must be greater than {{ compared_value }}{% endraw %}"
```

### Date constraints

```yaml
# Date format
- Date:
    message: "Invalid date format"

# DateTime format
- DateTime:
    message: "Invalid datetime format"

# Future date
- GreaterThan:
    value: "today"
    message: "Must be a future date"
```

### Security constraints

```yaml
# Password strength
- NotCompromisedPassword:
    message: "This password has been leaked in a data breach"

# Complex password requirements
- Regex:
    pattern: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'
    message: "Password must contain uppercase, lowercase, number, and special character"
```

## Custom constraint classes (FQCN)

In addition to Symfony's built-in constraints, you can use Fully Qualified Class Names (FQCNs) to reference custom constraint classes from Spryker modules or third-party packages.

### Basic FQCN usage

Reference custom constraints using their fully qualified class name:

```yaml
post:
  email:
    - NotBlank
    - Email
    - \Spryker\Zed\Customer\Business\Validator\UniqueEmail
```

**Generated code:**

```php
use Symfony\Component\Validator\Constraints as Assert;
use Spryker\Zed\Customer\Business\Validator\UniqueEmail;

#[Assert\NotBlank(groups: ['customers:create'])]
#[Assert\Email(groups: ['customers:create'])]
#[UniqueEmail(groups: ['customers:create'])]
public ?string $email = null;
```

### FQCN normalization

The leading backslash is optional - both formats are supported:

```yaml
# With leading backslash
- \Spryker\Zed\Customer\Business\Validator\UniqueEmail

# Without leading backslash (also valid)
- Spryker\Zed\Customer\Business\Validator\UniqueEmail
```

Both generate the same code.

### FQCN with constraint options

Pass parameters to custom constraints just like Symfony constraints:

```yaml
post:
  email:
    - \Spryker\Zed\Customer\Business\Validator\UniqueEmail:
        message: "This email address is already registered"
        ignoreDeleted: true
```

**Generated code:**

```php
use Spryker\Zed\Customer\Business\Validator\UniqueEmail;

#[UniqueEmail(message: 'This email address is already registered', ignoreDeleted: true, groups: ['customers:create'])]
public ?string $email = null;
```

### Collision handling and automatic aliasing

When multiple constraints have the same short name, the generator automatically creates aliases to avoid conflicts.

#### Spryker module collision

When constraints from different Spryker modules have the same name, the module name is included in the alias:

```yaml
post:
  email:
    - \Spryker\Zed\Customer\Business\Validator\Email
    - \Spryker\Glue\Product\Business\Validator\Email
```

**Generated code:**

```php
use Spryker\Zed\Customer\Business\Validator\Email as SprykerCustomerEmail;
use Spryker\Glue\Product\Business\Validator\Email as SprykerProductEmail;

#[SprykerCustomerEmail(groups: ['customers:create'])]
#[SprykerProductEmail(groups: ['customers:create'])]
public ?string $email = null;
```

#### Multi-vendor collision

When constraints from different vendors collide, the vendor name is used as the alias prefix:

```yaml
post:
  value:
    - \Spryker\Zed\Validator\NotNull
    - \Acme\Validation\NotNull
```

**Generated code:**

```php
use Spryker\Zed\Validator\NotNull as SprykerNotNull;
use Acme\Validation\NotNull as AcmeNotNull;

#[SprykerNotNull(groups: ['customers:create'])]
#[AcmeNotNull(groups: ['customers:create'])]
public ?string $value = null;
```

#### Collision with Symfony constraints

Symfony constraints always use the `Assert\` prefix and never collide with custom constraints. FQCN constraints are imported separately:

```yaml
post:
  value:
    - NotNull                          # Symfony constraint
    - \Spryker\Validator\NotNull      # Custom Spryker constraint
```

**Generated code:**

```php
use Symfony\Component\Validator\Constraints as Assert;
use Spryker\Validator\NotNull as SprykerNotNull;

#[Assert\NotNull(groups: ['customers:create'])]
#[SprykerNotNull(groups: ['customers:create'])]
public ?string $value = null;
```

### FQCN in composite constraints

FQCN constraints work seamlessly in composite constraints like `All`, `Sequentially`, and `Optional`:

```yaml
post:
  items:
    - All:
        constraints:
          - \Spryker\Zed\Product\Business\Validator\ValidSku
          - \Spryker\Zed\Stock\Business\Validator\InStock

patch:
  items:
    - Optional:
        constraints:
          - All:
              constraints:
                - \Spryker\Zed\Product\Business\Validator\ValidSku
```

**Generated code:**

```php
use Spryker\Zed\Product\Business\Validator\ValidSku;
use Spryker\Zed\Stock\Business\Validator\InStock;

#[Assert\All(constraints: [new ValidSku(), new InStock()], groups: ['customers:create'])]
public array $items = [];
```

## Operation-specific validation

Define different validation rules for different operations:

```yaml
post:
  password:
    - NotBlank
    - Length:
        min: 12
        max: 128
    - Regex:
        pattern: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/'
        message: "Password must contain uppercase, lowercase, and number"

patch:
  password:
    - Optional:
        constraints:
          - Length:
              min: 12
              max: 128

put:
  password:
    - NotBlank
```

The operation names map to HTTP methods:
- `post` → POST (create)
- `get` → GET (single resource)
- `getCollection` → GET (collection)
- `put` → PUT (replace)
- `patch` → PATCH (update)
- `delete` → DELETE (remove)

## Validation constraint deduplication

The generator automatically deduplicates validation constraints by their signature and groups validation groups together.

### How deduplication works

If the same constraint is defined for multiple operations, it will be generated once with combined validation groups:

```yaml
# Schema definition
post:
  name:
    - NotBlank
    - Length:
        max: 100

patch:
  name:
    - NotBlank
    - Length:
        max: 100
```

**Generated code:**

```php
// Instead of duplicate constraints:
// #[Assert\NotBlank(groups: ['customers:create'])]
// #[Assert\NotBlank(groups: ['customers:update'])]
// #[Assert\Length(max: 100, groups: ['customers:create'])]
// #[Assert\Length(max: 100, groups: ['customers:update'])]

// The generator produces:
#[Assert\NotBlank(groups: ['customers:create', 'customers:update'])]
#[Assert\Length(max: 100, groups: ['customers:create', 'customers:update'])]
public ?string $name = null;
```

This ensures cleaner generated code while maintaining the same validation behavior across different operations.

### Deduplication with FQCN constraints

Deduplication works the same way for FQCN constraints:

```yaml
post:
  email:
    - \Spryker\Zed\Customer\Business\Validator\UniqueEmail

patch:
  email:
    - \Spryker\Zed\Customer\Business\Validator\UniqueEmail
```

**Generated code:**

```php
#[UniqueEmail(groups: ['customers:create', 'customers:update'])]
public ?string $email = null;
```

## Best practices

### 1. Use operation-specific validation

```yaml
# ✅ Good - Different rules per operation
post:
  password:
    - NotBlank
    - Length: { min: 12 }

patch:
  password:
    - Optional:
        constraints:
          - Length: { min: 12 }

# ❌ Bad - Same validation everywhere
password:
  required: true
```

### 2. Provide meaningful error messages

```yaml
# ✅ Good
- Email:
    message: "Please provide a valid email address"

- Length:
    min: 8
    minMessage: "Password must be at least 8 characters for security"

# ❌ Bad
- Email
- Length: { min: 8 }
```

### 3. Use composite constraints for arrays

```yaml
# ✅ Good
items:
  - All:
      constraints:
        - NotBlank
        - Regex:
            pattern: '/^[A-Z0-9]+$/'

# ❌ Bad - Won't validate array elements
items:
  - NotBlank
```

### 4. Leverage validation groups

Validation groups are automatically managed based on operations. Use them to apply different rules for create vs update:

```yaml
# POST requires password
post:
  password:
    - NotBlank

# PATCH allows optional password change
patch:
  password:
    - Optional:
        constraints:
          - Length: { min: 12 }
```

### 5. Combine Symfony and custom constraints

```yaml
# ✅ Good - Mix and match as needed
email:
  - NotBlank                                              # Symfony
  - Email                                                 # Symfony
  - \Spryker\Zed\Customer\Business\Validator\UniqueEmail # Custom

# Works perfectly together
```

## Validation schema merging

Just like resource schemas, validation schemas are merged across layers (Core → Feature → Project).

**Core validation** (vendor):

```yaml
post:
  email:
    - NotBlank
    - Email
```

**Project validation** (Pyz):

```yaml
post:
  email:
    - NotBlank
    - Email
    - \Pyz\Zed\Customer\Business\Validator\CompanyEmailDomain
```

**Merged result** (with deduplication):

```yaml
post:
  email:
    - NotBlank          # Deduplicated from both layers
    - Email             # Deduplicated from both layers
    - \Pyz\Zed\Customer\Business\Validator\CompanyEmailDomain # Added in project layer
```

## Next steps

- [API Platform](/docs/dg/dev/architecture/api-platform.html) - Architecture overview
- [Resource Schemas](/docs/dg/dev/architecture/api-platform/resource-schemas.html) - Define resource structure
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Creating resources
- [API Platform Testing](/docs/dg/dev/architecture/api-platform/testing.html) - Writing and running tests
- [Troubleshooting](/docs/dg/dev/architecture/api-platform/troubleshooting.html) - Common issues
- [Symfony Validation Documentation](https://symfony.com/doc/current/validation.html) - Official Symfony validation docs
