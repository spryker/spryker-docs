---
title: Manage PunchOut connections
description: Use the Back Office UI to create, configure, and maintain PunchOut connections and their customer credentials.
last_updated: May 29, 2026
template: howto-guide-template
label: early-access
---

This document describes how to manage PunchOut connections through the Back Office. The same data is stored in the `spy_punchout_connection`, `spy_punchout_credential`, and `spy_punchout_session` tables described in [Project configuration for PunchOut Gateway](/docs/pbc/all/punchout-gateway/project-configuration-for-punchout-gateway.html).

## Open the Back Office UI

In the Back Office, open *Punchout Connections*. The connections grid (`PunchoutConnectionTable`) lists every connection across all stores.

The grid shows:

- ID
- Name
- Protocol type (`oci` or `cxml`)
- Status
- Store
- Actions: *View*, *Edit*, *Activate*/*Deactivate*, *Delete*

## Create a connection

1. On the connections grid, select *Create connection*.
2. Fill in the common fields:

   | Field | Notes                                                                                                                                                                                           |
   |-------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
   | **Connection Name** | Human-readable label. Required. Up to 255 characters. Not unique.                                                                                                                               |
   | **Store** | Store the buyer must be logged in to.                                                                                                                                                           |
   | **Protocol Type** | `oci` or `cxml`. Cannot be changed after the connection is created.                                                                                                                             |
   | **Processor Plugin Class** | FQCN of a `PunchoutProcessorPluginInterface` (or `PunchoutCxmlProcessorPluginInterface`) implementation. The dropdown only offers plugins whose `getType()` matches the selected protocol type. |
   | **Active** | When unchecked, requests posted to this connection are rejected.                                                                                                                                |
   | **Allow iFrame** | When checked, the Storefront emits the iframe-friendly CSP headers while the session is active.                                                                                                 |

3. Fill in the protocol-specific fields, shown dynamically, when you select the protocol type.

   **cXML**

   | Field | Notes                                                                                                                                 |
   |-------|---------------------------------------------------------------------------------------------------------------------------------------|
   | **Sender Identity** | Must be unique. The buyer's `Header/Sender/Credential/Identity` is matched against this value.                                        |
   | **Sender Shared Secret** | The secret is stored hashed with `password_hash()`. The incoming `SharedSecret` is later verified with `password_verify()`. |

   The cXML request URL is fixed at `/punchout-cxml-setup`, optionally followed by a slug. To target a specific connection, post to `/punchout-cxml-setup/<slug>`.

   **OCI**

   | Field | Notes |
   |-------|-------|
   | **Request URL** | A slug appended to `/punchout-gateway/oci/`. Only `_`, `-`, letters, and digits are allowed. |
   | **Form Method** | HTTP method the buyer uses to submit the OCI login form (`POST` or `GET`). |
   | **Username Field Name** | Form field name carrying the username; defaults to `USERNAME`. |
   | **Password Field Name** | Form field name carrying the password; defaults to `PASSWORD`. |

4. Save the form. The new connection appears in the grid.

## Edit a connection

On the grid row, select *Edit*. The form opens with the same fields as the create form, except:

- **Protocol Type** is read-only.
- For cXML connections, the **Sender Shared Secret** field is blank. Leave it blank to keep the existing secret; type a new value to rotate it.

To toggle a connection on or off without opening the form, use the *Activate* / *Deactivate* action in the grid row.

## View a connection

The *View* action opens a read-only summary of the connection plus the credentials grid (`PunchoutCredentialViewTable`) for that connection. Use this view to inspect existing credentials and to add new ones.

## Delete a connection

The *Delete* action removes the connection. The cascade deletes also remove every `spy_punchout_credential` and every `spy_punchout_session` row that belongs to this connection. Deleting a connection ends every in-flight cart that was started from it.

## Manage credentials (OCI)

Credentials are required only for OCI connections. They map a username and password pair to a customer.

### Add a credential

1. Open the connection's *View* page.
2. Select *Add credential*.
3. Fill in:

   | Field | Notes |
   |-------|-------|
   | **Username** | Sent by the buyer in the `usernameField` form field. |
   | **Password** / **Repeat Password** | Stored as a `password_hash()` value. |
   | **Customer ID** | The Spryker customer to log in when this credential authenticates. Use the customer autocomplete (powered by `CustomerSuggestController`). |
   | **Active** | When unchecked, the credential is rejected even if the username and password match. |

4. Save.

### Edit a credential

Open the credential row and select *Edit*. To rotate the password, type a new value in **Password**; leave it blank to keep the existing hash.

### Toggle and delete

The credentials grid exposes *Activate* / *Deactivate* and *Delete* actions. Deleting a credential leaves the associated customer untouched.

## Console fallback

If the Back Office is not available (for example, in a fresh local environment), use the demo console commands described in [PunchOut connection configuration](/docs/pbc/all/punchout-gateway/project-configuration-for-punchout-gateway.html#punchout-connection-configuration) to seed one cXML and one OCI connection for store `DE`.
