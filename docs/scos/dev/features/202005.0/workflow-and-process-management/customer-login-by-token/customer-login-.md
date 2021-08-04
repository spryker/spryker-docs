---
title: Customer Login by Token
originalLink: https://documentation.spryker.com/v5/docs/customer-login-by-token
redirect_from:
  - /v5/docs/customer-login-by-token
  - /v5/docs/en/customer-login-by-token
---

The necessity of worldwide availability brought the B2B industry one step closer towards a more convenient and consistent user experience across a variety of e-commerce providers. The way you allow your customers to authenticate is one of those components playing an important role in the user experience. By dynamically generating a token, a user is able to log in with a pre-defined company user to a new e-commerce provider. All this happens without sharing the login information (username and password) with the e-commerce provider or having to fill-out a tedious sign-up form.

Most modern e-commerce applications allow customers to log in by token or, in other words, they support token-based authentication. They do so for several good reasons:

* Tokens are stateless: They are stored on the client side and already contain all the information they need for authentication. No session information on the server is great for scaling your application.

* Tokens are secure: Tokens (not cookies) are sent on every request, which helps to prevent attacks. Since the session is not stored, there is no session-based information that could be manipulated.

* Extensibility and access control: In the token payload, you can specify user roles, permissions as well as resources that the user can access. Besides, you can share some permissions with other applications.

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/en/customer-login-by-token-feature-overview-201907" class="mr-link">Familiarize yourself with Customer Login by Token feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/en/ht-generating-token-for-login-201907" class="mr-link">Generate a Token for Login</a></li>
                <li><a href="https://documentation.spryker.com/docs/en/ht-disable-accounts-switch-for-bob-201907" class="mr-link">HowTo - Disable Accounts Switch for Business on Behalf</a></li>
                 <li><a href="https://documentation.spryker.com/docs/en/company-account-integration-201907" class="mr-link">Integrate Company Account feature v201907.0 into your project</a></li>
            </ul>
        </div>
