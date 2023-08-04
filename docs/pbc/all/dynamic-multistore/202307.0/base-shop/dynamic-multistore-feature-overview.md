---
title: Dynamic Multistore feature overview
description: Dynamic Multistore lets you create and manage multiple online stores in the Back Office.
last_updated: July 31, 2023
template: concept-topic-template
---

{% info_block warningBox %}

Dynamic Multistore is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

Dynamic Multistore introduces the ability to handle the *store* entity through the Back Office. Business users can create stores without edit the `Stores.php` file and redeploy the system.

The capability consists of a few main components:

* Dynamic store creation: stores can be created in the Back Office, moving the store entity from a fixed-configuration entity to a user-manageable entity.

* Regional grouping: stores can be grouped into *regions*. This allows for further customization and can help organize stores by specific criteria like  geographical location.

* Infrastructure changes: Dynamic Multistore integrates with existing Jenkins jobs, Redis, and Elasticsearch configurations. It enables command line execution to be done per store or for all stores in a region-based setup.
