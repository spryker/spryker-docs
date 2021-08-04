---
title: `nc` command tells that the port is opened
originalLink: https://documentation.spryker.com/v6/docs/nc-command-tells-that-the-port-is-opened
redirect_from:
  - /v6/docs/nc-command-tells-that-the-port-is-opened
  - /v6/docs/en/nc-command-tells-that-the-port-is-opened
---

## Description
`nc` command tells that the port is opened.

## Solution
1. Check what process occupies the port 9000 by running the command on the host:
```bash
sudo lsof -nPi:9000 | grep LISTEN
```
2. If it's not your IDE, free up the port to be used by the IDE.

