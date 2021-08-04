---
title: Managing Punch out connections
originalLink: https://documentation.spryker.com/2021080/docs/managing-punchout-connections
redirect_from:
  - /2021080/docs/managing-punchout-connections
  - /2021080/docs/en/managing-punchout-connections
---

This topic describes how to create and manage the Punch Out connections.

## Prerequisites

To start working with connections, go to the *Punch Out* section.

Each section contains reference information. Make sure to review it before you start, or just look up the necessary information as you go through the process.

---

## Creating a punch out connection

To connect your ERP with the Spryker Commerce OS via the Punch Out protocol, you need to create a Punch Out connection.
To create the connection:
1. On the *Punch Out Connections* page, click **+New Connection** in the top right corner.
2. On the *Create Transferred Cart Connection* page, enter and select the attributes.
3. Click **Create**.

The following table describes the attributes that are used when creating or updating a connection:

## Reference information: Creating a punch out connections

The following table describes the attributes that are used when creating a connection:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | The name of your transferred cart, e.g., *SAP-cXML*. |
| Business Unit | A drop-down list with the business units the user will log in to. |
| Request Mapping | Mapping JSON for request. |
| Format | Format of the connection. Can be *OCI* or *cXML*. |
| Sender ID | Required field for the cXML connection setup that needs to be sent to the buyer's ERP system. This ID validates the Punch Out setup request. |
| Shared Secret | Required field for the cXML connection setup that needs to be sent to the buyer's ERP system. The shared secret validates the Punch Out setup request. |
| Username | Required field for the OCI connection setup that needs to be sent to the buyer's ERP system. Username validates the Punch Out setup request. |
| Password | Required field for the OCI connection setup that needs to be sent to the buyer's ERP system. The password validates the Punch Out setup request. |
| Type | Drop-down list with the available types of the connection, e.g., *Setup Request*. |
| Set Description length on "Transfer to Requisition" | This field controls the maximum length on the description section for a transferred cart, e.g., 128. Any characters outside the limit will be cut off on a transferred cart. | 
| Cart Encoding | Drop-down list with the available cart encoding types: base64, url-encoded, no-encoding. This configuration varies based on the buyer's ERP requirements. Base64 is selected by default. |
| Totals Mode | Drop-down list with the available options: Line and Header. This configuration allows you to set whether the cart total is set in the header or on the line level, and it varies based on the buyer's ERP requirements. The header is not supported using the OCI connection type. |
| Cart Mapping | JSON mapping definition for cart mapping. |
| Default Supplier ID | Unique ID that is issued to a supplier after they have registered in the ERP. |
|Bundle Mode | Drop-down list with the available bundle modes: composite or bundle. With this attribute, you can configure how the bundle info is sent. If single mode is chosen, then the bundle product is sent as a line item, where the children products are added to the product description. For example, there exists a bundle product with 3 concrete products included in the bundle. In the request, such a bundle will look like a single item with a long description. If composite mode is selected, then bundle product with its children is sent as separate line items with the reference to parent items. For example, there exists a bundle product with 3 concrete products included in the bundle. In the request, such a bundle will look like 4 separate items, where the first one is the main (bundle itself) and the other three have the reference to the first product. |
| Login Mode | Drop-down list with the available options: Dynamic User Creation and Single User. If the mode is selected to a Single User, then you need to pick an existing user in the *Single User* field from a list of available users. These users belong to the same Business Unit connection belongs to. The selected Single User will be used for login purposes. If mode is selected to a Dynamic User, then the mapping will be used to prepare/login or create a customer. |
| Default Business Unit | Field appears in case of dynamic user creation. The user that will be created dynamically during the login and will belong to the business unit specified in this field. |
| Single User | Field appears if the Single User login mode is selected. A drop-down list with the user details available for the single-user login. |

## Editing a punch out connection

If the connection details change, edit them.
To edit the connection:
1. In the **Actions** column of *List of Punch Out Connections*, click **Edit** for a specific connection.
2. On the **Edit Transferred Cart Connection** page, change the attributes.
3. Click **Save**.

### Reference information: editing punch out connections

The following table describes the attributes that are used when editing a connection

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | The name of your transferred cart, e.g., *SAP-cXML*. |
| Business Unit | A drop-down list with the business units the user will log in to. |
| Request Mapping | Mapping JSON for request. |
| Format | Format of the connection. Can be *OCI* or *cXML*. |
| Sender ID | Required field for the cXML connection setup that needs to be sent to the buyer's ERP system. This ID validates the Punch Out setup request. |
| Shared Secret | Required field for the cXML connection setup that needs to be sent to the buyer's ERP system. The shared secret validates the Punch Out setup request. |
| Username | Required field for the OCI connection setup that needs to be sent to the buyer's ERP system. Username validates the Punch Out setup request. |
| Password | Required field for the OCI connection setup that needs to be sent to the buyer's ERP system. The password validates the Punch Out setup request. |
| Type | Drop-down list with the available types of the connection, e.g., *Setup Request*. |
| Set Description length on "Transfer to Requisition" | This field controls the maximum length on the description section for a transferred cart, e.g., 128. Any characters outside the limit will be cut off on a transferred cart. | 
| Cart Encoding | Drop-down list with the available cart encoding types: base64, url-encoded, no-encoding. This configuration varies based on the buyer's ERP requirements. Base64 is selected by default. |
| Totals Mode | Drop-down list with the available options: Line and Header. This configuration allows you to set whether the cart total is set in the header or on the line level, and it varies based on the buyer's ERP requirements. The header is not supported using the OCI connection type. |
| Cart Mapping | JSON mapping definition for cart mapping. |
| Default Supplier ID | Unique ID that is issued to a supplier after they have registered in the ERP. |
|Bundle Mode | Drop-down list with the available bundle modes: composite or bundle. With this attribute, you can configure how the bundle info is sent. If single mode is chosen, then the bundle product is sent as a line item, where the children products are added to the product description. For example, there exists a bundle product with 3 concrete products included in the bundle. In the request, such a bundle will look like a single item with a long description. If composite mode is selected, then bundle product with its children is sent as separate line items with the reference to parent items. For example, there exists a bundle product with 3 concrete products included in the bundle. In the request, such a bundle will look like 4 separate items, where the first one is the main (bundle itself) and the other three have the reference to the first product. |
| Login Mode | Drop-down list with the available options: Dynamic User Creation and Single User. If the mode is selected to a Single User, then you need to pick an existing user in the *Single User* field from a list of available users. These users belong to the same Business Unit connection belongs to. The selected Single User will be used for login purposes. If mode is selected to a Dynamic User, then the mapping will be used to prepare/login or create a customer. |
| Default Business Unit | Field appears in case of dynamic user creation. The user that will be created dynamically during the login and will belong to the business unit specified in this field. |
| Single User | Field appears if the Single User login mode is selected. A drop-down list with the user details available for the single-user login. |

## Viewing entry points

Entry points are the Gateway URLs that are available for connection, where ERP can punch out.
To view the entry points, in the **Actions** column of *List of Punch Out Connections*, click **Entry Points**.

## Activating and deactivating a punch out connection

To activate or deactivate a connection, in the *Actions* column of *List of Punch Out Connections*, click:
* **Activate** to activate a connection.
* **Deactivate** to deactivate a connection.


