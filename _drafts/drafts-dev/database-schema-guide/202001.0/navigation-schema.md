---last_updated: Nov 22, 2019

title: Navigation Schema
originalLink: https://documentation.spryker.com/v4/docs/db-schema-navigation
originalArticleId: d40a39d1-fb72-4e5f-b91e-273a8155ab66
redirect_from:
  - /v4/docs/db-schema-navigation
  - /v4/docs/en/db-schema-navigation
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
