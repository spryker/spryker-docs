---
title: How-To integrate a CIAM provider
description: Learn how to integrate CIAM into a Spryker project
template: howto-guide-template
---

# How-To integrate a CIAM provider


This page describes how to integrate a third party CIAM provider into a Spryker project.


The following steps will help you Integrate between Spryker project and CIAM leveraging standard APIs that the CIAM provider exposes. which can be used in the context of a customer whose data is to be read or updated.

The integration can either extend the existing authorization functionality provided by Spryker OOTB or replace it depending on your requirements, having said that in the following documentation we are going to focus on extending the existing functionality.

## Prerequisites

We recommend using JWT based tokens to transfer required customer data between CIAM and Spryker for more details on JWT see <https://auth0.com/docs/secure/tokens/json-web-tokens>. 
There is a ready PHP based library that provides JWT decoding such as https://packagist.org/packages/firebase/php-jwt
### Install the required modules using Composer

Run the following command(s) to install the required modules:

{% info_block infoBox %}
The following library is a suggestion and not a requirement
{% endinfo_block %}

```bash
composer require "firebase/php-jwt": "^5.4" --update-with-dependencies
```

For detailed information on the modules related to Oauth and Customer management that provide the API functionality and related installation instructions, see [GLUE: Customer Account Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-customer-account-management-feature-integration.html).


## 1. Create the CIAM provider Module
Let's start by creating a separate CIAM provider Client layer that will be structured as below: 
```
+ Client/
  + CiamProvider/
    + Decoder/
      + CiamTokenDecoder.php // Decodes JWT token using php-jwt library and the key from the CIAM provider returns a transfer with the required mapped attributes
      + CiamTokenDecoderInterface.php
    + Mapper/
      + CiamTokenMapper.php // Maps decoded token attributes
      + CiamTokenMapperInterface.php
    + Reader/
      + CiamDataReader.php // Provides the token Keys from the provider required to decode to JWT token
      + CiamDataReaderInterface.php
    + CiamClient.php
    + CiamClientInterface.php  
    + CiamConfig.php 
  ...
```
The following code example shows how the Ciam token decoding logic would look like:
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
In relation to the CIAM provider module you will need to add a service as well in order to extract and parse the token from the authorization header. 
the logic will fall under the Pyz/Service/<CIAM Provider>:
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
An Example of standard Ciam token parsing logic:

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
## 2. Extend Customer module with a customer creation functionality
Depending on the attributes that you are planing to use from the CIAM provider in the customer creation, you will need to extend the customer module accordingly.

The following will be the Customer Zed layer touch-points required to be extended/created in a standard integration more changes might be required depending on the implementation:

```
+ Zed/
  + Customer/
    + Business/
        + Customer
          + CustomerCreator.php // [Created Class] Validates the required attributes, Checks if a customer exists or not and triggers the customer creation from the entity manager accordingly 
          + CustomerCreatorInterface.php [Created Interface]
        + CustomerBusinessFactory.php // [Extended Class]
        + CustomerFacade.php  // [Extended Class]
        + CustomerFacadeInterface.php // [Extended Interface]
    + Communication/
        + Controller
          + GatewayController.php // [Extended Class]
    + Persistence/
        + CustomerEntityManager.php // [Extended Class] Add the custom create customer functionality that will create the customer depending on the attributes provided from the token.
        + CustomerEntityManagerInterface.php  // [Extended Interface]
  ...
```
The extended functionality here shouldn't be complex and shouldn't include any extra logic apart from validation of the required attributes and creating the customer entity. 
The following is an example of create customer functionality in CustomerCreator.php :
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
Keep in mind that After extending the Customer Zed layer you will need to extend the Customer Client layer as well to access the Zed layer accordingly .

## 3. Adjust Glue modules to include the new authorization functionality 
### 1.Extend AuthRestApi Module
The first step here is to extend the access token validation step in AuthRestApi module with your CIAM Provider Token parsing Service.

```
+ Glue/
  + AuthRestApi/
    + Processor/
        + AccessToken
          + AccessTokenValidator.php // [Extended Class]
  ...
```

You will need to adjust the AuthRestApiFactory and AuthRestApiDependencyProvider to include the CIAM Provider Service. 
In our implementation example it would be **Pyz\Service\CiamProvider\CiamProviderServiceInterface**.

The following example is extending AccessTokenValidator to validate the authorization header using our CIAM provider parser:
```php
    public function validate(Request $request): ?RestErrorMessageTransfer
    {
        $authorizationToken = $request->headers->get(AuthRestApiConfig::HEADER_AUTHORIZATION);
        $ciamToken = $this->ciamProviderService->parseCiamToken($authorizationToken);

        if ($ciamToken !== null) {
            return null;
        }

        return parent::validate($request);
    }
```
### 2.Create a CIAM provider Rest API Module
In order to finalize your CIAM provider implementation and include it in the existing GLUE authorization process you will need to implement **RestUserFinderPluginInterface** and **RestRequestValidatorPluginInterface**. 
Their implementations should persist in the CiamProviderRestApi Module following our implementation example.

The logic within the **RestUserFinderPluginInterface** implementation will utilize the previously adjusted/created functionalities in our steps so far.
Tt will trigger the Ciam token parser, the CIAM token decoder as well as the Customer creator.

The folder structure would look more or less like the following: 

```
+ Glue/
  + CiamProviderRestApi/
    + Plugin/
        + GlueApplication/
          + CiamProviderTokenRestRequestValidatorPluginInterface.php // Triggers CiamTokenValidator 
          + CiamProviderRestUserFinderPluginInterface.php // Triggers CiamTokenUserFinder
    + Processor/
        + Finder/
          + CiamTokenUserFinder.php // Parses and decodes the token then it mappers the token attributes to the customer transfer and trigger the create customer functionality 
          + CiamTokenUserFinderInterface.php
        + Mapper/
          + CustomerMapper.php // Maps customer attributes from CiamProviderToken Transfer to Customer Transfer to be used in the customer creator
          + CustomerMapperInterface.php
        + Validator/
          + CiamTokenValidator.php // Validates The token using the Token parser and the decoder returning errors accordingly
          + CiamTokenValidatorInterface.php
  ...
```
The following code is an example of the CiamTokenUserFinder utilizing all the previously added implementation in our walkthrough:

```php
 public function findUser(RestRequestInterface $restRequest): ?RestUserTransfer
    {
        $authorizationToken = $restRequest->getHttpRequest()->headers->get(CiamProviderRestApiConfig::HEADER_AUTHORIZATION);
        $ciamToken = $this->ciamProviderService->parseCiamToken($authorizationToken);

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

        return (new RestUserTransfer())
            ->fromArray($customerResponseTransfer->getCustomerTransfer()->toArray(), true);
    }
```
Now that your plugin implementations are ready you will need to inject them into **Glue/GlueApplication/GlueApplicationDependencyProvider.php** this will require you to extend it.

Example:

```php
    protected function getRestUserFinderPlugins(): array
    {
        return [
            ...
            new CiamProviderRestUserFinderByTokenPlugin(),
        ];
    }
```

```php
    protected function getRestRequestValidatorPlugins(): array
    {
        return [
            ...
            new CiamProviderTokenRestRequestValidatorPlugin(),
        ];
    }
```
That should be it, You’ve successfully extended the authorization process to include your CIAM provider authentication into the process.


