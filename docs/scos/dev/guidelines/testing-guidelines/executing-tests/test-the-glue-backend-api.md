---
title: Test the Glue Backend API
description: How to test the Glue Backend API
template: howto-guide-template
---

This guide explains how to set up and run Glue Backend API end-to-end tests using the `ModuleBackendApi` module example and the `Pyz` project namespace. Adjust the names accordingly for different project namespaces or modules.

## Prerequisites

Ensure the following prerequisites are met:

1. Spryker Testify version 3.52.0 or later is installed.
- To verify the installation status and version of Spryker Testify, run the following command:
  ```bash
  composer info spryker/testify
  ```
- To install Spryker Testify, run the following command:
  ```bash
  composer require --dev spryker/testify:"^3.52.0"
  ```
- To update Spryker Testify, run the following command:
  ```bash
  composer update spryker/testify:"^3.52.0"
  ```

2. To validate the response body against OpenAPI schema, you need to generate the schema first. For details, see [Document Glue API Endpoints](/docs/scos/dev/glue-api-guides/{{site.version}}/document-glue-api-endpoints.html).

## Testing the Glue Backend API endpoint

### 1. Add required configuration to your project `config_default.php` file

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Testify\TestifyConstants;

if (class_exists(TestifyConstants::class)) {
    $sprykerGlueBackendHost = getenv('SPRYKER_GLUE_BACKEND_HOST');
    $sprykerGlueBackendPort = (int)(getenv('SPRYKER_GLUE_BACKEND_PORT')) ?: 443;
    
    $config[TestifyConstants::GLUE_BACKEND_API_DOMAIN] = sprintf(
        'https://%s%s',
        $sprykerGlueBackendHost,
        $sprykerGlueBackendPort !== 443 ? ':' . $sprykerGlueBackendPort : '',
    );
}
```

### 2. Prepare a codeception test files

#### 1. Create the `codeception.yml` with configuration required for your E2E test:

**tests/PyzTest/Glue/ModuleBackend/codeception.yml**

```yaml
namespace: PyzTest\Glue\ModuleBackend

paths:
    tests: .
    data: _data
    support: _support
    output: _output

coverage:
    enabled: true
    remote: false
    whitelist: { include: ['../../../../src/*'] }

suites:
    JsonApi:
        actor: ModuleBackendApiTester
        modules:
            enabled:
                - \PyzTest\Shared\Testify\Helper\Environment
                - \SprykerTest\Shared\Testify\Helper\LocatorHelper:
                      projectNamespaces: ['Pyz']
                - \SprykerTest\Shared\Propel\Helper\ConnectionHelper
                - \SprykerTest\Shared\Testify\Helper\DataCleanupHelper
                - \SprykerTest\Shared\AuthenticationOauth\Helper\AuthenticationOauthHelper
                - \SprykerTest\Glue\Testify\Helper\GlueBackendApiJsonApiHelper
                - \SprykerTest\Glue\Testify\Helper\OpenApi3
                - \SprykerTest\Glue\Testify\Helper\JsonPath
                - \SprykerTest\Shared\Testify\Helper\DependencyHelper
                - \SprykerTest\Service\Container\Helper\ContainerHelper
                - \SprykerTest\Shared\Store\Helper\StoreDependencyHelper
                - \SprykerTest\Shared\User\Helper\UserDataHelper
            config:
                \SprykerTest\Glue\Testify\Helper\GlueBackendApiJsonApiHelper:
                    depends: PhpBrowser
                    part: Json
                \SprykerTest\Shared\Testify\Helper\DataCleanupHelper:
                    cleanup: false
```

#### 2. Build Codeception

Run the following Codeception build command:

```bash
docker/sdk testing codecept build -c tests/PyzTest/Glue/ModuleBackend
```

Adjust generated actor class so it extends `\SprykerTest\Glue\Testify\Tester\BackendApiEndToEndTester`:

**tests/PyzTest/Glue/ModuleBackend/_support/ModuleBackendApiTester.php**

```php
<?php

namespace PyzTest\Glue\ModuleBackend;

use SprykerTest\Glue\Testify\Tester\BackendApiEndToEndTester;

/**
 * Inherited Methods
 *
 * @method void wantToTest($text)
 * @method void wantTo($text)
 * @method void execute($callable)
 * @method void expectTo($prediction)
 * @method void expect($prediction)
 * @method void amGoingTo($argumentation)
 * @method void am($role)
 * @method void lookForwardTo($achieveValue)
 * @method void comment($description)
 * @method void pause()
 */
class ModuleBackendApiTester extends BackendApiEndToEndTester
{
    use _generated\ModuleBackendApiTesterActions;
}

```

#### 3. Create fixtures

1. Introduce the fixtures class which will generated all data required for tests

**tests/PyzTest/Glue/ModuleBackend/JsonApi/Fixtures/ModuleBackendJsonApiFixtures.php**

```php
<?php

