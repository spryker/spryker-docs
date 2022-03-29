---
title: Content Item Types- Module Relations
description: Learn about all the content item types and module relations used for them.
last_updated: Mar 4, 2020
template: feature-walkthrough-template
originalLink: https://documentation.spryker.com/v4/docs/content-item-types-module-relations
originalArticleId: 009ad7da-7319-4363-8f7e-a5cdb0dba24d
redirect_from:
  - /v4/docs/content-item-types-module-relations
  - /v4/docs/en/content-item-types-module-relations
related:
  - title: Creating Content Items
    link: docs/scos/user/back-office-user-guides/page.version/content/content-items/creating-content-items.html
---

This document describes each content item type and the modules relations used for them.

## Banner
Banner content item is a content piece that consists of text, a background image and a link. A content manager specifies the values when [creating the content item](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/creating-content-items.html) in the Back Office > **Content Management** > **Content Items**.
The scheme shows the module relations of the Banner content item:
<br>![Banner CI module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/banner-module-relations.png)

### Banner API
A developer can fetch the content item data via API. Also, they can view the content item details for a specific locale.

The scheme below shows the Banner API module relations:
<br>![Banner API module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/banner-api-module-relations.png)

### Banner Data Importer
A developer can create and edit the content items by importing them.

The scheme below shows the module relations of the content item data importers:
<br>![Banner Content Item Data Importers module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/banner-data-importers-module-relations.png)

## Abstract Product List
Abstract product list content item is a content piece that consists of text and [abstract products](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html). A content manager selects existing abstract products when [creating the content item](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/creating-content-items.html) in the Back Office > **Content Management** > **Content Items**.
The scheme below shows the module relations of the Abstract product list content item and its components:
* data importer
* API

![Abstract Product List module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/abstract-product-list-module-relations.png)

### Abstract Product List Data Importer
A developer can create and update the content items by importing them.

### Abstract Product List API
A developer can fetch the information on each abstract product included into a contnet item via API based on the content item key. Also, they can view details of content items for all or a specific locale.

***
## Product Set
Product set content item is a content piece that consists of text and a [product set](/docs/scos/user/features/{{page.version}}/product-sets-feature-overview.html). A content manager selects an existing product set when [creating the content item](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/creating-content-items.html) in the Back Office > **Content Management** > **Content Items**.
The scheme below shows the module relations of the Product set content item and its importer:
![Product Set content item module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/product-set-module-relations.png)

### Product Set Data Importer
Developers can create and update the content items by importing them.

***
## File List
File list content item is a content piece that consists of text and a clickable link or icon to download a file. A content manager selects existing files when [creating the content item](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/creating-content-items.html) in the Back Office > **Content Management** > **Content Items**.

The scheme below shows the module relations of the File list content item:
![File List module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/file-list-module-relations.png)
