---
title: Glue API security and authentication
description: This article describes the authorization mechanism used in Spryker, the modules that provide it, as well as user scopes, database tables, and extension points.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/security-and-authentication
originalArticleId: f37cbced-75fa-4ea4-aad6-7afdeea109a4
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/old-glue-infrastructure/glue-api-security-and-authentication.html
  - /docs/scos/dev/glue-api-guides/202200.0/security-and-authentication.html
  - /docs/scos/dev/glue-api-guides/202204.0/security-and-authentication.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/security-and-authentication.html
  - /docs/pbc/all/identity-access-management/202311.0/glue-api-security-and-authentication.html
related:
  - title: Authentication and Authorization
    link: docs/dg/dev/glue-api/page.version/old-glue-infrastructure/glue-api-authentication-and-authorization.html
  - title: Glue Infrastructure
    link: docs/dg/dev/glue-api/page.version/old-glue-infrastructure/glue-infrastructure.html
---

<!-- 2020307.0 is the last version to support this doc. Don't move it to the next versions -->

{% info_block warningBox %}

This is a document related to the Old Glue infrastructure. For the new one, see [Decoupled Glue API](/docs/dg/dev/glue-api/{{page.version}}/decoupled-glue-api.html)

{% endinfo_block %}

When exposing information via Spryker Glue API and integrating with third-party applications, it is essential to protect API endpoints from unauthorized access. For this purpose, Spryker provides an authorization mechanism, using which you can request users to authenticate themselves before accessing a resource. For this purpose, Spryker Glue is shipped with an implementation of the OAuth 2.0 protocol. It allows users to authenticate themselves with their username and password and receive an access token. The token can then be used to access protected resources.

The authorization mechanism provided by the Glue is flexible and allows you to define which endpoints specifically require authentication. Usually, protected endpoints include customer wish lists, carts, personal data and the like. Also, you may want to protect additional areas as required by your project. In addition to endpoints, you may require authorization to use specific REST verbs. For example, a certain endpoint can allow retrieving information, but not modifying it. In this case, the GET verb can be allowed for usage without authentication, while the PUT, PATCH and DELETE verbs will require user authentication to use.

## How authentication works

To authenticate a user, the client must send an authentication request, containing the username and password. If the provided credentials match a valid Spryker user, the API responds with a 201 response code and a message containing an access token, also known as a bearer token. The token can then be used to access protected API resources. Schematically, the authentication and authorization scheme of Spryker REST API can be represented as follows:

![auth-scheme.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Developer+Guides/Security+and+Authentication/auth-scheme.png)

Access tokens issued by the API have a limited lifetime. When a token is issued, the response message contains not only the access token, but also the duration of its validity, in seconds, and a refresh token. Once the access token expires, the corresponding refresh token can be exchanged for a new pair of access and refresh tokens.

If an invalid or expired token is passed when accessing a protected resource, or no token is passed at all, the API will respond with a 401 Unauthorized response code. This response code will also be issued if a user is not authorized to access that particular resource. The response body will contain a detailed error message. It is, therefore, the client's responsibility to handle the 401 response code and error messages correctly.

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
| AuthRestApi <!-- link module_guide/spryker/auth-rest-api--> | Provides authentication resources to the REST API. |

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

```
$restRequest->getRestUser()->getSurrogateIdentifier();
$restRequest->getRestUser()->getNaturalIdentifier();
```

### Company user scope

In the B2B scenario, a user can be associated with an additional scope, `company_user`. This scope is added in the following cases:

* the user has impersonated as a Company User via the `/company-user-access-tokens` endpoint;
* the user is associated with a **single** Company User account;
* the user is associated with **several** Company User accounts and there is a default one.

Using this additional scope, you can perform additional checks to identify whether a resource should be available to a user. For this purpose, you can identify which Company User account is currently active, and also what company and business unit it belongs to. This can be done using the following helper methods:

```php
$restRequest->getRestUser()->getIdCompanyUser();
$restRequest->getRestUser()->getIdCompanyBusinessUnit();
$restRequest->getRestUser()->getIdCompany();
```

{% info_block infoBox "Info" %}

B2B functionality is available in Spryker Glue API since version 201907.0.

{% endinfo_block %}

## Endpoint protection

In addition to user scopes, each endpoint can be secured individually. For this purpose, you need to configure the routing of your Resource Feature Module. The Route Plugins of each module define which verbs are supported by the corresponding endpoint. This is done via the config function of the plugin class. The verbs are passed to it as a set of functions that should be called when the corresponding verb is passed.

{% info_block infoBox %}

For details, see [Resource Routing](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/glue-infrastructure.html#resource-routing).

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
| spy_oauth_access_token| Stores all issued tokens.<br>The table is not used for token verification, it is added for audit purposes only.  |
|  spy_oauth_client|Contains a list of clients that are currently using OAuth, one record for each frontend customer. The `is_confidental` field identifies whether a specific client must provide a password.  |
| spy_oauth_scope |  Stores user scopes.|

The `OAuth` and `OAuthExtension` modules also provides the following extension points:

|EXTENSION POINT	| METHOD | INTERFACE |
| --- | --- | --- |
|User provider plugins|`getUserProviderPlugins()`|`\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserProviderPluginInterface`|
|Scope provider plugins|`getScopeProviderPlugins()`|`\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthScopeProviderPluginInterface`|
