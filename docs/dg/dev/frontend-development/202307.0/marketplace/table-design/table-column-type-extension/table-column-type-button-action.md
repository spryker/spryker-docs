---
title: Table Column Type Button Action
description: This document provides details about the Table Column Type Button Action in the Components Library.
template: concept-topic-template
redirect_from:
- /docs/scos/dev/front-end-development/202307.0/marketplace/table-design/table-column-type-extension/table-column-type-button-action.html

last_updated: Jan 19, 2024
related:
  - title: Table Column Type extension
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-extension.html
  - title: Table Column Type Autocomplete
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-autocomplete.html
  - title: Table Column Type Chip
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-chip.html
  - title: Table Column Type Date
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-date.html
  - title: Table Column Type Dynamic
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-dynamic.html
  - title: Table Column Type Image
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-image.html
  - title: Table Column Type Input
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-input.html
  - title: Table Column Type List
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-list.html
  - title: Table Column Type Select
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-select.html
  - title: Table Column Type Text
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-text.html
---

Table Column Button Action is an Angular component in the components library that renders button using the `@spryker/button.action` component.


## Usage

Example of usage in the `@spryker/table` config:

```html
<spy-table
    [config]="{
        ...,
        columns: [
            ...,
            {
                id: 'columnId',
                title: 'Column Title',
                type: 'button-action',
                typeOptions: {
                    text: 'text',
                    action: {
                        type: 'http',
                        url: '/url',
                    },
                },
            },
            ...,
        ],
    }"
>
</spy-table>
```

## Component registration

Register the component:

```ts
declare module '@spryker/table' {
    interface TableColumnTypeRegistry {
        'button-action': TableColumnButtonActionConfig;
    }
}

@NgModule({
    imports: [
        TableModule.forRoot(),
        TableModule.withColumnComponents({
            'button-action': TableColumnButtonActionComponent,
        }),
        TableColumnButtonActionModule,
    ],
})
export class RootModule {}
```

## Interfaces

Table Column Button Action interfaces:

```ts
export type ButtonAttributes = Record<string, string>;
export type ActionType = RegistryType<ActionsRegistry>;

interface TableColumnButtonAction extends ActionConfig {
    type: ActionType;
    [k: string]: unknown;
}

interface TableColumnButtonActionConfig {
    /** Bound to the @spryker/button-action inputs */
    text?: string;
    action?: TableColumnButtonAction;
    actionContext?: unknown;
    variant?: ButtonVariant; // 'primary' - by default
    shape?: ButtonShape; // 'default' - by default
    size?: ButtonSize; // 'md' - by default
    attrs?: ButtonAttributes;
}
```
