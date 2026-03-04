---
title: Upgrade Node.js
last_updated: March 4, 2026
description: Learn how to upgrade Node.js to any version for your Spryker projects.
template: concept-topic-template

---

This document provides instructions for upgrading Node.js to any version in your Spryker project.

*Estimated migration time: 10 minutes*

## Prerequisites

Before you begin:
- Determine the target Node.js version you want to upgrade to.
- Check the [Node.js release schedule](https://github.com/nodejs/release#release-schedule) to ensure the version is supported.
- Review your project dependencies to ensure compatibility with the target Node.js version.

## 1) Update configuration files

### Update deploy configuration files

In all `deploy.*.yml` files (for example, `deploy.yml`, `deploy.dev.yml`, and `deploy.ci.yml`), update the Node.js version:

```yaml
image:
    ...
    node:
        version: 18
```

Replace `18` with your target Node.js version.

{% info_block infoBox "Note" %}

To ensure the CI jobs run successfully, update the Node.js version in all `deploy.*.yml` files used by the frontend.

{% endinfo_block %}

### Update package.json

In `package.json`, update the Node.js version in the `engines` section:

```json
{
    ...
    "engines": {
        "node": ">=18.0.0"
    }
}
```

Replace `18.0.0` with your target Node.js version.

## 2) Optional: Update local Node.js installation

If you use Node.js locally outside of Docker, download and install the required version from the [official Node.js website](https://nodejs.org/en/download/) for your operating system.

After installation, verify the Node.js version:

```bash
node -v
```

## 3) Optional: Update GitHub Actions

If your project uses GitHub Actions CI, update `.github/workflows/ci.yml`:

```yaml
- uses: actions/setup-node@v3
  with:
    node-version: '18'
```

Replace `18` with your target Node.js version.

## 4) Build the project

1. Apply the Docker changes:

```bash
docker/sdk boot deploy.dev.yml
docker/sdk up
```

2. Regenerate `package-lock.json`:

```bash
docker/sdk cli npm install
```

3. Build the project with the new Node.js version:

```bash
rm -rf node_modules && docker/sdk cli rm -rf node_modules
docker/sdk up --build --assets --data
```