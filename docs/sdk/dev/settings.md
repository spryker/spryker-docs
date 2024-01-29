---
title: The Spryker SDK settings
description: There are three types of settings in the Spryker SDK - shared, local(private), and SDK.
template: howto-guide-template
last_updated: Nov 4, 2022
---

The Spryker SDK has three types of settings: shared, local (private), and SDK.

## Shared setting

The shared setting is a project setting.
Shared settings are generated at the project *init* step and placed in the `.ssdk/setting` file in the target project.
As this type of settings is shared across the team, these settings are not in `.gitignore`.

## Local (private) setting

The local setting is a project setting.
Local settings are generated at the project *init* step and placed in the `.ssdk/setting.local` file in the target project.
Local setting contains only private settings and should not be shared.

## SDK setting

This is the SDK setting. SDK settings are generated at the SDK *init* step and exist in the database.

## Setting inheritance

There are the following settings inheritance rules:

- The SDK setting can be overwritten by the Shared or Local setting. That is, `SDK -> Shared -> Local`.
