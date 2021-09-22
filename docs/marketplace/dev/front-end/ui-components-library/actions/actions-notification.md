---
title: Actions Notification
description: This article provides details about the Actions Notification service in the Components Library.
template: concept-topic-template
---

Actions Notification is an Angular Service that renders notification box.
See an example below, how to use the Actions Notification service.

`type` - an action type.  
`notifications` - an array with notifications configuration based on the Notification component.  

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

Below you can find interfaces for Actions Notification.

```ts
export interface NotificationActionConfig extends ActionConfig {
  notifications: NotificationData[];
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
