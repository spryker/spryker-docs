---
title: Navigation module- reference information
originalLink: https://documentation.spryker.com/v6/docs/navigation-module-reference-information
redirect_from:
  - /v6/docs/navigation-module-reference-information
  - /v6/docs/en/navigation-module-reference-information
---

## Overview
The `Navigation` module manages multiple navigation menus that can be displayed on the frontend (Yves). Every navigation section can contain its own nested structure of navigation nodes. Navigation nodes have types that help define what kind of link they represent.

The following node types are available:

* **Label**: These nodes do not link to any specific URL, they are used for grouping other nodes.
* **Category**: Nodes can be assigned to category node URLs.
* **CMS Page**: Nodes can be assigned to CMS page URLs.
* **Link**: These nodes link to internal pages in Yves, i.e. login, registration, etc.
* **External URL**: These nodes link to external URLs (typically tabs opened in a new browser).
You can control and adjust Navigation node appearance and add icons by assigning custom CSS classes to them.

This feature is shipped with three modules:

* **Navigation module** provides database structure and a public API to manage what’s in the database. It also provides a small toolkit for rendering navigation menus in the frontend.
* **NavigationGui** module provides a Zed UI to manage navigation menus.
* **NavigationCollector** module provides full collector logic for exporting navigation menus to the KV storage (Redis).

## Under the Hood
### Database Schema
The Navigation module provides the `spy_navigation` table that stores navigation menus. They have a `name` field which is only used for backend display and they also have a `key` field used to reference the navigation menus from Yves.

Every navigation entity contains some nodes stored in the `spy_navigation_node` table. The structure of the navigation tree depends on the `fk_parent_navigation_node` and the position fields which define if a node has a parent on its level, in what `position` they are ordered. Each navigation node has attributes that can be different per displayed locale. This information is stored in the `spy_navigation_node_localized_attributes` table.

The `valid_from`, `valid_to`, and `is_active` fields allow to toggle the node's and its descendants visibility.

![Navigation database schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Navigation/Navigation+Module/navigation_db_schema_2_0.png){height="" width=""}

<!-- Last review date: Sep 21, 2017- by Karoly Gerner -->
