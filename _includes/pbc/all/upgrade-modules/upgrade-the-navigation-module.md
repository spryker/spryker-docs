

## Upgrading from version 1.* to version 2.*

Version 2 adds validity date fields to navigation nodes to support `NavigationGui` module to control the temporal visibility of nodes.

- Update the `Navigation` module to at least  version 2.0.0 in your `composer.json`.
- Install the new database fields by running `vendor/bin/console propel:diff`. Propel should generate a migration file with the changes.
- Apply the database changes: `run vendor/bin/console propel:migrate`.
- Generate ORM models: `run vendor/bin/console propel:model:build`.
- Run `vendor/bin/console transfer:generate` to generate the new fields into the `Navigation` transfer object.

As a result:

- `valid_from` and `valid_to` fields are added to `spy_navigation_node` table.
- Corresponding properties, getters, and setters are added to `Navigation` transfer object.
