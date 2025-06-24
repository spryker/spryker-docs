---
title: Seven Senders — API requests
description: Learn how to manage Seven Senders API requests in Spryker Cloud Commerce OS to streamline shipping integrations and optimize logistics workflows.
template: concept-topic-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/shipment/seven-senders/seven-senders-api-requests.html
  - /docs/scos/dev/technology-partner-guides/202204.0/shipment/seven-senders/seven-senders-api-requests.html
  - /docs/scos/dev/technology-partner-guides/202311.0/shipment/seven-senders/seven-senders-api-requests.html
  - /docs/pbc/all/carrier-management/202204.0/base-shop/third-party-integrations/seven-senders/seven-senders-api-requests.html

---

`\SprykerEco\Zed\Inxmail\Business\Api\Adapter\EventAdapter` extending `\SprykerEco\Zed\Sevensenders\Business\Api\Adapter\SevensendersApiAdapter` contains everything for sending data to Seven Senders system for events.

You should use `\Generated\Shared\Transfer\SevensendersRequestTransfer` for request and `\Generated\Shared\Transfer\SevensendersResponseTransfer`

```xml
<?xml version="1.0"?>
<transfers xmlns="http://xsd.spryker.com"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://static.spryker.com http://static.spryker.com/transfer-01.xsd">

 <transfer name="SevensendersRequest">
 <property name="payload" type="array"/>
 </transfer>

 <transfer name="SevensendersResponse">
 <property name="requestPayload" type="array"/>
 <property name="responsePayload" type="array"/>
 <property name="status" type="int"/>
 <property name="status" type="int"/>
 </transfer>
</transfers>
```
