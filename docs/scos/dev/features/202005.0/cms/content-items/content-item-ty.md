---
title: Content Item Types- Module Relations
originalLink: https://documentation.spryker.com/v5/docs/content-item-types-module-relations
redirect_from:
  - /v5/docs/content-item-types-module-relations
  - /v5/docs/en/content-item-types-module-relations
---

This document describes each content item type and the modules relations used for them.

## Banner
Banner content item is a content piece that consists of text, a background image and a link. A content manager specifies the values when [creating the content item](https://documentation.spryker.com/docs/en/creating-content-items#content-item--banner) in the Back Office > **Content Management** > **Content Items**. 
The scheme shows the module relations of the Banner content item:
![Banner CI module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/banner-module-relations.png){height="" width=""}

### Banner API
A developer can fetch the content item data via API. Also, they can view the content item details for a specific locale. 

The scheme below shows the Banner API module relations:
![Banner API module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/banner-api-module-relations.png){height="" width=""}

### Banner Data Importer
A developer can create and edit the content items by importing them.

The scheme below shows the module relations of the content item data importers:
![Banner Content Item Data Importers module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/banner-data-importers-module-relations.png){height="" width=""}


See [Data Importers Overview and Implementation](https://documentation.spryker.com/docs/en/data-importers-review-implementation) for more details.
***
## Abstract Product List 
Abstract product list content item is a content piece that consists of text and [abstract products](https://documentation.spryker.com/docs/en/product-abstraction). A content manager selects existing abstract products when [creating the content item](https://documentation.spryker.com/docs/en/creating-content-items#content-item--abstract-product-list) in the Back Office > **Content Management** > **Content Items**. 
The scheme below shows the module relations of the Abstract product list content item and its components:
* data importer
* API

![Abstract Product List module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/abstract-product-list-module-relations.png){height="" width=""}

### Abstract Product List Data Importer
A developer can create and update the content items by importing them.

See [Data Importers Overview and Implementation](https://documentation.spryker.com/docs/en/data-importers-review-implementation) for more details.

### Abstract Product List API
A developer can fetch the information on each abstract product included into a contnet item via API based on the content item key. Also, they can view details of content items for all or a specific locale. 

***
## Product Set 
Product set content item is a content piece that consists of text and a [product set](https://documentation.spryker.com/docs/en/product-set). A content manager selects an existing product set when [creating the content item](https://documentation.spryker.com/docs/en/creating-content-items#content-item--product-set) in the Back Office > **Content Management** > **Content Items**. 
The scheme below shows the module relations of the Product set content item and its importer:
![Product Set content item module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/product-set-module-relations.png){height="" width=""}

### Product Set Data Importer
Developers can create and update the content items by importing them.

See [Data Importers Overview and Implementation](https://documentation.spryker.com/docs/en/data-importers-review-implementation) for more details.

***
## File List 
File list content item is a content piece that consists of text and a clickable link or icon to download a file. A content manager selects existing files when [creating the content item](https://documentation.spryker.com/docs/en/creating-content-items#content-item--file-list) in the Back Office > **Content Management** > **Content Items**. 

The scheme below shows the module relations of the File list content item:
![File List module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/file-list-module-relations.png){height="" width=""}

## Navigation 

Navigation content item is a content piece that consists of a [navigation element](https://documentation.spryker.com/docs/en/content-item-types-module-relations). A content manager selects a navigation element when [creating the Navigation content item](https://documentation.spryker.com/docs/en/creating-content-items#create-a-navigation-content-item) in the Back Office. 


The scheme shows the module relations of the Navigation content item:

![navigation-content-item-module-relations](https://confluence-connect.gliffy.net/embed/image/73472dc0-68f4-4bcd-a3ef-79c5ea1dcdbe.png?utm_medium=live&utm_source=custom){height="" width=""}

### Navigation Data Importer

A developer can create and edit navigation content items by [importing](https://documentation.spryker.com/docs/en/importing-data-with-configuration-file#console-commands-to-run-import) them.

See [File details: content_navigation.csv](https://documentation.spryker.com/docs/en/file-details-content-navigationcsv) for more details.






