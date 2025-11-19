---
title: Seven Senders — Persistence layer
description: Learn how to manage Seven Senders persistence layer in Spryker Cloud Commerce OS for effective data storage and seamless integration with third-party shipping services.
template: concept-topic-template
last_updated: Nov 17, 2023
date: May 25, 2022
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/shipment/seven-senders/seven-senders-persistance-layer.html
  - /docs/scos/dev/technology-partner-guides/202204.0/shipment/seven-senders/seven-senders-persistance-layer.html
  - /docs/scos/dev/technology-partner-guides/202311.0/shipment/seven-senders/seven-senders-persistance-layer.html
  - /docs/pbc/all/carrier-management/202204.0/base-shop/third-party-integrations/seven-senders/seven-senders-persistance-layer.html

---

There is a table in the database for saving response and request data:

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 name="zed"
 xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
 namespace="Orm\Zed\Sevensenders\Persistence"
 package="src.Orm.Zed.Sevensenders.Persistence">

 <table name="spy_sevensenders_response" idMethod="native">
 <column name="fk_sales_order" type="INTEGER" required="true" primaryKey="true"/>
 <column name="request_payload" type="LONGVARCHAR" required="true"/>
 <column name="resource_type" type="VARCHAR" required="true" primaryKey="true"/>
 <column name="response_payload" type="LONGVARCHAR" required="true"/>
 <column name="response_status" type="INTEGER" required="true"/>
 <column name="iri" type="VARCHAR" required="true"/>

 <unique name="spy_sevensenders_request-order_reference">
 <unique-column name="fk_sales_order"/>
 <unique-column name="resource_type"/>
 </unique>

 <foreign-key name="spy_sevensenders_request-fk_sales_order" foreignTable="spy_sales_order" phpName="SalesOrder">
 <reference local="fk_sales_order" foreign="id_sales_order"/>
 </foreign-key>
 </table>

 <table name="spy_sevensenders_token" idMethod="native">
 <column name="token" type="VARCHAR" required="true"/>
 <column name="created_at" type="VARCHARv required="true"/>
 </table>
</database>
```
