---
title: Basic Shop Theme feature overview
description: Let Business Admins configure logos, theme colors, and custom CSS for the Storefront, Back Office, and Merchant Portal from the Back Office without code changes.
template: concept-topic-template
last_updated: Apr 1, 2026
related:
  - title: Install the Basic Shop Theme feature
    link: /docs/dg/dev/integrate-and-configure/integrate-basic-shop-theme.html
  - title: Back Office Configuration Framework
    link: /docs/pbc/all/back-office/latest/base-shop/backoffice-configuration-framework.html
  - title: Configuration Management feature
    link: /docs/dg/dev/backend-development/configuration-management.html
---

The Basic Shop Theme feature lets Business Admins configure the visual branding of a Spryker shop directly from the Back Office. Logos, theme colors, and custom CSS for the Storefront, Back Office, and Merchant Portal can all be set without code changes or redeployment.

---

## Business problems it solves

Basic visual customization of a Spryker shop — such as applying a company logo or brand color — traditionally requires developer involvement, project-specific work, or code changes. This creates friction in critical moments:

- **Demo preparation** by Solution Engineers — demos feel less customer-ready without brand-specific visuals.
- **Early project phases and proofs of concept** — customers cannot easily apply their own branding.
- **First weeks after go-live** — unnecessary delivery work delays Time-to-First-Transaction.

The Basic Shop Theme feature removes this dependency by providing a self-service branding interface in the Back Office.

---

## What you can configure

All theme settings are managed under **Back Office > Configuration > Theme**.

### Storefront

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Theme Main Color | Color picker | `#00bebe` | Primary brand color applied across the storefront. Exposed as the `--theme-main-color` CSS custom property. |
| Theme Alternative Color | Color picker | `#eb553c` | Secondary brand color for accents and highlights. Exposed as `--theme-alt-color`. |
| Storefront Logo | File upload | (empty) | Logo displayed in the storefront header. Recommended size: 186×50 px. Supported formats: GIF, PNG, JPEG, BMP, WebP, SVG. |
| Storefront Custom CSS | Text area | (empty) | Custom CSS injected into storefront pages. Use with caution — invalid CSS may break page layout. |

### Back Office

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Backoffice Theme Color | Color picker | `#1ebea0` | Primary theme color for the Back Office interface. Exposed as the `--bo-main-color` CSS custom property. |
| Backoffice Side Navigation Background | Color picker | `#23303c` | Side navigation and login background. Exposed as the `--bo-sidenav-color` CSS custom property. |
| Backoffice Side Navigation Text Color | Color picker | `#e4e4e4` | Side navigation text color. Exposed as the `--bo-sidenav-text-color` CSS custom property. |
| Back Office Logo | File upload | (empty) | Logo displayed in the Back Office sidebar. Recommended size: 186×50 px. Supported formats: GIF, PNG, JPEG, BMP, WebP, SVG. |

### Merchant Portal

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Merchant Portal Theme Color | Color picker | `#1ebea0` | Primary theme color for the Merchant Portal interface. Exposed as the `--mp-theme-color` CSS custom property. |
| Merchant Portal Logo | File upload | (empty) | Logo displayed in the Merchant Portal header. Recommended size: 186×50 px. Supported formats: GIF, PNG, JPEG, BMP, WebP, SVG. |

---

## How it works

The Basic Shop Theme feature is built on top of the [Back Office Configuration Framework](/docs/pbc/all/back-office/latest/base-shop/backoffice-configuration-framework.html). All settings are declared in a YAML schema file bundled with the Spryker core modules. The Configuration module reads this file and renders the corresponding UI in the Back Office.

### Storefront theming flow

1. A Business Admin sets a theme color or logo in the Back Office.
2. The value is saved and published to key-value storage (Redis) via the Publish & Synchronize mechanism.
3. The `configurationValue()` Twig function reads the value from storage and injects it into the `page-blank` layout as a CSS custom property or logo image tag.

### Back Office and Merchant Portal theming flow

1. A Business Admin sets a theme color or logo in the Back Office.
2. The value is saved in the database.
3. The `configurationValue()` Twig function reads the value from the database and injects it into the respective layout template as a CSS custom property or logo image tag.

### CSS custom properties

Theme colors are injected as CSS custom properties so that the design system can use them throughout component styles:

| Custom Property | Scope | Description |
|-----------------|-------|-------------|
| `--background-brand-primary` | Storefront | Storefront primary brand color |
| `--background-brand-subtle` | Storefront | Storefront secondary accent color |
| `--bo-main-color` | Back Office | Back Office primary theme color |
| `--bo-sidenav-color` | Back Office | Back Office side navigation and login background |
| `--bo-sidenav-text-color` | Back Office | Back Office side navigation text color |
| `--spy-primary-color` | Merchant Portal | Merchant Portal primary theme color |

### Logo upload fields

Logo settings use a file upload widget in the Back Office. Uploaded files are stored via a configured Flysystem media filesystem service and served from a public URL. Each application context uses its own filesystem service:

| Context | Filesystem service |
|---------|--------------------|
| Storefront | `storefront-media` |
| Back Office | `backoffice-media` |
| Merchant Portal | `merchant-portal-media` |

In production, these services write to an S3 bucket (or compatible object storage). In development and CI environments, files are stored locally at `public/Yves/assets/static/images` and served via the Yves assets path.

If the field is left empty, the default logo is displayed.

---

## Store-level customization

All theme settings support both global and store scopes. You can apply the same branding across all stores (global scope) or override individual settings per store (store scope).

**Example:**

| Store | Theme Main Color | Behavior |
|-------|-----------------|----------|
| Global | `#00bebe` | Applied to all stores by default |
| DE | `#ff0000` | Overrides the global value for DE only |
| AT | (not set) | Inherits `#00bebe` from global |

To switch scope, use the scope selector at the top of the Configuration Management page.

---

## Security

- **Twig access** — the `configurationValue()` and `configurationValues()` Twig functions are available in templates, but theme layout templates only read the specific compound keys they are designed for.
- **Color injection** — color values are escaped with `| e('css')` to prevent CSS injection.
- **Custom CSS sanitization** — custom CSS input is sanitized using `symfony/html-sanitizer` before being saved, reducing the risk of injecting malicious markup. The rendered output still uses `| raw` since CSS must be injected verbatim, so this setting should only be accessible to trusted administrators.
- **File uploads** — uploaded logo files are stored in isolated filesystem services per context. File types are validated on upload.
- All theme settings are protected by Back Office authentication and ACL.

---

## Related features

| Feature | Link |
|---------|------|
| Back Office Configuration Framework | [Overview](/docs/pbc/all/back-office/latest/base-shop/backoffice-configuration-framework.html) |
| Configuration Management | [Developer guide](/docs/dg/dev/backend-development/configuration-management.html) |
| Install the Basic Shop Theme | [Integration guide](/docs/dg/dev/integrate-and-configure/integrate-basic-shop-theme.html) |
