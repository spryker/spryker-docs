---
title: Developer's Corner
originalLink: https://documentation.spryker.com/2021080/docs/developers-corner
redirect_from:
  - /2021080/docs/developers-corner
  - /2021080/docs/en/developers-corner
---

You can get Gatling <!---link to Gatling overview--> up and running for load testing by either integrating it directly into your project or by installing it as a standalone package. This article provides step-by-step instructions on both options.

## Integrating Gatling into a project

To integrate Gatling into your project, follow the steps below.

1. Require the *composer* package:

```bash
composer require git@github.com:spryker-sdk/load-testing.git --dev
```
2. Add the Router provider plugin to `src/Pyz/Yves/Router/RouterDependencyProvider.php`

```php
<?php

...

namespace Pyz\Yves\Router;

...

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    ...
    
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        ...
        if (class_exists(LoadTestingRouterProviderPlugin::class)) {
            $routeProviders[] = new LoadTestingRouterProviderPlugin();
        }
        
        return $routeProviders;
    }

    ...
}
```

3. Make sure the `fixtures` command is enabled in the main `codeception.yml`:

```yaml
...
extensions:
  commands:
    - \SprykerTest\Shared\Testify\Fixtures\FixturesCommand
...
```

That's it. The integration is complete.

### Data preparation

Now that the integration part is done, you need to create and load the dummy data fixtures. To create and load the fixtures, do the following:

1. Generate fixtures:
```bash
codecept fixtures -c vendor/spryker-sdk/load-testing
```
2. Trigger all *publish* events:

```bash
console publish:trigger-events
```
3. Run the *queue worker*:

```bash
console console q:w:s -s 
```

That being done, you should have the fixtures loaded into the databases.

### Installation
After you have completed integration and prepared the fixtures, you install the Gatling tool. Do the following:

1. Go to the tests directory:

```bash
cd vendor/spryker-sdk/load-testing
```

2. Run 
```bash
./install.sh
```
That's it! Now you have everything ready to perform the load testing for your project.


## Installing Gatling as a standalone package

Besides integrating Gatling directly into your project, you can also install it as a standalone package. Do the following:

1. Clone to the package directory and navigate to it:
```bash
git clone git@github.com:spryker-sdk/load-testing.git
cd load-testing
```
2. Run the installation script:
```bash
./install.sh
```

Now you should have Gatling installed and ready for load testing.

## Next step
Running and using Gatling<!---link-->


