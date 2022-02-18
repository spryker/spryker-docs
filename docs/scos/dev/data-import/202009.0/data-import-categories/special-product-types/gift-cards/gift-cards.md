---
title: Gift Cards
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/gift-cards-import
originalArticleId: 772775f2-2543-4dd0-ad93-7d367498138d
redirect_from:
  - /v6/docs/gift-cards-import
  - /v6/docs/en/gift-cards-import
---

The **Gift Cards** category contains all data you need to manage gift cards information in your online store. We have structured this section according to the following .csv files that you will have to use to import the data:

* [gift_card_abstract_configuration.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/gift-cards/file-details-gift-card-abstract-configuration.csv.html): allows you to load information about the different types of gift cards.
* [gift_card_concrete_configuration.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/gift-cards/file-details-gift-card-concrete-configuration.csv.html): allows you to define the amount of money for each gift card.  

The table below provides details on Gift Cards data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Gift Card Abstract Configuration**   | Imports gift card product configuration information. A Gift Card Product is a regular product in the shop which represents a Gift Card that Customer can buy. The Gift Card Abstract Product configuration represents a type of Gift Cards with a code pattern (for example, “Xmas”, “Happy-B”, etc.). |`data:import:gift-card-abstract-configuration ` | [gift_card_abstract_configuration.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/gift-cards/file-details-gift-card-abstract-configuration.csv.html) |[product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html) |
| **Gift Card Concrete Configuration**  | Imports gift card product configuration information. This data is used to configure the amount of money that will be top-up (loaded) in the Gift Card.  |`data:import:gift-card-concrete-configuration` |[gift_card_concrete_configuration.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/gift-cards/file-details-gift-card-concrete-configuration.csv.html)| [product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html) |

