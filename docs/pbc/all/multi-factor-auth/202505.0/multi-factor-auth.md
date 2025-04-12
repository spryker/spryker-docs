---
title: Multi-Factor Authentication
description: Learn about Multi Factor Authentication (MFA) that you can use within your Spryker project.
template: concept-topic-template
last_updated: Mar 05, 2026
---

{% info_block warningBox "Beta feature" %}

The multi-factor auth module is in beta. It's not stable and *may be significantly changed in future releases*.

By using this feature, you accept full responsibility for any potential issues, including breaking changes, limited support, and incomplete functionality.

*We don't recommend using this in production environments*. You may have to adapt this implementation for future releases.

{% endinfo_block %}

Multi-Factor Authentication (MFA) adds an extra layer of security for Storefront accounts by requiring multiple methods of authentication before allowing an action.


## Benefits of MFA

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

4. Send the authentication code: 
  * Multiple MFA methods: the authentication code is sent to the user based on the method they've selected
  * One MFA method: the system sends the authentication code to the method's platform using `multi-factor-auth/send-customer-code`  

5. Code validation: After the authentication code is sent, the system presents a code validation form to the user. The user enters the received authentication code in the form.  
If the code is correct, authentication is successful. If incorrect, the user needs to double-check the code and try entering again.


[PUT THE FLOW DIAGRAM HERE]

### Login MFA flow

For the login MFA flow, MFA is triggered only after validating credentials to prevent unnecessary MFA processing.

1.	On the login page, customer enters email and password.
2.	System validates the credentials. If invalid, authentication fails, and the customer is prompted to try again. If valid, the system proceeds to check if MFA is enabled.
3.	If MFA is enabled, the process continues as described in [MFA flow for protected actions](#mfa-flow-for-protected-actions)



## Multi-Factor Authentication Protection

MFA is used for authenticating customer login and critical customer profile actions.

Examples of protected actions:
- Update email address
- Change password
- Delete account

You can configure other actions to be protected with MFA according to your requirements.

For instructions on integrating MFA into forms and actions, see [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-auth/{{site.version}}/install-and-upgrade/install-multi-factor-auth.html#configure-enabled-routes-and-forms).

## MFA grace period

After a customer successfully enters a valid MFA code, there is a configurable time interval during which MFA validation is not required for subsequent actions. This improves user experience because users sometimes need to perform multiple protected actions within a short period of time.

For details on configuring the grace period, see [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-auth/{{site.version}}/install-and-upgrade/install-multi-factor-auth.html#configure-code-validity-time).

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
