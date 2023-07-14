---
title: Migrate assets (images, assets manager, videos, import data (if needed) etc.)
description: This document describes how to migrate assets.
template: howto-guide-template
---

# Migrate assets (images, assets manager, videos, import data (if needed) etc.)

{% info_block infoBox %}

## Resources for assessment Backend, DevOps

{% endinfo_block %}

`Spryker Cloud` uses an `AWS S3 bucket` for storing heavy assets or other files, the size of `S3` is flexible therefore it should not be
an issue to migrate heavy assets to other files.

1. Request the customer to provide archived assets and upload that to the `S3 bucket` on your own **OR** ask
    the customer to upload files to the `S3 bucket` on their own since they will be having access as well.
2. Run `SQL` update script against `DB` in `Spryker Cloud` in order to replace old image URLs with new ones.
    List of tables for storing images:
    * spy_product_image;
    * spy_category_image;
    * any other table images related table.
3. Trigger publish events for images:
    ```bash
    console publisher:trigger-events -r product_abstract_image,product_concrete_image,configurable_bundle_template_image,category_image
    ```
4. Due to infra side is fully managed by Spryker you should create a ticket about adding CDN in [SalesForce portal](http://support.spryker.com)
    to the Operation team. All further communication with a requestor is carried out in scope of a ticket.
