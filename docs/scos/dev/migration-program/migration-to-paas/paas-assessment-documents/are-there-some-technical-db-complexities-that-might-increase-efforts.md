---
title: Are there some technical complexities, that might increase efforts like: CTE, Raw SQL?
description: This document allows you to assess if a project has technical complexities, that might increase efforts like: CTE, Raw SQL.
template: howto-guide-template
---

# Are there some technical complexities, that might increase efforts like: CTE, Raw SQL?

{% info_block infoBox %}

Resources: Backend

{% endinfo_block %}

## Description

1. This approach will help to identify `CTE` and other raw `SQL` queries which could be DB driver-specific and not compatible with `MariaDB`.
   Search over the project source code using raw SQL keywords such as:
    * SELECT
    * UPDATE
    * DELETE
    * WITH
    * MATERIALIZED VIEW
    * PROCEDURE
    * FUNCTION
    * etc.
2. Additional information could be received as part of the prerequisite data.

## Formula

* 1d per CTE query;
* 1d per function/procedure;
* 1d per custom structure e.g. view, tmp table;
* 4h per raw sql query;