namespace PyzTest\Bapi\ModuleBackend\JsonApi\Fixtures;

use Generated\Shared\Transfer\UserTransfer;
use PyzTest\Glue\ModuleBackend\ModuleBackendApiTester;
use SprykerTest\Shared\Testify\Fixtures\FixturesBuilderInterface;
use SprykerTest\Shared\Testify\Fixtures\FixturesContainerInterface;

/**
 * Auto-generated group annotations
 *
 * @group PyzTest
 * @group Glue
 * @group ModuleBackend
 * @group JsonApi
 * @group ModuleBackendJsonApiFixtures
 * Add your own group annotations below this line
 * @group EndToEnd
 */
class ModuleBackendJsonApiFixtures implements FixturesBuilderInterface, FixturesContainerInterface
{
    /**
     * @var string
     */
    protected const TEST_USER_NAME = 'UserModuleBackendJsonApiFixtures';

    /**
     * @var string
     */
    protected const TEST_USER_PASSWORD = 'change123';

    /**
     * @var \Generated\Shared\Transfer\UserTransfer
     */
    protected UserTransfer $userTransfer;

    /**
     * @return mixed
     */
    public function getUserTransfer()
    {
        return $this->userTransfer;
    }

    /**
     * @param \PyzTest\Glue\ModuleBackend\ModuleBackendApiTester $I
     *
     * @return \SprykerTest\Shared\Testify\Fixtures\FixturesContainerInterface
     */
    public function buildFixtures(ModuleBackendApiTester $I): FixturesContainerInterface
    {
        $this->createUser($I);

        return $this;
    }

    /**
     * @param \PyzTest\Glue\ModuleBackend\ModuleBackendApiTester $I
     *
     * @return void
     */
    protected function createUser(ModuleBackendApiTester $I): void
    {
        $this->userTransfer = $I->haveUser([
            UserTransfer::PASSWORD => static::TEST_USER_PASSWORD,
            UserTransfer::USERNAME => static::TEST_USER_NAME,
        ]);
        
        // Override encrypted password with plain password for further testing purposes.
        $this->userTransfer->setPassword(static::TEST_USER_PASSWORD);
    }
}
```

2. Run the following command to generate fixtures:

```bash
docker/sdk testing codecept fixtures
```

#### 4. Create the test cest file

**tests/PyzTest/Glue/ModuleBackend/JsonApi/ModuleBackendJsonApiCest.php**

```php
<?php

namespace PyzTest\Glue\ModuleBackend\JsonApi;

use Codeception\Util\HttpCode;
use Pyz\Glue\ModuleRestApi\ModuleRestApiConfig;
use PyzTest\Glue\ModuleBackend\ModuleBackendApiTester;

/**
 * Auto-generated group annotations
 *
 * @group PyzTest
 * @group Glue
 * @group ModuleBackend
 * @group JsonApi
 * @group ModuleBackendJsonApiCest
 * Add your own group annotations below this line
 * @group EndToEnd
 */
class ModuleBackendJsonApiCest
{
    /**
     * @var \PyzTest\Glue\ModuleBackend\RestApi\ModuleBackendJsonApiFixtures
     */
    protected ModuleBackendJsonApiFixtures $fixtures;

    /**
     * @param \PyzTest\Glue\ModuleBackend\ModuleBackendApiTester $I
     *
     * @return void
     */
    public function loadFixtures(ModuleBackendApiTester $I): void
    {
        /** @var \PyzTest\Glue\ModuleBackend\JsonApi\ModuleBackendJsonApiFixtures $fixtures */
        $fixtures = $I->loadFixtures(ModuleBackendJsonApiFixtures::class);
        $this->fixtures = $fixtures;
    }

    /**
     * @depends loadFixtures
     *
     * @param \PyzTest\Glue\ModuleBackend\ModuleBackendApiTester $I
     *
     * @return void
     */
    public function requestGetModule(ModuleBackendApiTester $I): void
    {
        // Arrange
        $oauthResponseTransfer = $I->haveAuthorizationToBackendAPI($this->fixtures->getUserTransfer());
        $I->amBearerAuthenticated($oauthResponseTransfer->getAccessToken());
        
        // Act
        $I->sendGET(
            $I->formatUrl(ModuleRestApiConfig::RESOURCE_MODULE),
        );

        // Assert
        $I->seeResponseCodeIs(HttpCode::OK);
        $I->seeResponseIsJson();
        $I->seeResponseMatchesOpenApiSchema();
    }
}
```

#### 5. Run the test

Run the following command to execute the test:

```bash
docker/sdk testing codecept run -c tests/PyzTest/Glue/ModuleBackend
```

The result of each individual test will be displayed once the testing process is complete.
