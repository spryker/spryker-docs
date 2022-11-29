---
title: Project namespaces
description:
last_updated: Nov 22, 2022
template: howto-guide-template
---

At Spryker the default project name is Pyz and the project code is located in: `src/Pyz` folder. According to the PSR-4 standard PHP namespace has to correlate with folder name. In this case the namespace must be “Pyz” and followed that in a subfolder e.g. `src/Pyz/Zed/Cart` the namespace will be `Pyz\Zed\Cart`.

Projects can be renamed but to follow up the PSR-4 standard namespaces must be rewritten in all php files in projects directory and all sub-directories.
In the case of creating new directories for projects source codes it’s also mandatory to follow the namespace convention, started the naming from the src directory level.
