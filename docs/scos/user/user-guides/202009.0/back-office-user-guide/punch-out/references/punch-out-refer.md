---
title: Reference information- Punchout
originalLink: https://documentation.spryker.com/v6/docs/punch-out-reference-information
redirect_from:
  - /v6/docs/punch-out-reference-information
  - /v6/docs/en/punch-out-reference-information
---

This topic contains the reference information for working in **Punch Out** > **Connections and Punch Out** > **Trnsactions Log**.

---
## Connections
On the Punch Out Connections page, you see the following:

* Connection ID and Name
* Connection type, status, and format
* Company and business unit the connection is set up for
* The date when the connection was created
* The actions you can perform


### Creating and Editing Transferred Cart Connection Page Attributes
The following table describes the attributes that are used when creating or updating a connection:

| Attribute | Description |
| --- | --- |
| Name | The name of your transferred cart, e.g. *SAP-cXML*. |
| Business Unit | A drop-down list with the business units the user will log in to. |
| Request Mapping | Mapping JSON for request. |
| Format | The format of the connection. Can be *OCI* or *cXML*. |
| Sender ID | Required field for the cXML connection setup that needs to be sent the buyer's ERP system. This ID validates the Punch Out setup request. |
| Shared Secret | Required field for the cXML connection setup that needs to be sent the buyer's ERP system. The shared secret validates the Punch Out setup request. |
| Username | The required field for the OCI connection setup that needs to be sent the buyer's ERP system. The username validates the Punch Out setup request. |
| Password | The required field for the OCI connection setup that needs to be sent the buyer's ERP system. The password validates the Punch Out setup request. |
| Type | A drop-down list with the available types of the connection, e.g *Setup Request*. |
| Set Description length on "Transfer to Requisition" | This field controls the maximum length on the description section for a transferred cart, e.g. 128. Any characters outside the limit will be cut off on a transferred cart. | 
| Cart Encoding | A drop-down list with the available cart encoding types: base64, url-encoded, no-encoding.This configuration varies based on the buyer's ERP requirements. Base64 is selected by default. |
| Totals Mode | A drop-down list with the available options: Line and Header. This configuration allows you to set whether the cart total is set in the header or on the line level, and it varies based on the buyer's ERP requirements. The header is not supported using the OCI connection type. |
| Cart Mapping | JSON mapping definition for cart mapping. |
| Default Supplier ID | A unique ID that is issued to a supplier after they have registered in the ERP. |
|Bundle Mode | A drop-down list with the available bundle modes: composite or bundle. With this attribute, you can configure how the bundle info is sent. If single mode is chosen, then the bundle product is sent as a line item, where the children products are added to the product description. For example, there exists a bundle product with 3 concrete products included in the bundle. In the request, such bundle will look like a single item with a long description. If composite mode is selected, then bundle product with its children is sent as separate line items with the reference to parent items. For example, there exists a bundle product with 3 concrete products included in the bundle. In the request, such bundle will look like 4 separate items, where the 1st one is the main (bundle itself) and the other three have the reference to the fist product. |
| Login Mode | A drop-down list with the available options: Dynamic User Creation and Single User. If the mode is selected to a Single User - then you need to pick an existing user in the Single User field from a list of available users. These users belong to the same Business Unit connection belongs to. The selected Single User will be used for login purposes. If mode is selected to a Dynamic User - then the mapping will be used to prepare/login or create a customer. |
| Default Business Unit | The field appears in case dynamic user creation. The user that will dynamically be created during the login, will belong to the business unit specified in this field. |
| Single User | The field appears in case single user login mode is selected. A drop-down list with the user details available for the single-user login. |

## Transactions Log
On the **Transactions Log** page, you see the following:

* Transaction ID 
* Message Type
* Business Unit
* Connection Name
* Transaction Status
* Session ID
* The date when the transaction was created



