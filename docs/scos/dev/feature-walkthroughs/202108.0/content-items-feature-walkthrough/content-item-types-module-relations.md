---
title: "Content item types: module relations"
description: Learn about all the content item types and module relations used for them.
last_updated: Jun 16, 2021
template: feature-walkthrough-template
originalLink: https://documentation.spryker.com/2021080/docs/content-item-types-module-relations
originalArticleId: dc32fefa-b80c-4924-8ee3-1da9be159722
redirect_from:
  - /2021080/docs/content-item-types-module-relations
  - /2021080/docs/en/content-item-types-module-relations
  - /docs/content-item-types-module-relations
  - /docs/en/content-item-types-module-relations
related:
  - title: Creating Content Items
    link: docs/scos/user/back-office-user-guides/page.version/content/content-items/creating-content-items.html
---

This document describes each content item type and the modules relations used for them.

## Banner
Banner content item is a content piece that consists of text, a background image and a link. A content manager specifies the values when [creating the content item](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/creating-content-items.html#create-a-banner-content-item) in the Back Office > **Content Management** > **Content Items**.
The scheme shows the module relations of the Banner content item:
![Banner CI module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/banner-module-relations.png)

### Banner API
A developer can fetch the content item data via API. Also, they can view the content item details for a specific locale.

The scheme below shows the Banner API module relations:
![Banner API module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/banner-api-module-relations.png)

### Banner Data Importer
A developer can create and edit the content items by importing them.

The scheme below shows the module relations of the content item data importers:
![Banner Content Item Data Importers module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/banner-data-importers-module-relations.png)


See [Data Importers Overview and Implementation](/docs/scos/dev/data-import/{{page.version}}/data-importers-overview-and-implementation.html) for more details.
***
## Abstract Product List
Abstract product list content item is a content piece that consists of text and [abstract products](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html). A content manager selects existing abstract products when [creating the content item](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/creating-content-items.html#create-an-abstract-product-list-content-item) in the Back Office > **Content Management** > **Content Items**.
The scheme below shows the module relations of the Abstract product list content item and its components:
* data importer
* API

![Abstract Product List module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/abstract-product-list-module-relations.png)

### Abstract Product List Data Importer
A developer can create and update the content items by importing them.

See [Data Importers Overview and Implementation](/docs/scos/dev/data-import/{{page.version}}/data-importers-overview-and-implementation.html) for more details.

### Abstract Product List API
A developer can fetch the information on each abstract product included into a contnet item via API based on the content item key. Also, they can view details of content items for all or a specific locale.

***
## Product Set
Product set content item is a content piece that consists of text and a [product set](/docs/scos/user/features/{{page.version}}/product-sets-feature-overview.html). A content manager selects an existing product set when [creating the content item](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/creating-content-items.html#create-a-product-set-content-item) in the Back Office > **Content Management** > **Content Items**.
The scheme below shows the module relations of the Product set content item and its importer:
![Product Set content item module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/product-set-module-relations.png)

### Product Set Data Importer
Developers can create and update the content items by importing them.

See [Data Importers Overview and Implementation](/docs/scos/dev/data-import/{{page.version}}/data-importers-overview-and-implementation.html) for more details.

***
## File List
File list content item is a content piece that consists of text and a clickable link or icon to download a file. A content manager selects existing files when [creating the content item](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/creating-content-items.html#create-a-file-list-content-item) in the Back Office > **Content Management** > **Content Items**.

The scheme below shows the module relations of the File list content item:
![File List module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/file-list-module-relations.png)

## Navigation

Navigation content item is a content piece that consists of a [navigation element](/docs/scos/dev/feature-walkthroughs/{{page.version}}/content-items-feature-walkthrough/content-item-types-module-relations.html). A content manager selects a navigation element when [creating the Navigation content item](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/creating-content-items.html#create-a-navigation-content-item) in the Back Office.


The scheme shows the module relations of the Navigation content item:

![navigation-content-item-module-relations](https://confluence-connect.gliffy.net/embed/image/73472dc0-68f4-4bcd-a3ef-79c5ea1dcdbe.png?utm_medium=live&utm_source=custom)

### Navigation Data Importer

A developer can create and edit navigation content items by [importing](/docs/scos/dev/data-import/{{page.version}}/importing-data-with-a-configuration-file.html#console-commands-to-run-import) them.

See [File details: content_navigation.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-content-navigation.csv.html) for more details.
