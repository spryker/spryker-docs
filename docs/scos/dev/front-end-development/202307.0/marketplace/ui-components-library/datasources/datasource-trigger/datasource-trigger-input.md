---
title: Datasource Trigger Input
description: This document provides details about the Datasource Trigger Input service in the Components Library.
template: concept-topic-template
related:
  - title: Datasource Dependable
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/datasources/datasource-dependable.html
  - title: Datasource Http
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/datasources/datasource-http.html
  - title: Datasource Inline Table
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/datasources/datasource-inline-table.html
  - title: Datasource Inline
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/datasources/datasource-inline.html
---

This document explains the Datasource Trigger Input service in the Components Library.

## Overview

Datasource Trigger Input is an Angular Service that extracts the value from the event trigger element and checks whether it meets certain criteria. If the value is valid, it emits an object containing the value.  

Check out an example usage of the Datasource Trigger Input.

Service configuration:

- `type` — a datasource type.  
- `event` — an event type triggered by element.  
- `debounce` - delays the emission of values the next datasource (default is `300ms`).  
- `minCharacters` - emits the trigger element value if the length is greater than or equal to the `minCharacters` property (default is `2`).  
- `datasource` — the next datasource that runs based on the depended element value (e.g. [http](/docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/datasources/datasource-http.html)).  

```html
<spy-select
    [datasource]="{
        type: 'trigger',
        event: 'input',
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

Register the service:

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
            input: InputDatasourceTriggerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Datasource Trigger Input:  

```ts
import { DatasourceTriggerConfig } from '@spryker/datasource.trigger';

export interface InputDatasourceTriggerConfig extends DatasourceTriggerConfig {
    minCharacters?: number;
}

export type InputDatasourceTriggerHTMLElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
```
