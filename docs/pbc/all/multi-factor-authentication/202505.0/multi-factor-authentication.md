---
title: Multi-Factor Authentication
description: Learn about Multi Factor Authentication (MFA) that you can use within your Spryker project.
template: concept-topic-template
last_updated: Jun 02, 2026
keywords: mfa
---

{% info_block warningBox "Beta feature" %}

The multi-factor auth module is in beta. It's not stable and *may be significantly changed in future releases*.

By using this feature, you accept full responsibility for any potential issues, including breaking changes, limited support, and incomplete functionality.

*We don't recommend using this in production environments*. You may have to adapt this implementation for future releases.

{% endinfo_block %}

Multi-Factor Authentication (MFA) adds an extra layer of security for customers, backoffice users, and agent users by requiring multiple methods of authentication before allowing an action.

Benefits of MFA:

- Enhanced security with an extra layer of protection
- Enhanced privacy with better protected personal data
- Supports compliance with security regulations and industry standards


## MFA flow for protected actions

The login process with MFA looks as follows:

1. Initial MFA check: The system checks if MFA is enabled for the user (customer, backoffice user, or agent). If no MFA methods are enabled, the authentication process continues without additional validation.

2. Fetch enabled MFA types: The system retrieves the user's enabled MFA methods from a specific endpoint depending on the user type:
  * For ustomers: `multi-factor-auth/get-customer-enabled-types`
  * For agents: `multi-factor-auth/get-user-enabled-types`
  * For users: `multi-factor-auth/user/get-enabled-types`

3. Evaluate the number of enabled MFA methods:
- Multiple MFA methods: the system presents a selection screen where the user selects a preferred authentication method
- One MFA method: the system proceeds to verify the user using their only MFA method

4. Send the authentication code: The system sends a verification code through the appropriate endpoint based on the user type:
  - For customers: `multi-factor-auth/send-customer-code`
  - For agents: `multi-factor-auth/send-user-code`
  - For users: `multi-factor-auth/user/send-code`

   The delivery method depends on the MFA configuration:
  - If multiple MFA methods are enabled, the authentication code is sent via the platform selected by the user
  - If only one MFA method is enabled, the authentication code is sent via that method's platform

5. Code validation: After the authentication code is sent, the system presents a code validation form to the user. The user enters the received authentication code in the form.  
  If the code is correct, authentication is successful. If incorrect, the user needs to double-check the code and try entering again.


![MFA-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/multi-factor-authentication/multi-factor-authentication.md/MFA-flow.png)

### Login MFA flow

For the login MFA flow, MFA is triggered only after validating credentials to prevent unnecessary MFA processing.

1. On the login page, customer/user enters email and password.
2. The system validates the credentials. If invalid, authentication fails, and the customer/user is prompted to try again. If valid, the system proceeds to check if MFA is enabled.
3. If MFA is enabled, the process continues as described in [MFA flow for protected actions](#mfa-flow-for-protected-actions).


## MFA protected actions

MFA adds an additional authentication layer for critical operations, protecting both user accounts and sensitive business data.

### Common protected actions for all user types
- Login authentication
- Password changes

### User-specific protected actions

#### For customers
- Update email address
- Delete account

#### For users
- Update user profile information
- Create, update, or delete other users' accounts
- Create, update, or delete API keys

You can configure other actions to be protected with MFA according to your requirements. For instructions on integrating MFA into forms and actions, see [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html#configure-enabled-routes-and-forms).


## MFA grace period

After a customer/user successfully enters a valid MFA code, there's a configurable time interval during which MFA validation isn't required for subsequent actions. This improves user experience because users sometimes need to perform multiple protected actions within a short period of time.

For details on configuring the grace period, see [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html#configure-code-validity-time).

## Brute force protection

The Multi-Factor Authentication system includes protection against brute force attacks. This mechanism limits the number of failed MFA code entry attempts a customer/user can make within a single validation flow.

If a customer/user reaches the configured number of failed attempts to enter the code, the following happens:
- The system resets the MFA flow
- The page is refreshed, and the customer/user must start the authentication process from the beginning
- All previously generated codes become invalid

For instructions on configuring brute force protection, see [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html#configure-brute-force-protection-limit).

## Multi-Factor Authentication methods

The feature is shipped with the email authentication method. For instructions on installing this method, see [Install email Multi-Factor Authentication method](/docs/pbc/all/multi-factor-auth/{{site.version}}/howto-install-email-mfa.html).

You can set up your own methods by implementing a custom MFA type plugin. For instructions, see [Create custom Multi-Factor Authentication methods](/docs/pbc/all/multi-factor-auth/{{site.version}}/howto-create-custom-mfa.html).


## Multi-Factor Authentication in Glue API

Spryker's Glue API supports Multi-Factor Authentication (MFA) to enhance security for sensitive operations performed by authenticated customers. 

### Scope of MFA Enforcement in Glue

To clarify the extent of Multi-Factor Authentication (MFA) enforcement in the Glue API, consider the following:
- Access Token Authentication Only: MFA is enforced only for customers who are authenticated via an access token. It does not apply to guest users or publicly accessible endpoints.
- Non-GET Requests Only: MFA protection is applied only to HTTP methods that modify data or perform sensitive actions (for example, POST, PATCH, DELETE). GET requests are not subject to MFA validation.

### Default Protected Endpoints

By default, the following Glue API endpoints are protected by MFA:
- customer-password
- customers
- addresses
- carts
- checkout
- order-payments

These endpoints require a valid MFA code to be provided in the `X-MFA-Code` header when performing sensitive operations.
To customize which endpoints are protected by MFA, refer to [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html#configure-enabled-routes-and-forms).

For a comprehensive guide on activating, deactivating, and utilizing MFA through the Glue API, see [How to Use Multi-Factor Authentication with Glue API](/docs/pbc/all/multi-factor-authentication/{{page.version}}/howto-use-multi-factor-authentication-with-glue-api.html).

## Managing Multi-Factor Authentication 

{% info_block infoBox "Important note about Agent and Backoffice users" %}

Agent users and Backoffice users are technically the same underlying user account. Any Multi-Factor Authentication (MFA) configuration applied in one interface will automatically apply in the other.

For example:
- If an agent sets up MFA in their Agent profile, the same configuration will affect how they authenticate when logging in to the Backoffice.
- Conversely, changes made to MFA settings in the Backoffice user profile will reflect in the Agent interface.

This ensures consistent and secure authentication across both environments.

{% endinfo_block %}

### For Customers
New customers are prompted to set up MFA on the profile overview page. To activate an MFA method, they need to verify that it's working by entering an authentication code. This prevents them from getting locked out of their account.

Once MFA methods are set up, a customer can activate and deactivate individual MFA methods. This action is protected by default.

### For Users
Backoffice users can manage their MFA settings in their user profile section within the Backoffice. Similar to customers, they need to verify new MFA methods before they can be activated.

### For Agents
Agent users can manage their MFA settings through their Agent profile interface. The setup process follows the same principles as for other user types to ensure security and prevent account lockouts.


## Admin control over MFA for customers

Backoffice administrators can disable Multi-Factor Authentication (MFA) for individual customers directly from the Backoffice.

This functionality is useful in scenarios where:
- A customer is locked out due to MFA issues (for example, lost access to their authentication method)
- Support intervention is required to reset the customer's MFA configuration

To disable MFA for a customer:
1. Navigate to the customer's profile in the Backoffice.
2. Use the **Remove MFA** action to deactivate currently enabled MFA methods for the selected customer.

Once MFA is disabled, the customer can log in using just their credentials. They can reconfigure MFA from their profile at any time.

























