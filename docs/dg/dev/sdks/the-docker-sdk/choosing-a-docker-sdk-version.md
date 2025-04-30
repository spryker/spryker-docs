---
title: Choosing a Docker SDK version
description: Learn how to choose a versioning approach and configure a particular version of Docker SDK for your project.
last_updated: Jul 11, 2023
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/choosing-a-docker-sdk-version
originalArticleId: 18a333a7-2d89-455f-885a-92d24594fb31
redirect_from:
  - /docs/scos/dev/the-docker-sdk/202311.0/choosing-a-docker-sdk-version.html
  - /docs/scos/dev/the-docker-sdk/202204.0/choosing-a-docker-sdk-version.html
  - /docs/scos/dev/the-docker-sdk/202307.0/choosing-a-docker-sdk-version.html
  - /docs/scos/dev/the-docker-sdk/202212.0/choosing-a-docker-sdk-version.html

related:
  - title: The Docker SDK
    link: docs/dg/dev/sdks/the-docker-sdk/the-docker-sdk.html
  - title: Docker SDK quick start guide
    link: docs/dg/dev/sdks/the-docker-sdk/docker-sdk-quick-start-guide.html
  - title: Docker environment infrastructure
    link: docs/dg/dev/sdks/the-docker-sdk/docker-environment-infrastructure.html
  - title: Configuring services
    link: docs/dg/dev/integrate-and-configure/configure-services.html
  - title: Docker SDK configuration reference
    link: docs/dg/dev/sdks/the-docker-sdk/docker-sdk-configuration-reference.html
  - title: Choosing a Docker SDK version
    link: docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html
  - title: Choosing a mount mode
    link: docs/dg/dev/sdks/the-docker-sdk/choosing-a-mount-mode.html
  - title: Configuring a mount mode
    link: docs/dg/dev/sdks/the-docker-sdk/configure-a-mount-mode.html
  - title: Configuring access to private repositories
    link: docs/dg/dev/sdks/the-docker-sdk/configure-access-to-private-repositories.html
  - title: Configuring debugging in Docker
    link: docs/dg/dev/set-up-spryker-locally/configure-after-installing/configure-debugging/configure-debugging.html
  - title: Running tests with the Docker SDK
    link: docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html
---

This document describes why and how to select a particular version of the Docker SDK and use it in your project.


## Using a particular version of Docker SDK

You should use a particular Docker SDK version for:

- Compatibility: project configuration is compatible with the selected Docker SDK version.
- Consistency: the same Docker SDK version is used in development, integration, and deployment pipelines.
- Control: control when and how you switch the Docker SDK version of the project.
- Stability: avoid unexpected behavior in pipelines.

## Choosing a versioning approach

To choose a versioning approach, consider the following:

- What kind of project do you have? For example, Long-term, short-term, production, demo.
- What will you use the Docker SDK for? For example, for development, operations, CI/CD management.
- Do you need to customize the Docker SDK?

Depending on your project requirements, choose one of the versioning approaches:

| VERSIONING APPROACH | COMPATIBILITY | CONSISTENCY | CONTROL | STABILITY | CASES |
|---|---|---|---|---|---|
| Release | + | + | + | + | Live projects. |
| Hash | + | + | + | +/- | Contributing into the Docker SDK. |
| Branch | + | - | + | +/- | Contributing into the Docker SDK. |
| Major branch `spryker/docker-sdk:1.x` | + | - | - | - | Demo projects. Backward compatibility checks. |
| Master branch `spryker/docker-sdk:master` | - | - | - | - | Short-term demo projects. Quick start. |
| Fork of `spryker/docker-sdk` | + | + | + | +  | Customization of the Docker SDK. |

{% info_block infoBox "Forking the Docker SDK" %}

[Spryker Cloud Commerce OS](https://cloud.spryker.com/) does not support forks of the Docker SDK. Your project's code must be compatible with the Docker SDK's main branch for a successful deployment.

{% endinfo_block %}

## Configuring a project to use the chosen version of the Docker SDK

Depending on your project requirements, choose one of the following ways to configure a Docker SDK version:

- Git submodule:
  - To contribute in the Docker SDK.
  - To have a simple way to fetch a particular version of the Docker SDK.
  - To use the hash as a versioning approach.
- Reference file:
  - To use a branch as a versioning approach.
  - When Git Submodule is not supported.


{% info_block warningBox "Spryker Cloud Commerce OS" %}

Spryker Cloud Commerce OS supports only reference file as a way of defining a Docker SDK version.

{% endinfo_block %}

### Configuring git submodule

To configure git submodule:

1. Using a terminal, navigate to your project root folder. You can find the src/ directory and composer.json file there.

2. Create a git submodule:

```bash
git submodule add git@github.com:spryker/docker-sdk.git ./docker
```

3. Check out the local clone of the repository to a specific hash, branch, or tag:

```bash
cd docker
git checkout my-branch
cd ..
```

4. Commit and push:

```bash
git add .gitmodules docker
git commit -m "Added docker submodule"
git push
```

{% info_block infoBox "Changing Docker SDK version" %}

Commit and push the git submodule again each time you want to start using a new version of Docker SDK:

```bash
git add docker
git commit -m "Updated docker submodule"
git push
```

{% endinfo_block %}

See [7.11 Git Tools - Submodules](https://www.git-scm.com/book/en/v2/Git-Tools-Submodules) and [git-submodule reference](https://git-scm.com/docs/git-submodule) for more information about git submodule.

#### Using git submodule to stick to the chosen version

To fetch the chosen version of the Docker SDK, init or update the Docker SDK submodule:

```bash
git submodule update --init --force docker
```

### Configuring a reference file

To configure a reference file:

1. Using a terminal, navigate to your project root folder. You can find the src/ directory and composer.json file there.

2. Create `.git.docker` in the project root.

3. Depending on the chosen versioning approach, add one of the following to the file:

|VERSIONING APPROACH | EXAMPLE |
|---|---|
|Hash|dbdfac276ae80dbe6f7b66ec1cd05ef21372988a|
|Release|1.24.0|
|Branch name|my-branch|

4. Commit and push:

```bash
git add .git.docker
git commit -m "Added .git.docker"
git push
```

{% info_block infoBox "Changing Docker SDK version" %}

Commit and push the reference file each time you want to start using the new version of the Docker SDK:

```bash
git add .git.docker
git commit -m "Updated .git.docker"
git push
```

{% endinfo_block %}

#### Using a reference file to stick to the chosen version

Do the following to fetch the chosen version of the Docker SDK:

  1. Clone the Docker SDK repository.
  2. Read the reference from the file.
  3. According to the reference, check out the local clone of the repository to the hash, branch, or tag.

 An example of a pipeline to fetch the chosen version of the Docker SDK:

```bash
git clone git@github.com:spryker/docker-sdk.git .docker
cd docker
git checkout "$(cat ../.git.docker | tr -d '\n\r')"
cd ..
```

#### CI validation

If you're using CI and store the commit hash in `.git.docker`, make sure the reference and submodule hashes match.

The following is an example of what the code can look like:

```bash
git submodule | grep docker | grep `cat .git.docker` || (echo "Installed submodule hash doesn't match the reference hash from .git.docker"; exit 1)
```
