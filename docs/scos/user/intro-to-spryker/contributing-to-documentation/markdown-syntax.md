---
title: Markdown syntax
description: Learn the markdown syntax and how to create markdown elements in your writing.
template: concept-topic-template
---

This document contains Markdown syntax of the page elements used in our documentation. You will read about:

- General Markdown syntax
- HTML syntax that is used where Markdown is insufficient for our documentation website
- Solutions to common issues

Syntax snippets contain text wrapped in braces - `{}`. This is a placeholder that should be replaced with what the text inside describes. The braces should be removed as well.

## Drop-downs

Drop-down syntax:

```
<details open>
<summary>{drop-down toggle button}</summary>

{text}

</details>
```

Example:

```
<details open>
<summary>How to create and manage the articles</summary>

You need to do the following to update an article:
1.     Click Edit.
2.     Make your changes.
3.     Click Save

</details>
```

### Drop-down with a code snippet

Syntax of the drop-down with a code snippet:

```
<details open>
<summary>{drop-down toggle button}</summary>

```{programming language}
{code}
```
</details>
```

Example:

```
<details open>
<summary>src/Pyz/Zed/Installer/InstallerDependencyProvider.php</summary>
    
```php
<?php
 
namespace Pyz\Zed\Installer;
 
use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Installer\SalesOrderThresholdTypeInstallerPlugin;
 
class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
	/**
	 * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
	 */
	public function getInstallerPlugins()
	{
		return [
			new SalesOrderThresholdTypeInstallerPlugin(),
		];
	}
}
```
</details>
```

{% info_block warningBox "Warning" %}

Make sure to fulfill the requirements: 

- `{drop-down toggle button}` in `<summary>{drop-down toggle button}</summary>` should not undergo any kind of formatting. For example, `<summary>`code.php`</summary>` or `<summary><var>code.php</var></summary>`. Otherwise, the code snippet will be corrupted. 
- Put a blank row between `<summary>{drop-down toggle button}</summary>` and ````{programming language}`. This will ensure that the code snippet is displayed correctly on the front end.


{% endinfo_block %}

## Ordered and unordered lists in tables

Doc360 Markdown does not support lists in tables. That’s why we write the lists in tables in HTML while the tables remain in Markdown.

Ordered list in table syntax:

```
|{table header}|{table header}|
| --- | --- |
|{text}|<ol><li>{text}</li><li>{text}</li></ol>|

```

This is how the table will look:

| **{table header}** | **{table header}** |
| ------------------ | ------------------ |
| {text}             | <ol><li>{text}</li><li>{text}</li></ol>       |

## Notes

This section describes the Markdown syntax of the notes used only in certain scenarios. This also means that you can't use this syntax in any other scenarios.

### Verification

Verification notes are usually used in guides. They describe what a reader can do to find out if the action they have performed was successful. Find the Markdown syntax below:

```
{% info_block warningBox "Verification" %}

{The verification step}

{% endinfo_block %}
```
Find a verification example below:

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed in `vendor/spryker`:
| Module | Expected Directory |
| --- | --- |
| `Content` | `vendor/spryker/content` |
| `ContentStorage` | `vendor/spryker/content-storage` |
| `ContentGui` | `vendor/spryker/content-gui` |

{% endinfo_block %}

### Info, Warning, Error

*Info*, *Warning* and *Error* notes are used for providing additional emphasis or context in the document. Each of these content types can be seen below.

- Info syntax:

```
{% info_block infoBox "Info" %}

Your content

{% endinfo_block %}
```
Find an info example:

{% info_block infoBox "Secured variables" %}

To make the values of environment variables hidden in logs, set up secured variables.

{% endinfo_block %}

- Warning syntax:

```
{% info_block warningBox "Warning" %}

Your content

{% endinfo_block %}

```

Find a warning example:

{% info_block warningBox "Important Note" %}

Ensure that Back Office is protected by a secure VPN connection.

{% endinfo_block %}

- Error syntax:

```
{% info_block errorBox "Error" %}

Your content

{% endinfo_block %}

```

Find an error example:

{% info_block errorBox %}

An entity cannot have a store relation and SynchronizationPool defined for it simultaneously.

{% endinfo_block %}

## Code snippets in tables

Markdown does not support code snippets in tables. Try to avoid inserting code snippets into tables by all means on the documentation creation stage. If you do end up with a code snippet in a table, choose a solution depending on the conditions:

- All the column cells contain code snippets.
- There are several column cells with code snippets and several column cells with supported content.

## Anchors

You don’t have to create anchors for headings. Each heading has its default anchor that corresponds to its text. However, still check **step 2** of this section to learn about important aspects of linking to anchors. 

Follow the steps to create an anchor and link to it:

1. Put the following next to the text you wish to provide a link to:

`<a name="{anchor-name}"></a>`

Make sure to fulfil the requirements:

- If `{anchor-name}` consists of several words, they should be hyphenated as anchor is just a link type;
- `{anchor-name}` should always correspond to the text you are linking to for consistency. For example, if you are linking to the *Full access rights* text,  the anchor should look like `<a name="full-access-rights"></a>` .

2. Link text to this anchor, depending on the link source:

- When linking to an anchor in a different page, use the usual markdown link syntax and add the anchor name at the end of the link - `[link text](https://[{article URL}#{anchor name})`.
  Following the example above, it looks like `[Full access rights](https://documentation.spryker.com/v4/docs/whatever-article-name#full-access-rights)`.
- When linking to an anchor in the same page, use the usual markdown link syntax with a relative URL path - `[link text](#{anchor name})`.
  With the same example, it looks like `[Full access rights](#full-access-rights)`.

Find another example below:

`1... 2 3To integrate GLUE API in your project, you need to: 4* [Install GLUE](#installing-glue) 5* [Enable GLUE](#enable-glue) 6 7... 8 91. Installing GLUE  <a name="installing-glue"></a>  102. Enable GLUE <a name="enable-glue"></a> 11 12... `