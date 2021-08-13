---
title: HowTo — enable SFTP for Flysystem
description: Learn how to enable SFTP for Flysystem.
originalLink: https://documentation.spryker.com/v6/docs/howto-enable-sftp-for-flysystem
originalArticleId: 0fb23f85-548f-4061-94d0-b1a09f367f34
redirect_from:
  - /v6/docs/howto-enable-sftp-for-flysystem
  - /v6/docs/en/howto-enable-sftp-for-flysystem
---

This document describes how to enable SFTP connection for [Flysystem](/docs/scos/dev/developer-guides/202009.0/development-guide/back-end/data-manipulation/data-ingestion/structural-preparations/flysystem.html).

Flysystem does not support SFTP by default, but the separate [Flysystem Adapter for SFTP module](https://github.com/thephpleague/flysystem-sftp) enables it.

To enable SFTP for Flysystem, implement `FlysystemFilesystemBuilderPluginInterface` and add it to `\Pyz\Service\Flysystem\FlysystemDependencyProvider::addFilesystemBuilderPluginCollection`.


