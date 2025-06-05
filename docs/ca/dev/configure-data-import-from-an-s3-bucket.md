---
title: Configure data import from an S3 bucket via Flysystem
description: Set up data imports from an S3 bucket in Spryker using Flysystem, with detailed configuration steps for structured, cloud-based data management.
template: howto-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/configuring-data-import-from-an-s3-bucket.html
---

Unlike a local environment, a cloud one cannot hold the data you want to import for any determined amount of time. That's why you need to store the data in persistent storage, like an S3 bucket, and configure your Spryker environment to access and use the import data there.

By default, data import relies on `\Spryker\Zed\DataImport\Business\Model\DataReader\CsvReader\CsvReader`.It works only with the `data/import` folder in the local file system, based on `\SplFileObject`.

This document describes how to replace the original CsvReader with the one based on the FlysystemService abstraction. It uses streams and standard PHP functions to read files as CSV files: line-by-line, count lines, and move forward and backward.

## Prerequisites

Before you start, make sure that you have the following:

- The following modules are installed:

| NAME                                 | VERSION |
|--------------------------------------|---------|
| spryker/data-import                  | ^1.25.0 |
| spryker/flysystem-aws3v3-file-system | ^3.0.0  |

- Write permissions in the SCCOS repository

- An S3 bucket with write permissions

## 1. Configure a data entity to be imported from an S3 bucket

To configure a data entity to be imported from an S3 bucket, adjust the `data/import` configuration file:

```yaml
- data_entity: glossary
  source: data/import/common/common/glossary.csv
  file_system: s3-import
```

By setting the `file_system` attribute to `s3-import`, the application is instructed to fetch the `glossary.csv` file from an S3 bucket,
which enhances the flexibility and scalability of the data import process.

By default, when the `file_system` attribute isn't set, the application reads the file from the local file system.

{% info_block warningBox %}
The folder structure in the S3 bucket should be the same as in the local file system.
{% endinfo_block %}


## 2. Configure the Flysystem service

Wire the `Aws3v3FilesystemBuilderPlugin` plugin used to interact with AWS S3 bucket.

**src/Pyz/Service/Flysystem/FlysystemDependencyProvider.php**

```php
namespace Pyz\Service\Flysystem;

use Pyz\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\Aws3v3FilesystemBuilderPlugin;
use Spryker\Service\Flysystem\FlysystemDependencyProvider as SprykerFlysystemDependencyProvider;
use Spryker\Service\FlysystemFtpFileSystem\Plugin\Flysystem\FtpFilesystemBuilderPlugin;
use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;

class FlysystemDependencyProvider extends SprykerFlysystemDependencyProvider
{
    /**
     * @return array<\Spryker\Service\Flysystem\Dependency\Plugin\FlysystemFilesystemBuilderPluginInterface>
     */
    protected function getFilesystemBuilderPluginCollection(): array
    {
        return [
            new FtpFilesystemBuilderPlugin(),
            new LocalFilesystemBuilderPlugin(),
            new Aws3v3FilesystemBuilderPlugin(),
        ];
    }
}
```

## 3. Configure the S3 bucket filesystem

In the desired configuration file, configure the connection to the desired S3 bucket.

```php
...
use Pyz\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\Aws3v3FilesystemBuilderPlugin;
...

// >>> FILESYSTEM
$config[FileSystemConstants::FILESYSTEM_SERVICE]['s3-import'] = [
    'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
    'root' => '/',
    'path' => '/',
    'key' => '',
    'secret' => '',
    'bucket' => '',
    'version' => 'latest',
    'region' => 'eu-central-1',
];
```

## 4. Configure the data import

To enable the data import from the external source, adjust the `DataImportConfig` class:

**src/Pyz/Zed/DataImport/DataImportConfig.php**

```php
namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;

class DataImportConfig extends SprykerDataImportConfig
{
    /**
     * @return bool
     */
    public function isDataImportFromOtherSourceEnabled(): bool
    {
        return true;
    }
}
```



Now your `DataImport` module imports data stored on the S3 bucket.
