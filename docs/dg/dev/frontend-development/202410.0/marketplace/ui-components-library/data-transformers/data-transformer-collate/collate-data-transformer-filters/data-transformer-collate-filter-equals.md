---
title: "Data transformer Collate filter: Equals"
description: This document provides details about the Data Transformer Collate Filter Equals service in the Components Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/data-transformers/collate/filters/equals.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/data-transformers/collate/filters/equals.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-filters/data-transformer-collate-filter-equals.html

related:
  - title: Data Transformer Filters
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-filters/collate-data-transformer-filters.html
  - title: Data Transformer Collate Filter Range
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-filters/data-transformer-collate-filter-range.html
  - title: Data Transformer Collate Filter Text
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformer-collate/collate-data-transformer-filters/data-transformer-collate-filter-text.html
---

This document explains the Data Transformer Collate Filter Equals service in the Components Library.

## Overview

Data Transformer Collate Filter Equals is an Angular Service that implements filtering to equalize data based on configuration.

Check out an example usage of the Data Transformer Collate Filter Equals in the `@spryker/table` config:

```html
<spy-table
    [config]="{
        datasource: {
            ...,                                               
            transform: {
                ...,
                filter: {
                    select1: {
                        type: 'equals',
                        propNames: 'col1',
                    },
                    select2: {
                        type: 'equals',
                        propNames: ['col2', 'col1'],
                    },
                },
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
    interface DataTransformerFilterRegistry {
        equals: EqualsDataTransformerFilterService;
    }
}

@NgModule({
    imports: [
        DataTransformerModule.withTransformers({
            collate: CollateDataTransformerService,
        }),
        CollateDataTransformer.withFilters({
            equals: EqualsDataTransformerFilterService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Data Transformer Collate Filter Equals:

```ts
interface DataTransformerFilterConfig {
    type: string;
    propNames: string | string[];
}
```
