---
title: Markdown syntax
description: Learn the markdown syntax and how to create markdown elements in your writing.
last_updated: 18 Jul, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/user/intro-to-spryker/contributing-to-documentation/markdown-syntax.html
  - /docs/scos/user/intro-to-spryker/contribute-to-the-documentation/markdown-syntax.html

related:
  - title: Build the documentation site
    link: docs/about/all/about-the-docs/run-the-docs-locally.html
  - title: Adding product sections to the documentation
    link: docs/about/all/about-the-docs/contribute-to-the-docs/add-global-sections-to-the-docs.html
  - title: Edit documentation via pull requests
    link: docs/about/all/about-the-docs/contribute-to-the-docs/edit-the-docs-using-a-web-browser.html
  - title: Report documentation issues
    link: docs/about/all/about-the-docs/contribute-to-the-docs/report-docs-issues.html
  - title: Review pull requests
    link: docs/about/all/about-the-docs/contribute-to-the-docs/review-docs-pull-requests.html
---

We use Markdown to write the Spryker documentation. This document contains the Markdown syntax of the page elements used on the Spryker documentation website, specifically:

- Documentation-specific Markdown elements.
- HTML syntax that is used where Markdown is insufficient for our documentation website.
- Solutions to common issues.

{% info_block infoBox "Info" %}

