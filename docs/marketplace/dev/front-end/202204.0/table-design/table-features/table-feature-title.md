---
title: Table Feature Title
description: This document provides details about the Table Feature Title component in the Components Library.
template: concept-topic-template
related:
  - title: Table Feature extension
    link: docs/marketplace/dev/front-end/page.version/table-design/table-features/index.html
  - title: Table Feature Batch Actions
    link: docs/marketplace/dev/front-end/page.version/table-design/table-features/table-feature-batch-actions.html
  - title: Table Feature Editable
    link: docs/marketplace/dev/front-end/page.version/table-design/table-features/table-feature-editable.html
  - title: Table Feature Pagination
    link: docs/marketplace/dev/front-end/page.version/table-design/table-features/table-feature-pagination.html
  - title: Table Feature Row Actions
    link: docs/marketplace/dev/front-end/page.version/table-design/table-features/table-feature-row-actions.html
  - title: Table Feature Search
    link: docs/marketplace/dev/front-end/page.version/table-design/table-features/table-feature-search.html
  - title: Table Feature Selectable
    link: docs/marketplace/dev/front-end/page.version/table-design/table-features/table-feature-selectable.html
  - title: Table Feature Settings
    link: docs/marketplace/dev/front-end/page.version/table-design/table-features/table-feature-settings.html
  - title: Table Feature Sync State
    link: docs/marketplace/dev/front-end/page.version/table-design/table-features/table-feature-sync-state.html
  - title: Table Feature Total
    link: docs/marketplace/dev/front-end/page.version/table-design/table-features/table-feature-total.html
---

This document explains the Table Feature Title component in the Components Library.

## Overview

Table Feature Title is a feature of the Table Component that renders the title of the table.

Check out an example usage of the Table Feature Title in the `@spryker/table` config.

Component configuration:

- `enabled`—enables the feature via config.  
- `title`—a table title text.  

```html
<spy-table
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        title: {
            enabled: true,
            title: 'Table title',
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
        title?: TableTitleConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withFeatures({
            title: () =>
                import('@spryker/table.feature.title').then(
                    (m) => m.TableTitleFeatureModule,
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
        TableTitleFeatureModule,
    ],
})
export class RootModule {}

<spy-table [config]="config">
    <spy-table-title-feature spy-table-feature></spy-table-title-feature>
</spy-table>
```

## Interfaces

Below you can find interfaces for the Table Feature Title:

```ts
export interface TableTitleConfig extends TableFeatureConfig {
    title?: string;
}
```
