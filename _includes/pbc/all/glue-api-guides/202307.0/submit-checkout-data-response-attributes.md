| ATTRIBUTE | TYPE | DESCRIPTION |
| ----------- | ----- | ----- |
| addresses | Array | A list of customer addresses that can be used for billing or shipping. This attribute is deprecated. To retrieve all available addresses, include the `addresses` resource in your request. |
| paymentProviders | Array | Payment providers that can be used for the checkout. This attribute is deprecated. To retrieve all the available payment methods, include the `payment-methods` resource in your request. |  
| shipmentMethods | Array | A list of available shipment methods. This attribute is deprecated. To retrieve all the available shipment methods, include the `shipment-methods` resource in your request. |  
| selectedShipmentMethods | Array | Shipment methods selected for the order. This value is returned only if you submit an order without shipments. See [Submit checkout data in version 202009.0](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-submit-checkout-data.html) to learn how to do that. |
| selectedPaymentMethods | Array | Payment methods selected for this order. |
| selectedPaymentMethods.paymentMethodName | String | Payment method name. |
| selectedPaymentMethods.paymentProviderName | String | Name of the payment provider for this payment method. |
| selectedPaymentMethods.priority | String | Defines the order of returned payment methods in ascending order. |
| selectedPaymentMethods.requiredRequestData | Array | A list of attributes required by the given method to effectuate a purchase. The actual list depends on the specific provider. |
