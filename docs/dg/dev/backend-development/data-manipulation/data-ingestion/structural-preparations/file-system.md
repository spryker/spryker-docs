---
title: File system
description: The FileSystem Service provides an abstraction for file systems. It uses the same interface to access different types of file systems, regardless of their location or protocol.
last_updated: Oct 19, 2026
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
| FileSystemStreamPluginInterface | Stream handling operations |
| FileSystemTemporaryUrlGeneratorPluginInterface | Generating temporary URLs. Implemented by the reader plugin. For details, see [Generate temporary URLs](#generate-temporary-urls). |

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

## Generate temporary URLs

Files in private storage, such as a private AWS S3 bucket, have no public URL. To let a customer or an external system download such a file without making it public and without streaming it through your application, generate a temporary URL for it.

A temporary URL is a signed link that grants read access to a single file and stops working at an expiration time that you set. For AWS S3, a temporary URL is a [presigned URL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html).

### Prerequisites

To generate temporary URLs for a filesystem, the following conditions must be met:

- The reader plugin registered in `FileSystemDependencyProvider::addFileSystemReaderPlugin()` implements `FileSystemTemporaryUrlGeneratorPluginInterface`. `Spryker\Service\Flysystem\Plugin\FileSystem\FileSystemReaderPlugin` implements it.
- The filesystem uses an adapter that supports temporary URLs. With the `Flysystem` module, the adapter must implement `League\Flysystem\UrlGeneration\TemporaryUrlGenerator`, which requires `league/flysystem` 3.10.2 or later. The AWS S3 adapter used by `Aws3v3FilesystemBuilderPlugin` and `IamAws3v3FilesystemBuilderPlugin` supports temporary URLs. The local and FTP adapters do not. For the AWS S3 configuration, see [AWS S3 filesystem builder plugins](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/flysystem.html#aws-s3-filesystem-builder-plugins).

### Generate a temporary URL

To generate a temporary URL, pass `FileSystemTemporaryUrlQueryTransfer` to `FileSystemService::getTemporaryUrl()`:

| PROPERTY | REQUIRED | DESCRIPTION |
| --- | --- | --- |
| `fileSystemName` | Yes | Name of a filesystem defined in `FileSystemConstants::FILESYSTEM_SERVICE`. |
| `path` | Yes | Path to the file inside the filesystem. |
| `expiresAt` | Yes | Time when the URL stops working. Accepts any value that `DateTimeImmutable` can parse, for example `+10 minutes` or `2026-10-20 12:00:00`. The maximum lifetime depends on the adapter. For AWS S3, it is 7 days. |
| `config` | No | Options that are passed to the filesystem adapter. For AWS S3, use `get_object_options` to add parameters to the `GetObject` request, such as `ResponseContentDisposition`, and `presigned_request_options` to pass options to the AWS SDK `S3Client::createPresignedRequest()` method. |

The following example generates a URL that is valid for 10 minutes for an invoice stored in the `customer-documents` filesystem, which uses an AWS S3 builder plugin. The `ResponseContentDisposition` option makes the browser download the file as `invoice-123.pdf` instead of displaying it.

```php
<?php

use Generated\Shared\Transfer\FileSystemTemporaryUrlQueryTransfer;

$fileSystemTemporaryUrlQueryTransfer = (new FileSystemTemporaryUrlQueryTransfer())
    ->setFileSystemName('customer-documents')
    ->setPath('invoices/2026/10/123.pdf')
    ->setExpiresAt('+10 minutes')
    ->setConfig([
        'get_object_options' => [
            'ResponseContentDisposition' => 'attachment; filename="invoice-123.pdf"',
        ],
    ]);

$temporaryUrl = $fileSystemService->getTemporaryUrl($fileSystemTemporaryUrlQueryTransfer);
```

`getTemporaryUrl()` throws `FileSystemReadException` in the following cases:

- The reader plugin does not implement `FileSystemTemporaryUrlGeneratorPluginInterface`.
- The filesystem adapter does not support temporary URLs.
- `expiresAt` cannot be parsed into a date.

### Considerations for temporary URLs

- Anyone who has a temporary URL can download the file until the URL expires. Set `expiresAt` to the shortest time that covers your use case.
- `getTemporaryUrl()` does not check whether the file exists. For a path that does not exist, it returns a URL, and a request to this URL fails. To check that the file exists before generating the URL, use `FileSystemService::has()`.
- If the filesystem authenticates with temporary credentials, such as the IAM role used by `IamAws3v3FilesystemBuilderPlugin`, the URL stops working when these credentials expire, even if `expiresAt` is later.
