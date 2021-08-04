---
title: Tutorial - How the "define" Twig Tag is Working
originalLink: https://documentation.spryker.com/v6/docs/tutorial-how-define-twig-tag-is-working
redirect_from:
  - /v6/docs/tutorial-how-define-twig-tag-is-working
  - /v6/docs/en/tutorial-how-define-twig-tag-is-working
---

This tutorial explains how the **define** tag works on particular examples.

Usually, the **define** tag is used to specify some configuration for the template. It describes the variables used in this template. You can set default values for these variables or indicate that the variable should be declared.

Example of usage:

```json
{% raw %}{%{% endraw %} define data = {
    id: required,
    name: 'name',
    description: 'no description',
} {% raw %}%}{% endraw %}
```

In twig, this is a regular hash [literal](https://twig.symfony.com/doc/2.x/templates.html#literals){target="_blank"}, which is a representation of the associative array in PHP. In the current example, it means that an object with the name **data** should be passed to the template, and the **id** field is required. Now, we can include or embed this template as follows, for example:

```json
{% raw %}{%{% endraw %} include molecule('our_molecule_template') with {
    data: {
        id: 'id',
        description: 'description',
    },
} only {% raw %}%}{% endraw %}
```

So, after the **define** tag is executed inside the template, we will have an object named **data** with the following values:

```json
{
    id: 'id',
    name: 'name',
    description: 'description',
}
```

If the required field is not passed, the exception will be thrown.

If the defined object does not contain required fields, we may not transfer data to the template, and the **define** tag will be created with the default values.

The tag works as follows:

* If the variable does not exist in the current twig context, it will be created with an empty array value.

* All values from the array declared by the **define** tag are replaced with the values from the existing context array in the current twig.

* Checks the resulting array and throws an exception if one of the required fields is not set.
