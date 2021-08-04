---
title: Punch Out Feature Overview
originalLink: https://documentation.spryker.com/v4/docs/punchout-feature-overview
redirect_from:
  - /v4/docs/punchout-feature-overview
  - /v4/docs/en/punchout-feature-overview
---

**Punch Out** is a technology that connects a buyer's e-procurement software with the e-commerce shops, in our case - with the Spryker Commerce OS. 

**E-procurement system** is a complicated and expensive business management software used to manage the purchase lifecycle, budget, etc. in large companies and enterprises. 

How does Punch Out work? A customer starts in their ERP system and then "punches out" to a Spryker e-commerce website to shop the catalog by adding the products into a shopping cart. Once they have what they need, their shopping cart is transferred back to their e-procurement system, and the customer finishes buying items in their system.

![Punch out flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Technology+Partner+Integrations/Punch+Out/Punch+Out+Feature+Overview/1.png){height="" width=""}

Punch Out has been developed together with the partner [PunchOut Catalogs](https://www.punchoutcatalogs.com/). In terms of Spryker Commerce OS, Punch Out feature provides user interface in the Back Office where you can configure the ability to log in to a Spryker-based store from within your e-procurement application, add products to cart, and transfer this cart to your ERP system. [PunchOut Catalogs](https://www.punchoutcatalogs.com/), in turn, handle the ERP-side communication and set up the workflow for Spryker.

## Punch Out Workflow
From the B2B buyer perspective, the Punch Out process typically involves the following steps:

1. The buyer logs in to their e-procurement system and clicks a link to connect to the supplier's Spryker store.
![Suppliers](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Technology+Partner+Integrations/Punch+Out/Punch+Out+Feature+Overview/erp-suppliers.png){height="" width=""}

2. The buyer gets immediately forwarded to the supplier's e-commerce store (Spryker web shop) within the buyer's e-procurement system. A Punch Out session is initiated.
![Supplier store](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Technology+Partner+Integrations/Punch+Out/Punch+Out+Feature+Overview/supplier-store.png){height="" width=""}

3. Authentication is handled with the help of the [Customer login by token](https://documentation.spryker.com/v4/docs/customer-login-by-token-201907) feature. So, the buyer doesn't need to enter any login details to get to the customer account. The [Vault for Tokens](https://documentation.spryker.com/v4/docs/vault-for-tokens-201907) feature allows securely keeping the sensitive data (username and password) and retrieving it on request.
4. The buyer browses the store and adds items to their shopping cart.
![Shopping cart supplier](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Technology+Partner+Integrations/Punch+Out/Punch+Out+Feature+Overview/shopping-cart-supplier.png){height="" width=""}

5. When the buyer is finished, they punch out the cart - the cart gets transferred to the e-procurement platform in the cXML/OCI format. After that, the buyer passes through the necessary workflow steps in their ERP. 
![Punch out cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Technology+Partner+Integrations/Punch+Out/Punch+Out+Feature+Overview/cart-punch-out.png){height="" width=""}

## Punch Out Formats
The cart from Spryker Commerce OS is transferred to the client's ERP using [cXML](https://en.wikipedia.org/wiki/CXML) or [OCI](https://en.wikipedia.org/wiki/Open_Catalog_Interface) formats. Both standards provide similar functionality. 
{% info_block warningBox "Note" %}
Spyker only provides the user interface in the Back Office where the connection between Spryker Commerce OS and customer's e-procurement system is set up. The ERP-related workflows and logics are managed by our partner [PunchoutCatalogs](https://www.punchoutcatalogs.com/
{% endinfo_block %}.)

### cXML
cXML is the most popular and supported standard, and it is based on the XML format. cXML is used by most e-procurement systems and allows to modify and validate the cart data without prior knowledge of their form and the included fields.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.021/cXML.dtd">
<cXML payloadID="2019-08-14T12:17:25+00:00.571727569@zed.mysprykershop.punchout.com" timestamp="2019-08-14T12:17:25+00:00" xml:lang="en-US">
    <Response>
        <Status code="200" text="OK"/>
        <PunchOutSetupResponse>
            <StartPage>
                <URL>https://mysprykershop.punchout.com/en/access-token/eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhlOGU0MzMwOTUxZGU3MTU0NjE4ODQ4YWI2OTQ2NjA3MTM1ZjFlMzI3ODEyNmQ4MTNlNGFjNzVlOWU3NzQzYjA4NmIxYTdjMTFiNjRmNzhhIn0.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6IjhlOGU0MzMwOTUxZGU3MTU0NjE4ODQ4YWI2OTQ2NjA3MTM1ZjFlMzI3ODEyNmQ4MTNlNGFjNzVlOWU3NzQzYjA4NmIxYTdjMTFiNjRmNzhhIiwiaWF0IjoxNTY1Nzg1MDQ1LCJuYmYiOjE1NjU3ODUwNDUsImV4cCI6MTU2NTgxMzg0NSwic3ViIjoie1wicHVuY2hvdXRfY2F0YWxvZ19pbXBlcnNvbmF0aW9uX2RldGFpbHNcIjp7XCJpc19wdW5jaG91dFwiOnRydWUsXCJwcm90b2NvbF9kYXRhXCI6e1wib2NpX2NyZWRlbnRpYWxzXCI6bnVsbCxcImN4bWxfdG9fY3JlZGVudGlhbHNcIjp7XCJpZGVudGl0eVwiOlwiU3ByeWtlckluY1wiLFwiZG9tYWluXCI6XCJOZXR3b3JrSWRcIixcInNoYXJlZF9zZWNyZXRcIjpudWxsfSxcImN4bWxfc2VuZGVyX2NyZWRlbnRpYWxzXCI6e1wiaWRlbnRpdHlcIjpcInVzZXJfMlwiLFwiZG9tYWluXCI6XCJOZXR3b3JrSWRcIixcInNoYXJlZF9zZWNyZXRcIjpcInVzZXJfMl9wYXNzXCJ9LFwiY2FydFwiOntcInVybFwiOlwiaHR0cHM6XFxcL1xcXC91YXQuYnV5ZXJxdWVzdC5uZXRcXFwvc3ByeWtlclxcXC9wdW5jaG91dGNsaWVudFxcXC90cmFuc2FjdGlvbnNcXFwvY3htbHJlc3BvbnNlXFxcL2Nvbm5faWRcXFwvMlxcXC9cIixcInRhcmdldFwiOm51bGwsXCJvcGVyYXRpb25cIjpcImNyZWF0ZVwiLFwiYnV5ZXJfY29va2llXCI6XCJhMWNmYTg3ZGQ0NTQ0YTgxNDlmMGJkNTE2ZTBlMDA5NFwiLFwiZGVwbG95bWVudF9tb2RlXCI6XCJwcm9kdWN0aW9uXCJ9fSxcInB1bmNob3V0X3Nlc3Npb25faWRcIjpcImIyZjU2YzhiLWYxNjQtNTBlOC1iZmFkLTgyMTYyNzc3MzAwZlwiLFwicHVuY2hvdXRfY2F0YWxvZ19jb25uZWN0aW9uX2lkXCI6MyxcInB1bmNob3V0X2NhdGFsb2dfY29ubmVjdGlvbl9jYXJ0XCI6e1wiZGVmYXVsdF9zdXBwbGllcl9pZFwiOlwic3ByeWtlcl9zdXBfM1wiLFwibWF4X2Rlc2NyaXB0aW9uX2xlbmd0aFwiOjAsXCJidW5kbGVfbW9kZVwiOlwic2luZ2xlXCIsXCJ0b3RhbHNfbW9kZVwiOlwibGluZVwifSxcInB1bmNob3V0X2xvZ2luX21vZGVcIjpcInNpbmdsZV91c2VyXCJ9LFwiY3VzdG9tZXJfcmVmZXJlbmNlXCI6bnVsbCxcImlkX2N1c3RvbWVyXCI6MTAsXCJpZF9jb21wYW55X3VzZXJcIjpcIjEyXCIsXCJwZXJtaXNzaW9uc1wiOm51bGx9Iiwic2NvcGVzIjpbXX0.5jfrKUimcSUpNTgIWrqH7W9d4qbHi_LHQeaR0ifREkkQiX_Kr-leYLsCA-Jaa7TsSbALiliw3hOaYrccme3-XcpynBW7mDxPBVARqWU5QrcfIO1q-i6bWBRvnb_8tHy_HU17Bw4Uz3ulY8CAq_qq3PhZDYxGCcmD3DeYj7bCCURx-xkPacV9qOPaQrS_H51zVvo62mBDLZTBEbXeSbb16TjwkyT330zG9SPumaTiZb55c6gkSm8PQfRms3P8ure93ElJ1B_aMRIk2LJsWIKyCycvW2JRnGtVJtedQiIq_gJLacVjkMbIiiw134UGQsoJt-d2jOcvC64fnPNBG9RTfQ?returnUrl=home</URL>
            </StartPage>
        </PunchOutSetupResponse>
    </Response>
</cXML>
```
### OCI
OCI is the Open Catalog Interface standard that is needed to integrate with specific ERP applications that do not support cXML. Example OCI response:
```html
<html>
    <body>
        <span style="font-style:italic; font-size:12px; color:#7D8083;">Redirecting to supplier website...</span>
            <script type="text/javascript">window.location.href = 'https://https://mysprykershop.punchout.com/en/access-token/eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQzOWI4MDkxODg5NmZiZjRjMGE4ZTJmYTE2OWEwZjljMDE0OTM4YWY0M2RlMjJkZGJmNDNjZjRjYjRjOGQ5NWIxMjRlYmRlNzlhYTgzOTVjIn0.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6ImQzOWI4MDkxODg5NmZiZjRjMGE4ZTJmYTE2OWEwZjljMDE0OTM4YWY0M2RlMjJkZGJmNDNjZjRjYjRjOGQ5NWIxMjRlYmRlNzlhYTgzOTVjIiwiaWF0IjoxNTY1MTg5NTQwLCJuYmYiOjE1NjUxODk1NDAsImV4cCI6MTU2NTIxODM0MCwic3ViIjoie1wicHVuY2hvdXRfY2F0YWxvZ19pbXBlcnNvbmF0aW9uX2RldGFpbHNcIjp7XCJpc19wdW5jaG91dFwiOnRydWUsXCJwcm90b2NvbF9kYXRhXCI6e1wib2NpX2NyZWRlbnRpYWxzXCI6e1widXNlcm5hbWVcIjpcInVzZXJfMVwiLFwicGFzc3dvcmRcIjpcInVzZXJfMV9wYXNzXCJ9LFwiY3htbF90b19jcmVkZW50aWFsc1wiOm51bGwsXCJjeG1sX3NlbmRlcl9jcmVkZW50aWFsc1wiOm51bGwsXCJjYXJ0XCI6e1widXJsXCI6XCJodHRwczpcXFwvXFxcL3VhdC5idXllcnF1ZXN0Lm5ldFxcXC9zcHJ5a2VyXFxcL3B1bmNob3V0Y2xpZW50XFxcL3RyYW5zYWN0aW9uc1xcXC9vY2lyZXNwb25zZVxcXC9jb25uX2lkXFxcLzNcXFwvXCIsXCJ0YXJnZXRcIjpcIl9wYXJlbnRcIixcIm9wZXJhdGlvblwiOlwiY3JlYXRlXCIsXCJidXllcl9jb29raWVcIjpudWxsLFwiZGVwbG95bWVudF9tb2RlXCI6bnVsbH19LFwicHVuY2hvdXRfc2Vzc2lvbl9pZFwiOlwiZmM1NThhNjAtODYzOS01YjU5LWI3MTAtOWM5NGI4ODM0ZTBmXCIsXCJwdW5jaG91dF9jYXRhbG9nX2Nvbm5lY3Rpb25faWRcIjoyLFwicHVuY2hvdXRfY2F0YWxvZ19jb25uZWN0aW9uX2NhcnRcIjp7XCJkZWZhdWx0X3N1cHBsaWVyX2lkXCI6XCJzcHJ5a2VyX3N1cF8yXCIsXCJtYXhfZGVzY3JpcHRpb25fbGVuZ3RoXCI6MTI4LFwiYnVuZGxlX21vZGVcIjpcImNvbXBvc2l0ZVwiLFwidG90YWxzX21vZGVcIjpcImxpbmVcIn0sXCJwdW5jaG91dF9sb2dpbl9tb2RlXCI6XCJkeW5hbWljX3VzZXJfY3JlYXRpb25cIn0sXCJjdXN0b21lcl9yZWZlcmVuY2VcIjpudWxsLFwiaWRfY3VzdG9tZXJcIjozMCxcImlkX2NvbXBhbnlfdXNlclwiOlwiMzJcIixcInBlcm1pc3Npb25zXCI6bnVsbH0iLCJzY29wZXMiOltdfQ.W9LWyZSx1xC16lCtfbpGfJkySi9io0OoFWzpO_t9wMCUQuhDDdAyu7KvETy5JnJ1tKukiPvlaCxg60TvNSeOhSfjd62l7rghTh6EXBS4q3RfCg3w-zuEDZBOk__P3CLn-ugt5tkdBews05q31f9gQpCnbTj073qGGxGub6iQWoQKKLTc9kyv7lgU8uVF6s62kubVYPHRj6pQX6XQNHmEX0rrVS63Qmvm9Tj5EVUqAZQVsv3qYGfuOiJz91Yy0bRgtGkBw1h8tpgPBTfRknypD3cF1OWh-3-u3eis_jx7iPut_Evw-P9-GI88nQAYJwhajjol-6z7KTmrkPVg25IxaA?returnUrl=home';</script>
    </body>
</html>
```
In case a company user transfers the cart in the Net Prices mode, every part of the cart (discounts, taxes, additional prices and fees) is added in a separate field in the transfer request. For Gross Mode, taxes are already included in the item price, so they will not have a separate field.

## Punch Out Architecture and Database Relations 
A high-level overview of the Punch Out Architecture is schematically represented below:
![Punch out architecture and database relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Technology+Partner+Integrations/Punch+Out/Punch+Out+Feature+Overview/2.png){height="" width=""}

Database relations are represented in the following schema:
![Schema of database relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Technology+Partner+Integrations/Punch+Out/Punch+Out+Feature+Overview/module-schema-punch-out.png){height="" width=""}

The following table provides more details on the database structure:

|Table | Field | Constraints | Description |
| --- | --- | --- | --- |
| `pwg_punchout_catalog_connection` |  |  |  |
|  | `username` |  | Username of the connection authentication. |
|  | `credentials` |  | Additional custom data required for authentication that is stored in JSON. |
|  | `format` |  | This type defines the punchout workflow step for which this connection can be used. The type also predefines the necessary tables to join (e.g., `pwg_punchout_catalog_connection_setup`). |
|  | `mapping` | optional | Format of communication: cxml or oci. |
| `pwg_punchout_catalog_connection_setup` |  |  |  |
|  | `id_punchout_catalog_connection_setup` | foreign key | One-to-one relation with `id_punchout_catalog_connection`. |
|  | `fk_company_business_unit` |  | Allows customers to configure the BU where the new company user is created (dynamic login mode). |
|  | `fk_company_user` | optional |Defines a dedicated company user that will be used by all ERP users (single company user login mode). |
|  | `login_mode` |  | Defines if the connection uses "dynamic login" or "single company user login". |
| `pwg_punchout_catalog_connection_cart` |  |  |  |
|  | `id_punchout_catalog_connection_cart` | foreign key | One-to-one relation with `id_punchout_catalog_connection`. |
|  | `max_description_length` |  |Maximum length during Cart sending for: content + description + name fields. |
|  | `encoding` |  | Cart encoding options: base64, url-encoded, no-encoding |
|  | `mapping` |  | JSON mapping definition for cart mapping. |
|  | `default_supplier_id` |  | The supplier of the products. |
|  | `bundle_mode` | optional | In case bundles are available, it decides how to send the bundle info: NULL (bundles are not available),  single, composite |
|`pwg_punchout_catalog_transaction` |  |  |  |
|  | `fk_company_business_unit` | foreign key, optional |  |
|  | `fk_punchout_catalog_connection` | optional | Only available if the connection authentication has passed. |
|  | `message` |  | The full content of the request before modifications. |
|  | `status` |  | Boolean: true / false (success / failure). |
|  | `type` |  | Type of the communication: `setup_request` / `setup_response` / ... |
|  | `connection_session_id` |  | UUID, based on available data before Connection Authentication. |
|  | `raw_data` |  | JSON |
|  | `error_message` |  | General error message during the process. |

<!-- Last review date: Aug 30, 2019 by Oksana Karasyova-->
