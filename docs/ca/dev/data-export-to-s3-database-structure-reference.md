---
title: Data export to S3 - database structure reference
description: Reference guide for identifying which database tables to include when configuring data exports to S3.
template: concept-topic-template
last_updated: March 18, 2026
---

When requesting a data export to S3, you need to specify which database tables to include.

If you know exactly which tables contain the data you need, you can request an export for just those specific tables. However, if you're unsure where certain data lives or need a complete picture of a business domain, this guide helps you identify all the relevant tables.

## How Spryker stores data

Spryker stores business data across multiple relational tables that together form logical domain aggregates. For example, an order is not stored in a single table but spread across tables for addresses, items, payments, shipments, and more.

This guide organizes tables by business domain to help you:
- Discover which tables are related to a specific domain
- Ensure you don't miss important data when exporting a complete domain
- Identify project-specific tables that extend standard Spryker tables

The tables are grouped into two categories:

- **Standard tables**: The default Spryker tables for each domain, listed in [Standard tables by domain](#standard-tables-by-domain).
- **Project-specific tables**: Custom tables your project may have added. See [Identify project-specific tables](#identify-project-specific-tables).

## Standard tables by domain

The following sections list the standard Spryker tables for common business domains. You can reference these lists or use them as a baseline when requesting an export.

### Order

Tables containing order data, including items, addresses, payments, shipments, returns, and reclamations.

<details>
<summary>View Order tables</summary>

| Table |
|-------|
| spy_sales_order |
| spy_sales_order_item |
| spy_sales_order_address |
| spy_sales_order_address_history |
| spy_sales_order_comment |
| spy_sales_order_configured_bundle |
| spy_sales_order_configured_bundle_item |
| spy_sales_order_invoice |
| spy_sales_order_item_bundle |
| spy_sales_order_item_configuration |
| spy_sales_order_item_metadata |
| spy_sales_order_item_option |
| spy_sales_order_note |
| spy_sales_order_threshold |
| spy_sales_order_threshold_tax_set |
| spy_sales_order_threshold_type |
| spy_sales_order_totals |
| spy_sales_discount |
| spy_sales_discount_code |
| spy_sales_expense |
| spy_sales_merchant_commission |
| spy_sales_payment |
| spy_sales_payment_detail |
| spy_sales_payment_merchant_payout |
| spy_sales_payment_merchant_payout_reversal |
| spy_sales_payment_method_type |
| spy_sales_reclamation |
| spy_sales_reclamation_item |
| spy_sales_return |
| spy_sales_return_item |
| spy_sales_return_reason |
| spy_sales_shipment |
| spy_sales_shipment_type |
| spy_refund |
| spy_merchant_relationship_sales_order_threshold |
| spy_merchant_sales_order |
| spy_merchant_sales_order_item |
| spy_merchant_sales_order_totals |
| spy_ssp_inquiry_sales_order |
| spy_ssp_inquiry_sales_order_item |

</details>

### Order Management System (OMS)

Tables containing order state machine data, including states, transitions, timeouts, and reservations.

<details>
<summary>View OMS tables</summary>

| Table |
|-------|
| spy_oms_event_timeout |
| spy_oms_order_item_state |
| spy_oms_order_item_state_history |
| spy_oms_order_process |
| spy_oms_product_offer_reservation |
| spy_oms_product_reservation |
| spy_oms_product_reservation_change_version |
| spy_oms_product_reservation_last_exported_version |
| spy_oms_product_reservation_store |
| spy_oms_state_machine_lock |
| spy_oms_transition_log |

</details>

### Product

Tables containing product data, including abstract and concrete products, attributes, images, labels, options, bundles, and relations.

<details>
<summary>View Product tables</summary>

| Table |
|-------|
| spy_product |
| spy_product_abstract |
| spy_product_abstract_group |
| spy_product_abstract_localized_attributes |
| spy_product_abstract_product_option_group |
| spy_product_abstract_set |
| spy_product_abstract_store |
| spy_product_alternative |
| spy_product_attribute_key |
| spy_product_bundle |
| spy_product_category |
| spy_product_category_filter |
| spy_product_configuration |
| spy_product_customer_permission |
| spy_product_discontinued |
| spy_product_discontinued_note |
| spy_product_group |
| spy_product_image |
| spy_product_image_set |
| spy_product_image_set_to_product_image |
| spy_product_label |
| spy_product_label_localized_attributes |
| spy_product_label_product_abstract |
| spy_product_label_store |
| spy_product_list |
| spy_product_list_category |
| spy_product_list_product_concrete |
| spy_product_localized_attributes |
| spy_product_management_attribute |
| spy_product_management_attribute_value |
| spy_product_management_attribute_value_translation |
| spy_product_measurement_base_unit |
| spy_product_measurement_sales_unit |
| spy_product_measurement_sales_unit_store |
| spy_product_measurement_unit |
| spy_product_offer |
| spy_product_offer_store |
| spy_product_offer_validity |
| spy_product_option_group |
| spy_product_option_value |
| spy_product_option_value_price |
| spy_product_packaging_unit |
| spy_product_packaging_unit_type |
| spy_product_quantity |
| spy_product_relation |
| spy_product_relation_product_abstract |
| spy_product_relation_store |
| spy_product_relation_type |
| spy_product_review |
| spy_product_search |
| spy_product_search_attribute |
| spy_product_search_attribute_archive |
| spy_product_search_attribute_map |
| spy_product_search_attribute_map_archive |
| spy_product_set |
| spy_product_set_data |
| spy_product_validity |
| spy_configurable_bundle_template |
| spy_configurable_bundle_template_slot |
| spy_price_product |
| spy_price_product_default |
| spy_price_product_merchant_relationship |
| spy_price_product_offer |
| spy_price_product_schedule |
| spy_price_product_schedule_list |
| spy_price_product_store |
| spy_price_type |
| spy_tax_set |
| spy_tax_rate |
| spy_tax_set_tax |
| spy_url |
| spy_currency |
| spy_currency_store |
| spy_store |
| spy_store_context |
| spy_locale |
| spy_locale_store |

</details>

### Customer

Tables containing customer data, including addresses, groups, notes, and company associations.

<details>
<summary>View Customer tables</summary>

| Table |
|-------|
| spy_customer |
| spy_customer_address |
| spy_customer_data_change_request |
| spy_customer_group |
| spy_customer_group_to_customer |
| spy_customer_note |
| spy_product_customer_permission |
| spy_company_user |
| spy_company |
| spy_company_business_unit |
| spy_company_role_to_company_user |
| spy_company_user_file |
| spy_company_user_invitation |
| spy_company_user_invitation_status |
| spy_company_role |
| spy_company_store |
| spy_company_unit_address |
| spy_company_business_unit_file |
| spy_company_unit_address_to_company_business_unit |
| spy_company_file |
| spy_company_role_to_permission |
| spy_company_unit_address_label |
| spy_company_unit_address_label_to_company_unit_address |
| spy_permission |
| spy_locale |

</details>

### Merchant

Tables containing merchant data, including profiles, commissions, opening hours, and product associations.

<details>
<summary>View Merchant tables</summary>

| Table |
|-------|
| spy_merchant |
| spy_merchant_app_onboarding |
| spy_merchant_app_onboarding_status |
| spy_merchant_category |
| spy_merchant_commission |
| spy_merchant_commission_amount |
| spy_merchant_commission_group |
| spy_merchant_commission_merchant |
| spy_merchant_commission_store |
| spy_merchant_opening_hours_date_schedule |
| spy_merchant_opening_hours_weekday_schedule |
| spy_merchant_product_abstract |
| spy_merchant_product_option_group |
| spy_merchant_profile |
| spy_merchant_profile_address |
| spy_merchant_sales_order |
| spy_merchant_sales_order_item |
| spy_merchant_sales_order_totals |
| spy_merchant_stock |
| spy_merchant_store |
| spy_sales_merchant_commission |
| spy_sales_payment_merchant_payout |
| spy_sales_payment_merchant_payout_reversal |
| spy_date_schedule |
| spy_weekday_schedule |
| spy_store |
| spy_product_offer |
| spy_product_offer_stock |
| spy_product_offer_store |
| spy_product_offer_validity |
| spy_product_offer_service |
| spy_product_offer_shipment_type |
| spy_price_product_offer |
| spy_currency |
| spy_price_product |
| spy_price_product_default |
| spy_price_type |

</details>

### Price

Tables containing pricing data, including product prices, scheduled prices, and merchant-specific pricing.

<details>
<summary>View Price tables</summary>

| Table |
|-------|
| spy_price_product |
| spy_price_product_default |
| spy_price_product_offer |
| spy_price_product_schedule |
| spy_price_product_schedule_list |
| spy_price_product_store |
| spy_price_type |
| spy_price_product_merchant_relationship |
| spy_product_option_value_price |
| spy_shipment_method_price |
| spy_currency |
| spy_product |
| spy_product_abstract |
| spy_product_option_value |
| spy_shipment_method |
| spy_store |
| spy_merchant_relationship |

</details>

### Stock

Tables containing inventory and availability data.

<details>
<summary>View Stock tables</summary>

| Table |
|-------|
| spy_availability |
| spy_availability_abstract |
| spy_stock |
| spy_stock_address |
| spy_stock_product |
| spy_stock_store |
| spy_store |
| spy_product_offer_stock |

</details>

### Category

Tables containing category hierarchy, attributes, and images.

<details>
<summary>View Category tables</summary>

| Table |
|-------|
| spy_category |
| spy_category_attribute |
| spy_category_closure_table |
| spy_category_image |
| spy_category_image_set |
| spy_category_image_set_to_category_image |
| spy_category_node |
| spy_category_store |
| spy_category_template |
| spy_merchant_category |
| spy_product_category |
| spy_store |

</details>

## Identify project-specific tables

Your project may include custom tables that extend the standard Spryker domains. To ensure complete exports, identify these tables and include them alongside the standard tables.

Run the following SQL query against your database to find tables related to a specific domain. Replace the table names in the `IN` clause with the base tables of your target domain.

**Example for Order domain:**

```sql
(
    -- Tables that reference order tables
    SELECT DISTINCT kcu.TABLE_NAME AS table_name
    FROM information_schema.KEY_COLUMN_USAGE kcu
    WHERE kcu.REFERENCED_TABLE_SCHEMA = DATABASE()
      AND kcu.REFERENCED_TABLE_NAME IN ('spy_sales_order', 'spy_sales_order_item')
)
UNION
(
    -- Tables referenced by order tables
    SELECT DISTINCT kcu.REFERENCED_TABLE_NAME AS table_name
    FROM information_schema.KEY_COLUMN_USAGE kcu
    WHERE kcu.TABLE_SCHEMA = DATABASE()
      AND kcu.TABLE_NAME IN ('spy_sales_order', 'spy_sales_order_item')
      AND kcu.REFERENCED_TABLE_NAME IS NOT NULL
)
ORDER BY table_name;
```

Compare the query results with the standard tables list. Any tables not in the standard list are project-specific and should be included in your export request.

This query also detects optional Spryker features that may be installed in your project but not listed in the standard tables, such as ECO module tables.

## Next steps

Once you have identified all required tables for your domain, [request an export setup](/docs/ca/dev/set-up-data-export-to-s3.html#request-an-export-setup) by submitting a support ticket with your table list.
