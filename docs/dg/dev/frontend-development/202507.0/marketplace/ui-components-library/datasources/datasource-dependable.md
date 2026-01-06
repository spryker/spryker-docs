---
title: Datasource Dependable
description: Details about the Datasource Dependable service in the components library.
template: concept-topic-template
redirect_from:
- /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/datasources/datasource-dependable.html

last_updated: Jan 16, 2024
related:
  - title: Datasource Trigger
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/datasources/datasource-trigger/datasource-trigger.html
  - title: Datasource Http
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/datasources/datasource-http.html
  - title: Datasource Inline Table
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/datasources/datasource-inline-table.html
  - title: Datasource Inline
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/datasources/datasource-inline.html
---


Datasource Dependable is an Angular service in the components library that resolves datasources for a component based on the value of a specific element.

## Usage

Service configuration:

| ATTRIBUTE | DESCRIPTION |
| - | - |
| type | A datasource type.  |
| id | An ID of the dependent element. |
| datasource | The next datasource that runs based on the depended element value, like [http](/docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/datasources/datasource-http.html). |  

Usage example:

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

The dependent element, being `SelectComponent` in the example, must implement a `DatasourceDependableElement` abstract class (token) and return a component value using the  `getValueChanges()` abstract method:

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

## Datasource Dependable interfaces

Datasource Dependable interfaces:

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
