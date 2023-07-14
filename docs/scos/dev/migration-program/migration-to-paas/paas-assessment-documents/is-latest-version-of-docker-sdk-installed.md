---
title: Is the latest version of Docker SDK installed?
description: This document allows you to assess if the latest version of Docker SDK is installed in a project.
template: howto-guide-template
---

## With project repository access

1. In the project's root folder, find the `docker` folder and check if it's added as a sub-module.
2. In the `docker` sub-module, check the remote origin of the Docker SDK:

```shell
git remote show origin
```

It should be pointed to `git@github.com:spryker/docker-sdk.git`.

3. To check the latest commits in the `docker` submodule, run `git log`.

4. To figure out how outdated the Docker SDK is in the project, compare the date of the latest commit to the Docker SDK's [releases](https://github.com/spryker/docker-sdk/releases).

## With project code provided as an archive

1. In the project's root, check if the `docker` folder exists.
    If it’s missing, the Docker SDK *is not used*.
2. If the `docker` folder exists, compare its content to the content of the folder in the [Docker SDK repository](https://github.com/spryker/docker-sdk). They should looks similar.
3. Check if the Docker SDK is integrated correctly based on the [integration instructions](/docs/scos/dev/setup/installing-spryker-with-docker/installation-guides/integrating-the-docker-sdk-into-existing-projects.html#prerequisites).
    Based on the assessment from steps 2-3, you should be able to identify if the Docker SDK is used.
4. Check the version of the Docker SDK by looking up the hash commit of the Docker SDK repository in the prerequisites.
5. Use hash commit and [Docker SDK repo](https://github.com/spryker/docker-sdk) to understand which version is used.


## Resources for assessment

Backend

## Formula for calculating the migration effort

Approximately 2h.
