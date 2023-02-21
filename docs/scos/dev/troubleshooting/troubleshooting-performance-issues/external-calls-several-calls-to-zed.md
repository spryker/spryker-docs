---
title: External calls—several calls to Zed
description: Troubleshoot the performance issue with several external calls to Zed
template: troubleshooting-guide-template
---

Some actions, parts of the website, or the whole website is slow.

## Cause

A lot of Zed calls.

Example of more than one Zed call in the Blacfire report:
![external-calls-several-calls-to-zed](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/external-calls-several-calls-to-zed/external-calls-zed.png)

## Solution

Spryker recommends having as few Zed calls as possible. Ideally, it has to be one only. Optimize to have one call where possible.
