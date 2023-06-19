---
title: "HowTo: Set up XDebug Profiling" 
description: In this article we explain how to setup XDebug profiling in a local development environment.
template: howto-guide-template
---

# HowTo: Setup XDebug Profiling
In this article, we want to explain  how to setup XDebug profiling in a local development environment to understand in detail the cost of functions and transactions in terms of time and memory demand. This will help us identify performance issues as well as sources for application instability.

## Prerequisites
To follow this HowTo, we will need the following:
* Working SCOS Applicaiton setup with our Docker SDK *
* An IDE of your choice (such as PHPStorm or Visual Studio Code)
* A plugin or software to view cachegrind files (kqachegrind, qcachegrind or a plugin for your IDE)

## Step 1: Prepare the deploy.yml file for XDebug
Spryker's deploy.yml file brings with it native support for all the configurations we need to activiate the profilig mode of XDebug and route the created profiling snapshots to a location of our choosing. See an example configuration below and adjust as needed:
```yml
environment: docker.dev
image:
    tag: spryker/php:8.1
    php:

        ini:
            # Switch XDebug Mode to profile
            "xdebug.mode": profile
            # Define a folder to route the output to. Please create this folder in your project as it will not be created automatically. 
            "xdebug.output_dir": "/data/src/Generated/Xdebug"

```

