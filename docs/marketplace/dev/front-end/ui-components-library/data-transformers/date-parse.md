---
title: Data Transformer Date-parse
description: This document provides details about the Data Transformer Date-parse service in the Components Library.
template: concept-topic-template
---

This document explains the Data Transformer Date-parse service in the Components Library.

## Overview

Data Transformer Date-parse is an Angular Service that parses the string value as a Date ISO into the JS Date Object.

In the following example, the `datasource` transforms the `date` string into the parsed `date` object.

```html
<spy-select
    [datasource]="{
        type: 'inline',
        data: '2020-09-24T15:20:08+02:00',
        transform: {
            type: 'date-parse'
        },
    }"
>
</spy-select>
```

## Service registration

Register the service:

```ts
declare module '@spryker/data-transformer' {
    interface DataTransformerRegistry {
        'date-parse': DateParseDataTransformerConfig;
    }
}

@NgModule({
    imports: [
        DataTransformerModule.withTransformers({
            'date-parse': DateParseDataTransformerService,
        }),
    ],
})
export class RootModule {}
```

## Interfaces

Below you can find interfaces for the Data Transformer Date-parse:

```ts
export interface DateParseDataTransformerConfig extends DataTransformerConfig {}
```
