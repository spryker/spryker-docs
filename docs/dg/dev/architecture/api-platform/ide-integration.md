---
title: IDE integration for API Platform schemas
description: Set up PHPStorm or VSCode for autocomplete, inline documentation, and real-time validation of API Platform resource and validation YAML files.
last_updated: May 18, 2026
template: howto-guide-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: Resource Schemas
    link: docs/dg/dev/architecture/api-platform/resource-schemas.html
  - title: Validation Schemas
    link: docs/dg/dev/architecture/api-platform/validation-schemas.html
---

This guide shows how to enable IDE support for the YAML files that define API Platform resources (`*.resource.yml`) and their validation rules (`*.validation.yml`). Once configured, your IDE provides:

- **Autocomplete** for resource properties, operation types, and validation constraints.
- **Real-time validation** against the JSON Schema, flagging invalid configurations as you type.
- **Inline documentation** for every property and attribute.
- **Type safety**: values are checked against the declared types.

## Prerequisites

The `ApiPlatform` module ships the canonical JSON Schema at:

```
vendor/spryker/api-platform/resources/schemas/api-resource-schema-v1.json
```

A hosted copy is also available at `https://static.spryker.com/api-resource-schema-v1.json`.

## Configure PHPStorm

PHPStorm has built-in JSON Schema support — no plugin is required.

1. Open **Settings > Languages & Frameworks > Schemas and DTDs > JSON Schema Mappings**.
2. Click the **+** to add a new mapping with:
    - **Name:** `Spryker API Resource Schema`
    - **Schema file or URL:** `$PROJECT_DIR$/vendor/spryker/api-platform/resources/schemas/api-resource-schema-v1.json` (or the hosted URL above).
    - **Schema version:** `JSON Schema version 7`
3. Under **File path pattern**, add `**/resources/api/*/*.resource.yml`. Add additional patterns if your project keeps resource YAMLs in other locations.
4. Apply and open any `*.resource.yml` file. Typing `resource:` should now produce autocomplete suggestions. Press `Ctrl+Q` (Windows/Linux) or `F1` (macOS) on any property to see its documentation.

## Configure VSCode

VSCode requires the [Red Hat YAML extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml).

1. Install the extension from the Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Add the schema mapping to your project's `.vscode/settings.json`:

    ```json
    {
      "yaml.schemas": {
        "./vendor/spryker/api-platform/resources/schemas/api-resource-schema-v1.json": [
          "**/resources/api/*/*.resource.yml"
        ]
      }
    }
    ```

3. Reload the window (`Developer: Reload Window` from the command palette) and open a `*.resource.yml` file. Hover over any property to see its documentation; invalid values are underlined.

{% info_block infoBox "Workspace settings vs. user settings" %}

Project-level `.vscode/settings.json` is recommended so the configuration travels with the repository. The same `yaml.schemas` block also works in user settings if you prefer a global setup.

{% endinfo_block %}

## Per-file schema reference

You can also pin the schema inline at the top of any YAML file with the `yaml-language-server` directive. This is useful for one-off files that live outside the configured patterns:

```yaml
# yaml-language-server: $schema=../../../../../vendor/spryker/api-platform/resources/schemas/api-resource-schema-v1.json

resource:
  name: Customers
  shortName: customers
  description: Customer resource for the storefront API
  operations:
    - type: Get
    - type: GetCollection
  properties:
    idCustomer:
      type: integer
      description: The unique identifier
      identifier: true
      writable: false
```

The path is relative to the YAML file's location. Adjust the depth (`../`) accordingly, or use the hosted URL if your environment can reach it.

## Quick reference

The JSON Schema covers the full resource and validation surface. The most common fields:

### Resource root

| Field | Required | Description |
|---|---|---|
| `shortName` | yes | Resource identifier used in URLs. |
| `name` | no | Full resource name (defaults to `shortName`). |
| `description` | no | Human-readable description. |
| `operations` | yes | One or more operations exposed by the resource. |
| `properties` | yes | The resource's properties. |
| `provider` | no | Fully qualified Provider class name. |
| `processor` | no | Fully qualified Processor class name. |
| `paginationEnabled` | no | Enables pagination for collection operations. |
| `paginationItemsPerPage` | no | Default page size. |

### Operation types

`Get`, `GetCollection`, `Post`, `Put`, `Patch`, `Delete`.

### Property types

`string`, `integer`, `boolean`, `array`, `object`, `mixed`. Short aliases `int`, `bool`, `str`, and `arr` are accepted and normalized.

### Property attributes

| Attribute | Description |
|---|---|
| `type` | One of the property types above. Required. |
| `identifier` | Marks the property as the resource identifier. At least one identifier per resource is required. |
| `required` | Required when creating the resource. |
| `writable` | Whether the property can be written via the API (default: `true`). |
| `readable` | Whether the property can be read via the API (default: `true`). |
| `openapiContext` | Additional OpenAPI attributes (example, format, etc.). |

For the full attribute list, see the [resource schemas reference](/docs/dg/dev/architecture/api-platform/resource-schemas.html).

## Troubleshooting

### Autocomplete or validation not active

- **Verify the schema path.** Open the schema file from the IDE to confirm it exists and is valid JSON.
- **Verify the file pattern.** PHPStorm and VSCode both require the YAML file's path to match the configured pattern. The default `**/resources/api/*/*.resource.yml` covers the standard Spryker layout (`src/{Org}/{Module}/resources/api/{api-type}/`).
- **Restart the IDE.** PHPStorm: `File > Invalidate Caches / Restart`. VSCode: run `Developer: Reload Window` from the command palette.
- **Check the extension** (VSCode only): ensure the Red Hat YAML extension is installed and enabled.

### False validation errors

- **Property names** must match `^[a-zA-Z_][a-zA-Z0-9_]*$`. Hyphens and other special characters are rejected.
- **Booleans** must be lowercase (`true` / `false`) in YAML.
- **Types** must be one of the allowed values or aliases listed above. Custom strings are rejected.

### Schema changes not reflected

- **PHPStorm:** `File > Invalidate Caches / Restart > Invalidate and Restart`.
- **VSCode:** `Developer: Reload Window`. If the schema is referenced via a hosted URL, also disable any local HTTP cache or switch to the local file path while iterating.
