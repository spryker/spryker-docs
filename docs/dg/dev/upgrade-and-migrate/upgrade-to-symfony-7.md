---
title: Upgrade to Symfony 7.4
description: Learn how you can upgrade to the version 7.4 of Symfony for your Spryker projects and Spryker modules that use Symfony.
last_updated: Sep 28, 2026
template: howto-guide-template
---

Spryker primarily supports Symfony 7.4 that was released in November 2025. Backward compatibility remains for Symfony 6.4, but support for Symfony 5 was dropped with the `spryker/symfony:3.21.0` release.

{% info_block warningBox "Avoid old Symfony versions" %}

Although Spryker still supports older versions of Symfony, avoid installing them. Installing older versions of Symfony may cause conflicts with other packages that may have different requirements. Always try to keep your dependencies updated.

{% endinfo_block %}

## Main changes in Symfony 7.4

Symfony 7.4 is a long-term support (LTS) release. The major changes include the following:

- Symfony 7.4 removes all code deprecated throughout the Symfony 6.x series. For the full list of removed code, see [UPGRADE-7.0.md](https://github.com/symfony/symfony/blob/7.4/UPGRADE-7.0.md).
- PHP 8.2 as the minimum required version of PHP.
- Continued adoption of native PHP attributes over annotations across Symfony components.
- `symfony/monolog-bridge` now requires `monolog/monolog` version 3. Update the [Monolog](https://github.com/spryker/monolog) module to version 2.1.0 or later, which widens its `monolog/monolog` constraint to support version 3:

  ```bash
  composer require spryker/monolog:"^2.1.0"
  ```

Read more at [CHANGELOG-7.4](https://github.com/symfony/symfony/blob/7.4/CHANGELOG-7.4.md).

## Upgrade Symfony to version 7

To make your project compatible with Symfony 7.4, update the [Symfony](https://github.com/spryker/symfony) module and all modules that use it:

```bash
composer require spryker/symfony:"^3.21.0"
```

If you can't install the required version, check what else you need to update:

```bash
composer why-not spryker/symfony:3.21.0
```

This gives you a list of modules that require the latest `spryker/symfony` module and that need to be updated as well.

## Lock the Symfony version in your project

The `spryker/symfony` module supports both Symfony 6.4 and Symfony 7.4, so Composer can resolve either version depending on your project's other dependencies. For more stable and reproducible builds, lock the exact Symfony version your project uses by adding explicit version constraints for the `symfony/*` packages in your project's `composer.json`, for example:

```json
"require": {
    "symfony/console": "7.4.*",
    "symfony/http-kernel": "7.4.*"
}
```

This prevents Composer from silently switching between Symfony 6.4 and 7.4 when resolving dependencies, and keeps behavior consistent across your team and environments.
