---
title: What static analysis proves
description: Look up whether a property you are about to assert in a test is already enforced by PHPStan, Code Sniffer, or Architecture Sniffer, and which properties still need a test.
last_updated: Sep 29, 2026
template: concept-topic-template
related:
  - title: PHPStan
    link: docs/dg/dev/sdks/sdk/development-tools/phpstan.html
  - title: Code Sniffer
    link: docs/dg/dev/sdks/sdk/development-tools/code-sniffer.html
  - title: Architecture Sniffer
    link: docs/dg/dev/sdks/sdk/development-tools/architecture-sniffer.html
  - title: Best practices for effective testing
    link: docs/dg/dev/guidelines/testing-guidelines/testing-best-practices/best-practices-for-effective-testing.html
---

Static analysis is the base tier of a Spryker test suite. PHPStan, Code Sniffer, and Architecture Sniffer check every analyzed file on every change, without anybody writing a test. Every rule they enforce is a rule no test has to assert.

This page lists those rules at the level you need when you write a test: *you do not need a test for this*. Before you assert a property, look it up here. If a tool already enforces it, drop the assertion and spend the test on behavior instead. If the property is listed under [What static analysis does not prove](#what-static-analysis-does-not-prove), the test is yours to write.

## When a guarantee holds

A rule replaces a test only when all of the following are true:

- The tool runs in your continuous integration (CI) pipeline and a violation fails the build.
- The file you are testing is inside the path the tool analyzes.
- The rule is not dropped from your configuration, not matched by an `ignoreErrors` entry, and not covered by a baseline.
- For Architecture Sniffer, the rule's priority is within the `--minimumpriority` your pipeline passes. A rule with priority `4` does not run when the pipeline passes `--minimumpriority 2`.

The Spryker demo shops run the tools as follows. If your project changed any of these commands, read the tables on this page against your own configuration.

| Tool | Command in the demo shops | What it analyzes |
|---|---|---|
| PHPStan | `vendor/bin/phpstan analyze -l 6 -c phpstan.neon src/` | `src/`, without `src/Generated` and `src/Orm`. Tests are not analyzed. |
| Code Sniffer | `vendor/bin/console code:sniff:style` | `src/`, `config/`, and `tests/`, with the `Spryker` and `SprykerStrict` rulesets from `phpcs.xml`. |
| Architecture Sniffer, core ruleset | `vendor/bin/phpmd src/ text vendor/spryker/architecture-sniffer/src/ruleset.xml --minimumpriority 2` | `src/` |
| Architecture Sniffer, project ruleset | `vendor/bin/phpmd src/ text phpmd.xml --minimumpriority 4` | `src/`, without the paths excluded in `phpmd.xml`. The default exclusions are `Persistence/Propel`, `Presentation`, `Generated`, `Orm`, and every `*DataImport*` module. |

## Quick lookup

Find the property you were about to assert. The **Owner** column names the tool and the rule that already enforces it.

| You were about to assert that… | Owner |
|---|---|
| a class, method, function, or constant that the code references exists | PHPStan, level 0 and level 2 |
| a method or function is called with the right number of arguments | PHPStan, level 0 |
| a variable is defined before it is read | PHPStan, level 0 and level 1. Architecture Sniffer, `UndefinedVariable` |
| a method returns the type it declares | PHPStan, level 3 |
| a property is only assigned values of its declared type | PHPStan, level 3 |
| a method is only called with arguments of the types it declares | PHPStan, level 5 |
| a branch is unreachable, or an `instanceof` check can never be true | PHPStan, level 4 |
| a parameter, return value, or property declares its type | PHPStan, level 6. Code Sniffer, `SprykerStrict.TypeHints.*` |
| a factory, facade, client, plugin, or controller declares the `@method` annotation for `getFactory()`, `getFacade()`, `getClient()`, `getConfig()`, or `getQueryContainer()` | PHPStan, `DynamicMethodMissingPhpDocAnnotationRule` from `spryker-sdk/phpstan-spryker` |
| a file declares `strict_types=1` | Code Sniffer, `SlevomatCodingStandard.TypeHints.DeclareStrictTypes` |
| Yves code does not import Zed classes, and Zed code does not import Yves classes | Code Sniffer, `Spryker.Namespaces.SprykerNoCrossNamespace`. Architecture Sniffer, `LayerAccessRule` |
| Yves, Client, Service, and Shared code do not call Zed or Glue, and Glue does not call Zed Persistence or Presentation | Architecture Sniffer, `LayerAccessRule` |
| Zed Persistence does not call Zed Business or Communication | Architecture Sniffer, `LayerAccessRule` |
| a Storage or Search client does not make a Zed request | Architecture Sniffer, `UnusedZedRequestInSearchAndStorageRule` |
| a facade method only delegates to the factory and contains no logic | Architecture Sniffer, `FacadeNoLogicRule`, `FacadeRule`, and `FacadeSingleFactoryCallRule` |
| a facade or plugin method does not accept an entity transfer | Architecture Sniffer, `FacadeArgumentsNotAllowedUseEntityTransferRule` and `PluginArgumentsNotAllowedUseEntityTransferRule` |
| a repository does not save, update, or delete | Architecture Sniffer, `RepositoryReadOnlyRule` |
| an object-relational mapping (ORM) entity is not created in the Zed Communication application layer | Architecture Sniffer, `OrmNewEntityNotInCommunicationRule` |
| an ORM query or entity does not call Zed Business | Architecture Sniffer, `OrmAccessRule` |
| a facade, factory, repository, or entity manager is resolved by the kernel, not created with `new` | Architecture Sniffer, `InstanceResolvingRule` |
| the locator and `getInstance()` singletons are only used in a dependency provider | Architecture Sniffer, `LocatorInDependencyProviderOnlyRule` and `SingletonInstanceInDependencyProviderOnlyRule` |
| a factory `create*()` method creates exactly one object, and a `get*()` method creates none | Architecture Sniffer, `FactoryCreateContainOneNewRule` and `FactoryGetContainNoNewRule` |
| a factory contains only `get*()` and `create*()` methods, without loops or logic | Architecture Sniffer, `FactoryOnlyGetAndCreateRule`, `FactoryNoLoopsRule`, and `FactoryNoLogicRule` |
| every public method of a Zed controller ends in `Action` | Architecture Sniffer, `CommunicationControllerRule` |
| a plugin class ends in `Plugin`, and its interface ends in `PluginInterface` | Architecture Sniffer, `PluginSuffixRule` and `PluginInterfaceSuffixRule` |
| the code does not use `eval`, superglobals, or debugging functions such as `var_dump()` | Architecture Sniffer, `EvalExpression`, `Superglobals`, and `DevelopmentCodeFragment`. Code Sniffer, `Squiz.PHP.Eval` and `SlevomatCodingStandard.Variables.DisallowSuperGlobalVariable` |
| the code does not call a function that is missing from the minimum PHP version | Code Sniffer, `Spryker.Internal.SprykerDisallowFunctions` with the `phpVersion` property from `phpcs.xml` |
| the code does not call a deprecated PHP function or silence errors with `@` | Code Sniffer, `Generic.PHP.DeprecatedFunctions` and `Generic.PHP.NoSilencedErrors` |
| a `catch` block is not empty | Architecture Sniffer, `EmptyCatchBlock` |
| a private method, private property, local variable, or parameter is used | Architecture Sniffer, `UnusedPrivateMethod`, `UnusedPrivateField`, and `UnusedLocalVariable`. Code Sniffer, `SlevomatCodingStandard.Variables.UnusedVariable` and `SlevomatCodingStandard.Functions.UnusedParameter` |
| a class name matches its filename, and names follow the camel case convention | Code Sniffer, `Spryker.Classes.ClassFileName`. Architecture Sniffer, `CamelCase*` rules |

The formatting of the code, such as indentation, spacing, import order, and array syntax, is owned by Code Sniffer as a whole. It follows the PHP Standards Recommendations (PSR) 2 and 12 plus the Spryker additions in [spryker/code-sniffer](https://github.com/spryker/code-sniffer).

## PHPStan

PHPStan checks types. The demo shops run it at level 6 with the `spryker-sdk/phpstan-spryker` extension. Each level includes every level below it.

| Level | What it enforces, so you do not need a test for it |
|---|---|
| 0 | Classes, functions, and methods called on `$this` exist. Calls pass the right number of arguments. Variables are never used undefined. |
| 1 | Variables are not possibly undefined. Magic methods and properties exist on classes that declare `__call()` and `__get()`. |
| 2 | Methods exist on every expression, not only on `$this`. PHPDoc types are valid. |
| 3 | Return values match the declared return type. Values assigned to a property match its type. |
| 4 | No dead code: no always-false type check, no dead `else` branch, no code after `return`. |
| 5 | Arguments match the parameter types of the method or function they are passed to. |
| 6 | Every parameter, return value, and property declares a type. |

The Spryker extension resolves the return types of `getFactory()`, `getFacade()`, `getClient()`, `getConfig()`, and `getQueryContainer()` from the `@method` annotation of the class, and reports a missing annotation. As a result, the type checks of level 3 and level 5 also cover the calls that cross from a facade to its factory, and from a factory to its dependencies.

At level 6, PHPStan does not report the following, so these properties still need a test:

- A method called or a property read on a value that can be `null`. PHPStan reports this from level 8.
- A method called on a union type where only some members of the union have that method. PHPStan reports this from level 7.
- Anything in the `tests/` directory, because the demo shops analyze `src/` only.

For more information about the levels, see [Rule levels](https://phpstan.org/user-guide/rule-levels) in the PHPStan documentation.

## Code Sniffer

Code Sniffer checks the shape of the code: formatting, type declarations, naming, and imports. Beyond formatting, it enforces the following properties that a test might otherwise assert:

| Rule | What it enforces |
|---|---|
| `SprykerStrict.TypeHints.ParameterTypeHint`, `ReturnTypeHint`, `PropertyTypeHint` | Parameters, return values, and properties use native type declarations wherever PHP supports one. |
| `SlevomatCodingStandard.TypeHints.DeclareStrictTypes` | Every file declares `strict_types=1`, so PHP does not silently coerce scalar arguments. |
| `Spryker.Namespaces.SprykerNoCrossNamespace` | Yves code imports no Zed classes, and Zed code imports no Yves classes. |
| `Spryker.Internal.SprykerDisallowFunctions` | The code calls no function that is missing from the PHP version set in `phpcs.xml`. |
| `Spryker.Factory.CreateVsGetMethods` | A factory method that instantiates an object is called `create*()`, not `get*()`. |
| `Spryker.MethodAnnotation.*` | Factories, facades, configs, repositories, and entity managers declare the `@method` annotations that PHPStan resolves types from. |
| `Generic.PHP.DeprecatedFunctions`, `Generic.PHP.NoSilencedErrors`, `Squiz.PHP.Eval` | The code calls no deprecated PHP function, does not silence errors, and does not use `eval`. |

Code Sniffer also checks the tests themselves:

| Rule | What it enforces in a test |
|---|---|
| `Spryker.Testing.AssertPrimitives` | `assertTrue()`, `assertFalse()`, and `assertNull()` are used instead of `assertSame()` with a primitive. |
| `Spryker.Testing.ExpectException` | No `assert*()` call follows `expectException()`, where it could never run. |
| `Spryker.Testing.Mock` | A method that returns a mock declares the mocked class in its return annotation. |

Some sniffs, such as `Spryker.Factory.OneNewPerMethod` and `Spryker.Internal.SprykerFacade`, apply to the `Spryker` namespace only. They do not analyze project code, so the table lists only the rules that run on it.

## Architecture Sniffer

Architecture Sniffer checks where code lives and what it may call. It builds on PHP Mess Detector (PHPMD). The table lists the rules of the project ruleset with their priority. A rule runs only when its priority is less than or equal to the `--minimumpriority` of your pipeline.

| Rule | Priority | What it enforces |
|---|---|---|
| `InstanceResolvingRule` | 1 | Facades, business factories, communication factories, repositories, entity managers, query containers, and persistence factories are resolved by the kernel, never created with `new`. |
| `UnusedZedRequestInSearchAndStorageRule` | 1 | Storage and Search clients do not make Zed requests. |
| `UndefinedVariable` | 1 | No variable is read before it is defined. |
| `LayerAccessRule` | 2 | No call from Yves to Zed or Glue. No call from Client to Zed, Glue, or Yves. No call from Glue to Yves, to Zed Persistence or Presentation, or to Zed ORM classes. No call from Shared or Service to Zed, Client, Yves, or Glue. No call from Zed to Yves or Glue. No call from Zed Business or Communication to Zed Presentation. No call from Zed Persistence to Zed Business, Communication, Presentation, or to Client. |
| `LocatorInDependencyProviderOnlyRule` | 2 | The locator is only used in a dependency provider. |
| `SingletonInstanceInDependencyProviderOnlyRule` | 2 | `getInstance()` singletons are only created in a dependency provider. |
| `AllMethodsPublicInFacadeRule` | 2 | A facade contains only public methods. |
| `FacadeRule` | 2 | A facade has no properties and creates no objects. |
| `FacadeNoLogicRule` | 2 | A facade method contains no logic and only delegates. |
| `FacadeSingleFactoryCallRule` | 2 | A facade method calls the factory at most once. |
| `FacadeArgumentsNotAllowedUseEntityTransferRule` | 2 | Facade methods do not accept entity transfers. |
| `PluginArgumentsNotAllowedUseEntityTransferRule` | 2 | Plugin methods do not accept entity transfers. |
| `RepositoryReadOnlyRule` | 2 | A repository does not save, update, or delete. |
| `OrmNewEntityNotInCommunicationRule` | 2 | ORM entities are not created in the Zed Communication application layer. Use an entity manager instead. |
| `OrmAccessRule` | 2 | ORM queries and entities do not call Zed Business. |
| `DisallowedModuleNameRule` | 2 | Module names contain none of the configured disallowed words. |
| `TooManyPublicMethodsRule` | 2 | A class has no more public methods than the configured maximum, 10 by default. |
| `EvalExpression`, `Superglobals`, `DevelopmentCodeFragment` | 2 | The code uses no `eval`, no superglobals, and no debugging functions such as `var_dump()`. |
| `FactoryCreateContainOneNewRule` | 3 | A factory `create*()` method contains exactly one `new`. |
| `FactoryGetContainNoNewRule` | 3 | A factory `get*()` method contains no `new`. |
| `FactoryOnlyGetAndCreateRule` | 3 | A factory contains only `get*()` and `create*()` methods. |
| `FactoryNoLoopsRule` | 3 | A factory method contains no loops. |
| `CommunicationControllerRule` | 3 | Every public controller method ends in `Action`. |
| `PluginSuffixRule`, `PluginInterfaceSuffixRule` | 3 | Plugin classes end in `Plugin`, and plugin interfaces end in `PluginInterface`. |
| `ProjectNoBridgeRule` | 3 | Project code does not use the bridge pattern. |
| `ExternalMethodExtensionReturnTypeRule` | 3 | A method that overrides an inherited method declares a native return type when the parent method documents one. |
| `EmptyCatchBlock` | 3 | No `catch` block is empty. |
| `CyclomaticComplexity`, `NPathComplexity`, `ExcessiveClassComplexity`, `ExcessiveParameterList` | 3 | Methods and classes stay below the PHPMD complexity thresholds. |
| `FactoryNoLogicRule` | 4 | A factory contains no business logic. |
| `FacadeInterfaceRule` | 4 | A facade implements an interface with the same name and the `Interface` suffix. |
| `RestrictedOrmQueryAccessInZedPersistenceRule` | 4 | In Zed Persistence, ORM queries are only used through a repository, an entity manager, or a query container. |
| `ModuleConstantsPathRule`, `ModuleConstantsTypeRule`, `ModuleConstantsNoMethodAllowedRule` | 4 | A module's `*Constants` file sits in Shared, is an interface, and declares no methods. |
| `UnusedPrivateField`, `UnusedPrivateMethod`, `UnusedLocalVariable` | 4 | No private property, private method, or local variable is unused. |

The demo shops also run the core ruleset, `vendor/spryker/architecture-sniffer/src/ruleset.xml`, at `--minimumpriority 2`. Many of its rules, such as its `LayerAccessRule`, match classes in the `Spryker` namespace only, so for project code rely on the project ruleset in the preceding table.

## What static analysis does not prove

Static analysis proves the shape of the code, never what the code computes. The following properties always need a test:

- **Values.** PHPStan proves that a method returns a `CartTransfer`. Only a test proves that the transfer holds the right total.
- **Behavior on `null`.** At level 6, PHPStan does not report a method called on a value that can be `null`. The branch that handles `null` needs a test.
- **Wiring.** Static analysis proves that a dependency provider method returns a list of the declared plugin interface. It does not prove that the plugin your feature needs is in the list, or that the plugins run in the right order.
- **Configuration.** A config method has a declared return type, but the value it returns, and the value an environment sets, are only proven at runtime.
- **The database.** No tool checks what a query returns, whether a filter matches the right rows, or whether a schema change keeps existing data readable.
- **Anything that is not PHP.** Twig templates, JavaScript, YAML, and the XML schema and transfer definitions are outside PHPStan and both sniffers. The demo shops validate the XML definitions separately with `vendor/bin/console propel:schema:validate` and `vendor/bin/console transfer:validate`, which prove that the files are well formed, not that the definitions are right.
- **Excluded paths.** Code under a path that a tool excludes, such as a `*DataImport*` module or `Presentation` for Architecture Sniffer, or `tests/` for PHPStan, is not covered by that tool.

## Keep the guarantee

A rule replaces a test only while it runs. When you add an `ignoreErrors` entry, a baseline entry, or an `<exclude>` element for a rule, the property that rule enforced becomes a test's responsibility again. Fix the violation instead of ignoring it, so the rule keeps working for everybody who relies on it.
