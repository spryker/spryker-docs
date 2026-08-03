---
title: Import a simple product and a product family
description: Learn how to use the Product Experience Management CSV import to create a simple product with one concrete product, and a product family with multiple concrete products.
last_updated: Jul 29 2026
template: howto-guide-template
related:
  - title: Product Experience Management feature overview
    link: docs/pbc/all/product-experience-management/latest/product-experience-management.html
  - title: "Import file details: product.csv"
    link: docs/pbc/all/product-experience-management/latest/import-file-details-product.csv.html
---

This document shows how to use the [Product Experience Management](/docs/pbc/all/product-experience-management/latest/product-experience-management.html) CSV import to create two common product setups:

- A *simple product*: one abstract product with a single concrete product.
- A *product family*: one abstract product with multiple concrete products, differentiated by a localized attribute such as power output.

For the full list of supported columns, see [Import file details: product.csv](/docs/pbc/all/product-experience-management/latest/import-file-details-product.csv.html).

{% info_block infoBox "Example values" %}

The examples in this document use one locale (`en_US`), one store (`DE`), one currency (`EUR`), the `DEFAULT` price mode, and the `Berlin` warehouse. Replace these with the locales, stores, currencies, price modes, and warehouses configured in your project.

{% endinfo_block %}

## Prerequisites

Before you import products, [install the Product Experience Management feature](/docs/pbc/all/product-experience-management/latest/install-the-product-experience-management-feature.html).

## Create an import job

Both examples use the same import job.

1. In the Back Office, go to **Import & Export** > **Import**.
2. Click **Create Import Job**.
3. In **Name**, enter, for example, `Product CSV`.
4. In **Type**, select **products-csv-import**.
5. Click **Save**.

## Example 1: Import a simple product

The following CSV file creates one abstract product, `VALVE-H300`, with a single concrete product, `Valve-H300-001`. The first row is the abstract row, where `Concrete SKU` is empty. The second row is the concrete row:

| Abstract SKU | Concrete SKU | Product Status | Name (en_US) | Description (en_US) | Attributes (en_US) | Stores | Categories | Tax Set Name | URL (en_US) | Price (Default-DE-EUR-Gross) | Stock (Berlin) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| VALVE-H300 | | approved | Hydraulic Valve H300 | Industrial hydraulic directional control valve for high-pressure fluid power systems, rated for continuous operation up to 350 bar. | brand=HydraForce;maxpressure=350 bar | DE | valves_fittings | Standard Tax | /hydraulic-valve-h300 | 1890.00 | |
| VALVE-H300 | Valve-H300-001 | Active | Hydraulic Valve H300 | Industrial hydraulic directional control valve for high-pressure fluid power systems, rated for continuous operation up to 350 bar. | | | | | | 1890.00 | NOOS |

{% info_block infoBox "Why the row is duplicated" %}

`Name`, `Description`, and `Price` are repeated on both rows because they're set on the abstract row and on every concrete row belonging to the same product. `Attributes`, `Stores`, `Categories`, `Tax Set Name`, and `URL` are abstract-level, so they're set only on the abstract row. `Stock` is concrete-level, so it's set only on the concrete row. The `NOOS` value means Never Out Of Stock: the concrete product is always available, regardless of the actual stock quantity.

{% endinfo_block %}

To import the file:

1. On the **Import Jobs** list, in the row of the import job you created, click **Create Run**.
2. On the **Upload CSV** page, under **Step 2: Upload Filled CSV**, click **Choose File** and select the CSV file.
3. Click **Upload & Queue Import**. This creates an import job run with the *pending* status.
4. On the **Import Jobs** list, click **Runs** in the row of the import job, and open the import job run to verify it completed with the *done* status and two successful rows: one for the abstract row and one for the concrete row.

{% info_block infoBox "Processing happens automatically" %}

You don't need to trigger the import yourself. The `import:job:run` console command runs on a schedule in the background and picks up pending runs automatically, so the run moves from *pending* to *processing* to *done* on its own, usually within a minute.

{% endinfo_block %}

{% info_block infoBox "Downloading an empty template" %}

The **Upload CSV** page also lets you download an empty CSV template under **Step 1: Download Template**. The template contains the column headers described in [Import file details: product.csv](/docs/pbc/all/product-experience-management/latest/import-file-details-product.csv.html), with no example rows.

{% endinfo_block %}

## Example 2: Import a product family

The following CSV file creates one abstract product, `VALVE-H800`, with three concrete products that share the same name, category, and `brand` attribute, but differ by the `poweroutput` attribute, by price, and by stock. The first row is the abstract row. Each of the following rows is a concrete row:

| Abstract SKU | Concrete SKU | Product Status | Name (en_US) | Description (en_US) | Attributes (en_US) | Stores | Categories | Tax Set Name | URL (en_US) | Price (Default-DE-EUR-Gross) | Stock (Berlin) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| VALVE-H800 | | approved | Hydraulic Valve H800 | Industrial hydraulic directional control valve for high-pressure fluid power systems. Available in 40 kW, 60 kW, and 80 kW power variants. | brand=HydraForce | DE | valves_fittings | Standard Tax | /hydraulic-valve-h800 | 1890.00 | |
| VALVE-H800 | Valve-H800-001 | Active | Hydraulic Valve H800 40 kW | Industrial hydraulic directional control valve for high-pressure fluid power systems. This variant delivers an output power of 40 kW. | poweroutput=40 kW | | | | | 1890.00 | 12 |
| VALVE-H800 | Valve-H800-002 | Active | Hydraulic Valve H800 60 kW | Industrial hydraulic directional control valve for high-pressure fluid power systems. This variant delivers an output power of 60 kW. | poweroutput=60 kW | | | | | 2090.00 | 8 |
| VALVE-H800 | Valve-H800-003 | Active | Hydraulic Valve H800 80 kW | Industrial hydraulic directional control valve for high-pressure fluid power systems. This variant delivers an output power of 80 kW. | poweroutput=80 kW | | | | | 2290.00 | 5 |

{% info_block infoBox "Grouping concrete products" %}

The import step groups rows by `Abstract SKU`. All rows with the same `Abstract SKU` value belong to the same product: the row with an empty `Concrete SKU` sets the abstract-level data, and each row with a `Concrete SKU` creates or updates one concrete product within that product family. The `brand` attribute is shared by all three concrete products, so it's set once, on the abstract row. The `poweroutput` attribute differs per concrete product, so it's set on each concrete row instead. The import step merges the two: each concrete product ends up with both `brand=HydraForce` and its own `poweroutput` value.

{% endinfo_block %}

To import the file, repeat the same steps as in [Example 1](#example-1-import-a-simple-product): create a run on the import job, upload the file, and verify the import job run.

After the run completes, the Back Office shows one abstract product, Hydraulic Valve H800, with three concrete products, one per power output variant.
