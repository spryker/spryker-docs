

## Upgrading from version 1.* to version 2.*

The `Content` module version 2.0.0 implemented the following improvements:

* Introduced the `spy_content.key` field to store the identifier for entities.
* Introduced the `spy_content.spy_content-key` unique index.
* Introduced the `ContentTransfer::$key` transfer object property.
* Introduced `ContentFacadeInterface::findContentByKey()`.
* Adjusted `\Spryker\Zed\Content\Business\ContentValidator\ContentConstraintsProvider` so it also verifies the key property.
* Adjusted `ContentWriter` so it uses `ContentKeyProvider` to persist the key field while writing the content entity.
* Added dependency to `spryker/util-uuid-generator`.


_Estimated migration time: 30minutes-1h_

To upgrade to the new version of the module, do the following:

1. Upgrade the `Content` module to version 2.0.0:

```bash
composer require spryker/content:"^2.0.0" --update-with-dependencies
```

2. Run the following command to re-generate transfer objects:

```bash
console transfer:generate
```

**If you don't have content items in the database, run the database migration:**

```bash
console propel:install
```

**If you need to update the existing content items in the database,  follow these steps:**

1. In `src/Pyz/Zed/Content/Persistence/Propel/Schema/spy_content.schema.xml`, update the key column's property "required" to false for the data migration on the project level:

**src/Pyz/Zed/Content/Persistence/Propel/Schema/spy_content.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
			xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
			namespace="Orm\Zed\Content\Persistence"
			package="src.Orm.Zed.Content.Persistence">

	<table name="spy_content" phpName="SpyContent">
		<column name="key" required="false" type="VARCHAR" size="255" description="Identifier for existing entities. It should never be changed."/>
	</table>

</database>
```

2. Run the database migration:

```bash
console propel:install
```

3. Create a new command in `src/Pyz/Zed/Content/Communication/Console/ContentItemKeyGeneratorConsoleCommand.php`.

```php                
<?php

/**
* Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
* Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
*/

namespace Pyz\Zed\Content\Communication\Console;

use Orm\Zed\Content\Persistence\Map\SpyContentTableMap;
use Orm\Zed\Content\Persistence\SpyContentQuery;
use Propel\Runtime\Collection\ObjectCollection;
use Spryker\Service\UtilUuidGenerator\UtilUuidGeneratorService;
use Spryker\Service\UtilUuidGenerator\UtilUuidGeneratorServiceInterface;
use Spryker\Zed\Content\Business\KeyProvider\ContentKeyProvider;
use Spryker\Zed\Content\Business\KeyProvider\ContentKeyProviderInterface;
use Spryker\Zed\Content\Dependency\Service\ContentToUtilUuidGeneratorServiceBridge;
use Spryker\Zed\Content\Dependency\Service\ContentToUtilUuidGeneratorServiceInterface;
use Spryker\Zed\Content\Persistence\ContentRepository;
use Spryker\Zed\Content\Persistence\ContentRepositoryInterface;
use Spryker\Zed\Kernel\Communication\Console\Console;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ContentItemKeyGeneratorConsoleCommand extends Console
{
	protected const COMMAND_NAME = 'content-items:generate-keys';
	protected const LIMIT_CONTENT_ITEMS = 1000;

	protected function configure(): void
	{
		$this->setName(static::COMMAND_NAME);
		$this->setDescription('Content item key generator');
	}

	protected function execute(InputInterface $input, OutputInterface $output)
	{
		$offset = 0;
		$contentItems = $this->findContentItems($i);

		while($contentItems->count()) {

			foreach ($contentItems as $contentItem) {
				$contentItem->setKey(
					$this->createContentKeyProvider()->generateContentKey()
				);
			}

			$contentItems->save();
			$offset += static::LIMIT_CONTENT_ITEMS;
			$contentItems = $this->findContentItems($offset);
		}
	}

	protected function findContentItems($offset): array
	{
		$clause = SpyContentTableMap::COL_KEY . " = '' OR " . SpyContentTableMap::COL_KEY . " IS NULL";

		return (new SpyContentQuery())
			->where($clause)
			->offset($offset)
			->limit(static::LIMIT_CONTENT_ITEMS)
			->orderByIdContent()
			->find();
	}

	protected function createContentKeyProvider(): ContentKeyProviderInterface
	{
		return new ContentKeyProvider(
			$this->createUtilUuidGeneratorServiceBridge(),
			$this->createContentRepository()
		);
	}

	protected function createUtilUuidGeneratorServiceBridge(): ContentToUtilUuidGeneratorServiceInterface
	{
		return new ContentToUtilUuidGeneratorServiceBridge($this->createUtilUuidGeneratorService());
	}

	protected function createUtilUuidGeneratorService(): UtilUuidGeneratorServiceInterface
	{
		return new UtilUuidGeneratorService();
	}

	protected function createContentRepository(): ContentRepositoryInterface
	{
		return new ContentRepository();
	}
}
```				

4. Add the newly created command to `src/Pyz/Zed/Console/ConsoleDependencyProvider.php`:

```php                    
<?php

/**
* Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
* Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
*/

namespace Pyz\Zed\Console;

use Pyz\Zed\Content\Communication\Console\ContentItemKeyGeneratorConsoleCommand;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
	/**
	* @param \Spryker\Zed\Kernel\Container $container
	*
	* @return \Symfony\Component\Console\Command\Command[]
	*/
	protected function getConsoleCommands(Container $container)
	{
		$commands = [
			new ContentItemKeyGeneratorConsoleCommand(),
		];
	}
}
```		

5. Run the command in a terminal:

```bash
console content-items:generate-keys
```

6. Revert the previous changes to the `spy_content.schema.xml` file:
(restore the required value of key to true):

**src/Pyz/Zed/Content/Persistence/Propel/Schema/spy_content.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
          xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\Content\Persistence"
          package="src.Orm.Zed.Content.Persistence">

    <table name="spy_content" phpName="SpyContent">
        <column name="key" required="true" type="VARCHAR" size="255" description="Identifier for existing entities. It should never be changed."/>
    </table>

</database>
```

7. Run the database migration:

```bash
console propel:install
```
