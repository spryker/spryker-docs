---
title: Mutagen synchronization issue
originalLink: https://documentation.spryker.com/v6/docs/mutagen-synchronization-issue
redirect_from:
  - /v6/docs/mutagen-synchronization-issue
  - /v6/docs/en/mutagen-synchronization-issue
---

## Description
There is a synchronization issue.

## Solution
* Restart your OS.
* Run the commands:
```
docker/sdk trouble
mutagen sync list
mutagen sync terminate <all sessions in the list>
docker/sdk up
```
