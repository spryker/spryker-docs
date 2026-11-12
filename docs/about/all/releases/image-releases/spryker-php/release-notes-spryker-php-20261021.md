---
title: Release notes for spryker-php 20261021
description: This document describes the changes that have been recently released.
last_updated: October 21, 2026
template: concept-topic-template
publish_date: "2026-10-21"
---

This document describes the changes that have been recently released.
For additional support with this content, contact our support.
If you found a new security vulnerability, contact us at **security@spryker.com**.

---

## Release notes for spryker-php 20261021

**Improvements**:

- Updated PHP to the latest patch versions to fix the CVE-2026-109618 and CVE-2026-109619 security vulnerabilities:
  - PHP 8.2.35
  - PHP 8.3.36
  - PHP 8.4.27
  - PHP 8.5.12

## Security fixes

### RCE via OOM corruption (CVE-2026-109618)

Recommended mitigations:

- Set `memory_limit=-1`, preferably in a way that applications cannot override, such as `php_admin_value` in the FPM pool or Apache configuration. Make sure that no pool, directory, or application setting restores a finite limit. This removes the controllable PHP memory limit failure, but an underlying allocation failure can still reach the vulnerable path.
- Set a low `post_max_size`:
  - For applications that do not require file uploads, set `post_max_size = 8M`.
  - For applications that require file uploads, set `post_max_size = 32M`.
  - Keep `upload_max_filesize` below `post_max_size`.
  - Consider enforcing limits at the web server or proxy level for decoded request size, input field count, multipart part count, header count, and nesting depth. These limits must also cover requests without a usable `Content-Length`.
- Use a container or cgroup limit as an availability boundary, preferably with a policy that kills only the affected worker. Do not use `RLIMIT_AS` or `RLIMIT_DATA` instead, because these limits can cause the vulnerable allocation failure.

### RCE via stale global state (CVE-2026-109619)

Recommended mitigations:

- Set `session.upload_progress.enabled=0` and restart every worker. Apply the setting in `php.ini`, an FPM pool, or a server configuration that applies before request parsing. Do not rely on `ini_set()` or FPM `.user.ini`. This blocks the confirmed session paths but not other variants.
- On PHP 8.5, set `fatal_error_backtraces=0` and restart every worker. This blocks only the confirmed fatal backtrace path.
- Remove invalid or deprecated per-request settings that emit diagnostics before initialization. Hiding diagnostics with `error_reporting`, `display_errors`, or `@` does not help.
- Fix attacker-reachable fatal errors and execution timeouts, including failures in callbacks, upload or import processing, and cleanup.

## Apply the PHP security update

To apply the PHP security fixes for CVE-2026-109618 and CVE-2026-109619, redeploy your environment as described in the following sections. You can repeat this process for multiple environments.

{% info_block warningBox "Warning" %}

A regular deployment alone does not regenerate the image because it reuses the cached image.

{% endinfo_block %}

### Prerequisites

- PHP 8.2 or later. If your environment runs an older PHP version, upgrade it to PHP 8.2 or later first.
- Write access to the repository.

### 1. Create a branch from the production branch

Create a branch from the branch that is currently deployed to production. Replace `<production-branch>` with the name of your production branch:

```bash
git checkout <production-branch>
git pull origin <production-branch>
git checkout -b php-update
```

### 2. Create an empty commit

```bash
git commit --allow-empty -m "chore: trigger PHP security update"
```

### 3. Push the branch to the remote repository

```bash
git push origin php-update
```

### 4. Create a pull request

From this step onward, repeat the instructions for each deployment branch, depending on your environment setup and workflow.

Create a pull request with the following configuration:

- **For production environments:**
  - **Source branch:** `php-update`
  - **Target branch:** `<production-branch>`
- **For lower environments:**
  - **Source branch:** `php-update`
  - **Target branch:** `<development-branch>`

### 5. Merge the pull requests

After each pull request passes the required checks and receives the necessary approvals, merge it into its target branch.

### 6. Trigger the regular deployment

Trigger the standard deployment process for each target environment:

- Deploy the development branch to the development environment.
- Deploy the production branch to the production environment.

After each deployment completes, verify that the environment is healthy and operational.
