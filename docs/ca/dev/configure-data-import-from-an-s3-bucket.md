---
title: Configure data import from an S3 bucket via Flysystem
description: Learn how to import data via an S3 bucket.  
template: howto-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/configuring-data-import-from-an-s3-bucket.html
---

Unlike a local environment, a cloud one cannot hold the data you want to import for any determined amount of time. That’s why you need to store the data in persistent storage, like an S3 bucket, and configure your Spryker environment to access and use the import data there.

By default, data import relies on `\Spryker\Zed\DataImport\Business\Model\DataReader\CsvReader\CsvReader`.It works only with the `data/import` folder in the local file system, based on `\SplFileObject`.

This document describes how to replace the original CsvReader with the one based on the FlysystemService abstraction. It uses streams and standard PHP functions to read files as CSV files: line-by-line, count lines, and move forward and backward.

## Prerequisites

Before you start, make sure that you have the following:

* Write permissions in the SCCOS repository

* An S3 bucket with write permissions

## 1. Configure a CsvReader based on Flysystem

To configure a CsvReader:

1. Implement the interface that is used by the `CsvReader` class to get a FileSystem name:
**CsvReaderConfigurationInterface.php**
```php
namespace Pyz\Zed\CsvReader\Business\Reader;

use Spryker\Zed\DataImport\Business\Model\DataReader\CsvReader\CsvReaderConfigurationInterface as SprykerCsvReaderConfigurationInterface;

interface CsvReaderConfigurationInterface extends SprykerCsvReaderConfigurationInterface
{
    /**
     * @return string
     */
    public function getFileSystem(): string;
}
```


2. To implement `getFileSystem()` that returns a FileSystem configuration name, extend `CsvReaderConfiguration.php` with the `CsvReaderConfigurationInterface.php` interface.

```php
namespace Pyz\Zed\CsvReader\Business\Reader;

use Spryker\Zed\DataImport\Business\Model\DataReader\CsvReader\CsvReaderConfiguration as SprykerCsvReaderConfiguration;

class CsvReaderConfiguration extends SprykerCsvReaderConfiguration implements CsvReaderConfigurationInterface
{
    protected const DEFAULT_FILE_SYSTEM = 's3-import';

    /**
     * @return string
     */
    public function getFileSystem(): string
    {
        return static::DEFAULT_FILE_SYSTEM;
    }
}
```

3. Introduce a new CsvReader based on Flysystem.

<details><summary markdown='span'>CsvReader</summary>

