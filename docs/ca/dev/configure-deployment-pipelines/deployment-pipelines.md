---
title: Deployment pipelines
description: Configure and manage deployment pipelines in Spryker Cloud Commerce OS, with support for different deploy types, stages, and custom configuration via AWS
template: howto-guide-template
last_updated: Nov 30, 2023
originalLink: https://cloud.spryker.com/docs/deployment-pipelines
originalArticleId: 14d91c9f-6c4e-4481-83ee-005683ce602f
redirect_from:
  - /docs/deployment-pipelines
  - /docs/en/deployment-pipelines
  - /docs/cloud/dev/spryker-cloud-commerce-os/deployment-pipelines/deployment-pipelines.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/configuring-deployment-pipelines/deployment-pipelines.html
  - /docs/cloud/dev/spryker-cloud-commerce-os/configure-deployment-pipelines/deployment-pipelines.html
---

{% info_block infoBox "Data Import during Deployments" %}

For performance and stability reasons, remove all heavy data ingestion or processing operations from deployment steps/install recipes. Use a Jenkins job instead and start these operations after the deployment is finished.

{% endinfo_block %}

Spryker Cloud Commerce OS(SCCOS) provides automated CI/CD(Continuous Integration/Continuous Deployment) Pipelines based on the following AWS Code Suite services:

