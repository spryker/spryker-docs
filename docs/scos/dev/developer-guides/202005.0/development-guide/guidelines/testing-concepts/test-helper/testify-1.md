---
title: Testify
originalLink: https://documentation.spryker.com/v5/docs/testify-1
redirect_from:
  - /v5/docs/testify-1
  - /v5/docs/en/testify-1
---

## Testify helper
Testify offers many usefull helper that will especially help you with setting up the infrastructure for your tests.


### Shared helper
Shared helper can be used for all application tests.

#### ConfigHelper

This helper lets you easily mock configurations and gives you easy acces to the ModuleConfig.
```
$this->tester->getModuleConfig()
```
It will return you the ModuleConfig of the current module under test.

Manipulating the configuration can be done with:

- \SprykerTest\Shared\Testify\Helper\ConfigHelper::mockEnvironmentConfig()
Use this to mock an environment specific configuration.

- \SprykerTest\Shared\Testify\Helper\ConfigHelper::mockConfigMethod()
   Use this to mock a return value of a ModuleConfig method.
   
- \SprykerTest\Shared\Testify\Helper\ConfigHelper::mockSharedConfigMethod
Use this to mock a return value of a SharedModuleConfig.


#### VirtualFilesystemHelper
This helper let you mock away the real filesystem.

\SprykerTest\Shared\Testify\Helper\VirtualFilesystemHelper::getVirtualDirectory() will return a string that points to a virtual directory. 

\SprykerTest\Shared\Testify\Helper\VirtualFilesystemHelper::getVirtualDirectoryContents() will return the contents of the virtual directory.

There are also some `assert*()` methods that can be used to do assertions for your tests.

!!! This part is not done yet, I propose to make a note here that more will follow in the future

### Zed helper
Zed helper can only be used for testing the Zed application.

#### DependencyProviderHelper
Adds an easy way of mocking dependencies required for your tests.

#### BusinessHelper
Adds an easy way of mocking and accessing business layer classes like the BusinessFactory.

#### CommunicationHelper
Adds an easy way of mocking and accessing communication layer classes like the CommunicationFactory.

#### TableHelper
Adds an easy way to work with tables rendered on pages.

### Yves helper
Yves helper can only be used for testing the Yves application.

#### FactoryHelper
Adds an easy way of mocking and accessing the Factory.

#### DependencyProviderHelper
Adds an easy way of mocking dependencies required for your tests.

### Glue helper
Glue helper can only be used for testing the Glue application.

#### FactoryHelper
Adds an easy way of mocking and accessing the Factory.

#### DependencyProviderHelper
Adds an easy way of mocking dependencies required for your tests.

### Client helper
Client helper can only be used for testing the Client application.

#### ClientHelper
Adds an easy way of mocking and accessing the Client.
