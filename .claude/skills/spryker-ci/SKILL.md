---
name: spryker-ci
description: Run continuous integration tools and fix issues.
---

# SprykerCI Fixing Process

Use this skill to systematically run continuous integration tools and fix errors in the Spryker documentation.

## Process

1. **Run SprykerCI**:

2. **Results for issues**:
   When there is issue output:
    - Identify problematic
    - Why the error exists (explanation of the type issue)
    - Current code snippet
    - Proposed fix with explanation
    - Wait for user approval before applying

3. **Verify**: Run the full SprykerCI execution path again

## Important Notes

- **Always get user approval** before applying each fix
- Present one error at a time for manageable review
- Explain WHY the error exists / test fail, not just HOW to fix it
- User may have domain knowledge that affects the fix (e.g., knowing a value is never null)
- Use type casts when user confirms value is always set
- Use null checks when uncertain

## Example Workflow

```
1. Run SprykerCI see commands to run in the Commands section
   1.a Vale linter
   1.b Markdown linter
   1.c Sidebar checker
2. Present Issue #1:
   - What: [what has failed]
   - Why: [explanation]
   - Fix: [proposed solution]
3. User approves → Apply fix
4. Run SprykerCI for this module again to verify success
9. Present Issue #2...
10. Continue until all errors/tests presented and approved
11. Run SprykerCI again to verify success
```

## Fix guidelines

### Code block file references

When a code block shows the contents of a file, the file path must be displayed as bold text above the code block, separated by an empty line.
It must NOT be placed as a comment inside the code block, or use non-bold file path display style, or miss an empty line after the file path before the code block.

**Wrong:**
````markdown
```php
// config_default.php

$config[OmsConstants::PROCESS_LOCATION] = [
```
````

**Correct:**
````markdown
**config_default.php**

```php
$config[OmsConstants::PROCESS_LOCATION] = [
```
````

**Wrong:**
````markdown
`config_default.php`
```php
$config[OmsConstants::PROCESS_LOCATION] = [
```
````

**Correct:**
````markdown
**config_default.php**

```php
$config[OmsConstants::PROCESS_LOCATION] = [
```
````

**Wrong:**
````markdown
**`config_default.php**
```php
$config[OmsConstants::PROCESS_LOCATION] = [
```
````

**Correct:**
````markdown
**config_default.php**

```php
$config[OmsConstants::PROCESS_LOCATION] = [
```
````

**Detection:** Look for code blocks where the first line is a comment containing only a file path (e.g., `// filename.ext`, `# filename.ext`, `<!-- filename.ext -->`). Extract the file path, move it above the code block as `**<file path>**`, add an empty line, and remove the comment line from inside the code block.

**Detection:** Look for code blocks with a preceding line containing a file path not surrounded by **. Extract the file path, and replace the line with `**<file path>**`, ensure a single empty line between it and the code block.

**Reporting:** If the section doesn't have a filename mentioned in it or before it, report as a warning.

### Sidebar issues

When there is a page missing in the sidebar the issues shows fileName.md to be missing. To fix this use the same path to be added and replace `md` with `html`.

To get the title read the file that was mentioned to be missing, get the title from it and present it to the user for verification.

## Commands

Run Vale
```bash
vale $(find docs/ _includes/pbc/ -type f -name "*.md" ! -path "*/202311.0/*" ! -path "*/202404.0/*") --minAlertLevel=error
```

Run Markdown Linter
```bash
npx markdownlint-cli2 "docs/**/*.md" "_includes/pbc/**/*.md" "#node_modules"
```

Run Sidebar checker
```bash
./_scripts/sidebar_checker/sidebar_checker.sh
```

