---
title: Datasource Trigger Input
description: Details about the Datasource Trigger Input service in the components library.
template: concept-topic-template
redirect_from:
- /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/datasources/datasource-trigger/datasource-trigger-input.html

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

Datasource Trigger Input is an Angular service in the components library that extracts the value from an event trigger element and checks if it meets a certain criteria. If the value is valid, it emits an object containing the value.

## Usage

Service configuration:

| ATTRIBUTE | DESCRIPTION |
| - | - |
| type | A datasource type.  |
| event | An event type triggered by element.  |
|debounce |  Delays the emission of values of the next datasource; by default, delays by `300ms`. |
|minCharacters |  Emits the trigger element value if the length is greater than or equal to the `minCharacters` property. The default value is `2`. |
| datasource | The next datasource that runs based on the depended element value (e.g. [http](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/datasources/datasource-http.html).  |

Usage example:

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

Interfaces for Datasource Trigger Input:  

```ts
import { DatasourceTriggerConfig } from '@spryker/datasource.trigger';

export interface InputDatasourceTriggerConfig extends DatasourceTriggerConfig {
    minCharacters?: number;
}

export type InputDatasourceTriggerHTMLElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
```
