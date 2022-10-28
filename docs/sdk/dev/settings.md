---
title: The Spryker SDK settings
description: There are three types of settings in the Spryker SDK - shared, local(private), and SDK.
template: howto-guide-template
---

The Spryker SDK has three types of settings: shared, local(private), and SDK.

## Shared setting

Shared setting is a project setting.
Shared settings are generated at the project *init* step and placed in the `.ssdk/setting` file in the target project.
This type of settings is shared across the team, these settings are not in `.gitignore`.

## Local (private) setting

Local setting is a project setting.
Local settings are generated at the project *init* step and placed in the `.ssdk/setting.local` file in the target project.
Local setting contains only private settings and should not be shared.

## SDK setting

This is the SDK setting. SDK settings are generated at the SDK *init* step and exist in the database.

## Setting inheritance

There are the following setting inheritance rules:

- SDK setting can be overwritten by the Shared or Local setting. That is, `SDK -> Shared -> Local`.The Spryker SDK has three types of settings: shared, local(private), and SDK.

## Shared setting

Shared setting is a project setting.
Shared settings are generated at the project *init* step and placed in the `.ssdk/setting` file in the target project.
This type of settings are shared across the team, they are not in `.gitignore`.

## Local (private) setting

Local setting is a project setting.
Local settings are generated at the project *init* step and placed in the `.ssdk/setting.local` file in the target project.
Local setting contains only private settings and should not be shared.

## SDK setting

This is the SDK setting. SDK settings are generated at the SDK *init* step and exist in the database.

## Setting inheritance

There are the following setting inheritance rules:

- SDK setting can be overwritten by the Shared or Local setting. That is, `SDK -> Shared -> Local`.
- Shared setting can be overwritten by the Local setting.