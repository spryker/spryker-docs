---
title: Migration Guide - Category
originalLink: https://documentation.spryker.com/v2/docs/mg-category
redirect_from:
  - /v2/docs/mg-category
  - /v2/docs/en/mg-category
---

## Upgrading from Version 3.* to Version 4.*

### Changes
The fourth version of the Category module introduced the changes described below.

Added:

* category templates functionality
* category view functionality
* tests for the module
* dependencies for Storage and Event modules

Removed:

* category `is_clickable` functionality

### Update modules
1. Update the Category module by adding `"spryker/category": "^4.0.0"` to your `composer.json` and running composer update.
Due to the changes in the Category module, all related modules have to be updated too.
2. Run composer require `spryker/event spryker/storage` to install Event and Storage modules.

### Database update and migration
Execute the following SQL statement to create the table `spy_category_template` and modify the `spy_category` one:

<details open>
<summary>Code sample:</summary>
     
```sql
CREATE SEQUENCE "spy_category_template_pk_seq";

CREATE TABLE "spy_category_template"
(
    "id_category_template" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "template_path" VARCHAR(255) NOT NULL,
    PRIMARY KEY("id_category_template"),
    CONSTRAINT "spy_category_template-template_path" UNIQUE("template_path")
);

ALTER TABLE "spy_category" ADD "fk_category_template" INTEGER;

ALTER TABLE "spy_category" ADD FOREIGN KEY("fk_category_template") REFERENCES spy_category_template(id_category_template);
```

</br>
</details>
    
4. Run `console propel:diff; console propel:migrate; console propel:model:build` to build propel models.
5. Run `console transfer:generate` to generate objects.

    #### Resolve deprecations
    Before upgrading to the new version, make sure that you do not use any deprecated code from version 3.\*. You can find replacements for the deprecated code in the table below.

| Deprecated code | Replacement |
| --- | --- |
| `\Spryker\Shared\Category\CategoryConstants::RESOURCE_TYPE_CATEGORY_NODE` | `\Spryker\Shared\Category\CategoryConfig::RESOURCE_TYPE_CATEGORY_NODE` |
|`Spryker\Shared\Category\CategoryConstants::RESOURCE_TYPE_NAVIGATION`|`\Spryker\Shared\Category\CategoryConfig::RESOURCE_TYPE_NAVIGATION`|
|`\Spryker\Zed\Category\Communication\Form\CategoryLocalizedAttributeType::setDefaultOptions()`|`\Spryker\Zed\Category\Communication\Form\CategoryLocalizedAttributeType::configureOptions()`|

{% info_block errorBox %}
Also, `is_clickable` form field was removed because this functionality is obsolete, so make sure that you do not use it.
{% endinfo_block %}

#### Data migration
The following migration script is designed to add the category template selection functionality to your project. If necessary, adjust the script to cover your category implementation

<details open>
<summary>CategoryTemplateMigration.php</summary>

```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Pyz\Zed\Category\Communication\Console;

use Exception;
use Orm\Zed\Category\Persistence\SpyCategoryQuery;
use Orm\Zed\Category\Persistence\SpyCategoryTemplateQuery;
use Spryker\Zed\Category\CategoryConfig;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Spryker\Zed\PropelOrm\Business\Runtime\ActiveQuery\Criteria;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @method \Spryker\Zed\Category\Business\CategoryFacadeInterface getFacade()
 */
class CategoryTemplateMigration extends Console
{

    const COMMAND_NAME = 'category-template:migrate';

    /**
     * @var \Symfony\Component\Console\Output\OutputInterface
     */
    protected $output;

    /**
     * @param \Symfony\Component\Console\Input\InputInterface $input
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return void
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        $this->output = $output;

        $this->getFacade()->syncCategoryTemplate();
        $this->assignTemplateToAllCategories();

        $output->writeln('Successfully finished.');
    }

    /**
    * @return void
    */
    protected function configure()
    {
        parent::configure();

        $this->setName(static::COMMAND_NAME);
        $this->setDescription('');
    }

    /**
    * @throws \Exception
    *
    * @return void
    */
    protected function assignTemplateToAllCategories()
    {
        $spyCategoryTemplate = SpyCategoryTemplateQuery::create()
            ->filterByName(CategoryConfig::CATEGORY_TEMPLATE_DEFAULT)
            ->findOne();

        if (empty($spyCategoryTemplate)) {
            throw new Exception('Please specify CATEGORY_TEMPLATE_DEFAULT in your category template list configuration');
        }

        $query = SpyCategoryQuery::create()
            ->filterByFkCategoryTemplate(null, Criteria::ISNULL);

        $this->output->writeln('Will update ' . $query->count() . ' categories without template.');

        foreach ($query->find() as $category) {
            $category->setFkCategoryTemplate($spyCategoryTemplate->getIdCategoryTemplate());
            $category->save();
        }
    }

    /**
    * @return array
    */
    protected function getTemplateList()
    {
        return $this->getFactory()
                ->getConfig()
                ->getTemplateList();
    }

}
```

</br>
</details>

6. Copy the script to `src/Pyz/Zed/Category/Communication/Console/CategoryTemplateMigration.php`.
7. Register it in `Pyz\Zed\Console\ConsoleDependencyProvider`:

<details open>
<summary>Code sample:</summary>

```php
<?php
namespace Pyz\Zed\Console;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    public function getConsoleCommands(Container $container)
    {
        $commands = [
            ...
            CategoryTemplateMigration()
        ]; ...
    }
}
```

</br>
</details>

8. Run the command to add templates to your categories: `vendor/bin/console category-template:migrate`

_Estimated migration time: 1 hour. The time may vary depending on project-specific factors._


<!-- Last review date: Feb 19, 2019- by Alexey Kravchenko, Andrii Tserkovnyi -->
