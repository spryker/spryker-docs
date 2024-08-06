---
title: REST API Marketplace B2B Demo Shop reference
description: This page provides an exhaustive reference for the REST API endpoints present in the Spryker B2B Demo Shop Marketplace by default with the corresponding parameters and data formats.
last_updated: May 10, 2022
template: glue-api-storefront-guide-template
redirect_from:
- /docs/scos/dev/glue-api-guides/202307.0/old-glue-infrastructure/rest-api-marketplace-b2b-demo-shop-reference.html

related:
  - title: REST API Marketplace B2C Demo Shop reference
    link: docs/dg/dev/glue-api/page.version/old-glue-infrastructure/rest-api-marketplace-b2c-demo-shop-reference.html
---

<!-- 2020307.0 is the last version to support this doc. Don't move it to the next versions -->

This document provides an overview of REST API endpoints provided by the Spryker B2B Marketplace by default. For each endpoint, you will find its URL relative to the server, REST request parameters, as well as the appropriate request and response data formats.

<div id="swagger-ui"></div>

{% raw %}
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-standalone-preset.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-bundle.js"></script>
<script>
const swaggerContainer = document.getElementById('swagger-ui');
if(swaggerContainer) {
    console.log('start'); const ui = SwaggerUIBundle({
        url: 'https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/dev+guides/glue-api-guides/202204.0/rest-api-reference/mp_b2b_spryker_rest_api.schema.json',
        dom_id: '#swagger-ui', deepLinking: true, presets: [
            SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset
        ],
        enableCORS: false, layout: 'BaseLayout', supportedSubmitMethods: []
    });
    console.log(ui); window.ui = ui
}
</script>
{% endraw %}
