---
title: Actions Notification
description: This article provides details about the Actions Notification service in the Components Library.
template: concept-topic-template
---

This article provides details about the Actions Notification service in the Components Library.

## Overview

Actions Notification is an Angular Service that renders notification box.
Check out this example below to see how to use Actions Notification service.

- `type` - an action type.  
- `notifications` - an array with notifications configuration based on the Notification component.  

```html
<spy-button-action
  [action]="{
    type: 'notification',
    notifications: [
      {
        type: 'info',
        title': 'Notification title',
        description: 'Notification description',
        closeable: true,
      },
    ],
  }"
>
  ...
</spy-button-action>
```

## Interfaces

Below you can find interfaces for the Actions Notification.

```ts
export interface NotificationActionConfig extends ActionConfig {
  notifications: NotificationData[];
}

export interface NotificationData extends NotificationConfig {
  type?: NotificationType;
  title: string | TemplateRef<NotificationContext>;
  description?: string | TemplateRef<NotificationContext>;
  closeable?: boolean;
}

export enum NotificationType {
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

// Service registration
@NgModule({
  imports: [
    ActionsModule.withActions({
      notification: NotificationActionHandlerService,
    }),
  ],
})
export class RootModule {}
```
