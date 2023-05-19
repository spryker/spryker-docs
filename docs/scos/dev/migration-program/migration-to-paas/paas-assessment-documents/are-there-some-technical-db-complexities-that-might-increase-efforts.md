---
title: Are there some technical complexities, that might increase efforts like: CTE, Raw SQL?
description: This document allows you to assess if a project has technical complexities, that might increase efforts like: CTE, Raw SQL.
template: howto-guide-template
---

## Resources

Backend

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
2. Check if related information was provided in the prerequisite from.

## Formula

* 1d per CTE query.
* 1d per function or procedure.
* 1d per custom structure, like view or tmp table.
* 4h per raw SQL query.
