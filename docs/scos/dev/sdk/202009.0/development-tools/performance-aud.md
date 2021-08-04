---
title: Performance audit tool- Benchmark
originalLink: https://documentation.spryker.com/v6/docs/performance-audit-tool-benchmark
redirect_from:
  - /v6/docs/performance-audit-tool-benchmark
  - /v6/docs/en/performance-audit-tool-benchmark
---

The Benchmark tool allows you to profile requests to an application and see how long it takes to load a page and how much memory the application uses during these requests. This tool is based on [PHPBench](https://github.com/phpbench/phpbench) and is used inside Spryker.

## Installation

To install the Benchmark tool, follow the steps below.

1. Install the package via composer. You might want to add it to the `composer dev` section if you don’t want to use it on the production environment:
```Bash
composer require --dev spryker-sdk/benchmark
```
2. Update composer `autoload-dev` section to autoload your tests:
```PHP
"autoload-dev": {
    "psr-4": {
      ...
      "Benchmark\\": "tests/Benchmark/"
    },
  },
```
3. Add the new console command `\SprykerSdk\Zed\Benchmark\Communication\Console\BenchmarkRunConsole` to `\Pyz\Zed\Console\ConsoleDependencyProvider`:
<details open>
<summary>Pyz\Zed\Console</summary>
    
```PHP
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

4. Create test folders, so there is a different folder per each application: `tests/Benchmark(Yves|Glue|Zed)`.

5. Add the bootstrap file to `tests\Benchmark\bootstrap.php`. The bootstrap file is a .php file that should be almost the same as your public index.php file (e.g., `public/Zed/index.php`). The Benchmark tool has default bootstrap files out-of-the-box, but it’s recommended to add one on the project level, as shown below.

**tests\Benchmark\bootstrap.php**
```PHP
<?php

use Spryker\Shared\Config\Application\Environment;

define('APPLICATION', 'ZED');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

Environment::initialize();
```
6. Add bootstrap files for each application `tests\Benchmark\Yves|Zed|Glue\bootstrap.php`: 

```PHP
<?php

require_once __DIR__ . '/../bootstrap.php';
```
That’s it. You now have the Benchmark tool installed.

## Running the tests

To run the tests, execute the following command:

```Bash
vendor/bin/console benchmark:run
```
By default, all tests from the `tests/Benchmark/*/*` folders are run. However, you can use the optional argument `path` to run tests from a different application or folder.

```Bash
vendor/bin/console benchmark:run --path=tests/Benchmark/(Yves|Zed|Glue)
```
```Bash
vendor/bin/console benchmark:run --path=tests/Benchmark/Zed/HomePage
```
## Writing the tests
{% info_block infoBox %}

Before you start writing the tests, check out the [PHPBench documentation](https://phpbench.readthedocs.io/en/latest/writing-benchmarks.html).

{% endinfo_block %}

You can write tests without any additional knowledge, but Benchmark has some default helpers that can make writing benchmarks easier for Spryker:

* **RequestBuilder** - helps you to build the `Request` object
* **HttpHelper** - sends a request
* **LoginHelper** - allows you to log in with some credentials during or before the benchmark
* **FormCsrfTokenHelper** - allows you to get valid CSRF token if you want to submit some form on the page

To use these helpers, there are some respective factory classes:

* `RequestBuilderFactory`
* `HttpHelperFactory`
* `LoginHelperFactory`
* `CsrfTokenHelperFactory`

{% info_block warningBox %}

Use the factories from the application that you write the test for.

{% endinfo_block %}

## Example of a benchmark

Here is an example of a benchmark:
```PHP
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
