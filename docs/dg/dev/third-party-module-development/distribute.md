---
title: How to Publish a Module on Packagist
description: How to Publish a Module on Packagist
last_updated: Jun 7, 2024
template: howto-guide-template

---

# How to Publish a Module on Packagist

## Prerequisites
1. **PHP installed** on your machine.
2. **Composer installed** on your machine.
3. A **Git repository** for hosting your package (e.g., GitHub, GitLab, Bitbucket).

## Step-by-Step Instructions

### 1. Create Your PHP Package
- Create a directory for your package:
  ```bash
  mkdir my-package
  cd my-package
  ```

- Add your PHP code to this directory (e.g., create a file named `src/Example.php`).

### 2. Initialize Composer
- Navigate to your package directory in the terminal:
  ```bash
  cd my-package
  ```

- Run `composer init` to create a `composer.json` file and follow the prompts:
  ```bash
  composer init
  ```
  You'll be prompted to fill out details like:
    - Package name (e.g., `vendor/package-name`)
    - Description
    - Author
    - Minimum stability
    - Package type
    - License
    - Dependencies (you can skip if not needed)

### 3. Add the Package Metadata
Ensure your `composer.json` file includes all necessary metadata. Here’s an example of what it might look like:
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
        "php": ">=8.1"
    },
    "autoload": {
        "psr-4": {
            "Vendor\\Package\\": "src/"
        }
    }
}
```

### 4. Commit Your Package to a Git Repository
- In the next steps we assume that you already have a git repository with the module:

- Add all files to the repository:
  ```bash
  git add .
  ```

- Commit your files:
  ```bash
  git commit -m "Added composer.json"
  ```

- Push your changes to the remote repository:
  ```bash
  git push -u origin master
  ```

### 5. Submit Your Package to Packagist
- Go to [Packagist](https://packagist.org/).
- Log in with your GitHub account or create an account on Packagist.

- Once logged in, click on "Submit".

- Enter the URL of your Git repository and click "Check".

- After verification, click "Submit".

### 6. Maintain Your Package
- Each time you make changes to your package, remember to push the changes to your Git repository.
- Tag a new version in Git to update the package version on Packagist:
  ```bash
  git tag v1.0.1
  git push origin v1.0.1
  ```

This also can be done using github interface

### 7. Update Composer Metadata (Optional)
As your package evolves, you might need to update your `composer.json` file with new dependencies or other metadata. After making changes, ensure you commit and push these updates to your Git repository.

### 8. Monitor and Respond to Issues
Monitor the issues reported on your Git repository hosting service and respond to feedback from users to improve your package.

## Summary
By following these steps and referring to the screenshots provided for guidance, you can successfully create, manage, and publish a PHP package on Packagist, making it available for others to use via Composer. Remember to keep your repository well-documented and maintain good version control practices to help users understand and effectively use your package.
