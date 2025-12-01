---
title: Twig performance best practices
description: This guideline explains how to optimize Twig templating engine performance for Spryker applications.
last_updated: Nov 28, 2025
template: concept-topic-template
related:
  - title: Integrate automated SVG sprite extraction
    link: docs/dg/dev/integrate-and-configure/integrate-automated-svg-sprite-extraction.html
---

Twig is a popular templating engine for PHP projects. Spryker built a sophisticated library of components on top of it. But with rich features, it also sometimes leads to performance degradation, caused by inefficient practices.

It is important to follow best practices related to Twig performance optimisations.

## Activate Twig compiler

Twig files can be precompiled into PHP classes to speed the performance up. This behavior can be activated in the configuration. We highly recommend using the `FORCE_BYTECODE_INVALIDATION` option. Otherwise, Opcache may contain outdated content, as the files are modified during runtime.

```php
---//---
use Twig\Cache\FilesystemCache;
---//---
$currentStore = Store::getInstance()->getStoreName();

$config[TwigConstants::ZED_TWIG_OPTIONS] = [
    'cache' => new FilesystemCache(
        sprintf(
            '%s/src/Generated/Zed/Twig/codeBucket%s',
            APPLICATION_ROOT_DIR,
            $currentStore,
        ),
        FilesystemCache::FORCE_BYTECODE_INVALIDATION,
    ),
];

$config[TwigConstants::YVES_TWIG_OPTIONS] = [
    'cache' => new FilesystemCache(
        sprintf(
            '%s/src/Generated/Yves/Twig/codeBucket%s',
            APPLICATION_ROOT_DIR,
            $currentStore,
        ),
        FilesystemCache::FORCE_BYTECODE_INVALIDATION,
    ),
];

$config[TwigConstants::YVES_PATH_CACHE_FILE] = sprintf(
    '%s/src/Generated/Yves/Twig/codeBucket%s/.pathCache',
    APPLICATION_ROOT_DIR,
    $currentStore,
);

$config[TwigConstants::ZED_PATH_CACHE_FILE] = sprintf(
    '%s/src/Generated/Zed/Twig/codeBucket%s/.pathCache',
    APPLICATION_ROOT_DIR,
    $currentStore,
);
```

## Activate Twig path cache

Twig files can be in many places. To avoid time-consuming searches, we recommend activating the path cache (active by default). If you need to change this configuration, see `\Spryker\Yves\Twig\TwigConfig::getCacheFilePath()`.

## Twig template warmup during deployment

Precompiling Twig templates can improve the performance of the first request, especially in production environments. This is helpful when scaling across multiple containers, where the first request may be slow due to on-demand compilation of all Twig templates.

It compiles Twig template files to PHP code during deployment. Allows each Yves container to start in a ready-to-use state, without the need to compile those templates in the scope of web requests. It is important to ensure that this feature is enabled on a project level inside a build recipe.

To activate the warmup, follow the steps:

1. Add the following commands to your deployment script, such as `config/install/docker.yml`:

```yaml
    build-production:
        twig-template-warmup-zed:
            command: 'vendor/bin/console twig:template:warmer'

        twig-template-warmup-yves:
            command: 'vendor/bin/yves twig:template:warmer'
```

{% info_block warningBox "" %}
Make sure that the command is executed after the `vendor/bin/console twig:cache:warmer` command.
{% endinfo_block %}


2. Register the following classes for the Zed command:

**\Spryker\Zed\Console\ConsoleDependencyProvider**

```php
...
use Spryker\Zed\Form\Communication\Plugin\Application\FormApplicationPlugin;
use Spryker\Zed\Security\Communication\Plugin\Application\ConsoleSecurityApplicationPlugin;
use Spryker\Zed\Twig\Communication\Console\TwigTemplateWarmerConsole;
...

    protected function getConsoleCommands(Container $container): array
    {
        return [
            // other commands
            new TwigTemplateWarmerConsole(),
        ];
    }

    public function getApplicationPlugins(Container $container): array
    {
        // other application plugins
        $applicationPlugins[] = new ConsoleLocaleApplicationPlugin();
        $applicationPlugins[] = new ConsoleSecurityApplicationPlugin();
        $applicationPlugins[] = new TwigApplicationPlugin();
        $applicationPlugins[] = new FormApplicationPlugin();

        return $applicationPlugins;
    }
```

3. Register the following classes for the Yves console context to allow Twig properly compile templates.

**\Spryker\Yves\Console\ConsoleDependencyProvider**

