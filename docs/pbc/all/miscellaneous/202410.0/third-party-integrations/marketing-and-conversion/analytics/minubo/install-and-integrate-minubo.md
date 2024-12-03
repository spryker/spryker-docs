---
title: Install and integrate Minubo
description: Learn how to install and integrate Minubo into your Spryker Cloud Commerce OS store
template: howto-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/scos/dev/technology-partner-guides/201811.0/marketing-and-conversion/analytics/installing-and-integrating-minubo.html
  - /docs/scos/dev/technology-partner-guides/201903.0/marketing-and-conversion/analytics/installing-and-integrating-minubo.html
  - /docs/scos/dev/technology-partner-guides/201907.0/marketing-and-conversion/analytics/installing-and-integrating-minubo.html
  - /docs/scos/dev/technology-partner-guides/202005.0/marketing-and-conversion/analytics/installing-and-integrating-minubo.html
  - /docs/scos/dev/technology-partner-guides/202204.0/marketing-and-conversion/analytics/installing-and-integrating-minubo.html
---

The Minubo module provides functionality to export order and customer data that was updated since last run of export. Data exported to Amazon S3 bucket as file with list of JSON-objects.

Export process runs in two modes:

1. Automatic mode - every 15 minutes (default)
2. Manual mode - using console command:
```bash
vendor/bin/console minubo:export:data
```
As a result, the module puts two files `Customer_TIMESTAMP.json and Order_TIMESTAMP.json` with updated data to Amazon S3 bucket. If there were no changes the module would put empty files.

## Installing and configuring Minubo

To install and configure Minubo, do the following:

1. To install Minubo run next command in the console:
```bash
composer require spryker-eco/minubo
```
2. Copy over the content from `config/config.dist.php` to `config_default.php` and add the values:
```php
...
use Spryker\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\Aws3v3FilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;
use SprykerEco\Shared\Minubo\MinuboConstants;
...
$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
'minubo' => [
'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
'root' => '/minubo/',
'path' => 'data/',
'key' => '..',
'secret' => '..',
'bucket' => '..',
'version' => 'latest',
'region' => '..',
],
];

$config[MinuboConstants::MINUBO_FILE_SYSTEM_NAME] = 'minubo';
$config[MinuboConstants::MINUBO_BUCKET_DIRECTORY] = '/minubo/data/';
$config[MinuboConstants::MINUBO_CUSTOMER_SECURE_FIELDS] = [
'password',
'restore_password_date',
'restore_password_key',
'registration_key',
];
...
```
3. Copy over the content from `config/jobs.dist.php` to` jobs.php`:
```php
...
$jobs[] = [
'name' => 'minubo-export',
'command' => '$PHP_BIN vendor/bin/console minubo:export:data',
'schedule' => '*/15 * * * *',
'enable' => true,
'run_on_non_production' => false,
'stores' => ['DE'],
];
...
```
4. Add Minubo console to `ConsoleDependencyProder`:
```php
...
use SprykerEco\Zed\Minubo\Communication\Console\MinuboConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
protected function getConsoleCommands(Container $container)
{
$commands = [
...
new MinuboConsole(),
];
...
return $commands;
}
...
```
5. Add or update `FlysystemDependencyProvider` to project Service Layer:
```php
<?php
namespace Pyz\Service\Flysystem;

use Spryker\Service\Flysystem\FlysystemDependencyProvider as SprykerFlysystemDependencyProvider;
use Spryker\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\Aws3v3FilesystemBuilderPlugin;
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
    protected function addFilesystemBuilderPluginCollection($container)
    {
        $container[self::PLUGIN_COLLECTION_FILESYSTEM_BUILDER] = function (Container $container)
        {
            return [new FtpFilesystemBuilderPlugin() , new LocalFilesystemBuilderPlugin() , new Aws3v3FilesystemBuilderPlugin() , ];
        };

        return $container;
    }
}
```
