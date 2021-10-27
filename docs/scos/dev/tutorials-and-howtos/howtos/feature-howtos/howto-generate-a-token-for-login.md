---
title: HowTo - Generate a Token for Login
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-generate-a-token-for-login
originalArticleId: d8eb9816-18d8-4da0-b856-1d3989a07932
redirect_from:
  - /2021080/docs/howto-generate-a-token-for-login
  - /2021080/docs/en/howto-generate-a-token-for-login
  - /docs/howto-generate-a-token-for-login
  - /docs/en/howto-generate-a-token-for-login
  - /v6/docs/howto-generate-a-token-for-login
  - /v6/docs/en/howto-generate-a-token-for-login
---

[Customer Login by Token](/docs/scos/user/features/{{site.version}}/company-account-feature-overview/customer-login-by-token-overview.html) feature allows B2B users to log in to a Spryker Shop using a token.

A token is a unique identifier that contains all the information needed for authentication to fetch a specific resource without using a username and password. The tokens are JSON strings that are encoded in `base64url` format.

To generate a token, follow the steps:
1. The following transfers have to be adjusted for expansion:

```xml
<transfer name="Customer">
	<property name="additionalProperty" type="array" />
</transfer>

<transfer name="CompanyUserIdentifier">
	<property name="additionalProperty" type="array" />
</transfer>

<transfer name="OauthUser">
	<property name="additionalProperty" type="array" />
</transfer>

<transfer name="OauthRequest">
	<property name="additionalProperty" type="array" />
</transfer>
```
2. Generate a token using a facade call `OauthCompanyUserFacade::createCompanyUserAccessToken()`:

```php
$customerTransfer = (new CustomerTransfer())
	->setCompanyUserTransfer((new CompanyUserTransfer())->setIdCompanyUser(11))
	->setAdditionalProperty(['key' => 'value']);

$oauthResponseTransfer = OauthCompanyUserFacade::createCompanyUserAccessToken($customerTransfer);
$accessToken = $oauthResponseTransfer->getAccessToken();
```
3. Retrieve the customer by an access token using a client call `OauthCompanyUserClient::getCustomerByAccessToken()`:

```php
$customerTransfer = OauthCompanyUserClient::getCustomerByAccessToken($accessToken)->getCustomerTransfer();

$additionalProperty = $customerTransfer->getAdditionalProperty(); // ['key' => 'value']
```
