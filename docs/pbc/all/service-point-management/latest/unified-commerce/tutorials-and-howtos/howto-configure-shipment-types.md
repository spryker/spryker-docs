---
title: "HowTo: Configure shipment types"
description: Learn how to configure shipment types in your Spryker Commerce OS project, including adding new types and disabling existing ones.
last_updated: Jan 13, 2026
template: howto-guide-template
---

## Background

A **Shipment Type** is a classification (for example, `delivery`, `in-center-service`, `on-site-service`) used to:

- filter and validate available shipment methods during checkout,
- drive Storefront UI selection (shipment type toggler / defaults),
- support service-point and click & collect scenarios.

Shipment types are **data-driven**: you import them and then assign them to shipment methods.

---

## 1) Install / enable the Shipment Type feature

If the feature is not installed yet, install it using [Shipment feature](/docs/pbc/all/carrier-management/latest/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html) .
After installation, ensure that data imports for shipment types and shipment-method relations are enabled.

---

## 2) Add a new Shipment Type

### Step 2.1 — Import the shipment type

1. Add the shipment type to **`shipment_type.csv`**:

```csv
key,name,is_active
in-center-service,In-Center Service,1
```

2. Assign it to stores in **`shipment_type_store.csv`**:

```csv
shipment_type_key,store_name
in-center-service,DE
```

3. Run imports:

```bash
console data:import shipment-type
console data:import shipment-type-store
```

### Step 2.2 — Assign the shipment type to shipment methods

1. Map shipment methods to the new shipment type in **`shipment_method_shipment_type.csv`**:

```csv
shipment_method_key,shipment_type_key
spryker_dummy_shipment-standard,in-center-service
```

2. Run import:

```bash
console data:import shipment-method-shipment-type
```

**Result:** checkout can now offer shipment methods that belong to the selected shipment type.

---

## 3) Configure the default Shipment Type in Storefront (Yves)

### 3.1 Define the default shipment type in config

**File:** `src/Pyz/Yves/SelfServicePortal/SelfServicePortalConfig.php`

Update `getDefaultSelectedShipmentTypeKey()` to the key you want as default:

```php
public function getDefaultSelectedShipmentTypeKey(): string
{
    return static::SHIPMENT_TYPE_DELIVERY; // change this
}
```

Example for `in-center-service`:

```php
public function getDefaultSelectedShipmentTypeKey(): string
{
    return static::SHIPMENT_TYPE_IN_CENTER_SERVICE;
}
```

Also review these methods (recommended):

- `getShipmentTypeSortOrder()` – controls display order
- `getDeliveryLikeShipmentTypes()` – defines which types behave "delivery-like"

---

### 3.2 Update Yves Twig defaults (project overrides)

You must update **both** locations (and any duplicates) where defaults are defined.

#### A) Address item form field list

**File:**
`src/Pyz/Yves/CheckoutPage/Theme/default/components/molecules/address-item-form-field-list/address-item-form-field-list.twig`

Change:

{% raw %}
```twig
{% set defaultShipmentTypes = ['delivery'] %}
```
{% endraw %}

To:

{% raw %}
```twig
{% set defaultShipmentTypes = ['in-center-service'] %}
```
{% endraw %}

Or (if you intentionally support multiple defaults):

{% raw %}
```twig
{% set defaultShipmentTypes = ['delivery', 'in-center-service'] %}
```
{% endraw %}

#### B) Checkout address view

**File:**
`src/Pyz/Yves/CheckoutPage/Theme/default/views/address/address.twig`

Apply the **same change** wherever the default shipment types are set or passed into components:

{% raw %}
```twig
{% set defaultShipmentTypes = ['delivery'] %}
```
{% endraw %}

→

{% raw %}
```twig
{% set defaultShipmentTypes = ['in-center-service'] %}
```
{% endraw %}

> If the template doesn't define `defaultShipmentTypes` explicitly but passes a default list to a molecule/organism, update the passed value accordingly.

---

### 3.3 Update the Shipment Type toggler default "checked" logic (if overridden)

If you override the widget template:

**File:**
`src/Pyz/Yves/ShipmentTypeWidget/Theme/default/components/molecules/shipment-type-toggler/shipment-type-toggler.twig`

This line is commonly hardcoded to `delivery`:

{% raw %}
```twig
checked: activeShipmentType == '' and row.vars.value == 'delivery' ? true,
```
{% endraw %}

Change `delivery` to your chosen default key:

