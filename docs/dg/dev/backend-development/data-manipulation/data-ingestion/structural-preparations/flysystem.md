---
title: Flysystem
description: The Flysystem module integrates Spryker with the thephpleague flysystem vendor package
last_updated: Jul 27, 2026
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/flysystem
originalArticleId: b68c1798-4db1-4a2b-87bf-b54d4052a741
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/flysystem.html
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-enable-sftp-for-flysystem.html

---

The Flysystem module integrates Spryker with the [thephpleague/flysystem](https://github.com/thephpleague/flysystem) vendor package.

It handles operation and Flysystem adapter configuration and provides `FlysystemFilesystemBuilderPluginInterface`, where the `build()` method is expected to return a concrete implementation of the `\League\Flysystem\Filesystem` interface.

There are modules with adapters for Local, FTP, and AWS3 filesystems.

## Flysystem features

Quote from [Flysytem's official documentation](http://flysystem.thephpleague.com/):

- Generic API for handling common tasks across multiple file storage engines.
- A consistent output that you can rely on.
- Integrate well with other packages and frameworks.
- Be cacheable.
- Emulate directories in systems that support none, like AwsS3.
- Support third-party plugins.
- Make it easy to test your filesystem interactions.
- Support streams for big file handling.

### Module dependency graph

Flysystem provides plugins that integrate [thephpleague/flysystem](https://github.com/thephpleague/flysystem) vendor package and implement FileSystem's plugin interface.

![File_System_Dependencies](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Development/File+System/file_system_dependencies.png)

## Flysystem service API

Flysystem's Service API is almost exactly like [Flysystem's API](https://flysystem.thephpleague.com/docs/usage/filesystem-api/) with only one distinction, it takes an additional mandatory parameter containing a preconfigured filesystem name.

For details, see [Plugin configuration](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/file-system.html)

For example, to extract an image's metadata information stored under `foo/bar.jpg`, use the `getMetadata()` method with the media store's name.

```php
<?php
/**
 * Specification:
 * - Select preconfigured filesystem
 * - Get resource metadata
 * - Return resource metadata transfer, null on failure
 *
 * @param string $filesystemName
 * @param string $path
 *
 * @return \Generated\Shared\Transfer\FlysystemResourceMetadataTransfer
 */
public function getMetadata($filesystemName, $path);

$metadataTransfer = $flysystemService->getMetadata('media', 'foo/bar.jpg');
```

Or to read file content from the `customerDocument` store.

```php
<?php
/**
 * Specification:
 * - Select preconfigured filesystem
 * - Read file
 * - Return file content, false on failure
 *
 * @param string $filesystemName
 * @param string $path
 *
 * @return false|string
 */
public function read($filesystemName, $path);

$invoiceDocument = $flysystemService->read('customerData', 'invoices/2017/05/123.pdf');
```

## Flysystem filesystem adapter modules

Different filesystems require different adapters to handle them. In Spryker, we use [package principles](https://en.wikipedia.org/wiki/Package_principles) to create modular and easy-to-configure applications. Each different Flysystem adapter implementing `\League\Flysystem\FilesystemInterface` has its own module.

| MODULE | DESCRIPTIO0N | CONFIG |
| --- | --- | --- |
| FlysystemAws3v3FileSystem | Amazon AWS3 version 3 filesystem adapter. | FlysystemConfigAws3v3Transfer |
| FlysystemFtpFileSystem | FTP filesystem adapter. | FlysystemConfigFtpTransfer |
| FlysystemLocalFileSystem | Local filesystem adapter. | FlysystemConfigLocalTransfer |

You can install the adapter bundles on demand, just like any other Spryker module, or create your own.

### Flysystem config

The `FlysystemConfigTransfer` and options for [thephpleague/flysystem](https://github.com/thephpleague/flysystem) are passed to the `build()` method.

The adapter config is under `adapterConfig` and flysystem options under `flysystemConfig`.

```xml
<transfer name="FlysystemConfig">
    <property name="name" type="string" />
    <property name="type" type="string" />
    <property name="adapterConfig" type="array" />
    <property name="flysystemConfig" type="array" />
</transfer>
```

The name and type come from the project configuration.

`The value of type should point to a concrete builder plugin implementing FlysystemFilesystemBuilderPluginInterface.`

### Filesystem adapter config

Every adapter module requires its own specific settings.

**Example of** `FlysystemConfigFtp`:

```xml
<transfer name="FlysystemConfigFtp">
    <property name="host" type="string" />
    <property name="username" type="string" />
    <property name="password" type="string" />
    <property name="port" type="int" />
    <property name="root" type="string" />
    <property name="passive" type="bool" />
    <property name="ssl" type="bool" />
    <property name="timeout" type="int" />
</transfer>
```

## Adapter builders

Every implementation of `\League\Flysystem\AdapterInterface` requires a unique set of parameters or dependencies. Therefore, adapter instantiation is delegated to a specialized builder which knows about implementation details.

The builders are executed through plugins.

## Filesystem builder plugin

The Flysystem bundle uses the `FlysystemFilesystemBuilderPluginInterface` implemented by the concrete adapter's module.

The `build()` method is expected to return a class implementing the `\League\Flysystem\Filesystem` interface.

The `acceptType()` method is expected to return true if the filesystem type can be handled by the implementation.

Mapping between Filesystem and the type it can handle is done through configuration. For more details, see [Plugin Configuration](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/file-system.html).

```php
<?php
namespace Spryker\Service\Flysystem\Dependency\Plugin;

use Generated\Shared\Transfer\FlysystemConfigTransfer;

interface FlysystemFilesystemBuilderPluginInterface
{

    /**
     * @api
     *
     * @param \Generated\Shared\Transfer\FlysystemConfigTransfer $configTransfer
     * @param \League\Flysystem\PluginInterface[] $flysystemPluginCollection
     *
     * @return \League\Flysystem\Filesystem
     */
    public function build(FlysystemConfigTransfer $configTransfer, array $flysystemPluginCollection = []);

    /**
     * @api
     *
     * @param string $type
     *
     * @return bool
     */
    public function acceptType($type);

}
```

### Plugin example

Example implementation from `Aws3v3FilesystemBuilderPlugin`.

```php
<?php
namespace Spryker\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem;

use Generated\Shared\Transfer\FlysystemConfigTransfer;
use Spryker\Service\Flysystem\Dependency\Plugin\FlysystemFilesystemBuilderPluginInterface;
use Spryker\Service\Kernel\AbstractPlugin;

class Aws3v3FilesystemBuilderPlugin extends AbstractPlugin implements FlysystemFilesystemBuilderPluginInterface
{

    /**
     * @param string $type
     *
     * @return bool
     */
    public function acceptType($type)
    {
        return $type === get_class($this);
    }

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

**Flysystem adapter builder example**

An example of an `Aws3v3AdapterBuilder`, responsible for the instantiation of `League\Flysystem\Adapter\AwsS3v3\AwsS3Adapter`.

It uses its own config `FlysystemConfigAws3v3Transfer`, created by `Aws3v3FilesystemBuilder`.

```php
<?php
namespace Spryker\Service\FlysystemAws3v3FileSystem\Model\Builder\Adapter;

use Aws\S3\S3Client;
use Generated\Shared\Transfer\FlysystemConfigAws3v3Transfer;
use League\Flysystem\Adapter\AwsS3v3\AwsS3Adapter;

class Aws3v3AdapterBuilder implements AdapterBuilderInterface
{

    const KEY = 'key';
    const SECRET = 'secret';
    const REGION = 'region';
    const VERSION = 'version';
    const CREDENTIALS = 'credentials';

    /**
     * @var \League\Flysystem\Adapter\AwsS3v3\AwsS3Adapter
     */
    protected $adapter;

    /**
     * @var \Generated\Shared\Transfer\FlysystemConfigAws3v3Transfer
     */
    protected $adapterConfig;

    /**
     * @var \Aws\S3\S3Client
     */
    protected $client;

    /**
     * @param \Generated\Shared\Transfer\FlysystemConfigAws3v3Transfer $adapterConfig
     */
    public function __construct(FlysystemConfigAws3v3Transfer $adapterConfig)
    {
        $this->adapterConfig = $adapterConfig;
    }

    /**
     * @return \League\Flysystem\AdapterInterface
     */
    public function build()
    {
        $this
            ->buildS3Client()
            ->buildAdapter();

        return $this->adapter;
    }

    /**
     * @return $this
     */
    protected function buildS3Client()
    {
        $this->client = new S3Client([
            self::CREDENTIALS => [
                self::KEY => $this->adapterConfig->getKey(),
                self::SECRET => $this->adapterConfig->getSecret(),
            ],
            self::REGION => $this->adapterConfig->getRegion(),
            self::VERSION => $this->adapterConfig->getVersion(),
        ]);

        return $this;
    }

    /**
     * @return $this
     */
    protected function buildAdapter()
    {
        $this->adapter = new AwsS3Adapter($this->client, $this->adapterConfig->getBucket());

        return $this;
    }

}
```

**Flysystem filesystem builder example**

The following is an example of `Aws3v3FilesystemBuilder`, responsible for instantiation of Filesystem implementing `League\Flysystem\FilesystemInterface`. It creates a config using `FlysystemConfigAws3v3Transfer` and validates it.

```php
<?php
namespace Spryker\Service\FlysystemAws3v3FileSystem\Model\Builder\Filesystem;

use Generated\Shared\Transfer\FlysystemConfigAws3v3Transfer;
use Spryker\Service\FlysystemAws3v3FileSystem\Model\Builder\Adapter\Aws3v3AdapterBuilder;

class Aws3v3FilesystemBuilder extends AbstractFilesystemBuilder
{

    /**
     * @return \Generated\Shared\Transfer\FlysystemConfigAws3v3Transfer
     */
    protected function buildAdapterConfig()
    {
        $configTransfer = new FlysystemConfigAws3v3Transfer();
        $configTransfer->fromArray($this->config->getAdapterConfig(), true);

        return $configTransfer;
    }

    /**
     * @return void
     */
    protected function assertAdapterConfig()
    {
        $adapterConfigTransfer = $this->buildAdapterConfig();

        $adapterConfigTransfer->requireRoot();
        $adapterConfigTransfer->requirePath();
        $adapterConfigTransfer->requireKey();
        $adapterConfigTransfer->requireSecret();
        $adapterConfigTransfer->requireBucket();
        $adapterConfigTransfer->requireVersion();
        $adapterConfigTransfer->requireRegion();
    }

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

**AbstractFilesystemBuilder example**

The following is an example of `AbstractFilesystemBuilder` from the `FlysystemAws3v3FileSystem` module.

```php
<?php
namespace Spryker\Service\FlysystemAws3v3FileSystem\Model\Builder\Filesystem;

use Generated\Shared\Transfer\FlysystemConfigTransfer;
use League\Flysystem\Filesystem;

abstract class AbstractFilesystemBuilder implements FilesystemBuilderInterface
{

    /**
     * @var \Generated\Shared\Transfer\FlysystemConfigTransfer
     */
    protected $config;

    /**
     * @param \Generated\Shared\Transfer\FlysystemConfigTransfer $configTransfer
     */
    public function __construct(FlysystemConfigTransfer $configTransfer)
    {
        $this->config = $configTransfer;
    }

    /**
     * @return void
     */
    abstract protected function assertAdapterConfig();

    /**
     * @return \Spryker\Service\FlysystemAws3v3FileSystem\Model\Builder\Adapter\AdapterBuilderInterface
     */
    abstract protected function createAdapterBuilder();

    /**
     * @return \League\Flysystem\Filesystem
     */
    public function build()
    {
        $this->assertAdapterConfig();
        $filesystem = $this->buildFilesystem();

        return $filesystem;
    }

    /**
     * @return \League\Flysystem\Filesystem
     */
    protected function buildFilesystem()
    {
        $adapter = $this->createAdapterBuilder()->build();
        $config = $this->config->getFlysystemConfig() ?: [];

        return new Filesystem($adapter, $config);
    }

}
```

## AWS S3 filesystem builder plugins

The `FlysystemAws3v3FileSystem` module provides two builder plugins for Amazon S3. Both return a `\League\Flysystem\Filesystem` backed by the AWS S3 v3 adapter; they differ only in how AWS credentials are resolved.

| | `Aws3v3FilesystemBuilderPlugin` | `IamAws3v3FilesystemBuilderPlugin` |
| --- | --- | --- |
| Credentials | Explicit `key` and `secret` from the adapter config | Resolved automatically by the AWS SDK default credential provider chain |
| Required adapter config | `key`, `secret`, `bucket`, `region`, `path` | `bucket`, `region` |
| `key` / `secret` | Used | Ignored |
| `endpoint` | Always passed to the S3 client | Passed only when non-empty |
| Recommended for | Environments where explicit access keys are provisioned | Spryker-managed (PaaS) environments with an IAM role attached to the workload |

Both plugins can be registered side by side. The `sprykerAdapterClass` value of each filesystem entry decides which plugin builds that filesystem, so different filesystems can use different credential strategies at the same time. Switching an existing filesystem from one plugin to the other is not a breaking change, and nothing is migrated automatically.

### IamAws3v3FilesystemBuilderPlugin

Use `IamAws3v3FilesystemBuilderPlugin` when the runtime—an ECS task or EC2 instance—carries an IAM role that grants access to the target bucket. The plugin does not pass a `credentials` entry to the S3 client, so the AWS SDK falls back to its default credential provider chain: environment variables (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`), the shared credentials and config files, ECS container credentials, and finally EC2 instance metadata (IMDS).

This is the recommended option for Spryker-managed (PaaS) environments, where storing long-lived `key` and `secret` pairs in the container is undesirable. It is used, for example, for the public-media buckets that store Back Office, Storefront, and Merchant Portal media, and for the Product Experience Management import and export filesystems.

#### Adapter configuration reference

| PROPERTY | REQUIRED | DESCRIPTION |
| --- | --- | --- |
| `bucket` | Yes | Target S3 bucket. A missing value throws `NoBucketException`. |
| `region` | Yes | AWS region of the bucket. |
| `path` | No | Path prefix inside the bucket. Defaults to an empty string. |
| `endpoint` | No | Custom endpoint for S3-compatible storage such as MinIO or LocalStack. Applied only when non-empty. |
| `isStreamReads` | No | Whether reads are streamed. Defaults to `false`. |
| `key`, `secret` | Ignored | Not read by this plugin. Credentials come from the IAM role or the AWS SDK credential chain. |

{% info_block infoBox "Credentials in configuration" %}

Because `IamAws3v3FilesystemBuilderPlugin` ignores `key` and `secret`, you do not need to set them for filesystems that use this plugin. If they are present, they have no effect.

{% endinfo_block %}

#### Configuration example

**config/Shared/config_default.php**

```php
use Spryker\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\IamAws3v3FilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    // ... existing entries ...
    'backoffice-media' => [
        'sprykerAdapterClass' => IamAws3v3FilesystemBuilderPlugin::class,
        'bucket' => getenv('SPRYKER_S3_PUBLIC_ASSETS_BUCKET') ?: '',
        'region' => getenv('AWS_REGION') ?: '',
        'path' => '/backoffice-media',
    ],
];
```

#### Registration

Register the plugin in `\Pyz\Service\Flysystem\FlysystemDependencyProvider::getFilesystemBuilderPluginCollection()` next to the other builder plugins:

```php
protected function getFilesystemBuilderPluginCollection(): array
{
    return [
        new FtpFilesystemBuilderPlugin(),
        new LocalFilesystemBuilderPlugin(),
        new Aws3v3FilesystemBuilderPlugin(),
        new IamAws3v3FilesystemBuilderPlugin(),
    ];
}
```

#### Local development

For local development, set the `endpoint` option to point at an S3-compatible service such as MinIO or LocalStack. Alternatively, use `LocalFilesystemBuilderPlugin` when no bucket is configured.

### Aws3v3FilesystemBuilderPlugin

Use `Aws3v3FilesystemBuilderPlugin` when the environment provisions explicit access keys instead of an IAM role. The plugin reads `key` and `secret` from the adapter config and passes them to the S3 client as static credentials.

#### Configuration example

**config/Shared/config_default.php**

```php
use Spryker\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\Aws3v3FilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    // ... existing entries ...
    'backoffice-media' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'key' => getenv('SPRYKER_S3_PUBLIC_ASSETS_KEY') ?: '',
        'secret' => getenv('SPRYKER_S3_PUBLIC_ASSETS_SECRET') ?: '',
        'bucket' => getenv('SPRYKER_S3_PUBLIC_ASSETS_BUCKET') ?: '',
        'region' => getenv('AWS_REGION') ?: '',
        'path' => '/backoffice-media',
    ],
];
```

## Flysystem plugins

The [thephpleague/flysystem vendor package](https://github.com/thephpleague/flysystem) also supports plugins.

In Spryker, they are loaded using `FlysystemDependencyProvider` and automatically passed to the `build()` method.

All you need to do is to configure them in the `addFlysystemPluginCollection()` method.

```php
<?php
namespace Spryker\Service\Flysystem;

use Spryker\Service\Kernel\AbstractBundleDependencyProvider;
use Spryker\Service\Kernel\Container;

class FlysystemDependencyProvider extends AbstractBundleDependencyProvider
{

    /**
     * @param \Spryker\Service\Kernel\Container $container
     *
     * @return \Spryker\Service\Kernel\Container
     */
    protected function addFlysystemPluginCollection($container)
    {
        $container[self::PLUGIN_COLLECTION_FLYSYSTEM] = function (Container $container) {
            return [];
        };

        return $container;
    }
```

`FlysystemServiceFactory` uses the configured plugins stack in `buildFilesystemCollection()` using the `getFlysystemPluginCollection()` method.

{% info_block warningBox "Warning" %}

To overwrite `buildFilesystemCollection()`, make sure to carry over this behavior. Otherwise, implement the `Flysystem` plugin loading and configuration on your own.

{% endinfo_block %}

## Enable SFTP

Flysystem does not support SFTP by default, but the separate [Flysystem Adapter for SFTP module](https://github.com/thephpleague/flysystem-sftp) enables it.

To enable SFTP for Flysystem, implement `FlysystemFilesystemBuilderPluginInterface` and add it to `\Pyz\Service\Flysystem\FlysystemDependencyProvider::addFilesystemBuilderPluginCollection`.
