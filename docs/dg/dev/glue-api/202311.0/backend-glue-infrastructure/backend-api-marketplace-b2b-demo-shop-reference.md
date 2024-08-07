---
title: Backend API Marketplace B2B Demo Shop reference
description: Reference for the Backend API endpoints in the Spryker B2B Demo Shop Marketplace.
last_updated: Nov 16, 2023
template: glue-api-storefront-guide-template
redirect_from:
- /docs/scos/dev/glue-api-guides/202311.0/backend-glue-infrastructure/backend-api-marketplace-b2b-demo-shop-reference.html

related:
  - title: Backend API Marketplace B2C Demo Shop reference
    link: docs/dg/dev/glue-api/page.version/old-glue-infrastructure/rest-api-marketplace-b2c-demo-shop-reference.html
---

This document is an overview of default Backend API endpoints provided by Spryker B2B Marketplace. For each endpoint, there is a URL relative to the server, request parameters, as well as the appropriate request and response data formats.

<div id="swagger-ui"></div>

{% raw %}
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-standalone-preset.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-bundle.js"></script>
<script>
const swaggerContainer = document.getElementById('swagger-ui');
if(swaggerContainer) {
    console.log('start'); const ui = SwaggerUIBundle({
        url: 'https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/dev+guides/glue-api-guides/202311.0/rest-api-reference/mp_b2b_spryker_backend_api.schema.yml',
        dom_id: '#swagger-ui', deepLinking: true, presets: [
            SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset
        ],
        enableCORS: false, layout: 'BaseLayout', supportedSubmitMethods: []
    });
    console.log(ui); window.ui = ui
}
</script>
{% endraw %}
