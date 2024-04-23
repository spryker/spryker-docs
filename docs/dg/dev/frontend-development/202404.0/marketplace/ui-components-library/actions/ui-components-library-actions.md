---
title: "UI components library: Actions"
description: This document provides details about the Actions service in the Components Library.
template: concept-topic-template
last_updated: Jan 17, 2024
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/actions/
  - /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/actions/ui-components-library-actions.html

related:
  - title: Actions Close Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-close-drawer.html
  - title: Actions Confirmation
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-confirmation.html
  - title: Actions Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-drawer.html
  - title: Actions HTTP
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-http.html
  - title: Actions Notification
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-notification.html
  - title: Actions Redirect
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-redirect.html
  - title: Actions Refresh Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-refresh-drawer.html
  - title: Actions Refresh Parent Table
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-refresh-parent-table.html
  - title: Actions Refresh Table
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-refresh-table.html
---

This document explains the Actions service in the Components Library.

## Overview

Using Action Handlers, the Actions service handles specific actions based on a specific format within a specific context (such as a Table, Overlay, HTTP Response).
As a result, the backend can control what the UI looks like without changing anything on the frontend (for example, updating tables, closing drawers).

The context within which Actions are handled is defined by the invoker of the Action (Table, Button, Http).

```html
<spy-button-action
    [action]="{
        type: 'close-drawer'
    }"
>
</spy-button-action>
```

## Main Service

Actions is an Angular Service that implements a specific interface (`ActionHandler`) and is registered in the Action Module via `ActionModule.withActions()`.
The main service injects all registered types from the `ActionTypesToken`.
`trigger()` method finds specific service from the `ActionTypesToken` by the `config.type` (from the argument) and returns observable with data by `ActionHandler.handleAction()`.

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
    ...
}

// Service implementation
@Injectable({
    providedIn: 'root',
})
export class CustomActionHandlerService implements ActionHandler<unknown, void> {
    handleAction(
        injector: Injector,
        config: CustomActionConfig,
        context: unknown,
    ): Observable<void> {
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

The following common Actions are available in UI library as separate packages:

| ACTION | DESCRIPTION |

| [Close-drawer](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/actions/actions-close-drawer.html)  | Closes the first Drawer in the current context.|
| [Confirmation](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/actions/actions-confirmation.html)  | Calls another registered action with a confirmation.|
| [Drawer](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/actions/actions-drawer.html)  | Opens a component in the Drawer.|
| [HTTP](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/actions/actions-http.html)  | Renders content via an HTML request.|
| [Notification](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/actions/actions-notification.html)  | Renders a notification box.|
| [Redirect](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/actions/actions-redirect.html) |  Performs a hard redirect to the URL.  |
| [Refresh-drawer](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/actions/actions-refresh-drawer.html)  | Refreshes or rerenders an opened Drawer in the current context.  |
| [Refresh-parent-table](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/actions/actions-refresh-parent-table.html) | Refreshes the data of the parent Table of a Table the in current context. |
| [Refresh-table](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/ui-components-library/actions/actions-refresh-table.html) |  Refreshes the data of the Table the in the current context.  |
