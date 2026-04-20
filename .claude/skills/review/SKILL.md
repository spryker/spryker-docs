---
name: review
description: Run detailed review of the docs changes against the code changes made in suite.
---

> **Note:** This skill will be removed after all migrations have been completed and documented.

Review my migration documentation changes with extreme scrutiny. The goal is to catch every issue before customers do.

## What to do

1. Get the changed files in this docs branch vs master (`git diff master..HEAD --name-only`).
2. Get the changed files in the suite repo on the same-named branch vs master as the user for a path if not added as dir.
3. Do not trust the docs — trust the code.
4. For every doc change, validate it line-by-line against the actual suite code diff. Every plugin name, every FQCN, every namespace, every method name must match the code exactly.
5. Console commands in the docs MUST be verified against the suite repo. Check `config/install/docker.yml`, `.github/workflows/ci.yml`, and the actual entrypoints (`vendor/bin/glue` vs `vendor/bin/console`). ```

## Mandatory rules — flag violations as errors

1. Migration guides focus on what to change.
2. **No Verification sections on per-module migration pages.** Remove curl examples, "how to test", "verify that X works". Projects have their own test harness. 

2. **Cross-cutting must be truly cross-cutting.** A change belongs in cross-cutting ONLY if it is required regardless of which module you migrate first. If it is triggered by migrating a specific module, it belongs in that module's guide — even if it touches a shared file like OauthDependencyProvider or AuthenticationDependencyProvider. Flag any module-specific change sitting in the cross-cutting section.

3. **Console commands must use the correct entrypoint.**
    - API Platform commands: `docker/sdk cli glue api:generate`, NOT `docker/sdk cli console api:generate`
    - Glue cache: `docker/sdk cli glue cache:clear`, NOT `docker/sdk cli console cache:clear`
    - Env var: `GLUE_APPLICATION=GLUE_STOREFRONT` (all caps), never `storefront` (any case is wrong in this context)
    - The standard post-migration block is:
      ```
      docker/sdk cli console transfer:generate
      docker/sdk cli glue api:generate
      docker/sdk cli glue cache:clear
      ```

4. **"Create" vs "update" — say what the code actually does.** If the suite diff shows a new file, the doc must say "create". If it shows a modified file, say "update" or "replace the import". Saying "update" when the file is brand new is wrong.

5. **Relationship plugins — track what stays.** Do not only document removals. Explicitly list plugins that MUST NOT be removed yet because their dependent module has not been migrated. Every migration guide needs a relationship status table.

6. **Internal links must start with `/` and end with `.html`.** This applies to both inline markdown links AND frontmatter `related:` entries.

7. **`last_updated` must be today's date** for every file touched in this PR.

8. **Do not bleed scope.** If a shared dependency provider (e.g., Checkout) has plugins from 5 different modules, only document the plugins relevant to the module being migrated. The rest belongs in their own guides.

9. **FQCNs must be verified against the suite code.** Do not assume the doc has the right namespace — grep the suite repo for every class name mentioned.

10. **Version placeholders `^X.Y.Z` are acceptable** — do not flag these.

## How to report

For every issue found, report:
- Filename from the project's root and line number, colon separator
- What is wrong (quote the offending text)
- What the code actually shows
- Concrete fix

Be adversarial. Assume every line has a mistake until proven otherwise.