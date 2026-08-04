---
title: Multi-Factor Authentication with SSO
description: Decide where Multi-Factor Authentication should live when your users log in through an external Identity Provider — at the IdP, in Spryker, or both — and understand the trade-offs of each option.
template: concept-topic-template
last_updated: Aug 4, 2026
related:
  - title: Federated Authentication via OAuth2/OIDC
    link: docs/pbc/all/oauth/latest/federated-authentication.html
  - title: Multi-Factor Authentication
    link: docs/pbc/all/multi-factor-authentication/latest/multi-factor-authentication.html
---

When you adopt [Federated Authentication](/docs/pbc/all/oauth/latest/federated-authentication.html), your users log in through an external Identity Provider (IdP). Most IdPs — Keycloak, Microsoft Entra ID, Okta, and others — can enforce Multi-Factor Authentication (MFA) of their own. Spryker also ships its own [Multi-Factor Authentication](/docs/pbc/all/multi-factor-authentication/latest/multi-factor-authentication.html) feature. So once SSO is in the picture, you have to decide **where MFA lives**: at the IdP, in Spryker, or both.

This is a trade-off, not a single right answer. This page explains what each option gives you, what it costs, and how to reason about mixed login setups where some users authenticate through SSO and others with a password.

---

## The two places MFA can live are not the same

It is tempting to treat "IdP MFA" and "Spryker MFA" as duplicates of each other. They overlap, but they protect different things:

- **IdP MFA happens once, at login.** The IdP challenges the user for a second factor before it issues the identity to Spryker. It applies to every application that authenticates through that IdP — not just Spryker. Spryker never sees the factor; it only trusts the IdP's assertion that authentication succeeded.
- **Spryker MFA happens at login *and* before specific sensitive actions.** Beyond login, Spryker can ask for the second factor again at the moment a user does something risky — for example changing their password or email, or deleting an account. Which operations are protected is configurable; see [MFA protected actions](/docs/pbc/all/multi-factor-authentication/latest/multi-factor-authentication.html#mfa-protected-actions). The IdP's MFA runs only at login, so it cannot cover these mid-session moments.

Because of this, running both is not automatically redundant. Whether it is depends on your trust model and on whether you need Spryker to prompt for a second factor before sensitive actions, not just at login. Keep this distinction in mind while reading the options below.

---

## The three options

| Option | Best when | Cost |
|---|---|---|
| **IdP MFA only** (disable Spryker MFA) | You trust the IdP's MFA, want a single place to manage it, and every user logs in through that IdP | MFA assurance is delegated to the IdP; no Spryker-controlled action-level step-up; does not cover users who still log in with a password |
| **Spryker MFA only** | Your IdP cannot enforce MFA, or you cannot mandate MFA policy on it | MFA is managed inside Spryker for these users |
| **Both** | You need assurance independent of the IdP, must satisfy compliance that requires the application to enforce MFA, want Spryker to re-verify before sensitive actions (not just at login), or have a mixed login population | The user may face two challenges at login (IdP, then Spryker) — a deliberate UX cost, not a defect |

---

### Option 1 — IdP MFA only

Let the IdP own MFA and turn Spryker MFA off. This gives the cleanest user experience: one login, one second-factor prompt, managed centrally for every system the IdP fronts.

Choose this when **all** of the following hold:

- You trust the IdP's MFA to the assurance level your business requires.
- Every user who reaches Spryker comes through that IdP (see [Mixed form and SSO users](#mixed-form-and-sso-users) if that is not true).
- You do not need Spryker to re-challenge users on specific sensitive actions.

To disable Spryker MFA, do not enable MFA methods for these users and do not register the MFA authentication-handler plugins for the application. See the [MFA installation guides](/docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature.html) for the concrete configuration.

{% info_block infoBox "Assurance is delegated" %}

With this option, Spryker trusts the IdP's claim that authentication — including any second factor — succeeded. Spryker never sees the factor itself. If your compliance regime requires the application to enforce MFA directly, this option alone may not satisfy it.

{% endinfo_block %}

---

### Option 2 — Spryker MFA only

Use Spryker's MFA when the IdP cannot provide a second factor — for example, a basic IdP tier, or an SSO federation whose MFA policy you do not control. SSO then handles identity, and Spryker adds the second factor after the OAuth callback.

The user experience is a single second-factor prompt, shown by Spryker after they return from the IdP. This is the same MFA flow described in the [MFA overview](/docs/pbc/all/multi-factor-authentication/latest/multi-factor-authentication.html) — SSO simply replaces the password step that precedes it.

---

### Option 3 — MFA on both sides

Keep MFA enforced at the IdP **and** in Spryker. At login, the user completes the IdP's second factor, is redirected back to Spryker, and is then challenged again by Spryker's MFA before the session is finalised.

The extra prompt is a real UX cost, but for some setups it is a deliberate and correct choice:

- **Independent assurance.** In B2B, the IdP is often operated by the customer or a partner. You authenticate their identity through it but do not fully trust its MFA posture; enforcing your own second factor in Spryker is defense in depth.
- **Compliance.** Some regimes require the application itself to enforce MFA rather than delegate it upstream.
- **Protecting sensitive actions, not just login.** IdP MFA runs only when the user signs in. If you also want a second-factor prompt at the moment someone changes their password or email, deletes an account, or performs another operation you have protected, that is Spryker MFA's job — the IdP does not do it.
- **Mixed populations.** Enforcing Spryker MFA covers SSO users and password users uniformly — see below.

Treat the double prompt as the price of higher assurance, and enable it only where one of the reasons above actually applies.

---

## Mixed form and SSO users

Spryker MFA and IdP MFA cover different sets of users, and this is the most common source of an accidental security gap:

- **IdP MFA covers only users who log in through the IdP.** A user who still authenticates with a Spryker username and password never touches the IdP, so the IdP's MFA never applies to them.
- **Spryker MFA covers both** — it runs after a form login and after an SSO login alike.

The practical consequences:

- If your project keeps **both password login and SSO enabled** and you choose **Option 1 (IdP MFA only)**, your password users are left with no second factor. To close this, either keep Spryker MFA enabled for the password population (effectively Option 3 for them), or disable password login entirely so every user must go through the IdP.
- If **every** user is required to log in through the IdP — password login is disabled — then Option 1 covers everyone and there is no gap.

{% info_block warningBox "Check your login surface before disabling Spryker MFA" %}

Disabling Spryker MFA while password login is still available removes the second factor for everyone logging in with a password. Confirm that all users are forced through the MFA-enforcing IdP before relying on IdP MFA alone.

{% endinfo_block %}

---

## Choosing an option

A short way to reason about it:

1. **Can your IdP enforce MFA at the assurance level you need?** If not, use **Spryker MFA** (Option 2).
2. **Do all users log in exclusively through that IdP?** If not, and you still want MFA everywhere, keep **Spryker MFA** on for the password population (Option 3) or disable password login.
3. **Do you need independent assurance, application-enforced MFA for compliance, or a second-factor prompt before sensitive actions (not just at login)?** If yes, run **both** (Option 3).
4. **Otherwise** — you trust the IdP's MFA and everyone is on SSO — **IdP MFA only** (Option 1) gives the best experience.

This applies across all three applications that support Federated Authentication — Storefront customers, Back Office users, and Merchant Portal merchant users. The decision can differ per application: for example, you might rely on IdP MFA for the Storefront while enforcing Spryker MFA in the Merchant Portal.
