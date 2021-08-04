---
title: Minubo
originalLink: https://documentation.spryker.com/2021080/docs/minubo
redirect_from:
  - /2021080/docs/minubo
  - /2021080/docs/en/minubo
---

## Partner Information
 [ABOUT MINUBO](https://www.minubo.com/) 
Minubo is the Commerce Intelligence Company for omni-channel brands and retailers – solving the top 3 challenges that commerce companies face in becoming data-driven in an omni-channel environment: strategy, people and technology. Fed by a full omni-channel data base, minubo's Analytics & Insights App enables both strategic and operational roles to make better, data-driven decisions – every day. Alongside that, minubo's professional services team helps building the needed infrastructure and processes for a fast-growing omni-channel business. Our customer portfolio includes among others LUSH North America, Scotch & Soda und Intersport.

YOUR ADVANTAGES: 

* Out-of-the-box integration of all relevant data sources into one omni-channel data warehouse
* Low cost of ownership: The solution is hosted in the cloud and the high level of standardization enables the immediate implementation of a data-driven working environment
* Easy-to-use analytics tools for every user group – dashboarding, customer segmentation, Web Pivot for ad-hoc analyses, best practice reports, proaktive insights und action recommendation among others
* Standardized commerce data model based on industry best practices enables a data-driven working environment from day one
* The minubo data feeds and already developed integrations to third-party systems enables flexible use of the data
* Implementation and enablement is conducted by our in-house advisory and support team 

## General Information

The Minubo module provides functionality to export order and customer data that was updated since last run of export. Data exported to Amazon S3 bucket as file with list of JSON-objects.

Export process runs in two modes:

1. Automatic mode - every 15 minutes (default)
2. Manual mode - using console command:
```bash
vendor/bin/console minubo:export:data
```
As a result, the module puts two files `Customer_TIMESTAMP.json and Order_TIMESTAMP.json` with updated data to Amazon S3 bucket. If there were no changes the module would put empty files.

## Installation and configuration

1. To install Minubo run next command in the console:
```bash
composer require spryker-eco/minubo
```
2. Copy over the content from `config/config.dist.php` to `config_default.php` and add the values:
```php...
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
```php...
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
```php...
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
---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-form js-hubspot-form" data-portal-id="2770802" data-form-id="163e11fb-e833-4638-86ae-a2ca4b929a41" id="hubspot-1"></div>

