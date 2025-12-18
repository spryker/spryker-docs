---
title: Self-Service Portal asset-based catalog feature overview
description: Learn how the asset-based catalog uses models, assets, and product lists to show only compatible spare parts and services to customers.
template: concept-topic-template
last_updated: Dec 18, 2025
---

The *asset-based catalog* in the Self-Service Portal creates a personalized catalog of spare parts and services for each asset based on the asset's assigned model. This ensures users see only products that are compatible with the machines they own.

For details about models, see [Self-Service Portal Models feature overview](/docs/pbc/all/self-service-portal/latest/ssp-models-feature-overview.html).

## Key concepts

- **Model**: Groups assets that share spare-part and service compatibility rules.
- **Asset**: A specific machine owned by a customer, identified by attributes such as serial number and business unit.
- **Spare part product class**: A product classification that marks a product as a spare part.
- **Product list**: A curated list of spare parts and service products that are compatible with a model.

You define compatibility at the model level by assigning product lists to a model. Assets inherit compatibility from their assigned model.

## How the asset-based catalog is built

To build an asset-specific catalog, you typically follow these steps:

1. **Create a model and assign assets**  
   - Create a model that represents a machine family (for example, *Press Machine 1200 Series*).  
   - Assign all assets belonging to this machinery type to the model.

2. **Create spare part and service products**  
   - In the Product Back Office, create products that represent spare parts and services.  
   - For spare parts, use the dedicated *spare part* product class to distinguish them from regular products.

3. **Add products to product lists**  
   - Group compatible spare parts and services into product lists, for example:  
     - *P1200 Hydraulic Components*  
     - *Electrical Sensor Kit for Series 1200*  
     - *Maintenance Kit Type A*

4. **Assign product lists to models**  
   - Assign one or more product lists to each model.  
   - All assets assigned to the model now inherit compatibility with the products from these lists.

5. **Use the model relations in the storefront**  
   - When a user browses in an asset or model context, the storefront filters the catalog to products from the product lists assigned to that model.

## Storefront behavior

### Asset details page

On the asset details page in the Self-Service Portal, users can:

- Start a **Search for spare parts** flow that opens the catalog prefiltered for the selected asset/model.
- Start a **Search for services** flow that opens the catalog prefiltered for compatible service products.

### Catalog page

When you open the catalog from an asset or model context, you can filter it by:

- Model reference, name, or code
- Asset reference or name
- Asset serial number

The catalog shows only products that are compatible with the selected model or asset.

### Product detail page (PDP) compatibility check

On the PDP, a compatibility widget lets you:

- Select a model or asset from your fleet
- Check whether the current product is compatible
- See which assets in your fleet the product fits

This reduces the risk of ordering incorrect spare parts or services and helps customers understand how a product relates to their installed base.

## Example flow

1. A customer logs into the Self-Service Portal and opens **Customer Account** > **Assets**.
2. They select their printing machine asset and click **Search for spare parts**.
3. The catalog opens, showing only products from the product lists assigned to that asset's model.
4. The customer filters by product attributes (for example, category or price) but always stays within the compatible spare parts set.
5. On a spare part PDP, the compatibility widget confirms that this part is compatible with the selected asset and lists any other assets in their fleet that can use the same part.

The asset-based catalog therefore connects:

- A customer's installed assets
- The models those assets belong to
- The spare parts and services defined in product lists

to deliver an accurate, scalable, self-service after-sales catalog.


