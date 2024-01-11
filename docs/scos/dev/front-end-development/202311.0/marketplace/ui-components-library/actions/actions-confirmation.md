---
title: Actions Confirmation
description: This document provides details about the Actions Confirmation service in the Components Library.
template: concept-topic-template
related:
  - title: Actions
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/ui-components-library-actions.html
  - title: Actions Close Drawer
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-close-drawer.html
  - title: Actions Drawer
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-drawer.html
  - title: Actions HTTP
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-http.html
  - title: Actions Notification
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-notification.html
  - title: Actions Redirect
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-redirect.html
  - title: Actions Refresh Drawer
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-refresh-drawer.html
  - title: Actions Refresh Parent Table
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-refresh-parent-table.html
  - title: Actions Refresh Table
    link: docs/scos/dev/front-end-development/page.version/marketplace/ui-components-library/actions/actions-refresh-table.html

---

This document explains the Actions Confirmation service in the Components Library.

## Overview

Actions Confirmation is an Angular Service that calls another action with confirmation via the Modal component.

Check out an example usage of the Actions Confirmation.

Service configuration:

- `type`—an action type.
- `action`—registered action configuration.
- `modal`—modal configuration based on the `ConfirmModalStrategyOptions` interface of the Modal component.  

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

Below you can find interfaces for the Actions Confirmation:

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
