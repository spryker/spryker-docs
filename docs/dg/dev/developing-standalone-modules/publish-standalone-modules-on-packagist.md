---
title: Publish standalone modules on Packagist
description: Learn how to publish a module on Packagist for distribution
last_updated: Jun 7, 2024
template: howto-guide-template

---

To publish a module on Packagist, take the following steps.

## Prerequisites

* Install PHP
* Install composer

## Initialize Composer

1. Go to the module's repository directory:
```bash
cd my-package
```

2. Create `composer.json` and follow the prompts:
```bash
composer init
```

You'll be prompted to fill out details like the following:
  - Package name, for example—`vendor/package-name`
  - Description
  - Author
  - Minimum stability
  - Package type
  - License
  - Optional: Dependencies

## Add the package metadata


Add the package metadata to `composer.json`. Here’s an example of what it might look like:


{% info_block infoBox %}
Make sure all the module dependencies are listed in the `require` section.
{% endinfo_block %}

```json
{
    "name": "vendor/package-name",
    "description": "A brief description of your package",
    "type": "library",
    "license": "MIT",
    "authors": [
        {
            "name": "Your Name",
            "email": "your-email@example.com"
        }
    ],
    "require": {
        "php": ">=8.2"
    },
    "autoload": {
        "psr-4": {
            "Vendor\\Package\\": "src/"
        }
    }
}
```

## Commit the package to a Git repository

1. Ignore all the non-module files by creating `.gitignore`:

```text
# tooling
vendor/
composer.lock
```

2. Add all files to the repository:
```bash
git add .
```

3. Commit the files:
```bash
git commit -m "Added composer.json"
```

4. Push the changes to the remote repository:
```bash
git push -u origin master
```

5. Add a new tag in one of the following ways:
  * Recommended: Create a new release using the GitHub web interface. For instructions, see [Creating a release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).
  * Manually:
```bash
git tag v1.0.0
it push origin v1.0.0
```

## Submit the package to Packagist
1. Go to [Packagist](https://packagist.org/).
2. Log in with your GitHub account or create an account on Packagist.
3. Once logged in, click **Submit**.
4. Enter the URL of your Git repository and click **Check**.
5. After the verification, click **Submit**.

## Maintaining your package

Each time you make changes to your package, make sure to push the changes to your Git repository and create a new tag (release).

## Updating Composer metadata
As your package evolves, you might need to update your `composer.json` file with new dependencies or other metadata. After making changes, ensure you commit and push these updates to your Git repository.

## Installing the package
To install the published package to a project, run `composer require vendor/{package-name}`.

## Monitoring issues
Monitor the issues reported on your Git repository hosting service and respond to feedback from users to improve your package.
