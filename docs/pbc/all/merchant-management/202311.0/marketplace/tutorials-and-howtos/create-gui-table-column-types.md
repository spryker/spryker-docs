---
title: Create Gui table column types
description: This articles provides details how to create a new Gui table column type
template: howto-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/marketplace/dev/howtos/how-to-add-new-guitable-column-type.html
---

This document describes how to add new column types to a Gui table.

## Prerequisites

To install the Marketplace Merchant Portal Core feature providing the `GuiTable` module, follow the [Marketplace Merchant Portal Core feature integration guide](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html).


## Adjust GuiTableConfigurationBuilder

Add a new `addColumn***()` method to `Spryker\Shared\GuiTable\Configuration\Builder\GuiTableConfigurationBuilder`, in which all the required data for a new column configuration is passed. Define the structure that will be used by the frontend component (the data will be transformed into an array and then passed to the frontend component as JSON).

```php
    /**
     * @api
     *
     * @param string $id
     * @param string $title
     * @param bool $isSortable
     * @param bool $isHideable
     *
     * @return $this
     */
    public function addColumnExample(
        string $id,
        string $title,
        bool $isSortable,
        bool $isHideable
    ) {
        $guiTableColumnConfigurationTransfer = (new GuiTableColumnConfigurationTransfer())
            ->setId($id)
            ->setTitle($title)
            ->setType('example-column-type')
            ->setSortable($isSortable)
            ->setHideable($isHideable);

        $this->addColumn($guiTableColumnConfigurationTransfer);

        return $this;
    }
```

To learn more about Column Type frontend components, see the [Table Column Type Extension](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-column-type-extension/table-column-type-extension.html)
