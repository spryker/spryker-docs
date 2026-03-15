---
title: "Collate data transformer: Table configurator"
description: This document provides details about the Data Transformer Collate Configurator Table service in the Components Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/data-transformers/collate/data-configurators/table.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/data-transformers/collate/data-configurators/table.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-data-configurators/collate-data-transformer-table-configurator.html

related:
  - title: Data Transformer Data Configurators
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-data-configurators/collate-data-transformer-data-configurators.html
---

This document explains the Table Configurator service in the Components Library.

## Overview

Table Configurator as a collate data transformer is an Angular Service that re-populates of data to a format suitable for filtering: `DataTransformerConfiguratorConfigT`.

Check out an example usage of the Data Transformer Collate Configurator Table in the `@spryker/table` config:

```html
<spy-table
    [config]="{
        datasource: {
            ...,                                                   
            transform: {
                type: 'collate',
                configurator: {
                    type: 'table',
                },
                ...,  
            },
        },
    }"
>
</spy-table>
```

## Service registration

Register the service:

```ts
declare module '@spryker/data-transformer.collate' {
    interface DataTransformerConfiguratorRegistry {
        table: TableDataTransformerConfiguratorService;
    }
}

@NgModule({
    imports: [
        DataTransformerModule.withTransformers({
            collate: CollateDataTransformerService,
        }),
        CollateDataTransformer.withFilters({
            table: TableDataTransformerConfiguratorService,
        }),
    ],
})
export class RootModule {}
```
