---
title: "Create Gui table filter types"
description: This articles provides details how to create a new Gui table filter type
template: howto-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/marketplace/dev/howtos/how-to-add-new-guitable-filter-type.html
related:
  - title: How to create a new Gui table
    link: docs/pbc/all/merchant-management/page.version/marketplace/tutorials-and-howtos/create-gui-tables.html
  - title: How to extend an existing Gui table
    link: docs/pbc/all/merchant-management/page.version/marketplace/tutorials-and-howtos/extend-gui-tables.html
  - title: How to create a new Gui table column type
    link: docs/marketplace/dev/howtos/how-to-add-new-guitable-column-type.html
---

This document describes how to create a new Gui table filter type.

## Prerequisites

To install the Marketplace Merchant Portal Core feature providing the `GuiTable` module, follow the [Install the Marketplace Merchant Portal Core feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html).


## Adjust GuiTableConfigurationBuilder

Add a new `addFilter***()` method to `Spryker\Shared\GuiTable\Configuration\Builder\GuiTableConfigurationBuilder`, where you pass all the required data for a new filter configuration. Define a structure as it will be used by the frontend component (the data will be transformed to arrays and then passed to a frontend as JSON).

```php
    /**
     * @param string $id
     * @param string $title
     *
     * @return $this
     */
    public function addFilterExample(
        string $id,
        string $title
    ) {
        $typeOptionTransfers = (new SelectGuiTableFilterTypeOptionsTransfer());

        $typeOptionTransfers
            ->addValue(
                (new OptionSelectGuiTableFilterTypeOptionsTransfer())
                   ->setValue('value1')
                   ->setTitle('value1title')
            )
            ->addValue(
                 (new OptionSelectGuiTableFilterTypeOptionsTransfer())
                    ->setValue('value2')
                    ->setTitle('value2title')
            );

        $this->filters[] = (new GuiTableFilterTransfer())
            ->setId($id)
            ->setTitle($title)
            ->setType('new-type-name')
            ->setTypeOptions($typeOptionTransfers);

        return $this;
    }
```

See the [Table Filter extension](/docs/dg/dev/frontend-development/{{site.version}}/marketplace/table-design/table-filter-extension/table-filter-extension.html) to learn more about the Table Filters feature.
