---
title: Markdown syntax
description: Learn the markdown syntax and how to create markdown elements in your writing.
template: concept-topic-template
related:
  - title: Style, syntax, formatting, and general rules
    link: docs/scos/user/intro-to-spryker/contributing-to-documentation/style-formatting-general-rules.html
---

This document contains Markdown syntax of the page elements used on our documentation website. You will read about:

- Documentation-specific markdown elements
- HTML syntax that is used where Markdown is insufficient for our documentation website
- Solutions to common issues

{% info_block infoBox "Info" %}

General formatting rules and styling rules for markdown can be found at [Basic writing and formatting syntax for Github](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

{% endinfo_block %}


Syntax snippets contain text wrapped in braces - `{}`. This is a placeholder that should be replaced with what the text inside describes. The braces should be removed as well.

{% info_block errorBox "Templates" %}

Make sure to use the templates from the [_templates](https://github.com/spryker/spryker-docs/tree/master/_templates) folder for the document you are working on. They already contain the commonly used elements for each type of doc.

{% endinfo_block %}


## Drop-downs

To create drop-downs, use this syntax:

```md
<details open>
<summary>{drop-down toggle button}</summary>

{text}

</details>
```

Example:

```md
<details open>
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
- Put a blank row between `<summary>{drop-down toggle button}</summary>` and ````{programming language}`. This will ensure that the code snippet is displayed correctly on the documentation website.

{% endinfo_block %}

## Image and table sizes

Currently, by default, when you add an image to your document, it's size is automatically adjusted so that it does not exceed 50% of the content area. By default, 2-column tables also take 50% of the content area.

If you want your image or a 2-column table to stretch to the content area’s size, wrap the image and the table in `<div>` with the width-100 class. For example:

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
|{table header}|{table header}|
| --- | --- |
|{text}|<ol><li>{text}</li><li>{text}</li></ol>|

```

This is how the table will look:

| {table header}| {table header} |
| ------------------ | ------------------ |
| {text}             | <ol><li>{text}</li><li>{text}</li></ol>       |

## Notes

This section describes the Markdown syntax of the notes used only in certain scenarios. This also means that you can't use this syntax in any other scenarios.

### Verification

Verification notes are usually used in guides. They describe what a reader can do to find out if the action they have performed was successful. Use the following Markdown syntax for the verification notes:

```
{% info_block warningBox "Verification" %}

{The verification step}

{% endinfo_block %}
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
{% info_block infoBox "Info" %}

Your content

{% endinfo_block %}
```
Info example:

{% info_block infoBox "Secured variables" %}

To make the values of environment variables hidden in logs, set up secured variables.

{% endinfo_block %}

- Warning syntax:

```
{% info_block warningBox "Warning" %}

Your content

{% endinfo_block %}

```

Warning example:

{% info_block warningBox "Important Note" %}

Ensure that Back Office is protected by a secure VPN connection.

{% endinfo_block %}

- Error syntax:

```
{% info_block errorBox "Error" %}

Your content

{% endinfo_block %}

```

Error example:

{% info_block errorBox %}

An entity cannot have a store relation and SynchronizationPool defined for it simultaneously.

{% endinfo_block %}

{% info_block infoBox "Info" %}

You can find the templates for notes in the [_templates > info-blocks](https://github.com/spryker/spryker-docs/tree/master/_templates/info-blocks) folder.

{% endinfo_block %}


## Code snippets in tables

Markdown does not support code snippets in tables. Try to avoid inserting code snippets into tables on the documentation creation stage. If you do end up with a code snippet in a table, choose a solution depending on the conditions:

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

### Mixed Content 

If you have a table column with cells containing both the code snippets and supported content, do the following:

1. Place the code snippets below the table as described in step 2 of Only Code.
2. Into the cell or cells from which you removed the code snippets, add See **{drop-down toggle button}** below the table.

See the example below:

Source table:

![source table](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/source-table-2.png)

Published table:

<div>
| Function name | Description | Method signature | Usage example |
| --- | --- | --- | --- |
| `model` | Resolves a model path and returns a string in the following format: `@ShopUi/models/{modelName}.twig`. | function model($modelName: string): string <ul><li>$modelName - model name (required).</li></ol> | `{% raw %}{% extends model('component') %}{% endraw %}` | 
| `define` | This function is used for: <ul><li>creating a default object that can be changed from an incoming context;</li><li>defining tags used to pass properties and contract for a specific component.</li></ul> | | See **Usage Example: define** below. |
| `qa` | Returns a string in the following format: `data-qa="qa values here"` | `function qa($qaValues: string[] = []): string` | `{% raw %}{{ qa('submit-button') }}{% endraw %}` |
</div>

<details open>
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

You don’t have to create anchors for headings. Each heading has its default anchor that corresponds to its text. However, still check [step 2](#step-2) of this section to learn about important aspects of linking to anchors. 

Follow the steps to create an anchor and link to it:

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
  Following the example above, it looks like `[Sorting parameters](https://docs.spryker.com/docs/marketplace/dev/glue-api-guides/202108.0/searching-the-product-catalog.html#sorting)`.
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

## Adding Wistia videos

To add a link to a Wistia video, use the following code: `{% wistia {{wistia video code}} %}`, where `{video code}` is the Wistia's video code. For example, if you want to add video `https://fast.wistia.com/embed/medias/eiw5ev4gv2/`, your code should be: `{% wistia eiw5ev4gv2 %}`.

You can also set video’s width and height. For example:

​```md
{% wistia eiw5ev4gv2 960 720 %}
```
where 
960 - is the video’s width 
720 - is the video’s height


## Embedding .pdf files

To embed .pdf files, use the following code:

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

## Inline code issues

You may encounter an inline code piece that contains Markdown syntax symbols.  For example, “You also need to update Price` >= 4.* and PriceCartConnector` >= 3.* as they provide additional data…”. In this case, we get the following:

- Desired output - “You also need to update `Price` >= 4.* and PriceCartConnector` >= 3.*` as they provide additional data…”. 
- Usual Markdown syntax - `You also need to update `Price` >= 4.* and PriceCartConnector` >= 3.*` as they provide additional data…`
- Because of the grave accents (`) in the inline code piece being part of the Markdown syntax, the actual output is - “You also need to update `Price` >= 4.* and PriceCartConnector `>= 3.*` as they provide additional data…”

Avoid this issue by replacing grave accents in the inline code piece with triple grave accents  ( ``` ) -  `You also need to update ```Price` >= 4.* and PriceCartConnector` >= 3.*``` as they provide additional data…`