```php
namespace Pyz\Zed\CsvReader\Business\Reader;

use Countable;
use Exception;
use Generated\Shared\Transfer\DataImporterReaderConfigurationTransfer;
use Spryker\Service\FileSystem\Dependency\Exception\FileSystemReadException;
use Spryker\Service\FileSystem\Dependency\Exception\FileSystemStreamException;
use Spryker\Service\Flysystem\FlysystemServiceInterface;
use Spryker\Zed\DataImport\Business\Exception\DataReaderException;
use Spryker\Zed\DataImport\Business\Exception\DataSetWithHeaderCombineFailedException;
use Spryker\Zed\DataImport\Business\Model\DataReader\ConfigurableDataReaderInterface;
use Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class CsvReader implements DataReaderInterface, ConfigurableDataReaderInterface, Countable
{
    /**
     * @var resource
     */
    protected $fileObject;

    /**
     * @var array|null
     */
    protected $dataSetKeys;

    /**
     * @var \Pyz\Zed\CsvReader\Business\Reader\CsvReaderConfigurationInterface
     */
    protected $csvReaderConfiguration;

    /**
     * @var \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface
     */
    protected $dataSet;

    /**
     * @var int|null
     */
    protected $offset;

    /**
     * @var int|null
     */
    protected $limit;

    /**
     * @var int Count of lines in file
     */
    protected $count;

    /**
     * @var int
     */
    protected $key = 0;

    /**
     * @var int Key of the row that we need to import
     */
    protected $importableKey = 0;

    /**
     * @var FlysystemServiceInterface
     */
    protected $flysystemService;

    /**
     * @param \Pyz\Zed\CsvReader\Business\Reader\CsvReaderConfigurationInterface $csvReaderConfiguration
     * @param FlysystemServiceInterface $flysystemService
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     */
    public function __construct(
        CsvReaderConfigurationInterface $csvReaderConfiguration,
        FlysystemServiceInterface $flysystemService,
        DataSetInterface $dataSet
    ) {
        $this->csvReaderConfiguration = $csvReaderConfiguration;
        $this->dataSet = $dataSet;
        $this->flysystemService = $flysystemService;
        $this->configureReader();
    }

    /**
     * @return void
     */
    protected function configureReader()
    {
        $this->createFileObject();
        $this->setDataSetKeys();
        $this->setOffsetAndLimit();
    }

    /**
     * @throws \Spryker\Zed\DataImport\Business\Exception\DataReaderException
     *
     * @return void
     */
    protected function createFileObject()
    {
        $fileSystemName = $this->csvReaderConfiguration->getFileSystem();
        $fileName = $this->csvReaderConfiguration->getFileName();
        try {
            if (!$this->flysystemService->has($fileSystemName, $fileName)) {
                throw new DataReaderException(sprintf('File "%s" could not be found or is not readable.', $fileName));
            }
        } catch (FileSystemReadException $exception) {
            $message = sprintf('File "%s" could not be found or is not readable: ' . $exception->getMessage(), $fileName);
            throw new DataReaderException($message, $exception->getCode(), $exception);
        }

        try {
            $this->fileObject = $this->flysystemService->readStream($fileSystemName, $fileName);
        } catch (FileSystemStreamException $exception) {
            $message = sprintf('File "%s" can not be streamed: ' . $exception->getMessage(), $fileName);
            throw new DataReaderException($message, $exception->getCode(), $exception);
        }
    }

    /**
     * @param \Generated\Shared\Transfer\DataImporterReaderConfigurationTransfer $dataImportReaderConfigurationTransfer
     *
     * @return $this
     */
    public function configure(DataImporterReaderConfigurationTransfer $dataImportReaderConfigurationTransfer)
    {
        $this->csvReaderConfiguration->setDataImporterReaderConfigurationTransfer($dataImportReaderConfigurationTransfer);

        $this->configureReader();

        return $this;
    }

    /**
     * @return void
     */
    protected function setDataSetKeys()
    {
        if ($this->csvReaderConfiguration->hasHeader()) {
            $this->dataSetKeys = $this->getRowAndGoNext();
        }
    }

    /**
     * @return void
     */
    protected function setOffsetAndLimit()
    {
        $this->offset = $this->csvReaderConfiguration->getOffset();
        $this->limit = $this->csvReaderConfiguration->getLimit();
    }

    /**
     * @return array|null
     */
    protected function getRow(): ?array
    {
        $row = fgetcsv(
            $this->fileObject,
            0,
            $this->csvReaderConfiguration->getDelimiter(),
            $this->csvReaderConfiguration->getEnclosure(),
            $this->csvReaderConfiguration->getEscape()
        );

        if (!$row) {
            return null;
        }

        return $row;
    }

    /**
     * @return array|null
     */
    protected function getCurrentRow(): ?array
    {
        $currentPosition = ftell($this->fileObject);
        $row = $this->getRow();
        fseek($this->fileObject, $currentPosition);

        return $row;
    }

    /**
     * @return array|null
     */
    protected function getRowAndGoNext(): ?array
    {
        $this->incrementKey();

        return $this->getRow();
    }

    /**
     * @throws \Spryker\Zed\DataImport\Business\Exception\DataSetWithHeaderCombineFailedException
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface
     */
    public function current(): DataSetInterface
    {
        $dataSet = null;
        while ($this->valid()) {
            $dataSet = $this->getCurrentRow();

            if (!$this->isEmpty($dataSet)) {
                break;
            }

            $this->next();
        }

        $this->incrementImportableKey();

        if ($this->dataSetKeys) {
            $dataSetBeforeCombine = $dataSet;
            try {
                $dataSet = array_combine($this->dataSetKeys, $dataSet);
            } catch (Exception $e) {
                throw new DataSetWithHeaderCombineFailedException(sprintf(
                    'Can not combine data set header with current data set. Keys: "%s", Values "%s"',
                    implode(', ', $this->dataSetKeys),
                    implode(', ', array_values($dataSetBeforeCombine))
                ), 0, $e);
            }
        }

        $this->dataSet->exchangeArray($dataSet);

        return $this->dataSet;
    }

    /**
     * @return void
     */
    public function next()
    {
        $this->getRowAndGoNext();
    }

    /**
     * @return int
     */
    public function count(): int
    {
        if (!$this->count) {
            $this->calculateCount();
        }

        return $this->count;
    }

    /**
     * @return void
     */
    protected function calculateCount()
    {
        $this->count = 0;

        $this->rewind();

        while (($row = $this->getRowAndGoNext()) !== null) {
            if ($this->isEmpty($row)) {
                continue;
            }

            $this->count++;
        }

        $this->rewind();
    }

    /**
     * @param array $row
     *
     * @return bool
     */
    protected function isEmpty(array $row): bool
    {
        if (count($row) == 1 && $row[0] == '') {
            return true;
        }

        return false;
    }

    /**
     * @return int
     */
    public function key(): int
    {
        return $this->key;
    }

    /**
     * @return void
     */
    protected function incrementKey()
    {
        $this->key++;
    }

    /**
     * @return void
     */
    protected function incrementImportableKey()
    {
        $this->importableKey++;
    }

    /**
     * @return void
     */
    protected function resetKeys()
    {
        $this->key = 0;
        $this->importableKey = 0;
    }

    /**
     * @return bool
     */
    public function valid(): bool
    {
        if ($this->limit !== null && $this->limit !== 0) {
            if ($this->offset !== null) {
                return ($this->key() < $this->offset + $this->limit);
            }
        }

        return $this->importableKey < $this->count;
    }

    /**
     * @return void
     */
    public function rewind()
    {
        rewind($this->fileObject);
        $this->resetKeys();

        if ($this->offset) {
            fseek($this->fileObject, $this->offset - 1);
        }

        if ($this->csvReaderConfiguration->hasHeader()) {
            $this->next();
        }
    }
}
```

