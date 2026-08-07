---
title: Storefront API security and authentication
description: This article describes the authorization mechanism used in Spryker, the modules that provide it, as well as user scopes, database tables, and extension points.
last_updated: Jul 31, 2026
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/security-and-authentication
originalArticleId: f37cbced-75fa-4ea4-aad6-7afdeea109a4
redirect_from:
  - /docs/scos/dev/glue-api-guides/202404.0/old-glue-infrastructure/glue-api-security-and-authentication.html
  - /docs/scos/dev/glue-api-guides/202200.0/security-and-authentication.html
  - /docs/scos/dev/glue-api-guides/202204.0/security-and-authentication.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/security-and-authentication.html
  - /docs/pbc/all/identity-access-management/202404.0/glue-api-security-and-authentication.html
  - /docs/dg/dev/glue-api/latest/old-glue-infrastructure/glue-api-security-and-authentication.html
  - /docs/integrations/spryker-glue-api/storefront-api/developing-apis/storefront-api-security-and-authentication.html
  - /docs/integrations/spryker-api/storefront-api/developing-apis/storefront-api-security-and-authentication.html
---

Spryker Storefront API protects endpoints with the OAuth 2.0 protocol; for the authentication concept, token lifetimes, and error handling, see [Authenticating and authorization](/docs/integrations/spryker-api/authenticating-and-authorization/authenticating-and-authorization.html). This document describes the Glue infrastructure implementation: the modules that provide authentication, user scopes, database tables, and extension points. The OAuth modules, scopes, and tokens described here are shared by both infrastructures; however, for endpoints served by API Platform, the code-level patterns differ—user access and endpoint protection are handled through security expressions and the `ApiUser` object, as described in [API Platform security](/docs/integrations/spryker-api/authenticating-and-authorization/security.html).

Authentication workflow:

![authentication-workflow.PNG](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Developer+Guides/Security+and+Authentication/authentication-workflow.png)

## Modules

Authentication and authorization are provided by the following modules:

| NAME | PURPOSE |
| --- | --- |
| league/oauth2-server | Third-party OAuth server, PhpLeague Oauth Server, integrated into Spryker |
| Oauth <!-- link to https://documentation.spryker.com/module_guide/spryker/oauth.htm -->| Integrates PhpLeague Oauth Server with Spryker and also provides the necessary extension points. |
| OauthExtension <!-- link module_guide/spryker/oauth-extension --> | Provides extension point and plugin interfaces for the Oauth module. |
| OauthCustomerConnector <!-- link module_guide/spryker/oauth-customer-connector--> | Provides authentication plugins for OAuth modules necessary to validate user credentials and scopes. |
| AuthRestApi <!-- link module_guide/spryker/auth-rest-api--> | Provides authentication resources to the Storefront API. |

## User scopes

The API has scopes defined for different groups of users. A scope defines, which resources specifically users can access.

{% info_block warningBox "Note" %}

By default, all Spryker customers are assigned to the customer scope.

{% endinfo_block %}

To identify, which user has made a request, you can use the `getRestUser()` function of `RestRequestInterface`, for example:

```php
class MyResourceHandler implements MyResourceInterface
    /**
     * @param \Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface $restRequest
     *
     * @return \Generated\Shared\Transfer\CustomerTransfer
     */
    protected function getCustomerTransfer(RestRequestInterface $restRequest): CustomerTransfer
    {
        return (new CustomerTransfer())->setCustomerReference($restRequest->getRestUser()->getNaturalIdentifier());
    }
```

To identify the user, you can use the `getSurrogateIdentifier` and `getNaturalIdentifier` functions:

```php
$restRequest->getRestUser()->getSurrogateIdentifier();
$restRequest->getRestUser()->getNaturalIdentifier();
```

### Company user scope

In the B2B scenario, a user can be associated with an additional scope, `company_user`. This scope is added in the following cases:

- the user has impersonated as a Company User via the `/company-user-access-tokens` endpoint;
- the user is associated with a **single** Company User account;
- the user is associated with **several** Company User accounts and there is a default one.

Using this additional scope, you can perform additional checks to identify whether a resource should be available to a user. For this purpose, you can identify which Company User account is currently active, and also what company and business unit it belongs to. This can be done using the following helper methods:

```php
$restRequest->getRestUser()->getIdCompanyUser();
$restRequest->getRestUser()->getIdCompanyBusinessUnit();
$restRequest->getRestUser()->getIdCompany();
```

{% info_block infoBox "Info" %}

B2B functionality is available in Spryker Storefront API since version 201907.0.

{% endinfo_block %}

## Endpoint protection

In addition to user scopes, each endpoint can be secured individually. For this purpose, you need to configure the routing of your Resource Feature Module. The Route Plugins of each module define which verbs are supported by the corresponding endpoint. This is done via the config function of the plugin class. The verbs are passed to it as a set of functions that should be called when the corresponding verb is passed.

{% info_block infoBox %}

For details, see [Resource Routing](/docs/integrations/spryker-api/storefront-api/developing-apis/glue-infrastructure.html#resource-routing).

{% endinfo_block %}

For each function in the set, the second parameter determines, whether the corresponding verb requires authentication to use (the parameter value is true) or not (the value is false). If the parameter is not passed, the verb requires authentication.

In the following example, the PUT and DELETE verbs require authentication, and the GET verb can be called anonymously.

```php
...
class MyResourceRoutePlugin extends AbstractPlugin implements ResourceRoutePluginInterface
{
    public function configure(ResourceRouteCollectionInterface $resourceRouteCollection): ResourceRouteCollectionInterface
    {
        $resourceRouteCollection->addPost('post')
            ->addDelete('delete', true)
            ->addGet('get', false);
        ...
```

## Database and extension points

All data related to API authentication functionality is stored in the following tables:

|TABLE|	PURPOSE|
| --- | --- |
| spy_oauth_access_token| Stores all issued tokens.<br>The table is not used for token verification, it's added for audit purposes only.  |
|  spy_oauth_client|Contains a list of clients that are currently using OAuth, one record for each frontend customer. The `is_confidental` field identifies whether a specific client must provide a password.  |
| spy_oauth_scope |  Stores user scopes.|

The `OAuth` and `OAuthExtension` modules also provides the following extension points:

|EXTENSION POINT	| METHOD | INTERFACE |
| --- | --- | --- |
|User provider plugins|`getUserProviderPlugins()`|`\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserProviderPluginInterface`|
|Scope provider plugins|`getScopeProviderPlugins()`|`\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthScopeProviderPluginInterface`|
