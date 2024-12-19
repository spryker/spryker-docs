---
title: Adding Spryks
description: Find out how you can add a new Spryk in to your Spryker project with Spryker SDKs
template: howto-guide-template
redirect_from:
- /docs/sdk/dev/spryks/adding-a-new-spryk.html

last_updated: Nov 10, 2022
related:
    - title: Spryk configuration reference
      link: docs/dg/dev/sdks/sdk/spryks/spryk-configuration-reference.html
---

To add a new Spryk, you need to add a YAML configuration file to the `config/spryk/spryks/` directory.

The `spryk` option defines which builder is used to work with the defined Spryk definition.

For example, `spryk: Template` uses the `SprykerSdk\Spryk\Model\Spryk\Builder\Template\TemplateSpryk` class to fulfill the Spryk definition.

## The Spryks hierarchy structure

Spryks can depend on other Spryks that are executed before or after the current Spryk. The Spryks hierarchy structure resembles a tree, or even a graph in some cases, that is controlled by the `preSpryks` and `postSpryks` configuration keys.

The best practice to follow is to have a Spryk build only one small structural unit and call other Spryks that build the rest of the structure with classes, interfaces, and configs. After executing a Spryk, you get a completely valid structure of files.

The arguments of the children's Spryks can inherit the values of the same arguments of the parent Spryk. To achieve that, you need to define the `inherit: true` option in the argument definition block. For details about the Spryk file structure and its arguments, see [Spryk configuration reference](/docs/dg/dev/sdks/sdk/spryks/spryk-configuration-reference.html#the-root-configuration).

## Overriding arguments in preSpryks or postSpryks

Overriding is useful for the customization of a used Spryk in the `preSpryks` or `postSpryks` section. You can pass or override arguments here.

You can even add arguments that are not defined in the used Spryk itself. This is useful primarily when you use a Twig template with more arguments than the original template.

```yaml
postSpryks:
    - AddSharedTransferSchema # Spryk is used as is
    - AddZedDependencyProvider: # Spryk with overrided arguments
        arguments:
            extends:
                value: \Spryker\Zed\DataImport\DataImportDependencyProvider
```

As explained earlier, Spryks can pose a sort of hierarchy where one Spryk uses several other Spryks. In some cases, you don't need the full hierarchy. To exclude the execution of one or more Spryks, use the `excludedSpryks` option.

```yaml
postSpryks:
    - AddZedCommunicationControllerAction:
          excludedSpryks:
              - AddZedPresentationTwig
              - AddZedNavigationNode
          arguments:
              allowOverride:
                  value: true
              input:
                  value: "\\Symfony\\Component\\HttpFoundation\\Request $request"
              output:
                  value: "\\Symfony\\Component\\HttpFoundation\\JsonResponse"
              controller:
                  value: RegistryController
              controllerMethod:
                  value: disconnect
              body:
                  allowOverride: true
                  value: "App/Registry/ZedControllerDisconnectMethod.php.twig"
```

## Conditional Spryks

In some cases, you need to run a Spryk only when a specific condition is matched. For example, when one of the passed arguments has a specific value. For these cases, you can use the `condition` option.
For condition evaluation, the `symfony/expression-language` component is used.

```yaml
postSpryks:
    # Add a factory method for non Zed applications.
    - AddMethod:
          condition: "application !== 'Zed'"
          arguments:
              method:
                  value: "get{{dependentModule | ucfirst }}{{ dependencyType | ucfirst }}"
              ...
    # Add a factory method for Zed applications.
    - AddMethod:
          condition: "application === 'Zed'"
          arguments:
              method:
                  value: "get{{dependentModule | ucfirst }}{{ dependencyType | ucfirst }}"
              ...
```
## The wrapper Spryk

To merge some Spryks into a bigger structure to enable execution of all of them with a single command, you can use a wrapper Spryk.
This Spryk only executes `preSpryks` or `postSpryks`, and receives arguments.

```yaml
spryk: wrapper
description: "Adds a registry code for apps. Builds the logic for connection and disconnection."
priority: 1
mode: both
level: 1

arguments:
    organization:
        inherit: true
        default: Spryker

    application:
        inherit: true
        default: Zed

excludedSpryks:
    - AddZedPresentationTwig
    - AddZedNavigationNode

preSpryks:
    - AddModule

postSpryks:
    - AddZedBusinessModelMethod:
          arguments:
              allowOverride:
                  value: true
  ...
```

## Best practices

- Try not to create your own Spryks unless you're sure that you can not customize an existing Spryk to fit your needs.
- For re-use, try to opt for the basic common Spryks located in `config/spryk/spryks/Spryker/Common/.
- Try not to create a deep hierarchy of Spryks.
- Always populate Spryks and their argument descriptions.
- Try not to generate unused methods, classes, configs, etc. Use `conditions` option to resolve the issues.
