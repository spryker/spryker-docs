---
title: Datasource Trigger
description: Details about the Datasource Trigger service in the components library.
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

This document describes the Datasource Trigger service in the components library.

## Overview

Datasource Trigger is an Angular service that provides a flexible way to fetch data based on user-triggered events.

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

The trigger element, `SelectComponent` in the example, must implement a `DatasourceTriggerElement` abstract class (token) and return a component instance using the `getTriggerElement()` abstract method:   

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

The `resolve()` method gets the trigger element using the `DatasourceTriggerElement` abstract class (token), finds a specific service from `DatasourceEventTypesToken` by `config.event` (from the argument) and returns observable with data (based on the data returned from trigger element) by `Datasource.resolve()`.

## Datasource

Datasource Trigger must implement a specific interface (DatasourceTriggerEvent) and then be registered to the Root Module via `DatasourceModule.withEvents()`.

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

The context within which Datasources operate is defined by the local injector where it’s being used.

## Interfaces

Below you can find interfaces for the Datasource Trigger configuration and types:  

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

## Datasource types

There are a few common Datasources that are available in UI library as separate packages:  

- [Change](/docs/scos/dev/front-end-development/{{page.version}}/marketplace/ui-components-library/datasources/datasource-trigger/datasource-trigger-change.html) — allows passing data along with the configuration of the Datasource using `change` event.
- [Input](/docs/scos/dev/front-end-development/{{page.version}}/marketplace/ui-components-library/datasources/datasource-trigger/datasource-trigger-input.html) — allows passing data along with the configuration of the Datasource using `input` event.
