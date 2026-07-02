---
title: Upgrade Node.js and npm
last_updated: March 4, 2026
description: Learn how to upgrade Node.js and npm to any version in your Spryker project.
template: concept-topic-template

---

This guide explains how to upgrade Node.js and npm in your Spryker project to a target version of your choice.

**Estimated migration time:** 10 minutes

## Prerequisites

Before you begin, complete the following:

- Determine the target Node.js version.
- Determine the target npm version.
- Check the [Node.js release schedule](https://github.com/nodejs/release#release-schedule) to ensure that the version is supported.
- Review your project dependencies to ensure compatibility with the target version.

## 1. Update configuration files

### Update deploy configuration files

Update the Node.js version in your deploy configuration files.

In each `deploy.*.yml` file (for example, `deploy.yml`, `deploy.dev.yml`, and `deploy.ci.yml`), update the `node.version` value:

```yaml
image:
    ...
    node:
        version: 18
        npm: 9
```

Replace `18` with the target Node.js version (for example, `20`) and `9` with the target npm version (for example, `10`).

{% info_block warningBox "Important" %}
Ensure that the npm version in your Docker configuration matches the npm version you use locally to avoid inconsistencies and potential issues with `package-lock.json`.
{% endinfo_block %}

For more information about the `image.node` configuration, see [Deploy file reference](https://github.com/spryker/docker-sdk/blob/master/docs/07-deploy-file/02-deploy.file.reference.v1.md#image-node).

### Update the package.json file

Update the Node.js version specified in the `engines` section of `package.json`.

In `package.json`, update the Node.js and npm versions in the `engines` section:

```json
{
    ...
    "engines": {
        "node": ">=18.0.0",
        "npm": ">=9.0.0"
    }
}
```

Replace `18.0.0` with the target Node.js version (for example, `20.0.0`) and `9.0.0` with the target npm version (for example, `10.0.0`).

## 2. Optional: Update local Node.js installation

If you use Node.js locally outside Docker, download and install the required version for your operating system from the [official Node.js website](https://nodejs.org/en/download/). Ensure that the installed version matches the version defined in your project configuration.

After installation, verify the installed Node.js and npm versions:

```bash
node -v
npm -v
```

## 3. Optional: Update the GitHub Actions workflow

If your project uses GitHub Actions, update the `.github/workflows/ci.yml` file:

```yaml
- uses: actions/setup-node@v3
  with:
    node-version: '18'
```

Replace `18` with the target Node.js version.

## 4. Build the project

1. Restart your Docker environment with the updated configuration:

```bash
docker/sdk boot deploy.dev.yml
docker/sdk up
```

2. Regenerate the `package-lock.json` file:

```bash
docker/sdk cli npm install
```

3. Build the project:

```bash
rm -rf node_modules
docker/sdk cli rm -rf node_modules
docker/sdk up --assets
```