We use the default Markdown syntax, however, in some cases, it is not enough or is not processed correctly. For such cases, the rules described here apply.

## Code samples in dropdowns
For code samples with more than 38 lines, use dropdowns with this syntax: 

<details>
<summary>{namespace}</summary>

```php
{code}

```
</details>

## Escaping Liquid template tags

Use the {% raw %} tag if you need to escape some of the Liquid tags so they are not processed. For example, when you use double curly braces: 

***{% raw %}{{this text is bold and in italics and is not parsed by Liquid}}{% endraw %}***

## Lists in tables
To create lists in tables, use html tags inside the Markdown table:
| HEADER 1 | HEADER 2  |
| ------------------- | ---------------- |
| <ol><li>ordered list item 1</li><li>ordered list item 2</li></ol>   | <ul><li>unordered list item 1</li><li>unordered list item 2</li></ul>  |
