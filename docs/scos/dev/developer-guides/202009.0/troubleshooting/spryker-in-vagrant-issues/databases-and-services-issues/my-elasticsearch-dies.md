---
title: My Elasticsearch dies
description: Learn how to fix the issue if Elasticsearch dies
originalLink: https://documentation.spryker.com/v6/docs/my-elasticsearch-dies
originalArticleId: 5ff8c7da-6188-497f-ab14-498b9183a1ce
redirect_from:
  - /v6/docs/my-elasticsearch-dies
  - /v6/docs/en/my-elasticsearch-dies
---

## Description

You can get the following error:
```
[Elastica\Exception\Connection\HttpException]
Couldn't connect to host, Elasticsearch down?
```

## Solution

Restart Elasticsearch:

```bash
# find out which Elasticsearch you are using:
grep -r ELASTICA_PARAMETER__PORT /data/shop/development/current/config/Shared
# If you have port 10005
sudo -i service elasticsearch-development restart
# Older VMs used port 9200
sudo -i service elasticsearch restart
```

Do you have more than one Elasticsearch instances running? Do the following:

```bash
sudo -i service elasticsearch status
sudo -i service elasticsearch-development status
sudo -i service elasticsearch-testing status
# Stop some of them ... (see above on how to figure out which one)
sudo -i service elasticsearch... stop
# ... and disable them
sudo -i update-rc.d elasticsearch... disable
```
