---
title: Table Column Type Extension
description: This document provides details about the Table Column Type extension in the Components Library.
template: concept-topic-template
---

This document explains the Table Column Type extension in the Components library.

## Overview

Column Type is an Angular Component that describes how a specific type of the column is rendered within a table column.

You can configure columns in the table config:

```html
<spy-table [config]="{
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
///// Module augmentation
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

/// Component Implementation
@Injectable({ providedIn: 'root' })
export class CustomTableColumnConfig {
  @ColumnTypeOption({
    type: ColumnTypeOptionsType.AnyOf,
    value: [String, Boolean],
  })
  customOption? = 'customOption';
}

@Component({
  ....
})
@TableColumnTypeComponent(TableColumnTextConfig)
export class CustomTableColumnComponent
  implements TableColumnComponent<CustomTableColumnConfig> {
  @Input() config?: CustomTableColumnConfig;
  @Input() context?: TableColumnContext;
}

@NgModule({
  ...,
  declarations: [CustomTableColumnComponent],
  exports: [CustomTableColumnComponent],
})
export class CustomTableColumnModule {}

/// Table Integration
@NgModule({
  imports: [
    CustomTableColumnModule,

    TableModule.withColumnComponents({
      custom: CustomTableColumnComponent,
    }),
  ],
})
export class RootModule
```

## Interfaces

Below you can find interfaces for the TableColumnComponent configuration.

```ts
export interface TableColumnComponent<C = any> {
  config?: C;
  context?: TableColumnContext;
}

export interface ColumnTypeOptions {
  /** Is it required */
  required?: boolean;
  /** Expected type. Specify exact type in {@link value} prop */
  type?: ColumnTypeOptionsType;
  /** Value type. See {@link ColumnTypeOptionsType} for more details.
   * May be recursive for some types */
  value?: unknown | ColumnTypeOptions;
}

export enum ColumnTypeOptionsType {
  /** Value will be compared with strict equality */
  Literal = 'literal',
  /** Value must be any Javascript type (String, Number, etc.)  */
  TypeOf = 'typeOf',
  /** Value will be compared with every array item. May be recursive */
  ArrayOf = 'arrayOf',
  /** Value must be an array of other types. May be recursive */
  AnyOf = 'anyOf',
}
```


## Table Column types

UI library comes with a number of standard column types that can be used on any project:

- [list](/docs/marketplace/dev/front-end/table-design/table-column-types/table-column-type-list.html)—renders a list of column types.
- [autocomplete](/docs/marketplace/dev/front-end/table-design/table-column-types/table-column-type-autocomplete.md)—renders `@spryker/input` and `@spryker/autocomplete` components.
- chip—renders `@spryker/chip` component.
- date—renders a formatted date by `config`.
- dynamic—is a higher-order column that gets `ColumnConfig` from the configured `Datasource` and renders a column with the retrieved `ColumnConfig`.
- image—renders an image.
- input—renders `@spryker/input`component.
- select—renders `@spryker/select`component.
- text—renders a static text.
