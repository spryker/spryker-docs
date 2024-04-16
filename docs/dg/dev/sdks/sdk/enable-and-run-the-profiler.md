---
title: Enable and run the profiler
description: For the Spryker SDK development, you build it as a Docker container and run it in the development or debug mode.
template: howto-guide-template
redirect_from:
- /docs/sdk/dev/profiler.html

last_updated: Nov 4, 2022
---

The profiler collects data in `{PROJECT_FOLDER}/var/profiler`. Each file represents a specific SDK process call. You can manually clean or manage the files in the folder.

Profiler is available only in the dev environment.

## Enable the profiler

To enable the profiler, add `SDK_PROFILER_ENABLED=1` to the `.env.dev.local` configuration.

## Run the profiler

To view the profiler data, start the viewer server:

```shell
spryker-sdk --mode=docker sdk --profiler 8000
```

Now, the profiler data is available at `http://127.0.0.1:8000`.
