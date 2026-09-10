# Related links and renames

## Format

A `related:` entry is a `title:` / `link:` pair. The link is the repo-relative path — it keeps the `docs/` prefix and the `.html` suffix, and takes **no** leading slash. It is the body-link path with the leading `/` removed.

```yaml
related:
  - title: Layered architecture pattern
    link: docs/dg/dev/architecture/layered-architecture.html
  - title: Symfony Packages
    link: https://symfony.com/packages
```

**External links must be `https://`** — the layout prepends `/` to anything else, producing `/http://…`.

## Hand-written link sections belong in `related:`

A trailing link list is a hand-rolled version of what the theme renders. **Move every entry into front-matter `related:` and delete the section — all of it, including external links. No body link section survives.** The aside gets icons and `data-toc-skip`; a body list pollutes the TOC instead.

**Drop sisters and direct subpages.** The sidebar already lists the pages beside the current one, so a `related:` entry pointing there is duplicate navigation. The test is one directory comparison: drop the entry when the target is in the source page's own directory. Anything further away stays.

```text
docs/a/b/page.md  →  docs/a/b/other.html          drop (sister)
                  →  docs/a/b/deeper/child.html   keep (subpage)
                  →  docs/a/parent.html           keep (parent)
                  →  docs/a/c/other.html          keep (cousin)
```

Do not judge this from the sidebar YAML — its nesting is not reliably parseable across sidebar files, and a wrong parent deletes a legitimate cross-section link.

**Removing the last entry removes the key.** An empty `related:` is not valid front matter; delete the whole key. Whole blocks do go — a page whose related links were all its own children ends up with none.

**Ordering:** the body list's order first, then entries that existed only in `related:`. Deduplicate.

## Deriving `title:` from a body link

Carry the body's description into `title:`; the page name alone throws the sentence's information away.

| Body shape | `title:` |
|---|---|
| `To learn about X, see [Page]` | X, capitalized — `Layered architecture pattern` |
| `To know more about X, see [Page]` | same; the intro wording varies |
| `To <verb> X, see [Page]` | the imperative — `Implement a client for your project` |
| `[Page]`, or `[Page] - description` | the link text |

Strip with `^- *To (learn|know|read|find out) (more )?about |^- *To |, see \[.*$`, then capitalize and drop the period. Entries that only ever lived in `related:` keep their page-name titles.

**Report dropped `- description` suffixes.** They do not fit a sidebar label, so dropping them is right — but say so rather than losing them quietly.

## Changing a document means changing the links to it

Whatever you changed about a page's identity — filename, title, or the name of the thing it describes — is repeated in every page that links to it.

| Reference | Where |
|---|---|
| Body links | `docs/**` |
| `related:` blocks | front matter of other pages |
| Sidebar entry | `_data/sidebars/*.yml` — `url:` **and** `title:` |
| `redirect_from` | the renamed page: add its previous URL |

**Labels are references too.** Renaming `using-the-support-portal.md` to `using-the-support-hub.md` left four labels reading "How to use the Support Portal" — sidebar, two `related:` blocks, two body links — each naming a page that no longer existed. A path-only rename passes every linter and still lies to the reader.

**Match an inbound label to the destination's own `title:`.** The canonical site name is "Spryker Portal", but that page titles itself "Using the Support Hub", so the labels say Support Hub. (This is the opposite of the conversion rule above: a rename copies the destination's name, a conversion keeps the source sentence's description.)

**Check `#fragment` links still find their heading.**
