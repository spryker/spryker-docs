---
title: Table Feature Sync State
description: This document provides details about the Table Feature Sync State component in the Components Library.
template: concept-topic-template
last_updated: Aug 2, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/table-features/table-feature-sync-state.html
  - /docs/scos/dev/front-end-development/202307.0/marketplace/table-design/table-feature-extension/table-feature-sync-state.html

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
  - title: Table Feature Title
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-title.html
  - title: Table Feature Total
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-total.html
---

This document explains the Table Feature Sync State component in the Components Library.

## Overview

Table Feature Sync State is a feature of the Table Component that synchronizes the table state with the browser URL (like pagination, filters, sorting).

Check out an example usage of the Table Feature Sync State in the `@spryker/table` config.

Component configuration:

- `enabled`—enables the feature via config.   
- `tableId`—an `id` of the table that syncs the state of the table with the browser URL (also can be assigned to the table via HTML).  

```html
<spy-table
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        syncStateUrl: {
            enabled: true,
            tableId: 'table-id',
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
        syncStateUrl?: TableSyncStateConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withFeatures({
            syncStateUrl: () =>
                import('@spryker/table.feature.sync-state').then(
                    (m) => m.TableSyncStateFeatureModule,
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
        TableSyncStateFeatureModule,
    ],
})
export class RootModule {}

<spy-table [config]="config" [tableId]="tableId">
    <spy-table-sync-state-feature spy-table-feature></spy-table-sync-state-feature>
</spy-table>
```

## Interfaces

Below you can find interfaces for the Table Feature Sync State:

```ts
export interface TableSyncStateConfig extends TableFeatureConfig {
    tableId?: string;
}
```
