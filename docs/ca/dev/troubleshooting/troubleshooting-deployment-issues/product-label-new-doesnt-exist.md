---
title: Product label NEW doesn't exist
description: Solution to make project setup working if the exception product label NEW doesn't exist occurres.
template: troubleshooting-guide-template
last_updated: Jan 23, 2024
---


After the cleanup of the project code and data, the "Run_destructive_install" pipeline fails.

```text
#16 {main}{"@timestamp":"2024-01-23T15:07:53.542432+00:00","@version":1,"host":"ip-10-105-4-187.eu-central-1.compute.internal","message":"Spryker\\Zed\\ProductNew\\Business\\Exception\\ProductLabelNewNotFoundException - Product Label \"NEW\" doesn't exists. You can fix this problem by persisting a new Product Label entity into your database with \"NEW\" name. in \"/data/vendor/***/product-new/src/Spryker/Zed/ProductNew/Business/Label/ProductAbstractRelationReader.php::86\"","type":"ZED","channel":"Zed","level":"CRITICAL","monolog_level":500,"extra":{"environment":{"application":"ZED","environment":"***","store":null,"codeBucket":"EU","locale":"en_US"},"server":{"url":"http://:/","is_https":false,"hostname":"","user_agent":null,"user_ip":null,"request_method":"cli","referer":null},
```

## Solution

This usually happens after you remove all product labels or remove the NEW label. If you remove this dynamic label, you have to remove the plugin that handles this label's processing:
1. In `\Pyz\Zed\ProductLabel\ProductLabelDependencyProvider::getProductLabelRelationUpdaterPlugins`, remove `ProductNewLabelUpdaterPlugin`.

2. Remove any project-level plugins that were used for processing the deleted label.
