---
title: "Merchant Portal: Import Products"
description: Learn how to import products via the Merchant Portal.
last_updated: Aug 26, 2025
template: back-office-user-guide-template
---

To import products in the Merchant Portal, follow these steps:

1. In the Merchant Portal, go to **Data Import**.
2. On the **Data Import** page, click **Start Import**.  
   This opens the **Start Import** drawer.
3. Optional: If you don't have a product file prepared, under **File Templates**, click **CSV template Product**.
4. In **Import Configuration**, select **Product** and choose the file with products from your machine.  
   The file name is displayed next to **Choose File**.
5. To import the selected file, click **Import**.  
   The imported file will be listed on the **Data Import** page. If there are no errors, the status will be **Successful**.

## Reference Information: Product Import File

{% info_block infoBox "Important Note" %}

- Some editors change symbols depending on your location. To ensure successful imports, we recommend using Google Sheets to edit import files.

{% endinfo_block %}

This section explains how to fill out a product import file.

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| ------ | -------- | --------- | -------------| ---------------- |
| abstract_sku | ✓ | String | 009 | SKU identifier of the abstract product. Required only if an abstract product is created or updated. See `assigned_product_type`. |
| is_active | ✓ (create only) | Boolean | 1 | Status of the concrete product. Can be active (1) or inactive (0). Required if the concrete product does not exist. |
| concrete_sku | ✓ | String | 009_123456 | SKU identifier of the concrete product. Required only if a concrete product is created or updated. See `assigned_product_type`. |
| store_relations |  | String | DE;AT | Product availability in stores. Supports multiple values separated by `;`. |
| product_abstract.categories |  | String | cables;camcorders | Product category assignments. Supports multiple values separated by `;`. |
| product.%ATTRIBUTE_KEY% <br> Example: `product.color` |  | String | green;blue | Product attributes. Supports multiple values separated by `;`. |
| product.name.LOCALE <br> Example: `product.name.en_US` | ✓ (create only) | String | Video Camera | Name of the concrete product. |
| product.description.LOCALE <br> Example: `product.description.en_US` |  | String | This is a budget-friendly video camera. | Description of the concrete product. |
| product_abstract.name.LOCALE <br> Example: `product_abstract.name.en_US` | ✓ (create only) | String | Video Camera | Name of the abstract product. |
| product_abstract.description.LOCALE <br> Example: `product_abstract.description.en_US` |  | String | This is a budget-friendly video camera. | Description of the abstract product. |
| product_abstract.meta_title.LOCALE <br> Example: `product_abstract.meta_title.en_US` |  | String | Affordable Video Camera | Meta title of the abstract product. |
| product_abstract.meta_description.LOCALE <br> Example: `product_abstract.meta_description.en_US` |  | String | Discover an affordable video camera that delivers excellent quality and performance. | Meta description of the abstract product. |
| product_abstract.meta_keywords.LOCALE <br> Example: `product_abstract.meta_keywords.en_US` |  | String | affordable video camera, cheap video camera, budget video camera | Meta keywords of the abstract product. |
| product_abstract.tax_set_name | ✓ (create only) | String | Taxed Goods | Tax set name assigned to the abstract product. |
| product_abstract.new_from |  | Date | 2025-06-01 00:00:00 | Start date of product availability. |
| product_abstract.new_to |  | Date | 2025-06-15 00:00:00 | End date of product availability. |
| product.assigned_product_type <br> Example: `concrete` | ✓ | String | concrete | Defines the type of fields being imported: <br> **abstract** — Only abstract fields are imported. <br> **concrete** — Only concrete fields are imported. <br> **both** — Both abstract and concrete fields are imported. |
| product_abstract.url.LOCALE | ✓ (create only) | String | /de/mydemo-product | URL of the product in the specified locale. |
| product.is_quantity_splittable |  | Boolean | 1 | Defines if the product is splittable. |
| product.is_searchable.LOCALE <br> Example: `product.is_searchable.en_US` |  | Boolean | 1 | Defines if the product is searchable in the given locale. |
| product_stock.%WAREHOUSE_NAME%.quantity <br> Example: `product_stock.Warehouse1.quantity` |  | Integer | 10 | Number of product items in stock for the specified warehouse. |
| product_stock.%WAREHOUSE_NAME%.is_never_out_of_stock <br> Example: `product_stock.Warehouse1.is_never_out_of_stock` |  | Boolean | 1 | Used for non-tangible products (e.g., software, services). Set to 1 (true) if the product never runs out of stock. |
| product_price.%STORE%.%PRICE_TYPE%.%CURRENCY%.value_net <br> Example: `product_price.DE.default.EUR.value_net` |  | Integer | 10077 | Net price of the product. Example: `10077` = **100.77€**. |
| product_price.%STORE%.%PRICE_TYPE%.%CURRENCY%.value_gross <br> Example: `product_price.DE.default.EUR.value_gross` |  | Integer | 10077 | Gross price of the product. Example: `10077` = **100.77€**. <br>`PRICE_TYPE` can be **default** or **original**. |
| abstract_product_price.%STORE%.%PRICE_TYPE%.%CURRENCY%.value_net <br> Example: `abstract_product_price.DE.default.EUR.value_net` |  | Integer | 10077 | Net price of the abstract product. Example: `10077` = **100.77€**. |
| abstract_product_price.%STORE%.%PRICE_TYPE%.%CURRENCY%.value_gross <br> Example: `abstract_product_price.DE.default.EUR.value_gross` |  | Integer | 10077 | Gross price of the abstract product. Example: `10077` = **100.77€**. |
| product_image.%LOCALE%.%IMAGE_SET_NAME%.sort_order <br> Example: `product_image.en_US.default.sort_order` |  | Integer | 10 | Display order of images. Required if an image set name is provided. |
| product_image.%LOCALE%.%IMAGE_SET_NAME%.external_url_large <br> Example: `product_image.en_US.default.external_url_large` |  | String | https://example.com/image.png | External link to the large version of the product image. Required if an image set name is provided. |
| product_image.%LOCALE%.%IMAGE_SET_NAME%.external_url_small <br> Example: `product_image.en_US.default.external_url_small` |  | String | https://example.com/image.png | External link to the small version of the product image. Required if an image set name is provided. |
| abstract_product_image.%LOCALE%.%IMAGE_SET_NAME%.sort_order <br> Example: `abstract_product_image.en_US.default.sort_order` |  | Integer | 10 | Display order of images for the abstract product. Required if an image set name is provided. |
| abstract_product_image.%LOCALE%.%IMAGE_SET_NAME%.external_url_large <br> Example: `abstract_product_image.en_US.default.external_url_large` |  | String | https://example.com/image.png | External link to the large version of the abstract product image. Required if an image set name is provided. |
| abstract_product_image.%LOCALE%.%IMAGE_SET_NAME%.external_url_small <br> Example: `abstract_product_image.en_US.default.external_url_small` |  | String | https://example.com/image.png | External link to the small version of the abstract product image. Required if an image set name is provided. |

## Error Management  

If a file contains mistakes, the status of the import will change to `Failed`.  
An error file can be downloaded and analyzed to identify the issues.  

- Only the first error is processed per imported line.  
  - If a line contains multiple mistakes, you will need to re-import the file after fixing the first error to see the next one.  
- If a file contains several lines with mistakes, only those lines will not be imported.  
  - All other lines will be processed successfully.  

## Default Approval Status  

By default, products are imported with the approval status **Waiting for Approval**.  
This behavior can be customized at the project level by configuring an alternative status.  
