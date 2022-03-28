---
title: "How-To: Create a new Gui table column type"
description: This articles provides details how to create a new Gui table column type
template: howto-guide-template
related:
  - title: How to create a new Gui table
    link: docs/marketplace/dev/howtos/how-to-create-gui-table.html
  - title: How to extend an existing Gui table
    link: docs/marketplace/dev/howtos/how-to-extend-gui-table.html
  - title: How to create a new Gui table filter type
    link: docs/marketplace/dev/howtos/how-to-add-new-guitable-filter-type.html
---

This document describes how to add new column types to a Gui table.

## Prerequisites

To install the Marketplace Merchant Portal Core feature providing the `GuiTable` module, follow the [Marketplace Merchant Portal Core feature integration guide](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-merchant-portal-core-feature-integration.html).


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

To learn more about Column Type frontend components, see the [Table Column Type Extension](/docs/marketplace/dev/front-end/table-design/table-column-types)
