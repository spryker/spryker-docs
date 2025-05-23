---
title: Multi-Factor Authentication
description: Learn about Multi Factor Authentication (MFA) that you can use within your Spryker project.
template: concept-topic-template
last_updated: Mar 05, 2026
keywords: mfa
---

{% info_block warningBox "Beta feature" %}

The multi-factor auth module is in beta. It's not stable and *may be significantly changed in future releases*.

By using this feature, you accept full responsibility for any potential issues, including breaking changes, limited support, and incomplete functionality.

*We don't recommend using this in production environments*. You may have to adapt this implementation for future releases.

{% endinfo_block %}

Multi-Factor Authentication (MFA) adds an extra layer of security for Storefront accounts by requiring multiple methods of authentication before allowing an action.

Benefits of MFA:

* Enhanced security with an an extra layer of protection
* Enhanced privacy with better protected personal data
* Supports compliance with security regulations and industry standards


## MFA flow for protected actions

The login process with MFA looks as follows:

1. Initial MFA check: The system checks if MFA is enabled for the customer. If no MFA methods are enabled, the authentication process continues without additional validation.

2. Fetch enabled MFA types: If MFA is enabled, the system retrieves the customer's enabled MFA types from `multi-factor-auth/get-customer-enabled-types`.

3. Evaluate the number of enabled MFA methods:
  * Multiple MFA methods: the system presents a selection screen where the user selects a preferred authentication method
  * One MFA method: the system proceeds to verify the user using their only MFA method

4. Send the authentication code via `multi-factor-auth/send-customer-code`: 
  * Multiple MFA methods: the authentication code is sent to the platform selected by the user
  * One MFA method: the authentication code is sent to the method's platform

5. Code validation: After the authentication code is sent, the system presents a code validation form to the user. The user enters the received authentication code in the form.  
  If the code is correct, authentication is successful. If incorrect, the user needs to double-check the code and try entering again.


![MFA-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/multi-factor-authentication/multi-factor-authentication.md/MFA-flow.png)

### Login MFA flow

For the login MFA flow, MFA is triggered only after validating credentials to prevent unnecessary MFA processing.

1. On the login page, customer enters email and password.
2. System validates the credentials. If invalid, authentication fails, and the customer is prompted to try again. If valid, the system proceeds to check if MFA is enabled.
3. If MFA is enabled, the process continues as described in [MFA flow for protected actions](#mfa-flow-for-protected-actions).



## MFA protected actions

MFA is used for authenticating customer login and critical customer profile actions.

Examples of protected actions:
- Update email address
- Change password
- Delete account

You can configure other actions to be protected with MFA according to your requirements. For instructions on integrating MFA into forms and actions, see [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html#configure-enabled-routes-and-forms).



## MFA grace period

After a customer successfully enters a valid MFA code, there's a configurable time interval during which MFA validation isn't required for subsequent actions. This improves user experience because users sometimes need to perform multiple protected actions within a short period of time.

For details on configuring the grace period, see [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html#configure-code-validity-time).

## Brute force protection

The Multi-Factor Authentication system includes protection against brute force attacks. This mechanism limits the number of failed MFA code entry attempts a customer can make within a single validation flow.

If a customer reaches the configured number of failed attempts to enter the code, the following happens:
- The system resets the MFA flow
- The page is refreshed, and the customer must start the authentication process from the beginning
- All previously generated codes become invalid

For instructions on configuring brute force protection, see [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html#configure-brute-force-protection-limit).

## Multi-Factor Authentication methods

The feature is shipped with the email authentication method. For instructions on installing this method, see [Install customer email Multi-Factor Authentication method](/docs/pbc/all/multi-factor-auth/{{site.version}}/howto-install-customer-email-mfa.html).

You can set up your own methods by implementing a custom MFA type plugin. For instructions, see [Create custom Multi-Factor Authentication methods](/docs/pbc/all/multi-factor-auth/{{site.version}}/howto-create-custom-mfa.html).

## Managing Multi-Factor Authentication in the customer profile

New customers are prompted to set up MFA on the profile overview page. To activate an MFA method, they need to verify that it's woking by entering an authentication code. This prevents them from getting locked out of their account. 

Once MFA methods are set up, a user can activate and deactivate individual MFA methods. This action is protected by default. 

























