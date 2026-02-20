---
title: Development getting started guide
description: This is a step-by-step checklist that you can follow through all the stages of working with Spryker.
last_updated: Feb 20, 2026
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/dev-getting-started
originalArticleId: 79b50d48-6f09-45b0-9e4a-f372e274d462
redirect_from:
  - /docs/scos/dev/module-migration-guides/about-migration-guides.html
  - /docs/pbc/all/punchout/202307.0/punchout-catalogs-overview.html
  - /docs/scos/dev/developer-getting-started-guide.html
---

This document helps you get started with the Spryker Cloud Commerce OS. It has been structured as a step-by-step checklist to help get you through all of the stages involved in working with Spryker. If you have any questions after following these instructions, you can connect with the Spryker community at [CommerceQuest](https://commercequest.space/).

## 1. Install Spryker

Spryker Demo Shops are a good starting point for any project. They are shipped with different sets of components, which are specific to respective business models. Demo Shops are fully functional and can be used for both demonstrative purposes as well as boilerplate for a new project. Though each shop comes with pre-selected components, Spryker offers hundreds of additional modules that you can add later.
You can choose from the following options:
- [Marketplace B2B Demo Shop](/docs/about/all/spryker-marketplace/marketplace-b2b-suite.html)
- [B2B Demo Shop](/docs/about/all/b2b-suite.html)
- [Marketplace B2C Demo Shop](/docs/about/all/spryker-marketplace/marketplace-b2c-suite.html)
- [B2C Demo Shop](/docs/about/all/b2c-suite.html)

You can run Spryker on MacOS, Linux, and Windows with WSL1 or WSL2. For installation instructions, see [Set up Spryker locally](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).

## 2. Configure development tools

Spryker offers a set of [development tools](/docs/dg/dev/development-tools.html) that make it easier to work with the project: DockerSdk, Xdebug, WebProfiler, Code Quality Tools, and more.

Spryker also provides [AI tools](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html) and instructions to speed up development and make it easier. These AI-powered assistants can help you with code generation, testing, and troubleshooting.

## 3. Configure repository and Continuous Integration

Push the demo shop to your own repository. For instructions on cloning from a specific branch and pushing to a different remote repository, see [this guide](https://medium.com/@satriajanaka09/clone-pull-from-specific-branch-in-remote-repository-and-then-push-to-a-different-remote-851032f99560).

To configure the Continuous Integration, see [Configure CI](/docs/dg/dev/ci.html).

## 4. Configure your IDE

You can use any IDE that supports PHP and JavaScript/TypeScript for Spryker development. When you start developing a project, you need to restart it quite often. IDE indexing can slow down this process.
To improve performance, exclude cache and generated files from indexing in your IDE.

### PhpStorm

In PhpStorm, to disable cache indexing, right-click the folder and select **Mark Directory As&nbsp;<span aria-label="and then">></span> Excluded**.
It is safe to disable cache indexing for the following directories:
- `data/cache`
- `data/tmp`
- `public/(Yves/Zed/Marketlace)/assets`
- `.angular/cache`
- `src/Generated/(Yves/Zed/Marketlace)/Twig`
- `src/Generated/Yves/Router`

A couple of plugins for PhpStorm from the community are recommended:
![phpstorm plugins](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/spryker-phpstorm-plugins.png)

## 5. Explore Spryker Documentation

To learn about Spryker architecture, different parts of the Client, Shared, Zed, and Yves folders, and their different layers, see the following documents:
- [Architecture](/docs/dg/dev/architecture/architecture.html).
- [Architecture as Code](/docs/dg/dev/architecture/architecture-as-code.html) - document your project architecture using industry standards.
- [Guidelines](/docs/dg/dev/guidelines/guidelines.html).
- [Backend development](/docs/dg/dev/backend-development/back-end-development.html)
- [Frontend development](/docs/dg/dev/frontend-development/latest/frontend-development.html)
- [Keep project good for upgrade](/docs/dg/dev/sdks/sdk/customization-strategies-and-upgradability.html)

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

3. Extend FE builder paths to include your own namespace following [Extend builder paths (custom namespaces)](/docs/dg/dev/frontend-development/latest/yves/frontend-builder-for-yves.html#extend-builder-paths-custom-namespaces).

More information about [upgradability](/docs/dg/dev/sdks/sdk/customization-strategies-and-upgradability).

### Configure the local environment

To configure the local environment, change the following attributes in `deploy.dev.yml`:
- Namespace: this helps to avoid issues when you have two or more projects with the same names.
- Regions.
- Stores.
- Domains for the local environment.
- Domains for the services like RabbitMQ and Jenkins: this helps to keep all project links together.
![Deploy namespace](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/deploy-namespace.png)

For more information about deploy files, see [Deploy file](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file.html).

### Update the `readme.md` file

- Update the project installation description.
- Update the repository link.
- Remove any unused information, like Vagrant installation instructions if DevVM was not used.
- Consider moving the production information further down to make it easier for new developers to understand how to use the project.

## 7. Next steps

For advanced project configuration, including managing modules, cleaning up modules, and configuring services, see [Post-Installation Configuration](/docs/dg/dev/post-installation-configuration.html).
