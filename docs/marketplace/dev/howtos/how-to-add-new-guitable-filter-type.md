---
title: "How-To: Create a new Gui table filter type"
description: This articles provides details how to create a new Gui table filter type
template: howto-guide-template
---

This articles provides details how to create a new Gui table filter type.

Follow the [Marketplace Merchant Portal Core feature integration guide](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-merchant-portal-core-feature-integration.html) 
to install the Marketplace Merchant Portal Core feature providing ``GuiTable`` module.

## Adjust GuiTableConfigurationBuilder

Add a new addFilter***() method to ``Spryker\Shared\GuiTable\Configuration\Builder\GuiTableConfigurationBuilder``, where 
pass all the required data for a new filter configuration. Define a structure as it will be used by frontend component 
(the data will be transformed to array and then passed to a fronted component as JSON).

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

See [Table Filter extension](/docs/marketplace/dev/front-end/table-design/table-filters) to learn more about the Table Filters feature.

## See also

- [How to create a new Gui table](/docs/marketplace/dev/howtos/how-to-create-gui-table.html)
- [How to extend an existing Gui table](/docs/marketplace/dev/howtos/how-to-extend-gui-table.html)
- [How to create a new Gui table column type](/docs/marketplace/dev/howtos/how-to-add-new-column-type.html)
