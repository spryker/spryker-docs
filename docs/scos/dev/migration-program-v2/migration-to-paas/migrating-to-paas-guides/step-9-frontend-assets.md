---
title: 'Step 9: Frontend assets'
description: 
template: howto-guide-template
---

The default approach in the Spryker for hosting frontend assets, such as images and videos, is based on a CDN that utilizes an S3 bucket. However, if there is a need to host frontend assets within the Spryker PaaS environment, you should initiate a CDN creation request through your account on the [Spryker Support portal](https://support.spryker.com/).

Once the S3 bucket has been established, you can manually upload asset files to the S3 bucket using the AWS user interface.

To ensure the seamless transition to the new image URLs, execute an SQL update query within the Spryker cloud DB. The query should update the old image URLs with the new ones. The list of tables that store images includes:
* spy_product_image
* spy_category_image
* Any other tables related to images 

Additionally, trigger the publish events for images. This process ensures that the image URLs are republished not only in Redis and Elasticsearch but also in the `_search` and `_storage` tables. You can achieve this by running the following command:
```bash
console publisher:trigger-events -r product_abstract_image,product_concrete_image,configurable_bundle_template_image,category_image
```
