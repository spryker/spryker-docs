---
title: Datasource Dependable
description: This document provides details about the Datasource Dependable service in the Components Library.
template: concept-topic-template
related:
  - title: Datasource Trigger
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/datasources/datasource-trigger.html
  - title: Datasource Http
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/datasources/datasource-http.html
  - title: Datasource Inline Table
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/datasources/datasource-inline-table.html
  - title: Datasource Inline
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/datasources/datasource-inline.html
---

This document explains the Datasource Dependable service in the Components Library.

## Overview

Datasource Dependable is an Angular Service that resolves datasources for a component based on the value of a specific element. 

Check out an example usage of the Datasource Dependable.

Service configuration:

- `type` — a datasource type.  
- `id` — an ID of the depended element.  
- `datasource` — the next datasource that runs based on the depended element value (e.g. [http](/docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/datasources/datasource-http.html)).  

```html
<spy-datasource-dependable id="dependable-select">
    <spy-select
        [options]="{ ... }"
    >
    </spy-select>
</spy-datasource-dependable>

<spy-select
    [datasource]="{
        type: 'dependable-element',
        id: 'dependable-select',
        datasource: {
            type: 'http',
            url: '/request-url',
        },
    }"
>
</spy-select>
```

The depended element (in our example it's a `SelectComponent`) must implement a `DatasourceDependableElement` abstract class (token) and return component value using `getValueChanges()` abstract method:   

```ts
@Component({
    ...,
    providers: [
        {
            provide: DatasourceDependableElement,
            useExisting: SelectComponent,
        },
    ],
})
export class SelectComponent implements DatasourceDependableElement {
    ...
    getValueChanges(): Observable<SelectValueSelected> {
        // This method must return an Observable of the component value.
    }
    ...
}
```

## Service registration

Register the service:

```ts
declare module '@spryker/datasource' {
    interface DatasourceRegistry {
        'dependable-element': DatasourceDependableService;
    }
}

@NgModule({
    imports: [
        DatasourceModule.withDatasources({
            'dependable-element': DatasourceDependableService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Datasource Dependable:

```ts
import { DatasourceConfig } from '@spryker/datasource';
import { Observable } from 'rxjs';

export interface DatasourceDependableConfig extends DatasourceConfig {
    id: string;
    datasource: DatasourceConfig;
}

export interface DatasourceDependableElementsConfig {
    [id: string]: DatasourceDependableElement;
}

export abstract class DatasourceDependableElement {
    abstract getValueChanges(): Observable<unknown>;
}
```
