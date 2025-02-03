This document describes how to integrate the BO accessibility improvements into a Spryker project.

## Changes

- Adjusted current green and grey colors to the new one with bigger contrast ratio.
- Fixed pagination accessibility, so now disabled elements are skipped.
- Improved navigation accessibility.
- Added `lang` attribute to the HTML tag.


## Install Backoffice accessibility improvements

Follow the steps below to install the BO accessibility improvements.


### 1) Install the required modules using Composer

```bash
composer require spryker/gui:"~3.53.5"
```

### 2) Build Javascript and CSS changes

```bash
console frontend:zed:install-dependencies
console frontend:zed:build
```

## 3) Add translations

Generate translation cache for Zed:

```bash
console translator:generate-cache
```