

## Upgrading from version 1.* to version 2.*

Version 2.0.0 of the `spryker-eco/algolia` module introduces configurable sorting replicas and query suggestions. Sorting attributes for products and CMS pages, as well as query suggestion facet generation, are no longer hardcoded and must be configured at the project level.

### Update the module

```bash
composer require -w spryker-eco/algolia:"^2.0.0"
```

### Configure product sorting replicas

Product sorting attributes are now configurable and empty by default. To restore the previous behavior, create or update `src/Pyz/Zed/Algolia/AlgoliaConfig.php`:

```php
<?php

namespace Pyz\Zed\Algolia;

use SprykerEco\Zed\Algolia\AlgoliaConfig as SprykerEcoAlgoliaConfig;

class AlgoliaConfig extends SprykerEcoAlgoliaConfig
{
    /**
     * @return array<string>
     */
    public function getProductSortingAttributes(): array
    {
        return [
            'rating',
            'abstract_name',
            'prices.eur.gross',
            'prices.eur.net',
        ];
    }
}
```

Each attribute gets ascending and descending replica indices created in Algolia. Adjust the list to match the sorting options available in your storefront.

### Configure CMS page sorting replicas

CMS page sorting attributes are now empty by default. If your project uses CMS page sorting, add to `src/Pyz/Zed/Algolia/AlgoliaConfig.php`:

```php
    /**
     * @return array<string>
     */
    public function getCmsPageSortingAttributes(): array
    {
        return ['name'];
    }
```

### Configure query suggestions facet generation

Query Suggestions facet generation attributes are now configurable and empty by default. To restore the previous behavior, add to `src/Pyz/Zed/Algolia/AlgoliaConfig.php`:

```php
    /**
     * @return array<array<string>>
     */
    public function getSuggestionGenerateAttributes(): array
    {
        return [
            ['category'],
            ['attributes.brand'],
        ];
    }
```

### Configure sort parameter to attribute mapping

If your storefront uses sort parameter names that differ from the Algolia attribute names used in replica indices—for example, the storefront sorts by `name`, but the replica index uses `abstract_name`—configure the mapping in `src/Pyz/Client/Algolia/AlgoliaConfig.php`:

```php
<?php

namespace Pyz\Client\Algolia;

use SprykerEco\Client\Algolia\AlgoliaConfig as SprykerEcoAlgoliaConfig;

class AlgoliaConfig extends SprykerEcoAlgoliaConfig
{
    /**
     * @return array<string, string>
     */
    public function getProductSortingParamToAttributeMapping(): array
    {
        return [
            'name' => 'abstract_name',
        ];
    }
}
```

A similar method `getCmsPageSortingParamToAttributeMapping()` is available for CMS page sorting.
