---
title: Amazon Pay - API
originalLink: https://documentation.spryker.com/v1/docs/amazon-pay-api
redirect_from:
  - /v1/docs/amazon-pay-api
  - /v1/docs/en/amazon-pay-api
---

So far we discussed the client-side implementation provided by Amazon Pay. On the Spryker side, the bundle provides the tools for rendering Amazon Pay widgets.

Another part of the implementation is the Amazon Pay API function wrapper, implemented as a Facade.

Each API call involves similar classes from the module:

* An adapter for adapting Amazon SDK that makes the rest of the module independent of the external library;
* A converter from Amazon responses to Spryker OS transfer objects;
* A logger for logging information about API calls;
* A transaction for updating transfer objects.

Since it is a standard Spryker OS practice, an entry point is a public method of the Facade, so, the flow for a typical transaction includes the following steps:

1. Logically grouping the affected order items, based on the transaction type:
* for authorize & capture - by AuthorizationReferenceId
* for refund & capture status update - by AmazonCaptureId
* no grouping is required for close and cancel since operations are performed for the whole order.
2. The following steps are executed for each group separately:
* Calling Facade method.
* Facade creates a related transaction handler or a collection of transaction handlers.
* The transaction handler has execute method expecting an AmazonCallTransfer object as a parameter.
* The transaction handler passes a transfer object to the adapter which is responsible for direct communication with the Amazon Pay API. Using the provided SDK it converts API responses into transfer objects using converters. Apart from adapters and converters, the rest of the code does not know anything about Amazon Pay API details and only works with Spryker OS transfer objects.
* If not all order items, belonging to a logical group, where requested for the update, a new group is created for affected order items.
* The transaction handler returns a modified transfer object. All information related to Amazon Pay is stored into.

## Initializing Quote Transfer Objects

After a user signs in via Amazon Pay, we can make API calls against the order. The first step is to initialize order data and store it to a quote transfer object using the Quote updater classes. These classes work in a similar way to transaction handlers. However, they only retrieve information from Amazon (if necessary) and then save it to a Quote.

**There are three steps for initializing a new order**:

1. Retrieve and update buyer information.
2. Create payment transfer objects.
3. Update Shipment.

Only the first step uses an API call while the other two are only about initializing.

The updater class for retrieving buyer data is called `GuestCustomerDataQuoteUpdater`. It uses a related adapter called `ObtainProfileInformationAdapter`, to make an API call and store data into the Quote transfer.

We have this call instead of taking current user data to create a separation between Spryker and Amazon accounts and enable the ability to make an order without a Spryker account.
If a logged in user places an order, the order would be still assigned to him and visible in the Customer area.

## Updating Shipment Address and Method

Once a buyer chooses a shipping address from the Address widget, a Javascript callback is triggered.
We notify server-side that the user has changed their shipment address (for example by making an ajax request to a URL ).
Then we use the Facade method `addSelectedAddressToQuote` to return the updated Quote object and save the updated quote.
Now the quote contains updated address information and it's possible to retrieve the location's available shipment methods.
Spryker provides a Shipment bundle and uses client classes and the `getAvailableMethods` method to retrieve the data to refresh it for the buyer.
Once shipment options are updated a buyer can choose one. Usually, the shipment method affects the total price of the order and it must be recalculated using the Spryker Calculation bundle.

## Placing an Order

Once all necessary information is selected, an order is ready to be placed. 
First, call all related API calls and then persist an order in the database.
All API related jobs are covered by only one Facade method confirmPurchase() which encapsulates three Amazon Pay API calls to be executed one by one: 

1. `SetOrderReferenceDetails` for specifying order total amount
2.  `ConfirmOrderReference` for confirming the order
3.  `GetOrderReferenceDetails` for retrieving information about buyer (like name and shipping address)

```php
/**
 * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
 *
 * @return \Generated\Shared\Transfer\QuoteTransfer
 */
public function execute(QuoteTransfer $quoteTransfer)
{
 foreach ($this->transactionHandlers as $transactionHandler) {
 $quoteTransfer = $transactionHandler->execute($quoteTransfer);

 if (!$quoteTransfer->getAmazonpayPayment()->getResponseHeader()->getIsSuccess()) {
 return $quoteTransfer;
 }
 }

 return $quoteTransfer;
}
```
Once a transaction finishes, we pass the updated quote transfer to the next transaction. If the transaction fails, we return the current one and it contains all information about an error and it can be retrieved and analyzed.

See the `AmazonpayResponseHeaderTransfer` object which can be retrieved from Quote transfer with `$quoteTransfer->getAmazonpayPayment()->getResponseHeader()`

Finally, if all steps go well, we can place an order using (for example) a client from the checkout module with an Amazon Pay saver plugin injected. If not, the decline flow takes place.

The next step is to authorize the order. It's a separate operation because in terms of PSD2 rules authorization happening in case the customer passed MFA challenge.

## Authorization in Asynchronous and Synchronous Modes. CaptureNow Setting

