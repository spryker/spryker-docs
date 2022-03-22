---
title: Table Feature Title
description: This document provides details about the Table Feature Title component in the Components Library.
template: concept-topic-template
---

This document explains the Table Feature Title component in the Components Library.

## Overview

Table Feature Title is a feature of the Table Component that renders the title of the table.

Check out an example usage of the Table Feature Title in the `@spryker/table` config.

Component configuration:

- `enabled` - enables the feature via config.  
- `title` - a table title text.  

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
