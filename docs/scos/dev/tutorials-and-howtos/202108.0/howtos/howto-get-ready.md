---
title: HowTo - Get Ready for VAT (tax) Changes in Germany
originalLink: https://documentation.spryker.com/2021080/docs/howto-get-ready-for-vat-tax-changes-in-germany
redirect_from:
  - /2021080/docs/howto-get-ready-for-vat-tax-changes-in-germany
  - /2021080/docs/en/howto-get-ready-for-vat-tax-changes-in-germany
---

The German government [has planned to adjust VAT as a part of the COVID-19 measures](https://www.tagesschau.de/wirtschaft/coronakrise-konjunkturpaket-mehrwertsteuer-101.html). The VAT update could become a nightmare for E-Commerce engineers and Web Developers. However, Spryker provides out-of-the-box mechanisms to support tax adjustments in runtime without migrating prices stored in the Spryker Commerce OS.

In the Spryker system, the tax rate values are:
- Persisted in the placed orders, history of request for quotes, and changing the rate in the DB will neither affect these entities nor the display of the orders in Customer Account, Back Office, etc.
- Not persisted in the products, carts, wishlists, shopping lists. Actual Spryker's code always uses the tax rate value from the DB to perform actual calculations.

To adjust the tax rates for your project, you can simply [edit tax rates in the Back Office](https://documentation.spryker.com/docs/managing-tax-rates-sets) as and when you need to. However, you can also automate the process by scheduling the tax rates update. The section below describes how to do that.


{% info_block warningBox "Project tax customizations" %}

Make sure that custom code follows the Spryker architecture and leveraging Tax calculation plugins. Otherwise, careful revision of the project solutions is required and should be taken into consideration during the project planning.

{% endinfo_block %}

## Scheduling the Tax Rates Update

To get you ready for the tax update on 01.07.2020, we have prepared an example of the solution that will work on our non-modified Demo Shop and should be adjusted accordingly for every project.

Let's assume that:
- you use the default cronjobs configuration from `config/Zed/cronjobs/jenkins.php`;
- you use the default tax import;
- you want to update the tax rate Germany Standard to 16% on 01.07.2020;
- you want to update the tax rate Germany Reduced to 5% on 01.07.2020;
- you want to revert these changes on 01.01.2021.

To schedule the tax rates update, do the following:
1. Create the `data/import/reduce_tax.csv` file with the following content:
```
tax_set_name,country_name,tax_rate_name,tax_rate_percent
Standard Taxes,Germany,Germany Standard,16
Reduced Taxes,Germany,Germany Reduced,5
```
2. Create the `data/import/restore_tax.csv`file with the following content:
```
tax_set_name,country_name,tax_rate_name,tax_rate_percent
Standard Taxes,Germany,Germany Standard,19
Reduced Taxes,Germany,Germany Reduced,7
```
3. Update `config/Zed/cronjobs/jenkins.php` by adding two more jobs:
```PHP
/* Reduce tax rate */
$jobs[] = [
    'name' => 'reduce-tax-rate',
    'command' => '$PHP_BIN vendor/bin/console  data:import:tax -f data/import/reduce_tax.csv',
    'schedule' => "TZ=Europe/Berlin\n0 0 1 7 *",
    'enable' => true,
    'stores' => $allStores,
];
/* Restore tax rate */
$jobs[] = [
    'name' => 'restore-tax-rate',
    'command' => '$PHP_BIN vendor/bin/console  data:import:tax -f data/import/restore_tax.csv',
    'schedule' => "TZ=Europe/Berlin\n0 0 1 1 *",
    'enable' => true,
    'stores' => $allStores,
];
```
{% info_block infoBox "Info" %}

In July 2020, you have to remove the first job, and in January 2021, the last one.

{% endinfo_block %}
