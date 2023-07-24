---
title: Table Feature Pagination
description: This document provides details about the Table Feature Pagination component in the Components Library.
template: concept-topic-template
related:
  - title: Table Feature extension
    link: docs/scos/dev/front-end-development/page.version/marketplace/table-design/table-features/index.html
  - title: Table Feature Batch Actions
    link: docs/scos/dev/front-end-development/page.version/marketplace/table-design/table-features/table-feature-batch-actions.html
  - title: Table Feature Editable
    link: docs/scos/dev/front-end-development/page.version/marketplace/table-design/table-features/table-feature-editable.html
  - title: Table Feature Row Actions
    link: docs/scos/dev/front-end-development/page.version/marketplace/table-design/table-features/table-feature-row-actions.html
  - title: Table Feature Search
    link: docs/scos/dev/front-end-development/page.version/marketplace/table-design/table-features/table-feature-search.html
  - title: Table Feature Selectable
    link: docs/scos/dev/front-end-development/page.version/marketplace/table-design/table-features/table-feature-selectable.html
  - title: Table Feature Settings
    link: docs/scos/dev/front-end-development/page.version/marketplace/table-design/table-features/table-feature-settings.html
  - title: Table Feature Sync State
    link: docs/scos/dev/front-end-development/page.version/marketplace/table-design/table-features/table-feature-sync-state.html
  - title: Table Feature Title
    link: docs/scos/dev/front-end-development/page.version/marketplace/table-design/table-features/table-feature-title.html
  - title: Table Feature Total
    link: docs/scos/dev/front-end-development/page.version/marketplace/table-design/table-features/table-feature-total.html
---

This document explains the Table Feature Pagination component in the Components Library.

## Overview

Table Feature Pagination is a feature of the Table Component that renders pagination of the table.
This feature is based on the Pagination component.

Check out an example usage of the Table Feature Pagination in the `@spryker/table` config.

Component configuration:

- `enabled`—enables the feature via config.  
- `sizes`—an array of numbers of table rows that needs to be displayed per page.  

```html
<spy-table
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        pagination: {
            enabled: true,
            sizes: [10, 50, 100],
        },                                                                                           
    }"
>
</spy-table>
```

## Component registration

Register the component:

```ts
declare module '@spryker/table' {
    interface TableConfig {
        pagination?: TablePaginationConfig;
    }
}

@NgModule({
    imports: [
        TableModule.withFeatures({
            pagination: () =>
                import('@spryker/table.feature.pagination').then(
                    (m) => m.TablePaginationFeatureModule,
                ),
        }),
    ],
})
export class RootModule {}
```

```html
// Via HTML
@NgModule({
    imports: [
        TableModule.forRoot(),
        TablePaginationFeatureModule,
    ],
})
export class RootModule {}

<spy-table [config]="config">
    <spy-table-pagination-feature spy-table-feature></spy-table-pagination-feature>
</spy-table>
```

## Interfaces

Below you can find interfaces for the Table Feature Pagination:

```ts
export interface TablePaginationConfig extends TableFeatureConfig {
    sizes: number[];
}
```
