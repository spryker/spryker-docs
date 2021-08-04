---
title: Choosing a Docker SDK version
originalLink: https://documentation.spryker.com/v6/docs/choosing-a-docker-sdk-version
redirect_from:
  - /v6/docs/choosing-a-docker-sdk-version
  - /v6/docs/en/choosing-a-docker-sdk-version
---

This document describes why and how to select a particular version of the Docker SDK and use it in your project.


## Why should I use a particular version of the Docker SDK?

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

{% info_block infoBox "Fork" %}

[Spryker Cloud](https://cloud.spryker.com/) does not support forks of `spryker/docker-sdk`.

{% endinfo_block %}

## Сonfiguring a project to use the chosen version of the Docker SDK

Depending on your project requirements, choose one of the following ways to configure a Docker SDK version:

* Git submodule:
  * To contribute in the Docker SDK.
  * To have a simple way to fetch a particular version of the Docker SDK.
  * To use the hash as a versioning approach.
* Reference file:
  * To use a branch as a versioning approach.
  * When Git Submodule is not supported.

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
|Major branch|1.x|

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

