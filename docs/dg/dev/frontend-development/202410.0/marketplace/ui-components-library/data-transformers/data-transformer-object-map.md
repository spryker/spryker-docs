---
title: "Data Transformer: Object-map"
description: This document provides details about the Data Transformer Object-map service in the Components Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/data-transformers/data-transformer-object-map.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/data-transformers/object-map.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/data-transformers/data-transformer-object-map.html

related:
  - title: Data Transformers
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformers.html
  - title: Data Transformer Array-map
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-array-map.html
  - title: Data Transformer Chain
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-chain.html
  - title: Data Transformer Date-parse
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-date-parse.html
  - title: Data Transformer Date-serialize
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-date-serialize.html
  - title: Data Transformer Lens
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-lens.html
  - title: Data Transformer Pluck
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-pluck.html
---

This document explains the Data Transformer Object-map service in the Components Library.

## Overview

Data Transformer Object-map is an Angular Service that executes another Data Transformer from the config for specific properties in an object.

In the following example, the `datasource` will return an array with the transformed `date` in every child object.

Service configuration:

- `mapProps`—a Data Transformer that is set up with a configuration object.  
- `propName`—the name of the property from which the value needs to be transformed.  

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
            type: 'array-map',
            mapItems: {
                type: 'object-map',
                mapProps: {
                    date: {
                        type: 'date-parse',
                    },
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
        'object-map': ObjectMapDataTransformerConfig;
    }
}

@NgModule({
    imports: [
        DataTransformerModule.withTransformers({
            'object-map': ObjectMapDataTransformerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Data Transformer Object-map:

```ts
export interface ObjectMapDataTransformerConfig extends DataTransformerConfig {
    mapProps: {
        [propName: string]: DataTransformerConfig;
    };
}
```
