---
title: Storefront account bootstrapping
description: Extension points for controlling how Spryker Storefront customer accounts are resolved, created, and enriched with company context during OAuth SSO login.
template: concept-topic-template
last_updated: Apr 21, 2026
---

When a user logs in via SSO for the first time — no existing OAuth identity record links them to a Spryker account — Spryker must resolve or create a `CustomerTransfer` before creating the session. Whatever the strategy returns becomes the session, including any company relations, roles, or custom data on the transfer. This is the JIT (just-in-time) bootstrapping window: the moment to both provision the account and load the context the rest of the application expects to find in the session.

On every subsequent login, `KnpuOauthCustomerIdentityStrategyPlugin` matches the user by their stored provider and external ID and short-circuits the stack — the bootstrapping strategies described in this document are never called again for that user.

The resolution is handled by a stack of **authentication strategy plugins** registered in `CustomerDependencyProvider`. The stack is evaluated in order; the first plugin that returns a non-null `CustomerTransfer` wins, and the rest are skipped.

---

## Choosing a built-in strategy

Two strategies ship out of the box. Choosing the right one depends on how customer records are managed in your project.

### AcceptOnlyOauthCustomerAuthenticationStrategyPlugin

Looks up a customer by the email address returned by the IdP. If a matching customer exists, that customer is returned and the login succeeds. If no customer exists, the login is rejected.

This is the right choice when customers are provisioned outside of the OAuth flow — imported from a CRM or ERP, or registered through the standard Spryker registration form. Their company relations, company user records, and any B2B configuration are already in place. SSO becomes the authentication mechanism for fully set-up accounts: no bootstrapping is needed, and existing company context is loaded naturally as part of the standard session initialisation.

### CreateCustomerOauthCustomerAuthenticationStrategyPlugin

Looks up a customer by email. If no customer exists, one is created automatically on first login using the name claims from the IdP. The returned `CustomerTransfer` contains only the base customer record — no company relations.

This works for B2C setups. For B2B, it is not sufficient on its own: the session has no company context, and the user lands in a state where company-gated features are unavailable.

---

## Custom authentication strategy

When SSO must both create the customer account and establish company context in a single flow, implement a custom strategy plugin. Because the strategy runs only on first SSO login and its return value is what the session is built from, this is the correct place to ensure company data is present from the moment the user's session is created.

### Interface

```php
interface OauthCustomerAuthenticationStrategyPluginInterface
{
    /**
     * @api
     *
     * Returns true if this strategy should handle the given resource owner.
     * Called before resolveOauthCustomer() to allow conditional strategy selection.
     */
    public function isApplicable(ResourceOwnerTransfer $resourceOwnerTransfer): bool;

    /**
     * @api
     *
     * Resolves or creates a CustomerTransfer from the OAuth resource owner data.
     * Returns null if the customer cannot be resolved by this strategy.
     */
    public function resolveOauthCustomer(ResourceOwnerTransfer $resourceOwnerTransfer): ?CustomerTransfer;
}
```

`ResourceOwnerTransfer` carries the claims returned by the IdP. The `email` claim is always present when Spryker's default scopes are configured. `getFirstName()`, `getLastName()`, and `getId()` (the IdP-assigned external identifier) are available when the IdP returns them.

### Stub implementation

The following stub shows the full shape of a B2B strategy plugin. Company resolution is intentionally left abstract — the right approach depends on your setup and is covered in the section below.

**`src/Pyz/Zed/Customer/Communication/Plugin/Customer/B2BOauthCustomerAuthenticationStrategyPlugin.php`**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Customer\Communication\Plugin\Customer;

use Generated\Shared\Transfer\CompanyUserTransfer;
use Generated\Shared\Transfer\CustomerTransfer;
use Generated\Shared\Transfer\ResourceOwnerTransfer;
use Spryker\Zed\CustomerExtension\Dependency\Plugin\OauthCustomerAuthenticationStrategyPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class B2BOauthCustomerAuthenticationStrategyPlugin extends AbstractPlugin implements OauthCustomerAuthenticationStrategyPluginInterface
{
    public function isApplicable(ResourceOwnerTransfer $resourceOwnerTransfer): bool
    {
        return $resourceOwnerTransfer->getEmail() !== null;
    }

    public function resolveOauthCustomer(ResourceOwnerTransfer $resourceOwnerTransfer): ?CustomerTransfer
    {
        $customerTransfer = $this->findOrCreateCustomer($resourceOwnerTransfer);

        if ($customerTransfer === null) {
            return null;
        }

        $this->ensureCompanyUser($customerTransfer, $resourceOwnerTransfer);

        return $customerTransfer;
    }

    protected function findOrCreateCustomer(ResourceOwnerTransfer $resourceOwnerTransfer): ?CustomerTransfer
    {
        $customerTransfer = $this->getFacade()->findCustomerByEmail($resourceOwnerTransfer->getEmail());

        if ($customerTransfer !== null) {
            return $customerTransfer;
        }

        $customerResponseTransfer = $this->getFacade()->registerCustomer(
            (new CustomerTransfer())
                ->setEmail($resourceOwnerTransfer->getEmail())
                ->setFirstName($resourceOwnerTransfer->getFirstName() ?? 'OAuth')
                ->setLastName($resourceOwnerTransfer->getLastName() ?? 'User')
                ->setSendRegistrationToken(false)
                ->setSendPasswordToken(false),
        );

        if (!$customerResponseTransfer->getIsSuccess()) {
            return null;
        }

        $this->getFacade()->confirmCustomerRegistration($customerResponseTransfer->getCustomerTransfer());

        return $customerResponseTransfer->getCustomerTransfer();
    }

    protected function ensureCompanyUser(CustomerTransfer $customerTransfer, ResourceOwnerTransfer $resourceOwnerTransfer): void
    {
        $companyTransfer = $this->resolveCompany($resourceOwnerTransfer);

        if ($companyTransfer === null) {
            return;
        }

        $this->getFactory()->getCompanyUserFacade()->create(
            (new CompanyUserTransfer())
                ->setCustomer($customerTransfer)
                ->setFkCompany($companyTransfer->getIdCompany()),
        );
    }

    protected function resolveCompany(ResourceOwnerTransfer $resourceOwnerTransfer): ?CompanyTransfer
    {
        // Implement company resolution here — see strategies below.
        return null;
    }
}
```

### Registration

Place the custom strategy **before** the default strategies so it is evaluated first.

**`src/Pyz/Zed/Customer/CustomerDependencyProvider.php`**

```php
use Pyz\Zed\Customer\Communication\Plugin\Customer\B2BOauthCustomerAuthenticationStrategyPlugin;
use Spryker\Zed\SecurityOauthKnpu\Communication\Plugin\Customer\KnpuOauthCustomerIdentityStrategyPlugin;
use Spryker\Zed\Customer\Communication\Plugin\Customer\AcceptOnlyOauthCustomerAuthenticationStrategyPlugin;

