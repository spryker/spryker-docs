---
title: "Entity does not exist: Pyz prefix"
description: Learn how to resolve the Entity does not exist error by adjusting configurations, updating database schemas, and ensuring proper entity management for Spryker compatibility.
template: concept-topic-template
last_updated: Oct 16, 2023
---

When running an upgrade, you can get an error about a non-existent constant, class, method, or property. It's caused by the name of the entity containing the `pyz` prefix.

## Error example

Constant does not exist because the existent constant has `PYZ_` prefix.

## Solution

Remove `pyz` from the names of the entities:
* Constant
* Class
* Method
* Property

### Rename constants

1. Replace `const PYZ_` with `const`.
2. Replace `::PYZ_` with `::`.
3. Rename constant values that start with `PYZ_`.
4. Remove constants that override the same parent constant with the same value.

### Rename transfers

1. In the `shared` folder, replace the following for `*.xml` transfers files:
   * `"(pyz)(.)(\w*)` with `"\L$2\E$3`
   * `"(Pyz)(.)(\w*)` with `"$2E$3`

2. In `*.php` files, replace the `Transfer\->(get|set|require)Pyz` regexpa with `Transfer->$1`.
3. In `*.twig` files, remove `pyz` in transfer getters like `.getPyz` or `.pyz`.

### Rename DB schemas

{% info_block warningBox "Naming convention" %}

According to our naming convention, all custom tables must be prefixed with `pyz_`

{% endinfo_block %}

Remove `pyz_` in `*.xml` schema files.

### Rename methods

1. Replace the `on (get|set|add|map)Pyz` regexp with `on $1`.
2. Replace the `\->(get|set|add|map)Pyz` regexp with `->$1`.
3. Replace `class Pyz` with `class`.
4. Replace `BasePyz` with `Base`.
5. Replace the `([a-z])Pyz([A-Z])` regexp with `$1$2`.

### Rename variables and class names

1. Search by the `\w\\Pyz` regexp, `Pyz(`, `: Pyz`, `(Pyz` and remove `pyz`.
2. Search by the `(?<!(namespace |use |@[a-z]+ \\))(Pyz|pyz)` rexexp and remove all the  `pyz` occurrences.

### Verify the changes

1. Use phpstan to identify missed occurrences of `pyz`.
  If any found, rename or remove.
2. Manually check the project base functionality.
3. Run the CI and make sure it's green.
