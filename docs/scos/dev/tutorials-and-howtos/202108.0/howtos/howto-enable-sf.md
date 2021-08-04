---
title: HowTo — enable SFTP for Flysystem
originalLink: https://documentation.spryker.com/2021080/docs/howto-enable-sftp-for-flysystem
redirect_from:
  - /2021080/docs/howto-enable-sftp-for-flysystem
  - /2021080/docs/en/howto-enable-sftp-for-flysystem
---

This document describes how to enable SFTP connection for [Flysystem](https://documentation.spryker.com/docs/flysystem).

Flysystem does not support SFTP by default, but the separate [Flysystem Adapter for SFTP module](https://github.com/thephpleague/flysystem-sftp) enables it.

To enable SFTP for Flysystem, implement `FlysystemFilesystemBuilderPluginInterface` and add it to `\Pyz\Service\Flysystem\FlysystemDependencyProvider::addFilesystemBuilderPluginCollection`.


