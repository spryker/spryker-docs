---
title: HowTo - Define the maximum size of content fields
originalLink: https://documentation.spryker.com/2021080/docs/howto-define-the-maxiumum-size-of-content-fields
redirect_from:
  - /2021080/docs/howto-define-the-maxiumum-size-of-content-fields
  - /2021080/docs/en/howto-define-the-maxiumum-size-of-content-fields
---

By default CMS module doesn't specify the content field size. For MySQL and MariaDB, it is transferred to TEXT (65535 bytes), and, for PostgreSQL, it is transferred to TEXT (unlimited length).

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




