---
title: FileResolver
description: Learn all about the FileResolver, a core part to file management within your Spryker Projects.
template: howto-guide-template
redirect_from:
- /docs/sdk/dev/spryks/fileresolver.html

last_updated: Nov 10, 2022
---

The FileResolver, located in `SprykerSdk\Spryk\Model\Spryk\Builder\Resolver\FileResolverInterface`, is a core part of the file management. It collects all the updated or created files and flushes them into the filesystem at the end of the Spryk command execution. All new or updated files must always be added to the FileResolver.

Normally, you shouldn't work with the file system directly through PHP functions like `file_put_contents`, `file_get_contents`, or `file_exists`. You must use `FileResolverInterface::hasResolved()`, `FileResolverInterface::resolve()`, and `FileResolverInterface::addFile()`.

{% info_block warningBox "Warning" %}

Never use `resolve` or `addFile` for core files or namespaces. You can just check these files or namespaces with `FileResolverInterface::hasResolved`.

{% endinfo_block %}
