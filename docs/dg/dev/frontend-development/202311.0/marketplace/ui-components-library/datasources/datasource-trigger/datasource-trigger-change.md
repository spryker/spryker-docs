---
title: Datasource Trigger Change
description: This document provides details about the Datasource Trigger Change service in the Components Library.
template: concept-topic-template
redirect_from:
- /docs/scos/dev/front-end-development/202311.0/marketplace/ui-components-library/datasources/datasource-trigger/datasource-trigger-change.html

last_updated: Jan 16, 2024
related:
  - title: Datasource Dependable
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasource-dependable.html
  - title: Datasource Http
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasource-http.html
  - title: Datasource Inline Table
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasource-inline-table.html
  - title: Datasource Inline
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasource-inline.html
---

Datasource Trigger Change is an Angular service in the components library that extracts the value from an event trigger element and checks if it meets a certain criteria. If the value is valid, it emits an object containing the value.  

## Usage

Service configuration:

| ATTRIBUTE | DESCRIPTION |
| - | - |
|type |  A datasource type. |
|event |  An event type triggered by element. |
|debounce |  Delays the emission of values of the next datasource; by default, delays by `300ms`. |
|minCharacters |  Emits the trigger element value if the length is greater than or equal to the `minCharacters` property. The default value is `2`. |
|datasource |  the next datasource that runs based on the dependent element value, like [http](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/datasources/datasource-http.html). |


Usage example:


```html
<spy-select
    [datasource]="{
        type: 'trigger',
        event: 'change',
        debounce: 400,
        minCharacters: 3,
        datasource: {
            type: 'http',
            url: '/request-url',
        },
    }"
>
</spy-select>
```

## Service registration

Register the service

```ts
declare module '@spryker/datasource' {
    interface DatasourceRegistry {
        trigger: DatasourceTriggerService;
    }
}

@NgModule({
    imports: [
        DatasourceModule.withDatasources({
            trigger: DatasourceTriggerService,
        }),
        DatasourceTriggerModule.withEvents({
            change: ChangeDatasourceTriggerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Datasource Trigger Change interfaces:

```ts
import { DatasourceTriggerConfig } from '@spryker/datasource.trigger';

export interface ChangeDatasourceTriggerConfig extends DatasourceTriggerConfig {
    minCharacters?: number;
}

export type ChangeDatasourceTriggerHTMLElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
```
