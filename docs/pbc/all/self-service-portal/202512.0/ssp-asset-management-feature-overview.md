---
title: SSP Assets Management feature overview
description: The Asset Management feature allows customers abd Back Office users to manage assets within the organization.
template: concept-topic-template
last_updated: Dec 18, 2025
---


The SSP Asset Management feature lets you manage assets in your organization and use them as an entry point to an asset-based spare parts and services catalog.

An asset is an item, piece of equipment, or resource that holds value and that a business tracks.
You can group assets into models. Models define which spare parts and services are compatible with each asset. For more information, see:

- [Self-Service Portal Models feature overview](/docs/pbc/all/self-service-portal/{{page.version}}/ssp-model-management-feature-overview.html)
- [Self-Service Portal asset-based catalog feature overview](/docs/pbc/all/self-service-portal/{{page.version}}/ssp-asset-based-catalog-feature-overview.html)

![assets](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/self-service-portal/ssp-assets-management-feature-overview.md/my-assets.png)


Back Office users also can manage assets, update statuses, and edit company and business unit information.

## Asset parameters

Assets have the following parameters:

- Image
- Name
- Serial Number
- Status
- Note
- Business Units
- Business Unit Owner

## Adding assets on the Storefront

On the Storefront, company account users can add assets in the **Customer Account** > **Assets**.

![add-assets-storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/self-service-portal/ssp-assets-management-feature-overview.md/add-assets-storefront.md.png)

All added assets receive a pending status by default. A company user with approve permissions need to approve the added asset to make it available. Once an asset is approved, company users can create inquiries about the asset.
For more information on inquiries, see [Inquiry Management feature overview](/docs/pbc/all/self-service-portal/{{page.version}}/ssp-inquiry-management-feature-overview.html)


## Adding assets in the Back Office

If you need to add assets to multiple companies or business units simultaneously, it's more efficient to do it in the Back Office.

For instructions, see [Add assets](/docs/pbc/all/self-service-portal/{{page.version}}/manage-in-the-back-office/back-office-add-ssp-assets.html).



## Asset management permissions

A company user can have the following permissions related to asset management:

- View company assets
- View business unit assets
- Update assets
- Unassign business unit assets
- Create assets

For more information on company account permissions, see [Company user roles and permissions overview](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/company-user-roles-and-permissions-overview).

## Related Developer documents

| INSTALLATION GUIDES                                                                                                                        |
|--------------------------------------------------------------------------------------------------------------------------------------------|
| [Install the SSP Asset Management feature](/docs/pbc/all/self-service-portal/{{page.version}}/install/install-the-ssp-asset-management-feature.html) |












