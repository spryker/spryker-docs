---
title: CMS Schema
originalLink: https://documentation.spryker.com/2021080/docs/db-schema-cms
redirect_from:
  - /2021080/docs/db-schema-cms
  - /2021080/docs/en/db-schema-cms
---


## CMS

### Glossary

{% info_block infoBox %}
Every textual information can be provided in multiple languages. Languages are identified by a locale. For instance, the locale de_DE means "German language in Germany" which is different from de_CH "German language in Switzerland".
{% endinfo_block %}

{% info_block warningBox %}
The Glossary is used for the translation of all customer-facing texts that appear on the website, in emails, invoices,... It is not used for Administration Interface translation.
{% endinfo_block %}
![Glossary](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/CMS+Schema/glossary.png){height="" width=""}

**Structure**:

* Every single text is identified by a key and has a value per locale.

### CMS Pages

{% info_block infoBox %}
Create localized CMS pages based on predefined templates.
{% endinfo_block %}

There is a clear separation of the layout and the content of a CMS Page. The layout is hardcoded in a Twig Template and cannot be changed without deployment. The Template contains Markup with Placeholders (e.g. &lt;h3&gt;{% raw %}{{{% endraw %} spyCms('title') | raw {% raw %}}}{% endraw %}&lt;/h3&gt;) which needs to be linked to Glossary Keys.
![CMS pages](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/CMS+Schema/cms-pages.png){height="" width=""}

**Structure**:

* A CMS Page has:

  - a localized name, some meta information and a validity date.
  - a URL per locale.
  - a Template as a path to a Twig file which contains Markup with Placeholders
  - a Mapping of Placeholders to Glossary Keys.
  - *is_searchable* - Flags if the CMS Page is included in the search results

* Each revision of a CMS Page is archived as JSON data in *spy_cms_version::data

### CMS Blocks

{% info_block infoBox %}
Create localized CMS content blocks that can be included on dynamic pages like the Cart- or Checkout.
{% endinfo_block %}

CMS Blocks are very similar to CMS Pages with the main difference that they are referenced by the name and there is no URL.
![CMS blocks](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/CMS+Schema/cms-blocks.png){height="" width=""}

**Structure**:

* A CMS Block has:

  - a unique name which is used as a reference.
  - a validity date.
  - a Template as a path to a Twig file which contains Markup with Placeholders.
  - a Mapping of Placeholders to Glossary Keys.
  - *type*, *fk_page*, and *value* are deprecated fields.

* CMS Blocks can be toggled per Store.

### CMS Block connection with Products and Categories

{% info_block infoBox %}
CMS Blocks can be integrated into other pages with a Twig function. But there are also other ways to integrate CMS Blocks on Category and Product Pages
{% endinfo_block %}
![CMS block connection with products and categories](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/CMS+Schema/cms-block-connection-products-categories.png){height="" width=""}

**Structure**:

* CMS Blocks are connected to Abstract Products and Categories via **_connector* tables.

