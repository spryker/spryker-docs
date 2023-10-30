---
title: Datasource Trigger
description: This document provides details about the Datasource Trigger service in the Components Library.
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

This document explains the Datasource Trigger service in the Components Library.

## Overview

Datasource Trigger is an Angular Service that provides a flexible way to fetch data based on events triggered by the user. 

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

The trigger element (in our example it's a `SelectComponent`) must implement a `DatasourceTriggerElement` abstract class (token) and return component instance using `getTriggerElement()` abstract method:   

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

## Main Service

The main module provides an opportunity to register any `datasource.trigger` by key via static method `withEvents()`. It assigns the object of datasources to the `DatasourceEventTypesToken` under the hood.

`resolve()` method gets the trigger element using the `DatasourceTriggerElement` abstract class (token)`, finds specific service from the `DatasourceEventTypesToken` by `config.event` (from the argument) and returns observable with data (based on the data returned from trigger element) by `Datasource.resolve()`.

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
