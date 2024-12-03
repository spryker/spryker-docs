---
title: General Product Safety Regulation (GPSR)
description: The General product Safety Regulation (GPSR) and how Spryker can help customers meet the requirements for this new regulation.
last_updated: Dec 3, 2024
template: concept-topic-template
---

# GPSR (General Product Safety Regulation)

The General Product Safety Regulation (GPSR) is a new key instrument in the EU product safety legal framework, replacing the current General Product Safety Directive and the Food Imitating Product Directive from December 13, 2024\. It modernizes the EU general product safety framework and addresses the new challenges posed to product safety by the digitalization of our economies.

The GPSR requires that all consumer products on the EU markets are safe and it establishes specific obligations for businesses to ensure it.

[Full details of the regulations can be found here.](https://commission.europa.eu/business-economy-euro/doing-business-eu/eu-product-safety-and-labelling/product-safety/general-product-safety-regulation_en)

## **Spryker’s GPSR Obligations**

Spryker does not fall into one of the categories of directly obliged parties. Spryker’s customers do, though. So Spryker’s obligations are limited to allowing its customers to meet the requirements under this new regulation. It is the customer’s responsibility to ensure compliance with it. However, Spryker has features in place that will assist the customer with achieving compliance.

For example, with Spryker's feature “Product Attributes,” you can record any required product-specific information, such as manufacturer details, postal and email addresses (including for a responsible person within the EU), product identifiers, and other details. You can also apply this feature to the warning or safety instructions. CMS Blocks with the required manufacturer, product, or instructions details can also be used in this context and be added to the relevant product details pages via the Product Slot feature.

The Product images feature can be used to manage the product images. 

More specific details can be found below.

## **How Spryker Can Help Customers Meet The Requirements under This New Regulation**

Depending on what role your company plays with regard to the product (manufacturer, distributor, economic operator in distance sale etc.), the obligations under these new Regulations may be different. However, we can help you generally with the following requirements of the Regulation: 

> ### Show the name, registered trade name, or trademark of the manufacturer (and, where the manufacturer is not established in the EU, of the responsible person in the EU), postal address, and electronic contact details  
>
> How you can do this with Spryker:
>
> 1. Backoffice: Create a new [product attribute](https://docs.spryker.com/docs/pbc/all/product-information-management/202410.0/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html) (input type “textarea”, “Allow input any value other than predefined ones” is activated) and assign it to the relevant products of a specific manufacturer. Also works via the data importer.
> 2. Backoffice: Create a single CMS block per required manufacturer, assign this block to the [Product slot](https://docs.spryker.com/docs/pbc/all/content-management-system/202410.0/base-shop/cms-feature-overview/templates-and-slots-overview.html#slot), and select specific SKUs of that manufacturer. Also works via the data importer.

> ### Provide information allowing the identification of the product, including pictures, product type, identifiers
> How you can do this with Spryker:
> 1. For images, the [Product images](https://docs.spryker.com/docs/pbc/all/product-information-management/202410.0/base-shop/feature-overviews/product-feature-overview/product-images-overview.html) feature should be used.
> 2. Product attributes should be used for any specific product-related information.

> ### Indicate clear warnings or safety information to be affixed to the product  
> How you can do this with Spryker: 
> 1. Backoffice: This can be done via product attributes or CMS blocks, as described above in the first box. 

