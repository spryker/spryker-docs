| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | ----------- | ----- | ----- |
| checkout-data | addresses | Array | A list of customer addresses that can be used for billing or shipping. This attribute is deprecated. To retrieve all available addresses, include the `addresses` resource in your request. |
| checkout-data | paymentProviders | Array | Payment providers that can be used for the checkout. This attribute is deprecated. To retrieve all the available payment methods, include the `payment-methods` resource in your request. |  
| checkout-data | shipmentMethods | Array | A list of available shipment methods. This attribute is deprecated. To retrieve all the available shipment methods, include the `shipment-methods` resource in your request. |  
| checkout-data | selectedShipmentMethods | Array | Shipment methods selected for the order.  |
| checkout-data | selectedPaymentMethods | Array | Payment methods selected for this order. |
| checkout-data | selectedPaymentMethods.paymentMethodName | String | Payment method name. |
| checkout-data | selectedPaymentMethods.paymentProviderName | String | Name of the payment provider for this payment method. |
| checkout-data | selectedPaymentMethods.priority | String | Defines the order of returned payment methods in ascending order. |
| checkout-data | selectedPaymentMethods.requiredRequestData | Array | A list of attributes required by the given method to effectuate a purchase. The actual list depends on the specific provider. |
