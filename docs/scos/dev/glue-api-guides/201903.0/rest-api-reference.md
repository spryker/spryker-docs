---
title: REST API Reference
last_updated: Nov 22, 2019
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v2/docs/rest-api-reference
originalArticleId: 16390926-e788-4387-849f-073c20bb71a6
redirect_from:
  - /v2/docs/rest-api-reference
  - /v2/docs/en/rest-api-reference
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
        url: 'https://borjomi.herokuapp.com/schema',
        dom_id: '#swagger-ui', deepLinking: true, presets: [
            SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset
        ], 
        enableCORS: false, layout: 'BaseLayout', supportedSubmitMethods: []
    });
    console.log(ui); window.ui = ui 
}
</script>
{% endraw %}
