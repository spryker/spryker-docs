---
title: Data Transformer Collate Configurator Table
description: This document provides details about the Data Transformer Collate Configurator Table service in the Components Library.
template: concept-topic-template
---


This document provides details about the Data Transformer Collate Configurator Table service in the Components Library.

## Overview

Data Transformer Collate Configurator Table is an Angular Service that implements re-population of data to the format appropriate for filtering (`DataTransformerConfiguratorConfigT`).

Example usage of the Data Transformer Collate Configurator Table in the `@spryker/table` config:

```html
<spy-table
  [config]="{
    datasource: {
      ...                                                   
      transform: {
        type: 'collate',
        configurator: {
          type: 'table',
        },
        ...  
      },
    },
  }"
></spy-table>
```
