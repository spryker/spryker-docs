---
title: Uninstall the Marketplace from B2B Demo Marketplace
description: Learn how to transform your B2B Demo Marketplace into a standard B2B Demo Shop by removing all marketplace-specific features using the provided uninstallation scripts.
last_updated: Feb 9, 2026
template: concept-topic-template
related:
  - title: B2B Suite
    link: docs/about/all/b2b-suite.html
  - title: Marketplace B2B Suite
    link: docs/about/all/spryker-marketplace/marketplace-b2b-suite.html
---

This document describes how to uninstall marketplace features from
the [B2B Demo Marketplace](https://github.com/spryker-shop/b2b-demo-marketplace) to transform it into a standard B2B
Demo Shop.

## Overview

The B2B Demo Marketplace comes with all marketplace-specific features pre-installed, including the Merchant Portal,
marketplace product management, and merchant-related functionality. If you want to use the B2B Demo Marketplace as a
starting point for a standard B2B project without marketplace features, you can use the provided uninstallation scripts
to remove all marketplace-specific components.

The uninstallation process consists of two main scripts:

| Script                              | Purpose                                                                                                                                    |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `uninstall-marketplace-modules.sh`  | Removes backend marketplace features, including Composer packages, PHP dependency providers, configuration files, and data import entities |
| `uninstall-frontend-marketplace.sh` | Removes frontend marketplace files, including Merchant Portal configuration, Angular dependencies, and frontend build configurations       |

## Prerequisites

Before you begin the uninstallation process, make sure you have the following:

- A working B2B Demo Marketplace installation based
  on [https://github.com/spryker-shop/b2b-demo-marketplace](https://github.com/spryker-shop/b2b-demo-marketplace)
- Docker SDK installed and configured
- Python 3 installed on your system
- Node.js and npm installed
- Sufficient disk space for rebuilding the application

## Uninstall marketplace features

### 1. Locate the uninstallation scripts

The uninstallation scripts are included in the B2B Demo Marketplace repository. After cloning the repository, you can
find them in the root directory:

- [uninstall-marketplace-modules.sh](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/uninstall-marketplace-modules.sh) -
  Backend uninstallation script
- [uninstall-marketplace-config.json](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/uninstall-marketplace-config.json) -
  Configuration file for the backend script
- [uninstall-frontend-marketplace.sh](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/uninstall-frontend-marketplace.sh) -
  Frontend uninstallation script

### 2. Make the scripts executable

Run the following commands to make the scripts executable:

```bash
chmod +x uninstall-marketplace-modules.sh
chmod +x uninstall-frontend-marketplace.sh
```

### 3. Run the backend uninstallation script

Execute the backend uninstallation script to remove all marketplace-specific backend components:

```bash
./uninstall-marketplace-modules.sh
```

This script performs the following operations:

1. **Removes Marketplace Features**: Uninstalls all `spryker-feature/marketplace-*` Composer packages
2. **Removes Marketplace Core Modules**: Uninstalls individual `spryker/*` marketplace modules
3. **Cleans PHP Dependency Providers**: Removes marketplace-specific plugins, event subscribers, and configurations from
   dependency provider files
4. **Updates Configuration Files**: Removes marketplace-related settings from configuration files
5. **Removes Marketplace Directories**: Deletes marketplace-specific module directories from `src/Pyz/`
6. **Updates Data Import Configuration**: Removes marketplace data import entities from YAML import files
7. **Updates Docker Configuration**: Removes Merchant Portal commands from Docker installation files
8. **Updates Deploy Files**: Removes Merchant Portal application definitions from deploy files
9. **Processes XML and Test Files**: Updates OMS configurations and test files as needed

The script displays progress messages for each step. Review the output to make sure all operations complete
successfully.

### 4. Run the frontend uninstallation script

After the backend uninstallation completes, execute the frontend uninstallation script:

```bash
./uninstall-frontend-marketplace.sh
```

This script performs the following operations:

1. **Removes Frontend Configuration Files**: Deletes `tsconfig.mp.json`, `.stylelintrc.mp.js`, and `angular.json`
2. **Removes Frontend Directories**: Deletes the `frontend/merchant-portal` directory
3. **Cleans ESLint Configuration**: Removes Merchant Portal configuration blocks from `eslint.config.mjs`
4. **Cleans package.json**: Removes `mp:*` scripts and Angular-related dependencies
5. **Updates npm Dependencies**: Runs `npm install` to update the dependency tree
6. **Installs Required Packages**: Installs `@babel/core` and `@babel/runtime` packages
7. **Cleans npm Cache**: Removes the `node_modules/.cache` directory

### 5. Rebuild the application

After both scripts complete, rebuild your application to apply the changes:

```bash
docker/sdk clean && docker/sdk boot deploy.dev.yml && docker/sdk up
```

{% info_block infoBox "Info" %}

Use the deploy file appropriate for your environment. For production-like environments, use `deploy.yml` instead of
`deploy.dev.yml`.

{% endinfo_block %}

### 6. Verify the uninstallation

To verify that the marketplace features have been successfully removed:

1. Check that the Merchant Portal is no longer accessible
2. Verify that marketplace-specific database tables are not being used
3. Check that no marketplace-related errors appear in the application logs
4. Test the B2B storefront functionality to ensure it works correctly

## What gets removed

The uninstallation scripts remove the following components:

<details>
<summary>Marketplace features removed</summary>

- `spryker-feature/marketplace-agent-assist`
- `spryker-feature/marketplace-cart`
- `spryker-feature/marketplace-comments`
- `spryker-feature/marketplace-merchant-commission`
- `spryker-feature/marketplace-merchant-contract-requests`
- `spryker-feature/marketplace-merchant-contracts`
- `spryker-feature/marketplace-merchant-custom-prices`
- `spryker-feature/marketplace-merchant-order-threshold`
- `spryker-feature/marketplace-merchant-portal-product-management`
- `spryker-feature/marketplace-merchant-portal-product-offer-management`
- `spryker-feature/marketplace-merchant-portal-product-offer-service-points`
- `spryker-feature/marketplace-merchant-portal-product-offer-shipment`
- `spryker-feature/marketplace-merchantportal-core`
- `spryker-feature/marketplace-order-management`
- `spryker-feature/marketplace-packaging-units`
- `spryker-feature/marketplace-product-approval-process`
- `spryker-feature/marketplace-product-options`
- `spryker-feature/marketplace-promotions-discounts`
- `spryker-feature/marketplace-return-management`
- `spryker-feature/marketplace-shopping-lists`
- `spryker-feature/merchant-category`
- `spryker-feature/merchant-opening-hours`
- `spryker-feature/merchant-portal-data-import`
- `spryker-feature/product-approval-process`

</details>

<details>
<summary>Marketplace core modules removed</summary>

- `spryker/agent-dashboard-merchant-portal-gui`
- `spryker/agent-security-blocker-merchant-portal-gui`
- `spryker/agent-security-merchant-portal-gui`
- `spryker/availability-merchant-portal-gui`
- `spryker/cart-note-merchant-portal-gui`
- `spryker/category-merchant-commission-connector`
- `spryker/dashboard-merchant-portal-gui`
- `spryker/dummy-marketplace-payment`
- `spryker/merchant-app-merchant-portal-gui`
- `spryker/merchant-categories-rest-api`
- `spryker/merchant-discount-connector`
- `spryker/merchant-opening-hours-rest-api`
- `spryker/merchant-product-offer-shopping-lists-rest-api`
- `spryker/merchant-product-shopping-lists-rest-api`
- `spryker/merchant-products-rest-api`
- `spryker/merchant-profile-merchant-portal-gui`
- `spryker/merchant-sales-returns-rest-api`
- `spryker/merchant-shipments-rest-api`
- `spryker/merchants-rest-api`
- `spryker/multi-factor-auth-merchant-portal`
- `spryker/price-product-merchant-commission-connector`
- `spryker/product-merchant-commission-connector`
- `spryker/product-option-merchant-portal-gui`
- `spryker/sales-merchant-portal-gui`
- `spryker/security-blocker-merchant-portal-gui`
- `spryker/tax-merchant-portal-gui`

</details>

<details>
<summary>Directories removed</summary>

- `src/Pyz/Zed/MerchantPortalApplication`
- `src/Pyz/Zed/MerchantSalesOrder`
- `src/Pyz/Zed/MerchantOms`
- `src/Pyz/Zed/Merchant`
- `src/Pyz/Zed/MerchantUser`
- Other marketplace-specific module directories
- `public/MerchantPortal`

</details>

## Troubleshooting

### Script fails with "Configuration file not found" error

Make sure the `uninstall-marketplace-config.json` file is placed in the same directory as the
`uninstall-marketplace-modules.sh` script.

### Composer removal fails

If Composer fails to remove packages, try running the removal command manually with additional flags:

```bash
composer remove --ignore-platform-req=ext-grpc --ignore-platform-req=ext-redis PACKAGE_NAME
```

### Application fails to build after uninstallation

1. Clear all caches:

```bash
docker/sdk cli console cache:empty-all
```

2. Regenerate transfer objects:

```bash
docker/sdk cli console transfer:generate
```

3. Run a full rebuild:

```bash
docker/sdk clean && docker/sdk boot deploy.dev.yml && docker/sdk up
```

### Database errors after uninstallation

If you encounter database-related errors, you may need to drop and recreate your database:

```bash
docker/sdk cli console propel:install
```

{% info_block warningBox "Warning" %}

This command drops all existing data. Use it only in development environments or if you have a proper backup.

{% endinfo_block %}

## Customizing the uninstallation

The uninstallation behavior is controlled by the `uninstall-marketplace-config.json` configuration file. You can modify
this file to:

- Add or remove packages from the uninstallation list
- Adjust which files and directories are processed
- Customize the cleanup operations for specific files

For detailed information about the configuration file structure and available operations, see
the [UNINSTALL_MAINTENANCE_GUIDE.md](https://github.com/spryker-shop/b2b-demo-marketplace/blob/master/UNINSTALL_MAINTENANCE_GUIDE.md)
file.