The authorization API call is configurable and it reflects the whole payment process. First, an important setting is transaction_timeout which defines the maximum number of minutes allocated for the Authorise operation call to be processed, after which the authorization is automatically declined and you cannot capture funds against the authorization. The value zero means that the authorization result has to be returned immediately and it is asynchronous authorization. For the synchronous authorization, the value must be above zero but less than maximal possible 1440.  Another important setting is CaptureNow. It can only be true or false and if set to true then both requests - Authorisation and Capture will be done in one step, within Authorise API call. Both setting are independent and may have all possible values. The whole order process and related State Machine depend on these settings and can be very different. 

## Handling Declined Payments. Synchronous Workflow
Amazon Pay documentation defines a workflow which has to be implemented on a merchant side. 
{image}
In some cases, declined payments involves additional API calls. This is why there is an additional transaction collection called `HandleDeclinedOrderTransaction`. This call goes after the Authorization step and encapsulates two transaction objects: 

`GetOrderReferenceDetailsTransaction` which was used previously and `CancelOrderTransaction`.

When all previous steps return a positive response and authorization is accepted it returns a Quote transfer object without any modifications. If payment is declined because of wrong payment method - there's nothing to do on a server-side.

If the reason is different, we can check the state of an order using `GetOrderReferenceDetailsTransaction`.

If it is open then the order must be canceled with a `CancelOrderTransaction` call.

The rest of the decline flow includes logic determining where to redirect a buyer. In sandbox mode, for each test account, Amazon provides fake payment methods for emulating error API responses.

{% info_block errorBox "Important!" %}
Even if a response has status code 200 it still may contain Constraint(s
{% endinfo_block %} in the response body.)

There is one special constraint related to the selected payment method `PaymentMethodNotAllowed`. If it occurs (rarely) the buyer should be redirected to the same page with address and payment widgets and be able to choose a different payment method and all other order parameters as well.

## Handling Declined Payments. Asynchronous Workflow
Unlike the synchronous authorisation, it is impossible to get the result of the authorization in the response. Authorization object stays in Pending state until authorized. Capture and Refund requests can also be processed in the same way and Amazon provides Internet Payment Notification (IPN) in order to notify the shop about the new status of any asynchronous request. IPN message is an HTTP request with some special Amazon-related headers and the body which is XML string containing all data. The merchant has to specify URL for receiving and processing IPN messages. The Bundle provides two Facade's methods 

`convertAmazonpayIpnRequest`(array `$headers`, `$body`) for converting Amazon request (which is HTTP headers and body) to the transfer object. For each type of IPN request Spryker provides related transfer object and method `convertAmazonpayIpnRequest()` returns one of them. For the processing of these transfer objects the Facade's method `handleAmazonpayIpnRequest` (`AbstractTransfer``$ipnRequestTransfer`) should be called. It `AbstractTransfer` type for its argument and it works with all types of IPN related transfer objects. A typical flow of a successful flow usually involves pending statuses of authorization and capture requests. Therefor related IPN messages have to be received and processed correctly. For retrieving same information Amazon provides also `GetAuthorizationDetails` and `GetCaptureDetails` functions and in Spryker, it is possible to update the pending statuses with State machine buttons. Once the button is clicked, the shop makes a related API call, receives a response and if the state is not pending then it updates order status according to the response message. The final status of a success flow is "capture completed". After that only Refund is available and refund workflow is asynchronous only and works in a similar way as asynchronous authorization.

The more tricky case is authorization declined workflow. It is similar to synchronous decline which was described above but everything goes asynchronously and involves additional IPN messages. First of all, Authorisation IPN comes with "Declined" state of authorization status. Another important information here is ReasonCode and it affects all further steps of the process. For the reason codes, `TransactionTimedOut` and `AmazonRejected` the order simply goes to "authorization declined" state but for the 

InvalidPaymentMethod the customer has to change the payment method to the correct one. In this case, order receives "authorization suspended" status and Amazon sends two additional IPN messages: `OrderNotification` with the state "Open" comes in after payment method is changed by buyer and Authorisation notification as a result of authorization of a new payment method. If the new payment method passes authorization successfully then the order goes to the "auth open" state and it is possible to request a capture. In both decline cases, it is important to notify the buyer about it by email since it's the only way for him to know that payment is not possible. The text of the email letter has to be different for `InvalidPaymentMethod` case. 

Another tricky moment about asynchronous flow is "Authorisation expired" situation. Each time the shop requests capture in the asynchronous mode it should check the current status of authorisation. Capture is only possible where the status of authorisation is "Open". If authorisation has status "Closed" and `ReasonCode` is either `ExpiredUnused` or `SellerClosed` then an order should be reauthorized with `CaptureNow` setting enabled. 

## Refund
After successful authorization and capture processes order receives the status "capture completed". From this state only one operation is possible and it is Refund. A refund can be partial if more than one item set to refund or full.

Amazon only requires the amount of money which has to be refunded and the calculation has to be implemented on the shop's side. Spryker provides a bundle for calculating the amount to refund. Regardless the chosen setting Refund is always asynchronous. Once requested, an order goes to "refund pending" status and then IPN notification will notify the shop if a refund was accepted or declined.