</details>

4. Add the `addFlysystemService()` method and the `SERVICE_FLYSYSTEM` constant:

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**
```php
...
use Spryker\Service\Flysystem\FlysystemServiceInterface;
...

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    ...
    public const SERVICE_FLYSYSTEM = 'SERVICE_FLYSYSTEM';
    ...

    /**
     * @param Container $container
     *
     * @return Container
     */
    private function addFlysystemService(Container $container): Container
    {
        $container[static::SERVICE_FLYSYSTEM] = function (Container $container): FlysystemServiceInterface {
            return $container->getLocator()->flysystem()->service();
        };

        return $container;
    }
}
```


5. In `src/Pyz/Zed/DataImport/Business/DataImportBusinessFactory.php`, do the following:

* Pass the dependency from the previous step to the `CsvReader` constructor.

* To return the class you’ve created in step 3, add the `getFlysystemService()` method and edit the `createCsvReader()` method.

```php
...
use Generated\Shared\Transfer\DataImporterReaderConfigurationTransfer;
use Pyz\Zed\CsvReader\Business\Reader\CsvReader;
use Pyz\Zed\CsvReader\Business\Reader\CsvReaderConfiguration;
use Spryker\Service\Flysystem\FlysystemServiceInterface;
use Spryker\Zed\DataImport\Business\Model\DataReader\CsvReader\CsvReaderConfigurationInterface;
...

   /**
     * @param \Pyz\Zed\CsvReader\Business\Reader\CsvReaderConfigurationInterface $csvReaderConfiguration
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataReader\CsvReader\CsvReader|\Spryker\Zed\DataImport\Business\Model\DataReader\DataReaderInterface
     */
    public function createCsvReader(CsvReaderConfigurationInterface $csvReaderConfiguration)
    {
        return new CsvReader(
            $csvReaderConfiguration,
            $this->getFlysystemService(),
            $this->createDataSet()
        );
    }

    /**
     * @return Spryker\Service\Flysystem\FlysystemServiceInterface;
     */
    private function getFlysystemService(): FlysystemServiceInterface
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::SERVICE_FLYSYSTEM);
    }
}
```

## 2. Configure the S3 Flysystem builder to read data as a stream

To read data from AWS S3 as a stream:

1.  Adjust the `AwsS3Adapter` initialization with additional parameters:
**\Spryker\Service\FlysystemAws3v3FileSystem\Model\Builder\Adapter\Aws3v3AdapterBuilder**
```php
namespace Pyz\Service\FlysystemAws3v3FileSystem\Model\Builder\Adapter;

use League\Flysystem\AwsS3v3\AwsS3Adapter;
use Spryker\Service\FlysystemAws3v3FileSystem\Exception\NoBucketException;
use Spryker\Service\FlysystemAws3v3FileSystem\Model\Builder\Adapter\Aws3v3AdapterBuilder as SprykerAws3v3AdapterBuilder;

class Aws3v3AdapterBuilder extends SprykerAws3v3AdapterBuilder
{
    /**
     * @throws \Spryker\Service\FlysystemAws3v3FileSystem\Exception\NoBucketException
     *
     * @return $this
     */
    protected function buildAdapter()
    {
        $bucket = $this->adapterConfig->getBucket();
        if ($bucket === null) {
            throw new NoBucketException('Bucket not set in adapter configuration.');
        }
        $this->adapter = new AwsS3Adapter($this->client, $bucket, false, [], false);

        return $this;
    }
}
```

2. To implement the new `Aws3v3AdapterBuilder()`,  overwrite `Aws3v3FilesystemBuilder()`:

