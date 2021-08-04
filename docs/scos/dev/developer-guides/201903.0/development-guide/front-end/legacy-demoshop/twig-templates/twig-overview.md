---
title: Overview - Twig
originalLink: https://documentation.spryker.com/v2/docs/twig-overview
redirect_from:
  - /v2/docs/twig-overview
  - /v2/docs/en/twig-overview
---

Given that we are working on a web application, we need a proper way to generate HTML dynamically. The most common approach relies on templates and for this we decided to go with Twig Template Engine.

{% info_block infoBox %}
You can use other technology for the front-end of your application as well; this is just a recommendation and this is what we used for building Demoshop's front-end.
{% endinfo_block %}

<details open>
<summary>Click here to view a typical twig layout template</summary>
    
```
<!DOCTYPE html>
<html>
    <head>
        <title>{% raw %}{{{% endraw %} page_title {% raw %}}}{% endraw %}</title>

        {% raw %}{%{% endraw %} block header_css {% raw %}%}{% endraw %}
        <link href="/path/to/bootstrap.min.css" rel="stylesheet" />
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    </head>
    <body>
        <h1>{% raw %}{{{% endraw %} page_title {% raw %}}}{% endraw %}</h1>

        <ul id="navigation">
            {% raw %}{%{% endraw %} for item in navigation {% raw %}%}{% endraw %}
                <li><a href="{% raw %}{{{% endraw %} item.url {% raw %}}}{% endraw %}">{% raw %}{{{% endraw %} item.label {% raw %}}}{% endraw %}</a></li>
            {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
        </ul>

        <div class="container">
            {% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
            <div class="row">
                <div class="col-md-3">
                    {% raw %}{%{% endraw %} include 'partial/sidebar.twig' {% raw %}%}{% endraw %}
                </div>
                <div class="col-md-9">
                    {% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
                        {# This block should always come from the page template
                        which extends this layout file. #}
                    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
                </div>
            </div>
            {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
        </div>

        {% raw %}{%{% endraw %} block footer_js {% raw %}%}{% endraw %}
        <script src="/path/to/compiled-and-combined-js-files.js"></script>
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    </body>
</html>
```
    
</br>
</details>

</br>

For more information, see [Best Practices - Twig Templates](/docs/scos/dev/developer-guides/201903.0/development-guide/front-end/legacy-demoshop/twig-templates/twig-best-pract). 

## Markup Tags

Twig has 3 specific markup tags:

1. comment tag
2. print tag
3. block tag

### Comment tag
When using the comment tag, the content is not rendered to the output HTML.

```bash
{# comments are not rendered #}

{# comments
can be
on multiple lines
as well
#}
```

### Print tag

Prints the given expression similar to  <?php echo

```
{% raw %}{{{% endraw %} variable_name {% raw %}}}{% endraw %}

{% raw %}{{{% endraw %} 'print me!' {% raw %}}}{% endraw %}
```

### Block tag
Used mostly for control-flow statements like if, for, include, block, set
if you are doing something and not printing something, use this tag:

```
{% raw %}{%{% endraw %} set foo = 'bar' {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} if foo is 'bar' {% raw %}%}{% endraw %}
...
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```

**See also:**
[Twig Homepage](https://twig.symfony.com/)

