---
title: Migrate from OpenSearch 1.3 to 3.5
description: Learn how to migrate your Spryker project's OpenSearch cluster from version 1.3 to 3.5 by upgrading through intermediate major versions and reindexing incompatible indexes.
last_updated: Aug 26, 2026
template: howto-guide-template
---

This document describes how to migrate an OpenSearch cluster used by a Spryker project from version 1.3 to 3.5.

Between major OpenSearch versions, an index or a cluster setting can become incompatible with the target version, for example because of an outdated Lucene index format, a deprecated setting, or a breaking plugin change. OpenSearch does not support skipping major versions and cannot be upgraded in place while such incompatibilities exist, so the upgrade is blocked until you resolve them. To resolve this, you upgrade the cluster incrementally, from 1.3 to 2.19, and then from 2.19 to 3.5, fixing every incompatibility before each upgrade.

{% info_block warningBox "Verification" %}

Before you start, test the migration in a non-production environment. Blocking writes to an index makes it read-only until the reindexing is complete, so plan the migration for a maintenance window.

{% endinfo_block %}

## 1. Update the required modules

You only need to update the packages for the features used in your project. Check the following table and update the packages that are installed in your project to at least the specified versions:

| Package | Minimum version |
| --- | --- |
| `spryker/sales-return-search` | 1.4.1 |
| `spryker/merchant-search` | 1.3.1 |
| `spryker/product-review` | 2.15.1 |
| `spryker/search-elasticsearch` | 1.23.1 |
| `spryker/service-point-search` | 1.4.1 |
| `spryker-feature/self-service-portal` | 20.9.1 |

Update the packages installed in your project using Composer:

```bash
composer update spryker/merchant-search:"^1.3.1" spryker/product-review:"^2.15.1" spryker/sales-return-search:"^1.4.1" spryker/search-elasticsearch:"^1.23.1" spryker/service-point-search:"^1.4.1" spryker-feature/self-service-portal:"^20.9.1"
```

If your project overrides the search schema of these modules, apply the equivalent changes to your project-level search schema as well.

## 2. Check the upgrade eligibility

Consult the breaking changes and deprecation notices for OpenSearch 2.19, and check your indexes and cluster settings against them to determine whether the cluster is eligible for the upgrade.

- If the cluster is eligible, upgrade it to 2.19 and continue to [Check the upgrade eligibility for 3.5](#check-the-upgrade-eligibility-for-35).
- If the cluster is not eligible, one or more incompatibilities block the upgrade.
  - For an index with an incompatible index format, unblock the upgrade by reindexing it as described in the following section.
  - For any other incompatibility, for example a deprecated index setting or a breaking plugin change, fix it first. Only continue with the upgrade after all the incompatibilities are resolved.

## 3. Reindex an index to unblock the upgrade

Repeat the following steps for every index with an incompatible index format. Replace `<index>` with the name of the index you are migrating.

### 3.1. Block writes to the index

To prevent data from changing while the index is being cloned, block write operations:

```json
PUT /<index>/_settings
{
  "settings": {
    "index.blocks.write": true
  }
}
```

### 3.2. Clone the index

Clone the index into a temporary index:

```json
PUT /<index>/_clone/<index>_tmp
```

### 3.3. Verify the document count

Compare the document count of `<index>` and `<index>_tmp`. The counts must match before you continue.

### 3.4. Delete the original index

```json
DELETE /<index>
```

### 3.5. Re-create the index and its schema

Re-create the index and install its schema using the following console command:

```bash
console search:setup:sources
```

### 3.6. Reindex the documents

Reindex the documents from the temporary index back into the newly created `<index>`:

```json
POST /_reindex?slices=2&wait_for_completion=false
{
  "source": {
    "index": "<index>_tmp"
  },
  "dest": {
    "index": "<index>"
  }
}
```

### 3.7. Verify the document count again

Compare the document count of `<index>` and `<index>_tmp` again. The counts must match before you continue.

### 3.8. Delete the temporary index

```json
DELETE /<index>_tmp
```

After you reindex all the blocking indexes, upgrade the cluster to version 2.19.

## 4. Check the upgrade eligibility for 3.5

Consult the breaking changes and deprecation notices for OpenSearch 3.5, and check your indexes and cluster settings on version 2.19 against them to determine whether the cluster is eligible for the upgrade.

- If the cluster is eligible, upgrade it to 3.5.
- If the cluster is not eligible, incompatibilities again block the upgrade. Resolve them the same way as in step 2: reindex every index with an incompatible index format by repeating the steps in [3. Reindex an index to unblock the upgrade](#3-reindex-an-index-to-unblock-the-upgrade), and fix any other incompatibility. Then upgrade the cluster to 3.5.
