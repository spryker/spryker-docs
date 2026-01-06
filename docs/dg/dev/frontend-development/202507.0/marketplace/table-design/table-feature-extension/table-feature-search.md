---
title: Table Feature Search
last_updated: Oct 21, 2022
description: This document provides details about the Table Feature Search component in the Components Library.
template: concept-topic-template
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/table-features/table-feature-search.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/table-design/table-feature-extension/table-feature-search.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/table-design/table-feature-extension/table-feature-search.html

related:
  - title: Table Feature extension
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-feature-extension/table-feature-extension.html
  - title: Table Feature Batch Actions
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-feature-extension/table-feature-batch-actions.html
  - title: Table Feature Editable
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-feature-extension/table-feature-editable.html
  - title: Table Feature Pagination
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-feature-extension/table-feature-pagination.html
  - title: Table Feature Row Actions
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-feature-extension/table-feature-row-actions.html
  - title: Table Feature Selectable
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-feature-extension/table-feature-selectable.html
  - title: Table Feature Settings
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-feature-extension/table-feature-settings.html
  - title: Table Feature Sync State
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-feature-extension/table-feature-sync-state.html
  - title: Table Feature Title
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-feature-extension/table-feature-title.html
  - title: Table Feature Total
    link: docs/dg/dev/frontend-development/latest/marketplace/table-design/table-feature-extension/table-feature-total.html
---

This document explains the *Table Feature Search* component in the Components Library.

## Overview

Table Feature Search is a feature of the Table Component that lets you search within the data set.

Check out an example usage of the Table Feature Search in the `@spryker/table` config.

Component configuration:

- `enabled`—enables the feature via config.
- `placeholder`—the search placeholder text.
- `forceAlwaysVisible`—makes the feature always visible regardless of data (`true` by default).

```html
<spy-table
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        search: {
            enabled: true,
            placeholder: 'Search',
            forceAlwaysVisible: false,
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
        search?: TableSearchConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withFeatures({
            search: () =>
                import('@spryker/table.feature.search').then(
                    (m) => m.TableSearchFeatureModule,
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
        TableSearchFeatureModule,
    ],
})
export class RootModule {}

<spy-table [config]="config">
    <spy-table-search-feature spy-table-feature></spy-table-search-feature>
</spy-table>
```

## Interfaces

The following example represents interfaces for the Table Feature Search:

```ts
export interface TableSearchConfig extends TableFeatureConfig {
    placeholder?: string;
    forceAlwaysVisible?: boolean;
}
```
