---
title: Migrate assets to S3
description: Migrate assets to S3 for the migration to Spryker Cloud
template: howto-guide-template
---

Spryker Cloud uses an AWS S3 bucket for storing heavy assets or other files, the size of `S3` is flexible therefore it should not be
an issue to migrate heavy assets or other files.

1. Ask the customer to upload the assets to their S3 bucket.
    If they can't do it for some reason, you can request archived assets and do it for them.
2. To replace old image URLs with new ones, run the SQL update script against the database.
    The following are the tables that usually contain the image URLs, but check other tables for the URLs as well:
    * spy_product_image
    * spy_category_image

3. Trigger publish events for images:
    ```bash
    console publisher:trigger-events -r product_abstract_image,product_concrete_image,configurable_bundle_template_image,category_image
    ```
4. To add a CDN, create a ticket in [SalesForce](http://support.spryker.com) to the Operations team.
    Make sure to keep track of the ticket until the CDN is created.

## Resources for migration

* Backend
* DevOps