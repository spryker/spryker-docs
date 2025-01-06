---
title: spryker-sdk command not found
description: Learn how to Troubleshooting and resolve for the Spryker SDK command not found within your spryker projects.
template: concept-topic-template
redirect_from:
- /docs/sdk/dev/troubleshooting/spryker-sdk-command-not-found.html

last_updated: Jan 18, 2023
---
## Troubleshooting

### `spryker-sdk` command not found.

The `spryker-sdk` command cannot be found.

### Description

The `spryker-sdk` command cannot be found.

### Cause

The command might not exist in your file.

### Solution

1. Add the command manually to your `shell rc` file. Depending on your shell it can be `~/.bashrc`, `~/.zshrc`, `~/.profile`, and other names.

```shell

echo alias spryker-sdk={sdk_folder}/bin/spryker-sdk.sh

```

2. Run `source {rc file}` to load the `spryker-sdk` alias for the current session.
