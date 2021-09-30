---
title: Table Column Type Input
description: This document provides details about the Table Column Type Input in the Components Library.
template: concept-topic-template
---

This document explains the Table Column Type Input in the Components library.

## Overview

Table Column Input is an Angular Component that renders a field using the `@spryker/input` component.

Check out an example usage of the Table Column Input in the `@spryker/table` config:

```html
<spy-table [config]="{
    ...,
    columns: [
      ...
      {
        id: 'columnId',
        title: 'Column Title',
        type: 'input',
        typeOptions: {
          type: 'number',
          attrs: {
            step: 0.05,
          },
        },
      },
      ...
    ]
  }"
>
</spy-table>
```

## Interfaces

Below you can find an interface for the Table Column Input type:

```ts
interface TableColumnInputConfig {
    /** Bound to the @spryker/input inputs */
    type: string; // 'text' - by default
    value?: any;
    placeholder: string;
    prefix?: string;
    suffix?: string;
    outerPrefix?: string;
    outerSuffix?: string;
    attrs?: Record<string, string>;
    /** Bound to the @spryker/form-item input */
    editableError?: string | boolean;
}
```
