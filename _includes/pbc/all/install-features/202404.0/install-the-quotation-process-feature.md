

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
|Spryker Core  | {{page.version}} |
| Cart | {{page.version}} |
|Company Account  | {{page.version}} |
|Prices  | {{page.version}} |
| Agent Assist | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/quotation-process: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| QuoteRequest | vendor/spryker/quote-request |
| QuoteRequestExtension | vendor/spryker/quote-request-extension |
| QuoteRequestAgent | vendor/spryker/quote-request-agent |
| QuoteRequestDataImport | vendor/spryker/quote-request-data-import |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration to your project:

| CONFIGURATION  | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
|QuoteConfig::getQuoteFieldsAllowedForSaving  | Used to allow saving quote request related fields of the quote to the database. |Pyz\Zed\Quote  |
|QuoteRequestConfig::getQuoteFieldsAllowedForSaving |Used to define which quota data should be saved in the database during the request for quote process.  |Pyz\Zed\QuoteRequest |
|Outdated quote request closing cronjob (See below in `config/Zed/cronjobs/jobs.php`)  | Add cronjob that closes outdated quote requests. | - |
|Customer login access control regular expression (See below in `config/Shared/config_default.php`) | Used to close access for not logged in customers. | - |

**src/Pyz/Zed/Quote/QuoteConfig.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Quote\QuoteConfig as SprykerQuoteConfig;

class QuoteConfig extends SprykerQuoteConfig
{
    /**
     * @return array
     */
    public function getQuoteFieldsAllowedForSaving()
    {
        return array_merge(parent::getQuoteFieldsAllowedForSaving(), [
            QuoteTransfer::QUOTE_REQUEST_VERSION_REFERENCE,
            QuoteTransfer::QUOTE_REQUEST_REFERENCE,
        ]);
    }
}
```

{% info_block warningBox “Verification” %}

Make sure that when you converted quote request to quote, JSON data in the database column `spy_quote.quote_data` of the corresponding quote contains `quoteRequestVersionReference`.

{% endinfo_block %}

**src/Pyz/Zed/QuoteRequest/QuoteRequestConfig.php**

```php
<?php

namespace Pyz\Zed\QuoteRequest;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\QuoteRequest\QuoteRequestConfig as SprykerQuoteRequestConfig;

