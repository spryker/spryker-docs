---
title: My Elasticsearch dies
description: Learn how to fix the issue if Elasticsearch dies
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/my-elasticsearch-dies
originalArticleId: dd22c506-5f5e-46e6-9df6-b555bca17a29
redirect_from:
  - /2021080/docs/my-elasticsearch-dies
  - /2021080/docs/en/my-elasticsearch-dies
  - /docs/my-elasticsearch-dies
  - /docs/en/my-elasticsearch-dies
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
