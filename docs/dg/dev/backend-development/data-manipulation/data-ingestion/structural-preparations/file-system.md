---
title: File system
description: The FileSystem Service provides an abstraction for file systems. It uses the same interface to access different types of file systems, regardless of their location or protocol.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/filesystem
originalArticleId: 7fa39597-bd42-4582-af4a-9114ad7611c8
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/file-system.html
---

The FileSystem Service provides an abstraction for file systems. It uses the same interface to access different types of file systems, regardless of their location or protocol.

The `Flysystem` module provides plugins for the [thephpleague/flysystem](https://github.com/thephpleague/flysystem) vendor package and implements FileSystem's plugin interfaces. For more details, see [Flysystem](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/flysystem.html).

## The `FileSystem` module

The `FileSystem` module uses `FileSystemReaderPluginInterface` to execute read operations, `FileSystemWriterPluginInterface` to execute write operations, and `FileSystemStreamPluginInterface` to handle big read or write operations.

![File_System_Dependencies.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Development/File+System/file_system_dependencies.png)

## FileSystem plugin interfaces system

| PLUGIN INTERFACE | DESCRIPTION |
| --- | --- |
| FileSystemReaderPluginInterface | Reading operations |
| FileSystemWriterPluginInterface | Writing operations |
| FileSystemWriterPluginInterface | Stream handling operations |

## Plugin configuration

The FileSystem plugins are loaded using `FileSystemDependencyProvider` by the methods: `addFileSystemReaderPlugin()`, `addFileSystemWriterPlugin()` and `addFileSystemStreamPlugin()`.

```php
<?php
namespace Spryker\Service\FileSystem;

use Spryker\Service\Flysystem\Plugin\FileSystem\FileSystemReaderPlugin;
use Spryker\Service\Flysystem\Plugin\FileSystem\FileSystemStreamPlugin;
use Spryker\Service\Flysystem\Plugin\FileSystem\FileSystemWriterPlugin;
use Spryker\Service\Kernel\AbstractBundleDependencyProvider;
use Spryker\Service\Kernel\Container;

class FileSystemDependencyProvider extends AbstractBundleDependencyProvider
{
    /**
     * @param \Spryker\Service\Kernel\Container $container
     *
     * @return \Spryker\Service\Kernel\Container
     */
    protected function addFileSystemReaderPlugin(Container $container)
    {
        $container[static::PLUGIN_READER] = function (Container $container) {
            return new FileSystemReaderPlugin();
        };

        return $container;
    }

    /**
     * @param \Spryker\Service\Kernel\Container $container
     *
     * @return \Spryker\Service\Kernel\Container
     */
    protected function addFileSystemWriterPlugin(Container $container)
    {
        $container[static::PLUGIN_WRITER] = function (Container $container) {
            return new FileSystemWriterPlugin();
        };

        return $container;
    }

    /**
     * @param \Spryker\Service\Kernel\Container $container
     *
     * @return \Spryker\Service\Kernel\Container
     */
    protected function addFileSystemStreamPlugin(Container $container)
    {
        $container[static::PLUGIN_STREAM] = function (Container $container) {
            return new FileSystemStreamPlugin();
        };

        return $container;
    }
```

### Service configuration

You can use multiple `FileSystem` modules at once. They are identified by name and contain all the configurations required by a specific `FileSystem` adapter and type defined under `sprykerAdapterClass`.

{% info_block warningBox %}

`sprykerAdapterClass` needs to point to the builder plugin used to create `FileSystem`.

{% endinfo_block %}

**Separate FileSystems for media and documents**

You can create separate file systems for media content and documents.

For example, you can define two `FileSystem` modules. One is called *media* that only contains media-specific content like images, video, and audio. Another is called *customer*, which contains customer-sensitive information that can't be stored in the cloud.

We use local file systems for development purposes but config for staging or production environments. Therefore, you can, for example, provide an AWS3 adapter without having to change any code. More precisely, with only configuration, you can read and write files from AWS3 with no need to change any code mirroring your development environment's logic for writing to the local file system.

**Development environment example:**

```php
<?php

use Spryker\Shared\FileSystem\FileSystemConstants;
use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'media' => [
        'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
        'root' => APPLICATION_ROOT_DIR . '/data/DE/media/',
        'path' => 'images/categories/',
    ],
    'customer' => [
        'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
        'root' => APPLICATION_ROOT_DIR . '/data/DE/customer_storage/',
        'path' => 'documents/',
    ],
];
```

**Staging/Production environment example:**
```php
<?php

use Spryker\Shared\FileSystem\FileSystemConstants;
use Spryker\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\Aws3v3FilesystemBuilderPlugin;
use Spryker\Service\FlysystemFtpFileSystem\Plugin\Flysystem\FtpFilesystemBuilderPlugin;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    'media' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'root' => '/DE/',
        'path' => 'media/',
        'key' => '..',
        'secret' => '..',
        'bucket' => '..',
        'version' => '..',
        'region' => '..',
    ],
    'customer' => [
        'sprykerAdapterClass' => FtpFilesystemBuilderPlugin::class,
        'host' => '..',
        'username' => '..',
        'password' => '..',
    ],
];
```

## FileSystem usage

After defining some `FileSystem` modules, you can start using them—for example, get metadata information of a media file stored under `foo/bar.jpg`.

```php
<?php
use Generated\Shared\Transfer\FileSystemQueryTransfer;

$fileSystemQueryTransfer = new FileSystemQueryTransfer();
$fileSystemQueryTransfer->setFileSystemName('media');
$fileSystemQueryTransfer->setPath('/foo/bar.jpg');

$metadataTransfer = $fileSystemService->getMetadata($fileSystemQueryTransfer);
```

**Get metadata:**

Define the `FileSystem` name provided in the configuration and set the path to the filename you want to extract metadata from.

{% info_block warningBox %}

The read methods use mostly `FileSystemQueryTransfer`, the write methods use mostly `FileSystemContentTransfer`, and stream methods use `FileSystemStreamTransfer`.

{% endinfo_block %}
