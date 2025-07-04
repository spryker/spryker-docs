---
title: "Akeneo Connector (Eco module): Console commands"
description: This guide provides the console commands for the Akeneo connect eco module for your Spryker based project.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/akeneo-console-commands
originalArticleId: a332d6b7-14fa-4d8b-849b-f503d3de13ac
redirect_from:
  - /2021080/docs/akeneo-console-commands
  - /2021080/docs/en/akeneo-console-commands
  - /docs/akeneo-console-commands
  - /docs/en/akeneo-console-commands
  - /docs/scos/dev/technology-partner-guides/202311.0/product-information-pimerp/akeneo/akeneo-console-commands.html
  - /docs/pbc/all/product-information-management/202311.0/base-shop/third-party-integrations/akeneo/akeneo-console-commands.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/third-party-integrations/akeneo/akeneo-connector-eco-module-console-commands.html
---

The following console commands are available in your project after successful [installation](/docs/pbc/all/product-information-management/latest/base-shop/third-party-integrations/akeneo/install-and-configure-akeneo-eco-module.html) of the Akeneo Connector Eco module. Run them one by one.

1) Command to import super attributes:

```bash
vendor/bin/console middleware:process:run -p SUPER_ATTRIBUTE_IMPORT_PROCESS -o data/import/maps/super_attribute_map.json
```

2) Command to prepare locale mapping:

```bash
vendor/bin/console middleware:process:run -p LOCALE_MAP_IMPORT_PROCESS -o data/import/maps/locale_map.json
```

3) Command to prepare products attributes mapping:

```bash
vendor/bin/console middleware:process:run -p ATTRIBUTE_MAP_PROCESS -o data/import/maps/attribute_map.json
```

4) Command to import categories:

```bash
vendor/bin/console middleware:process:run -p DEFAULT_CATEGORY_IMPORT_PROCESS
```

5) Command to import products attributes:

```bash
vendor/bin/console middleware:process:run -p ATTRIBUTE_IMPORT_PROCESS
```

6) Command to prepare product models data in local file:

```bash
vendor/bin/console middleware:process:run -p PRODUCT_MODEL_PREPARATION_PROCESS -o data/import/maps/product_models.json
```

7) Command to import product model data (abstract products):

```bash
vendor/bin/console middleware:process:run -p DEFAULT_PRODUCT_MODEL_IMPORT_PROCESS -i data/import/maps/product_models.json
```

8) Command to prepare products data in local file:

```bash
vendor/bin/console middleware:process:run -p PRODUCT_PREPARATION_PROCESS -o data/import/maps/products.json
```

9) Command to import product data (concrete products):

```bash
vendor/bin/console middleware:process:run -p DEFAULT_PRODUCT_IMPORT_PROCESS -i data/import/maps/products.json
```

<!--## outdated as per https://spryker.atlassian.net/wiki/spaces/ECO/pages/864453632/New+Akeneo+Documentation Multi-select Att ributes

The section below explains how Spryker treats multi-select attributes from Akeneo.

1. The attribute `pim_catalog_multiselect` is imported as a concatenated string.
2. The following attribute types are skipped during import:

  - `pim_assets_collection`
  - `pim_reference_data_multiselect`
  - `pim_catalog_price_collection`-->

On a project level, you can change `DefaultProductImportDictionary` instead of using the `EnrichAttributes` translator function or extending it.

Price attributes (`pim_catalog_price_collection`), except the one with `attribute_key = 'price'`, are skipped. For correct import, products should contain an attribute with `attribute_type pim_catalog_price_collection` and `attribute_key 'price'`.
