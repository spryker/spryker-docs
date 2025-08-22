---
title: Multi-Factor Authentication
description: Learn about Multi Factor Authentication (MFA) that you can use within your Spryker project.
template: concept-topic-template
last_updated: Aug 22, 2025
keywords: mfa
redirect_from:
  - /docs/pbc/all/multi-factor-authentication/202505.0/multi-factor-authentication.html
---

{% info_block warningBox "Beta feature" %}

The multi-factor auth module is in beta. It's not stable and *may be significantly changed in future releases*.

By using this feature, you accept full responsibility for any potential issues, including breaking changes, limited support, and incomplete functionality.

*We don't recommend using this in production environments*. You may have to adapt this implementation for future releases.

{% endinfo_block %}

Multi-Factor Authentication (MFA) adds an extra layer of security for customers, Back Office users, agents, merchant, and merchant agent users by requiring multiple methods of authentication before allowing an action.

Benefits of MFA:

- Enhanced security with an extra layer of protection
- Enhanced privacy with better protected personal data
- Supports compliance with security regulations and industry standards


## MFA flow for protected actions

The login process with MFA looks as follows:

1. Initial MFA check: The system checks if MFA is enabled for the user. If no MFA methods are enabled, the authentication process continues without additional validation.

2. Fetch enabled MFA types: The system retrieves the user's enabled MFA methods from a specific endpoint depending on the user type:
- Customer: `multi-factor-auth/get-customer-enabled-types`
- Agent: `multi-factor-auth/get-user-enabled-types`
- Back Office user: `multi-factor-auth/user/get-enabled-types`
- Merchant: `multi-factor-auth/merchant-user/get-enabled-types`
- Merchant agent: `multi-factor-auth/merchant-agent-user/get-enabled-types`

3. Evaluate the number of enabled MFA methods:
- Multiple MFA methods: the system presents a selection screen where the user selects a preferred authentication method
- One MFA method: the system proceeds to verify the user using their only MFA method

4. Send the authentication code: The system sends a verification code through the appropriate endpoint based on the user type:
- Customer: `multi-factor-auth/send-customer-code`
- Agent: `multi-factor-auth/send-user-code`
- Back Office user: `multi-factor-auth/user/send-code`
- Merchant: `multi-factor-auth/merchant-user/send-code`
- Merchant agent: `multi-factor-auth/merchant-agent-user/send-code`

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

Protected actions:

- All user types:
  - Login authentication
  - Password changes
- Customer:
  - Update email address
  - Delete account
- Back Office user and agent:
  - Update user profile information
  - Create, update, or delete other users' accounts
  - Create, update, or delete API keys
- Merchant and merchant agent user: Update user password

You can configure other actions to be protected with MFA according to your requirements. For instructions on integrating MFA into forms and actions, see [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature#configure-protected-routes-and-forms-for-customers).


## MFA grace period

After a customer/user successfully enters a valid MFA code, there's a configurable time interval during which MFA validation isn't required for subsequent actions. This improves user experience because users sometimes need to perform multiple protected actions within a short period of time.

For details on configuring the grace period, see [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature#set-up-configuration).

## Brute force protection

The Multi-Factor Authentication system includes protection against brute force attacks. This mechanism limits the number of failed MFA code entry attempts a customer/user can make within a single validation flow.

If a customer/user reaches the configured number of failed attempts to enter the code, the following happens:
- The system resets the MFA flow
- The page is refreshed, and the customer/user must start the authentication process from the beginning
- All previously generated codes become invalid

For instructions on configuring brute force protection, see [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature.html#configure-brute-force-protection-limit-for-customers).

## Multi-Factor Authentication methods

The feature is shipped with the email authentication method. For instructions on installing this method, see [Install email Multi-Factor Authentication method](/docs/pbc/all/multi-factor-authentication/latest/install-email-multi-factor-authentication-method.html).

You can set up your own methods by implementing a custom MFA type plugin. For instructions, see [Create custom Multi-Factor Authentication methods](/docs/pbc/all/multi-factor-authentication/latest/create-multi-factor-authentication-methods.html).




























