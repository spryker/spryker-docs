---
title: "Data Transformer: Pluck"
description: This document provides details about the Data Transformer Pluck service in the Components Library.
template: concept-topic-template
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/data-transformers/pluck.html
related:
  - title: Data Transformers
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/data-transformers/index.html
  - title: Data Transformer Array-map
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/data-transformers/array-map.html
  - title: Data Transformer Chain
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/data-transformers/chain.html
  - title: Data Transformer Date-parse
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/data-transformers/date-parse.html
  - title: Data Transformer Date-serialize
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/data-transformers/date-serialize.html
  - title: Data Transformer Lens
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/data-transformers/lens.html
  - title: Data Transformer Object-map
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/data-transformers/object-map.html
---

This document explains the Data Transformer Pluck service in the Components Library.

## Overview

Data Transformer Pluck is an Angular Service that selects and returns a nested object by path via configuration.

The following `datasource` example returns the value of the `three` key ('123') of the `data` input after receiving the response.

Service configuration:

- `path`—the name of the property from which the value needs to be retrieved. The `path` may contain nested properties separated by dots, just like in Javascript.

```html
<spy-select
    [datasource]="{
        type: 'inline',
        data: {
            one: {
                two: {
                    three: '123',  
                },
            },
        },
        transform: {
            type: 'pluck',
            path: 'one.two.three',
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
        pluck: PluckDataTransformerService;
    }
}

@NgModule({
    imports: [
        DataTransformerModule.withTransformers({
            pluck: PluckDataTransformerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Data Transformer Pluck:

```ts
export interface PluckDataTransformerConfig extends DataTransformerConfig {
    path: string;
}
```
