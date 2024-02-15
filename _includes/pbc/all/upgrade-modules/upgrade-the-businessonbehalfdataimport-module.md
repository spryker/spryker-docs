

## Upgrading from version 2.* to version 3.*

In this version, we have changed the dependency to the CompanyUser module. This enables using the `CompanyUserEvents::COMPANY_USER_PUBLISH` constant to trigger [Publish & Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html) handling for imported entities.
No additional actions required.

## Upgrading from version 1.1.0 to version 2.0.0

In this version, the import key `company-user` has been assigned to the `CompanyUserDataImport`. `BusinessOnBehalfDataImport` now uses `company-user-on-behalf`. To migrate, just use the other key because the previous was repurposed.
Therefore, if you have any custom deployment or importing script that used the console command:

```bash
vendor/bin/console data:import company-user
```

Change it to:

```bash
vendor/bin/console data:import company-user-on-behalf
```

The import key company-user is now assigned to the `CompanyUserDataImport`.
