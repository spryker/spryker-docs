---
title: "Benchmark: Performance audit tool"
description: The Benchmark tool allows you to assess an application's performance by how long it takes to load a page and how much memory the it consumes during requests.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/performance-audit-tool-benchmark
originalArticleId: fb9fef09-646f-4a32-b158-6f544bc45f4e
redirect_from:
  - /docs/sdk/dev/development-tools/performance-audit-tool-benchmark.html
  - /docs/scos/dev/sdk/201811.0/development-tools/performance-audit-tool-benchmark.html
  - /docs/scos/dev/sdk/201903.0/development-tools/performance-audit-tool-benchmark.html
  - /docs/scos/dev/sdk/201907.0/development-tools/performance-audit-tool-benchmark.html
  - /docs/scos/dev/sdk/202001.0/development-tools/performance-audit-tool-benchmark.html
  - /docs/scos/dev/sdk/202005.0/development-tools/performance-audit-tool-benchmark.html
  - /docs/scos/dev/sdk/202009.0/development-tools/performance-audit-tool-benchmark.html
  - /docs/scos/dev/sdk/202108.0/development-tools/performance-audit-tool-benchmark.html
  - /docs/scos/dev/sdk/development-tools/performance-audit-tool-benchmark.html
---

The Benchmark tool allows you to profile requests to an application and see how long it takes to load a page and how much memory the application uses during these requests. This tool is based on [PHPBench](https://github.com/phpbench/phpbench) and is used inside Spryker.

## Installation

To install the Benchmark tool, follow the steps below.

1. Install the package via composer. You might want to add it to the `composer dev` section if you don't want to use it on the production environment:

```bash
composer require --dev spryker-sdk/benchmark
```

2. Update composer `autoload-dev` section to autoload your tests:

```php
"autoload-dev": {
    "psr-4": {
      ...
      "Benchmark\\": "tests/Benchmark/"
    },
  },
```

3. Add the new console command `\SprykerSdk\Zed\Benchmark\Communication\Console\BenchmarkRunConsole` to `\Pyz\Zed\Console\ConsoleDependencyProvider`:

<details>
<summary>Pyz\Zed\Console</summary>

```php
<?php

namespace Pyz\Zed\Console;

...
use SprykerSdk\Zed\Benchmark\Communication\Console\BenchmarkRunConsole;

/**
 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
 * @method \Pyz\Zed\Console\ConsoleConfig getConfig()
 */
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            ...
        ];

        if ($this->getConfig()->isDevelopmentConsoleCommandsEnabled()) {
            if (class_exists(BenchmarkRunConsole::class)) {
                $commands[] = new BenchmarkRunConsole();
            }
        }

        return $commands;
    }
}
```

</details>

{% info_block infoBox %}

To have the same code on production and development environments, we recommend adding the `class_exists` check for the Benchmark console command.

{% endinfo_block %}

4. Create test folders, so there is a different folder for each application: `tests/Benchmark(Yves|Glue|Zed)`.

5. Add the bootstrap file to `tests\Benchmark\bootstrap.php`. The bootstrap file is a .php file that should be almost the same as your public index.php file–for example, `public/Zed/index.php`. The Benchmark tool has default bootstrap files out-of-the-box, but it's recommended to add one on the project level, as shown below.

**tests\Benchmark\bootstrap.php**

```php
<?php

use Spryker\Shared\Config\Application\Environment;

define('APPLICATION', 'ZED');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

Environment::initialize();
```

6. Add bootstrap files for each application `tests\Benchmark\Yves|Zed|Glue\bootstrap.php`:

```php
<?php

require_once __DIR__ . '/../bootstrap.php';
```

That's it. You now have the Benchmark tool installed.

## Running the tests

To run the Benchmark's tests, execute the following command:

```bash
vendor/bin/console benchmark:run
```

By default, all tests from the `tests/Benchmark/*/*` folders are run. However, you can use the optional argument `path` to run tests from a different application or folder.

```bash
vendor/bin/console benchmark:run --path=tests/Benchmark/(Yves|Zed|Glue)
```

```bash
vendor/bin/console benchmark:run --path=tests/Benchmark/Zed/HomePage
```

## Writing the tests

{% info_block infoBox %}

Before you start writing the tests, check out the [PHPBench documentation](https://phpbench.readthedocs.io/en/latest/guides/writing-benchmarks.html?highlight=writing%20benchmarks).

{% endinfo_block %}

You can write tests without any additional knowledge, but Benchmark has some default helpers that can make writing benchmarks easier for Spryker:

* **RequestBuilder**—helps you to build the `Request` object.
* **HttpHelper**—sends a request.
* **LoginHelper**—lets you log in with some credentials during or before the benchmark.
* **FormCsrfTokenHelper**—lets you get a valid CSRF token if you want to submit a form on the page.

To use these helpers, there are several respective factory classes:

* `RequestBuilderFactory`
* `HttpHelperFactory`
* `LoginHelperFactory`
* `CsrfTokenHelperFactory`

{% info_block warningBox %}

Use the factories from the application that you write the test for.

{% endinfo_block %}

## Example of a benchmark

Here is an example of a benchmark:

```php
<?php

namespace Benchmark\Yves\Cart;

use Benchmark\Yves\Cart\PageObject\CartPage;
use Psr\Http\Message\ResponseInterface;
use SprykerSdk\Shared\Benchmark\Request\RequestBuilderInterface;
use SprykerSdk\Yves\Benchmark\Helper\Http\HttpHelperFactory;
use SprykerSdk\Yves\Benchmark\Helper\Login\LoginHelperFactory;
use SprykerSdk\Yves\Benchmark\Request\RequestBuilderFactory;

class AddToCartBench
{
    protected const PRODUCT_CONCRETE_SKU = '066_23294028';

    protected const LOGIN_EMAIL = 'spencor.hopkin@spryker.com';
    protected const LOGIN_PASSWORD = 'change123';

    /**
     * @var \SprykerSdk\Shared\Benchmark\Request\RequestBuilderInterface
     */
    protected $requestBuilder;

    /**
     * @var \Generated\Shared\Transfer\LoginHeaderTransfer
     */
    protected $loginHeader;

    /**
     * @var \SprykerSdk\Shared\Benchmark\Helper\Http\HttpHelperInterface
     */
    protected $httpHelper;

    /**
     * @return void
     */
    public function beforeAddingOneItemToCart(): void
    {
        $this->requestBuilder = RequestBuilderFactory::createRequestBuilder();
        $this->httpHelper = HttpHelperFactory::createHttpHelper();
        $loginHelper = LoginHelperFactory::createLoginHelper();

        $this->loginHeader = $loginHelper->login(static::LOGIN_EMAIL, static::LOGIN_PASSWORD);
    }

    /**
     * @BeforeMethods({"beforeAddingOneItemToCart"})
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function benchAddingOneItemToCart(): ResponseInterface
    {
        $headers[$this->loginHeader->getName()] = $this->loginHeader->getValue();

        $request = $this->requestBuilder->buildRequest(
            RequestBuilderInterface::METHOD_POST,
            sprintf(CartPage::ADD_TO_CART_URL, static::PRODUCT_CONCRETE_SKU),
            $headers
        );

        return $this->httpHelper->send($request);
    }
}
```
