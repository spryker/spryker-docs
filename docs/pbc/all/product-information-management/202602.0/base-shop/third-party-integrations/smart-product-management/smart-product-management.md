---
title: Smart Product Management
description: AI-powered product content management in the Back Office. Translate and improve product names and descriptions with AI assistance.
last_updated: Feb 23, 2026
label: early-access
template: concept-topic-template
redirect_from:
  - /docs/pbc/all/product-information-management/base-shop/third-party-integrations/product-management-powered-by-openai/product-management-powered-by-openai.html
---

Smart Product Management enables Back Office users to use AI assistance for product content management. AI can translate product information between locales and improve existing content for clarity, completeness, and quality.

## Key capabilities

- **Translate content**: Generate translations for product names and descriptions from any source locale into other configured locales
- **Improve content**: Enhance existing product descriptions for better clarity, completeness, and customer engagement
- **Review before apply**: All AI-generated content appears in the form for review before saving, preventing accidental overwrites

## Supported fields

AI assistance is available for:
- **Name** (abstract and concrete products)
- **Description** (abstract and concrete products)

Translations and improvements appear directly in the product edit form, making it faster to manage product content.


<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/third-party-integrations/image-20250912-114415.png" alt="Action Buttons in Back Office">

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/third-party-integrations/image-20250912-114511.png" alt="Action Buttons in Back Office">

## Translate content using AI

AI can translate product names and descriptions from a source locale to any other configured locale:

1. In the Back Office, go to **Catalog** > **Products**.
2. Click **Edit** next to a product to open **Edit Product Abstract** or **Edit Product Concrete** page.
3. Select the target locale you want to translate into.
4. Next to the **Name** or **Description** field, click the **AI translate** icon.
5. The AI generates a translation from the default locale (for example, en_US) and fills the target locale field.
6. Review the translated content for accuracy.
7. Click **Save** to apply the translation.

<img src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/third-party-integrations/image-20250912-114549.png" alt="AI-Translation How-To">

{% info_block warningBox "Review translations" %}

Always review AI-generated translations for accuracy, tone, and context before saving. AI translations may require adjustments for technical terminology, brand voice, or cultural nuances.

{% endinfo_block %}

## Improve content using AI

AI can enhance existing product descriptions to make them more complete, clear, and engaging:

1. In the Back Office, go to **Catalog** > **Products**.
2. Click **Edit** next to a product to open **Edit Product Abstract** or **Edit Product Concrete** page.
3. Next to the **Description** field, click the **AI improve** icon.
4. The AI analyzes the current description and generates an improved version.
5. Review the improved content.
6. Click **Save** to apply the improvements, or manually edit further before saving.

**What AI improves:**
- **Clarity**: Rewrites unclear or complex sentences
- **Completeness**: Adds relevant details that may be missing
- **Structure**: Organizes information logically
- **Engagement**: Enhances readability and appeal to customers

{% info_block warningBox "Review improvements" %}

AI-improved content maintains the core information but may change phrasing, structure, or emphasis. Always review to ensure the content aligns with your brand voice and technical accuracy requirements.

{% endinfo_block %}

## Install

[Install Smart Product Management](/docs/pbc/all/product-information-management/latest/base-shop/third-party-integrations/smart-product-management/install-smart-product-management.html)





































