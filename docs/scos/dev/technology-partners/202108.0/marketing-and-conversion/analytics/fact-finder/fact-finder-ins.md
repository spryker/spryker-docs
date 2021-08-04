---
title: FACT-Finder - Installation and configuration
originalLink: https://documentation.spryker.com/2021080/docs/fact-finder-installation-and-configuration
redirect_from:
  - /2021080/docs/fact-finder-installation-and-configuration
  - /2021080/docs/en/fact-finder-installation-and-configuration
---

## Installation

Composer dependency:

To install Spryker's FactFinder module, use [composer](https://getcomposer.org/):
```php
composer require spryker-eco/fact-finder-sdk
composer require spryker-eco/fact-finder
```

If you faced an issue with the FACT-Finder library dependency and it is not installed, please use the following instructions:

1. Add `composer.json`> file to the respective section of your project, `FACT-Finder/FACT-Finder-PHP-Library": "1.3.*`
2. Add to the repositories section: 
 ```json
{"type": "git","url": "git@github.com:FACT-Finder/FACT-Finder-PHP-Library.git"}
```
3. Run `composer update` command:
```bash
composer update
```

## Channel Configuration

Channel Management in FACT-Finder admin panel can be used for creating and removing the channels. It also creates parent-child hierarchy and manages backups.

By default, channel settings should be the following:

* File encoding - `UTF-8`
* Enclosing (quote) character - `"`
* Field separator - `,`
* Number of header lines - `1`
* Data record ID - `ProductNumber`
* Product number for tracking - `ProductNumber`
