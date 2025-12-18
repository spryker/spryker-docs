---
title: Self-Service Portal Models feature overview
description: Learn how Models group assets into logical families and define spare-part and service compatibility at scale in the Self-Service Portal.
template: concept-topic-template
last_updated: Dec 18, 2025
---

The *Models* capability in the Self-Service Portal lets you group assets into logical families (for example, machine types or generations) and maintain spare-part and service compatibility at the model level instead of per individual asset. This is the foundation for the asset-based spare parts and services catalog.

## What is a Model

A *model* represents a type, generation, or configuration of a machine or equipment line. Each model can have:

- Multiple **assets** that belong to this model.
- One or more **product lists** that define compatible spare parts and service products.

By centralizing compatibility rules on the model, you:

- Avoid maintaining compatibility for every single asset.
- Reduce errors in spare-part selection.
- Keep asset catalogs in sync as fleets grow.

## Relations between models, assets, and products

The core relations are:

- **Model → Assets**: All assets assigned to a model share the same compatibility rules.
- **Model → Product lists**: Each model can have one or more product lists with spare parts, consumables, and service products.
- **Assets → Product lists (via model)**: Assets do not reference spare parts directly. They inherit the product lists through their model.

This results in the following structure:

```text
Model
 ├── Assets (individual machines)
 └── Product lists
       └── Spare parts, consumables, service products
```

## Back Office model management

In the Back Office, operators can:

- Create and edit models (reference, name, code, image, and other attributes).
- Assign or remove assets from a model.
- Assign or remove product lists that contain spare parts and services.
- View all relations between a model, its assets, and the assigned product lists.

To keep data consistent:

- A model cannot be deleted while it still has assigned assets or product lists.
- Changes to model assignments immediately affect which products appear in the asset-based catalog.

## Storefront behavior

When a customer interacts with the storefront in a model context:

- The catalog can be filtered by model reference, model name, or model code.
- The compatibility widget on the product details page can check if a product is compatible with a selected model and show which assets in the customer’s fleet the product fits.

Models therefore act as the bridge between:

- The assets a customer owns, and
- The spare parts and services that are compatible with those assets.

## Example: Industrial machine series

1. An operator creates a model `PRESS-1200-SERIES` for a family of press machines.
2. All installed press machines of this series are registered as assets and assigned to this model.
3. The operator creates spare part products (for example, filters, seals, sensor kits) and adds them to product lists like **P1200 Hydraulic Components** or **P1200 Maintenance Kit**.
4. These product lists are assigned to the `PRESS-1200-SERIES` model.

Result:

- Any asset belonging to `PRESS-1200-SERIES` automatically uses these product lists as its compatible spare-part catalog.
- When a customer starts from such an asset or model in the storefront, they only see products from the assigned product lists.


