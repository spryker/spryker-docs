---
title: Extend Federated Authentication (SSO) for the Storefront API and Backend API
description: Learn which extension points control sign-in with an external identity provider through the Storefront API and Backend API, and when to implement each of them.
template: concept-topic-template
last_updated: Nov 27, 2026
related:
  - title: Federated Authentication (SSO) for the Storefront API and Backend API
    link: docs/pbc/all/oauth/latest/federated-authentication-for-the-storefront-and-backend-api.html
  - title: Install Federated Authentication (SSO) for the Storefront API and Backend API
    link: docs/pbc/all/oauth/latest/install-and-upgrade/install-federated-authentication-for-the-storefront-and-backend-api.html
  - title: Storefront account bootstrapping
    link: docs/pbc/all/oauth/latest/storefront-account-bootstrapping.html
---

<style>
  .post-content pre {
    white-space: pre;
    word-break: normal;
    overflow-x: auto;
  }
</style>

Sign-in with an external identity provider through the Storefront API and Backend API works without custom code: the KnpU adapter talks to the identity provider, and the same rules as browser SSO decide which account a person gets. You extend the sign-in when your project needs a different OAuth library, its own rules for who can sign in, or additional actions after a person signs in.

This document describes the steps of an API sign-in, the extension point of each step, and when to implement it. For how the sign-in works, see [Federated Authentication (SSO) for the Storefront API and Backend API](/docs/pbc/all/oauth/latest/federated-authentication-for-the-storefront-and-backend-api.html). For the default plugin wiring, see [Install Federated Authentication (SSO) for the Storefront API and Backend API](/docs/pbc/all/oauth/latest/install-and-upgrade/install-federated-authentication-for-the-storefront-and-backend-api.html).

## How an API sign-in is assembled

Each sign-in passes the following steps. Every step is a plugin stack in Zed that you can change in your project.

| STEP | WHAT HAPPENS | STOREFRONT API | BACKEND API |
|---|---|---|---|
| 1. List the providers | Returns the identity providers that are enabled for the API, with their approved redirect URIs. | `CustomerIdentityProviderPluginInterface` | `UserIdentityProviderPluginInterface` |
| 2. Build the sign-in URL | Builds the authorization URL of the identity provider with a new `state` value and the PKCE code challenge of the frontend. | `IdentityProviderAuthorizationStrategyPluginInterface` | `IdentityProviderAuthorizationStrategyPluginInterface` |
| 3. Exchange the code | Exchanges the authorization code at the identity provider and returns the resource owner: the person that the identity provider signed in. | `IdentityProviderClientStrategyPluginInterface` | `IdentityProviderClientStrategyPluginInterface` |
| 4. Authenticate the grant | The `identity_provider` grant of the `Oauth` module asks an authenticator plugin to prove the code. The authenticator runs step 3. | `OauthIdentityProviderAuthenticatorPluginInterface` | `OauthIdentityProviderAuthenticatorPluginInterface` |
| 5. Resolve the account | Finds, links, or creates the account of the resource owner and checks whether the account is restricted. | Customer OAuth stacks of `CustomerDependencyProvider` | `OauthUserResourceOwnerResolverPluginInterface` |
| 6. Run actions after sign-in | Runs after the access token is issued. | `PostAuthPluginInterface` | No stack |

Steps 1–3 are the adapter between Spryker and the OAuth library. In the Storefront API, their interfaces are in the `AuthRestApiExtension` module; in the Backend API, in the `OauthBackendApiExtension` module. The `SecurityOauthKnpu` module implements them with KnpU.

## Use an OAuth library other than KnpU

