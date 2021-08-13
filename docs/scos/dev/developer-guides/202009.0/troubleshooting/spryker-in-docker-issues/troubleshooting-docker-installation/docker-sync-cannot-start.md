---
title: docker-sync cannot start
description: Learn how to fix the issue with docker-sync not starting
originalLink: https://documentation.spryker.com/v6/docs/docker-sync-cannot-start
originalArticleId: 4cb809d4-f6b9-4d89-bdc2-42ca16891c90
redirect_from:
  - /v6/docs/docker-sync-cannot-start
  - /v6/docs/en/docker-sync-cannot-start
---

When runnning `docker-sync clean`, you might get two erros as described below.

## Error 1
You get an error similar to this one:

```bash
docker: Error response from daemon: Conflict. The container name "/data-sync" is already in use by container "47dd708a7a7f9550390432289bd85fe0e4491b080748fcbba7ddb3331de2c7e7". You have to remove (or rename) that container to be able to reuse that name.
```

## Solution
1. Run `docker-sync clean`.
2. Run `docker/sdk up` again.


## Error 2
You get an error similar to this one:
```bash
Unable to find image "eugenmayer/unison:hostsync_@.2' Locally
docker: Error response from daemon: manifest for eugenmayer/unison:hostsync_@.2 not found: manifest unknown: manifest unknown.
```
## Solution
Update docker-sync:
```bash
gem install docker-sync
```
