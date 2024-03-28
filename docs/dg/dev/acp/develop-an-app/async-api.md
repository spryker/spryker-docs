---
title: Async API
Descriptions: Async API schema file helps users understand the asynchronous message handling in Spryker.
template: howto-guide-template
last_updated: Nov 16, 2023
redirect_from:
- /docs/acp/user/async-api.html
---

To define the [Async API](https://github.com/spryker-sdk/async-api) messages, Spryker uses the [Async API specification](https://www.asyncapi.com/) which is similar to the OpenAPI specification. The main purpose of the Async API schema file is to help users understand the asynchronous message handling in Spryker. The file contains some important information, such as the channel which a message goes through, the name of the message, and the data that is transported within a message. For more information, see [Async API docs](https://www.asyncapi.com/docs).
Spryker uses the Async API schema files to generate the needed code to work with messages. For each message, a transfer schema definition is created. Depending on whether you want to consume or emit messages, several other classes are generated. For example, this can be a MessageHandlerPluginInterface, a Message handler, and the wiring code (Facade, Factory, etc).
One thing that can not be extracted out of the Async API schema file by default is the module name in which the code should be generated. To define the module where your code should be generated, you need to add an extension to your schema file.

## Extension to define the module
With the extension, you can control in which module the code should be generated. To enable the extension, add the following to your schema file:

```xml
x-spryker:
    module: YourModuleName
```
With this extension, the code generator parses your schema file and generates the code for the defined module.

## Schema version

Via the [Spryker SDK](/docs/dg/dev/sdks/sdk/spryker-sdk.html), a minimal Async API file is created when you want to work with asynchronous messages. The created schema file uses the Async API specification version 2.4.0. This version is currently set as default and can only be changed manually after the file was created.

You can also use the Async API SDK without the [Spryker SDK](/docs/dg/dev/sdks/sdk/spryker-sdk.html). For more information about the Async API package, see [Async API README file](https://github.com/spryker-sdk/async-api/).  
 