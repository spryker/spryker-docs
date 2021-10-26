---last_updated: Jun 16, 2021

title: Navigation Schema
originalLink: https://documentation.spryker.com/2021080/docs/db-schema-navigation
originalArticleId: b535393e-c478-443e-a0b1-477bc6fd21d1
redirect_from:
  - /2021080/docs/db-schema-navigation
  - /2021080/docs/en/db-schema-navigation
  - /docs/db-schema-navigation
  - /docs/en/db-schema-navigation
---

## Navigation

### Navigation Overview

{% info_block infoBox %}
Every shop can have several independent navigation trees. For instance, there can be the main navigation that contains links to category pages or content pages.
{% endinfo_block %}

{% info_block warningBox %}
The main difference to Categories is that a Category Tree represents a hierarchical structure for the Products while a Navigation is just a nested list of links.
{% endinfo_block %}
![Navigation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Navigation+Schema/navigation.png)

**Structure**:

* An entry in the Navigation has a name.
* The underlying tree structure is represented by Navigation Nodes.

  - *node_type* - can be "category", "link, "external_url", "cms_page" or "label".

* There is one URL per localized Navigation Node. The URL is the only link to the resource. There are no other relations in the schema.