class QuoteRequestConfig extends SprykerQuoteRequestConfig
{
    /**
     * @return array
     */
    public function getQuoteFieldsAllowedForSaving(): array
    {
        return array_merge(parent::getQuoteFieldsAllowedForSaving(), [
            QuoteTransfer::CUSTOMER_REFERENCE,
            QuoteTransfer::CUSTOMER,
            QuoteTransfer::STORE,
            QuoteTransfer::ITEMS,
            QuoteTransfer::TOTALS,
            QuoteTransfer::CURRENCY,
            QuoteTransfer::PRICE_MODE,
            QuoteTransfer::BUNDLE_ITEMS,
            QuoteTransfer::VOUCHER_DISCOUNTS,
            QuoteTransfer::CART_RULE_DISCOUNTS,
            QuoteTransfer::PROMOTION_ITEMS,
            QuoteTransfer::BILLING_ADDRESS,
            QuoteTransfer::SHIPMENT,
            QuoteTransfer::SHIPPING_ADDRESS,
        ]);
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that,  when you created quote request, JSON data in the database column `spy_quote_request_version.quote` of the corresponding quote request contains `customerReference`.

{% endinfo_block %}

**config/Zed/cronjobs/jobs.php**

```php
<?php

$stores = require(APPLICATION_ROOT_DIR . '/config/Shared/stores.php');

$allStores = array_keys($stores);
/* QuoteRequest */
$jobs[] = [
    'name' => 'close-outdated-quote-requests',
    'command' => '$PHP_BIN vendor/bin/console quote-request:close-outdated',
    'schedule' => '0 * * * *',
    'enable' => true,
    'run_on_non_production' => true,
    'stores' => $allStores,
];
```

{% info_block warningBox "Verification" %}

Make sure that quote request with outdated **Valid Until** changes its status to closed within one hour.

{% endinfo_block %}

**config/Shared/config_default.php**

```php
<?php

$config[CustomerConstants::CUSTOMER_SECURED_PATTERN] = '(^/login_check$|^(/en|/de)?/customer($|/)|^(/en|/de)?/wishlist($|/)|^(/en|/de)?/shopping-list($|/)|^(/en|/de)?/quote-request($|/)|^(/en|/de)?/company(?!/register)($|/)|^(/en|/de)?/multi-cart($|/)|^(/en|/de)?/shared-cart($|/)|^(/en|/de)?/cart(?!/add)($|/)|^(/en|/de)?/checkout($|/))';
```

{% info_block warningBox "Verification" %}

Make sure that `http://mysprykershop.com/quote-request` with not authenticated user redirects to the login page.

{% endinfo_block %}

### 2) Set up the database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_quote_request | table | created |
| spy_quote_request_version | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| SpyQuoteRequestEntity | class | created | src/Generated/Shared/Transfer/SpyQuoteRequestEntityTransfer |
| SpyQuoteRequestVersionEntity | class | created | src/Generated/Shared/Transfer/SpyQuoteRequestVersionEntityTransfer |
| CompanyUserCriteria | class | created | src/Generated/Shared/Transfer/CompanyUserCriteria |
| QuoteRequestFilter | class | created | src/Generated/Shared/Transfer/QuoteRequestFilter |
| QuoteRequestResponse | class | created | src/Generated/Shared/Transfer/QuoteRequestResponse |
| QuoteRequestCollection | class | created | src/Generated/Shared/Transfer/QuoteRequestCollection |
| QuoteRequestVersionCollection | class | created | src/Generated/Shared/Transfer/QuoteRequestVersionCollection |
| QuoteRequest | class | created | src/Generated/Shared/Transfer/QuoteRequest |
| QuoteRequestVersion | class | created | src/Generated/Shared/Transfer/QuoteRequestVersion |
| QuoteRequestVersionFilter | class | created | src/Generated/Shared/Transfer/QuoteRequestVersionFilter |

{% endinfo_block %}

### 4) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
quote_request.status.waiting,Waiting,en_US
quote_request.status.waiting,Warten,de_DE
quote_request.status.in-progress,In Progress,en_US
quote_request.status.in-progress,Bearbeitung,de_DE
quote_request.status.ready,Ready,en_US
quote_request.status.ready,Bereit,de_DE
quote_request.status.canceled,Canceled,en_US
quote_request.status.canceled,Abgebrochen,de_DE
quote_request.status.closed,Closed,en_US
quote_request.status.closed,Geschlossen,de_DE
quote_request.status.draft,Draft,en_US
quote_request.status.draft,Entwurf,de_DE
quote_request.validation.success.canceled,Quote request canceled successfully.,en_US
quote_request.validation.success.canceled,Angebotsanfrage erfolgreich abgebrochen.,de_DE
quote_request.validation.converted_to_cart.success,Quote request converted to cart successfully.,en_US
quote_request.validation.converted_to_cart.success,Die Angebotsanfrage wurde erfolgreich in den Warenkorb konvertiert.,de_DE
quote_request.validation.error.not_exists,Quote Request not exists.,en_US
quote_request.validation.error.not_exists,Angebotsanfrage existiert nicht.,de_DE
quote_request.validation.error.wrong_status,Wrong Quote Request status for this operation.,en_US
quote_request.validation.error.wrong_status,Falscher Angebotsanforderungsstatus für diesen Vorgang.,de_DE
quote_request.validation.error.company_user_not_found,Company User not found.,en_US
quote_request.validation.error.company_user_not_found,Firmenbenutzer nicht gefunden.,de_DE
quote_request.validation.error.empty_cart,Quote request can't be created from empty cart.,en_US
quote_request.validation.error.empty_cart,Angebotsanfrage kann nicht aus leerem Einkaufswagen erstellt werden.,de_DE
quote_request.checkout.validation.error.version_not_found,Quote Request Version not found.,en_US
quote_request.checkout.validation.error.version_not_found,Angebotsanforderung Version nicht gefunden.,de_DE
quote_request.checkout.validation.error.not_found,Quote Request not found.,en_US
quote_request.checkout.validation.error.not_found,Angebotsanfrage nicht gefunden.,de_DE
quote_request.checkout.validation.error.wrong_status,The Request for Quote is in a wrong status at the moment.,en_US
quote_request.checkout.validation.error.wrong_status,Die Angebotsanfrage befindet sich zurzeit in einem falschen Status.,de_DE
quote_request.checkout.validation.error.wrong_version,The version of Request for Quote for this cart is outdated.,en_US
quote_request.checkout.validation.error.wrong_version,Die Version der Angebotsanfrage für diesen Warenkorb ist veraltet.,de_DE
quote_request.checkout.validation.error.wrong_valid_until,Request for Quote from which this cart was created is not valid anymore.,en_US
quote_request.checkout.validation.error.wrong_valid_until,"Angebotsanfrage, aus der dieser Warenkorb erstellt wurde, ist nicht mehr gültig.",de_DE
quote_request.checkout.convert.error.wrong_valid_until,Request for Quote is not valid anymore.,en_US
quote_request.checkout.convert.error.wrong_valid_until,Die Angebotsanfrage ist nicht mehr gültig.,de_DE
quote_request.update.validation.error.wrong_valid_until,The validity date of this request for quote is already passed. Please change the date to send to the customer.,en_US
quote_request.update.validation.error.wrong_valid_until,"Das Gültigkeitsdatum dieser Angebotsanfrage ist bereits abgelaufen. Bitte ändern Sie das Datum, um es an den Kunden zu senden.",de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 5) Set up behavior

#### Set up quote request workflow

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| QuoteRequestDatabaseStrategyPreCheckPlugin | Disallows database strategy when editing quote items. | None | Spryker\Client\QuoteRequest\Plugin\Quote |
| PersistentCartQuotePersistPlugin | Makes full replacement of the customer quote. | None | Spryker\Client\PersistentCart\Plugin |
| CloseOutdatedQuoteRequestConsole | Registers console command for closing outdated quote requests. | None | Spryker\Zed\QuoteRequest\Communication\Console |
| SanitizeQuoteRequestQuoteLockPreResetPlugin | Sanitizes data related to the request for a quote in the quote. | None | Spryker\Zed\QuoteRequest\Communication\Plugin\Cart |
| SanitizeSourcePricesQuoteLockPreResetPlugin| Sanitizes source prices in quote items. | None | Spryker\Zed\PriceCartConnector\Communication\Plugin\Cart |

**Pyz\Client\Quote\QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Quote;

use Spryker\Client\Quote\QuoteDependencyProvider as BaseQuoteDependencyProvider;
use Spryker\Client\QuoteRequest\Plugin\Quote\QuoteRequestDatabaseStrategyPreCheckPlugin;

class QuoteDependencyProvider extends BaseQuoteDependencyProvider
{
    /**
     * @return \Spryker\Client\QuoteExtension\Dependency\Plugin\DatabaseStrategyPreCheckPluginInterface[]
     */
    protected function getDatabaseStrategyPreCheckPlugins(): array
    {
        return [
            new QuoteRequestDatabaseStrategyPreCheckPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure editing quote request items does not trigger new quote creation in persistence.

{% endinfo_block %}

**Pyz\Client\PersistentCart\PersistentCartDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PersistentCart;

use Spryker\Client\PersistentCart\PersistentCartDependencyProvider as SprykerPersistentCartDependencyProvider;
use Spryker\Client\PersistentCartExtension\Dependency\Plugin\QuotePersistPluginInterface;
use Spryker\Client\PersistentCart\Plugin\PersistentCartQuotePersistPlugin;

class PersistentCartDependencyProvider extends SprykerPersistentCartDependencyProvider
{
    /**
     * @return \Spryker\Client\PersistentCartExtension\Dependency\Plugin\QuotePersistPluginInterface
     */
    protected function getQuotePersistPlugin(): QuotePersistPluginInterface
    {
        return new PersistentCartQuotePersistPlugin();
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can edit quote request items.

{% endinfo_block %}

**Pyz\Zed\Console\ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\QuoteRequest\Communication\Console\CloseOutdatedQuoteRequestConsole;


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
            new CloseOutdatedQuoteRequestConsole(),
        ];


        return $commands;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that status of quote request with outdated Valid Until changes to closed after you run `console quote-request:close-outdated` command.

{% endinfo_block %}

**Pyz/Client/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\PriceCartConnector\Communication\Plugin\Cart\SanitizeSourcePricesQuotePreUnlockPlugin;
use Spryker\Zed\QuoteApproval\Communication\Plugin\Cart\SanitizeQuoteApprovalPreQuoteUnlockPlugin;
use Spryker\Zed\QuoteRequest\Communication\Plugin\Cart\SanitizeQuoteRequestPreQuoteUnlockPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\QuoteLockPreResetPluginInterface[]
     */
    protected function getQuotePreUnlockPlugins(): array
    {
        return [
            new SanitizeQuoteRequestQuoteLockPreResetPlugin(),
            new SanitizeSourcePricesQuoteLockPreResetPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when you make lock reset for a cart, quote request associated with it removed.

{% endinfo_block %}


## Install feature frontend

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
|Spryker Core  | {{page.version}} |
| Cart | {{page.version}} |
| Company Account | {{page.version}} |
|Prices  | {{page.version}} |
|Agent Assist  | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/quotation-process: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ConfigurableBundleWidget | spryker-shop/configurable-bundle-widget|
| SalesConfigurableBundleWidget | spryker-shop/sales-configurable-bundle-widget |

{% endinfo_block %}

### 2) Add translations

Append glossary according to your configuration:

<details><summary>src/data/import/glossary.csv</summary>

```yaml
quote_request_widget.request_for_quote,Request for Quote,en_US
quote_request_widget.request_for_quote,Angebotsanfrage,de_DE
quote_request_widget.request_for_quote.list.title,Requests for Quote,en_US
quote_request_widget.request_for_quote.list.title,Angebotsanfragen,de_DE
quote_request_page.quote_request,Request for Quote,en_US
quote_request_page.quote_request,Angebotsanfrage,de_DE
quote_request_page.quote_request.create,Create,en_US
quote_request_page.quote_request.create,Erstellen,de_DE
quote_request_page.quote_request_version.created,RfQ have got new version,en_US
quote_request_page.quote_request_version.created,Angebotsanfrage hat neue Version bekommen,de_DE
quote_request_page.quote_request.submit,Submit Request,en_US
quote_request_page.quote_request.submit,Anfrage Einreichen,de_DE
quote_request_page.quote_request.metadata.label.note,Notes,en_US
quote_request_page.quote_request.metadata.label.note,Anmerkungen,de_DE
quote_request_page.quote_request.metadata.label.delivery_date,Do not ship later than,en_US
quote_request_page.quote_request.metadata.label.delivery_date,Versenden Sie nicht später als,de_DE
quote_request_page.quote_request.metadata.label.purchase_order_number,Purchase order number,en_US
quote_request_page.quote_request.metadata.label.purchase_order_number,Bestellnummer,de_DE
quote_request_page.quote_request.violations.invalid_date,Date should be greater than current date.,en_US
quote_request_page.quote_request.violations.invalid_date,Date should be greater than current date.,de_DE
quote_request_page.quote_request.created,Quote request created successfully.,en_US
quote_request_page.quote_request.created,Angebotsanfrage erfolgreich erstellt.,de_DE
quote_request_page.quote_request.list.reference,RfQ,en_US
quote_request_page.quote_request.list.reference,AfA,de_DE
quote_request_page.quote_request.list.company,Company,en_US
quote_request_page.quote_request.list.company,Firma,de_DE
quote_request_page.quote_request.list.business_unit,Business unit,en_US
quote_request_page.quote_request.list.business_unit,Geschäftseinheit,de_DE
quote_request_page.quote_request.list.owner,Owner,en_US
quote_request_page.quote_request.list.owner,Inhaber,de_DE
quote_request_page.quote_request.list.total,Total,en_US
quote_request_page.quote_request.list.total,Gesamt,de_DE
quote_request_page.quote_request.list.date,Date,en_US
quote_request_page.quote_request.list.date,Datum,de_DE
quote_request_page.quote_request.list.status,Status,en_US
quote_request_page.quote_request.list.status,Status,de_DE
quote_request_page.quote_request.list.actions,Actions,en_US
quote_request_page.quote_request.list.actions,Aktionen,de_DE
quote_request_page.quote_request.labels.date,Date,en_US
quote_request_page.quote_request.labels.date,Datum,de_DE
quote_request_page.quote_request.labels.status,Status,en_US
quote_request_page.quote_request.labels.status,Status,de_DE
quote_request_page.quote_request.labels.valid_till,Valid Till (UTC),en_US
quote_request_page.quote_request.labels.valid_till,Gültig bis (UTC),de_DE
quote_request_page.quote_request.labels.hide_latest_version,Hide latest version from customer,en_US
quote_request_page.quote_request.labels.hide_latest_version,Die letzte Version vom Kunden verstecken,de_DE
quote_request_page.quote_request.labels.latest_version_is_hidden,The latest version is hidden from the customer,en_US
quote_request_page.quote_request.labels.latest_version_is_hidden,Die letzte Version ist dem Kunden verborgen,de_DE
quote_request_page.quote_request.labels.latest_version_is_visible,The latest version is visible to the customer,en_US
quote_request_page.quote_request.labels.latest_version_is_visible,Die letzte Version ist für den Kunden sichtbar,de_DE
quote_request_page.quote_request.labels.history,History,en_US
quote_request_page.quote_request.labels.history,Geschichte,de_DE
quote_request_page.quote_request.labels.customer,Customer,en_US
quote_request_page.quote_request.labels.customer,Kunde,de_DE
quote_request_page.quote_request.labels.company,Company,en_US
quote_request_page.quote_request.labels.company,Unternehmen,de_DE
quote_request_page.quote_request.labels.business_unit,Business unit,en_US
quote_request_page.quote_request.labels.business_unit,Geschäftseinheit,de_DE
quote_request_page.quote_request.labels.information,RfQ Information,en_US
quote_request_page.quote_request.labels.information,Informationen zur Angebotsanfrage,de_DE
quote_request_page.quote_request.labels.version_information,Version Information,en_US
quote_request_page.quote_request.labels.version_information,Versionsinformation,de_DE
quote_request_page.quote_request.actions.view,View,en_US
quote_request_page.quote_request.actions.view,Ansehen,de_DE
quote_request_page.quote_request.actions.cancel,Cancel,en_US
quote_request_page.quote_request.actions.cancel,Stornieren,de_DE
quote_request_page.quote_request.actions.save,Save,en_US
quote_request_page.quote_request.actions.save,Sparen,de_DE
quote_request_page.quote_request.actions.back_to_list,Back to List,en_US
quote_request_page.quote_request.actions.back_to_list,Zurück zur Liste,de_DE
quote_request_page.quote_request.actions.back_to_view,Back to View,en_US
quote_request_page.quote_request.actions.back_to_view,Zurück zur Ansicht,de_DE
quote_request_page.quote_request.actions.send_to_customer,Send to Customer,en_US
quote_request_page.quote_request.actions.send_to_customer,Senden Sie an den Kunden,de_DE
quote_request_page.quote_request.actions.send_to_agent,Send to Agent,en_US
quote_request_page.quote_request.actions.send_to_agent,An Agent senden,de_DE
quote_request_page.quote_request.actions.save_and_back_to_edit,Save and Back to Edit,en_US
quote_request_page.quote_request.actions.save_and_back_to_edit,Speichern und zurück zum Bearbeiten,de_DE
quote_request_page.quote_request.actions.convert_to_cart,Convert to Cart,en_US
quote_request_page.quote_request.actions.convert_to_cart,In den Warenkorb konvertieren,de_DE
quote_request_page.quote_request.actions.revise,Revise,en_US
quote_request_page.quote_request.actions.revise,Überarbeiten,de_DE
quote_request_page.quote_request.actions.edit,Edit,en_US
quote_request_page.quote_request.actions.edit,Ändern,de_DE
quote_request_page.quote_request.actions.edit_items,Edit Items,en_US
quote_request_page.quote_request.actions.edit_items,Elemente bearbeiten,de_DE
quote_request_page.quote_request.view.empty,You do not have any quote requests yet.,en_US
quote_request_page.quote_request.view.empty,Sie haben noch keine Angebotsanfragen.,de_DE
quote_request_page.quote_request.updated,Quote request updated successfully.,en_US
quote_request_page.quote_request.updated,Angebotsanfrage erfolgreich aktualisiert.,de_DE
quote_request_page.quote_request.sent_to_customer,Quote request sent to customer successfully.,en_US
quote_request_page.quote_request.sent_to_customer,Angebotsanfrage erfolgreich an den Kunden gesendet.,de_DE
quote_request_page.quote_request.sent_to_user,Request for quote was successfully sent to the agent for processing.,en_US
quote_request_page.quote_request.sent_to_user,Die Angebotsanfrage wurde erfolgreich zur Bearbeitung an den Agenten gesendet.,de_DE
quote_request_page.quote_request.use_default_price,Use default price,en_US
quote_request_page.quote_request.use_default_price,Standardpreis verwenden,de_DE
quote_request_page.quote_request.converted_to_cart,Quote request converted to cart successfully.,en_US
quote_request_page.quote_request.converted_to_cart,Die Angebotsanfrage wurde erfolgreich in den Warenkorb konvertiert.,de_DE
quote_request_page.quote_request.edit_items_confirm,"You are editing RfQ <a href=""%link%"">%reference%</a> if you will leave it, all changes will be dropped.",en_US
quote_request_page.quote_request.edit_items_confirm,"Sie bearbeiten RfQ <a href=""%link%"">%reference%</a> wenn Sie es verlassen, werden alle Änderungen verworfen.",de_DE
agent.account.quote_request,Requests for Quote,en_US
agent.account.quote_request,Angebotsanfragen,de_DE
quote_request_agent_widget.quote_request,Request for Quote,en_US
quote_request_agent_widget.quote_request,Angebotsanfrage,de_DE
quote_request_agent_widget.items,Items,en_US
quote_request_agent_widget.items,Artikel,de_DE
quote_request_agent_widget.no_request_created,You do not have any quote requests yet.,en_US
quote_request_agent_widget.no_request_created,Sie haben noch keine Angebotsanfragen.,de_DE
quote_request_agent_widget.create_new_request,Create new RfQ,en_US
quote_request_agent_widget.create_new_request,Neue Angebotsanfrage,de_DE
quote_request_agent_widget.view_all_requests,View all requests,en_US
quote_request_agent_widget.view_all_requests,Alle Anfragen anzeigen,de_DE
quote_request_agent_widget.form.select_customer,Select customer,en_US
quote_request_agent_widget.form.select_customer,"Wählen Sie den Kunden aus",de_DE
quote_request_agent_page.checkout.step.save_rfq.title,Save Request For Quote,en_US
quote_request_agent_page.checkout.step.save_rfq.title,Angebotsanfrage speichern,de_DE
quote_request_page.quote_request.saved,Quote request saved successfully.,en_US
quote_request_page.quote_request.saved,Angebotsanfrage wurde erfolgreich gespeichert.,de_DE
quote_request_page.quote_request.actions.edit_address,Edit Address,en_US
quote_request_page.quote_request.actions.edit_address,Adresse bearbeiten,de_DE
quote_request_page.quote_request.actions.edit_shipment,Edit Shipment,en_US
quote_request_page.quote_request.actions.edit_shipment,Versandart bearbeiten,de_DE
quote_request_page.quote_request.edit_address_confirm,"You are editing Quote Request <a href=""%link%"">%reference%</a> if you will leave it, all changes will be dropped.",en_US
quote_request_page.quote_request.edit_address_confirm,"Sie bearbeiten Angebotsanfrage <a href=""%link%"">%reference%</a> wenn Sie es verlassen, werden alle Änderungen verworfen.",de_DE
quote_request_page.quote_request.edit_shipment_confirm,"You are editing Quote Request <a href=""%link%"">%reference%</a> if you will leave it, all changes will be dropped.",en_US
quote_request_page.quote_request.edit_shipment_confirm,"Sie bearbeiten Angebotsanfrage <a href=""%link%"">%reference%</a> wenn Sie es verlassen, werden alle Änderungen verworfen.",de_DE
quote_request_page.quote_request.shipment_counter,"Shipment %index% of %length%",en_US
quote_request_page.quote_request.shipment_counter,"Lieferung %index% von %length%",de_DE
quote_request_page.quote_request.empty_shipment_data,No shipment address / shipment method provided.,en_US
quote_request_page.quote_request.empty_shipment_data,Es wurde keine Lieferadresse / Lieferart angegeben.,de_DE
quote_request_page.quote_request.title_create,Create Quote Request,en_US
quote_request_page.quote_request.title_create,Angebotsanfrage erstellen,de_DE
quote_request_page.quote_request.title_edit,Edit #%id%,en_US
quote_request_page.quote_request.title_edit,Ändern #%id%,de_DE
quote_request_page.quote_request.title_attention,Attention,en_US
quote_request_page.quote_request.title_attention,Achtung,de_DE
quote_request_page.quote_request.title_addresses,Addresses,en_US
quote_request_page.quote_request.title_addresses,Adressen,de_DE
quote_request_page.quote_request.title_billing_address,Billing Address,en_US
quote_request_page.quote_request.title_billing_address,Rechnungsadresse,de_DE
quote_request_page.quote_request.title_delivery_address,Delivery address,en_US
quote_request_page.quote_request.title_delivery_address,Lieferadresse,de_DE
quote_request_page.quote_request.title_shipment_method,Shipment method,en_US
quote_request_page.quote_request.title_shipment_method,Versandmethode,de_DE
quote_request_page.quote_request.breadcrumb.create,Create,en_US
quote_request_page.quote_request.breadcrumb.create,Erstellen,de_DE
quote_request_page.quote_request.breadcrumb.edit,Edit,en_US
quote_request_page.quote_request.breadcrumb.edit,Ändern,de_DE
quote_request_page.quote_request.breadcrumb.attention,Attention,en_US
quote_request_page.quote_request.breadcrumb.attention,Achtung,de_DE
quote_request_page.quote_request.multiple_delivery_address,Multiple delivery addresses.,en_US
quote_request_page.quote_request.multiple_delivery_address,Mehrere Lieferadressen.,de_DE
quote_request_page.quote_request.multiple_shipment_method,Multiple shipment methods.,en_US
quote_request_page.quote_request.multiple_shipment_method,Mehrere Versandarten.,de_DE
quote_request_page.quote_request.empty_page,Your Quote is empty!,en_US
quote_request_page.quote_request.empty_page,Ihre Angebotsanfrage ist unvollständig!,de_DE
quote_request_page.quote_request.empty_delivery_address,No delivery address added.,en_US
quote_request_page.quote_request.empty_delivery_address,Keine Lieferadresse hinzugefügt.,de_DE
quote_request_page.quote_request.empty_address,No address added.,en_US
quote_request_page.quote_request.empty_address,Keine Adresse hinzugefügt.,de_DE
quote_request_page.quote_request.empty_shipment_method,No shipment method added.,en_US
quote_request_page.quote_request.empty_shipment_method,Keine Versandart hinzugefügt.,de_DE
quote_request_page.quote_request.cta_add_address,Add address,en_US
quote_request_page.quote_request.cta_add_address,Adresse hinzufügen,de_DE
quote_request_page.quote_request.cta_edit_address,Edit address,en_US
quote_request_page.quote_request.cta_edit_address,Adresse bearbeiten,de_DE
quote_request_page.quote_request.cta_add_shipment_method,Add shipment method,en_US
quote_request_page.quote_request.cta_add_shipment_method,Versandart hinzufügen,de_DE
quote_request_page.quote_request.cta_edit_shipment_method,Edit shipment method,en_US
quote_request_page.quote_request.cta_edit_shipment_method,Versandart bearbeiten,de_DE
quote_request_page.quote_request.item,%count% item(s),en_US
quote_request_page.quote_request.item,%count% artikel,de_DE
```
</details>

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Set up behavior

#### Set up quote request workflow

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|PurchaseOrderNumberMetadataFieldPlugin|Adds purchase order number to metadata for `QuoteRequest` form.|None|SprykerShop\Yves\QuoteRequestPage\Plugin\QuoteRequestPage|
|DeliveryDateMetadataFieldPlugin|Adds delivery date to metadata for `QuoteRequest` form.|None|SprykerShop\Yves\QuoteRequestPage\Plugin\QuoteRequestPage|
|NoteMetadataFieldPlugin|Adds note to metadata for `QuoteRequestAgent` form.|None|SprykerShop\Yves\QuoteRequestPage\Plugin\QuoteRequestPage|
|PurchaseOrderNumberMetadataFieldPlugin|Adds purchase order number to metadata for `QuoteRequestAgent` form.|None|SprykerShop\Yves\QuoteRequestAgentPage\Plugin\QuoteRequestAgentPage|
|DeliveryDateMetadataFieldPlugin|Adds delivery date to metadata for `QuoteRequestAgent` form.|None|SprykerShop\Yves\QuoteRequestAgentPage\Plugin\QuoteRequestAgentPage|
|NoteMetadataFieldPlugin|Adds note to metadata for `QuoteRequestAgent` form.|None|SprykerShop\Yves\QuoteRequestAgentPage\Plugin\QuoteRequestAgentPage|

**Pyz\Yves\QuoteRequestPage\QuoteRequestPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\QuoteRequestPage;

use SprykerShop\Yves\QuoteRequestPage\Plugin\QuoteRequestPage\DeliveryDateMetadataFieldPlugin;
use SprykerShop\Yves\QuoteRequestPage\Plugin\QuoteRequestPage\NoteMetadataFieldPlugin;
use SprykerShop\Yves\QuoteRequestPage\Plugin\QuoteRequestPage\PurchaseOrderNumberMetadataFieldPlugin;
use SprykerShop\Yves\QuoteRequestPage\QuoteRequestPageDependencyProvider as SprykerQuoteRequestPageDependencyProvider;

class QuoteRequestPageDependencyProvider extends SprykerQuoteRequestPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\QuoteRequestPageExtension\Dependency\Plugin\QuoteRequestFormMetadataFieldPluginInterface[]
     */
    protected function getQuoteRequestFormMetadataFieldPlugins(): array
    {
        return [
            new PurchaseOrderNumberMetadataFieldPlugin(),
            new DeliveryDateMetadataFieldPlugin(),
            new NoteMetadataFieldPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify that, as a customer, on quote request edit page, you can edit following fields **Purchase Order Number**, **DeliveryDate**, **Note**.

{% endinfo_block %}

**Pyz\Yves\QuoteRequestAgentPage\QuoteRequestAgentPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\QuoteRequestAgentPage;

use SprykerShop\Yves\QuoteRequestAgentPage\Plugin\QuoteRequestAgentPage\DeliveryDateMetadataFieldPlugin;
use SprykerShop\Yves\QuoteRequestAgentPage\Plugin\QuoteRequestAgentPage\NoteMetadataFieldPlugin;
use SprykerShop\Yves\QuoteRequestAgentPage\Plugin\QuoteRequestAgentPage\PurchaseOrderNumberMetadataFieldPlugin;
use SprykerShop\Yves\QuoteRequestAgentPage\QuoteRequestAgentPageDependencyProvider as SprykerQuoteRequestAgentPageDependencyProvider;

class QuoteRequestAgentPageDependencyProvider extends SprykerQuoteRequestAgentPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\QuoteRequestAgentPageExtension\Dependency\Plugin\QuoteRequestAgentFormMetadataFieldPluginInterface[]
     */
    protected function getQuoteRequestAgentFormMetadataFieldPlugins(): array
    {
        return [
            new PurchaseOrderNumberMetadataFieldPlugin(),
            new DeliveryDateMetadataFieldPlugin(),
            new NoteMetadataFieldPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify that, as an agent, on quote request edit page, you can edit following fields **Purchase Order Number**, **DeliveryDate**, **Note**.

{% endinfo_block %}

### 4) Enable controllers

#### Route list

Register the following route provider plugins:

| PROVIDER | NAMESPACE |
| --- | --- |
| QuoteRequestPageRouteProviderPlugin | SprykerShop\Yves\QuoteRequestPage\Plugin\Router |
| QuoteRequestAgentPageRouteProviderPlugin | SprykerShop\Yves\QuoteRequestAgentPage\Plugin\Router |
| QuoteRequestAgentWidgetRouteProviderPlugin | SprykerShop\Yves\QuoteRequestAgentWidget\Plugin\Router |
| QuoteRequestWidgetRouteProviderPlugin | SprykerShop\Yves\QuoteRequestWidget\Plugin\Router |

**src/Pyz/Yves/ShopApplication/YvesBootstrap.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\QuoteRequestAgentPage\Plugin\Router\QuoteRequestAgentPageRouteProviderPlugin;
use SprykerShop\Yves\QuoteRequestAgentWidget\Plugin\Router\QuoteRequestAgentWidgetRouteProviderPlugin;
use SprykerShop\Yves\QuoteRequestPage\Plugin\Router\QuoteRequestPageRouteProviderPlugin;
use SprykerShop\Yves\QuoteRequestWidget\Plugin\Router\QuoteRequestWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            new QuoteRequestAgentPageRouteProviderPlugin(),
            new QuoteRequestAgentWidgetRouteProviderPlugin(),
            new QuoteRequestPageRouteProviderPlugin(),
            new QuoteRequestWidgetRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify `QuoteRequestPageRouteProviderPlugin`, log in as company user and open quote request list page by the link: `http://mysprykershop.com/en/quote-request`

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify  `QuoteRequestAgentPageRouteProviderPlugin`, log in as agent and open quote request list page by the link: `http://mysprykershop.com/agent/quote-request`

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify  `QuoteRequestAgentWidgetRouteProviderPlugin`, log in as agent, go to  `http://mysprykershop.com/agent/quote-request/create` type three first letters from any company user email into the "Select customer" input and make sure that autocomplete works.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify `QuoteRequestWidgetRouteProviderPlugin`, log in as a company user, create quote request, go to Edit items page, ensure that you see the **Save** button in the right sidebar, click on it. Verify that changes that you've done for quote items saved.

{% endinfo_block %}

### 5) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- |--- |
|QuoteRequestMenuItemWidget|Displays quote request list link in the customer menu.  |None  |SprykerShop\Yves\QuoteRequestWidget\Widget |
|QuoteRequestCreateWidget |Displays create quote request button on a cart page.  |None  |SprykerShop\Yves\QuoteRequestWidget\Widget |
|QuoteRequestCartWidget | Displays action buttons on cart page when editing quote request items. |None  | SprykerShop\Yves\QuoteRequestWidget\Widget|
|QuoteRequestCancelWidget |Displays cancel button on a quote request list page.  |None  | SprykerShop\Yves\QuoteRequestWidget\Widget |
|QuoteRequestAgentOverviewWidget |Displays functionality for quote request manipulation for agent.  |None  |SprykerShop\Yves\QuoteRequestAgentWidget\Widget|
|QuoteRequestAgentCancelWidget|Displays cancel quote request button on agent quote request list page.  | None | SprykerShop\Yves\QuoteRequestAgentPage\Widget|
|QuoteRequestActionsWidget|Displays action buttons on checkout steps.  | None | SprykerShop\Yves\QuoteRequestWidget\Widget|

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\QuoteRequestWidget\Widget\QuoteRequestMenuItemWidget;
use SprykerShop\Yves\QuoteRequestWidget\Widget\QuoteRequestCreateWidget;
use SprykerShop\Yves\QuoteRequestWidget\Widget\QuoteRequestCartWidget;
use SprykerShop\Yves\QuoteRequestWidget\Widget\QuoteRequestCancelWidget;
use SprykerShop\Yves\QuoteRequestAgentWidget\Widget\QuoteRequestAgentOverviewWidget;
use SprykerShop\Yves\QuoteRequestAgentPage\Widget\QuoteRequestAgentCancelWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            QuoteRequestMenuItemWidget::class,
            QuoteRequestCreateWidget::class,
            QuoteRequestCartWidget::class,
            QuoteRequestCancelWidget::class,
            QuoteRequestAgentOverviewWidget::class,
            QuoteRequestAgentCancelWidget::class,
            QuoteRequestActionsWidget::class,
        ];
    }
}
```

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure the following widgets were registered:

| MODULE | TEST |
| --- | --- |
| QuoteRequestMenuItemWidget | Log in as a company user, go to **My Account** page, make sure that you see "Requests for Quote" link. |
| QuoteRequestCreateWidget| Log in as a company user, go to **Quote** page, make sure that you have some products in the cart. Make sure that you see **Request For Quote** button. |
QuoteRequestCartWidget | After you've pressed the **Edit Items** button on request for a quote, make sure that you see "Save" and **Send To Agent** buttons on a cart page. |
| QuoteRequestCancelWidget | Make sure that you see the **Cancel** button on the quote request page. |
| QuoteRequestAgentOverviewWidget | When you logged in as an agent make sure that you see a list of quote requests. |
| QuoteRequestAgentCancelWidget | Make sure that when you logged in as an agent you can see the **Cancel** button for each quote request. |
| QuoteRequestActionsWidget | Make sure that when you edit RFQ shipping data as a buyer, you can see **Cancel**, **Save**, and **Back** buttons on the shipment method page and **Back** button on the shipping address page. |
|
{% endinfo_block %}
