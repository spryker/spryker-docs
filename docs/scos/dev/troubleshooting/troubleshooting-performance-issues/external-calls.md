---
title: External calls
description: External calls
template: troubleshooting-guide-template
---

## External calls

Some actions, parts of website or all website is slow.

## Cause

Check profiling!
Sometimes you can see in the report that external call takes a lot of time.
New Relic:

TODO: Add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3689546309/External+calls

Blackfire:

TODO: Add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3689546309/External+calls

## Solution

- First please check that there is no [N+1 problem](link to an article"N+1 problem").


- Then check if this action really causes a performance problem or not.
F.e. customers during checkout have to wait until some call to 3rd party system is done.

Can this call be done before or after this action in the background? It is acceptable for business?

If yes - move it.

If no - confirm the behavior with the business and/or contact the 3rd party system to optimize the request. 
