# Connecting Your Identity Provider to Spryker Keycloak

## Overview

You can use your existing corporate accounts to sign in to your environment: RabbitMQ (RMQ), Jenkins, your AWS account, or the VPN. Spryker's Keycloak acts as the login service. Your own Identity Provider (IdP) verifies who the user is, and it lets you define which services users can access by using groups. Users never need a separate service-based password.

This guide explains what you need to set up on your side and which information we need from you so that we can configure the connection in your dedicated Keycloak realm. Two standard protocols are supported:

|  | OpenID Connect (OIDC) | SAML 2.0 |
| --- | --- | --- |
| Typical for | Modern cloud IdPs (Okta, Microsoft Entra ID, Google Workspace, Auth0) | Enterprise and legacy IdPs (AD FS, Shibboleth, PingFederate, many Okta/Entra setups) |
| You create in your IdP | An OIDC application ("client") | A SAML application ("service provider") |
| You send us | Endpoint URLs, client ID and client secret | Metadata URL or file, or the individual parameters, and the signing certificate |
| Choose it when | Your IdP supports OIDC and you have no SAML requirement | Your security policy requires SAML, or your IdP only supports SAML |

If your IdP supports both protocols and you have no preference, we recommend OIDC: it needs fewer values and is simpler to troubleshoot.

Sign-in then works like this: the user enters their work email, Keycloak recognizes the email domain, redirects the user to your IdP, and your IdP sends the user back with a signed confirmation of their identity.

## Before you start

Regardless of the protocol, please send us the following.

| Item | Why we need it |
| --- | --- |
| Protocol: OIDC or SAML 2.0 | Decides which Keycloak connection type we create. |
| Email domain(s) of your users, for example example.com / test-example.com | We link the connection to your organization in Keycloak by email domain. Users who enter an address on this domain are sent to your IdP automatically. If you have several domains, list all of them. |
| Confirmation that email addresses in your IdP are verified and owned by your company | If yes, we can trust the email from your IdP and skip a separate email verification step for your users. |
| Which user attributes your IdP will send | An email address is mandatory because Spryker uses the email as the username. Group or role values are also required, because service access depends on them (see Attribute and role mappers). |
| Technical contact and a backup contact | We need someone who can change the IdP configuration and join a short call if sign-in fails. |
| (Optional) Two test users | A user who should be able to sign in, and ideally one who should not, to verify that access control behaves as expected. |
| Preferred date for the change | We agree the activation date with you so that real users are not affected by test activity. |

### Sharing secrets

A client secret and a private key are credentials. Never send them in a ticket, email, or chat message in plain text. We will agree on a secure transfer method with you before you send them. Public values such as URLs, entity IDs, metadata and signing certificates (public part only) are not secret.

{% info_block warningBox "Warning" %}Client secrets and signing certificates expire. Plan the renewal before the expiry date, or sign-in stops.{% endinfo_block %}

## Setup process

1. You tell us which protocol you want to use and send the common information listed in the previous section.
2. We send you the Spryker-side values for your realm: the redirect URI (OIDC) or the Assertion Consumer Service URL, entity ID and metadata (SAML).
3. You create the application in your IdP using these values.
4. You send us the values from your IdP, using a secure channel for any secret.
5. We configure the connection in Keycloak and tell you when it is ready.
6. You test with a few users, then we agree on the go-live date.

## OpenID Connect (OIDC)