For general formatting rules and styling rules for Markdown, see [Basic writing and formatting syntax for Github](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

{% endinfo_block %}


Syntax snippets contain text wrapped in braces (`{}`). This is a placeholder that you should replace with what the text inside describes. Also, remove the braces.

{% info_block errorBox "Templates" %}

Make sure to use the templates from the [_templates](https://github.com/spryker/spryker-docs/tree/master/_templates) folder for the document you are working on. They already contain the commonly used elements for each type of document.

{% endinfo_block %}


## Drop-downs

To create drop-downs, use this syntax:

```md
<details>
<summary>{drop-down toggle button}</summary>

{text}

</details>
```

Example:

```md
<details>
<summary>How to create and manage the articles</summary>

You need to do the following to update an article:
1.     Click Edit.
2.     Make your changes.
3.     Click Save

</details>
```

### Drop-down with a code snippet

To create a drop-down with a code snippet inside, use this syntax:

![drop down with code snippet template](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/drop-down-with-code-snippet-template.png)

Example:

![drop down with code snippet example](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/dropdown-with-the-code-snippet-example.png)


{% info_block warningBox "Warning" %}

Make sure to fulfill the requirements:

- `{drop-down toggle button}` in `<summary>{drop-down toggle button}</summary>` should not undergo any kind of formatting. For example, `<summary>`code.php`</summary>` or `<summary><var>code.php</var></summary>`. Otherwise, the code snippet will be corrupted.
- Put a blank row between `<summary>{drop-down toggle button}</summary>` and _```{programming language}_. This will ensure that the code snippet is displayed correctly on the documentation website.

{% endinfo_block %}

## Image and table sizes

Currently, by default, when you add an image to your document, its size is automatically adjusted so that it does not exceed 50% of the content area. By default, 2-column tables also take 50% of the content area.

If you want your image or a 2-column table to stretch to the content area's size, wrap the image and the table in `<div>` with the `width-100` class. For example:

To make an image as wide as the content area:

```html

<div class="width-100">

![Marketplace concept](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Marketplace/Marketplace+Concept/marketplace-concept.png)

</div>
```

To make a table as wide as the content area:

```html
<div class="width-100">

| PATH PARAMETER | DESCRIPTION      |
| ----------------- | -------------------------- |
| content_item_key   | Key of the Abstract Product List content item. |

</div>
```

## Ordered and unordered lists in tables

Generally, Markdown does not support lists in tables. That's why we write the lists in tables in HTML while the tables remain in Markdown.

Ordered list in table syntax:

```md
|{Table header}|{Table header}|
| --- | --- |
|{text}|<ol><li>{text}</li><li>{text}</li></ol>|

```

This is how the table will look:

| {table header}| {table header} |
| ------------------ | ------------------ |
| {text}             | <ol><li>{text}</li><li>{text}</li></ol>       |

## Notes

This section describes the Markdown syntax of the notes used only in certain scenarios. That means that you can't use this syntax in any other scenarios.

### Verification

Verification notes are usually used in guides. They describe what a reader can do to find out if the action they have performed was successful. Use the following Markdown syntax for the verification notes:

```
{% raw %}{% info_block warningBox "Verification" %}{% endraw %}

The verification step

{% raw %} {% endinfo_block %}{% endraw %}
```
Verification example:

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed in `vendor/spryker`:

| Module | Expected Directory |
| --- | --- |
| Content | vendor/spryker/content |
| ContentStorage | vendor/spryker/content-storage |
| ContentGui | vendor/spryker/content-gui |

{% endinfo_block %}

### Info, Warning, Error

*Info*, *Warning*, and *Error* notes are used for providing additional emphasis or context in the document. See syntax and examples of each of these content types below.

- Info syntax:

```
{% raw %}{% info_block infoBox "Info" %}{% endraw %}

Your content

{% raw %}{% endinfo_block %}{% endraw %}
```

Info example:

```
{% raw %}{% info_block infoBox "Secured variables" %}{% endraw %}

To make the values of environment variables hidden in logs, set up secured variables.

{% raw %}{% endinfo_block %}{% endraw %}
```

- Warning syntax:

```
{% raw %}{% info_block warningBox "Warning" %}{% endraw %}

Your content

{% raw %}{% endinfo_block %}{% endraw %}

```

Warning example:

```
{% raw %}{% info_block warningBox "Important Note" %}{% endraw %}

Ensure that Back Office is protected by a secure VPN connection.

{% raw %}{% endinfo_block %}{% endraw %}
```

- Error syntax:

```
{% raw %}{% info_block errorBox "Error" %}{% endraw %}

Your content

{% raw %}{% endinfo_block %}{% endraw %}

```

Error example:

```
{% raw %}{% info_block errorBox %}{% endraw %}

An entity cannot have a store relation and SynchronizationPool defined for it simultaneously.

{% raw %}{% endinfo_block %}{% endraw %}
```

{% info_block infoBox "Info" %}

You can find the templates for notes in the [_templates > info-blocks](https://github.com/spryker/spryker-docs/tree/master/_templates/info-blocks) folder.

{% endinfo_block %}


## Code snippets in tables

Markdown does not support code snippets in tables. Try to avoid inserting code snippets into tables where possible. If you do end up with a code snippet in a table, choose a solution depending on the conditions:

- All the column cells contain code snippets.
- There are several column cells with code snippets and several column cells with supported content.

### Only code snippets

When a table column contains only code snippets, do the following:

1. Remove the column with the code snippet from the table entirely.
2. Below the table, paste all the code snippets in the following format:

```md
<details><summary>{removed column header name}:{entity name}</summary>

{code snippet}

</details>
```

See the example below:

Source table:

![source table](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/source-table.png)

Published table:

| Storage Type | Target Entity | Example Expected Data Identifier |
| --- | --- | --- |
| Redis | Product Abstract Price | kv:price_product_abstract_merchant_relationship:de:1:1 |
| Redis | Product Concrete Price | kv:price_product_abstract_merchant_relationship:de:1:1 |

<details>
<summary>Example Expected Data Fragment: Product Abstract Price</summary>

```yaml
{
	"prices": {
		"2": {
			"EUR": {
				"priceData": null,
				"GROSS_MODE": {
					"DEFAULT": 9922
				},
				"NET_MODE": {
					"DEFAULT": 8922
				}
			},
			"CHF": {
				"priceData": null,
				"GROSS_MODE": {
						"DEFAULT": 11422
				},
				"NET_MODE": {
					"DEFAULT": 10322
				}
			}
		}
	}
}
```
</details>

<details>
<summary>Example Expected Data Fragment: Product Concrete Price</summary>

```yaml
{
"prices": {
		"2": {
			"EUR": {
				"priceData": null,
				"GROSS_MODE": {
					"DEFAULT": 12322
				},
				"NET_MODE": {
					"DEFAULT": 11222
				}
			},
			"CHF": {
				"priceData": null,
				"GROSS_MODE": {
					"DEFAULT": 10122
				},
				"NET_MODE": {
					"DEFAULT": 12522
				}
			}
		}
	}
}
```
</details>

### Mixed content

If you have a table column with cells containing both code snippets and supported content, do the following:

1. Place the code snippets below the table as described in step 2 of [Only code snippets](#only-code-snippets).
2. Add a `See **[drop-down toggle button]** below` the table into the cell or cells from which you removed the code snippets.

See the example below:

Source table:

![source table](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/source-table-2.png)

Published table:


| FUNCTION NAME | DESCRIPTION | METHOD SIGNATURE | USAGE EXAMPLE |
| --- | --- | --- | --- |
| `model` | Resolves a model path and returns a string in the following format: `{% raw %}@ShopUi/models/{modelName}.twig{% endraw %}`. | `{% raw %}function model($modelName: string){% endraw %}`: string `{% raw %}$modelName{% endraw %}` - model name (required). | `{% raw %}{% extends model('component') %}{% endraw %}` |
| `define` | This function is used for: creating a default object that can be changed from an incoming context and defining tags used to pass properties and contract for a specific component. | | See **Usage Example: define** below. |
| `qa` | Returns a string in the following format: `{% raw %}data-qa="qa values here"{% endraw %}` | `{% raw %}function qa($qaValues: string[] = []): string{% endraw %}` | `{% raw %}{{ qa('submit-button') }}{% endraw %}` |

<details>
<summary>Usage Example: define</summary>

```twig
{%- raw -%}
{% define data = {
    items: _widget.productGroupItems,
} %}
{% endraw %}
```
</details>


## Anchors

You don't have to create anchors for headings. Each heading has its default anchor that corresponds to its text. However, still check [step 2](#step-2) of this section to learn about important aspects of linking to anchors.

Follow these steps to create an anchor and link to it:

1. Put the following next to the text you wish to provide a link to:

```md
<a name="{anchor-name}"></a>
```

Make sure to fulfil the requirements:

- If `{anchor-name}` consists of several words, they should be hyphenated as anchor is just a link type;
- `{anchor-name}` should always correspond to the text you are linking to for consistency. For example, if you are linking to a piece of text about full access rights,  the anchor should look like `<a name="full-access"></a>` .

<a name="step-2"></a>
2. Link text to this anchor, depending on the link source:

- When linking to an anchor on a different page, stick to the usual Markdown link syntax and add the anchor name at the end of the link: `[link text](https://{article URL}#{anchor name})`.
  Following the example above, it looks like `[Sorting parameters](/docs/marketplace/dev/glue-api-guides/202108.0/searching-the-product-catalog.html#sorting)`.
- When linking to an anchor on the same page, stick to the usual Markdown link syntax with a relative URL path - `[link text](#{anchor name})`.

With the same example, it looks like `[Sorting parameters](##sorting)`.

Here is another example:

```html
To integrate GLUE API in your project, you need to:
* [Install GLUE](#install-glue)
* [Enable GLUE](#enable-glue)

1. Install GLUE  <a name="install-glue"></a>
2. Enable GLUE <a name="enable-glue"></a>
```

## Adding inline images

To add an inline image, use this wrapper: `<span class="inline-img"></span>`. For example:

```
Click **More** <span class="inline-img">![google-chrome-more-button](link-to-an-image)</span>.
```

## Adding Wistia videos

To add a link to a Wistia video, use the following code: `{% raw %} {% wistia {{wistia video code}} %}{% endraw %}`, where `{video code}` is the Wistia's video code. For example, if you want to add video `https://fast.wistia.com/embed/medias/eiw5ev4gv2/`, your code should be: `{% raw %}{% wistia eiw5ev4gv2 %}{% endraw %}`.

You can also set video's width and height. For example:

`{% raw %}{% wistia eiw5ev4gv2 960 720 %}{% endraw %}`

where
960 - is the video's width
720 - is the video's height

## Adding other videos
To add a link to a video in the .mp4 format that originates not from Wistia, add this block with the link to your video:

```
<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="link-to-your-video.mp4" type="video/mp4">
  </video>
</figure>
```

## Embedding PDF files

To embed PDF files, use the following code:

```html
<embed src="http://example.com/the.pdf" width="500" height="375"
 type="application/pdf">
```

where `http://example.com/the.pdf` is the link to your .pdf file.


## Glossary

Glossary syntax:

```
**{glossary item}**

>{glossary item description}

...
```

Glossary example:

```md
**Deploy file**

>A YAML file defining Spryker infrastructure and services for Spryker tools used to deploy Spryker applications in different environments.
```
