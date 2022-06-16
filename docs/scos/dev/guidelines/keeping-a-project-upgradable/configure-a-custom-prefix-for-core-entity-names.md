---
title: Define a custom prefix for core entity names
description: Learn how to define a custom prefix for core entity names
last_updated: June 3, 2022
template: howto-guide-template
---

When evaluator checks project-level code entities for existing and potential matches with the core ones, it skips the entities that have the `Pyz` prefix in their name. Such are considered unique and will not conflict with core entities in future because there will never be an entity with the `Pyz` prefix in the core.

When solving upgradability issues, you can use the `Pyz` prefix to make your entities unique. To use custom prefixes, do the following:

1. Create `/tooling.yaml`
2. Define `Pyz` and needed custom prefixes. For example, define `Zyp` as a custom prefix:
```yaml
upgrader:
  prefixes:
    - Pyz
    - Zyp
```

Now the evaluator will not consider entities prefixed with `Zyp` as not unique. 
