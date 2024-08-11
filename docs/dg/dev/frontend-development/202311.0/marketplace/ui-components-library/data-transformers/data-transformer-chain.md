---
title: "Data Transformer: Chain"
description: This document provides details about the Data Transformer Chain service in the Components Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/data-transformers/data-transformer-chain.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/data-transformers/chain.html
  - /docs/scos/dev/front-end-development/202311.0/marketplace/ui-components-library/data-transformers/data-transformer-chain.html

related:
  - title: Data Transformers
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformers.html
  - title: Data Transformer Array-map
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-array-map.html
  - title: Data Transformer Date-parse
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-date-parse.html
  - title: Data Transformer Date-serialize
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-date-serialize.html
  - title: Data Transformer Lens
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-lens.html
  - title: Data Transformer Object-map
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-object-map.html
  - title: Data Transformer Pluck
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-pluck.html
---

This document explains the Data Transformer Chain service in the Components Library.

## Overview

Data Transformer Chain is an Angular Service that executes other Data Transformers in sequence via configuration.

In the following example, the `datasource` returns an array with the transformed `date` in every child object using chained transformers.

Service configuration:

- `transformers`—an array with Data Transformer configuration objects.

```html
<spy-select
    [datasource]="{
        type: 'inline',
        data: [
            {
                type: 'date',
                date: '2020-09-24T15:20:08+02:00',
            },
            {
                type: 'date',
                date: '2020-09-22T15:20:08+02:00',
            },
        ],
        transform: {
            type: 'chain',
            transformers: [
                {
                    type: 'array-map',
                    mapItems: {
                        type: 'lens',
                        path: 'date',
                        transformer: {
                            type: 'date-parse',
                        },
                    },
                },                                            
                {
                    type: 'array-map',
                    mapItems: {
                        type: 'object-map',
                        mapProps: {
                            date: {
                                type: 'date-serialize',
                            },
                        },
                    },
                },
            ],      
        },                  
    }"
>
</spy-select>
```

## Service registration

Register the service:

```ts
declare module '@spryker/data-transformer' {
    interface DataTransformerRegistry {
        chain: ChainDataTransformerConfig;
    }
}

@NgModule({
    imports: [
        DataTransformerModule.withTransformers({
            chain: ChainDataTransformerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Data Transformer Chain:

```ts
export interface ChainDataTransformerConfig extends DataTransformerConfig {
    transformers: DataTransformerConfig[];
}
```
