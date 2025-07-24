---
title: Define the maximum size of content fields
description: Use the guide to customize the content field size in the CMS module for your Spryker Projects.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-define-the-maxiumum-size-of-content-fields
originalArticleId: 42fb6510-84dc-425f-902d-e5fd7436cd3a
redirect_from:
  - /docs/pbc/all/content-management-system/202311.0/tutorials-and-howtos/howto-define-the-maxiumum-size-of-content-fields.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/tutorials-and-howtos/howto-define-the-maximum-size-of-content-fields.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/tutorials-and-howtos/define-the-maximum-size-of-content-fields.html
related:
  - title: CMS
    link: docs/pbc/all/content-management-system/page.version/base-shop/cms-feature-overview/cms-feature-overview.html
---

By default, the CMS module doesn't specify the content field's size. For MySQL and MariaDB, it's transferred to TEXT (65535 bytes), and for PostgreSQL, it's transferred to TEXT (unlimited length).

If your project requires more, you can redefine the field's size in the `spy_cms_version` table.

{% info_block infoBox %}

For example, place the following into `src/Pyz/Zed/Cms/Persistence/Propel/Schema/spy_cms.schema.xml`:

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

{% endinfo_block %}
