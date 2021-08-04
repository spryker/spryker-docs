---
title: Navigation Schema
originalLink: https://documentation.spryker.com/v3/docs/db-schema-navigation
redirect_from:
  - /v3/docs/db-schema-navigation
  - /v3/docs/en/db-schema-navigation
---

## Navigation

### Navigation Overview

{% info_block infoBox %}
Every shop can have several independent navigation trees. For instance, there can be the main navigation that contains links to category pages or content pages.
{% endinfo_block %}

{% info_block warningBox %}
The main difference to Categories is that a Category Tree represents a hierarchical structure for the Products while a Navigation is just a nested list of links.
{% endinfo_block %}
![Navigation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Navigation+Schema/navigation.png){height="" width=""}

**Structure**:

* An entry in the Navigation has a name.
* The underlying tree structure is represented by Navigation Nodes.

  - *node_type* - can be "category", "link, "external_url", "cms_page" or "label".

* There is one URL per localized Navigation Node. The URL is the only link to the resource. There are no other relations in the schema.
