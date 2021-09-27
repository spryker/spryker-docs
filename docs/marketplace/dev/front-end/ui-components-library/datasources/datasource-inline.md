---
title: Datasource Inline
description: This article provides details about the Datasource Inline service in the Components Library.
template: concept-topic-template
---

This article provides details about the Datasource Inline service in the Components Library.

## Overview

Datasource Inline is an Angular Service that allows passing data along with the configuration of the Datasource.
Check out this example below to see how to use the Datasource Inline service.

- `type` - a datasource type.  
- `data` - a datasource data.  

```html
<spy-select
  [datasource]="{
    type: 'inline',
    data: ['Inline 1', 'Inline 2'],
  }"
></spy-select>
```

## Interfaces

Below you can find interfaces for Datasource Inline service.

```ts
export interface DatasourceInlineConfig extends DatasourceConfig {
  data: unknown;
}

// Component registration
@NgModule({
  imports: [
    DatasourceModule.withDatasources({
      inline: DatasourceInlineService,
    }),
  ],
})
export class RootModule {}
```
