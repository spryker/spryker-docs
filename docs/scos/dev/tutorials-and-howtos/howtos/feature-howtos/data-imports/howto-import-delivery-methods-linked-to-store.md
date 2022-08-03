---
title: "HowTo: Import delivery methods linked to store"
description: Use the guide to learn how to import delivery methods assigned to specific stores in the Back Office.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-import-delivery-methods-linked-to-store
originalArticleId: 45054e18-b4d1-44fa-bbca-f2478a52412d
redirect_from:
  - /2021080/docs/ht-import-delivery-methods-linked-to-store
  - /2021080/docs/en/ht-import-delivery-methods-linked-to-store
  - /docs/ht-import-delivery-methods-linked-to-store
  - /docs/en/ht-import-delivery-methods-linked-to-store
  - /v6/docs/ht-import-delivery-methods-linked-to-store
  - /v6/docs/en/ht-import-delivery-methods-linked-to-store
  - /v5/docs/ht-import-delivery-methods-linked-to-store
  - /v5/docs/en/ht-import-delivery-methods-linked-to-store
  - /v4/docs/ht-import-delivery-methods-linked-to-store
  - /v4/docs/en/ht-import-delivery-methods-linked-to-store
related:
  - title: Shipment feature overview
    link: docs/scos/user/features/page.version/shipment-feature-overview.html
  - title: Editing delivery methods
    link: docs/scos/user/back-office-user-guides/page.version/administration/delivery-methods/edit-delivery-methods.html
---

In addition to [adding](/docs/pbc/all/carrier-management/manage-in-the-back-office/add-delivery-methods.html) and [editing delivery methods](/docs/scos/user/back-office-user-guides/{{site.version}}/administration/delivery-methods/edit-delivery-methods.html) in the Back Office, you can also import them with the stores assigned from a CSV file.

By default, the data is stored to the `/ShipmentDataImport/data/import/delivery_method_store.csv` file that contains the following columns:

```yaml
shipment_method_key,store_name
```

where:
* `shipment_method` is a delivery method's name you want to create.
* `store_name` is a store in which the delivery method are available.

To import delivery methods linked to the stores from the `/ShipmentDataImport/data/import/delivery_method_store.csv` file, run the following command:

```bash
console data:import:shipment-method-store
```

If successful, the imported data is added to the `spy_shipment_method_store` database table and appears on the list of delivery methods in the Back Office. For more information about viewing and updating the delivery methods, see [adding](/docs/pbc/all/carrier-management/manage-in-the-back-office/add-delivery-methods.html) and [editing delivery methods](/docs/scos/user/back-office-user-guides/{{site.version}}/administration/delivery-methods/edit-delivery-methods.html).
