---
title: Test Glue API
description: Learn how to test Glue API
template: howto-guide-template
last_updated: Jan 9, 2024
redirect_from:
  - /docs/scos/dev/guidelines/testing-guidelines/executing-tests/test-glue-api.html
---

This guide explains how to set up and run Glue API end-to-end (E2E) tests using the `WishlistsRestApi` module as an example and the `Pyz` project namespace. Adjust the module name according to your requirements.

## Prerequisites

1. Install or update Spryker Testify to version 3.12.0 or higher:
- Check the current installed version:
  ```bash
  composer info spryker/testify
  ```
- Install Spryker Testify:
  ```bash
  composer require --dev spryker/testify:"^3.12.0"
  ```
- Update Spryker Testify:
  ```bash
  composer update spryker/testify:"^3.12.0"
  ```

2. To validate the response body against the OpenAPI schema, you need to generate the schema. For instructions, see [Document Glue API Resources](/docs/dg/dev/glue-api/{{site.version}}/glue-api-tutorials/document-glue-api-resources.html).

## Configure the project and set up test files

1. Add the required configuration to the project:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Testify\TestifyConstants;

$glueHost = getenv('SPRYKER_API_HOST') ?: 'localhost';
$gluePort = (int)(getenv('SPRYKER_API_PORT')) ?: 443;

if (class_exists(TestifyConstants::class)) {
    $config[TestifyConstants::GLUE_APPLICATION_DOMAIN] = sprintf(
        'https://%s%s',
        $glueHost,
        $gluePort !== 443 ? ':' . $gluePort : '',
    );
    $config[TestifyConstants::GLUE_OPEN_API_SCHEMA] = APPLICATION_SOURCE_DIR . '/Generated/Glue/Specification/spryker_rest_api.schema.yml';
}
```

2. Create `codeception.yml` with the configuration required for your E2E test:

<details>
  <summary>tests/PyzTest/Glue/Wishlists/codeception.yml</summary>  

```yaml
namespace: PyzTest\Glue\Wishlists

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
  RestApi:
    actor: WishlistsApiTester
    modules:
      enabled:
        - \PyzTest\Shared\Testify\Helper\Environment
        - \SprykerTest\Shared\Testify\Helper\LocatorHelper:
            projectNamespaces: ['Pyz']
        - \SprykerTest\Shared\Propel\Helper\ConnectionHelper
        - \SprykerTest\Shared\Testify\Helper\DataCleanupHelper
        - \SprykerTest\Glue\Testify\Helper\GlueRest
        - \SprykerTest\Glue\Testify\Helper\OpenApi3
        - \SprykerTest\Glue\Testify\Helper\JsonPath
        - \SprykerTest\Shared\Product\Helper\ProductDataHelper
        - \SprykerTest\Shared\Wishlist\Helper\WishlistDataHelper
        - \SprykerTest\Shared\Customer\Helper\CustomerDataHelper
        - \SprykerTest\Shared\Testify\Helper\DependencyHelper
        - \SprykerTest\Glue\AuthRestApi\Helper\AuthRestApiHelper
        - \SprykerTest\Service\Container\Helper\ContainerHelper
        - \SprykerTest\Shared\Store\Helper\StoreDependencyHelper
      config:
        \SprykerTest\Glue\Testify\Helper\GlueRest:
          depends: PhpBrowser
          part: Json
        \SprykerTest\Shared\Testify\Helper\DataCleanupHelper:
          cleanup: false
```

</details>

3. Build Codeception:

```bash
docker/sdk testing codecept build -c tests/PyzTest/Glue/Wishlists
```

4. Adjust the generated actor class so it extends `\SprykerTest\Glue\Testify\Tester\ApiEndToEndTester`:

**tests/PyzTest/Glue/Wishlists/_support/WishlistsApiTester.php**

```php
<?php

namespace PyzTest\Glue\Wishlists;

use SprykerTest\Glue\Testify\Tester\ApiEndToEndTester;

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
class WishlistsApiTester extends ApiEndToEndTester
{
    use _generated\WishlistsApiTesterActions;
}

```

5. To create fixtures, introduce the fixtures class which generates the data required for tests:


<details>
  <summary>tests/PyzTest/Glue/Wishlists/RestApi/WishlistsRestApiFixtures.php</summary>

```php
<?php

namespace PyzTest\Glue\Wishlists\RestApi;

