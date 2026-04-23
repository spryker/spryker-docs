---
title: SSO Security Options
description: Single sign on offers an extended list of options for securing the access
template: howto-guide-template
last_updated: Apr 23, 2026
---

## Security benefits of the SSO access
From a security perspective, enabling SSO strengthens the existing secure access flow by adding additional protection layers:

- Secure VPN access
- TLS communication
- Authentication through 
 - Flexible Authentication - Authenticate user with various mechanisms, including passkey and your own identity provider
 - Two-factor Authentication - Support for passkey, recovery codes and TOTP/HOTP via Google Authenticator or FreeOTP.

## Passkey (WebAuthn authenticator)

A passkey is a FIDO authentication credential based on FIDO standards, that allows a user to sign in to apps and websites with the same process that they use to unlock their device (biometrics, PIN, or pattern). Passkeys are FIDO cryptographic credentials that are tied to a user’s account on a website or application.

{% info_block infoBox "Acquiring Passkey limitation" %}

This feature is available only for SSO users created via a Self-Service request.
Users managed External IdP connections are not supported.

{% endinfo_block %}

How to setup Passkey for your SSO user:

- Click on **Keycloak** service in CloudHub which will lead to the SSO login page
- Log in to your Keycloak Account Console
- Go to the “Account Security” section
- Open “Signing In”
- Find the “Passkey” section
- Click “Setup passkey”
- Follow the browser prompt to create a passkey using your device’s supported method (e.g., Windows Hello, Touch ID, Face ID, security key).
- After successful registration, the passkey appears in your list of registered authenticators.

### Authenticate with WebAuthn authenticator
After you register your authenticator, signing in is easy:

- Open the login page and enter your username and password.
- Your browser will prompt you to verify your identity using your authenticator (e.g., fingerprint, face recognition, or security key).

## LoginLess (WebAuthn passwordless)

Log in without a username and password. You can sign in using biometric methods (such as fingerprints or facial recognition), FIDO2 security keys (e.g., YubiKey), or other compatible authenticators.

{% info_block infoBox "Acquiring LoginLess limitation" %}

This feature is available only for SSO users created via a Self-Service request.
Users managed External IdP connections are not supported.

{% endinfo_block %}

- Click on **Keycloak** service in CloudHub which will lead to the SSO login page
- Log in to your Keycloak Account Console
- Go to the “Account Security” section
- Open “Signing In”
- Find the “Passwordless” section
- Click “Setup passkey”
- Follow the browser prompt to create a passkey using your device’s supported method (e.g., Windows Hello, Touch ID, Face ID, security key).
- After successful registration, the passkey appears in your list of registered authenticators.

### Authenticate with LoginLess (WebAuthn passwordless)
If you’ve set up passwordless WebAuthn, you can sign in to Keycloak without entering a username or password.

You’ll simply confirm your identity using your device (such as fingerprint, face recognition, or a security key). WebAuthn can also be used as an extra security step (two-factor authentication) if enabled for your account:

- Open the login page
- Click on “Sign in with Passkey”
- Your browser will prompt you to verify your identity using your authenticator (e.g., fingerprint, face recognition, or security key).

## Related topics

- [User Management SSO](/docs/ca/dev/cloud-hub/sso-user-management.html)

