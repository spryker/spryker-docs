---
title: Reference- Search Preferences
originalLink: https://documentation.spryker.com/v5/docs/reference-search-preferences
redirect_from:
  - /v5/docs/reference-search-preferences
  - /v5/docs/en/reference-search-preferences
---

## Synchronize Search Preferences
After adding or updating all necessary attributes, you need to apply the changes by clicking **Synchronize search preferences**. This triggers an action that searches for all products that have those attributes and were modified since the last synchronization and touches them. This means that next time, the search collector execution will update the necessary products, so they can be found by performing a full text search.

 {% info_block infoBox "Synchronization" %}
Depending on the size of your database, the synchronization can be slow sometimes. Make sure that you don't trigger it often if it's not necessary.
{% endinfo_block %}

To have your search collector collect all the dynamic product attributes, make sure you also followed the steps described in the Dynamic product attribute mapping section.

## Current Constraints
Currently, the feature has the following functional constraints which are going to be resolved in the future.

* search preference attributes are shared across all the stores in a project
* you cannot define a search preference for a single store