## Step 2: Setup XDebug configuration
In order to use XDebug with your IDE, you will need to configure your IDE so it can connect to your application. For this, please follow this (guide)[https://docs.spryker.com/docs/scos/dev/the-docker-sdk/202212.0/configuring-debugging-in-docker.html].

## Step 3: Bring up your application and start profiling
Once your application is setup, we start everything up.
```bash
# Bootstrap your adjusted deploy.yml file. Here we have used deploy.dev.yml
docker/sdk boot deploy.dev.yml
# Next, we start up the application in debugging mode
docker/sdk up -x
```
Once the application is running, we can now navigate the shop. This will create cachegrind files in the folder we have created and specified in the deploy.yml file.
We can also create profiles for console commands by starting CLI like so:
```bash
# We can start up CLI in debugging mode too:
docker/sdk cli -x
```
Running any command from CLI will now also create cachegrind files and you should now see them create in your file system:
![XDebug cachegrind files](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-setup-x-debug-profiling/cachegrind-files-in-IDE.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDEaDGV1LWNlbnRyYWwtMSJHMEUCIQDTo6R8WnF2PEP8Vn1c0Cl4eH%2FAanW%2FDm8fxd6Uk6Y5kwIgKOn23ZRDYGxLSz9pjGD2MpCbvZHQXy8VLtfRy7NkU9kq%2FQMIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARADGgw4OTMzNjg5MjgxNTMiDGRMhxKRUyXn2OcGPCrRA9csW9a4nj3rGhOEXtjpaLC%2Bk6sov2bokmQZNbUrCo0vdMuOmCOfQZyyqKgbuQZA2QnsmXHY3Z1AVJNEH3DZgfbwnNy0FohpZeSdRxU0S9rrZ7nkcScNRfsRajEu%2BN9KK%2FS2e%2BuOgmEg1aO59c%2FDnm357%2Bszs1VkyYDucWw8g4jEi0X8%2FxdEJ4%2BdhWwhhxeiB3869VUg2T2LSLebHx5Yt6VDdfry0viJ6%2B%2FVWypbDvHNv2BZzHf%2FP%2FbPfXR2XDjcFUx9Lm7t5tUjzmAWRm9dA7dd%2Bnl0873PHUTICYmZtNCej%2FE%2FXc1E5NIQhT1n8M2nyhjFhdAyGkEJvTwWMcRR%2BMFByyYRB4YYTu%2FT6IPuj9XgStLKbPtMpdthhuKPBj3vaEbIlpwo0lFArlvkfl3s1XAarUJEhj4J%2BW0z3hAgu%2FtlH%2FtY79Cy9PNgBuy%2F5MLJgQkpejiYRYDKqveOqVyLuDOpQelqfcPJLcyu88Uo6a3btyHwXBCfrBlybeAN4yzl5BmkpGXYueYkakrPR4CKLB1GKTqyLk5Kgokm6lOkNA%2Fu0UoP6ELfmwlmrZAVTeo4tb64vAp%2F4VPL7hEgdro1Dq88ON6rPAuEe4uvgwTzcSLNSjCUt8CkBjqUAsM%2BLhU%2BvxGQra4xTl%2FP2L5gBFrb1GfeCo5wuE8pWGVmngS0%2F8rGaA2LQ17Llr2ZUZP4R75On222L4yk9iT%2BsGlWHIN10UvPTffzIeeKXYGDyXUhHdMLGoPGBjzG3%2BIaa53z%2BbaQ5qNfgobyxB0XLEiDX40%2FoPOJXjp6ISfP45Hv1LqQHlfUVAFWjnnGLDw7SFQ4HyaNJTKsBpRnIUmZ4MJfTpV2Tja2sGBob8t%2FYBOwPg4B9KQFdPW1OPfMgjWGLmoNnvK%2B7Xk5pLTi0Nm0sSkarZn8WOVFoFLAVGzWdziJjUWejKUngfyaD6pmb7xuumAQQYkc9tL5M937F0L3sh3ah%2FZ%2BhR7WyDQ4OeD7cn5WD8kB6g%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230619T091748Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5AAHQA6MZMRDF3HN%2F20230619%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=dd542ecdce823b52c4ea35c9c8c65075391c52ddad8d654f6303d8a4b4ca6386 "XDebug Cachegrind Files")

## Step 4: Analyse your results
Now that you have cachegrind files created it is time to analyse them. For this we have multiple options. Some IDEs, like PHPStorm bring native support for viewing cachegrind files and you should be able to access the corresponding tool by navigating to Tools > Analyze Xdebug Profiler Snapshot.
For Visual Studio Code, you can use an extension such as PHP Profiler by DEVSENSE.
You can also use a standalone cachegrind viewer, such as [KCachegrind](https://kcachegrind.github.io/html/Home.html) (Linux) or [QCachegrind](https://github.com/ekiefl/qcachegrind-mac-instructions) (MacOS/Windows)
Below you can see how a cachegrind file looks like when opened with the standaole cachegrind-file viewer QCachegrind.
You can look at what function was the most expensive in terms of time:
![Cachegrind Analysis Time spent](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-setup-x-debug-profiling/qcachegrind-memory-used.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDEaDGV1LWNlbnRyYWwtMSJHMEUCIQDTo6R8WnF2PEP8Vn1c0Cl4eH%2FAanW%2FDm8fxd6Uk6Y5kwIgKOn23ZRDYGxLSz9pjGD2MpCbvZHQXy8VLtfRy7NkU9kq%2FQMIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARADGgw4OTMzNjg5MjgxNTMiDGRMhxKRUyXn2OcGPCrRA9csW9a4nj3rGhOEXtjpaLC%2Bk6sov2bokmQZNbUrCo0vdMuOmCOfQZyyqKgbuQZA2QnsmXHY3Z1AVJNEH3DZgfbwnNy0FohpZeSdRxU0S9rrZ7nkcScNRfsRajEu%2BN9KK%2FS2e%2BuOgmEg1aO59c%2FDnm357%2Bszs1VkyYDucWw8g4jEi0X8%2FxdEJ4%2BdhWwhhxeiB3869VUg2T2LSLebHx5Yt6VDdfry0viJ6%2B%2FVWypbDvHNv2BZzHf%2FP%2FbPfXR2XDjcFUx9Lm7t5tUjzmAWRm9dA7dd%2Bnl0873PHUTICYmZtNCej%2FE%2FXc1E5NIQhT1n8M2nyhjFhdAyGkEJvTwWMcRR%2BMFByyYRB4YYTu%2FT6IPuj9XgStLKbPtMpdthhuKPBj3vaEbIlpwo0lFArlvkfl3s1XAarUJEhj4J%2BW0z3hAgu%2FtlH%2FtY79Cy9PNgBuy%2F5MLJgQkpejiYRYDKqveOqVyLuDOpQelqfcPJLcyu88Uo6a3btyHwXBCfrBlybeAN4yzl5BmkpGXYueYkakrPR4CKLB1GKTqyLk5Kgokm6lOkNA%2Fu0UoP6ELfmwlmrZAVTeo4tb64vAp%2F4VPL7hEgdro1Dq88ON6rPAuEe4uvgwTzcSLNSjCUt8CkBjqUAsM%2BLhU%2BvxGQra4xTl%2FP2L5gBFrb1GfeCo5wuE8pWGVmngS0%2F8rGaA2LQ17Llr2ZUZP4R75On222L4yk9iT%2BsGlWHIN10UvPTffzIeeKXYGDyXUhHdMLGoPGBjzG3%2BIaa53z%2BbaQ5qNfgobyxB0XLEiDX40%2FoPOJXjp6ISfP45Hv1LqQHlfUVAFWjnnGLDw7SFQ4HyaNJTKsBpRnIUmZ4MJfTpV2Tja2sGBob8t%2FYBOwPg4B9KQFdPW1OPfMgjWGLmoNnvK%2B7Xk5pLTi0Nm0sSkarZn8WOVFoFLAVGzWdziJjUWejKUngfyaD6pmb7xuumAQQYkc9tL5M937F0L3sh3ah%2FZ%2BhR7WyDQ4OeD7cn5WD8kB6g%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230619T091836Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5AAHQA6MZMRDF3HN%2F20230619%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=d229601f7d23c78c1b8db1c2d849ff7bfda46a4dbc7cd551a97ef9c2fd8d9845 "Cachegrind Analysis Time spent")

You can also see which one was the most expensive in terms of memory:
![Cachegrind Analysis Memory used](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-setup-x-debug-profiling/qcachegrind-memory-used.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDEaDGV1LWNlbnRyYWwtMSJHMEUCIQDTo6R8WnF2PEP8Vn1c0Cl4eH%2FAanW%2FDm8fxd6Uk6Y5kwIgKOn23ZRDYGxLSz9pjGD2MpCbvZHQXy8VLtfRy7NkU9kq%2FQMIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARADGgw4OTMzNjg5MjgxNTMiDGRMhxKRUyXn2OcGPCrRA9csW9a4nj3rGhOEXtjpaLC%2Bk6sov2bokmQZNbUrCo0vdMuOmCOfQZyyqKgbuQZA2QnsmXHY3Z1AVJNEH3DZgfbwnNy0FohpZeSdRxU0S9rrZ7nkcScNRfsRajEu%2BN9KK%2FS2e%2BuOgmEg1aO59c%2FDnm357%2Bszs1VkyYDucWw8g4jEi0X8%2FxdEJ4%2BdhWwhhxeiB3869VUg2T2LSLebHx5Yt6VDdfry0viJ6%2B%2FVWypbDvHNv2BZzHf%2FP%2FbPfXR2XDjcFUx9Lm7t5tUjzmAWRm9dA7dd%2Bnl0873PHUTICYmZtNCej%2FE%2FXc1E5NIQhT1n8M2nyhjFhdAyGkEJvTwWMcRR%2BMFByyYRB4YYTu%2FT6IPuj9XgStLKbPtMpdthhuKPBj3vaEbIlpwo0lFArlvkfl3s1XAarUJEhj4J%2BW0z3hAgu%2FtlH%2FtY79Cy9PNgBuy%2F5MLJgQkpejiYRYDKqveOqVyLuDOpQelqfcPJLcyu88Uo6a3btyHwXBCfrBlybeAN4yzl5BmkpGXYueYkakrPR4CKLB1GKTqyLk5Kgokm6lOkNA%2Fu0UoP6ELfmwlmrZAVTeo4tb64vAp%2F4VPL7hEgdro1Dq88ON6rPAuEe4uvgwTzcSLNSjCUt8CkBjqUAsM%2BLhU%2BvxGQra4xTl%2FP2L5gBFrb1GfeCo5wuE8pWGVmngS0%2F8rGaA2LQ17Llr2ZUZP4R75On222L4yk9iT%2BsGlWHIN10UvPTffzIeeKXYGDyXUhHdMLGoPGBjzG3%2BIaa53z%2BbaQ5qNfgobyxB0XLEiDX40%2FoPOJXjp6ISfP45Hv1LqQHlfUVAFWjnnGLDw7SFQ4HyaNJTKsBpRnIUmZ4MJfTpV2Tja2sGBob8t%2FYBOwPg4B9KQFdPW1OPfMgjWGLmoNnvK%2B7Xk5pLTi0Nm0sSkarZn8WOVFoFLAVGzWdziJjUWejKUngfyaD6pmb7xuumAQQYkc9tL5M937F0L3sh3ah%2FZ%2BhR7WyDQ4OeD7cn5WD8kB6g%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230619T091836Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5AAHQA6MZMRDF3HN%2F20230619%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=d229601f7d23c78c1b8db1c2d849ff7bfda46a4dbc7cd551a97ef9c2fd8d9845 "Cachegrind Analysis Memory used")
## Summary
XDebug Profiling provides us with powerful tools to analyse our applications and find out the reason for performance and stability issues. It is a valuable item in the toolbox of every developer and we hope that this guide here helps you to start profiling your Spryker project.

## Next steps
Once you have deployed your application you can use NewRelic APM to monitor its performance in real time. If you have not done so alredy, give our (integration)[https://docs.spryker.com/docs/scos/dev/the-docker-sdk/202212.0/configure-services.html#new-relic] guide a look.
