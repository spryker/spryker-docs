---
title: Datasource Inline
description: This document provides details about the Datasource Inline service in the Components Library.
template: concept-topic-template
---

This document explains the Datasource Inline service in the Components Library.

## Overview

Datasource Inline is an Angular Service that allows passing data along with the configuration of the Datasource.

Check out an example usage of the Datasource Inline.

Service configuration:

- `type` - a datasource type.  
- `data` - a datasource data.  

```html
<spy-select
    [datasource]="{
        type: 'inline',
        data: ['Inline 1', 'Inline 2'],
    }"
>
</spy-select>
```

## Service registration

Register the service:

```ts
declare module '@spryker/datasource' {
    interface DatasourceRegistry {
        inline: DatasourceInlineService;
    }
}

@NgModule({
    imports: [
        DatasourceModule.withDatasources({
            inline: DatasourceInlineService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Datasource Inline:

```ts
export interface DatasourceInlineConfig extends DatasourceConfig {
    data: unknown;
}
```
