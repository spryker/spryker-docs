---
title: 'Fatal error: Allowed memory size of x bytes exhausted'
description: Solution to the error about exhausted memory
template: troubleshooting-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/troubleshooting/troubleshooting-general-issues/fatal-error-allowed-memory-size-of-x-bytes-exhausted.html
---

One of the following errors is returned in the error log:

```text
Fatal error: Allowed memory size of x bytes exhausted (tried to allocate x bytes) in {FILE_NAME}
```

```text
PHP Fatal error: Out of memory (allocated x) (tried to allocate x bytes) in {FILE_NAME}
```



## Solution

Increase `memory_limit` as described in [image: php:](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html#image-php).


{% info_block infoBox "Memory limit for a single command" %}

If the issue appears only when running a CLI command, alternatively you can set the memory limit only for the command as follows:

```bash
php -d memory_limit=2G {COMMAND}
```

{% endinfo_block %}
