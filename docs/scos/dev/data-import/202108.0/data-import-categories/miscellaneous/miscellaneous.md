---
title: Miscellaneous
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/miscellaneous
originalArticleId: e4713374-b5c2-4a2d-9949-fcb656ad1ab3
redirect_from:
  - /2021080/docs/miscellaneous
  - /2021080/docs/en/miscellaneous
  - /docs/miscellaneous
  - /docs/en/miscellaneous
---

The **Miscellaneous** category contains several additional data that you need to sell the products/services online. This category contains a group of data importers and CSV content files that do not fit under the previous categories.

The table below provides details on Miscellaneous data importers, their purpose, CSV files, dependencies, and other details. Each data importer contains links to CSV files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| DATA IMPORTER | PURPOSE | CONSOLE COMMAND | FILES | DEPENDENCIES |
| --- | --- | --- | --- |--- |
| Comment  | Imports information relative to customer comments. | `data:import:comment`|[comment.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/miscellaneous/file-details-comment.csv.html)|[customer.csv ](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-customer.csv.html)|
| Mime Type  | Imports information relative to existing MIME types allowed in the platform.|`data:import:mime-type` | [mime_type.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/miscellaneous/file-details-mime-type.csv.html)| None|

