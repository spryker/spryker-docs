---
title: Actions Notification
description: This document provides details about the Actions Notification service in the Components Library.
template: concept-topic-template
related:
  - title: Actions
    link: docs/marketplace/dev/front-end/page.version/ui-components-library/actions/index.html
  - title: Actions Close Drawer
    link: docs/marketplace/dev/front-end/page.version/ui-components-library/actions/actions-close-drawer.html
  - title: Actions Drawer
    link: docs/marketplace/dev/front-end/page.version/ui-components-library/actions/actions-drawer.html
  - title: Actions HTTP
    link: docs/marketplace/dev/front-end/page.version/ui-components-library/actions/actions-http.html
  - title: Actions Redirect
    link: docs/marketplace/dev/front-end/page.version/ui-components-library/actions/actions-redirect.html
  - title: Actions Refresh Drawer
    link: docs/marketplace/dev/front-end/page.version/ui-components-library/actions/actions-refresh-drawer.html
  - title: Actions Refresh Parent Table
    link: docs/marketplace/dev/front-end/page.version/ui-components-library/actions/actions-refresh-parent-table.html
  - title: Actions Refresh Table
    link: docs/marketplace/dev/front-end/page.version/ui-components-library/actions/actions-refresh-table.html

---

This document explains the Actions Notification service in the Components Library.

## Overview

Actions Notification is an Angular Service that renders notification box.

Check out an example usage of the Actions Notification.

Service configuration:

- `type`—an action type.  
- `notifications`—an array with notifications configuration based on the Notification component.  

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
</spy-button-action>
```

## Service registration

Register the service:

```ts
declare module '@spryker/actions' {
    interface ActionsRegistry {
        notification: NotificationActionHandlerService;
    }
}

@NgModule({
    imports: [
        ActionsModule.withActions({
            notification: NotificationActionHandlerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Actions Notification:

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
```