```php
...
use Spryker\Yves\Form\Plugin\Application\FormApplicationPlugin;
use Spryker\Yves\Locale\Plugin\Application\ConsoleLocaleApplicationPlugin;
use Spryker\Yves\Security\Plugin\Application\ConsoleSecurityApplicationPlugin;
use Spryker\Yves\Session\Plugin\Application\ConsoleSessionApplicationPlugin;
use Spryker\Yves\Twig\Plugin\Application\TwigApplicationPlugin;
use Spryker\Yves\Twig\Plugin\Console\TwigTemplateWarmerConsole;
use Spryker\Yves\Twig\Plugin\Console\TwigTemplateWarmingModeEventSubscriberPlugin;

...

    protected function getConsoleCommands(Container $container): array
    {
        return [
            // other commands
            new TwigTemplateWarmerConsole(),
        ];
    }

    public function getApplicationPlugins(Container $container): array
    {
        // other application plugins
        $applicationPlugins[] = new ConsoleLocaleApplicationPlugin();
        $applicationPlugins[] = new ConsoleSecurityApplicationPlugin();
        $applicationPlugins[] = new ConsoleSessionApplicationPlugin();
        $applicationPlugins[] = new TwigApplicationPlugin();
        $applicationPlugins[] = new FormApplicationPlugin();

        return $applicationPlugins;
    }

    protected function getEventSubscriber(Container $container): array
    {
        return [
            // other event subscribers
            new TwigTemplateWarmingModeEventSubscriberPlugin(),
        ];
    }
```

### Twig templates compiled cache

Twig template engine Spryker uses for Yves and some other background features like PDF invoice generation and email rendering has multiple ways to load templates:

- **Templates from files** - regular and most popular option, Twig templates are loaded and referenced by file name, for example `add-to-cart-form.twig`, etc. Cache based on a file name.
- **Templates from strings** - in case a template content was compiled "on the fly" and retrieved from the external system or database, Twig has a standard string loader. Cache based on a string content, a hash from the content.
- **Custom loaders** - make it possible to implement retrieval and caching logic in accordance to a project's needs. Cache implemented based on custom logic.

Twig compiles (preprocesses) templates written in its language (`.twig` files) into PHP code (known as compiled templates) and stores it as a cache to improve performance, and only a template is compiled once.

**The problem:** When loading a template from a string - Twig will use template content (its hash) as a cache key, which means that each time content changes due to a change by a user, or a change due to dynamic nature of a template (for example template compiled from other pre-processed strings) - the hash will be different and a new version of the same template will be saved under the different hash key on disk.

Yves containers are running on AWS EC2 virtual nodes. Spryker configuration limits disk space per EC2 node to 50 GB (as of Mar 18, 2025), even in production environments.

Because of application customizations, those templates created with `createTemplate` change often, almost with each request or by integration with external CMS. As a result - EC2 space was depleted and all Yves containers running on it could not serve requests anymore, as those are trying to write more templates and there's no space left.

{% info_block warningBox "Warning" %}

There's no cache cleanup mechanism baked into Yves containers for Twig templates.

{% endinfo_block %}

#### Key factors that affect the problem

Those factors affect the frequency and likelihood of the problem:

- **Frequency of deployments**: Each deployment shuts down old Yves containers and spawns new, effectively removing all accumulated cache.
- **Frequency of auto-scaling events**: For similar reasons - containers replacement.
- **AWS or Spryker-led maintenance**: That leads to containers replacement - resets the accumulated cache.
- **Frequency of changes in the external CMS**: If any, the more changes - the higher the rate of cache growth.
- **Number of Yves containers per EC2 instance**: More instances per container - higher disk space consumption.
- **Structure and hierarchy of Twig blocks and templates**: If there's one small template that is used across all the pages and is changed frequently - it'll likely lead to all other templates (created from string using `createTemplate`) that use it - will also lead to a new cache file, because their hash will change.

#### Solution and recommendations

