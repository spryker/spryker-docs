---
title: Actions Confirmation
description: This document provides details about the Actions Confirmation service in the Components Library.
template: concept-topic-template
redirect_from:
- /docs/scos/dev/front-end-development/202311.0/marketplace/ui-components-library/actions/actions-confirmation.html

last_updated: Jan 17, 2024
related:
  - title: Actions
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/ui-components-library-actions.html
  - title: Actions Close Drawer
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/actions-close-drawer.html
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

Actions Confirmation is an angular Service in the components library that calls another action with a confirmation via the Modal component.


## Usage

Service configuration:

| ATTRIBUTE | DESCRIPTION |
| - | - |
| `type` | An action type. |
| `action` | Registered action configuration. |
| `modal` | Modal configuration based on the `ConfirmModalStrategyOptions` interface of the Modal component.  |


Usage example:

```html
<spy-button-action
    [action]="{
        type: 'confirmation',
        action: {
            type: 'redirect',
            url: '/url',
        },
        modal: {
            description: 'Redirect to /url',
        },
    }"
>
</spy-button-action>
```

## Service registration

Register the service:

```ts
declare module '@spryker/actions' {
    interface ActionsRegistry {
        confirmation: ConfirmationActionHandlerService,
    }
}

@NgModule({
    imports: [
        ActionsModule.withActions({
            confirmation: ConfirmationActionHandlerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Actions Confirmation interfaces:

```ts
export interface ConfirmationActionConfig extends ActionConfig {
    action: ActionConfig;
    modal?: ConfirmModalStrategyOptions;
}

export interface ConfirmModalStrategyOptions extends ConfirmModalData {}

export interface ConfirmModalData {
    title?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
    description?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
    icon?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
    okText?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
    okType?: string;
    okVariant?: ButtonVariant;
    okSize?: ButtonSize;
    cancelText?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
    cancelType?: string;
    cancelVariant?: ButtonVariant;
    cancelSize?: ButtonSize;
    class?: string;
}
```
