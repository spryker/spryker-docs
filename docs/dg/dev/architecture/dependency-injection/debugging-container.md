---
title: Debugging the Symfony Container
description: This document describes how to debug and inspect services in the Symfony Dependency Injection Container in Spryker applications.
last_updated: Nov 19, 2025
template: howto-guide-template
related:
  - title: Dependency injection
    link: docs/dg/dev/architecture/dependency-injection.html
  - title: Implementation and usage
    link: docs/dg/dev/architecture/dependency-injection/implementation-and-usage.html
  - title: Troubleshooting Dependency Injection
    link: docs/dg/dev/architecture/dependency-injection/troubleshooting.html
  - title: Best practices for Dependency Injection
    link: docs/dg/dev/architecture/dependency-injection/best-practices.html
---

This document describes how to debug and inspect services registered in the Symfony Dependency Injection Container for Spryker applications.

## Prerequisites

- Symfony Dependency Injection is configured in your project. For setup instructions, see [How to upgrade to Symfony Dependency Injection](/docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html).
- `FrameworkBundle` is registered in `config/{APPLICATION}/bundles.php`

## Overview

Spryker provides Symfony's built-in `debug:container` command through the `FrameworkBundle`. This command allows you to inspect services, their dependencies, and container configuration for each application layer (ZED, YVES, GLUE).

For complete documentation of all available options and features, see [How to Debug the Service Container](https://symfony.com/doc/current/service_container/debug.html) in the Symfony documentation.

## Spryker-specific behavior

### Application-specific containers

In Spryker, each application (ZED, YVES, GLUE) has its own isolated Symfony container. To debug a specific application's container, use the corresponding console command:

#### ZED 

```bash
console debug:container
```

#### YVES

```bash
vendor/bin/yves debug:container
```

#### GLUE

```bash
vendor/bin/glue debug:container
```

### Container isolation

Each application container only includes services from its own application layer:

- **ZED**: Contains `Pyz\Zed\*` and `Spryker\Zed\*` services
- **YVES**: Contains `Pyz\Yves\*` and `(Spryker|SprykerShop)\Yves\*` services
- **GLUE**: Contains `Pyz\Glue\*` and `Spryker\Glue\*` services

{% info_block infoBox "Facade services in YVES/GLUE" %}

You may see some `*FacadeInterface` services from the ZED layer in YVES or GLUE containers. This is expected behavior in Spryker's architecture—YVES and GLUE use Client classes to communicate with ZED, and these Facades are registered as part of the dependency chain.

{% endinfo_block %}

## Common debugging tasks

### List all services

Display all public services registered in the container:

```bash
console debug:container
```

**Example output:**

```text
Symfony Container Services
===========================

 Service ID                                           Class name
 ---------------------------------------------------- --------------------------------------------
 Pyz\Zed\Oms\Business\OmsFacade                      Pyz\Zed\Oms\Business\OmsFacade
 Pyz\Zed\Oms\Business\OmsFacadeInterface             alias for "Pyz\Zed\Oms\Business\OmsFacade"
 router                                               Symfony\Component\Routing\Router
 debug.event_dispatcher                               Symfony\Component\HttpKernel\Debug\TraceableEventDispatcher
```

### Search for specific services

Spryker services can be found by any part of their class name (for example, `Spryker\Zed\Product\...`). When you want to find services that contain a specific name like "Product", you can search the container to find the exact service name, which can then be used to debug that service in more detail.

You can search for services in two ways:

**Using the built-in search:**

```bash
console debug:container Product
```

This searches for services containing "Product" in their name and displays matching results.

**Using grep to filter:**

```bash
console debug:container | grep Product
```

This filters the full service list by pattern.

### Display service details

Show detailed information about a specific service, including its class, dependencies, and usage:

```bash
console debug:container "Pyz\Zed\{Module}\Business\{Module}FacadeInterface"
```

**Example output:**

```text
Information for Service "Pyz\Zed\{Module}\Business\{Module}FacadeInterface"
================================================================

 ---------------- ------------------------------------------------
  Option           Value
 ---------------- ------------------------------------------------
  Service ID       Pyz\Zed\{Module}\Business\{Module}FacadeInterface
  Class            Pyz\Zed\{Module}\Business\{Module}Facade
  Tags             -
  Public           yes
  Synthetic        no
  Lazy             no
  Shared           yes
  Abstract         no
  Autowired        yes
  Autoconfigured   yes
  Usages           Pyz\Zed\{Module}\Communication\Controller\IndexController
 ---------------- ------------------------------------------------
```

{% info_block infoBox "Understanding Usages" %}

If "Usages" shows `none`, the service is not injected anywhere through dependency injection.

{% endinfo_block %}

### Show services by tag

Display all services tagged with a specific tag:

```bash
console debug:container --tag=kernel.event_subscriber
```

### Show autowiring types

List all classes and interfaces available for autowiring:

```bash
console debug:container --types
```

This is useful to see which types can be type-hinted in constructors.

### Display parameters

Show all container parameters:

```bash
console debug:container --parameters
```

Or display a specific parameter:

```bash
console debug:container --parameter=kernel.debug
```

### Show hidden services

By default, internal Symfony services are hidden. To include them:

```bash
console debug:container --show-hidden
```

## Troubleshooting

### Service not found

If a service is not listed in the container output, check the following:

1. **Verify service location**: Ensure the service class is in a directory that's loaded in your `ApplicationServices.php`
2. **Check application isolation**: Make sure you're debugging the correct application container (ZED/YVES/GLUE)
3. **Rebuild container cache**: Clear the container cache and rebuild:

```bash
console cache:clear
```

## Related Symfony documentation

For advanced usage and additional options, refer to the official Symfony documentation:

- [How to Debug the Service Container](https://symfony.com/doc/current/service_container/debug.html)
- [Service Container](https://symfony.com/doc/current/service_container.html)
- [Dependency Injection Tags](https://symfony.com/doc/current/service_container/tags.html)
