---
title: Multi-Factor Authentication
description: Learn about Multi Factor Authentication (MFA) that you can use within your Spryker project.
template: concept-topic-template
last_updated: Mar 05, 2026
---

{% info_block warningBox "⚠️ WARNING: BETA FEATURE" %}

**THE MULTI-FACTOR AUTH MODULE IS CURRENTLY IN BETA.**

This feature is not yet considered stable and **may be significantly changed in future releases**.

By using this feature, you accept full responsibility for any potential issues, including breaking changes, limited support, and incomplete functionality.

**Use in production environments is not recommended** unless you are prepared to adapt to future updates.

{% endinfo_block %}

Multi-Factor Authentication adds an extra layer of security to your account.
It allows customers to enhance their account security by requiring additional verification steps beyond the standard username and password.

## Benefits of MFA

- **Enhanced security**: MFA adds an extra layer of security to your account, making it harder for attackers to gain access.
- **Enhanced privacy**: MFA helps protect your privacy by requiring additional verification steps beyond the standard username and password.
- **Reduced risk**: MFA reduces the risk of unauthorized access, as it requires multiple factors to be verified before allowing access.
- **Compliance**: MFA helps you comply with security regulations and standards.

## Flow Overview

1) **Initial MFA check**: The system first verifies whether any MFA types are enabled for the customer. 
If no MFA methods are enabled, the authentication process continues without additional validation.

2) **Fetch enabled MFA types**: If MFA is enabled, the system sends a request to `multi-factor-auth/get-customer-enabled-types` to retrieve a list of enabled MFA types for the customer.

3) **Evaluate the number of enabled MFA types**: If more than one MFA method is enabled, the system presents a selection screen where the user must choose their preferred authentication method.
If only one MFA method is enabled, the system proceeds to the next step automatically.

4) **Send the authentication code**: If only one MFA method is enabled, the system automatically sends the authentication code using the appropriate method via `multi-factor-auth/send-customer-code`.
If multiple methods were available and the user has selected one, the authentication code is sent through the selected method.

5) **Code validation**: After the authentication code is sent, the system presents a code validation form to the user. The user enters the received authentication code in the form. 
If the code is correct, authentication is successful. If incorrect, the user must retry.

[PUT THE FLOW DIAGRAM HERE]

## Login Flow with MFA

The MFA flow for the login page follows a slightly different sequence compared to general authentication.
In this case, the customer's credentials (email & password) are validated first before triggering MFA.

Key Difference:
1.	Customer enters email & password on the login page.
2.	System validates the credentials: if invalid, authentication fails, and the customer is prompted to try again. If valid, the system proceeds to check if MFA is enabled.
3.	If MFA is enabled, the process continues as described in the main MFA flow.
4.	Upon successful validation, the customer is logged in.

This ensures that MFA is only triggered after confirming that the credentials are correct, preventing unnecessary MFA steps for incorrect login attempts.

## Multi-Factor Authentication Protection

MFA is not limited to the login process but is also applied to critical customer profile actions where additional security is necessary to protect sensitive user information. 
These actions require MFA validation to ensure that only the legitimate account owner can perform them.

Some of the actions that are protected by MFA by default include:
- Updating the email address: prevents unauthorized users from changing the account's primary contact method.
- Changing the password: ensures that only the legitimate user can modify login credentials.
- Deleting the account: protects against accidental or malicious account deletions.

In addition to these predefined actions, other forms and operations within the system may also be secured with MFA based on business requirements.

For detailed instructions on how to integrate MFA protection into additional forms and actions, refer to the following guide: [Install the Multi-Factor Authentication Feature](/docs/pbc/all/multi-factor-auth/{{site.version}}/install-and-upgrade/install-multi-factor-auth.html#configure-enabled-routes-and-forms).

## MFA Grace Period After Successful Validation

After a user successfully enters a valid MFA code, there is a configurable time interval during which MFA validation is not required for subsequent actions. 
This prevents users from needing to re-authenticate repeatedly within a short period while performing multiple secured actions.

Additionally, once an MFA code is successfully verified, it can only be used once. Any previously generated MFA codes become invalid immediately after successful verification, ensuring that only the most recent code is accepted for authentication. 
This enhances security by preventing the reuse of old codes in case they were intercepted or delayed in delivery.

The duration of the grace period is configurable. To modify the timeout settings and apply them to specific forms, refer the link: [Install the Multi-Factor Authentication Feature](/docs/pbc/all/multi-factor-auth/{{site.version}}/install-and-upgrade/install-multi-factor-auth.html#configure-code-validity-time).

## Brute Force Protection

To further enhance account security, the Multi-Factor Authentication system includes protection against brute force attacks. This mechanism limits the number of failed MFA code entry attempts a customer can make within a single validation flow.

Once the configurable limit of incorrect attempts is reached:
- The system automatically resets the MFA flow.
- The page is refreshed, and the customer must start the authentication process again from the beginning.
- All previously generated codes become invalid.

This prevents attackers from repeatedly guessing codes and ensures that users must successfully pass each MFA step within a limited number of tries.

You can configure the allowed number of attempts in your project settings. For details on how to adjust these values, refer to: [Install the Multi-Factor Authentication Feature](/docs/pbc/all/multi-factor-auth/{{site.version}}/install-and-upgrade/install-multi-factor-auth.html#configure-brute-force-protection-limit).

## Multi-Factor Authentication Methods

The following MFA methods are available in Spryker:

- Email: sends an authentication code via email [How to Install Customer Email Multi-Factor Authentication Method](/docs/pbc/all/multi-factor-auth/{{site.version}}/howto-install-customer-email-mfa.html)

If you want to create your own MFA method, you can do so by implementing a custom MFA type plugin. For more information, refer to the guide: [How to Create Custom Multi-Factor Authentication Method](/docs/pbc/all/multi-factor-auth/{{site.version}}/howto-create-custom-mfa.html).

## Managing Multi-Factor Authentication in the Customer Profile

Customers have the ability to activate or deactivate specific MFA types directly from their profile settings. This allows users to configure their preferred authentication methods based on security and usability preferences.

### Accessing MFA Management
1. Navigate to the customer profile overview page https://yves.eu.mysprykershop.com/customer/overview
2. Once at least one MFA type plugin is wired, a new menu item will appear in the sidebar: **Set up Multi-Factor Authentication**
3. Click on this menu item to open the MFA settings page https://yves.eu.mysprykershop.com/multi-factor-auth/set

### Activating or Deactivating an MFA Type

On the MFA settings page, a list of available MFA types will be displayed. Each MFA type will have either:
 - an activate button (if currently disabled);
 - a deactivate button (if currently enabled).

To change the status of an MFA type:
1. Click on the activation/deactivation button next to the desired MFA type.
2. The system will trigger the standard [MFA flow](#flow-overview) to verify the user's identity.
3. After successful code validation, an additional MFA check will be required specifically for the MFA type being activated or deactivated. This ensures that only the legitimate account owner can modify MFA settings.
4. Once verified, the selected MFA type will be successfully activated or deactivated.

This feature enhances security by requiring MFA authentication before modifying MFA settings, preventing unauthorized changes to account security preferences.
