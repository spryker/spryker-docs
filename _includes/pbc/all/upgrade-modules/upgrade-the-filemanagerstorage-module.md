

## Upgrading from version 1.* to version 2.0.0

In this new version of the `FileManagerStorage` module, we have added the support of the new `spryker/file-manager` major version (`^2.0.0`).

*Estimated migration time: 5 minutes*

To upgrade to the new version of the module, do the following:

1. Upgrade the `FileManagerStorage` module to the new version:

```bash
composer require spryker/file-manager-storage: "^2.0.0" --update-with-dependencies
```

2. Regenerate transfer objects:

```bash
console transfer:generate
```
