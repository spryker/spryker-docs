---
title: Module configuration convention
description: Learn in this article about Spryker conventions on the module configuration for your Spryker based projects
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/module-configuration-convention
originalArticleId: 7231d6db-0a25-4468-b991-d7998998604c
redirect_from:
  - /docs/scos/dev/guidelines/module-configuration-convention.html
related:
  - title: Data Processing Guidelines
    link: docs/dg/dev/guidelines/data-processing-guidelines.html
  - title: Making your Spryker shop secure
    link: docs/dg/dev/guidelines/security-guidelines.html
  - title: Project development guidelines
    link: docs/dg/dev/guidelines/project-development-guidelines.html
---

## Definitions

| CONSTANTS    | USAGE HINTS   | VALUE     | IN DEV CONFIGURATION    |
| ------------------ | ------------------ | ----------------- | ---------------- |
| Environment configuration (constants) | Used in config_*.php | Different per environment | DE, AT, US have different environment configurations         |
| Module configuration (constants)      |                      | Different per code deploy | DE, AT shares code, they have the same module configuration. |
| Module constants                      |                      | Always the same           | DE, AT, US has the same module constants.                    |

## Implementation

### Environment configuration

Environment configuration is changeable per environment, but the constant and its value is not changeable.

- It's an interface, so the usage always points to the current repository => binds constant name => binds value.
- Environment configuration is always in Shared layer, so it's accessible in any layer.
- The constant key is uppercase, and its value is prefix `MODULE_NAME:` + key.

```php
interface ModuleNameConstants
{
  public const EXAMPLE_KEY = 'MODULE_NAME:EXAMPLE_KEY';
}
```

### Module configuration

Module configuration is extendable on project level. For the module configuration, the following applies:

- It's always a class, so it supports extension for methods.
- It or its parent has to extend AbstractBundleConfig of the corresponding layer.
- Required values are defined in protected constants so it can be extended, but outside access is disabled.
- Getter methods are introduced for constant access, so extended values are used on demand.
- Protected constants are used via `static::` to support extension.

Module configuration is split into two categories:

- **module layer configuration** - can be used only in the related application layer. It can be found in:

- - `/Zed/ModuleName/ModuleNameConfig.php`
  - `/Yves/ModuleName/ModuleNameConfig.php`
  - `/Client/ModuleName/ModuleNameConfig.php`
  - `/Service/ModuleName/ModuleNameConfig.php`

- **module shared configuration** - can be used across all application layers. It can be found in /Shared/ModuleName/ModuleNameConfig.php.

```php
class ModuleNameConfig extends AbstractBundleConfig
{
  protected const EXAMPLE_MODULE_KEY = 'my example configurable value';

  public function getExampleModuleKey()
  {
     return static::EXAMPLE_MODULE_KEY;
  }

  public function getExampleKey()
  {
     return $this->get(ModuleNameConstants::EXAMPLE_KEY);
  }
}
```

### Module constants

Module constants are not meant to be extended or changed, neither their value or name. For these constants, note the following:

- They are located next to the module configuration.
- They are public constants.
- They can be accessed directly from layer code.

```php
class ModuleNameConfig extends AbstractBundleConfig
{
  public const UNCHANGEABLE_CONTENT = 'my unchangable value';
}
```

{% info_block warningBox %}

Storage unchangeable constants (like queue name, error queue name, resource name) should also follow the unchangeable module constant implementation, and not the events.

{% endinfo_block %}

### Shared environment configuration

In some cases, an environment variable is used in several modules. We recommend creating a separate environment configuration for each module, preferably with the same key name, and use a chained assignment of the value.

```php
interface ModuleNameConstants
{
  public const EXAMPLE_KEY = 'MODULE_NAME:EXAMPLE_KEY';
}
```

```php
interface AnotherNameConstants
{
  public const EXAMPLE_KEY = 'ANOTHER_NAME:EXAMPLE_KEY';
}
```

**config/Shared/config_*.php**

```php
 $config[ModuleNameConstants::EXAMPLE_KEY] =
 $config[AnotherNameConstants::EXAMPLE_KEY] = 'some-shared-value';
```