The default adapter uses the [KnpU OAuth2 Client Bundle](https://github.com/knpuniversity/oauth2-client-bundle). If your project uses another OAuth library, or an identity provider that KnpU does not support, implement your own adapter: one plugin for each of the steps 1–3. The API resources, the checks of the provider name and the redirect URI, the grant, and the account resolution stay unchanged.

### Interfaces

The following interfaces are the Storefront API adapter, in the `Spryker\Zed\AuthRestApiExtension\Dependency\Plugin` namespace:

```php
interface CustomerIdentityProviderPluginInterface
{
    /**
     * @return array<\Generated\Shared\Transfer\IdentityProviderTransfer>
     */
    public function getIdentityProviders(): array;
}

interface IdentityProviderAuthorizationStrategyPluginInterface
{
    public function isApplicable(IdentityProviderAuthorizationRequestTransfer $identityProviderAuthorizationRequestTransfer): bool;

    public function createAuthorizationRequest(IdentityProviderAuthorizationRequestTransfer $identityProviderAuthorizationRequestTransfer): IdentityProviderAuthorizationResponseTransfer;
}

interface IdentityProviderClientStrategyPluginInterface
{
    public function isApplicable(ResourceOwnerRequestTransfer $resourceOwnerRequestTransfer): bool;

    public function getResourceOwner(ResourceOwnerRequestTransfer $resourceOwnerRequestTransfer): ResourceOwnerResponseTransfer;
}
```

The Backend API adapter in the `Spryker\Zed\OauthBackendApiExtension\Dependency\Plugin` namespace has the same contract. The only difference is the name of the provider list interface: `UserIdentityProviderPluginInterface` instead of `CustomerIdentityProviderPluginInterface`.

### Rules for adapter plugins

Your plugins must follow these rules, because the host module relies on them for the security checks of the sign-in:

- `getIdentityProviders()` returns the providers that are enabled for the API, with `name`, `linkText`, and the approved `redirectUris`. In the Storefront API, it returns the providers of the current store. The API shows only `name` and `linkText`. The host module uses `redirectUris` to check the redirect URI of each request.
- `createAuthorizationRequest()` builds the authorization URL with `response_type=code`, `client_id`, `redirect_uri`, `scope`, `state`, `code_challenge`, and `code_challenge_method=S256`. It returns `isSuccessful=true` with `authorizationUrl` and `state`, and stores nothing. It does not check the redirect URI, because the host module checks it before the call.
- `getResourceOwner()` exchanges `code` together with `codeVerifier` and `redirectUri` at the identity provider. It maps the resource owner to `provider` (the client name), `id`, `email`, `firstName`, and `lastName`. It returns `isSuccessful=false` for every failure and does not throw exceptions for identity provider or transport errors. It does not resolve, create, or link an account.
- Take the email only from the email field of the identity provider or from the `email` or `mail` claim. Do not use `preferred_username`: the person can change this claim at the identity provider and could set it to the email address of another person.

For steps 2 and 3, the host module calls the first plugin whose `isApplicable()` returns `true` for the provider name. If no plugin is applicable, the sign-in fails, and the reason is written to the application log. Because the selection is per provider, you can keep the KnpU plugins for the providers that KnpU serves and add your own plugins for other providers.

### Register adapter plugins

Register your plugins in the Zed dependency provider of the API:

| API | DEPENDENCY PROVIDER | METHODS |
|---|---|---|
| Storefront API | `src/Pyz/Zed/AuthRestApi/AuthRestApiDependencyProvider.php` | `getCustomerIdentityProviderPlugins()`, `getIdentityProviderAuthorizationStrategyPlugins()`, `getIdentityProviderClientStrategyPlugins()` |
| Backend API | `src/Pyz/Zed/OauthBackendApi/OauthBackendApiDependencyProvider.php` | `getUserIdentityProviderPlugins()`, `getIdentityProviderAuthorizationStrategyPlugins()`, `getIdentityProviderClientStrategyPlugins()` |

The following example keeps the KnpU adapter and adds a project adapter in the Storefront API:

**src/Pyz/Zed/AuthRestApi/AuthRestApiDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\AuthRestApi;

use Pyz\Zed\MyIdentityProvider\Communication\Plugin\AuthRestApi\MyCustomerIdentityProviderPlugin;
use Pyz\Zed\MyIdentityProvider\Communication\Plugin\AuthRestApi\MyIdentityProviderAuthorizationStrategyPlugin;
use Pyz\Zed\MyIdentityProvider\Communication\Plugin\AuthRestApi\MyIdentityProviderClientStrategyPlugin;
use Spryker\Zed\AuthRestApi\AuthRestApiDependencyProvider as SprykerAuthRestApiDependencyProvider;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\AuthRestApi\KnpuCustomerIdentityProviderPlugin;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\AuthRestApi\KnpuIdentityProviderAuthorizationStrategyPlugin;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\AuthRestApi\KnpuIdentityProviderClientStrategyPlugin;

class AuthRestApiDependencyProvider extends SprykerAuthRestApiDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\AuthRestApiExtension\Dependency\Plugin\CustomerIdentityProviderPluginInterface>
     */
    protected function getCustomerIdentityProviderPlugins(): array
    {
        return [
            new KnpuCustomerIdentityProviderPlugin(),
            new MyCustomerIdentityProviderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\AuthRestApiExtension\Dependency\Plugin\IdentityProviderAuthorizationStrategyPluginInterface>
     */
    protected function getIdentityProviderAuthorizationStrategyPlugins(): array
    {
        return [
            new KnpuIdentityProviderAuthorizationStrategyPlugin(),
            new MyIdentityProviderAuthorizationStrategyPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\AuthRestApiExtension\Dependency\Plugin\IdentityProviderClientStrategyPluginInterface>
     */
    protected function getIdentityProviderClientStrategyPlugins(): array
    {
        return [
            new KnpuIdentityProviderClientStrategyPlugin(),
            new MyIdentityProviderClientStrategyPlugin(),
        ];
    }
}
```

## Control who can sign in

The API sign-in adds no account rules of its own. It reuses the rules of browser SSO for the same kind of person, so one setup controls both the browser and the API sign-in.

- **Customers in the Storefront API.** The customer is resolved with the OAuth strategy, post-resolve, and restriction stacks of `CustomerDependencyProvider`, the same stacks as in Storefront SSO. To accept only existing customers, create company context on the first sign-in, or block specific customers, see [Storefront account bootstrapping](/docs/pbc/all/oauth/latest/storefront-account-bootstrapping.html).
- **Back Office users and merchant users in the Backend API.** The user is resolved with the stacks of Back Office SSO in `SecurityOauthUserDependencyProvider`: `getOauthUserAuthenticationStrategyPlugins()`, `getOauthUserPostResolvePlugins()`, and `getOauthUserRestrictionPlugins()`. Whether a person without a Back Office user gets one on the first sign-in follows your project's Back Office SSO setup. For details, see [Just-in-Time Provisioning: Back Office](/docs/pbc/all/oauth/latest/federated-authentication.html#back-office). Only active users get an access token, and the sign-in never creates a merchant user.

### Reject unverified email addresses

On the first sign-in, Spryker links the identity to an existing account with the same email address. Spryker does not check the `email_verified` claim. If your identity provider can return email addresses that the person has not verified, add this check, so that nobody can take over an account by registering its email address at the identity provider.

The strategy and restriction plugins receive a resource owner with `provider`, `id`, `email`, `firstName`, and `lastName` only. The other claims of the identity provider, including `email_verified`, are available only during the code exchange in step 3. Check the claim in your client strategy plugin, and return `isSuccessful=false` when the claim is not `true`.

## Run actions after a customer signs in

After a customer signs in, your project might need to prepare data for the customer's session, such as merging the guest cart into the customer cart. The Storefront API runs a post-authentication plugin stack for this.

The stack runs after every successful sign-in through the Storefront API: the password sign-in with `POST /access-tokens` and the identity provider sign-in alike. Each plugin receives `OauthResponseTransfer` with the customer reference. If the request contains the `X-Anonymous-Customer-Unique-Id` header, `OauthResponseTransfer.anonymousCustomerReference` contains the reference of the guest customer.

```php
namespace Spryker\Zed\AuthRestApiExtension\Dependency\Plugin;

interface PostAuthPluginInterface
{
    public function postAuth(OauthResponseTransfer $oauthResponseTransfer): void;
}
```

By default, the stack contains `UpdateGuestQuoteToCustomerQuotePostAuthPlugin`, which merges the guest cart into the customer cart. Add your own plugins for other actions, for example, to synchronize the customer with a CRM after sign-in.

**src/Pyz/Zed/AuthRestApi/AuthRestApiDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\AuthRestApi;

use Pyz\Zed\MyCrm\Communication\Plugin\AuthRestApi\SyncCustomerWithCrmPostAuthPlugin;
use Spryker\Zed\AuthRestApi\AuthRestApiDependencyProvider as SprykerAuthRestApiDependencyProvider;
use Spryker\Zed\CartsRestApi\Communication\Plugin\AuthRestApi\UpdateGuestQuoteToCustomerQuotePostAuthPlugin;

class AuthRestApiDependencyProvider extends SprykerAuthRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AuthRestApiExtension\Dependency\Plugin\PostAuthPluginInterface>
     */
    protected function getPostAuthPlugins(): array
    {
        return [
            new UpdateGuestQuoteToCustomerQuotePostAuthPlugin(),
            new SyncCustomerWithCrmPostAuthPlugin(),
        ];
    }
}
```

The Backend API has no post-authentication stack.

## Resolve Backend API users with your own logic

The user provider of the `identity_provider` grant gets the Back Office user of the resource owner from a resolver plugin stack. By default, `OauthUserResourceOwnerResolverPlugin` of the `SecurityOauthUser` module resolves the user with the Back Office SSO stacks described in [Control who can sign in](#control-who-can-sign-in).

Implement your own resolver only when Backend API users must be resolved differently from Back Office SSO. To change who can sign in, change the Back Office SSO stacks instead, so that the Back Office and the Backend API keep the same rules.

```php
namespace Spryker\Zed\OauthUserConnectorExtension\Dependency\Plugin;

interface OauthUserResourceOwnerResolverPluginInterface
{
    public function isApplicable(OauthUserResolveRequestTransfer $oauthUserResolveRequestTransfer): bool;

    public function resolveUser(OauthUserResolveRequestTransfer $oauthUserResolveRequestTransfer): OauthUserResolveResponseTransfer;
}
```

- `isApplicable()` returns `true` when the plugin resolves users for `OauthUserResolveRequestTransfer.resourceOwner.provider`. The first applicable plugin resolves the user. `OauthUserResourceOwnerResolverPlugin` is applicable to every resource owner, so register your plugins that serve one IdP only before it.
- `resolveUser()` returns `isSuccessful=true` with `user` when it resolves a user who is not restricted. It returns `isSuccessful=false` without `user` when it resolves no user. For a restricted user, it returns `isSuccessful=false`, `isRestricted=true`, and the restriction `messages`.

Register your plugin in `src/Pyz/Zed/OauthUserConnector/OauthUserConnectorDependencyProvider.php`, in `getOauthUserResourceOwnerResolverPlugins()`.

## Add identity provider sign-in to another application

The `identity_provider` grant of the `Oauth` module can issue tokens for other Glue applications or other kinds of users. For this, implement an authenticator plugin. For customers in the Storefront API and users in the Backend API, Spryker already ships the authenticator plugins `CustomerOauthIdentityProviderAuthenticatorPlugin` and `UserOauthIdentityProviderAuthenticatorPlugin`. To support another OAuth library in these APIs, implement the adapter interfaces described in [Use an OAuth library other than KnpU](#use-an-oauth-library-other-than-knpu) instead.

```php
namespace Spryker\Zed\OauthExtension\Dependency\Plugin;

interface OauthIdentityProviderAuthenticatorPluginInterface
{
    public function isApplicable(OauthIdentityProviderAuthenticationRequestTransfer $oauthIdentityProviderAuthenticationRequestTransfer): bool;

    public function authenticate(OauthIdentityProviderAuthenticationRequestTransfer $oauthIdentityProviderAuthenticationRequestTransfer): OauthIdentityProviderAuthenticationResponseTransfer;
}
```

- The grant calls the first plugin in `OauthDependencyProvider::getOauthIdentityProviderAuthenticatorPlugins()` whose `isApplicable()` returns `true`, usually decided by `requestApplication`.
- `authenticate()` checks the identity provider and the redirect URI, exchanges the authorization code at the identity provider, and returns `isSuccessful=true` with the `resourceOwner`. It does not resolve, create, or link an account: the user provider plugins of the grant do this with the resource owner.

{% info_block warningBox "Warning" %}

The grant issues an access token for every resource owner that an authenticator plugin returns. Register only authenticator plugins that exchange the code at the identity provider themselves. Do not register a grant type of your own with the identifier `identity_provider`. In your user provider plugins, resolve the account only from the resource owner that the grant passes, never from fields of the request body such as `username`.

{% endinfo_block %}

## Choosing the right extension point

| SITUATION | EXTENSION POINT |
|---|---|
| Your project uses an OAuth library other than KnpU, or an identity provider that KnpU does not support. | Adapter interfaces of `AuthRestApiExtension` or `OauthBackendApiExtension` |
| Your identity provider can return unverified email addresses. | `IdentityProviderClientStrategyPluginInterface` |
| Only existing customers can sign in, or new customers need company context on the first sign-in. | Customer OAuth stacks. See [Storefront account bootstrapping](/docs/pbc/all/oauth/latest/storefront-account-bootstrapping.html). |
| Only existing Back Office users can sign in. | Your project's Back Office SSO setup. See [Just-in-Time Provisioning: Back Office](/docs/pbc/all/oauth/latest/federated-authentication.html#back-office). |
| Specific customers or users must be blocked from sign-in. | `OauthCustomerRestrictionPluginInterface` or `OauthUserRestrictionPluginInterface` |
| An action must run after a customer signs in through the Storefront API. | `PostAuthPluginInterface` |
| Backend API users must be resolved with logic other than Back Office SSO. | `OauthUserResourceOwnerResolverPluginInterface` |
| Another Glue application or user type needs identity provider sign-in. | `OauthIdentityProviderAuthenticatorPluginInterface` |