use Generated\Shared\Transfer\CustomerTransfer;
use Generated\Shared\Transfer\ProductConcreteTransfer;
use Generated\Shared\Transfer\WishlistItemTransfer;
use Generated\Shared\Transfer\WishlistTransfer;
use PyzTest\Glue\Wishlists\WishlistsApiTester;
use SprykerTest\Shared\Testify\Fixtures\FixturesBuilderInterface;
use SprykerTest\Shared\Testify\Fixtures\FixturesContainerInterface;

/**
 * Auto-generated group annotations
 *
 * @group PyzTest
 * @group Glue
 * @group Wishlists
 * @group RestApi
 * @group WishlistsRestApiFixtures
 * Add your own group annotations below this line
 * @group EndToEnd
 */
class WishlistsRestApiFixtures implements FixturesBuilderInterface, FixturesContainerInterface
{
    /**
     * @var string
     */
    protected const TEST_USERNAME = 'UserWishlistsRestApiFixtures';

    /**
     * @var string
     */
    protected const TEST_PASSWORD = 'change123';

    /**
     * @var \Generated\Shared\Transfer\WishlistTransfer
     */
    protected WishlistTransfer $wishlistTransfer;

    /**
     * @var \Generated\Shared\Transfer\ProductConcreteTransfer
     */
    protected ProductConcreteTransfer $productConcreteTransfer;

    /**
     * @var \Generated\Shared\Transfer\CustomerTransfer
     */
    protected CustomerTransfer $customerTransfer;

    /**
     * @return \Generated\Shared\Transfer\ProductConcreteTransfer
     */
    public function getProductConcreteTransfer(): ProductConcreteTransfer
    {
        return $this->productConcreteTransfer;
    }

    /**
     * @return \Generated\Shared\Transfer\WishlistTransfer
     */
    public function getWishlistTransfer(): WishlistTransfer
    {
        return $this->wishlistTransfer;
    }

    /**
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    public function getCustomerTransfer(): CustomerTransfer
    {
        return $this->customerTransfer;
    }

    /**
     * @param \PyzTest\Glue\Wishlists\WishlistsApiTester $I
     *
     * @return \SprykerTest\Shared\Testify\Fixtures\FixturesContainerInterface
     */
    public function buildFixtures(WishlistsApiTester $I): FixturesContainerInterface
    {
        $this->createProductConcrete($I);
        $this->createCustomer($I);
        $this->createWishlist($I);

        return $this;
    }

    /**
     * @param \PyzTest\Glue\Wishlists\WishlistsApiTester $I
     *
     * @return void
     */
    protected function createProductConcrete(WishlistsApiTester $I): void
    {
        $this->productConcreteTransfer = $I->haveFullProduct();
    }

    /**
     * @param \PyzTest\Glue\Wishlists\WishlistsApiTester $I
     *
     * @return void
     */
    protected function createCustomer(WishlistsApiTester $I): void
    {
        $customerTransfer = $I->haveCustomer([
            CustomerTransfer::USERNAME => static::TEST_USERNAME,
            CustomerTransfer::PASSWORD => static::TEST_PASSWORD,
            CustomerTransfer::NEW_PASSWORD => static::TEST_PASSWORD,
        ]);

        $this->customerTransfer = $I->confirmCustomer($customerTransfer);
    }

    /**
     * @param \PyzTest\Glue\Wishlists\WishlistsApiTester $I
     *
     * @return void
     */
    protected function createWishlist(WishlistsApiTester $I): void
    {
        $this->wishlistTransfer = $I->haveWishlist([
            WishlistTransfer::FK_CUSTOMER => $this->customerTransfer->getIdCustomer(),
        ]);

        $I->haveItemInWishlist([
            WishlistItemTransfer::FK_WISHLIST => $this->wishlistTransfer->getIdWishlist(),
            WishlistItemTransfer::WISHLIST_NAME => $this->wishlistTransfer->getName(),
            WishlistItemTransfer::SKU => $this->productConcreteTransfer->getSku(),
            WishlistItemTransfer::FK_CUSTOMER => $this->customerTransfer->getIdCustomer(),
            WishlistItemTransfer::PRODUCT_OFFER_REFERENCE => null,
            WishlistItemTransfer::MERCHANT_REFERENCE => null,
        ]);
    }
}
```

</details>

6. Create the test cest file:


<details>
  <summary>tests/PyzTest/Glue/Wishlists/RestApi/WishlistRestApiCest.php</summary>

```php
<?php

