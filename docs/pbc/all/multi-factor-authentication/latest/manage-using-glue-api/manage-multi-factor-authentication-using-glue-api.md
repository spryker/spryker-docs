---
title: Manage Multi-Factor Authentication using Glue API
description: Learn how to create and implement your own Multi-Factor Authentication method in Spryker.
template: howto-guide-template
last_updated: Aug 22, 2025
related:
  - title: Multi-Factor Authentication Feature overview
    link: docs/pbc/all/multi-factor-authentication/page.version/multi-factor-authentication.html
  - title: Install the Multi-Factor Authentication feature
    link: docs/pbc/all/multi-factor-authentication/page.version/install-multi-factor-authentication-feature.html
  - title: Install Customer Email Multi-Factor Authentication method
    link: docs/pbc/all/multi-factor-authentication/page.version/install-email-multi-factor-authentication-method.html
  - title: Create Multi-Factor Authentication methods
    link: docs/pbc/all/multi-factor-authentication/page.version/create-multi-factor-authentication-methods.html
---


Spryker's Glue API supports Multi-Factor Authentication (MFA) to enhance security for sensitive operations performed by authenticated customers across all API types.

## MFA Enforcement in Glue API

MFA is enforced only for customers and users who are authenticated via an access token. It does not apply to guest users or publicly accessible endpoints.

MFA protection is applied only to HTTP methods that modify data or perform sensitive actions, such as POST, PATCH, or DELETE. GET requests are not subject to MFA validation.

MFA is supported in all types of Glue APIs:
- Glue REST API
- Glue Storefront API
- Glue Backend API

## Default protected endpoints

By default, the following Glue API endpoints are protected by MFA:

- Glue REST API:
  - customer-password
  - customers
  - addresses
  - carts
  - checkout
  - order-payments
- Glue Backend API: warehouse-user-assignments

To customize which endpoints are protected by MFA, see to [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature#configure-protected-routes-and-forms-for-customers).

## MFA for customers

New customers are prompted to set up MFA on the profile overview page. To activate an MFA method, they need to verify that it's working by entering an authentication code. This prevents them from getting locked out of their account.

Once MFA methods are set up, a customer can activate and deactivate individual MFA methods. This action is protected by default.

### MFA for Back Office users and agents

Back Office users manage their MFA settings in user profile section in the Back Office.

Agent users manage their MFA settings through their Agent profile interface.

{% info_block warningBox %}

Agent users and Back Office users are technically the same underlying user account. Any MFA configuration applied in one interface automatically applies in the other.

{% endinfo_block %}

### MFA for Merchant and Merchant Agent users

Merchant and Merchant Agent users can manage their MFA settings in the Merchant Portal or Merchant Agent Portal.

The setup process is similar to that of other user types, ensuring a consistent experience across the platform.



## Admin control over MFA for customers

Back Office administrators can disable Multi-Factor Authentication (MFA) for individual customers directly from the Back Office.

This functionality is useful in scenarios where:
- A customer is locked out due to MFA issues (for example, lost access to their authentication method)
- Support intervention is required to reset the customer's MFA configuration

To disable MFA for a customer:
1. Navigate to the customer's profile in the Back Office.
2. Use the **Remove MFA** action to deactivate currently enabled MFA methods for the selected customer.

Once MFA is disabled, the customer can log in using just their credentials. They can reconfigure MFA from their profile at any time.







This section explains how to activate, deactivate, and use Multi-Factor Authentication (MFA) when sending requests to protected resources using Glue API.

To learn more about MFA methods, see [Multi-Factor Authentication feature overview](/docs/pbc/all/multi-factor-authentication/latest/multi-factor-authentication.html).


The usual flow of using MFA is as follows:

1. [Retrieve available MFA methods and check their status for your user](/docs/pbc/all/multi-factor-authentication/latest/manage-using-glue-api/glue-api-retrieve-mfa-methods.html)
2. [Activate MFA for your user](/docs/pbc/all/multi-factor-authentication/latest/manage-using-glue-api/glue-api-activate-and-deactivate-mfa.html)
3. [Authenticate through MFA and send requests to protected resources](/docs/pbc/all/multi-factor-authentication/latest/manage-using-glue-api/glue-api-authenticate-through-mfa.html)
