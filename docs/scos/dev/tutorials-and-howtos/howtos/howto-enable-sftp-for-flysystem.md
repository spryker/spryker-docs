---
title: HowTo - enable SFTP for Flysystem
description: Learn how to enable SFTP for Flysystem.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-enable-sftp-for-flysystem
originalArticleId: 239ae5f5-3363-4581-90a5-20d7f22376d7
redirect_from:
  - /2021080/docs/howto-enable-sftp-for-flysystem
  - /2021080/docs/en/howto-enable-sftp-for-flysystem
  - /docs/howto-enable-sftp-for-flysystem
  - /docs/en/howto-enable-sftp-for-flysystem
  - /v6/docs/howto-enable-sftp-for-flysystem
  - /v6/docs/en/howto-enable-sftp-for-flysystem
---

This document describes how to enable SFTP connection for [Flysystem](/docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/flysystem.html).

Flysystem does not support SFTP by default, but the separate [Flysystem Adapter for SFTP module](https://github.com/thephpleague/flysystem-sftp) enables it.

To enable SFTP for Flysystem, implement `FlysystemFilesystemBuilderPluginInterface` and add it to `\Pyz\Service\Flysystem\FlysystemDependencyProvider::addFilesystemBuilderPluginCollection`.
