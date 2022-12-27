---
title: Integrating Symfony 6
description: Learn about the main changes in the new Symfony version 6
last_updated: Dec 7, 2022
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/symfony-6-integration
originalArticleId: d5e96c3b-3ed6-49ed-982c-aa641e09b559
redirect_from:
  - /2021080/docs/symfony-6-integration
  - /2021080/docs/en/symfony-6-integration
  - /docs/symfony-6-integration
  - /docs/en/symfony-6-integration
  - /v6/docs/symfony-6-integration
  - /v6/docs/en/symfony-6-integration
  - /docs/scos/dev/technical-enhancements/symfony-6-integration.html
---

Spryker supports Symfony 6 that was released in December 2022. We tried to keep BC for all three major versions of Symfony, but due to some changes in version 5, we had to partially drop support for Symfony 4 in October 2022.

{% info_block warningBox "Old Symfony versions" %}

Even though Spryker still supports older versions of Symfony, it doesn’t mean that you can install them in your project. This is mainly because other packages you use or Spryker uses have different requirements. Anyways, you should always try to keep your dependencies updated.

{% endinfo_block %}

<a name="changes"></a>

## Main changes in Symfony 6

Symfony 6 has a new cycle of innovations that starts one that will also last two years, on a modernized codebase that has been cleaned up from the dead weight of the past.
The big news of Symfony 6 is that PHP 8.0 is now the minimum required version.
The code of Symfony 6 has been updated. You can take advantage of all the new features in PHP.
For example, the code includes PHP 8 [attributes](https://www.php.net/manual/fr/language.attributes.overview.php), more expressive and rigorous type declarations, etc.

Read more [CHANGELOG-6.0](https://github.com/symfony/symfony/blob/6.0/CHANGELOG-6.0.md). 

## Integration

To make your project compatible with Symfony 6, update the [Symfony](https://github.com/spryker/symfony) module and all modules that use it:

```bash
composer require spryker/symfony:"^3.11.0"
```

If you can’t install the required version, run the following command to see what else you need to update:

```bash
composer why-not spryker/symfony:3.11.0
```

This gives you a list of modules that require the latest `spryker/symfony` module and that need to be updated as well.
