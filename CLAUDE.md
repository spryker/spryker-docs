validation commands

```bash
vale path/to/file
```
```bash
markdownlint-cli2 path/to/file
```

Find changed markdown files:
```bash
git diff master..HEAD --name-only | grep '.md'
```
Take into account errors only and suggest fixing them
Collapse