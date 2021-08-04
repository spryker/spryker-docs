---
title: Mutagen synchronization issue
originalLink: https://documentation.spryker.com/2021080/docs/mutagen-synchronization-issue
redirect_from:
  - /2021080/docs/mutagen-synchronization-issue
  - /2021080/docs/en/mutagen-synchronization-issue
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
