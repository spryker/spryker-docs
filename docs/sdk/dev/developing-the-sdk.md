---
title: Developing the SDK
description: For the Spryker SDK development, you build it as a Docker container and run it in the development or debug mode. 
template: howto-guide-template
---

To make changes to the existing Spryker SDK, you build it as a Docker container and then run it in the development or debug mode. 

## Building the dev container

To build the SDK and tag it, run the command:

```bash
docker pull spryker/php-sdk:latest
#Create new image with enabled debug spryker/php-sdk-debug:latest image
docker build -f {path to SDK}/infrastructure/sdk.debug.Dockerfile -t spryker/php-sdk-debug:latest {path to SDK}
spryker-sdk --mode=dev
```

## Running SDK in the development mode

To run SDK in the development mode, do the following:

1. Make sure you have (Mutagen)[https://mutagen.io/documentation/introduction/installation] installed.
2. Run `spryker-sdk --mode=dev`.

## Running SDK in the debug mode
To start an Xdebug session with the serverName `spryker-sdk` that you should configure in PHPStorm, run the command: `spryker-sdk --mode=debug <task>`

## Handy commands
The following table lists some helpful commands to use during your development:

| Command  |  Description | 
|---|---|
| `rm db/data.db && spryker-sdk sdk:init:sdk`  | Resets SDK  |
| `cd <project> && rm -f .ssdk && rm -f .ssdk.log && spryker-sdk sdk:init:project` | Resets project  | 

## Troubleshooting

If you face issues with:
- Pulling container from the Docker registry
- File permissions and ownership on files created by the SDK

you can build your own container from the SDK sources. Refer to [Building flavored Spryker SDKs](/docs/sdk/dev/building-flavored-spryker-sdks.html) for details.
