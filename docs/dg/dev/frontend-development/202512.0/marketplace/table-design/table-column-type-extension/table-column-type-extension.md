---
title: Table Column Type extension
description: This document provides details about the Table Column Type extension in the Components Library.
template: concept-topic-template
last_updated: Jan 11, 2024
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/table-design/table-column-types/
  - /docs/scos/dev/front-end-development/202204.0/marketplace/table-design/table-column-type-extension/table-column-type-extension.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/table-design/table-column-type-extension/table-column-type-extension.html

related:
  - title: Table Column Type Autocomplete
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-autocomplete.html
  - title: Table Column Type Button Action
    link: docs/dg/dev/frontend-development/page.version/marketplace/table-design/table-column-type-extension/table-column-type-button-action.html
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

This document explains the Table Column Type extension in the Components library.

## Overview

Column Type is an Angular Component that describes how a specific type of the column is rendered within a table column.

Check out the following example to see how to configure columns in the table config:

```html
<spy-table
    [config]="{
        ...,
        columns: [
            ...
            {
                id: 'columnId',
                title: 'Column Title',
                type: 'COLUMN_TYPE',
                typeOptions: {
                    // ... COLUMN_TYPE Options
                },
            },
            ...
       ]
  }"
>
</spy-table>
```

## Main Services/Decorators/Components

Using the table module, any table column can be registered by key via the static method `TableModule.withColumnComponents()`.
It assigns the object of columns to the `TableColumnComponentsToken` under the hood.

### ColumnTypeOption decorator

By using the `ColumnTypeOption` decorator, properties of columns can be validated at runtime. The `ColumnTypeOptions` interface shows all the properties.

### TableColumnTypeComponent decorator

The `TableColumnTypeComponent` decorator merges the default config parameters from the argument with the dynamic config parameters from the table.

## TableColumnRendererComponent

The `TableColumnRendererComponent` is used by the table to render each column based on the configuration and data.

## Table Column

As an Angular Component, Table Column must implement specific interface (`TableColumnTypeComponent`) and be registered on the Table Module via its `TableModule.withColumnComponents()` method by passing a string that will be associated with it when rendering.

It is also necessary to create your own column module and add it to the RootModule.

```ts
// Module augmentation
import {
    ColumnTypeOption,
    TableColumnTypeComponent,
    TableColumnComponent,
    TableColumnContext,
} from '@spryker/table';

declare module '@spryker/table' {
    interface TableColumnTypeRegistry {
        custom: CustomTableColumnConfig;
    }
}

// Component implementation
@Injectable({ providedIn: 'root' })
export class CustomTableColumnConfig {
    @ColumnTypeOption({
        type: ColumnTypeOptionsType.AnyOf,
        value: [String, Boolean],
    })
    customOption? = 'customOption';
}

// Module
@NgModule({
    ...,
    declarations: [CustomTableColumnComponent],
    exports: [CustomTableColumnComponent],
})
export class CustomTableColumnModule {}

// Component
@Component({
    ...
})
@TableColumnTypeComponent(TableColumnTextConfig)
export class CustomTableColumnComponent
    implements TableColumnComponent<CustomTableColumnConfig> {
    @Input() config?: CustomTableColumnConfig;
    @Input() context?: TableColumnContext;
}

// Root module
@NgModule({
    imports: [
        TableModule.withColumnComponents({
            custom: CustomTableColumnComponent,
        }),
        CustomTableColumnModule,
    ],
})
export class RootModule {}
```

### Context interpolation

Check out an example of getting a Table Column config value from the context:

```ts
// Module
import { ContextModule } from '@spryker/utils';

@NgModule({
    imports: [CommonModule, ContextModule],
    exports: [CustomTableColumnModule],
    declarations: [CustomTableColumnModule],
})
export class CustomTableColumnModule {}

// Component
@Injectable({ providedIn: 'root' })
export class CustomTableColumnConfig {
    @ColumnTypeOption()
    propName? = this.contextService.wrap('displayValue');

    constructor(private contextService: ContextService) {}
}
```

```html
// Usage
<div
    [propName]="config.propName | context: context"
/>
```

## Interfaces

Below you can find interfaces for the Table Column Type extension configuration.

```ts
export interface TableColumnComponent<C = any> {
    config?: C;
    context?: TableColumnContext;
}

export interface ColumnTypeOptions {
    /** Is it required */
    REQUIRED: boolean;
    /** Expected type. Specify exact type in {@link value} prop */
    type?: ColumnTypeOptionsType;
    /** Value type. See {@link ColumnTypeOptionsType} for more details.
     * May be recursive for some types */
    value?: unknown | ColumnTypeOptions;
}

export enum ColumnTypeOptionsType {
    /** Value will be compared with strict equality */
    Literal = 'literal',
    /** Value must be any Javascript type (String, Number)  */
    TypeOf = 'typeOf',
    /** Value will be compared with every array item. May be recursive */
    ArrayOf = 'arrayOf',
    /** Value must be an array of other types. May be recursive */
    AnyOf = 'anyOf',
}
```

## Table Column types

UI library comes with a number of standard column types that can be used on any project:

- [Autocomplete](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-autocomplete.html) - renders `@spryker/input` and `@spryker/autocomplete` components.
- [Button-action](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-button-action.html) - renders `@spryker/button-action` component.
- [Chip](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-chip.html) - renders `@spryker/chip` component.
- [Date](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-date.html) - renders a formatted date by `config`.
- [Dynamic](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-dynamic.html) - is a higher-order column that gets `ColumnConfig` from the configured `Datasource` and renders a column with the retrieved `ColumnConfig`.
- [Image](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-image.html) - renders an image.
- [Input](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-input.html) - renders `@spryker/input` component.
- [List](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-list.html) - renders a list of column types.
- [Select](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-select.html) - renders `@spryker/select` component.
- [Text](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-text.html) - renders a static text.
