---
title: Customer Login overview
originalLink: https://documentation.spryker.com/2021080/docs/customer-login-overview
redirect_from:
  - /2021080/docs/customer-login-overview
  - /2021080/docs/en/customer-login-overview
---

The *Cusotmer Login* feature with an enhanced secure password policy enables you to prevent brute-force login attacks by configuring your project in the following ways:

* Block a Storefront user account for some time after a certain number of login attempts.

* Enforce the use of strong passwords by defining requirements for a password like length, allowed and forbidden characters.

You can define separate settings for a Storefront user and agent. 

## Demo Shop default configuration
The feature’s default configuration in the Spryker Demo Shop is as follows. When a user tries to log in, and the number of unsuccessful login attempts reaches the preset limit (11 attempts for a Storefront user and 10 for an [agent](https://documentation.spryker.com/docs/agent-assist-overview)), the user account is locked out for some time (5 minutes for a Storefront user and 6 for an agent). After the last unsuccessful attempt, the user is notified that the ban is applied, and the user cannot log in until the ban expires. 

To minimize login issues for real customers, the ban is applied by the IP address, which means you can log in to the same user account from one IP address while being locked out from another IP address. All information about blocked accounts is stored in Redis. 

When registering an account or changing an old password in the Demo Shop, the password must contain a combination of alphabetic, numeric, and special characters. The alphabetic characters must also be of mixed case (e.g., one lower case and one upper case), and the password length must be from 8 to 64 characters. 

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/authenticating-as-a-customer" class="mr-link">Authenticate as a customer via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-customer-authentication-tokens" class="mr-link">Managing customer authentication tokens</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-customer-authentication-tokens-via-oauth-20" class="mr-link">Authenticate as a customer via Glue API with OAuth 2.0</a></li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-customer-account-management-feature-integration" class="mr-link">Enable customer login via Glue API by integrating the Customer Account Management Glue API</a></li>
                <li>Enable Customer Login:
                    <ul>          
                <li><a href="https://documentation.spryker.com/docs/customer-account-management-feature-integration" class="mr-link">Integrate the Customer Account Management feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-spryker-core-feature-integration" class="mr-link">Integrate the Glue API: Spryker Core feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/agent-assist-feature-integration" class="mr-link">Integrate the Agent Assist feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/spryker-core-feature-integration" class="mr-link">Integrate the Spryker Core feature</a></li>
            </ul>
        </div>
       