* [CodePipeline](https://aws.amazon.com/codepipeline/) - Build and Deploy scenarios

* [CodeBuild](https://aws.amazon.com/codebuild/) - Stages of pipeline execution


## Deployment pipeline types


There are two deployment pipelines: normal and destructive.

_Normal deploy_ is a pipeline that includes all the stages of a complete CI/CD flow. You can set it to run automatically on version control system updates. The `install` stage of this pipeline does not perform any dangerous data manipulations like database cleanup or scheduler reset. Use it for production deployments.

_Destructive deploy_ is a pipeline that includes all the stages of a complete CI/CD flow. You can set it to run automatically on version control system updates. The `install` stage of this pipeline resets all the data in applications. Use it for initial or non-production deployments.

## Deployment stages


Regardless of the pipeline type, deployment is divided into three stages:

1. `pre-deploy`
2. `install`
3. `post-deploy`


The stages are configured as [CodeBuild projects](https://docs.aws.amazon.com/codebuild/latest/userguide/builds-projects-and-builds.html) in AWS.

Each stage is configured to execute a set of commands. The configuration is based on two files:

* `buildspec.yml` provides the default configuration of SCCOS. This is a CodeBuild configuration file that is used if no custom configuration is provided for a stage.

* `deploy.yml` provides a custom configuration overwriting `buildspec.yml`. This file is located in the project repository root.

{% info_block infoBox "Deploy file name" %}

Deploy file name depends on the project and environment you are working with.

{% endinfo_block %}


The variables in the `image: environment:` section of `deploy.yml` are injected into the Docker image built with [Spryker Docker SDK](/docs/dg/dev/sdks/the-docker-sdk/the-docker-sdk.html).

{% info_block warningBox "supported PHP images" %}

Custom images are not supported. For the list of suppported PHP images, see [PHP-FPM](https://github.com/spryker/docker-php?tab=readme-ov-file#tags).

{% endinfo_block %}


```yaml
...
image:
  tag: spryker/php:8.0-alpine3.20
  environment:
    SPRYKER_DEFAULT_STORE: "US"
    SPRYKER_ACTIVE_STORES: "US"
    SPRYKER_HOOK_BEFORE_DEPLOY: "vendor/bin/install -r US/pre-deploy -vvv"
    SPRYKER_HOOK_AFTER_DEPLOY: "true"
    SPRYKER_HOOK_INSTALL: "vendor/bin/install -r US/production --no-ansi -vvv"
    SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "vendor/bin/install -r US/destructive --no-ansi -vvv"
...
```

Any shell commands specified in environment variables as hooks are executed with a shell inside the CodeBuild runtime. For example:

```yaml
...
environment:
  SPRYKER_HOOK_BEFORE_DEPLOY: "touch /some/file && echo OK || echo FAIL"
  SPRYKER_HOOK_AFTER_DEPLOY: "curl http://some.host.com:<port>/notify"
  SPRYKER_HOOK_INSTALL: "chmod +x ./some_custom_script.sh && ./some_custom_scipt.sh"
  SPRYKER_HOOK_DESTRUCTIVE_INSTALL: "vendor/bin/install -r destructive --no-ansi -vvv"
...
 ```




## Pre-deploy stage


The `pre-deploy` stage is configured as a pre-deploy hook.

![pre-deploy-stage](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deployment+pipelines/Deployment+pipelines/pre-deploy-stage.png)

The command or a shell script executed during the `pre-deploy` stage are set in `image: environment: SPRYKER_HOOK_BEFORE_DEPLOY:`.

The default command is `vendor/bin/install -r pre-deploy -vvv`.

The CodeBuild project of this stage is named `Run_pre-deploy_for_<project_name>`. It uses the currently running application image in the ECS cluster as an environment image, and all Zed environment variables are accessible.

{% info_block warningBox "Updating the pre-deploy hook" %}

The CodeBuild project of the pre-deploy hook uses a _currently running_ application image. If you add a new command to the hook, it's added to the hook during the next deployment. So, after updating the hook's configuration, the command only runs starting from the second deployment.

{% endinfo_block %}

The default configuration in `buildspec.yml` looks as follows:

![pre-deploy-spec](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deployment+pipelines/Deployment+pipelines/pre-deploy-buildspec.png)

## Install stage


The `install` stage is configured as an install script.

![install-stage](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deployment+pipelines/Deployment+pipelines/install-stage.png)

Depending on the pipeline type, the `install` stage command or script is specified in the following variables in `deploy.yml`:

* normal: `image: environment: SPRYKER_HOOK_INSTALL:`

* destructive: `image: environment: SPRYKER_HOOK_DESTRUCTIVE_INSTALL:`


The CodeBuild project of this stage is named `Run_install_for_<project_name>`. The currently built Docker image is used as the environment image and all Zed environment variables are accessible.

The default configuration in `buildspec.yml` looks as follows:

![install-spec](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deployment+pipelines/Deployment+pipelines/install-spec.png)

`production` and `destructive` refer to the `production.yml` and `destructive.yml` install scripts respectively. By default, they are located in `config/install`.


## Post-deploy stage


`post-deploy` stage is configured as a post-deploy hook.

![post-deploy-stage](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deployment+pipelines/Deployment+pipelines/post-deploy-stage.png)

The command or shell script of the `post-deploy` stage is set in `image: environment: SPRYKER_HOOK_AFTER_DEPLOY:`.

The CodeBuild project of this stage is named `Run_post-deploy_for_<project_name>`. The currently active image is used as the environment image of CodeBuild project and all Zed environment variables are accessible.

The default command just returns `true` during the `post-deploy` stage. The default configuration in `buildspec.yml` looks as follows:

![post-deploy-spec](https://spryker.s3.eu-central-1.amazonaws.com/cloud-docs/Spryker+Cloud/Deployment+pipelines/Deployment+pipelines/post-deploy-spec.png)

## Deployment diagram

Schematically, deployment in Spryker Cloud Commerce OS looks as follows.

<details>
    <summary>Deployment flow diagram</summary>

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-04-19T12:30:31.930Z\&quot; agent=\&quot;5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\&quot; version=\&quot;20.8.3\&quot; etag=\&quot;79X57B6but1BFt1cdTJ9\&quot; type=\&quot;device\&quot;&gt;&lt;diagram id=\&quot;4CdIZeCSqSWXLeY89IEg\&quot; name=\&quot;Page-1\&quot;&gt;7V1bk+I4sv41FbP7gEMXW7Yeq6ub2d2Y2dPbvRsz+zRhsABPGcQxpro4v/5IvoAvorCNoAwloqMLbMuWlZlfpjJTqQf8tHz9OfbXi195wKIHBILXB/z5ASHkQiT+yCO77AgEyMuOzOMwyI8dDnwP/48VF+ZHt2HANpULE86jJFxXD075asWmSeWYH8f8R/WyGY+qT137c9Y48H3qR82jv4VBssiOesg9HP8bC+eL4smQ0OzMxJ8+z2O+XeXPe0B4nH6y00u/uFf+opuFH/AfpUP4ywN+ijlPsm/L1ycWycEthi1rNz5yNh/3Fz/a5m/yi79jsTgEip7HbJW0uRXOO5jsikERfV3Lr3E64p/2XQfyRxLz5/1Yidf4NAuj6IlHPE4b4ykN/Jm3v7J0JvuIM3ztT8NEsgwEwJJ3nUfhbLb7u+wRtm1xoPkSxRuzOGGvJeLlL/Uz40uWxDtxSX6W2PlQ5LxJaP77x4HQNkKWkx1dlMhsu/mlfs5e8/3dDwMpvuRjqR5Xe1jjCqGrZ1yhWx1X6JJiDCsjC5rjioCjYWCdBu8/IBLJEQ3Cl8qIk//dSvn6lPfrUZxEwLVERxBei9f5VHTu0d8mXF7I42A0iZn/nF2dfh3Jo+nYFfcT3+b539Jz/SicryrPnYpRlkJ5rN1m7a+UHZ7xVTKa+csw2mUdeYxDP0pbgvTcJkVSeQai9E0kcLLXZBSwKY/9JOSr7PSKr1h2OgpXbLR/4RQp3nqno33r+hho5x2sP+nrdrNI8V5yZMz/FFLx00Z8/zlMxP8xW/OiL5O43jvBI1kH2x5OSfT20SPSKoTFjyIW8XnsL8WFaxaHgmdZXD/39XCio2znmqObbC+SZSR/iq+rCH2K84dJQQ6FgnvMuXEZBoF8pU8Fe+ZMmVJ4Gq7mv7BZkt7W8uSHHs58yyWXSMlYhAn7Lo7LIfkhrIEqugA92IJq2CIQwwLyg4EDXcf1GjiDVDhDNaCMe5QhJPFY8CWQloWCtg0api8AalTPBWaT+HHyKA2Z2rFxKHuWs4/4nZtOkhRsFRQtJhGfPmeH8gYw+1W6PDVSWEGkEs2Q5CsmXuN7/o48ThZ8zld+9OVw9DhZN3wbT1kFk0VP56xQorltxYKKCdakfYmaECiouT8Ys0hAzkvVdFPROH2GGCN/V7pgzcNVsil14as8cOA97FV5DwvecymlnutSRInnOlUz6kRzG4Iau2UdOjDffgha8aPXUuv9VFJ2FFugu5776QOpt2nkbzaVvpW/XVL7fXn6Ngj1FviJv0l4zG5Sa3npTbvrK+zoUVgY7ycQhTmMFPMMJa55xCpw8xxFRe9eUVFPn6IqjpU1ldNdUWGsoud7qCmvm1qCGFtEkplAgB3oENStuYcsKJQiJdT25PS5U2vBYpbXMOd0acjCp3THkgChrU8UvKYkQLuHzdaUBNu5jiQ0sBeTU9LQaGIDbDl6+RC2NNWUDgoMoAWogxzjoHhvB8WLkEoh+Wg8CcWTxuFKiHVK6ZF0tBb98CXzx2xW6cMiSaQH+1FyFRrPw2SxnVhTvkwtuHj3zOJR7vIQDD72oyAsfsvHRXwirTcmiDae8tUsnJcfP17HTLzfOuI7ayesqbLBWhLm4ugfk8hfPTff7nCXksXol0bZX0qjaTXZyD+j0YqP/NUmlK//8vJyWdvV8Gsffq3TzFDEUMRQpPqkz+yFRXzNYulpDthMNJTmzMKXVsJmwbdRINWqPBjw9NyEzcTs2BLfxlIZAPYqSCq6h57SnvL1Wkw9xdd/sNWzwGjrHebwvQJKAQ0Qow/vPH0Xlg724EOfOTyEdD8o50UKIW1Yhbg5icdQ5ZyE7vlT+CKM3sm5B5FtUWTce8N07z3+9l2c/hquWZRCzAA8fdcLO2tGCdcCdj+EQFAPQoxQ1ZHhKlx8WIEOtgb/HsS9wMGxiPi4Bh8Gig/rdSRkIb2JoHU2t0tH80aBYgjmBEl5nhCnJ1rgy6AFLLzFp+DCwRrgwu4BFyZQ+I5Tki+vbLpN5FTj4JJZstRtueD8+XYh4ZYDhEKB6gEDjGtgoJpaKOODrgbjYcHHPwfL39jfpr/sxjvsjH73/jNym6mJp0MK1ZjE4ZpfOF/n9PqTJckuD2Pk+FGiphjCePe7bG85xc//5rdLf3x+rfzaHWUzZYziZLgDKnJUIFHTrnXgojUqt01aNKg8EFT+dvCOF66dh4PT34DxVcEYH8ReLxg76IpgDIkBgRsDgW1tdgYEJrBVkHl806nbkgf5awZsM42301RviJNx+szEIMb7IMalzDdCrokYbbM+D6xbSSVAlksJ+XCZBGm7HyUBn6TrwuSpacbFj6kux7NZnuczRPC5LHIYQg4kj2Qd80BqDalNGtFik4PxERjkf74Zwt0k4YaaISZM0SQ3Rc9JESvdpsRyR3PEDF7d3gxHQcN3p8gx03YijFMhFiV8ePHjv4xG5eN/rb2lToZo/3zwFu/o4oEO3elhdBYHPtcnvFM54RVmyz61ASS7dSYHe2aYtOebruz0bmwhUUvT0/vM7A3I3RfIGYoYihiKGIoYihiKGIoYihiKGIoYihiKGIoYihiKGIoYihiKGIoYihiKGIoYihiKGIoYihiKGIoYihiKfESK3Pvadc+CABLac+k61lUKp7503fFaFsLZ1/o8a70DNSukbkvky8skebJI10j5ldoWU/GqvrifrLiV9coshbrqUihbU1mLxlIo95pLoQpgMtBwJxVwvvzz8yAAYfk6l5ubWbOI/5gu/DixBE2X4cpP+G3u5NIfKC60ZlJYES2BQsf2UEW5hnsuA27Lvbw0lQEvbK5yXQzSY+8WRUV8O1++et2K+NADrtWxKj4Fendr2QtNr4W7/dTWcaw3+usC+uv7vx+//dtosGFpME3TYIzcWkVYVcXHi2mwPhUf78rUbS+FT+fiQftHpcsst7Fc8bQvCDQA6f94E1qH6JFyF9n1us9uWznXMqU1pRrvyySQRV0lfy3DeXYrgxDvgxDE1oUQNXwgLr0iPnz4ooHtRY8l05Nd6CrnKx4v8y4ee10j19eVa032vULze1d1ZretBKh0D4hhsDzjHxi4MfCZM1kxNO1FuPTnct7QhI0fYSI3Qd9sp/KPL4fBnyuv9CNBzEAyMXsNN+LIeBggtODLyVYMcWVj9PzobW+Jji3ShCnQAqY8Vw9M7beS3TshFBjlKTAK6nBDqGtHN73rV6gdrasGdLGre9nXjZGaBtprQBcP7wn67tCdwm/ZT52Mq0/bMN2F62vMgwI8N70wbLjv+Je0OFZawOspvfJBFpCdbOd/HcaLGg2e/r3JdLYh6E6kMvFb6U5dmWykvtWvuw8LntafUIcb3ztK1psORB/hlDIRaXoPTTu2k6bOLlRpp32qMWkSunDBXjZCTWDNjnPfDk+fuP786HSfNEtELGzjHvPOy/uWtGnlf/ITYH4D+vJ+/V7yPY7jT+RPWPTJnz7PU7hS6UPNOg4c03ElKES2rQa6orJ7a4UmnoZh4RLuhlcNgBkVW1EUTfhsthHgWtdu3WAFmxTNYQr0UQs3ELpfjs54E1x4nzFDn171pUPpEZyH6V5w/mbxDjMQwSLbdDc68b6ZRQis1Ea9uSlJ76gD1ZRvQEE96rCPL14j6IA/QGIs9R60TTwKdXbuxMNBinkHuMa8w3Pr84hKlmvX68+ed6g9yqjBlh9gN0KMmsyFbTUvafdEFw//uIZaexX8tfvs8+i9tlKD1/zZJoPgmrocAV25g6DuXvRcpXvxYtq8T/IgRB9TiMW57366Ld9kG0ZJRulNuj51POXLZWpgJzIG89WP/SxiLbvJY2bET6N3X4iDHvEjXj1BHwKEVPKn2mddx1J17Ogl64QEru91JGtlaDUlHXiU1gZWCWxINbDI1jGyfbZJheSekO3OAqnCfGWb5I8Ue//YI+9N2D+wKamz9KOS1P20eMAA7OlBCYpoA4CpEoBdBU4QHTDRNp3GwMSNwETANmHMAoMQ74oQSJOJpkAISJRTpIshRNvdkw1C3AhCiAcnf2T1hgxOvDdOHJyfunFiP424CkrQo0TtGhbBnktg8DCMsMjpNC2ZhKAvWpL7oyoO7Xwm1y1NCzbpDK9SSMQDTZt2n0V4NGbi1B2B/RpBbFsUEUwhAdAh6O0bqJTrWzc4O3Rj98nt8KBFPNe5G216JXXZofpB4bssJweY3KyHdrlZGKhzjQuN0F6HjcTjqOM6nkyT9BzseW4fwFLkaVVk3K6215K0ZcOWgn3gvluqVKQtNfT7QujhfdxAruwLVzOTLvr2oN2IaT7QKEvvICfWNIWvF/LDimLAFwtw2n2SFIT1aNlDtDe04dDjeh1zqVDGBntuAHvud3U0sjy1hXUKnWxd6FRbJeNgBTrZCnSiGrwGNtbmNRhqMqVEYG3ugcLMLLsHCoTv5B5wFdqml7F9bplR2+tWY9QBHa8/4QJoXG9rnvHb98nhLfxiNtHH+Krli0V1hi6MTxT1dXGRWnxdzq8Vy+16/fmc2acuFgaW43pwiLbhFX1R5zib/vvOSau36GKSJbBVQFGAaycXE6TVD+kj/Adp1etGIh9XW1CNZhJqagvUI4ri0aa2gA5+D21BcDc7hjjYEooNUZsi6J1YKd9o7ELLBbaDPA94Ds0zAFq3pkKmHeIS8c3ZL7bVprb6JCwZtXXhEIrRaj20mgPVWq3I3O2i1TyMPZsIcMr+p+cptf2WI9UWenTchy3oghynlY5jr2Hye95cfk9X1GUL7MSvw5I6+aNYUddfL/aYRSlyC6h7leQCBOyKrnFOaLb69QhqLgJj31kRmPtQR4cKNEYbtdZG6pUvducSK0IbUUBcW5DHhsKEJF4v/0rTzqyFw7RoI6dPRg7ExEJDlF5t8bH/rAM/kSv9ipq7WT3dmeBUBJ54wIrqkmu5tm+85vuMUvlCK3kmXAn1mo71n3zSr/Dk/YemaVMu24Smidpy7B78AdX0N6oM/jhNda8jNO3oq6RxaymjBLcyBFsZdVhRjbePa9wprMOKt4P2mkl0zhmlboUPIaSnNp9zHHBuE+qcyjC1GxmmjTZnW5BF9KFf6pgHLRcCOujssRvxzH/OFk4pLcdKBVuTJtrHviTqfVELLdCphB/xbBcS16GAusDTZF+Oanlalyju5+hLeBiUzisT2tUY9y0Wn1USHnpsq2pjhRFDruKyqJehhehE/ah6AxvpDfw6x2suDMgBx9dsVWFBcIIFA4HK6Y9sidjrZ4nS2S956qufCOhaPWQJoUJxNko/eDqNMtSdR7FNLTnzELwKHM+htsLsdm2LiI/nAghd6PVi4KaVg3GVQ3G9AEUmfnmzAyt2FQUI6xYYelsUGg32XTtqsR17F23Sc6ch2ooktPNTt5IEqEhZg0536UCqDGmSSQx2hC60ie1dpQ65U6vvB518CnZ03nGiwfk86X4AntS5Wbsim6xYHNkpDqLc9aCXNdqZCUGNpwh9O0p/qsH5THincb0KE2pMUoEK0xbSPsAIUxBEHrJd4AJFhmNuWGAECHTFtOkqdm+D4bwTCY+nGpzPofrWqA+WQ6lODlUsRoc9Jl9K1Z0xrfi4GBDqEnwd2EQ1HrPJCaY80eBspiyKL9wxU2KgcSObwpaqMKXdnSmLyX+l8B7slQzaPbevNkdBJyY1qG5Adm6gnWvNeud2652zeqnJQv5flNx5KBVO7Vcv1axKHMKqxNsNO/dbEY2B/RZKdwg7o0bdWVo4Pa+xKJqgo0S9aS/86cgzBhqd80Th2sE9ptGOo0gohMC+yjQFAliLPVPN+zUUa85M0Z+rhnNNVZ/zqvqol1yRzmA/ApZjA4dCakNP4A8+Nzl9X9WnSBrRGqEl/XYEcNK4jDtEedVXNCMIQmm5+XK8Aj/xjZV6p1ZqrzL6mlGKpBJF0rSRHrYqRHps1VHNAYSA2zRUVVX8i1SPcwxV9VZPzfj9Vbd6Kn5ky1LQfuOnC+/1RJymtUlcNe0uazLatQWPcnOHN90xpxqcb2L2Wct/V1tRDVQ7HLVOv7yy6TbNsJe586PMNZTuEClQhPML7yNqPBzHtIYuDweuaw3nmv6N+89RwVBjoEvlyCB9clQUVkCvrabPrRYgV7y/qZFONThfI7Vdpq8MEGAAZSlY1MP/ccUowYdQVC9CIOWqr/EklPu8HVZ1jWSwouiHL9k+ZrNKHxZJst6ktx+Lf/MwWWwn1pQvU1UV755ZPFrH/E+hZARrj/0oCIvf8nERn0g1xQTRxlO+moXz8uPH65jlWtPaCd1RXjlaEuPi6B+TyF89N9+upHxLutEvDXMl8380WvGRv9qE8v1fXl4uq6UNw/Zh2DrNDEUMRQxF6kudXljE1yyWFbgDNhMNpSWz8KWJsFnwbbq2d5IGrXl6zp+J4bTEl3G6BJi9CoqK3qEn2UCoCGFny6vS/iThTBjtsofWrUxaAhogRh/eedIiLB7swYdeMxekyd9FYH1PDAQUBav3ZWOrMTtPw+Tl/rP0MNIZhVWs/+1T1AVBlMUwoOvInVFUJWLBNSYz9XT5es2Wzg3OnswU9+83melZLWLoE5nBFX15SicJW5k8BVIlFbM0HAi++ZNJmPz6L+NTe49iFRjrKlZRX0ip3lL5YvUqXH31KgarmLBGxeQoMnXdHopJkahLr7LQq1GBWRa2FB8CAXbk5mCdXGwQCMsKup7jeZ5Qsl1rcsp8KAs7Qju7LrZx59ZSVkRzoeDP39dM/Iy5xN7D5ULsF7/ygMkr/h8=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>


</details>

## Next steps


* [Deployment in states](/docs/ca/dev/configure-deployment-pipelines/deployment-in-states.html)
