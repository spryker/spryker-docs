---
title: Data Transformer Collate Configurator Table
description: This document provides details about the Data Transformer Collate Configurator Table service in the Components Library.
template: concept-topic-template
---

This document provides details about the Data Transformer Collate Configurator Table service in the Components Library.

## Overview

Data Transformer Collate Configurator Table is an Angular Service that re-populates of data to a format suitable for filtering (`DataTransformerConfiguratorConfigT`).

Below is an example of the Data Transformer Collate Configurator Table in the `@spryker/table` configuration:

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
