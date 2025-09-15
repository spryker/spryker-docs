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


.schema_data {
    background: #f5f5f5;
    padding: 2%;
    border-radius: 10px;
}

.swagger-ui .servers td {
    width: 100%;
    clear: left;
    float: left;
    max-width: 100% !important;
}

.computed-url {
    display: none;
}

.servers h4 {
    display: none;
}

.servers table {
    margin-top: 2%;
}

.swagger-ui code {
    background: none;
    color: white;
}

.swagger-ui .scheme-container {
    box-shadow: none;
}
</style>

{% raw %}
<div class="schema_file"><a href="{% endraw %}{{ page.swagger_url }}{% raw %}">{% endraw %}{{ page.title }}{% raw %} API Schema File</a></div>
<div id="swagger-ui"></div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.28.1/swagger-ui.css" />
<script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.28.1/swagger-ui-bundle.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.28.1/swagger-ui-standalone-preset.js"></script>

<script>
const swaggerContainer = document.getElementById('swagger-ui');
if(swaggerContainer) {
    // console.log('start');
    const ui = SwaggerUIBundle({
        url: "{% endraw %}{{ page.swagger_url }}{% raw %}",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        enableCORS: true,
        layout: 'BaseLayout',
        supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
        filter:true,
        docExpansion: 'list'
    });
    // console.log(ui);
    window.ui = ui
}
</script>
<script>
(function() {
  const fileUrl = "{% endraw %}{{ page.swagger_url }}{% raw %}";

  fetch(fileUrl, { method: "HEAD" })
    .then(response => {
      const lastModified = response.headers.get("Last-Modified");
      if (lastModified) {
        const date = new Date(lastModified);

        // Format for human display (DD Month YYYY)
        const options = { day: "2-digit", month: "long", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-GB", options);

        // Format for datetime attribute (YYYY-MM-DD)
        const isoDate = date.toISOString().split("T")[0];

        // Find the time element and update it
        const timeEl = document.querySelector(".post-meta time");
        if (timeEl) {
          timeEl.textContent = formattedDate;
          timeEl.setAttribute("datetime", isoDate);
        }
      }
    })
    .catch(err => {
      console.error("Could not fetch last modified date:", err);
    });
})();
</script>
{% endraw %}