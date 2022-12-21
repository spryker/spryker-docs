---
title: Value resolvers
description: The Spryker SDK has several value resolvers described in this document.
template: concept-topic-template
---

The Spryker SDK has the following value resolvers:

| Value Resolver name | Description                                                                                          |
|---------------------|------------------------------------------------------------------------------------------------------|
| APP_PHP_VERSION     | Resolves the PHP version (7.4, 8.0).                                                           |
| APP_TYPE            | Resolves a repository for creating a project.                                                  |
| ARRAY_OPTION        | Resolves multi-options.                                                                              |
| B2BC_TYPE           | Resolves repository for public b2b,b2c.                                                    |
| CONFIG_PATH         | Resolves a relative path by priority: `project` path, then, by default, the `sdk` path if it exists. |
| FLAG                | Resolves flag options. This resolver has the boolean type.                                                             |
| NAMESPACE           | Used for the spryk tool to resolve namespaces for the tool. It is based on the settings.                              |
| PC_SYSTEM           | Resolves operating systems like Linux, Mac, Mac (ARM).                                                       |
| PRIORITY_PATH       | Resolves relative path for the tool entry point: `project` path, then, by default, the `sdk` path if it exists.       |
| REPORT_DIR          | Resolves the report file path.                                                                 |
| SDK_DIR             | Resolves the path to the sdk folder.                             |
| CORE                | Resolves the core level. This resolver is based on the resolved values of the `NAMESPACE` resolver.                   |
| STATIC              | This resolver is used as a universal value resolver with additional settings. It returns the formatted value.                  |
| ORIGIN              | This resolver is used as a universal value resolver with additional settings. It returns the original value.                   |

Example of a placeholder with the `STATIC` value resolver and with the configuration:

```yaml
  - name: "%shortcode_name%" # For replacing in command.
    value_resolver: STATIC # Value resolver name.
    optional: true # Can be optional or required.
    configuration: # Configuration for value resolver instance.
      option: "report" # The name for tool option if it's needed Example: --report=. Optional setting.
      alias: 'report' # The name for sdk option command to provide the value to the tool. Can be closed for coming. Optional setting.
      description: "Report Type format"
      type: string # Type of value. Support `string`, `int`, `boolean`, `array`.
      defaultValue: 'json' # The default value. Optional setting.
```