{% raw %}
```twig
checked: activeShipmentType == '' and row.vars.value == 'in-center-service' ? true,
```
{% endraw %}

---

## 4) Values for the `SHIPMENT_TYPE_*` constants

### Rule (important)

The constant value must be **exactly the shipment type key** you import in `shipment_type.csv`.

Example CSV:

```csv
key,name,is_active
in-center-service,In-Center Service,1
delivery,Delivery,1
on-site-service,On-Site Service,1
```

Then constants must be:

```php
const SHIPMENT_TYPE_IN_CENTER_SERVICE = 'in-center-service';
const SHIPMENT_TYPE_DELIVERY = 'delivery';
const SHIPMENT_TYPE_ON_SITE_SERVICE = 'on-site-service';
```

If the string differs (even slightly), shipment type selection/filtering will not work.

---

## 5) Optional: Enable service-point / Click & Collect shipment types

If your shipment type means the customer receives goods/services at a **service point** (pickup / in-center), configure the applicable shipment type keys.

### 5.1 Product offer service availability shipment types

**File:** `src/Pyz/Client/SelfServicePortal/SelfServicePortalConfig.php`

```php
public function getProductOfferServiceAvailabilityShipmentTypeKeys(): array
{
    return [
        self::SHIPMENT_TYPE_IN_CENTER_SERVICE,
    ];
}
```

### 5.2 Shipment type keys which applicable for shipping address validation (service points Storefront API)

**File:** `src/Pyz/Shared/ShipmentTypeServicePointsRestApi/ShipmentTypeServicePointsRestApiConfig.php`

```php
public function getApplicableShipmentTypeKeysForShippingAddress(): array
{
    return [static::SHIPMENT_TYPE_KEY_IN_CENTER_SERVICE];
}
```

### 5.3 Click & Collect example configs (only if used)

- `src/Pyz/Yves/ClickAndCollectPageExample/ClickAndCollectPageExampleConfig.php`
- `src/Pyz/Zed/ClickAndCollectExample/ClickAndCollectExampleConfig.php`

Ensure the shipment type key matches your imported keys.
There is a configuration to define which shipment types are used for Click & Collect.
And the ones that are pickup like shipment types.

## 6) Verification checklist

- `GET /shipment-types` returns the new type and it is active.
- Shipment type is assigned to the store (`shipment_type_store.csv`).
- At least one shipment method is mapped to it (`shipment_method_shipment_type.csv`).
- Storefront defaults (config + Twig + toggler checked logic) use the same key.
- Checkout shows only shipment methods belonging to the selected shipment type.

---

## How to disable Shipment Types

### A) Disable the Shipment Type feature (code-level)

To fully disable the shipment type feature behavior in Storefront and Zed, **unwire the following plugins**:

#### Yves

**File:** `src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php`
Unwire:

- `ShipmentTypeCheckoutAddressCollectionFormExpanderPlugin`
- `ShipmentTypeCheckoutMultiShippingAddressesFormExpanderPlugin`
- `ShipmentTypeCheckoutAddressStepPreGroupItemsByShipmentPlugin`

#### Zed – Cart

**File:** `src/Pyz/Zed/Cart/CartDependencyProvider.php`
Unwire:

- `SspServiceShipmentTypePreReloadItemsPlugin`

#### Zed – Checkout

**File:** `src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php`
Unwire:

- `ShipmentTypeCheckoutPreConditionPlugin`

#### Zed – Shipment

**File:** `src/Pyz/Zed/Shipment/ShipmentDependencyProvider.php`
Unwire:

- `ShipmentTypeShipmentMethodFilterPlugin`

**After disabling**

- Remove or revert shipment-type-specific Twig overrides if they are no longer needed.
- Clear caches / deploy as per your process.

---

### B) Disable a specific Shipment Type (data-level)

If you want to keep the feature but disable just one type:

- Set `spy_shipment_type.is_active = 0`, **or**
- Use Backend API (if enabled): `PATCH /shipment-types/{uuid}` with `"isActive": false`.

**Result:** checkout validation rejects shipment methods tied to inactive shipment types, and Storefront will not offer them.

## Common pitfalls

- **Default value mismatch:** If config defaults say `in-center-service` but the toggler still checks `delivery`, the UI and quote may diverge.
- **Store mapping missing:** shipment type exists but doesn't show because it's not assigned in `shipment_type_store.csv`.
- **No method mapping:** shipment type exists but checkout has no shipment methods because `shipment_method_shipment_type.csv` wasn't updated.
