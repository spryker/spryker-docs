---
title: Table Feature Total
description: This document provides details about the Table Feature Total component in the Components Library.
template: concept-topic-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/table-features/table-feature-total.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/table-design/table-feature-extension/table-feature-total.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/table-design/table-feature-extension/table-feature-total.html

related:
  - title: Table Feature extension
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-extension.html
  - title: Table Feature Batch Actions
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-batch-actions.html
  - title: Table Feature Editable
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-editable.html
  - title: Table Feature Pagination
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-pagination.html
  - title: Table Feature Row Actions
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-row-actions.html
  - title: Table Feature Search
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-search.html
  - title: Table Feature Selectable
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-selectable.html
  - title: Table Feature Settings
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-settings.html
  - title: Table Feature Sync State
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-sync-state.html
  - title: Table Feature Title
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-title.html
---

This document explains the Table Feature Total component in the Components Library.

## Overview

Table Feature Total is a feature of the Table Component that renders the total number of the data
set via Chips component.
In case table rows are selectable, Table Feature Total also renders a number of selected rows.

Check out an example usage of the Table Feature Total in the `@spryker/table` config.

Component configuration:

- `enabled`—enables the feature via config.  

```html
<spy-table
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        total: {
            enabled: true,
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
        total?: TableTotalConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withFeatures({
            total: () =>
                import('@spryker/table.feature.total').then(
                    (m) => m.TableTotalFeatureModule,
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
        TableTotalFeatureModule,
    ],
})
export class RootModule {}

<spy-table [config]="config">
    <spy-table-total-feature spy-table-feature></spy-table-total-feature>
</spy-table>
```

## Interfaces

Below you can find interfaces for the Table Feature Total:

```ts
export interface TableTotalConfig extends TableFeatureConfig {}
```
