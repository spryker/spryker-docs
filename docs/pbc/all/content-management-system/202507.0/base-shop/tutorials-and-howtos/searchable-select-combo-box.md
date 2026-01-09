---
title: Convert a dropdown with many items to a searchable select combo box in the Back Office
description:
last_updated: Oct 02, 2024
template: howto-guide-template
---

By default in the Back Office we use simple select component in the most of cases.
If on your project one of them contains to many items, it's becoms impossible to use. Our observatio suggests that from 50 items UX decreases significantly.

In order to enchance visual representation, instead of `SelectType` use *Select2ComboBoxType*.

For example:

```php
    protected function addProductIdsField(FormBuilderInterface $builder, array $options)
    {
        $builder->add(static::FIELD_PRODUCT_IDS, Select2ComboBoxType::class, [
            'label' => static::LABEL_PRODUCT_PAGES,
            'multiple' => true,
            'required' => false,
            'choices' => $options[static::OPTION_PRODUCT_ARRAY],
            'attr' => [
                'data-autocomplete-url' => static::OPTION_URL_AUTOCOMPLETE,
            ],
        ]);

        $this->addPreSetDataEventToProductIdsField($builder->get(static::FIELD_PRODUCT_IDS));

        return $this;
    }
```

The original select component is still loaded on the page, alhough we hie it and replace with custom-build JS component. Multi-select is also supported.
