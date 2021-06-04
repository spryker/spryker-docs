---
title: { Table Column Type Extension }
description: { Meta description }
template: concept-topic-template
---

# Table Column Type Extension

This document provides details about the Table Column Type extension in the Components Library.

## Interfaces

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

## Overview

Column Type is essentially an Angular Component that encapsulates how specific type of the column is going to be rendered withing a table column.

You can configure columns in table config.

```ts
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

The table module provides an opportunity to register any table column by key via static method `TableModule.withColumnComponents()`. It assigns the object of columns to the `TableColumnComponentsToken` under the hood.

### ColumnTypeOption decorator

Allows to validate property in runtime. All properties is showed in the `ColumnTypeOptions` interface

### TableColumnTypeComponent decorator

Merges all default config parameters from argument with dynamic config parameters which come from table config

## TableColumnRendererComponent

Allows to insert data/config and context to the specific column type while config/data/context have been changed under the hood.

## Table Column

Table Column is an Angular Component that must implement specific interface (`TableColumnTypeComponent`) and be registered on the Table Module via `TableModule.withColumnComponents()` static method by giving it a string that will be associated with it when rendering table.

Also you have to create own filter module and add it to the RootModule

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

## Table Column Types

There are a bunch of standard Column Types that UI library ships with and may be used on the project

- list - renders list of column types
- autocomplete - renders `@spryker/input` and `@spryker/autocomplete` component
- chip - renders `@spryker/chip` component
- date - renders formatted date by `config`
- dynamic - is a higher-order column that gets `ColumnConfig` from the configured `Datasource` and renders a column with retrieved `ColumnConfig`
- image - renders image
- input - renders `@spryker/input`component
- select - renders `@spryker/select`component
- text - renders static text
