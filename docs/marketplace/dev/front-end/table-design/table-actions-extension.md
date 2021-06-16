---
title: Table Actions extension
description: This document provides details about the Table Actions extension in the Component Library.
template: concept-topic-template
---

This document provides details about the Table Actions extension in the Component Library.

## Overview

The table has the ability to trigger an action - it’s an abstract operation that is configured in the Table Configuration and may be triggered by different means (Row Actions Feature / Batch Actions Feature).

You can configure any action in the table config.

```ts
<spy-table [config]="{
    ...,
    rowActions: {
      ...,
      actions: [
        {
          type: ACTION_TYPE_NAME,
          typeOptions: {
            ...action specific configuratiion...
          },
        }
      ]
    },
    batchActions: {
      ...,
      actions: [
        {
          type: ACTION_TYPE_NAME,
          typeOptions: {
            ...action specific configuratiion...
          },
        }
      ]
    }
  }"
>
</spy-table>
```

## Main Service

Table module provides a way to register any table action by key via a static method withActions. 
Under the hood, it assigns the object of actions to TableActionsToken.

The main service injects all registered types from the TableActionsToken and Injector.

Trigger method finds a specific action service from the TableActionsToken by TableActionTriggeredEvent.action.type(from the argument), integrates it into Angular by Injector and returns data by TableActionHandler.handleAction. 

If the Table Component requires one-time specific actions, then the Table Action Handlers are not required; in this case, an event listener is sufficient to handle the specific action. 

An event will be triggered on the Table Component if no Table Actions Handler is registered.

## Table Action

Table Actions Handler is an Angular Service that contains the logic for a specific action and is registered on the Table.

Table Actions Handler implements a specific interface (TableActionHandler) and is registered to the Table Module via the static method TableModule.withActions()

```ts
///// Module augmentation
import { TableActionBase } from '@spryker/table';

declare module '@spryker/datasource' {
  interface TableActionRegistry {
    'custom': CustomTableAction;
  }
}

export interface CustomTableAction extends TableActionBase {
  typeOptions: {
    ...
  }
}

//// Services implementation
import { TableActionHandler, TableActionTriggeredEvent } from '@spryker/table';

@Injectable({
  providedIn: 'root',
})
export class CustomTableActionService implements TableActionHandler {
  handleAction(
    actionEvent: TableActionTriggeredEvent<CustomTableAction>,
    injector: Injector,
  ): Observable<unknown> {
    ....
  }
}

@NgModule({
  imports: [
    TableModule.withActions({
      custom: CustomTableActionService,
    }),
  ],
})
export class RootModule
```

The Table Actions Handlers provide global generic handling for a Table.

## Interfaces

Below, you can find interfaces for the Table Actions extension configuration:

```ts
export interface TableActionBase {
  id: string;
  type: TableActionType;
  typeOptions?: unknown;
}

export interface TableActionTriggeredEvent<
  A extends TableActionBase = TableActionBase
> {
  action: A;
  items: TableDataRow[];
}

export interface TableActionHandler<
  A extends TableActionBase = TableActionBase
> {
  handleAction(
    actionEvent: TableActionTriggeredEvent<A>,
    injector: Injector,
  ): Observable<unknown>;
}
```

## Table Action types

The following Table Action Handlers are already compiled and distributed with the UI library and can be used in the project:

- Form Overlay - renders dynamic HTML in an Overlay received by HTTP response that will be handled by Ajax on the front-end and then rendered again.
- HTML Overlay - renders any dynamic HTML received from an HTTP response in an Overlay 
- Url - allows sending an HTTP request via HTTP

All of the above Table Action Handlers use Ajax Post Action services to handle responses, which allows them to perform various tasks from the response (close overlays, refresh tables, etc.).