```php
namespace Pyz\Service\FlysystemAws3v3FileSystem\Model\Builder\Filesystem;

use Pyz\Service\FlysystemAws3v3FileSystem\Model\Builder\Adapter\Aws3v3AdapterBuilder;
use Spryker\Service\FlysystemAws3v3FileSystem\Model\Builder\Filesystem\Aws3v3FilesystemBuilder as SprykerAws3v3FilesystemBuilder;

class Aws3v3FilesystemBuilder extends SprykerAws3v3FilesystemBuilder
{
    /**
     * @return \Spryker\Service\FlysystemAws3v3FileSystem\Model\Builder\Adapter\AdapterBuilderInterface
     */
    protected function createAdapterBuilder()
    {
        $adapterConfigTransfer = $this->buildAdapterConfig();

        return new Aws3v3AdapterBuilder($adapterConfigTransfer);
    }
}
```

3. To create a builder, overwrite the factory:

```php
namespace Pyz\Service\FlysystemAws3v3FileSystem;

use Generated\Shared\Transfer\FlysystemConfigTransfer;
use Pyz\Service\FlysystemAws3v3FileSystem\Model\Builder\Filesystem\Aws3v3FilesystemBuilder;
use Spryker\Service\FlysystemAws3v3FileSystem\FlysystemAws3v3FileSystemServiceFactory as SprykerFlysystemAws3v3FileSystemServiceFactory;
use Spryker\Service\Kernel\AbstractServiceFactory;

/**
 * @method \Spryker\Service\FlysystemAws3v3FileSystem\FlysystemAws3v3FileSystemConfig getConfig()
 */
class FlysystemAws3v3FileSystemServiceFactory extends SprykerFlysystemAws3v3FileSystemServiceFactory
{
    /**
     * @param \Generated\Shared\Transfer\FlysystemConfigTransfer $configTransfer
     * @param \League\Flysystem\PluginInterface[] $flysystemPluginCollection
     *
     * @return \Spryker\Service\FlysystemAws3v3FileSystem\Model\Builder\Filesystem\Aws3v3FilesystemBuilder
     */
    public function createFlysystemAws3v3FileSystemBuilder(FlysystemConfigTransfer $configTransfer, array $flysystemPluginCollection = [])
    {
        return new Aws3v3FilesystemBuilder($configTransfer);
    }
}
```

4. Introduce a plugin that references the new builder from the factory:

```php
namespace Pyz\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem;

use Generated\Shared\Transfer\FlysystemConfigTransfer;
use Spryker\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\Aws3v3FilesystemBuilderPlugin as SprykerAws3v3FilesystemBuilderPlugin;

/**
 * @method \Spryker\Service\FlysystemAws3v3FileSystem\FlysystemAws3v3FileSystemServiceFactory getFactory()
 */
class Aws3v3FilesystemBuilderPlugin extends SprykerAws3v3FilesystemBuilderPlugin
{
    /**
     * @param \Generated\Shared\Transfer\FlysystemConfigTransfer $configTransfer
     * @param \League\Flysystem\PluginInterface[] $flysystemPluginCollection
     *
     * @return \League\Flysystem\Filesystem
     */
    public function build(FlysystemConfigTransfer $configTransfer, array $flysystemPluginCollection = [])
    {
        return $this->getFactory()
            ->createFlysystemAws3v3FileSystemBuilder($configTransfer, $flysystemPluginCollection)
            ->build();
    }
}
```

5. Add the plugin you’ve created in the previous step to the `addFilesystemBuilderPluginCollection()` method:
**src/Pyz/Service/Flysystem/addFilesystemBuilderPluginCollection.php**
```php
namespace Pyz\Service\Flysystem;

use Pyz\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\Aws3v3FilesystemBuilderPlugin;
use Spryker\Service\Flysystem\FlysystemDependencyProvider as SprykerFlysystemDependencyProvider;
use Spryker\Service\FlysystemFtpFileSystem\Plugin\Flysystem\FtpFilesystemBuilderPlugin;
use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Service\Kernel\Container;

class FlysystemDependencyProvider extends SprykerFlysystemDependencyProvider
{
    /**
     * @param \Spryker\Service\Kernel\Container $container
     *
     * @return \Spryker\Service\Kernel\Container
     */
    protected function addFilesystemBuilderPluginCollection($container): Container
    {
        $container->set(static::PLUGIN_COLLECTION_FILESYSTEM_BUILDER, function (Container $container) {
            return [
                new FtpFilesystemBuilderPlugin(),
                new LocalFilesystemBuilderPlugin(),
                new Aws3v3FilesystemBuilderPlugin(),
            ];
        });

        return $container;
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

Now your `DataImport` module imports data stored on the S3 bucket.
