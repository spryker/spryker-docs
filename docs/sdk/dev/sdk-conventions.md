---
title: SDK conventions
description: Learn about the Spryker SDK and how you can use it in your project.
template: concept-topic-template
---

The Spryker SDK defines the following conventions.

## Task

A task must have an ID that follows the schema `<group>:<language>:<subgroup>`, where `<group>` stands for validation or generation, `<language>` is PHP, and `<subgroup>` should be a descriptive name. For example, there can be a task with the following ID: `validation:php:architecture`.

## Value resolver

- Must be suffixed with _ValueResolver_.

- Must implement [ValueResolverInterface](https://github.com/spryker-sdk/sdk-contracts/blob/master/src/ValueResolver/ValueResolverInterface.php).

- A [configurable](https://github.com/spryker-sdk/sdk-contracts/blob/master/src/ValueResolver/ConfigurableValueResolverInterface.php) value resolver interface should be preferred over the concrete implementation.

## Setting

- Must define the path with an underscore as a separator, for example, `some_setting`.

- Must define the scope `is_project: true/false` to distinguish if the setting is per project or global.

- Must define a type to be either array, integer, string, boolean, or float.

- Must define the strategy to use when setting the value. The allowed values are `merge` and `overwrite`.

- Should define `init` as boolean. *True* means that this value is initially requested from the user.

## Placeholder

- Name must start and end with `%`. For example, `%some_placeholder%`.
- Must define `optional: true/false` to indicate if the placeholder needs to be resolved to run the task.
- Must use the `id` or fully qualified class name of an existing value resolver for the field `valueResolver`.