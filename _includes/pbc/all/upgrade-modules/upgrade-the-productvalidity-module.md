

## Installing version 1.*

The ProductValidity module is responsible for (de)activation of products for (or starting from) a certain period of time. Follow the instructions below to have the module up and running in your shop.

### Database changes

We have added a new [spy_product_validity](https://github.com/spryker/demoshop/commit/4fff838#diff-dbd7f860d235b1eaf9516e5127e656db) database table (the query can be checked [by following this link](https://github.com/spryker/demoshop/commit/4fff838#diff-99a822ed42bf42d4e81be47bc8e9829c)).
To start the database migration, run the following commands:

* `vendor/bin/console propel:diff` - manual review is necessary for the generated migration file.
* `vendor/bin/console propel:migrate`
* `vendor/bin/console propel:model:build`

After that, add table files to `src/Orm/Zed/ProductValidity/Persistence` folder.

### Auto-check enabling

To have the scheduler running to auto update products in accordance with the time settings for the product validity, you need to add cronjob and console command.
The instructions below demonstrate how to do that.

#### 1. Enable the console command

We have added a new console command `product:check-validity`.
The command checks validity by date ranges and active status for products. Then it updates (for demoshop it will be `touch`) the ones for which the activity state changes.
To enable it, add `ProductValidityConsole` to `ConsoleDependencyProvider`.

{% info_block infoBox "Info" %}

Check out our [Demoshop implementation](https://github.com/spryker/demoshop/commit/4fff838#diff-e854f9b396bdaa07ca6276f168aaa76a) for implementation example and idea.

{% endinfo_block %}

#### 2. Enable the cronjob

Add the following job to `config/Zed/cronjobs/jobs.php` file:

```php
$jobs[] = [
    'name' => 'check-product-validity',
     'command' => '$PHP_BIN vendor/bin/console product:check-validity',
    'schedule' => '* * * * *',
    'enable' => true,
    'run_on_non_production' => true,
    'stores' => $allStores,
];
```

{% info_block infoBox "Info" %}

Check out our [Demoshop implementation](https://github.com/spryker/demoshop/commit/4fff838#diff-c1676e93a12b1edc23bd32cc28cababc) for implementation example.

{% endinfo_block %}

### Product plugins

For correct work of the Time to Live feature, you need to sync validity data with products concrete. Add the following plugins for that:

* `ProductValidityReadPlugin` to `ProductDependencyProvider::getProductConcreteReadPlugins()`
* `ProductValidityUpdatePlugin` to `ProductDependencyProvider::getProductConcreteAfterUpdatePlugins()`

{% info_block infoBox "Info" %}

Check out our [Demoshop implementation](https://github.com/spryker/demoshop/commit/4fff838#diff-c1676e93a12b1edc23bd32cc28cababc) for implementation example and idea.

{% endinfo_block %}