With OIDC you register Spryker Keycloak as an application (client) in your IdP. Your IdP gives you a client ID and a client secret, and we use them to connect. Reference: [Keycloak documentation, OpenID Connect identity providers](https://www.keycloak.org/docs/latest/server_admin/index.html#_identity_broker_oidc).

### What you do in your IdP

1. Create a new application of type **Web application** (a confidential client that can keep a secret). In some IdPs this is called "Regular Web App" or "Web".
2. Enable the **Authorization Code** flow. Other flows (implicit, device) are not needed.
3. Register the **redirect URI** (also called callback URL or sign-in redirect URI) that we send you. It has the form `https://<our Keycloak host>/realms/<your realm>/broker/<alias>/endpoint`. It must match exactly, including the full path and lowercase letters.
4. Allow the scopes `openid`, `email`, and `profile`. If group-based access is needed, also make your IdP include groups (roles) in the token (see Attribute and role mappers).
5. Use **client secret** authentication (`client_secret_post` or `client_secret_basic`).
6. Assign the application to the users or groups who should be allowed to sign in. Most IdPs deny everyone by default.
7. Make sure that every user has an email address and that your IdP includes it in the ID token. Some IdPs omit it by default, so see Provider-specific notes.

### What you send us

| Value | Notes |
| --- | --- |
| Discovery URL (well-known configuration) | Preferred. It usually ends in `/.well-known/openid-configuration`. We read all endpoints from it. |
| Issuer | The exact `issuer` value from the discovery document, including any trailing slash. A mismatch makes every login fail. |
| Authorization endpoint | Only if you cannot send the discovery URL. |
| Token endpoint | Only if you cannot send the discovery URL. |
| JWKS URI (signing keys) | Only if you cannot send the discovery URL. Needed so that Keycloak can validate token signatures. |
| Client ID | Not secret. |
| Client secret | Secret. Send it only through the agreed secure channel. |
| Client secret expiry date | Many IdPs expire secrets (for example after 6 or 24 months). Tell us the date and send the new secret before it expires, otherwise sign-in stops on that day. |
| Scopes and claim names | Only if they differ from the standard `email`, `given_name`, `family_name`, and `groups`. |

### What we do in Keycloak

We create an OpenID Connect identity provider in your realm under **Identity providers**, attach it to your organization and email domain, and enter the values above. Then we send you a short confirmation and the test instructions.

## SAML 2.0

With SAML you register Spryker Keycloak as a service provider (SP) in your IdP, and your IdP sends us a signed assertion about the user. Reference: [Keycloak documentation, SAML v2.0 identity providers](https://www.keycloak.org/docs/latest/server_admin/index.html#saml-v2-0-identity-providers).

### What you do in your IdP

1. Create a new **SAML 2.0 application** (in some IdPs a "relying party trust" or "custom SAML app").
2. Enter the values we send you:
   - **ACS URL** (Assertion Consumer Service URL, also called Single sign-on URL or Reply URL): `https://<our Keycloak host>/realms/<your realm>/broker/<alias>/endpoint`. It must use HTTPS.
   - **Entity ID** (Audience URI, SP Entity ID): normally `https://<our Keycloak host>/realms/<your realm>`. Use exactly the value in our message.
   - Alternatively, import our SP metadata, which contains both values. We send you the link or the file.
3. Set the **Name ID format** to `emailAddress`, and send the user's email as the Name ID. If your IdP cannot do that, tell us which format it uses, for example `persistent` or `unspecified`, and send the email as a separate attribute.
4. Send these attributes in the assertion: email, first name, last name, and groups if needed.
5. Make sure that your IdP signs the assertion, the response, or both, and tell us which one.
6. Assign the application to the users or groups (roles) who should be allowed to sign in.

### Two ways to give us your IdP configuration

Choose one. We recommend the first, because it avoids copy-and-paste mistakes.

#### Scenario A: metadata URL or file

Your IdP publishes an XML metadata document that contains everything we need: entity ID, sign-on URL and signing certificate. Send us either of these:

- A **public metadata URL** that is reachable from the internet without a login, or
- The **metadata XML file** exported from your IdP, if the URL is not public.

We import it once into Keycloak. Later changes in your IdP, for example a new certificate, are not picked up automatically, so tell us when something changes.

#### Scenario B: individual parameters

Use this when your IdP does not provide a metadata document or the metadata cannot be shared. Send us all of the following.

| Parameter | Notes |
| --- | --- |
| IdP Entity ID (issuer) | The identifier of your IdP, exactly as it appears in the assertion. It is case-sensitive. |
| Single Sign-On service URL | The IdP endpoint that receives the login request. |
| Binding for the sign-on request | HTTP-POST or HTTP-Redirect. If you have no preference, we use the Keycloak default. |
| Signing certificate | The **public** X.509 certificate (PEM or .cer) that your IdP uses to sign assertions. Never send a private key. If you rotate certificates, include the validity dates. |
| What is signed | Assertion, response, or both. |
| Name ID format | For example `emailAddress`, `persistent` or `unspecified`. |
| Attribute names | The exact, case-sensitive names of the attributes your IdP sends for email, first name, last name, and groups, for example `email`, `firstName`, `lastName`, and `groups`. Some IdPs use long URN-style names; send them as they appear in the assertion. Also tell us whether groups are sent as names or IDs. |
| Single logout URL | Optional. Only if you want logout in Spryker to end the session in your IdP as well. |
| Force re-authentication | Tell us if users must enter their credentials at your IdP on every login, instead of reusing an existing IdP session. |

### What we do in Keycloak

We create a SAML v2.0 identity provider in your realm under **Identity providers**, either by importing your metadata (Scenario A) or by entering the parameters (Scenario B). We enable signature validation with your certificate, attach the provider to your organization and email domain, and send you a confirmation.

### Certificate rotation

When your IdP signing certificate is about to expire or be replaced, contact us in advance. If both certificates can be valid during the change, the switch happens without downtime. If not, we agree on a short maintenance window with you.

## Provider-specific notes

The general steps above apply to every IdP. These are the points where the popular providers most often cause problems. Field names in vendor consoles change from time to time, so treat the vendor documentation as the final reference.

{% info_block infoBox "Info" %}These notes describe the main principles that we currently know of. IdP products and their defaults differ between versions and tenants, so the provider-specific steps might not work in every case. If something does not work, tell us, and we will help you with the configuration.{% endinfo_block %}

### Okta

- **OIDC:** create an OIDC app of type Web Application with the Authorization Code grant ([Okta guide](https://help.okta.com/en-us/content/topics/apps/apps_app_integration_wizard_oidc.htm)). Copy the client ID and client secret from the General tab.
- **Issuer:** Okta can issue tokens from the organization authorization server or from a custom one (for example `/oauth2/default`). Send us the issuer of the server you actually use, because the URLs differ.
- **Assignments:** by default nobody is assigned. Assign the app to the right users or groups on the Assignments tab.
- **Groups:** Okta does not put groups into the token by default. Add a groups claim to the ID token if access depends on groups.
- **SAML:** use the SAML 2.0 app wizard ([Okta guide](https://help.okta.com/en-us/content/topics/apps/apps_app_integration_wizard_saml.htm)). Set Audience URI to our Entity ID, set Name ID format to EmailAddress, and add attribute statements for email, first name, and last name. The metadata link for the app is on the Sign On tab.

### Microsoft Entra ID (Azure AD)

- **Email claim:** Entra does not always include `email` in the ID token for users who belong to your tenant. Add it under **App registration** > **Token configuration** > **Add optional claim**. Select **ID** as the token type, and then select `email`. Add `given_name` and `family_name` in the same place ([Microsoft: optional claims](https://learn.microsoft.com/en-us/entra/identity-platform/optional-claims)). Make sure every user actually has the Email field filled in.
- **Issuer:** it contains your tenant ID, for example `https://login.microsoftonline.com/<tenant-id>/v2.0`. Use the v2.0 endpoints and send us the discovery URL.
- **Client secret expiry:** secrets have a fixed lifetime. Note the expiry date and give us the new secret before it expires.
- **Groups:** by default Entra sends group **object IDs**, not names. We can map IDs, so tell us which ID means which role. A token holds at most 150 groups for SAML and 200 for OIDC, and users in more groups lose the claim. For large organizations, use the option **Groups assigned to the application**.
- **SAML:** use Enterprise applications, New application, Create your own application, then Single sign-on, SAML ([Microsoft: SAML single sign-on](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal-setup-sso)). Enter our Entity ID as Identifier and our ACS URL as Reply URL. Send us the App Federation Metadata URL. Check that email, first name, and last name appear under **Attributes and claims**.
- **Assignments:** under Enterprise applications, Users and groups, assign the users who may sign in. This applies to both OIDC and SAML.

### Google Workspace

- **SAML (recommended for Workspace):** create a custom SAML app in the Admin console ([Google: custom SAML app](https://knowledge.workspace.google.com/admin/apps/set-up-your-own-custom-saml-app)). Google provides an IdP metadata file, or the SSO URL, Entity ID and certificate. We provide the ACS URL (HTTPS) and Entity ID. The default Name ID is the user's primary email, which is what we need.
- **Turn the app on:** the app must be switched on for the relevant users or organizational units under User access. Changes can take up to 24 hours to apply.
- **OIDC:** create an OAuth client in the Google Cloud Console and register our redirect URI there ([Google: OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect)). The discovery URL is `https://accounts.google.com/.well-known/openid-configuration`. Set the consent screen to **Internal** so that only users in your organization can sign in. Google's ID token does not contain group membership, so use SAML if access depends on groups.

### Auth0

- **Application type:** create a **Regular Web Application** ([Auth0 guide](https://auth0.com/docs/get-started/auth0-overview/create-applications/regular-web-apps)). Add our redirect URI to **Allowed Callback URLs**.
- **Issuer:** it is your Auth0 domain with `https://` in front and a **trailing slash**, for example `https://your-tenant.auth0.com/`. If you use a custom domain, the issuer changes to that domain. Send us the discovery URL so that we use the exact value.
- **Groups and roles:** Auth0 adds them to tokens only through an Action, and custom claim names must be namespaced URLs. Tell us the exact claim name you choose.
- **Connections:** make sure the application is enabled for the connection (database or social) your users sign in with.

### Active Directory Federation Services (AD FS)

- **Protocol:** use SAML 2.0 and create a Relying Party Trust for our Entity ID and ACS URL.
- **Name ID:** AD FS does not send an email Name ID unless you add claim rules. Add one rule that sends the email address from Active Directory, and a second rule that transforms it into a Name ID of format email. Otherwise sign-in fails with an invalid Name ID policy error.
- **Metadata:** AD FS is often reachable only from your internal network, so send the metadata XML file rather than a URL.
- **Certificates:** token-signing certificates are replaced regularly, in many setups automatically. Tell us about each change before it takes effect (see Certificate rotation).

### Other providers

PingFederate, OneLogin, JumpCloud, Shibboleth and similar products work with the same values listed in the OIDC and SAML sections. Send the metadata or discovery URL together with the common information. If your product has its own guide for connecting a generic SAML or OIDC service provider, follow it, using the values that we send you.

### Example guides for Keycloak with major providers

These third-party articles show the same kind of integration from the Keycloak side. Spryker manages the Keycloak part for you, so use them only to understand what the IdP side looks like. Screens and versions may differ.

- [Keycloak and Okta integration, developer guide](https://dev.to/italoqueiroz/keycloak-and-okta-integration-complete-developer-guide-eb1)
- [Red Hat: Keycloak as a SAML broker with Okta](https://docs.redhat.com/en/documentation/red_hat_build_of_quarkus/3.20/html/openid_connect_oidc_authentication/security-oidc-code-flow-authentication#oidc-saml-broker)
- [SUSE: Microsoft Entra ID via Keycloak](https://documentation.suse.com/cloudnative/suse-observability/latest/en/suse-cloud-observability/keycloak-sso/microsoft-entra-id.html)
- [Skycloak: Keycloak as a SAML service provider](https://skycloak.io/blog/keycloak-saml-service-provider-complete-guide/)

## Attribute and role mappers

A mapper tells Keycloak how to turn information from your IdP (a claim in OIDC, an attribute in SAML) into data on the Spryker user. Reference: [Keycloak documentation, mapping claims and assertions](https://www.keycloak.org/docs/latest/server_admin/index.html#_mappers).

Standard OIDC claims (`email`, `given_name`, `family_name`) are usually imported without any extra configuration. In the following cases we need to configure mappers with you:

- Your IdP uses **non-standard claim or attribute names**, for example a custom claim for the first name.
- You use **SAML** and your attributes arrive under long URI names such as `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`.
- Access in the application depends on **groups or roles** from your IdP, which must be translated into Spryker groups.
- You want attributes, such as first name, to refresh at every login, not only at the first one.

### Mapper types we configure

| Mapper | What it does | What we need from you |
| --- | --- | --- |
| Attribute importer | Copies one claim or SAML attribute into a Keycloak user attribute (email, first name, last name). | The exact claim name (OIDC) or attribute name (SAML, plus the friendly name if your IdP sets one), and the user attribute it fills. |
| Group or role mapper | Adds the user to groups when a given claim or attribute value is present. | The claim or attribute that carries groups, each of your group or role values exactly as sent (we create one mapping per value), and the full path of the group each value maps to, for example `default_dev_rmq_admin` where project = default, `environment_name` = dev, `service` = rmq, `role` = admin. Tell us if values must match as a regular expression instead of exactly. |
| Fixed group mapper | Puts every user who signs in through your IdP into one Spryker group. | The full path of the Spryker group, for example /Spryker/users. |

For every mapper we also agree the **synchronization mode**: **import** sets the value once at the first login, **force** overwrites it at every login (we recommend this for groups, so that removing a user from a group in your IdP removes the access in Spryker).

### How to give us the exact names

The easiest way is a decoded sample token (OIDC) or a SAML assertion captured for a test user, with personal data removed. Your IdP's own test tool or a browser SAML tracer extension can show it. Do not send the signature or any secret. Do not guess claim names: an attribute that is missing in the token silently does nothing.

The available Spryker groups depend on your setup. We currently support the following groups:

- `rmq_admin`, `rmq_developer`, `rmq_viewer`: RabbitMQ access.
- `jenkins_admin`, `jenkins_developer`, `jenkins_viewer`: Jenkins access.
- `open_vpn`: VPN access.
- `BaseRole`: the AWS base role.

This list is not exhaustive and can change over time. For the complete, current list, contact Spryker support.

## Testing and go-live

1. We confirm that the connection is configured and give you the sign-in URL for testing.
2. A test user opens the AWS access realm client (we provide the URL after the connection is configured), enters their work email, and is redirected to your IdP. After signing in at your IdP, they land back in the AWS console.
3. Test one user who must have access and one who must not.
4. We agree the go-live date and tell your users which address to use.

### Go-live checklist

Before you agree on the go-live date, confirm all of the following:

- The redirect URI or ACS URL in your IdP matches the value we sent.
- A test user with access signs in successfully.
- A test user without access is denied.
- The group mappings match the groups in your IdP, and the synchronization mode is agreed.
- The client secret expiry date or certificate validity period is noted, with a renewal date.
- The technical and backup contacts are confirmed.

## Troubleshooting


Send us the approximate time of the attempt, the test user's email address, and a screenshot of the error. These are the most common causes:

| Symptom | Likely cause |
| --- | --- |
| Error about an invalid redirect URI at your IdP | The redirect URI or ACS URL in your IdP is not exactly the value we sent. |
| Your IdP says the user is not assigned to the application | The user or their group is not assigned to the app in your IdP. |
| Login works at the IdP but fails when returning to Keycloak | Wrong issuer or entity ID, an outdated certificate, or a wrong client secret. |
| User is created without an email or name | The IdP does not send the claim or attribute, or it has a different name. See Attribute and role mappers. |
| User signs in but sees no access | The groups claim is missing or the group mapping does not match your values. |
| Login suddenly stops after months of working | An expired client secret or a rotated signing certificate. |

## Useful links

**Keycloak**

- [Server administration guide, OpenID Connect identity providers](https://www.keycloak.org/docs/latest/server_admin/index.html#_identity_broker_oidc)
- [Server administration guide, SAML v2.0 identity providers](https://www.keycloak.org/docs/latest/server_admin/index.html#saml-v2-0-identity-providers)
- [Server administration guide, mapping claims and assertions](https://www.keycloak.org/docs/latest/server_admin/index.html#_mappers)

**Identity provider documentation**

- Okta: [OIDC web app](https://help.okta.com/en-us/content/topics/apps/apps_app_integration_wizard_oidc.htm), [SAML 2.0 app](https://help.okta.com/en-us/content/topics/apps/apps_app_integration_wizard_saml.htm)
- Microsoft Entra ID: [optional claims](https://learn.microsoft.com/en-us/entra/identity-platform/optional-claims), [SAML single sign-on](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal-setup-sso)
- Google: [custom SAML app](https://knowledge.workspace.google.com/admin/apps/set-up-your-own-custom-saml-app), [OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect)
- Auth0: [Regular Web Applications](https://auth0.com/docs/get-started/auth0-overview/create-applications/regular-web-apps)

**Third-party integration examples**

- [Keycloak and Okta integration guide](https://dev.to/italoqueiroz/keycloak-and-okta-integration-complete-developer-guide-eb1)
- [Red Hat: Keycloak SAML broker with Okta](https://docs.redhat.com/en/documentation/red_hat_build_of_quarkus/3.20/html/openid_connect_oidc_authentication/security-oidc-code-flow-authentication#oidc-saml-broker)
- [SUSE: Microsoft Entra ID via Keycloak](https://documentation.suse.com/cloudnative/suse-observability/latest/en/suse-cloud-observability/keycloak-sso/microsoft-entra-id.html)
- [Skycloak: Keycloak as a SAML service provider](https://skycloak.io/blog/keycloak-saml-service-provider-complete-guide/)
