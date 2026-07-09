---
title: SSO Security Options
description: Single sign on offers an extended list of options for securing the access
template: howto-guide-template
last_updated: Jun 10, 2026
---

{% info_block infoBox %}

This feature is part of a gradual rollout and will be available to everyone eventually. We will notify your team once your project is onboarded.

{% endinfo_block %}

## Security benefits of the SSO access

From a security perspective, enabling SSO strengthens the existing secure access flow by adding additional protection layers:

- Secure VPN access
- TLS communication
- Various authentication options

Users can authenticate through:

- **Flexible authentication:** Authenticate users with various mechanisms, including passkey and your own identity provider.
- **Two-factor authentication:** Support for passkey, recovery codes and TOTP/HOTP via Google Authenticator or FreeOTP.

## Passkey (WebAuthn authenticator)

A passkey is a FIDO authentication credential based on FIDO standards that allows a user to sign in to apps and websites with the same process that they use to unlock their device (biometrics, PIN, or pattern). Passkeys are FIDO cryptographic credentials that are tied to a user's account on a website or application.

{% info_block infoBox "Acquiring Passkey limitation" %}

This feature is available only for SSO users created via a Self-Service request.
Users managed through External IdP connections are not supported.

{% endinfo_block %}

How to set up a passkey for your SSO user:

1. Click on **Keycloak** service in CloudHub which will lead to the SSO login page.
2. Log in to your Keycloak Account Console.
3. Go to the **Account Security** section.
4. Open **Signing In**.
5. Find the **Passkey** section.
6. Click **Set up passkey**.
7. Follow the browser prompt to create a passkey using your device's supported method (for example, Windows Hello, Touch ID, Face ID, security key).
8. After successful registration, the passkey appears in your list of registered authenticators.

### Authenticate with WebAuthn authenticator

After you register your authenticator, signing in is easy:

1. Open the login page and enter your username and password.
2. Your browser will prompt you to verify your identity using your authenticator (for example, fingerprint, face recognition, or security key).

## LoginLess (WebAuthn passwordless)

Log in without a username or password. You can sign in using biometric methods (such as fingerprints or facial recognition), FIDO2 security keys (for example, YubiKey), or other compatible authenticators.

{% info_block infoBox "Acquiring LoginLess limitation" %}

This feature is available only for SSO users created via a Self-Service request.
Users managed through External IdP connections are not supported.

{% endinfo_block %}

1. Click on **Keycloak** service in CloudHub which will lead to the SSO login page.
2. Log in to your Keycloak Account Console.
3. Go to the **Account Security** section.
4. Open **Signing In**.
5. Find the **Passwordless** section.
6. Click **Set up passkey**.
7. Follow the browser prompt to create a passkey using your device's supported method (for example, Windows Hello, Touch ID, Face ID, security key).
8. After successful registration, the passkey appears in your list of registered authenticators.

### Authenticate with LoginLess (WebAuthn passwordless)

If you have set up passwordless WebAuthn, you can sign in to Keycloak without entering a username or password.

You will simply confirm your identity using your device (such as fingerprint, face recognition, or a security key). WebAuthn can also be used as an extra security step (two-factor authentication) if enabled for your account:

1. Open the login page.
2. Click **Sign in with Passkey**.
3. Your browser will prompt you to verify your identity using your authenticator (for example, fingerprint, face recognition, or security key).

## Related topics

- [User Management SSO](/docs/ca/dev/cloud-hub/sso-user-management.html)