- Avoid using `\Twig\Environment::createTemplate`, instead - use templates from `.twig` files
- Avoid using dynamic content as a source for the Twig template (for `\Twig\Environment::createTemplate`), instead, use Twig originally supported constructs, such as:
  - [inheritance](https://twig.symfony.com/doc/3.x/tags/extends.html)
  - [blocks](https://twig.symfony.com/doc/3.x/tags/block.html)
  - [macros](https://twig.symfony.com/doc/3.x/tags/macro.html)

**Bad example:**
- A translation string that is passed to Twig using `createTemplate` to render a small piece of HTML
- Then it is translated and additionally pre-processed
- Then it is again passed to `createTemplate`

**Good example:**
- Use Twig `extends` functions for inheritance and `trans` (or custom) filter for translations

## SVG icons in Twig templates

Older versions of Spryker had SVG icons embedded into Twig templates, which led to each page having a **significant portion** (up to 50% of a page) of HTML that is static by nature, but couldn't be cached by browsers. The problem was fixed by moving SVG icons into separate files (allowing browser cache), and only referencing those in Twig and HTML.

For more information, see [Integrate automated SVG sprite extraction](/docs/dg/dev/integrate-and-configure/integrate-automated-svg-sprite-extraction.html).

## Dynamic templates

Avoid using `createTemplate`. This is a standard Twig feature that allows creating dynamic Twig templates from strings. The problem is - it creates a cached/compiled PHP template based on a string hash (content), in comparison to the standard file-based templates, which are cached based on the original `.twig` file name.

Using this feature in context with dynamically/frequently changing templates leads to fast disk consumption by compiled Twig templates. Neither Twig nor Spryker provides a solution for this OOTB, as this is an advanced technique and is up to the development team to implement in a project-specific way.

## Cache Twig blocks

For many cases, Atomic Frontend Twig can be a bottleneck for performance. The solution is to use [Twig block cache](https://twig.symfony.com/doc/3.x/tags/cache.html). Given the right key and TTL configuration, it can significantly improve the performance of the Yves application.

In practice, cached pages can take 20 ms (compared to 60-200 ms before caching), but there are important considerations.

### How it works

Twig cache makes a wrapper around the code and stores generated HTML. For example, if you add the full product details page to the cache, all product pages will be the same because you use one compiled HTML.

### Cache usage guidelines

When using cache, it is crucial to correctly understand and design two ideas:

#### Cache key

It should uniquely identify cached entity/object, but at the same time to be useful, so that subsequent requests would use it.

For cache usage, be very careful not to store any sensitive data, and use combined keys, like:

```twig
{% raw %}{% cache "cache_key" ~ product.id ttl(300) %}{% endraw %}
```

- **Good cache key** - `"product_" + id`, unique for a product, ID never changes, IDs are limited
- **Bad cache key** - `"product_" + id + time` (or some random string), the key is still unique, but it will be that each time, it'll be impossible to reuse such a key

#### Cache invalidation/expiration logic

Time-based, or condition/event-based, it is easy to fall into a trap of using outdated cache, because the logic of invalidation is not aligned with the logic of cached object update.

### Possible problems

- Cache some customer-related data
- Store CSRF token to the form (it will work for one user, but all other users will have a problem)
- Store some frequently changed data (prices, stock, etc.)

### How to install

1. Install the Twig cache extension:

```bash
composer require twig/cache-extra
```

2. Create `TwigCachePlugin` in `Pyz\Shared\Twig\Plugin`:

```php
<?php
declare(strict_types=1);

namespace Pyz\Shared\Twig\Plugin;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\Cache\Adapter\TagAwareAdapter;
use Twig\Environment;
use Twig\Extra\Cache\CacheExtension;
use Twig\Extra\Cache\CacheRuntime;
use Twig\RuntimeLoader\RuntimeLoaderInterface;

class TwigCachePlugin implements TwigPluginInterface
{
    public function extend(Environment $twig, ContainerInterface $container): Environment
    {
        $twig->addExtension(new CacheExtension());
        $twig->addRuntimeLoader(new class implements RuntimeLoaderInterface {
            public function load($class) {
                if (CacheRuntime::class === $class) {
                    return new CacheRuntime(new TagAwareAdapter(new FilesystemAdapter()));
                }
            }
        });

        return $twig;
    }
}
```

3. Add this plugin to `src/Pyz/Yves/Twig/TwigDependencyProvider::getTwigPlugins()`.

4. It's ready to use. For usage instructions, see [Twig cache documentation](https://twig.symfony.com/doc/3.x/tags/cache.html).

## Reduce the granularity of Twig templates

Reduce the granularity of Twig templates where possible: Twig is not efficient when there is a big nested tree of hundreds of components inheriting from each other. **Recommendations**:

- prefer fewer bigger components, instead of many small
- use fewer levels of inheritance (`extends`), organise templates in a flat structure (using `include`)

## General Twig optimizations

Twig, together with [Atomic Frontend](/docs/dg/dev/frontend-development/{{site.version}}/yves/atomic-frontend/atomic-frontend.html), is an extremely flexible approach but at the same time not the fastest one. Check if you can reduce or optimize things there.

For example, the `{% raw %}{{{% endraw %} data.foo.bar.firstName {% raw %}}}{% endraw %}` `{% raw %}{{{% endraw %} data.foo.bar.lastName {% raw %}}}{% endraw %}` trigger many calls to the `Template::getAttribute()` method which is very slow.

Making calculations on the PHP side can help here a lot, as well as using `{% raw %}{{{% endraw %} set customer = data.foo.bar {% raw %}}}{% endraw %}` + `{% raw %}{{{% endraw %} customer.firstName {% raw %}}}{% endraw %}` `{% raw %}{{{% endraw %} customer.lastName {% raw %}}}{% endraw %}`.

## Prepare data in PHP classes

Prepare data in PHP classes - controllers, data mappers, before Twig, to avoid moving application logic to Twig Widgets and functions if possible, as it makes rendering heavier and harder to troubleshoot or optimise.
