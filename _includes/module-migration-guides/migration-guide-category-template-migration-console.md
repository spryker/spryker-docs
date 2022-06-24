---
title: Migration guide - Category Template Migration Console
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-category-template-console
originalArticleId: 4e32a6a9-559f-4c06-b6c0-a9c8639f51e0
redirect_from:
  - /2021080/docs/mg-category-template-console
  - /2021080/docs/en/mg-category-template-console
  - /docs/mg-category-template-console
  - /docs/en/mg-category-template-console
  - /v1/docs/mg-category-template-console
  - /v1/docs/en/mg-category-template-console
  - /v2/docs/mg-category-template-console
  - /v2/docs/en/mg-category-template-console
  - /v3/docs/mg-category-template-console
  - /v3/docs/en/mg-category-template-console
  - /v4/docs/mg-category-template-console
  - /v4/docs/en/mg-category-template-console
  - /v5/docs/mg-category-template-console
  - /v5/docs/en/mg-category-template-console
  - /v6/docs/mg-category-template-console
  - /v6/docs/en/mg-category-template-console
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-category-template-migration-console.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-category-template-migration-console.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-category-template-migration-console.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-category-template-migration-console.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-category-template-migration-console.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-category-template-migration-console.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-category-template-migration-console.html
---

## Category template migration script

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

<!--See also
Get a general idea about a Category
Migration Guide - Category-->
