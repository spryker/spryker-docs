---
title: Development getting started guide
description: This is a step-by-step checklist that you can follow through all the stages of working with Spryker.
last_updated: Jul 3, 2026
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/dev-getting-started
originalArticleId: 79b50d48-6f09-45b0-9e4a-f372e274d462
redirect_from:
  - /docs/scos/dev/module-migration-guides/about-migration-guides.html
  - /docs/scos/dev/developer-getting-started-guide.html
  - /docs/about/all/b2b-suite.html
  - /docs/scos/user/intro-to-spryker/b2b-suite.html
---

This document helps you get started with the Spryker Cloud Commerce OS. It is structured as a step-by-step checklist that guides you through all the stages of working with Spryker.
If you have any questions after following these instructions, you can connect with the [Spryker community on Slack](https://join.slack.com/t/sprykercommunity/shared_invite/zt-42u7mr7om-zBMVjT6lKxADjD5rcwyDuw).

## 1. Install Spryker

Spryker Demo Shops are a good starting point for any project. They are shipped with different sets of components, which are specific to respective business models.
Demo Shops are fully functional and can be used both for demonstration purposes and as a boilerplate for a new project.
Though each shop comes with pre-selected components, Spryker offers hundreds of additional modules that you can add later.
We recommend starting your B2B Marketplace project from the [B2B Demo Marketplace](/docs/about/all/spryker-marketplace/marketplace-b2b-suite.html).
If you do not need the Marketplace capability, see [Uninstall the Marketplace from B2B Demo Marketplace](/docs/about/all/uninstall-marketplace-from-b2b-demo-marketplace.html).

Historically, we also provide B2C starting points. They contain all security fixes but may miss some of the latest features:
- [Marketplace B2C Demo Shop](/docs/about/all/spryker-marketplace/marketplace-b2c-suite.html)
- [B2C Demo Shop](/docs/about/all/b2c-suite.html)

You can run Spryker on macOS, Linux, and Windows with WSL1 or WSL2. For installation instructions, see [Set up Spryker locally](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).

## 2. Configure development tools

Spryker offers a set of [development tools](/docs/dg/dev/development-tools.html) that make it easier to work with the project: the [Docker SDK](/docs/dg/dev/sdks/the-docker-sdk/the-docker-sdk.html), Xdebug, WebProfiler, code quality tools, and more.

Spryker also provides [AI tools](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html) and instructions to speed up development. These AI-powered assistants can help you with code generation, testing, and troubleshooting.

## 3. Configure the repository and CI

Push the demo shop to your own repository:

```bash
git clone https://github.com/spryker-shop/b2b-demo-marketplace.git my-project
cd my-project
git remote set-url origin <your-repository-url>
git push -u origin --all
```

To run the demo shop CI validation commands locally, see [Continuous Integration](/docs/dg/dev/ci.html).

## 4. Configure your IDE

You can use any IDE that supports PHP and JavaScript/TypeScript for Spryker development. During development, caches and generated files are rebuilt often, and IDE re-indexing of those files can slow you down.
To improve performance, exclude cache and generated files from indexing in your IDE.

### PhpStorm

In PhpStorm, to exclude a folder from indexing, right-click it and select **Mark Directory As&nbsp;<span aria-label="and then">></span> Excluded**.
It is safe to exclude the following directories from indexing:
- `data/cache`
- `data/tmp`
- `public/(Yves/Zed/MerchantPortal)/assets`
- `.angular/cache`
- `src/Generated/(Yves/Zed/MerchantPortal)/Twig`
- `src/Generated/Yves/Router`

There is a community plugin for PhpStorm, [PYZ](https://plugins.jetbrains.com/plugin/18215-pyz), that helps with basic vendor-to-project extensions and enables click-through navigation for transfer and database objects.

## 5. Explore Spryker documentation

To learn about Spryker architecture, different parts of the Client, Shared, Zed, and Yves folders, and their different layers, see the following documents:
- [Architecture](/docs/dg/dev/architecture/architecture.html)
- [Architecture as Code](/docs/dg/dev/architecture/architecture-as-code.html): document your project architecture using industry standards
- [Guidelines](/docs/dg/dev/guidelines/guidelines.html)
- [Backend development](/docs/dg/dev/backend-development/back-end-development.html)
- [Frontend development](/docs/dg/dev/frontend-development/latest/frontend-development.html)
- [Customization strategies and upgradability](/docs/dg/dev/sdks/sdk/customization-strategies-and-upgradability.html)

To find relevant documentation for your project, use the [search](/search.html).
![search](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/search+page.png)

## 6. Configure project

### Configure project namespace

Use your own project namespace.
By default, project code is stored in the `src/Pyz` directory.
You can create your own namespace, such as `src/BestProject`, to keep your code fully separated from the Demo Shop.
This separation simplifies applying Demo Shop updates.

1. Change the namespace in `composer.json`:

```json
{
  "autoload": {
    "psr-4": {
      "BestProject\\": "src/BestProject/"
    }
  }
}
```

2. Change the namespace configurations in `config/Shared/config_default.php`:

```php
$config[KernelConstants::PROJECT_NAMESPACE] = 'BestProject';
$config[KernelConstants::PROJECT_NAMESPACES] = [
    'BestProject',
    'Pyz',
];
```

3. Extend the frontend builder paths to include your own namespace following [Extend builder paths (custom namespaces)](/docs/dg/dev/frontend-development/latest/yves/frontend-builder-for-yves.html#extend-builder-paths-custom-namespaces).

For more information, see [Customization strategies and upgradability](/docs/dg/dev/sdks/sdk/customization-strategies-and-upgradability.html).

### Configure the local environment

To configure the local environment, change the following attributes in `deploy.dev.yml`:
- `namespace`: avoids conflicts when two or more projects have the same name.
- `regions`.
- `stores`.
- Endpoint domains for the applications.
- Endpoint domains for services like RabbitMQ and Jenkins: keeps all project links together.
![Deploy namespace](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/deploy-namespace.png)

For more information, see [Deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html).

### Update the `README.md` file

- Update the project installation description.
- Update the repository link.
- Remove any unused information.
- Consider moving the production information further down to make it easier for new developers to understand how to use the project.

## 7. Next steps

For advanced project configuration, including managing modules, cleaning up modules, and configuring services, see [Post-Installation Configuration](/docs/dg/dev/post-installation-configuration.html).
