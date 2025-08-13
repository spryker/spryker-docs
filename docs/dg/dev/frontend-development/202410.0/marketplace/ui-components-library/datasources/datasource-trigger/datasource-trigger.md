---
title: Datasource Trigger
description: Details about the Datasource Trigger service in the components library.
template: concept-topic-template
redirect_from:
- /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/datasources/datasource-trigger/datasource-trigger.html

last_updated: Jan 12, 2024
related:
  - title: Datasource Dependable
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/datasources/datasource-dependable.html
  - title: Datasource Http
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/datasources/datasource-http.html
  - title: Datasource Inline Table
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/datasources/datasource-inline-table.html
  - title: Datasource Inline
    link: docs/dg/dev/frontend-development/latest/marketplace/ui-components-library/datasources/datasource-inline.html
---

Datasource Trigger is an Angular service in the components library that provides a flexible way to fetch data based on user-triggered events.

```html
<spy-select
    [datasource]="{
        type: 'trigger',
        event: 'change',
        datasource: {
            type: 'http',
            url: '/request-url',
        },
    }"
>
</spy-select>
```

The trigger element, being `SelectComponent` in the example, must implement a `DatasourceTriggerElement` abstract class (token) and return a component instance using the `getTriggerElement()` abstract method:

```ts
@Component({
    ...,
    providers: [
        {
            provide: DatasourceTriggerElement,
            useExisting: SelectComponent,
        },
    ],
})
export class SelectComponent implements DatasourceTriggerElement {
    ...
    getTriggerElement(): Observable<HTMLElement> {
        // This method must return an Observable of the component instance.
    }
    ...
}
```

## Main service

The main module lets you register any `datasource.trigger` by key using the `withEvents()` static method. It assigns the object of datasources to `DatasourceEventTypesToken` under the hood.

The `resolve()` method does the following:
1. Gets the trigger element using the `DatasourceTriggerElement` abstract class (token).
2. Locates a specific service from `DatasourceEventTypesToken` by an argument from `config.event`.
3. Based on the data returned from a trigger element, returns an observable with data by `Datasource.resolve()`.

## Datasource

Datasource trigger must implement a specific interface (DatasourceTriggerEvent) and be registered to the root module using `DatasourceModule.withEvents()`.

```ts
// Module augmentation
import { DatasourceConfig } from '@spryker/datasource';

declare module '@spryker/datasource' {
    interface DatasourceRegistry {
        trigger: DatasourceTriggerService;
    }
}

export interface CustomDatasourceTriggerConfig extends DatasourceTriggerConfig {
    ...
}

// Service implementation
@Injectable({
    providedIn: 'root',
})
export class CustomDatasourceTriggerService implements DatasourceTriggerEvent {
    subscribeToEvent(
        config: CustomDatasourceTriggerConfig,
        triggerElement: HTMLElement,
    ): Observable<Record<string, unknown>> {
        ...
    }
}

@NgModule({
    imports: [
        DatasourceModule.withDatasources({
            trigger: DatasourceTriggerService,
        }),
        DatasourceTriggerModule.withEvents({
            custom: CustomDatasourceTriggerService,
        }),
    ],
})
export class RootModule {}
```

The context within which Datasources operate is defined by the local injector where it's being used.

## Interfaces

Interfaces and types for the Datasource Trigger configuration:

```ts
export interface DatasourceTriggerEventRegistry {}

export type DatasourceTriggerEventRegistryType = RegistryType<DatasourceTriggerEventRegistry>;

export type DatasourceTriggerEventDeclaration = RegistryDeclaration<DatasourceTriggerEventRegistry>;

export interface DatasourceTriggerConfig extends DatasourceConfig {
    event: DatasourceTriggerEventRegistryType | string;
    datasource: DatasourceConfig;
    debounce?: number;
}

export interface DatasourceTriggerEvent {
    subscribeToEvent(config, triggerElement): Observable<unknown>;
}

export abstract class DatasourceTriggerElement {
    abstract getTriggerElement(): Observable<HTMLElement>;
}
```

## Available Datasources

The following common Datasources are available in the UI library as separate packages:  

| DATASOURCE | DESCRIPTION |
|-|-|
| [Change](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/datasources/datasource-trigger/datasource-trigger-change.html) | Allows for passing data along with the configuration of the Datasource using the `change` event. |
| [Input](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/datasources/datasource-trigger/datasource-trigger-input.html) | Allows for passing data along with the configuration of the Datasource using the `input` event. |
