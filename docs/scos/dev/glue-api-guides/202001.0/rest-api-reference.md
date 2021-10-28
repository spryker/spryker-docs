---
title: REST API Reference
description: This page provides an exhaustive reference for the REST API endpoints present in Spryker by default with the corresponding parameters and data formats.
last_updated: Jan 22, 2020
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v4/docs/rest-api-reference
originalArticleId: 25079c04-035b-4278-ad7d-a2866388ab5e
redirect_from:
  - /v4/docs/rest-api-reference
  - /v4/docs/en/rest-api-reference
---

This document provides an overview of REST API endpoints provided by Spryker by default. For each endpoint, you will find its URL relative to the server, REST request parameters, as well as the appropriate request and response data formats.

<div id="swagger-ui"></div>

{% raw %}
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-standalone-preset.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-bundle.js"></script>
<script>
const swaggerContainer = document.getElementById('swagger-ui');
if(swaggerContainer) { 
    console.log('start'); const ui = SwaggerUIBundle({
        url: 'https://spryker.s3.eu-central-1.amazonaws.com/docs/Document+360/json/schema.json',
        dom_id: '#swagger-ui', deepLinking: true, presets: [
            SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset
        ], 
        enableCORS: false, layout: 'BaseLayout', supportedSubmitMethods: []
    });
    console.log(ui); window.ui = ui 
}
</script>
{% endraw %}
