---
title: "Data Transformer: Array-map"
description: This document provides details about the Data Transformer Array-map service in the Components Library.
template: concept-topic-template
last_updated: Aug 8, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/data-transformers/data-transformer-array-map.html
  - /docs/scos/dev/front-end-development/202307.0/marketplace/ui-components-library/data-transformers/data-transformer-array-map.html

related:
  - title: Data Transformers
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformers.html
  - title: Data Transformer Chain
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-chain.html
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

This document explains the Data Transformer Array-map service in the Components Library.

## Overview

Data Transformer Array-map is an Angular Service that executes another Data Transformer based on the config for every element in the array.

In the following example, the `datasource` will return an array with the transformed `date` in every object.

Service configuration:

- `mapItems`—a Data Transformer that is set up with a configuration object.

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
                date: '2020-09-24T15:20:08+02:00',
            },
        ],
        transform: {
            type: 'array-map',
            mapItems: {
                type: 'lens',
                path: 'date',
                transformer: {
                    type: 'date-parse',
                },
            },
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
        'array-map': ArrayMapDataTransformerConfig;
    }
}

@NgModule({
    imports: [
        DataTransformerModule.withTransformers({
            'array-map': ArrayMapDataTransformerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Data Transformer Array-map:

```ts
export interface ArrayMapDataTransformerConfig extends DataTransformerConfig {
    mapItems: DataTransformerConfig;
}
```