namespace PyzTest\Glue\Wishlists\RestApi;

use Codeception\Util\HttpCode;
use PyzTest\Glue\Wishlists\WishlistsApiTester;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;
use Spryker\Glue\WishlistsRestApi\WishlistsRestApiConfig;

/**
 * Auto-generated group annotations
 *
 * @group PyzTest
 * @group Glue
 * @group Wishlists
 * @group RestApi
 * @group WishlistRestApiCest
 * Add your own group annotations below this line
 * @group EndToEnd
 */
class WishlistRestApiCest
{
    /**
     * @var \PyzTest\Glue\Wishlists\RestApi\WishlistsRestApiFixtures
     */
    protected WishlistsRestApiFixtures $fixtures;

    /**
     * @param \PyzTest\Glue\Wishlists\WishlistsApiTester $I
     *
     * @return void
     */
    public function loadFixtures(WishlistsApiTester $I): void
    {
        /** @var \PyzTest\Glue\Wishlists\RestApi\WishlistsRestApiFixtures $fixtures */
        $fixtures = $I->loadFixtures(WishlistsRestApiFixtures::class);

        $this->fixtures = $fixtures;
    }

    /**
     * @depends loadFixtures
     *
     * @param \PyzTest\Glue\Wishlists\WishlistsApiTester $I
     *
     * @return void
     */
    public function requestWishlistByUuid(WishlistsApiTester $I): void
    {
        // Arrange
        $wishlistUuid = $this->fixtures->getWishlistTransfer()->getUuid();
        $oauthResponseTransfer = $I->haveAuthorizationToGlue($this->fixtures->getCustomerTransfer());
        $I->amBearerAuthenticated($oauthResponseTransfer->getAccessToken());
        $url = $I->buildWishlistUrl($wishlistUuid);

        // Act
        $I->sendGET($url);

        // Assert
        $I->seeResponseCodeIs(HttpCode::OK);
        $I->seeResponseIsJson();
        $I->seeResponseMatchesOpenApiSchema();

        $I->amSure('returned resource is of correct type')
            ->whenI()
            ->seeResponseDataContainsSingleResourceOfType(WishlistsRestApiConfig::RESOURCE_WISHLISTS);

        $I->amSure('returned resource has correct id')
            ->whenI()
            ->seeSingleResourceIdEqualTo($wishlistUuid);

        $I->amSure('returned resource has correct self-link')
            ->whenI()
            ->seeSingleResourceHasSelfLink($url);
    }

    /**
     * @depends loadFixtures
     *
     * @param \PyzTest\Glue\Wishlists\WishlistsApiTester $I
     *
     * @return void
     */
    public function requestWishlists(WishlistsApiTester $I): void
    {
        $oauthResponseTransfer = $I->haveAuthorizationToGlue($this->fixtures->getCustomerTransfer());
        $I->amBearerAuthenticated($oauthResponseTransfer->getAccessToken());
        $wishlistUuid = $this->fixtures->getWishlistTransfer()->getUuid();

        // Act
        $I->sendGET($I->buildWishlistsUrl());

        // Assert
        $I->seeResponseCodeIs(HttpCode::OK);
        $I->seeResponseIsJson();
        $I->seeResponseMatchesOpenApiSchema();

        $I->amSure('Response data contains resource collection')
            ->whenI()
            ->seeResponseDataContainsResourceCollectionOfType(WishlistsRestApiConfig::RESOURCE_WISHLISTS);

        $I->amSure('Resource collection has resource')
            ->whenI()
            ->seeResourceCollectionHasResourceWithId($wishlistUuid);

        $I->amSure('Resource has correct self-link')
            ->whenI()
            ->seeResourceByIdHasSelfLink($wishlistUuid, $I->buildWishlistUrl($wishlistUuid));
    }
}
```

</details>

## Run the test

1. Generate fixtures:

```bash
docker/sdk testing codecept fixtures
```

2. Synchronize the data to storage and search:

```bash
docker/sdk testing console queue:worker:start --stop-when-empty
```

3. Execute tests:

```bash
docker/sdk testing codecept run -c tests/PyzTest/Glue/Wishlists
```

Once the testing is complete, the result of each test is returned.
