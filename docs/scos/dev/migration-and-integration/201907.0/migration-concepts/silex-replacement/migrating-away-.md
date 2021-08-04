---
title: Migrating Away From Silex
originalLink: https://documentation.spryker.com/v3/docs/migrating-away-from-silex
redirect_from:
  - /v3/docs/migrating-away-from-silex
  - /v3/docs/en/migrating-away-from-silex
---

To refactor away from Silex, install the following packages:

* `spryker/application` >= 3.13.2
* `spryker/container` >= 1.1.0
* `spryker/silex` >= 0.2.0
* `spryker/symfony` >= 3.2.2
* `spryker-shop/shop-application` >= 1.4.1

If you have problems installing one of those, use composer's `why` and `why-not` console commands to find out what's causing the problems.

## Troubleshooting
The table below lists common errors while migrating away from Silax, their causes and steps that you can follow to solve them.

| Error | Cause | Solution |
| --- | --- | --- |
| Twig_Error_Runtime - Unable to load the "Symfony\Bridge\Twig\Form\TwigRenderer" runtime in "@..." at line ... | This error happens when the `Symfony/Twig-bridge` below version 3.4 is installed. | Update `spyker/symfony` to >= 3.2.2 | 
|TypeError - Argument 1 passed to Spryker\Shared\Application\Application::__construct() must be an instance of Spryker\Service\Container\ContainerInterface, instance of Spryker\Shared\Kernel\Communication\Application given, called in /data/shop/development/current/vendor/spryker/application/src/Spryker/Zed/Application/Communication/ZedBootstrap.php on line... | This error is caused by a mismatch of the installed Spryker modules and 3rd party packages | <ol><li>Remove the following packages from your `composer.json` if you have them there:<ul><li>`spryker/pimple`</li><li>`silex/silex`</li><li>`pimple/pimple`</li></ul></li><li>Run `composer update`</li></ol> |
