---
title: Import Gift Cards data
description: Learn how to import gift card data through file imports within your Spryker Cloud Commerce OS Projects.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/gift-cards-import
originalArticleId: dcdc9aa2-7092-46aa-8821-e6853c9c8e54
redirect_from:
  - /2021080/docs/gift-cards-import
  - /2021080/docs/en/gift-cards-import
  - /docs/gift-cards-import
  - /docs/en/gift-cards-import
  - /docs/scos/dev/data-import/202311.0/data-import-categories/special-product-types/gift-cards/gift-cards.html
  - /docs/pbc/all/gift-cards/202311.0/import-and-export-data/import-of-gift-cards.html
  - /docs/pbc/all/gift-cards/202204.0/import-and-export-data/import-gift-cards-data.html
  - /docs/pbc/all/gift-cards/latest/import-and-export-data/import-gift-cards-data.html
---

To learn how data import works and about different ways of importing data, see [Data import](/docs/dg/dev/data-import/{{page.version}}/data-import.html). This section describes the data import files that are used to import data related to the Gift Cards PBC:

- [gift_card_abstract_configuration.csv](/docs/pbc/all/gift-cards/{{site.version}}/import-and-export-data/import-file-details-gift-card-abstract-configuration.csv.html): allows you to load information about the different types of gift cards.
- [gift_card_concrete_configuration.csv](/docs/pbc/all/gift-cards/{{site.version}}/import-and-export-data/import-file-details-gift-card-concrete-configuration.csv.html): allows you to define the amount of money for each gift card.  

The table below provides details on Gift Cards data importers, their purpose, CSV files, dependencies, and other details. Each data importer contains links to CSV files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| DATA IMPORTER | PURPOSE | CONSOLE COMMAND | FILES | DEPENDENCIES |
| --- | --- | --- | --- |--- |
| Gift Card Abstract Configuration  | Imports gift card product configuration information. A Gift Card Product is a regular product in the shop which represents a Gift Card that Customer can buy. The Gift Card Abstract Product configuration represents a type of Gift Cards with a code pattern (for example, "Xmas", "Happy-B", etc.). |`data:import:gift-card-abstract-configuration` | [gift_card_abstract_configuration.csv](/docs/pbc/all/gift-cards/{{site.version}}/import-and-export-data/import-file-details-gift-card-abstract-configuration.csv.html) |[product_abstract.csv](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html) |
| Gift Card Concrete Configuration | Imports gift card product configuration information. This data is used to configure the amount of money that will be top-up (loaded) in the Gift Card.  |`data:import:gift-card-concrete-configuration` |[gift_card_concrete_configuration.csv](/docs/pbc/all/gift-cards/{{site.version}}/import-and-export-data/import-file-details-gift-card-concrete-configuration.csv.html)| [product_concrete.csv](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html) |
