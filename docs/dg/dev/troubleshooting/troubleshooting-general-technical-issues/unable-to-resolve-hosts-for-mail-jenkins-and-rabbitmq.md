---
title: Unable to resolve hosts for Mail, Jenkins, and RabbitMQ
description: Learn how to fix the issue with unresolved hosts for Mail, Jenkins, and RabbitMQ on Windows
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/unable-to-resolve-hosts-for-mail-jenkins-and-rabbitmq
originalArticleId: bbddc907-8edc-4e0f-b880-b67381364801
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/unable-to-resolve-hosts-for-mail-jenkins-and-rabbitmq.html
---

## Description

The issue occurs when setting up Docker and WSL 2 and adding routes to `etc/hosts` in one line on Windows. Host file has row 127.0.0.1.

## Cause

The cause of the issue might be in the maximum length limitaion of a line that you can have in your hosts file in Windows.

## Solution

In the hosts file, start a new line with `127.0.0.1`, and then add routes for services for which the hosts are not resolved.
