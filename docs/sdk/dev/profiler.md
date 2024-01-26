---
title: Profiler
description: For the Spryker SDK development, you build it as a Docker container and run it in the development or debug mode. 
template: howto-guide-template
last_updated: Nov 4, 2022
---

Profiler is available only in the dev environment.

## How to enable the profiler
To enable the profiler, add `SDK_PROFILER_ENABLED=1` into the `.env.dev.local` configuration.

## Usage
After you enable the profiler, the data is collected into the `<project-dir>/var/profiler` directory.
Each file represents a specific SDK process call.
You can manually clean or manage the files in the directory.

## Viewing the profiler data
To view the profiler data, start the viewer server with this command:

```shell
#start the server listening to the 8000 port
spryker-sdk --mode=docker sdk --profiler 8000
```
Now, the profiler data is available at `http://127.0.0.1:8000`.