---
paths: "**/*.md"
description: When creating or editing documentation, use only canonical demo/dummy data in examples.
---

## General

- Use canonical demo values only. Do not invent new demo values when a canonical one exists.
- Keep demo data internally consistent within a page (a person's name, email, address, and references describe the same fictional entity).
- Never use real personal data, real customer data, or real credentials.
- **Any exception to a rule below must be specifically confirmed by the creator of the documentation.** Do not apply an exception on your own — ask first.

## Product

### Abstract SKU

- An abstract SKU is a **3-digit string** — for example `001`, `042`, `214`.
- Keep leading zeros (`001`, not `1`).

### Concrete SKU

- A concrete SKU is a matching **abstract SKU (3-digit string)**, then `_` (underscore), then an **8-digit string** — for example `001_25904006`, `005_30663301`.
- The leading 3 digits must match an abstract SKU used on the same page.

### Product name

Use one of these canonical product names, unless a specific name is requested:

- Canon IXUS 160
- Canon PowerShot N
- Sony Xperia Z3 Compact
- Sony SmartWatch 3
- Samsung Galaxy S5 mini
- Samsung Galaxy Gear
- Samsung Galaxy Tab

Spell names exactly as listed (for example `ThinkCentre`, not `ThinkCenter`).

### Brand

Use one of these canonical brands, unless a specific brand is requested:

- Sony
- Canon
- Samsung
- Lenovo
- Asus
- Acer

### Category

Use one of these canonical categories, unless a specific category is requested:

- Cameras
- Digital Cameras
- Cameras & Camcorders
- Entertainment Electronics
- Smart Electronics
- Communication Electronics
- Electronics
- Computers
- Notebooks
- Tablets

### Color

Use one of these canonical colors, unless a specific color is requested:

- Red
- Black
- White
- Gold
- Silver
- Purple

## Customer

### Name

When a name is not specifically requested, use these canonical names:

- **First names** — John, Jane, Sonia, Spencor, Herald, Thomas, Harald
- **Last names** — Doe, Smith, Wagner, Hopkins, Johnson, Schmidt, Bell

Spell names exactly as listed (for example `Spencor`, `Hopkins`).

### Salutation

- Spread `Mr` and `Ms` equally across the customers shown on a page (alternate them; keep a roughly even split).

### Password

- Always use `Change123$`.

### Email

- Format: `first.last@acme.com` — the local part is the lowercased first and last name joined by a dot.
- Always use the `@acme.com` domain.
- The email must match the customer's name on the same page — for example John Doe → `john.doe@acme.com`.

### Address

- **Phone** — always `+49123456789`.
- **City** — always `Berlin`.
- **Postal code** — always `10115`.
- **Street** — use one of these canonical (intentionally unrealistic) street names:
  - Sleep Str.
  - Table Str.
  - Lamp Str.
  - Pillow Str.
  - Cloud Str.
  - Candle Str.
  - Garden Str.
  - Window Str.
  - Harbor Str.
  - Maple Str.

## Merchant

### Merchant reference

- Format: `MER` followed by **6 digits** — for example `MER000001`, `MER000006`.

## Order

### Order reference

- Format: `{store}--{n}` — the store code, then `--` (double hyphen), then a sequential number — for example `DE--1`, `DE--2`, `AT--7`.
- The store code must match a canonical store used on the same page.
