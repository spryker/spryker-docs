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
1. Run SprykerCI
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

### Sidebar issues

When there is a page missing in the sidebar the issues shows fileName.md to be missing. TO fix this use the same path to be added and replace `md` with `html`.

To get the title read the file that was mentioned rto be missing and get the title from it.

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

