---
title: Table Feature Settings
description: This document provides details about the Table Feature Settings component in the Components Library.
template: concept-topic-template
last_updated: Aug 2, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/table-features/table-feature-settings.html
  - /docs/scos/dev/front-end-development/202307.0/marketplace/table-design/table-feature-extension/table-feature-settings.html

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
  - title: Table Feature Sync State
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-sync-state.html
  - title: Table Feature Title
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-title.html
  - title: Table Feature Total
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-feature-extension/table-feature-total.html
---

This document explains the Table Feature Settings component in the Components Library.

## Overview

Table Feature Settings is a feature of the Table Component that allows customizing columns of the table (show or hide and reorder).

Check out an example usage of the Table Feature Settings in the `@spryker/table` config.

Component configuration:

- `enabled`—enables the feature via config.  
- `tableId`—`id` of the table that syncs with the table toolbar settings (also can be assigned to the table via HTML).  

```html
<spy-table
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        columnConfigurator: {
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
        columnConfigurator?: TableSettingsConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withFeatures({
            columnConfigurator: () =>
                import('@spryker/table.feature.settings').then(
                    (m) => m.TableSettingsFeatureModule,
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
        TableSettingsFeatureModule,
    ],
})
export class RootModule {}

<spy-table [config]="config" [tableId]="tableId">
    <spy-table-settings-feature spy-table-feature></spy-table-settings-feature>
</spy-table>
```

## Interfaces

Below you can find interfaces for the Table Feature Settings:

```ts
export interface TableSettingsConfig extends TableFeatureConfig {
    tableId?: string;
}
```
