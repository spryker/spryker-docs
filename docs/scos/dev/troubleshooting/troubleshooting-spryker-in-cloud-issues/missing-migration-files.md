---
title: Troubleshooting Spryker in Cloud issues. Missing migration files on production environment 
description: Troubleshoot issues you might encounter when you have your Spryker-based project in Cloud. Missing migration files on production environment
last_updated: Jun 9, 2022
template: ?
originalLink: ?
originalArticleId: ?
redirect_from:
---

Missign migration files on production environments. 

## Note
It is recomended to push all the migrations to a repository as a go-live preparation and not during the development (to simplify the process of development). 

## Solution

1. Check if the files are not under ignore (f.e. gitignore) and added to the version control system (f.e. github).
2. Check that during the deployment the files are not removed (f.e. check if during the deployment you are not using the ```console propel:migration:delete``` comand that removes migrations).

