---
title: FACT-Finder
originalLink: https://documentation.spryker.com/v1/docs/factfinder
redirect_from:
  - /v1/docs/factfinder
  - /v1/docs/en/factfinder
---

## Partner Information

[ABOUT FACT-FINDER](http://www.fact-finder.de/) 
FACT-Finder is a software for online shops. We provide on-site search, navigation, merchandising, personalisation and product recommendations – with a measurable impact: A/B tests have proven that merchants experience a conversion uplift of 10-33 %. More than 1600 online shops use FACT-Finder, among them are brands like Media Markt, Distrelec, MyTheresa, Misterspex and Bergfreunde. 

## Prerequisites

To integrate with FACT-Finder, you will need your FACT-Finder account. If you do not have a FACT-Finder account, please contact [FACT-Finder](http://www.fact-finder.de/).

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

## Feature Integration

### FactFinder Module

To use Spryker's FactFinder module in your project:

1. Add a new module to `Pyz\Yves\ namespace` and create a controller provider: 

```php
<?php


namespace Pyz\Yves\FactFinderGui\Plugin\Provider;

use Pyz\Yves\Application\Plugin\Provider\AbstractYvesControllerProvider;
use Silex\Application;

class FactFinderGuiControllerProvider extends AbstractYvesControllerProvider
{

    const ROUTE_FACT_FINDER = 'fact-finder';
    const ROUTE_FACT_FINDER_SEARCH = 'fact-finder-search';
    const ROUTE_FACT_FINDER_TRACK = 'fact-finder-track';

    /**
     * @param \Silex\Application $app
     *
     * @return void
     */
    protected function defineControllers(Application $app)
    {
        $allowedLocalesPattern = $this->getAllowedLocalesPattern();

        $this->createController('/{factfinder}', self::ROUTE_FACT_FINDER, 'FactFinder', 'Search', 'index')
            ->assert('factfinder', $allowedLocalesPattern . 'fact-finder|fact-finder');

        $this->createController('/{factfinder}/suggestions', self::ROUTE_FACT_FINDER_SEARCH, 'FactFinder', 'Suggestions', 'index')
            ->assert('factfinder', $allowedLocalesPattern . 'fact-finder|fact-finder');

        $this->createController('/{factfinder}/track', self::ROUTE_FACT_FINDER_TRACK, 'FactFinder', 'Track', 'index')
            ->assert('factfinder', $allowedLocalesPattern . 'fact-finder|fact-finder');

        $this->createController('/{factfinder}/recommendations', self::ROUTE_FACT_FINDER_RECOMMENDATIONS, 'FactFinder', 'Recommendations', 'index')
            ->assert('factfinder', $allowedLocalesPattern . 'fact-finder|fact-finder');
    }

}
```

2. Then add the created controller provider to `YvesBootsrap` file:    Expand a code sample   

```php
<?php

namespace Pyz\Yves\Application;

...
use Pyz\Yves\FactFinderGui\Plugin\Provider\FactFinderGuiControllerProvider;
...

class YvesBootstrap
{
    ...
    /**
     * @param bool|null $isSsl
     *
     * @return \Pyz\Yves\Application\Plugin\Provider\AbstractYvesControllerProvider[]
     */
    protected function getControllerProviderStack($isSsl)
    {
        return [
            ...
            new FactFinderGuiControllerProvider($isSsl),
            ...
        ];
    }
    ...
}
```
3. Copy the config example from `vendor/spryker-eco/fact-finder-sdk/config/config_default.php.dist` to your project config file.

### FactFinderSdk Module

To use the `FactFindeSdk` module directly in your module, you have to add a client to your dependency provider.

**To add a client to the dependency provider, do the following:**:

1. Add to the dependency provider:  

```php
<?php

...

use Spryker\Yves\Kernel\AbstractBundleDependencyProvider;
use Spryker\Yves\Kernel\Container;

class YourBundleDependencyProvider extends AbstractBundleDependencyProvider
{

    const FACT_FINDER_SDK_CLIENT = 'FACT_FINDER_SDK_CLIENT';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container)
    {
        $container = $this->provideClients($container);

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function provideClients(Container $container)
    {
        $container[self::FACT_FINDER_SDK_CLIENT] = function () use ($container) {
            return $container->getLocator()
                ->factFinderSdk()
                ->client();
        };

        return $container;
    }

}
```
2. Add it to your factory:

```php
<?php

...

use Spryker\Yves\Kernel\AbstractFactory;

class YourBundleFactory extends AbstractFactory
{

    ...

    /**
     * @return \SprykerEco\Client\FactFinderSdk\FactFinderSdkClient
     */
    public function getFactFinderClient()
    {
        return $this->getProvidedDependency(FactFinderDependencyProvider::FACT_FINDER_SDK_CLIENT);
    }

    ...

}
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

## FACT-Finder User Management

FACT-Finder has its own User Management (permissions management) functions that allow you to set the authorizations for various modules at a fine, granular level. In this way, for example, individual users can only manage specific channels or check and maintain the associated configurations.
This system of permissions is based on roles that provide access to the specific modules. These roles can be allocated to the user directly or indirectly via groups. Groups allow complex roles to be allocated in bulk, without having to assign them individually to each user.

---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-forms hubspot-forms--docs">
<div class="hubspot-form" id="hubspot-partners-1">
            <div class="script-embed" data-code="
                                            hbspt.forms.create({
				                                portalId: '2770802',
				                                formId: '163e11fb-e833-4638-86ae-a2ca4b929a41',
              	                                onFormReady: function() {
              		                                const hbsptInit = new CustomEvent('hbsptInit', {bubbles: true});
              		                                document.querySelector('#hubspot-partners-1').dispatchEvent(hbsptInit);
              	                                }
				                            });
            "></div>
</div>
</div>

