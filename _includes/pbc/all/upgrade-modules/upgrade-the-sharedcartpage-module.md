

## Upgrading from version 1.* to version 2.*

From version 2 we have removed the disabled users from the shared list. The ability to enable/disable users was added to the `CompanyUser` module, version 2.0.0.

*Estimated migration time: 10 minutes*
 
To upgrade to the new version of the module, do the following:

1. Upgrade the `CompanyUser` module to version 2.0.0. See [Upgrade the CompanyUser module](/docs/pbc/all/customer-relationship-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-companyuser-module.html) for more details:

```yaml
composer require spryker/company-user: “^2.0.0”
```

2. Regenerate transfer objects:

```yaml
vendor/bin/console transfer:generate
```
