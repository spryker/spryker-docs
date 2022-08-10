---
title: SyncAPI
Descriptions: 
template: howto-guide-template
---

Spryker uses schema files to generate code for your project including predefined test cases. The purpose of doing so is to let you focus on building your business logic without caring about the boilerplate code.

## Code generation

You can use the [SyncAPI’s](https://github.com/spryker-sdk/sync-api/) OpenAPI schema file to generate code with the help of a [Spryk](/docs/sdk/dev/spryks/spryks.html).

{% info_block infoBox "Info" %}

All required infrastructural code is be generated automatically. For example, Facade, Factory, DependencyProvider, Plugins, Controller, etc.

{% endinfo_block %}

### Paths

When you design your resource names, you need to know that the code generator by default uses the path to guess which module the endpoint belongs to, the controller name that will handle the request, and the model name that will be used to fulfill your business logic.

For example, `/customers/addresses` generates the code within the CustomersBackendApi or CustomersFrontendApi module (see [application Type](#application-type)). The controller name that will be executed to handle the request will be `AddressesController` and the model name will be `Addresses`.

### Application type