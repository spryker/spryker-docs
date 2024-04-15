---
title: Datasource Inline
description: This document provides details about the Datasource Inline service in the Components Library.
template: concept-topic-template
last_updated: Jan 12, 2024
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/datasources/datasource-inline.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/datasources/datasource-inline.html
  - /docs/scos/dev/front-end-development/202311.0/marketplace/ui-components-library/datasources/datasource-inline.html

related:
  - title: Datasources
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasources.html
  - title: Datasource Http
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasource-http.html
  - title: Datasource Inline Table
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasource-inline-table.html
---


Datasource Inline is an Angular service in the components library that allows for passing data along with the configuration of the Datasource.

## Usage

Service configuration:

| ATTRIBUTE | DESCRIPTION |
| - | - |
| `type` | A datasource type.  |
| `data` | Datasource data.  |

Usage example:

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

Datasource Inline interfaces:

```ts
export interface DatasourceInlineConfig extends DatasourceConfig {
    data: unknown;
}
```
