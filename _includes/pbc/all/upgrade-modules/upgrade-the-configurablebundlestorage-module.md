
## Upgrading from version 1.* to version 2.0.0

In the `ConfigurableBundleStorage` version 2.0.0, we have introduced these backward-incompatible changes:

* Added `spryker/locale` module to dependencies.
* Added `spryker/product-image` module to dependencies.
* Added `spryker/product-storage` module to dependencies for forward-compatibility reasons.
* Increased `spryker/configurable-bundle` module version constraint for the new major.
* Changed configurable bundle template storage structure by renaming `productListId` to `idProductList`.
* Enriched configurable bundle template storage structure with name, `idConfigurableBundleTemplateSlot` and `idConfigurableBundleTemplate` properties.
* Removed `PROPEL_QUERY_CONFIGURABLE_BUNDLE_TEMPLATE` from the dependency provider.

*Estimated migration time: ~1hour*

To upgrade to the new version of the module, do the following:

1. Upgrade the `ConfigurableBundleStorage` module to version 2.0.0:

```bash
composer require spryker/configurable-bundle-storage:"^2.0.0" --update-with-dependencies
```

2. Truncate the `spy_configurable_bundle_storage` database table:

```sql
TRUNCATE TABLE spy_configurable_bundle_template_storage
```

3. Remove all keys from Redis:

```bash
redis-cli --scan --pattern kv:configurable_bundle_template:'*' | xargs redis-cli unlink
```

4. Run the database migration:

```bash
console propel:install
```

5. Run the following command to re-generate transfer objects:

```bash
console transfer:generate
```

6. Run the following command to get all data about configurable bundle templates from the database and publish them to Redis:

```bash
console event:trigger -r configurable_bundle_template
```
