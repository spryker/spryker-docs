---
title: Table Feature Title
description: This article provides details about the Table Feature Title component in the Components Library.
template: concept-topic-template
---

This article provides details about the Table Feature Title component in the Components Library.

## Overview

Table Feature Title is a feature of the Table Component that renders the title of the table.
See an example below, how to use the Title feature.

`enabled` - will enable feature via config.  
`title` - a table title text.

```html
<spy-table [config]="{
  dataSource: { ... },
  columns: [ ... ],
  title: {
    enabled: true,
    title: 'Table title',
  },                                                                                           
}">
</spy-table>
```

## Interfaces

Below you can find interfaces for Table Feature Title.

```ts
export interface TableTitleConfig extends TableFeatureConfig {
  title?: string;
}

// Component registration
@NgModule({
  imports: [
    TableModule.forRoot(),
    TableModule.withFeatures({
      title: () =>
        import('./table-title-feature.module').then(
          (m) => m.TableTitleFeatureModule,
        ),    
    }),
  ],
})
export class RootModule {}
```
