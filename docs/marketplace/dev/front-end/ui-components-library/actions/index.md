---
title: Actions
description: This article provides details about the Actions service in the Components Library.
template: concept-topic-template
---

This article provides details about the Actions service in the Components Library.

## Overview

Actions responsible to handle specific actions that conform to special format within specific context (from Table, Overlay, Http Response, etc.) via Action Handlers.
This allows backend systems to control some aspects of UI without the need to change frontend at all (ex. update table, close drawer, etc.).

The context within which Actions are handled is defined by the invoker of the Action (Table, Button, Http, etc).

```html
<spy-button-action
  [action]="{ 
    type: 'close-drawer' 
  }"
>
  ...
</spy-button-action>
```

## Main Service

Actions is an Angular Service that implements a specific interface (`ActionHandler`) and is registered to the Action Module via `ActionModule.withActions()`. 
The main service injects all registered types from the `ActionTypesToken`.
Trigger method finds specific service from the `ActionTypesToken` by `config.type` (from the argument) and returns observable with data by `ActionHandler.handleAction`.

## Action Handler

Actions must implement a specific interface (`ActionHandler`) and then be registered to the Root Module via `ActionModule.withActions()`.
Action Handler encapsulates the algorithm of how the data is loaded into the Component.

```ts
// Module augmentation
import { ActionConfig } from '@spryker/actions';

declare module '@spryker/actions' {
  interface ActionsRegistry {
    custom: CustomActionHandlerService;
  }
}

export interface CustomActionConfig extends ActionConfig {
  data: unknown;
  ...;
}

// Service implementation
@Injectable({
  providedIn: 'root',
})
export class CustomActionHandlerService implements ActionHandler {
  trigger<C extends ActionConfig>(
      injector: Injector,
      config: C,
      context: InferActionContext<C['type']>,
    ): Observable<InferActionReturn<C['type']>> {
    ...
  }
}

@NgModule({
  imports: [
    ActionsModule.withActions({
      custom: CustomActionHandlerService,
    }),
  ],
})
export class RootModule {}
```

The context within which Actions operate is defined by the local injector where it’s being used.

## Interfaces

Below you can find interfaces for the Actions configuration and Action type:

```ts
export interface ActionConfig {
  type: ActionType;
  // Reserved for types that may have extra configuration
  [k: string]: unknown;
}

export interface ActionHandler<C = unknown, R = unknown>
  extends Generics<[C, R]> {
  handleAction(
    injector: Injector,
    config: ActionConfig,
    context: C,
  ): Observable<R>;
}
```

## Action types

There are a few common Actions that are available in UI library as separate packages:

- [drawer](/docs/marketplace/dev/front-end/ui-components-library/actions/actions-drawer.html) - opens component in the Drawer.
- [close-drawer](/docs/marketplace/dev/front-end/ui-components-library/actions/actions-close-drawer.html) - closes the first Drawer in the current context.
- [redirect](/docs/marketplace/dev/front-end/ui-components-library/actions/actions-redirect.html) - performs the hard redirect to the URL.
- [refresh-drawer](/docs/marketplace/dev/front-end/ui-components-library/actions/actions-refresh-drawer.html) - refreshes/rerenders opened Drawer in current context.
- [refresh-table](/docs/marketplace/dev/front-end/ui-components-library/actions/actions-refresh-table.html) - refreshes data of the Table in current context.
- [refresh-parent-table](/docs/marketplace/dev/front-end/ui-components-library/actions/actions-refresh-parent-table.html) - refreshes data of the parent Table of a Table in current context.

