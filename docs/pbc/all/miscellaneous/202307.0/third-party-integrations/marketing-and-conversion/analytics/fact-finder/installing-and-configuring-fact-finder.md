---
title: Installing and configuring FACT-Finder
description: This article provides details on the installation and configuration of the FACT-Finder module.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/fact-finder-installation-and-configuration
originalArticleId: 5d9650ca-e38b-4c41-ade5-e767e9878a73
redirect_from:
  - /2021080/docs/fact-finder-installation-and-configuration
  - /2021080/docs/en/fact-finder-installation-and-configuration
  - /docs/fact-finder-installation-and-configuration
  - /docs/en/fact-finder-installation-and-configuration
  - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-fact-finder.html
  - /docs/scos/dev/technology-partner-guides/202212.0/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-fact-finder.html
  - /docs/scos/dev/technology-partner-guides/202307.0/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-fact-finder.html
related:
  - title: Integrating FACT-Finder
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/integrating-fact-finder.html
  - title: Installing and configuring FACT-Finder web components
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-fact-finder-web-components.html
  - title: Installing and configuring FACT-Finder NG API
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/installing-and-configuring-the-fact-finder-ng-api.html
  - title: Using FACT-Finder campaigns
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-campaigns.html
  - title: Exporting product data for FACT-Finder
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/exporting-product-data-for-fact-finder.html
  - title: Using FACT-Finder search
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-search.html
  - title: Using FACT-Finder recommendation engine
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-recommendation-engine.html
  - title: Using FACT-Finder tracking
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-tracking.html
  - title: Using FACT-Finder search suggestions
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/analytics/fact-finder/using-fact-finder-search-suggestions.html
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
