---
title: Product Management powered by OpenAI
description: Generate and apply product translations in the Spryker Back Office. Translate names and descriptions between locales with AI assistance to speed up localization.
last_updated: Sep 16, 2025
template: concept-topic-template
---

Product Management powered by OpenAI enables Back Office users to generate translations for abstract and concrete products.
  - Product abstracts
  - Product concretes
- Fields supported:
  - Name
  - Description
- The translations are generated from any locale (for example en_US) into any other locales configured in the shop.
- Translations appear directly in the product edit form, making it faster to localize product content.


<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/third-party-integrations/image-20250912-114415.png" alt="Action Buttons in Back Office">

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/third-party-integrations/image-20250912-114511.png" alt="Action Buttons in Back Office">

### How to use it in Back Office

1. Go to the **Back Office** and open either a **Product Abstract** or **Product Concrete**.
2. Locate the **Name** or **Description** field.
3. Next to the existing **"Clone"** button, you will see a new **AI Translate button** (icon-only).
4. Click the AI Translate button with desired locale to be filled with translation:
   - The system will send the **en_US text** to the AI Translator.
   - Chosen locale will automatically be filled with translated text.
5. Review the translations.
6. If satisfied, click **Apply** to store the translations.
7. Click **Save** to apply changes

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/third-party-integrations/image-20250912-114549.png" alt="AI-Translation How-To">

{% info_block warningBox %}
Translations are suggestions. Back-office users are responsible for reviewing and approving them before saving.
{% endinfo_block %}

## Install

[Install Product Management powered by OpenAI](/docs/pbc/all/product-information-management/latest/base-shop/third-party-integrations/product-management-powered-by-openai/install-product-management-powered-by-openai)