---
title: "HowTo: Get ready for VAT (tax) changes in Germany"
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-get-ready-for-vat-tax-changes-in-germany
originalArticleId: 3e20d414-66b8-4621-9876-b367adbdfa64
redirect_from:
  - /2021080/docs/howto-get-ready-for-vat-tax-changes-in-germany
  - /2021080/docs/en/howto-get-ready-for-vat-tax-changes-in-germany
  - /docs/howto-get-ready-for-vat-tax-changes-in-germany
  - /docs/en/howto-get-ready-for-vat-tax-changes-in-germany
  - /v5/docs/howto-get-ready-for-vat-tax-changes-in-germany
  - /v5/docs/en/howto-get-ready-for-vat-tax-changes-in-germany
  - /v6/docs/howto-get-ready-for-vat-tax-changes-in-germany
  - /v6/docs/en/howto-get-ready-for-vat-tax-changes-in-germany
related:
  - title: Managing tax sets
    link: docs/scos/user/back-office-user-guides/page.version/administration/tax-sets/managing-tax-sets.html
---

The German government has planned to adjust VAT as a part of the COVID-19 measures. The VAT update could become a nightmare for E-Commerce engineers and Web Developers. However, Spryker provides out-of-the-box mechanisms to support tax adjustments in runtime without migrating prices stored in the Spryker Commerce OS.

In the Spryker system, the tax rate values are as follows:
- Persisted in the placed orders, history of request for quotes, and changing the rate in the DB neither affect these entities nor the display of the orders in the customer account or Back Office.
- Not persisted in the products, carts, wishlists, and shopping lists. Actual Spryker's code always uses the tax rate value from the DB to perform actual calculations.

To adjust the tax rates for your project, you can [edit tax rates in the Back Office](/docs/scos/user/back-office-user-guides/{{site.version}}/administration/tax-rates/managing-tax-rates.html). You can also automate the process by scheduling the tax rate update. The following section describes how to do that.

{% info_block warningBox "Project tax customizations" %}

Make sure custom code to follow the Spryker architecture and to leverage Tax calculation plugins. Otherwise, careful revision of the project solutions is required and must be taken into consideration during the project planning.

{% endinfo_block %}

## Schedule the tax rates update

To get you ready for the tax update on 01.07.2020, we have prepared an example of the solution that works on our non-modified Demo Shop and must be adjusted accordingly for every project.

Let's assume the following:
- You use the default cronjobs configuration from `config/Zed/cronjobs/jenkins.php`.
- You use the default tax import.
- You want to update the tax rate Germany Standard to 16% on 01.07.2020.
- You want to update the tax rate Germany Reduced to 5% on 01.07.2020.
- You want to revert these changes on 01.01.2021.

To schedule the tax rates update, do the following:

1. Create the `data/import/reduce_tax.csv` file with the following content:

```csv
tax_set_name,country_name,tax_rate_name,tax_rate_percent
Standard Taxes,Germany,Germany Standard,16
Reduced Taxes,Germany,Germany Reduced,5
```

2. Create the `data/import/restore_tax.csv`file with the following content:

```csv
tax_set_name,country_name,tax_rate_name,tax_rate_percent
Standard Taxes,Germany,Germany Standard,19
Reduced Taxes,Germany,Germany Reduced,7
```

3. Update `config/Zed/cronjobs/jenkins.php` by adding two more jobs:

```php
/* Reduce tax rate */
$jobs[] = [
    'name' => 'reduce-tax-rate',
    'command' => '$PHP_BIN vendor/bin/console  data:import:tax -f data/import/reduce_tax.csv',
    'schedule' => "TZ=Europe/Berlin/n0 0 1 7 *",
    'enable' => true,
    'stores' => $allStores,
];
/* Restore tax rate */
$jobs[] = [
    'name' => 'restore-tax-rate',
    'command' => '$PHP_BIN vendor/bin/console  data:import:tax -f data/import/restore_tax.csv',
    'schedule' => "TZ=Europe/Berlin/n0 0 1 1 *",
    'enable' => true,
    'stores' => $allStores,
];
```

{% info_block infoBox "Info" %}

In July 2020, you must remove the first job, and in January 2021, the last one.

{% endinfo_block %}
