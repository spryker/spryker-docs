---
title: "Pyz prefix issues"
description: How to solve the problem related to "pyz" prefix issue
template: concept-topic-template
---

The issues related to the non-existent constants, classes, methods and properties after upgrader process.
It caused by usage of `pyz` prefixes on the project level.

## Error

Constant does not exist because the existent constant has `PYZ_` prefix.

## Solution

Remove `pyz` from the names of the entities:
* Constant
* Class
* Method
* Property

### Rename constants

1. Replace `const PYZ_` with `const `.
2. Replace `::PYZ_` with `::`.
3. Replace constant values that start with `PYZ_`.
4. Remove constants that override the same parent constant with the same value.

### Rename transfers

1. In the `shared` folder, replace the following for `*.xml` transfers files:
   * `"(pyz)(.)(\w*)` with `"\L$2\E$3`
   * `"(Pyz)(.)(\w*)` with `"$2E$3`

2. In `*.php` files, replace regexp `Transfer\->(get|set|require)Pyz` with `Transfer->$1`.
3. In `*.twig` files, replace transfer getters `.getPyz` or `.pyz`

### Rename DB schema

{% info_block warningBox "Naming convention" %}

According to our naming convention, all custom tables must be prefixed with `pyz_`

{% endinfo_block %}

1. Replace in `*.xml` `pyz_`

### Rename methods

1. Replace regexp `on (get|set|add|map)Pyz` with `on $1`.
2. Replace regexp `\->(get|set|add|map)Pyz` with `->$1`.
3. Replace `class Pyz` with `class`.
4. Replace `BasePyz` with `Base`.
5. Replace `([a-z])Pyz([A-Z])` with `$1$2`.

### Rename variables and class names

1. Search and replace by `\w\\Pyz` (regexp), `Pyz(`, `: Pyz`, `(Pyz`
2. Check and replace all the  `pyz` occurrences by regexp `(?<!(namespace |use |@[a-z]+ \\))(Pyz|pyz)`

### Verify the changes
1. Use phpstan to find all the missed places and errors
2. Manually check the project base functionality
3. Make sure that CI is green
