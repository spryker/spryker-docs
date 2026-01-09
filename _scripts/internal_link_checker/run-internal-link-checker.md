# Internal Link Checker

This document explains how the Internal Link Checker works and how to run it.

**Internal Link Checker** is a Ruby script that validates internal HTML links in the generated Jekyll site by checking if linked files exist.

## Overview

The Internal Link Checker performs the following:

1. **Scans HTML files**: Collects all `.html` files in the `_site` directory, excluding ignored patterns.
2. **Builds file index**: Creates an index of valid file paths, including Jekyll clean URLs (with/without `.html` extension).
3. **Processes redirects**: Reads `redirect_from` entries from markdown frontmatter and adds them as valid paths.
4. **Validates links**: Checks all `<a href>` links in HTML files to ensure targets exist.
5. **Reports errors**: Lists broken links with file paths and line numbers.

## How it works

### Link validation logic

The checker validates links using the following rules:

- **Absolute paths**: `/docs/dg/dev/feature.html` → checks if file exists
- **Relative paths**: `../other-page.html` → resolves relative to current directory
- **Clean URLs**: `/docs/feature` → checks `/docs/feature.html` and `/docs/feature/index.html`
- **Redirects**: Uses `redirect_from` entries from markdown frontmatter as valid paths

### What is checked

✅ **Checked:**
- Internal links to HTML pages
- Links with anchors (validates file existence, not anchor)
- Relative and absolute paths
- Clean URLs (with/without `.html`)

⏭️ **Skipped:**
- External links (`http://`, `https://`, `//`)
- Email links (`mailto:`)
- Phone links (`tel:`)
- JavaScript links (`javascript:`)
- Same-page anchors (`#section`)
- Non-HTML resources (`.xml`, `.json`, `.css`, `.js`, images, etc.)
- Links to ignored sections (cross-section links)

## Run the checker

### Prerequisites

Make sure you have:
1. Built the Jekyll site: `bundle exec jekyll build --config=_config.yml,_config_production.yml`
2. Ruby environment with required gems installed

### Run all checks

Run all section checks (used in CI):

```bash
bundle exec rake check_about
bundle exec rake check_ca
bundle exec rake check_pbc
bundle exec rake check_dg
bundle exec rake check_integrations
```

### Run a custom check

You can run the checker programmatically:

```ruby
require_relative '_scripts/internal_link_checker/internal_link_checker'

# Check specific section with ignore patterns
ignore_patterns = [
  /docs\/ca\/.+/,
  /docs\/pbc\/.+/,
  /docs\/dg\/.+/
]

checker = InternalLinkChecker.new('./_site', ignore_patterns: ignore_patterns)
checker.run
```

## CI Integration

The checker runs in GitHub Actions CI with 5 parallel jobs:

| Job | Checks | Ignores |
|-----|--------|---------|
| `check_about` | `docs/about/` | All other sections |
| `check_ca` | `docs/ca/` | All other sections |
| `check_pbc` | `docs/pbc/` | All other sections |
| `check_dg` | `docs/dg/` | All other sections |
| `check_integrations` | `docs/integrations/` | All other sections |

Each job validates internal links **within its own section** only. Cross-section links are ignored by design.

## Output format

### Success

```
🔍 Scanning for HTML files in ./_site...
📝 Found 1783 HTML files
🏗️  Building valid files index...
✅ Indexed 5343 valid paths
🔗 Processing redirects from markdown files...
✅ Added 10413 redirect paths
🔗 Checking internal links...

✅ All internal links are valid!
```

### Failure

```
❌ Found 3 broken internal links:

📄 docs/pbc/all/merchant-management/latest/base-shop/manage-in-the-back-office/create-merchant-relations.html
   Line 5515: /docs/pbc/all/product-information-management/latest/base-shop//manage-in-the-back-office/product-lists/create-product-lists.html -> /docs/pbc/all/product-information-management/latest/base-shop//manage-in-the-back-office/product-lists/create-product-lists.html

📄 docs/dg/dev/architecture/module-api/declaration-of-module-apis-public-and-private.html
   Line 2073: /docs/dg/dev/backend-development/client/use-and-configure-redis-as-a-key-value-storage.html -> /docs/dg/dev/backend-development/client/use-and-configure-redis-as-a-key-value-storage.html

Total: 3 broken links in 2 files
```

## Configuration

### Ignore patterns

Ignore patterns use Ruby regex. Examples:

```ruby
ignore_patterns = [
  /docs\/ca\/.+/,              # Ignore all files in docs/ca/
  /docs\/pbc\/all\/search\/.+/, # Ignore specific subsection
  /\.html$/                     # Ignore by extension
]
```

### Redirect support

The checker automatically processes `redirect_from` entries in markdown frontmatter:

```yaml
---
title: My Page
redirect_from:
  - /docs/old-path.html
  - /docs/another-old-path.html
---
```

These paths are added to the valid files index, allowing links to old URLs.

## Performance

The checker uses parallel processing for improved performance:

- **Parallel file checking**: Uses 4 threads by default
- **Caching**: Caches link validation results to avoid duplicate checks
- **Memory efficient**: Processes files in batches

### Typical execution times

| Section | Files | Time |
|---------|-------|------|
| `about` | 71 | ~2-3 seconds |
| `ca` | 110 | ~3-5 seconds |
| `pbc` | 1783 | ~30-60 seconds |
| `dg` | 675 | ~15-30 seconds |
| `integrations` | 154 | ~5-10 seconds |

## Troubleshooting

### Common issues

**Issue:** `require': cannot load such file -- parallel (LoadError)`
**Solution:** Run through bundle: `bundle exec rake check_about`

**Issue:** Broken links to files that exist
**Solution:** Check if the file has a `redirect_from` entry. Add the old path to `redirect_from` in the frontmatter.

**Issue:** Too many false positives
**Solution:** Links to ignored sections are expected. Use section-specific rake tasks.

## Comparison with HTMLProofer

This checker replaces HTMLProofer with significant improvements:

| Feature | HTMLProofer | Internal Link Checker |
|---------|-------------|----------------------|
| Speed | 10-15 min per section | 30-60 sec per section |
| Reliability | HTTP timeouts | File-based (no timeouts) |
| Memory | High | Low |
| Redirects | Limited support | Full `redirect_from` support |
| Parallelization | Limited | Multi-threaded |

## Development

### Run tests

```bash
# Test on small section first
bundle exec rake check_about

# Test all sections
bundle exec rake check_about check_ca check_pbc check_dg check_integrations
```

### Debug

Enable verbose output by modifying the script:

```ruby
# In internal_link_checker.rb
def check_file_links(file_path)
  puts "🔍 Checking: #{file_path}" # Add debug output
  # ... rest of the code
end
```

## Exit codes

- `0`: All links are valid
- `1`: Broken links found

Used by CI to determine build success/failure.