protected function getOauthCustomerAuthenticationStrategyPlugins(): array
{
    return [
        new KnpuOauthCustomerIdentityStrategyPlugin(),      // fast path: returning users with an identity record
        new B2BOauthCustomerAuthenticationStrategyPlugin(), // custom B2B provisioning
    ];
}
```

`KnpuOauthCustomerIdentityStrategyPlugin` is a short-circuit for users who have already logged in via OAuth — it matches by provider and external ID, bypassing the company logic entirely for returning users.

### Company resolution strategies

The `resolveCompany()` method is where the project-specific logic lives. Common approaches:

**Email domain mapping** — derive the company from the domain part of the IdP email. Works well when each company's users share a single domain and that mapping is stored in Spryker or configuration.

```php
protected function resolveCompany(ResourceOwnerTransfer $resourceOwnerTransfer): ?CompanyTransfer
{
    $domain = substr(strrchr($resourceOwnerTransfer->getEmail(), '@'), 1);

    return $this->getFactory()
        ->getCompanyFacade()
        ->findCompanyByEmailDomain($domain);
}
```

**IdP claim** — the IdP includes a company identifier as a custom claim on the token. Read it from the resource owner and look up the company in Spryker.

```php
protected function resolveCompany(ResourceOwnerTransfer $resourceOwnerTransfer): ?CompanyTransfer
{
    $companyReference = $resourceOwnerTransfer->getAttributes()['company_reference'] ?? null;

    if ($companyReference === null) {
        return null;
    }

    return $this->getFactory()
        ->getCompanyFacade()
        ->findCompanyByReference($companyReference);
}
```

**External service lookup** — when company assignment is managed in an external system (an IAM platform, a provisioning API, or a directory), call that service from within `resolveCompany()`. The company reference returned is then used to look up or create the Spryker company record.

---

## Other extension points

The authentication strategy is not the only place to add behaviour to the OAuth login flow. Three additional extension points are available for work that does not need to happen inside the strategy itself.

### OauthCustomerPostResolvePluginInterface

Registered in `CustomerDependencyProvider::getOauthCustomerPostResolvePlugins()`. All registered plugins run after any strategy successfully resolves a customer, on every login. Receives both the resolved `CustomerTransfer` and the `ResourceOwnerTransfer`.

Use this for work that should happen on every OAuth login regardless of which strategy ran — for example, refreshing profile fields from the latest IdP claims, updating a last-seen-via-SSO timestamp, or triggering an audit event.

### PostCustomerRegistrationPluginInterface

Registered in `CustomerDependencyProvider::getPostCustomerRegistrationPlugins()`. Runs only when `CreateCustomerOauthCustomerAuthenticationStrategyPlugin` creates a new customer — it is invoked inside the `register()` call, before the strategy returns.

Use this for onboarding side effects triggered by any new customer registration — for example, opting the customer into a default newsletter subscription or creating a company account. Be aware that this stack runs for all customer registrations, not just OAuth: form registration, API registration, and any other path that calls `register()` will also trigger these plugins. Logic placed here applies universally, which may or may not be the intention.

### OauthCustomerRestrictionPluginInterface

Registered in `CustomerDependencyProvider::getOauthCustomerRestrictionPlugins()`. Runs after the strategy and post-resolve plugins. If any plugin signals that the customer is restricted, the login is blocked and the remaining restriction plugins are skipped.

Use this to enforce access rules that are checked after the account exists — for example, rejecting logins from email domains not on an allowlist, or blocking customers whose associated company is suspended.

---

## Choosing the right extension point

| Situation | Extension point |
|---|---|
| Customers are pre-imported with company relations | `AcceptOnlyOauthCustomerAuthenticationStrategyPlugin` — no custom code needed |
| New customers need a company user created on first login | Custom `OauthCustomerAuthenticationStrategyPluginInterface` |
| Profile data should be refreshed from IdP claims on every login | `OauthCustomerPostResolvePluginInterface` |
| Certain customers or domains should be blocked from SSO login | `OauthCustomerRestrictionPluginInterface` |
