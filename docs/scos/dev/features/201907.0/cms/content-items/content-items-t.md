---
title: Content Items Types- Module Relations
originalLink: https://documentation.spryker.com/v3/docs/content-items-types-module-relations-201907
redirect_from:
  - /v3/docs/content-items-types-module-relations-201907
  - /v3/docs/en/content-items-types-module-relations-201907
---

{% info_block infoBox %}
This topic contains a table that describes the types of content items and the relations between modules in these features.
{% endinfo_block %}

## Types of Content Items 
### Banner
This feature allows creating and editing content elements for a banner by selecting it from the **Add Content Item** drop-down button.

The scheme below illustrates Banner Content Item module relations:
![Banner CI module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/banner-module-relations.png){height="" width=""}

#### Banner API
The feature provides a developer with access to retrieve content items data on the banner. Additionally, they can view details of content items for all or a specific locale. 

The scheme below illustrates Banner API module relations:
![Banner API module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/banner-api-module-relations.png){height="" width=""}

#### Banner Content Item Data Importer
The feature allows a developer to create and edit Banner content item elements by importing their data using a CSV file.

The scheme below illustrates Banner Content Item Data Importers module relations:
![Banner Content Item Data Importers module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/banner-data-importers-module-relations.png){height="" width=""}


{% info_block infoBox %}
See [Data Importers Overview and Implementation](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-ingestion/data-importers/data-importers-
{% endinfo_block %} for more details.)
***
### Abstract Product List 
The feature allows Back Office users or content managers to create, manage, and customize Abstract Product Lists content items in the Back Office, while developers can easily retrieve the same content via Content Item API based on the content item key and make the content abstracted from its representation and used with any front-end technologies their customers use. 

#### Abstract Product List Data Importer
With the feature, developers can create and update Abstract Product List content items by importing their data using a CSV file.

{% info_block infoBox %}
See [Data Importers Overview and Implementation](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-ingestion/data-importers/data-importers-
{% endinfo_block %} for more details.)

#### Abstract Product List API
The feature allows a developer to retrieve information on each abstract product, included in the Abstract Product List content item, based on the content item key. Additionally, they can view details of content items for all or a specific locale. 

The scheme below illustrates Abstract Product List Content Item module relations:
![Abstract Product List module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/abstract-product-list-module-relations.png){height="" width=""}

***
### Product Set 
With this feature, Back Office users or content managers can easily create and edit Product Set content items. You can add a new Product Set content item by selecting it from the **Add Content Item** drop-down button on the _Content Items list_ page. 

### Product Set Content Item Data Importer
The feature allows developers to create and update Product Set content items by importing their data using a CSV file.

The scheme below illustrates Product Set Content Item module relations:
![Product Set content item module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/product-set-module-relations.png){height="" width=""}

***
## File List 
Using the File List content item feature allows you to create a link or icon to download a file uploaded to the **File Manager**, such as an image, video, zip, pdf, word, etc that will be inserted via a widget in any placeholders of a block or a page.

The scheme below illustrates File List Content Item module relations:
![File List module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/CMS/Content+Items/Content+Items+Types%3A+Module+Relations/file-list-module-relations.png){height="" width=""}
