---
title: Gift Cards
originalLink: https://documentation.spryker.com/v6/docs/gift-cards-import
redirect_from:
  - /v6/docs/gift-cards-import
  - /v6/docs/en/gift-cards-import
---

The **Gift Cards** category contains all data you need to manage gift cards information in your online store. We have structured this section according to the following .csv files that you will have to use to import the data:

* [gift_card_abstract_configuration.csv](https://documentation.spryker.com/docs/file-details-gift-card-abstract-configurationcsv): allows you to load information about the different types of gift cards.
* [gift_card_concrete_configuration.csv](https://documentation.spryker.com/docs/file-details-gift-card-concrete-configurationcsv): allows you to define the amount of money for each gift card.  

The table below provides details on Gift Cards data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Gift Card Abstract Configuration**   | Imports gift card product configuration information. A Gift Card Product is a regular product in the shop which represents a Gift Card that Customer can buy. The Gift Card Abstract Product configuration represents a type of Gift Cards with a code pattern (i.e. “Xmas”, “Happy-B”, etc.). |`data:import:gift-card-abstract-configuration ` | [gift_card_abstract_configuration.csv](https://documentation.spryker.com/docs/file-details-gift-card-abstract-configurationcsv) |[product_abstract.csv](https://documentation.spryker.com/docs/file-details-product-abstractcsv) |
| **Gift Card Concrete Configuration**  | Imports gift card product configuration information. This data is used to configure the amount of money that will be top-up (loaded) in the Gift Card.  |`data:import:gift-card-concrete-configuration` |[gift_card_concrete_configuration.csv](https://documentation.spryker.com/docs/file-details-gift-card-concrete-configurationcsv)| [product_concrete.csv](https://documentation.spryker.com/docs/file-details-product-concretecsv) |

