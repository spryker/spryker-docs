---
title: Test Glue Backend API
description: Learn how to test Glue Backend API end to end with this helpful guide for your Spryker based projects.
template: howto-guide-template
last_updated: Jan 9, 2024
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/executing-tests/test-glue-backend-api.html
---

This document describes how to set up and run Glue Backend API end-to-end (E2E) tests using the `ModuleBackendApi` module example and the `Pyz` project namespace. Adjust the module name according to your requirements.

## Prerequisites

1. Install or update Spryker Testify to version 3.52.0 or higher:
- Check the current installed version:

  ```bash
  composer info spryker/testify
  ```

- Install Spryker Testify:

  ```bash
  composer require --dev spryker/testify:"^3.52.0"
  ```

- Update Spryker Testify:

  ```bash
  composer update spryker/testify:"^3.52.0"
  ```

2. To validate the response body against the OpenAPI schema, you need to generate the schema. For instructions, see [Document Storefront API Resources](/docs/integrations/spryker-glue-api/storefront-api/developing-apis/document-storefront-api-resources.html).


## Configure the project and set up test files

1. Add the required configuration to the project:

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
    $config[TestifyConstants::GLUE_BACKEND_API_OPEN_API_SCHEMA] = APPLICATION_SOURCE_DIR . '/Generated/GlueBackend/Specification/spryker_backend_api.schema.yml';
}
```

2. Create `codeception.yml` with the configuration required for your E2E test:


<details>
  <summary>tests/PyzTest/Glue/ModuleBackend/codeception.yml</summary>  

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
                - \SprykerTest\Glue\Testify\Helper\GlueBackendApiOpenApi3Helper
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

</details>

3. Build Codeception:

```bash
docker/sdk testing codecept build -c tests/PyzTest/Glue/ModuleBackend
```

4. Adjust the generated actor class so it extends `\SprykerTest\Glue\Testify\Tester\BackendApiEndToEndTester`:

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

5. To create fixtures, introduce the fixtures class which generates the data required for tests:

<details>
  <summary>tests/PyzTest/Glue/ModuleBackend/JsonApi/Fixtures/ModuleBackendJsonApiFixtures.php</summary>  

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
     * @return \Generated\Shared\Transfer\UserTransfer
     */
    public function getUserTransfer(): UserTransfer
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

</details>

6. Generate fixtures:

```bash
docker/sdk testing codecept fixtures
```

7. Create the test cest file:

<details>
  <summary>tests/PyzTest/Glue/ModuleBackend/JsonApi/ModuleBackendJsonApiCest.php</summary>

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
        $oauthResponseTransfer = $I->havePasswordAuthorizationToBackendApi($this->fixtures->getUserTransfer());
        $I->amBearerAuthenticated($oauthResponseTransfer->getAccessToken());

        // Act
        $I->sendJsonApiGet(
            $I->formatUrl(ModuleRestApiConfig::RESOURCE_MODULE),
        );

        // Assert
        $I->seeJsonApiResponseCodeIs(HttpCode::OK);
        $I->seeResponseIsJson();
        $I->seeResponseMatchesOpenApiSchema();
    }
}
```

</details>

## Run the test

Execute the test:

```bash
docker/sdk testing codecept run -c tests/PyzTest/Glue/ModuleBackend
```

Once the testing process is complete, the result of each test is reutrned.
