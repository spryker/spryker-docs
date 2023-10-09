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

Need to remove `pyz` from naming of constant, classes, methods and properties. 

It's suitable to use phpStorm for such replaces.

### Constants renaming

1. replace `const PYZ_` with `const `.
2. replace `::PYZ_` with `::`.
3. replace constant values that start with `PYZ_`.
4. remove constants that override the same parent constant with the same value.

### Transfers renaming

1. Replace in `shared` folder only for `*.xml` transfers files:
   1. `"(pyz)(.)(\w*)` with `"\L$2\E$3`
   2. `"(Pyz)(.)(\w*)` with `"$2E$3`

2. Replace regexp `Transfer\->(get|set|require)Pyz` with `Transfer->$1` in `*.php` files
3. Replace in `*.twig` files transfer getters `.getPyz` or `.pyz`

### DB schema renaming

It's important to note that all the custom tables should be with `pyz_` prefixes due to Spryker conventions

1. Replace in `*.xml` `pyz_`

### Methods renaming

1. Replace regexp `on (get|set|add|map)Pyz` with `on $1`
2. Replace regexp `\->(get|set|add|map)Pyz` with `->$1`
3. Replace `class Pyz` with `class`
4. Replace `BasePyz` with `Base
5. Replace `([a-z])Pyz([A-Z])` with `$1$2`

### Replacement of the rest of pyz occurrences (variables, Class names)

1. Search and replace by `\w\\Pyz` (regexp), `Pyz(`, `: Pyz`, `(Pyz`
2. Check and replace all the  `pyz` occurrences by regexp `(?<!(namespace |use |@[a-z]+ \\))(Pyz|pyz)`

### Final check
1. Use phpstan to find all the missed places and errors
2. Manually check the project base functionality
3. Make sure that CI is green
