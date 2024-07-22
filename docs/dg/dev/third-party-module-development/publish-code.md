---
title: How to publish module on GitHub
description: How to publish module on GitHub
last_updated: Jun 7, 2024
template: howto-guide-template
related:
  - title: Go to the Next Step.
    link: docs/dg/dev/third-party-module-development/ensure-compatibility.html
---

To publish a module on GitHub, follow the steps:


## Prerequisites

* [Create a GitHub Account](https://github.com/signup).
* Create a GitHub repository for your module. For instructions, see [Create a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories#create-a-repository).


### Set up Git

1. Install [Git](https://git-scm.com/).

2. Configure Git with your username and email address:

```bash
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
```

## Publish a third-party module on GitHub

1. Go to your project directory and initialize a Git repository:

```bash
cd /path/to/your/project
git init
```

2. Add your project files to Git:

```bash
git add .
```

3. Commit your changes with a descriptive message:

```bash
git commit -m "Initial commit"
```

4. Link the local repository to the GitHub repository you've created:

```bash
git remote add origin git@github.com:your-company-name/your-repository.git
```

5. Push your code to GitHub:

```bash
git push -u origin main
```

  Refresh your GitHub repository page to see your code published.

6. Add the module to your project's `composer.json`:

```shell
composer config repositories.your-company-name/your-repository git git@github.com:your-company-name/your-repository.git
composer require your-company-name/your-repository:dev-main
```

{% info_block infoBox %}
   Once the module is published to packagist, in the next step, the `repositories` section can be removed.
{% endinfo_block %}

Run `composer update your-company-name/your-repository`.

Congratulations! You have successfully published your code to GitHub and added it to your project.
