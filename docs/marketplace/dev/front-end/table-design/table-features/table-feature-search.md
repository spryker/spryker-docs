---
title: Table Feature Search
description: This document provides details about the Table Feature Search component in the Components Library.
template: concept-topic-template
---

This document explains the Table Feature Search component in the Components Library.

## Overview

Table Feature Search is a feature of the Table Component that allows searching within the data set.

Check out an example usage of the Table Feature Search in the `@spryker/table` config.

Component configuration:

- `enabled` - enables the feature via config.  
- `placeholder` - the search placeholder text.

```html
<spy-table 
    [config]="{
        dataSource: { ... },
        columns: [ ... ],
        search: {
            enabled: true,
            placeholder: 'Search',
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

Below you can find interfaces for the Table Feature Search:

```ts
export interface TableSearchConfig extends TableFeatureConfig {
    placeholder?: string;
}
```
