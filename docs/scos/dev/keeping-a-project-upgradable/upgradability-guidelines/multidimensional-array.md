---
title: Multidimensional array
description: Reference information for evaluator tools.
template: howto-guide-template
---

Multidimensional arrays inside the dependency provider’s methods.

## Problem description

On the project level, developers use plugins stack, not all structures are needed and can be supported. Multidimensional arrays make configuration difficult.
This check will verify that multidimensional arrays should have max 2 levels inside.

## Example of code that causes an upgradability error:

The methods `ModuleDependencyProvider` contains unsupported multidimensional arrays, they have more 2 levels inside.

```php

use Spryker\Yves\Module\ModuleDependencyProvider as SprykerModuleDependencyProvider;

class ModuleDependencyProvider extends SprykerModuleDependencyProvider
{
    ...
    
    protected function getPlugins(): array
    {
        return [ // 1st level
            GlossaryStorageConfig::PUBLISH_TRANSLATION => [ // 2nd level
                'delete' => [ // 3rd level. Only plugins are allowed to be here.
                    new GlossaryKeyDeletePublisherPlugin(),
                ],
                'write' => [
                    new GlossaryKeyWriterPublisherPlugin(),
                    new GlossaryTranslationWritePublisherPlugin(),
                ],
            ],
        ];
    }
    
    protected function getAssignVarPlugins(): array
    {
        $plugins = [ // 1st level
            GlossaryStorageConfig::PUBLISH_TRANSLATION => [ // 2nd level
                'delete' => [ // 3rd level. Only plugins are allowed to be here.
                    new GlossaryKeyDeletePublisherPlugin(),
                ],
            ],
        ];
        
        return $plugins;
    }
    
    protected function getArrayMergePlugins(): array
    {
        return array_merge(parent::getArrayMergePlugins(), [ // 1st level
             GlossaryStorageConfig::PUBLISH_TRANSLATION => [ // 2nd level
                'delete' => [ // 3rd level. Only plugins are allowed to be here.
                    new GlossaryKeyDeletePublisherPlugin(),
                ],
            ],
        ]);
    }
}
```

### Related error in the Evaluator output:

```bash
======================
MULTIDIMENSIONAL ARRAY
======================

+---+----------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| # | Message                                                                                                                    | Target                                                                                      |
+---+----------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+
| 1 | Reached max level of nesting for the plugin registration in the {FormDependencyProvider::getPlugins()}.                    | Pyz\Yves\Form\FormDependencyProvider\FormDependencyProvider        |
|   | The maximum allowed nesting level is 2. Please, refactor code, otherwise it will cause upgradability issues in the future. |                                                                                             |
+---+----------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------+

```

### Resolving the error: 

To resolve the error provided in the example, try the following in the provided order:
1. Try to have simple configuration arrays they shouldn't have more than 2 levels.
2. Simplify the used structure to one or two nesting.
