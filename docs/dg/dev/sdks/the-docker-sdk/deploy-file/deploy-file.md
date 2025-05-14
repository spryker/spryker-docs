---
title: Deploy file
description: Learn about the Spryker Deploy yaml file and how it works to deploy your Spryker environment.
template: concept-topic-template
last_updated: Nov 21, 2023
related:
  - title: Deploy file inheritance—common use cases
    link: docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-inheritance-common-use-cases.html
  - title: Deploy file reference
    link: docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html
redirect_from:
- /docs/scos/dev/the-docker-sdk/202204.0/deploy-file/deploy-file.html
- /docs/scos/dev/the-docker-sdk/202311.0/deploy-file/deploy-file.html
- /docs/scos/dev/the-docker-sdk/202307.0/deploy-file/deploy-file.html

---

Deploy file is a YAML file used by the Docker SDK to build infrastructure for applications. The deploy file's structure is based on [YAML version 1.2 syntax](https://yaml.org/spec/1.2/spec.html).

## Deploy file templates

An application usually has a deploy file for each environment. Even though the environments are different, most of the basic parameters are usually the same. To avoid defining duplicate parameters, you can use a deploy file template with dynamic parameters.

Deploy file template is a deploy file that contains the most basic configuration of an application or the configuration that's the same for multiple environments. By including a deploy file template into your application's configuration, you avoid defining all the basic and duplicate configuration in the main deploy files.

Docker SDK is shipped with the basic deploy file template: `deploy.base.template.yml`. By default, it works with `dev` and `demo` environments, as well as CI. You can also adjust it to work with the production environment or create a custom template.
last_updated: Nov 21, 2023

### Including deploy file templates

To include a deploy file template into an application's configuration, use the [`imports:`](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html#imports) parameter in the main deploy file of the desired environment.

```yaml
imports:
  custom_deploy_file.yml:
```

### Dynamic parameters

A dynamic parameter is a YAML parameter that defines the value of a placeholder for an included deploy file. It enables environment-specific parameters to be used in deploy file templates.

For example, `deploy.dev.yaml` includes `deploy.base.template.yml`:

**deploy.dev.yml**

```yaml
version: 1.0

imports:
    deploy.base.template.yml:
      parameters:
        env_name: 'dev'
```

The included deploy file includes more deploy files:

**deploy.base.template.yml**

```yaml
...

imports:
    environment/%env_name%/image.deploy.template.yml:
    environment/%env_name%/composer.deploy.template.yml:
    environment/%env_name%/assets.deploy.template.yml:
    environment/%env_name%/regions.deploy.template.yml:
    environment/%env_name%/groups.deploy.template.yml:
    environment/%env_name%/services.deploy.template.yml:
    environment/%env_name%/docker.deploy.template.yml:
```

When `deploy.base.template.yml` is included into the build of `deploy.dev.yml`, `%env_name%` is replaced with `dev`:

**deploy.base.template.yml**

```yaml
...

imports:
    environment/dev/image.deploy.template.yml:
    environment/dev/composer.deploy.template.yml:
    environment/dev/assets.deploy.template.yml:
    environment/dev/regions.deploy.template.yml:
    environment/dev/groups.deploy.template.yml:
    environment/dev/services.deploy.template.yml:
    environment/dev/docker.deploy.template.yml:
```


### Import types

You can include a deploy file into an application's configuration using one of the following import types.

- File path:

```yaml
imports:
    deploy.base.template.yml:
    deploy.project.template.yml:
```

- Named array:

```yaml
imports:
    base-deploy-file:
        template: deploy.base.template.yml
last_updated: Nov 21, 2023
    project-deploy-file:
        template: deploy.project.template.yml
last_updated: Nov 21, 2023
```

- Unnamed array:

```yaml
imports:
    - template: deploy.base.template.yml
last_updated: Nov 21, 2023
    - template: deploy.project.template.yml
last_updated: Nov 21, 2023
```

Unlike file path import, named and unnamed array imports support including the same deploy file multiple types. This can be useful when you want to add the same configuration multiple times with different parameters.

Example of including the same deploy file with different parameters via a named array import:

```yaml
imports:
    project-deploy-file:
        template: deploy.project.template.yml
last_updated: Nov 21, 2023
        parameters: 'stage'
    extended-project-deploy-file:
        template: deploy.project.template.yml
last_updated: Nov 21, 2023
        parameters:
            env_name: 'dev'
```

Example of including the same deploy file with different parameters via an unnamed array import:

```yaml
- template: deploy.porject.template.yml
last_updated: Nov 21, 2023
  parameters:
      env-name: 'stage'
- template: deploy.porject.template.yml
last_updated: Nov 21, 2023
  parameters:
      env-name: 'dev'
```

## Deploy file inheritance

When an application with multiple deploy files is being built, a deploy file builder parses and merges the deploy files into a single one at `/{DOCKER_SDK_DIRECTORY}/deployment/default/project.yml`.

{% info_block infoBox "Previewing merged deploy files" %}

To check how the final deploy file looks without stopping containers, run `docker/sdk config {DEPLOY_FILE_NAME}`. For example, if your main deploy file is `deploy.dev.yml`, run `docker/sdk config deploy.dev.yml`. The command parses the included deploy files and returns the merged file and validation errors, if any.

{% endinfo_block %}

The deploy file builder parses deploy files from the following layers:
- `Project layer`: located on a project layer at`./config/deploy-templates`.
- `Base layer`: located on the Docker SDK layer at`./{DOCKER_SDK_DIRECTORY}/generator/deploy-file-generator/templates`.


Deploy files are merged in the following order:

1. `main deploy file`: deploy file on the project layer: `deploy.*.yml`.
2. `project layer`: all the deploy files in `./config/deploy-templates`, except the main one.
3. `base layer` - all the deploy files in `./{DOCKER_SDK_DIRECTORY}/generator/deploy-file-generator/templates`.

## Parameter inheritance

When merging deploy files, the deploy file builder skips each duplicate parameter that was present in the previous parsed deploy files. For example, in `deploy.dev.yml`, memory limit's defined as follows:

```yaml
image:
    ...
    php:
        ini:
            memory_limit: 2048M
```

And, in `./spryker/generator/deploy-file-generator/templates/services.deploy.template.yml`, the memory limit's defined as follows:

```yaml
image:
    ...
    php:
        ini:
            memory_limit: 512M
```

As a result, because `deploy.dev.yml` is parsed before `services.deploy.template.yml`, the memory limit value in `project.yml` is `2048M`.
