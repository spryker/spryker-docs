

## Upgrading from version 5.* to version 7.0.0

{% info_block infoBox %}

In order to dismantle the Horizontal Barrier and enable partial module updates on projects, Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://spryker.com/en/support/) if you have any questions.

{% endinfo_block %}

## Upgrading from version 4.* to version 5.*

With the implementation of the quote storage strategies, the new version of the Cart module allows to use different behaviors for different strategies.
Since `QuoteClient::getStorageStrategy` method is used now, the Quote module's version must be 2.0.0 or higher.
`CartClientInterface::storeQuote` method is deprecated, remove it from your code and use `QuoteClientInterface::setQuote()` instead.
`CartClientInterface::getZedStub` method is deprecated, remove it from your code and use `\Spryker\Client\ZedRequest\ZedRequestClient::addFlashMessagesFromLastZedRequest` to push stack of ZED request messages to flash messages.

All logic from `CartClient` has been moved to `\Spryker\Client\Cart\Plugin\SessionQuoteStorageStrategyPlugin`.
Make sure that all your local overwrites of those methods have been moved there.
