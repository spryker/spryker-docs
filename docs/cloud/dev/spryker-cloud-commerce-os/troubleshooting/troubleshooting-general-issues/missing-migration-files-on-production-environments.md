---
title: Missing migration files on production environments 
description: Troubleshoot issues you might encounter when you have your Spryker-based project in Cloud. Missing migration files on production environment
last_updated: Jun 9, 2022
template: troubleshooting-guide-template
---

There are no tables in the DB after deploy.

{% info_block warningBox "Note" %}

It is recommended to push all the migrations to a repository as a go-live preparation and not during the development (to simplify the process of development).

{% endinfo_block %}

## Solution

1. Check if the files are not under ignore (for example, `.dockerignore`) and added to the version control system (for example, Github).
2. Check that during the deployment the files are not removed. For example, check if during the deployment you are not using the command that removes migrations:

```bash
console propel:migration:delete
```