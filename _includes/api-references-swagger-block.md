<style>
 .swagger-ui .wrapper>section>div>span {
    background: #ffffff;
    display: block;
    border-bottom: 2px solid #dddddd;
    padding: 1% 1% 2% 1%;
}
.swagger-ui .info {
    display: none;
}
.swagger-ui {
    margin-top: 3%;
}

.swagger-ui .opblock-tag {
  border-bottom: none !important; 
}

.scheme-container {
    display: none !important;
}
</style>

<div id="swagger-ui"></div>

{% raw %}
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-standalone-preset.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.22.1/swagger-ui-bundle.js"></script>
<script>
const swaggerContainer = document.getElementById('swagger-ui');
if(swaggerContainer) {
    console.log('start');
    const ui = SwaggerUIBundle({
        url: "{% endraw %}{{ page.swagger_url }}{% raw %}",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        enableCORS: true,
        layout: 'BaseLayout',
        supportedSubmitMethods: [],
        filter:true,
        docExpansion: 'list'
    });
    console.log(ui);
    window.ui = ui
}
</script>
{% endraw %}