---
title: "How-To: Create a new Gui table column type"
description: This articles provides details how to create a new Gui table column type
template: howto-guide-template
---

This article describes how to add new column types to a Gui table.

## Prerequisites

Follow the [Marketplace Merchant Portal Core feature integration guide](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-merchant-portal-core-feature-integration.html)
to install the Marketplace Merchant Portal Core feature providing the `GuiTable` module.

## Adjust GuiTableConfigurationBuilder

Add a new addColumn***() method to `Spryker\Shared\GuiTable\Configuration\Builder\GuiTableConfigurationBuilder`, in which all the required data for a new column configuration is passed. Define the structure that will be used by the frontend component (the data will be transformed into an array and then passed to the frontend component as JSON).

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

See the [Table Column Type Extension](/docs/marketplace/dev/front-end/table-design/table-column-types) to learn more about Column Type frontend components.

## See also

- [How to create a new Gui table](/docs/marketplace/dev/howtos/how-to-create-gui-table.html)
- [How to extend an existing Gui table](/docs/marketplace/dev/howtos/how-to-extend-gui-table.html)
- [How to create a new Gui table filter type](/docs/marketplace/dev/howtos/how-to-add-new-filter-type.html)
