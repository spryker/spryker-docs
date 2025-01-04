The heading level checker checks and corrects headings according to the standard convention. The standard hierarchy of headings in a document body is h2>h3>h4. h1 is a document's title, which is part of the front matter. The script checks and shifts the highest-level heading to be h2. Then it shifts the other headings to follow the hierarchy.

Run the checker in the `docs` folder:

```bash
node _scripts/fix-headings.js
```

Run the checker for a particular file or folder:

```bash
_scripts/fix-headings.js {PATH_TO_FILE}
```

Example of a targeted run:

```bash
_scripts/fix-headings.js docs/dg/dev/guidelines/coding-guidelines
```
