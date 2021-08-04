---
title: HowTo - Define Maximum Size of Content Fields
originalLink: https://documentation.spryker.com/v5/docs/content-fields-max-size
redirect_from:
  - /v5/docs/content-fields-max-size
  - /v5/docs/en/content-fields-max-size
---

By default CMS module doesn't specify the content field size. Based on your DB (MySql or PostgreSql), it will be transferred to TEXT (65535 bytes) and TEXT (unlimited length) respectively.

In case your project requires more, you can redefine field size in `spy_cms_version` table.

{% info_block infoBox %}
For example, place the following into `src/Pyz/Zed/Cms/Persistence/Propel/Schema/spy_cms.schema.xml`:
{% endinfo_block %}

```xml
<div code="xml">
	<?xml version="1.0"?>
	<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="OrmZedCmsPersistence" package="src.Orm.Zed.Cms.Persistence">
		<table name="spy_cms_version">
			<column name="data" type="LONGVARCHAR" size="4294967295" />
		</table>
	</database>
</div>
```

<!--
**See also:**

* Get a general idea of what a CMS page is
* Migrate to a newer version of CMS module
* Migrate to a newer version of CMS collector
-->

<!-- _Last review date: Jan 22, 2017_

by Ahmed Sabaa -->
