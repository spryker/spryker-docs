---
title: "How-To: Create a new Gui table column type"
description: This articles provides details how to create a new Gui table column type
template: howto-guide-template
---

This articles provides details how to create a new Gui table column type.

Follow the [Marketplace Merchant Portal Core feature integration guide](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-merchant-portal-core-feature-integration.html) 
to install the Marketplace Merchant Portal Core feature providing ``GuiTable`` module.

## 1) Adjust GuiTableConfigurationBuilder

Add a new addColumn***() method to ``Spryker\Shared\GuiTable\Configuration\Builder\GuiTableConfigurationBuilder``, where 
pass all the required data for a new column configuration. Define a structure as it will be used by frontend component 
(the data will be transformed to array and then passed to a fronted component as JSON).

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

## 2) DEFINE A FRONTEND COMPONENT

## See also

- [How to create a new Gui table](/docs/marketplace/dev/howtos/how-to-create-gui-table.html)
- [How to extend an existing Gui table](/docs/marketplace/dev/howtos/how-to-extend-gui-table.html)
- [How to create a new Gui table filter type](/docs/marketplace/dev/howtos/how-to-add-new-filter-type.html)
