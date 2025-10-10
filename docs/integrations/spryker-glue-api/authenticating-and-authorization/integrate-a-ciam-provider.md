---
title: Integrate a CIAM provider
description: Learn how to integrate CIAM into a Spryker project
last_updated: July 7, 2025
template: howto-guide-template
redirect_from: null

---

This document describes how to integrate a third-party _customer identity and access management (CIAM) provider into a Spryker project.

The following steps help you integrate between a Spryker project and CIAM leveraging standard APIs that the CIAM provider exposes, which can be used in the context of a customer whose data is to be read or updated.

Depending on your requirements, the integration can either extend the existing authorization functionality provided by Spryker OOTB or replace it. Though, the document focuses on extending the existing functionality.

## Prerequisites

We recommend using JWT-based tokens to transfer required customer data between CIAM and Spryker for more details about JWT, see [JSON Web Tokens](https://auth0.com/docs/secure/tokens/json-web-tokens).

There is a ready PHP-based library that provides JWT decoding such as [firebase/php-jwt](https://packagist.org/packages/firebase/php-jwt).

## Install the required modules using Composer

Install the required modules using Composer:

{% info_block infoBox %}

The following library is a suggestion, not a requirement.

{% endinfo_block %}

```bash
composer require "firebase/php-jwt": "^5.4" --update-with-dependencies
```

For detailed information about the modules related to OAuth and GLUE Authentication integration that provide the API functionality and related installation instructions, see [Backend API - Authentication integration](/docs/integrations/spryker-glue-api/backend-api/integrate-backend-api/integrate-the-authentication.html).

## Module dependency graph

The following diagram illustrates the dependencies between the core modules and the CIAM provider module.

![Module Dependency Graph](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/glue-api-howtos/howto-integrate-a-ciam-provider/ciam-integration-module-dependency-graph.png)

## 1. Create the CIAM provider module

Create a separate CIAM provider Client layer with the following structure:

```text
+ Client/
  + CiamProvider/
    + Decoder/
      + CiamTokenDecoder.php // Decodes JWT token using php-jwt library, and the key from the CIAM provider returns a transfer with the required mapped attributes
      + CiamTokenDecoderInterface.php
    + Mapper/
      + CiamTokenMapper.php // Maps decoded token attributes
      + CiamTokenMapperInterface.php
    + Reader/
      + CiamDataReader.php // Provides the token Keys from the provider required to decode to a JWT token
      + CiamDataReaderInterface.php
    + CiamClient.php
    + CiamClientInterface.php  
    + CiamConfig.php
  ...
```

<details>
<summary>The following code example shows what the CIAM token decoding logic looks like:</summary>

```php
class CiamTokenDecoder implements CiamTokenDecoderInterface
{
    /**
    * @var \Pyz\Client\CiamProvider\Reader\CiamDataReaderInterface
    */
    protected $ciamDataReader;

    /**
     * @var \Firebase\JWT\JWK
     */
    protected $firebaseJwk;

    /**
     * @var \Firebase\JWT\JWT
     */
    protected $firebaseJwt;

    /**
     * @var \Pyz\Client\CiamProvider\Mapper\CiamTokenMapperInterface
     */
    protected $ciamTokenMapper;

    /**
     * @param \Pyz\Client\CiamProvider\Reader\CiamDataReaderInterface $ciamDataReader
     * @param \Firebase\JWT\JWK $firebaseJwk
     * @param \Firebase\JWT\JWT $firebaseJwt
     * @param \Pyz\Client\CiamProvider\Mapper\CiamTokenMapperInterface $ciamTokenMapper
     */
    public function __construct(
        JWK $firebaseJwk,
        JWT $firebaseJwt,
        CiamDataReaderInterface $ciamDataReader,
        CiamTokenMapperInterface $ciamTokenMapper
    ) {
        $this->firebaseJwk = $firebaseJwk;
        $this->firebaseJwt = $firebaseJwt;
        $this->ciamDataReader = $ciamDataReader;
        $this->ciamTokenMapper = $ciamTokenMapper;
    }

    /**
     * @param string $ciamToken
     *
     * @return \Generated\Shared\Transfer\CiamTokenResponseTransfer
     */
    public function decodeCiamToken(string $ciamToken): CiamTokenTransfer
    {
        $ciamTokenTransfer = new CiamTokenResponseTransfer();
        $ciamProviderApiResponseTransfer = $this->ciamDataReader->getCiamKeys();


            $parsedCiamKeys = $this->firebaseJwk->parseKeySet($ciamProviderApiResponseTransfer->getKeys());
            $token = $this->firebaseJwt->decode($ciamToken, $parsedCiamKeys, ['RS256']);

            $ciamTokenTransfer = $this->ciamTokenMapper->mapTokenToCiamProviderTokenTransfer($token);

        return $ciamTokenTransfer;
    }
}
```

</details>

In relation to the CIAM provider module, you need to add a service as well to extract and parse the token from the authorization header.

The logic falls under `Pyz/Service/<CIAM Provider>`:

```php
<?php
interface CiamProviderServiceInterface
{
    /**
     * Specification:
     *  - Parses authorization token to get a CIAM token.
     *
     * @api
     *
     * @param string|null $authorizationToken
     *
     * @return string|null
     */
    public function parseCiamToken(?string $authorizationToken): ?string;
}
```

<details>
<summary>The following is an example of standard CIAM token parsing logic:</summary>

```php
class CiamTokenParser implements CiamtokenParserInterface
{
    /**
     * @var \Spryker\Service\UtilEncoding\UtilEncodingServiceInterface
     */
    protected $utilEncodingService;

    /**
     * @var \Pyz\Service\CiamProvider\CiamProviderConfig
     */
    protected $ciamProviderConfig;

    /**
     * @param \Spryker\Service\UtilEncoding\UtilEncodingServiceInterface $utilEncodingService
     * @param \Pyz\Service\CiamProvider\CiamProviderConfig $ciamProviderConfig
     */
    public function __construct(
        UtilEncodingServiceInterface $utilEncodingService,
        CiamProviderConfig $ciamProviderConfig
    ) {
        $this->utilEncodingService = $utilEncodingService;
        $this->ciamProviderConfig = $ciamProviderConfig;
    }

    /**
     * @param string|null $authorizationToken
     *
     * @return string|null
     */
    public function parseCiamToken(?string $authorizationToken): ?string
    {
        if (!$authorizationToken) {
            return null;
        }

        $authorizationData = $this->extractAuthorizationData($authorizationToken);

        return $this->extractCiamToken($authorizationData);
    }

    /**
     * @param string $authorizationData
     *
     * @return string|null
     */
    protected function extractCiamToken(string $authorizationData): ?string
    {
        $tokenSet = $this->utilEncodingService->decodeJson(base64_decode($authorizationData), true);

        if (!$tokenSet || !isset($tokenSet[$this->ciamProviderConfig->getFieldToken()])) {
            return null;
        }

        return $tokenSet[$this->ciamProviderConfig->getFieldToken()];
    }

    /**
     * @param string $authorizationToken
     *
     * @return string
     */
    protected function extractAuthorizationData(string $authorizationToken): string
    {
        $authorizationData = preg_split('/\s+/', $authorizationToken);

        return isset($authorizationData[1]) ? $authorizationData[1] : $authorizationData[0];
    }
}
```

</details>

## 2. Extend the `Customer` module with a customer creation functionality

Depending on the attributes that you plan to use from the CIAM provider in the customer creation, you need to extend the customer module accordingly.

The following are the Customer `Zed` layer's touchpoints required to be extended or created. In a standard integration, more changes might be required depending on the implementation:

```text
+ Zed/
  + Customer/
    + Business/
        + Customer
          + CustomerCreator.php // [Created Class] Validates the required attributes, checks whether a customer exists or not, and triggers the customer creation from the entity manager accordingly
          + CustomerCreatorInterface.php [Created Interface]
        + CustomerBusinessFactory.php // [Extended Class]
        + CustomerFacade.php  // [Extended Class]
        + CustomerFacadeInterface.php // [Extended Interface]
    + Communication/
        + Controller
          + GatewayController.php // [Extended Class]
    + Persistence/
        + CustomerEntityManager.php // [Extended Class] Add the custom create customer functionality that creates the customer depending on the attributes provided from the token.
        + CustomerEntityManagerInterface.php // [Extended Interface]
  ...
```

The extended functionality here must not be complex and must not include any extra logic apart from validation of the required attributes and the customer entity creation.

The following is an example of the create customer functionality in `CustomerCreator.php`:

```php

    public function createCustomer(CustomerTransfer $customerTransfer): CustomerResponseTransfer
    {
        $customerTransfer->require<RequiredAttributes>();


        $existingCustomerTransfer = $this->customerRepository->findCustomerBy<attribute>($customerTransfer->getCustomer<attribute>());

        if ($existingCustomerTransfer !== null) {
            return $customerResponseTransfer
                ->setCustomerTransfer($existingCustomerTransfer);
        }

        $customerTransfer = $this->customerEntityManager->createCustomer($customerTransfer);

        return $customerResponseTransfer
            ->setCustomerTransfer($customerTransfer);
    }
```

{% info_block infoBox %}

After extending the Customer `Zed` layer, you need to extend the Customer `Client` layer as well to access the `Zed` layer accordingly.

{% endinfo_block %}

## 3. Adjust Glue modules to include the new authorization functionality

The adjustment of Glue modules to include the new authorization functionality is not a single step. This step consists of several substeps, which are described in the following sections.

### 1. Extend the `AuthRestApi` module

In the `OauthApi` module, extend the access token validation step with your CIAM provider token parsing service.

```text
+ Glue/
  + OauthApi/
    + Processor/
        + Validator
          + AccessTokenValidator.php // [Extended Class]
  ...
```

Adjust `OauthApiFactory` and `OauthApiDependencyProvider` to include the CIAM provider service.
In the implementation example, it's `Pyz\Service\CiamProvider\CiamProviderServiceInterface`.

The following example extends `AccessTokenValidator` to validate the authorization header using the CIAM provider parser:

```php
    public function validate(GlueRequestTransfer $glueRequestTransfer): GlueRequestValidationTransfer
    {
        $glueRequestValidationTransfer = new GlueRequestValidationTransfer();
        $accessTokenData = $this->accessTokenExtractor->extract($glueRequestTransfer);
        $ciamTokenData = $this->ciamProviderService->parseCiamToken($accessTokenData);

       if ($ciamTokenData === null) {
                return $glueRequestValidationTransfer
                    ->setIsValid(false)
                    ->setStatus(Response::HTTP_FORBIDDEN)
                    ->addError(
                        (new GlueErrorTransfer())
                            ->setStatus(Response::HTTP_FORBIDDEN)
                            ->setCode(OauthApiConfig::RESPONSE_CODE_FORBIDDEN)
                            ->setMessage(OauthApiConfig::RESPONSE_DETAIL_MISSING_ACCESS_TOKEN),
                    );
            }

        return parent::validate($request);
    }
```

### 2. Create a CIAM provider Rest API Module

To finalize your CIAM provider implementation and include it in the existing GLUE authorization process, you need to implement `\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestBuilderPluginInterface` together with `\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface`.
Their implementations must persist in the `CiamProviderRestApi` module following the implementation example.
You can also extend `GlueRequestCustomerTransfer` with Ciam Provider's attributes that you want to use—for example, Token, TokenId.
The logic within the `CiamTokenUserRequestBuilderInterface` implementation must combine the usage of the previously implemented steps.
It triggers the CIAM token parser, the CIAM token decoder, and the Customer creator.

The folder structure is similar to the following:

```text
+ Glue/
  + CiamProviderRestApi/
    + Plugin/
        + GlueApplication/
          + CiamProviderRequestValidatorPlugin.php // Triggers CiamTokenValidator
          + CiamTokenUserRequestBuilderPlugin.php // Triggers CiamTokenUserRequestBuilder
    + Processor/
        + RequestBuilder/
          + CiamTokenUserRequestBuilder.php // Parses and decodes the token; then, it maps the token's attributes to the customer transfer and triggers the create customer functionality
          + CiamTokenUserRequestBuilderInterface.php
        + Mapper/
          + CustomerMapper.php // Maps customer attributes from CiamProviderToken Transfer to Customer Transfer to be used in the customer creator
          + CustomerMapperInterface.php
        + Validator/
          + CiamTokenValidator.php // Validates The token using the Token parser and the decoder returning errors accordingly
          + CiamTokenValidatorInterface.php
  ...
```

The following code is an example of `CiamTokenUserRequestBuilder` using the previously added implementation:

```php
public function buildRequest(GlueRequestTransfer $glueRequestTransfer): GlueRequestTransfer
    {
        $accessTokenData = $this->accessTokenExtractor->extract($glueRequestTransfer);
        $ciamToken = $this->ciamProviderService->parseCiamToken($accessTokenData);

        if (!$ciamToken) {
            return null;
        }

        $ciamProviderTokenRequestTransfer = (new CiamProviderTokenRequestTransfer())
            ->setCiamToken($ciamToken);

        $ciamProviderTokenResponseTransfer = $this->ciamProviderClient
            ->decodeCiamToken($ciamProviderokenRequestTransfer);

        $customerTransfer = $this->customerMapper->mapCiamProviderTokenResponseTransferToCustomerTransfer(
            $ciamProviderTokenResponseTransfer,
            new CustomerTransfer()
        );

        if (!$customerTransfer->getEmail() || !$customerTransfer->getCustomerReference()) {
            return null;
        }

        $customerResponseTransfer = $this->customerClient->createCustomer($customerTransfer);

        if (!$customerResponseTransfer->getIsSuccess()) {
            return null;
        }

        $glueRequestCustomerTransfer = (new GlueRequestCustomerTransfer())
            ->setNaturalIdentifier($customerResponseTransfer->getCustomerTransfer()->getCustomerReference())
            ->setCiampProviderToken($ciamToken);

        return $glueRequestTransfer->setRequestCustomer($glueRequestCustomerTransfer);
    }
```

Your plugin implementations are ready. Inject them into `\Pyz\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider`. This requires you to extend it.

Example:

```php
    protected function getRequestBuilderPlugins(): array
    {
        return [
            ...
            new CiamTokenUserRequestBuilderPlugin(),
        ];
    }
```

```php
    protected function getRequestValidatorPlugins(): array
    {
        return [
            ...
            new CiamProviderRequestValidatorPlugin(),
        ];
    }
```

You've successfully extended the authorization process to include your CIAM provider authentication into the process.