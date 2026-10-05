# Run the related checker

Validates front-matter `related:` blocks and flags leftover hand-written link sections in the body.

## Usage

```bash
_scripts/related_checker/related_checker.py            # files changed vs master (default)
_scripts/related_checker/related_checker.py --all      # whole docs tree
_scripts/related_checker/related_checker.py docs/a.md  # named files
_scripts/related_checker/related_checker.py --selftest # verify the checks themselves still fire
```

Requires python3 and PyYAML is not needed. Exit status is 1 when there are findings.

## Checks

| Code | Meaning |
|---|---|
| `related-sister-or-subpage` | Target is in the source page's own directory — the sidebar already lists it. Deeper descendants are kept |
| `related-not-https` | External link is not `https://`; the layout prepends `/` to anything else |
| `related-leading-slash` | Internal link starts with `/` |
| `related-no-html` | Internal link lacks `.html` |
| `related-dead-target` | No page and no `redirect_from` serves the link |
| `body-link-section` | A `## Next step(s)` / `Further reading` / `Related` / `See also` / `Read next` / `What's next` section is still in the body |

Only files under `docs/` are checked. Skills and other prose quote these anti-patterns as examples on purpose.

## Editing it

Two failure modes cost real damage during this work, and both are pinned by `--selftest`:

- **A pattern that matches nothing** reports nothing and looks like a pass. Regressing the heading pattern from
  `Next steps?` to `Next steps` is how 52 files with `## Next step` were missed by a hand-typed grep.
- **A regex spanning several YAML entries** silently stops one short. A block regex that captured 8 of 9 entries
  left the ninth orphaned in the front matter, breaking YAML in three files. `parse_related()` reads the block line
  by line for this reason, and a self-test sample asserts that three sisters produce three findings, not two.

After changing a check: add a sample to `SELFTEST` with the exact set of codes it must produce, add a near-miss
sample that must stay silent, and run `--selftest`.
