---
title: Datasource Trigger Change
description: This document provides details about the Datasource Trigger Change service in the Components Library.
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

This document explains the Datasource Trigger Change service in the Components Library.

## Overview

Datasource Trigger Change is an Angular service that extracts the value from an event trigger element and checks whether it meets a certain criteria. If the value is valid, it emits an object containing the value.  

Check out an example usage of the Datasource Trigger Change.

Service configuration:

| ATTRIBUTE | DESCRIPTION |
| - | - |
|type |  A datasource type. |
|event |  An event type triggered by element. |
|debounce |  Delays the emission of values the next datasource (default is `300ms`). |
|minCharacters |  Emits the trigger element value if the length is greater than or equal to the `minCharacters` property. The default value is `2`. |
|datasource |  the next datasource that runs based on the dependent element value, like [http](/docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/datasources/datasource-http.html). |

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
            change: ChangeDatasourceTriggerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Datasource Trigger Change:  

```ts
import { DatasourceTriggerConfig } from '@spryker/datasource.trigger';

export interface ChangeDatasourceTriggerConfig extends DatasourceTriggerConfig {
    minCharacters?: number;
}

export type ChangeDatasourceTriggerHTMLElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
```
