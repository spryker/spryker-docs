# Spryker Documentation Repository Guidelines

This file contains important instructions for working with the Spryker documentation repository.

## Project Structure

- Documentation pages are in `docs` folder
- Sidebar of documentation is in `_data/sidebars` folder

## Documentation Standards

Follow documentation Standards to ensure content is high-quality and consistent with Spryker documentation standards.

### Internal Links Format

All relative internal links MUST follow this format:

```markdown
[link text](/docs/section/file.html)
```

**Rules:**
- Path starts with `/`
- Path ends with `.html` (NOT `.md`)
- Use the actual file path, replacing `.md` extension with `.html`

**Example:**
- File location: `docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler.md`
- Link format: `[Web Profiler Integration](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler.html)`

### Purpose and Goals

- Evaluate content intended for documentation on docs.spryker.com
- Ensure Markdown code for Jekyll meets high-quality standards in tone, writing style, grammar, and web best practices
- Provide specific, actionable amendments to improve the article
- **ONLY show amendments - do not show "no change" items**

### Grammar and Sentence Structure

- Identify grammatical errors:
    - Typos
    - Incorrect verb tense
    - Subject-verb agreement issues
    - Incorrect punctuation
- Evaluate sentence structure for clarity and conciseness
- Identify sentences that are too long, complex, or unclear
- Formulate improved sentence structures for better readability
- Ensure Markdown is correct and content conforms with web best practices (alt text, no skipped headings)

### Tone of Voice

Analyze the overall tone to align with technical documentation styles (Google Developer Documentation Style Guide, Microsoft Style Guide). The tone should be:
- Formal yet helpful
- Encouraging
- Clear and concise
- Consistent
- Warm, relaxed, and ready to lend a hand

**Required tone elements:**
- Use second person ('you') to address the reader directly
- Use active voice for clarity
- Use present tense where appropriate for immediacy
- Avoid contractions (use 'do not' instead of 'don't')
- Use appropriate technical terms, avoiding unnecessary jargon

### Writing Style, Markup and Markdown

**Spelling:**
- Use American spelling consistently

**Terminology (Vale `terms` style):**
- Use the exact terms enforced by the Vale rules in `vale/styles/terms/`. These are `error`-level and will fail the `vale-lint` CI check.
- Most common: use **Back Office** (two words), never "Backoffice" or "backoffice". This applies even to API/type names — write **Back Office API**, not "Backoffice API".
- When introducing a product, feature, or component name, check `vale/styles/terms/` for the canonical spelling before using it.

**Markdown Formatting:**
- Use standard Markdown for headings, lists, links, code blocks, and inline formatting
- Verify proper use of headings, lists, code blocks, links, bolding, italics, etc.
- **Do not add a top-level `#` (H1) heading in the page body.** Jekyll renders the H1 from the `title` front-matter field, so an H1 in the body produces a duplicate and fails the `markdownlint` MD025 check (`single-title/single-h1`). Start the body at `##` (H2).
- Use Jekyll-compatible syntax for Spryker-specific components:
    - `{% info_block infoBox "Info" %}...{% endinfo_block %}` instead of `> [!NOTE]`
- Apply other Spryker Liquid tags as needed:
    - `{% include %}`
    - `{% info_block warningBox "Warning" %}`
- **info_block formatting:** Always surround the content inside `{% info_block %}` tags with blank lines. This is required for CommonMark to process Markdown (links, bold, etc.) inside the block. Without blank lines, CommonMark treats the entire block as raw HTML and markdown is not rendered.
  ```markdown
  {% info_block warningBox %}

  Content with [links](/docs/example.html) renders correctly.

  {% endinfo_block %}
  ```
- Ensure output renders correctly in Jekyll but remains readable in raw Markdown

### Presenting Suggestions

Present all suggestions in a numbered list. Each item must have:

1. **Original markdown code** - The current text/code
2. **New markdown code** - The improved version
3. **Summary of the change** - Brief explanation of what was changed and why

**Example format:**
```
1. **Original:** `This is the old text.`
   **New:** `This is the improved text.`
   **Summary:** Changed passive voice to active voice for clarity.
```

### Last updated date

After editing a file, the field `last_updated` must be always updated to the current date.

### Sidebar Links

After adding a new file, the sidebar link must be added to reflect the new file location.
After removing a file, the sidebar link must be removed.
After renaming a file, the sidebar link must be renamed to reflect the new file location.
After moving a file, the sidebar link must be updated to reflect the new file location.

### Twig examples
Always wrap Twig code in `{% raw %}` and `{% endraw %}` tags.
Examples:
```twig
{% raw %}
{% if condition %}
    <p>This is a Twig block.</p>
{% endif %}
{% endraw %}
```

`{% raw %}{% if condition %}{% endraw %}`
## Validation Workflow

Use the following workflow to validate documentation changes.

1. Find Changed Files

When working on a branch, find all changed markdown files compared to master:

```bash
git diff master..HEAD --name-only | grep '.md'
```

2. Run Validation Tools

Run both validation tools on changed files:

**Vale (prose linting):**
```bash
vale --minAlertLevel=error path/to/file.md 
```

**Markdownlint (markdown syntax):**
```bash
markdownlint-cli2 path/to/file.md
```

**Installation:** If vale or markdownlint-cli2 are not installed, install them according to the OS requirements.

3. Validate with Documentation Standards
    - internal links format
    - grammar and sentence structure
    - tone of voice
    - writing style, markup and markdown
    - `last_updated` date should be updated to the date of the last modification of any file in this PR.
    - sidebar links

4. Finalize

- **ONLY address ERRORS**, not warnings or suggestions
- Provide specific fixes for each error found
- Re-run validation tools to ensure all errors are resolved

### Best Practices

- Always validate documentation changes after making changes
- Fix validation errors immediately
- Maintain consistency with surrounding content
- Ensure all internal links are valid and properly formatted
- Follow Documentation Standards for generation and validation of documentation

### Limitations

- Do not suggest removing any part of the document unless it violates a documented rule in the style guides or validation tools
- If removal seems beneficial but isn't required by the rules, note it as an optional consideration rather than a recommendation
